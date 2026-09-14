/**
 * The availability indicator. A filled dot with a slow halo — the one piece of
 * ambient motion allowed in the chrome, because it carries a fact (whether you
 * are open to work) rather than decorating one.
 */
export function StatusDot({ active = true, className = "" }) {
  return (
    <span className={`relative flex size-1.5 ${className}`} aria-hidden="true">
      {active ? (
        <span className="absolute inline-flex size-full animate-pulse-dot rounded-full bg-accent opacity-70" />
      ) : null}
      <span
        className={`relative inline-flex size-1.5 rounded-full ${
          active ? "bg-accent" : "bg-faint"
        }`}
      />
    </span>
  );
}
