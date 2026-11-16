---
name: portfolio-guide
description: Expert architectural and development guide for the Asuna Portfolio (Sros Songha) Nuxt 4 codebase. Use whenever developing, updating, testing, or refactoring the portfolio application.
---

# Asuna Portfolio (Sros Songha) — Agent Skill & Architecture Guide

Use this skill when modifying, inspecting, extending, or maintaining the Asuna Portfolio codebase.

## 1. Project Overview & Identity
- **Owner**: Sros Songha (@srossongha / Asuna)
- **Role**: Software Engineer & Front-end Developer Intern
- **Affiliation**: Institute of Technology of Cambodia (ITC) · T.O Group · EKYC Solution Co., Ltd.
- **Flagship Project**: Roomie (ស្រុកខ្ញុំ - sroknh.com)
- **Core Aesthetic**: Clean engineering craft, developer nerd font stack, hardware retro consoles, zero AI slop.

## 2. Technical Stack
- **Framework**: Nuxt 4 (`^4.5.2`) + Vue 3 + Vite 8 + Nitro 2
- **Styling**: Tailwind CSS v4 (CSS-first in `app/assets/css/main.css`, OKLCH tokens, `@theme inline`, NO `tailwind.config.js`)
- **UI Components**: `shadcn-vue` (Reka UI) located in `app/components/ui/` with `prefix: ""`
- **Animations**: GSAP (`^3.15.0`) + ScrollTrigger & Lenis (`^1.3.26`) smooth scroll
- **Audio & Visual FX**:
  - Web Audio API real-time square-wave terminal beeps & chiptune synthesis
  - DotLottie ThorVG WASM player (`app/components/fx/DotLottiePlayer.vue`) with viewport pausing
  - Three.js 3D Vector Wireframe (`app/components/fx/RetroWireframe3D.vue`)
  - Oscilloscope Vector Canvas (`app/components/fx/PhosphorWave.vue`)
- **Deployment**: Cloudflare Workers edge serverless via Nitro `cloudflare_module`

## 3. Key File Locations & Responsibilities
- `app/data/site.ts`: **Single source of truth** for all personal data, projects, experience, skills, and SEO. Never hard-code content in `.vue` components!
- `app/types/portfolio.ts`: TypeScript contracts for `Project`, `Experience`, `SkillGroup`, etc.
- `app/app.vue`: Root provider for layout, preloader, custom cursor, grain, Toaster, and Schema.org JSON-LD structured data.
- `app/layouts/default.vue`: Site layout hosting `<ScrollProgressBar>`, `<SiteHeader>`, `<main id="main">`, `<SiteFooter>`, and `<InteractiveTerminal>`.
- `app/pages/index.vue`: Composes the 7 multi-axis homepage sections.
- `app/pages/work/`: Full archive (`index.vue`) and dynamic case study (`[slug].vue`).
- `app/composables/useAnimation.ts`: Scoped GSAP context cleanup via `useGsapContext()` and `useReducedMotion()`.
- `app/plugins/lenis.client.ts`: Synchronized Lenis scroll driving exclusively on GSAP's ticker (`autoRaf: false`).
- `server/api/contact.post.ts`: Contact form backend with bot honeypot, rate limiting, and Telegram notification.

## 4. Engineering Invariants & Rules

### Content & Data
1. Modify `app/data/site.ts` to add or edit projects, stats, or text.
2. If adding new fields, update `app/types/portfolio.ts`.
3. Verify data integrity by running `npm run test` (which executes `tests/nuxt/data.test.ts`).

### Animation & Performance
1. **Single RAF Loop**: Never enable Lenis's internal `autoRaf`. It must remain hooked to GSAP's ticker to eliminate scroll jitter.
2. **GSAP Scope**: Every GSAP animation in a component must use `useGsapContext(rootRef, (ctx) => { ... })` so all ScrollTriggers are killed on unmount.
3. **Compositor Only**: Animate `transform` and `opacity`. Never animate `width`, `height`, or layout properties.
4. **Reduced Motion**: Respect `useReducedMotion()`. Motion-sensitive users must receive static or instant transitions.

### Terminal & Hardware Modals
- The 1970s PET-2001 shell modal is reactive via `useTerminal()`.
- Command parsing logic must remain consistent with `tests/nuxt/terminal.test.ts`.

### Styling & Typography
- Fonts: Authentic developer nerd font stack (`ui-monospace, 'SF Mono', 'JetBrains Mono', 'Fira Code'`) with `font-feature-settings: 'zero' 1, 'tnum' 1`.
- Colors: OKLCH variables in `main.css`. Keep borders hairline (`border-border/40` or `border-cyan-500/25`).

## 5. Verification Checklist
Run these commands before completing any task:
```bash
npm run test       # Runs Vitest (all 26 tests must pass)
npm run typecheck  # Runs vue-tsc type checking (must pass with 0 errors)
npm run build      # Verifies full Nitro Cloudflare production build & route prerendering
```
