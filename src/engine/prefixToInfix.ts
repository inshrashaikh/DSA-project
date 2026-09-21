/**
 * Prefix → Infix conversion using a stack-based algorithm
 * Generates step-by-step state snapshots for visualization.
 */
import type { AlgorithmStep, ConversionResult } from './types';
import { tokenizeNotation } from './tokenizer';
import { validatePrefix } from './validators';
import { isOperator } from './operators';

export function prefixToInfix(expression: string): ConversionResult {
  const validation = validatePrefix(expression);
  if (!validation.valid) {
    return { success: false, result: '', steps: [], error: validation.error };
  }

  const tokens = tokenizeNotation(expression);
  const stack: string[] = [];
  const steps: AlgorithmStep[] = [];
  let stepNum = 0;

  // Initial state
  steps.push({
    step: ++stepNum,
    token: '',
    tokenType: 'end',
    action: 'Start — prefix expression loaded (scanning right to left)',
    actionType: 'initial',
    stack: [...stack],
    output: [],
    highlightedStackIndices: [],
    justPushed: false,
    justPopped: null,
  });

  // Process tokens from right to left
  for (let i = tokens.length - 1; i >= 0; i--) {
    const token = tokens[i];

    if (token.type === 'operand') {
      stack.push(token.value);
      steps.push({
        step: ++stepNum,
        token: token.value,
        tokenType: 'operand',
        action: `Push operand "${token.value}" onto stack`,
        actionType: 'push_operand',
        stack: [...stack],
        output: [],
        highlightedStackIndices: [stack.length - 1],
        justPushed: true,
        justPopped: null,
      });
    } else if (isOperator(token.value)) {
      if (stack.length < 2) {
        return {
          success: false,
          result: '',
          steps,
          error: `Not enough operands for operator "${token.value}".`,
        };
      }

      const operand1 = stack.pop()!;
      const operand2 = stack.pop()!;
      const combined = `(${operand1} ${token.value} ${operand2})`;

      steps.push({
        step: ++stepNum,
        token: token.value,
        tokenType: 'operator',
        action: `Pop "${operand1}" and "${operand2}", combine as "${combined}"`,
        actionType: 'pop_operands_apply_operator',
        stack: [...stack],
        output: [],
        highlightedStackIndices: [],
        justPushed: false,
        justPopped: operand1,
      });

      stack.push(combined);
      steps.push({
        step: ++stepNum,
        token: token.value,
        tokenType: 'operator',
        action: `Push result "${combined}" onto stack`,
        actionType: 'combine_expression',
        stack: [...stack],
        output: [],
        highlightedStackIndices: [stack.length - 1],
        justPushed: true,
        justPopped: null,
      });
    }
  }

  const result = stack.length === 1 ? stack[0] : '';

  steps.push({
    step: ++stepNum,
    token: '',
    tokenType: 'end',
    action: 'Conversion complete',
    actionType: 'complete',
    stack: [...stack],
    output: [result],
    highlightedStackIndices: [],
    justPushed: false,
    justPopped: null,
  });

  return {
    success: true,
    result,
    steps,
  };
}
