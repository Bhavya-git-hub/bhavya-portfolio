import { useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Section } from "./ui/Section.jsx";
import { SectionHeading } from "./ui/SectionHeading.jsx";
import { Reveal } from "./ui/Reveal.jsx";
import { EASE, VIEWPORT } from "../lib/motion.js";
import { skillCategories } from "../data/skills.js";
import { usePrefersReducedMotion } from "../hooks/useMediaQuery.js";

const CELLS = 18;

/**
 * A bar drawn as character cells rather than as a filled rectangle — the
 * difference between a progress bar and a readout. Cells light up in sequence
 * when the row scrolls into view.
 */
function CellBar({ level, active }) {
  const reduced = usePrefersReducedMotion();
  const filled = Math.round((level / 100) * CELLS);

  return (
    <span
      className="flex items-center gap-[3px] font-mono text-[0.5rem]"
      aria-hidden="true"
    >
      {Array.from({ length: CELLS }, (_, i) => {
        const on = i < filled;
        const className = `h-3.5 w-1.5 ${
          on
            ? active
              ? "bg-accent"
              : "bg-accent/55"
            : "bg-rule"
        }`;

        if (reduced || !on) return <span key={i} className={className} />;

        return (
          <motion.span
            key={i}
            className={className}
            initial={{ opacity: 0, scaleY: 0.3 }}
            whileInView={{ opacity: 1, scaleY: 1 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.3, delay: i * 0.035, ease: EASE }}
          />
        );
      })}
    </span>
  );
}

export function Skills() {
  const [activeIndex, setActiveIndex] = useState(0);
  const tabRefs = useRef([]);
  const active = skillCategories[activeIndex];

  /**
   * Tablist keyboard behaviour. Without this the categories are reachable but
   * not operable the way a tablist is expected to be, and the detail pane
   * becomes hover-only in practice.
   */
  const onKeyDown = (event) => {
    const last = skillCategories.length - 1;
    let next = null;

    if (event.key === "ArrowDown" || event.key === "ArrowRight") next = activeIndex === last ? 0 : activeIndex + 1;
    if (event.key === "ArrowUp" || event.key === "ArrowLeft") next = activeIndex === 0 ? last : activeIndex - 1;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = last;

    if (next === null) return;
    event.preventDefault();
    setActiveIndex(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <Section id="skills">
      <SectionHeading
        id="skills-heading"
        index="02"
        label="Capabilities"
        title="Security stack"
        lead="Four working areas, and the tools I actually reach for in each. The levels are a self-assessment of where my attention is — not a score anyone awarded me."
      />

      <div className="mt-14 grid grid-cols-1 gap-px border border-rule bg-rule lg:grid-cols-12">
        {/* ------------------------------------------------------ the scan */}
        <div className="bg-void p-5 sm:p-7 lg:col-span-7">
          <p className="flex flex-wrap items-center gap-2 font-mono text-xs">
            <span className="text-accent">$</span>
            <span className="text-bone">system_scan</span>
            <span className="text-mute">--skills {active.command}</span>
            <span className="inline-block w-1.5 animate-blink bg-accent" aria-hidden="true">
              &nbsp;
            </span>
          </p>

          <div
            role="tablist"
            aria-orientation="vertical"
            aria-label="Skill categories"
            onKeyDown={onKeyDown}
            className="mt-6 divide-y divide-rule border-y border-rule"
          >
            {skillCategories.map((category, i) => {
              const isActive = i === activeIndex;
              return (
                <button
                  key={category.id}
                  ref={(node) => {
                    tabRefs.current[i] = node;
                  }}
                  role="tab"
                  id={`skill-tab-${category.id}`}
                  aria-selected={isActive}
                  aria-controls="skill-panel"
                  tabIndex={isActive ? 0 : -1}
                  type="button"
                  onClick={() => setActiveIndex(i)}
                  onMouseEnter={() => setActiveIndex(i)}
                  onFocus={() => setActiveIndex(i)}
                  className="group flex w-full items-center gap-4 py-4 text-left transition-colors duration-300 sm:gap-6"
                >
                  <span
                    className={`font-mono text-[0.6875rem] uppercase tracking-[0.18em] transition-colors duration-300 ${
                      isActive ? "text-accent" : "text-faint group-hover:text-mute"
                    }`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <span
                    className={`w-32 shrink-0 font-mono text-xs uppercase tracking-[0.16em] transition-colors duration-300 sm:w-40 ${
                      isActive ? "text-bone" : "text-mute"
                    }`}
                  >
                    {category.label}
                  </span>

                  <span className="hidden flex-1 sm:block">
                    <CellBar level={category.level} active={isActive} />
                  </span>

                  <span
                    className={`ml-auto font-mono text-xs tabular-nums transition-colors duration-300 ${
                      isActive ? "text-accent" : "text-faint"
                    }`}
                  >
                    {category.level}%
                  </span>
                </button>
              );
            })}
          </div>

          <p className="mt-5 font-mono text-[0.6875rem] leading-relaxed text-faint">
            Levels are self-assessed focus, not certification scores.
          </p>
        </div>

        {/* ---------------------------------------------------- the detail */}
        <div
          role="tabpanel"
          id="skill-panel"
          aria-labelledby={`skill-tab-${active.id}`}
          tabIndex={0}
          className="bg-panel p-5 sm:p-7 lg:col-span-5"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.32, ease: EASE }}
            >
              <p className="mono-label text-accent">{active.command}</p>
              <h3 className="mt-3 font-display text-2xl font-semibold tracking-[-0.02em] sm:text-3xl">
                {active.label}
              </h3>
              <p className="mt-3 max-w-[38ch] text-sm leading-relaxed text-mute">
                {active.note}
              </p>

              <ul className="mt-7 space-y-px">
                {active.items.map((item, i) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.04, ease: EASE }}
                    className="flex items-center gap-3 border-b border-rule/70 py-2.5"
                  >
                    <span className="size-1 rotate-45 bg-accent" aria-hidden="true" />
                    <span className="font-mono text-xs uppercase tracking-[0.12em] text-bone">
                      {item}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <Reveal delay={0.1} className="mt-4">
        <p className="mono-label">
          Hover, tap or arrow-key a category to inspect its toolset.
        </p>
      </Reveal>
    </Section>
  );
}
