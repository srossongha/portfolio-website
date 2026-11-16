<script setup lang="ts">
/**
 * SunbeamRays.vue
 *
 * Ambient volumetric sunbeams filtering through a forest canopy.
 * Gently sways and breathes with CSS animation keyframes.
 */
</script>

<template>
  <div
    class="pointer-events-none absolute inset-0 overflow-hidden mix-blend-screen dark:mix-blend-lighten"
    aria-hidden="true"
  >
    <!-- Primary angled sunbeam sheaf -->
    <div
      class="animate-sunbeam absolute -top-1/4 -right-1/4 h-[160%] w-[120%] origin-top-right opacity-40 blur-2xl dark:opacity-25"
      style="
        background: conic-gradient(
          from 205deg at 85% 5%,
          transparent 0deg,
          rgba(251, 191, 36, 0.18) 12deg,
          transparent 20deg,
          rgba(52, 211, 153, 0.12) 28deg,
          transparent 38deg,
          rgba(251, 191, 36, 0.16) 46deg,
          transparent 60deg
        );
      "
    />

    <!-- Secondary warm ambient pool -->
    <div
      class="animate-breathe absolute top-0 right-1/4 h-96 w-96 rounded-full opacity-30 blur-3xl"
      style="background: radial-gradient(circle, rgba(251, 191, 36, 0.25) 0%, transparent 70%);"
    />

    <!-- Emerald moss forest floor glow -->
    <div
      class="animate-breathe absolute bottom-0 left-10 h-80 w-80 rounded-full opacity-25 blur-3xl"
      style="background: radial-gradient(circle, rgba(52, 211, 153, 0.2) 0%, transparent 70%);"
    />
  </div>
</template>
