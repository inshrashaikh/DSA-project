import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import type { AlgorithmStep } from '../../engine/types';

interface StepHistoryProps {
  steps: AlgorithmStep[];
  currentStepIndex: number;
  onGoToStep: (index: number) => void;
}

export function StepHistory({
  steps,
  currentStepIndex,
  onGoToStep,
}: StepHistoryProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef<HTMLButtonElement>(null);

  // Auto-scroll to active step
  useEffect(() => {
    if (activeRef.current && scrollRef.current) {
      const container = scrollRef.current;
      const element = activeRef.current;
      const containerTop = container.scrollTop;
      const containerBottom = containerTop + container.clientHeight;
      const elementTop = element.offsetTop - container.offsetTop;
      const elementBottom = elementTop + element.clientHeight;

      if (elementTop < containerTop || elementBottom > containerBottom) {
        element.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      }
    }
  }, [currentStepIndex]);

  if (steps.length === 0) return null;

  const getActionIcon = (step: AlgorithmStep): string => {
    switch (step.actionType) {
      case 'output_operand':
        return '→';
      case 'push_operator':
      case 'push_left_paren':
      case 'push_operand':
        return '↓';
      case 'pop_higher_precedence':
      case 'pop_until_left_paren':
      case 'pop_remaining':
      case 'pop_operands_apply_operator':
        return '↑';
      case 'discard_left_paren':
        return '✕';
      case 'combine_expression':
        return '⊕';
      case 'complete':
        return '✓';
      default:
        return '·';
    }
  };

  const getActionShort = (step: AlgorithmStep): string => {
    switch (step.actionType) {
      case 'output_operand':
        return 'Output operand';
      case 'push_operator':
        return 'Push operator';
      case 'push_left_paren':
        return 'Push (';
      case 'push_operand':
        return 'Push operand';
      case 'pop_higher_precedence':
        return 'Pop higher prec.';
      case 'pop_until_left_paren':
        return 'Pop to (';
      case 'discard_left_paren':
        return 'Discard (';
      case 'pop_remaining':
        return 'Pop remaining';
      case 'pop_operands_apply_operator':
        return 'Apply operator';
      case 'combine_expression':
        return 'Push result';
      case 'complete':
        return 'Done';
      case 'initial':
        return 'Start';
      default:
        return step.actionType;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col gap-3 p-5 rounded-xl border border-border-subtle bg-bg-surface"
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-text-secondary">
          Step History
        </span>
        <span className="text-[11px] font-mono text-text-muted tabular-nums">
          {currentStepIndex + 1} / {steps.length}
        </span>
      </div>

      <div ref={scrollRef} className="max-h-[340px] overflow-y-auto space-y-0.5 -mx-1 px-1">
        {steps.map((step, index) => {
          const isCurrent = index === currentStepIndex;
          const isPast = index < currentStepIndex;

          return (
            <button
              key={step.step}
              ref={isCurrent ? activeRef : undefined}
              onClick={() => onGoToStep(index)}
              className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-left transition-all text-xs group ${
                isCurrent
                  ? 'bg-accent/12 border border-accent/25 shadow-[0_0_8px_var(--color-accent-subtle)]'
                  : isPast
                  ? 'border border-transparent hover:bg-bg-hover'
                  : 'border border-transparent hover:bg-bg-hover'
              }`}
              aria-label={`Go to step ${step.step}`}
            >
              {/* Step number */}
              <span className={`font-mono text-[11px] w-6 text-right shrink-0 tabular-nums font-semibold ${
                isCurrent ? 'text-accent' : isPast ? 'text-text-muted' : 'text-text-dim'
              }`}>
                {String(step.step).padStart(2, '0')}
              </span>

              {/* Action icon */}
              <span className={`w-4 text-center shrink-0 text-[11px] ${
                isCurrent ? 'text-accent' : isPast ? 'text-text-muted' : 'text-text-dim'
              }`}>
                {getActionIcon(step)}
              </span>

              {/* Token */}
              <span className={`font-mono text-[11px] w-6 text-center shrink-0 font-bold ${
                isCurrent
                  ? 'text-accent'
                  : isPast
                  ? 'text-text-secondary'
                  : 'text-text-primary'
              }`}>
                {step.token || '—'}
              </span>

              {/* Action description */}
              <span className={`truncate text-[11px] ${
                isCurrent
                  ? 'text-text-primary font-medium'
                  : isPast
                  ? 'text-text-secondary'
                  : 'text-text-secondary'
              }`}>
                {getActionShort(step)}
              </span>
            </button>
          );
        })}
      </div>
    </motion.div>
  );
}
