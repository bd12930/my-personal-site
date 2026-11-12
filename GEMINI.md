# Project Context: Personal Website

## Tech Stack
- Framework: Astro (with `@astrojs/cloudflare` adapter)
- Styling: Tailwind CSS
- Deployment: Cloudflare Workers / Pages

## Project Structure & Conventions
- Pages live in `src/pages/`, reusable UI in `src/components/`, and layouts in `src/layouts/`.
- Keep pages static (`prerender = true`) by default unless dynamic server-side rendering on Cloudflare Workers is explicitly needed.
- Style components directly with Tailwind CSS utility classes; avoid custom CSS files unless necessary.
- Avoid Node.js-only built-in APIs (like `fs` or `path`) in runtime server code so builds remain compatible with Cloudflare's edge runtime.

## CLI & Token Efficiency Rules
- Only read or modify files explicitly named in my prompt.
- Never scan `node_modules/`, `.astro/`, `dist/`, `.wrangler/`, or lockfiles.
- Keep explanations brief (1–3 sentences) and show only changed code snippets unless asked for the full file.
