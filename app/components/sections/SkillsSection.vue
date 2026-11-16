<script setup lang="ts">
import { Code2, Database, Wrench, Binary, Layers } from '@lucide/vue'
import { marqueeRows } from '~/data/site'
import SectionHeading from '~/components/fx/SectionHeading.vue'
import MarqueeRow from '~/components/fx/MarqueeRow.vue'
import TechRadarSvg from '~/components/svg/TechRadarSvg.vue'

/**
 * SkillsSection.vue — Modern Technical Stack Matrix
 *
 * Professional, clear, authentic:
 * - 4 Systems Architecture categories: Frontend, Cloud, CS Core, Tooling
 * - Concise, honest explanations of what each technology is used for
 * - Smooth continuous marquee row
 */

const root = ref<HTMLElement | null>(null)

const systems = [
  {
    layer: 'Frontend & UI Engineering',
    icon: Code2,
    focus: 'Sub-second first paint, 60fps interaction budget, and strict compile-time type safety.',
    technologies: [
      { name: 'Vue 3 & Nuxt 4', desc: 'Composition API, Nitro SSR engine, auto-imports' },
      { name: 'TypeScript', desc: 'Strict interfaces, generics, discriminated unions' },
      { name: 'React 19 & Next.js 16', desc: 'App router, Server Components, client state' },
      { name: 'Tailwind CSS v4', desc: 'OKLCH color system, container queries, modern styling' },
      { name: 'Pinia & State Stores', desc: 'Predictable state machines, reactive stores' },
    ],
  },
  {
    layer: 'Edge Runtime & Cloud Architecture',
    icon: Database,
    focus: 'Low-latency edge execution, serverless connection pooling, and resilient data layers.',
    technologies: [
      { name: 'Cloudflare Workers', desc: 'V8 isolate serverless edge execution & triggers' },
      { name: 'Supabase & PostgreSQL', desc: 'Row-Level Security (RLS), triggers, indexing' },
      { name: 'Directus CMS', desc: 'Headless content API layer, schema migrations' },
      { name: 'Prisma & Neon Postgres', desc: 'Serverless pooling, type-safe schema queries' },
      { name: 'REST & Contract APIs', desc: 'Predictable JSON payloads, status code discipline' },
    ],
  },
  {
    layer: 'Computer Science Core',
    icon: Binary,
    focus: 'Rigorous algorithmic foundation from the Institute of Technology of Cambodia (ITC).',
    technologies: [
      { name: 'Data Structures & Algorithms', desc: 'Trees, graphs, dynamic programming, Big-O' },
      { name: 'C++ Systems Programming', desc: 'Pointers, dynamic memory, RAII, OOP patterns' },
      { name: 'Computer Vision Basics', desc: 'OpenCV, MediaPipe browser frame analysis' },
      { name: 'Web Standards & Protocols', desc: 'Web Audio API, Canvas 2D, WebSockets, HTTP/2' },
    ],
  },
  {
    layer: 'Tooling, Testing & Delivery',
    icon: Wrench,
    focus: 'Automated test discipline, deterministic build pipelines, and production reliability.',
    technologies: [
      { name: 'Vitest & Unit Testing', desc: 'Automated test suites, mocks, assertion libraries' },
      { name: 'Git & GitHub Actions', desc: 'Branch protection, automated CI/CD workflows' },
      { name: 'Vite & Bundlers', desc: 'Instant HMR, tree-shaking, Rollup chunk tuning' },
      { name: 'Core Web Vitals & UX', desc: 'LCP optimization, responsive thumb reach design' },
    ],
  },
]
</script>

<template>
  <section id="skills" ref="root" class="relative overflow-hidden py-24 sm:py-32 lg:py-36 border-t border-border/40">
    <div class="mx-auto max-w-350 px-5 sm:px-8 lg:px-12">
      <!-- Section Heading -->
      <SectionHeading
        index="04"
        label="Technical Stack"
        title="Tools I build with,"
        accent="systems I understand."
        description="A disciplined, production-tested arsenal. Real architectural systems deployed to production without arbitrary percentage bars."
      />

      <!-- Interactive SVG Competency Radar & Architecture -->
      <div class="mt-12 overflow-hidden rounded-2xl border border-cyan-500/25 bg-slate-950/85 p-6 sm:p-8 backdrop-blur-xl">
        <div class="grid gap-8 lg:grid-cols-12 lg:items-center">
          <div class="lg:col-span-6 flex flex-col justify-center">
            <div class="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-950/40 px-3 py-1 font-mono text-xs text-cyan-300 w-fit">
              <span class="size-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_6px_#38bdf8]" />
              <span>Mathematical Vector Radar (Clean SVG)</span>
            </div>
            <h3 class="font-serif text-2xl sm:text-3xl font-bold text-foreground mt-4">
              Discipline distribution &amp; architectural balance.
            </h3>
            <p class="text-muted-foreground mt-3 text-sm sm:text-base leading-relaxed">
              Software engineering is more than writing UI widgets. It requires solid algorithmic foundations from the Institute of Technology of Cambodia (ITC), strict compile-time type safety, and edge-native serverless systems.
            </p>
            <div class="mt-6 flex flex-wrap gap-2 font-mono text-xs">
              <span class="rounded-lg border border-border/60 bg-slate-900/60 px-3 py-1.5 text-slate-300">
                ★ 96% Front-end Architecture
              </span>
              <span class="rounded-lg border border-border/60 bg-slate-900/60 px-3 py-1.5 text-slate-300">
                ★ 95% Type Determinism
              </span>
              <span class="rounded-lg border border-border/60 bg-slate-900/60 px-3 py-1.5 text-slate-300">
                ★ 90% Serverless Edge
              </span>
            </div>
          </div>

          <div class="lg:col-span-6 flex justify-center">
            <TechRadarSvg />
          </div>
        </div>
      </div>

      <!-- 4-Column Systems Architecture Grid -->
      <div class="mt-10 lg:mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div
          v-for="sys in systems"
          :key="sys.layer"
          class="flex flex-col justify-between rounded-2xl border border-border/70 bg-slate-950/80 p-6 shadow-lg backdrop-blur-xl transition-all duration-300 hover:border-cyan-400/40"
        >
          <div>
            <!-- Layer Header -->
            <div class="flex items-center justify-between border-b border-border/40 pb-3">
              <span class="font-mono text-xs font-semibold text-cyan-400">
                Core Discipline
              </span>
              <component :is="sys.icon" class="size-4 text-cyan-400" />
            </div>

            <!-- Layer Title -->
            <h3 class="font-serif text-lg font-bold text-foreground mt-4">
              {{ sys.layer }}
            </h3>

            <p class="text-muted-foreground mt-2 text-xs leading-relaxed">
              {{ sys.focus }}
            </p>

            <!-- Tech Nodes List -->
            <div class="mt-6 space-y-3.5 border-t border-border/40 pt-4">
              <div
                v-for="tech in sys.technologies"
                :key="tech.name"
                class="group/item"
              >
                <div class="flex items-center justify-between">
                  <span class="font-mono text-xs font-semibold text-foreground group-hover/item:text-cyan-300 transition-colors">
                    {{ tech.name }}
                  </span>
                </div>
                <p class="text-muted-foreground text-[11px] mt-0.5 leading-snug">
                  {{ tech.desc }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Smooth Marquee Ticker -->
    <div class="mt-16 sm:mt-20 overflow-hidden border-y border-border/40 bg-slate-950/40 py-4">
      <MarqueeRow
        :items="marqueeRows[0] || []"
        :speed="35"
        direction="left"
        pause-on-hover
      />
    </div>
  </section>
</template>