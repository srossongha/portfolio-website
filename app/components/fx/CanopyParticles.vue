<script setup lang="ts">
/**
 * CanopyParticles.vue
 *
 * Simulates gentle drifting forest spores and glowing fireflies floating in a
 * sunlit canopy. Responds with subtle organic physics to mouse/touch movement.
 */

const canvasRef = ref<HTMLCanvasElement | null>(null)
const reduced = useReducedMotion()

interface Particle {
  x: number
  y: number
  baseRadius: number
  radius: number
  vx: number
  vy: number
  alpha: number
  targetAlpha: number
  hue: number // 142 = emerald moss, 78 = amber pollen
  pulseSpeed: number
  pulseOffset: number
}

let animationFrameId: number | null = null
let particles: Particle[] = []
let mouse = { x: -9999, y: -9999, active: false }

const initParticles = (width: number, height: number) => {
  // Density: approx 1 particle per 25,000 px^2, capped between 25 and 65
  const count = Math.min(Math.max(Math.floor((width * height) / 26000), 25), 65)
  particles = []

  for (let i = 0; i < count; i++) {
    const isEmerald = Math.random() > 0.45
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      baseRadius: Math.random() * 2.2 + 0.8,
      radius: 1,
      vx: (Math.random() - 0.5) * 0.35,
      vy: -(Math.random() * 0.45 + 0.15), // natural upward buoyant drift
      alpha: Math.random() * 0.6 + 0.2,
      targetAlpha: Math.random() * 0.6 + 0.2,
      hue: isEmerald ? 142 : 78,
      pulseSpeed: Math.random() * 0.02 + 0.008,
      pulseOffset: Math.random() * Math.PI * 2,
    })
  }
}

const onMouseMove = (e: MouseEvent) => {
  if (!canvasRef.value) return
  const rect = canvasRef.value.getBoundingClientRect()
  mouse.x = e.clientX - rect.left
  mouse.y = e.clientY - rect.top
  mouse.active = true
}

const onMouseLeave = () => {
  mouse.active = false
}

let tick = 0

const render = () => {
  const canvas = canvasRef.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  const width = canvas.width
  const height = canvas.height

  ctx.clearRect(0, 0, width, height)
  tick++

  for (let i = 0; i < particles.length; i++) {
    const p = particles[i]
    if (!p) continue

    // Organic drift
    p.x += p.vx + Math.sin(tick * 0.01 + p.pulseOffset) * 0.25
    p.y += p.vy

    // Gentle cursor repulsion / disturbance
    if (mouse.active) {
      const dx = p.x - mouse.x
      const dy = p.y - mouse.y
      const dist = Math.hypot(dx, dy)
      if (dist < 130 && dist > 0) {
        const force = (130 - dist) / 130
        p.x += (dx / dist) * force * 1.5
        p.y += (dy / dist) * force * 1.5
      }
    }

    // Wrap boundaries smoothly
    if (p.x < -20) p.x = width + 20
    if (p.x > width + 20) p.x = -20
    if (p.y < -20) p.y = height + 20
    if (p.y > height + 20) p.y = -20

    // Bioluminescent glow pulsation
    const pulse = Math.sin(tick * p.pulseSpeed + p.pulseOffset)
    p.alpha = p.targetAlpha * (0.65 + pulse * 0.35)
    p.radius = p.baseRadius * (0.85 + pulse * 0.15)

    // Draw glowing spore
    const color =
      p.hue === 142
        ? `rgba(52, 211, 153, ${p.alpha.toFixed(3)})` // Emerald sprout
        : `rgba(251, 191, 36, ${p.alpha.toFixed(3)})` // Amber pollen

    const glowColor =
      p.hue === 142
        ? `rgba(16, 185, 129, ${(p.alpha * 0.35).toFixed(3)})`
        : `rgba(245, 158, 11, ${(p.alpha * 0.35).toFixed(3)})`

    // Outer soft glow
    ctx.beginPath()
    ctx.arc(p.x, p.y, p.radius * 3.5, 0, Math.PI * 2)
    ctx.fillStyle = glowColor
    ctx.fill()

    // Inner bright core
    ctx.beginPath()
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
    ctx.fillStyle = color
    ctx.fill()
  }

  if (!reduced.value) {
    animationFrameId = requestAnimationFrame(render)
  }
}

const resizeCanvas = () => {
  const canvas = canvasRef.value
  if (!canvas || !canvas.parentElement) return
  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  const rect = canvas.parentElement.getBoundingClientRect()

  canvas.width = rect.width * dpr
  canvas.height = rect.height * dpr
  const ctx = canvas.getContext('2d')
  if (ctx) ctx.scale(dpr, dpr)

  initParticles(rect.width, rect.height)
}

onMounted(() => {
  resizeCanvas()
  window.addEventListener('resize', resizeCanvas, { passive: true })
  window.addEventListener('mousemove', onMouseMove, { passive: true })
  window.addEventListener('mouseleave', onMouseLeave, { passive: true })

  if (reduced.value) {
    render() // single static pass
  } else {
    animationFrameId = requestAnimationFrame(render)
  }
})

onUnmounted(() => {
  if (animationFrameId) cancelAnimationFrame(animationFrameId)
  window.removeEventListener('resize', resizeCanvas)
  window.removeEventListener('mousemove', onMouseMove)
  window.removeEventListener('mouseleave', onMouseLeave)
})
</script>

<template>
  <div class="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
    <canvas
      ref="canvasRef"
      class="size-full opacity-70 transition-opacity duration-1000 dark:opacity-85"
    />
  </div>
</template>
