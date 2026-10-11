# Prompt Studio

An interactive **prompt builder playground**. Fill in structured sections — role, task, context, constraints, tone and output format — and watch the assembled prompt update live. Copy it with one click, or save it as a preset to reuse later.

Built with **React 18 + Vite + TypeScript** and plain CSS (no UI library, no runtime dependencies beyond React).

![Prompt Studio screenshot](docs/screenshot.png)

> 📸 **Screenshot placeholder:** drop a screenshot at `docs/screenshot.png` and it will render here.

## Live Demo

🔗 **[https://your-project-name.vercel.app](https://your-project-name.vercel.app)** _(placeholder — replace after your first Vercel deploy)_

> If the demo is password protected, the password is shared separately.

## Features

- **Six prompt sections** — Role, Task, Context, Constraints, Tone and Output format, each with a hint and an on/off toggle.
- **Live preview** — the assembled prompt updates as you type; constraints become a bulleted list and empty or disabled sections are skipped.
- **Copy to clipboard** — one-click copy with inline feedback (and a fallback for older browsers).
- **Presets** — save, load and delete named presets, stored in `localStorage`.
- **Auto-saved draft** — your in-progress prompt survives a page refresh.
- **Stats** — word, character and rough token counts.
- **Example prompt** — one click to load a sample.
- **Optional password gate** — enable with a single environment variable (see below).
- **Polished, responsive UI** — light/dark theme via `prefers-color-scheme`, keyboard friendly, accessible labels.

## Getting Started

**Prerequisites:** Node.js 18+ (20+ recommended) and npm.

```bash
# 1. Install dependencies
npm install

# 2. (Optional) create a local env file
cp .env.example .env.local

# 3. Start the dev server
npm run dev
```

Then open the URL printed in the terminal (usually http://localhost:5173).

## Scripts

| Script              | What it does                                         |
| ------------------- | ---------------------------------------------------- |
| `npm run dev`       | Start the Vite dev server with hot reload            |
| `npm run build`     | Type-check with `tsc -b`, then create a production build in `dist/` |
| `npm run preview`   | Serve the production build locally                   |
| `npm run typecheck` | Run the TypeScript compiler without emitting files   |

## Project Structure

```
prompt-studio/
├── docs/
│   └── screenshot.png        # add your own screenshot (referenced above)
├── public/
│   └── favicon.svg
├── src/
│   ├── components/           # Presentational UI components
│   │   ├── Header.tsx
│   │   ├── PasswordGate.tsx
│   │   ├── PresetsPanel.tsx
│   │   ├── PromptForm.tsx
│   │   ├── PromptPreview.tsx
│   │   ├── SectionField.tsx
│   │   └── index.ts
│   ├── hooks/                # Stateful logic
│   │   ├── useClipboard.ts
│   │   ├── useLocalStorage.ts
│   │   ├── usePresets.ts
│   │   └── usePromptBuilder.ts
│   ├── lib/                  # Pure helpers and types (no React)
│   │   ├── buildPrompt.ts    # assembles the final prompt string
│   │   ├── gate.ts           # password gate helpers
│   │   ├── sections.ts       # section definitions + example prompt
│   │   ├── storage.ts        # safe localStorage helpers
│   │   └── types.ts
│   ├── styles/
│   │   └── index.css
│   ├── App.tsx
│   ├── main.tsx
│   └── vite-env.d.ts
├── .env.example
├── .gitignore
├── index.html
├── package.json
├── tsconfig*.json
└── vite.config.ts
```

## Password Gate (optional)

The app can show a simple password screen before the playground loads.

- **Disabled by default.** If `VITE_DEMO_PASSWORD` is unset or empty, no gate is shown.
- **To enable locally:** create `.env.local` and set

  ```bash
  VITE_DEMO_PASSWORD=your-demo-password
  ```

  then restart `npm run dev`.
- **To enable on Vercel:** add `VITE_DEMO_PASSWORD` under **Project → Settings → Environment Variables**, then **redeploy** (Vite inlines env vars at build time).
- Once unlocked, the visitor stays unlocked for the current browser tab session (`sessionStorage`).

> ⚠️ **This is a casual deterrent, not real security.** The gate runs entirely in the browser, and any `VITE_*` variable is embedded in the public JavaScript bundle. Anyone who opens dev tools can read the password and bypass the gate. Use it to keep a demo link from being casually browsed — **never** to protect sensitive content or reuse a real password. For genuine protection, use server-side auth (for example Vercel Deployment Protection on a paid plan).

## Deploy to Vercel

Vite is auto-detected, so **no `vercel.json` is needed**.

1. Push this project to a GitHub repository (private is fine).
2. In [Vercel](https://vercel.com), choose **Add New… → Project** and import the repository.
3. Accept the detected settings:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
4. _(Optional)_ Add `VITE_DEMO_PASSWORD` under **Environment Variables**.
5. Click **Deploy**. You'll get a public URL like `https://your-project-name.vercel.app`.

Every push to the default branch redeploys automatically; other branches and pull requests get their own preview URLs. The source repository stays private even though the demo URL is public.

## License

Add a license of your choice. This is a demo project and contains no proprietary or third-party company code.
