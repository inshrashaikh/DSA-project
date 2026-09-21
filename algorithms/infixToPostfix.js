import Stack from "./Stack.js";
import tokenize from "./tokenizer.js";
import { validateExpression } from "./validator.js";

const precedence = {
  "^": 3,
  "*": 2,
  "/": 2,
  "%": 2,
  "+": 1,
  "-": 1,
};

const isOperand = (token) =>
  token !== "(" &&
  token !== ")" &&
  !["+", "-", "*", "/", "%", "^"].includes(token);
const isOperator = (token) => ["+", "-", "*", "/", "%", "^"].includes(token);

function shouldPopOperator(currentOperator, stackTop) {
  if (stackTop === "(") {
    return false;
  }

  const currentPrecedence = precedence[currentOperator];
  const topPrecedence = precedence[stackTop];

  if (currentPrecedence < topPrecedence) {
    return true;
  }

  if (currentPrecedence > topPrecedence) {
    return false;
  }

  return currentOperator !== "^";
}

export function infixToPostfix(expression) {
  const validation = validateExpression(expression);

  if (!validation.valid) {
    return {
      success: false,
      postfix: null,
      steps: [],
      error: validation.error,
    };
  }

  const tokens = tokenize(expression);
  const stack = new Stack();
  const output = [];
  const steps = [];

  const recordStep = (
    indexValue,
    token,
    action,
    reason,
    stackSnapshot,
    outputSnapshot,
  ) => {
    steps.push({
      index: indexValue,
      token,
      action,
      reason,
      stack: [...stackSnapshot],
      output: [...outputSnapshot],
    });
  };

  for (let index = 0; index < tokens.length; index += 1) {
    const token = tokens[index];

    if (isOperand(token)) {
      output.push(token);
      recordStep(
        index,
        token,
        "OUTPUT",
        "Operand added directly to postfix output.",
        stack.toArray(),
        output,
      );
      continue;
    }

    if (token === "(") {
      stack.push(token);
      recordStep(
        index,
        token,
        "PUSH",
        "Left parenthesis pushed to the stack.",
        stack.toArray(),
        output,
      );
      continue;
    }

    if (token === ")") {
      while (!stack.isEmpty() && stack.peek() !== "(") {
        const poppedOperator = stack.pop();
        output.push(poppedOperator);
        recordStep(
          index,
          token,
          "POP",
          'Closing parenthesis encountered; pop operators until "(" is found.',
          stack.toArray(),
          output,
        );
      }

      if (stack.isEmpty()) {
        return {
          success: false,
          postfix: null,
          steps: [],
          error: {
            message: "Missing opening parenthesis",
            position: index,
          },
        };
      }

      stack.pop();
      recordStep(
        index,
        token,
        "POP",
        "Removed the matching opening parenthesis.",
        stack.toArray(),
        output,
      );
      continue;
    }

    if (isOperator(token)) {
      while (!stack.isEmpty() && shouldPopOperator(token, stack.peek())) {
        const poppedOperator = stack.pop();
        output.push(poppedOperator);
        recordStep(
          index,
          token,
          "POP",
          `Current operator ${token} has lower or equal precedence than ${poppedOperator}; pop it before pushing the new one.`,
          stack.toArray(),
          output,
        );
      }

      stack.push(token);
      recordStep(
        index,
        token,
        "PUSH",
        `Operator ${token} pushed onto the stack.`,
        stack.toArray(),
        output,
      );
    }
  }

  while (!stack.isEmpty()) {
    const remainingOperator = stack.pop();
    output.push(remainingOperator);
    recordStep(
      steps.length,
      remainingOperator,
      "POP",
      "Remaining stack operators are drained to finish the postfix expression.",
      stack.toArray(),
      output,
    );
  }

  return {
    success: true,
    postfix: output.join(" "),
    steps,
    error: null,
  };
}

export default infixToPostfix;
