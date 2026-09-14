import { useEffect } from "react";
import Lenis from "lenis";
import { usePrefersReducedMotion } from "./useMediaQuery.js";

/**
 * Momentum scrolling for the whole document.
 *
 * Lenis is never started when the visitor asked for reduced motion — smooth
 * scrolling is exactly the kind of inertia that preference is about, and
 * unlike a decorative animation it cannot be "slowed down" into something
 * acceptable. In that case the browser's native scrolling is left alone, which
 * is the correct behaviour rather than a degraded one.
 *
 * Returns a `scrollTo` that works in both modes, so callers never branch.
 *
 * @returns {(target: string | HTMLElement) => void}
 */
export function useSmoothScroll() {
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return undefined;

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      // Touch devices already have excellent native momentum; overriding it
      // makes the page feel laggy on exactly the hardware with least headroom.
      smoothTouch: false,
    });

    let frame = 0;
    const raf = (time) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    window.__lenis = lenis;
    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
      delete window.__lenis;
    };
  }, [reduced]);

  return scrollToSection;
}

/**
 * Scroll to a section by id. Used by the navbar, the hero CTA and the footer,
 * all of which are plain anchors — this only runs after `preventDefault`, so
 * the links still work if the script fails.
 *
 * @param {string} id
 */
export function scrollToSection(id) {
  const el = document.getElementById(id);
  if (!el) return;

  const lenis = typeof window !== "undefined" ? window.__lenis : undefined;
  if (lenis) {
    lenis.scrollTo(el, { offset: -8 });
  } else {
    el.scrollIntoView({ behavior: "auto", block: "start" });
  }
  // Move keyboard focus with the viewport, otherwise the next Tab press
  // returns to the top of the document and the nav is unusable by keyboard.
  el.setAttribute("tabindex", "-1");
  el.focus({ preventScroll: true });
}
