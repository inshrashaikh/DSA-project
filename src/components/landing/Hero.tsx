import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, Play, Layers, Zap, GitBranch, SlidersHorizontal } from 'lucide-react';
import { AnimatedStack } from './AnimatedStack';

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.5 },
};

export function Hero() {
  return (
    <>
      {/* ============ HERO SECTION ============ */}
      <section className="relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--color-accent-muted)_0%,_transparent_60%)] opacity-60" />
        <div className="absolute inset-0 grid-bg opacity-40" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-20 sm:pt-32 pb-20 sm:pb-28">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
            {/* Left — Copy */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col gap-8"
            >
              {/* Eyebrow */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="inline-flex items-center gap-2 self-start"
              >
                <span className="px-3.5 py-1.5 text-[11px] font-mono uppercase tracking-[0.15em] text-accent bg-accent/8 border border-accent/15 rounded-full">
                  Data Structures • Visualized
                </span>
              </motion.div>

              {/* Heading */}
              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="text-[2.75rem] sm:text-[3.5rem] lg:text-[4rem] font-bold leading-[1.05] tracking-[-0.02em]"
              >
                See the Stack.
                <br />
                <span className="gradient-text">
                  Understand the Expression.
                </span>
              </motion.h1>

              {/* Subtext */}
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="text-lg sm:text-xl text-text-secondary max-w-lg leading-relaxed"
              >
                Convert expressions step by step and watch the stack evolve in
                real time. Learn infix, postfix, and prefix conversions
                interactively.
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 }}
                className="flex flex-wrap items-center gap-3 pt-1"
              >
                <Link
                  to="/postfix"
                  className="inline-flex items-center gap-2.5 px-6 py-3 text-sm font-semibold text-text-inverse bg-accent hover:bg-accent-hover rounded-xl transition-all hover:shadow-xl hover:shadow-accent/20 active:scale-[0.97] hover:-translate-y-0.5"
                >
                  Start Visualizing
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2.5 px-6 py-3 text-sm font-semibold text-text-secondary hover:text-text-primary bg-bg-surface hover:bg-bg-elevated border border-border-default hover:border-border-strong rounded-xl transition-all active:scale-[0.97]"
                >
                  <BookOpen className="w-4 h-4" />
                  How It Works
                </Link>
              </motion.div>
            </motion.div>

            {/* Right — Animated Visualization */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.7 }}
            >
              <AnimatedStack />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============ HOW IT WORKS SECTION ============ */}
      <section className="relative border-t border-border-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 sm:py-28">
          <motion.div {...fadeUp} className="text-center mb-14 sm:mb-18">
            <span className="text-[11px] font-mono uppercase tracking-[0.15em] text-accent mb-4 block">
              How It Works
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4">
              From Expression to Result
            </h2>
            <p className="text-text-secondary max-w-lg mx-auto">
              Every conversion follows the same elegant pipeline — tokenize, process with a stack, produce output.
            </p>
          </motion.div>

          <motion.div {...fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-0">
            {[
              { label: 'Input', sublabel: 'A + B * C', color: 'text-text-primary' },
              { label: 'Tokenize', sublabel: 'Split tokens', color: 'text-info' },
              { label: 'Stack', sublabel: 'Process', color: 'text-accent' },
              { label: 'Output', sublabel: 'A B C * +', color: 'text-success' },
            ].map((step, i) => (
              <div key={step.label} className="flex items-center gap-4 sm:gap-0">
                <div className="flex flex-col items-center gap-2 px-6 py-5 rounded-xl border border-border-subtle bg-bg-surface min-w-[120px]">
                  <span className={`text-sm font-semibold ${step.color}`}>{step.label}</span>
                  <span className="text-xs font-mono text-text-muted">{step.sublabel}</span>
                </div>
                {i < 3 && (
                  <div className="hidden sm:flex items-center px-3">
                    <ArrowRight className="w-4 h-4 text-text-muted" />
                  </div>
                )}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ============ FEATURES SECTION ============ */}
      <section className="relative border-t border-border-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 sm:py-28">
          <motion.div {...fadeUp} className="text-center mb-14 sm:mb-18">
            <span className="text-[11px] font-mono uppercase tracking-[0.15em] text-accent mb-4 block">
              Built Around the Stack
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4">
              Core Concepts, Visualized
            </h2>
            <p className="text-text-secondary max-w-lg mx-auto">
              Understand the fundamental building blocks that power expression conversion algorithms.
            </p>
          </motion.div>

          <motion.div {...fadeUp} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                icon: Layers,
                title: 'Stack Operations',
                desc: 'Watch push and pop operations animate in real time as the algorithm runs.',
              },
              {
                icon: SlidersHorizontal,
                title: 'Operator Precedence',
                desc: 'See how *, / take priority over +, - and how ^ uses right associativity.',
              },
              {
                icon: GitBranch,
                title: 'Associativity',
                desc: 'Left-to-right vs right-to-left — visualize how ties are broken.',
              },
              {
                icon: Play,
                title: 'Step-by-Step',
                desc: 'Play, pause, scrub, and jump to any step in the algorithm timeline.',
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="group p-6 rounded-xl border border-border-subtle bg-bg-secondary/40 hover:bg-bg-surface hover:border-border-default transition-all duration-200 hover:-translate-y-0.5"
              >
                <div className="w-9 h-9 rounded-lg bg-accent/8 border border-accent/12 flex items-center justify-center mb-4 group-hover:bg-accent/12 transition-colors">
                  <feature.icon className="w-4 h-4 text-accent" />
                </div>
                <h3 className="text-sm font-semibold text-text-primary mb-2">
                  {feature.title}
                </h3>
                <p className="text-[13px] text-text-muted leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ============ CONVERSION MODES SECTION ============ */}
      <section className="relative border-t border-border-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 sm:py-28">
          <motion.div {...fadeUp} className="text-center mb-14 sm:mb-18">
            <span className="text-[11px] font-mono uppercase tracking-[0.15em] text-accent mb-4 block">
              Conversion Modes
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4">
              Two Powerful Converters
            </h2>
            <p className="text-text-secondary max-w-lg mx-auto">
              Convert between notation formats with full algorithm visualization.
            </p>
          </motion.div>

          <motion.div {...fadeUp} className="grid sm:grid-cols-2 gap-5 max-w-3xl mx-auto">
            {/* Infix → Postfix card */}
            <Link
              to="/postfix"
              className="group relative p-7 rounded-xl border border-border-subtle bg-bg-surface hover:border-accent/25 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-accent/5"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-text-primary">Infix → Postfix</h3>
                  <p className="text-xs text-text-muted">Shunting-Yard Algorithm</p>
                </div>
              </div>

              <div className="mb-5 px-4 py-3 rounded-lg bg-bg-inset border border-border-subtle font-mono text-sm">
                <span className="text-text-muted">Input: </span>
                <span className="text-text-primary">A + B * C</span>
                <br />
                <span className="text-text-muted">Result: </span>
                <span className="text-accent font-semibold">A B C * +</span>
              </div>

              <div className="flex items-center gap-2 text-sm text-text-secondary group-hover:text-accent transition-colors">
                <span>Try converter</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </Link>

            {/* Postfix → Infix card */}
            <Link
              to="/infix"
              className="group relative p-7 rounded-xl border border-border-subtle bg-bg-surface hover:border-accent/25 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-accent/5"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center">
                  <GitBranch className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-text-primary">Expression → Infix</h3>
                  <p className="text-xs text-text-muted">Stack-Based Reconstruction</p>
                </div>
              </div>

              <div className="mb-5 px-4 py-3 rounded-lg bg-bg-inset border border-border-subtle font-mono text-sm">
                <span className="text-text-muted">Input: </span>
                <span className="text-text-primary">A B + C *</span>
                <br />
                <span className="text-text-muted">Result: </span>
                <span className="text-accent font-semibold">((A + B) * C)</span>
              </div>

              <div className="flex items-center gap-2 text-sm text-text-secondary group-hover:text-accent transition-colors">
                <span>Try converter</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ============ FINAL CTA SECTION ============ */}
      <section className="relative border-t border-border-subtle">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--color-accent-muted)_0%,_transparent_60%)] opacity-40" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-20 sm:py-28">
          <motion.div {...fadeUp} className="text-center max-w-xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4">
              Ready to visualize your next expression?
            </h2>
            <p className="text-text-secondary mb-8">
              Jump in and see how the stack processes expressions in real time. No sign-up required.
            </p>
            <Link
              to="/postfix"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 text-sm font-semibold text-text-inverse bg-accent hover:bg-accent-hover rounded-xl transition-all hover:shadow-xl hover:shadow-accent/20 active:scale-[0.97] hover:-translate-y-0.5"
            >
              Start Visualizing
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
