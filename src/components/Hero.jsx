import { motion } from "motion/react";
import { ArrowDown } from "lucide-react";
import DecryptedText from "./reactbits/DecryptedText.jsx";
import { NetworkCanvas } from "./NetworkCanvas.jsx";
import { GridBackdrop } from "./ui/GridBackdrop.jsx";
import { MagneticButton } from "./ui/MagneticButton.jsx";
import { StatusDot } from "./ui/StatusDot.jsx";
import { site, isPlaceholder } from "../data/site.js";
import { scrollToSection } from "../hooks/useSmoothScroll.js";
import { EASE } from "../lib/motion.js";
import { usePrefersReducedMotion } from "../hooks/useMediaQuery.js";

/** Small corner ticks — the cheapest way to make a panel read as an instrument. */
function Corners() {
  return (
    <>
      {[
        "left-0 top-0 border-l border-t",
        "right-0 top-0 border-r border-t",
        "left-0 bottom-0 border-b border-l",
        "right-0 bottom-0 border-b border-r",
      ].map((pos) => (
        <span
          key={pos}
          aria-hidden="true"
          className={`pointer-events-none absolute size-3 border-accent/60 ${pos}`}
        />
      ))}
    </>
  );
}

export function Hero() {
  const reduced = usePrefersReducedMotion();

  /**
   * One word of the headline.
   *
   * The screen-reader copy is provided here rather than left to DecryptedText.
   * That component ships its own "sr-only" span, but styles it with
   * `visibility: hidden` — which removes it from the accessibility tree along
   * with everything else, since the characters it animates are aria-hidden.
   * Left alone, the page's <h1> has no accessible name at all: it does not
   * appear in the accessibility tree, so a screen reader lands on a document
   * whose main heading does not exist. Naming the word here and hiding the
   * animation wholesale fixes that without editing vendored source.
   */
  const word = (text, accent = false) => (
    <span className={`block ${accent ? "text-accent" : "text-bone"}`}>
      <span className="sr-only">{text}</span>
      {reduced ? (
        <span aria-hidden="true">{text}</span>
      ) : (
        <span aria-hidden="true">
          <DecryptedText
            text={text}
            animateOn="view"
            sequential
            revealDirection="start"
            speed={38}
            maxIterations={12}
            characters="ABCDEFGHIJKLMNOPQRSTUVWXYZ01#/\\"
            parentClassName="inline-block"
            encryptedClassName="text-rule-bright"
          />
        </span>
      )}
    </span>
  );

  return (
    <section
      id="top"
      aria-label="Introduction"
      className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden pt-24 sm:pt-28"
    >
      <GridBackdrop />

      <div className="mx-auto grid w-full max-w-[96rem] flex-1 grid-cols-1 items-center gap-10 px-5 pb-10 sm:px-8 lg:grid-cols-12 lg:gap-8">
        {/* ---------------------------------------------------- copy column */}
        <div className="lg:col-span-7">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="flex flex-wrap items-center gap-x-4 gap-y-2 mono-label"
          >
            <span className="flex items-center gap-2 text-accent">
              <StatusDot active={site.status.available} />
              {site.role}
            </span>
            <span className="hidden h-px w-8 bg-rule sm:block" aria-hidden="true" />
            <span>Year {site.meta.year}</span>
            <span className="hidden h-px w-8 bg-rule sm:block" aria-hidden="true" />
            <span>{site.meta.location}</span>
          </motion.p>

          <h1 className="mt-7 font-display text-[clamp(2.9rem,10.5vw,8.5rem)] font-semibold uppercase leading-[0.85] tracking-[-0.05em]">
            {site.tagline.map((line, i) => (
              <motion.span
                key={line}
                initial={{ opacity: 0, y: 34 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.1 + i * 0.09, ease: EASE }}
                className="block"
              >
                {word(line, i === site.tagline.length - 1)}
              </motion.span>
            ))}
          </h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.5, ease: EASE }}
            className="mt-9 max-w-[46ch]"
          >
            <p className="text-[clamp(1rem,1.5vw,1.15rem)] leading-relaxed text-mute">
              I explore the intersection of
            </p>
            <p className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[clamp(0.8rem,1.5vw,1rem)] uppercase tracking-[0.14em] text-bone">
              {site.intersection.map((item, i) => (
                <span key={item} className="flex items-center gap-3">
                  {item}
                  {i < site.intersection.length - 1 ? (
                    <span className="text-accent" aria-hidden="true">
                      ×
                    </span>
                  ) : null}
                </span>
              ))}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.62, ease: EASE }}
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            <MagneticButton
              variant="solid"
              href="#projects"
              onClick={(event) => {
                event.preventDefault();
                scrollToSection("projects");
              }}
            >
              Explore projects
            </MagneticButton>
            <MagneticButton
              variant="outline"
              icon="up-right"
              href={isPlaceholder(site.links.resume) ? undefined : site.links.resume}
              unavailable={isPlaceholder(site.links.resume)}
              unavailableLabel="not set"
            >
              View resume
            </MagneticButton>
          </motion.div>
        </div>

        {/* -------------------------------------------------- visual column */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.25, ease: EASE }}
          className="relative lg:col-span-5"
        >
          <div className="relative border border-rule bg-panel/40">
            <Corners />

            <div className="flex items-center justify-between border-b border-rule px-4 py-2.5">
              <span className="mono-label">Request path</span>
              <span className="flex items-center gap-2 mono-label text-accent">
                <StatusDot />
                Live
              </span>
            </div>

            <NetworkCanvas
              tiers={site.heroTiers}
              className="h-[260px] sm:h-[340px] lg:h-[420px]"
            />

            <dl className="grid grid-cols-2 border-t border-rule">
              <div className="border-r border-rule px-4 py-3">
                <dt className="mono-label">System status</dt>
                <dd className="mt-1.5 flex items-center gap-2 font-mono text-xs text-bone">
                  <StatusDot />
                  ONLINE
                </dd>
              </div>
              <div className="px-4 py-3">
                <dt className="mono-label">Security level</dt>
                <dd className="mt-1.5 font-mono text-xs text-bone">// ACTIVE</dd>
              </div>
            </dl>
          </div>
        </motion.div>
      </div>

      {/* ------------------------------------------------------- scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.9 }}
        className="mx-auto flex w-full max-w-[96rem] items-center justify-between border-t border-rule px-5 py-4 sm:px-8"
      >
        <a
          href="#about"
          onClick={(event) => {
            event.preventDefault();
            scrollToSection("about");
          }}
          className="group flex items-center gap-3 mono-label transition-colors hover:text-accent"
        >
          <ArrowDown
            className="size-3.5 transition-transform duration-500 group-hover:translate-y-1"
            aria-hidden="true"
          />
          Scroll to begin
        </a>
        <span className="mono-label hidden sm:block">{site.meta.focus}</span>
      </motion.div>
    </section>
  );
}
