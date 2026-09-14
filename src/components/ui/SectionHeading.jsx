import { Reveal, RevealText } from "./Reveal.jsx";

/**
 * Every section opens the same way: a hairline, a monospace index and label,
 * then an editorial heading. The repetition is the point — it is the page's
 * structural grammar, and it is what lets the sections differ wildly below the
 * heading without the page falling apart.
 */
export function SectionHeading({ id, index, label, title, lead, align = "left" }) {
  return (
    <header className={align === "center" ? "text-center" : ""}>
      <Reveal className="flex items-center gap-4 border-t border-rule pt-5">
        <span className="mono-label text-accent">{index}</span>
        <span className="mono-label">{label}</span>
        <span className="h-px flex-1 bg-rule" aria-hidden="true" />
      </Reveal>

      <h2
        id={id}
        className="mt-8 font-display text-[clamp(2.25rem,6vw,4.5rem)] font-semibold leading-[0.95] tracking-[-0.035em] text-balance">
        <RevealText text={title} />
      </h2>

      {lead ? (
        <Reveal
          as="p"
          delay={0.12}
          className="mt-6 max-w-[54ch] text-[clamp(0.975rem,1.4vw,1.125rem)] leading-relaxed text-mute text-pretty"
        >
          {lead}
        </Reveal>
      ) : null}
    </header>
  );
}
