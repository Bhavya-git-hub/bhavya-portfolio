import { motion } from "motion/react";
import { DURATION, EASE, VIEWPORT, riseIn } from "../../lib/motion.js";
import { usePrefersReducedMotion } from "../../hooks/useMediaQuery.js";

/**
 * The single scroll-reveal primitive. Everything on the page that appears as
 * you scroll goes through this, which is why the whole site shares one rhythm.
 *
 * Under reduced motion it renders the plain element with no wrapper at all —
 * not a zero-duration animation — so there is no state in which content depends
 * on an animation having run.
 */
export function Reveal({
  children,
  as = "div",
  delay = 0,
  duration = DURATION.base,
  className = "",
  ...rest
}) {
  const reduced = usePrefersReducedMotion();
  const Tag = as;

  if (reduced) {
    return (
      <Tag className={className} {...rest}>
        {children}
      </Tag>
    );
  }

  const Motion = motion[as] ?? motion.div;

  return (
    <Motion
      className={className}
      variants={riseIn}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      transition={{ duration, delay, ease: EASE }}
      {...rest}
    >
      {children}
    </Motion>
  );
}

/**
 * Word-by-word heading reveal — the editorial counterpart to Reveal.
 *
 * Splits on whitespace rather than on characters: a per-character stagger on a
 * heading this large reads as a gimmick, and it also destroys the line breaks
 * that the layout depends on. Each word is a span with its own overflow clip so
 * the words rise out of the line rather than fading in place.
 */
export function RevealText({
  text,
  className = "",
  wordClassName = "",
  delay = 0,
  as = "span",
}) {
  const reduced = usePrefersReducedMotion();
  const words = String(text).split(" ");
  const Tag = as;

  if (reduced) {
    return <Tag className={className}>{text}</Tag>;
  }

  return (
    <motion.span
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      transition={{ staggerChildren: 0.045, delayChildren: delay }}
      aria-label={text}
    >
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          className="inline-block overflow-hidden align-bottom"
          aria-hidden="true"
        >
          <motion.span
            className={`inline-block ${wordClassName}`}
            variants={{
              hidden: { y: "110%", opacity: 0 },
              visible: { y: "0%", opacity: 1 },
            }}
            transition={{ duration: 0.85, ease: EASE }}
          >
            {word}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
