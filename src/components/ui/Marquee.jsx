import { usePrefersReducedMotion } from "../../hooks/useMediaQuery.js";

/**
 * A slow horizontal band of keywords, used once as a transition between
 * sections. The content is duplicated so the translation can loop seamlessly;
 * the duplicate is `aria-hidden` so it is not read twice.
 *
 * Under reduced motion it stops and simply shows the first run of items.
 */
export function Marquee({ items, className = "" }) {
  const reduced = usePrefersReducedMotion();

  const run = (hidden) => (
    <ul
      className="flex shrink-0 items-center gap-10 px-5"
      aria-hidden={hidden ? "true" : undefined}
    >
      {items.map((item, i) => (
        <li key={`${item}-${i}`} className="flex items-center gap-10">
          <span className="font-display text-[clamp(1.5rem,3.4vw,2.75rem)] font-medium tracking-[-0.02em] text-faint">
            {item}
          </span>
          <span className="size-1 rotate-45 bg-accent" aria-hidden="true" />
        </li>
      ))}
    </ul>
  );

  return (
    <div
      className={`mask-fade-edges flex overflow-hidden border-y border-rule py-7 ${className}`}
    >
      <div className={`flex ${reduced ? "" : "animate-marquee"}`}>
        {run(false)}
        {reduced ? null : run(true)}
      </div>
    </div>
  );
}
