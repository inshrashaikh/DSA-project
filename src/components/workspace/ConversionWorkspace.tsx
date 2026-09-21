import { useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExpressionInput } from './ExpressionInput';
import { StackVisualizer } from './StackVisualizer';
import { TokenDisplay } from './TokenDisplay';
import { AlgorithmControls } from './AlgorithmControls';
import { StepHistory } from './StepHistory';
import { OutputPanel } from './OutputPanel';
import { PrecedenceTable } from './PrecedenceTable';
import { useAlgorithmPlayer } from '../../hooks/useAlgorithmPlayer';
import type { ConversionResult, ValidationResult } from '../../engine/types';
import { Layers, ArrowDown } from 'lucide-react';

interface ConversionWorkspaceProps {
  title: string;
  description: string;
  sourceType: string;
  targetType: string;
  examples: string[];
  validate: (expression: string) => ValidationResult;
  convert: (expression: string) => ConversionResult;
  showPrecedenceTable?: boolean;
}

export function ConversionWorkspace({
  title,
  description,
  sourceType,
  targetType,
  examples,
  validate,
  convert,
  showPrecedenceTable = true,
}: ConversionWorkspaceProps) {
  const player = useAlgorithmPlayer();

  const hasSteps = player.steps.length > 0;

  const currentStep = hasSteps
    ? player.steps[player.currentStepIndex]
    : null;

  const lastStep = hasSteps
    ? player.steps[player.steps.length - 1]
    : null;

  const finalResult =
    lastStep?.actionType === 'complete'
      ? lastStep.output.join(' ') || (lastStep.stack.length === 1 ? lastStep.stack[0] : null)
      : null;

  const handleConvert = useCallback(
    (expression: string) => {
      const result = convert(expression);
      if (result.success && result.steps.length > 0) {
        player.loadSteps(result.steps);
      }
    },
    [convert, player]
  );

  const handleClear = useCallback(() => {
    player.clear();
  }, [player]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      switch (e.key) {
        case ' ':
          e.preventDefault();
          player.togglePlayPause();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          player.prevStep();
          break;
        case 'ArrowRight':
          e.preventDefault();
          player.nextStep();
          break;
        case 'r':
        case 'R':
          e.preventDefault();
          player.reset();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [player]);

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Page header */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 sm:mb-10"
      >
        <div className="flex items-center gap-2.5 mb-3">
          <div className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center">
            <Layers className="w-4 h-4 text-accent" />
          </div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-text-primary">
            {title}
          </h1>
        </div>
        <p className="text-sm text-text-secondary max-w-2xl leading-relaxed pl-[42px]">
          {description}
        </p>
      </motion.div>

      {/* Workspace grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-5">
        {/* LEFT COLUMN — Input + Controls + Precedence */}
        <div className="lg:col-span-3 flex flex-col gap-4">
          <ExpressionInput
            onConvert={handleConvert}
            onClear={handleClear}
            sourceType={sourceType}
            targetType={targetType}
            examples={examples}
            validate={validate}
          />

          <AnimatePresence>
            {hasSteps && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex flex-col gap-4"
              >
                <AlgorithmControls
                  isPlaying={player.isPlaying}
                  isComplete={player.isComplete}
                  hasSteps={hasSteps}
                  currentStepIndex={player.currentStepIndex}
                  totalSteps={player.steps.length}
                  speed={player.speed}
                  onPlay={player.play}
                  onPause={player.pause}
                  onNext={player.nextStep}
                  onPrev={player.prevStep}
                  onReset={player.reset}
                  onSpeedChange={player.setSpeed}
                />

                {showPrecedenceTable && <PrecedenceTable />}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* CENTER COLUMN — Token + Stack (ALWAYS visible once steps exist) */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          {hasSteps ? (
            <>
              <TokenDisplay
                currentStep={currentStep}
                totalSteps={player.steps.length}
                currentStepIndex={player.currentStepIndex}
              />

              {/* Stack is ALWAYS rendered — never conditionally removed */}
              <StackVisualizer currentStep={currentStep} />
            </>
          ) : (
            /* Empty state — before any conversion */
            <div className="flex flex-col items-center justify-center h-64 lg:h-full rounded-xl border border-dashed border-border-subtle bg-bg-surface/30">
              <div className="flex flex-col items-center gap-4 px-8 text-center">
                <div className="w-12 h-12 rounded-xl bg-accent/5 border border-accent/10 flex items-center justify-center">
                  <Layers className="w-5 h-5 text-accent/40" />
                </div>
                <div>
                  <p className="text-sm font-medium text-text-secondary mb-1">
                    Enter an expression to visualize
                  </p>
                  <p className="text-xs text-text-muted max-w-[240px]">
                    The stack visualization and step-by-step breakdown will appear here
                  </p>
                </div>
                <ArrowDown className="w-4 h-4 text-text-muted/40 animate-bounce" />
              </div>
            </div>
          )}
        </div>

        {/* RIGHT COLUMN — Output + Step History */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          {hasSteps ? (
            <>
              <OutputPanel
                currentStep={currentStep}
                finalResult={finalResult}
                isComplete={player.isComplete}
              />

              <StepHistory
                steps={player.steps}
                currentStepIndex={player.currentStepIndex}
                onGoToStep={player.goToStep}
              />
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-48 lg:h-full rounded-xl border border-dashed border-border-subtle bg-bg-surface/30">
              <div className="flex flex-col items-center gap-3 px-8 text-center">
                <p className="text-sm font-medium text-text-secondary">
                  Output & step history
                </p>
                <p className="text-xs text-text-muted max-w-[220px]">
                  Results will build up as the algorithm processes each token
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
