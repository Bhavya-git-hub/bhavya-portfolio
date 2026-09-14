import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Section } from "./ui/Section.jsx";
import { SectionHeading } from "./ui/SectionHeading.jsx";
import { ProjectPanel } from "./ProjectPanel.jsx";
import { ProjectVisual } from "./ProjectVisual.jsx";
import { projects } from "../data/projects.js";
import { EASE } from "../lib/motion.js";

/**
 * The sticky showcase. One visual is pinned while the descriptions scroll past
 * it, so the section reads as a single instrument being retuned rather than as
 * four cards in a row.
 */
export function Projects() {
  const [activeIndex, setActiveIndex] = useState(0);
  const panelRefs = useRef([]);
  const active = projects[activeIndex];

  /**
   * The pinned visual follows whichever panel is nearest a reading line at 45%
   * of the viewport.
   *
   * This replaced a per-panel IntersectionObserver that fired only on entry
   * into a thin band. That version desynchronised in a way that is easy to
   * miss and embarrassing when it happens: land in the middle of the section
   * from a nav jump, or sit anywhere no panel happens to straddle the band, and
   * nothing reports — so the visual kept showing whichever project last fired,
   * pairing project 04's artwork with project 01's text.
   *
   * Measuring "nearest" always yields exactly one answer, from any scroll
   * position, however you arrived. setState with an unchanged value bails out
   * before re-rendering, so this costs one measurement pass per frame while
   * scrolling and no renders at all between hand-overs.
   */
  useEffect(() => {
    let frame = 0;

    const measure = () => {
      frame = 0;
      const line = window.innerHeight * 0.45;
      let best = 0;
      let bestDistance = Infinity;

      panelRefs.current.forEach((node, i) => {
        if (!node) return;
        const { top, height } = node.getBoundingClientRect();
        const distance = Math.abs(top + height / 2 - line);
        if (distance < bestDistance) {
          bestDistance = distance;
          best = i;
        }
      });

      setActiveIndex(best);
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <Section id="projects">
      <SectionHeading
        id="projects-heading"
        index="03"
        label="Selected work"
        title="Projects"
        lead="Four builds at the intersection of security, cloud and code. Descriptions and repository links are placeholders until I fill them in — I would rather show an empty field than a link that goes nowhere."
      />

      <div className="mt-16 lg:grid lg:grid-cols-12 lg:gap-12">
        {/* ------------------------------------------------ pinned visual */}
        <div className="hidden lg:col-span-5 lg:block">
          <div className="sticky top-28">
            <div
              data-cursor-label="View"
              className="relative border border-rule"
            >
              <div className="flex items-center justify-between border-b border-rule px-4 py-2.5">
                <span className="mono-label text-accent">{active.category}</span>
                <span className="font-mono text-[0.625rem] tabular-nums text-faint">
                  {String(activeIndex + 1).padStart(2, "0")} /{" "}
                  {String(projects.length).padStart(2, "0")}
                </span>
              </div>

              <div className="relative aspect-[4/3] overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active.id}
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.99 }}
                    transition={{ duration: 0.55, ease: EASE }}
                    className="absolute inset-0"
                  >
                    <ProjectVisual project={active} className="size-full" />
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="border-t border-rule px-4 py-3.5">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={active.id}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.3, ease: EASE }}
                    className="font-mono text-xs text-mute"
                  >
                    {active.summary}
                  </motion.p>
                </AnimatePresence>
              </div>
            </div>

            {/* Progress ticks: position in the set, at a glance. */}
            <ol className="mt-4 flex gap-1.5" aria-hidden="true">
              {projects.map((project, i) => (
                <li
                  key={project.id}
                  className={`h-px flex-1 transition-colors duration-500 ${
                    i <= activeIndex ? "bg-accent" : "bg-rule"
                  }`}
                />
              ))}
            </ol>
          </div>
        </div>

        {/* ------------------------------------------------------- the list */}
        <div className="lg:col-span-7">
          {projects.map((project, i) => (
            <ProjectPanel
              key={project.id}
              project={project}
              index={i}
              total={projects.length}
              panelRef={(node) => {
                panelRefs.current[i] = node;
              }}
            />
          ))}
        </div>
      </div>
    </Section>
  );
}
