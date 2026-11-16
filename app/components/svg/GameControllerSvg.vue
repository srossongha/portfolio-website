<script setup lang="ts">
/**
 * GameControllerSvg.vue
 * Precision clean vector SVG arcade controller with tactile reactive buttons.
 */

interface Props {
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  class: 'w-24 h-16'
})

const emit = defineEmits<{
  (e: 'buttonClick', btn: 'A' | 'B' | 'UP' | 'DOWN' | 'LEFT' | 'RIGHT' | 'START' | 'SELECT'): void
}>()
</script>

<template>
  <div class="inline-block select-none" :class="props.class">
    <svg
      viewBox="0 0 120 72"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      class="size-full"
    >
      <!-- Controller Chassis -->
      <rect
        x="6"
        y="10"
        width="108"
        height="52"
        rx="14"
        fill="#070d18"
        stroke="#38bdf8"
        stroke-width="2"
      />

      <!-- Inset Accent Stripe -->
      <line x1="16" y1="20" x2="104" y2="20" stroke="#0ea5e9" stroke-opacity="0.3" stroke-width="1"/>

      <!-- D-Pad (Left) -->
      <rect
        x="20"
        y="30"
        width="6"
        height="18"
        rx="1"
        fill="#1e293b"
        stroke="#334155"
        stroke-width="0.8"
        class="cursor-pointer hover:fill-cyan-400/80"
        @click="emit('buttonClick', 'UP')"
      />
      <rect
        x="14"
        y="36"
        width="18"
        height="6"
        rx="1"
        fill="#1e293b"
        stroke="#334155"
        stroke-width="0.8"
        class="cursor-pointer hover:fill-cyan-400/80"
        @click="emit('buttonClick', 'LEFT')"
      />

      <!-- Middle: Select & Start Pills -->
      <rect
        x="48"
        y="42"
        width="9"
        height="3"
        rx="1.5"
        fill="#334155"
        class="cursor-pointer hover:fill-cyan-300"
        @click="emit('buttonClick', 'SELECT')"
      />
      <rect
        x="63"
        y="42"
        width="9"
        height="3"
        rx="1.5"
        fill="#334155"
        class="cursor-pointer hover:fill-cyan-300"
        @click="emit('buttonClick', 'START')"
      />

      <!-- Action Buttons (Right) -->
      <!-- Button B -->
      <circle
        cx="88"
        cy="42"
        r="5"
        fill="#1e293b"
        stroke="#475569"
        stroke-width="1"
        class="cursor-pointer transition-colors hover:fill-cyan-700"
        @click="emit('buttonClick', 'B')"
      />
      <text x="88" y="44" fill="#94a3b8" font-family="monospace" font-size="5" font-weight="bold" text-anchor="middle">
        B
      </text>

      <!-- Button A -->
      <circle
        cx="100"
        cy="34"
        r="5"
        fill="#0284c7"
        stroke="#38bdf8"
        stroke-width="1"
        class="cursor-pointer transition-colors hover:fill-cyan-300"
        @click="emit('buttonClick', 'A')"
      />
      <text x="100" y="36" fill="#f8fafc" font-family="monospace" font-size="5" font-weight="bold" text-anchor="middle">
        A
      </text>

      <!-- Small Status LED -->
      <circle cx="60" cy="28" r="1.5" fill="#38bdf8" class="animate-pulse"/>
    </svg>
  </div>
</template>
