<script setup lang="ts">
import gsap from "gsap";
import {
  ArrowDown,
  ArrowUpRight,
  Download,
  MapPin,
  Terminal,
  Activity,
  Box,
  Code2,
  Mail,
  Gamepad2,
  Sparkles,
  Copy,
  Check,
  Upload,
  FileUp,
} from "@lucide/vue";
import { toast } from "vue-sonner";
import { profile, socials } from "~/data/site";
import CyanAurora from "~/components/fx/CyanAurora.vue";
import PhosphorWave from "~/components/fx/PhosphorWave.vue";
import RetroWireframe3D from "~/components/fx/RetroWireframe3D.vue";
import RetroGameBoy from "~/components/fx/RetroGameBoy.vue";
import DotLottiePlayer from "~/components/fx/DotLottiePlayer.vue";
import EngineerBadgeSvg from "~/components/svg/EngineerBadgeSvg.vue";
import CountUp from "~/components/fx/CountUp.vue";
import MagneticWrap from "~/components/fx/MagneticWrap.vue";

/**
 * HeroSection.vue — Modern High-End Software Engineer Workstation
 *
 * Clean, human, professional:
 * - Clear role: Software Engineer (Front-end Developer Intern)
 * - Honest, direct copy without fake sci-fi tropes or AI buzzwords
 * - Interactive technical console with Songha Boy (8-bit), dotLottie engine, TypeScript spec, 3D core, and wave
 * - High-contrast cyan & midnight slate palette with smooth 60fps animations
 */

const root = ref<HTMLElement | null>(null);
const { isReady } = useAppReady();
const reduced = useReducedMotion();
const { scrollTo } = useSmoothScroll();
const terminal = useTerminal();

const activeDeck = ref<"game" | "lottie" | "code" | "3d" | "wave">("game");
let introCtx: gsap.Context | undefined;

// CLI Copy Helper
const copied = ref(false);
let copyTimer: ReturnType<typeof setTimeout> | undefined;

function copyCliCommand() {
  if (typeof navigator !== "undefined" && navigator.clipboard) {
    navigator.clipboard.writeText("npx songha");
    copied.value = true;
    toast.success("Command copied to clipboard", {
      description: 'Run "npx songha" in your terminal to launch developer CLI.',
    });
    if (copyTimer) clearTimeout(copyTimer);
    copyTimer = setTimeout(() => {
      copied.value = false;
    }, 2500);
  }
}

// Lottie Animation Engine State & Browser File Loader
const lottiePresets = [
  { id: 'ai-quantum-core', name: 'AI Core', src: '/animations/ai-quantum-core.lottie', badge: '1.2 KB' },
  { id: 'retro-gameboy', name: 'GameBoy', src: '/animations/retro-gameboy.lottie', badge: '1.6 KB' },
  { id: 'code-spark', name: 'Code Spark', src: '/animations/code-spark.lottie', badge: '0.8 KB' },
  { id: 'game-trophy', name: 'Trophy', src: '/animations/game-trophy.lottie', badge: '0.7 KB' },
];

const activeLottieSrc = ref('/animations/ai-quantum-core.lottie');
const userLottieFile = ref<File | null>(null);
const userFileName = ref<string | null>(null);
const userFileSize = ref<string | null>(null);
const lottieFileInput = ref<HTMLInputElement | null>(null);

function selectLottiePreset(src: string) {
  userLottieFile.value = null;
  userFileName.value = null;
  userFileSize.value = null;
  activeLottieSrc.value = src;
}

function triggerLottieUpload() {
  lottieFileInput.value?.click();
}

function handleLottieFileSelect(event: Event) {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];
  if (!file) return;

  if (!file.name.endsWith('.lottie') && !file.name.endsWith('.json')) {
    toast.error('Invalid animation format', {
      description: 'Please select a valid .lottie or .json file.',
    });
    return;
  }

  userLottieFile.value = file;
  userFileName.value = file.name;
  userFileSize.value = (file.size / 1024).toFixed(1) + ' KB';
  activeLottieSrc.value = '';

  toast.success('Lottie file imported into browser!', {
    description: `Loaded ${file.name} (${userFileSize.value}) via browser memory.`,
  });
}

function handleLottieDrop(e: DragEvent) {
  e.preventDefault();
  const file = e.dataTransfer?.files?.[0];
  if (!file) return;

  if (!file.name.endsWith('.lottie') && !file.name.endsWith('.json')) {
    toast.error('Invalid animation format', {
      description: 'Please drop a .lottie or .json file.',
    });
    return;
  }

  userLottieFile.value = file;
  userFileName.value = file.name;
  userFileSize.value = (file.size / 1024).toFixed(1) + ' KB';
  activeLottieSrc.value = '';

  toast.success('Lottie file dropped into browser!', {
    description: `Loaded ${file.name} (${userFileSize.value}) via browser memory.`,
  });
}

// Live Phnom Penh time
const localTime = ref("");
onMounted(() => {
  const updateTime = () => {
    localTime.value = new Date().toLocaleTimeString("en-US", {
      timeZone: "Asia/Phnom_Penh",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };
  updateTime();
  const timer = setInterval(updateTime, 1000 * 30);
  onUnmounted(() => clearInterval(timer));
});

const stopWatching = watch(
  isReady,
  (ready) => {
    if (!ready || !root.value) return;
    stopWatching();

    if (reduced.value) {
      gsap.set(".hero-anim", { opacity: 1, y: 0 });
      return;
    }

    introCtx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.from(".hero-eyebrow", { opacity: 0, y: 16, duration: 0.6 })
        .from(
          ".hero-title-text",
          { opacity: 0, y: 20, duration: 0.75 },
          "-=0.4",
        )
        .from(".hero-role-text", { opacity: 0, y: 16, duration: 0.7 }, "-=0.5")
        .from(".hero-bio-text", { opacity: 0, y: 14, duration: 0.65 }, "-=0.45")
        .from(
          ".hero-action-btn",
          { opacity: 0, y: 14, duration: 0.6, stagger: 0.06 },
          "-=0.4",
        )
        .from(
          ".hero-social-pill",
          { opacity: 0, y: 10, duration: 0.5, stagger: 0.04 },
          "-=0.35",
        )
        .from(
          ".hero-deck-chassis",
          { opacity: 0, y: 20, duration: 0.8, ease: "power3.out" },
          "-=0.5",
        );
    }, root.value);
  },
  { immediate: true },
);

onUnmounted(() => {
  introCtx?.revert();
  if (copyTimer) clearTimeout(copyTimer);
});
</script>

<template>
  <section
    id="hero"
    ref="root"
    class="relative min-h-svh flex flex-col justify-center overflow-hidden bg-background pt-24 pb-16 lg:pt-32 lg:pb-24"
  >
    <!-- Crisp Ambient Background -->
    <CyanAurora />

    <div class="relative mx-auto w-full max-w-350 px-5 sm:px-8 lg:px-12">
      <!-- Top Status & Location Bar -->
      <div
        class="hero-anim hero-eyebrow mb-6 sm:mb-8 flex flex-wrap items-center justify-between gap-3 border-b border-border/40 pb-4"
      >
        <div class="flex flex-wrap items-center gap-3">
          <div
            class="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-950/40 px-3 py-1 font-mono text-xs text-cyan-300"
          >
            <ClientOnly>
              <DotLottiePlayer
                src="/animations/pulse-radar.lottie"
                class="size-3.5 shrink-0"
                :autoplay="true"
                :loop="true"
              />
              <template #fallback>
                <span
                  class="size-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]"
                />
              </template>
            </ClientOnly>
            <span>Available for Software Engineering Roles</span>
          </div>

          <span
            class="text-muted-foreground flex items-center gap-1.5 font-mono text-xs"
          >
            <MapPin class="size-3.5 text-cyan-400" />
            <span>Phnom Penh, Cambodia</span>
            <span v-if="localTime" class="text-cyan-400/80"
              >({{ localTime }} UTC+7)</span
            >
          </span>
        </div>

        <button
          type="button"
          class="hidden sm:inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground hover:text-cyan-300 transition-colors cursor-pointer"
          @click="terminal.open()"
        >
          <Terminal class="size-3.5 text-cyan-400" />
          <span>Launch Interactive CLI</span>
        </button>
      </div>

      <!-- 2-COLUMN SPLIT WORKSTATION HERO -->
      <div class="grid gap-10 lg:grid-cols-12 lg:gap-10 lg:items-start">
        <!-- LEFT COLUMN: HIGH-SIGNAL SOFTWARE ENGINEER PROFILE (7 cols) -->
        <div class="lg:col-span-7 flex flex-col justify-between">
          <div class="hero-anim hero-title-text">
            <h1
              class="font-serif text-[clamp(2.8rem,6.5vw,5rem)] font-bold leading-[1.02] tracking-tight text-foreground"
            >
              {{ profile.name }}
            </h1>
          </div>

          <div
            class="hero-anim hero-role-text mt-3 flex flex-wrap items-center gap-2.5"
          >
            <h2
              class="font-serif text-[clamp(1.4rem,3.2vw,2.4rem)] font-normal leading-tight tracking-tight text-cyan-400"
            >
              {{ profile.role }}
            </h2>
            <span
              class="rounded-full border border-cyan-500/25 bg-cyan-950/50 px-3 py-1 font-mono text-xs text-cyan-200"
            >
              Front-end Developer Intern @ T.O Group &amp; EKYC Solution
            </span>
          </div>

          <p
            class="hero-anim hero-bio-text text-muted-foreground mt-4 text-base sm:text-lg leading-relaxed max-w-2xl"
          >
            Computer Science student at the Institute of Technology of Cambodia
            (ITC). I build production web applications, edge serverless architectures,
            and responsive interfaces with Vue, Nuxt, React, and TypeScript.
          </p>

          <!-- Quick CLI Terminal Command Bar ($ npx songha) -->
          <div
            class="hero-anim mt-6 flex items-center justify-between gap-3 rounded-xl border border-cyan-500/30 bg-slate-950/80 px-3.5 py-2.5 font-mono text-xs shadow-inner max-w-xl"
          >
            <div class="flex items-center gap-2 text-slate-300 overflow-hidden">
              <span class="text-cyan-400 font-bold select-none">$</span>
              <span class="text-cyan-200 font-semibold truncate">npx songha</span>
              <span class="text-muted-foreground text-[11px] hidden sm:inline"
                >// Launch interactive engineer CLI</span
              >
            </div>
            <button
              type="button"
              class="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-cyan-500/30 bg-cyan-950/60 px-2.5 py-1 text-[11px] font-medium text-cyan-300 hover:text-white hover:bg-cyan-900/60 transition-colors cursor-pointer"
              @click="copyCliCommand"
            >
              <component :is="copied ? Check : Copy" class="size-3 text-cyan-400" />
              <span>{{ copied ? "Copied" : "Copy" }}</span>
            </button>
          </div>

          <!-- Primary Action Array -->
          <div
            class="mt-6 flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3"
          >
            <MagneticWrap
              :strength="0.25"
              class="hero-anim hero-action-btn w-full sm:w-auto"
            >
              <Button
                size="pill"
                class="w-full sm:w-auto group inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-400 hover:bg-cyan-300 px-6 py-3 text-sm font-semibold text-slate-950 shadow-[0_0_20px_rgba(56,189,248,0.25)] transition-all duration-300 hover:scale-[1.02]"
                data-cursor-label="Explore"
                @click="scrollTo('#work', { offset: 0 })"
              >
                <span>Explore Projects</span>
                <ArrowUpRight
                  class="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Button>
            </MagneticWrap>

            <MagneticWrap
              :strength="0.25"
              class="hero-anim hero-action-btn w-full sm:w-auto"
            >
              <Button
                size="pill"
                class="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-border/80 bg-card/70 px-5 py-3 text-sm font-medium text-foreground backdrop-blur-md transition-all duration-300 hover:border-cyan-400 hover:bg-card/90 hover:text-cyan-300"
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

            <MagneticWrap
              :strength="0.25"
              class="hero-anim hero-action-btn w-full sm:w-auto"
            >
              <Button
                variant="ghost"
                size="pill"
                class="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-border/50 px-5 py-3 text-sm font-medium text-muted-foreground transition-colors hover:text-cyan-300 hover:border-cyan-400/40 hover:bg-cyan-950/20"
                as="a"
                :href="`mailto:${profile.email}`"
                data-cursor-label="Contact"
              >
                <Mail class="size-4 text-cyan-400" />
                <span>Get in Touch</span>
              </Button>
            </MagneticWrap>

            <MagneticWrap
              :strength="0.25"
              class="hero-anim hero-action-btn w-full sm:w-auto"
            >
              <Button
                variant="ghost"
                size="pill"
                class="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 font-mono text-xs text-muted-foreground transition-colors hover:text-cyan-300 hover:bg-cyan-950/20"
                data-cursor-label="CLI Shell"
                @click="terminal.open()"
              >
                <Terminal class="size-3.5 text-cyan-400" />
                <span>&gt;_ Terminal</span>
              </Button>
            </MagneticWrap>
          </div>

          <!-- Social Links -->
          <div class="mt-6 flex flex-wrap items-center gap-2">
            <span class="text-muted-foreground font-mono text-xs mr-1"
              >Connect:</span
            >
            <a
              v-for="s in socials.slice(0, 5)"
              :key="s.label"
              :href="s.href"
              target="_blank"
              rel="noopener noreferrer"
              class="hero-anim hero-social-pill group rounded-lg border border-border/60 bg-card/40 px-3 py-1 font-mono text-xs text-muted-foreground backdrop-blur-md transition-all hover:border-cyan-400/50 hover:text-cyan-300"
              :data-cursor-label="s.label"
            >
              <span
                class="text-foreground group-hover:text-cyan-400 font-medium"
                >{{ s.label }}</span
              >
            </a>
          </div>
        </div>

        <!-- RIGHT COLUMN: INTERACTIVE ENGINEERING WORKSTATION CONSOLE (5 cols) -->
        <div
          class="hero-anim hero-deck-chassis lg:col-span-5 overflow-hidden rounded-2xl border border-cyan-500/30 bg-slate-950/90 shadow-[0_20px_50px_rgba(0,0,0,0.45)] backdrop-blur-xl flex flex-col"
        >
          <!-- Console Window Header -->
          <div
            class="flex items-center justify-between border-b border-cyan-500/20 bg-slate-900/60 px-4 py-3"
          >
            <div class="flex items-center gap-2.5">
              <!-- macOS Window Controls -->
              <div class="flex items-center gap-1.5">
                <span class="size-2.5 rounded-full bg-rose-500/80" />
                <span class="size-2.5 rounded-full bg-amber-500/80" />
                <span class="size-2.5 rounded-full bg-emerald-500/80" />
              </div>
              <span class="font-mono text-xs text-cyan-300 font-medium truncate max-w-[130px] sm:max-w-none">
                songha@workstation: ~
              </span>
            </div>

            <!-- Mode Selector Tabs -->
            <div class="flex items-center gap-1 font-mono text-xs overflow-x-auto no-scrollbar">
              <button
                type="button"
                class="inline-flex shrink-0 items-center gap-1.5 rounded-md px-2 py-1 transition-all text-xs"
                :class="
                  activeDeck === 'game'
                    ? 'bg-cyan-500/20 border border-cyan-400/40 text-cyan-200 shadow-[0_0_10px_rgba(56,189,248,0.2)]'
                    : 'text-muted-foreground hover:text-cyan-300 border border-transparent'
                "
                title="Songha Boy 8-Bit Playable Console"
                @click="activeDeck = 'game'"
              >
                <Gamepad2 class="size-3.5" />
                <span>Console</span>
              </button>

              <button
                type="button"
                class="inline-flex shrink-0 items-center gap-1.5 rounded-md px-2 py-1 transition-all text-xs"
                :class="
                  activeDeck === 'lottie'
                    ? 'bg-cyan-500/20 border border-cyan-400/40 text-cyan-200 shadow-[0_0_10px_rgba(56,189,248,0.2)]'
                    : 'text-muted-foreground hover:text-cyan-300 border border-transparent'
                "
                title="dotLottie Vector Engine"
                @click="activeDeck = 'lottie'"
              >
                <Sparkles class="size-3.5" />
                <span>Lottie</span>
              </button>

              <button
                type="button"
                class="inline-flex shrink-0 items-center gap-1.5 rounded-md px-2 py-1 transition-all text-xs"
                :class="
                  activeDeck === 'code'
                    ? 'bg-cyan-500/20 border border-cyan-400/40 text-cyan-200 shadow-[0_0_10px_rgba(56,189,248,0.2)]'
                    : 'text-muted-foreground hover:text-cyan-300 border border-transparent'
                "
                title="TypeScript Profile Spec"
                @click="activeDeck = 'code'"
              >
                <Code2 class="size-3.5" />
                <span>Spec</span>
              </button>

              <button
                type="button"
                class="inline-flex shrink-0 items-center gap-1.5 rounded-md px-2 py-1 transition-all text-xs"
                :class="
                  activeDeck === '3d'
                    ? 'bg-cyan-500/20 border border-cyan-400/40 text-cyan-200 shadow-[0_0_10px_rgba(56,189,248,0.2)]'
                    : 'text-muted-foreground hover:text-cyan-300 border border-transparent'
                "
                title="3D Vector Core"
                @click="activeDeck = '3d'"
              >
                <Box class="size-3.5" />
                <span>3D</span>
              </button>

              <button
                type="button"
                class="inline-flex shrink-0 items-center gap-1.5 rounded-md px-2 py-1 transition-all text-xs"
                :class="
                  activeDeck === 'wave'
                    ? 'bg-cyan-500/20 border border-cyan-400/40 text-cyan-200 shadow-[0_0_10px_rgba(56,189,248,0.2)]'
                    : 'text-muted-foreground hover:text-cyan-300 border border-transparent'
                "
                title="Signal Wave Harmonics"
                @click="activeDeck = 'wave'"
              >
                <Activity class="size-3.5" />
                <span>Wave</span>
              </button>
            </div>
          </div>

        <!-- Interactive Screen Viewport -->
        <div
          class="relative min-h-[260px] bg-slate-950/80 p-4 sm:p-6 flex flex-col justify-center"
        >
          <!-- VIEWPORT 01: SONGHA BOY COLOR 8-BIT PLAYABLE GAME CONSOLE -->
          <div v-show="activeDeck === 'game'" class="py-2">
            <ClientOnly>
              <RetroGameBoy />
              <template #fallback>
                <div class="h-64 flex items-center justify-center font-mono text-xs text-cyan-400">
                  Booting Songha Boy Color...
                </div>
              </template>
            </ClientOnly>
          </div>

          <!-- VIEWPORT 02: HIGH-PERFORMANCE DOTLOTTIE ANIMATION & BROWSER FILE LOADER -->
          <div v-show="activeDeck === 'lottie'" class="flex flex-col items-center justify-center py-2">
            <div class="flex items-center justify-between w-full font-mono text-xs text-cyan-400/80 mb-2.5 px-1">
              <span class="flex items-center gap-2">
                <span class="size-1.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_6px_#38bdf8]" />
                <span class="truncate">DotLottie Vector WASM Engine</span>
              </span>
              <span class="text-muted-foreground text-[11px] hidden sm:inline">
                {{ userFileName ? `Custom File (${userFileSize})` : '60fps ThorVG · Sub-2KB' }}
              </span>
            </div>

            <!-- Animation Preset Bar + Browser File Upload Trigger -->
            <div class="flex flex-wrap items-center justify-center gap-1.5 mb-3 w-full">
              <button
                v-for="preset in lottiePresets"
                :key="preset.id"
                type="button"
                class="inline-flex items-center gap-1 rounded-md px-2 py-1 font-mono text-[11px] transition-all"
                :class="
                  !userLottieFile && activeLottieSrc === preset.src
                    ? 'border border-cyan-400/50 bg-cyan-950/80 text-cyan-200 shadow-[0_0_8px_rgba(56,189,248,0.25)]'
                    : 'border border-cyan-500/15 bg-slate-900/60 text-slate-400 hover:text-cyan-300'
                "
                @click="selectLottiePreset(preset.src)"
              >
                <span>{{ preset.name }}</span>
                <span class="text-[10px] text-cyan-500/70 font-semibold">({{ preset.badge }})</span>
              </button>

              <!-- Upload File from Browser Button -->
              <button
                type="button"
                class="inline-flex items-center gap-1.5 rounded-md px-2 py-1 font-mono text-[11px] transition-all border"
                :class="
                  userLottieFile
                    ? 'border-emerald-400/50 bg-emerald-950/80 text-emerald-200 shadow-[0_0_8px_rgba(52,211,153,0.25)]'
                    : 'border-cyan-500/30 bg-cyan-950/40 text-cyan-300 hover:bg-cyan-900/50 hover:text-white'
                "
                title="Select or drop any .lottie or .json animation from your computer"
                @click="triggerLottieUpload"
              >
                <FileUp class="size-3" />
                <span>{{ userFileName ? 'Change File' : 'Import File...' }}</span>
              </button>

              <input
                ref="lottieFileInput"
                type="file"
                accept=".lottie,.json"
                class="hidden"
                @change="handleLottieFileSelect"
              />
            </div>

            <!-- Custom File Loaded Indicator Strip -->
            <div
              v-if="userFileName"
              class="flex items-center gap-2 mb-2 px-3 py-1 rounded-lg border border-emerald-500/30 bg-emerald-950/40 text-emerald-300 font-mono text-xs"
            >
              <Check class="size-3.5 text-emerald-400" />
              <span class="truncate max-w-[200px] sm:max-w-xs">{{ userFileName }}</span>
              <span class="text-emerald-500 text-[10px]">({{ userFileSize }})</span>
              <button
                type="button"
                class="ml-1 text-[10px] text-muted-foreground hover:text-white underline"
                @click="selectLottiePreset('/animations/ai-quantum-core.lottie')"
              >
                Reset
              </button>
            </div>

            <!-- Interactive Dropzone / Player Canvas Container -->
            <ClientOnly>
              <div
                class="relative flex items-center justify-center rounded-2xl border border-cyan-500/25 bg-slate-900/40 p-4 transition-all duration-200 hover:border-cyan-400/40"
                @dragover.prevent
                @drop="handleLottieDrop"
              >
                <DotLottiePlayer
                  :src="activeLottieSrc"
                  :file="userLottieFile"
                  class="size-56 sm:size-64"
                  :autoplay="true"
                  :loop="true"
                />
              </div>
              <template #fallback>
                <div class="size-56 sm:size-64 flex items-center justify-center font-mono text-xs text-cyan-400">
                  Loading dotLottie engine...
                </div>
              </template>
            </ClientOnly>

            <p class="mt-3 font-mono text-[11px] text-muted-foreground text-center max-w-md">
              Drag & drop or pick any <code class="text-cyan-300">.lottie</code> or <code class="text-cyan-300">.json</code> file from your browser. Rendered client-side via WebAssembly ThorVG.
            </p>
          </div>

          <!-- VIEWPORT 03: REAL TYPESCRIPT PROFILE SPEC -->
          <div
            v-show="activeDeck === 'code'"
            class="font-mono text-xs sm:text-[13px] leading-relaxed text-slate-300 overflow-x-auto py-2"
          >
            <p>
              <span class="text-cyan-400 font-semibold">export const</span>
              <span class="text-sky-300">songha</span>:
              <span class="text-indigo-300">SoftwareEngineer</span> = {
            </p>
            <p class="pl-4 sm:pl-6">
              <span class="text-slate-400">name:</span>
              <span class="text-cyan-200">'Sros Songha'</span>,
            </p>
            <p class="pl-4 sm:pl-6">
              <span class="text-slate-400">role:</span>
              <span class="text-cyan-200">'Software Engineer'</span>,
            </p>
            <p class="pl-4 sm:pl-6">
              <span class="text-slate-400">currentStatus:</span>
              <span class="text-cyan-200"
                >'Front-end Developer Intern @ T.O Group &amp; EKYC
                Solution'</span
              >,
            </p>
            <p class="pl-4 sm:pl-6">
              <span class="text-slate-400">education:</span>
              <span class="text-cyan-200"
                >'Computer Science @ Institute of Technology of Cambodia
                (ITC)'</span
              >,
            </p>
            <p class="pl-4 sm:pl-6">
              <span class="text-slate-400">coreStack:</span> [<span
                class="text-cyan-200"
                >'Vue 3'</span
              >, <span class="text-cyan-200">'Nuxt 4'</span>,
              <span class="text-cyan-200">'React 19'</span>,
              <span class="text-cyan-200">'Next.js'</span>,
              <span class="text-cyan-200">'TypeScript'</span>,
              <span class="text-cyan-200">'Tailwind CSS'</span>],
            </p>
            <p class="pl-4 sm:pl-6">
              <span class="text-slate-400">infrastructure:</span> [<span
                class="text-cyan-200"
                >'Cloudflare Workers'</span
              >, <span class="text-cyan-200">'Supabase'</span>,
              <span class="text-cyan-200">'PostgreSQL'</span>,
              <span class="text-cyan-200">'OpenNext'</span>],
            </p>
            <p class="pl-4 sm:pl-6">
              <span class="text-slate-400">flagshipPlatform:</span>
              <span class="text-cyan-200">'https://sroknh.com'</span>
              <span class="text-slate-500">// Roomie (25 Provinces Mapped)</span
              >,
            </p>
            <p class="pl-4 sm:pl-6">
              <span class="text-slate-400">availability:</span>
              <span class="text-emerald-400"
                >'Open to full-time engineering roles &amp; high-impact
                projects'</span
              >
            </p>
            <p>};</p>
          </div>

          <!-- VIEWPORT 02: 3D VECTOR CORE -->
          <div v-show="activeDeck === '3d'" class="relative w-full">
            <div
              class="flex items-center justify-between font-mono text-xs text-cyan-400/80 mb-2"
            >
              <span class="flex items-center gap-2">
                <span
                  class="size-1.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_6px_#38bdf8]"
                />
                Interactive 3D Geometry Core
              </span>
              <span class="text-muted-foreground text-[11px] hidden sm:inline"
                >Drag to rotate viewport</span
              >
            </div>
            <ClientOnly>
              <RetroWireframe3D class="h-44 sm:h-52 w-full rounded-lg" />
              <template #fallback>
                <div
                  class="h-44 sm:h-52 w-full flex items-center justify-center font-mono text-xs text-cyan-400"
                >
                  Initializing WebGL Core...
                </div>
              </template>
            </ClientOnly>
          </div>

          <!-- VIEWPORT 03: OSCILLOSCOPE WAVE HARMONICS -->
          <div v-show="activeDeck === 'wave'" class="relative w-full">
            <div
              class="flex items-center justify-between font-mono text-xs text-cyan-400/80 mb-2"
            >
              <span class="flex items-center gap-2">
                <span
                  class="size-1.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_6px_#38bdf8]"
                />
                Realtime Signal Waveform
              </span>
              <span class="text-muted-foreground text-[11px] hidden sm:inline"
                >Hover pointer to modulate harmonics</span
              >
            </div>
            <ClientOnly>
              <PhosphorWave class="h-40 sm:h-48 w-full rounded-lg" />
              <template #fallback>
                <div
                  class="h-40 sm:h-48 w-full flex items-center justify-center font-mono text-xs text-cyan-400"
                >
                  Calibrating Oscilloscope...
                </div>
              </template>
            </ClientOnly>
          </div>
        </div>
      </div>
    </div>

      <!-- High-Signal Engineering Metrics Strip (Full Width) -->
      <div
        class="hero-anim mt-10 sm:mt-12 grid grid-cols-2 divide-x divide-y sm:divide-y-0 sm:grid-cols-4 divide-cyan-500/20 rounded-2xl border border-cyan-500/25 bg-slate-950/80 shadow-lg backdrop-blur-md overflow-hidden"
      >
        <div
          v-for="stat in profile.stats"
          :key="stat.label"
          class="p-4 sm:p-5 text-center sm:text-left transition-colors hover:bg-cyan-950/20"
        >
          <div
            class="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-cyan-400"
          >
            <CountUp :value="stat.value" :suffix="stat.suffix" />
          </div>
          <div
            class="text-muted-foreground mt-1 font-mono text-xs uppercase tracking-wider"
          >
            {{ stat.label }}
          </div>
        </div>
      </div>
    </div>

    <!-- Scroll Hint -->
    <button
      type="button"
      class="text-muted-foreground hover:text-cyan-400 mx-auto mt-12 flex flex-col items-center gap-2 transition-colors cursor-pointer"
      aria-label="Scroll to content"
      @click="scrollTo('#about', { offset: 0 })"
    >
      <span class="font-mono text-xs uppercase tracking-widest">Scroll</span>
      <ArrowDown class="size-3.5 animate-bounce text-cyan-400" />
    </button>
  </section>
</template>
