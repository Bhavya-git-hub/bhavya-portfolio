# React Bits components

The `.jsx` files in this directory are **not written by this project**. They are the
genuine upstream sources from React Bits, copied in verbatim — React Bits is a
copy-in library, not an npm runtime dependency, so this is how it is meant to be used.

| File | Upstream path |
|---|---|
| `DecryptedText.jsx` | `src/tailwind/TextAnimations/DecryptedText/DecryptedText.jsx` |
| `Magnet.jsx` | `src/tailwind/Animations/Magnet/Magnet.jsx` |

- **Source:** https://github.com/DavidHDev/react-bits (branch `main`), Tailwind + JavaScript variant
- **Site:** https://reactbits.dev
- **Author:** David Haz
- **License:** MIT + Commons Clause — full text in `LICENSE.md` beside this file.
  In short: free to use, including commercially, but the components themselves may not
  be sold, sublicensed, or redistributed as components. Using them inside this site is
  fine; republishing them as a component library is not.

## Why only these two

The React Bits effects that required GSAP (`SplitText`, `ScrambledText`,
`AnimatedContent`) were deliberately **not** taken: they pull in `gsap`, `gsap/SplitText`,
`gsap/ScrollTrigger` and `@gsap/react` — roughly 80 kB gzipped — to do work that Motion,
already in this bundle for everything else, does natively. The equivalents live in
`src/components/ui/Reveal.jsx` and `src/components/ui/ScrambleText.jsx`.

`DecryptedText` and `Magnet` earn their place: the first is a genuinely better
character-decrypt effect than a naive scramble (it reveals in a chosen direction and keeps
an accessible copy of the real text in the DOM), the second is the standard magnetic-button
interaction and needs no dependency at all.

## Updating

These files are vendored, so `npm update` will never touch them. To refresh:

```bash
curl -o DecryptedText.jsx \
  https://raw.githubusercontent.com/DavidHDev/react-bits/main/src/tailwind/TextAnimations/DecryptedText/DecryptedText.jsx
```

Note that `npx jsrepo add https://reactbits.dev/tailwind/...` — the official install path —
is the better route when your network can reach `reactbits.dev`.
