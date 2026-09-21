import { motion } from 'framer-motion';
import type { AlgorithmStep } from '../../engine/types';

interface TokenDisplayProps {
  currentStep: AlgorithmStep | null;
  totalSteps: number;
  currentStepIndex: number;
}

export function TokenDisplay({
  currentStep,
  totalSteps,
  currentStepIndex,
}: TokenDisplayProps) {
  if (!currentStep) return null;

  const getActionColor = () => {
    switch (currentStep.actionType) {
      case 'output_operand':
      case 'push_operand':
        return 'text-success';
      case 'push_operator':
      case 'push_left_paren':
        return 'text-accent';
      case 'pop_higher_precedence':
      case 'pop_until_left_paren':
      case 'pop_remaining':
      case 'pop_operands_apply_operator':
        return 'text-warning';
      case 'discard_left_paren':
        return 'text-text-secondary';
      case 'combine_expression':
        return 'text-info';
      case 'complete':
        return 'text-success';
      default:
        return 'text-text-secondary';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col gap-3 p-4 rounded-xl border border-border-subtle bg-bg-surface"
    >
      {/* Step counter */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-mono uppercase tracking-wider text-text-muted">
          Current Step
        </span>
        <span className="text-xs font-mono text-text-muted">
          {String(currentStepIndex + 1).padStart(2, '0')} / {String(totalSteps).padStart(2, '0')}
        </span>
      </div>

      {/* Token */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono uppercase tracking-wider text-text-muted w-12">
            Token
          </span>
          <motion.div
            key={`${currentStepIndex}-token`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`
              px-3 py-1.5 rounded-md font-mono text-sm font-semibold border
              ${
                currentStep.tokenType === 'operator'
                  ? 'border-accent/30 bg-accent/10 text-accent'
                  : currentStep.tokenType === 'operand'
                  ? 'border-success/30 bg-success/10 text-success'
                  : currentStep.tokenType === 'left_paren' || currentStep.tokenType === 'right_paren'
                  ? 'border-warning/30 bg-warning/10 text-warning'
                  : 'border-border-default bg-bg-elevated text-text-secondary'
              }
            `}
          >
            {currentStep.token || '—'}
          </motion.div>
        </div>
      </div>

      {/* Action */}
      <div className="flex flex-col gap-1">
        <span className="text-[10px] font-mono uppercase tracking-wider text-text-muted">
          Action
        </span>
        <motion.p
          key={`${currentStepIndex}-action`}
          initial={{ opacity: 0, x: -5 }}
          animate={{ opacity: 1, x: 0 }}
          className={`text-sm leading-relaxed ${getActionColor()}`}
        >
          {currentStep.action}
        </motion.p>
      </div>
    </motion.div>
  );
}
