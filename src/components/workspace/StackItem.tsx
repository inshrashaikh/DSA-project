import { motion } from 'framer-motion';

interface StackItemProps {
  value: string;
  isTop: boolean;
  isHighlighted: boolean;
  justPushed: boolean;
}

export function StackItem({
  value,
  isTop,
  isHighlighted,
  justPushed,
}: StackItemProps) {
  const isParenthesis = value === '(' || value === ')';

  return (
    <motion.div
      layout
      initial={justPushed ? { opacity: 0, y: -24, scale: 0.85 } : { opacity: 1, y: 0, scale: 1 }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      exit={{ opacity: 0, x: 36, scale: 0.85 }}
      transition={{
        type: 'spring',
        stiffness: 450,
        damping: 28,
      }}
      className={`
        relative flex items-center justify-center w-full min-w-[64px] px-5 py-3
        font-mono text-sm font-bold rounded-lg border transition-colors duration-150
        ${
          isHighlighted
            ? 'border-stack-highlight/50 bg-stack-highlight/12 text-stack-highlight shadow-[0_0_14px_rgba(34,211,238,0.15)]'
            : isTop
            ? 'border-accent/35 bg-accent/10 text-accent shadow-[0_0_14px_var(--color-accent-glow)]'
            : isParenthesis
            ? 'border-stack-paren/25 bg-stack-paren/8 text-stack-paren'
            : 'border-border-strong bg-bg-elevated text-text-primary'
        }
      `}
    >
      {value}
      {isTop && (
        <motion.div
          className="absolute -right-1.5 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-accent"
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
        />
      )}
    </motion.div>
  );
}
