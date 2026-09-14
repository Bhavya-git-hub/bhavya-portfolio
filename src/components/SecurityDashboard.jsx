import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Activity, Radar, ShieldCheck, TriangleAlert } from "lucide-react";
import { Section } from "./ui/Section.jsx";
import { SectionHeading } from "./ui/SectionHeading.jsx";
import { Reveal } from "./ui/Reveal.jsx";
import { Terminal } from "./ui/Terminal.jsx";
import { StatusDot } from "./ui/StatusDot.jsx";
import { ThreatGraph } from "./ThreatGraph.jsx";
import { RadarStat } from "./RadarStat.jsx";
import { useCountUp } from "../hooks/useCountUp.js";
import { EASE, VIEWPORT } from "../lib/motion.js";
import {
  activitySeries,
  consoleLog,
  focusAreas,
  focusRadar,
  stats,
  systemHealth,
} from "../data/dashboard.js";

/**
 * A chip that marks a figure as illustrative.
 *
 * This is the most important component in the section. A portfolio dashboard
 * showing "1,284 threats analysed" with no qualifier is a fabricated security
 * claim, and the audience for this site is precisely the audience that will
 * treat it as one. Every number that is not countable carries this chip, and
 * the panel header repeats it.
 */
function DemoChip() {
  return (
    <span className="inline-flex items-center gap-1 border border-warn/40 px-1.5 py-0.5 font-mono text-[0.5625rem] uppercase tracking-[0.16em] text-warn">
      <TriangleAlert className="size-2.5" aria-hidden="true" />
      Demo
    </span>
  );
}

function StatTile({ stat, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const value = useCountUp(stat.value, inView, 1400 + index * 120);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.6, delay: index * 0.07, ease: EASE }}
      className="bg-void p-5 sm:p-6"
    >
      <div className="flex items-start justify-between gap-3">
        <p className="mono-label">{stat.label}</p>
        {stat.demo ? <DemoChip /> : null}
      </div>

      <p className="mt-4 font-display text-[clamp(2rem,4.5vw,3rem)] font-semibold leading-none tracking-[-0.04em] tabular-nums">
        {/* The animated digits are decorative; the true value is always exposed. */}
        <span aria-hidden="true">
          {value.toLocaleString()}
          <span className="text-accent">{stat.suffix}</span>
        </span>
        <span className="sr-only">
          {stat.value.toLocaleString()}
          {stat.suffix}
        </span>
      </p>

      <p className="mt-3 text-xs leading-relaxed text-faint">{stat.caption}</p>
    </motion.div>
  );
}

function Panel({ title, icon: Icon, children, className = "", note }) {
  return (
    <div className={`flex flex-col bg-void ${className}`}>
      <div className="flex items-center justify-between border-b border-rule px-5 py-3">
        <span className="flex items-center gap-2.5 mono-label">
          <Icon className="size-3.5 text-accent" aria-hidden="true" />
          {title}
        </span>
        {note}
      </div>
      <div className="flex-1 p-5">{children}</div>
    </div>
  );
}

export function SecurityDashboard() {
  return (
    <Section id="dashboard">
      <SectionHeading
        id="dashboard-heading"
        index="04"
        label="Console"
        title="Security dashboard"
        lead="A monitoring console for the one system I can honestly report on: my own progress. Read the labels — the figures marked DEMO are illustrative placeholders, not measured security telemetry."
      />

      <Reveal delay={0.08} className="mt-10">
        <div className="flex flex-wrap items-center justify-between gap-3 border border-rule bg-panel px-5 py-3">
          <span className="flex items-center gap-2.5 font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-bone">
            <StatusDot />
            System status // Operational
          </span>
          <span className="flex items-center gap-2 font-mono text-[0.625rem] uppercase tracking-[0.16em] text-warn">
            <TriangleAlert className="size-3" aria-hidden="true" />
            Illustrative — portfolio demo data
          </span>
        </div>
      </Reveal>

      <div className="mt-px grid grid-cols-1 gap-px border border-rule bg-rule sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat, i) => (
          <StatTile key={stat.id} stat={stat} index={i} />
        ))}
      </div>

      <div className="mt-px grid grid-cols-1 gap-px border-x border-b border-rule bg-rule lg:grid-cols-12">
        <Panel
          title="Activity trend"
          icon={Activity}
          note={<DemoChip />}
          className="lg:col-span-7"
        >
          <ThreatGraph series={activitySeries} className="h-[180px]" />
          <p className="mt-4 font-mono text-[0.625rem] uppercase tracking-[0.16em] text-faint">
            Relative shape only — no units, no measured events.
          </p>
        </Panel>

        <Panel title="Focus distribution" icon={Radar} className="lg:col-span-5">
          <RadarStat axes={focusRadar} className="mx-auto max-w-[280px]" />
        </Panel>
      </div>

      <div className="mt-px grid grid-cols-1 gap-px border-x border-b border-rule bg-rule lg:grid-cols-12">
        <Panel title="System health" icon={ShieldCheck} className="lg:col-span-5">
          <ul className="space-y-5">
            {systemHealth.map((row, i) => (
              <li key={row.label}>
                <div className="flex items-baseline justify-between gap-4">
                  <span className="mono-label">{row.label}</span>
                  <span
                    className={`font-mono text-[0.625rem] uppercase tracking-[0.16em] ${
                      row.state === "elevated" ? "text-warn" : "text-accent"
                    }`}
                  >
                    {row.state}
                  </span>
                </div>
                <div className="mt-2 h-px w-full bg-rule">
                  <motion.div
                    className={`h-px origin-left ${
                      row.state === "elevated" ? "bg-warn" : "bg-accent"
                    }`}
                    style={{ width: `${row.value}%` }}
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={VIEWPORT}
                    transition={{ duration: 0.9, delay: 0.1 + i * 0.09, ease: EASE }}
                  />
                </div>
              </li>
            ))}
          </ul>

          <dl className="mt-8 border-t border-rule pt-5">
            <dt className="mono-label">Security focus</dt>
            <dd className="mt-2 font-mono text-sm text-bone">{focusAreas}</dd>
          </dl>
        </Panel>

        <div className="bg-void p-5 lg:col-span-7">
          <Terminal
            title="portfolio.log"
            className="h-full border-0 bg-transparent"
            lines={consoleLog.map((line) => ({
              tag: line.tag,
              text: line.text,
              accent: line.tag === "NOTE",
            }))}
          />
        </div>
      </div>
    </Section>
  );
}
