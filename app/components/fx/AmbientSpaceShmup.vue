<script setup lang="ts">
import DotLottiePlayer from '~/components/fx/DotLottiePlayer.vue'

/**
 * AmbientSpaceShmup.vue
 * Site-wide ambient background combining childhood retro flight shooter mechanics
 * (starfighter, dual laser cannons, invader target drone, hit impact bursts)
 * with a cyber constellation neural mesh, fluid quantum aurora waves,
 * cascading digital rain byte streams, and floating 3D wireframe space debris.
 *
 * Configured with ultra-low contrast and soft opacity so all portfolio content,
 * typography, and interactive cards remain 100% legible and high-contrast.
 */
</script>

<template>
  <div
    class="pointer-events-none fixed inset-0 -z-10 overflow-hidden select-none"
    aria-hidden="true"
  >
    <!-- Live 60fps ThorVG WASM Flight Shooter & Cyber Matrix Layer -->
    <ClientOnly>
      <div class="absolute inset-0 flex items-center justify-center opacity-[0.18] sm:opacity-[0.22] dark:opacity-[0.16] mix-blend-screen">
        <DotLottiePlayer
          src="/animations/retro-space-odyssey.lottie"
          class="size-full max-w-[1400px] max-h-[1400px] object-contain"
          :autoplay="true"
          :loop="true"
        />
      </div>
    </ClientOnly>

    <!-- Gentle radial vignette to softly fade the edges into midnight background -->
    <div
      class="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_45%,rgba(10,10,11,0.65)_80%,rgba(10,10,11,0.92)_100%)] pointer-events-none"
    />
  </div>
</template>
