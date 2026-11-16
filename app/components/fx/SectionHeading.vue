<script setup lang="ts">
/**
 * The shared section header: a numbered label, a big serif title, and an
 * optional supporting line.
 *
 * Keeping this in one component is what makes seven different sections feel
 * like one website. The moment you hand-roll each heading, the spacing drifts
 * and the page starts to look assembled rather than designed.
 */

interface Props {
  /** The small monospace index, e.g. "02". */
  index?: string
  /** The kicker above the title. */
  label: string
  title: string
  /** Optional italic serif fragment appended to the title. */
  accent?: string
  description?: string
  align?: 'left' | 'center'
}

withDefaults(defineProps<Props>(), {
  index: '',
  accent: '',
  description: '',
  align: 'left',
})
</script>

<template>
  <RevealOnScroll :stagger="0.09" :class="align === 'center' ? 'text-center' : ''">
    <!-- Kicker row with 1970s Phosphor Decrypt Motion -->
    <div
      class="mb-6 flex items-center gap-3"
      :class="align === 'center' ? 'justify-center' : ''"
    >
      <span v-if="index" class="text-cyan-400 font-pixel text-[10px] tracking-[0.25em] crt-glow">
        [ {{ index }} ]
      </span>
      <span class="bg-cyan-500/30 h-px w-8" aria-hidden="true" />
      <span class="text-cyan-300/90 font-pixel text-[10px] tracking-[0.25em] uppercase flex items-center gap-1.5">
        <span class="size-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_#38bdf8]" />
        <TextScramble :text="label" trigger="scroll" />
      </span>
    </div>

    <!-- Title. Mixing an upright serif with an italic fragment gives the page
         a voice without needing a second typeface. -->
    <!-- Mobile-first metrics: looser below `sm`, tightening as the type grows.
         See the fuller note on the h1 in HeroSection.vue. -->
    <h2 class="font-serif text-[clamp(2.2rem,6vw,4.5rem)] leading-[1.08] tracking-[-0.01em] sm:leading-[0.95] sm:tracking-[-0.025em] text-foreground">
      {{ title }}
      <span v-if="accent" class="text-cyan-400 not-italic font-light">{{ accent }}</span>
    </h2>

    <p
      v-if="description"
      class="text-muted-foreground mt-6 max-w-xl text-base leading-relaxed"
      :class="align === 'center' ? 'mx-auto' : ''"
    >
      {{ description }}
    </p>
  </RevealOnScroll>
</template>
