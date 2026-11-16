<script setup lang="ts">
import gsap from 'gsap'
import { ArrowDown, ArrowUpRight, Download, FileText, MapPin, Sparkles, Code2, Clock, Terminal } from '@lucide/vue'
import { profile, socials } from '~/data/site'
import CyanAurora from '~/components/fx/CyanAurora.vue'
import RetroTapeBar from '~/components/fx/RetroTapeBar.vue'

/**
 * HeroSection.vue — 1970s Pixel Computer & Terminal Cockpit
 *
 * Infused with authentic 1970s personal computer (Apple I, Commodore PET, VT100)
 * phosphor cyan terminal aesthetics:
 * - Boot sequence prompts, blinking block cursor (█), 64K RAM register readouts.
 * - Pixelated typography (Silkscreen / VT323) paired with crisp modern typography.
 * - Hardware-accelerated CRT scanline overlays and cyan phosphor glow.
 */

const root = ref<HTMLElement | null>(null)
const { isReady } = useAppReady()
const reduced = useReducedMotion()
const { scrollTo } = useSmoothScroll()

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
        .from('.hero-bento-card', { opacity: 0, scale: 0.97, y: 20, duration: 0.9, ease: 'power3.out' }, '-=0.75')
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
    class="relative min-h-svh flex items-center overflow-hidden bg-background pt-24 pb-16 lg:pt-28 lg:pb-20"
  >
    <!-- Luminous Cyan & Royal Indigo Ambient Aurora -->
    <CyanAurora />

    <!-- CRT Screen Scanline Texture Overlay -->
    <div class="bg-scanlines pointer-events-none absolute inset-0 opacity-25" aria-hidden="true" />

    <!-- Soft radial vignette -->
    <div
      class="pointer-events-none absolute inset-0"
      aria-hidden="true"
      style="background: radial-gradient(ellipse 90% 70% at 50% 50%, transparent 35%, var(--background) 95%)"
    />

    <div class="relative mx-auto w-full max-w-350 px-5 sm:px-8 lg:px-12">
      <!-- 1970s Boot Sequence & Status Bar -->
      <div class="hero-anim hero-eyebrow mb-8 flex flex-wrap items-center justify-between gap-4">
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
            // VT100_CONSOLE
          </span>
        </div>

        <!-- Telemetry audio/signal bar -->
        <RetroTapeBar class="hidden sm:inline-flex" />
      </div>

      <!-- Main Split Layout: Cockpit Narrative & 1970s Pixel Computer Terminal -->
      <div class="grid gap-12 lg:grid-cols-12 lg:gap-14 lg:items-center">
        <!-- ------------------------------------------------ Left: Narrative -->
        <div class="lg:col-span-7">
          <div class="hero-anim hero-title-text">
            <!-- Terminal CLI Prompt -->
            <div class="flex items-center gap-2 font-pixel text-xs text-cyan-400 font-semibold tracking-wider">
              <span>&gt; BOOT: SROS_SONGHA.EXE</span>
              <span class="crt-cursor inline-block text-cyan-300 font-bold">█</span>
            </div>

            <h1 class="font-serif text-[clamp(2.4rem,7vw,5.6rem)] font-medium leading-[0.98] tracking-[-0.02em] text-foreground mt-2">
              {{ profile.name }}
            </h1>
          </div>

          <div class="hero-anim hero-role-text mt-3">
            <h2 class="text-gradient font-serif text-[clamp(1.6rem,4.5vw,3.6rem)] font-light italic leading-tight">
              {{ profile.role }}
            </h2>
          </div>

          <p class="hero-anim hero-bio-text text-muted-foreground mt-6 max-w-xl text-base leading-relaxed sm:text-lg">
            {{ profile.bio[0] }}
          </p>

          <!-- Primary Actions with 1970s Pixel Computer Styling (Responsive Stack for Mobile) -->
          <div class="mt-8 flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 sm:gap-4">
            <MagneticWrap :strength="0.3" class="hero-anim hero-action-btn w-full sm:w-auto">
              <Button
                size="pill"
                class="w-full sm:w-auto group relative inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 px-7 py-3.5 sm:py-3 text-xs font-semibold text-slate-950 shadow-[0_0_22px_rgba(56,189,248,0.35)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_32px_rgba(56,189,248,0.55)] font-pixel uppercase tracking-wider"
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
                class="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-cyan-400/40 bg-card/70 px-6 py-3.5 sm:py-3 text-xs font-medium text-foreground backdrop-blur-md transition-all duration-300 hover:border-cyan-400 hover:bg-card/90 hover:text-cyan-300 hover:shadow-[0_0_18px_rgba(56,189,248,0.25)] font-pixel uppercase tracking-wider"
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

          <!-- Social Quick Launch Strip -->
          <div class="mt-8 flex flex-wrap items-center gap-2">
            <span class="text-muted-foreground mr-1 font-pixel text-[10px] tracking-widest uppercase">
              PORT:
            </span>
            <a
              v-for="s in socials.slice(0, 5)"
              :key="s.label"
              :href="s.href"
              target="_blank"
              rel="noopener noreferrer"
              class="hero-anim hero-social-pill group rounded-lg border border-border/70 bg-card/50 px-3 py-1 font-mono text-xs text-muted-foreground backdrop-blur-md transition-all hover:border-cyan-400/50 hover:text-cyan-300 hover:shadow-[0_0_12px_rgba(56,189,248,0.18)]"
              :data-cursor-label="s.label"
            >
              <span class="text-foreground group-hover:text-cyan-400 font-medium">{{ s.label }}</span>
            </a>
          </div>
        </div>

        <!-- ------------------------------------------------ Right: 1970s CRT Terminal Bento -->
        <div class="lg:col-span-5">
          <div class="hero-anim hero-bento-card relative overflow-hidden rounded-3xl border border-cyan-400/30 bg-slate-950/85 p-4.5 sm:p-7 shadow-[0_12px_45px_rgba(0,0,0,0.45)] backdrop-blur-xl transition-all duration-500 hover:border-cyan-400/50 hover:shadow-[0_0_40px_rgba(56,189,248,0.2)]">
            <!-- Phosphor Scanline Texture inside CRT monitor -->
            <div class="bg-scanlines pointer-events-none absolute inset-0 opacity-25" />

            <!-- Top Terminal Frame Header -->
            <div class="relative flex items-center justify-between border-b border-cyan-500/20 pb-3">
              <div class="flex items-center gap-1.5 sm:gap-2">
                <span class="size-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#38bdf8]" />
                <span class="font-pixel text-[9px] sm:text-[10px] font-semibold tracking-wider text-cyan-300">
                  ╔═ PET-2001 // MOS_6502 ═╗
                </span>
              </div>
              <div class="flex items-center gap-1.5 font-mono text-[10px] sm:text-[11px] text-muted-foreground">
                <Clock class="size-3 text-cyan-400 shrink-0" />
                <ClientOnly>
                  <span class="font-pixel text-[9px] sm:text-[10px] text-cyan-300">{{ localTime }} UTC+7</span>
                  <template #fallback><span class="font-pixel text-[9px] sm:text-[10px]">--:-- UTC+7</span></template>
                </ClientOnly>
              </div>
            </div>

            <!-- 1970s Register & Status Line -->
            <div class="relative mt-3 flex items-center justify-between font-mono text-[9px] sm:text-[10px] text-cyan-400/70 border-b border-cyan-500/10 pb-2">
              <span>PC: $0800  A: $00  X: $19</span>
              <span class="font-pixel text-[8px] sm:text-[9px] text-cyan-300">64K_RAM: OK</span>
            </div>

            <!-- Identity Snippet -->
            <div class="relative mt-4 flex items-center gap-3.5 sm:gap-4">
              <div class="relative size-14 sm:size-16 shrink-0 overflow-hidden rounded-xl border-2 border-cyan-400/50 p-0.5 shadow-[0_0_18px_rgba(56,189,248,0.3)]">
                <img
                  src="/images/profile.jpeg"
                  :alt="profile.name"
                  class="size-full rounded-[10px] object-cover"
                />
                <div class="bg-scanlines pointer-events-none absolute inset-0 opacity-20" />
              </div>
              <div>
                <div class="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                  <span class="font-serif text-base sm:text-lg font-medium text-white">{{ profile.name }}</span>
                  <span class="rounded-xs border border-cyan-400/40 bg-cyan-950/60 px-1.5 py-0.5 font-pixel text-[8px] sm:text-[9px] text-cyan-300">
                    CS_SOPHOMORE
                  </span>
                </div>
                <p class="text-white/70 mt-0.5 font-mono text-[11px] sm:text-xs">
                  Institute of Technology of Cambodia
                </p>
                <p class="text-cyan-400 font-mono text-[10px] sm:text-[11px] mt-0.5">
                  T.O Group &amp; EKYC Solution Intern
                </p>
              </div>
            </div>

            <!-- The Stats Pixel Matrix -->
            <div class="relative mt-5 grid grid-cols-2 gap-2.5 sm:gap-3">
              <div
                v-for="stat in profile.stats"
                :key="stat.label"
                class="rounded-xl border border-cyan-500/20 bg-black/50 p-2.5 sm:p-3 backdrop-blur-md transition-all hover:border-cyan-400/40 shadow-inner"
              >
                <div class="font-pixel text-lg font-medium tracking-tight text-cyan-400 sm:text-2xl crt-glow">
                  <CountUp :value="stat.value" :suffix="stat.suffix" />
                </div>
                <div class="text-muted-foreground mt-1 flex items-center gap-1.5 font-mono text-[9px] sm:text-[10px] tracking-wider uppercase">
                  <span class="size-1 rounded-full bg-cyan-400 shadow-[0_0_4px_#38bdf8]" />
                  {{ stat.label }}
                </div>
              </div>
            </div>

            <!-- Core Stack Pills with Pixel Styling -->
            <div class="relative mt-5 border-t border-cyan-500/20 pt-3">
              <p class="text-cyan-400/70 font-pixel text-[9px] tracking-widest uppercase">
                LOADED_MODULES:
              </p>
              <div class="mt-2 flex flex-wrap gap-1.5">
                <span
                  v-for="tech in ['Vue 3', 'Nuxt 4', 'TypeScript', 'Next.js', 'Tailwind v4', 'Cloudflare']"
                  :key="tech"
                  class="rounded-md border border-cyan-400/20 bg-cyan-950/30 px-2 py-0.5 font-mono text-[10px] text-cyan-200"
                >
                  [{{ tech }}]
                </span>
              </div>
            </div>

            <!-- Flagship Project Status Window -->
            <div class="relative mt-4 rounded-xl border border-cyan-400/30 bg-cyan-950/40 p-3">
              <div class="flex items-center justify-between text-xs">
                <span class="flex items-center gap-1.5 font-pixel text-[10px] text-cyan-300">
                  <Terminal class="size-3 text-cyan-400" />
                  FLAGSHIP: ROOMIE (ស្រុកខ្ញុំ)
                </span>
                <a
                  href="https://sroknh.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-pixel text-[9px] font-semibold"
                >
                  <span>sroknh.com</span>
                  <ArrowUpRight class="size-3" />
                </a>
              </div>
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
