/**
 * useAlgorithmPlayer — State machine for controlling step-by-step algorithm playback
 */
import { useState, useCallback, useRef, useEffect } from 'react';
import type { AlgorithmStep } from '../engine/types';

export type PlaybackSpeed = 0.5 | 1 | 1.5 | 2;

interface AlgorithmPlayerState {
  steps: AlgorithmStep[];
  currentStepIndex: number;
  isPlaying: boolean;
  speed: PlaybackSpeed;
  isComplete: boolean;
}

interface AlgorithmPlayerActions {
  loadSteps: (steps: AlgorithmStep[]) => void;
  play: () => void;
  pause: () => void;
  togglePlayPause: () => void;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (index: number) => void;
  reset: () => void;
  setSpeed: (speed: PlaybackSpeed) => void;
  clear: () => void;
}

export type AlgorithmPlayer = AlgorithmPlayerState & AlgorithmPlayerActions;

const BASE_INTERVAL = 1200; // ms

export function useAlgorithmPlayer(): AlgorithmPlayer {
  const [steps, setSteps] = useState<AlgorithmStep[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeedState] = useState<PlaybackSpeed>(1);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const totalSteps = steps.length;
  const isComplete = currentStepIndex >= totalSteps - 1 && totalSteps > 0;

  // Clear interval helper
  const clearPlayInterval = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  // Auto-advance when playing
  useEffect(() => {
    if (isPlaying && !isComplete) {
      const interval = BASE_INTERVAL / speed;
      intervalRef.current = setInterval(() => {
        setCurrentStepIndex((prev) => {
          if (prev >= totalSteps - 1) {
            setIsPlaying(false);
            clearPlayInterval();
            return prev;
          }
          return prev + 1;
        });
      }, interval);
    } else {
      clearPlayInterval();
      if (isComplete) {
        setIsPlaying(false);
      }
    }
    return clearPlayInterval;
  }, [isPlaying, speed, isComplete, totalSteps, clearPlayInterval]);

  const loadSteps = useCallback((newSteps: AlgorithmStep[]) => {
    clearPlayInterval();
    setSteps(newSteps);
    setCurrentStepIndex(0);
    setIsPlaying(false);
  }, [clearPlayInterval]);

  const play = useCallback(() => {
    if (currentStepIndex >= totalSteps - 1 && totalSteps > 0) {
      // Restart from beginning
      setCurrentStepIndex(0);
    }
    setIsPlaying(true);
  }, [currentStepIndex, totalSteps]);

  const pause = useCallback(() => {
    setIsPlaying(false);
  }, []);

  const togglePlayPause = useCallback(() => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  }, [isPlaying, play, pause]);

  const nextStep = useCallback(() => {
    setIsPlaying(false);
    setCurrentStepIndex((prev) => Math.min(prev + 1, totalSteps - 1));
  }, [totalSteps]);

  const prevStep = useCallback(() => {
    setIsPlaying(false);
    setCurrentStepIndex((prev) => Math.max(prev - 1, 0));
  }, []);

  const goToStep = useCallback((index: number) => {
    setIsPlaying(false);
    setCurrentStepIndex(Math.max(0, Math.min(index, totalSteps - 1)));
  }, [totalSteps]);

  const reset = useCallback(() => {
    setIsPlaying(false);
    setCurrentStepIndex(0);
  }, []);

  const setSpeed = useCallback((newSpeed: PlaybackSpeed) => {
    setSpeedState(newSpeed);
  }, []);

  const clear = useCallback(() => {
    clearPlayInterval();
    setSteps([]);
    setCurrentStepIndex(0);
    setIsPlaying(false);
  }, [clearPlayInterval]);

  return {
    steps,
    currentStepIndex,
    isPlaying,
    speed,
    isComplete,
    loadSteps,
    play,
    pause,
    togglePlayPause,
    nextStep,
    prevStep,
    goToStep,
    reset,
    setSpeed,
    clear,
  };
}
