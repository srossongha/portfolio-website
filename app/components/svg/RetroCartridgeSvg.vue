<script setup lang="ts">
/**
 * RetroCartridgeSvg.vue
 * Clean, precision-crafted vector SVG of a retro 8-bit game cartridge.
 * Captures nostalgic childhood Game Boy aesthetic with crisp geometry and gold connectors.
 */

interface Props {
  title?: string
  serial?: string
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  title: 'SROKNH.ROM',
  serial: 'DMG-KH-01',
  class: 'w-36 h-40'
})
</script>

<template>
  <div class="group relative inline-block transition-transform duration-300 hover:scale-105" :class="props.class">
    <svg
      viewBox="0 0 160 180"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      class="size-full drop-shadow-[0_12px_24px_rgba(0,0,0,0.6)]"
    >
      <!-- Cartridge Outer Plastic Shell -->
      <path
        d="M10 20C10 14.4772 14.4772 10 20 10H140C145.523 10 150 14.4772 150 20V168C150 171.314 147.314 174 144 174H16C12.6863 174 10 171.314 10 168V20Z"
        fill="#0b1320"
        stroke="#38bdf8"
        stroke-width="2"
      />

      <!-- Top Notch / Grip Grooves -->
      <rect x="22" y="14" width="116" height="8" rx="2" fill="#060c14" stroke="#1e293b" stroke-width="1"/>
      <line x1="34" y1="14" x2="34" y2="22" stroke="#334155" stroke-width="1.5"/>
      <line x1="48" y1="14" x2="48" y2="22" stroke="#334155" stroke-width="1.5"/>
      <line x1="62" y1="14" x2="62" y2="22" stroke="#334155" stroke-width="1.5"/>
      <line x1="76" y1="14" x2="76" y2="22" stroke="#334155" stroke-width="1.5"/>
      <line x1="90" y1="14" x2="90" y2="22" stroke="#334155" stroke-width="1.5"/>
      <line x1="104" y1="14" x2="104" y2="22" stroke="#334155" stroke-width="1.5"/>
      <line x1="118" y1="14" x2="118" y2="22" stroke="#334155" stroke-width="1.5"/>

      <!-- Embossed Brand Arrow / Bevel -->
      <path
        d="M26 30H134V34H26V30Z"
        fill="#060c14"
      />
      <path
        d="M80 38L74 44H86L80 38Z"
        fill="#38bdf8"
        fill-opacity="0.7"
      />

      <!-- Cartridge Label Inset Border -->
      <rect x="24" y="50" width="112" height="106" rx="6" fill="#040812" stroke="#38bdf8" stroke-opacity="0.4" stroke-width="1.5"/>

      <!-- Holographic Label Header -->
      <rect x="25" y="51" width="110" height="24" rx="5" fill="#0284c7" fill-opacity="0.25"/>
      <text x="32" y="66" fill="#38bdf8" font-family="monospace" font-size="9" font-weight="bold" letter-spacing="0.05em">
        SONGHA BOY ROM
      </text>
      <circle cx="126" cy="63" r="3" fill="#38bdf8" class="animate-pulse"/>

      <!-- Label Art / Game Screen Graphic -->
      <rect x="30" y="80" width="100" height="52" rx="4" fill="#06131f" stroke="#0ea5e9" stroke-opacity="0.3"/>
      
      <!-- Mini Pixel Flagship Graphic -->
      <rect x="42" y="92" width="16" height="16" rx="2" fill="#38bdf8"/>
      <rect x="64" y="94" width="56" height="4" rx="2" fill="#f8fafc"/>
      <rect x="64" y="102" width="44" height="4" rx="2" fill="#94a3b8"/>

      <!-- Serial Number & Stamp -->
      <text x="32" y="146" fill="#64748b" font-family="monospace" font-size="7.5" font-weight="600">
        {{ props.serial }}
      </text>
      <text x="88" y="146" fill="#38bdf8" font-family="monospace" font-size="7.5" font-weight="700">
        {{ props.title }}
      </text>

      <!-- Bottom Pin Connector Exposure -->
      <path d="M20 174H140V177H20V174Z" fill="#d97706"/>
      <line x1="28" y1="174" x2="28" y2="177" stroke="#fbbf24" stroke-width="2"/>
      <line x1="38" y1="174" x2="38" y2="177" stroke="#fbbf24" stroke-width="2"/>
      <line x1="48" y1="174" x2="48" y2="177" stroke="#fbbf24" stroke-width="2"/>
      <line x1="58" y1="174" x2="58" y2="177" stroke="#fbbf24" stroke-width="2"/>
      <line x1="68" y1="174" x2="68" y2="177" stroke="#fbbf24" stroke-width="2"/>
      <line x1="78" y1="174" x2="78" y2="177" stroke="#fbbf24" stroke-width="2"/>
      <line x1="88" y1="174" x2="88" y2="177" stroke="#fbbf24" stroke-width="2"/>
      <line x1="98" y1="174" x2="98" y2="177" stroke="#fbbf24" stroke-width="2"/>
      <line x1="108" y1="174" x2="108" y2="177" stroke="#fbbf24" stroke-width="2"/>
      <line x1="118" y1="174" x2="118" y2="177" stroke="#fbbf24" stroke-width="2"/>
      <line x1="128" y1="174" x2="128" y2="177" stroke="#fbbf24" stroke-width="2"/>
    </svg>
  </div>
</template>
