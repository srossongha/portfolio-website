<script setup lang="ts">
import { ArrowUp } from '@lucide/vue'
import { navLinks, profile, socials } from '~/data/site'

const { scrollTo } = useSmoothScroll()
const year = new Date().getFullYear()

/** A live clock in the visitor's timezone — a small sign of a real person. */
const time = ref('')
onMounted(() => {
  const update = () => {
    time.value = new Date().toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
    })
  }
  update()
  const id = setInterval(update, 1000 * 30)
  onUnmounted(() => clearInterval(id))
})
</script>

<template>
  <footer class="relative border-t border-dashed border-border/80 bg-background/90 pt-4">
    <!-- Halftone retro dots background -->
    <div class="bg-retro-dots pointer-events-none absolute inset-0 opacity-20" aria-hidden="true" />

    <!-- Oversized wordmark bleeding off the bottom edge in Fraunces serif -->
    <div class="pointer-events-none absolute inset-x-0 bottom-0 overflow-hidden select-none" aria-hidden="true">
      <p class="text-foreground/4 translate-y-[22%] text-center font-serif text-[clamp(5rem,22vw,20rem)] leading-none tracking-tight">
        {{ profile.name }}
      </p>
    </div>

    <!-- gutter + pb-safe -->
    <div class="gutter pb-safe relative mx-auto max-w-350 pt-16" style="--pb-safe: 4rem">
      <div class="flex flex-col gap-12 md:flex-row md:justify-between">
        <!-- Left: availability + email -->
        <div class="max-w-md">
          <div class="mb-5 flex flex-wrap items-center gap-3">
            <Badge variant="live" class="border-cyan-500/30 bg-cyan-950/40 text-cyan-300 shadow-[0_0_12px_rgba(56,189,248,0.2)]">
              <span class="relative flex size-1.5">
                <span class="bg-cyan-400 absolute inline-flex size-full animate-ping rounded-full opacity-70" />
                <span class="bg-cyan-400 relative inline-flex size-1.5 rounded-full shadow-[0_0_6px_#38bdf8]" />
              </span>
              {{ profile.availability }}
            </Badge>
            <span class="rounded-xs border border-cyan-500/30 bg-cyan-950/40 px-2 py-0.5 font-pixel text-[8px] tracking-wider text-cyan-300 uppercase">
              [ STATION // PHNOM_PENH ]
            </span>
          </div>

          <a
            :href="`mailto:${profile.email}`"
            class="group block font-serif text-3xl font-medium tracking-tight break-all text-foreground sm:text-4xl"
            data-cursor-label="Email"
          >
            <span class="bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-500 [background-size:0%_2px] bg-bottom bg-no-repeat transition-[background-size] duration-500 group-hover:[background-size:100%_2px]">
              {{ profile.email }}
            </span>
          </a>

          <p class="text-muted-foreground mt-4 font-mono text-xs">
            {{ profile.location }} — <ClientOnly>{{ time }}<template #fallback>--:--</template></ClientOnly> · UTC+7 Timezone
          </p>
        </div>

        <!-- Right: link columns -->
        <div class="flex gap-12 sm:gap-20">
          <nav aria-label="Footer">
            <h2 class="text-cyan-400 mb-4 font-pixel text-[9px] tracking-[0.2em] uppercase font-semibold">
              [ 01 // SITEMAP ]
            </h2>
            <ul class="space-y-2.5">
              <li v-for="link in navLinks" :key="link.to">
                <NuxtLink
                  :to="link.to"
                  class="text-muted-foreground hover:text-cyan-300 text-sm transition-colors"
                >
                  {{ link.label }}
                </NuxtLink>
              </li>
            </ul>
          </nav>

          <div>
            <h2 class="text-cyan-400 mb-4 font-pixel text-[9px] tracking-[0.2em] uppercase font-semibold">
              [ 02 // NETWORKS ]
            </h2>
            <ul class="space-y-2.5">
              <li v-for="social in socials" :key="social.href">
                <a
                  :href="social.href"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-muted-foreground hover:text-cyan-300 inline-flex items-center gap-1.5 text-sm transition-colors"
                >
                  {{ social.label }}
                  <span class="text-[9px] opacity-60">↗</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Bottom bar styled as dispatch receipt -->
      <div class="border-border/60 mt-16 flex flex-col-reverse gap-4 border-t border-dashed pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p class="text-muted-foreground font-mono text-[11px] flex items-center gap-2">
          <span class="size-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_#38bdf8]" />
          <span>© {{ year }} {{ profile.name }}. [ READY. // 1977_VT100 ]</span>
        </p>

        <Button
          variant="ghost"
          size="sm"
          class="retro-btn text-muted-foreground hover:text-cyan-300 -ml-2 gap-2 self-start rounded-full border border-border/80 bg-card/60 sm:ml-0 sm:self-auto font-pixel text-[9px]"
          @click="scrollTo(0)"
        >
          <ArrowUp class="size-3.5 text-cyan-400" />
          [ TOP // RETURN ]
        </Button>
      </div>
    </div>
  </footer>
</template>
