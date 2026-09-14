import { useRef } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { Section } from "./ui/Section.jsx";
import { SectionHeading } from "./ui/SectionHeading.jsx";
import { Reveal } from "./ui/Reveal.jsx";
import { timeline } from "../data/timeline.js";
import { usePrefersReducedMotion } from "../hooks/useMediaQuery.js";

const STATE_STYLE = {
  done: { dot: "bg-accent", ring: "border-accent/40", label: "Completed" },
  active: { dot: "bg-accent", ring: "border-accent", label: "In progress" },
  // Rendered hollow and grey. A goal must never look like a record.
  target: { dot: "bg-void", ring: "border-faint", label: "Target — not yet reached" },
};

export function Timeline() {
  const ref = useRef(null);
  const reduced = usePrefersReducedMotion();

  // The connector draws itself as the section is read. Tied to scroll position
  // rather than to a timed animation, so it always reflects where you are.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 70%", "end 60%"],
  });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 28 });

  return (
    <Section id="timeline">
      <SectionHeading
        id="timeline-heading"
        index="05"
        label="Trajectory"
        title="Education & path"
        lead="A student timeline, and only that. No employment is listed here because I have not had any yet — the last entry is explicitly a target."
      />

      <div ref={ref} className="relative mt-16 pl-8 sm:pl-12">
        {/* track */}
        <span
          aria-hidden="true"
          className="absolute left-[3px] top-2 h-[calc(100%-1rem)] w-px bg-rule sm:left-[7px]"
        />
        {/* progress */}
        <motion.span
          aria-hidden="true"
          style={reduced ? { scaleY: 1 } : { scaleY }}
          className="absolute left-[3px] top-2 h-[calc(100%-1rem)] w-px origin-top bg-accent sm:left-[7px]"
        />

        <ol>
          {timeline.map((entry, i) => {
            const style = STATE_STYLE[entry.state] ?? STATE_STYLE.done;
            return (
              <li key={entry.year} className="relative pb-12 last:pb-0">
                <span
                  aria-hidden="true"
                  className={`absolute -left-8 top-1.5 flex size-[7px] items-center justify-center rounded-full sm:-left-12 sm:size-[15px] sm:border ${style.ring}`}
                >
                  <span className={`size-[7px] rounded-full ${style.dot}`} />
                </span>

                <Reveal delay={i * 0.06}>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                    <span className="font-mono text-sm tracking-[0.12em] text-accent">
                      {entry.year}
                    </span>
                    <span
                      className={`border px-2 py-0.5 font-mono text-[0.5625rem] uppercase tracking-[0.16em] ${
                        entry.state === "target"
                          ? "border-faint text-faint"
                          : "border-rule text-mute"
                      }`}
                    >
                      {style.label}
                    </span>
                  </div>

                  <h3 className="mt-3 font-display text-[clamp(1.25rem,2.6vw,1.9rem)] font-semibold tracking-[-0.025em] text-bone">
                    {entry.title}
                  </h3>

                  <p className="mt-3 max-w-[58ch] text-sm leading-relaxed text-mute text-pretty">
                    {entry.detail}
                  </p>

                  <ul className="mt-4 flex flex-wrap gap-2">
                    {entry.tags.map((tag) => (
                      <li
                        key={tag}
                        className="border border-rule px-2.5 py-1 font-mono text-[0.5625rem] uppercase tracking-[0.14em] text-faint"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </div>
    </Section>
  );
}
