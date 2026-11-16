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
        <HardwareProjectCard
          v-for="(project, i) in filtered"
          :key="project.slug"
          :project="project"
          :index="i"
          class="h-full"
        />
      </TransitionGroup>

      <!-- Empty state. Unlikely with this data, but a grid that silently shows
           nothing is one of the most common unfinished edges in a portfolio. -->
      <p v-if="!filtered.length" class="text-muted-foreground py-20 text-center">
        Nothing tagged “{{ activeTag }}” yet.
      </p>
    </div>
  </div>
</template>
