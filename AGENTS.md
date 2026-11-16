# AGENTS.md — Asuna Portfolio Architecture & Agent Operating Manual

> **Workspace**: `/Users/asuna/Documents/eKYC/fun-thing/AI-portfolio`  
> **Identity**: Sros Songha (Asuna / @srossongha) — Software Engineer & Front-end Developer Intern  
> **Affiliation**: Institute of Technology of Cambodia (ITC) · T.O Group · Former EKYC Solution Co., Ltd.  
> **Stack**: Nuxt 4 (`^4.5.2`), Vue 3, Tailwind CSS v4, Vite 8, Nitro 2, GSAP, Lenis, shadcn-vue (Reka UI), DotLottie, Cloudflare Workers

---

## 1. Executive Summary & Core Engineering Philosophy

This repository is a production portfolio engineered to reflect **authentic software engineering discipline, mechanical sympathy, and refined user experience**.

### Non-Negotiable Design & Engineering Standards

1. **Zero "AI Slop" & Buzzwords**:
   - **NO** blurry glowing floating gradient spheres or fake sci-fi tropes.
   - **NO** generic buzzwords ("synergy", "cyber-grid", "cutting-edge AI paradigm").
   - **YES** authentic developer craftsmanship: developer nerd font stack, dark industrial coordinate matrix (`CyanAurora.vue`), tactile retro hardware consoles (Commodore PET-2001 shell, GameBoy console with 8-bit Byte Runner, Nagra reel-to-reel HUD), high-contrast electric cyan and midnight slate palette (`oklch`).

2. **Single Source of Truth for Content**:
   - **ALL site content lives in [`app/data/site.ts`](app/data/site.ts)** and is typed via [`app/types/portfolio.ts`](app/types/portfolio.ts).
   - NEVER hard-code names, bios, project specs, job roles, or social links inside `.vue` components. Update `site.ts` instead.

3. **Performance, Frame Budget & Motion**:
   - **60fps Compositor-Only Animations**: Animate `transform` (`scaleX`, `translate3d`) and `opacity`. NEVER animate layout-triggering properties (`width`, `height`, `top`, `margin`).
   - **Synchronized Single Animation Loop**: Lenis smooth scroll must **never** run its own `requestAnimationFrame` loop. It is driven exclusively by GSAP's ticker (`plugins/lenis.client.ts`).
   - **Strict Reduced Motion**: Every animation, physics effect, and smooth-scroll momentum checks `useReducedMotion()` / `prefers-reduced-motion` and gracefully falls back to instant transitions.
   - **Zero CPU/GPU Leaks**: GSAP ScrollTriggers are scoped and automatically reverted on unmount via `useGsapContext()`. DotLottie and WebGL/Canvas instances disconnect when scrolled out of the viewport.

---

## 2. Codebase Architecture & Directory Map

```
AI-portfolio/
├── AGENTS.md                     # ← THIS FILE: Agent instructions & architectural guide
├── package.json                  # Scripts & dependencies (Nuxt 4, Tailwind v4, GSAP, etc.)
├── nuxt.config.ts                # Single control panel: modules, Nitro preset, head, auto-imports
├── tsconfig.json                 # TypeScript config extending .nuxt/tsconfig.json
├── skills-lock.json              # Lockfile for Cloudflare Agent skills in .agents/skills/
├── .agents/
│   └── skills/                   # Agent skills directory (cf-cli, workers, portfolio-guide, etc.)
│
├── app/
│   ├── app.vue                   # Root container: Preloader, CustomCursor, Grain, Toaster, SEO & JSON-LD
│   ├── error.vue                 # 404 / 500 error boundary
│   ├── layouts/
│   │   └── default.vue           # Header, skip-link, main slot, footer, global PET-2001 terminal modal
│   │
│   ├── pages/
│   │   ├── index.vue             # Home page composing 7 choreographed scroll sections
│   │   └── work/
│   │       ├── index.vue         # Filterable project archive (/work)
│   │       └── [slug].vue        # Dynamic case study route with fatal 404 handling (/work/:slug)
│   │
│   ├── data/
│   │   └── site.ts               # ✏️ SINGLE SOURCE OF TRUTH for all content, bio, projects & socials
│   ├── types/
│   │   └── portfolio.ts          # TypeScript interfaces (Project, Experience, SkillGroup, etc.)
│   │
│   ├── assets/
│   │   └── css/
│   │       └── main.css          # Tailwind v4 CSS-first design system (OKLCH tokens, nerd fonts)
│   │
│   ├── components/
│   │   ├── sections/             # The 7 primary homepage sections (Hero, About, Work, etc.)
│   │   ├── layout/               # SiteHeader, SiteFooter, CommandPalette, ThemeToggle, ProgressBar
│   │   ├── fx/                   # CustomCursor, DotLottiePlayer, RetroGameBoy, PhosphorWave, Terminal…
│   │   ├── svg/                  # Clean handcrafted SVG assets (Cartridge, Gamepad, Badge, Radar)
│   │   └── ui/                   # shadcn-vue components (Button, Card, Dialog, Sonner, Tooltip…)
│   │
│   ├── composables/
│   │   ├── useAnimation.ts       # GSAP context cleanup, reduced motion, app-ready state
│   │   ├── useSmoothScroll.ts    # Lenis wrapper with SSR safety
│   │   └── useTerminal.ts        # Global reactive state for the 1970s CLI shell modal
│   │
│   ├── plugins/
│   │   ├── gsap.client.ts        # Registers ScrollTrigger & ScrollToPlugin with power3.out ease
│   │   └── lenis.client.ts       # Single-loop smooth scrolling integrated with GSAP ticker
│   │
│   └── lib/
│       └── utils.ts              # cn (clsx + twMerge), clamp, lerp, mapRange, pad
│
├── server/
│   └── api/
│       └── contact.post.ts       # Nitro POST /api/contact handler (validation, rate limit, Telegram bot)
│
├── scripts/
│   └── generate-dotlottie.mjs    # Node script building .lottie and .json animations from code
│
├── public/
│   ├── animations/               # Compiled .lottie & .json vector animations
│   ├── images/                   # Static images (profile photo, etc.)
│   ├── cv.pdf -> SROS Songha.pdf # Symlinked resume PDF
│   ├── favicon.svg               # SVG Favicon
│   └── robots.txt, sitemap.xml   # SEO crawlers & indexers
│
└── tests/
    └── nuxt/
        ├── contact.test.ts       # Tests for contact endpoint validation & bot honeypot logic
        ├── data.test.ts          # Integrity tests for app/data/site.ts schemas
        ├── terminal.test.ts      # Tests for PET-2001 CLI command parsing
        └── utils.test.ts         # Unit tests for lib/utils math & string helpers
```

---

## 3. Tech Stack Breakdown & Core Conventions

### 3.1. Nuxt 4 & Vue 3 Setup
- **Compatibility Date**: `"2026-08-11"`.
- **Component Auto-Imports**: Registered with `pathPrefix: false` in `nuxt.config.ts`.
  - `app/components/sections/HeroSection.vue` is used directly as `<HeroSection />`.
  - **Rule**: Every component filename across `sections/`, `fx/`, `layout/`, `ui/`, `svg/` must be unique.
- **SSR & Hydration**:
  - `ssr: true` is active for fast first paint and SEO prerendering.
  - Any browser-only API (Three.js, Web Audio, Canvas, Terminal Modal) MUST be wrapped in `<ClientOnly>` or gated in `onMounted`.
- **View Transitions API**: Enabled via `experimental: { viewTransition: true }` for smooth theme toggles.

### 3.2. Tailwind CSS v4 ("CSS-First")
- **NO `tailwind.config.js`**: Tailwind v4 is configured directly in [`app/assets/css/main.css`](app/assets/css/main.css).
- **OKLCH Color Spaces**: All color tokens use perceptually uniform OKLCH:
  - Background dark: `oklch(0.12 0.018 255)` (midnight slate obsidian `#080b12`).
  - Brand Cyan: `oklch(0.78 0.16 210)` (`#38bdf8`).
  - Royal Indigo: `oklch(0.62 0.22 275)` (`#818cf8`).
- **Nerd Font Stack**:
  ```css
  --font-mono: ui-monospace, 'SF Mono', 'SFMono-Regular', Menlo, Monaco, Consolas, 'JetBrains Mono', 'Fira Code', 'Liberation Mono', monospace;
  font-feature-settings: 'zero' 1, 'ss01' 1, 'cv01' 1, 'tnum' 1;
  font-variant-numeric: slashed-zero tabular-nums;
  ```
- **Dark Mode**: Managed by `@nuxtjs/color-mode` without suffix, bound to `@custom-variant dark (&:is(.dark *));`.

### 3.3. Animation Choreography: GSAP + Lenis
- **The Single-Loop Law**:
  ```ts
  // plugins/lenis.client.ts
  const lenis = new Lenis({ autoRaf: false, ... })
  lenis.on('scroll', ScrollTrigger.update)
  gsap.ticker.add((time: number) => lenis.raf(time * 1000))
  gsap.ticker.lagSmoothing(0)
  ```
- **Scoped Component Animations**:
  Always use `useGsapContext(rootRef, (ctx) => { ... })` from `app/composables/useAnimation.ts`.
  This guarantees that on route changes or unmounting, all ScrollTriggers and tweens are reverted, preventing memory leaks and scroll offset calculation errors.

### 3.4. Interactive Hardware & FX Subsystems
1. **Interactive Terminal Modal** ([`InteractiveTerminal.vue`](app/components/fx/InteractiveTerminal.vue)):
   - Commodore PET-2001 / DEC VT100 CLI shell.
   - Controlled globally via `const { isOpen, open, close, toggle } = useTerminal()`.
   - Web Audio API square-wave frequency synthesis (`freq = 640Hz`, `duration = 0.05s`) for authentic terminal beeps.
   - Built-in command interpreter: `help`, `about`, `projects`, `skills`, `cv`, `contact`, `matrix`, `clear`.
2. **Retro GameBoy Console** ([`RetroGameBoy.vue`](app/components/fx/RetroGameBoy.vue)):
   - 3-mode handheld: 8-bit Canvas game *Byte Runner*, RPG Character Stats screen, and Cartridge inspection slot.
   - Web Audio API chiptune synthesis (square & sawtooth wave generator for jump, coin, hit, start).
3. **High-Performance DotLottie Engine** ([`DotLottiePlayer.vue`](app/components/fx/DotLottiePlayer.vue)):
   - Runs `@lottiefiles/dotlottie-web` with ThorVG WebAssembly.
   - Uses `IntersectionObserver` to automatically freeze execution when outside viewport or tab hidden (0% background CPU).
   - High-DPI Retina sharpness matching `window.devicePixelRatio`.
4. **Oscilloscope Vector Canvas** ([`PhosphorWave.vue`](app/components/fx/PhosphorWave.vue)):
   - Real-time harmonic electron beam sinusoids with phosphor decay trails and pointer frequency modulation.
5. **Vector Wireframe 3D** ([`RetroWireframe3D.vue`](app/components/fx/RetroWireframe3D.vue)):
   - Three.js vector icosahedron with orbital coordinate rings and inertia tracking.
6. **Reel-to-Reel HUD** ([`RetroTapeBar.vue`](app/components/fx/RetroTapeBar.vue)):
   - Nagra-inspired analog HUD with spinning magnetic reels, REC tally, and live Cambodia (UTC+7) clock.

---

## 4. Backend & Edge Serverless Architecture

### 4.1. Contact API Endpoint ([`server/api/contact.post.ts`](server/api/contact.post.ts))
- **Path**: `POST /api/contact`
- **Defense in Depth**:
  1. **Honeypot Trap**: Invisible `company` field. If filled, returns `{ ok: true }` silently to deflect bots.
  2. **In-Memory Rate Limiting**: Max 3 requests per 10 minutes per client IP (parsed via `getRequestIP(event, { xForwardedFor: true })`).
  3. **Strict Validation**: Minimum and maximum character bounds on name, email (valid RFC-like regex), and message.
  4. **Telegram Bot Notification**: Dispatches webhook to Telegram Bot API if `runtimeConfig.telegramBotToken` is present; falls back to server dev logs.
- **Rule**: Server-side secrets must reside in `runtimeConfig` (server-only). NEVER place secrets in `runtimeConfig.public`.

### 4.2. Cloudflare Workers Edge Deployment
- **Nitro Preset**: `cloudflare_module`.
- **Prerendering**: `crawlLinks: true`, prerendering routes (`/`, `/work`, `/work/[slug]`) to static HTML in `.output/public`.
- **Worker Script**: `.output/server/index.mjs` with generated `wrangler.json`.
- Tested and verified with Cloudflare Workers module syntax.

---

## 5. Testing & Verification Guide

This project maintains automated Vitest test coverage and strict TypeScript typechecking.

### Test Commands
```bash
# 1. Run all unit and integration tests
npm run test

# 2. Run TypeScript compilation check
npm run typecheck

# 3. Test full production build and Nitro prerender
npm run build

# 4. Preview built site locally
npm run preview
```

### Test Coverage Areas
- [`tests/nuxt/data.test.ts`](tests/nuxt/data.test.ts): Verifies `site.ts` data contracts (slug uniqueness, non-empty highlights, valid metrics, URLs, and skill rating bounds).
- [`tests/nuxt/contact.test.ts`](tests/nuxt/contact.test.ts): Verifies contact endpoint validation, character length boundaries, and honeypot defusal.
- [`tests/nuxt/terminal.test.ts`](tests/nuxt/terminal.test.ts): Validates CLI command parsing, casing, and whitespace resilience.
- [`tests/nuxt/utils.test.ts`](tests/nuxt/utils.test.ts): Tests `cn`, `clamp`, `lerp`, `mapRange`, `pad`, and slug resolver helpers.

---

## 6. Rules for AI Agents Working on this Codebase

Whenever modifying, extending, or refactoring this project:

1. **Check Types & Tests First**:
   - Always run `npm run typecheck` and `npm run test` before finishing any turn.
   - If adding a new project or modifying `app/data/site.ts`, verify that `tests/nuxt/data.test.ts` passes.

2. **Respect the Content Boundary**:
   - Do not hard-code project descriptions or resume data inside Vue components. All data must originate from `app/data/site.ts`.
   - If adding new fields to projects, update `app/types/portfolio.ts` first.

3. **Styling & Layout Rules**:
   - Use Tailwind v4 classes and OKLCH color variables (`text-brand`, `bg-card`, `border-border/40`).
   - Keep borders clean and hairline (`border-border/40` or `border-cyan-500/25`).
   - Use `font-mono` for all metrics, tags, code chips, and technical telemetry.
   - Ensure mobile responsiveness down to 320px viewport width. Always account for `env(safe-area-inset-*)`.

4. **Animation Rules**:
   - Never create independent animation loops.
   - When using GSAP, always wrap in `useGsapContext(rootRef, ...)`.
   - Never remove `useReducedMotion()` checks.

5. **Cloudflare CLI Rule**:
   - As specified in global guidelines, interact with Cloudflare using `cf` CLI unless interacting with a project that specifically requires `wrangler`.
