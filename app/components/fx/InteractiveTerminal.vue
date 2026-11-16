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

  lines.value.push({ type: 'input', text: `> ${raw}` })
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
        <!-- CRT Monitor Shell Box -->
        <div class="relative flex h-[85vh] max-h-[640px] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border-2 border-cyan-400/50 bg-[#060a12] shadow-[0_0_50px_rgba(56,189,248,0.3)]">
          <!-- CRT Scanlines overlay -->
          <div class="bg-scanlines pointer-events-none absolute inset-0 opacity-25" />

          <!-- Terminal Title Bar -->
          <div class="relative flex items-center justify-between border-b border-cyan-500/30 bg-cyan-950/40 px-4 py-2.5">
            <div class="flex items-center gap-2">
              <span class="size-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#38bdf8]" />
              <span class="font-mono text-xs font-semibold tracking-wider text-cyan-300 uppercase">
                SONGHA_DEV // INTERACTIVE_CLI
              </span>
            </div>

            <div class="flex items-center gap-2">
              <button
                type="button"
                class="rounded p-1 text-cyan-400 hover:text-cyan-200 transition-colors"
                :title="soundEnabled ? 'Mute Beeps' : 'Enable Beeps'"
                @click="soundEnabled = !soundEnabled"
              >
                <component :is="soundEnabled ? Volume2 : VolumeX" class="size-3.5" />
              </button>

              <button
                type="button"
                class="rounded p-1 text-cyan-400 hover:text-cyan-200 transition-colors"
                @click="open = false"
              >
                <X class="size-4" />
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
                'text-cyan-400/70': line.type === 'system',
                'text-cyan-300 font-semibold': line.type === 'input',
                'text-slate-200': line.type === 'output',
                'text-cyan-400 crt-glow': line.type === 'success',
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

          <!-- Mobile Quick-Command Chips -->
          <div class="relative border-t border-cyan-500/20 bg-cyan-950/20 px-4 py-2 flex flex-wrap gap-1.5">
            <span class="font-mono text-[10px] uppercase tracking-wider text-cyan-400/80 mr-1 self-center">EXEC:</span>
            <button
              v-for="chip in ['help', 'about', 'projects', 'skills', 'cv', 'matrix', 'clear']"
              :key="chip"
              type="button"
              class="rounded border border-cyan-400/30 bg-black/60 px-2.5 py-0.5 font-mono text-xs text-cyan-300 hover:border-cyan-400 hover:bg-cyan-950/50 transition-colors"
              @click="execute(chip)"
            >
              {{ chip }}
            </button>
          </div>

          <!-- Input Bar with Blinking Cursor -->
          <div class="relative flex items-center border-t border-cyan-500/30 bg-black/70 px-4 py-3">
            <span class="font-mono text-xs text-cyan-400 font-bold mr-2">&gt;</span>
            <input
              ref="inputEl"
              v-model="currentInput"
              type="text"
              class="flex-1 bg-transparent font-mono text-xs text-cyan-300 outline-none caret-cyan-400 placeholder:text-cyan-600/50"
              placeholder="Type command ('help', 'projects', 'cv')..."
              autocomplete="off"
              autocorrect="off"
              autocapitalize="off"
              spellcheck="false"
              @keydown="handleKeydown"
            />
            <span class="crt-cursor inline-block text-cyan-300 font-bold ml-1">█</span>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
