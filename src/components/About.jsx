import { motion } from "motion/react";
import { Section } from "./ui/Section.jsx";
import { Reveal } from "./ui/Reveal.jsx";
import { ScrambleText } from "./ui/ScrambleText.jsx";
import { StatusDot } from "./ui/StatusDot.jsx";
import { site } from "../data/site.js";
import { EASE, VIEWPORT } from "../lib/motion.js";
import { usePrefersReducedMotion } from "../hooks/useMediaQuery.js";

/** The metadata block: five facts, hairline-separated, monospace. */
function MetaGrid() {
  const rows = [
    { label: "Location", value: site.meta.location },
    { label: "Role", value: site.meta.role },
    { label: "Year", value: site.meta.year },
    { label: "Focus", value: site.meta.focus },
  ];

  return (
    <dl className="mt-12 grid grid-cols-2 gap-px border border-rule bg-rule sm:grid-cols-2">
      {rows.map((row, i) => (
        <Reveal key={row.label} delay={i * 0.06} className="bg-void p-4 sm:p-5">
          <dt className="mono-label">{row.label}</dt>
          <dd className="mt-2 font-mono text-sm text-bone">
            <ScrambleText text={row.value} startDelay={i * 90} />
          </dd>
        </Reveal>
      ))}
      <Reveal delay={0.24} className="col-span-2 bg-void p-4 sm:p-5">
        <dt className="mono-label">Status</dt>
        <dd className="mt-2 flex items-center gap-2.5 font-mono text-sm text-bone">
          <StatusDot active={site.status.available} />
          {site.meta.status}
        </dd>
      </Reveal>
    </dl>
  );
}

export function About() {
  const reduced = usePrefersReducedMotion();

  return (
    <Section id="about">
      <Reveal className="flex items-center gap-4 border-t border-rule pt-5">
        <span className="mono-label text-accent">01</span>
        <span className="mono-label">About</span>
        <span className="h-px flex-1 bg-rule" aria-hidden="true" />
      </Reveal>

      <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10">
        {/* ------------------------------------------------- the statement */}
        <div className="lg:col-span-7">
          {/*
            The observer must sit on the <h2>, not on the clipped line spans.
            An IntersectionObserver intersects the element's *clipped* rect, so
            a line translated fully below its own overflow-hidden parent has an
            empty visible rect, never intersects, and never animates in — the
            text simply stays invisible forever. Animating the children through
            inherited variants keeps the trigger on an element that is actually
            on screen.
          */}
          <motion.h2
            id="about-heading"
            className="font-display text-[clamp(1.9rem,5.2vw,4.25rem)] font-semibold leading-[1.02] tracking-[-0.04em]"
            initial={reduced ? false : "hidden"}
            whileInView={reduced ? undefined : "visible"}
            viewport={VIEWPORT}
            transition={{ staggerChildren: 0.08 }}
          >
            {site.about.statement.map((line, i) => {
              const isLast = i === site.about.statement.length - 1;
              const content = (
                <span className={isLast ? "text-accent" : "text-bone"}>{line}</span>
              );

              if (reduced) {
                return (
                  <span key={line} className="block">
                    {content}
                  </span>
                );
              }

              return (
                <span key={line} className="block overflow-hidden">
                  <motion.span
                    className="block"
                    variants={{ hidden: { y: "105%" }, visible: { y: "0%" } }}
                    transition={{ duration: 0.9, ease: EASE }}
                  >
                    {content}
                  </motion.span>
                </span>
              );
            })}
          </motion.h2>
        </div>

        {/* -------------------------------------------------------- the bio */}
        <div className="lg:col-span-5">
          <div className="space-y-5 border-l border-rule pl-6">
            {site.about.bio.map((paragraph, i) => (
              <Reveal
                key={paragraph.slice(0, 24)}
                as="p"
                delay={0.1 + i * 0.1}
                className="text-[clamp(0.95rem,1.35vw,1.0625rem)] leading-relaxed text-mute text-pretty"
              >
                {paragraph}
              </Reveal>
            ))}
          </div>

          <MetaGrid />
        </div>
      </div>
    </Section>
  );
}
