import { useEffect, useState } from "react";

/**
 * Subscribes to a media query.
 *
 * Starts `false` on the first render rather than reading the query immediately,
 * because the effects that consume this decide whether to start an animation
 * loop or mount a cursor — starting them one frame late is free, whereas
 * reading `matchMedia` during render makes the component non-deterministic in
 * a server or test environment.
 *
 * @param {string} query
 * @returns {boolean}
 */
export function useMediaQuery(query) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return undefined;

    const mql = window.matchMedia(query);
    const update = () => setMatches(mql.matches);

    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, [query]);

  return matches;
}

/**
 * True when the visitor has asked for less motion. Every animated surface in
 * this project reads this and degrades to a static end state — never to a
 * hidden one.
 */
export const usePrefersReducedMotion = () =>
  useMediaQuery("(prefers-reduced-motion: reduce)");

/**
 * True only for a real pointing device. Gates the custom cursor and every
 * hover-only affordance, so a touch device never waits for a hover that
 * cannot happen.
 */
export const usePointerFine = () => useMediaQuery("(pointer: fine)");

/** Desktop-sized viewport — used to drop work, not to change meaning. */
export const useIsDesktop = () => useMediaQuery("(min-width: 1024px)");
