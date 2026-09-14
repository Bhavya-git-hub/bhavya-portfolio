import { useMemo } from "react";
import { motion } from "motion/react";
import { EASE, VIEWPORT } from "../lib/motion.js";
import { usePrefersReducedMotion } from "../hooks/useMediaQuery.js";

/**
 * The activity line. Drawn as a single path that strokes itself in on view,
 * with the area beneath it fading up behind.
 *
 * Hand-drawn rather than pulled from a charting library: this is one series of
 * twenty points with no axes, no tooltips and no legend, and every chart
 * library that could draw it costs more than the entire rest of this page.
 */
export function ThreatGraph({ series, className = "" }) {
  const reduced = usePrefersReducedMotion();
  const W = 520;
  const H = 180;

  const { line, area, points } = useMemo(() => {
    const max = Math.max(...series, 1);
    const step = W / (series.length - 1);
    const pts = series.map((value, i) => ({
      x: i * step,
      y: H - (value / max) * (H - 24) - 12,
    }));

    // Catmull-Rom-ish smoothing: a straight polyline looks like a sketch, a
    // fully rounded spline invents peaks the data does not have.
    const d = pts.reduce((acc, p, i, arr) => {
      if (i === 0) return `M ${p.x} ${p.y}`;
      const prev = arr[i - 1];
      const cx = (prev.x + p.x) / 2;
      return `${acc} C ${cx} ${prev.y} ${cx} ${p.y} ${p.x} ${p.y}`;
    }, "");

    return { line: d, area: `${d} L ${W} ${H} L 0 ${H} Z`, points: pts };
  }, [series]);

  const last = points[points.length - 1];

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className={`w-full ${className}`}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="threat-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgb(34 211 238)" stopOpacity="0.18" />
          <stop offset="100%" stopColor="rgb(34 211 238)" stopOpacity="0" />
        </linearGradient>
      </defs>

      {[0.25, 0.5, 0.75].map((f) => (
        <line
          key={f}
          x1="0"
          y1={H * f}
          x2={W}
          y2={H * f}
          stroke="rgb(27 34 43)"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        />
      ))}

      <motion.path
        d={area}
        fill="url(#threat-fill)"
        initial={reduced ? false : { opacity: 0 }}
        whileInView={reduced ? undefined : { opacity: 1 }}
        viewport={VIEWPORT}
        transition={{ duration: 1.2, delay: 0.5, ease: EASE }}
      />

      <motion.path
        d={line}
        fill="none"
        stroke="rgb(34 211 238)"
        strokeWidth="1.5"
        vectorEffect="non-scaling-stroke"
        initial={reduced ? false : { pathLength: 0 }}
        whileInView={reduced ? undefined : { pathLength: 1 }}
        viewport={VIEWPORT}
        transition={{ duration: 1.6, ease: EASE }}
      />

      <motion.circle
        cx={last.x}
        cy={last.y}
        r="3"
        fill="rgb(34 211 238)"
        initial={reduced ? false : { opacity: 0 }}
        whileInView={reduced ? undefined : { opacity: 1 }}
        viewport={VIEWPORT}
        transition={{ duration: 0.3, delay: 1.5 }}
      />
    </svg>
  );
}
