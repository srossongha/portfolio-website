<script setup lang="ts">
/**
 * TechRadarSvg.vue
 * High-precision, mathematical SVG radar chart of Software Engineering competencies.
 * Clean, geometric, interactive, and completely free of AI slop.
 */

interface SkillDimension {
  label: string
  shortLabel: string
  level: number // 0 to 100
  category: string
}

const skills: SkillDimension[] = [
  { label: 'Frontend Architecture (Vue/Nuxt/React)', shortLabel: 'FRONTEND', level: 96, category: 'Vue 3 · Nuxt 4 · React 19' },
  { label: 'Cloudflare Serverless & Edge', shortLabel: 'EDGE / CLOUD', level: 90, category: 'Workers · Nitro · Supabase' },
  { label: 'UI Motion & 60fps Canvas', shortLabel: 'MOTION & 3D', level: 92, category: 'GSAP · Canvas API · WebGL' },
  { label: 'Strict TypeScript & Architecture', shortLabel: 'TYPE SAFETY', level: 95, category: 'Zero-Any · Clean Interfaces' },
  { label: 'Computer Science Core (ITC)', shortLabel: 'CS CORE', level: 88, category: 'Algorithms · Data Structures' }
]

const hoveredSkill = ref<SkillDimension | null>(null)

const size = 320
const center = size / 2
const radius = 100
const sides = skills.length

// Calculate polygon points at a given radius ratio
function getPolygonPoints(scale: number): string {
  const points: string[] = []
  for (let i = 0; i < sides; i++) {
    const angle = (Math.PI * 2 / sides) * i - Math.PI / 2
    const x = center + radius * scale * Math.cos(angle)
    const y = center + radius * scale * Math.sin(angle)
    points.push(`${x.toFixed(1)},${y.toFixed(1)}`)
  }
  return points.join(' ')
}

// Calculate actual skill values polygon
const skillPolygonPoints = computed(() => {
  const points: string[] = []
  for (let i = 0; i < sides; i++) {
    const s = skills[i]
    if (!s) continue
    const scale = s.level / 100
    const angle = (Math.PI * 2 / sides) * i - Math.PI / 2
    const x = center + radius * scale * Math.cos(angle)
    const y = center + radius * scale * Math.sin(angle)
    points.push(`${x.toFixed(1)},${y.toFixed(1)}`)
  }
  return points.join(' ')
})

// Vertex coordinates for nodes & labels
const skillVertices = computed(() => {
  return skills.map((s, i) => {
    const scale = s.level / 100
    const angle = (Math.PI * 2 / sides) * i - Math.PI / 2
    const nodeX = center + radius * scale * Math.cos(angle)
    const nodeY = center + radius * scale * Math.sin(angle)
    const labelX = center + (radius + 28) * Math.cos(angle)
    const labelY = center + (radius + 28) * Math.sin(angle)
    const axisX = center + radius * Math.cos(angle)
    const axisY = center + radius * Math.sin(angle)

    return {
      skill: s,
      nodeX,
      nodeY,
      labelX,
      labelY,
      axisX,
      axisY
    }
  })
})
</script>

<template>
  <div class="relative flex flex-col items-center">
    <svg
      :viewBox="`0 0 ${size} ${size}`"
      class="w-full max-w-[320px] select-none overflow-visible"
    >
      <!-- Background Concentric Guide Polygons (25%, 50%, 75%, 100%) -->
      <polygon
        v-for="scale in [0.25, 0.5, 0.75, 1.0]"
        :key="scale"
        :points="getPolygonPoints(scale)"
        fill="none"
        stroke="#1e293b"
        :stroke-width="scale === 1.0 ? '1.5' : '1'"
        :stroke-dasharray="scale === 1.0 ? 'none' : '2 2'"
      />

      <!-- Radial Axis Spokes -->
      <line
        v-for="v in skillVertices"
        :key="v.skill.shortLabel"
        :x1="center"
        :y1="center"
        :x2="v.axisX"
        :y2="v.axisY"
        stroke="#334155"
        stroke-width="1"
      />

      <!-- Skill Polygon Area (Cyan translucent fill) -->
      <polygon
        :points="skillPolygonPoints"
        fill="#0284c7"
        fill-opacity="0.25"
        stroke="#38bdf8"
        stroke-width="2.5"
        class="transition-all duration-300"
      />

      <!-- Pulsing Skill Nodes (Vertex Circles) -->
      <g
        v-for="v in skillVertices"
        :key="v.skill.shortLabel + '-node'"
        class="cursor-pointer transition-transform duration-200 hover:scale-125"
        @mouseenter="hoveredSkill = v.skill"
        @mouseleave="hoveredSkill = null"
      >
        <!-- Glow halo -->
        <circle
          :cx="v.nodeX"
          :cy="v.nodeY"
          r="6"
          fill="#38bdf8"
          fill-opacity="0.3"
        />
        <!-- Solid core point -->
        <circle
          :cx="v.nodeX"
          :cy="v.nodeY"
          r="3.5"
          fill="#38bdf8"
          stroke="#f8fafc"
          stroke-width="1.5"
        />
      </g>

      <!-- Label Anchors -->
      <text
        v-for="v in skillVertices"
        :key="v.skill.shortLabel + '-text'"
        :x="v.labelX"
        :y="v.labelY"
        fill="#94a3b8"
        font-family="monospace"
        font-size="9"
        font-weight="700"
        text-anchor="middle"
        dominant-baseline="central"
        class="transition-colors hover:fill-cyan-300 cursor-pointer"
        @mouseenter="hoveredSkill = v.skill"
        @mouseleave="hoveredSkill = null"
      >
        {{ v.skill.shortLabel }}
      </text>
    </svg>

    <!-- Interactive Inspector Pill -->
    <div
      class="mt-2 min-h-[44px] rounded-lg border border-cyan-500/20 bg-slate-950/80 px-3 py-1.5 text-center font-mono text-xs transition-opacity"
    >
      <div v-if="hoveredSkill" class="text-cyan-300 font-semibold">
        {{ hoveredSkill.label }}: <span class="text-white">{{ hoveredSkill.level }}%</span>
        <div class="text-[10px] text-muted-foreground">{{ hoveredSkill.category }}</div>
      </div>
      <div v-else class="text-[11px] text-muted-foreground flex items-center justify-center gap-1.5 py-1">
        <span class="size-1.5 rounded-full bg-cyan-400 animate-pulse" />
        Hover skill nodes to inspect engineering stack
      </div>
    </div>
  </div>
</template>
