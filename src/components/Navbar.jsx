import { useEffect, useMemo, useState } from "react";
import { motion } from "motion/react";
import { Menu } from "lucide-react";
import { site, isPlaceholder } from "../data/site.js";
import { useActiveSection } from "../hooks/useActiveSection.js";
import { scrollToSection } from "../hooks/useSmoothScroll.js";
import { StatusDot } from "./ui/StatusDot.jsx";
import { MobileMenu } from "./MobileMenu.jsx";

/**
 * Sticky chrome. Transparent over the hero, then a blurred hairline bar once
 * the page has moved — so the hero reads full-bleed but the nav never sits
 * illegibly on top of content.
 */
export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const ids = useMemo(() => site.nav.map((item) => item.id), []);
  const active = useActiveSection(ids);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id) => {
    setMenuOpen(false);
    scrollToSection(id);
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          scrolled
            ? "border-b border-rule bg-void/72 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-[96rem] items-center justify-between px-5 sm:px-8 lg:h-[4.5rem]">
          <a
            href="#top"
            onClick={(event) => {
              event.preventDefault();
              window.scrollTo({ top: 0, behavior: "auto" });
            }}
            className="group flex items-center gap-2 font-mono text-xs tracking-[0.2em] text-bone"
          >
            <span className="text-accent transition-transform duration-300 group-hover:-translate-x-0.5">
              [
            </span>
            {site.initials}
            <span className="text-accent transition-transform duration-300 group-hover:translate-x-0.5">
              ]
            </span>
          </a>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {site.nav.map((item) => {
                const isActive = active === item.id;
                return (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      aria-current={isActive ? "true" : undefined}
                      onClick={(event) => {
                        event.preventDefault();
                        go(item.id);
                      }}
                      className={`relative block px-3.5 py-2 font-mono text-[0.6875rem] uppercase tracking-[0.18em] transition-colors duration-300 ${
                        isActive ? "text-bone" : "text-faint hover:text-mute"
                      }`}
                    >
                      {item.label}
                      {isActive ? (
                        // One shared element slides between items rather than
                        // each item fading its own underline in and out.
                        <motion.span
                          layoutId="nav-indicator"
                          className="absolute inset-x-3 -bottom-0.5 h-px bg-accent"
                          transition={{ type: "spring", stiffness: 380, damping: 32 }}
                        />
                      ) : null}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-3 sm:gap-5">
            <span className="hidden items-center gap-2 mono-label sm:flex">
              <StatusDot active={site.status.available} />
              {site.status.available ? site.status.labelAvailable : site.status.labelBusy}
            </span>

            {isPlaceholder(site.links.resume) ? (
              <span
                className="hidden border border-rule px-4 py-2 font-mono text-[0.625rem] uppercase tracking-[0.18em] text-faint sm:inline-block"
                title="Add your resume URL in src/data/site.js"
              >
                Resume <span className="text-faint/70">[ not set ]</span>
              </span>
            ) : (
              <a
                href={site.links.resume}
                target="_blank"
                rel="noreferrer noopener"
                className="hidden border border-rule px-4 py-2 font-mono text-[0.625rem] uppercase tracking-[0.18em] text-bone transition-colors duration-300 hover:border-accent hover:text-accent sm:inline-block"
              >
                Resume
              </a>
            )}

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className="flex items-center gap-2 font-mono text-[0.625rem] uppercase tracking-[0.2em] text-bone lg:hidden"
            >
              Menu
              <Menu className="size-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        onNavigate={go}
        activeId={active}
      />
    </>
  );
}
