# DESIGN.md

Visual source of truth for All-Star Utilities. Implementation tokens live in `src/app/globals.css`. Do not invent a competing palette. Business facts live in `src/lib/site.ts`.

Studio: `studio-director` sequences the work. `ui-designer` designs, `content-strategist` owns IA/copy, `frontend-builder` implements UI, `site-engineer` owns server/data/technical SEO, `ui-critic` reviews the rendered site.

# Brand

- business name: All-Star Utilities (formerly M&B Services)
- industry: Twin Cities sewer, water, excavation, and sewer pipe lining
- audience: homeowners, property owners, builders/developers, commercial managers, emergency callers
- desired perception: trustworthy, capable, family-owned, on-site owner/operator, modern without looking like a SaaS startup
- personality: professional contractor, approachable, direct, calm under emergency
- design direction: dark utility-night field with All-Star red and Twin Cities blue. Modern, not blocky. Purposeful motion. Strong phone and free-consultation CTAs. Conversion goal is a free consultation / free site evaluation.

# Colors

Existing CSS variables in `src/app/globals.css` `:root`. Use these tokens.

- primary: `--brand` `#d71920` (All-Star red)
- secondary: `--brand-strong` `#b00020`
- hover/lift: `--brand-soft` `#ee6e73` (one shade lighter than brand red, for ghost and emergency link hover)
- accent: `--accent` `#0b63ce` / `--accent-soft` `#3b8ff0`
- background: `--bg-deep` `#060b14`, `--bg-base` `#0a1220`
- surface: `--bg-elevated` `#111c2e`, `--bg-glass`, `--panel` `#ffffff` (light panels on dark pages)
- text: `--foreground` `#eef2f7`
- muted text: `--muted` `#94a3b8`
- borders: `--line`, `--line-strong`
- success: `--success` `#5dcc8a` (check icon only); `--success-soft` `rgb(93 204 138 / 0.14)` (stamp well). Do not use accent blue (`#3b8ff0`) as success.
- warning: not tokenized yet
- error: not tokenized yet — form errors should use brand red with clear text, not a third red

Ambient backdrop red/blue orbs and the header stripe are brand identity, not decoration to multiply on every card.

# Typography

- display font: Geist (`--font-geist-sans` via `next/font` in `src/app/layout.tsx`)
- body font: Geist
- mono: Geist Mono for codes/IDs only
- heading scale:
  - `.heading-hero` — clamp 2.5rem–5.75rem, weight 900, line-height 0.95
  - `.heading-display` — clamp 2.25rem–4.25rem, weight 900
  - `.heading-section` — clamp 1.75rem–2.75rem, weight 900
  - `.eyebrow` — 0.8125rem, weight 800, uppercase, tracking 0.12em, brand red
- body scale: `.text-lead` clamp 1.05rem–1.25rem, line-height 1.75
- weights: 700–900 for UI chrome and headings; regular/medium for long reading
- line heights: tight on heroes (0.95–1.1), 1.75 on lead copy

# Spacing

- spacing scale: Tailwind 4 defaults plus component padding `p-5` / `md:p-6`
- section spacing: `.section-flow` clamp 3.5rem–5.5rem; `.section-flow--tight` clamp 2.5rem–3.5rem
- container widths: `.container-page` = `min(1120px, calc(100% - 32px))`
- grid/gutters: common `gap-8` / `gap-10`; marketing splits `lg:grid-cols-[0.9fr_1.1fr]`

# Components

Reuse these instead of new layouts.

- buttons: `.button-primary` (red gradient, min-height 44px), `.button-secondary`, `.button-ghost`. Radius 0.65rem — not pills.
- inputs: `.field` + `.label`. Focus uses accent blue border. Keep 44px tap targets.
- cards: `.glass-panel` / `--interactive`. Use sparingly; not every section is a card grid.
- navbar: `src/components/header.tsx` — sticky `top: 0`, transparent at scroll 0 (home hero tucks under), `--bg-deep` glass when scrolled, logo, desktop links, mobile menu, phone CTA. Admin nav is a separate path.
- footer: `src/components/footer.tsx` — multi-column on `md+`, extra bottom padding on mobile for tap targets.
- dialogs: none on the public site today. If added, match glass panel + 0.65rem radius + visible focus.
- forms: `consultation-form.tsx` (multi-step public inquiry), `login-form.tsx` (owner). Labels required.
- tables: owner inquiry lists only. Keep dense and readable; not marketing cards.
- badges: use `.eyebrow` or small bold text. Avoid pill soup.
- alerts: form status messages in the consultation flow. Clear, not toast-spam.

Related templates: `service-page.tsx`, `landing-page.tsx`, `home-page.tsx`, `cta-band.tsx`, `section-heading.tsx`, `info-hero.tsx`, `site-backdrop.tsx`.

# Layout

- desktop: max content 1120px, split heroes and service bodies, header min-height 5.5rem
- tablet: 768px+ — two-column footer, larger type, grids start collapsing
- mobile: stacked, hero content bottom-aligned in tall viewports (`min-h-[85svh]`), sticky-friendly phone CTA
- breakpoints: Tailwind `sm` / `md` (768) / `lg` (1024). Custom CSS also uses 768 and 1024.
- Home page (example overhaul): photography-editorial, **centered** type and CTAs — cinematic Twin Cities hero, four-fact heritage strip, two job-type work rows (residential / commercial), then CIPP lining as an option — not a third job category. Do not rebuild the six-card services bento.

# Motion

- transitions: 160–220ms ease on buttons/fields; cubic-bezier(0.22, 1, 0.36, 1) on panels
- hover: slight translateY, brightness, border-color — not bounce or scale explosions
- entrance: `FadeIn` / `Stagger` in `src/components/motion.tsx` (Framer Motion), viewport once
- reduced motion: `useReducedMotion()` disables entrance motion; CSS `scroll-behavior: smooth` should be respected — do not add GSAP unless asked
- ambient: `.site-backdrop__orb` slow drift. Do not add more floating blobs.

# Imagery

- photography direction: real crews, excavation, pipe lining equipment, work sites, finished repairs. No unreadable plates, unsafe practices, or identifying customers without permission.
- illustration direction: none by default. Prefer photography over abstract 3D.
- icon style: Lucide, 18px in CTAs, `aria-hidden` when paired with text. Do not introduce a second icon pack.

# Accessibility

- contrast: light text on `--bg-deep`; brand red for eyebrows/CTAs. Verify new text/background pairs at 4.5:1.
- focus states: `:focus-visible { outline: 3px solid var(--brand); outline-offset: 3px; }` — keep it.
- keyboard navigation: header menu, forms, and skip-to-content where needed.
- semantics: header / main / footer already in `layout.tsx`. Preserve heading order.
- form labels: visible `.label` on every field. Do not placeholder-only.
- reduced motion: honor `useReducedMotion` and `prefers-reduced-motion` for new animation.

# Avoid

- generic SaaS pastels, Inter-on-white dashboards, AI purple, cream+#F4F1EA serif startups
- default shadcn look as the brand
- endless rounded-card feature grids
- pill-shaped buttons
- gradient text
- extra glassmorphism layers on top of `.glass-panel`
- cartoon icons or emoji-as-icons
- blog clutter (blog is out of scope)
- restyling `/admin` and `/owner` as marketing pages
- new animation libraries
- hard-coded phone/address/email outside `src/lib/site.ts`
