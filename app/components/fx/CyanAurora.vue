<script setup lang="ts">
/**
 * CyanAurora.vue
 *
 * Clean, luminous atmospheric ambient lighting in electric cyan,
 * ice blue, and deep royal indigo. Replaces busy bubble particles
 * with smooth, modern cyber-minimalist depth.
 */
</script>

<template>
  <div
    class="pointer-events-none absolute inset-0 overflow-hidden"
    aria-hidden="true"
  >
    <!-- Primary Electric Cyan ambient glow -->
    <div
      class="animate-breathe absolute -top-[15%] left-1/2 h-[550px] w-[850px] -translate-x-1/2 rounded-full opacity-40 blur-[120px] dark:opacity-30"
      style="background: radial-gradient(ellipse at center, rgba(56, 189, 248, 0.35) 0%, rgba(14, 165, 233, 0.15) 45%, transparent 70%);"
    />

    <!-- Deep Royal Indigo accent pool -->
    <div
      class="animate-breathe absolute top-[25%] -left-[10%] h-[480px] w-[600px] rounded-full opacity-35 blur-[130px] dark:opacity-25"
      style="background: radial-gradient(circle, rgba(99, 102, 241, 0.3) 0%, rgba(79, 70, 229, 0.1) 50%, transparent 70%); animation-delay: -3s;"
    />

    <!-- Ice Blue soft light wash (right flank) -->
    <div
      class="animate-breathe absolute top-[10%] -right-[10%] h-[500px] w-[650px] rounded-full opacity-30 blur-[130px] dark:opacity-20"
      style="background: radial-gradient(circle, rgba(125, 211, 252, 0.25) 0%, transparent 65%); animation-delay: -5s;"
    />

    <!-- Subtle cyber micro-grid (soft & non-intrusive) -->
    <div
      class="bg-grid mask-radial-fade absolute inset-0 opacity-[0.14] dark:opacity-[0.20]"
    />
  </div>
</template>
