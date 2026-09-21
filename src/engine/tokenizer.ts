/**
 * Expression tokenizer — converts raw expression strings into Token arrays
 */
import type { Token, TokenType } from './types';
import { isOperator, isLeftParen, isRightParen } from './operators';

export function tokenizeExpression(expression: string): Token[] {
  const tokens: Token[] = [];
  const input = expression.replace(/\s+/g, ' ').trim();
  let i = 0;
  let tokenIndex = 0;

  while (i < input.length) {
    const char = input[i];

    // Skip whitespace
    if (char === ' ') {
      i++;
      continue;
    }

    // Left parenthesis
    if (isLeftParen(char)) {
      tokens.push({ value: char, type: 'left_paren', index: tokenIndex++ });
      i++;
      continue;
    }

    // Right parenthesis
    if (isRightParen(char)) {
      tokens.push({ value: char, type: 'right_paren', index: tokenIndex++ });
      i++;
      continue;
    }

    // Operator
    if (isOperator(char)) {
      tokens.push({ value: char, type: 'operator', index: tokenIndex++ });
      i++;
      continue;
    }

    // Operand — multi-character (letters, digits, underscore)
    if (/[A-Za-z0-9_]/.test(char)) {
      let operand = '';
      while (i < input.length && /[A-Za-z0-9_]/.test(input[i])) {
        operand += input[i];
        i++;
      }
      tokens.push({ value: operand, type: 'operand', index: tokenIndex++ });
      continue;
    }

    // Unknown character — still tokenize it for error reporting
    tokens.push({ value: char, type: 'operand', index: tokenIndex++ });
    i++;
  }

  return tokens;
}

/**
 * Tokenize postfix/prefix expressions where tokens are space-separated
 * or single characters
 */
export function tokenizeNotation(expression: string): Token[] {
  const trimmed = expression.trim();

  // If expression contains spaces, split by spaces
  if (trimmed.includes(' ')) {
    return trimmed.split(/\s+/).map((value, index) => ({
      value,
      type: getTokenType(value),
      index,
    }));
  }

  // Otherwise, treat each character as a token
  return trimmed.split('').map((value, index) => ({
    value,
    type: getTokenType(value),
    index,
  }));
}

function getTokenType(value: string): TokenType {
  if (isOperator(value)) return 'operator';
  if (isLeftParen(value)) return 'left_paren';
  if (isRightParen(value)) return 'right_paren';
  return 'operand';
}
