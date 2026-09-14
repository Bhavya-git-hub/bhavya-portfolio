import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { usePointerFine, usePrefersReducedMotion } from "../../hooks/useMediaQuery.js";
import { useMousePosition } from "../../hooks/useMousePosition.js";

/**
 * The custom cursor: a small dot, plus a ring that grows over anything
 * interactive and becomes a label over a project.
 *
 * Mounted only when a fine pointer exists and motion is allowed. It sets
 * `data-cursor="on"` on <body>, which is what hides the native cursor — so if
 * this component ever fails to mount or unmounts, the real cursor is still
 * there. Hiding the pointer from a stylesheet with no way back is how these
 * effects strand people.
 *
 * Hover state is read from the DOM via `closest()` rather than from a React
 * context every interactive element would have to opt into: any element can say
 * `data-cursor-label="VIEW"` and it works, including elements rendered by the
 * vendored components.
 */
export function Cursor() {
  const fine = usePointerFine();
  const reduced = usePrefersReducedMotion();
  const enabled = fine && !reduced;

  const { x, y, hasMoved } = useMousePosition({ enabled });
  const [target, setTarget] = useState({ active: false, label: "" });

  useEffect(() => {
    if (!enabled) return undefined;
    document.body.dataset.cursor = "on";
    return () => {
      delete document.body.dataset.cursor;
    };
  }, [enabled]);

  useEffect(() => {
    if (!enabled) return undefined;

    const onOver = (event) => {
      const el = event.target instanceof Element ? event.target : null;
      const labelled = el?.closest("[data-cursor-label]");
      if (labelled) {
        setTarget({ active: true, label: labelled.getAttribute("data-cursor-label") ?? "" });
        return;
      }
      const interactive = el?.closest("a, button, [role='button'], input, summary");
      setTarget({ active: Boolean(interactive), label: "" });
    };

    document.addEventListener("mouseover", onOver, { passive: true });
    return () => document.removeEventListener("mouseover", onOver);
  }, [enabled]);

  if (!enabled || !hasMoved) return null;

  const ringSize = target.label ? 68 : target.active ? 42 : 26;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[70]">
      <motion.div
        className="absolute left-0 top-0 flex items-center justify-center rounded-full border border-accent"
        animate={{ x: x - ringSize / 2, y: y - ringSize / 2, width: ringSize, height: ringSize }}
        transition={{ type: "spring", stiffness: 420, damping: 34, mass: 0.45 }}
      >
        <AnimatePresence>
          {target.label ? (
            <motion.span
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              transition={{ duration: 0.18 }}
              className="font-mono text-[0.5625rem] uppercase tracking-[0.18em] text-accent"
            >
              {target.label}
            </motion.span>
          ) : null}
        </AnimatePresence>
      </motion.div>

      {target.label ? null : (
        <motion.div
          className="absolute left-0 top-0 size-1 rounded-full bg-accent"
          animate={{ x: x - 2, y: y - 2 }}
          transition={{ type: "spring", stiffness: 1200, damping: 50, mass: 0.2 }}
        />
      )}
    </div>
  );
}
