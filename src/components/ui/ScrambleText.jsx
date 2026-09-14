import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "../../hooks/useMediaQuery.js";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/\\<>*#%$&@";

/**
 * Resolves text out of noise, one character at a time, when it scrolls into
 * view. Used for short mono labels only.
 *
 * The real string is always present for assistive technology and for anyone who
 * asked for reduced motion; the scrambled characters are `aria-hidden`, so the
 * effect can never turn readable text into gibberish for a screen reader.
 *
 * This is the cheap counterpart to the vendored React Bits `DecryptedText`,
 * which is worth its size on the hero but not on a dozen small labels.
 */
export function ScrambleText({ text, className = "", speed = 34, startDelay = 0 }) {
  const reduced = usePrefersReducedMotion();
  const [scrambled, setScrambled] = useState("");
  const ref = useRef(null);

  // The real string is what renders under reduced motion; the scrambled frames
  // are only ever a decoration on top of it.
  const display = reduced ? text : scrambled;

  useEffect(() => {
    if (reduced) return undefined;

    const node = ref.current;
    if (!node) return undefined;

    let timer = 0;
    let frame = 0;
    let cancelled = false;

    const run = () => {
      let revealed = 0;
      const tick = () => {
        if (cancelled) return;
        const out = text
          .split("")
          .map((char, i) => {
            if (i < revealed || char === " ") return char;
            return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          })
          .join("");
        setScrambled(out);
        revealed += 1;
        if (revealed <= text.length) {
          timer = window.setTimeout(tick, speed);
        }
      };
      tick();
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.disconnect();
          frame = window.setTimeout(run, startDelay);
        }
      },
      { threshold: 0.4 },
    );

    observer.observe(node);
    return () => {
      cancelled = true;
      observer.disconnect();
      window.clearTimeout(timer);
      window.clearTimeout(frame);
    };
  }, [text, speed, startDelay, reduced]);

  return (
    <span ref={ref} className={className}>
      <span aria-hidden="true">{display || " "}</span>
      <span className="sr-only">{text}</span>
    </span>
  );
}
