<script setup lang="ts">
/**
 * TextScramble.vue
 *
 * 1970s Phosphor Terminal Text Decryption Animation.
 * Scrambles characters through retro computer glyphs (█, ░, ▒, ▓, #, $, 0, 1, X)
 * before locking into the target text. Triggered on entrance or hover.
 */

interface Props {
  text: string
  trigger?: 'mount' | 'hover' | 'scroll'
  speed?: number
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  trigger: 'mount',
  speed: 35,
  class: '',
})

const glyphs = '█░▒▓#$&*<>0123456789ABCDEFXYZ+-_/\\'
const displayText = ref(props.text)
const el = ref<HTMLElement | null>(null)
let frameRequest: number | null = null
let iteration = 0

function scramble() {
  if (frameRequest) cancelAnimationFrame(frameRequest)
  iteration = 0
  const original = props.text
  const length = original.length

  const run = () => {
    let output = ''
    let complete = 0

    for (let i = 0; i < length; i++) {
      if (original[i] === ' ') {
        output += ' '
        complete++
        continue
      }

      if (i < iteration) {
        output += original[i]
        complete++
      } else {
        const randIndex = Math.floor(Math.random() * glyphs.length)
        output += glyphs[randIndex]
      }
    }

    displayText.value = output

    if (complete < length) {
      iteration += 1 / 2
      frameRequest = requestAnimationFrame(run)
    } else {
      displayText.value = original
    }
  }

  frameRequest = requestAnimationFrame(run)
}

onMounted(() => {
  if (props.trigger === 'mount') {
    scramble()
  } else if (props.trigger === 'scroll' && el.value) {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0]?.isIntersecting) {
        scramble()
        observer.disconnect()
      }
    }, { threshold: 0.2 })
    observer.observe(el.value)
    onUnmounted(() => observer.disconnect())
  }
})

onUnmounted(() => {
  if (frameRequest) cancelAnimationFrame(frameRequest)
})

watch(() => props.text, () => scramble())
</script>

<template>
  <span
    ref="el"
    :class="props.class"
    @mouseenter="trigger === 'hover' && scramble()"
  >
    {{ displayText }}
  </span>
</template>
