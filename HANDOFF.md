# RouterOS Command Center — Handoff Summary

## Overview

**RouterOS Command Center** (branded as "RouterOS Hub") is a technical documentation site for RouterOS recovery and diagnostic workflows. It provides step-by-step procedures for network administrators working with RouterOS-based devices.

- **Live URL:** https://quizstew-pro.vercel.app
- **Repo:** https://github.com/quizstew/quizstew-pro
- **Node:** >= 20

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 16 (App Router) |
| React | 19.2 |
| Styling | Tailwind CSS v4 |
| Diagrams | Mermaid.js (client-side render) |
| Fonts | Geist Sans, Geist Mono (next/font) |
| Deployment | Vercel (GitHub auto-deploy) |

---

## Project Structure

```
quizstew/
├── app/                    # Next.js App Router
│   ├── layout.tsx          # Root layout (Navbar, footer, fonts)
│   ├── page.tsx            # Homepage
│   ├── globals.css         # Theme, Tailwind, CSS variables
│   ├── about/
│   ├── contact/
│   ├── legal/privacy/
│   ├── legal/terms/
│   └── procedures/
│       ├── page.tsx        # Procedures index (searchable)
│       ├── [slug]/page.tsx # Dynamic procedure pages
│       └── fundamentals/ip-addressing/
├── components/
│   ├── Navbar.tsx          # Header + mobile hamburger
│   ├── Mermaid.tsx         # Client component for flowcharts
│   ├── Search.tsx          # Procedure search
│   ├── Footer.tsx
│   ├── FooterDisclaimer.tsx # Trademark/affiliation disclaimer
│   ├── Sidebar.tsx
│   └── ui/
│       └── ProcedureDiagram.tsx  # Wrapper for diagrams
├── content/
│   ├── procedures/         # Procedure content + registry
│   │   ├── registry.ts     # Central registry (add new procedures here)
│   │   ├── netinstall.tsx
│   │   ├── vlan-setup.tsx
│   │   ├── vpn-tunnels.tsx
│   │   └── firewall-rules.tsx
│   └── diagrams/
│       └── NetinstallFlow.tsx
├── lib/
│   └── mermaid-theme.ts    # Shared Mermaid theme
├── audit.js                # SEO audit script (Ollama + cheerio)
└── package.json
```

---

## Key Concepts

### Procedure Registry

All procedures are registered in `content/procedures/registry.ts`. To add a new procedure:

1. Create `content/procedures/your-slug.tsx` with `meta` and default export.
2. Import and add to `registry` in `registry.ts`.
3. The slug becomes `/procedures/your-slug`.

### Diagram System

- **Mermaid** renders flowcharts client-side. Charts use a shared dark theme from `lib/mermaid-theme.ts`.
- **ProcedureDiagram** wraps diagrams in a styled container. Use with `<Mermaid chart={...} />` for flowcharts.
- New procedures get the theme automatically; no extra config needed.

### Theme / Styling

- **Dark theme:** Background `#1f2226`, accent `#64b5f6`, surface border `#2c3342`.
- Colors are defined in `app/globals.css` via `@theme inline` so Tailwind generates stable classes (`bg-surface`, `border-surface-border`, `text-accent`).
- Avoid arbitrary values like `bg-[#1f2226]` in production; use theme classes.

---

## Legal & Trademark

- **Branding:** Site uses "RouterOS Command Center" and "RouterOS Hub" (neutral, product-focused).
- **FooterDisclaimer:** Independent documentation hub disclaimer; not affiliated with, endorsed by, or sponsored by MikroTik.
- **Hardware references:** Documentation uses "RouterOS-based devices" or "supported hardware" rather than vendor-specific terms.
- **No-index:** `robots: { index: false, follow: false }` in layout metadata; `robots.txt` disallows crawlers until ready for public indexing.

---

## Routes

| Path | Type | Description |
|------|------|-------------|
| `/` | Static | Homepage, procedure directory |
| `/procedures` | Static | Searchable procedure index |
| `/procedures/[slug]` | SSG | Procedure detail (netinstall, vlan-setup, etc.) |
| `/procedures/fundamentals/ip-addressing` | Static | IP addressing fundamentals |
| `/about` | Static | About page |
| `/contact` | Static | Contact form |
| `/legal/privacy` | Static | Privacy policy |
| `/legal/terms` | Static | Terms of service |

---

## Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start dev server (localhost:3000) |
| `npm run build` | Production build |
| `npm run start` | Run production server |
| `npm run lint` | ESLint |
| `npm run audit` | SEO audit (crawls domain, uses Ollama) |

---

## Deployment

- **Platform:** Vercel
- **Trigger:** Push to `main` on GitHub
- **Build:** `next build` (static + SSG)
- No env vars required for basic deployment.

---

## Adding a New Procedure

1. Create `content/procedures/my-procedure.tsx`:

```tsx
import Mermaid from '@/components/Mermaid';
import ProcedureDiagram from '@/components/ui/ProcedureDiagram';

export const meta = {
  title: 'My Procedure',
  description: 'Short description.',
  category: 'Network', // or Hardware, General
};

export default function MyProcedureContent() {
  return (
    <>
      <h2 className="text-2xl font-semibold mt-10">Flow</h2>
      <ProcedureDiagram>
        <Mermaid chart={`
        flowchart TD
          A[Step 1] --> B[Step 2]
        `} />
      </ProcedureDiagram>
    </>
  );
}
```

2. Register in `content/procedures/registry.ts`:

```ts
import * as myProcedureModule from './my-procedure';

const registry = {
  // ...existing
  'my-procedure': { meta: myProcedureModule.meta, default: myProcedureModule.default },
};
```

---

## Audit Script

`audit.js` crawls the live site and runs SEO analysis via Ollama. Requires:

- Ollama running locally with `llama3.2` model
- `npm run audit` (defaults to quizstew-pro.vercel.app)
- Or: `npm run audit -- https://other-site.com`

---

## Notable Files

- **`app/globals.css`** — Theme colors, Tailwind config, body styles
- **`content/procedures/registry.ts`** — Single source of truth for procedures
- **`lib/mermaid-theme.ts`** — Diagram colors (dark nodes, light blue accents)
- **`components/Mermaid.tsx`** — Auto-applies theme to charts without `%%{init:}%%`
- **`components/FooterDisclaimer.tsx`** — Trademark/affiliation disclaimer

---

## Contact / Maintenance

- Git config: quizstew <quizstew@gmail.com>
- Repo: quizstew/quizstew-pro
