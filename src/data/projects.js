import { PLACEHOLDER } from "./site.js";

/**
 * @typedef {Object} Project
 * @property {string} id            stable key, also used for the anchor
 * @property {string} name
 * @property {string} category      short mono label, e.g. "CLOUD / AI"
 * @property {string} summary       one line, shown in the sticky panel
 * @property {string} description   two or three sentences
 * @property {string[]} stack       technologies, rendered as chips
 * @property {string[]} highlights  what you actually did — keep these factual
 * @property {string}  repo         GitHub URL, or PLACEHOLDER
 * @property {string}  demo         live URL, or PLACEHOLDER
 * @property {'node-graph'|'packets'|'cipher'|'scanner'} visual  which generated
 *           visual to draw. No screenshots are shipped, so nothing to optimise
 *           and nothing that looks stale; swap in an <img> here when you have one.
 */

/**
 * Replace the descriptions and highlights with your own words and point `repo`
 * at the real repositories. The four entries below are the projects you named,
 * with deliberately generic copy — nothing here claims a result you have not had.
 *
 * @type {Project[]}
 */
export const projects = [
  {
    id: "mannmitra",
    name: "MannMitra",
    category: "AI / CLOUD",
    summary: "AI-driven student mental health support platform.",
    description:
      "An AI-assisted support platform for students, built on a scalable AWS architecture. Replace this with your own description: what the system does, who it is for, and the one design decision you would defend in an interview.",
    stack: ["React", "Python", "AWS", "PostgreSQL"],
    highlights: [
      "Replace with a concrete thing you built",
      "Replace with a constraint you designed around",
      "Replace with something that broke and what you changed",
    ],
    repo: PLACEHOLDER,
    demo: PLACEHOLDER,
    visual: "node-graph",
  },
  {
    id: "network-analyzer",
    name: "Network Security Analyzer",
    category: "NETWORK SECURITY",
    summary: "Traffic analysis and suspicious packet detection.",
    description:
      "Captures and inspects network traffic to surface anomalous flows. Replace this with the detection approach you actually used — signature matching, statistical baselining, or something else — and say where it falls down.",
    stack: ["Python", "Scapy", "Wireshark"],
    highlights: [
      "Replace with the protocols you parse",
      "Replace with how detections are scored",
      "Replace with a known limitation",
    ],
    repo: PLACEHOLDER,
    demo: PLACEHOLDER,
    visual: "packets",
  },
  {
    id: "secure-file",
    name: "Secure File System",
    category: "CRYPTOGRAPHY",
    summary: "Cryptographic file protection and secure data handling.",
    description:
      "Encrypts files at rest and manages key material for retrieval. Replace this with the cipher and mode you chose, how keys are derived, and what threat model it is and is not built for.",
    stack: ["Python", "cryptography", "CLI"],
    highlights: [
      "Replace with your key derivation choice",
      "Replace with how integrity is verified",
      "Replace with what this does not protect against",
    ],
    repo: PLACEHOLDER,
    demo: PLACEHOLDER,
    visual: "cipher",
  },
  {
    id: "vuln-scanner",
    name: "Vulnerability Scanner",
    category: "OFFENSIVE SECURITY",
    summary: "Automated scanning and vulnerability identification.",
    description:
      "Enumerates hosts and services and reports likely weaknesses. Replace this with what it enumerates, how findings are ranked, and how you avoid reporting something you did not actually observe.",
    stack: ["Python", "Nmap", "Requests"],
    highlights: [
      "Replace with the checks you implemented",
      "Replace with how false positives are handled",
      "Replace with the scope you tested it against",
    ],
    repo: PLACEHOLDER,
    demo: PLACEHOLDER,
    visual: "scanner",
  },
];
