/**
 * The shared section shell: full-bleed hairline at the top, one max width, one
 * horizontal gutter, one vertical rhythm. Sections differ in what they contain,
 * never in how they are placed — which is what keeps ten of them from reading
 * as ten templates.
 */
export function Section({ id, children, className = "", contentClassName = "" }) {
  return (
    <section
      id={id}
      // Every section owns an <h2 id="{id}-heading">, so the accessible name of
      // the region is always the heading the reader can see.
      aria-labelledby={`${id}-heading`}
      className={`relative scroll-mt-20 border-t border-rule py-20 sm:py-28 lg:py-36 ${className}`}
    >
      <div
        className={`mx-auto w-full max-w-[96rem] px-5 sm:px-8 ${contentClassName}`}
      >
        {children}
      </div>
    </section>
  );
}
