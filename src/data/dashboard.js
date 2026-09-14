/**
 * Numbers for the security console section.
 *
 * READ THIS BEFORE EDITING. Everything in this file is illustrative portfolio
 * data and the UI says so, loudly and permanently — the panel carries a
 * "DEMO DATA" header and every figure carries a chip. A dashboard of invented
 * security telemetry presented as real is the single most damaging thing this
 * site could do to your credibility with the exact people you want to impress.
 *
 * Two of these are real and countable, so they are marked `demo: false` and
 * render without the chip. Keep that distinction honest as you edit: if you
 * cannot point at where a number came from, it is `demo: true`.
 */

/**
 * @typedef {Object} Stat
 * @property {string} id
 * @property {string} label
 * @property {number} value
 * @property {string} suffix
 * @property {string} caption
 * @property {boolean} demo   true => rendered with a DEMO chip
 */

/** @type {Stat[]} */
export const stats = [
  {
    id: "projects",
    label: "Projects built",
    value: 4,
    suffix: "",
    caption: "Entries in this portfolio",
    demo: false,
  },
  {
    id: "technologies",
    label: "Technologies",
    value: 15,
    suffix: "+",
    caption: "Across security, cloud and code",
    demo: false,
  },
  {
    id: "labs",
    label: "Labs & exercises",
    value: 120,
    suffix: "+",
    caption: "Replace with your real count",
    demo: true,
  },
  {
    id: "hours",
    label: "Hands-on hours",
    value: 600,
    suffix: "+",
    caption: "Replace with your real count",
    demo: true,
  },
];

/** Sparkline for the activity panel. Illustrative shape, not measured traffic. */
export const activitySeries = [
  12, 18, 14, 26, 22, 31, 28, 40, 36, 48, 44, 58, 52, 64, 60, 74, 68, 82, 76, 88,
];

/**
 * Radar axes — where your attention goes, self-assessed. Same scale as the
 * skills section so the two never disagree.
 * @type {{axis: string, value: number}[]}
 */
export const focusRadar = [
  { axis: "WEB", value: 82 },
  { axis: "NETWORK", value: 76 },
  { axis: "CLOUD", value: 66 },
  { axis: "CRYPTO", value: 62 },
  { axis: "AI", value: 58 },
  { axis: "FORENSICS", value: 48 },
];

/**
 * @typedef {Object} SystemRow
 * @property {string} label
 * @property {number} value
 * @property {'nominal'|'elevated'} state
 */

/** @type {SystemRow[]} */
export const systemHealth = [
  { label: "LEARNING PIPELINE", value: 92, state: "nominal" },
  { label: "PROJECT THROUGHPUT", value: 74, state: "nominal" },
  { label: "LAB COVERAGE", value: 61, state: "elevated" },
  { label: "CLOUD DEPTH", value: 55, state: "elevated" },
];

/** Fixed strings for the console log panel. No timestamps that pretend to be live. */
export const consoleLog = [
  { tag: "INIT", text: "portfolio.runtime — session established" },
  { tag: "SCAN", text: "skills inventory enumerated — 4 categories" },
  { tag: "LOAD", text: "project index mounted — 4 records" },
  { tag: "NOTE", text: "metrics below are illustrative, not measured" },
  { tag: "IDLE", text: "awaiting operator input" },
];

export const focusAreas = "WEB / CLOUD / NETWORK";
