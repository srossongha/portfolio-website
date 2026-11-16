<script setup lang="ts">
import {
  Check,
  Download,
  Eye,
  FileText,
  GraduationCap,
  Briefcase,
  Rocket,
  ShieldCheck,
  Zap,
  Sparkles,
  Terminal,
  ArrowUpRight,
} from "@lucide/vue";
import { toast } from "vue-sonner";
import { profile, experiences } from "~/data/site";

/**
 * AboutSection.vue — Architectural Engineering Dossier & Ledger
 *
 * Designed from first principles without generic "AI bento cards":
 * - Left: Technical Photographic Identification Plaque with coordinate brackets.
 * - Right: RFC Engineering Directives Ledger with clean hairline dividers.
 * - Bottom: Enterprise Experience & Institutional Milestones Record.
 */

const root = ref<HTMLElement | null>(null);
const isDownloaded = ref(false);
let downloadTimer: ReturnType<typeof setTimeout> | undefined;

function handleDownload() {
  isDownloaded.value = true;
  toast.success("Downloading Curriculum Vitae", {
    description: "SROS Songha.pdf · 337 KB",
  });
  if (downloadTimer) clearTimeout(downloadTimer);
  downloadTimer = setTimeout(() => {
    isDownloaded.value = false;
  }, 2800);
}

onUnmounted(() => {
  if (downloadTimer) clearTimeout(downloadTimer);
});

const directives = [
  {
    code: "SPEC_01",
    title: "Ship with Purpose",
    summary:
      "Working software in real users’ hands is the ultimate measure of craft. Mockups never crash; production does. I engineer resilient, production-ready systems.",
  },
  {
    code: "SPEC_02",
    title: "60fps Interaction Budget",
    summary:
      "Sub-second first paint, fluid frame rates, and zero layout shift. If an interface stutters on a modest mobile device, the engineering is incomplete.",
  },
  {
    code: "SPEC_03",
    title: "Type-Level Determinism",
    summary:
      "Strict TypeScript interfaces, predictable state machines, and immutable data flows. Errors should be caught at compile-time, never in user viewports.",
  },
  {
    code: "SPEC_04",
    title: "Radical Mobile Empathy",
    summary:
      "Generous 48px touch targets, zero iOS Safari zoom glitches, and ergonomic single-hand navigation. Desktop-first is legacy thinking.",
  },
];
</script>

<template>
  <section
    id="about"
    ref="root"
    class="relative overflow-hidden py-24 sm:py-32 lg:py-36 border-t border-border/40"
  >
    <div class="mx-auto max-w-350 px-5 sm:px-8 lg:px-12">
      <!-- Section Heading -->
      <SectionHeading
        index="01"
        label="Dossier & Record"
        title="Engineering with precision,"
        accent="driven by purpose."
      />

      <!-- Asymmetrical Architectural Ledger Grid -->
      <div class="mt-14 grid gap-10 lg:mt-20 lg:grid-cols-12 lg:gap-14">
        <!-- --------------------------------- Left Column: Technical Identification Plaque (4 cols) -->
        <div class="lg:col-span-4 flex flex-col justify-between">
          <div class="relative">
            <!-- Technical Corner Crosshair Marks -->
            <div
              class="relative overflow-hidden rounded-xl border border-cyan-500/30 bg-slate-950/80 p-3 shadow-xl"
            >
              <!-- Coordinate Top Bar -->
              <div
                class="flex items-center justify-between font-mono text-[9px] text-cyan-400/80 border-b border-cyan-500/20 pb-2 mb-3"
              >
                <span>+ 11.5564° N, 104.9282° E</span>
                <span class="font-pixel text-[8px] text-cyan-300"
                  >REC_ID: 2026-KH</span
                >
              </div>

              <!-- Photo with Scanlines -->
              <div
                class="relative aspect-4/5 overflow-hidden rounded-lg border border-cyan-500/20 bg-muted"
              >
                <img
                  src="/images/profile.jpeg"
                  :alt="profile.name"
                  class="size-full object-cover"
                />
                <div
                  class="bg-scanlines pointer-events-none absolute inset-0 opacity-20"
                />
                <div
                  class="absolute inset-0"
                  style="
                    background: linear-gradient(
                      to top,
                      rgba(8, 11, 18, 0.85) 0%,
                      transparent 45%
                    );
                  "
                />
                <div class="absolute bottom-3 inset-x-3">
                  <p class="font-serif text-xl font-medium text-white">
                    {{ profile.name }}
                  </p>
                  <p class="font-mono text-[10px] text-cyan-300">
                    {{ profile.role }}
                    <span class="text-cyan-400/70">· Front-end Intern</span>
                  </p>
                </div>
              </div>

              <!-- Identification Specs Table -->
              <div
                class="mt-4 space-y-2 border-t border-cyan-500/15 pt-3 font-mono text-xs"
              >
                <div
                  class="flex justify-between py-1 border-b border-border/30"
                >
                  <span class="text-muted-foreground text-[11px]"
                    >MAIN DISCIPLINE</span
                  >
                  <span class="text-cyan-400 font-pixel text-[9px]"
                    >SOFTWARE_ENGINEER</span
                  >
                </div>
                <div
                  class="flex justify-between py-1 border-b border-border/30"
                >
                  <span class="text-muted-foreground text-[11px]"
                    >CURRENT INTERN</span
                  >
                  <span class="text-foreground text-[11px]"
                    >Front-end Developer</span
                  >
                </div>
                <div
                  class="flex justify-between py-1 border-b border-border/30"
                >
                  <span class="text-muted-foreground text-[11px]"
                    >ACADEMIA</span
                  >
                  <span class="text-foreground font-medium text-[11px]"
                    >ITC Cambodia</span
                  >
                </div>
                <div
                  class="flex justify-between py-1 border-b border-border/30"
                >
                  <span class="text-muted-foreground text-[11px]">STATUS</span>
                  <span class="text-cyan-400 font-pixel text-[9px]"
                    >CS_UNDERGRADUATE</span
                  >
                </div>
                <div
                  class="flex justify-between py-1 border-b border-border/30"
                >
                  <span class="text-muted-foreground text-[11px]"
                    >INDUSTRY</span
                  >
                  <span class="text-foreground text-[11px]"
                    >T.O Group &amp; EKYC</span
                  >
                </div>
                <div class="flex justify-between py-1">
                  <span class="text-muted-foreground text-[11px]"
                    >LOCATION</span
                  >
                  <span class="text-foreground text-[11px]"
                    >Phnom Penh (UTC+7)</span
                  >
                </div>
              </div>

              <!-- Direct CV Action Dock -->
              <div class="mt-4 pt-3 border-t border-cyan-500/20">
                <Button
                  size="sm"
                  as="a"
                  :href="profile.cvUrl"
                  download="SROS Songha.pdf"
                  target="_blank"
                  class="w-full gap-2 rounded-lg bg-cyan-400 hover:bg-cyan-300 py-2.5 font-semibold text-slate-950 shadow-[0_0_15px_rgba(56,189,248,0.25)] transition-all hover:scale-[1.01] font-pixel text-[10px] tracking-wider uppercase"
                  @click="handleDownload"
                >
                  <component
                    :is="isDownloaded ? Check : Download"
                    class="size-3.5"
                  />
                  <span>{{
                    isDownloaded ? "[ DOWNLOADED ]" : '[ LOAD "CV.PDF",8,1 ]'
                  }}</span>
                </Button>
              </div>
            </div>
          </div>
        </div>

        <!-- --------------------------------- Right Column: Technical Ledger & RFC Directives (8 cols) -->
        <div class="lg:col-span-8 flex flex-col justify-between">
          <div>
            <div
              class="flex items-center gap-2 font-pixel text-[10px] text-cyan-400 uppercase tracking-widest font-semibold"
            >
              <Terminal class="size-3.5" />
              <span>// ARCHITECTURAL_MANIFESTO</span>
            </div>

            <h3
              class="font-serif text-2xl font-medium tracking-tight text-foreground sm:text-3xl lg:text-4xl mt-3 leading-tight"
            >
              &quot;I judge software by how it holds up in real hands —
              rock-solid on small screens, fast on modest connections, and clean
              under the hood.&quot;
            </h3>

            <div
              class="mt-6 space-y-4 text-muted-foreground text-sm sm:text-base leading-relaxed"
            >
              <p>{{ profile.bio[0] }}</p>
              <p>{{ profile.bio[1] }}</p>
            </div>
          </div>

          <!-- RFC Engineering Directives (Clean Monospaced Ledger) -->
          <div class="mt-10 pt-8 border-t border-border/50">
            <div class="flex items-center justify-between mb-4">
              <p
                class="font-pixel text-[10px] uppercase tracking-widest text-cyan-400 font-semibold"
              >
                [ RFC_ENGINEERING_RULES ]:
              </p>
              <span class="font-mono text-[10px] text-muted-foreground"
                >STANDARD_SPEC_V2</span
              >
            </div>

            <div class="divide-y divide-border/40 border-y border-border/40">
              <div
                v-for="d in directives"
                :key="d.code"
                class="py-4.5 sm:py-5 flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-6 group transition-colors hover:bg-cyan-950/15 px-2 rounded-sm"
              >
                <div
                  class="font-pixel text-[10px] text-cyan-400 tracking-wider w-24 shrink-0 font-semibold"
                >
                  [{{ d.code }}]
                </div>
                <div class="flex-1">
                  <h4
                    class="font-serif text-base sm:text-lg font-medium text-foreground group-hover:text-cyan-300 transition-colors"
                  >
                    {{ d.title }}
                  </h4>
                  <p
                    class="text-muted-foreground text-xs sm:text-sm mt-1 leading-relaxed"
                  >
                    {{ d.summary }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Institutional Experience Ledger (Clean Tabular Rows, Zero Bubbly Cards) -->
      <div class="mt-20 pt-12 border-t border-border/50">
        <div class="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <span
              class="font-pixel text-[10px] text-cyan-400 uppercase tracking-widest font-semibold"
            >
              // INSTITUTIONAL_LEDGER
            </span>
            <h3
              class="font-serif text-2xl sm:text-3xl font-medium text-foreground mt-1"
            >
              Field Experience &amp; Foundations
            </h3>
          </div>
          <span class="font-mono text-xs text-muted-foreground">
            2025 — PRESENT · PHNOM PENH
          </span>
        </div>

        <div class="divide-y divide-border/40 border-y border-border/40">
          <div
            v-for="exp in experiences"
            :key="exp.organisation"
            class="py-6 sm:py-8 grid gap-4 lg:grid-cols-12 lg:gap-8 items-start hover:bg-cyan-950/10 transition-colors px-2 rounded-sm"
          >
            <!-- Period & Org -->
            <div class="lg:col-span-4">
              <span
                class="font-mono text-xs text-cyan-400 font-medium tracking-wider"
              >
                {{ exp.period }}
              </span>
              <h4 class="font-serif text-xl font-medium text-foreground mt-1">
                {{ exp.organisation }}
              </h4>
              <p class="text-muted-foreground text-xs font-mono mt-0.5">
                {{ exp.role }}
              </p>
            </div>

            <!-- Description & Stack -->
            <div class="lg:col-span-8">
              <p
                class="text-muted-foreground text-sm sm:text-base leading-relaxed"
              >
                {{ exp.description }}
              </p>

              <div class="mt-3 flex flex-wrap gap-1.5">
                <span
                  v-for="tag in exp.tags"
                  :key="tag"
                  class="rounded border border-border/60 bg-muted/30 px-2 py-0.5 font-mono text-[10px] text-foreground/80"
                >
                  {{ tag }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
