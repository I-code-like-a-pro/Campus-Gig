# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  # CampusGig (web)

  Simple single-page CampusGig demo built with React, TypeScript, Vite and Tailwind.

  # CampusGig (web)

  CampusGig is a minimal single-page demo marketplace for short campus gigs (Hirer & Runner roles). It is built with React + TypeScript, bundled with Vite, and styled with Tailwind CSS. The app is intentionally simple and uses in-memory state for jobs so you can iterate quickly.

  This README focuses on development and maintenance of the `web` package. This repo uses pnpm as the package manager — commands shown use `pnpm` (not `npm`).

  ## Prerequisites
  - Node.js (recommended 18+)
  - pnpm (v8+ recommended). Install with:

```

npm install -g pnpm

```

## Quick start
From the project root or inside the `web` folder:

Install dependencies:

```

- add real persistence (mock server or localStorage);
  ```

  Run the dev server (hot reload):

  ```
  cd web
  pnpm dev
  ```

  Build for production (TypeScript project build + Vite build):

  ```
  cd web
  pnpm build
  ```

  Preview the production build locally:

  ```
  cd web
  pnpm preview
  ```

  Lint and format:

  ```
  cd web
  pnpm lint
  pnpm format
  ```

  > Note: All commands above intentionally use `pnpm` to install/run scripts.

  ## Scripts (in `web/package.json`)
  - `pnpm dev` — start Vite dev server
  - `pnpm build` — runs `tsc -b` then `vite build` (type-check + bundle)
  - `pnpm preview` — preview the built site
  - `pnpm lint` / `pnpm lint:fix` — ESLint checks
  - `pnpm format` / `pnpm format:check` — Prettier formatting

  ## Project structure (important files)
  - `src/App.tsx` — main single-file app containing all pages and UI components (Landing, Register, Runner, Hirer, etc.). This is the primary place to modify UX and app logic.
  - `src/main.tsx` — app bootstrap and React root mounting.
  - `src/index.css` / `tailwind` config — global styling.
  - `web/package.json` — scripts and dependency declarations used for building and running the app.
  - `tsconfig.app.json` / `tsconfig.node.json` — TypeScript project configs used by `tsc -b`.

  ## App architecture notes
  - The app keeps state in React `useState` hooks. Jobs are seeded from `initialJobs` (see `src/App.tsx`) and updated in-memory. `App` owns `jobs` and `setJobs`, and passes `setJobs` into `HirerPage` for in-place edits.
  - No backend or persistence is included. To persist data, replace `setJobs` updates with API calls and load initial state from the server.

  ## Development tips
  - When adding TypeScript types or new source files update `tsconfig.app.json` if you change project references or root paths.
  - `pnpm build` runs `tsc -b` first — fixing TypeScript errors will be required before Vite builds.
  - Consider extracting large components from `src/App.tsx` into `src/components/` for maintainability.

  ## Troubleshooting
  - If `pnpm build` fails with TypeScript errors, run `pnpm -w -v` to verify pnpm installation and `pnpm -v` to check version. Fix type errors reported by `tsc -b`.
  - If you accidentally use `npm run build` and the monorepo expects pnpm, scripts may behave differently; prefer the `pnpm` commands listed above.

  ## Contributing / next steps
  - I can split `src/App.tsx` into smaller components, add localStorage persistence, or scaffold a small mock API if you want to work with real network calls. Tell me which option you prefer and I can implement it.

  ## License
  This demo contains no license file. Add a `LICENSE` if you intend to publish or share widely.

  ---
  File pointers: modify UI and logic in `src/App.tsx` and `src/main.tsx`.
  ```
- create small unit tests for core logic.
  ])

```

```
