/**
 * Infix → Postfix conversion using the Shunting-Yard algorithm
 * Generates step-by-step state snapshots for visualization.
 */
import type { AlgorithmStep, ConversionResult } from './types';
import { tokenizeExpression } from './tokenizer';
import { validateInfix } from './validators';
import { isOperator, getPrecedence, getAssociativity } from './operators';

export function infixToPostfix(expression: string): ConversionResult {
  const validation = validateInfix(expression);
  if (!validation.valid) {
    return { success: false, result: '', steps: [], error: validation.error };
  }

  const tokens = tokenizeExpression(expression);
  const stack: string[] = [];
  const output: string[] = [];
  const steps: AlgorithmStep[] = [];
  let stepNum = 0;

  // Initial state
  steps.push({
    step: ++stepNum,
    token: '',
    tokenType: 'end',
    action: 'Start — expression loaded',
    actionType: 'initial',
    stack: [...stack],
    output: [...output],
    highlightedStackIndices: [],
    justPushed: false,
    justPopped: null,
  });

  for (const token of tokens) {
    if (token.type === 'operand') {
      // Operands go directly to output
      output.push(token.value);
      steps.push({
        step: ++stepNum,
        token: token.value,
        tokenType: 'operand',
        action: `Output operand "${token.value}"`,
        actionType: 'output_operand',
        stack: [...stack],
        output: [...output],
        highlightedStackIndices: [],
        justPushed: false,
        justPopped: null,
      });
    } else if (token.type === 'left_paren') {
      // Push '(' onto stack
      stack.push(token.value);
      steps.push({
        step: ++stepNum,
        token: token.value,
        tokenType: 'left_paren',
        action: 'Push "(" onto stack',
        actionType: 'push_left_paren',
        stack: [...stack],
        output: [...output],
        highlightedStackIndices: [stack.length - 1],
        justPushed: true,
        justPopped: null,
      });
    } else if (token.type === 'right_paren') {
      // Pop until '(' found
      let foundParen = false;
      while (stack.length > 0) {
        const top = stack[stack.length - 1];
        if (top === '(') {
          stack.pop();
          foundParen = true;
          steps.push({
            step: ++stepNum,
            token: token.value,
            tokenType: 'right_paren',
            action: 'Discard matching "(" from stack',
            actionType: 'discard_left_paren',
            stack: [...stack],
            output: [...output],
            highlightedStackIndices: [],
            justPushed: false,
            justPopped: '(',
          });
          break;
        }
        const popped = stack.pop()!;
        output.push(popped);
        steps.push({
          step: ++stepNum,
          token: token.value,
          tokenType: 'right_paren',
          action: `Pop "${popped}" to output (clearing until "(")`,
          actionType: 'pop_until_left_paren',
          stack: [...stack],
          output: [...output],
          highlightedStackIndices: stack.length > 0 ? [stack.length - 1] : [],
          justPushed: false,
          justPopped: popped,
        });
      }
      if (!foundParen) {
        return {
          success: false,
          result: '',
          steps,
          error: 'Mismatched parentheses.',
        };
      }
    } else if (token.type === 'operator') {
      // Pop operators with higher (or equal for left-assoc) precedence
      while (stack.length > 0) {
        const top = stack[stack.length - 1];
        if (!isOperator(top)) break;

        const topPrec = getPrecedence(top);
        const curPrec = getPrecedence(token.value);
        const curAssoc = getAssociativity(token.value);

        const shouldPop =
          topPrec > curPrec ||
          (topPrec === curPrec && curAssoc === 'left');

        if (!shouldPop) break;

        const popped = stack.pop()!;
        output.push(popped);
        steps.push({
          step: ++stepNum,
          token: token.value,
          tokenType: 'operator',
          action: `Pop "${popped}" to output (precedence ${topPrec} >= ${curPrec})`,
          actionType: 'pop_higher_precedence',
          stack: [...stack],
          output: [...output],
          highlightedStackIndices: stack.length > 0 ? [stack.length - 1] : [],
          justPushed: false,
          justPopped: popped,
        });
      }

      // Push current operator
      stack.push(token.value);
      steps.push({
        step: ++stepNum,
        token: token.value,
        tokenType: 'operator',
        action: `Push "${token.value}" onto stack`,
        actionType: 'push_operator',
        stack: [...stack],
        output: [...output],
        highlightedStackIndices: [stack.length - 1],
        justPushed: true,
        justPopped: null,
      });
    }
  }

  // Pop remaining operators
  while (stack.length > 0) {
    const popped = stack.pop()!;
    if (popped === '(') {
      return {
        success: false,
        result: '',
        steps,
        error: 'Mismatched parentheses.',
      };
    }
    output.push(popped);
    steps.push({
      step: ++stepNum,
      token: 'END',
      tokenType: 'end',
      action: `Pop remaining "${popped}" to output`,
      actionType: 'pop_remaining',
      stack: [...stack],
      output: [...output],
      highlightedStackIndices: stack.length > 0 ? [stack.length - 1] : [],
      justPushed: false,
      justPopped: popped,
    });
  }

  // Final complete step
  steps.push({
    step: ++stepNum,
    token: '',
    tokenType: 'end',
    action: 'Conversion complete',
    actionType: 'complete',
    stack: [],
    output: [...output],
    highlightedStackIndices: [],
    justPushed: false,
    justPopped: null,
  });

  return {
    success: true,
    result: output.join(' '),
    steps,
  };
}
