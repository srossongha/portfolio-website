<script setup lang="ts">
import { Compass, Layout, Code2, CheckCircle2 } from '@lucide/vue'

/**
 * ProcessSection.vue — 4-Stage Industrial Pipeline Bus
 *
 * Engineered as a continuous 1970s hardware rack module:
 * - Unified chassis with 4 instrumentation bays (BAY_01 to BAY_04).
 * - Segmented signal flow with status LEDs and deliverable ledgers.
 * - Completely free of generic bubbly AI bento cards.
 */

const steps = [
  {
    n: '01',
    code: 'BAY_01',
    icon: Compass,
    title: 'Discover & Architect',
    body: 'I define the data models and core constraints before writing code. On Roomie, this meant mapping 25 provinces, landlord onboarding flows, and bilingual schema rules early.',
    deliverables: ['Schema Contracts', 'User Flows', 'API Invariants'],
    tag: 'FOUNDATION',
    status: 'SYSTEM_READY',
  },
  {
    n: '02',
    code: 'BAY_02',
    icon: Layout,
    title: 'Shape in the Browser',
    body: 'I build rough, interactive prototypes directly in the browser rather than spending weeks in Figma. Real viewports reveal layout flaws and touch target issues immediately.',
    deliverables: ['Responsive Grid', 'Design Tokens', 'Micro-Interactions'],
    tag: 'PROTOTYPE',
    status: 'CYCLE_PASS',
  },
  {
    n: '03',
    code: 'BAY_03',
    icon: Code2,
    title: 'Type-Safe Execution',
    body: 'Nuxt 4 / Next.js on the frontend, edge functions on Cloudflare, and PostgreSQL with strict Row-Level Security. Every component is typed to eliminate runtime crashes.',
    deliverables: ['TypeScript 100%', 'Edge Serverless', 'PostgreSQL RLS'],
    tag: 'COMPILE',
    status: 'ZERO_ERRORS',
  },
  {
    n: '04',
    code: 'BAY_04',
    icon: CheckCircle2,
    title: 'Real-Device Hardening',
    body: 'The most critical step: testing on real modest phones, verifying network throttling, eliminating layout shifts, and polishing loading/empty states until it feels native.',
    deliverables: ['Lighthouse 95+', 'Zero Layout Shift', 'Mobile 60fps'],
    tag: 'SHIPPING',
    status: 'PRODUCTION',
  },
]
</script>

<template>
  <section id="process" class="relative overflow-hidden py-24 sm:py-32 lg:py-36 border-t border-border/40">
    <div class="mx-auto max-w-350 px-5 sm:px-8 lg:px-12">
      <SectionHeading
        index="04"
        label="Methodology"
        title="Disciplined execution,"
        accent="from concept to production."
        description="A deterministic 4-stage engineering pipeline applied to every project, ensuring rock-solid stability and zero runtime regressions."
      />

      <!-- Unified 1970s Pipeline Chassis -->
      <div class="mt-14 lg:mt-18 overflow-hidden rounded-2xl border border-cyan-500/30 bg-slate-950/85 shadow-[0_16px_50px_rgba(0,0,0,0.5)] backdrop-blur-2xl">
        <!-- Chassis Top Instrumentation Bar -->
        <div class="flex flex-wrap items-center justify-between border-b border-cyan-500/20 bg-cyan-950/30 px-5 py-3 font-mono text-[10px] text-cyan-400">
          <div class="flex items-center gap-3">
            <span class="size-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#38bdf8] animate-pulse" />
            <span class="font-pixel text-[9px] tracking-wider uppercase">
              // PIPELINE_BUS: DETERMINISTIC_SERIAL_V4.2
            </span>
          </div>

          <div class="hidden sm:flex items-center gap-6 text-[9px] text-cyan-300/80">
            <span>CLOCK: 60Hz SYNCHRONOUS</span>
            <span>BUS_WIDTH: 64-BIT</span>
            <span class="font-pixel text-cyan-400">[ REGISTER: LOCKED ]</span>
          </div>
        </div>

        <!-- 4-Bay Rack Matrix with Hairline Dividers -->
        <div class="grid grid-cols-1 divide-y divide-cyan-500/20 sm:grid-cols-2 sm:divide-y-0 sm:divide-x lg:grid-cols-4">
          <div
            v-for="step in steps"
            :key="step.n"
            class="group relative flex flex-col justify-between p-6 sm:p-7 transition-all duration-300 hover:bg-cyan-950/15"
          >
            <!-- Background Glow on Hover -->
            <div
              class="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              style="background: radial-gradient(circle at 50% 0%, rgba(56, 189, 248, 0.08), transparent 70%);"
            />

            <div>
              <!-- Bay Header -->
              <div class="flex items-center justify-between border-b border-cyan-500/15 pb-3">
                <span class="font-pixel text-[9px] tracking-widest text-cyan-400 uppercase font-semibold">
                  [ {{ step.code }} ]
                </span>
                <span class="rounded border border-cyan-500/30 bg-cyan-950/50 px-2 py-0.5 font-pixel text-[8px] text-cyan-300 uppercase">
                  {{ step.tag }}
                </span>
              </div>

              <!-- Bay Stage Numerals & Title -->
              <div class="mt-6 flex items-center gap-3.5">
                <div class="flex size-10 shrink-0 items-center justify-center rounded-lg border border-cyan-500/30 bg-cyan-950/40 text-cyan-300 shadow-[0_0_12px_rgba(56,189,248,0.2)]">
                  <component :is="step.icon" class="size-5" />
                </div>
                <div>
                  <span class="font-pixel text-xs text-cyan-400/60 leading-none">STAGE 0{{ step.n }}</span>
                  <h3 class="font-serif text-lg font-medium tracking-tight text-foreground sm:text-xl">
                    {{ step.title }}
                  </h3>
                </div>
              </div>

              <!-- Body Description -->
              <p class="text-muted-foreground mt-4 text-xs leading-relaxed sm:text-sm font-sans">
                {{ step.body }}
              </p>
            </div>

            <!-- Deliverables Ledger -->
            <div class="mt-8 border-t border-cyan-500/15 pt-4">
              <p class="font-pixel text-[8px] tracking-widest text-cyan-400/80 uppercase mb-2">
                // ARTIFACT_LEDGER:
              </p>
              <ul class="space-y-1.5 font-mono text-[10px] text-foreground/80">
                <li
                  v-for="d in step.deliverables"
                  :key="d"
                  class="flex items-center gap-1.5"
                >
                  <span class="text-cyan-400">›</span>
                  <span>{{ d }}</span>
                </li>
              </ul>

              <!-- Bottom Bay Status -->
              <div class="mt-4 flex items-center justify-between border-t border-cyan-500/10 pt-2 font-mono text-[9px] text-cyan-400/70">
                <span>STATE</span>
                <span class="font-pixel text-[8px] text-cyan-300">{{ step.status }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
