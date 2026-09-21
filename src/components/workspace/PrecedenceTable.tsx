import { motion } from 'framer-motion';

export function PrecedenceTable() {
  // Group operators by precedence
  const groups = [
    { prec: 3, ops: ['^'], assoc: 'Right' },
    { prec: 2, ops: ['*', '/', '%'], assoc: 'Left' },
    { prec: 1, ops: ['+', '-'], assoc: 'Left' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col gap-3 p-4 rounded-xl border border-border-subtle bg-bg-surface"
    >
      <span className="text-xs font-mono uppercase tracking-wider text-text-muted">
        Operator Precedence
      </span>

      <div className="space-y-1">
        {/* Header */}
        <div className="grid grid-cols-3 gap-2 px-2 py-1 text-[10px] font-mono uppercase tracking-wider text-text-muted">
          <span>Operator</span>
          <span className="text-center">Prec</span>
          <span className="text-right">Assoc</span>
        </div>

        {/* Rows */}
        {groups.map((group) => (
          <div
            key={group.prec}
            className="grid grid-cols-3 gap-2 px-2 py-1.5 rounded-md border border-border-subtle bg-bg-primary text-xs"
          >
            <div className="flex items-center gap-1 font-mono">
              {group.ops.map((op) => (
                <span
                  key={op}
                  className="px-1.5 py-0.5 rounded bg-bg-elevated text-accent text-xs font-semibold"
                >
                  {op}
                </span>
              ))}
            </div>
            <span className="text-center font-mono text-text-secondary">
              {group.prec}
            </span>
            <span className="text-right text-text-secondary">
              {group.assoc}
            </span>
          </div>
        ))}
      </div>

      <p className="text-[10px] text-text-muted leading-relaxed">
        Higher precedence = evaluated first.
        Left-associative operators evaluate left-to-right.
      </p>
    </motion.div>
  );
}
