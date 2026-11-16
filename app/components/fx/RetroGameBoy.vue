<script setup lang="ts">
import { Play, RotateCcw, Volume2, VolumeX, Sparkles, Trophy, User, Gamepad2, Disc3 } from '@lucide/vue'
import { profile, projects } from '~/data/site'

/**
 * RetroGameBoy.vue — Childhood Handheld Gaming Console & Interactive Mini-Game
 *
 * Bespoke, handcrafted childhood nostalgia:
 * - Handheld console chassis with tactile D-Pad, A/B action buttons, and Start/Select.
 * - Mode 1: Playable 8-bit retro game "Byte Runner" (dodges bugs, collects TypeScript gems).
 * - Mode 2: Childhood RPG Character Status Screen (Player Songha, Stats, Quests).
 * - Mode 3: Interactive Cartridge Slot (Inspect shipped projects like Roomie).
 * - Web Audio API 8-bit chiptune sound synthesis (toggleable, safe, zero-latency).
 */

const mode = ref<'game' | 'stats' | 'cartridge'>('game')
const soundEnabled = ref(false)
const canvasRef = ref<HTMLCanvasElement | null>(null)

// Game state
const isPlaying = ref(false)
const gameOver = ref(false)
const score = ref(0)
const highScore = ref(0)
let animationId: number | null = null

// Chiptune 8-bit Sound Synthesizer via Web Audio API
function playChiptune(type: 'jump' | 'coin' | 'hit' | 'start' | 'click') {
  if (!soundEnabled.value || typeof window === 'undefined') return
  try {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
    if (!AudioCtx) return
    const ctx = new AudioCtx()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.connect(gain)
    gain.connect(ctx.destination)

    const now = ctx.currentTime

    if (type === 'jump') {
      osc.type = 'square'
      osc.frequency.setValueAtTime(150, now)
      osc.frequency.exponentialRampToValueAtTime(600, now + 0.12)
      gain.gain.setValueAtTime(0.08, now)
      gain.gain.linearRampToValueAtTime(0.01, now + 0.12)
      osc.start(now)
      osc.stop(now + 0.12)
    } else if (type === 'coin') {
      osc.type = 'square'
      osc.frequency.setValueAtTime(987.77, now)
      osc.frequency.setValueAtTime(1318.51, now + 0.08)
      gain.gain.setValueAtTime(0.08, now)
      gain.gain.linearRampToValueAtTime(0.01, now + 0.22)
      osc.start(now)
      osc.stop(now + 0.22)
    } else if (type === 'hit') {
      osc.type = 'sawtooth'
      osc.frequency.setValueAtTime(220, now)
      osc.frequency.linearRampToValueAtTime(60, now + 0.25)
      gain.gain.setValueAtTime(0.12, now)
      gain.gain.linearRampToValueAtTime(0.01, now + 0.25)
      osc.start(now)
      osc.stop(now + 0.25)
    } else if (type === 'start') {
      osc.type = 'triangle'
      osc.frequency.setValueAtTime(261.63, now)
      osc.frequency.setValueAtTime(329.63, now + 0.08)
      osc.frequency.setValueAtTime(392.00, now + 0.16)
      osc.frequency.setValueAtTime(523.25, now + 0.24)
      gain.gain.setValueAtTime(0.09, now)
      gain.gain.linearRampToValueAtTime(0.01, now + 0.35)
      osc.start(now)
      osc.stop(now + 0.35)
    } else if (type === 'click') {
      osc.type = 'square'
      osc.frequency.setValueAtTime(800, now)
      gain.gain.setValueAtTime(0.04, now)
      gain.gain.linearRampToValueAtTime(0.001, now + 0.03)
      osc.start(now)
      osc.stop(now + 0.03)
    }
  } catch {
    // Ignore audio permission restrictions
  }
}

// --------------------------------------------------------------------------
// 8-bit Mini-Game Engine: "Byte Runner"
// --------------------------------------------------------------------------
interface Player {
  x: number
  y: number
  w: number
  h: number
  vy: number
  grounded: boolean
}

interface Obstacle {
  x: number
  y: number
  w: number
  h: number
  type: 'bug' | 'gem'
  collected?: boolean
}

let player: Player = { x: 40, y: 120, w: 18, h: 22, vy: 0, grounded: true }
let obstacles: Obstacle[] = []
let gameSpeed = 3
let spawnTimer = 0
let groundY = 145

function initGame() {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('byte-runner-highscore')
    if (saved) highScore.value = parseInt(saved, 10) || 0
  }
}

function startGame() {
  score.value = 0
  gameOver.value = false
  isPlaying.value = true
  gameSpeed = 3
  obstacles = []
  player = { x: 40, y: groundY - 22, w: 18, h: 22, vy: 0, grounded: true }
  playChiptune('start')
  loop()
}

function jump() {
  if (!isPlaying.value) {
    startGame()
    return
  }
  if (player.grounded) {
    player.vy = -7.5
    player.grounded = false
    playChiptune('jump')
  }
}

function loop() {
  if (!isPlaying.value || !canvasRef.value) return
  const canvas = canvasRef.value
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  // Update physics
  player.vy += 0.42 // gravity
  player.y += player.vy

  if (player.y >= groundY - player.h) {
    player.y = groundY - player.h
    player.vy = 0
    player.grounded = true
  }

  // Spawn obstacles & gems
  spawnTimer++
  if (spawnTimer > Math.max(50, 110 - Math.floor(score.value / 4))) {
    spawnTimer = 0
    const isGem = Math.random() > 0.45
    if (isGem) {
      obstacles.push({
        x: canvas.width + 10,
        y: groundY - 35 - Math.random() * 25,
        w: 12,
        h: 12,
        type: 'gem',
      })
    } else {
      obstacles.push({
        x: canvas.width + 10,
        y: groundY - 18,
        w: 14,
        h: 18,
        type: 'bug',
      })
    }
  }

  // Update obstacles
  for (let i = obstacles.length - 1; i >= 0; i--) {
    const o = obstacles[i]
    if (!o) continue
    o.x -= gameSpeed

    // Collision detection
    if (
      !o.collected &&
      player.x < o.x + o.w &&
      player.x + player.w > o.x &&
      player.y < o.y + o.h &&
      player.y + player.h > o.y
    ) {
      if (o.type === 'gem') {
        o.collected = true
        score.value += 10
        playChiptune('coin')
      } else {
        // Hit bug -> Game Over
        gameOver.value = true
        isPlaying.value = false
        playChiptune('hit')
        if (score.value > highScore.value) {
          highScore.value = score.value
          if (typeof window !== 'undefined') {
            localStorage.setItem('byte-runner-highscore', String(score.value))
          }
        }
        draw(ctx, canvas)
        return
      }
    }

    // Remove off-screen
    if (o.x + o.w < -20) {
      if (o.type === 'bug') score.value += 1
      obstacles.splice(i, 1)
    }
  }

  // Speed up slightly over time
  gameSpeed = 3 + Math.min(3.5, score.value * 0.05)

  draw(ctx, canvas)
  animationId = requestAnimationFrame(loop)
}

function draw(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
  // Clear with retro LCD greenish-cyan matrix background
  ctx.fillStyle = '#06131c'
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  // Subtle LCD pixel grid
  ctx.strokeStyle = 'rgba(56, 189, 248, 0.06)'
  ctx.lineWidth = 1
  for (let x = 0; x < canvas.width; x += 16) {
    ctx.beginPath()
    ctx.moveTo(x, 0)
    ctx.lineTo(x, canvas.height)
    ctx.stroke()
  }

  // Ground line
  ctx.strokeStyle = '#38bdf8'
  ctx.lineWidth = 2
  ctx.beginPath()
  ctx.moveTo(0, groundY)
  ctx.lineTo(canvas.width, groundY)
  ctx.stroke()

  // Ground dashed baseline
  ctx.fillStyle = '#0e2b3d'
  ctx.fillRect(0, groundY + 2, canvas.width, canvas.height - groundY)

  // Draw Player (Pixel character)
  ctx.fillStyle = '#38bdf8'
  // Head
  ctx.fillRect(player.x + 3, player.y, 12, 8)
  // Eye visor
  ctx.fillStyle = '#f8fafc'
  ctx.fillRect(player.x + 9, player.y + 2, 4, 3)
  // Torso
  ctx.fillStyle = '#0284c7'
  ctx.fillRect(player.x + 4, player.y + 8, 10, 8)
  // Legs (running animation)
  ctx.fillStyle = '#38bdf8'
  const step = Math.floor(Date.now() / 120) % 2
  if (player.grounded) {
    if (step === 0) {
      ctx.fillRect(player.x + 3, player.y + 16, 4, 6)
      ctx.fillRect(player.x + 11, player.y + 16, 4, 4)
    } else {
      ctx.fillRect(player.x + 3, player.y + 16, 4, 4)
      ctx.fillRect(player.x + 11, player.y + 16, 4, 6)
    }
  } else {
    // Jump pose
    ctx.fillRect(player.x + 2, player.y + 15, 5, 4)
    ctx.fillRect(player.x + 11, player.y + 15, 5, 4)
  }

  // Draw obstacles
  for (const o of obstacles) {
    if (o.collected) continue
    if (o.type === 'gem') {
      // TypeScript Gem (Diamond shape)
      ctx.fillStyle = '#38bdf8'
      ctx.beginPath()
      ctx.moveTo(o.x + o.w / 2, o.y)
      ctx.lineTo(o.x + o.w, o.y + o.h / 2)
      ctx.lineTo(o.x + o.w / 2, o.y + o.h)
      ctx.lineTo(o.x, o.y + o.h / 2)
      ctx.closePath()
      ctx.fill()
      ctx.fillStyle = '#f8fafc'
      ctx.fillRect(o.x + 4, o.y + 4, 4, 4)
    } else {
      // Software Bug (pixel insect)
      ctx.fillStyle = '#f43f5e'
      ctx.fillRect(o.x + 2, o.y + 3, 10, 10)
      // Antennas
      ctx.fillRect(o.x, o.y, 2, 3)
      ctx.fillRect(o.x + 12, o.y, 2, 3)
      // Legs
      ctx.fillRect(o.x - 1, o.y + 13, 3, 4)
      ctx.fillRect(o.x + 12, o.y + 13, 3, 4)
    }
  }

  // Draw HUD inside game canvas
  ctx.fillStyle = '#38bdf8'
  ctx.font = '10px monospace'
  ctx.fillText(`SCORE: ${score.value}`, 12, 18)
  ctx.fillText(`HI: ${highScore.value}`, canvas.width - 65, 18)

  // Game over overlay
  if (gameOver.value) {
    ctx.fillStyle = 'rgba(6, 19, 28, 0.85)'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = '#f43f5e'
    ctx.font = 'bold 14px monospace'
    ctx.textAlign = 'center'
    ctx.fillText('BUG CAUGHT — GAME OVER', canvas.width / 2, canvas.height / 2 - 10)
    ctx.fillStyle = '#38bdf8'
    ctx.font = '10px monospace'
    ctx.fillText('PRESS [A] OR CLICK TO RETRY', canvas.width / 2, canvas.height / 2 + 15)
    ctx.textAlign = 'left'
  } else if (!isPlaying.value) {
    ctx.fillStyle = 'rgba(6, 19, 28, 0.75)'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = '#38bdf8'
    ctx.font = 'bold 12px monospace'
    ctx.textAlign = 'center'
    ctx.fillText('★ BYTE RUNNER 8-BIT ★', canvas.width / 2, canvas.height / 2 - 12)
    ctx.fillStyle = '#94a3b8'
    ctx.font = '10px monospace'
    ctx.fillText('TAP [A] / JUMP TO START', canvas.width / 2, canvas.height / 2 + 12)
    ctx.textAlign = 'left'
  }
}

// Key listener for retro gameplay
function handleKeyDown(e: KeyboardEvent) {
  if (mode.value !== 'game') return
  if (e.code === 'Space' || e.code === 'ArrowUp' || e.code === 'KeyW') {
    e.preventDefault()
    jump()
  }
}

onMounted(() => {
  initGame()
  if (canvasRef.value) {
    canvasRef.value.width = 380
    canvasRef.value.height = 180
    const ctx = canvasRef.value.getContext('2d')
    if (ctx) draw(ctx, canvasRef.value)
  }
  window.addEventListener('keydown', handleKeyDown)
})

onUnmounted(() => {
  if (animationId) cancelAnimationFrame(animationId)
  if (typeof window !== 'undefined') {
    window.removeEventListener('keydown', handleKeyDown)
  }
})

// Active project for cartridge view
const activeCart = ref(projects[0])
</script>

<template>
  <div class="relative mx-auto w-full max-w-2xl select-none">
    <!-- Top Cartridge Ridge -->
    <div class="mx-auto flex w-48 items-center justify-between rounded-t-xl border-t-2 border-x-2 border-cyan-500/30 bg-slate-900/90 px-4 py-1.5 font-mono text-[9px] text-cyan-400">
      <span class="flex items-center gap-1.5">
        <Disc3 class="size-3 text-cyan-400 animate-spin" />
        <span>CART: SROKNH.ROM</span>
      </span>
      <span class="text-cyan-300">1996_VER</span>
    </div>

    <!-- Main Game Boy Shell Chassis -->
    <div class="relative overflow-hidden rounded-3xl border-2 border-cyan-400/40 bg-gradient-to-b from-slate-900 via-slate-950 to-[#070b14] p-5 sm:p-7 shadow-[0_24px_60px_rgba(0,0,0,0.7)]">
      <!-- Ambient CRT scanline overlay -->
      <div class="bg-scanlines pointer-events-none absolute inset-0 opacity-15" />

      <!-- Top Handheld Bar: Power LED + Brand + Speaker Toggle -->
      <div class="mb-4 flex items-center justify-between border-b border-cyan-500/20 pb-3">
        <div class="flex items-center gap-2">
          <!-- Power LED -->
          <span class="relative flex size-2.5">
            <span class="absolute inline-flex size-full animate-ping rounded-full bg-cyan-400 opacity-75" />
            <span class="relative inline-flex size-2.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#38bdf8]" />
          </span>
          <span class="font-mono text-xs font-bold tracking-wider text-cyan-300">
            SONGHA BOY <span class="text-sky-400 font-light">COLOR</span>
          </span>
        </div>

        <!-- Mode Switcher Tabs -->
        <div class="flex items-center gap-1 font-mono text-xs">
          <button
            type="button"
            class="rounded-md px-2.5 py-1 transition-all"
            :class="mode === 'game'
              ? 'bg-cyan-500/25 border border-cyan-400/60 text-cyan-200 shadow-[0_0_8px_rgba(56,189,248,0.3)]'
              : 'text-muted-foreground hover:text-cyan-300'"
            @click="mode = 'game'; playChiptune('click')"
          >
            <span class="flex items-center gap-1">
              <Gamepad2 class="size-3.5" />
              <span class="hidden sm:inline">Play</span> Game
            </span>
          </button>

          <button
            type="button"
            class="rounded-md px-2.5 py-1 transition-all"
            :class="mode === 'stats'
              ? 'bg-cyan-500/25 border border-cyan-400/60 text-cyan-200 shadow-[0_0_8px_rgba(56,189,248,0.3)]'
              : 'text-muted-foreground hover:text-cyan-300'"
            @click="mode = 'stats'; playChiptune('click')"
          >
            <span class="flex items-center gap-1">
              <User class="size-3.5" />
              <span>RPG Stats</span>
            </span>
          </button>

          <button
            type="button"
            class="rounded-md px-2.5 py-1 transition-all"
            :class="mode === 'cartridge'
              ? 'bg-cyan-500/25 border border-cyan-400/60 text-cyan-200 shadow-[0_0_8px_rgba(56,189,248,0.3)]'
              : 'text-muted-foreground hover:text-cyan-300'"
            @click="mode = 'cartridge'; playChiptune('click')"
          >
            <span class="flex items-center gap-1">
              <Sparkles class="size-3.5" />
              <span>Quests</span>
            </span>
          </button>

          <!-- Audio Sound Chip Toggle -->
          <button
            type="button"
            class="ml-2 rounded-lg border border-cyan-500/30 bg-cyan-950/40 p-1.5 text-cyan-300 hover:text-cyan-100 transition-colors"
            :title="soundEnabled ? 'Mute 8-bit Audio' : 'Enable 8-bit Audio'"
            @click="soundEnabled = !soundEnabled; if(soundEnabled) playChiptune('coin')"
          >
            <component :is="soundEnabled ? Volume2 : VolumeX" class="size-3.5" />
          </button>
        </div>
      </div>

      <!-- ============================================================== -->
      <!-- SCREEN BEZEL + LCD RETRO DISPLAY                                -->
      <!-- ============================================================== -->
      <div class="relative overflow-hidden rounded-2xl border-4 border-slate-800 bg-[#040811] p-3 shadow-inner">
        <!-- MODE 1: PLAYABLE BYTE RUNNER 8-BIT GAME -->
        <div v-show="mode === 'game'" class="relative flex flex-col items-center">
          <canvas
            ref="canvasRef"
            class="w-full max-w-full rounded-lg cursor-pointer"
            style="aspect-ratio: 380/180; touch-action: none;"
            @click="jump"
          />
          <div class="mt-2 flex w-full items-center justify-between font-mono text-[11px] text-cyan-400/80 px-1">
            <span>[A] or SPACE to Jump · Dodge Bugs · Grab Gems</span>
            <button
              v-if="!isPlaying || gameOver"
              type="button"
              class="inline-flex items-center gap-1 text-cyan-300 hover:text-cyan-100 font-semibold"
              @click="startGame"
            >
              <Play class="size-3" />
              <span>START GAME</span>
            </button>
          </div>
        </div>

        <!-- MODE 2: CHILDHOOD RPG CHARACTER STATUS SCREEN -->
        <div v-show="mode === 'stats'" class="font-mono text-xs sm:text-[13px] leading-relaxed text-slate-200 p-2 sm:p-4">
          <div class="flex items-start justify-between border-b border-cyan-500/25 pb-3">
            <div>
              <div class="flex items-center gap-2">
                <span class="font-bold text-cyan-400 text-sm sm:text-base">SONGHA</span>
                <span class="rounded bg-cyan-950 px-1.5 py-0.5 text-[10px] text-cyan-300 border border-cyan-500/30">LVL 22</span>
              </div>
              <p class="text-muted-foreground text-xs mt-0.5">CLASS: SOFTWARE ENGINEER</p>
            </div>
            <div class="text-right text-[11px] text-cyan-300">
              <p>GUILD: T.O GROUP &amp; EKYC</p>
              <p class="text-muted-foreground">STATUS: FRONT-END INTERN</p>
            </div>
          </div>

          <!-- RPG Stats Bars -->
          <div class="mt-4 grid gap-3 sm:grid-cols-2">
            <div>
              <div class="flex justify-between text-[11px] text-cyan-300 mb-1">
                <span>HP: CLEAN ARCHITECTURE</span>
                <span>100 / 100</span>
              </div>
              <div class="h-2 w-full rounded-full bg-slate-800 overflow-hidden">
                <div class="h-full bg-cyan-400 shadow-[0_0_8px_#38bdf8] w-full" />
              </div>
            </div>

            <div>
              <div class="flex justify-between text-[11px] text-sky-300 mb-1">
                <span>MP: STRICT TYPESCRIPT</span>
                <span>99 / 99</span>
              </div>
              <div class="h-2 w-full rounded-full bg-slate-800 overflow-hidden">
                <div class="h-full bg-sky-400 shadow-[0_0_8px_#38bdf8] w-full" />
              </div>
            </div>
          </div>

          <!-- Active Quests & Relics -->
          <div class="mt-4 border-t border-cyan-500/20 pt-3 text-xs">
            <span class="text-cyan-400 font-semibold block mb-1">FLAGSHIP BOSS RELIC:</span>
            <p class="text-slate-300">
              <a href="https://sroknh.com" target="_blank" class="text-cyan-300 underline hover:text-cyan-100">Roomie (ស្រុកខ្ញុំ)</a>
              — Shipped nationwide rental engine mapping all 25 provinces in Cambodia.
            </p>
          </div>

          <div class="mt-3 flex flex-wrap gap-1.5">
            <span
              v-for="skill in ['Vue 3', 'Nuxt 4', 'React 19', 'Next.js', 'TypeScript', 'Cloudflare Workers', 'Supabase', 'Leaflet']"
              :key="skill"
              class="rounded border border-cyan-500/20 bg-cyan-950/40 px-2 py-0.5 font-mono text-[10px] text-cyan-200"
            >
              + {{ skill }}
            </span>
          </div>
        </div>

        <!-- MODE 3: PROJECT CARTRIDGE INVENTORY -->
        <div v-show="mode === 'cartridge'" class="p-2 sm:p-4 font-mono text-xs text-slate-200">
          <div class="flex items-center justify-between border-b border-cyan-500/25 pb-2.5">
            <span class="font-bold text-cyan-400">SELECT CARTRIDGE:</span>
            <span class="text-[11px] text-muted-foreground">{{ projects.length }} CARTS INSERTED</span>
          </div>

          <div class="mt-3 flex gap-2 overflow-x-auto pb-2">
            <button
              v-for="p in projects.slice(0, 4)"
              :key="p.slug"
              type="button"
              class="shrink-0 rounded-lg border px-3 py-1.5 text-left transition-all"
              :class="activeCart?.slug === p.slug
                ? 'border-cyan-400 bg-cyan-950/70 text-cyan-200 shadow-[0_0_10px_rgba(56,189,248,0.25)]'
                : 'border-border/60 bg-slate-900/40 text-muted-foreground hover:text-foreground'"
              @click="activeCart = p; playChiptune('click')"
            >
              <div class="font-semibold text-xs">{{ p.title.split('(')[0] }}</div>
              <div class="text-[10px] opacity-75">{{ p.year }} · {{ p.tags[0] }}</div>
            </button>
          </div>

          <div v-if="activeCart" class="mt-3 rounded-xl border border-cyan-500/20 bg-slate-950/60 p-3">
            <h4 class="font-bold text-sm text-cyan-300">{{ activeCart.title }}</h4>
            <p class="text-muted-foreground text-xs mt-1 leading-relaxed">{{ activeCart.tagline }}</p>
            <div class="mt-2.5 flex items-center justify-between pt-2 border-t border-border/40">
              <span class="text-cyan-400 text-[11px]">ROLE: {{ activeCart.role }}</span>
              <NuxtLink :to="`/work/${activeCart.slug}`" class="text-cyan-300 underline text-[11px] hover:text-cyan-100">
                View Quest Walkthrough ↗
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>

      <!-- ============================================================== -->
      <!-- PHYSICAL CONSOLE CONTROLS (TACTILE D-PAD + A/B BUTTONS)        -->
      <!-- ============================================================== -->
      <div class="mt-6 flex items-center justify-between px-2 sm:px-6">
        <!-- D-PAD CONTROLLER -->
        <div class="relative flex size-24 items-center justify-center">
          <!-- Cross shape background -->
          <div class="absolute size-24 rounded-lg bg-slate-950/80 shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)]" />

          <!-- Up Button -->
          <button
            type="button"
            class="absolute top-0 size-8 rounded-t bg-slate-800 hover:bg-slate-700 active:bg-cyan-900 active:translate-y-0.5 text-cyan-400 flex items-center justify-center shadow-md transition-transform"
            aria-label="D-Pad Up"
            @click="jump(); playChiptune('click')"
          >
            ▲
          </button>

          <!-- Left Button -->
          <button
            type="button"
            class="absolute left-0 size-8 rounded-l bg-slate-800 hover:bg-slate-700 active:bg-cyan-900 active:-translate-x-0.5 text-cyan-400 flex items-center justify-center shadow-md transition-transform"
            aria-label="D-Pad Left"
            @click="playChiptune('click')"
          >
            ◀
          </button>

          <!-- Center Pivot -->
          <div class="size-8 bg-slate-800" />

          <!-- Right Button -->
          <button
            type="button"
            class="absolute right-0 size-8 rounded-r bg-slate-800 hover:bg-slate-700 active:bg-cyan-900 active:translate-x-0.5 text-cyan-400 flex items-center justify-center shadow-md transition-transform"
            aria-label="D-Pad Right"
            @click="playChiptune('click')"
          >
            ▶
          </button>

          <!-- Down Button -->
          <button
            type="button"
            class="absolute bottom-0 size-8 rounded-b bg-slate-800 hover:bg-slate-700 active:bg-cyan-900 active:translate-y-0.5 text-cyan-400 flex items-center justify-center shadow-md transition-transform"
            aria-label="D-Pad Down"
            @click="playChiptune('click')"
          >
            ▼
          </button>
        </div>

        <!-- Center: SELECT & START PILLS -->
        <div class="flex flex-col items-center gap-2">
          <div class="flex items-center gap-4">
            <!-- SELECT -->
            <div class="flex flex-col items-center">
              <button
                type="button"
                class="h-3 w-10 -rotate-25 rounded-full bg-slate-800 shadow-md hover:bg-slate-700 active:translate-y-0.5"
                aria-label="Select Button"
                @click="mode = mode === 'game' ? 'stats' : mode === 'stats' ? 'cartridge' : 'game'; playChiptune('click')"
              />
              <span class="mt-2 font-mono text-[9px] text-muted-foreground uppercase">SELECT</span>
            </div>

            <!-- START -->
            <div class="flex flex-col items-center">
              <button
                type="button"
                class="h-3 w-10 -rotate-25 rounded-full bg-slate-800 shadow-md hover:bg-slate-700 active:translate-y-0.5"
                aria-label="Start Button"
                @click="if (mode === 'game') startGame(); else mode = 'game'; playChiptune('start')"
              />
              <span class="mt-2 font-mono text-[9px] text-muted-foreground uppercase">START</span>
            </div>
          </div>
        </div>

        <!-- A / B ACTION BUTTONS -->
        <div class="flex items-center gap-3">
          <!-- B Button -->
          <div class="flex flex-col items-center">
            <button
              type="button"
              class="size-11 sm:size-12 rounded-full border-2 border-slate-700 bg-slate-800 text-slate-300 font-mono font-bold text-sm shadow-[0_4px_10px_rgba(0,0,0,0.5)] transition-all hover:bg-slate-700 active:translate-y-1 active:shadow-none"
              aria-label="Button B"
              @click="mode = 'cartridge'; playChiptune('click')"
            >
              B
            </button>
            <span class="mt-1 font-mono text-[10px] text-muted-foreground">QUESTS</span>
          </div>

          <!-- A Button -->
          <div class="flex flex-col items-center -translate-y-3">
            <button
              type="button"
              class="size-11 sm:size-12 rounded-full border-2 border-cyan-400 bg-cyan-400 text-slate-950 font-mono font-bold text-sm shadow-[0_4px_16px_rgba(56,189,248,0.4)] transition-all hover:bg-cyan-300 active:translate-y-1 active:shadow-none"
              aria-label="Button A (Jump / Action)"
              @click="jump"
            >
              A
            </button>
            <span class="mt-1 font-mono text-[10px] text-cyan-300 font-semibold">JUMP</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>