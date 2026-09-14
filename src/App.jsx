import { Suspense, lazy } from "react";
import { Navbar } from "./components/Navbar.jsx";
import { Hero } from "./components/Hero.jsx";
import { About } from "./components/About.jsx";
import { Skills } from "./components/Skills.jsx";
import { Projects } from "./components/Projects.jsx";
import { Timeline } from "./components/Timeline.jsx";
import { Certifications } from "./components/Certifications.jsx";
import { Contact } from "./components/Contact.jsx";
import { Footer } from "./components/Footer.jsx";
import { Cursor } from "./components/ui/Cursor.jsx";
import { ScrollProgress } from "./components/ui/ScrollProgress.jsx";
import { Marquee } from "./components/ui/Marquee.jsx";
import { useSmoothScroll } from "./hooks/useSmoothScroll.js";
import { site } from "./data/site.js";

/**
 * The dashboard is the heaviest section (two hand-drawn charts, a count-up per
 * tile and a typing console) and it sits well below the fold. Splitting it out
 * keeps it off the critical path without changing anything a reader sees — the
 * placeholder reserves its height so nothing jumps when it arrives.
 */
const SecurityDashboard = lazy(() =>
  import("./components/SecurityDashboard.jsx").then((m) => ({
    default: m.SecurityDashboard,
  })),
);

export function App() {
  useSmoothScroll();

  return (
    <>
      <ScrollProgress />
      <Cursor />

      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:border focus:border-accent focus:bg-void focus:px-4 focus:py-2.5 focus:font-mono focus:text-xs focus:uppercase focus:tracking-[0.18em] focus:text-accent"
      >
        Skip to content
      </a>

      <Navbar />

      <main id="main">
        <Hero />
        <About />

        <Marquee items={site.marquee} />

        <Skills />
        <Projects />

        <Suspense
          fallback={
            <div
              className="border-t border-rule py-20 sm:py-28 lg:py-36"
              aria-hidden="true"
            >
              <div className="mx-auto w-full max-w-[96rem] px-5 sm:px-8">
                <div className="h-[520px] border border-rule bg-panel/30" />
              </div>
            </div>
          }
        >
          <SecurityDashboard />
        </Suspense>

        <Timeline />
        <Certifications />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
