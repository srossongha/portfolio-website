<script setup lang="ts">
import { ArrowUp } from '@lucide/vue'
import { navLinks, profile, socials } from '~/data/site'

const { scrollTo } = useSmoothScroll()
const year = new Date().getFullYear()

/** A live clock in Phnom Penh timezone */
const time = ref('')
onMounted(() => {
  const update = () => {
    time.value = new Date().toLocaleTimeString('en-US', {
      timeZone: 'Asia/Phnom_Penh',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    })
  }
  update()
  const id = setInterval(update, 1000 * 30)
  onUnmounted(() => clearInterval(id))
})
</script>

<template>
  <footer class="relative border-t border-border/60 bg-background/95 pt-8 pb-12">
    <!-- Oversized subtle wordmark -->
    <div class="pointer-events-none absolute inset-x-0 bottom-0 overflow-hidden select-none" aria-hidden="true">
      <p class="text-foreground/3 translate-y-[22%] text-center font-serif text-[clamp(5rem,22vw,20rem)] leading-none tracking-tight">
        {{ profile.name }}
      </p>
    </div>

    <div class="gutter relative mx-auto max-w-350 pt-12">
      <div class="flex flex-col gap-12 md:flex-row md:justify-between">
        <!-- Left: availability + email -->
        <div class="max-w-md">
          <div class="mb-5 flex flex-wrap items-center gap-3">
            <Badge variant="live" class="border-cyan-500/30 bg-cyan-950/40 text-cyan-300">
              <span class="relative flex size-1.5">
                <span class="bg-cyan-400 absolute inline-flex size-full animate-ping rounded-full opacity-70" />
                <span class="bg-cyan-400 relative inline-flex size-1.5 rounded-full shadow-[0_0_6px_#38bdf8]" />
              </span>
              {{ profile.availability }}
            </Badge>
            <span class="font-mono text-xs text-muted-foreground">
              Phnom Penh, Cambodia
            </span>
          </div>

          <a
            :href="`mailto:${profile.email}`"
            class="group block font-serif text-3xl font-semibold tracking-tight break-all text-foreground sm:text-4xl"
            data-cursor-label="Email"
          >
            <span class="hover:text-cyan-400 transition-colors">
              {{ profile.email }}
            </span>
          </a>

          <p class="text-muted-foreground mt-3 font-mono text-xs">
            Phnom Penh, Cambodia — <ClientOnly>{{ time }}<template #fallback>--:--</template></ClientOnly> · UTC+7 Timezone
          </p>
        </div>

        <!-- Right: link columns -->
        <div class="flex gap-12 sm:gap-20">
          <nav aria-label="Footer Navigation">
            <h2 class="text-cyan-400 mb-4 font-mono text-xs uppercase tracking-wider font-semibold">
              Navigation
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
            <h2 class="text-cyan-400 mb-4 font-mono text-xs uppercase tracking-wider font-semibold">
              Connect
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
                  <span class="text-xs opacity-60">↗</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="border-border/60 mt-16 flex flex-col-reverse gap-4 border-t border-border/40 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p class="text-muted-foreground font-mono text-xs flex items-center gap-2">
          <span class="size-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_#38bdf8]" />
          <span>© {{ year }} {{ profile.name }}. Built with Vue 3, Nuxt 4 &amp; TypeScript.</span>
        </p>

        <Button
          variant="ghost"
          size="sm"
          class="text-muted-foreground hover:text-cyan-300 -ml-2 gap-2 self-start rounded-xl border border-border/80 bg-card/60 sm:ml-0 sm:self-auto font-mono text-xs"
          @click="scrollTo(0)"
        >
          <ArrowUp class="size-3.5 text-cyan-400" />
          <span>Back to Top</span>
        </Button>
      </div>
    </div>
  </footer>
</template>