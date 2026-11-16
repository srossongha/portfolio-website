<script setup lang="ts">
/**
 * The default layout: header, page content, footer, and global 1970s PET-2001 CLI terminal.
 */
const terminal = useTerminal()
</script>

<template>
  <div class="relative min-h-dvh">
    <ScrollProgressBar />
    <SiteHeader />

    <!-- `id="main"` is the target of the skip link in app.vue. -->
    <main id="main">
      <slot />
    </main>

    <SiteFooter />

    <!-- 1970s PET-2001 / VT100 Interactive Terminal Modal -->
    <ClientOnly>
      <InteractiveTerminal v-model:open="terminal.isOpen.value" />
    </ClientOnly>
  </div>
</template>
