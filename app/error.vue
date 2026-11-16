<script setup lang="ts">
import type { NuxtError } from '#app'
import { ArrowLeft } from '@lucide/vue'

/**
 * error.vue replaces the ENTIRE app when an unhandled error is thrown —
 * it sits outside layouts, so the header and footer are gone. That is why the
 * "back home" link below matters: without it there is no way out.
 *
 * `clearError({ redirect })` resets the error state and navigates. Using a
 * plain <NuxtLink> instead would leave the error state set and immediately
 * re-render this page.
 */

defineProps<{ error: NuxtError }>()

useSeoMeta({ title: 'Page not found', robots: 'noindex' })
</script>

<template>
  <!-- min-h-dvh, not min-h-screen — see the note in layouts/default.vue. -->
  <div class="bg-background text-foreground relative flex min-h-dvh items-center overflow-hidden">
    <!-- Same visual language as the hero, so a 404 still feels like the site. -->
    <div class="bg-retro-dots mask-radial-fade absolute inset-0 opacity-40" aria-hidden="true" />
    <div class="gutter relative mx-auto w-full max-w-350">
      <p class="text-cyan-400 font-mono text-xs tracking-wider uppercase">
        [ SYSTEM_FAULT // ERROR_{{ error?.statusCode ?? 500 }} ]
      </p>

      <h1 class="mt-6 font-serif text-[clamp(2.6rem,12vw,9rem)] leading-none tracking-[-0.015em] sm:leading-[0.85] sm:tracking-[-0.04em]">
        Nothing<br >
        <span class="text-cyan-400 not-italic font-light">here.</span>
      </h1>

      <p class="text-muted-foreground mt-8 max-w-md leading-relaxed">
        {{
          error?.statusCode === 404
            ? 'That page does not exist — or it did once and I moved it. Either way, this is on me.'
            : 'Something broke on my end. Refreshing sometimes helps; if not, please tell me.'
        }}
      </p>

      <!-- The real reason for the failure, kept small. Useful when someone
           screenshots it for you, harmless otherwise. -->
      <p v-if="error?.statusMessage" class="text-muted-foreground/60 mt-3 font-mono text-xs">
        {{ error.statusMessage }}
      </p>

      <div class="mt-10 flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3">
        <Button variant="brand" size="pill" class="w-full sm:w-auto font-mono text-xs tracking-wider" @click="clearError({ redirect: '/' })">
          <ArrowLeft class="size-4" />
          Back to Home
        </Button>
        <Button variant="hairline" size="pill" class="w-full sm:w-auto font-mono text-xs tracking-wider" @click="clearError({ redirect: '/work' })">
          View Projects
        </Button>
      </div>
    </div>
  </div>
</template>
