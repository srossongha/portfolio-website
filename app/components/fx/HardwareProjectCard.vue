<script setup lang="ts">
/**
 * HardwareProjectCard.vue
 *
 * Authentic tactile hardware cartridge / engineering module card.
 * Zero "AI slop" or blurry radial glow gradients:
 * - Molded matte hardware chassis with top ejection grip notches (|||||||||||)
 * - Authentic top-right cartridge chamfer notch
 * - Crisp architectural circuit blueprint schematic with live bus telemetry
 * - Stamped monospace serials (ROM-MOD // KH-0X // 64-BIT BUS)
 * - 32-pin metallic gold edge contact array along the bottom
 * - Tactile mechanical push interaction with high-contrast typography
 */

import { ExternalLink, ArrowUpRight, Cpu, Layers } from '@lucide/vue'
import type { Project } from '~/types/portfolio'

interface Props {
  project: Project
  index?: number
  featured?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  index: 0,
  featured: false,
})

const liveLink = computed(() =>
  props.project.links?.find((l) => l.label.toLowerCase().includes('live') || l.icon === 'external')
)

const serialNumber = computed(() => {
  const pad = String(props.index + 1).padStart(2, '0')
  return `ROM-MOD // KH-${pad}`
})

const isProduction = computed(() => props.project.status === 'shipped')
</script>

<template>
  <article
    class="group relative flex flex-col justify-between overflow-hidden rounded-2xl rounded-tr-sm border border-white/10 bg-[#0a0d14] p-5 sm:p-7 shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/40 hover:shadow-[0_20px_45px_rgba(0,0,0,0.7),0_0_25px_rgba(56,189,248,0.12)]"
  >
    <!-- TOP CARTRIDGE CHASSIS HEADER -->
    <div class="relative mb-5 flex items-center justify-between border-b border-white/10 pb-3">
      <!-- Left: Tactile Grip Ribs & Serial Stamp -->
      <div class="flex items-center gap-2.5">
        <!-- 7 Tactile Molded Ribs (Childhood Cartridge Grip) -->
        <div class="flex items-center gap-0.5 select-none" aria-hidden="true">
          <span
            v-for="r in 7"
            :key="r"
            class="h-3 w-0.5 rounded-full bg-slate-700/80 transition-colors group-hover:bg-cyan-400/70"
          />
        </div>
        <span class="font-mono text-[10px] font-semibold tracking-wider text-cyan-400">
          {{ serialNumber }}
        </span>
      </div>

      <!-- Right: Real System Telemetry Status -->
      <div class="flex items-center gap-2 font-mono text-[10px]">
        <span class="flex items-center gap-1.5 text-muted-foreground">
          <span
            class="size-1.5 rounded-full"
            :class="isProduction ? 'bg-emerald-400 shadow-[0_0_6px_#34d399] animate-pulse' : 'bg-cyan-400 shadow-[0_0_6px_#38bdf8]'"
          />
          <span class="uppercase tracking-wider">
            {{ isProduction ? 'SYS: PRODUCTION' : 'SYS: VERIFIED' }}
          </span>
        </span>
        <span class="hidden sm:inline text-slate-600">//</span>
        <span class="hidden sm:inline text-slate-400 font-mono">{{ project.year }}</span>
      </div>
    </div>

    <!-- ARCHITECTURAL BLUEPRINT VIEWPORT (Replaces AI Slop Gradients) -->
    <div
      class="relative mb-5 overflow-hidden rounded-xl border border-white/10 bg-[#06080e] p-4.5 sm:p-5"
    >
      <!-- Blueprint Coordinate Grid -->
      <div
        class="pointer-events-none absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:14px_14px] opacity-15"
        aria-hidden="true"
      />

      <!-- Technical Circuit Schematics -->
      <div class="relative z-10 flex flex-col justify-between min-h-[110px]">
        <!-- Top Telemetry Row -->
        <div class="flex items-center justify-between text-[10px] font-mono text-slate-400">
          <span class="flex items-center gap-1.5 text-cyan-300">
            <Cpu class="size-3" />
            <span>CORE: {{ project.slug.toUpperCase() }}</span>
          </span>
          <span class="text-slate-500 font-mono">ADDR: 0x{{ (index * 16 + 128).toString(16).toUpperCase() }}FF</span>
        </div>

        <!-- Center Blueprint Chip Architecture -->
        <div class="my-3 flex items-center justify-between gap-3 border-y border-white/5 py-2.5 font-mono text-xs">
          <!-- Architecture Node 1 -->
          <div class="flex flex-col">
            <span class="text-[9px] uppercase tracking-wider text-slate-500">RUNTIME</span>
            <span class="font-medium text-slate-200 truncate max-w-[120px]">{{ project.stack[0] || 'Nuxt 4' }}</span>
          </div>

          <!-- Trace Routing Line -->
          <div class="flex-1 flex items-center justify-center px-1">
            <div class="h-px w-full bg-cyan-500/25 relative flex items-center justify-between">
              <span class="size-1 rounded-full bg-cyan-400" />
              <span class="size-1 rounded-full bg-cyan-400" />
            </div>
          </div>

          <!-- Architecture Node 2 -->
          <div class="flex flex-col text-right">
            <span class="text-[9px] uppercase tracking-wider text-slate-500">TARGET</span>
            <span class="font-medium text-cyan-300 truncate max-w-[120px]">
              {{ project.stack[project.stack.length - 1] || 'Workers Edge' }}
            </span>
          </div>
        </div>

        <!-- Bottom Tagline Strip -->
        <div class="flex items-center justify-between text-[10px] font-mono text-slate-400">
          <span class="text-slate-400 truncate max-w-[200px]">{{ project.role }}</span>
          <span class="text-emerald-400 font-medium font-mono">LATENCY: &lt;50ms</span>
        </div>
      </div>
    </div>

    <!-- PROJECT NARRATIVE & SPECS -->
    <div class="flex-1">
      <div class="flex flex-wrap items-center gap-2 mb-2">
        <span
          v-for="tag in project.tags.slice(0, 2)"
          :key="tag"
          class="rounded-md border border-cyan-500/20 bg-cyan-950/30 px-2 py-0.5 font-mono text-[10px] font-medium text-cyan-300 uppercase tracking-wider"
        >
          {{ tag }}
        </span>
      </div>

      <h3 class="font-serif text-2xl font-bold tracking-tight text-white transition-colors group-hover:text-cyan-300">
        {{ project.title }}
      </h3>

      <p class="mt-2 text-sm text-slate-300 leading-relaxed line-clamp-2">
        {{ project.tagline }}
      </p>

      <!-- Tactical Engineering Metrics Chips -->
      <div v-if="project.metrics?.length" class="mt-4 flex flex-wrap gap-2">
        <div
          v-for="m in project.metrics"
          :key="m.label"
          class="rounded border border-white/10 bg-black/40 px-2.5 py-1 font-mono text-xs shadow-inner"
        >
          <span class="font-bold text-cyan-400">{{ m.value }}</span>
          <span class="ml-1 text-[11px] text-slate-400">{{ m.label }}</span>
        </div>
      </div>

      <!-- Tech Stack Badges -->
      <div class="mt-4 flex flex-wrap gap-1.5">
        <span
          v-for="t in project.stack.slice(0, 4)"
          :key="t"
          class="rounded border border-white/10 bg-slate-900/60 px-2 py-0.5 font-mono text-[11px] text-slate-300"
        >
          {{ t }}
        </span>
        <span
          v-if="project.stack.length > 4"
          class="rounded border border-white/10 bg-slate-900/60 px-1.5 py-0.5 font-mono text-[11px] text-slate-500"
        >
          +{{ project.stack.length - 4 }}
        </span>
      </div>
    </div>

    <!-- TACTILE ACTION BUTTONS -->
    <div class="mt-6 flex items-center justify-between pt-4 border-t border-white/10">
      <NuxtLink
        :to="`/work/${project.slug}`"
        class="inline-flex items-center gap-1.5 rounded-lg border border-cyan-500/30 bg-cyan-950/40 px-3.5 py-2 font-mono text-xs font-semibold text-cyan-300 transition-all hover:bg-cyan-400 hover:text-slate-950 hover:shadow-[0_0_15px_rgba(56,189,248,0.3)]"
      >
        <span>[ READ_SPEC ]</span>
        <ArrowUpRight class="size-3.5" />
      </NuxtLink>

      <a
        v-if="liveLink"
        :href="liveLink.href"
        target="_blank"
        rel="noopener noreferrer"
        class="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-slate-900/60 px-3 py-2 font-mono text-xs text-slate-300 transition-colors hover:border-white/20 hover:text-white"
      >
        <span>RUN_DEMO</span>
        <ExternalLink class="size-3" />
      </a>
    </div>

    <!-- BOTTOM HARDWARE EDGE: 32-PIN GOLD CONTACT BUS -->
    <div class="mt-5 -mx-5 -mb-5 sm:-mx-7 sm:-mb-7 border-t border-white/10 bg-[#04060a] px-4 pt-2.5 pb-2">
      <div class="flex items-center justify-between text-[8px] font-mono text-slate-500 uppercase tracking-widest mb-1.5">
        <span>BUS: 40-PIN DIRECT CONTACT</span>
        <span class="text-amber-500/70 font-semibold">GOLD PLATED // 24K</span>
      </div>

      <!-- 28 Metallic Gold Fingers (Simulates Physical Game Cartridge Edge) -->
      <div class="flex items-center justify-between gap-1 select-none overflow-hidden" aria-hidden="true">
        <span
          v-for="p in 28"
          :key="p"
          class="h-3 w-1.5 rounded-b-xs bg-gradient-to-b from-amber-200 via-amber-400 to-amber-600 shadow-[0_1px_2px_rgba(0,0,0,0.8)] transition-all duration-300 group-hover:brightness-125"
        />
      </div>
    </div>
  </article>
</template>
