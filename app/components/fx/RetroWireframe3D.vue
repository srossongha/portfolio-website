<script setup lang="ts">
/**
 * RetroWireframe3D.vue
 *
 * 1970s Vector Graphics 3D Wireframe Core powered by Three.js.
 * Renders a glowing phosphor vector wireframe icosahedron with orbiting
 * orbital coordinate rings, responsive pointer tracking, and smooth inertia.
 */

import * as THREE from 'three'

const container = ref<HTMLElement | null>(null)
let scene: THREE.Scene | null = null
let camera: THREE.PerspectiveCamera | null = null
let renderer: THREE.WebGLRenderer | null = null
let meshGroup: THREE.Group | null = null
let animId: number | null = null
let isVisible = true

let mouseX = 0
let mouseY = 0
let targetRotationX = 0
let targetRotationY = 0

function initThree() {
  if (!container.value) return

  const width = container.value.clientWidth || 240
  const height = container.value.clientHeight || 240

  // 1. Scene
  scene = new THREE.Scene()

  // 2. Camera
  camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100)
  camera.position.z = 4.2

  // 3. Renderer with alpha and antialiasing
  renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
    powerPreference: 'high-performance',
  })
  renderer.setSize(width, height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  container.value.appendChild(renderer.domElement)

  // 4. Create 1970s Vector Wireframe Group
  meshGroup = new THREE.Group()

  // Central Icosahedron wireframe
  const icoGeo = new THREE.IcosahedronGeometry(1.2, 1)
  const icoWire = new THREE.WireframeGeometry(icoGeo)
  const icoMat = new THREE.LineBasicMaterial({
    color: 0x38bdf8, // Electric cyan phosphor
    transparent: true,
    opacity: 0.85,
    blending: THREE.AdditiveBlending,
  })
  const icoLine = new THREE.LineSegments(icoWire, icoMat)
  meshGroup.add(icoLine)

  // Outer orbital gimbal ring (Torus wireframe)
  const ringGeo = new THREE.TorusGeometry(1.65, 0.02, 16, 64)
  const ringMat = new THREE.LineBasicMaterial({
    color: 0x818cf8, // Royal Indigo
    transparent: true,
    opacity: 0.65,
  })
  const ringLine = new THREE.LineSegments(new THREE.WireframeGeometry(ringGeo), ringMat)
  ringLine.rotation.x = Math.PI / 3
  meshGroup.add(ringLine)

  // Particle coordinate cloud (1970s radar dots)
  const particleCount = 48
  const particleGeo = new THREE.BufferGeometry()
  const positions = new Float32Array(particleCount * 3)

  for (let i = 0; i < particleCount * 3; i += 3) {
    const radius = 1.9 + Math.random() * 0.4
    const theta = Math.random() * Math.PI * 2
    const phi = Math.acos((Math.random() * 2) - 1)

    positions[i] = radius * Math.sin(phi) * Math.cos(theta)
    positions[i + 1] = radius * Math.sin(phi) * Math.sin(theta)
    positions[i + 2] = radius * Math.cos(phi)
  }

  particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  const particleMat = new THREE.PointsMaterial({
    color: 0x67e8f9,
    size: 0.04,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending,
  })
  const particles = new THREE.Points(particleGeo, particleMat)
  meshGroup.add(particles)

  scene.add(meshGroup)

  // Start Animation Loop
  animate()
}

function animate() {
  if (!isVisible || !renderer || !scene || !camera || !meshGroup) return

  // Smooth rotation with mouse damping
  targetRotationY += 0.008
  meshGroup.rotation.y += (targetRotationY + mouseX * 0.5 - meshGroup.rotation.y) * 0.05
  meshGroup.rotation.x += (targetRotationX + mouseY * 0.5 - meshGroup.rotation.x) * 0.05
  meshGroup.rotation.z += 0.002

  renderer.render(scene, camera)
  animId = requestAnimationFrame(animate)
}

function onPointerMove(e: PointerEvent) {
  if (!container.value) return
  const rect = container.value.getBoundingClientRect()
  mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1
  mouseY = -(((e.clientY - rect.top) / rect.height) * 2 - 1)
}

function onPointerLeave() {
  mouseX = 0
  mouseY = 0
}

function onResize() {
  if (!container.value || !renderer || !camera) return
  const width = container.value.clientWidth
  const height = container.value.clientHeight
  camera.aspect = width / height
  camera.updateProjectionMatrix()
  renderer.setSize(width, height)
}

onMounted(() => {
  initThree()

  const observer = new IntersectionObserver((entries) => {
    isVisible = entries[0]?.isIntersecting ?? false
    if (isVisible && !animId) {
      animate()
    } else if (!isVisible && animId) {
      cancelAnimationFrame(animId)
      animId = null
    }
  })

  if (container.value) observer.observe(container.value)
  window.addEventListener('resize', onResize)

  onUnmounted(() => {
    observer.disconnect()
    window.removeEventListener('resize', onResize)
    if (animId) cancelAnimationFrame(animId)
    if (renderer) renderer.dispose()
  })
})
</script>

<template>
  <div
    ref="container"
    class="relative size-full min-h-[180px] cursor-grab active:cursor-grabbing overflow-hidden"
    @pointermove="onPointerMove"
    @pointerleave="onPointerLeave"
  >
    <!-- CRT scanlines overlay on 3D viewport -->
    <div class="bg-scanlines pointer-events-none absolute inset-0 opacity-20" />
    <div class="pointer-events-none absolute bottom-2 left-2 font-pixel text-[8px] text-cyan-400/80">
      [ 3D_VECTOR // ACTIVE ]
    </div>
  </div>
</template>
