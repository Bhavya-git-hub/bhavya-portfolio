import { useEffect, useRef, useState } from "react";

/**
 * Pointer position in viewport coordinates.
 *
 * Deliberately does not call setState on every `mousemove`: a move event can
 * fire well above 60 Hz, and re-rendering a React tree that often is how a
 * cursor effect ends up costing more than everything else on the page. The
 * listener only records into a ref; a single rAF publishes at most one state
 * update per frame, and stops entirely when the pointer is idle.
 *
 * @param {{ enabled?: boolean }} [options]
 * @returns {{ x: number, y: number, hasMoved: boolean }}
 */
export function useMousePosition({ enabled = true } = {}) {
  const [position, setPosition] = useState({ x: 0, y: 0, hasMoved: false });
  const latest = useRef({ x: 0, y: 0 });
  const frame = useRef(0);

  useEffect(() => {
    if (!enabled) return undefined;

    const publish = () => {
      frame.current = 0;
      setPosition({ x: latest.current.x, y: latest.current.y, hasMoved: true });
    };

    const onMove = (event) => {
      latest.current = { x: event.clientX, y: event.clientY };
      if (!frame.current) frame.current = requestAnimationFrame(publish);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (frame.current) cancelAnimationFrame(frame.current);
      frame.current = 0;
    };
  }, [enabled]);

  return position;
}
