<script setup lang="ts">
/**
 * EngineerBadgeSvg.vue
 * Clean SVG circular engineering badge / credential seal.
 * Subtle rotation, crisp typography, and high-contrast electric cyan finish.
 */

interface Props {
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  class: 'size-28 sm:size-32'
})
</script>

<template>
  <div class="relative inline-block" :class="props.class">
    <svg
      viewBox="0 0 160 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      class="size-full select-none"
    >
      <defs>
        <!-- Circular text path for curved typography -->
        <path
          id="badgeCirclePath"
          d="M 80, 80 m -60, 0 a 60,60 0 1,1 120,0 a 60,60 0 1,1 -120,0"
        />
      </defs>

      <!-- Outer Dashed Orbital Ring (Rotates smoothly) -->
      <circle
        cx="80"
        cy="80"
        r="75"
        stroke="#38bdf8"
        stroke-opacity="0.35"
        stroke-width="1.5"
        stroke-dasharray="4 4"
        class="origin-center animate-[spin_24s_linear_infinite]"
      />

      <!-- Solid Inner Border -->
      <circle
        cx="80"
        cy="80"
        r="68"
        fill="#050a14"
        stroke="#38bdf8"
        stroke-width="2"
      />

      <!-- Circular Text Wrap -->
      <text fill="#94a3b8" font-family="monospace" font-size="8.5" font-weight="700" letter-spacing="0.16em">
        <textPath href="#badgeCirclePath" startOffset="0%">
          ★ SOFTWARE ENGINEER ★ ITC PHNOM PENH ★ 2026 ★
        </textPath>
      </text>

      <!-- Center Inner Disc -->
      <circle
        cx="80"
        cy="80"
        r="38"
        fill="#071322"
        stroke="#0ea5e9"
        stroke-opacity="0.5"
        stroke-width="1.5"
      />

      <!-- Center Mark: Stylized Code Brackets & Core Spark -->
      <path
        d="M 72 70 L 64 80 L 72 90"
        stroke="#38bdf8"
        stroke-width="2.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M 88 70 L 96 80 L 88 90"
        stroke="#38bdf8"
        stroke-width="2.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <!-- Center 8-bit Diamond Spark -->
      <rect
        x="77"
        y="77"
        width="6"
        height="6"
        transform="rotate(45 80 80)"
        fill="#f8fafc"
      />
    </svg>
  </div>
</template>
