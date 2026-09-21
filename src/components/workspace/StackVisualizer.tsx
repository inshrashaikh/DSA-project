import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp, Layers } from 'lucide-react';
import { StackItem } from './StackItem';
import type { AlgorithmStep } from '../../engine/types';

interface StackVisualizerProps {
  currentStep: AlgorithmStep | null;
}

export function StackVisualizer({ currentStep }: StackVisualizerProps) {
  const stack = currentStep?.stack ?? [];
  const highlightedIndices = currentStep?.highlightedStackIndices ?? [];
  const justPushed = currentStep?.justPushed ?? false;
  const justPopped = currentStep?.justPopped ?? null;

  return (
    <div className="flex flex-col gap-3 p-5 rounded-xl border border-border-default bg-bg-surface flex-1 min-h-[280px]">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-2 h-2 rounded-full bg-accent" style={{
            boxShadow: stack.length > 0 ? '0 0 8px var(--color-accent-glow)' : 'none',
          }} />
          <span className="text-xs font-semibold uppercase tracking-wider text-text-secondary">
            Stack
          </span>
        </div>
        <span className="text-[11px] font-mono text-text-muted tabular-nums">
          {stack.length} item{stack.length !== 1 ? 's' : ''}
        </span>
      </div>

      {/* Stack container — ALWAYS visible */}
      <div className="flex-1 flex flex-col items-center justify-end relative rounded-lg bg-bg-inset border border-border-subtle p-4">
        {/* Top indicator */}
        <AnimatePresence>
          {stack.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 5 }}
              className="flex items-center gap-1.5 mb-3 text-[10px] font-mono font-semibold uppercase tracking-widest text-accent/70"
            >
              <ArrowUp className="w-3 h-3" />
              <span>top</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Popped element indicator */}
        <AnimatePresence>
          {justPopped && (
            <motion.div
              initial={{ opacity: 1, y: 0 }}
              animate={{ opacity: 0, y: -24 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="absolute top-3 px-3 py-1 rounded-md border border-error/30 bg-error/10 text-error font-mono text-xs font-medium"
            >
              {justPopped} ↑ popped
            </motion.div>
          )}
        </AnimatePresence>

        {/* Stack items (rendered bottom to top) */}
        <div className="flex flex-col-reverse items-center gap-1.5 w-full max-w-[200px]">
          <AnimatePresence mode="popLayout">
            {stack.length === 0 ? (
              <motion.div
                key="empty-stack"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col items-center justify-center w-full py-10 border border-dashed border-border-default rounded-lg"
              >
                <Layers className="w-5 h-5 text-text-muted/30 mb-2" />
                <span className="text-xs font-mono text-text-muted">
                  empty
                </span>
              </motion.div>
            ) : (
              stack.map((item, i) => (
                <StackItem
                  key={`${i}-${item}`}
                  value={item}
                  isTop={i === stack.length - 1}
                  isHighlighted={highlightedIndices.includes(i)}
                  justPushed={justPushed && i === stack.length - 1}
                />
              ))
            )}
          </AnimatePresence>
        </div>

        {/* Base platform */}
        <div className="w-full max-w-[200px] mt-3 flex flex-col items-center">
          <div className="w-full h-[2px] rounded-full bg-border-strong" />
          <span className="text-[9px] font-mono font-medium uppercase tracking-widest text-text-muted mt-1.5">
            bottom
          </span>
        </div>
      </div>
    </div>
  );
}
