<script setup lang="ts">
import { Briefcase, Building2, GraduationCap, Rocket, Calendar } from '@lucide/vue'
import { experiences } from '~/data/site'

/**
 * ExperienceSection.vue — Career & Engineering Roadmap
 *
 * Transformed from a generic vertical line into an interactive 2x2 Bento Roadmap:
 * - Enterprise Internships: T.O Group & EKYC Solution Co., Ltd.
 * - Academic & Open Source Initiatives: ITC Cambodia & Roomie Marketplace.
 */

const getIcon = (org: string) => {
  if (org.includes('ITC') || org.includes('Technology')) return GraduationCap
  if (org.includes('Independent') || org.includes('Roomie')) return Rocket
  if (org.includes('T.O') || org.includes('EKYC')) return Building2
  return Briefcase
}
</script>

<template>
  <section id="experience" class="relative overflow-hidden py-24 sm:py-32 lg:py-36">
    <div class="mx-auto max-w-350 px-5 sm:px-8 lg:px-12">
      <!-- Section Heading -->
      <SectionHeading
        index="05"
        label="Trajectory"
        title="Where the hours"
        accent="have been invested."
        description="A verified progression of technical internships, computer science foundations, and production software delivery."
      />

      <!-- 2x2 Bento Career Matrix -->
      <div class="mt-14 grid gap-6 md:grid-cols-2 lg:mt-18">
        <article
          v-for="(job, i) in experiences"
          :key="`${job.period}-${job.role}`"
          class="group flex flex-col justify-between rounded-3xl border border-border/80 bg-card/70 p-5 sm:p-8 shadow-[0_8px_32px_rgba(0,0,0,0.25)] backdrop-blur-xl transition-all duration-300 hover:border-cyan-400/50 hover:shadow-[0_0_30px_rgba(56,189,248,0.18)]"
        >
          <div>
            <!-- Header Row -->
            <div class="flex items-center justify-between border-b border-border/60 pb-4">
              <span class="flex items-center gap-1.5 font-pixel text-[9px] text-cyan-400 font-semibold tracking-wider uppercase">
                <Calendar class="size-3" />
                {{ job.period }}
              </span>

              <span class="rounded-xs border border-cyan-500/30 bg-cyan-950/30 px-2 py-0.5 font-pixel text-[8px] text-cyan-300 uppercase">
                [ MILESTONE // 0{{ i + 1 }} ]
              </span>
            </div>

            <!-- Role & Organization -->
            <div class="mt-5 flex items-start gap-3.5">
              <div class="flex size-10 shrink-0 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-400 shadow-[0_0_12px_rgba(56,189,248,0.2)]">
                <component :is="getIcon(job.organisation)" class="size-5" />
              </div>

              <div>
                <h3 class="font-serif text-2xl font-medium tracking-tight text-foreground sm:text-3xl">
                  {{ job.role }}
                </h3>
                <p class="font-mono text-xs font-semibold tracking-wider text-cyan-300 uppercase mt-0.5">
                  {{ job.organisation }}
                </p>
              </div>
            </div>

            <!-- Description -->
            <p class="text-muted-foreground mt-4 text-sm leading-relaxed sm:text-base">
              {{ job.description }}
            </p>
          </div>

          <!-- Stack Tags -->
          <div class="mt-8 border-t border-border/60 pt-4">
            <div class="flex flex-wrap gap-1.5">
              <Badge
                v-for="tag in job.tags"
                :key="tag"
                variant="tech"
                class="border-border/60 bg-muted/40 font-mono text-[10px]"
              >
                {{ tag }}
              </Badge>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
