import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import { EASE } from "../lib/motion.js";
import { site, isPlaceholder } from "../data/site.js";
import { StatusDot } from "./ui/StatusDot.jsx";

/**
 * Full-screen navigation for small viewports.
 *
 * Three things make this a menu rather than a decorated div, and all three are
 * easy to leave out: Escape closes it, focus is moved into it on open and
 * returned to the trigger on close, and Tab is trapped inside while it is open.
 * Without them the links behind the overlay stay reachable by keyboard, which
 * is both confusing and a real accessibility failure.
 */
export function MobileMenu({ open, onClose, onNavigate, activeId }) {
  const panelRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;

    const previouslyFocused = document.activeElement;
    const panel = panelRef.current;
    panel?.querySelector("a, button")?.focus();

    // The page must not scroll behind the overlay.
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab" || !panel) return;

      const focusable = panel.querySelectorAll(
        "a[href], button:not([disabled]), [tabindex]:not([tabindex='-1'])",
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = overflow;
      if (previouslyFocused instanceof HTMLElement) previouslyFocused.focus();
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          ref={panelRef}
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.28, ease: EASE }}
          className="fixed inset-0 z-[65] flex flex-col bg-void/98 backdrop-blur-xl lg:hidden"
        >
          <div className="flex items-center justify-between border-b border-rule px-5 py-4">
            <span className="font-mono text-xs tracking-[0.2em] text-bone">
              [ {site.initials} ]
            </span>
            <button
              type="button"
              onClick={onClose}
              className="flex items-center gap-2 font-mono text-[0.625rem] uppercase tracking-[0.2em] text-mute transition-colors hover:text-accent"
            >
              Close
              <X className="size-4" aria-hidden="true" />
            </button>
          </div>

          <nav className="flex flex-1 flex-col justify-center px-5">
            <ul>
              {site.nav.map((item, i) => (
                <motion.li
                  key={item.id}
                  initial={{ opacity: 0, y: 22 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.06 + i * 0.05, ease: EASE }}
                  className="border-b border-rule"
                >
                  <a
                    href={`#${item.id}`}
                    onClick={(event) => {
                      event.preventDefault();
                      onNavigate(item.id);
                    }}
                    className="flex items-baseline justify-between py-5"
                  >
                    <span
                      className={`font-display text-3xl font-medium tracking-[-0.03em] transition-colors ${
                        activeId === item.id ? "text-accent" : "text-bone"
                      }`}
                    >
                      {item.label}
                    </span>
                    <span className="mono-label">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </a>
                </motion.li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center justify-between border-t border-rule px-5 py-5">
            <span className="flex items-center gap-2 mono-label">
              <StatusDot active={site.status.available} />
              {site.status.available
                ? site.status.labelAvailable
                : site.status.labelBusy}
            </span>
            {isPlaceholder(site.links.resume) ? (
              <span className="mono-label line-through">Resume</span>
            ) : (
              <a
                href={site.links.resume}
                target="_blank"
                rel="noreferrer noopener"
                className="mono-label text-accent"
              >
                Resume
              </a>
            )}
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
