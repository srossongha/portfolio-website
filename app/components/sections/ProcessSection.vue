<script setup lang="ts">
import { Compass, Layout, Code2, CheckCircle2, ArrowRight } from '@lucide/vue'

/**
 * ProcessSection.vue — 4-Stage Engineering Pipeline
 *
 * Transformed from a sticky stacked pile into an interactive 4-stage pipeline bento:
 * - Stage 01: Architecture & Data Modeling
 * - Stage 02: Browser Prototyping & Layout Rhythm
 * - Stage 03: Type-Safe Full-Stack Implementation
 * - Stage 04: Real-Device Hardening & Production Delivery
 */

const steps = [
  {
    n: '01',
    icon: Compass,
    title: 'Discover & Architect',
    body: 'I define the data models and core constraints before writing code. On Roomie, this meant mapping 25 provinces, landlord onboarding flows, and bilingual schema rules early.',
    deliverables: ['Schema design', 'User flows', 'API contracts'],
    tag: 'FOUNDATION',
  },
  {
    n: '02',
    icon: Layout,
    title: 'Shape in the Browser',
    body: 'I build rough, interactive prototypes directly in the browser rather than spending weeks in Figma. Real viewports reveal layout flaws and touch target issues immediately.',
    deliverables: ['Responsive grid', 'Design tokens', 'Micro-interactions'],
    tag: 'PROTOTYPING',
  },
  {
    n: '03',
    icon: Code2,
    title: 'Type-Safe Execution',
    body: 'Nuxt 4 / Next.js on the frontend, edge functions on Cloudflare, and PostgreSQL with strict Row-Level Security. Every component is typed to eliminate runtime crashes.',
    deliverables: ['TypeScript 100%', 'Edge serverless', 'Supabase RLS'],
    tag: 'DEVELOPMENT',
  },
  {
    n: '04',
    icon: CheckCircle2,
    title: 'Real-Device Hardening',
    body: 'The most critical step: testing on real modest phones, verifying network throttling, eliminating layout shifts, and polishing loading/empty states until it feels native.',
    deliverables: ['Lighthouse 95+', 'Zero layout shift', 'Mobile 60fps'],
    tag: 'SHIPPING',
  },
]
</script>

<template>
  <section id="process" class="relative overflow-hidden py-24 sm:py-32 lg:py-36">
    <div class="mx-auto max-w-350 px-5 sm:px-8 lg:px-12">
      <SectionHeading
        index="04"
        label="Methodology"
        title="Disciplined execution,"
        accent="from concept to production."
        description="A deterministic 4-stage engineering pipeline applied to every project, ensuring rock-solid stability and client satisfaction."
      />

      <!-- 4-Stage Bento Pipeline -->
      <div class="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:mt-18">
        <div
          v-for="step in steps"
          :key="step.n"
          class="group flex flex-col justify-between rounded-3xl border border-border/80 bg-card/70 p-5 sm:p-8 shadow-[0_8px_32px_rgba(0,0,0,0.25)] backdrop-blur-xl transition-all duration-300 hover:border-cyan-400/50 hover:shadow-[0_0_25px_rgba(56,189,248,0.15)]"
        >
          <div>
            <!-- Header row -->
            <div class="flex items-center justify-between border-b border-border/60 pb-4">
              <span class="font-pixel text-[9px] font-semibold tracking-widest text-cyan-400 uppercase">
                [ PIPELINE // {{ step.n }} ]
              </span>
              <span class="rounded-xs border border-cyan-500/30 bg-cyan-950/30 px-2 py-0.5 font-pixel text-[8px] text-cyan-300 uppercase">
                {{ step.tag }}
              </span>
            </div>

            <!-- Icon & Title -->
            <div class="mt-6 flex items-center gap-3">
              <div class="flex size-10 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-400 shadow-[0_0_12px_rgba(56,189,248,0.2)]">
                <component :is="step.icon" class="size-5" />
              </div>
              <h3 class="font-serif text-xl font-medium tracking-tight text-foreground">
                {{ step.title }}
              </h3>
            </div>

            <p class="text-muted-foreground mt-4 text-sm leading-relaxed">
              {{ step.body }}
            </p>
          </div>

          <!-- Deliverables Tags -->
          <div class="mt-8 border-t border-border/60 pt-4">
            <p class="font-mono text-[10px] tracking-widest text-muted-foreground uppercase mb-2">
              Deliverables:
            </p>
            <ul class="space-y-1.5">
              <li
                v-for="d in step.deliverables"
                :key="d"
                class="flex items-center gap-2 font-mono text-xs text-foreground/85"
              >
                <span class="size-1 rounded-full bg-cyan-400 shadow-[0_0_4px_#38bdf8]" />
                {{ d }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
