import { PLACEHOLDER } from "./site.js";

/**
 * @typedef {Object} Certification
 * @property {string} id
 * @property {string} name
 * @property {string} issuer
 * @property {string} year
 * @property {string} credential   verification URL, or PLACEHOLDER
 * @property {'shield'|'cloud'|'network'|'terminal'} icon
 */

/**
 * CERTIFICATIONS YOU HAVE ACTUALLY EARNED. Ships empty on purpose.
 *
 * Nothing is invented here and nothing should be: a certification is a claim
 * someone can verify in thirty seconds, so a wrong one costs more than an empty
 * section. While this array is empty the section renders an honest empty state
 * and the "in progress" list below carries the weight.
 *
 * To add one, uncomment the template and fill every field:
 *
 *   {
 *     id: "sec-plus",
 *     name: "CompTIA Security+",
 *     issuer: "CompTIA",
 *     year: "2026",
 *     credential: "https://www.credly.com/badges/<your-badge-id>",
 *     icon: "shield",
 *   }
 *
 * @type {Certification[]}
 */
export const certifications = [];

/**
 * @typedef {Object} Pursuit
 * @property {string} id
 * @property {string} name
 * @property {string} issuer
 * @property {'studying'|'planned'} state
 * @property {string} note
 * @property {'shield'|'cloud'|'network'|'terminal'} icon
 */

/**
 * What you are working towards. Rendered under an explicit "NOT YET EARNED"
 * header so it reads as intent, which is what it is. Edit or empty this list
 * freely — these are starting suggestions, not a record of anything.
 *
 * @type {Pursuit[]}
 */
export const pursuits = [
  {
    id: "security-plus",
    name: "CompTIA Security+",
    issuer: "CompTIA",
    state: "planned",
    note: "Replace or remove — listed as a target, not a credential.",
    icon: "shield",
  },
  {
    id: "aws-cloud",
    name: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services",
    state: "planned",
    note: "Replace or remove — listed as a target, not a credential.",
    icon: "cloud",
  },
  {
    id: "network-fundamentals",
    name: "Networking fundamentals",
    issuer: PLACEHOLDER,
    state: "studying",
    note: "Replace with the course or track you are actually taking.",
    icon: "network",
  },
  {
    id: "ctf",
    name: "CTF practice",
    issuer: "TryHackMe / HackTheBox",
    state: "studying",
    note: "Replace with your profile link once you want it public.",
    icon: "terminal",
  },
];
