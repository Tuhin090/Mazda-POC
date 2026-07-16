# Mazda POC — Frontend

## Homepage replica assets (`public/mazda/`)

The landing page (`/`) is a component-by-component replica of the mazdausa.com
homepage (content snapshot 2026-07-16, see `src/data/homeData.js`). Its media
lives in `public/mazda/`, mirroring the live site's asset paths.

- Images, fonts and icons are committed to the repo (~4 MB).
- **Videos (`*.mp4`, ~29 MB) are gitignored.** After a fresh clone run:

  ```bash
  npm run fetch:assets
  ```

  This downloads everything in `scripts/mazda-asset-manifest.json` from
  mazdausa.com (skips files that already exist) and writes the resolved
  url → local-path map to `scripts/mazda-asset-resolved.json`.

**Font licensing note:** "Mazda Type" and the Mazda standard icon font are
proprietary corporate typefaces. They are self-hosted here solely for this
Mazda-authorized POC — do not reuse or redistribute them outside this project.

POC deltas vs the live homepage: the header has a Help button (opens the
unauthorized Agentforce chat), the zip-code button is replaced by a user icon
that routes to `/login`, and Owners → FAQs (plus the footer FAQ link) routes to
the internal `/faq` landing page. All other links open the live mazdausa.com
pages in a new tab.

---

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
