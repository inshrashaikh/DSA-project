import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check } from 'lucide-react';
import type { AlgorithmStep } from '../../engine/types';

interface OutputPanelProps {
  currentStep: AlgorithmStep | null;
  finalResult: string | null;
  isComplete: boolean;
}

export function OutputPanel({
  currentStep,
  finalResult,
  isComplete,
}: OutputPanelProps) {
  const [copied, setCopied] = useState(false);

  const output = currentStep?.output ?? [];

  const handleCopy = useCallback(async () => {
    if (finalResult) {
      await navigator.clipboard.writeText(finalResult);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [finalResult]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col gap-3 p-4 rounded-xl border border-border-subtle bg-bg-surface"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-mono uppercase tracking-wider text-text-muted">
          Output
        </span>
        {isComplete && finalResult && (
          <button
            onClick={handleCopy}
            className="flex items-center gap-1 px-2 py-1 text-[10px] font-mono text-text-muted hover:text-text-primary bg-bg-primary hover:bg-bg-hover border border-border-subtle rounded-md transition-all"
            aria-label="Copy result"
          >
            {copied ? (
              <>
                <Check className="w-3 h-3 text-success" />
                <span className="text-success">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3 h-3" />
                <span>Copy</span>
              </>
            )}
          </button>
        )}
      </div>

      {/* Current output tokens */}
      <div className="flex flex-wrap gap-1 min-h-[40px] p-3 rounded-lg bg-bg-primary border border-border-subtle">
        <AnimatePresence mode="popLayout">
          {output.length === 0 ? (
            <motion.span
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              className="text-xs font-mono text-text-muted"
            >
              waiting...
            </motion.span>
          ) : (
            output.map((item, i) => (
              <motion.span
                key={`${i}-${item}`}
                initial={{ opacity: 0, scale: 0.8, y: 5 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 0.02 * i }}
                className="px-2 py-1 text-sm font-mono font-medium text-success bg-success/10 border border-success/20 rounded"
              >
                {item}
              </motion.span>
            ))
          )}
        </AnimatePresence>
      </div>

      {/* Final result */}
      {isComplete && finalResult && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="flex flex-col gap-2 pt-2 border-t border-border-subtle"
        >
          <span className="text-[10px] font-mono uppercase tracking-wider text-text-muted">
            Final Result
          </span>
          <div className="px-4 py-3 rounded-lg bg-accent/5 border border-accent/20">
            <p className="font-mono text-lg font-bold text-accent text-center break-all">
              {finalResult}
            </p>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
