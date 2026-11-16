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

          <!-- CV Download card & actions styled as an expedition archive slip -->
          <div
            class="about-cv-card relative mt-12 overflow-hidden rounded-2xl border border-dashed border-border/90 bg-card/75 p-5 shadow-[3px_3px_0_0_color-mix(in_oklch,var(--foreground)_12%,transparent)] backdrop-blur-md transition-all hover:border-brand/60 sm:p-6"
          >
            <div class="washi-tape -top-2 right-6 w-16 rotate-[-2deg] opacity-70" aria-hidden="true" />
            <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div class="flex items-center gap-3.5">
                <div class="bg-brand/15 border-brand/30 text-brand-ink flex size-11 shrink-0 items-center justify-center rounded-xl border">
                  <FileText class="size-5" />
                </div>
                <div>
                  <div class="flex flex-wrap items-center gap-2">
                    <span class="font-serif text-base font-medium text-foreground sm:text-lg">Curriculum Vitae</span>
                    <span class="border-brand/40 bg-brand/15 text-brand-ink rounded-xs border px-2 py-0.5 font-mono text-[10px] font-semibold tracking-wider uppercase">
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
                  class="retro-btn border-border/80 bg-background/80 hover:text-foreground text-muted-foreground inline-flex h-10 items-center gap-1.5 rounded-full px-3.5 font-mono text-xs transition-colors"
                  data-cursor-label="Preview"
                  aria-label="Preview Sros Songha's CV in browser"
                >
                  <Eye class="size-3.5" />
                  <span>Preview</span>
                </a>

                <MagneticWrap :strength="0.3">
                  <Button
                    variant="brand"
                    size="sm"
                    as="a"
                    :href="profile.cvUrl"
                    download="SROS Songha.pdf"
                    target="_blank"
                    class="retro-btn h-10 gap-2 rounded-full bg-brand px-5 font-medium text-background hover:bg-brand-soft"
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
              class="group retro-btn border-border/80 bg-card/60 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm text-foreground/90 transition-all hover:border-brand/60"
              :data-cursor-label="social.label"
            >
              <span class="bg-brand-sprout group-hover:bg-brand size-1.5 rounded-full transition-colors" />
              <span class="font-medium">{{ social.label }}</span>
              <span class="text-muted-foreground font-mono text-xs">{{ social.handle }}</span>
            </a>
          </RevealOnScroll>
        </div>

        <!-- --------------------------------------------- portrait column -->
        <div class="lg:col-span-5">
          <div class="flex gap-6">
            <!-- The drawing rule -->
            <div class="about-rule bg-linear-to-b from-brand via-brand-sprout/40 to-transparent hidden w-px shrink-0 sm:block" />

            <div class="flex-1">
              <!-- Vintage Photographic Plate Portrait -->
              <TiltCard :max="7" :lift="18" radius="rounded-2xl" class="mb-10">
                <div class="group relative overflow-hidden rounded-2xl border border-border/90 bg-card p-2.5 shadow-[5px_5px_0_0_color-mix(in_oklch,var(--foreground)_14%,transparent)] transition-all duration-300 hover:shadow-[7px_7px_0_0_color-mix(in_oklch,var(--brand)_30%,transparent)]">
                  <!-- Washi tape at top left corner -->
                  <div class="washi-tape -top-1 -left-2 w-16 rotate-[-5deg] opacity-80" aria-hidden="true" />

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
                      style="background: linear-gradient(to top, rgba(11, 20, 16, 0.88), transparent 45%)"
                    />

                    <!-- Botanical field tag on photo top right -->
                    <div class="absolute top-3 right-3 rounded-xs border border-white/20 bg-black/60 px-2 py-0.5 font-mono text-[9px] tracking-widest text-emerald-300 uppercase backdrop-blur-md">
                      ARCHIVE NO. 2026-KH
                    </div>

                    <!-- Name plate -->
                    <div class="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                      <p class="font-serif text-3xl font-medium tracking-tight text-white">{{ profile.name }}</p>
                      <p class="mt-1 flex items-center gap-2 font-mono text-[10px] tracking-[0.25em] text-white/80 uppercase">
                        <span class="size-1 rounded-full bg-emerald-400" />
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
                    <span class="text-brand">→ </span>{{ principle.title }}
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
  text-shadow: 0 0 10px rgba(56, 189, 248, 0.65);
  font-weight: 600;
  transition: color 0.3s ease, text-shadow 0.3s ease;
}

:deep(.split-word.crawler-highlight-gold) {
  color: #facc15 !important;
  text-shadow: 0 0 10px rgba(250, 204, 21, 0.65);
  font-weight: 600;
  transition: color 0.3s ease, text-shadow 0.3s ease;
}

:deep(.split-word.crawler-highlight-purple) {
  color: #c084fc !important;
  text-shadow: 0 0 10px rgba(192, 132, 252, 0.65);
  font-weight: 600;
  transition: color 0.3s ease, text-shadow 0.3s ease;
}

:deep(.split-word.crawler-highlight-emerald) {
  color: #34d399 !important;
  text-shadow: 0 0 10px rgba(52, 211, 153, 0.65);
  font-weight: 600;
  transition: color 0.3s ease, text-shadow 0.3s ease;
}

:deep(.split-word.crawler-highlight-rose) {
  color: #fb7185 !important;
  text-shadow: 0 0 10px rgba(251, 113, 133, 0.65);
  font-weight: 600;
  transition: color 0.3s ease, text-shadow 0.3s ease;
}
</style>
