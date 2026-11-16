<script setup lang="ts">
import { Briefcase, Building2, GraduationCap, Rocket, Calendar, ArrowUpRight } from '@lucide/vue'
import { experiences } from '~/data/site'

/**
 * ExperienceSection.vue — Institutional Service Ledger & Timeline Console
 *
 * Replaces generic floating bento cards with a unified 1970s mainframe service ledger:
 * - Tabular architecture with precise timeline tracks.
 * - Enterprise internship records at T.O Group & EKYC Solution.
 * - Academic CS foundation at ITC Cambodia & Roomie open-source engineering.
 * - Segmented system module registers.
 */

const getIcon = (org: string) => {
  if (org.includes('ITC') || org.includes('Technology')) return GraduationCap
  if (org.includes('Independent') || org.includes('Roomie')) return Rocket
  if (org.includes('T.O') || org.includes('EKYC')) return Building2
  return Briefcase
}
</script>

<template>
  <section id="experience" class="relative overflow-hidden py-24 sm:py-32 lg:py-36 border-t border-border/40">
    <div class="mx-auto max-w-350 px-5 sm:px-8 lg:px-12">
      <!-- Section Heading -->
      <SectionHeading
        index="05"
        label="Trajectory"
        title="Where the hours"
        accent="have been invested."
        description="A verified chronological progression of technical internships, computer science foundations, and production software delivery."
      />

      <!-- Mainframe Institutional Service Ledger -->
      <div class="mt-14 lg:mt-18 overflow-hidden rounded-2xl border border-cyan-500/30 bg-slate-950/85 shadow-[0_16px_50px_rgba(0,0,0,0.5)] backdrop-blur-2xl">
        <!-- Terminal Header -->
        <div class="flex flex-wrap items-center justify-between border-b border-cyan-500/20 bg-cyan-950/30 px-6 py-3 font-mono text-[10px] text-cyan-400">
          <div class="flex items-center gap-3">
            <span class="size-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#38bdf8]" />
            <span class="font-pixel text-[9px] tracking-wider uppercase">
              // INSTITUTIONAL_SERVICE_LEDGER: RECORDS_2022_2026
            </span>
          </div>

          <div class="hidden sm:flex items-center gap-6 text-[9px] text-cyan-300/80">
            <span>AUDIT: 100% VERIFIED</span>
            <span>TOTAL_MILESTONES: 04</span>
            <span class="font-pixel text-cyan-400">[ STATUS: OPERATIONAL ]</span>
          </div>
        </div>

        <!-- Ledger Entries (Divided Rows) -->
        <div class="divide-y divide-cyan-500/15">
          <article
            v-for="(job, i) in experiences"
            :key="`${job.period}-${job.role}`"
            class="group relative p-6 sm:p-8 transition-colors duration-200 hover:bg-cyan-950/15"
          >
            <div class="grid gap-6 lg:grid-cols-12 lg:items-start lg:gap-8">
              <!-- Left Column: Timecode & Index (3 cols) -->
              <div class="lg:col-span-3">
                <div class="flex items-center gap-2">
                  <span class="font-pixel text-[9px] text-cyan-400 tracking-wider">
                    [ RECORD // 0{{ i + 1 }} ]
                  </span>
                  <span class="size-1 rounded-full bg-cyan-400" />
                </div>
                <div class="mt-2 flex items-center gap-1.5 font-mono text-xs font-semibold text-cyan-200 sm:text-sm">
                  <Calendar class="size-3.5 text-cyan-400 shrink-0" />
                  <span>{{ job.period }}</span>
                </div>
                <div class="mt-1 font-mono text-[10px] text-cyan-400/60 uppercase">
                  VERIFIED DEPLOYMENT
                </div>
              </div>

              <!-- Middle Column: Role, Organization & Execution Narrative (6 cols) -->
              <div class="lg:col-span-6">
                <div class="flex items-start gap-3.5">
                  <div class="mt-1 flex size-9 shrink-0 items-center justify-center rounded-lg border border-cyan-500/30 bg-cyan-950/40 text-cyan-300 shadow-[0_0_10px_rgba(56,189,248,0.2)]">
                    <component :is="getIcon(job.organisation)" class="size-4" />
                  </div>
                  <div>
                    <h3 class="font-serif text-xl sm:text-2xl font-medium tracking-tight text-foreground">
                      {{ job.role }}
                    </h3>
                    <p class="font-mono text-xs font-semibold tracking-wider text-cyan-300 uppercase mt-0.5">
                      {{ job.organisation }}
                    </p>
                  </div>
                </div>

                <p class="text-muted-foreground mt-3 text-xs sm:text-sm leading-relaxed font-sans">
                  {{ job.description }}
                </p>
              </div>

              <!-- Right Column: Loaded System Modules (3 cols) -->
              <div class="lg:col-span-3 flex flex-col justify-between h-full pt-1">
                <div class="flex flex-wrap gap-1.5">
                  <span
                    v-for="tag in job.tags"
                    :key="tag"
                    class="rounded border border-cyan-500/25 bg-cyan-950/30 px-2 py-0.5 font-mono text-[9px] text-cyan-200"
                  >
                    [{{ tag }}]
                  </span>
                </div>

                <div class="mt-4 flex items-center justify-end font-mono text-[9px] text-cyan-400/70">
                  <span class="font-pixel text-[8px] text-cyan-300">INTEGRITY: PASS</span>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  </section>
</template>
