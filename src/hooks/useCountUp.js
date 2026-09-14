import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "./useMediaQuery.js";

const easeOutExpo = (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

/**
 * Counts from zero to `target` once, when `active` first becomes true.
 *
 * Returns the final value immediately under reduced motion, and the final value
 * is always reached exactly — a counter that stops at 1,283 because the last
 * frame landed early is a number the reader will notice.
 *
 * @param {number} target
 * @param {boolean} active
 * @param {number} [duration] milliseconds
 */
export function useCountUp(target, active, duration = 1600) {
  const reduced = usePrefersReducedMotion();
  const [value, setValue] = useState(0);
  const done = useRef(false);

  useEffect(() => {
    // Under reduced motion there is nothing to animate, and the final value is
    // derived below rather than written into state from here — a setState in an
    // effect body only to reach a value we already know causes a second render
    // for no reason.
    if (!active || done.current || reduced) return undefined;

    let frame = 0;
    const start = performance.now();

    const step = (now) => {
      const t = Math.min((now - start) / duration, 1);
      setValue(Math.round(easeOutExpo(t) * target));
      if (t < 1) {
        frame = requestAnimationFrame(step);
      } else {
        done.current = true;
      }
    };

    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [active, target, duration, reduced]);

  return reduced ? target : value;
}
