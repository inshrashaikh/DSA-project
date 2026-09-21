import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const fadeIn = {
  initial: { opacity: 0, y: 15 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.4 },
};

export function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
      {/* Header */}
      <motion.div {...fadeIn} className="mb-12">
        <span className="text-xs font-mono uppercase tracking-widest text-accent mb-3 block">
          How It Works
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
          Understanding Expression Conversion
        </h1>
        <p className="text-text-secondary max-w-2xl leading-relaxed">
          Learn how stacks power the conversion between infix, postfix, and prefix
          notations — the backbone of how compilers evaluate mathematical expressions.
        </p>
      </motion.div>

      {/* Sections */}
      <div className="space-y-12">
        {/* What is an Expression? */}
        <motion.section {...fadeIn} className="space-y-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-accent/10 text-accent text-xs font-mono flex items-center justify-center border border-accent/20">1</span>
            What is an Expression?
          </h2>
          <div className="pl-9 space-y-3 text-sm text-text-secondary leading-relaxed">
            <p>
              A mathematical expression is a combination of <strong className="text-text-primary">operands</strong> (values like A, B, C)
              and <strong className="text-text-primary">operators</strong> (+, -, *, /, ^) that represents a computation.
            </p>
            <div className="p-4 rounded-lg bg-bg-surface border border-border-subtle font-mono text-sm">
              <span className="text-success">A</span>
              <span className="text-accent"> + </span>
              <span className="text-success">B</span>
              <span className="text-accent"> * </span>
              <span className="text-success">C</span>
              <span className="text-text-muted ml-4">← operands & operators</span>
            </div>
          </div>
        </motion.section>

        {/* Notation Types */}
        <motion.section {...fadeIn} className="space-y-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-accent/10 text-accent text-xs font-mono flex items-center justify-center border border-accent/20">2</span>
            Three Ways to Write Expressions
          </h2>
          <div className="pl-9 space-y-4">
            <div className="grid sm:grid-cols-3 gap-3">
              {[
                {
                  name: 'Infix',
                  example: 'A + B',
                  desc: 'Operator between operands',
                  highlight: 'What humans write',
                },
                {
                  name: 'Postfix',
                  example: 'A B +',
                  desc: 'Operator after operands',
                  highlight: 'What computers prefer',
                },
                {
                  name: 'Prefix',
                  example: '+ A B',
                  desc: 'Operator before operands',
                  highlight: 'Also called Polish notation',
                },
              ].map((notation) => (
                <div
                  key={notation.name}
                  className="p-4 rounded-lg border border-border-subtle bg-bg-surface space-y-2"
                >
                  <h3 className="text-sm font-semibold text-text-primary">
                    {notation.name}
                  </h3>
                  <div className="font-mono text-lg text-accent">
                    {notation.example}
                  </div>
                  <p className="text-xs text-text-secondary">{notation.desc}</p>
                  <span className="inline-block text-[10px] font-mono text-text-muted bg-bg-primary px-2 py-0.5 rounded">
                    {notation.highlight}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Why Stacks? */}
        <motion.section {...fadeIn} className="space-y-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-accent/10 text-accent text-xs font-mono flex items-center justify-center border border-accent/20">3</span>
            Why Stacks?
          </h2>
          <div className="pl-9 space-y-3 text-sm text-text-secondary leading-relaxed">
            <p>
              A <strong className="text-text-primary">stack</strong> is a Last-In-First-Out (LIFO) data structure.
              It's perfect for expression conversion because:
            </p>
            <ul className="space-y-2 list-none">
              {[
                'Operators need to be held temporarily until their operands are processed',
                'Parentheses create nested scopes that naturally map to push/pop operations',
                'Operator precedence requires comparing the current operator with previously seen ones',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </motion.section>

        {/* Operator Precedence */}
        <motion.section {...fadeIn} className="space-y-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-accent/10 text-accent text-xs font-mono flex items-center justify-center border border-accent/20">4</span>
            Operator Precedence & Associativity
          </h2>
          <div className="pl-9 space-y-3">
            <p className="text-sm text-text-secondary leading-relaxed">
              Precedence determines evaluation order. Associativity resolves ties.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="text-xs font-mono uppercase tracking-wider text-text-muted border-b border-border-subtle">
                    <th className="text-left py-2 pr-4">Operator</th>
                    <th className="text-center py-2 px-4">Precedence</th>
                    <th className="text-right py-2 pl-4">Associativity</th>
                  </tr>
                </thead>
                <tbody className="text-text-secondary">
                  <tr className="border-b border-border-subtle">
                    <td className="py-2 pr-4 font-mono text-accent">^</td>
                    <td className="py-2 px-4 text-center">3 (highest)</td>
                    <td className="py-2 pl-4 text-right">Right →</td>
                  </tr>
                  <tr className="border-b border-border-subtle">
                    <td className="py-2 pr-4 font-mono text-accent">* / %</td>
                    <td className="py-2 px-4 text-center">2</td>
                    <td className="py-2 pl-4 text-right">← Left</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 font-mono text-accent">+ -</td>
                    <td className="py-2 px-4 text-center">1 (lowest)</td>
                    <td className="py-2 pl-4 text-right">← Left</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </motion.section>

        {/* How Infix → Postfix Works */}
        <motion.section {...fadeIn} className="space-y-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-accent/10 text-accent text-xs font-mono flex items-center justify-center border border-accent/20">5</span>
            How Infix → Postfix Works (Shunting-Yard)
          </h2>
          <div className="pl-9 space-y-3 text-sm text-text-secondary leading-relaxed">
            <p>
              The <strong className="text-text-primary">Shunting-Yard algorithm</strong> by Edsger Dijkstra
              converts infix to postfix using an operator stack:
            </p>
            <ol className="space-y-2 list-none counter-reset-[step]">
              {[
                { step: 'Read a token from left to right' },
                { step: 'If operand → send directly to output' },
                { step: 'If "(" → push onto stack' },
                { step: 'If ")" → pop stack to output until "(" is found, then discard "("' },
                { step: 'If operator → pop operators with higher/equal precedence (left-assoc) to output, then push current operator' },
                { step: 'After all tokens, pop remaining operators to output' },
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded bg-bg-surface border border-border-subtle text-[10px] font-mono flex items-center justify-center shrink-0 mt-0.5 text-text-muted">
                    {i + 1}
                  </span>
                  <span>{item.step}</span>
                </li>
              ))}
            </ol>
          </div>
        </motion.section>

        {/* How Postfix → Infix Works */}
        <motion.section {...fadeIn} className="space-y-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-accent/10 text-accent text-xs font-mono flex items-center justify-center border border-accent/20">6</span>
            How Postfix → Infix Works
          </h2>
          <div className="pl-9 space-y-3 text-sm text-text-secondary leading-relaxed">
            <p>
              Postfix → Infix uses a stack to rebuild the parenthesized infix expression:
            </p>
            <ol className="space-y-2 list-none">
              {[
                { step: 'Read tokens from left to right' },
                { step: 'If operand → push onto stack' },
                { step: 'If operator → pop two operands, combine as "(op1 operator op2)", push result back' },
                { step: 'The final value on the stack is the infix expression' },
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded bg-bg-surface border border-border-subtle text-[10px] font-mono flex items-center justify-center shrink-0 mt-0.5 text-text-muted">
                    {i + 1}
                  </span>
                  <span>{item.step}</span>
                </li>
              ))}
            </ol>
          </div>
        </motion.section>

        {/* Try It */}
        <motion.section {...fadeIn}>
          <div className="p-6 rounded-xl border border-accent/20 bg-accent/5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold mb-1">Ready to try it?</h3>
              <p className="text-sm text-text-secondary">
                See these algorithms in action with real-time stack visualization.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Link
                to="/postfix"
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-text-inverse bg-accent hover:bg-accent-hover rounded-lg transition-all active:scale-[0.97]"
              >
                Infix → Postfix
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/infix"
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-text-secondary hover:text-text-primary bg-bg-surface hover:bg-bg-elevated border border-border-default rounded-lg transition-all active:scale-[0.97]"
              >
                Postfix → Infix
              </Link>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
