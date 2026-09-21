import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Play, RotateCcw, AlertCircle, Sparkles } from 'lucide-react';

interface ExpressionInputProps {
  onConvert: (expression: string) => void;
  onClear: () => void;
  sourceType: string;
  targetType: string;
  examples: string[];
  validate: (expression: string) => { valid: boolean; error?: string };
}

export function ExpressionInput({
  onConvert,
  onClear,
  sourceType,
  targetType,
  examples,
  validate,
}: ExpressionInputProps) {
  const [expression, setExpression] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleConvert = useCallback(() => {
    const trimmed = expression.trim();
    if (!trimmed) {
      setError('Please enter an expression.');
      return;
    }
    const result = validate(trimmed);
    if (!result.valid) {
      setError(result.error || 'Invalid expression.');
      return;
    }
    setError(null);
    onConvert(trimmed);
  }, [expression, validate, onConvert]);

  const handleClear = useCallback(() => {
    setExpression('');
    setError(null);
    onClear();
  }, [onClear]);

  const handleLoadExample = useCallback(
    (example: string) => {
      setExpression(example);
      setError(null);
    },
    []
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter') {
        handleConvert();
      }
    },
    [handleConvert]
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col gap-4 p-4 rounded-xl border border-border-subtle bg-bg-surface"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono uppercase tracking-wider text-text-muted">
            {sourceType} → {targetType}
          </span>
        </div>
      </div>

      {/* Input */}
      <div className="relative">
        <input
          type="text"
          value={expression}
          onChange={(e) => {
            setExpression(e.target.value);
            if (error) setError(null);
          }}
          onKeyDown={handleKeyDown}
          placeholder={`Enter ${sourceType} expression...`}
          className="w-full px-4 py-3 text-sm font-mono bg-bg-primary border border-border-default rounded-lg text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition-all"
          aria-label={`${sourceType} expression input`}
          autoComplete="off"
          spellCheck={false}
        />
      </div>

      {/* Error */}
      {error && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="flex items-start gap-2 px-3 py-2 rounded-lg bg-error/10 border border-error/20"
        >
          <AlertCircle className="w-4 h-4 text-error mt-0.5 shrink-0" />
          <span className="text-xs text-error">{error}</span>
        </motion.div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-2">
        <button
          onClick={handleConvert}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-text-inverse bg-accent hover:bg-accent-hover rounded-lg transition-all active:scale-[0.97]"
        >
          <Play className="w-3.5 h-3.5" />
          Convert
        </button>
        <button
          onClick={handleClear}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-text-secondary hover:text-text-primary bg-bg-elevated hover:bg-bg-hover border border-border-subtle rounded-lg transition-all active:scale-[0.97]"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Clear
        </button>
      </div>

      {/* Examples */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-1.5">
          <Sparkles className="w-3 h-3 text-text-muted" />
          <span className="text-[11px] font-mono uppercase tracking-wider text-text-muted">
            Examples
          </span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {examples.map((example) => (
            <button
              key={example}
              onClick={() => handleLoadExample(example)}
              className="px-2.5 py-1 text-xs font-mono text-text-secondary hover:text-accent bg-bg-primary hover:bg-accent/10 border border-border-subtle hover:border-accent/30 rounded-md transition-all"
            >
              {example}
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
