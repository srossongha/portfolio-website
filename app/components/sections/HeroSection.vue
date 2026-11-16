<script setup lang="ts">
import gsap from 'gsap'
import { ArrowDown, ArrowUpRight } from '@lucide/vue'
import { profile } from '~/data/site'

/**
 * The hero.
 *
 * Layering, back to front:
 *   1. Ambient glow orbs + technical hairline grid
 *   2. Soft radial vignette for crisp typography contrast
 *   3. The text, in normal document flow
 *
 * The intro animation waits for the preloader to hand over (`isReady`), then
 * plays as one timeline so everything is choreographed rather than a pile of
 * independent delays.
 */

const root = ref<HTMLElement | null>(null)
const { isReady } = useAppReady()
const reduced = useReducedMotion()
const { scrollTo } = useSmoothScroll()

/* --------------------------------------------------------------- intro ---- */
/**
 * Held outside the watcher so the `onUnmounted` below can reach it.
 *
 * (Registering `onUnmounted` *inside* a watch callback does not work: Vue can
 * only associate lifecycle hooks with a component while `setup()` is running,
 * and a watch callback fires long after that. Doing it wrong logs
 * "onUnmounted is called when there is no active component instance" and the
 * cleanup silently never runs.)
 */
let introCtx: gsap.Context | undefined

const stopWatching = watch(
  isReady,
  (ready) => {
    if (!ready || !root.value) return
    stopWatching() // one-shot: the intro plays exactly once

    // Reduced motion: show everything immediately, no movement.
    if (reduced.value) {
      gsap.set('.hero-anim', { opacity: 1, y: 0 })
      return
    }

    // `gsap.context` scopes the selector strings below to this component and
    // gives us one-line cleanup.
    introCtx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })

      tl.from('.hero-eyebrow', { opacity: 0, y: 20, duration: 0.8 })
        // The name rises out of its mask, letter by letter. `stagger` with
        // `from: 'start'` reads left to right, like reading.
        .from(
          '.hero-title .split-char',
          { yPercent: 115, duration: 1.2, stagger: 0.035 },
          '-=0.45',
        )
        // The gradient line is one element, so it rises as a block. A clip-path
        // wipe gives it the same "revealed from behind an edge" feel the split
        // letters have, without needing to split it.
        .from(
          '.hero-line-2',
          { yPercent: 40, opacity: 0, duration: 1.1, ease: 'power4.out' },
          '-=0.85',
        )
        .from('.hero-tagline', { opacity: 0, y: 24, duration: 0.9 }, '-=0.7')
        .from('.hero-cta', { opacity: 0, y: 20, duration: 0.8, stagger: 0.1 }, '-=0.6')
        .from('.hero-stat', { opacity: 0, y: 24, duration: 0.8, stagger: 0.08 }, '-=0.5')
        .from('.hero-hint', { opacity: 0, duration: 0.8 }, '-=0.4')

      /* ------------------------------------------------- scroll parallax --- */
      // As you scroll through the hero, the text drifts up faster than the page
      // and fades. `scrub: 1` ties the animation's playhead to the scrollbar
      // with one second of smoothing, so it feels weighted rather than glued.
      gsap.to('.hero-parallax', {
        y: -120,
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: root.value,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      })
    }, root.value)
  },
  { immediate: true },
)

// Registered during setup, so Vue has a component instance to attach it to.
onUnmounted(() => introCtx?.revert())
</script>

<template>
  <section
    id="hero"
    ref="root"
    class="relative flex min-h-svh items-center overflow-hidden bg-background"
  >
    <!-- -------------------------------------------------- ambient backdrop -->
    <!-- Volumetric Forest Sunbeams -->
    <SunbeamRays />

    <!-- Interactive Forest Spores & Fireflies Canvas -->
    <CanopyParticles />

    <!-- Subtle Halftone Botanical Dots -->
    <div class="bg-retro-dots mask-radial-fade pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />

    <!-- Soft organic vignette for optimal reading contrast -->
    <div
      class="pointer-events-none absolute inset-0"
      aria-hidden="true"
      style="background: radial-gradient(ellipse 90% 70% at 50% 45%, transparent 25%, var(--background) 96%)"
    />

    <!-- ------------------------------------------------------------ text -->
    <div class="hero-parallax relative mx-auto w-full max-w-350 px-5 pt-24 pb-20 sm:px-8 lg:px-12">
      <!-- Eyebrow row with retro tape bar & status -->
      <div class="hero-anim hero-eyebrow mb-8 flex flex-wrap items-center justify-between gap-4">
        <div class="flex flex-wrap items-center gap-3">
          <Badge variant="live" class="border-brand/40 bg-card/90 shadow-xs">
            <span class="relative flex size-1.5">
              <span class="bg-brand-sprout absolute inline-flex size-full animate-ping rounded-full opacity-70" />
              <span class="bg-brand-sprout relative inline-flex size-1.5 rounded-full" />
            </span>
            {{ profile.availability }}
          </Badge>
          <span class="text-muted-foreground font-mono text-[11px] tracking-[0.28em] uppercase">
            {{ profile.location }}
          </span>
        </div>

        <!-- Retro Tape Deck Bar -->
        <RetroTapeBar class="hidden sm:inline-flex" />
      </div>

      <!-- Main Name & Editorial Title -->
      <div class="relative">
        <!-- Floating Rotating Botanical Seal (desktop) -->
        <div
          class="pointer-events-none absolute -top-8 right-0 hidden lg:block xl:right-8"
          aria-hidden="true"
        >
          <div class="animate-spin-slow relative size-28 text-muted-foreground/60 select-none">
            <svg viewBox="0 0 100 100" class="size-full fill-current">
              <path
                id="hero-seal-path"
                d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                fill="none"
              />
              <text font-size="8.8" font-family="'Geist Mono', monospace" letter-spacing="2.2">
                <textPath href="#hero-seal-path" startOffset="0%">
                  SROS SONGHA ✦ FIELD ARCHIVE ✦ EST. 2026 ✦
                </textPath>
              </text>
            </svg>
            <div class="absolute inset-0 flex items-center justify-center font-serif text-lg text-brand-ink">
              ✦
            </div>
          </div>
        </div>

        <h1 class="hero-title font-serif leading-[1.02] tracking-[-0.01em] sm:leading-[0.88] sm:tracking-[-0.03em]">
          <SplitText
            :text="profile.role"
            class="hero-anim block text-[clamp(2.4rem,8vw,7rem)] font-medium text-foreground"
          />
          <em class="hero-line-2 text-gradient block text-[clamp(1.8rem,5.5vw,5.2rem)] font-light italic">
            {{ profile.tagline }}
          </em>
        </h1>
      </div>

      <!-- Supporting line -->
      <p class="hero-anim hero-tagline text-muted-foreground mt-6 max-w-xl text-base leading-relaxed sm:text-lg">
        {{ profile.bio[0] }}
      </p>

      <!-- Calls to action with tactile retro physics -->
      <div class="mt-8 flex flex-wrap items-center gap-4">
        <MagneticWrap :strength="0.3" class="hero-anim hero-cta">
          <Button
            variant="brand"
            size="pill"
            class="retro-btn bg-brand text-background font-medium hover:bg-brand-soft"
            data-cursor-label="Explore"
            @click="scrollTo('#work', { offset: -60 })"
          >
            Explore field work
            <ArrowUpRight class="size-4" />
          </Button>
        </MagneticWrap>

        <MagneticWrap :strength="0.3" class="hero-anim hero-cta">
          <Button
            variant="glass"
            size="pill"
            class="retro-btn border-border/80 bg-card/75 text-foreground backdrop-blur-md"
            as="a"
            :href="`mailto:${profile.email}`"
            data-cursor-label="Say hi"
          >
            Dispatch message
          </Button>
        </MagneticWrap>

        <!-- Mobile only tape deck -->
        <RetroTapeBar class="sm:hidden mt-2" />
      </div>

      <!-- Stats strip styled as an expedition log ledger -->
      <dl class="border-border/60 mt-12 grid max-w-4xl grid-cols-2 gap-y-6 border-t border-dashed pt-6 sm:grid-cols-4">
        <div v-for="stat in profile.stats" :key="stat.label" class="hero-anim hero-stat relative group">
          <dt class="sr-only">{{ stat.label }}</dt>
          <dd>
            <span class="block font-serif text-3xl font-medium tracking-tight text-foreground sm:text-4xl">
              <CountUp :value="stat.value" :suffix="stat.suffix" />
            </span>
            <span class="text-muted-foreground mt-1 flex items-center gap-1.5 font-mono text-[10px] tracking-[0.2em] uppercase">
              <span class="size-1 rounded-full bg-brand-sprout/80" />
              {{ stat.label }}
            </span>
          </dd>
        </div>
      </dl>
    </div>

    <!-- Scroll hint with analog ticker -->
    <button
      class="hero-anim hero-hint text-muted-foreground hover:text-brand absolute right-5 bottom-6 hidden flex-col items-center gap-2 transition-colors sm:right-8 lg:right-12 lg:flex"
      aria-label="Scroll to content"
      @click="scrollTo('#work', { offset: -60 })"
    >
      <span class="font-mono text-[10px] tracking-[0.3em] uppercase">Scroll</span>
      <ArrowDown class="size-3.5 animate-scroll-hint text-brand" />
    </button>
  </section>
</template>
