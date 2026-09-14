/**
 * lucide-react v1 removed its brand icons, so the two this site needs are drawn
 * here in the same 24-unit, 1.75-weight stroke style as the rest of the set.
 *
 * These are simplified marks, not the companies' official logo files: close
 * enough to be recognised next to a text label, and deliberately not a copy of
 * anyone's trademarked artwork.
 */

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": "true",
};

export function GithubIcon({ className = "" }) {
  return (
    <svg {...base} className={className}>
      <path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12 12 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21" />
    </svg>
  );
}

export function LinkedinIcon({ className = "" }) {
  return (
    <svg {...base} className={className}>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M8 11v6" />
      <circle cx="8" cy="8.2" r="0.6" fill="currentColor" />
      <path d="M12 17v-6M12 13.5a2.5 2.5 0 0 1 5 0V17" />
    </svg>
  );
}
