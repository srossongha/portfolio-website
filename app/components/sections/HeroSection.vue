<script setup lang="ts">
import gsap from 'gsap'
import { ArrowDown, ArrowUpRight, Download, FileText, MapPin, Sparkles, Code2, Clock } from '@lucide/vue'
import { profile, socials } from '~/data/site'
import CyanAurora from '~/components/fx/CyanAurora.vue'
import RetroTapeBar from '~/components/fx/RetroTapeBar.vue'

/**
 * HeroSection.vue — Executive Developer Cockpit
 *
 * Bespoke 2-column bento layout:
 * - Left: High-impact typography, role definition, quick CTAs, and direct social links.
 * - Right: Interactive Developer Terminal Card integrating live Phnom Penh clock,
 *   ITC Cambodia status badge, verified production metrics, and active tech stack.
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

      tl.from('.hero-eyebrow', { opacity: 0, y: 18, duration: 0.75 })
        .from('.hero-title-text', { opacity: 0, y: 25, duration: 0.9 }, '-=0.45')
        .from('.hero-role-text', { opacity: 0, y: 20, duration: 0.85 }, '-=0.6')
        .from('.hero-bio-text', { opacity: 0, y: 16, duration: 0.75 }, '-=0.55')
        .from('.hero-action-btn', { opacity: 0, y: 16, duration: 0.7, stagger: 0.08 }, '-=0.5')
        .from('.hero-social-pill', { opacity: 0, y: 12, duration: 0.6, stagger: 0.05 }, '-=0.45')
        .from('.hero-bento-card', { opacity: 0, scale: 0.96, y: 24, duration: 1.0, ease: 'power3.out' }, '-=0.8')
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

    <!-- Soft radial vignette -->
    <div
      class="pointer-events-none absolute inset-0"
      aria-hidden="true"
      style="background: radial-gradient(ellipse 90% 70% at 50% 50%, transparent 35%, var(--background) 95%)"
    />

    <div class="relative mx-auto w-full max-w-350 px-5 sm:px-8 lg:px-12">
      <!-- Top Eyebrow Row -->
      <div class="hero-anim hero-eyebrow mb-8 flex flex-wrap items-center justify-between gap-4">
        <div class="flex flex-wrap items-center gap-3">
          <Badge variant="live" class="border-cyan-500/30 bg-cyan-950/40 text-cyan-300 shadow-[0_0_12px_rgba(56,189,248,0.2)]">
            <span class="relative flex size-2">
              <span class="absolute inline-flex size-full animate-ping rounded-full bg-cyan-400 opacity-75" />
              <span class="relative inline-flex size-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#38bdf8]" />
            </span>
            {{ profile.availability }}
          </Badge>
          <span class="text-muted-foreground flex items-center gap-1.5 font-mono text-[11px] tracking-[0.2em] uppercase">
            <MapPin class="size-3 text-cyan-400" />
            {{ profile.location }}
          </span>
        </div>

        <!-- Telemetry audio/signal bar -->
        <RetroTapeBar class="hidden sm:inline-flex" />
      </div>

      <!-- Main Split Layout: Cockpit Narrative & Bento Dashboard -->
      <div class="grid gap-12 lg:grid-cols-12 lg:gap-14 lg:items-center">
        <!-- ------------------------------------------------ Left: Narrative -->
        <div class="lg:col-span-7">
          <div class="hero-anim hero-title-text">
            <span class="text-cyan-400 font-mono text-xs tracking-[0.25em] uppercase font-semibold">
              // HELLO WORLD · I AM
            </span>
            <h1 class="font-serif text-[clamp(2.8rem,7vw,5.6rem)] font-medium leading-[0.98] tracking-[-0.02em] text-foreground mt-2">
              {{ profile.name }}
            </h1>
          </div>

          <div class="hero-anim hero-role-text mt-3">
            <h2 class="text-gradient font-serif text-[clamp(1.8rem,4.5vw,3.6rem)] font-light italic leading-tight">
              {{ profile.role }}
            </h2>
          </div>

          <p class="hero-anim hero-bio-text text-muted-foreground mt-6 max-w-xl text-base leading-relaxed sm:text-lg">
            {{ profile.bio[0] }}
          </p>

          <!-- Primary Actions -->
          <div class="mt-8 flex flex-wrap items-center gap-4">
            <MagneticWrap :strength="0.3" class="hero-anim hero-action-btn">
              <Button
                size="pill"
                class="group relative inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 px-7 py-3 text-sm font-semibold text-slate-950 shadow-[0_0_22px_rgba(56,189,248,0.35)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_32px_rgba(56,189,248,0.55)]"
                data-cursor-label="Explore"
                @click="scrollTo('#work', { offset: 0 })"
              >
                <span>Explore selected work</span>
                <ArrowUpRight class="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Button>
            </MagneticWrap>

            <MagneticWrap :strength="0.3" class="hero-anim hero-action-btn">
              <Button
                size="pill"
                class="rounded-full border border-border/80 bg-card/60 px-6 py-3 text-sm font-medium text-foreground backdrop-blur-md transition-all duration-300 hover:border-cyan-400/50 hover:bg-card/85 hover:text-cyan-300 hover:shadow-[0_0_18px_rgba(56,189,248,0.18)]"
                as="a"
                :href="profile.cvUrl"
                download="SROS Songha.pdf"
                target="_blank"
                data-cursor-label="Resume"
              >
                <Download class="size-4 text-cyan-400" />
                <span>Download CV</span>
              </Button>
            </MagneticWrap>

            <MagneticWrap :strength="0.3" class="hero-anim hero-action-btn">
              <Button
                variant="ghost"
                size="pill"
                class="rounded-full px-5 py-3 text-sm font-mono text-muted-foreground transition-colors hover:text-cyan-300 hover:bg-cyan-950/30"
                as="a"
                :href="`mailto:${profile.email}`"
                data-cursor-label="Contact"
              >
                <span>Dispatch message →</span>
              </Button>
            </MagneticWrap>
          </div>

          <!-- Social Quick Launch Strip -->
          <div class="mt-8 flex flex-wrap items-center gap-2">
            <span class="text-muted-foreground mr-1 font-mono text-[10px] tracking-widest uppercase">
              Signals:
            </span>
            <a
              v-for="s in socials.slice(0, 5)"
              :key="s.label"
              :href="s.href"
              target="_blank"
              rel="noopener noreferrer"
              class="hero-anim hero-social-pill group rounded-full border border-border/70 bg-card/50 px-3 py-1 font-mono text-xs text-muted-foreground backdrop-blur-md transition-all hover:border-cyan-400/50 hover:text-cyan-300 hover:shadow-[0_0_12px_rgba(56,189,248,0.15)]"
              :data-cursor-label="s.label"
            >
              <span class="text-foreground group-hover:text-cyan-400 font-medium">{{ s.label }}</span>
            </a>
          </div>
        </div>

        <!-- ------------------------------------------------ Right: Interactive Terminal Card -->
        <div class="lg:col-span-5">
          <div class="hero-anim hero-bento-card relative overflow-hidden rounded-3xl border border-border/80 bg-card/75 p-6 shadow-[0_12px_40px_rgba(0,0,0,0.35)] backdrop-blur-xl transition-all duration-500 hover:border-cyan-400/40 hover:shadow-[0_0_35px_rgba(56,189,248,0.15)] sm:p-7">
            <!-- Top Card Header: Cyber Terminal Beacon -->
            <div class="flex items-center justify-between border-b border-border/60 pb-4">
              <div class="flex items-center gap-2">
                <span class="size-2.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#38bdf8]" />
                <span class="font-mono text-[11px] font-semibold tracking-wider text-cyan-300 uppercase">
                  OPERATING SYSTEM // KH_ITC
                </span>
              </div>
              <div class="flex items-center gap-1.5 font-mono text-[11px] text-muted-foreground">
                <Clock class="size-3 text-cyan-400" />
                <ClientOnly>
                  <span>{{ localTime }} UTC+7</span>
                  <template #fallback><span>--:-- UTC+7</span></template>
                </ClientOnly>
              </div>
            </div>

            <!-- Identity Snippet -->
            <div class="mt-5 flex items-center gap-4">
              <div class="relative size-16 shrink-0 overflow-hidden rounded-2xl border border-cyan-400/40 p-0.5 shadow-[0_0_16px_rgba(56,189,248,0.25)]">
                <img
                  src="/images/profile.jpeg"
                  :alt="profile.name"
                  class="size-full rounded-[14px] object-cover"
                />
              </div>
              <div>
                <div class="flex items-center gap-2">
                  <span class="font-serif text-lg font-medium text-foreground">{{ profile.name }}</span>
                  <Badge variant="tech" class="border-cyan-400/30 bg-cyan-950/40 text-[10px] text-cyan-300">
                    CS SOPHOMORE
                  </Badge>
                </div>
                <p class="text-muted-foreground mt-0.5 font-mono text-xs">
                  Institute of Technology of Cambodia
                </p>
                <p class="text-cyan-400/90 font-mono text-[11px] mt-0.5">
                  T.O Group & EKYC Solution Intern
                </p>
              </div>
            </div>

            <!-- The Integrated Stats Bento Matrix (Clean & Modern!) -->
            <div class="mt-6 grid grid-cols-2 gap-3">
              <div
                v-for="stat in profile.stats"
                :key="stat.label"
                class="rounded-xl border border-border/60 bg-background/50 p-3.5 backdrop-blur-md transition-all hover:border-cyan-400/30"
              >
                <div class="font-serif text-2xl font-medium tracking-tight text-cyan-400 sm:text-3xl">
                  <CountUp :value="stat.value" :suffix="stat.suffix" />
                </div>
                <div class="text-muted-foreground mt-1 flex items-center gap-1.5 font-mono text-[10px] tracking-wider uppercase">
                  <span class="size-1 rounded-full bg-cyan-400/80 shadow-[0_0_4px_#38bdf8]" />
                  {{ stat.label }}
                </div>
              </div>
            </div>

            <!-- Core Stack Pills Inside Card -->
            <div class="mt-6 border-t border-border/60 pt-4">
              <p class="text-muted-foreground font-mono text-[10px] tracking-widest uppercase">
                Primary Tooling & Frameworks:
              </p>
              <div class="mt-2.5 flex flex-wrap gap-1.5">
                <Badge
                  v-for="tech in ['Vue 3', 'Nuxt 4', 'TypeScript', 'Next.js', 'Tailwind v4', 'Cloudflare']"
                  :key="tech"
                  variant="tech"
                  class="border-border/70 bg-muted/30 font-mono text-[10px] text-foreground/85"
                >
                  {{ tech }}
                </Badge>
              </div>
            </div>

            <!-- Flagship Shipped Project Indicator -->
            <div class="mt-5 rounded-xl border border-cyan-500/20 bg-gradient-to-r from-cyan-950/30 via-slate-900/40 to-transparent p-3">
              <div class="flex items-center justify-between text-xs">
                <span class="flex items-center gap-1.5 font-mono text-[11px] text-cyan-300">
                  <Sparkles class="size-3 text-cyan-400" />
                  Flagship: Roomie (ស្រុកខ្ញុំ)
                </span>
                <a
                  href="https://sroknh.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-mono text-[10px] font-semibold"
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
      <span class="font-mono text-[10px] tracking-[0.3em] uppercase">Scroll</span>
      <ArrowDown class="size-3.5 animate-scroll-hint text-cyan-400" />
    </button>
  </section>
</template>
