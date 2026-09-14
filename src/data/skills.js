/**
 * @typedef {Object} SkillCategory
 * @property {string} id
 * @property {string} label      shown in the bar chart
 * @property {string} command    the flag echoed in the terminal line
 * @property {number} level      0-100. This is a self-assessment of where your
 *                               attention currently is, not a certification
 *                               score — the UI labels it as such.
 * @property {string} note       one line describing what you are doing here
 * @property {string[]} items    tools and topics revealed on hover/focus
 */

/** @type {SkillCategory[]} */
export const skillCategories = [
  {
    id: "security",
    label: "SECURITY",
    command: "--security",
    level: 82,
    note: "Offensive fundamentals and defensive reasoning.",
    items: [
      "Ethical Hacking",
      "Penetration Testing",
      "Vulnerability Assessment",
      "Network Security",
      "Web Security",
      "Cryptography",
    ],
  },
  {
    id: "development",
    label: "DEVELOPMENT",
    command: "--dev",
    level: 74,
    note: "Building the tools, not only running them.",
    items: ["Python", "C / C++", "Java", "JavaScript", "SQL", "Git"],
  },
  {
    id: "tooling",
    label: "TOOLING",
    command: "--tools",
    level: 78,
    note: "The working set, used in labs and CTFs.",
    items: ["Kali Linux", "Wireshark", "Burp Suite", "Nmap", "Metasploit", "Git"],
  },
  {
    id: "cloud",
    label: "CLOUD",
    command: "--cloud",
    level: 66,
    note: "Where the systems worth defending now live.",
    items: ["AWS", "Cloud Security", "IAM", "Networking", "Serverless"],
  },
];
