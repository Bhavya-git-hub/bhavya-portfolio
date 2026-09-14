import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./ui/BrandIcons.jsx";
import { Section } from "./ui/Section.jsx";
import { Reveal, RevealText } from "./ui/Reveal.jsx";
import { Terminal } from "./ui/Terminal.jsx";
import { MagneticButton } from "./ui/MagneticButton.jsx";
import { GridBackdrop } from "./ui/GridBackdrop.jsx";
import { site, isPlaceholder } from "../data/site.js";

export function Contact() {
  const { email, github, linkedin } = site.links;

  const channels = [
    {
      id: "email",
      label: "Email",
      icon: Mail,
      href: isPlaceholder(email) ? undefined : `mailto:${email}`,
      display: isPlaceholder(email) ? "not set" : email,
      variant: "solid",
    },
    {
      id: "github",
      label: "GitHub",
      icon: GithubIcon,
      href: isPlaceholder(github) ? undefined : github,
      display: isPlaceholder(github) ? "not set" : github.replace("https://", ""),
      variant: "outline",
    },
    {
      id: "linkedin",
      label: "LinkedIn",
      icon: LinkedinIcon,
      href: isPlaceholder(linkedin) ? undefined : linkedin,
      display: isPlaceholder(linkedin) ? "not set" : linkedin.replace("https://", ""),
      variant: "outline",
    },
  ];

  return (
    <Section id="contact" className="overflow-hidden">
      <GridBackdrop dim />

      <Reveal className="flex items-center gap-4 border-t border-rule pt-5">
        <span className="mono-label text-accent">07</span>
        <span className="mono-label">Contact</span>
        <span className="h-px flex-1 bg-rule" aria-hidden="true" />
      </Reveal>

      <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-7">
          <h2
            id="contact-heading"
            className="font-display text-[clamp(2.4rem,8vw,6.5rem)] font-semibold uppercase leading-[0.9] tracking-[-0.045em]"
          >
            {site.contact.heading.map((line, i) => (
              <span key={line} className="block">
                <RevealText
                  text={line}
                  delay={i * 0.08}
                  wordClassName={
                    i === site.contact.heading.length - 1 ? "text-accent" : ""
                  }
                />
              </span>
            ))}
          </h2>

          <Reveal
            as="p"
            delay={0.2}
            className="mt-8 max-w-[50ch] text-[clamp(0.95rem,1.4vw,1.1rem)] leading-relaxed text-mute text-pretty"
          >
            {site.contact.blurb}
          </Reveal>

          <div className="mt-10 flex flex-wrap gap-3">
            {channels.map((channel) => (
              <MagneticButton
                key={channel.id}
                variant={channel.variant}
                icon={channel.id === "email" ? "right" : "up-right"}
                href={channel.href}
                unavailable={!channel.href}
                unavailableLabel="not set"
              >
                <channel.icon className="size-3.5" aria-hidden="true" />
                {channel.label}
              </MagneticButton>
            ))}
          </div>
        </div>

        <div className="lg:col-span-5">
          <Reveal delay={0.1}>
            <Terminal
              title="connection"
              lines={[
                { text: "initiate_connection()" },
                { tag: "OPEN", text: "channel established", accent: true },
                { tag: "AUTH", text: "no credentials required" },
                { tag: "STAT", text: "READY — pick a channel on the left", accent: true },
              ]}
            />
          </Reveal>

          <Reveal delay={0.18} className="mt-px">
            <dl className="grid grid-cols-1 gap-px border border-rule bg-rule">
              {channels.map((channel) => (
                <div key={channel.id} className="bg-void px-4 py-3.5">
                  <dt className="mono-label">{channel.label}</dt>
                  <dd
                    className={`mt-1.5 truncate font-mono text-xs ${
                      channel.href ? "text-bone" : "text-faint line-through"
                    }`}
                  >
                    {channel.display}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
