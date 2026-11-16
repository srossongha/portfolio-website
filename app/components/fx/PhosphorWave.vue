<script setup lang="ts">
/**
 * PhosphorWave.vue
 *
 * 1970s Tektronix / PDP Oscilloscope Vector Canvas.
 * Renders real-time harmonic electron beam sinusoids with phosphor decay trails
 * and interactive pointer frequency modulation.
 */

const canvas = ref<HTMLCanvasElement | null>(null)
let ctx: CanvasRenderingContext2D | null = null
let animationFrame: number | null = null
let phase = 0
let mouseX = 0
let targetFreq = 0.02
let currentFreq = 0.02
let isVisible = true

function draw() {
  if (!canvas.value || !ctx || !isVisible) return

  const width = canvas.value.width
  const height = canvas.value.height

  // Phosphor decay trail effect
  ctx.fillStyle = 'rgba(8, 11, 18, 0.22)'
  ctx.fillRect(0, 0, width, height)

  // Smooth mouse interpolation
  currentFreq += (targetFreq - currentFreq) * 0.05
  phase += 0.04

  // Draw main electron beam waveform
  ctx.lineWidth = 2
  ctx.strokeStyle = '#38bdf8'
  ctx.shadowColor = '#38bdf8'
  ctx.shadowBlur = 12

  ctx.beginPath()
  const midY = height / 2

  for (let x = 0; x < width; x += 2) {
    const distFromMouse = Math.abs(x - mouseX)
    const mouseInfluence = Math.max(0, 1 - distFromMouse / 150)
    const amp = (height * 0.28) + (mouseInfluence * height * 0.18)

    const y = midY +
      Math.sin(x * currentFreq + phase) * amp * 0.7 +
      Math.sin(x * (currentFreq * 2.2) - phase * 1.4) * (amp * 0.3)

    if (x === 0) ctx.moveTo(x, y)
    else ctx.lineTo(x, y)
  }
  ctx.stroke()

  // Draw secondary harmonizer wave (Indigo glow)
  ctx.lineWidth = 1
  ctx.strokeStyle = 'rgba(129, 140, 248, 0.5)'
  ctx.shadowBlur = 6
  ctx.beginPath()

  for (let x = 0; x < width; x += 3) {
    const y = midY + Math.cos(x * (currentFreq * 1.5) + phase * 0.8) * (height * 0.2)
    if (x === 0) ctx.moveTo(x, y)
    else ctx.lineTo(x, y)
  }
  ctx.stroke()

  animationFrame = requestAnimationFrame(draw)
}

function handlePointer(e: PointerEvent) {
  if (!canvas.value) return
  const rect = canvas.value.getBoundingClientRect()
  mouseX = (e.clientX - rect.left) * (canvas.value.width / rect.width)
  const normX = (e.clientX - rect.left) / rect.width
  targetFreq = 0.015 + normX * 0.035
}

function resetPointer() {
  targetFreq = 0.02
}

function resize() {
  if (!canvas.value) return
  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  const rect = canvas.value.getBoundingClientRect()
  canvas.value.width = rect.width * dpr
  canvas.value.height = rect.height * dpr
  if (ctx) ctx.scale(dpr, dpr)
}

onMounted(() => {
  if (!canvas.value) return
  ctx = canvas.value.getContext('2d')
  resize()

  const observer = new IntersectionObserver((entries) => {
    isVisible = entries[0]?.isIntersecting ?? false
    if (isVisible && !animationFrame) {
      draw()
    } else if (!isVisible && animationFrame) {
      cancelAnimationFrame(animationFrame)
      animationFrame = null
    }
  })
  observer.observe(canvas.value)

  window.addEventListener('resize', resize)
  draw()

  onUnmounted(() => {
    observer.disconnect()
    window.removeEventListener('resize', resize)
    if (animationFrame) cancelAnimationFrame(animationFrame)
  })
})
</script>

<template>
  <div class="relative overflow-hidden rounded-xl border border-cyan-500/30 bg-slate-950/70 backdrop-blur-md">
    <!-- Scanline overlay on oscilloscope -->
    <div class="bg-scanlines pointer-events-none absolute inset-0 opacity-30" />

    <!-- Oscilloscope Calibration Header -->
    <div class="relative flex items-center justify-between border-b border-cyan-500/20 px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider text-cyan-400">
      <span class="flex items-center gap-1.5">
        <span class="size-1.5 rounded-full bg-cyan-400 animate-ping" />
        CH1: 50mV/DIV
      </span>
      <span>1977_OSCILLOSCOPE // 2.5MHz</span>
      <span class="text-cyan-300">AUTO_TRIG</span>
    </div>

    <!-- Active Oscilloscope Canvas -->
    <canvas
      ref="canvas"
      class="h-20 w-full cursor-crosshair touch-none"
      @pointermove="handlePointer"
      @pointerleave="resetPointer"
    />
  </div>
</template>
