import { ArrowRight, ArrowUpRight } from "lucide-react";

const BASE =
  "group relative inline-flex items-center justify-center gap-2.5 whitespace-nowrap font-mono text-[0.6875rem] uppercase tracking-[0.18em] transition-colors duration-300";

const VARIANTS = {
  /* The one filled element on the page. Reserved for the primary action. */
  solid:
    "bg-accent px-6 py-3.5 text-[#04121a] hover:bg-bone disabled:bg-rule disabled:text-faint",
  outline:
    "border border-rule px-6 py-3.5 text-bone hover:border-accent hover:text-accent disabled:border-rule disabled:text-faint",
  ghost:
    "px-2 py-2 text-mute hover:text-accent disabled:text-faint",
};

/**
 * The only button in the project.
 *
 * Renders an `<a>` when it navigates and a `<button>` when it acts — never a
 * div with a click handler, so keyboard activation, middle-click and "open in
 * new tab" all work without a single line of code here.
 *
 * `unavailable` is the placeholder path: a link whose URL has not been filled
 * in renders as a disabled control that says why, instead of an anchor to "#"
 * that looks live and goes nowhere.
 */
export function Button({
  as,
  href,
  children,
  variant = "outline",
  icon = "right",
  unavailable = false,
  unavailableLabel = "Link not set",
  className = "",
  ...rest
}) {
  const Icon = icon === "up-right" ? ArrowUpRight : ArrowRight;
  const classes = `${BASE} ${VARIANTS[variant]} ${className}`;

  const glyph =
    icon === "none" ? null : (
      <Icon
        aria-hidden="true"
        className="size-3.5 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1 group-disabled:translate-x-0"
        strokeWidth={2}
      />
    );

  if (unavailable) {
    return (
      <button type="button" disabled className={`${classes} cursor-not-allowed`} {...rest}>
        <span className="inline-flex items-center gap-2.5 opacity-60">{children}</span>
        {/* Read out once, by everyone: the reason is part of the label, not a
            decoration layered over a separate screen-reader-only copy. */}
        <span className="text-[0.5625rem] tracking-[0.14em] text-faint">
          [ {unavailableLabel} ]
        </span>
      </button>
    );
  }

  const external = typeof href === "string" && /^(https?:|mailto:)/.test(href);
  const Tag = as ?? (href ? "a" : "button");

  return (
    <Tag
      href={href}
      type={Tag === "button" ? "button" : undefined}
      target={external && !href.startsWith("mailto:") ? "_blank" : undefined}
      rel={external && !href.startsWith("mailto:") ? "noreferrer noopener" : undefined}
      className={classes}
      {...rest}
    >
      {children}
      {glyph}
    </Tag>
  );
}
