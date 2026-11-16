<script setup lang="ts">
import gsap from 'gsap'
import {
  ArrowDown,
  ArrowUpRight,
  Download,
  MapPin,
  Clock,
  Terminal,
  Activity,
  Box,
  Cpu,
} from '@lucide/vue'
import { profile, socials } from '~/data/site'
import CyanAurora from '~/components/fx/CyanAurora.vue'
import RetroTapeBar from '~/components/fx/RetroTapeBar.vue'
import PhosphorWave from '~/components/fx/PhosphorWave.vue'
import RetroWireframe3D from '~/components/fx/RetroWireframe3D.vue'
import TextScramble from '~/components/fx/TextScramble.vue'

/**
 * HeroSection.vue — 1970s High-End Technical Workstation
 *
 * Bespoke non-template architecture:
 * - Wide typographic authority & crisp terminal prompts.
 * - An authentic full-width Tektronix/PET-2001 Hardware Instrument Console.
 * - Tabbed physical viewport (Realtime Oscilloscope / 3D Vector Core / System Telemetry).
 * - Segmented register rule bar without generic floating bento cards.
 */

const root = ref<HTMLElement | null>(null)
const { isReady } = useAppReady()
const reduced = useReducedMotion()
const { scrollTo } = useSmoothScroll()
const terminal = useTerminal()

const activeDeck = ref<'wave' | '3d' | 'telemetry'>('wave')
let introCtx: gsap.Context | undefined

// Live Phnom Penh time
const localTime = ref('')
onMounted(() => {
  const updateTime = () => {
    localTime.value = new Date().toLocaleTimeString('en-US', {
      timeZone: 'Asia/Phnom_Penh',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    })
  }
  updateTime()
  const timer = setInterval(updateTime, 1000 * 30)
  onUnmounted(() => clearInterval(timer))
})

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

      tl.from('.hero-eyebrow', { opacity: 0, y: 16, duration: 0.7 })
        .from('.hero-title-text', { opacity: 0, y: 22, duration: 0.85 }, '-=0.45')
        .from('.hero-role-text', { opacity: 0, y: 18, duration: 0.8 }, '-=0.6')
        .from('.hero-bio-text', { opacity: 0, y: 15, duration: 0.7 }, '-=0.55')
        .from('.hero-action-btn', { opacity: 0, y: 15, duration: 0.65, stagger: 0.08 }, '-=0.5')
        .from('.hero-social-pill', { opacity: 0, y: 10, duration: 0.55, stagger: 0.05 }, '-=0.45')
        .from('.hero-deck-chassis', { opacity: 0, y: 24, duration: 0.9, ease: 'power3.out' }, '-=0.7')
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
    class="relative min-h-svh flex flex-col justify-center overflow-hidden bg-background pt-24 pb-16 lg:pt-28 lg:pb-24"
  >
    <!-- Luminous Cyan Ambient Aurora -->
    <CyanAurora />

    <!-- Ambient Scanlines & Architectural Base -->
    <div class="bg-scanlines pointer-events-none absolute inset-0 opacity-10" aria-hidden="true" />

    <div class="relative mx-auto w-full max-w-350 px-5 sm:px-8 lg:px-12">
      <!-- 1970s Boot Sequence & Status Bar -->
      <div class="hero-anim hero-eyebrow mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-border/40 pb-4">
        <div class="flex flex-wrap items-center gap-3">
          <Badge variant="live" class="border-cyan-500/40 bg-cyan-950/50 text-cyan-300 shadow-[0_0_12px_rgba(56,189,248,0.25)] font-pixel text-[10px] tracking-wider">
            <span class="relative flex size-2">
              <span class="absolute inline-flex size-full animate-ping rounded-full bg-cyan-400 opacity-75" />
              <span class="relative inline-flex size-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#38bdf8]" />
            </span>
            [SYS_READY: 64K_RAM]
          </Badge>

          <span class="text-muted-foreground flex items-center gap-1.5 font-mono text-[11px] tracking-[0.2em] uppercase">
            <MapPin class="size-3 text-cyan-400" />
            {{ profile.location }}
          </span>

          <span class="hidden sm:inline-block font-pixel text-[10px] text-cyan-400/80 tracking-widest">
            // MOS_6502_KERNEL
          </span>
        </div>

        <!-- Telemetry audio/signal bar -->
        <RetroTapeBar class="hidden sm:inline-flex" />
      </div>

      <!-- Main Typographic Authority Section -->
      <div class="max-w-4xl">
        <div class="hero-anim hero-title-text">
          <!-- Terminal CLI Prompt with Direct Click Trigger -->
          <button
            type="button"
            class="flex items-center gap-2 font-pixel text-xs text-cyan-400 font-semibold tracking-wider hover:text-cyan-300 transition-colors cursor-pointer group text-left mb-2"
            @click="terminal.open()"
          >
            <span class="group-hover:underline">&gt; BOOT: SROS_SONGHA.EXE</span>
            <span class="crt-cursor inline-block text-cyan-300 font-bold">█</span>
            <span class="rounded bg-cyan-950/80 border border-cyan-500/30 px-1.5 py-0.5 text-[9px] text-cyan-300 ml-1 group-hover:border-cyan-400">
              [LAUNCH_CLI_SHELL]
            </span>
          </button>

          <h1 class="font-serif text-[clamp(2.8rem,7.5vw,5.8rem)] font-medium leading-[0.96] tracking-[-0.03em] text-foreground">
            {{ profile.name }}
          </h1>
        </div>

        <div class="hero-anim hero-role-text mt-3 flex flex-wrap items-center gap-3">
          <h2 class="font-serif text-[clamp(1.5rem,4vw,3.2rem)] font-light leading-tight tracking-tight text-cyan-400">
            {{ profile.role }}
          </h2>
          <span class="rounded-full border border-cyan-500/30 bg-cyan-950/60 px-3 py-1 font-pixel text-[9px] tracking-wider text-cyan-300 uppercase shadow-[0_0_10px_rgba(56,189,248,0.15)]">
            [ CURRENT // FRONT-END INTERN ]
          </span>
        </div>

        <p class="hero-anim hero-bio-text text-muted-foreground mt-5 max-w-2xl text-base leading-relaxed sm:text-lg">
          {{ profile.bio[0] }}
        </p>

        <!-- Primary Action Array -->
        <div class="mt-8 flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 sm:gap-4">
          <MagneticWrap :strength="0.3" class="hero-anim hero-action-btn w-full sm:w-auto">
            <Button
              size="pill"
              class="w-full sm:w-auto group relative inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-400 hover:bg-cyan-300 px-7 py-3.5 sm:py-3 text-xs font-semibold text-slate-950 shadow-[0_0_18px_rgba(56,189,248,0.25)] transition-all duration-300 hover:scale-[1.02] font-pixel uppercase tracking-wider"
              data-cursor-label="Explore"
              @click="scrollTo('#work', { offset: 0 })"
            >
              <span>[ EXECUTE: WORK ]</span>
              <ArrowUpRight class="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Button>
          </MagneticWrap>

          <MagneticWrap :strength="0.3" class="hero-anim hero-action-btn w-full sm:w-auto">
            <Button
              size="pill"
              class="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-cyan-400/50 bg-cyan-950/40 px-6 py-3.5 sm:py-3 text-xs font-semibold text-cyan-300 backdrop-blur-md transition-all duration-300 hover:border-cyan-300 hover:bg-cyan-900/60 hover:text-white hover:shadow-[0_0_24px_rgba(56,189,248,0.4)] font-pixel uppercase tracking-wider"
              data-cursor-label="CLI Shell"
              @click="terminal.open()"
            >
              <Terminal class="size-3.5 text-cyan-400" />
              <span>&gt;_ PET-2001 CLI</span>
            </Button>
          </MagneticWrap>

          <MagneticWrap :strength="0.3" class="hero-anim hero-action-btn w-full sm:w-auto">
            <Button
              size="pill"
              class="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-border/80 bg-card/70 px-6 py-3.5 sm:py-3 text-xs font-medium text-foreground backdrop-blur-md transition-all duration-300 hover:border-cyan-400 hover:bg-card/90 hover:text-cyan-300 hover:shadow-[0_0_18px_rgba(56,189,248,0.25)] font-pixel uppercase tracking-wider"
              as="a"
              :href="profile.cvUrl"
              download="SROS Songha.pdf"
              target="_blank"
              data-cursor-label="Resume"
            >
              <Download class="size-3.5 text-cyan-400" />
              <span>LOAD &quot;CV.PDF&quot;,8,1</span>
            </Button>
          </MagneticWrap>

          <MagneticWrap :strength="0.3" class="hero-anim hero-action-btn w-full sm:w-auto">
            <Button
              variant="ghost"
              size="pill"
              class="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3.5 sm:py-3 text-xs font-mono text-muted-foreground transition-colors hover:text-cyan-300 hover:bg-cyan-950/30"
              as="a"
              :href="`mailto:${profile.email}`"
              data-cursor-label="Contact"
            >
              <span>&gt; ping songha_</span>
            </Button>
          </MagneticWrap>
        </div>

        <!-- Social Port Links -->
        <div class="mt-6 flex flex-wrap items-center gap-2">
          <span class="text-muted-foreground mr-1 font-pixel text-[10px] tracking-widest uppercase">
            PORT:
          </span>
          <a
            v-for="s in socials.slice(0, 5)"
            :key="s.label"
            :href="s.href"
            target="_blank"
            rel="noopener noreferrer"
            class="hero-anim hero-social-pill group rounded-lg border border-border/60 bg-card/40 px-3 py-1 font-mono text-xs text-muted-foreground backdrop-blur-md transition-all hover:border-cyan-400/50 hover:text-cyan-300"
            :data-cursor-label="s.label"
          >
            <span class="text-foreground group-hover:text-cyan-400 font-medium">{{ s.label }}</span>
          </a>
        </div>
      </div>

      <!-- ============================================================== -->
      <!-- THE 1970s VECTOR WORKSTATION CHASSIS (INTEGRATED HARDWARE DECK) -->
      <!-- No floating bento cards — a cohesive industrial console unit!   -->
      <!-- ============================================================== -->
      <div class="hero-anim hero-deck-chassis mt-14 overflow-hidden rounded-2xl border border-cyan-500/30 bg-slate-950/90 shadow-[0_16px_50px_rgba(0,0,0,0.5)] backdrop-blur-2xl">
        <!-- Console Bezel Header & Mode Selectors -->
        <div class="flex flex-wrap items-center justify-between border-b border-cyan-500/20 bg-cyan-950/20 px-4 py-2.5 sm:px-6">
          <div class="flex items-center gap-2">
            <span class="size-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#38bdf8]" />
            <span class="font-pixel text-[10px] tracking-wider text-cyan-300 uppercase font-semibold">
              INSTRUMENT DECK // COMMODORE PET-2001 &amp; TEKTRONIX 4010
            </span>
          </div>

          <!-- Mode Selector Tabs -->
          <div class="flex items-center gap-1.5 mt-2 sm:mt-0">
            <button
              type="button"
              class="inline-flex items-center gap-1.5 rounded px-2.5 py-1 font-pixel text-[9px] tracking-wider transition-all"
              :class="activeDeck === 'wave'
                ? 'bg-cyan-500/25 border border-cyan-400/60 text-cyan-200 shadow-[0_0_10px_rgba(56,189,248,0.3)]'
                : 'text-muted-foreground/70 hover:text-cyan-300 border border-transparent'"
              @click="activeDeck = 'wave'"
            >
              <Activity class="size-3" />
              <span>[ 01: OSCILLOSCOPE ]</span>
            </button>

            <button
              type="button"
              class="inline-flex items-center gap-1.5 rounded px-2.5 py-1 font-pixel text-[9px] tracking-wider transition-all"
              :class="activeDeck === '3d'
                ? 'bg-cyan-500/25 border border-cyan-400/60 text-cyan-200 shadow-[0_0_10px_rgba(56,189,248,0.3)]'
                : 'text-muted-foreground/70 hover:text-cyan-300 border border-transparent'"
              @click="activeDeck = '3d'"
            >
              <Box class="size-3" />
              <span>[ 02: 3D_VECTOR_CORE ]</span>
            </button>

            <button
              type="button"
              class="inline-flex items-center gap-1.5 rounded px-2.5 py-1 font-pixel text-[9px] tracking-wider transition-all"
              :class="activeDeck === 'telemetry'
                ? 'bg-cyan-500/25 border border-cyan-400/60 text-cyan-200 shadow-[0_0_10px_rgba(56,189,248,0.3)]'
                : 'text-muted-foreground/70 hover:text-cyan-300 border border-transparent'"
              @click="activeDeck = 'telemetry'"
            >
              <Cpu class="size-3" />
              <span>[ 03: TELEMETRY ]</span>
            </button>
          </div>
        </div>

        <!-- Interactive Screen Viewport -->
        <div class="relative min-h-[220px] sm:min-h-[260px] bg-black/60 p-4 sm:p-6 flex flex-col justify-center">
          <div class="bg-scanlines pointer-events-none absolute inset-0 opacity-20" />

          <!-- VIEWPORT 01: REAL-TIME OSCILLOSCOPE HARMONICS -->
          <div v-show="activeDeck === 'wave'" class="relative w-full">
            <div class="flex items-center justify-between font-pixel text-[9px] text-cyan-400/80 mb-2">
              <span class="flex items-center gap-1.5">
                <span class="size-1.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_6px_#38bdf8]" />
                TEKTRONIX BEAM VECTOR HARMONICS // DUAL PHOSPHOR SINUSOIDS
              </span>
              <span class="text-cyan-300 font-mono text-[10px]">HOVER / MOVE POINTER TO MODULATE FREQUENCY</span>
            </div>
            <ClientOnly>
              <PhosphorWave class="h-36 sm:h-44 w-full rounded-lg" />
              <template #fallback>
                <div class="h-36 sm:h-44 w-full bg-cyan-950/20 rounded-lg flex items-center justify-center font-pixel text-[10px] text-cyan-400/40">
                  CALIBRATING ELECTRON BEAM...
                </div>
              </template>
            </ClientOnly>
          </div>

          <!-- VIEWPORT 02: 3D VECTOR WIREFRAME CORE -->
          <div v-show="activeDeck === '3d'" class="relative w-full">
            <div class="flex items-center justify-between font-pixel text-[9px] text-cyan-400/80 mb-2">
              <span class="flex items-center gap-1.5">
                <span class="size-1.5 rounded-full bg-cyan-400 animate-ping shadow-[0_0_6px_#38bdf8]" />
                3D VECTOR WIREFRAME ICOSAHEDRON // ORBITAL GIMBAL
              </span>
              <span class="text-cyan-300 font-mono text-[10px]">DRAG / MOVE CURSOR TO ROTATE VIEWPORT</span>
            </div>
            <ClientOnly>
              <RetroWireframe3D class="h-44 sm:h-52 w-full" />
              <template #fallback>
                <div class="flex h-44 sm:h-52 w-full items-center justify-center font-pixel text-xs text-cyan-400/60">
                  INITIALIZING THREE.JS VECTOR PIPELINE...
                </div>
              </template>
            </ClientOnly>
          </div>

          <!-- VIEWPORT 03: HARDWARE TELEMETRY & SYSTEM REGS -->
          <div v-show="activeDeck === 'telemetry'" class="relative w-full py-2">
            <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <div class="border-l-2 border-cyan-400/60 pl-3">
                <div class="font-pixel text-[9px] text-cyan-400 uppercase tracking-wider">ENGINEERING_INSTITUTION</div>
                <div class="font-serif text-sm text-foreground mt-0.5">Institute of Technology of Cambodia</div>
                <div class="font-mono text-xs text-muted-foreground mt-0.5">Computer Science Undergraduate</div>
              </div>

              <div class="border-l-2 border-cyan-400/60 pl-3">
                <div class="font-pixel text-[9px] text-cyan-400 uppercase tracking-wider">ENTERPRISE_PRACTICE</div>
                <div class="font-serif text-sm text-foreground mt-0.5">T.O Group &amp; EKYC Solution</div>
                <div class="font-mono text-xs text-muted-foreground mt-0.5">Front-end Engineering Internships</div>
              </div>

              <div class="border-l-2 border-cyan-400/60 pl-3">
                <div class="font-pixel text-[9px] text-cyan-400 uppercase tracking-wider">FLAGSHIP_DEPLOYMENT</div>
                <div class="font-serif text-sm text-foreground mt-0.5">Roomie (ស្រុកខ្ញុំ) · sroknh.com</div>
                <div class="font-mono text-xs text-muted-foreground mt-0.5">25 Provinces Mapped · Production</div>
              </div>
            </div>

            <!-- Loaded Modules Strip -->
            <div class="mt-4 pt-3 border-t border-cyan-500/20 flex flex-wrap items-center gap-2">
              <span class="font-pixel text-[9px] text-cyan-400 uppercase tracking-widest mr-2">ROM_MODULES:</span>
              <span
                v-for="mod in ['Vue 3', 'Nuxt 4', 'React 19', 'Next.js 16', 'TypeScript', 'Tailwind v4', 'Cloudflare Workers', 'Vitest']"
                :key="mod"
                class="rounded border border-cyan-400/20 bg-cyan-950/30 px-2 py-0.5 font-mono text-[10px] text-cyan-200"
              >
                [{{ mod }}]
              </span>
            </div>
          </div>
        </div>

        <!-- Integrated Hardware Register Strip (Segmented Divide-X) -->
        <div class="grid grid-cols-2 divide-x divide-y sm:divide-y-0 sm:grid-cols-4 divide-cyan-500/20 border-t border-cyan-500/20 bg-slate-950/80">
          <div
            v-for="stat in profile.stats"
            :key="stat.label"
            class="p-3.5 sm:p-4 text-center sm:text-left transition-colors hover:bg-cyan-950/20"
          >
            <div class="font-serif text-xl sm:text-2xl font-semibold tracking-tight text-cyan-400 crt-glow">
              <CountUp :value="stat.value" :suffix="stat.suffix" />
            </div>
            <div class="text-muted-foreground mt-0.5 font-mono text-[10px] tracking-wider uppercase">
              {{ stat.label }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Scroll hint -->
    <button
      class="hero-anim text-muted-foreground hover:text-cyan-400 absolute right-5 bottom-4 hidden flex-col items-center gap-2 transition-colors sm:right-8 lg:right-12 lg:flex"
      aria-label="Scroll to content"
      @click="scrollTo('#about', { offset: 0 })"
    >
      <span class="font-pixel text-[9px] tracking-[0.25em] uppercase">SCROLL</span>
      <ArrowDown class="size-3.5 animate-scroll-hint text-cyan-400" />
    </button>
  </section>
</template>
