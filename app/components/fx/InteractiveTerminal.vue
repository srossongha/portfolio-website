<script setup lang="ts">
/**
 * InteractiveTerminal.vue
 *
 * Full-featured interactive 1970s Commodore PET-2001 / DEC VT100 CLI Shell.
 * Supports command input, execution, matrix digital rain, audio chirps,
 * and quick-action chips for mobile devices.
 */

import { X, Terminal, Volume2, VolumeX, Maximize2, Minimize2 } from '@lucide/vue'
import { profile, projects, skillGroups } from '~/data/site'

const open = defineModel<boolean>('open', { default: false })
const soundEnabled = ref(false)
const isMaximized = ref(false)
const inputEl = ref<HTMLInputElement | null>(null)
const outputContainer = ref<HTMLElement | null>(null)

interface TerminalLine {
  type: 'system' | 'input' | 'output' | 'error' | 'success' | 'matrix'
  text: string
  link?: string
}

function getLoginBanner() {
  const now = new Date()
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const day = days[now.getDay()]
  const month = months[now.getMonth()]
  const date = String(now.getDate())
  const hours = String(now.getHours()).padStart(2, '0')
  const mins = String(now.getMinutes()).padStart(2, '0')
  const secs = String(now.getSeconds()).padStart(2, '0')
  return `Last login: ${day} ${month} ${date} ${hours}:${mins}:${secs} on console`
}

const lines = ref<TerminalLine[]>([
  { type: 'system', text: 'Last login: Sat Nov 14 23:19:02 on console' },
  { type: 'system', text: '┌──────────────────────────────────────────────────────────────┐' },
  { type: 'system', text: '│ SROS SONGHA — SOFTWARE ENGINEER INTERACTIVE SHELL            │' },
  { type: 'system', text: '│ Institute of Technology of Cambodia (ITC) · Phnom Penh       │' },
  { type: 'system', text: '│ Session active. Type "help" or select a chip to explore.     │' },
  { type: 'system', text: '└──────────────────────────────────────────────────────────────┘' },
])

onMounted(() => {
  if (lines.value[0]?.text.startsWith('Last login:')) {
    lines.value[0].text = getLoginBanner()
  }
})

const currentInput = ref('')
const history = ref<string[]>([])
let historyIndex = -1

// Synthesize 1970s terminal beep using Web Audio API
function playBeep(freq = 640, duration = 0.05) {
  if (!soundEnabled.value || typeof window === 'undefined') return
  try {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
    if (!AudioCtx) return
    const ctx = new AudioCtx()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = 'square'
    osc.frequency.setValueAtTime(freq, ctx.currentTime)
    gain.gain.setValueAtTime(0.04, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration)
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.start()
    osc.stop(ctx.currentTime + duration)
  } catch {
    // Ignore audio permission blocks
  }
}

function scrollToBottom() {
  nextTick(() => {
    if (outputContainer.value) {
      outputContainer.value.scrollTop = outputContainer.value.scrollHeight
    }
  })
}

function execute(cmdStr?: string) {
  const raw = (cmdStr ?? currentInput.value).trim()
  if (!raw) return

  lines.value.push({ type: 'input', text: `songha@macbook ~ % ${raw}` })
  history.value.push(raw)
  historyIndex = -1
  currentInput.value = ''
  playBeep(880, 0.04)

  const [cmd, ...args] = raw.toLowerCase().split(' ')

  switch (cmd) {
    case 'help':
      lines.value.push({ type: 'output', text: 'AVAILABLE TERMINAL COMMANDS:' })
      lines.value.push({ type: 'output', text: '  about        - Engineering background & university' })
      lines.value.push({ type: 'output', text: '  projects     - List production projects with links' })
      lines.value.push({ type: 'output', text: '  skills       - Print loaded ROM modules & arsenal' })
      lines.value.push({ type: 'output', text: '  cv           - Download Curriculum Vitae PDF' })
      lines.value.push({ type: 'output', text: '  contact      - Send email to sanghakh122333@gmail.com' })
      lines.value.push({ type: 'output', text: '  matrix       - Stream phosphor digital matrix rain' })
      lines.value.push({ type: 'output', text: '  clear        - Clear terminal screen' })
      break

    case 'about':
      lines.value.push({ type: 'success', text: `[ IDENTITY ]: ${profile.name} (${profile.role} · Current: Front-end Intern)` })
      lines.value.push({ type: 'output', text: `[ LOCATION ]: ${profile.location} (Phnom Penh, Cambodia)` })
      lines.value.push({ type: 'output', text: `[ ACADEMIA ]: Institute of Technology of Cambodia (ITC)` })
      lines.value.push({ type: 'output', text: profile.bio[0] || '' })
      break

    case 'projects':
      lines.value.push({ type: 'success', text: 'PRODUCTION REPOSITORIES & DEPLOYMENTS:' })
      projects.forEach((p) => {
        lines.value.push({
          type: 'output',
          text: `  * ${p.title} (${p.year}) - ${p.tagline}`,
          link: `/work/${p.slug}`,
        })
      })
      break

    case 'skills':
      lines.value.push({ type: 'success', text: 'TECHNICAL ARSENAL ROM BANKS:' })
      skillGroups.forEach((g) => {
        const itemNames = g.items.map((i) => `${i.name} [${i.level}%]`).join(', ')
        lines.value.push({ type: 'output', text: `  [${g.title.toUpperCase()}]: ${itemNames}` })
      })
      break

    case 'cv':
    case 'resume':
      lines.value.push({ type: 'success', text: 'Initiating download: SROS Songha.pdf...' })
      if (typeof window !== 'undefined') {
        const a = document.createElement('a')
        a.href = profile.cvUrl
        a.download = 'SROS Songha.pdf'
        a.target = '_blank'
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
      }
      break

    case 'contact':
    case 'email':
      lines.value.push({ type: 'success', text: `Opening mail client for ${profile.email}...` })
      if (typeof window !== 'undefined') {
        window.location.href = `mailto:${profile.email}`
      }
      break

    case 'matrix':
      lines.value.push({ type: 'matrix', text: '01010011 01010010 01001111 01010011 // STREAMING PHOSPHOR MATRIX...' })
      for (let i = 0; i < 5; i++) {
        const stream = Array.from({ length: 48 }, () => Math.random() > 0.5 ? '1' : '0').join('')
        lines.value.push({ type: 'matrix', text: stream })
      }
      break

    case 'clear':
    case 'cls':
      lines.value = []
      break

    default:
      lines.value.push({
        type: 'error',
        text: `?SYNTAX ERROR: Command "${cmd}" not recognized. Type "help" for syntax.`,
      })
      playBeep(240, 0.12)
      break
  }

  scrollToBottom()
}

function handleKeydown(e: KeyboardEvent) {
  if (e.key === 'Enter') {
    execute()
  } else if (e.key === 'ArrowUp') {
    e.preventDefault()
    if (history.value.length && historyIndex < history.value.length - 1) {
      historyIndex++
      currentInput.value = history.value[history.value.length - 1 - historyIndex] ?? ''
    }
  } else if (e.key === 'ArrowDown') {
    e.preventDefault()
    if (historyIndex > 0) {
      historyIndex--
      currentInput.value = history.value[history.value.length - 1 - historyIndex] ?? ''
    } else if (historyIndex === 0) {
      historyIndex = -1
      currentInput.value = ''
    }
  }
}

watch(open, (isOpen) => {
  if (isOpen) {
    nextTick(() => {
      inputEl.value?.focus()
      scrollToBottom()
    })
  }
})
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      leave-active-class="transition-all duration-200 ease-in"
      enter-from-class="opacity-0 scale-95"
      leave-to-class="opacity-0 scale-95"
    >
      <div
        v-if="open"
        class="fixed inset-0 z-100 flex items-center justify-center p-3 sm:p-6 backdrop-blur-xl bg-black/75"
        role="dialog"
        aria-modal="true"
        aria-label="Developer Terminal Console"
      >
        <!-- macOS Terminal Window Shell Box -->
        <div
          class="relative flex w-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0c1017]/95 shadow-[0_25px_60px_rgba(0,0,0,0.65)] backdrop-blur-2xl transition-all duration-300"
          :class="isMaximized ? 'h-[95vh] max-w-5xl' : 'h-[85vh] max-h-[640px] max-w-2xl'"
        >
          <!-- Terminal Title Bar (macOS Window Chrome) -->
          <div class="relative flex items-center justify-between border-b border-white/10 bg-slate-900/80 px-4 py-2.5 backdrop-blur-md">
            <!-- macOS Traffic Light Window Controls -->
            <div class="flex items-center gap-2">
              <button
                type="button"
                class="group relative size-3 rounded-full bg-[#ff5f56] border border-[#e0443e] flex items-center justify-center transition-transform hover:scale-105 cursor-pointer shadow-sm"
                title="Close Window (Esc)"
                @click="open = false"
              >
                <X class="size-2 text-black/80 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
              <button
                type="button"
                class="group relative size-3 rounded-full bg-[#ffbd2e] border border-[#dea123] flex items-center justify-center transition-transform hover:scale-105 cursor-pointer shadow-sm"
                title="Clear Terminal"
                @click="execute('clear')"
              >
                <span class="w-1.5 h-0.5 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
              <button
                type="button"
                class="group relative size-3 rounded-full bg-[#27c93f] border border-[#1aab29] flex items-center justify-center transition-transform hover:scale-105 cursor-pointer shadow-sm"
                title="Toggle Fullscreen"
                @click="isMaximized = !isMaximized"
              >
                <component :is="isMaximized ? Minimize2 : Maximize2" class="size-2 text-black/80 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            </div>

            <!-- macOS Window Centered Title -->
            <div class="absolute left-1/2 -translate-x-1/2 flex items-center gap-1.5 pointer-events-none">
              <span class="font-mono text-xs font-medium text-slate-300">
                songha — -zsh — 80×24
              </span>
            </div>

            <!-- Audio Chirp Toggle Button -->
            <div class="flex items-center gap-2">
              <button
                type="button"
                class="rounded p-1 text-slate-400 hover:text-cyan-300 transition-colors"
                :title="soundEnabled ? 'Mute Beeps' : 'Enable Beeps'"
                @click="soundEnabled = !soundEnabled"
              >
                <component :is="soundEnabled ? Volume2 : VolumeX" class="size-3.5" />
              </button>
            </div>
          </div>

          <!-- Terminal Output Scroll Window -->
          <div
            ref="outputContainer"
            class="relative flex-1 overflow-y-auto p-4 font-mono text-xs leading-relaxed space-y-1.5 scrollbar-thin"
          >
            <div
              v-for="(line, idx) in lines"
              :key="idx"
              :class="{
                'text-cyan-400/80': line.type === 'system',
                'text-cyan-300 font-semibold': line.type === 'input',
                'text-slate-200': line.type === 'output',
                'text-cyan-400 font-medium': line.type === 'success',
                'text-red-400': line.type === 'error',
                'text-cyan-300 font-mono tracking-widest text-[10px]': line.type === 'matrix',
              }"
            >
              <NuxtLink
                v-if="line.link"
                :to="line.link"
                class="underline hover:text-cyan-300"
                @click="open = false"
              >
                {{ line.text }} ↗
              </NuxtLink>
              <span v-else>{{ line.text }}</span>
            </div>
          </div>

          <!-- Quick-Command Chips -->
          <div class="relative border-t border-white/5 bg-slate-900/40 px-4 py-2 flex flex-wrap gap-1.5">
            <span class="font-mono text-[10px] uppercase tracking-wider text-slate-400 mr-1 self-center">EXEC:</span>
            <button
              v-for="chip in ['help', 'about', 'projects', 'skills', 'cv', 'matrix', 'clear']"
              :key="chip"
              type="button"
              class="rounded border border-cyan-500/25 bg-slate-950/80 px-2.5 py-0.5 font-mono text-xs text-cyan-300 hover:border-cyan-400 hover:bg-cyan-950/50 transition-colors cursor-pointer"
              @click="execute(chip)"
            >
              {{ chip }}
            </button>
          </div>

          <!-- Input Bar with Blinking macOS Block Cursor -->
          <div class="relative flex items-center border-t border-white/10 bg-black/60 px-4 py-3">
            <span class="font-mono text-xs text-cyan-400 font-bold mr-2 select-none">songha@macbook ~ %</span>
            <input
              ref="inputEl"
              v-model="currentInput"
              type="text"
              class="flex-1 bg-transparent font-mono text-xs text-cyan-200 outline-none caret-transparent placeholder:text-slate-600"
              placeholder="Type command ('help', 'projects', 'cv')..."
              autocomplete="off"
              autocorrect="off"
              autocapitalize="off"
              spellcheck="false"
              @keydown="handleKeydown"
            />
            <span class="crt-cursor inline-block text-white font-bold ml-1">█</span>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
