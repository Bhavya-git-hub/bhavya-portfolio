import { useMemo } from "react";
import { motion } from "motion/react";
import { usePrefersReducedMotion } from "../hooks/useMediaQuery.js";

/**
 * Generated artwork, one per project category.
 *
 * There are no screenshots in this repository on purpose: a placeholder
 * screenshot is either a stock image (dishonest) or a grey box (worse than
 * nothing), and real ones go stale the moment the project moves on. These are
 * drawn from the project's own category, weigh nothing, and scale to any size.
 *
 * When you do have a real screenshot, replace the returned SVG with an <img>
 * and keep the wrapper — nothing else needs to change.
 */

/** Deterministic pseudo-random so a given project always draws the same figure. */
function seeded(seed) {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i += 1) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return () => {
    h += 0x6d2b79f5;
    let t = h;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const STROKE = "rgb(34 211 238 / 0.55)";
const FAINT = "rgb(43 54 66 / 1)";

function NodeGraph({ rand }) {
  const nodes = useMemo(
    () =>
      Array.from({ length: 9 }, (_, i) => {
        const ring = i < 3 ? 46 : i < 6 ? 82 : 118;
        const angle = rand() * Math.PI * 2;
        return { x: 160 + Math.cos(angle) * ring, y: 120 + Math.sin(angle) * ring };
      }),
    [rand],
  );

  return (
    <>
      {[46, 82, 118].map((r) => (
        <circle key={r} cx="160" cy="120" r={r} fill="none" stroke={FAINT} />
      ))}
      {nodes.map((n, i) => (
        <g key={i}>
          <line x1="160" y1="120" x2={n.x} y2={n.y} stroke={FAINT} />
          <circle cx={n.x} cy={n.y} r={i % 3 === 0 ? 4 : 2.5} fill={STROKE} />
        </g>
      ))}
      <circle cx="160" cy="120" r="6" fill="none" stroke={STROKE} strokeWidth="1.5" />
      <circle cx="160" cy="120" r="2" fill={STROKE} />
    </>
  );
}

function Packets({ rand }) {
  const bars = useMemo(() => Array.from({ length: 34 }, () => rand()), [rand]);
  return (
    <>
      <line x1="20" y1="120" x2="300" y2="120" stroke={FAINT} />
      {bars.map((v, i) => {
        const h = 8 + v * 78;
        const x = 24 + i * 8.2;
        const hot = v > 0.82;
        return (
          <rect
            key={i}
            x={x}
            y={120 - h / 2}
            width="3"
            height={h}
            fill={hot ? STROKE : "rgb(43 54 66 / 1)"}
          />
        );
      })}
      <rect x="20" y="36" width="280" height="168" fill="none" stroke={FAINT} />
    </>
  );
}

function Cipher({ rand }) {
  const glyphs = "0123456789ABCDEF";
  const cells = useMemo(
    () =>
      Array.from({ length: 7 * 12 }, () => ({
        char: glyphs[Math.floor(rand() * glyphs.length)],
        hot: rand() > 0.86,
      })),
    [rand],
  );

  return (
    <>
      {cells.map((cell, i) => {
        const col = i % 12;
        const row = Math.floor(i / 12);
        return (
          <text
            key={i}
            x={30 + col * 22}
            y={46 + row * 24}
            fontFamily="ui-monospace, monospace"
            fontSize="13"
            fill={cell.hot ? STROKE : "rgb(43 54 66 / 1)"}
          >
            {cell.char}
          </text>
        );
      })}
      <rect x="18" y="28" width="284" height="180" fill="none" stroke={FAINT} />
    </>
  );
}

function Scanner({ rand }) {
  const blips = useMemo(
    () =>
      Array.from({ length: 7 }, () => {
        const a = rand() * Math.PI * 2;
        const r = 18 + rand() * 82;
        return { x: 160 + Math.cos(a) * r, y: 120 + Math.sin(a) * r };
      }),
    [rand],
  );

  return (
    <>
      {[34, 64, 94].map((r) => (
        <circle key={r} cx="160" cy="120" r={r} fill="none" stroke={FAINT} />
      ))}
      <line x1="66" y1="120" x2="254" y2="120" stroke={FAINT} />
      <line x1="160" y1="26" x2="160" y2="214" stroke={FAINT} />
      <path d="M160 120 L160 26 A94 94 0 0 1 226 53 Z" fill="rgb(34 211 238 / 0.09)" />
      {blips.map((b, i) => (
        <circle key={i} cx={b.x} cy={b.y} r="3" fill={STROKE} />
      ))}
    </>
  );
}

const FIGURES = {
  "node-graph": NodeGraph,
  packets: Packets,
  cipher: Cipher,
  scanner: Scanner,
};

export function ProjectVisual({ project, className = "" }) {
  const reduced = usePrefersReducedMotion();
  const rand = useMemo(() => seeded(project.id), [project.id]);
  const Figure = FIGURES[project.visual] ?? NodeGraph;

  return (
    <div className={`relative overflow-hidden bg-panel ${className}`}>
      <svg
        viewBox="0 0 320 240"
        className="size-full"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <Figure rand={rand} />
      </svg>

      {/* A single sweeping band, the only motion in the figure. */}
      {reduced ? null : (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 h-24 bg-gradient-to-b from-transparent via-accent/[0.07] to-transparent"
          initial={{ y: "-100%" }}
          animate={{ y: "420%" }}
          transition={{ duration: 6.5, repeat: Infinity, ease: "linear" }}
        />
      )}
    </div>
  );
}
