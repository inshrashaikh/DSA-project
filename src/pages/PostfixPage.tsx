import { ConversionWorkspace } from '../components/workspace/ConversionWorkspace';
import { validateInfix, infixToPostfix } from '../engine';

const EXAMPLES = [
  'A+B*C',
  '(A+B)*C',
  'A*(B+C)-D',
  'A+B*(C-D)',
  '((A+B)*C-D)*E',
  'A^B^C',
  'A+B*C/D-E',
];

export function PostfixPage() {
  return (
    <ConversionWorkspace
      title="Expression → Postfix"
      description="Convert infix expressions to postfix notation using the Shunting-Yard algorithm. Watch the stack resolve operator precedence step by step."
      sourceType="Infix"
      targetType="Postfix"
      examples={EXAMPLES}
      validate={validateInfix}
      convert={infixToPostfix}
      showPrecedenceTable={true}
    />
  );
}
