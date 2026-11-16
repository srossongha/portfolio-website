<script setup lang="ts">
import gsap from 'gsap'
import { Check, Download, Eye, FileText } from '@lucide/vue'
import { toast } from 'vue-sonner'
import { profile, socials } from '~/data/site'

/**
 * About.
 *
 * The headline effect here is scroll-driven text illumination: the paragraph
 * starts dim and each word brightens as it passes the middle of the screen.
 *
 * HOW IT WORKS
 * `scrub: true` binds the animation's playhead directly to the scrollbar
 * instead of playing it on a timer. Combined with a `stagger`, the words light
 * up in sequence — the visitor is literally scrubbing through the animation,
 * so reading and scrolling become the same gesture.
 */

const root = ref<HTMLElement | null>(null)
const reduced = useReducedMotion()

const isDownloaded = ref(false)
let downloadTimer: ReturnType<typeof setTimeout> | undefined

function handleDownload() {
  isDownloaded.value = true
  toast.success('Downloading Curriculum Vitae', {
    description: 'SROS Songha.pdf · 337 KB',
  })
  if (downloadTimer) clearTimeout(downloadTimer)
  downloadTimer = setTimeout(() => {
    isDownloaded.value = false
  }, 2800)
}

onUnmounted(() => {
  if (downloadTimer) clearTimeout(downloadTimer)
})

/** Core engineering standards. */
const principles = [
  { title: 'Ship with purpose', body: 'Working software in real users’ hands is the ultimate measure of progress.' },
  { title: 'Performance is UX', body: 'If an interface stutters on a modest phone or slow network, it is not finished.' },
  { title: 'Architect for clarity', body: 'Readable, type-safe systems keep products maintainable and easy to evolve.' },
  { title: 'Respect the user', body: 'Every interaction, loading state, and layout detail should respect user attention.' },
]

useGsapContext(root, () => {
  if (reduced.value) return

  // Each word of the bio brightens as it crosses the middle of the viewport.
  gsap.fromTo(
    '.about-bio .split-word',
    { opacity: 0.85 },
    {
      opacity: 1,
      ease: 'none',
      stagger: 0.4, // relative weighting between words, not seconds — scrub scales it
      scrollTrigger: {
        trigger: '.about-bio',
        // Start when the paragraph's top hits 85% down the screen, finish when
        // its bottom reaches the middle.
        start: 'top 85%',
        end: 'bottom 55%',
        scrub: true,
      },
    },
  )

  // The vertical rule beside the portrait draws itself as you arrive.
  gsap.from('.about-rule', {
    scaleY: 0,
    transformOrigin: 'top',
    duration: 1.4,
    ease: 'power3.inOut',
    scrollTrigger: { trigger: '.about-rule', start: 'top 85%' },
  })
})
</script>

<template>
  <section id="about" ref="root" class="relative overflow-hidden py-28 sm:py-36 lg:py-44">
    <!-- Scroll-driven Web Crawler Spider -->
    <WebCrawler container-selector="#about" />

    <div class="mx-auto max-w-350 px-5 sm:px-8 lg:px-12">
      <SectionHeading
        index="01"
        label="About me"
        title="Engineering with precision,"
        accent="driven by craft."
      />

      <div class="mt-16 grid gap-14 lg:mt-24 lg:grid-cols-12 lg:gap-16">
        <!-- ------------------------------------------------- bio column -->
        <div class="lg:col-span-7">
          <!-- Words mode: we only need per-word targets, not per-letter. Using
               chars here would create ~700 spans for no visual benefit. -->
          <div class="about-bio space-y-6">
            <SplitText
              v-for="(paragraph, i) in profile.bio"
              :key="i"
              :text="paragraph"
              as="p"
              type="words"
              :masked="false"
              class="text-[clamp(1.05rem,2vw,1.4rem)] leading-[1.65]"
            />
          </div>

          <!-- CV Download card & actions -->
          <div
            class="about-cv-card relative mt-12 overflow-hidden rounded-2xl border border-border/80 bg-card/60 p-5 shadow-[0_4px_24px_rgba(0,0,0,0.25)] backdrop-blur-md transition-all duration-300 hover:border-cyan-400/50 hover:shadow-[0_0_25px_rgba(56,189,248,0.15)] sm:p-6"
          >
            <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div class="flex items-center gap-3.5">
                <div class="bg-cyan-950/40 border-cyan-500/30 text-cyan-400 flex size-11 shrink-0 items-center justify-center rounded-xl border shadow-[0_0_12px_rgba(56,189,248,0.2)]">
                  <FileText class="size-5" />
                </div>
                <div>
                  <div class="flex flex-wrap items-center gap-2">
                    <span class="font-serif text-base font-medium text-foreground sm:text-lg">Curriculum Vitae</span>
                    <span class="border-cyan-500/30 bg-cyan-950/40 text-cyan-300 rounded-xs border px-2 py-0.5 font-mono text-[10px] font-semibold tracking-wider uppercase">
                      ARCHIVE · 337 KB
                    </span>
                  </div>
                  <p class="text-muted-foreground mt-0.5 text-xs">
                    Comprehensive education at ITC, internships at T.O Group & EKYC, and production stack.
                  </p>
                </div>
              </div>

              <div class="flex items-center gap-2.5">
                <a
                  :href="profile.cvUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="rounded-full border border-border/80 bg-background/80 hover:border-cyan-400/50 hover:text-cyan-300 text-muted-foreground inline-flex h-10 items-center gap-1.5 px-3.5 font-mono text-xs transition-colors"
                  data-cursor-label="Preview"
                  aria-label="Preview Sros Songha's CV in browser"
                >
                  <Eye class="size-3.5" />
                  <span>Preview</span>
                </a>

                <MagneticWrap :strength="0.3">
                  <Button
                    size="sm"
                    as="a"
                    :href="profile.cvUrl"
                    download="SROS Songha.pdf"
                    target="_blank"
                    class="h-10 gap-2 rounded-full bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 px-5 font-semibold text-slate-950 shadow-[0_0_18px_rgba(56,189,248,0.35)] transition-all hover:scale-[1.02] hover:shadow-[0_0_28px_rgba(56,189,248,0.55)]"
                    :data-cursor-label="isDownloaded ? 'Saved!' : 'Download'"
                    aria-label="Download Sros Songha's Curriculum Vitae (PDF)"
                    @click="handleDownload"
                  >
                    <component
                      :is="isDownloaded ? Check : Download"
                      class="size-4 transition-transform duration-300"
                      :class="{ 'scale-110': isDownloaded }"
                    />
                    <span>{{ isDownloaded ? 'Downloaded!' : 'Download CV' }}</span>
                  </Button>
                </MagneticWrap>
              </div>
            </div>
          </div>

          <!-- Social links -->
          <RevealOnScroll :stagger="0.08" class="mt-8 flex flex-wrap gap-2.5">
            <a
              v-for="social in socials"
              :key="social.href"
              :href="social.href"
              :target="social.href.startsWith('http') ? '_blank' : undefined"
              rel="noopener noreferrer"
              class="group rounded-full border border-border/80 bg-card/60 inline-flex items-center gap-2 px-4 py-2 text-sm text-foreground/90 backdrop-blur-md transition-all duration-300 hover:border-cyan-400/60 hover:shadow-[0_0_15px_rgba(56,189,248,0.18)] hover:text-cyan-300"
              :data-cursor-label="social.label"
            >
              <span class="bg-cyan-400 group-hover:bg-cyan-300 size-1.5 rounded-full transition-colors shadow-[0_0_6px_#38bdf8]" />
              <span class="font-medium">{{ social.label }}</span>
              <span class="text-muted-foreground font-mono text-xs">{{ social.handle }}</span>
            </a>
          </RevealOnScroll>
        </div>

        <!-- --------------------------------------------- portrait column -->
        <div class="lg:col-span-5">
          <div class="flex gap-6">
            <!-- The drawing rule -->
            <div class="about-rule bg-gradient-to-b from-cyan-400 via-indigo-500 to-transparent hidden w-px shrink-0 sm:block" />

            <div class="flex-1">
              <!-- Vintage Photographic Plate Portrait -->
              <TiltCard :max="7" :lift="18" radius="rounded-2xl" class="mb-10">
                <div class="group relative overflow-hidden rounded-2xl border border-border/80 bg-card/80 p-2.5 shadow-[0_8px_32px_rgba(0,0,0,0.35)] backdrop-blur-md transition-all duration-300 hover:border-cyan-400/50 hover:shadow-[0_0_30px_rgba(56,189,248,0.2)]">
                  <div class="relative aspect-4/5 overflow-hidden rounded-xl border border-border/70 bg-muted">
                    <img
                      src="/images/profile.jpeg"
                      :alt="profile.name"
                      class="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-102"
                    />

                    <!-- Warm analog film & subtle scanline texture -->
                    <div class="bg-scanlines pointer-events-none absolute inset-0 opacity-15" aria-hidden="true" />

                    <!-- Scrim so the name plate stays legible over the photo -->
                    <div
                      class="absolute inset-0"
                      style="background: linear-gradient(to top, rgba(8, 11, 18, 0.92), transparent 45%)"
                    />

                    <!-- Tech archive tag on photo top right -->
                    <div class="absolute top-3 right-3 rounded-xs border border-cyan-400/30 bg-slate-950/70 px-2 py-0.5 font-mono text-[9px] tracking-widest text-cyan-300 uppercase backdrop-blur-md shadow-[0_0_10px_rgba(56,189,248,0.2)]">
                      ARCHIVE NO. 2026-KH
                    </div>

                    <!-- Name plate -->
                    <div class="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                      <p class="font-serif text-3xl font-medium tracking-tight text-white">{{ profile.name }}</p>
                      <p class="mt-1 flex items-center gap-2 font-mono text-[10px] tracking-[0.25em] text-cyan-200/90 uppercase">
                        <span class="size-1 rounded-full bg-cyan-400 shadow-[0_0_8px_#38bdf8]" />
                        {{ profile.role }} · ITC CAMBODIA
                      </p>
                    </div>
                  </div>
                </div>
              </TiltCard>

              <!-- Principles -->
              <RevealOnScroll :stagger="0.1" class="space-y-6">
                <div v-for="principle in principles" :key="principle.title">
                  <h3 class="font-mono text-[11px] tracking-[0.25em] uppercase">
                    <span class="text-cyan-400">→ </span>{{ principle.title }}
                  </h3>
                  <p class="text-muted-foreground mt-2 text-sm leading-relaxed">
                    {{ principle.body }}
                  </p>
                </div>
              </RevealOnScroll>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
:deep(.split-word.crawler-highlight-cyan) {
  color: #38bdf8 !important;
  text-shadow: 0 0 12px rgba(56, 189, 248, 0.75);
  font-weight: 600;
  transition: color 0.3s ease, text-shadow 0.3s ease;
}

:deep(.split-word.crawler-highlight-sky) {
  color: #7dd3fc !important;
  text-shadow: 0 0 12px rgba(125, 211, 252, 0.75);
  font-weight: 600;
  transition: color 0.3s ease, text-shadow 0.3s ease;
}

:deep(.split-word.crawler-highlight-indigo) {
  color: #818cf8 !important;
  text-shadow: 0 0 12px rgba(129, 140, 248, 0.75);
  font-weight: 600;
  transition: color 0.3s ease, text-shadow 0.3s ease;
}

:deep(.split-word.crawler-highlight-violet) {
  color: #a78bfa !important;
  text-shadow: 0 0 12px rgba(167, 139, 250, 0.75);
  font-weight: 600;
  transition: color 0.3s ease, text-shadow 0.3s ease;
}
</style>
