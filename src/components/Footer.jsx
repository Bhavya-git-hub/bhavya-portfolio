import { ArrowUp, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./ui/BrandIcons.jsx";
import { site, isPlaceholder } from "../data/site.js";
import { StatusDot } from "./ui/StatusDot.jsx";

export function Footer() {
  const { email, github, linkedin } = site.links;

  const socials = [
    { id: "github", label: "GitHub", icon: GithubIcon, href: isPlaceholder(github) ? null : github },
    {
      id: "linkedin",
      label: "LinkedIn",
      icon: LinkedinIcon,
      href: isPlaceholder(linkedin) ? null : linkedin,
    },
    {
      id: "email",
      label: "Email",
      icon: Mail,
      href: isPlaceholder(email) ? null : `mailto:${email}`,
    },
  ];

  return (
    <footer className="border-t border-rule">
      <div className="mx-auto flex w-full max-w-[96rem] flex-col gap-8 px-5 py-10 sm:px-8 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="font-mono text-xs tracking-[0.2em] text-bone">
            {site.footer.wordmark}
          </p>
          <p className="mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-1 mono-label">
            <span>{site.footer.builtWith}</span>
            <span aria-hidden="true">//</span>
            <span>© {site.footer.year}</span>
          </p>
        </div>

        <ul className="flex flex-wrap items-center gap-x-6 gap-y-3">
          {socials.map((social) => (
            <li key={social.id}>
              {social.href ? (
                <a
                  href={social.href}
                  target={social.href.startsWith("mailto:") ? undefined : "_blank"}
                  rel={social.href.startsWith("mailto:") ? undefined : "noreferrer noopener"}
                  className="group flex items-center gap-2 font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-mute transition-colors duration-300 hover:text-accent"
                >
                  <social.icon className="size-3.5" aria-hidden="true" />
                  {social.label}
                </a>
              ) : (
                <span
                  className="flex items-center gap-2 font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-faint"
                  title="Add this link in src/data/site.js"
                >
                  <social.icon className="size-3.5" aria-hidden="true" />
                  <span className="line-through">{social.label}</span>
                </span>
              )}
            </li>
          ))}
        </ul>

        <div className="flex items-center justify-between gap-6 lg:justify-end">
          <span className="flex items-center gap-2.5 mono-label">
            <StatusDot />
            System online
          </span>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "auto" })}
            className="group flex items-center gap-2 border border-rule px-3.5 py-2 font-mono text-[0.625rem] uppercase tracking-[0.18em] text-mute transition-colors duration-300 hover:border-accent hover:text-accent"
          >
            Top
            <ArrowUp
              className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5"
              aria-hidden="true"
            />
          </button>
        </div>
      </div>
    </footer>
  );
}
