<script setup lang="ts">
import { ArrowUpRight, ExternalLink, Sparkles, Layers, ShieldCheck, Zap, Terminal } from '@lucide/vue'
import { projects } from '~/data/site'

/**
 * WorkSection.vue — Architectural Project Showcase
 *
 * Designed with technical discipline:
 * - Flagship Showcase: Technical Blueprint Split for Roomie (sroknh.com).
 * - Multi-Project Specimen Ledger with precise metadata tables.
 * - Architectural framing without generic bubbly AI card shapes.
 */

const featured = computed(() => projects.filter((p) => p.featured))
const flagship = computed(() => projects.find((p) => p.slug === 'roomie') || projects[0])
const otherProjects = computed(() => projects.filter((p) => p.slug !== flagship.value?.slug && p.featured))
</script>

<template>
  <section id="work" class="relative overflow-hidden py-24 sm:py-32 lg:py-36 border-t border-border/40">
    <div class="mx-auto max-w-350 px-5 sm:px-8 lg:px-12">
      <!-- Section Heading -->
      <div class="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
        <SectionHeading
          index="02"
          label="Production Work"
          title="Engineered with intent,"
          accent="tested in production."
        />

        <NuxtLink
          to="/work"
          class="group hidden sm:inline-flex items-center gap-2 rounded-lg border border-border/70 bg-card/50 px-4 py-2 font-mono text-xs text-muted-foreground backdrop-blur-md transition-all hover:border-cyan-400/50 hover:text-cyan-300"
        >
          <span>View all 19+ repositories</span>
          <ArrowUpRight class="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </NuxtLink>
      </div>

      <!-- ------------------------------------------------ FLAGSHIP BLUEPRINT SHOWCASE -->
      <div v-if="flagship" class="mt-14 lg:mt-18">
        <div class="relative overflow-hidden rounded-2xl border border-cyan-500/30 bg-slate-950/85 p-6 sm:p-10 shadow-[0_16px_50px_rgba(0,0,0,0.45)] backdrop-blur-2xl">
          <!-- Top Accent Rule -->
          <div
            class="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-500"
            aria-hidden="true"
          />

          <div class="grid gap-8 lg:grid-cols-12 lg:gap-12 lg:items-center">
            <!-- Left: Project Narrative & Specs -->
            <div class="lg:col-span-7">
              <div class="flex flex-wrap items-center gap-3">
                <Badge variant="brand" class="border-cyan-500/30 bg-cyan-950/40 text-cyan-300 font-pixel text-[9px] tracking-wider uppercase">
                  <Sparkles class="size-3" />
                  [ FLAGSHIP_SPECIMEN // 01 ]
                </Badge>
                <span class="font-pixel text-[9px] text-cyan-400/70 tracking-wider uppercase">
                  {{ flagship.role }} · {{ flagship.year }}
                </span>
              </div>

              <h3 class="font-serif text-3xl font-medium tracking-tight text-foreground sm:text-4xl lg:text-5xl mt-3">
                {{ flagship.title }}
              </h3>

              <p class="text-muted-foreground mt-3 text-base leading-relaxed sm:text-lg">
                {{ flagship.description }}
              </p>

              <!-- Metrics Strip (Clean Segmented Tiles) -->
              <div class="mt-6 flex flex-wrap gap-3 border-t border-cyan-500/20 pt-4">
                <div
                  v-for="m in flagship.metrics"
                  :key="m.label"
                  class="rounded-lg border border-cyan-500/25 bg-cyan-950/20 px-3.5 py-2 backdrop-blur-md"
                >
                  <div class="font-serif text-lg font-semibold text-cyan-400">{{ m.value }}</div>
                  <div class="font-mono text-[10px] uppercase text-muted-foreground">{{ m.label }}</div>
                </div>
              </div>

              <!-- Stack Tags -->
              <div class="mt-6 flex flex-wrap gap-1.5">
                <span
                  v-for="tech in flagship.stack"
                  :key="tech"
                  class="rounded border border-cyan-400/20 bg-cyan-950/30 px-2 py-0.5 font-mono text-[10px] text-cyan-200"
                >
                  [{{ tech }}]
                </span>
              </div>

              <!-- Action Links (Mobile Responsive Stack) -->
              <div class="mt-8 flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 sm:gap-3.5">
                <a
                  href="https://sroknh.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 px-6 py-3 sm:py-2.5 text-xs font-semibold text-slate-950 shadow-[0_0_18px_rgba(56,189,248,0.35)] transition-all hover:scale-[1.02] hover:shadow-[0_0_28px_rgba(56,189,248,0.55)] font-pixel uppercase tracking-wider"
                >
                  <span>Visit Live Site</span>
                  <ExternalLink class="size-3.5" />
                </a>

                <NuxtLink
                  :to="`/work/${flagship.slug}`"
                  class="inline-flex items-center justify-center gap-2 rounded-xl border border-cyan-400/30 bg-card/60 px-5 py-3 sm:py-2.5 text-xs font-medium text-foreground backdrop-blur-md transition-all hover:border-cyan-400 hover:text-cyan-300 font-pixel uppercase tracking-wider"
                >
                  <span>Case Study</span>
                  <ArrowUpRight class="size-3.5" />
                </NuxtLink>
              </div>
            </div>

            <!-- Right: Architectural Blueprint Visual Console -->
            <div class="lg:col-span-5">
              <div class="relative overflow-hidden rounded-xl border border-cyan-500/30 bg-black/80 p-6 shadow-inner">
                <div class="bg-scanlines pointer-events-none absolute inset-0 opacity-20" />
                <div class="bg-retro-dots pointer-events-none absolute inset-0 opacity-20" />

                <!-- Blueprint Window Header -->
                <div class="relative flex items-center justify-between border-b border-cyan-500/20 pb-3">
                  <div class="flex items-center gap-2">
                    <span class="size-2 rounded-full bg-cyan-400 shadow-[0_0_6px_#38bdf8]" />
                    <span class="font-pixel text-[9px] tracking-widest text-cyan-300 uppercase">
                      GEOSPATIAL // 25_PROVINCES
                    </span>
                  </div>
                  <span class="font-pixel text-[8px] text-cyan-400/70">PROD_HOST: CLOUDFLARE</span>
                </div>

                <!-- Centerpiece Visual -->
                <div class="relative my-8 flex flex-col items-center justify-center text-center">
                  <div class="flex size-16 items-center justify-center rounded-xl border border-cyan-400/40 bg-cyan-950/60 text-cyan-300 shadow-[0_0_24px_rgba(56,189,248,0.3)]">
                    <span class="font-serif text-2xl font-bold">KH</span>
                  </div>
                  <h4 class="font-serif text-xl font-medium text-white mt-4">
                    Nationwide Rental Engine
                  </h4>
                  <p class="font-mono text-xs text-white/60 mt-1 max-w-xs leading-relaxed">
                    Bilingual Khmer &amp; English listing platform with geospatial coordinate mapping.
                  </p>
                </div>

                <!-- Bottom Telemetry Specs -->
                <div class="relative pt-3 border-t border-cyan-500/20 flex items-center justify-between font-mono text-[9px] text-cyan-400/80">
                  <span>DEPLOYED // SROKNH.COM</span>
                  <span class="text-cyan-300 font-pixel text-[8px]">STATUS: LIVE</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ------------------------------------------------ 2-COLUMN PROJECT LEDGER -->
      <div class="mt-10 grid gap-8 md:grid-cols-2">
        <article
          v-for="(project, i) in otherProjects"
          :key="project.slug"
          class="relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border/80 bg-slate-950/80 p-6 sm:p-8 shadow-xl backdrop-blur-xl transition-all duration-300 hover:border-cyan-400/50 hover:shadow-[0_0_30px_rgba(56,189,248,0.15)]"
        >
          <div>
            <!-- Header: Specimen No & Year -->
            <div class="flex items-center justify-between border-b border-border/60 pb-3">
              <span class="font-pixel text-[9px] tracking-widest text-cyan-400 uppercase font-semibold">
                [SPECIMEN // 0{{ i + 2 }}]
              </span>
              <span class="font-mono text-[10px] text-muted-foreground">
                {{ project.year }} · {{ project.role.split('—')[0]?.trim() || project.role }}
              </span>
            </div>

            <!-- Title & Tagline -->
            <h3 class="font-serif text-2xl font-medium tracking-tight text-foreground sm:text-3xl mt-4">
              {{ project.title }}
            </h3>

            <p class="text-muted-foreground mt-2 text-sm leading-relaxed">
              {{ project.tagline }}
            </p>

            <!-- Metrics strip -->
            <div v-if="project.metrics?.length" class="mt-4 flex flex-wrap gap-2">
              <div
                v-for="m in project.metrics"
                :key="m.label"
                class="rounded border border-cyan-500/20 bg-cyan-950/20 px-2.5 py-1 text-xs"
              >
                <span class="font-semibold text-cyan-400">{{ m.value }}</span>
                <span class="text-muted-foreground ml-1.5 font-mono text-[10px]">{{ m.label }}</span>
              </div>
            </div>
          </div>

          <!-- Bottom: Stack & Direct Links -->
          <div class="mt-8 pt-4 border-t border-border/60">
            <div class="flex flex-wrap gap-1.5">
              <span
                v-for="t in project.stack.slice(0, 4)"
                :key="t"
                class="rounded border border-border/60 bg-muted/30 px-2 py-0.5 font-mono text-[10px] text-foreground/80"
              >
                {{ t }}
              </span>
              <span
                v-if="project.stack.length > 4"
                class="rounded border border-border/60 bg-muted/30 px-2 py-0.5 font-mono text-[10px] text-muted-foreground"
              >
                +{{ project.stack.length - 4 }}
              </span>
            </div>

            <div class="mt-5 flex items-center justify-between pt-2">
              <NuxtLink
                :to="`/work/${project.slug}`"
                class="group/link inline-flex items-center gap-1.5 font-pixel text-[10px] tracking-wider text-cyan-400 uppercase transition-colors hover:text-cyan-300"
              >
                <span>Read Case Study</span>
                <ArrowUpRight class="size-3.5 transition-transform group-link:translate-x-0.5 group-link:-translate-y-0.5" />
              </NuxtLink>

              <!-- External Demo Link if Available -->
              <a
                v-if="project.links?.find((l) => l.label.includes('Live'))"
                :href="project.links.find((l) => l.label.includes('Live'))?.href"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-1 font-mono text-xs text-muted-foreground transition-colors hover:text-cyan-300"
              >
                <span>Live Demo</span>
                <ExternalLink class="size-3" />
              </a>
            </div>
          </div>
        </article>

        <!-- Archive Index Terminal Entry -->
        <article class="md:col-span-2">
          <NuxtLink
            to="/work"
            class="group relative flex flex-col sm:flex-row sm:items-center sm:justify-between rounded-2xl border border-dashed border-cyan-500/40 bg-slate-950/60 p-6 sm:p-8 backdrop-blur-md transition-all duration-300 hover:border-cyan-400 hover:bg-slate-950/80 hover:shadow-[0_0_30px_rgba(56,189,248,0.18)]"
          >
            <div>
              <span class="font-pixel text-[10px] tracking-widest text-cyan-400 uppercase font-semibold">
                ARCHIVE // FULL INDEX
              </span>
              <h4 class="font-serif text-xl sm:text-2xl font-medium tracking-tight text-foreground mt-1">
                Explore the complete technical project notebook.
              </h4>
              <p class="text-muted-foreground mt-1 text-xs sm:text-sm font-mono">
                Browse all 19+ repositories, client delivery notes, and full-stack experiments.
              </p>
            </div>

            <div class="mt-5 sm:mt-0 flex items-center gap-2 rounded-xl bg-cyan-400/10 border border-cyan-500/30 px-5 py-2.5 font-pixel text-[10px] font-semibold text-cyan-300 transition-colors group-hover:bg-cyan-400 group-hover:text-slate-950 uppercase tracking-wider">
              <span>Open Complete Index</span>
              <ArrowUpRight class="size-4" />
            </div>
          </NuxtLink>
        </article>
      </div>
    </div>
  </section>
</template>
