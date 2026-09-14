import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "../../hooks/useMediaQuery.js";

/**
 * A console frame that types its contents out when it scrolls into view.
 *
 * The full text is rendered into the DOM immediately and only *visually*
 * clipped as it types, so the section is readable by a screen reader, by search
 * engines, and by anyone whose animation never runs. Typing is a presentation
 * of content that is already there, not the mechanism that delivers it.
 *
 * @param {{lines: {tag?: string, text: string, accent?: boolean}[]}} props
 */
export function Terminal({ title = "console", lines, className = "", speed = 26 }) {
  const reduced = usePrefersReducedMotion();
  const [typedCount, setTypedCount] = useState(0);
  const ref = useRef(null);

  // Reduced motion shows every line at once. Derived here rather than pushed
  // into state from the effect, so the preference changing mid-session takes
  // effect on the next render instead of on the next cascade.
  const visibleCount = reduced ? lines.length : typedCount;

  useEffect(() => {
    if (reduced) return undefined;
    const node = ref.current;
    if (!node) return undefined;

    let timer = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        let i = 0;
        const next = () => {
          i += 1;
          setTypedCount(i);
          if (i < lines.length) {
            timer = window.setTimeout(next, speed * 8);
          }
        };
        next();
      },
      { threshold: 0.35 },
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      window.clearTimeout(timer);
    };
  }, [lines.length, reduced, speed]);

  return (
    <div
      ref={ref}
      className={`border border-rule bg-panel font-mono text-[0.75rem] leading-relaxed ${className}`}
    >
      <div className="flex items-center gap-2 border-b border-rule px-4 py-2.5">
        <span className="size-1.5 rounded-full bg-rule-bright" aria-hidden="true" />
        <span className="size-1.5 rounded-full bg-rule-bright" aria-hidden="true" />
        <span className="size-1.5 rounded-full bg-rule-bright" aria-hidden="true" />
        <span className="ml-2 text-[0.625rem] uppercase tracking-[0.2em] text-faint">
          {title}
        </span>
      </div>

      <div className="space-y-1.5 p-4 sm:p-5">
        {lines.map((line, i) => (
          <p
            key={`${line.text}-${i}`}
            className={`flex gap-3 transition-opacity duration-300 ${
              i < visibleCount ? "opacity-100" : "opacity-0"
            }`}
          >
            {line.tag ? (
              <span
                className={`shrink-0 ${line.accent ? "text-accent" : "text-faint"}`}
                aria-hidden="true"
              >
                {line.tag.padEnd(5, " ")}
              </span>
            ) : (
              <span className="shrink-0 text-accent" aria-hidden="true">
                $
              </span>
            )}
            <span className={line.accent ? "text-bone" : "text-mute"}>{line.text}</span>
          </p>
        ))}
        <p className="flex gap-3" aria-hidden="true">
          <span className="shrink-0 text-accent">$</span>
          <span className="inline-block w-2 animate-blink bg-accent">&nbsp;</span>
        </p>
      </div>
    </div>
  );
}
