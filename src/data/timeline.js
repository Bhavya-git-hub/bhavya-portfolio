/**
 * @typedef {Object} TimelineEntry
 * @property {string} year
 * @property {string} title
 * @property {string} detail
 * @property {string[]} tags
 * @property {'done'|'active'|'target'} state  drives the node styling; exactly
 *           one entry should be 'active', and 'target' is rendered as an
 *           explicitly unreached goal so it can never read as an achievement.
 */

/**
 * Education and self-directed learning only. Do not add employment here that
 * you have not had — the timeline is rendered as a system log, and a fabricated
 * line in a log is the one thing a security reader will notice.
 *
 * @type {TimelineEntry[]}
 */
export const timeline = [
  {
    year: "2024",
    title: "Started the cybersecurity track",
    detail:
      "Computer science foundations, operating systems and the first serious look at how networks actually carry a packet.",
    tags: ["Foundations", "Networking", "Linux"],
    state: "done",
  },
  {
    year: "2025",
    title: "Security projects and CTFs",
    detail:
      "Moved from reading about attacks to reproducing them in labs — web exploitation, traffic analysis, and writing the small tools that made each exercise repeatable.",
    tags: ["Web Security", "Cryptography", "Python"],
    state: "done",
  },
  {
    year: "2026",
    title: "Third year — cloud, security, AI",
    detail:
      "Current focus: cloud architecture and its failure modes, identity and access management, and where machine learning changes both the attack surface and the defence.",
    tags: ["AWS", "IAM", "Applied AI"],
    state: "active",
  },
  {
    year: "2026+",
    title: "Next target: cybersecurity engineering",
    detail:
      "Internships and research in offensive security or cloud security engineering. This is a goal, not a record.",
    tags: ["Internship", "Security Engineering"],
    state: "target",
  },
];
