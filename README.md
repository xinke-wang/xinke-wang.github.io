# Personal Academic Website

A minimalist personal academic website implemented from the **Academic Portfolio
Design System** (Claude Design handoff). Refined editorial minimalism: Cormorant
Garamond display serif + DM Sans body, warm off-white background, a single deep
academic-blue accent, full dark mode.

## Features

- **Four sections** — about (bio, news, fundings, teaching), publications,
  projects, group (students, alumni, prospective-student info) — switched via
  the top nav, with the last-viewed section remembered.
- **Dark mode** — ☾ / ☀ toggle in the top-right; persists across reloads with
  no flash on load.
- **Left profile column** — sticky card with avatar, name, email, and social
  icon links.
- **Publications list** — grouped by year, with:
  - award badges (`Best Paper` / `Distinguished Paper` in gold with 🏆 and a
    confetti burst on hover; `Spotlight` blue; `Oral` green),
  - top-tier venues highlighted in accent blue, workshops/others in grey,
  - long author lists truncated behind a clickable *et al.*,
  - ✉ marker for corresponding authorship,
  - GitHub ★ star-count chips.
- Subtle entry animation; `prefers-reduced-motion` respected.

## ✏️ Replace the placeholder content

All content is **placeholder data from the design handoff** ("Zhang Wei",
Tsinghua, fake papers). Edit the files in `src/data/` to make the site yours:

| File | Contents |
| --- | --- |
| `src/data/profile.js` | Name, email, photo, affiliation, social links |
| `src/data/about.js` | News, fundings, teaching |
| `src/data/publications.js` | Publications + top-venue list |
| `src/data/projects.js` | Projects |
| `src/data/group.js` | Students, alumni, prospective-student info |

The bio paragraphs live in `src/sections/About.jsx`. The site title is in
`index.html`. To use a real photo, drop e.g. `avatar.jpg` into `public/` and
set `photo: '/avatar.jpg'` in `src/data/profile.js`.

## Develop

```bash
npm install
npm run dev      # local dev server
npm run build    # static build into dist/
npm run preview  # serve the production build locally
```

The build is fully static (`dist/`) and deploys anywhere — GitHub Pages,
Netlify, Vercel, or any web server.

## Deploy to GitHub Pages

A GitHub Actions workflow (`.github/workflows/deploy.yml`) builds the site and
publishes it on every push to `main`. One-time setup:

1. Push the repo to GitHub.
2. In the repo, open **Settings → Pages** and set **Source** to
   **GitHub Actions**.

The next push to `main` (or a manual run from the **Actions** tab) deploys the
site. Because `vite.config.js` sets `base: './'` (relative asset paths), it
works whether the repo is a **project site**
(`https://<user>.github.io/<repo>/`) or a user site
(`https://<user>.github.io/`) — no config change needed. Section state lives in
React (there is no URL router), so there are no deep-link 404s to special-case.
