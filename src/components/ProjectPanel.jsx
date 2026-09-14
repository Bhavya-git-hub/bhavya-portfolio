import { ExternalLink } from "lucide-react";
import { GithubIcon } from "./ui/BrandIcons.jsx";
import { Reveal } from "./ui/Reveal.jsx";
import { Button } from "./ui/Button.jsx";
import { ProjectVisual } from "./ProjectVisual.jsx";
import { isPlaceholder } from "../data/site.js";

/**
 * One project's copy. On desktop it scrolls past a pinned visual; below `lg`
 * it carries its own visual, because a sticky column with nothing beside it is
 * just a card that jumps.
 *
 * Which project is "current" is decided by the parent, not here: see Projects.
 */
export function ProjectPanel({ project, index, total, panelRef }) {
  const repoSet = !isPlaceholder(project.repo);
  const demoSet = !isPlaceholder(project.demo);

  return (
    <article
      ref={panelRef}
      id={`project-${project.id}`}
      className="border-t border-rule py-12 first:border-t-0 first:pt-0 lg:min-h-[78vh] lg:py-20 lg:first:pt-4"
    >
      <Reveal className="flex items-center gap-4">
        <span className="font-mono text-xs text-accent">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="h-px w-8 bg-rule" aria-hidden="true" />
        <span className="mono-label">{project.category}</span>
        <span className="ml-auto font-mono text-[0.625rem] text-faint">
          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
      </Reveal>

      <Reveal delay={0.05}>
        <h3 className="mt-5 font-display text-[clamp(1.9rem,5vw,3.5rem)] font-semibold leading-[1] tracking-[-0.035em]">
          {project.name}
        </h3>
      </Reveal>

      {/* Mobile-only visual: the sticky column does not exist at this width. */}
      <Reveal delay={0.08} className="mt-7 lg:hidden">
        <ProjectVisual
          project={project}
          className="aspect-[4/3] w-full border border-rule"
        />
      </Reveal>

      <Reveal as="p" delay={0.1} className="mt-6 max-w-[54ch] leading-relaxed text-mute text-pretty">
        {project.description}
      </Reveal>

      <Reveal delay={0.14} className="mt-8">
        <h4 className="mono-label">What it does</h4>
        <ul className="mt-3 space-y-2.5">
          {project.highlights.map((item) => (
            <li key={item} className="flex gap-3 text-sm leading-relaxed text-mute">
              <span
                className="mt-2 size-1 shrink-0 rotate-45 bg-accent/70"
                aria-hidden="true"
              />
              {item}
            </li>
          ))}
        </ul>
      </Reveal>

      <Reveal delay={0.18} className="mt-8">
        <h4 className="mono-label">Stack</h4>
        <ul className="mt-3 flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <li
              key={tech}
              className="border border-rule px-3 py-1.5 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-mute transition-colors duration-300 hover:border-accent/60 hover:text-accent"
            >
              {tech}
            </li>
          ))}
        </ul>
      </Reveal>

      <Reveal delay={0.22} className="mt-9 flex flex-wrap gap-3">
        <Button
          href={repoSet ? project.repo : undefined}
          unavailable={!repoSet}
          unavailableLabel="not set"
          icon="up-right"
          variant="outline"
        >
          <GithubIcon className="size-3.5" />
          Source
        </Button>
        <Button
          href={demoSet ? project.demo : undefined}
          unavailable={!demoSet}
          unavailableLabel="none yet"
          icon="up-right"
          variant="ghost"
        >
          <ExternalLink className="size-3.5" aria-hidden="true" />
          Live demo
        </Button>
      </Reveal>
    </article>
  );
}
