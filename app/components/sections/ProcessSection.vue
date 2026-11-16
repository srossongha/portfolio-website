<script setup lang="ts">
import { Compass, Layout, Code2, CheckCircle2 } from '@lucide/vue'
import SectionHeading from '~/components/fx/SectionHeading.vue'

/**
 * ProcessSection.vue — Modern Engineering Methodology
 *
 * Professional, clear, authentic:
 * - 4-stage engineering lifecycle applied to real systems
 * - Focus on architecture, browser prototyping, type-safety, and real-device testing
 */

const steps = [
  {
    n: '01',
    icon: Compass,
    title: 'Discover & Architect',
    body: 'I define the data models, state machines, and core constraints before writing code. On Roomie, this meant mapping 25 provinces, landlord onboarding flows, and bilingual schema rules early.',
    deliverables: ['Schema Contracts', 'User Flows', 'API Invariants'],
    tag: 'Architecture',
  },
  {
    n: '02',
    icon: Layout,
    title: 'Shape in the Browser',
    body: 'I build interactive prototypes directly in the browser rather than spending weeks in Figma. Real viewports reveal layout edge cases, touch target constraints, and interaction ergonomics immediately.',
    deliverables: ['Responsive Grid', 'Design Tokens', 'Micro-Interactions'],
    tag: 'Prototyping',
  },
  {
    n: '03',
    icon: Code2,
    title: 'Type-Safe Execution',
    body: 'Nuxt 4 / Next.js on the frontend, edge serverless on Cloudflare Workers, and PostgreSQL with strict Row-Level Security. Every interface and payload is strictly typed to eliminate runtime crashes.',
    deliverables: ['TypeScript 100%', 'Edge Serverless', 'PostgreSQL RLS'],
    tag: 'Development',
  },
  {
    n: '04',
    icon: CheckCircle2,
    title: 'Real-Device Hardening',
    body: 'Testing on real modest mobile devices, verifying network throttling, eliminating layout shifts, and polishing loading and empty states until the application feels truly native and responsive.',
    deliverables: ['Lighthouse 95+', 'Zero Layout Shift', 'Mobile 60fps'],
    tag: 'Production',
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
        description="A structured 4-stage engineering workflow applied to every project, ensuring rock-solid stability and high performance."
      />

      <!-- 4-Stage Methodology Grid -->
      <div class="mt-12 lg:mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div
          v-for="step in steps"
          :key="step.n"
          class="group relative flex flex-col justify-between rounded-2xl border border-border/70 bg-slate-950/80 p-6 sm:p-7 shadow-lg backdrop-blur-xl transition-all duration-300 hover:border-cyan-400/50 hover:shadow-[0_0_25px_rgba(56,189,248,0.12)]"
        >
          <div>
            <!-- Step Number & Tag -->
            <div class="flex items-center justify-between border-b border-border/40 pb-3">
              <span class="font-mono text-sm font-bold text-cyan-400">
                {{ step.n }}
              </span>
              <span class="rounded-full border border-cyan-500/20 bg-cyan-950/30 px-2.5 py-0.5 font-mono text-[11px] text-cyan-300">
                {{ step.tag }}
              </span>
            </div>

            <!-- Title & Body -->
            <div class="mt-5 flex items-center gap-3 text-cyan-400">
              <div class="flex size-9 items-center justify-center rounded-xl border border-cyan-500/30 bg-cyan-950/40 text-cyan-300">
                <component :is="step.icon" class="size-4.5" />
              </div>
              <h3 class="font-serif text-lg font-bold text-foreground">
                {{ step.title }}
              </h3>
            </div>

            <p class="text-muted-foreground mt-3 text-xs sm:text-sm leading-relaxed">
              {{ step.body }}
            </p>
          </div>

          <!-- Deliverables -->
          <div class="mt-6 pt-4 border-t border-border/40">
            <span class="font-mono text-[11px] text-muted-foreground uppercase tracking-wider block mb-2">
              Deliverables:
            </span>
            <div class="flex flex-wrap gap-1.5">
              <span
                v-for="item in step.deliverables"
                :key="item"
                class="rounded-md border border-cyan-500/20 bg-cyan-950/30 px-2 py-0.5 font-mono text-[11px] text-cyan-200"
              >
                {{ item }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>