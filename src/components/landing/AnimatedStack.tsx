import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface FloatingToken {
  id: number;
  value: string;
  x: number;
  y: number;
  delay: number;
  duration: number;
}

const DEMO_TOKENS = ['A', 'B', '+', '*', 'C', '(', ')', '-', 'D', '^'];

export function AnimatedStack() {
  const [floatingTokens] = useState<FloatingToken[]>(() =>
    DEMO_TOKENS.map((value, i) => ({
      id: i,
      value,
      x: 15 + Math.random() * 70,
      y: 10 + Math.random() * 80,
      delay: i * 0.3,
      duration: 4 + Math.random() * 3,
    }))
  );

  const [stackItems, setStackItems] = useState<string[]>([]);
  const stackSequences = [
    ['+'],
    ['+', '*'],
    ['+', '*', '-'],
    ['+', '*'],
    ['+'],
    [],
    ['^'],
    ['^', '+'],
    ['^', '+', '*'],
    ['^', '+'],
    ['^'],
    [],
  ];

  useEffect(() => {
    let idx = 0;
    const interval = setInterval(() => {
      setStackItems(stackSequences[idx % stackSequences.length]);
      idx++;
    }, 1800);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="relative w-full h-[340px] sm:h-[380px] overflow-hidden rounded-xl border border-border-subtle bg-bg-secondary">
      {/* Grid background */}
      <div className="absolute inset-0 grid-bg opacity-60" />

      {/* Radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--color-accent-muted)_0%,_transparent_70%)] opacity-40" />

      {/* Floating tokens */}
      {floatingTokens.map((token) => (
        <motion.div
          key={token.id}
          className="absolute"
          style={{ left: `${token.x}%`, top: `${token.y}%` }}
          animate={{
            y: [0, -12, 0, 12, 0],
            opacity: [0.15, 0.35, 0.15],
          }}
          transition={{
            duration: token.duration,
            delay: token.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <span className="text-xs font-mono text-accent/40 select-none">
            {token.value}
          </span>
        </motion.div>
      ))}

      {/* Center stack visualization */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex flex-col items-center gap-6">
          {/* Output area */}
          <div className="flex flex-col items-center gap-1.5">
            <span className="text-[10px] font-mono uppercase tracking-wider text-text-muted">
              Output
            </span>
            <motion.div
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg border border-border-subtle bg-bg-surface/50"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              {['A', 'B', 'C'].map((char, i) => (
                <motion.span
                  key={char}
                  className="font-mono text-sm text-success"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.2 }}
                >
                  {char}
                </motion.span>
              ))}
            </motion.div>
          </div>

          {/* Stack */}
          <div className="flex flex-col items-center gap-1.5">
            <span className="text-[10px] font-mono uppercase tracking-wider text-text-muted">
              Stack
            </span>
            <div className="relative min-h-[120px] flex flex-col-reverse items-center gap-1">
              {stackItems.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.4 }}
                  className="px-8 py-2 border border-dashed border-border-subtle rounded-md"
                >
                  <span className="text-xs font-mono text-text-muted">
                    empty
                  </span>
                </motion.div>
              )}
              {stackItems.map((item, i) => (
                <motion.div
                  key={`${item}-${i}`}
                  initial={{ opacity: 0, y: -20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.9 }}
                  transition={{
                    type: 'spring',
                    stiffness: 400,
                    damping: 25,
                    delay: i * 0.05,
                  }}
                  className={`
                    px-6 py-2 rounded-md border font-mono text-sm font-medium
                    ${
                      i === stackItems.length - 1
                        ? 'border-accent/40 bg-accent/10 text-accent glow-accent'
                        : 'border-border-default bg-bg-elevated text-text-primary'
                    }
                  `}
                >
                  {item}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
