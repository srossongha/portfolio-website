<script setup lang="ts">
/**
 * CyanAurora.vue — Architectural Matrix Background
 *
 * Replaces blurry AI-style gradient blobs with a disciplined,
 * authentic dark industrial matrix: clean hairline coordinate grid,
 * subtle CRT scanlines, and high-contrast focus. Zero blurry glowing spheres.
 */
</script>

<template>
  <div
    class="pointer-events-none absolute inset-0 overflow-hidden"
    aria-hidden="true"
  >
    <!-- Crisp architectural grid with subtle center mask -->
    <div
      class="bg-grid mask-radial-fade absolute inset-0 opacity-[0.08] dark:opacity-[0.12]"
    />

    <!-- Subtle hardware scanline texture -->
    <div
      class="bg-scanlines absolute inset-0 opacity-[0.05] dark:opacity-[0.07]"
    />
  </div>
</template>
