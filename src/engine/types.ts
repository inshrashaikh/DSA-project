/**
 * Expression Lab — Core Algorithm Types
 *
 * These types represent the state of expression conversion algorithms
 * at every step, enabling accurate visualization.
 */

export type TokenType = 'operand' | 'operator' | 'left_paren' | 'right_paren';

export interface Token {
  value: string;
  type: TokenType;
  index: number;
}

export type ActionType =
  | 'output_operand'
  | 'push_operator'
  | 'pop_operator_to_output'
  | 'pop_higher_precedence'
  | 'push_left_paren'
  | 'pop_until_left_paren'
  | 'discard_left_paren'
  | 'pop_remaining'
  | 'push_operand'
  | 'pop_operands_apply_operator'
  | 'combine_expression'
  | 'initial'
  | 'complete';

export interface AlgorithmStep {
  /** Step number (1-indexed) */
  step: number;
  /** The token being processed in this step */
  token: string;
  /** The type of token */
  tokenType: TokenType | 'end';
  /** Human-readable description of what's happening */
  action: string;
  /** Machine-readable action type */
  actionType: ActionType;
  /** Current state of the stack (bottom → top) */
  stack: string[];
  /** Current state of the output */
  output: string[];
  /** Which stack indices are highlighted (for comparison visualization) */
  highlightedStackIndices: number[];
  /** Whether the stack top was just pushed */
  justPushed: boolean;
  /** Whether the stack top was just popped */
  justPopped: string | null;
}

export interface ConversionResult {
  /** Whether conversion succeeded */
  success: boolean;
  /** The final converted expression */
  result: string;
  /** All algorithm steps for visualization */
  steps: AlgorithmStep[];
  /** Error message if conversion failed */
  error?: string;
}

export interface ValidationResult {
  valid: boolean;
  error?: string;
}

export type ExpressionType = 'infix' | 'prefix' | 'postfix';

export type ConversionMode =
  | 'infix_to_postfix'
  | 'infix_to_prefix'
  | 'postfix_to_infix'
  | 'prefix_to_infix';

export interface OperatorInfo {
  symbol: string;
  precedence: number;
  associativity: 'left' | 'right';
}
