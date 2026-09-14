/**
 * Everything about you that appears on the page.
 *
 * This file and its siblings in `src/data/` are the only files you need to edit
 * to make the site yours. No component contains a name, a date, a URL or a
 * number — if you find one, that is a bug.
 *
 * Anything still set to PLACEHOLDER renders as visibly unset (a disabled button,
 * a struck-through label) rather than as a dead link. That is deliberate: a
 * portfolio that quietly links to "#" looks broken, and one that invents a
 * credential is worse than one that admits a gap.
 */

/** Sentinel for a fact you have not filled in yet. */
export const PLACEHOLDER = "REPLACE_ME";

/** @param {unknown} value */
export const isPlaceholder = (value) =>
  value === PLACEHOLDER || value === null || value === undefined || value === "";

export const site = {
  name: "Bhavya Mehta",
  initials: "BHAVYA",
  role: "Cybersecurity Student",
  /** Shown under the hero heading. Keep it to one line. */
  intersection: ["CYBERSECURITY", "SOFTWARE", "CLOUD"],
  tagline: ["BUILDING", "BREAKING", "SECURING"],

  /** Nodes drawn in the hero graph, in request order. Add or remove freely. */
  heroTiers: ["USER", "APPLICATION", "API", "DATABASE", "CLOUD"],

  /** Keywords in the band between About and Skills. */
  marquee: [
    "PENETRATION TESTING",
    "CLOUD SECURITY",
    "NETWORK ANALYSIS",
    "CRYPTOGRAPHY",
    "THREAT MODELLING",
    "APPLIED AI",
  ],

  /** Availability pill in the navbar and footer. Set `available: false` when you are not. */
  status: {
    available: true,
    labelAvailable: "AVAILABLE",
    labelBusy: "HEADS DOWN",
  },

  meta: {
    location: "India",
    role: "Cybersecurity Student",
    year: "03 / 04",
    focus: "Security × Cloud × AI",
    status: "Learning / Building",
  },

  about: {
    /** The large left-hand statement. Each string is its own revealed line. */
    statement: [
      "I don't just study",
      "how systems work.",
      "I study how",
      "they can be broken —",
      "and secured.",
    ],
    /** Short bio, right-hand column. Each string is a paragraph. */
    bio: [
      "I'm a third-year cybersecurity student working at the point where security, software and cloud infrastructure meet. Most of what I know came from building something, breaking it, and then working out why it broke.",
      "My focus right now is offensive security fundamentals — network and web exploitation, vulnerability assessment, cryptography — alongside the cloud and AI systems that increasingly define what there is to defend.",
    ],
  },

  contact: {
    heading: ["Ready to", "build something", "secure?"],
    blurb:
      "Open to internships, security research, CTF teams and anything that involves taking a system apart to understand it. The fastest way to reach me is email.",
  },

  /**
   * Links. `email` and `github` are real. Replace `linkedin` and `resume` with
   * your own — until you do, the site shows them as unset instead of linking
   * somewhere useless.
   *
   * For the resume: drop your PDF into `public/` (e.g. `public/resume.pdf`)
   * and set `resume: "/resume.pdf"`.
   */
  links: {
    email: "bhavyamehta125@gmail.com",
    github: "https://github.com/Bhavya-git-hub",
    linkedin: PLACEHOLDER,
    resume: PLACEHOLDER,
  },

  /** Navigation. `id` must match the section's DOM id. */
  nav: [
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "dashboard", label: "Dashboard" },
    { id: "timeline", label: "Timeline" },
    { id: "contact", label: "Contact" },
  ],

  footer: {
    wordmark: "BHAVYA // CYBERSECURITY",
    builtWith: "Built with React",
    year: new Date().getFullYear(),
  },
};
