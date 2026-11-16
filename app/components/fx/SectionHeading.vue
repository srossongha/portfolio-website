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
  index?: string;
  /** The kicker above the title. */
  label: string;
  title: string;
  /** Optional italic serif fragment appended to the title. */
  accent?: string;
  description?: string;
  align?: "left" | "center";
}

withDefaults(defineProps<Props>(), {
  index: "",
  accent: "",
  description: "",
  align: "left",
});
</script>

<template>
  <RevealOnScroll
    :stagger="0.09"
    :class="align === 'center' ? 'text-center' : ''"
  >
    <!-- Clean architectural kicker -->
    <div
      class="mb-4 flex items-center gap-2.5 font-mono text-xs uppercase tracking-wider"
      :class="align === 'center' ? 'justify-center' : ''"
    >
      <span v-if="index" class="text-cyan-400 font-semibold">
        {{ index }} /
      </span>
      <span class="text-cyan-300/90 font-medium flex items-center gap-2">
        <span
          class="size-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_#38bdf8]"
        />
        {{ label }}
      </span>
    </div>

    <!-- Title in crisp modern Space Grotesk -->
    <h2
      class="font-serif text-[clamp(2.2rem,5.5vw,4.2rem)] font-bold leading-[1.04] tracking-tight text-foreground"
    >
      {{ title }}
      <span v-if="accent" class="text-cyan-400 font-medium ml-1 sm:ml-2">{{
        accent
      }}</span>
    </h2>

    <p
      v-if="description"
      class="text-muted-foreground mt-4 sm:mt-5 max-w-2xl text-base leading-relaxed"
      :class="align === 'center' ? 'mx-auto' : ''"
    >
      {{ description }}
    </p>
  </RevealOnScroll>
</template>
