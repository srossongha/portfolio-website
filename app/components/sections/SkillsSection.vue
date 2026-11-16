<script setup lang="ts">
import { Code2, Database, Wrench, Binary, Layers, Terminal } from '@lucide/vue'
import { marqueeRows } from '~/data/site'

/**
 * SkillsSection.vue — Technical Architecture & Arsenal Matrix
 *
 * Designed to eliminate generic "AI slop" skill percentage bars:
 * - 4-Column Systems Architecture Rack (Runtime UI / Edge Cloud / CS Core / Tooling).
 * - Real engineering context: architecture principles, production practices, and tech nodes.
 * - Hardware continuous telemetry marquee ticker below.
 */

const root = ref<HTMLElement | null>(null)

const systems = [
  {
    code: 'SYS_01',
    layer: 'Reactive UI & Client Engines',
    icon: Code2,
    focus: 'Zero layout shift, 60fps interaction budget, and strict compile-time type safety.',
    technologies: [
      { name: 'Vue 3 & Nuxt 4', desc: 'Composition API, Nitro SSR engine, auto-imports' },
      { name: 'TypeScript', desc: 'Strict interfaces, generics, discriminated unions' },
      { name: 'React 19 & Next.js 16', desc: 'App router, Server Components, client state' },
      { name: 'Tailwind CSS v4', desc: 'OKLCH color system, container queries, CSS-first' },
      { name: 'Pinia & State Machines', desc: 'Predictable mutations, persistent store sync' },
    ],
  },
  {
    code: 'SYS_02',
    layer: 'Edge Runtime & Distributed Infra',
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
    code: 'SYS_03',
    layer: 'Computer Science Core & Systems',
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
    code: 'SYS_04',
    layer: 'Verification, Tooling & Delivery',
    icon: Wrench,
    focus: 'Automated test discipline, deterministic build pipelines, and production reliability.',
    technologies: [
      { name: 'Vitest & Unit Testing', desc: 'Automated test suites, mocks, assertion libraries' },
      { name: 'Git & GitHub Actions', desc: 'Branch protection, automated CI/CD workflows' },
      { name: 'Vite & Bundler Tooling', desc: 'Instant HMR, tree-shaking, Rollup chunk tuning' },
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
        index="03"
        label="Engineering Stack"
        title="Tools I build with,"
        accent="systems I understand."
        description="A disciplined, production-tested arsenal. No arbitrary percentage bars — just real architectural systems deployed to production."
      />

      <!-- 4-Column Systems Architecture Rack (Divided by clean hairline rules) -->
      <div class="mt-14 lg:mt-20 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 border-y border-border/50 py-10">
        <div
          v-for="sys in systems"
          :key="sys.code"
          class="flex flex-col justify-between pr-0 lg:pr-6 border-b sm:border-b-0 pb-8 sm:pb-0 border-border/40 last:border-b-0"
        >
          <div>
            <!-- System Code & Icon -->
            <div class="flex items-center justify-between border-b border-border/40 pb-3">
              <span class="font-pixel text-[10px] text-cyan-400 font-semibold tracking-widest">
                [{{ sys.code }}]
              </span>
              <component :is="sys.icon" class="size-4 text-cyan-400/80" />
            </div>

            <!-- Layer Title -->
            <h3 class="font-serif text-lg font-medium text-foreground mt-3">
              {{ sys.layer }}
            </h3>

            <!-- Architectural Focus -->
            <p class="text-muted-foreground text-xs leading-relaxed mt-2 border-l border-cyan-500/30 pl-2.5">
              {{ sys.focus }}
            </p>

            <!-- Technologies Ledger -->
            <div class="mt-6 space-y-3">
              <div
                v-for="tech in sys.technologies"
                :key="tech.name"
                class="group py-1.5 border-b border-border/20 last:border-b-0"
              >
                <div class="flex items-center justify-between">
                  <span class="font-mono text-xs font-medium text-foreground group-hover:text-cyan-300 transition-colors">
                    {{ tech.name }}
                  </span>
                  <span class="size-1 rounded-full bg-cyan-400/80 shadow-[0_0_4px_#38bdf8]" />
                </div>
                <p class="text-muted-foreground/70 text-[10px] font-mono mt-0.5">
                  {{ tech.desc }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Marquee continuous telemetry ticker -->
      <div class="mt-14 pt-8">
        <div class="flex items-center gap-2 font-pixel text-[10px] text-cyan-400/80 mb-4 uppercase tracking-widest">
          <Terminal class="size-3" />
          <span>// LOADED_STACK_INDEX</span>
        </div>
        <div v-if="marqueeRows.length >= 3" class="space-y-2">
          <MarqueeRow :items="marqueeRows[0]!" :speed="35" />
          <MarqueeRow :items="marqueeRows[1]!" :speed="45" reverse />
          <MarqueeRow :items="marqueeRows[2]!" :speed="40" />
        </div>
      </div>
    </div>
  </section>
</template>
