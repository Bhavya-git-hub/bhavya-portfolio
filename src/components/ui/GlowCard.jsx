import { useRef, useState } from "react";

/**
 * A square hairline panel with a soft light that follows the cursor.
 *
 * Written here rather than taken from React Bits' SpotlightCard because that
 * component hard-codes `rounded-3xl bg-neutral-900 p-8`, and this design is
 * built on square corners and hairlines. The interaction is the same idea; the
 * surface is this project's.
 *
 * Position is written straight to a CSS custom property on the element, so
 * moving the pointer across a grid of these costs no React renders at all.
 */
export function GlowCard({ children, className = "", as = "div", ...rest }) {
  const ref = useRef(null);
  const [lit, setLit] = useState(false);
  const Tag = as;

  const onMove = (event) => {
    const node = ref.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    node.style.setProperty("--x", `${event.clientX - rect.left}px`);
    node.style.setProperty("--y", `${event.clientY - rect.top}px`);
  };

  return (
    <Tag
      ref={ref}
      onMouseMove={onMove}
      onMouseEnter={() => setLit(true)}
      onMouseLeave={() => setLit(false)}
      onFocus={() => setLit(true)}
      onBlur={() => setLit(false)}
      className={`group relative isolate overflow-hidden border border-rule bg-panel transition-colors duration-500 hover:border-rule-bright ${className}`}
      {...rest}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 transition-opacity duration-500"
        style={{
          opacity: lit ? 1 : 0,
          background:
            "radial-gradient(340px circle at var(--x, 50%) var(--y, 50%), var(--color-accent-glow), transparent 72%)",
        }}
      />
      {children}
    </Tag>
  );
}
