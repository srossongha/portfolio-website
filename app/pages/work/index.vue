<script setup lang="ts">
import { ArrowUpRight } from '@lucide/vue'
import { projects } from '~/data/site'

/**
 * /work — the full archive, with client-side filtering.
 *
 * The filter is a plain `computed`. There is no store, no query library and no
 * fetch: the data is already in the bundle, so filtering is a synchronous array
 * operation that re-renders instantly. Reaching for state management here would
 * be pure ceremony.
 */

useSeoMeta({
  title: 'Work',
  description: 'Every project — client work, tools, and the experiments in between.',
})

/**
 * Build the filter list from the data rather than hard-coding it, so adding a
 * tag in data/site.ts automatically adds a button here.
 * `Set` removes duplicates; spreading it back gives a normal array.
 */
const allTags = computed(() => {
  const tags = new Set<string>()
  projects.forEach((p) => p.tags.forEach((t) => tags.add(t)))
  return ['All', ...Array.from(tags).sort()]
})

const activeTag = ref('All')

const filtered = computed(() =>
  activeTag.value === 'All'
    ? projects
    : projects.filter((p) => p.tags.includes(activeTag.value)),
)
</script>

<template>
  <div class="pt-28 pb-24 sm:pt-32">
    <div class="mx-auto max-w-350 px-5 sm:px-8 lg:px-12">
      <SectionHeading
        index="Archive"
        label="All work"
        title="Everything,"
        accent="including the mistakes."
        description="Client projects, personal tools and experiments that never shipped. The failures taught more."
      />

      <!-- --------------------------------------------------------- filters -->
      <div
        class="mt-12 flex flex-wrap gap-2"
        role="group"
        aria-label="Filter projects by category"
      >
        <button
          v-for="tag in allTags"
          :key="tag"
          type="button"
          class="rounded-full border px-4 py-2 text-xs transition-all duration-300 font-mono tracking-wide"
          :class="
            activeTag === tag
              ? 'border-cyan-400 bg-cyan-400 text-slate-950 font-semibold shadow-[0_0_12px_rgba(56,189,248,0.4)]'
              : 'border-border text-muted-foreground hover:border-cyan-400/50 hover:text-foreground'
          "
          :aria-pressed="activeTag === tag"
          @click="activeTag = tag"
        >
          {{ tag }}
          <span v-if="tag !== 'All'" class="ml-1.5 font-mono text-[10px] opacity-60">
            {{ projects.filter((p) => p.tags.includes(tag)).length }}
          </span>
        </button>
      </div>

      <!-- ----------------------------------------------------------- grid -->
      <!--
        TransitionGroup animates items as they enter, leave and MOVE.
        The `move-class` is the magic one: when filtering removes a card, the
        remaining cards slide to their new positions instead of teleporting.
        Vue does this with the FLIP technique — it measures the before and after
        positions and animates the difference with a transform.

        `:key` must be stable and unique (the slug), or Vue cannot tell which
        card moved where.
      -->
      <TransitionGroup
        tag="div"
        class="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        enter-active-class="transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
        leave-active-class="transition-all duration-300 absolute"
        enter-from-class="opacity-0 scale-95 translate-y-4"
        leave-to-class="opacity-0 scale-95"
        move-class="transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
      >
        <article v-for="(project, i) in filtered" :key="project.slug">
          <TiltCard :max="5" :lift="14" radius="rounded-2xl" class="h-full">
            <NuxtLink
              :to="`/work/${project.slug}`"
              class="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border/80 bg-card/75 shadow-[3px_3px_0_0_color-mix(in_oklch,var(--foreground)_12%,transparent)] transition-all duration-300 hover:border-brand/60 hover:shadow-[5px_5px_0_0_color-mix(in_oklch,var(--brand)_25%,transparent)]"
              :data-cursor-label="project.title"
            >
              <div class="relative aspect-16/10 overflow-hidden border-b border-border/60 bg-muted/30">
                <div
                  class="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
                  :style="{
                    background: `radial-gradient(ellipse at 35% 25%, ${project.accent[0]}, transparent 60%),
                                 radial-gradient(ellipse at 75% 70%, ${project.accent[1]}, transparent 60%),
                                 color-mix(in oklch, var(--card) 90%, black)`,
                  }"
                />
                <div class="bg-retro-dots absolute inset-0 opacity-25" />
                <div class="bg-scanlines absolute inset-0 opacity-15" />
                <Badge
                  variant="tech"
                  class="absolute top-3 right-3 border border-border/60 font-mono text-[10px] backdrop-blur-md"
                >
                  {{ project.year }}
                </Badge>
                <span class="absolute top-3 left-3 rounded-xs border border-cyan-400/30 bg-background/80 px-2 py-0.5 font-mono text-[10px] tracking-wider text-cyan-300 uppercase backdrop-blur-md">
                  INDEX // {{ String(i + 1).padStart(2, '0') }}
                </span>
              </div>

              <div class="flex flex-1 flex-col p-5">
                <h2 class="font-serif text-xl font-medium tracking-tight text-foreground">{{ project.title }}</h2>
                <p class="text-muted-foreground mt-2 text-sm leading-relaxed">
                  {{ project.tagline }}
                </p>

                <div class="mt-auto flex items-end justify-between gap-4 pt-5">
                  <ul class="flex flex-wrap gap-1.5">
                    <li v-for="tech in project.stack.slice(0, 3)" :key="tech">
                      <Badge variant="tech" class="border border-border/60 bg-muted/40 font-mono text-[10px]">{{ tech }}</Badge>
                    </li>
                  </ul>
                  <ArrowUpRight
                    class="text-muted-foreground group-hover:text-cyan-400 size-4 shrink-0 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </div>
              </div>
            </NuxtLink>
          </TiltCard>
        </article>
      </TransitionGroup>

      <!-- Empty state. Unlikely with this data, but a grid that silently shows
           nothing is one of the most common unfinished edges in a portfolio. -->
      <p v-if="!filtered.length" class="text-muted-foreground py-20 text-center">
        Nothing tagged “{{ activeTag }}” yet.
      </p>
    </div>
  </div>
</template>
