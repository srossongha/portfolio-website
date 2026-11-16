<script setup lang="ts">
import gsap from 'gsap'
import { ArrowDown, ArrowUpRight } from '@lucide/vue'
import { profile } from '~/data/site'
import CyanAurora from '~/components/fx/CyanAurora.vue'
import RetroTapeBar from '~/components/fx/RetroTapeBar.vue'

/**
 * The Hero section.
 *
 * Designed with a clean, modern cyber-luxe aesthetic:
 * - Electric Cyan & Royal Indigo atmospheric lighting.
 * - Fluid entrance animations with zero awkward section overlap or parallax ghosting.
 * - Tactile, high-status buttons and luminous typography.
 */

const root = ref<HTMLElement | null>(null)
const { isReady } = useAppReady()
const reduced = useReducedMotion()
const { scrollTo } = useSmoothScroll()

let introCtx: gsap.Context | undefined

const stopWatching = watch(
  isReady,
  (ready) => {
    if (!ready || !root.value) return
    stopWatching()

    if (reduced.value) {
      gsap.set('.hero-anim', { opacity: 1, y: 0 })
      return
    }

    introCtx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })

      tl.from('.hero-eyebrow', { opacity: 0, y: 20, duration: 0.8 })
        .from(
          '.hero-title .split-char',
          { yPercent: 115, duration: 1.1, stagger: 0.03 },
          '-=0.45',
        )
        .from(
          '.hero-line-2',
          { yPercent: 35, opacity: 0, duration: 1.0, ease: 'power4.out' },
          '-=0.8',
        )
        .from('.hero-tagline', { opacity: 0, y: 20, duration: 0.85 }, '-=0.65')
        .from('.hero-cta', { opacity: 0, y: 18, duration: 0.75, stagger: 0.08 }, '-=0.55')
        .from('.hero-stat', { opacity: 0, y: 20, duration: 0.75, stagger: 0.06 }, '-=0.45')
        .from('.hero-hint', { opacity: 0, duration: 0.7 }, '-=0.35')
    }, root.value)
  },
  { immediate: true },
)

onUnmounted(() => introCtx?.revert())
</script>

<template>
  <section
    id="hero"
    ref="root"
    class="relative flex min-h-svh items-center overflow-hidden bg-background"
  >
    <!-- Luminous Cyan & Royal Indigo Ambient Aurora (No green, no bubbles) -->
    <CyanAurora />

    <!-- Soft radial vignette for crisp text contrast -->
    <div
      class="pointer-events-none absolute inset-0"
      aria-hidden="true"
      style="background: radial-gradient(ellipse 90% 70% at 50% 50%, transparent 35%, var(--background) 95%)"
    />

    <!-- ------------------------------------------------------------ text -->
    <div class="relative mx-auto w-full max-w-350 px-5 pt-24 pb-14 sm:pt-28 sm:pb-16 lg:pt-32 lg:pb-16 sm:px-8 lg:px-12">
      <!-- Eyebrow row with status & telemetry -->
      <div class="hero-anim hero-eyebrow mb-8 flex flex-wrap items-center justify-between gap-4">
        <div class="flex flex-wrap items-center gap-3">
          <Badge variant="live" class="border-cyan-500/30 bg-cyan-950/40 text-cyan-300 shadow-[0_0_12px_rgba(56,189,248,0.2)]">
            <span class="relative flex size-2">
              <span class="absolute inline-flex size-full animate-ping rounded-full bg-cyan-400 opacity-75" />
              <span class="relative inline-flex size-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#38bdf8]" />
            </span>
            {{ profile.availability }}
          </Badge>
          <span class="text-muted-foreground font-mono text-[11px] tracking-[0.25em] uppercase">
            {{ profile.location }}
          </span>
        </div>

        <!-- Telemetry Bar -->
        <RetroTapeBar class="hidden sm:inline-flex" />
      </div>

      <!-- Main Headline -->
      <div class="relative max-w-5xl">
        <h1 class="hero-title font-serif leading-[1.02] tracking-[-0.01em] sm:leading-[0.88] sm:tracking-[-0.03em]">
          <SplitText
            :text="profile.role"
            class="hero-anim block text-[clamp(2.5rem,8vw,6.8rem)] font-medium text-foreground"
          />
          <em class="hero-line-2 text-gradient block text-[clamp(2rem,5.8vw,5.4rem)] font-light italic">
            {{ profile.tagline }}
          </em>
        </h1>
      </div>

      <!-- Supporting Bio -->
      <p class="hero-anim hero-tagline text-muted-foreground mt-6 max-w-xl text-base leading-relaxed sm:text-lg">
        {{ profile.bio[0] }}
      </p>

      <!-- Calls to Action -->
      <div class="mt-8 flex flex-wrap items-center gap-4">
        <MagneticWrap :strength="0.3" class="hero-anim hero-cta">
          <Button
            size="pill"
            class="group relative inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 px-7 py-3 text-sm font-semibold text-slate-950 shadow-[0_0_25px_rgba(56,189,248,0.35)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_35px_rgba(56,189,248,0.55)]"
            data-cursor-label="Work"
            @click="scrollTo('#work', { offset: -60 })"
          >
            Explore selected work
            <ArrowUpRight class="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Button>
        </MagneticWrap>

        <MagneticWrap :strength="0.3" class="hero-anim hero-cta">
          <Button
            size="pill"
            class="rounded-full border border-border/80 bg-card/60 px-6 py-3 text-sm font-medium text-foreground backdrop-blur-md transition-all duration-300 hover:border-cyan-400/50 hover:bg-card/85 hover:text-cyan-300 hover:shadow-[0_0_18px_rgba(56,189,248,0.2)]"
            as="a"
            :href="`mailto:${profile.email}`"
            data-cursor-label="Say hi"
          >
            Get in touch
          </Button>
        </MagneticWrap>

        <!-- Mobile only tape deck -->
        <RetroTapeBar class="sm:hidden mt-2" />
      </div>

      <!-- Stats strip -->
      <dl class="border-border/60 mt-14 grid max-w-4xl grid-cols-2 gap-y-6 border-t pt-6 sm:grid-cols-4">
        <div v-for="stat in profile.stats" :key="stat.label" class="hero-anim hero-stat relative group">
          <dt class="sr-only">{{ stat.label }}</dt>
          <dd>
            <span class="block font-serif text-3xl font-medium tracking-tight text-cyan-400 dark:text-cyan-300 sm:text-4xl">
              <CountUp :value="stat.value" :suffix="stat.suffix" />
            </span>
            <span class="text-muted-foreground mt-1 flex items-center gap-1.5 font-mono text-[10px] tracking-[0.2em] uppercase">
              <span class="size-1 rounded-full bg-cyan-400/80 shadow-[0_0_4px_#38bdf8]" />
              {{ stat.label }}
            </span>
          </dd>
        </div>
      </dl>
    </div>

    <!-- Scroll hint -->
    <button
      class="hero-anim hero-hint text-muted-foreground hover:text-cyan-400 absolute right-5 bottom-6 hidden flex-col items-center gap-2 transition-colors sm:right-8 lg:right-12 lg:flex"
      aria-label="Scroll to content"
      @click="scrollTo('#about', { offset: 0 })"
    >
      <span class="font-mono text-[10px] tracking-[0.3em] uppercase">Scroll</span>
      <ArrowDown class="size-3.5 animate-scroll-hint text-cyan-400" />
    </button>
  </section>
</template>
