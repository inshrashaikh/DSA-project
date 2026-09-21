import Stack from "./Stack.js";
import { infixToPostfix } from "./infixToPostfix.js";
import { validateExpression } from "./validator.js";

const isOperator = (token) => ["+", "-", "*", "/", "%", "^"].includes(token);

function buildPrefixFromPostfix(postfixExpression) {
  const tokens = postfixExpression.trim().split(/\s+/).filter(Boolean);
  const stack = new Stack();
  const steps = [];

  for (let index = 0; index < tokens.length; index += 1) {
    const token = tokens[index];

    if (!isOperator(token)) {
      stack.push(token);
      steps.push({
        index,
        token,
        action: "PUSH",
        reason: "Operand pushed onto the stack.",
        stack: stack.toArray(),
        output: stack.toArray(),
      });
      continue;
    }

    const right = stack.pop();
    const left = stack.pop();

    if (left === undefined || right === undefined) {
      throw new Error("Invalid postfix expression while building prefix.");
    }

    const combined = `${token} ${left} ${right}`;
    stack.push(combined);
    steps.push({
      index,
      token,
      action: "COMBINE",
      reason: `Operator ${token} combines the two operand groups into a single prefix fragment.`,
      stack: stack.toArray(),
      output: stack.toArray(),
    });
  }

  const prefix = stack.pop();

  return { prefix, steps };
}

export function infixToPrefix(expression) {
  const validation = validateExpression(expression);

  if (!validation.valid) {
    return {
      success: false,
      prefix: null,
      steps: [],
      error: validation.error,
    };
  }

  const postfixResult = infixToPostfix(expression);

  if (!postfixResult.success) {
    return {
      success: false,
      prefix: null,
      steps: [],
      error: postfixResult.error,
    };
  }

  const prefixData = buildPrefixFromPostfix(postfixResult.postfix);

  return {
    success: true,
    prefix: prefixData.prefix,
    steps: prefixData.steps,
    error: null,
  };
}

export default infixToPrefix;
