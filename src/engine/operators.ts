/**
 * Operator definitions — precedence and associativity tables
 */
import type { OperatorInfo } from './types';

export const OPERATORS: Record<string, OperatorInfo> = {
  '+': { symbol: '+', precedence: 1, associativity: 'left' },
  '-': { symbol: '-', precedence: 1, associativity: 'left' },
  '*': { symbol: '*', precedence: 2, associativity: 'left' },
  '/': { symbol: '/', precedence: 2, associativity: 'left' },
  '%': { symbol: '%', precedence: 2, associativity: 'left' },
  '^': { symbol: '^', precedence: 3, associativity: 'right' },
};

export function isOperator(char: string): boolean {
  return char in OPERATORS;
}

export function isOperand(token: string): boolean {
  return /^[A-Za-z_][A-Za-z0-9_]*$/.test(token) || /^[0-9]+$/.test(token);
}

export function isLeftParen(char: string): boolean {
  return char === '(';
}

export function isRightParen(char: string): boolean {
  return char === ')';
}

export function getPrecedence(operator: string): number {
  return OPERATORS[operator]?.precedence ?? 0;
}

export function getAssociativity(operator: string): 'left' | 'right' {
  return OPERATORS[operator]?.associativity ?? 'left';
}

export function getOperatorList(): OperatorInfo[] {
  // Deduplicate by precedence for display
  const seen = new Set<string>();
  return Object.values(OPERATORS).filter((op) => {
    const key = `${op.precedence}-${op.associativity}`;
    if (seen.has(key)) {
      // Still include for the table
    }
    seen.add(key);
    return true;
  });
}
