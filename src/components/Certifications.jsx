import { Award, Cloud, Network, ShieldCheck, TerminalSquare } from "lucide-react";
import { Section } from "./ui/Section.jsx";
import { SectionHeading } from "./ui/SectionHeading.jsx";
import { Reveal } from "./ui/Reveal.jsx";
import { GlowCard } from "./ui/GlowCard.jsx";
import { Button } from "./ui/Button.jsx";
import { certifications, pursuits } from "../data/certifications.js";
import { isPlaceholder } from "../data/site.js";

const ICONS = {
  shield: ShieldCheck,
  cloud: Cloud,
  network: Network,
  terminal: TerminalSquare,
};

/**
 * Certifications, and — separately, under its own header — what is being worked
 * towards.
 *
 * The two lists are visually distinct and never merge. A "target" card is
 * hollow, grey and captioned "not yet earned"; an earned card is a solid panel
 * with a verification link. Anyone skimming should be unable to mistake one for
 * the other, because a certification is a claim that takes thirty seconds to
 * check and costs everything if it is wrong.
 */
export function Certifications() {
  return (
    <Section id="certifications">
      <SectionHeading
        id="certifications-heading"
        index="06"
        label="Credentials"
        title="Certifications"
        lead="Earned credentials appear first, with a verification link. Everything under “working towards” is exactly that — an intention, not an achievement."
      />

      {certifications.length > 0 ? (
        <ul className="mt-14 grid grid-cols-1 gap-px border border-rule bg-rule sm:grid-cols-2 xl:grid-cols-3">
          {certifications.map((cert, i) => {
            const Icon = ICONS[cert.icon] ?? Award;
            const verifiable = !isPlaceholder(cert.credential);
            return (
              <li key={cert.id}>
                <Reveal delay={i * 0.06}>
                  <GlowCard className="h-full border-0 bg-void p-6">
                    <Icon className="size-5 text-accent" aria-hidden="true" />
                    <h3 className="mt-5 font-display text-xl font-semibold tracking-[-0.02em]">
                      {cert.name}
                    </h3>
                    <p className="mt-2 text-sm text-mute">{cert.issuer}</p>
                    <p className="mt-1 mono-label">{cert.year}</p>
                    <div className="mt-6">
                      <Button
                        href={verifiable ? cert.credential : undefined}
                        unavailable={!verifiable}
                        unavailableLabel="no link"
                        variant="ghost"
                        icon="up-right"
                        className="px-0"
                      >
                        Verify
                      </Button>
                    </div>
                  </GlowCard>
                </Reveal>
              </li>
            );
          })}
        </ul>
      ) : (
        <Reveal delay={0.1} className="mt-14">
          <div className="border border-dashed border-rule bg-panel/40 px-6 py-10 text-center sm:py-14">
            <Award className="mx-auto size-6 text-faint" aria-hidden="true" />
            <p className="mt-5 font-display text-xl font-medium text-bone">
              No certifications listed yet
            </p>
            <p className="mx-auto mt-3 max-w-[46ch] text-sm leading-relaxed text-mute">
              This section stays empty until there is something real to put in it.
              Add entries to{" "}
              <code className="font-mono text-xs text-accent">
                src/data/certifications.js
              </code>{" "}
              and each one renders as a card with a verification link.
            </p>
          </div>
        </Reveal>
      )}

      {/* ------------------------------------------------- working towards */}
      <div className="mt-16">
        <Reveal className="flex items-center gap-4 border-t border-rule pt-5">
          <span className="mono-label text-faint">Working towards</span>
          <span className="mono-label text-warn">Not yet earned</span>
          <span className="h-px flex-1 bg-rule" aria-hidden="true" />
        </Reveal>

        <ul className="mt-8 grid grid-cols-1 gap-px border border-rule bg-rule sm:grid-cols-2 xl:grid-cols-4">
          {pursuits.map((pursuit, i) => {
            const Icon = ICONS[pursuit.icon] ?? Award;
            return (
              <li key={pursuit.id}>
                <Reveal delay={i * 0.05} className="h-full bg-void p-6">
                  <div className="flex items-center justify-between">
                    <Icon className="size-4 text-faint" aria-hidden="true" />
                    <span className="mono-label">
                      {pursuit.state === "studying" ? "Studying" : "Planned"}
                    </span>
                  </div>
                  <h3 className="mt-5 font-mono text-sm leading-snug tracking-[0.02em] text-mute">
                    {pursuit.name}
                  </h3>
                  <p className="mt-2 text-xs text-faint">
                    {isPlaceholder(pursuit.issuer) ? "Issuer not set" : pursuit.issuer}
                  </p>
                  <p className="mt-4 border-t border-rule pt-3 text-[0.6875rem] leading-relaxed text-faint">
                    {pursuit.note}
                  </p>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </Section>
  );
}
