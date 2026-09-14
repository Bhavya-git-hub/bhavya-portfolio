/**
 * One easing curve and one set of durations for the entire site.
 *
 * Shared timing is most of what makes ten separate sections read as a single
 * continuous piece rather than a stack of templates. If a transition here feels
 * wrong for one component, the component is usually the thing to change.
 */
export const EASE = [0.16, 1, 0.3, 1];

export const DURATION = {
  fast: 0.35,
  base: 0.7,
  slow: 1.1,
};

/** Standard rise-and-fade used by every scroll reveal. */
export const riseIn = {
  hidden: { opacity: 0, y: 26 },
  visible: { opacity: 1, y: 0 },
};

/** Parent variant that walks its children in. */
export const stagger = (amount = 0.06, delayChildren = 0) => ({
  hidden: {},
  visible: { transition: { staggerChildren: amount, delayChildren } },
});

/** Viewport config: fire once, slightly before the element is fully on screen. */
export const VIEWPORT = { once: true, margin: "0px 0px -12% 0px" };
