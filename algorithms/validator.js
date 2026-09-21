import { tokenizeWithPositions } from "./tokenizer.js";

const isOperandToken = (token) => {
  if (!token) {
    return false;
  }

  if (typeof token !== "string") {
    return false;
  }

  return /^(?:[A-Za-z_][A-Za-z0-9_]*|\d+(?:\.\d+)?)$/.test(token);
};

const isOperatorToken = (token) =>
  ["+", "-", "*", "/", "%", "^"].includes(token);

export function validateExpression(expression) {
  const source =
    expression === null || expression === undefined ? "" : String(expression);

  if (source.trim() === "") {
    return {
      valid: false,
      error: {
        message: "Expression is empty",
        position: 0,
      },
    };
  }

  const tokens = tokenizeWithPositions(source);

  if (tokens.length === 0) {
    return {
      valid: false,
      error: {
        message: "Expression is empty",
        position: 0,
      },
    };
  }

  let previousToken = null;
  let expectOperand = true;
  let openParentheses = 0;

  for (let index = 0; index < tokens.length; index += 1) {
    const token = tokens[index];
    const value = token.value;
    const position = token.position;

    if (value === "(") {
      if (
        !expectOperand &&
        previousToken &&
        previousToken !== "(" &&
        previousToken !== ")" &&
        !isOperatorToken(previousToken)
      ) {
        return {
          valid: false,
          error: {
            message: "Missing operator between operands",
            position,
          },
        };
      }

      openParentheses += 1;
      previousToken = value;
      continue;
    }

    if (value === ")") {
      if (
        expectOperand ||
        previousToken === "(" ||
        isOperatorToken(previousToken)
      ) {
        return {
          valid: false,
          error: {
            message: "Missing operand before closing parenthesis",
            position,
          },
        };
      }

      openParentheses -= 1;
      if (openParentheses < 0) {
        return {
          valid: false,
          error: {
            message: "Unexpected closing parenthesis",
            position,
          },
        };
      }

      previousToken = value;
      expectOperand = false;
      continue;
    }

    if (isOperatorToken(value)) {
      if (expectOperand) {
        if (previousToken === null || previousToken === "(") {
          return {
            valid: false,
            error: {
              message: "Operator at start of expression",
              position,
            },
          };
        }

        return {
          valid: false,
          error: {
            message: "Consecutive operators are not allowed",
            position,
          },
        };
      }

      previousToken = value;
      expectOperand = true;
      continue;
    }

    if (isOperandToken(value)) {
      if (
        !expectOperand &&
        previousToken &&
        previousToken !== "(" &&
        previousToken !== ")"
      ) {
        if (!isOperatorToken(previousToken)) {
          return {
            valid: false,
            error: {
              message: "Missing operator between operands",
              position,
            },
          };
        }
      }

      if (!expectOperand && previousToken === ")") {
        return {
          valid: false,
          error: {
            message: "Missing operator between operands",
            position,
          },
        };
      }

      previousToken = value;
      expectOperand = false;
      continue;
    }

    return {
      valid: false,
      error: {
        message: "Invalid character found",
        position,
      },
    };
  }

  if (expectOperand && previousToken && isOperatorToken(previousToken)) {
    const lastToken = tokens[tokens.length - 1];
    return {
      valid: false,
      error: {
        message: "Operator at end of expression",
        position: lastToken.position,
      },
    };
  }

  if (openParentheses > 0) {
    return {
      valid: false,
      error: {
        message: "Missing closing parenthesis",
        position: source.length - 1,
      },
    };
  }

  if (openParentheses < 0) {
    return {
      valid: false,
      error: {
        message: "Unexpected closing parenthesis",
        position: source.length - 1,
      },
    };
  }

  return {
    valid: true,
    error: null,
  };
}

export default validateExpression;
