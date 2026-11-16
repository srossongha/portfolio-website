<script setup lang="ts">
import gsap from 'gsap'
import { ArrowUpRight } from '@lucide/vue'
import { projects } from '~/data/site'

/**
 * Selected work — the horizontal scroll section.
 *
 * HOW HORIZONTAL SCROLL ACTUALLY WORKS
 * The page never scrolls sideways. Instead:
 *   1. `pin: true` sticks the section to the viewport, so it stops moving while
 *      the rest of the document keeps scrolling underneath.
 *   2. During that pinned window we translate a wide track on the X axis.
 *   3. `end: () => '+=' + distance` makes the pin last exactly as long as the
 *      track needs to travel, so the horizontal movement is 1:1 with the wheel.
 *
 * `invalidateOnRefresh: true` is the line people forget. Without it the travel
 * distance is measured once at page load and never again — resize the window,
 * or let a font load late, and the last card ends up half off screen forever.
 *
 * RESPONSIVE
 * Horizontal scroll on a phone is genuinely bad: it fights the browser's own
 * gestures and there is no room for a wide card. `gsap.matchMedia` runs the
 * pinning only above 768px and cleanly reverts it below, where the cards fall
 * back to a normal vertical stack.
 */

const root = ref<HTMLElement | null>(null)
const track = ref<HTMLElement | null>(null)
const reduced = useReducedMotion()

const featured = computed(() => projects.filter((p) => p.featured))

/** Held at module scope of the component so we can revert it on unmount. */
let mm: gsap.MatchMedia | undefined

useGsapContext(root, () => {
  mm = gsap.matchMedia()

  // -------------------------------------------------- desktop: horizontal ---
  mm.add('(min-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
    if (!track.value || !root.value) return

    // How far the track must travel: its full width minus one screen.
    const getDistance = () => (track.value?.scrollWidth ?? 0) - window.innerWidth

    const tween = gsap.to(track.value, {
      x: () => -getDistance(),
      ease: 'none',
      scrollTrigger: {
        trigger: root.value,
        start: 'top top',
        end: () => `+=${getDistance()}`,
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true, // re-measure on resize — see note above
        anticipatePin: 1, // avoids a one-frame jump when the pin engages
      },
    })

    // Cards lift and brighten as they reach the centre of the screen.
    // `containerAnimation` is the key: it tells ScrollTrigger that these
    // elements move because of `tween`, not because the page scrolled, so
    // "when is this card in view" is computed against the horizontal motion.
    gsap.utils.toArray<HTMLElement>('.work-card').forEach((card) => {
      gsap.from(card, {
        y: 60,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
          trigger: card,
          containerAnimation: tween,
          start: 'left 90%',
          toggleActions: 'play none none reverse',
        },
      })
    })

    // The section title parallaxes slowly against the cards.
    gsap.to('.work-heading', {
      x: -80,
      ease: 'none',
      scrollTrigger: {
        trigger: root.value,
        start: 'top top',
        end: () => `+=${getDistance()}`,
        scrub: 1,
      },
    })
  })

  // ------------------------------------------------------ mobile: vertical ---
  mm.add('(max-width: 767px)', () => {
    gsap.from('.work-card', {
      y: 50,
      opacity: 0,
      duration: 0.9,
      stagger: 0.12,
      scrollTrigger: { trigger: '.work-track', start: 'top 80%' },
    })
  })
})

// matchMedia registers window listeners of its own, so it needs its own revert.
onUnmounted(() => mm?.revert())
</script>

<template>
  <section
    id="work"
    ref="root"
    class="relative md:h-screen md:overflow-hidden"
    :class="reduced ? '' : ''"
  >
    <!-- Heading sits above the track and stays put while the cards slide by. -->
    <div class="mx-auto max-w-350 px-5 pt-24 sm:px-8 lg:px-12 md:pt-28">
      <div class="work-heading">
        <SectionHeading
          index="03"
          label="Selected work"
          title="Things I built"
          accent="and what they taught me."
        />
      </div>

      <p class="text-muted-foreground mt-8 hidden items-center gap-3 font-mono text-[11px] tracking-[0.2em] uppercase md:flex">
        <span class="bg-gradient-to-r from-cyan-400 to-indigo-500 h-px w-10 shadow-[0_0_6px_#38bdf8]" />
        Scroll to move sideways
      </p>
    </div>

    <!--
      THE TRACK.
      `w-max` lets it grow as wide as its cards need. On mobile it becomes a
      normal vertical flex column.
    -->
    <div
      ref="track"
      class="work-track mt-12 flex flex-col gap-6 px-5 sm:px-8 md:mt-16 md:w-max md:flex-row md:items-stretch md:gap-8 md:px-[max(3rem,calc((100vw-1400px)/2+3rem))]"
    >
      <article
        v-for="(project, i) in featured"
        :key="project.slug"
        class="work-card md:w-[min(78vw,30rem)] md:shrink-0"
      >
        <TiltCard :max="6" :lift="18" radius="rounded-2xl" class="h-full">
          <NuxtLink
            :to="`/work/${project.slug}`"
            class="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border/80 bg-card/70 shadow-[0_4px_24px_rgba(0,0,0,0.25)] backdrop-blur-md transition-all duration-500 hover:border-cyan-400/50 hover:shadow-[0_0_30px_rgba(56,189,248,0.2)]"
            :data-cursor-label="`View ${project.title}`"
          >
            <!-- Subtle ambient tint on hover -->
            <div
              class="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
              :style="{
                background: `linear-gradient(145deg, color-mix(in oklch, ${project.accent[0]} 12%, transparent), color-mix(in oklch, ${project.accent[1]} 5%, transparent) 60%, transparent)`,
              }"
              aria-hidden="true"
            />

            <!-- Visual cartridge panel -->
            <div class="relative aspect-16/10 overflow-hidden border-b border-border/60 bg-muted/40">
              <div
                class="absolute inset-0 transition-transform duration-[1.2s] group-hover:scale-105"
                :style="{
                  background: `radial-gradient(ellipse at 35% 30%, ${project.accent[0]}, transparent 65%),
                               radial-gradient(ellipse at 80% 75%, ${project.accent[1]}, transparent 65%),
                               color-mix(in oklch, var(--card) 90%, black)`,
                }"
                style="transition-timing-function: var(--ease-out-expo)"
              />

              <!-- Botanical dot matrix & scanline textures -->
              <div class="bg-retro-dots absolute inset-0 opacity-25" />
              <div class="bg-scanlines absolute inset-0 opacity-15" />

              <!-- Specimen header tag & status -->
              <div class="absolute inset-x-0 top-0 flex items-start justify-between p-4 sm:p-5">
                <span class="rounded-sm border border-foreground/15 bg-background/80 px-2 py-0.5 font-mono text-[10px] tracking-[0.25em] text-cyan-300 uppercase backdrop-blur-md">
                  SPECIMEN // {{ String(i + 1).padStart(2, '0') }}
                </span>
                <Badge :variant="project.status === 'building' ? 'brand' : 'tech'" class="border border-cyan-400/30 backdrop-blur-md">
                  {{ project.status === 'building' ? 'In progress' : project.year }}
                </Badge>
              </div>

              <!-- Hover arrow button -->
              <div
                class="glass absolute right-4 bottom-4 flex size-10 translate-y-2 items-center justify-center rounded-full border border-cyan-400/40 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 shadow-[0_0_15px_rgba(56,189,248,0.3)]"
                aria-hidden="true"
              >
                <ArrowUpRight class="size-4 text-cyan-400" />
              </div>
            </div>

            <!-- Text panel: field log details -->
            <div class="relative flex flex-1 flex-col p-6 sm:p-7">
              <div class="flex items-baseline justify-between gap-2">
                <h3 class="font-serif text-2xl font-medium tracking-tight sm:text-3xl">
                  {{ project.title }}
                </h3>
              </div>

              <p class="text-muted-foreground mt-2.5 text-sm leading-relaxed">
                {{ project.tagline }}
              </p>

              <!-- Highlights / Metrics ticker strip if available -->
              <div v-if="project.metrics?.length" class="mt-4 flex flex-wrap gap-3 border-t border-dashed border-border/60 pt-3">
                <div v-for="m in project.metrics.slice(0, 2)" :key="m.label" class="flex items-center gap-1.5 font-mono text-[10px]">
                  <span class="font-semibold text-cyan-400">{{ m.value }}</span>
                  <span class="text-muted-foreground">{{ m.label }}</span>
                </div>
              </div>

              <!-- Stack badges -->
              <ul class="mt-auto flex flex-wrap gap-1.5 pt-5">
                <li v-for="tech in project.stack.slice(0, 4)" :key="tech">
                  <Badge variant="tech" class="border border-border/60 bg-muted/40 font-mono text-[10px]">
                    {{ tech }}
                  </Badge>
                </li>
                <li v-if="project.stack.length > 4">
                  <Badge variant="tech" class="border border-border/60 bg-muted/40 font-mono text-[10px]">
                    +{{ project.stack.length - 4 }}
                  </Badge>
                </li>
              </ul>
            </div>
          </NuxtLink>
        </TiltCard>
      </article>

      <!-- Closing panel: retro archive dispatch ticket -->
      <article class="work-card flex md:w-96 md:shrink-0">
        <NuxtLink
          to="/work"
          class="group relative flex w-full flex-col items-start justify-end rounded-2xl border border-border/80 bg-card/50 p-8 shadow-[0_4px_24px_rgba(0,0,0,0.25)] backdrop-blur-md transition-all duration-300 hover:border-cyan-400/60 hover:bg-card/75 hover:shadow-[0_0_25px_rgba(56,189,248,0.2)]"
          data-cursor-label="All work"
        >
          <span class="text-cyan-400 mb-4 font-mono text-[11px] tracking-[0.25em] uppercase font-semibold">
            ARCHIVE // INDEX
          </span>
          <span class="font-serif text-3xl leading-tight tracking-tight font-medium">
            Explore the complete<br >project index.
          </span>
          <span class="text-muted-foreground group-hover:text-cyan-300 mt-6 inline-flex items-center gap-2 font-mono text-xs tracking-wider uppercase transition-colors">
            Browse all entries
            <ArrowUpRight class="size-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </span>
        </NuxtLink>
      </article>
    </div>
  </section>
</template>
