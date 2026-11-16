<script setup lang="ts">
import gsap from 'gsap'
import { Code2, Database, Wrench, Binary, Cpu, Layers } from '@lucide/vue'
import { marqueeRows, skillGroups } from '~/data/site'

/**
 * SkillsSection.vue — Technical Arsenal Matrix
 *
 * Transformed from a tilted band template into an interactive engineering matrix:
 * - 4 Categorized Bento Cards with animated skill proficiency meters.
 * - Smooth, non-skewed continuous tech stack marquee ticker.
 * - Clear distinction between front-end, edge cloud, tooling, and computer science foundations.
 */

const root = ref<HTMLElement | null>(null)
const reduced = useReducedMotion()

const groupIcons = [Code2, Database, Wrench, Binary]

useGsapContext(root, () => {
  if (reduced.value) return

  // Skill bars fill progressively as section enters view
  gsap.from('.skill-bar-fill', {
    scaleX: 0,
    duration: 1.2,
    ease: 'power3.out',
    stagger: 0.04,
    scrollTrigger: { trigger: '.skill-matrix-grid', start: 'top 80%' },
  })
})
</script>

<template>
  <section id="skills" ref="root" class="relative overflow-hidden py-24 sm:py-32 lg:py-36">
    <div class="mx-auto max-w-350 px-5 sm:px-8 lg:px-12">
      <!-- Section Heading -->
      <SectionHeading
        index="03"
        label="Technical Arsenal"
        title="Tools I build with,"
        accent="systems I understand."
        description="A disciplined stack I actively reach for in production — type-safe, edge-ready, and mobile-optimized."
      />

      <!-- 4-Card Arsenal Bento Matrix -->
      <div class="skill-matrix-grid mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:mt-18">
        <div
          v-for="(group, idx) in skillGroups"
          :key="group.title"
          class="group flex flex-col justify-between rounded-3xl border border-border/80 bg-card/70 p-6 sm:p-7 shadow-[0_8px_32px_rgba(0,0,0,0.25)] backdrop-blur-xl transition-all duration-300 hover:border-cyan-400/40 hover:shadow-[0_0_25px_rgba(56,189,248,0.15)]"
        >
          <div>
            <!-- Group Header -->
            <div class="flex items-center justify-between border-b border-border/60 pb-4">
              <div class="flex items-center gap-2.5">
                <div class="flex size-8 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-400">
                  <component :is="groupIcons[idx] || Layers" class="size-4" />
                </div>
                <span class="font-pixel text-[9px] tracking-widest text-cyan-400 uppercase font-semibold">
                  [ ROM_BANK // 0{{ idx + 1 }} ]
                </span>
              </div>
            </div>

            <h3 class="font-serif text-xl font-medium tracking-tight text-foreground mt-4">
              {{ group.title }}
            </h3>

            <p class="text-muted-foreground mt-1.5 text-xs leading-relaxed">
              {{ group.summary }}
            </p>

            <!-- Skill Items -->
            <ul class="mt-6 space-y-4">
              <li v-for="skill in group.items" :key="skill.name">
                <div class="mb-1.5 flex items-baseline justify-between gap-2">
                  <span class="text-xs font-medium text-foreground/90">{{ skill.name }}</span>
                  <span class="text-cyan-400 font-pixel text-[9px] font-semibold crt-glow">
                    {{ skill.level }}%
                  </span>
                </div>

                <div
                  class="h-1.5 w-full overflow-hidden rounded-full bg-border/60"
                  role="meter"
                  :aria-valuenow="skill.level"
                  aria-valuemin="0"
                  aria-valuemax="100"
                  :aria-label="skill.name"
                >
                  <div
                    class="skill-bar-fill h-full origin-left rounded-full bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-500 shadow-[0_0_8px_rgba(56,189,248,0.5)]"
                    :style="{ transform: `scaleX(${skill.level / 100})` }"
                  />
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Sleek Horizontal Tech Ticker (Replaces tilted band) -->
      <div class="mt-14 overflow-hidden rounded-2xl border border-border/70 bg-card/40 py-5 backdrop-blur-md">
        <div class="space-y-3">
          <MarqueeRow
            v-for="(row, i) in marqueeRows"
            :key="i"
            :items="row"
            :reverse="i % 2 === 1"
            :duration="38 + i * 8"
            :class="i === 1 ? 'text-muted-foreground' : 'text-foreground/90'"
          />
        </div>
      </div>
    </div>
  </section>
</template>
