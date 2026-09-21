import { motion } from 'framer-motion';
import {
  SkipBack,
  SkipForward,
  Play,
  Pause,
  RotateCcw,
} from 'lucide-react';
import type { PlaybackSpeed } from '../../hooks/useAlgorithmPlayer';

interface AlgorithmControlsProps {
  isPlaying: boolean;
  isComplete: boolean;
  hasSteps: boolean;
  currentStepIndex: number;
  totalSteps: number;
  speed: PlaybackSpeed;
  onPlay: () => void;
  onPause: () => void;
  onNext: () => void;
  onPrev: () => void;
  onReset: () => void;
  onSpeedChange: (speed: PlaybackSpeed) => void;
}

const SPEEDS: PlaybackSpeed[] = [0.5, 1, 1.5, 2];

export function AlgorithmControls({
  isPlaying,
  isComplete,
  hasSteps,
  currentStepIndex,
  totalSteps,
  speed,
  onPlay,
  onPause,
  onNext,
  onPrev,
  onReset,
  onSpeedChange,
}: AlgorithmControlsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col gap-3 p-4 rounded-xl border border-border-subtle bg-bg-surface"
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-mono uppercase tracking-wider text-text-muted">
          Controls
        </span>
        <div className="flex items-center gap-1">
          <span className="text-[10px] font-mono text-text-muted mr-1">
            Speed
          </span>
          {SPEEDS.map((s) => (
            <button
              key={s}
              onClick={() => onSpeedChange(s)}
              className={`px-1.5 py-0.5 text-[10px] font-mono rounded transition-all ${
                speed === s
                  ? 'bg-accent/20 text-accent border border-accent/30'
                  : 'text-text-muted hover:text-text-secondary border border-transparent'
              }`}
              aria-label={`Set speed to ${s}x`}
            >
              {s}x
            </button>
          ))}
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-full h-1 bg-bg-primary rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-accent rounded-full"
          animate={{
            width: totalSteps > 0
              ? `${((currentStepIndex + 1) / totalSteps) * 100}%`
              : '0%',
          }}
          transition={{ duration: 0.2 }}
        />
      </div>

      {/* Control buttons */}
      <div className="flex items-center justify-center gap-2">
        <button
          onClick={onReset}
          disabled={!hasSteps}
          className="p-2 text-text-secondary hover:text-text-primary hover:bg-bg-hover rounded-lg transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          aria-label="Reset"
          title="Reset (R)"
        >
          <RotateCcw className="w-4 h-4" />
        </button>

        <button
          onClick={onPrev}
          disabled={!hasSteps || currentStepIndex <= 0}
          className="p-2 text-text-secondary hover:text-text-primary hover:bg-bg-hover rounded-lg transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          aria-label="Previous step"
          title="Previous (←)"
        >
          <SkipBack className="w-4 h-4" />
        </button>

        <button
          onClick={isPlaying ? onPause : onPlay}
          disabled={!hasSteps}
          className="p-3 text-text-inverse bg-accent hover:bg-accent-hover rounded-xl transition-all disabled:opacity-30 disabled:cursor-not-allowed active:scale-95 shadow-lg shadow-accent/20"
          aria-label={isPlaying ? 'Pause' : 'Play'}
          title="Play/Pause (Space)"
        >
          {isPlaying ? (
            <Pause className="w-5 h-5" />
          ) : (
            <Play className="w-5 h-5" />
          )}
        </button>

        <button
          onClick={onNext}
          disabled={!hasSteps || isComplete}
          className="p-2 text-text-secondary hover:text-text-primary hover:bg-bg-hover rounded-lg transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          aria-label="Next step"
          title="Next (→)"
        >
          <SkipForward className="w-4 h-4" />
        </button>
      </div>

      {/* Keyboard hint */}
      <div className="flex items-center justify-center gap-3 text-[10px] text-text-muted">
        <span>
          <kbd className="px-1 py-0.5 border border-border-subtle rounded text-[9px]">Space</kbd> Play
        </span>
        <span>
          <kbd className="px-1 py-0.5 border border-border-subtle rounded text-[9px]">←</kbd>
          <kbd className="px-1 py-0.5 border border-border-subtle rounded text-[9px] ml-0.5">→</kbd> Step
        </span>
        <span>
          <kbd className="px-1 py-0.5 border border-border-subtle rounded text-[9px]">R</kbd> Reset
        </span>
      </div>
    </motion.div>
  );
}
