import { useEffect, useState } from "react";

/**
 * Which section is currently the one being read.
 *
 * Uses a band across the upper-middle of the viewport rather than "whichever
 * section is most visible": a short section sandwiched between two tall ones
 * never wins a most-visible contest, so the navbar indicator would skip it
 * entirely on the way past. Tracking the topmost section whose box has crossed
 * the band means every section gets its turn, in order.
 *
 * @param {string[]} ids  section DOM ids, in document order
 * @returns {string} the active id, or "" before the first section is reached
 */
export function useActiveSection(ids) {
  const [active, setActive] = useState("");

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el) => el !== null);

    if (elements.length === 0) return undefined;

    let frame = 0;

    const measure = () => {
      frame = 0;
      const band = window.innerHeight * 0.35;
      let current = "";

      for (const el of elements) {
        const { top, bottom } = el.getBoundingClientRect();
        if (top <= band && bottom > band) {
          current = el.id;
          break;
        }
        if (top <= band) current = el.id;
      }

      setActive(current);
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
  }, [ids]);

  return active;
}
