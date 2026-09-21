/**
 * Expression validators — structured error messages for invalid expressions
 */
import type { ValidationResult } from './types';
import { isOperator, isLeftParen, isRightParen } from './operators';
import { tokenizeExpression, tokenizeNotation } from './tokenizer';

export function validateInfix(expression: string): ValidationResult {
  if (!expression.trim()) {
    return { valid: false, error: 'Expression is empty.' };
  }

  const tokens = tokenizeExpression(expression);

  if (tokens.length === 0) {
    return { valid: false, error: 'Expression contains no valid tokens.' };
  }

  // Check for unsupported characters
  for (const token of tokens) {
    if (!isValidToken(token.value)) {
      return {
        valid: false,
        error: `Expression contains unsupported token: "${token.value}".`,
      };
    }
  }

  // Check balanced parentheses
  let parenCount = 0;
  for (const token of tokens) {
    if (token.type === 'left_paren') parenCount++;
    if (token.type === 'right_paren') parenCount--;
    if (parenCount < 0) {
      return { valid: false, error: 'Unbalanced parentheses: extra closing parenthesis.' };
    }
  }
  if (parenCount !== 0) {
    return { valid: false, error: 'Unbalanced parentheses: missing closing parenthesis.' };
  }

  // Check operator placement
  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    const prev = i > 0 ? tokens[i - 1] : null;
    const next = i < tokens.length - 1 ? tokens[i + 1] : null;

    if (token.type === 'operator') {
      // Operator at start or end
      if (i === 0) {
        return {
          valid: false,
          error: `Invalid operator placement: "${token.value}" at the start of expression.`,
        };
      }
      if (i === tokens.length - 1) {
        return {
          valid: false,
          error: `Invalid operator placement: "${token.value}" at the end of expression.`,
        };
      }

      // Two operators in a row
      if (prev && prev.type === 'operator') {
        return {
          valid: false,
          error: `Invalid operator placement: "${prev.value}" followed by "${token.value}".`,
        };
      }

      // Operator after left paren
      if (prev && prev.type === 'left_paren') {
        return {
          valid: false,
          error: `Invalid operator placement: "${token.value}" after opening parenthesis.`,
        };
      }

      // Operator before right paren
      if (next && next.type === 'right_paren') {
        return {
          valid: false,
          error: `Invalid operator placement: "${token.value}" before closing parenthesis.`,
        };
      }
    }

    // Two operands in a row (in infix context)
    if (token.type === 'operand' && prev && prev.type === 'operand') {
      return {
        valid: false,
        error: `Missing operator between "${prev.value}" and "${token.value}".`,
      };
    }
  }

  return { valid: true };
}

export function validatePostfix(expression: string): ValidationResult {
  if (!expression.trim()) {
    return { valid: false, error: 'Expression is empty.' };
  }

  const tokens = tokenizeNotation(expression);

  if (tokens.length === 0) {
    return { valid: false, error: 'Expression contains no valid tokens.' };
  }

  // Simulate stack evaluation
  let stackCount = 0;
  for (const token of tokens) {
    if (token.type === 'operand') {
      stackCount++;
    } else if (token.type === 'operator') {
      if (stackCount < 2) {
        return {
          valid: false,
          error: `Not enough operands for operator "${token.value}".`,
        };
      }
      stackCount -= 1; // Pop 2, push 1
    } else {
      return {
        valid: false,
        error: `Unexpected token "${token.value}" in postfix expression.`,
      };
    }
  }

  if (stackCount !== 1) {
    return {
      valid: false,
      error: `Invalid postfix expression: ${stackCount} values remain on stack (expected 1).`,
    };
  }

  return { valid: true };
}

export function validatePrefix(expression: string): ValidationResult {
  if (!expression.trim()) {
    return { valid: false, error: 'Expression is empty.' };
  }

  const tokens = tokenizeNotation(expression);

  if (tokens.length === 0) {
    return { valid: false, error: 'Expression contains no valid tokens.' };
  }

  // Simulate stack evaluation (process from right to left)
  let stackCount = 0;
  for (let i = tokens.length - 1; i >= 0; i--) {
    const token = tokens[i];
    if (token.type === 'operand') {
      stackCount++;
    } else if (token.type === 'operator') {
      if (stackCount < 2) {
        return {
          valid: false,
          error: `Not enough operands for operator "${token.value}".`,
        };
      }
      stackCount -= 1; // Pop 2, push 1
    } else {
      return {
        valid: false,
        error: `Unexpected token "${token.value}" in prefix expression.`,
      };
    }
  }

  if (stackCount !== 1) {
    return {
      valid: false,
      error: `Invalid prefix expression: ${stackCount} values remain on stack (expected 1).`,
    };
  }

  return { valid: true };
}

function isValidToken(value: string): boolean {
  if (isOperator(value)) return true;
  if (isLeftParen(value)) return true;
  if (isRightParen(value)) return true;
  if (/^[A-Za-z0-9_]+$/.test(value)) return true;
  return false;
}
