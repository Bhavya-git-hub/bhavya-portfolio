import { motion, useScroll, useSpring } from "motion/react";

/**
 * A hairline at the top of the viewport that tracks reading position.
 *
 * Driven by a Motion value rather than React state: the transform is written
 * straight to the compositor, so scrolling the page costs zero renders.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-px origin-left bg-accent"
    />
  );
}
