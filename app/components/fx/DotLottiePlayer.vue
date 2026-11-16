<script setup lang="ts">
import { DotLottie } from '@lottiefiles/dotlottie-web'

/**
 * DotLottiePlayer.vue
 * High-performance, hardware-accelerated .lottie & Lottie vector animation player.
 *
 * - Renders via ThorVG WebAssembly / Canvas
 * - Zero background CPU/GPU usage: Automatically pauses when scrolled out of view or tab is hidden
 * - Viewport lazy-initialization: Defers WASM compilation until scrolled near viewport
 * - High-DPI Retina sharpness: Scales canvas backing store to devicePixelRatio
 * - Memory-leak safe with onUnmounted cleanup and URL.revokeObjectURL
 * - Respects prefers-reduced-motion
 */

interface Props {
  src?: string
  data?: string | ArrayBuffer | Record<string, unknown>
  file?: File | Blob | null
  loop?: boolean
  autoplay?: boolean
  speed?: number
  hover?: boolean
  width?: string | number
  height?: string | number
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  src: '',
  data: undefined,
  file: null,
  loop: true,
  autoplay: true,
  speed: 1,
  hover: false,
  width: '100%',
  height: '100%',
  class: ''
})

const rootRef = ref<HTMLElement | null>(null)
const canvasRef = ref<HTMLCanvasElement | null>(null)
const isLoaded = ref(false)
const hasError = ref(false)
const isInViewport = ref(false)
let player: DotLottie | null = null
let activeBlobUrl: string | null = null
let observer: IntersectionObserver | null = null
const reduced = useReducedMotion()

function cleanBlobUrl() {
  if (activeBlobUrl) {
    URL.revokeObjectURL(activeBlobUrl)
    activeBlobUrl = null
  }
}

async function loadContent() {
  if (!player) return
  isLoaded.value = false
  hasError.value = false

  try {
    cleanBlobUrl()

    const shouldAutoplay = !reduced.value && (props.hover ? false : props.autoplay) && isInViewport.value

    if (props.file) {
      activeBlobUrl = URL.createObjectURL(props.file)
      await player.load({
        src: activeBlobUrl,
        loop: props.loop,
        autoplay: shouldAutoplay,
        speed: props.speed,
        useFrameInterpolation: true
      })
    } else if (props.data) {
      await player.load({
        data: props.data,
        loop: props.loop,
        autoplay: shouldAutoplay,
        speed: props.speed,
        useFrameInterpolation: true
      })
    } else if (props.src) {
      await player.load({
        src: props.src,
        loop: props.loop,
        autoplay: shouldAutoplay,
        speed: props.speed,
        useFrameInterpolation: true
      })
    }
  } catch (err) {
    console.warn('[DotLottiePlayer] Load error:', err)
    hasError.value = true
  }
}

async function initPlayer() {
  if (typeof window === 'undefined' || !canvasRef.value || player) return

  try {
    player = new DotLottie({
      canvas: canvasRef.value,
      loop: props.loop,
      autoplay: false,
      speed: props.speed,
      useFrameInterpolation: true
    })

    player.addEventListener('load', () => {
      isLoaded.value = true
      hasError.value = false
      if (isInViewport.value && props.autoplay && !props.hover && !reduced.value) {
        player?.play()
      }
    })

    player.addEventListener('loadError', (err) => {
      console.warn('[DotLottiePlayer] Load error:', err)
      hasError.value = true
      isLoaded.value = false
    })

    player.addEventListener('renderError', (err) => {
      console.warn('[DotLottiePlayer] Render error:', err)
      hasError.value = true
    })

    await loadContent()
  } catch (err) {
    console.warn('[DotLottiePlayer] Initialization failed:', err)
    hasError.value = true
  }
}

function handleVisibilityChange() {
  if (typeof document === 'undefined' || !player || !isLoaded.value) return
  if (document.hidden) {
    player.pause()
  } else if (isInViewport.value && props.autoplay && !props.hover && !reduced.value) {
    player.play()
  }
}

onMounted(() => {
  if (typeof window === 'undefined') return

  // Set up high-performance Viewport Observer:
  // Automatically pauses playback when scrolled out of view to save battery and GPU cycles.
  if ('IntersectionObserver' in window && rootRef.value) {
    observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (!entry) return

        isInViewport.value = entry.isIntersecting

        if (entry.isIntersecting) {
          if (!player) {
            initPlayer()
          } else if (isLoaded.value && props.autoplay && !props.hover && !reduced.value) {
            player.play()
          }
        } else {
          // Off-screen: stop rendering to yield 0% CPU/GPU overhead
          if (player && isLoaded.value) {
            player.pause()
          }
        }
      },
      { rootMargin: '180px 0px 180px 0px', threshold: 0.05 }
    )
    observer.observe(rootRef.value)
  } else {
    isInViewport.value = true
    initPlayer()
  }

  document.addEventListener('visibilitychange', handleVisibilityChange)
})

// React to source, data, or file changes dynamically
watch(
  [() => props.src, () => props.data, () => props.file, () => props.speed, () => props.loop],
  async () => {
    if (player) {
      await loadContent()
    }
  }
)

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
  if (observer) {
    observer.disconnect()
    observer = null
  }
  if (typeof document !== 'undefined') {
    document.removeEventListener('visibilitychange', handleVisibilityChange)
  }
  cleanBlobUrl()
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
    ref="rootRef"
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
  </div>
</template>
