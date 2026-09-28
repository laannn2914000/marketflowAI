# Smart SEO Tool — Frontend (Study Project)

A React + Tailwind CSS starter, built with Vite, scaffolded as a base for
recreating the "B2B Smart SEO Tool" UI/UX design for study purposes.

> **Note:** I could not open the Behance link directly (Behance blocks
> automated requests), so this starter uses a generic SaaS-dashboard layout
> as a placeholder. Share screenshots of the actual screens and I'll rebuild
> the components, colors, and layout to match exactly.

## Tech stack

- **React 18** — UI library
- **Vite** — dev server & build tool (fast alternative to Create React App)
- **Tailwind CSS** — utility-first styling
- **React Router** — page navigation
- **Recharts** — charts for dashboard stats
- **lucide-react** — icon set

## Prerequisites

1. **Node.js** (v18 or newer) — download from https://nodejs.org (LTS version).
   Check it's installed:
   ```bash
   node -v
   npm -v
   ```
2. **VS Code** — https://code.visualstudio.com
3. Recommended VS Code extensions (open Extensions panel, Ctrl+Shift+X / Cmd+Shift+X):
   - **ES7+ React/Redux/React-Native snippets**
   - **Tailwind CSS IntelliSense**
   - **Prettier - Code formatter**
   - **ESLint**

## Setup

1. Unzip this project and open the folder in VS Code:
   `File > Open Folder...` → select `seo-tool-frontend`

2. Open a terminal inside VS Code: `Terminal > New Terminal`

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the dev server:
   ```bash
   npm run dev
   ```

5. Open the URL shown in the terminal (usually `http://localhost:5173`) in
   your browser. The page will hot-reload as you edit files.

## Project structure

```
seo-tool-frontend/
├── index.html              # HTML entry point
├── package.json            # dependencies & scripts
├── tailwind.config.js      # Tailwind theme (colors, fonts) — edit palette here
├── postcss.config.js       # required for Tailwind
├── vite.config.js          # dev server config
└── src/
    ├── main.jsx             # React app bootstrap
    ├── index.css            # Tailwind imports + global styles
    ├── App.jsx               # top-level layout (sidebar + topbar + page)
    ├── components/
    │   ├── Sidebar.jsx        # left navigation
    │   ├── Topbar.jsx         # header with search + profile
    │   └── StatCard.jsx       # small reusable metric card
    └── pages/
        └── Dashboard.jsx      # main dashboard page (chart + table)
```

## How to customize toward the real design

1. **Colors** — edit the `brand` and `ink` color scales in `tailwind.config.js`
   once you know the exact hex values from the Behance design.
2. **Fonts** — the starter uses "Inter" (loaded via Google Fonts in
   `index.html`). Swap the `<link>` tag and `fontFamily` in
   `tailwind.config.js` if the design uses a different typeface.
3. **Layout** — `App.jsx` currently renders one fixed layout (sidebar +
   topbar + dashboard). As you add more screens (e.g. Keyword Research,
   Content Audit), create a new file per page under `src/pages/` and wire it
   up with React Router in `main.jsx` / `App.jsx`.
4. **Components** — break each distinct UI block from the design (cards,
   tables, forms, modals) into its own file under `src/components/`, and
   reuse them across pages the same way `StatCard.jsx` is reused now.

## Useful commands

| Command           | What it does                          |
|--------------------|----------------------------------------|
| `npm run dev`      | Start local dev server with hot reload |
| `npm run build`    | Build a production bundle into `dist/` |
| `npm run preview`  | Preview the production build locally   |

## Next steps

- Share 2–3 screenshots of the Behance screens you want to replicate (hero
  view, dashboard, and any secondary screens), and I'll rebuild the specific
  layout, spacing, and colors to match.
- If you'd like data to come from a real backend later, we can add a small
  Node.js/Express API — for now everything is static/mock data in
  `Dashboard.jsx` so you can focus on layout and styling first.
