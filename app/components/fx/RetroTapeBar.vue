<script setup lang="ts">
/**
 * RetroTapeBar.vue
 *
 * Analog field recorder HUD inspired by vintage Nagra reel-to-reel decks and
 * retro cassette players. Features spinning magnetic reels, blinking REC tally,
 * live Cambodia (UTC+7) ticking clock, and active LED VU meters.
 */

const timeString = ref('')
let timer: ReturnType<typeof setInterval> | null = null

const updateClock = () => {
  const now = new Date()
  timeString.value = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Asia/Phnom_Penh',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).format(now)
}

onMounted(() => {
  updateClock()
  timer = setInterval(updateClock, 1000)
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})
</script>

<template>
  <div
    class="group/tape relative inline-flex items-center gap-3 overflow-hidden rounded-md border border-border/80 bg-card/85 px-3 py-1.5 font-mono text-[11px] shadow-[2px_2px_0_0_color-mix(in_oklch,var(--foreground)_20%,transparent)] backdrop-blur-md transition-all duration-200 select-none hover:shadow-[3px_3px_0_0_color-mix(in_oklch,var(--brand)_40%,transparent)]"
  >
    <!-- CRT / tape scanline texture -->
    <div class="bg-scanlines pointer-events-none absolute inset-0 opacity-20" aria-hidden="true" />

    <!-- Twin spinning reels -->
    <div class="relative flex items-center gap-1.5" aria-hidden="true">
      <!-- Left reel -->
      <div
        class="animate-tape-spin relative size-4 rounded-full border border-border/90 bg-muted/60 transition-transform duration-300 group-hover/tape:[animation-duration:1.5s]"
      >
        <span class="absolute inset-x-0 top-1/2 h-0.5 -translate-y-1/2 bg-foreground/35" />
        <span class="absolute inset-y-0 left-1/2 w-0.5 -translate-x-1/2 bg-foreground/35" />
        <span class="absolute inset-1 rounded-full border border-foreground/25" />
      </div>

      <!-- Magnetic tape strip connecting the hubs -->
      <span class="h-0.5 w-2 bg-foreground/40" />

      <!-- Right reel -->
      <div
        class="animate-tape-spin relative size-4 rounded-full border border-border/90 bg-muted/60 transition-transform duration-300 group-hover/tape:[animation-duration:1.5s]"
      >
        <span class="absolute inset-x-0 top-1/2 h-0.5 -translate-y-1/2 bg-foreground/35" />
        <span class="absolute inset-y-0 left-1/2 w-0.5 -translate-x-1/2 bg-foreground/35" />
        <span class="absolute inset-1 rounded-full border border-foreground/25" />
      </div>
    </div>

    <!-- Live Recording Tally Indicator -->
    <div class="flex items-center gap-1.5 pl-0.5">
      <span class="relative flex size-2">
        <span class="absolute inline-flex size-full animate-ping rounded-full bg-red-500 opacity-60" />
        <span class="relative inline-flex size-2 rounded-full bg-red-600 shadow-[0_0_6px_rgba(239,68,68,0.8)]" />
      </span>
      <span class="text-xs font-semibold tracking-wider text-red-500 uppercase">REC</span>
    </div>

    <span class="text-border">|</span>

    <!-- Live Cambodia UTC+7 Clock -->
    <div class="flex items-center gap-1 text-foreground/90">
      <span class="text-muted-foreground text-[10px]">KH</span>
      <ClientOnly>
        <span class="tabular-nums font-medium tracking-wider">{{ timeString }}</span>
        <template #fallback>
          <span class="tabular-nums font-medium tracking-wider text-muted-foreground">--:--:--</span>
        </template>
      </ClientOnly>
    </div>

    <span class="text-border">|</span>

    <!-- Bouncing LED VU Meter -->
    <div class="flex items-end gap-0.5 h-3 px-0.5" title="Analog VU Level" aria-hidden="true">
      <span class="w-1 bg-emerald-500 rounded-xs animate-vu [animation-delay:0.1s]" />
      <span class="w-1 bg-emerald-400 rounded-xs animate-vu [animation-delay:0.35s]" />
      <span class="w-1 bg-amber-400 rounded-xs animate-vu [animation-delay:0.2s]" />
      <span class="w-1 bg-red-500 rounded-xs animate-vu [animation-delay:0.5s]" />
    </div>

    <!-- Catalog stamp -->
    <span class="text-muted-foreground hidden text-[10px] tracking-wider uppercase sm:inline">
      SPECIMEN ARCHIVE
    </span>
  </div>
</template>
