# bhavya-portfolio

A single-page, dark, interactive portfolio for a cybersecurity student — built as a
security operations console rather than a template.

React 18 · Vite · Tailwind CSS v4 · Motion · Lucide

---

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build into dist/
npm run preview    # serve the production build
npm run lint       # eslint, zero warnings allowed
```

Node 22 or newer.

---

## The only file you need: `src/data/`

**No component contains a name, a date, a URL or a number.** Everything you would want
to change lives in six data files. If you find a fact hardcoded in a component, that is
a bug.

| File | What it holds |
|---|---|
| `src/data/site.js` | your name, role, bio, metadata, nav, **all links**, hero graph nodes |
| `src/data/projects.js` | the four project entries |
| `src/data/skills.js` | skill categories, levels and toolsets |
| `src/data/timeline.js` | education / trajectory entries |
| `src/data/certifications.js` | earned credentials, and what you are working towards |
| `src/data/dashboard.js` | the console section's figures |

Every entry carries a JSDoc `@typedef`, so your editor autocompletes the shape without
this being a TypeScript project.

### Placeholders

Anything not filled in is the string `PLACEHOLDER` (`"REPLACE_ME"`), and the UI renders
it as **visibly unset** — a disabled button that says `[ not set ]`, a struck-through
label — rather than as a link to `#`. A dead link looks broken; an honest gap does not.

Replace these first:

| Where | What |
|---|---|
| `site.links.linkedin` | your LinkedIn URL |
| `site.links.resume` | drop a PDF in `public/` and set e.g. `"/resume.pdf"` |
| `projects[].repo` / `.demo` | real URLs |
| `projects[].description` / `.highlights` | your own words — the shipped copy tells you what to write |
| `certifications` | ships **empty on purpose**; add only credentials you actually hold |

`site.links.email` and `site.links.github` are already real.

---

## Two things that are deliberate

**The dashboard says DEMO on every invented figure.** The section renders an
`ILLUSTRATIVE — PORTFOLIO DEMO DATA` header, and each non-countable stat carries its own
chip. A portfolio dashboard reporting "1,284 threats analysed" as if it were real
telemetry is a fabricated security claim, and the people you want to impress are exactly
the people who will read it as one. Keep the chips. If you cannot say where a number came
from, it is `demo: true`.

**Certifications and targets never share a list.** Earned credentials are solid panels
with a verification link; "working towards" entries are grey, captioned, and sit under a
`NOT YET EARNED` header. Do not merge them.

---

## Structure

```
src/
  data/          all editable content (above)
  hooks/         media queries, pointer, active section, count-up, smooth scroll
  lib/motion.js  one easing curve and one viewport config for the whole site
  components/
    ui/          Button, MagneticButton, Reveal, Terminal, GlowCard, Cursor, …
    reactbits/   vendored React Bits sources — see its ATTRIBUTION.md
    Navbar, Hero, NetworkCanvas, About, Skills, Projects, SecurityDashboard,
    Timeline, Certifications, Contact, Footer
```

### Design tokens

The palette lives in exactly one place: the `@theme` block at the top of `src/index.css`.
There is no `tailwind.config.js` — Tailwind v4 reads the tokens from there, so a colour
cannot drift between two sources of truth. Change `--color-accent` and the whole site
changes with it.

### Motion

Every scroll reveal goes through `components/ui/Reveal.jsx`, and every transition shares
one easing curve from `lib/motion.js`. Under `prefers-reduced-motion: reduce` the smooth
scroller never starts, the hero canvas paints a single static frame, and reveals render
their end state directly — **no content is ever gated behind an animation that did not
run.**

Performance: one `requestAnimationFrame` loop on the page (the hero canvas), which pauses
when scrolled out of view and scales its particle count to the viewport; the dashboard is
code-split below the fold; animations touch only `transform` and `opacity`.

---

## Deploying

`vercel.json` is committed — import the repo at vercel.com and it builds on every push.
Any static host works: `npm run build`, serve `dist/`, and rewrite unknown paths to
`index.html`.

---

## Licence

MIT — see `LICENSE`, with one exception: `src/components/reactbits/` contains upstream
React Bits sources under **MIT + Commons Clause**, and keeps its own `LICENSE.md` and
`ATTRIBUTION.md` beside them.
