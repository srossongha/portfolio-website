<script setup lang="ts">
import { ArrowUpRight, ExternalLink, Sparkles, Layers, ShieldCheck, Zap } from '@lucide/vue'
import { projects } from '~/data/site'

/**
 * WorkSection.vue — Editorial Engineering Showcase
 *
 * Transformed from a generic horizontal scroll track into a bespoke editorial gallery:
 * - Flagship Spotlight Card: Full-width split presentation for Roomie (sroknh.com).
 * - 2-Column Responsive Bento Grid for industry & full-stack production projects.
 * - Direct live demo and case study actions right on the cards.
 */

const featured = computed(() => projects.filter((p) => p.featured))
const flagship = computed(() => projects.find((p) => p.slug === 'roomie') || projects[0])
const otherProjects = computed(() => projects.filter((p) => p.slug !== flagship.value?.slug && p.featured))
</script>

<template>
  <section id="work" class="relative overflow-hidden py-24 sm:py-32 lg:py-36">
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
          class="group hidden sm:inline-flex items-center gap-2 rounded-full border border-border/80 bg-card/60 px-5 py-2.5 font-mono text-xs text-muted-foreground backdrop-blur-md transition-all hover:border-cyan-400/50 hover:text-cyan-300"
        >
          <span>View all 19+ repositories</span>
          <ArrowUpRight class="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </NuxtLink>
      </div>

      <!-- ------------------------------------------------ FLAGSHIP HERO CARD -->
      <div v-if="flagship" class="mt-14 lg:mt-18">
        <TiltCard :max="4" :lift="10" radius="rounded-3xl">
          <div class="group relative overflow-hidden rounded-3xl border border-border/80 bg-card/75 p-6 sm:p-10 shadow-[0_12px_40px_rgba(0,0,0,0.35)] backdrop-blur-xl transition-all duration-500 hover:border-cyan-400/50 hover:shadow-[0_0_35px_rgba(56,189,248,0.18)]">
            <!-- Accent gradient line on top -->
            <div
              class="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-500"
              aria-hidden="true"
            />

            <div class="grid gap-8 lg:grid-cols-12 lg:gap-12 lg:items-center">
              <!-- Left: Project Narrative & Specs -->
              <div class="lg:col-span-7">
                <div class="flex flex-wrap items-center gap-3">
                  <Badge variant="brand" class="border-cyan-500/30 bg-cyan-950/40 text-cyan-300 font-mono text-[10px] tracking-wider uppercase">
                    <Sparkles class="size-3" />
                    FLAGSHIP RELEASE
                  </Badge>
                  <span class="font-mono text-[11px] text-muted-foreground tracking-wider uppercase">
                    {{ flagship.role }} · {{ flagship.year }}
                  </span>
                </div>

                <h3 class="font-serif text-3xl font-medium tracking-tight text-foreground sm:text-4xl lg:text-5xl mt-3">
                  {{ flagship.title }}
                </h3>

                <p class="text-muted-foreground mt-3 text-base leading-relaxed sm:text-lg">
                  {{ flagship.description }}
                </p>

                <!-- Metrics Strip -->
                <div class="mt-6 flex flex-wrap gap-4 border-t border-border/60 pt-4">
                  <div
                    v-for="m in flagship.metrics"
                    :key="m.label"
                    class="rounded-xl border border-border/60 bg-background/50 px-3.5 py-2 backdrop-blur-md"
                  >
                    <div class="font-serif text-lg font-semibold text-cyan-400">{{ m.value }}</div>
                    <div class="font-mono text-[10px] uppercase text-muted-foreground">{{ m.label }}</div>
                  </div>
                </div>

                <!-- Stack Tags -->
                <div class="mt-6 flex flex-wrap gap-1.5">
                  <Badge
                    v-for="tech in flagship.stack"
                    :key="tech"
                    variant="tech"
                    class="border-border/70 bg-muted/40 font-mono text-[10px]"
                  >
                    {{ tech }}
                  </Badge>
                </div>

                <!-- Action Links -->
                <div class="mt-8 flex flex-wrap items-center gap-3.5">
                  <a
                    href="https://sroknh.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="group/btn inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 px-6 py-2.5 text-xs font-semibold text-slate-950 shadow-[0_0_18px_rgba(56,189,248,0.35)] transition-all hover:scale-[1.02] hover:shadow-[0_0_28px_rgba(56,189,248,0.55)]"
                  >
                    <span>Visit Live Site</span>
                    <ExternalLink class="size-3.5" />
                  </a>

                  <NuxtLink
                    :to="`/work/${flagship.slug}`"
                    class="inline-flex items-center gap-2 rounded-full border border-border/80 bg-background/70 px-5 py-2.5 text-xs font-medium text-foreground backdrop-blur-md transition-all hover:border-cyan-400/50 hover:text-cyan-300"
                  >
                    <span>Read Architecture Case Study</span>
                    <ArrowUpRight class="size-3.5" />
                  </NuxtLink>
                </div>
              </div>

              <!-- Right: Visual Specimen Console -->
              <div class="lg:col-span-5">
                <div class="relative aspect-16/11 overflow-hidden rounded-2xl border border-border/80 bg-slate-950 p-6 shadow-inner">
                  <!-- Ambient cyber gradient glow inside card -->
                  <div
                    class="absolute inset-0 opacity-40"
                    style="background: radial-gradient(circle at 60% 40%, rgba(56, 189, 248, 0.25) 0%, rgba(99, 102, 241, 0.15) 50%, transparent 75%)"
                  />
                  <div class="bg-scanlines pointer-events-none absolute inset-0 opacity-20" />
                  <div class="bg-retro-dots pointer-events-none absolute inset-0 opacity-20" />

                  <!-- Specimen Window Header -->
                  <div class="relative flex items-center justify-between border-b border-white/10 pb-3">
                    <div class="flex items-center gap-2">
                      <span class="size-2 rounded-full bg-cyan-400 shadow-[0_0_6px_#38bdf8]" />
                      <span class="font-mono text-[10px] tracking-widest text-cyan-300 uppercase">
                        CARTO // MAP ENGINE
                      </span>
                    </div>
                    <span class="font-mono text-[10px] text-white/60">25 PROVINCES</span>
                  </div>

                  <!-- Specimen Centerpiece -->
                  <div class="relative mt-8 flex flex-col items-center justify-center text-center">
                    <div class="flex size-16 items-center justify-center rounded-2xl border border-cyan-400/40 bg-cyan-950/50 text-cyan-300 shadow-[0_0_20px_rgba(56,189,248,0.25)]">
                      <span class="font-serif text-2xl font-bold">KH</span>
                    </div>
                    <h4 class="font-serif text-xl font-medium text-white mt-4">
                      Nationwide Rental Explorer
                    </h4>
                    <p class="font-mono text-xs text-white/60 mt-1 max-w-xs">
                      Bilingual Khmer & English listing interface with Leaflet geospatial coordinates.
                    </p>
                  </div>

                  <!-- Bottom Console Bar -->
                  <div class="absolute inset-x-6 bottom-4 flex items-center justify-between border-t border-white/10 pt-3 font-mono text-[10px] text-white/50">
                    <span>HOST: CLOUDFLARE</span>
                    <span class="text-cyan-400">STATUS: PRODUCTION</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TiltCard>
      </div>

      <!-- ------------------------------------------------ 2-COLUMN PROJECT MATRIX -->
      <div class="mt-8 grid gap-8 md:grid-cols-2">
        <article
          v-for="(project, i) in otherProjects"
          :key="project.slug"
        >
          <TiltCard :max="5" :lift="12" radius="rounded-3xl" class="h-full">
            <div class="group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-border/80 bg-card/70 p-6 sm:p-8 shadow-[0_8px_32px_rgba(0,0,0,0.3)] backdrop-blur-xl transition-all duration-300 hover:border-cyan-400/50 hover:shadow-[0_0_30px_rgba(56,189,248,0.18)]">
              <div>
                <!-- Header: Specimen No & Year -->
                <div class="flex items-center justify-between border-b border-border/60 pb-4">
                  <span class="font-mono text-[10px] tracking-widest text-cyan-400 uppercase font-semibold">
                    PROJECT // {{ String(i + 2).padStart(2, '0') }}
                  </span>
                  <Badge variant="tech" class="border-border/70 text-[10px]">
                    {{ project.year }} · {{ project.role.split('—')[0]?.trim() || project.role }}
                  </Badge>
                </div>

                <!-- Title & Tagline -->
                <h3 class="font-serif text-2xl font-medium tracking-tight text-foreground sm:text-3xl mt-5">
                  {{ project.title }}
                </h3>

                <p class="text-muted-foreground mt-2.5 text-sm leading-relaxed">
                  {{ project.tagline }}
                </p>

                <!-- Metrics strip -->
                <div v-if="project.metrics?.length" class="mt-5 flex flex-wrap gap-2.5">
                  <div
                    v-for="m in project.metrics"
                    :key="m.label"
                    class="rounded-lg border border-border/60 bg-background/50 px-2.5 py-1 text-xs"
                  >
                    <span class="font-semibold text-cyan-400">{{ m.value }}</span>
                    <span class="text-muted-foreground ml-1.5 font-mono text-[10px]">{{ m.label }}</span>
                  </div>
                </div>
              </div>

              <!-- Bottom: Stack & Direct Links -->
              <div class="mt-8 pt-5 border-t border-border/60">
                <div class="flex flex-wrap gap-1.5">
                  <Badge
                    v-for="t in project.stack.slice(0, 4)"
                    :key="t"
                    variant="tech"
                    class="border-border/60 bg-muted/30 font-mono text-[10px]"
                  >
                    {{ t }}
                  </Badge>
                  <Badge
                    v-if="project.stack.length > 4"
                    variant="tech"
                    class="border-border/60 bg-muted/30 font-mono text-[10px]"
                  >
                    +{{ project.stack.length - 4 }}
                  </Badge>
                </div>

                <div class="mt-5 flex items-center justify-between pt-2">
                  <NuxtLink
                    :to="`/work/${project.slug}`"
                    class="group/link inline-flex items-center gap-1.5 font-mono text-xs text-foreground/90 transition-colors hover:text-cyan-300"
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
                    class="inline-flex items-center gap-1 font-mono text-xs text-cyan-400 transition-colors hover:text-cyan-300"
                  >
                    <span>Live Demo</span>
                    <ExternalLink class="size-3" />
                  </a>
                </div>
              </div>
            </div>
          </TiltCard>
        </article>

        <!-- Archive Index Terminal Card -->
        <article class="md:col-span-2">
          <NuxtLink
            to="/work"
            class="group relative flex flex-col sm:flex-row sm:items-center sm:justify-between rounded-3xl border border-dashed border-border/80 bg-card/40 p-8 shadow-[0_4px_24px_rgba(0,0,0,0.25)] backdrop-blur-md transition-all duration-300 hover:border-cyan-400/60 hover:bg-card/70 hover:shadow-[0_0_30px_rgba(56,189,248,0.18)]"
          >
            <div>
              <span class="font-mono text-xs tracking-widest text-cyan-400 uppercase font-semibold">
                ARCHIVE // FULL INDEX
              </span>
              <h4 class="font-serif text-2xl font-medium tracking-tight text-foreground sm:text-3xl mt-1">
                Explore the complete technical project notebook.
              </h4>
              <p class="text-muted-foreground mt-1 text-sm font-mono">
                Browse detailed retrospectives, client delivery notes, and open-source experiments.
              </p>
            </div>

            <div class="mt-6 sm:mt-0 flex items-center gap-2 rounded-full bg-cyan-400/10 px-5 py-2.5 font-mono text-xs font-semibold text-cyan-300 transition-colors group-hover:bg-cyan-400 group-hover:text-slate-950">
              <span>Open Complete Index</span>
              <ArrowUpRight class="size-4" />
            </div>
          </NuxtLink>
        </article>
      </div>
    </div>
  </section>
</template>
