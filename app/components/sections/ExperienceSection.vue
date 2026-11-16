<script setup lang="ts">
import { Briefcase, Building2, GraduationCap, Rocket, Calendar } from '@lucide/vue'
import { experiences } from '~/data/site'
import SectionHeading from '~/components/fx/SectionHeading.vue'

/**
 * ExperienceSection.vue — Modern Career & Education Timeline
 *
 * Professional, authentic presentation:
 * - Enterprise internship records at T.O Group & EKYC Solution
 * - Rigorous computer science foundation at ITC Cambodia
 * - Real-world production software delivery
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
        index="03"
        label="Trajectory"
        title="Experience &"
        accent="education."
        description="A verified chronological progression of technical internships, computer science foundations, and production software delivery."
      />

      <!-- Timeline Container -->
      <div class="mt-12 lg:mt-16 overflow-hidden rounded-2xl border border-cyan-500/25 bg-slate-950/85 shadow-[0_20px_50px_rgba(0,0,0,0.45)] backdrop-blur-xl">
        <!-- Timeline Header -->
        <div class="flex flex-wrap items-center justify-between border-b border-border/40 bg-slate-900/50 px-6 py-3.5 font-mono text-xs text-muted-foreground">
          <div class="flex items-center gap-2.5">
            <span class="size-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#38bdf8]" />
            <span class="font-semibold text-cyan-300">
              Career History &amp; Academic Timeline
            </span>
          </div>

          <div class="hidden sm:flex items-center gap-4 text-xs">
            <span>2022 — Present</span>
            <span class="text-cyan-400 font-medium">Phnom Penh, Cambodia</span>
          </div>
        </div>

        <!-- Timeline Entries -->
        <div class="divide-y divide-border/40">
          <article
            v-for="job in experiences"
            :key="`${job.period}-${job.role}`"
            class="group relative p-6 sm:p-8 transition-colors duration-200 hover:bg-cyan-950/15"
          >
            <div class="grid gap-6 lg:grid-cols-12 lg:items-start lg:gap-8">
              <!-- Left Column: Period (3 cols) -->
              <div class="lg:col-span-3">
                <div class="flex items-center gap-2 font-mono text-xs font-semibold text-cyan-300 sm:text-sm">
                  <Calendar class="size-3.5 text-cyan-400 shrink-0" />
                  <span>{{ job.period }}</span>
                </div>
                <div class="mt-1.5 font-mono text-xs text-muted-foreground">
                  {{ job.organisation.includes('ITC') ? 'Higher Education' : 'Industry Internship' }}
                </div>
              </div>

              <!-- Middle Column: Role, Organization & Description (6 cols) -->
              <div class="lg:col-span-6">
                <div class="flex items-start gap-3.5">
                  <div class="mt-1 flex size-9 shrink-0 items-center justify-center rounded-xl border border-cyan-500/30 bg-cyan-950/40 text-cyan-300">
                    <component :is="getIcon(job.organisation)" class="size-4" />
                  </div>
                  <div>
                    <h3 class="font-serif text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                      {{ job.role }}
                    </h3>
                    <p class="font-mono text-xs font-semibold text-cyan-400 mt-0.5">
                      {{ job.organisation }}
                    </p>
                  </div>
                </div>

                <p class="text-muted-foreground mt-3 text-sm sm:text-base leading-relaxed">
                  {{ job.description }}
                </p>
              </div>

              <!-- Right Column: Tech Stack (3 cols) -->
              <div class="lg:col-span-3 flex flex-col justify-between h-full pt-1">
                <div class="flex flex-wrap gap-1.5">
                  <span
                    v-for="tag in job.tags"
                    :key="tag"
                    class="rounded-md border border-cyan-500/25 bg-cyan-950/30 px-2.5 py-0.5 font-mono text-xs text-cyan-200"
                  >
                    {{ tag }}
                  </span>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  </section>
</template>