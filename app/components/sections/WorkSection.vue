<script setup lang="ts">
import {
  ArrowUpRight,
  ExternalLink,
  Sparkles,
  Layers,
  ShieldCheck,
  Zap,
} from "@lucide/vue";
import { projects } from "~/data/site";
import SectionHeading from "~/components/fx/SectionHeading.vue";
import RetroCartridgeSvg from "~/components/svg/RetroCartridgeSvg.vue";
import DotLottiePlayer from "~/components/fx/DotLottiePlayer.vue";

/**
 * WorkSection.vue — Modern Project Showcase
 *
 * Designed with craft & clarity:
 * - Flagship Showcase: Roomie (ស្រុកខ្ញុំ - sroknh.com)
 * - Clean grid for production applications and enterprise platforms
 * - Authentic tech stack pills, real metrics, and live demo links
 */

const featured = computed(() => projects.filter((p) => p.featured));
const flagship = computed(
  () => projects.find((p) => p.slug === "roomie") || projects[0],
);
const otherProjects = computed(() =>
  projects.filter((p) => p.slug !== flagship.value?.slug && p.featured),
);
</script>

<template>
  <section
    id="work"
    class="relative overflow-hidden py-24 sm:py-32 lg:py-36 border-t border-border/40"
  >
    <div class="mx-auto max-w-350 px-5 sm:px-8 lg:px-12">
      <!-- Section Heading -->
      <div
        class="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6"
      >
        <SectionHeading
          index="02"
          label="Featured Work"
          title="Engineered with intent,"
          accent="tested in production."
          description="Production web applications, geospatial platforms, and client systems built with strict standards."
        />

        <NuxtLink
          to="/work"
          class="group hidden sm:inline-flex items-center gap-2 rounded-xl border border-border/70 bg-card/50 px-4 py-2.5 font-mono text-xs text-muted-foreground backdrop-blur-md transition-all hover:border-cyan-400/50 hover:text-cyan-300"
        >
          <span>View all 19+ repositories</span>
          <ArrowUpRight
            class="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </NuxtLink>
      </div>

      <!-- FLAGSHIP PROJECT: ROOMIE (SROKNH.COM) -->
      <div v-if="flagship" class="mt-12 lg:mt-16">
        <div
          class="relative overflow-hidden rounded-2xl border border-cyan-500/30 bg-slate-950/85 p-6 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.45)] backdrop-blur-xl"
        >
          <!-- Top Accent Rule -->
          <div
            class="absolute inset-x-0 top-0 h-0.5 bg-cyan-400"
            aria-hidden="true"
          />

          <div class="grid gap-8 lg:grid-cols-12 lg:gap-12 lg:items-center">
            <!-- Left: Project Narrative & Specs -->
            <div class="lg:col-span-7">
              <div class="flex flex-wrap items-center gap-3">
                <span
                  class="inline-flex items-center gap-1.5 rounded-full border border-cyan-500/30 bg-cyan-950/40 px-3 py-1 font-mono text-xs font-medium text-cyan-300"
                >
                  <ClientOnly>
                    <DotLottiePlayer
                      src="/animations/pulse-radar.lottie"
                      class="size-3.5 shrink-0"
                      :autoplay="true"
                      :loop="true"
                    />
                    <template #fallback>
                      <Sparkles class="size-3" />
                    </template>
                  </ClientOnly>
                  <span>Flagship Production Platform</span>
                </span>
                <span class="font-mono text-xs text-muted-foreground">
                  {{ flagship.role }} · {{ flagship.year }}
                </span>
              </div>

              <h3
                class="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl mt-3"
              >
                {{ flagship.title }}
              </h3>

              <p
                class="text-muted-foreground mt-3 text-base sm:text-lg leading-relaxed"
              >
                {{ flagship.description }}
              </p>

              <!-- Metrics Strip (Clean Segmented Tiles) -->
              <div
                class="mt-6 flex flex-wrap gap-3 border-t border-border/40 pt-4"
              >
                <div
                  v-for="m in flagship.metrics"
                  :key="m.label"
                  class="rounded-xl border border-cyan-500/20 bg-cyan-950/20 px-4 py-2.5 backdrop-blur-md"
                >
                  <div class="font-serif text-lg font-bold text-cyan-400">
                    {{ m.value }}
                  </div>
                  <div
                    class="font-mono text-[11px] uppercase tracking-wider text-muted-foreground"
                  >
                    {{ m.label }}
                  </div>
                </div>
              </div>

              <!-- Stack Tags -->
              <div class="mt-6 flex flex-wrap gap-1.5">
                <span
                  v-for="tech in flagship.stack"
                  :key="tech"
                  class="rounded-md border border-cyan-400/20 bg-cyan-950/30 px-2.5 py-1 font-mono text-xs text-cyan-200"
                >
                  {{ tech }}
                </span>
              </div>

              <!-- Action Links -->
              <div
                class="mt-8 flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 sm:gap-4"
              >
                <a
                  href="https://sroknh.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-400 hover:bg-cyan-300 px-6 py-3 text-xs font-semibold text-slate-950 shadow-[0_0_15px_rgba(56,189,248,0.25)] transition-all hover:scale-[1.02]"
                >
                  <span>Visit Live Platform</span>
                  <ExternalLink class="size-3.5" />
                </a>

                <NuxtLink
                  :to="`/work/${flagship.slug}`"
                  class="inline-flex items-center justify-center gap-2 rounded-xl border border-border/80 bg-card/60 px-5 py-3 text-xs font-medium text-foreground backdrop-blur-md transition-all hover:border-cyan-400 hover:text-cyan-300"
                >
                  <span>Read Case Study</span>
                  <ArrowUpRight class="size-3.5" />
                </NuxtLink>
              </div>
            </div>

            <!-- Right: Project Architectural Preview Card -->
            <div class="lg:col-span-5">
              <div
                class="relative overflow-hidden rounded-2xl border border-cyan-500/30 bg-slate-900/90 p-6 sm:p-8 shadow-inner"
              >
                <!-- Preview Header -->
                <div
                  class="flex items-center justify-between border-b border-border/40 pb-3"
                >
                  <div class="flex items-center gap-2">
                    <span
                      class="size-2 rounded-full bg-cyan-400 shadow-[0_0_6px_#38bdf8]"
                    />
                    <span class="font-mono text-xs font-semibold text-cyan-300">
                      Geospatial Rental Engine
                    </span>
                  </div>
                  <span class="font-mono text-[11px] text-muted-foreground"
                    >Deployed on Cloudflare</span
                  >
                </div>

                <!-- Centerpiece Visual: Clean Retro Game Cartridge SVG -->
                <div
                  class="my-6 flex flex-col items-center justify-center text-center"
                >
                  <RetroCartridgeSvg
                    title="SROKNH.ROM"
                    serial="DMG-KH-01"
                    class="w-40 sm:w-44 h-auto drop-shadow-[0_15px_30px_rgba(56,189,248,0.2)]"
                  />
                  <h4 class="font-serif text-xl font-bold text-white mt-4">
                    Roomie (ស្រុកខ្ញុំ)
                  </h4>
                  <p
                    class="text-xs text-slate-400 mt-1 max-w-xs leading-relaxed font-mono"
                  >
                    ROM ID: 25 Provinces Mapped · Leaflet + Supabase
                  </p>
                </div>

                <!-- Bottom Telemetry Specs -->
                <div
                  class="pt-3 border-t border-border/40 flex items-center justify-between font-mono text-xs text-muted-foreground"
                >
                  <span class="text-cyan-400">sroknh.com</span>
                  <span class="text-emerald-400 flex items-center gap-1.5">
                    <span
                      class="size-1.5 rounded-full bg-emerald-400 animate-pulse"
                    />
                    Live Production
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 2-COLUMN PROJECT GRID -->
      <div class="mt-8 sm:mt-10 grid gap-6 sm:gap-8 md:grid-cols-2">
        <article
          v-for="project in otherProjects"
          :key="project.slug"
          class="relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border/70 bg-slate-950/80 p-6 sm:p-8 shadow-lg backdrop-blur-xl transition-all duration-300 hover:border-cyan-400/50 hover:shadow-[0_0_30px_rgba(56,189,248,0.12)]"
        >
          <div>
            <!-- Header: Year & Role -->
            <div
              class="flex items-center justify-between border-b border-border/50 pb-3 font-mono text-xs"
            >
              <span class="text-cyan-400 font-semibold">
                {{ project.tags[0] || "Web Application" }}
              </span>
              <span class="text-muted-foreground">
                {{ project.year }} ·
                {{ project.role.split("—")[0]?.trim() || project.role }}
              </span>
            </div>

            <!-- Title & Tagline -->
            <h3
              class="font-serif text-2xl font-bold tracking-tight text-foreground sm:text-3xl mt-4"
            >
              {{ project.title }}
            </h3>

            <p
              class="text-muted-foreground mt-2 text-sm sm:text-base leading-relaxed"
            >
              {{ project.tagline }}
            </p>

            <!-- Metrics Strip -->
            <div
              v-if="project.metrics?.length"
              class="mt-4 flex flex-wrap gap-2"
            >
              <div
                v-for="m in project.metrics"
                :key="m.label"
                class="rounded-lg border border-cyan-500/20 bg-cyan-950/20 px-3 py-1 text-xs"
              >
                <span class="font-bold text-cyan-400">{{ m.value }}</span>
                <span
                  class="text-muted-foreground ml-1.5 font-mono text-[11px]"
                  >{{ m.label }}</span
                >
              </div>
            </div>
          </div>

          <!-- Bottom: Stack & Direct Links -->
          <div class="mt-8 pt-4 border-t border-border/50">
            <div class="flex flex-wrap gap-1.5">
              <span
                v-for="t in project.stack.slice(0, 4)"
                :key="t"
                class="rounded-md border border-border/60 bg-muted/40 px-2.5 py-0.5 font-mono text-xs text-foreground/80"
              >
                {{ t }}
              </span>
              <span
                v-if="project.stack.length > 4"
                class="rounded-md border border-border/60 bg-muted/40 px-2 py-0.5 font-mono text-xs text-muted-foreground"
              >
                +{{ project.stack.length - 4 }}
              </span>
            </div>

            <div class="mt-5 flex items-center justify-between pt-2">
              <NuxtLink
                :to="`/work/${project.slug}`"
                class="group/link inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-cyan-400 transition-colors hover:text-cyan-300"
              >
                <span>Read Case Study</span>
                <ArrowUpRight
                  class="size-3.5 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
                />
              </NuxtLink>

              <!-- External Demo Link if Available -->
              <a
                v-if="project.links?.find((l) => l.label.includes('Live'))"
                :href="
                  project.links.find((l) => l.label.includes('Live'))?.href
                "
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

        <!-- Archive Index Full Card -->
        <article class="md:col-span-2">
          <NuxtLink
            to="/work"
            class="group relative flex flex-col sm:flex-row sm:items-center sm:justify-between rounded-2xl border border-dashed border-cyan-500/40 bg-slate-950/60 p-6 sm:p-8 backdrop-blur-md transition-all duration-300 hover:border-cyan-400 hover:bg-slate-950/80 hover:shadow-[0_0_30px_rgba(56,189,248,0.15)]"
          >
            <div>
              <span
                class="font-mono text-xs text-cyan-400 uppercase tracking-wider font-semibold"
              >
                Complete Project Archive
              </span>
              <h4
                class="font-serif text-xl sm:text-2xl font-bold tracking-tight text-foreground mt-1"
              >
                Explore all repositories and client deliveries.
              </h4>
              <p class="text-muted-foreground mt-1 text-xs sm:text-sm">
                Browse all 19+ repositories, full-stack experiments, and
                production case studies.
              </p>
            </div>

            <div
              class="mt-5 sm:mt-0 flex items-center gap-2 rounded-xl bg-cyan-400/10 border border-cyan-500/30 px-5 py-2.5 font-mono text-xs font-semibold text-cyan-300 transition-colors group-hover:bg-cyan-400 group-hover:text-slate-950"
            >
              <span>Open Project Index</span>
              <ArrowUpRight class="size-4" />
            </div>
          </NuxtLink>
        </article>
      </div>
    </div>
  </section>
</template>
