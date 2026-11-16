<script setup lang="ts">
import {
  Check,
  Download,
  GraduationCap,
  Briefcase,
  MapPin,
  Code2,
  Cpu,
  Layers,
  Smartphone,
  ShieldCheck,
  Zap,
} from '@lucide/vue'
import { toast } from 'vue-sonner'
import { profile } from '~/data/site'
import SectionHeading from '~/components/fx/SectionHeading.vue'

/**
 * AboutSection.vue — Modern Engineering Dossier
 *
 * Clean, human, authentic presentation:
 * - High-res portrait photo without scanline interference
 * - Honest biography and education at ITC Cambodia
 * - Real core competencies and engineering standards
 */

const root = ref<HTMLElement | null>(null)
const isDownloaded = ref(false)
let downloadTimer: ReturnType<typeof setTimeout> | undefined

function handleDownload() {
  isDownloaded.value = true
  toast.success('Downloading Curriculum Vitae', {
    description: 'SROS Songha.pdf · 337 KB',
  })
  if (downloadTimer) clearTimeout(downloadTimer)
  downloadTimer = setTimeout(() => {
    isDownloaded.value = false
  }, 2800)
}

onUnmounted(() => {
  if (downloadTimer) clearTimeout(downloadTimer)
})

const principles = [
  {
    icon: Zap,
    title: 'Performance & 60fps UI',
    summary:
      'Sub-second first paint, fluid frame rates, and zero layout shift. If an interface stutters on a mobile device, the engineering is incomplete.',
  },
  {
    icon: ShieldCheck,
    title: 'Type-Level Determinism',
    summary:
      'Strict TypeScript interfaces, predictable state machines, and immutable data flows. Errors are caught at compile-time, never in user viewports.',
  },
  {
    icon: Layers,
    title: 'Full-Stack Architecture',
    summary:
      'Strong foundations in computer science from ITC Cambodia, edge serverless computing on Cloudflare Workers, and PostgreSQL database modeling.',
  },
  {
    icon: Smartphone,
    title: 'Mobile-First Ergonomics',
    summary:
      'Generous 48px touch targets, accessible contrast, and ergonomic single-hand navigation across diverse screen sizes and network speeds.',
  },
]
</script>

<template>
  <section
    id="about"
    ref="root"
    class="relative overflow-hidden py-24 sm:py-32 lg:py-36 border-t border-border/40"
  >
    <div class="mx-auto max-w-350 px-5 sm:px-8 lg:px-12">
      <!-- Section Heading -->
      <SectionHeading
        index="01"
        label="Background"
        title="Engineering with precision,"
        accent="driven by craft."
      />

      <!-- Asymmetrical Grid: Profile Plaque & Biography -->
      <div class="mt-12 grid gap-10 lg:mt-16 lg:grid-cols-12 lg:gap-14">
        <!-- Left Column: Portrait & Key Details (4 cols) -->
        <div class="lg:col-span-4 flex flex-col justify-between">
          <div class="relative overflow-hidden rounded-2xl border border-cyan-500/25 bg-slate-950/80 p-4 shadow-xl">
            <!-- Clean Portrait Photo -->
            <div class="relative aspect-4/5 overflow-hidden rounded-xl border border-border/60 bg-muted">
              <img
                src="/images/profile.jpeg"
                :alt="profile.name"
                class="size-full object-cover transition-transform duration-500 hover:scale-105"
              />
              <div
                class="absolute inset-0 pointer-events-none"
                style="background: linear-gradient(to top, rgba(8, 11, 18, 0.75) 0%, transparent 40%);"
              />
              <div class="absolute bottom-3.5 inset-x-3.5">
                <p class="font-serif text-xl font-bold text-white">
                  {{ profile.name }}
                </p>
                <p class="font-mono text-xs text-cyan-300">
                  {{ profile.role }} · Front-end Intern
                </p>
              </div>
            </div>

            <!-- Profile Metadata Table -->
            <div class="mt-4 space-y-2.5 font-mono text-xs border-t border-border/50 pt-3">
              <div class="flex justify-between py-1 border-b border-border/30">
                <span class="text-muted-foreground">Primary Role</span>
                <span class="text-cyan-400 font-semibold">Software Engineer</span>
              </div>
              <div class="flex justify-between py-1 border-b border-border/30">
                <span class="text-muted-foreground">Current Practice</span>
                <span class="text-foreground">Front-end Intern</span>
              </div>
              <div class="flex justify-between py-1 border-b border-border/30">
                <span class="text-muted-foreground">Education</span>
                <span class="text-foreground">ITC Cambodia</span>
              </div>
              <div class="flex justify-between py-1 border-b border-border/30">
                <span class="text-muted-foreground">Academic Status</span>
                <span class="text-cyan-300">Year 4 Undergrad</span>
              </div>
              <div class="flex justify-between py-1 border-b border-border/30">
                <span class="text-muted-foreground">Internships</span>
                <span class="text-foreground">T.O Group &amp; EKYC</span>
              </div>
              <div class="flex justify-between py-1">
                <span class="text-muted-foreground">Location</span>
                <span class="text-foreground">Phnom Penh (UTC+7)</span>
              </div>
            </div>

            <!-- CV Download Button -->
            <div class="mt-4 pt-3 border-t border-border/50">
              <Button
                size="sm"
                as="a"
                :href="profile.cvUrl"
                download="SROS Songha.pdf"
                target="_blank"
                class="w-full gap-2 rounded-xl bg-cyan-400 hover:bg-cyan-300 py-2.5 text-xs font-semibold text-slate-950 shadow-[0_0_15px_rgba(56,189,248,0.25)] transition-all hover:scale-[1.01]"
                @click="handleDownload"
              >
                <component :is="isDownloaded ? Check : Download" class="size-4" />
                <span>{{ isDownloaded ? 'Downloaded CV' : 'Download Curriculum Vitae' }}</span>
              </Button>
            </div>
          </div>
        </div>

        <!-- Right Column: Narrative & Engineering Focus (8 cols) -->
        <div class="lg:col-span-8 flex flex-col justify-between">
          <div>
            <h3 class="font-serif text-2xl font-semibold tracking-tight text-foreground sm:text-3xl lg:text-4xl leading-snug">
              &quot;I engineer software to hold up in real hands — fast on modest connections, accessible on any screen, and clean under the hood.&quot;
            </h3>

            <div class="mt-6 space-y-4 text-muted-foreground text-base leading-relaxed">
              <p>
                I am a Computer Science student at the Institute of Technology of Cambodia (ITC) and a software engineer based in Phnom Penh. I specialize in building fast, accessible web applications and distributed systems with Vue, Nuxt, React, and TypeScript.
              </p>
              <p>
                Through internships at T.O Group and EKYC Solution Co., Ltd., I develop production interfaces that solve real-world problems: edge-rendered customer marketing platforms, dynamic headless CMS integrations, and real-time document capture pipelines. As co-creator of Roomie (ស្រុកខ្ញុំ), I built and deployed a nationwide rental housing marketplace mapping all 25 provinces in Cambodia at sroknh.com.
              </p>
            </div>
          </div>

          <!-- Engineering Principles Grid -->
          <div class="mt-10 pt-8 border-t border-border/50">
            <h4 class="font-mono text-xs uppercase tracking-wider text-cyan-400 font-semibold mb-5">
              Core Engineering Standards:
            </h4>

            <div class="grid gap-4 sm:grid-cols-2">
              <div
                v-for="p in principles"
                :key="p.title"
                class="rounded-xl border border-border/60 bg-card/40 p-5 transition-all hover:border-cyan-400/40 hover:bg-cyan-950/10"
              >
                <div class="flex items-center gap-2.5 text-cyan-400">
                  <component :is="p.icon" class="size-4 shrink-0" />
                  <h5 class="font-serif text-base font-semibold text-foreground">
                    {{ p.title }}
                  </h5>
                </div>
                <p class="text-muted-foreground text-xs sm:text-sm mt-2 leading-relaxed">
                  {{ p.summary }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>