import { useState, useCallback } from 'react';
import { ConversionWorkspace } from '../components/workspace/ConversionWorkspace';
import {
  validatePostfix,
  validatePrefix,
  postfixToInfix,
  prefixToInfix,
} from '../engine';
import type { ConversionResult, ValidationResult } from '../engine/types';

const POSTFIX_EXAMPLES = [
  'AB+C*',
  'ABC*+',
  'AB+CD-*',
  'ABC+*D-',
  'AB*CD/+',
];

const PREFIX_EXAMPLES = [
  '+AB',
  '*+ABC',
  '-*+ABCD',
  '+A*B-CD',
  '+*AB/CD',
];

type SourceType = 'postfix' | 'prefix';

export function InfixPage() {
  const [sourceType, setSourceType] = useState<SourceType>('postfix');

  const validate = useCallback(
    (expression: string): ValidationResult => {
      return sourceType === 'postfix'
        ? validatePostfix(expression)
        : validatePrefix(expression);
    },
    [sourceType]
  );

  const convert = useCallback(
    (expression: string): ConversionResult => {
      return sourceType === 'postfix'
        ? postfixToInfix(expression)
        : prefixToInfix(expression);
    },
    [sourceType]
  );

  return (
    <div>
      {/* Source type selector */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 sm:pt-12">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xs font-mono uppercase tracking-wider text-text-muted">
            Source
          </span>
          <div className="flex items-center gap-1 p-0.5 rounded-lg bg-bg-surface border border-border-subtle">
            {(['postfix', 'prefix'] as const).map((type) => (
              <button
                key={type}
                onClick={() => setSourceType(type)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                  sourceType === type
                    ? 'bg-accent text-text-inverse'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>
          <span className="text-xs text-text-muted">→ Infix</span>
        </div>
      </div>

      <ConversionWorkspace
        title="Expression → Infix"
        description={`Convert ${sourceType} expressions to infix notation. Watch the stack reconstruct the parenthesized expression step by step.`}
        sourceType={sourceType.charAt(0).toUpperCase() + sourceType.slice(1)}
        targetType="Infix"
        examples={sourceType === 'postfix' ? POSTFIX_EXAMPLES : PREFIX_EXAMPLES}
        validate={validate}
        convert={convert}
        showPrecedenceTable={false}
      />
    </div>
  );
}
