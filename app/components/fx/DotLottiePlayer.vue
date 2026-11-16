<script setup lang="ts">
import { DotLottie } from '@lottiefiles/dotlottie-web'

/**
 * DotLottiePlayer.vue
 * High-performance, hardware-accelerated .lottie & Lottie vector animation player.
 *
 * - Renders via ThorVG WebAssembly / Canvas
 * - Zero layout shift with responsive canvas sizing
 * - Memory-leak safe with onUnmounted cleanup
 * - Respects prefers-reduced-motion
 */

interface Props {
  src: string
  loop?: boolean
  autoplay?: boolean
  speed?: number
  hover?: boolean
  width?: string | number
  height?: string | number
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  loop: true,
  autoplay: true,
  speed: 1,
  hover: false,
  width: '100%',
  height: '100%',
  class: ''
})

const canvasRef = ref<HTMLCanvasElement | null>(null)
const isLoaded = ref(false)
const hasError = ref(false)
let player: DotLottie | null = null
const reduced = useReducedMotion()

onMounted(async () => {
  if (typeof window === 'undefined' || !canvasRef.value) return

  try {
    // Configure local WASM URL
    if (typeof DotLottie.setWasmUrl === 'function') {
      DotLottie.setWasmUrl('/wasm/dotlottie-player.wasm')
    }

    const shouldAutoplay = !reduced.value && (props.hover ? false : props.autoplay)

    player = new DotLottie({
      canvas: canvasRef.value,
      src: props.src,
      loop: props.loop,
      autoplay: shouldAutoplay,
      speed: props.speed,
      useFrameInterpolation: true
    })

    player.addEventListener('load', () => {
      isLoaded.value = true
    })

    player.addEventListener('loadError', (err) => {
      console.warn('[DotLottiePlayer] Load error, falling back:', err)
      hasError.value = true
    })
    player.addEventListener('renderError', (err) => {
      console.warn('[DotLottiePlayer] Render error, falling back:', err)
      hasError.value = true
    })
  } catch (err) {
    console.warn('[DotLottiePlayer] Initialization failed:', err)
    hasError.value = true
  }
})

function onMouseEnter() {
  if (props.hover && player && isLoaded.value && !reduced.value) {
    player.play()
  }
}

function onMouseLeave() {
  if (props.hover && player && isLoaded.value) {
    player.pause()
  }
}

onUnmounted(() => {
  if (player) {
    try {
      player.destroy()
    } catch {
      // Ignore destruction errors
    }
    player = null
  }
})
</script>

<template>
  <div
    class="relative inline-flex items-center justify-center overflow-hidden"
    :class="props.class"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
  >
    <!-- Live Canvas Target -->
    <canvas
      ref="canvasRef"
      class="size-full object-contain transition-opacity duration-300"
      :class="isLoaded ? 'opacity-100' : 'opacity-0'"
    />

    <!-- Clean Placeholder / Loading Skeleton -->
    <div
      v-if="!isLoaded"
      class="absolute inset-0 flex items-center justify-center bg-cyan-950/20 backdrop-blur-xs"
    >
      <div class="size-6 rounded-full border-2 border-cyan-400/30 border-t-cyan-400 animate-spin" />
    </div>
  </div>
</template>
