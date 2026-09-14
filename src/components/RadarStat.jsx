import { useMemo } from "react";
import { motion } from "motion/react";
import { EASE, VIEWPORT } from "../lib/motion.js";
import { usePrefersReducedMotion } from "../hooks/useMediaQuery.js";

/**
 * Focus radar. Scales in from the centre once, then holds — a radar that keeps
 * animating reads as live telemetry, which this is not.
 */
export function RadarStat({ axes, className = "" }) {
  const reduced = usePrefersReducedMotion();
  const size = 260;
  const c = size / 2;
  const r = c - 42;

  const { shape, spokes, rings, labels } = useMemo(() => {
    const angleFor = (i) => (Math.PI * 2 * i) / axes.length - Math.PI / 2;

    const pointFor = (i, factor) => ({
      x: c + Math.cos(angleFor(i)) * r * factor,
      y: c + Math.sin(angleFor(i)) * r * factor,
    });

    const poly = axes
      .map((axis, i) => {
        const p = pointFor(i, axis.value / 100);
        return `${p.x},${p.y}`;
      })
      .join(" ");

    return {
      shape: poly,
      spokes: axes.map((_, i) => pointFor(i, 1)),
      rings: [0.25, 0.5, 0.75, 1].map((f) =>
        axes
          .map((_, i) => {
            const p = pointFor(i, f);
            return `${p.x},${p.y}`;
          })
          .join(" "),
      ),
      labels: axes.map((axis, i) => ({ ...axis, ...pointFor(i, 1.19) })),
    };
  }, [axes, c, r]);

  return (
    <svg viewBox={`0 0 ${size} ${size}`} className={`w-full ${className}`} role="img"
      aria-label={`Focus areas: ${axes.map((a) => `${a.axis} ${a.value} per cent`).join(", ")}`}>
      {rings.map((ring, i) => (
        <polygon key={i} points={ring} fill="none" stroke="rgb(27 34 43)" />
      ))}
      {spokes.map((p, i) => (
        <line key={i} x1={c} y1={c} x2={p.x} y2={p.y} stroke="rgb(27 34 43)" />
      ))}

      <motion.polygon
        points={shape}
        fill="rgb(34 211 238 / 0.13)"
        stroke="rgb(34 211 238)"
        strokeWidth="1.25"
        initial={reduced ? false : { scale: 0.2, opacity: 0 }}
        whileInView={reduced ? undefined : { scale: 1, opacity: 1 }}
        viewport={VIEWPORT}
        transition={{ duration: 1, ease: EASE }}
        style={{ transformOrigin: `${c}px ${c}px` }}
      />

      {labels.map((label) => (
        <text
          key={label.axis}
          x={label.x}
          y={label.y}
          textAnchor="middle"
          dominantBaseline="middle"
          fontFamily="ui-monospace, monospace"
          fontSize="8.5"
          letterSpacing="1.4"
          fill="rgb(113 113 122)"
        >
          {label.axis}
        </text>
      ))}
    </svg>
  );
}
