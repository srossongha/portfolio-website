<script setup lang="ts">
import gsap from 'gsap'
import { Check, Download, Eye, FileText, GraduationCap, Briefcase, Rocket, ShieldCheck, Zap, Sparkles, Terminal } from '@lucide/vue'
import { toast } from 'vue-sonner'
import { profile, socials } from '~/data/site'

/**
 * AboutSection.vue — Asymmetrical Bento Dossier
 *
 * Reimagined from a generic two-column template into a high-density bento architecture:
 * - Tile 1: Architectural narrative & 4 core engineering principles.
 * - Tile 2: Photographic credential card & direct CV download dock.
 * - Tile 3A: Academic foundation at ITC Cambodia.
 * - Tile 3B: Enterprise internship execution at T.O Group & EKYC Solution.
 * - Tile 3C: Shipped product spotlight (Roomie - ស្រុកខ្ញុំ).
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

const principles = [
  {
    icon: Rocket,
    num: '01',
    title: 'Ship with purpose',
    body: 'Working software in real users’ hands is the ultimate measure of progress. I build production-ready applications, not just mockups.',
  },
  {
    icon: Zap,
    num: '02',
    title: 'Performance is UX',
    body: 'Sub-second first paint, smooth 60fps animations, and zero layout shift. If an interface stutters on a modest phone, it is not finished.',
  },
  {
    icon: ShieldCheck,
    num: '03',
    title: 'Architect for clarity',
    body: 'Strict TypeScript interfaces, deterministic state management, and reusable components that make code maintainable and easy to evolve.',
  },
  {
    icon: Sparkles,
    num: '04',
    title: 'Respect the user',
    body: 'Thoughtful loading states, accessible tap targets, and fluid micro-interactions that make complex digital tasks feel effortless.',
  },
]
</script>

<template>
  <section id="about" ref="root" class="relative overflow-hidden py-24 sm:py-32 lg:py-36">
    <div class="mx-auto max-w-350 px-5 sm:px-8 lg:px-12">
      <!-- Section Heading -->
      <SectionHeading
        index="01"
        label="Dossier & Craft"
        title="Engineering with precision,"
        accent="driven by purpose."
      />

      <!-- Bento Grid System -->
      <div class="mt-14 grid gap-6 lg:mt-20 lg:grid-cols-12 lg:gap-8">
        <!-- --------------------------------- Card 1: Narrative & Engineering Principles (8 cols) -->
        <div class="lg:col-span-8 flex flex-col justify-between rounded-3xl border border-border/80 bg-card/70 p-6 sm:p-10 shadow-[0_8px_32px_rgba(0,0,0,0.3)] backdrop-blur-xl">
          <div>
            <div class="flex items-center gap-2 font-pixel text-[10px] text-cyan-400 uppercase tracking-widest font-semibold">
              <Terminal class="size-3.5" />
              <span>// 01_MEM_RECORD // PHILOSOPHY</span>
            </div>

            <h3 class="font-serif text-2xl font-medium tracking-tight text-foreground sm:text-3xl lg:text-4xl mt-4 leading-tight">
              &quot;I judge software by how it holds up in real hands — rock-solid on small screens, fast on modest connections, and clean under the hood.&quot;
            </h3>

            <div class="mt-6 space-y-4 text-muted-foreground text-sm sm:text-base leading-relaxed">
              <p>
                {{ profile.bio[0] }}
              </p>
              <p>
                {{ profile.bio[1] }}
              </p>
            </div>
          </div>

          <!-- 4 Core Principles Matrix -->
          <div class="mt-10 pt-8 border-t border-border/60">
            <p class="font-pixel text-[9px] uppercase tracking-widest text-cyan-400/80 mb-4">
              [ CORE_ENGINEERING_RULES ]:
            </p>
            <div class="grid gap-4 sm:grid-cols-2">
              <div
                v-for="p in principles"
                :key="p.num"
                class="rounded-2xl border border-border/60 bg-background/50 p-4 backdrop-blur-md transition-all duration-300 hover:border-cyan-400/40 hover:bg-background/80"
              >
                <div class="flex items-center justify-between">
                  <component :is="p.icon" class="size-4 text-cyan-400" />
                  <span class="font-pixel text-[10px] text-cyan-300">#{{ p.num }}</span>
                </div>
                <h4 class="font-serif text-base font-medium text-foreground mt-2">
                  {{ p.title }}
                </h4>
                <p class="text-muted-foreground text-xs leading-relaxed mt-1">
                  {{ p.body }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- --------------------------------- Card 2: Identity & CV Action Center (4 cols) -->
        <div class="lg:col-span-4 flex flex-col justify-between gap-6">
          <!-- Portrait Tile -->
          <TiltCard :max="6" :lift="14" radius="rounded-3xl" class="h-full">
            <div class="group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-border/80 bg-card/75 p-5 sm:p-6 shadow-[0_8px_32px_rgba(0,0,0,0.3)] backdrop-blur-xl transition-all duration-300 hover:border-cyan-400/50 hover:shadow-[0_0_30px_rgba(56,189,248,0.2)]">
              <!-- Photo Container -->
              <div class="relative aspect-4/3 sm:aspect-square overflow-hidden rounded-2xl border border-border/70 bg-muted">
                <img
                  src="/images/profile.jpeg"
                  :alt="profile.name"
                  class="size-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div class="bg-scanlines pointer-events-none absolute inset-0 opacity-15" />
                <div
                  class="absolute inset-0"
                  style="background: linear-gradient(to top, rgba(8, 11, 18, 0.92), transparent 50%)"
                />

                <div class="absolute top-3 right-3 rounded-xs border border-cyan-400/40 bg-slate-950/80 px-2 py-0.5 font-pixel text-[8px] tracking-widest text-cyan-300 uppercase backdrop-blur-md">
                  STATION // 2026-KH
                </div>

                <div class="absolute inset-x-0 bottom-0 p-4">
                  <p class="font-serif text-2xl font-medium tracking-tight text-white">{{ profile.name }}</p>
                  <p class="mt-0.5 flex items-center gap-1.5 font-pixel text-[9px] tracking-wider text-cyan-300 uppercase">
                    <span class="size-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_#38bdf8]" />
                    {{ profile.role }} · ITC
                  </p>
                </div>
              </div>

              <!-- Dedicated CV Download Dock -->
              <div class="mt-5 rounded-2xl border border-cyan-500/30 bg-cyan-950/30 p-4 backdrop-blur-md">
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-2.5">
                    <div class="flex size-9 items-center justify-center rounded-xl bg-cyan-400/15 text-cyan-400">
                      <FileText class="size-4.5" />
                    </div>
                    <div>
                      <p class="font-serif text-sm font-medium text-foreground">Curriculum Vitae</p>
                      <p class="font-mono text-[10px] text-cyan-300">PDF · 337 KB · 2026</p>
                    </div>
                  </div>
                  <a
                    :href="profile.cvUrl"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="rounded-full border border-border/70 bg-background/80 p-2 text-muted-foreground transition-colors hover:border-cyan-400/50 hover:text-cyan-300"
                    title="Preview CV"
                    aria-label="Preview CV"
                  >
                    <Eye class="size-3.5" />
                  </a>
                </div>

                <MagneticWrap :strength="0.3" class="mt-4">
                  <Button
                    size="sm"
                    as="a"
                    :href="profile.cvUrl"
                    download="SROS Songha.pdf"
                    target="_blank"
                    class="w-full gap-2 rounded-xl bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 py-2.5 font-semibold text-slate-950 shadow-[0_0_18px_rgba(56,189,248,0.35)] transition-all hover:scale-[1.01] hover:shadow-[0_0_25px_rgba(56,189,248,0.5)]"
                    @click="handleDownload"
                  >
                    <component
                      :is="isDownloaded ? Check : Download"
                      class="size-4"
                    />
                    <span class="font-pixel text-[10px] tracking-wider">{{ isDownloaded ? '[ DOWNLOADED ]' : '[ LOAD "CV.PDF",8,1 ]' }}</span>
                  </Button>
                </MagneticWrap>
              </div>
            </div>
          </TiltCard>
        </div>

        <!-- --------------------------------- Bottom 3-Card Ecosystem Row -->
        <!-- Card 3A: Education Foundation -->
        <div class="lg:col-span-4 rounded-3xl border border-border/80 bg-card/60 p-6 shadow-[0_4px_24px_rgba(0,0,0,0.25)] backdrop-blur-md transition-all duration-300 hover:border-cyan-400/40">
          <div class="flex items-center gap-2 font-pixel text-[9px] text-cyan-400 uppercase tracking-wider font-semibold">
            <GraduationCap class="size-3.5" />
            <span>[ MEM_BLOCK_A // EDUCATION ]</span>
          </div>
          <h4 class="font-serif text-xl font-medium text-foreground mt-3">
            Institute of Technology of Cambodia
          </h4>
          <p class="text-cyan-300/80 mt-1 text-xs font-mono">
            Bachelor of Computer Science (ITC Phnom Penh)
          </p>
          <p class="text-muted-foreground mt-3 text-sm leading-relaxed">
            Rigorous engineering coursework covering algorithms, object-oriented architecture, web technologies, and database design.
          </p>
        </div>

        <!-- Card 3B: Industry Internships -->
        <div class="lg:col-span-4 rounded-3xl border border-border/80 bg-card/60 p-6 shadow-[0_4px_24px_rgba(0,0,0,0.25)] backdrop-blur-md transition-all duration-300 hover:border-cyan-400/40">
          <div class="flex items-center gap-2 font-pixel text-[9px] text-cyan-400 uppercase tracking-wider font-semibold">
            <Briefcase class="size-3.5" />
            <span>[ MEM_BLOCK_B // ENTERPRISE ]</span>
          </div>
          <h4 class="font-serif text-xl font-medium text-foreground mt-3">
            T.O Group & EKYC Solution Co., Ltd.
          </h4>
          <p class="text-cyan-300/80 mt-1 text-xs font-mono">
            Front-End Developer Intern
          </p>
          <p class="text-muted-foreground mt-3 text-sm leading-relaxed">
            Engineered edge serverless apps with Next.js/OpenNext on Cloudflare Workers, real-time camera capture pipelines, and headless CMS platforms.
          </p>
        </div>

        <!-- Card 3C: Product Shipped -->
        <div class="lg:col-span-4 rounded-3xl border border-border/80 bg-card/60 p-6 shadow-[0_4px_24px_rgba(0,0,0,0.25)] backdrop-blur-md transition-all duration-300 hover:border-cyan-400/40">
          <div class="flex items-center gap-2 font-pixel text-[9px] text-cyan-400 uppercase tracking-wider font-semibold">
            <Rocket class="size-3.5" />
            <span>[ MEM_BLOCK_C // SHIPPED_PROD ]</span>
          </div>
          <h4 class="font-serif text-xl font-medium text-foreground mt-3">
            Roomie (ស្រុកខ្ញុំ - SrokNh)
          </h4>
          <p class="text-cyan-300/80 mt-1 text-xs font-mono">
            Co-Creator & Front-end Lead · Live at sroknh.com
          </p>
          <p class="text-muted-foreground mt-3 text-sm leading-relaxed">
            Nationwide Cambodian rental platform featuring 25 provinces mapped with CARTO & Leaflet, bilingual KH/EN support, and Supabase RLS.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
