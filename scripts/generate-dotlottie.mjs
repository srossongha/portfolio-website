import { DotLottie } from '@dotlottie/dotlottie-js'
import fs from 'node:fs'
import path from 'node:path'

/**
 * generate-dotlottie.mjs
 * Generates clean, authentic childhood retro gameplay and software engineering dotLottie animations.
 */

// Helper to create animated keyframes
function createKeyframe(t, s, e, i = { x: [0.4], y: [1] }, o = { x: [0.6], y: [0] }) {
  return { t, s, e, i, o }
}

// -----------------------------------------------------------------------------
// 1. Retro Game Handheld / Console Animation (retro-gameboy)
// -----------------------------------------------------------------------------
function buildRetroGameboyLottie() {
  const w = 400
  const h = 400
  const fr = 60
  const op = 120 // 2 seconds at 60fps

  return {
    v: '5.7.4',
    fr,
    ip: 0,
    op,
    w,
    h,
    nm: 'Retro Handheld Console',
    ddd: 0,
    assets: [],
    layers: [
      // Layer 1: Floating Sparks / Star particles
      {
        ddd: 0,
        ind: 1,
        ty: 4,
        nm: 'Sparkle Left',
        sr: 1,
        ks: {
          o: {
            a: 1,
            k: [
              { t: 0, s: [0], e: [100] },
              { t: 40, s: [100], e: [0] },
              { t: 80, s: [0], e: [100] },
              { t: 120, s: [100], e: [0] }
            ]
          },
          r: {
            a: 1,
            k: [
              { t: 0, s: [0], e: [180] },
              { t: 120, s: [180], e: [360] }
            ]
          },
          p: {
            a: 1,
            k: [
              { t: 0, s: [90, 140, 0], e: [90, 110, 0] },
              { t: 60, s: [90, 110, 0], e: [90, 80, 0] },
              { t: 120, s: [90, 80, 0], e: [90, 140, 0] }
            ]
          },
          a: { a: 0, k: [0, 0, 0] },
          s: {
            a: 1,
            k: [
              { t: 0, s: [40, 40, 100], e: [110, 110, 100] },
              { t: 60, s: [110, 110, 100], e: [40, 40, 100] },
              { t: 120, s: [40, 40, 100], e: [40, 40, 100] }
            ]
          }
        },
        ao: 0,
        shapes: [
          {
            ty: 'gr',
            it: [
              {
                ty: 'sr',
                sy: 1, // Star
                p: { a: 0, k: 4 },
                pt: { a: 0, k: [0, 0] },
                ir: { a: 0, k: 5 },
                or: { a: 0, k: 14 },
                is: { a: 0, k: 0 },
                os: { a: 0, k: 0 },
                r: { a: 0, k: 0 },
                nm: 'Star 4-point'
              },
              {
                ty: 'fl',
                c: { a: 0, k: [0.22, 0.74, 0.97, 1] }, // Cyan #38bdf8
                o: { a: 0, k: 100 },
                nm: 'Fill Cyan'
              },
              {
                ty: 'tr',
                p: { a: 0, k: [0, 0] },
                a: { a: 0, k: [0, 0] },
                s: { a: 0, k: [100, 100] },
                r: { a: 0, k: 0 },
                o: { a: 0, k: 100 },
                sk: { a: 0, k: 0 },
                sa: { a: 0, k: 0 }
              }
            ],
            nm: 'Star Group'
          }
        ],
        ip: 0,
        op
      },
      // Layer 2: Sparkle Right
      {
        ddd: 0,
        ind: 2,
        ty: 4,
        nm: 'Sparkle Right',
        sr: 1,
        ks: {
          o: {
            a: 1,
            k: [
              { t: 0, s: [100], e: [0] },
              { t: 60, s: [0], e: [100] },
              { t: 120, s: [100], e: [0] }
            ]
          },
          r: {
            a: 1,
            k: [
              { t: 0, s: [45], e: [225] },
              { t: 120, s: [225], e: [405] }
            ]
          },
          p: {
            a: 1,
            k: [
              { t: 0, s: [310, 120, 0], e: [310, 95, 0] },
              { t: 60, s: [310, 95, 0], e: [310, 130, 0] },
              { t: 120, s: [310, 130, 0], e: [310, 120, 0] }
            ]
          },
          a: { a: 0, k: [0, 0, 0] },
          s: {
            a: 1,
            k: [
              { t: 0, s: [90, 90, 100], e: [30, 30, 100] },
              { t: 60, s: [30, 30, 100], e: [100, 100, 100] },
              { t: 120, s: [100, 100, 100], e: [90, 90, 100] }
            ]
          }
        },
        ao: 0,
        shapes: [
          {
            ty: 'gr',
            it: [
              {
                ty: 'sr',
                sy: 1,
                p: { a: 0, k: 4 },
                pt: { a: 0, k: [0, 0] },
                ir: { a: 0, k: 4 },
                or: { a: 0, k: 12 },
                is: { a: 0, k: 0 },
                os: { a: 0, k: 0 },
                r: { a: 0, k: 0 }
              },
              {
                ty: 'fl',
                c: { a: 0, k: [0.56, 0.82, 0.98, 1] }, // Light Cyan
                o: { a: 0, k: 100 }
              },
              {
                ty: 'tr',
                p: { a: 0, k: [0, 0] },
                a: { a: 0, k: [0, 0] },
                s: { a: 0, k: [100, 100] },
                r: { a: 0, k: 0 },
                o: { a: 0, k: 100 }
              }
            ]
          }
        ],
        ip: 0,
        op
      },
      // Layer 3: Main Console Body with gentle floating motion
      {
        ddd: 0,
        ind: 3,
        ty: 4,
        nm: 'Console Chassis',
        sr: 1,
        ks: {
          o: { a: 0, k: 100 },
          r: {
            a: 1,
            k: [
              { t: 0, s: [-1], e: [1] },
              { t: 60, s: [1], e: [-1] },
              { t: 120, s: [-1], e: [-1] }
            ]
          },
          p: {
            a: 1,
            k: [
              { t: 0, s: [200, 205, 0], e: [200, 195, 0] },
              { t: 60, s: [200, 195, 0], e: [200, 205, 0] },
              { t: 120, s: [200, 205, 0], e: [200, 205, 0] }
            ]
          },
          a: { a: 0, k: [0, 0, 0] },
          s: { a: 0, k: [100, 100, 100] }
        },
        ao: 0,
        shapes: [
          // 3.1 Outer Shell
          {
            ty: 'gr',
            it: [
              {
                ty: 'rc',
                d: 1,
                s: { a: 0, k: [170, 250] },
                p: { a: 0, k: [0, 0] },
                r: { a: 0, k: 28 }, // 28px rounded corners
                nm: 'Outer Shell Rect'
              },
              {
                ty: 'fl',
                c: { a: 0, k: [0.03, 0.06, 0.12, 1] }, // Dark obsidian #08101f
                o: { a: 0, k: 100 }
              },
              {
                ty: 'st',
                c: { a: 0, k: [0.22, 0.74, 0.97, 1] }, // Cyan border #38bdf8
                o: { a: 0, k: 90 },
                w: { a: 0, k: 3.5 }
              },
              {
                ty: 'tr',
                p: { a: 0, k: [0, 0] },
                a: { a: 0, k: [0, 0] },
                s: { a: 0, k: [100, 100] },
                r: { a: 0, k: 0 },
                o: { a: 0, k: 100 }
              }
            ],
            nm: 'Chassis'
          },
          // 3.2 Screen Bezel
          {
            ty: 'gr',
            it: [
              {
                ty: 'rc',
                d: 1,
                s: { a: 0, k: [142, 110] },
                p: { a: 0, k: [0, -50] },
                r: { a: 0, k: 12 },
                nm: 'Screen Bezel Rect'
              },
              {
                ty: 'fl',
                c: { a: 0, k: [0.02, 0.04, 0.08, 1] }, // Midnight inner
                o: { a: 0, k: 100 }
              },
              {
                ty: 'st',
                c: { a: 0, k: [0.15, 0.35, 0.5, 1] },
                o: { a: 0, k: 70 },
                w: { a: 0, k: 2 }
              },
              {
                ty: 'tr',
                p: { a: 0, k: [0, 0] },
                a: { a: 0, k: [0, 0] },
                s: { a: 0, k: [100, 100] },
                r: { a: 0, k: 0 },
                o: { a: 0, k: 100 }
              }
            ],
            nm: 'Screen Bezel'
          },
          // 3.3 Screen Display (Pulsing glowing matrix LCD)
          {
            ty: 'gr',
            it: [
              {
                ty: 'rc',
                d: 1,
                s: { a: 0, k: [120, 84] },
                p: { a: 0, k: [0, -50] },
                r: { a: 0, k: 6 }
              },
              {
                ty: 'fl',
                c: { a: 0, k: [0.04, 0.12, 0.18, 1] },
                o: { a: 0, k: 100 }
              },
              {
                ty: 'st',
                c: { a: 0, k: [0.22, 0.74, 0.97, 1] },
                o: {
                  a: 1,
                  k: [
                    { t: 0, s: [60], e: [100] },
                    { t: 60, s: [100], e: [60] },
                    { t: 120, s: [60], e: [60] }
                  ]
                },
                w: { a: 0, k: 1.5 }
              },
              {
                ty: 'tr',
                p: { a: 0, k: [0, 0] },
                a: { a: 0, k: [0, 0] },
                s: { a: 0, k: [100, 100] },
                r: { a: 0, k: 0 },
                o: { a: 0, k: 100 }
              }
            ],
            nm: 'LCD Screen'
          },
          // 3.4 Power LED (Pulsing Cyan)
          {
            ty: 'gr',
            it: [
              {
                ty: 'el',
                d: 1,
                p: { a: 0, k: [-54, -90] },
                s: { a: 0, k: [6, 6] }
              },
              {
                ty: 'fl',
                c: { a: 0, k: [0.22, 0.74, 0.97, 1] },
                o: {
                  a: 1,
                  k: [
                    { t: 0, s: [70], e: [100] },
                    { t: 60, s: [100], e: [70] },
                    { t: 120, s: [70], e: [70] }
                  ]
                }
              },
              {
                ty: 'tr',
                p: { a: 0, k: [0, 0] },
                a: { a: 0, k: [0, 0] },
                s: { a: 0, k: [100, 100] },
                r: { a: 0, k: 0 },
                o: { a: 0, k: 100 }
              }
            ],
            nm: 'Power LED'
          },
          // 3.5 D-Pad Cross (Left side)
          {
            ty: 'gr',
            it: [
              // Vertical bar
              {
                ty: 'rc',
                d: 1,
                s: { a: 0, k: [14, 42] },
                p: { a: 0, k: [-42, 45] },
                r: { a: 0, k: 3 }
              },
              // Horizontal bar
              {
                ty: 'rc',
                d: 1,
                s: { a: 0, k: [42, 14] },
                p: { a: 0, k: [-42, 45] },
                r: { a: 0, k: 3 }
              },
              {
                ty: 'fl',
                c: { a: 0, k: [0.15, 0.22, 0.32, 1] },
                o: { a: 0, k: 100 }
              },
              {
                ty: 'st',
                c: { a: 0, k: [0.25, 0.45, 0.65, 1] },
                o: { a: 0, k: 90 },
                w: { a: 0, k: 1.5 }
              },
              {
                ty: 'tr',
                p: { a: 0, k: [0, 0] },
                a: { a: 0, k: [0, 0] },
                s: { a: 0, k: [100, 100] },
                r: { a: 0, k: 0 },
                o: { a: 0, k: 100 }
              }
            ],
            nm: 'D-Pad'
          },
          // 3.6 A & B Action Buttons (Right side)
          {
            ty: 'gr',
            it: [
              // Button B
              {
                ty: 'el',
                d: 1,
                p: { a: 0, k: [32, 54] },
                s: { a: 0, k: [18, 18] }
              },
              {
                ty: 'fl',
                c: { a: 0, k: [0.12, 0.2, 0.3, 1] },
                o: { a: 0, k: 100 }
              },
              {
                ty: 'st',
                c: { a: 0, k: [0.3, 0.5, 0.7, 1] },
                o: { a: 0, k: 90 },
                w: { a: 0, k: 1.5 }
              },
              // Button A (Glowing cyan)
              {
                ty: 'el',
                d: 1,
                p: { a: 0, k: [52, 38] },
                s: { a: 0, k: [18, 18] }
              },
              {
                ty: 'fl',
                c: { a: 0, k: [0.22, 0.74, 0.97, 1] }, // Cyan
                o: {
                  a: 1,
                  k: [
                    { t: 0, s: [80], e: [100] },
                    { t: 60, s: [100], e: [80] },
                    { t: 120, s: [80], e: [80] }
                  ]
                }
              },
              {
                ty: 'st',
                c: { a: 0, k: [0.85, 0.95, 1, 1] },
                o: { a: 0, k: 90 },
                w: { a: 0, k: 1.5 }
              },
              {
                ty: 'tr',
                p: { a: 0, k: [0, 0] },
                a: { a: 0, k: [0, 0] },
                s: { a: 0, k: [100, 100] },
                r: { a: 0, k: 0 },
                o: { a: 0, k: 100 }
              }
            ],
            nm: 'Action Buttons'
          },
          // 3.7 Select & Start Pills
          {
            ty: 'gr',
            it: [
              // Select
              {
                ty: 'rc',
                d: 1,
                s: { a: 0, k: [18, 5] },
                p: { a: 0, k: [-14, 96] },
                r: { a: 0, k: 2.5 }
              },
              // Start
              {
                ty: 'rc',
                d: 1,
                s: { a: 0, k: [18, 5] },
                p: { a: 0, k: [14, 96] },
                r: { a: 0, k: 2.5 }
              },
              {
                ty: 'fl',
                c: { a: 0, k: [0.18, 0.25, 0.35, 1] },
                o: { a: 0, k: 100 }
              },
              {
                ty: 'tr',
                p: { a: 0, k: [0, 0] },
                a: { a: 0, k: [0, 0] },
                s: { a: 0, k: [100, 100] },
                r: { a: 0, k: -25 }, // Rotated pills
                o: { a: 0, k: 100 }
              }
            ],
            nm: 'Select Start'
          }
        ],
        ip: 0,
        op
      },
      // Layer 4: Animated Pixel Character inside screen jumping!
      {
        ddd: 0,
        ind: 4,
        ty: 4,
        nm: 'Screen Runner Pixel Character',
        sr: 1,
        ks: {
          o: { a: 0, k: 100 },
          r: { a: 0, k: 0 },
          p: {
            a: 1,
            k: [
              { t: 0, s: [175, 160, 0], e: [175, 138, 0] }, // Jump up
              { t: 30, s: [175, 138, 0], e: [175, 160, 0] }, // Land down
              { t: 60, s: [175, 160, 0], e: [175, 160, 0] }, // Run
              { t: 75, s: [175, 160, 0], e: [175, 135, 0] }, // Jump 2
              { t: 105, s: [175, 135, 0], e: [175, 160, 0] }, // Land 2
              { t: 120, s: [175, 160, 0], e: [175, 160, 0] }
            ]
          },
          a: { a: 0, k: [0, 0, 0] },
          s: { a: 0, k: [100, 100, 100] }
        },
        ao: 0,
        shapes: [
          {
            ty: 'gr',
            it: [
              // Head
              {
                ty: 'rc',
                d: 1,
                s: { a: 0, k: [12, 10] },
                p: { a: 0, k: [0, -10] },
                r: { a: 0, k: 2 }
              },
              // Torso
              {
                ty: 'rc',
                d: 1,
                s: { a: 0, k: [14, 12] },
                p: { a: 0, k: [0, 2] },
                r: { a: 0, k: 2 }
              },
              // Legs
              {
                ty: 'rc',
                d: 1,
                s: { a: 0, k: [4, 8] },
                p: { a: 0, k: [-3, 11] },
                r: { a: 0, k: 1 }
              },
              {
                ty: 'rc',
                d: 1,
                s: { a: 0, k: [4, 8] },
                p: { a: 0, k: [3, 11] },
                r: { a: 0, k: 1 }
              },
              {
                ty: 'fl',
                c: { a: 0, k: [0.22, 0.74, 0.97, 1] }, // Cyan
                o: { a: 0, k: 100 }
              },
              {
                ty: 'tr',
                p: { a: 0, k: [0, 0] },
                a: { a: 0, k: [0, 0] },
                s: { a: 0, k: [100, 100] },
                r: { a: 0, k: 0 },
                o: { a: 0, k: 100 }
              }
            ],
            nm: 'Pixel Runner'
          }
        ],
        ip: 0,
        op
      },
      // Layer 5: Screen Gem (collectible diamond moving across screen)
      {
        ddd: 0,
        ind: 5,
        ty: 4,
        nm: 'Screen Gem',
        sr: 1,
        ks: {
          o: {
            a: 1,
            k: [
              { t: 0, s: [100], e: [100] },
              { t: 30, s: [100], e: [0] }, // Collected at peak jump!
              { t: 55, s: [0], e: [0] },
              { t: 60, s: [0], e: [100] },
              { t: 80, s: [100], e: [0] }, // Collected again!
              { t: 120, s: [0], e: [100] }
            ]
          },
          r: {
            a: 1,
            k: [
              { t: 0, s: [45], e: [225] },
              { t: 120, s: [225], e: [405] }
            ]
          },
          p: {
            a: 1,
            k: [
              { t: 0, s: [230, 140, 0], e: [175, 140, 0] },
              { t: 30, s: [175, 140, 0], e: [150, 140, 0] },
              { t: 60, s: [240, 138, 0], e: [175, 138, 0] },
              { t: 80, s: [175, 138, 0], e: [150, 138, 0] },
              { t: 120, s: [150, 138, 0], e: [230, 140, 0] }
            ]
          },
          a: { a: 0, k: [0, 0, 0] },
          s: { a: 0, k: [100, 100, 100] }
        },
        ao: 0,
        shapes: [
          {
            ty: 'gr',
            it: [
              {
                ty: 'rc',
                d: 1,
                s: { a: 0, k: [10, 10] },
                p: { a: 0, k: [0, 0] },
                r: { a: 0, k: 1 }
              },
              {
                ty: 'fl',
                c: { a: 0, k: [0.95, 0.98, 1, 1] }, // White/Ice Cyan
                o: { a: 0, k: 100 }
              },
              {
                ty: 'st',
                c: { a: 0, k: [0.22, 0.74, 0.97, 1] },
                o: { a: 0, k: 100 },
                w: { a: 0, k: 2 }
              },
              {
                ty: 'tr',
                p: { a: 0, k: [0, 0] },
                a: { a: 0, k: [0, 0] },
                s: { a: 0, k: [100, 100] },
                r: { a: 0, k: 0 },
                o: { a: 0, k: 100 }
              }
            ],
            nm: 'Diamond'
          }
        ],
        ip: 0,
        op
      }
    ]
  }
}

// -----------------------------------------------------------------------------
// 2. Arcade Level Up Trophy / Coin Animation (game-trophy)
// -----------------------------------------------------------------------------
function buildGameTrophyLottie() {
  const w = 240
  const h = 240
  const fr = 60
  const op = 120

  return {
    v: '5.7.4',
    fr,
    ip: 0,
    op,
    w,
    h,
    nm: 'Game Trophy Coin',
    ddd: 0,
    assets: [],
    layers: [
      // Layer 1: Rotating 3D Star Coin
      {
        ddd: 0,
        ind: 1,
        ty: 4,
        nm: 'Coin Body',
        sr: 1,
        ks: {
          o: { a: 0, k: 100 },
          r: {
            a: 1,
            k: [
              { t: 0, s: [0], e: [360] },
              { t: 120, s: [360], e: [720] }
            ]
          },
          p: {
            a: 1,
            k: [
              { t: 0, s: [120, 124, 0], e: [120, 116, 0] },
              { t: 60, s: [120, 116, 0], e: [120, 124, 0] },
              { t: 120, s: [120, 124, 0], e: [120, 124, 0] }
            ]
          },
          a: { a: 0, k: [0, 0, 0] },
          s: { a: 0, k: [100, 100, 100] }
        },
        ao: 0,
        shapes: [
          // Outer Ring
          {
            ty: 'gr',
            it: [
              {
                ty: 'el',
                d: 1,
                p: { a: 0, k: [0, 0] },
                s: { a: 0, k: [100, 100] }
              },
              {
                ty: 'fl',
                c: { a: 0, k: [0.03, 0.08, 0.16, 1] },
                o: { a: 0, k: 100 }
              },
              {
                ty: 'st',
                c: { a: 0, k: [0.22, 0.74, 0.97, 1] },
                o: { a: 0, k: 100 },
                w: { a: 0, k: 4 }
              },
              {
                ty: 'tr',
                p: { a: 0, k: [0, 0] },
                a: { a: 0, k: [0, 0] },
                s: { a: 0, k: [100, 100] },
                r: { a: 0, k: 0 },
                o: { a: 0, k: 100 }
              }
            ],
            nm: 'Coin Outer Ring'
          },
          // Inner 8-point Star
          {
            ty: 'gr',
            it: [
              {
                ty: 'sr',
                sy: 1,
                p: { a: 0, k: 8 },
                pt: { a: 0, k: [0, 0] },
                ir: { a: 0, k: 18 },
                or: { a: 0, k: 36 },
                is: { a: 0, k: 0 },
                os: { a: 0, k: 0 },
                r: { a: 0, k: 0 }
              },
              {
                ty: 'fl',
                c: { a: 0, k: [0.22, 0.74, 0.97, 1] },
                o: { a: 0, k: 90 }
              },
              {
                ty: 'st',
                c: { a: 0, k: [0.9, 0.97, 1, 1] },
                o: { a: 0, k: 100 },
                w: { a: 0, k: 2 }
              },
              {
                ty: 'tr',
                p: { a: 0, k: [0, 0] },
                a: { a: 0, k: [0, 0] },
                s: { a: 0, k: [100, 100] },
                r: { a: 0, k: 0 },
                o: { a: 0, k: 100 }
              }
            ],
            nm: 'Star Core'
          }
        ],
        ip: 0,
        op
      }
    ]
  }
}

// -----------------------------------------------------------------------------
// 3. Code Bracket Pulse / Spark (code-spark)
// -----------------------------------------------------------------------------
function buildCodeSparkLottie() {
  const w = 240
  const h = 240
  const fr = 60
  const op = 120

  return {
    v: '5.7.4',
    fr,
    ip: 0,
    op,
    w,
    h,
    nm: 'Code Spark Animation',
    ddd: 0,
    assets: [],
    layers: [
      {
        ddd: 0,
        ind: 1,
        ty: 4,
        nm: 'Left Bracket <',
        sr: 1,
        ks: {
          o: { a: 0, k: 100 },
          r: { a: 0, k: 0 },
          p: {
            a: 1,
            k: [
              { t: 0, s: [85, 120, 0], e: [75, 120, 0] },
              { t: 60, s: [75, 120, 0], e: [85, 120, 0] },
              { t: 120, s: [85, 120, 0], e: [85, 120, 0] }
            ]
          },
          a: { a: 0, k: [0, 0, 0] },
          s: { a: 0, k: [100, 100, 100] }
        },
        ao: 0,
        shapes: [
          {
            ty: 'gr',
            it: [
              {
                ty: 'sh',
                ks: {
                  a: 0,
                  k: {
                    c: false,
                    v: [[15, -25], [-15, 0], [15, 25]],
                    i: [[0, 0], [0, 0], [0, 0]],
                    o: [[0, 0], [0, 0], [0, 0]]
                  }
                }
              },
              {
                ty: 'st',
                c: { a: 0, k: [0.22, 0.74, 0.97, 1] },
                o: { a: 0, k: 100 },
                w: { a: 0, k: 5 }
              },
              {
                ty: 'tr',
                p: { a: 0, k: [0, 0] },
                a: { a: 0, k: [0, 0] },
                s: { a: 0, k: [100, 100] },
                r: { a: 0, k: 0 },
                o: { a: 0, k: 100 }
              }
            ],
            nm: 'Left Angle'
          }
        ],
        ip: 0,
        op
      },
      {
        ddd: 0,
        ind: 2,
        ty: 4,
        nm: 'Right Bracket >',
        sr: 1,
        ks: {
          o: { a: 0, k: 100 },
          r: { a: 0, k: 0 },
          p: {
            a: 1,
            k: [
              { t: 0, s: [155, 120, 0], e: [165, 120, 0] },
              { t: 60, s: [165, 120, 0], e: [155, 120, 0] },
              { t: 120, s: [155, 120, 0], e: [155, 120, 0] }
            ]
          },
          a: { a: 0, k: [0, 0, 0] },
          s: { a: 0, k: [100, 100, 100] }
        },
        ao: 0,
        shapes: [
          {
            ty: 'gr',
            it: [
              {
                ty: 'sh',
                ks: {
                  a: 0,
                  k: {
                    c: false,
                    v: [[-15, -25], [15, 0], [-15, 25]],
                    i: [[0, 0], [0, 0], [0, 0]],
                    o: [[0, 0], [0, 0], [0, 0]]
                  }
                }
              },
              {
                ty: 'st',
                c: { a: 0, k: [0.22, 0.74, 0.97, 1] },
                o: { a: 0, k: 100 },
                w: { a: 0, k: 5 }
              },
              {
                ty: 'tr',
                p: { a: 0, k: [0, 0] },
                a: { a: 0, k: [0, 0] },
                s: { a: 0, k: [100, 100] },
                r: { a: 0, k: 0 },
                o: { a: 0, k: 100 }
              }
            ],
            nm: 'Right Angle'
          }
        ],
        ip: 0,
        op
      },
      // Center Slash / Pixel Gem
      {
        ddd: 0,
        ind: 3,
        ty: 4,
        nm: 'Center Slash',
        sr: 1,
        ks: {
          o: {
            a: 1,
            k: [
              { t: 0, s: [70], e: [100] },
              { t: 60, s: [100], e: [70] },
              { t: 120, s: [70], e: [70] }
            ]
          },
          r: { a: 0, k: 0 },
          p: { a: 0, k: [120, 120, 0] },
          a: { a: 0, k: [0, 0, 0] },
          s: {
            a: 1,
            k: [
              { t: 0, s: [100, 100, 100], e: [115, 115, 100] },
              { t: 60, s: [115, 115, 100], e: [100, 100, 100] },
              { t: 120, s: [100, 100, 100], e: [100, 100, 100] }
            ]
          }
        },
        ao: 0,
        shapes: [
          {
            ty: 'gr',
            it: [
              {
                ty: 'sh',
                ks: {
                  a: 0,
                  k: {
                    c: false,
                    v: [[10, -28], [-10, 28]],
                    i: [[0, 0], [0, 0]],
                    o: [[0, 0], [0, 0]]
                  }
                }
              },
              {
                ty: 'st',
                c: { a: 0, k: [0.9, 0.97, 1, 1] },
                o: { a: 0, k: 100 },
                w: { a: 0, k: 4 }
              },
              {
                ty: 'tr',
                p: { a: 0, k: [0, 0] },
                a: { a: 0, k: [0, 0] },
                s: { a: 0, k: [100, 100] },
                r: { a: 0, k: 0 },
                o: { a: 0, k: 100 }
              }
            ],
            nm: 'Slash'
          }
        ],
        ip: 0,
        op
      }
    ]
  }
}

// -----------------------------------------------------------------------------
// 4. Futuristic AI Quantum Neural Core Animation (ai-quantum-core)
// -----------------------------------------------------------------------------
function buildAiQuantumCoreLottie() {
  const w = 300
  const h = 300
  const fr = 60
  const op = 120 // 2 seconds loop at 60fps

  return {
    v: '5.7.4',
    fr,
    ip: 0,
    op,
    w,
    h,
    nm: 'AI Quantum Neural Core',
    ddd: 0,
    assets: [],
    layers: [
      // Layer 1: Expanding Quantum Shockwave Pulse (Wave 1)
      {
        ddd: 0,
        ind: 1,
        ty: 4,
        nm: 'Shockwave Wave A',
        sr: 1,
        ks: {
          o: {
            a: 1,
            k: [
              { t: 0, s: [90], e: [0] },
              { t: 60, s: [0], e: [90] },
              { t: 61, s: [90], e: [0] },
              { t: 120, s: [0], e: [0] }
            ]
          },
          r: { a: 0, k: 0 },
          p: { a: 0, k: [150, 150, 0] },
          a: { a: 0, k: [0, 0, 0] },
          s: {
            a: 1,
            k: [
              { t: 0, s: [25, 25, 100], e: [180, 180, 100] },
              { t: 60, s: [180, 180, 100], e: [25, 25, 100] },
              { t: 61, s: [25, 25, 100], e: [180, 180, 100] },
              { t: 120, s: [180, 180, 100], e: [25, 25, 100] }
            ]
          }
        },
        ao: 0,
        shapes: [
          {
            ty: 'gr',
            it: [
              {
                ty: 'el',
                d: 1,
                p: { a: 0, k: [0, 0] },
                s: { a: 0, k: [100, 100] }
              },
              {
                ty: 'st',
                c: { a: 0, k: [0.22, 0.74, 0.97, 1] }, // Cyan #38bdf8
                o: { a: 0, k: 90 },
                w: { a: 0, k: 2 }
              },
              {
                ty: 'tr',
                p: { a: 0, k: [0, 0] },
                a: { a: 0, k: [0, 0] },
                s: { a: 0, k: [100, 100] },
                r: { a: 0, k: 0 },
                o: { a: 0, k: 100 }
              }
            ],
            nm: 'Wave Ring'
          }
        ],
        ip: 0,
        op
      },
      // Layer 2: Orbiting Quantum Particles (4 Staggered Sparks)
      {
        ddd: 0,
        ind: 2,
        ty: 4,
        nm: 'Orbiting Starlight Spark A',
        sr: 1,
        ks: {
          o: {
            a: 1,
            k: [
              { t: 0, s: [20], e: [100] },
              { t: 60, s: [100], e: [20] },
              { t: 120, s: [20], e: [20] }
            ]
          },
          r: {
            a: 1,
            k: [
              { t: 0, s: [0], e: [360] },
              { t: 120, s: [360], e: [720] }
            ]
          },
          p: { a: 0, k: [150, 150, 0] },
          a: { a: 0, k: [0, 0, 0] },
          s: {
            a: 1,
            k: [
              { t: 0, s: [80, 80, 100], e: [120, 120, 100] },
              { t: 60, s: [120, 120, 100], e: [80, 80, 100] },
              { t: 120, s: [80, 80, 100], e: [80, 80, 100] }
            ]
          }
        },
        ao: 0,
        shapes: [
          {
            ty: 'gr',
            it: [
              // Spark at offset (radius 85)
              {
                ty: 'sr',
                sy: 1, // Star
                p: { a: 0, k: 4 },
                pt: { a: 0, k: [0, -85] },
                ir: { a: 0, k: 3 },
                or: { a: 0, k: 10 },
                is: { a: 0, k: 0 },
                os: { a: 0, k: 0 },
                r: { a: 0, k: 0 }
              },
              {
                ty: 'fl',
                c: { a: 0, k: [0.66, 0.35, 0.98, 1] }, // Electric violet #a855f7
                o: { a: 0, k: 100 }
              },
              // Opposite Spark
              {
                ty: 'sr',
                sy: 1,
                p: { a: 0, k: 4 },
                pt: { a: 0, k: [0, 85] },
                ir: { a: 0, k: 3 },
                or: { a: 0, k: 10 },
                is: { a: 0, k: 0 },
                os: { a: 0, k: 0 },
                r: { a: 0, k: 0 }
              },
              {
                ty: 'fl',
                c: { a: 0, k: [0.22, 0.74, 0.97, 1] }, // Cyan #38bdf8
                o: { a: 0, k: 100 }
              },
              {
                ty: 'tr',
                p: { a: 0, k: [0, 0] },
                a: { a: 0, k: [0, 0] },
                s: { a: 0, k: [100, 100] },
                r: { a: 0, k: 0 },
                o: { a: 0, k: 100 }
              }
            ],
            nm: 'Sparks Group'
          }
        ],
        ip: 0,
        op
      },
      // Layer 3: Outer Rotating Tech Hexagonal Containment Field
      {
        ddd: 0,
        ind: 3,
        ty: 4,
        nm: 'Hexagon Containment Ring',
        sr: 1,
        ks: {
          o: { a: 0, k: 90 },
          r: {
            a: 1,
            k: [
              { t: 0, s: [0], e: [180] },
              { t: 120, s: [180], e: [360] }
            ]
          },
          p: { a: 0, k: [150, 150, 0] },
          a: { a: 0, k: [0, 0, 0] },
          s: { a: 0, k: [100, 100, 100] }
        },
        ao: 0,
        shapes: [
          {
            ty: 'gr',
            it: [
              // Outer Hexagon
              {
                ty: 'sr',
                sy: 2, // Polygon
                p: { a: 0, k: 6 },
                pt: { a: 0, k: [0, 0] },
                or: { a: 0, k: 88 },
                os: { a: 0, k: 8 },
                r: { a: 0, k: 0 },
                nm: 'Hexagon Poly'
              },
              {
                ty: 'st',
                c: { a: 0, k: [0.22, 0.74, 0.97, 1] }, // Cyan
                o: { a: 0, k: 70 },
                w: { a: 0, k: 2 }
              },
              // Inner Circular Frame
              {
                ty: 'el',
                d: 1,
                p: { a: 0, k: [0, 0] },
                s: { a: 0, k: [148, 148] }
              },
              {
                ty: 'st',
                c: { a: 0, k: [0.15, 0.35, 0.55, 1] },
                o: { a: 0, k: 50 },
                w: { a: 0, k: 1.5 }
              },
              {
                ty: 'tr',
                p: { a: 0, k: [0, 0] },
                a: { a: 0, k: [0, 0] },
                s: { a: 0, k: [100, 100] },
                r: { a: 0, k: 0 },
                o: { a: 0, k: 100 }
              }
            ],
            nm: 'Hexagon Cage'
          }
        ],
        ip: 0,
        op
      },
      // Layer 4: Counter-Rotating Gyroscopic 3D Orbital Ring (Purple / Violet)
      {
        ddd: 0,
        ind: 4,
        ty: 4,
        nm: '3D Gyro Ring Purple',
        sr: 1,
        ks: {
          o: { a: 0, k: 95 },
          r: {
            a: 1,
            k: [
              { t: 0, s: [360], e: [180] },
              { t: 120, s: [180], e: [0] }
            ]
          },
          p: { a: 0, k: [150, 150, 0] },
          a: { a: 0, k: [0, 0, 0] },
          s: { a: 0, k: [100, 100, 100] }
        },
        ao: 0,
        shapes: [
          {
            ty: 'gr',
            it: [
              // Elliptical Gyro Path
              {
                ty: 'el',
                d: 1,
                p: { a: 0, k: [0, 0] },
                s: { a: 0, k: [142, 68] }
              },
              {
                ty: 'st',
                c: { a: 0, k: [0.66, 0.35, 0.98, 1] }, // Violet #a855f7
                o: { a: 0, k: 80 },
                w: { a: 0, k: 2.2 }
              },
              // Orbital Node Bead
              {
                ty: 'el',
                d: 1,
                p: { a: 0, k: [71, 0] },
                s: { a: 0, k: [8, 8] }
              },
              {
                ty: 'fl',
                c: { a: 0, k: [0.93, 0.85, 1, 1] }, // Bright lavender
                o: { a: 0, k: 100 }
              },
              {
                ty: 'tr',
                p: { a: 0, k: [0, 0] },
                a: { a: 0, k: [0, 0] },
                s: { a: 0, k: [100, 100] },
                r: { a: 0, k: 0 },
                o: { a: 0, k: 100 }
              }
            ],
            nm: 'Gyro Ring Purple'
          }
        ],
        ip: 0,
        op
      },
      // Layer 5: Tilted Inner Gyroscope Ring (Emerald Neon #34d399)
      {
        ddd: 0,
        ind: 5,
        ty: 4,
        nm: '3D Gyro Ring Emerald',
        sr: 1,
        ks: {
          o: { a: 0, k: 90 },
          r: {
            a: 1,
            k: [
              { t: 0, s: [-60], e: [120] },
              { t: 120, s: [120], e: [300] }
            ]
          },
          p: { a: 0, k: [150, 150, 0] },
          a: { a: 0, k: [0, 0, 0] },
          s: { a: 0, k: [100, 100, 100] }
        },
        ao: 0,
        shapes: [
          {
            ty: 'gr',
            it: [
              {
                ty: 'el',
                d: 1,
                p: { a: 0, k: [0, 0] },
                s: { a: 0, k: [108, 52] }
              },
              {
                ty: 'st',
                c: { a: 0, k: [0.2, 0.83, 0.6, 1] }, // Emerald #34d399
                o: { a: 0, k: 85 },
                w: { a: 0, k: 2 }
              },
              // Orbital Node Bead
              {
                ty: 'el',
                d: 1,
                p: { a: 0, k: [-54, 0] },
                s: { a: 0, k: [7, 7] }
              },
              {
                ty: 'fl',
                c: { a: 0, k: [0.75, 1, 0.9, 1] }, // Bright mint
                o: { a: 0, k: 100 }
              },
              {
                ty: 'tr',
                p: { a: 0, k: [0, 0] },
                a: { a: 0, k: [0, 0] },
                s: { a: 0, k: [100, 100] },
                r: { a: 0, k: 0 },
                o: { a: 0, k: 100 }
              }
            ],
            nm: 'Gyro Ring Emerald'
          }
        ],
        ip: 0,
        op
      },
      // Layer 6: Central AI Singularity Quantum Hyper-Diamond
      {
        ddd: 0,
        ind: 6,
        ty: 4,
        nm: 'AI Singularity Hyper-Diamond',
        sr: 1,
        ks: {
          o: { a: 0, k: 100 },
          r: {
            a: 1,
            k: [
              { t: 0, s: [0], e: [90] },
              { t: 60, s: [90], e: [180] },
              { t: 120, s: [180], e: [270] }
            ]
          },
          p: { a: 0, k: [150, 150, 0] },
          a: { a: 0, k: [0, 0, 0] },
          s: {
            a: 1,
            k: [
              { t: 0, s: [90, 90, 100], e: [118, 118, 100] },
              { t: 60, s: [118, 118, 100], e: [90, 90, 100] },
              { t: 120, s: [90, 90, 100], e: [90, 90, 100] }
            ]
          }
        },
        ao: 0,
        shapes: [
          {
            ty: 'gr',
            it: [
              // Outer Glowing Diamond
              {
                ty: 'sr',
                sy: 1, // Star
                p: { a: 0, k: 4 },
                pt: { a: 0, k: [0, 0] },
                ir: { a: 0, k: 14 },
                or: { a: 0, k: 34 },
                is: { a: 0, k: 0 },
                os: { a: 0, k: 0 },
                r: { a: 0, k: 0 },
                nm: 'Hyper Diamond'
              },
              {
                ty: 'fl',
                c: { a: 0, k: [0.0, 0.92, 1.0, 0.85] }, // Vibrant cyan
                o: { a: 0, k: 90 }
              },
              {
                ty: 'st',
                c: { a: 0, k: [1, 1, 1, 1] }, // Pure white outline
                o: { a: 0, k: 95 },
                w: { a: 0, k: 2.5 }
              },
              // Inner Core Singularity
              {
                ty: 'el',
                d: 1,
                p: { a: 0, k: [0, 0] },
                s: { a: 0, k: [14, 14] }
              },
              {
                ty: 'fl',
                c: { a: 0, k: [1, 1, 1, 1] }, // White hot center
                o: { a: 0, k: 100 }
              },
              {
                ty: 'tr',
                p: { a: 0, k: [0, 0] },
                a: { a: 0, k: [0, 0] },
                s: { a: 0, k: [100, 100] },
                r: { a: 0, k: 0 },
                o: { a: 0, k: 100 }
              }
            ],
            nm: 'Singularity Core'
          }
        ],
        ip: 0,
        op
      }
    ]
  }
}

// -----------------------------------------------------------------------------
// 5. Clean Radar Pulse / Signal Beacon (pulse-radar)
// -----------------------------------------------------------------------------
function buildPulseRadarLottie() {
  const w = 100
  const h = 100
  const fr = 60
  const op = 90 // 1.5s loop

  return {
    v: '5.7.4',
    fr,
    ip: 0,
    op,
    w,
    h,
    nm: 'Pulse Radar Signal',
    ddd: 0,
    assets: [],
    layers: [
      // Layer 1: Central Glowing Core
      {
        ddd: 0,
        ind: 1,
        ty: 4,
        nm: 'Core Beacon',
        sr: 1,
        ks: {
          o: { a: 0, k: 100 },
          r: { a: 0, k: 0 },
          p: { a: 0, k: [50, 50, 0] },
          a: { a: 0, k: [0, 0, 0] },
          s: {
            a: 1,
            k: [
              { t: 0, s: [85, 85, 100], e: [120, 120, 100] },
              { t: 45, s: [120, 120, 100], e: [85, 85, 100] },
              { t: 90, s: [85, 85, 100], e: [85, 85, 100] }
            ]
          }
        },
        ao: 0,
        shapes: [
          {
            ty: 'gr',
            it: [
              {
                ty: 'el',
                d: 1,
                p: { a: 0, k: [0, 0] },
                s: { a: 0, k: [16, 16] }
              },
              {
                ty: 'fl',
                c: { a: 0, k: [0.22, 0.74, 0.97, 1] }, // Cyan #38bdf8
                o: { a: 0, k: 100 }
              },
              {
                ty: 'st',
                c: { a: 0, k: [1, 1, 1, 1] }, // White highlight
                o: { a: 0, k: 90 },
                w: { a: 0, k: 2 }
              },
              {
                ty: 'tr',
                p: { a: 0, k: [0, 0] },
                a: { a: 0, k: [0, 0] },
                s: { a: 0, k: [100, 100] },
                r: { a: 0, k: 0 },
                o: { a: 0, k: 100 }
              }
            ],
            nm: 'Dot'
          }
        ],
        ip: 0,
        op
      },
      // Layer 2: Expanding Radar Wave 1
      {
        ddd: 0,
        ind: 2,
        ty: 4,
        nm: 'Radar Wave 1',
        sr: 1,
        ks: {
          o: {
            a: 1,
            k: [
              { t: 0, s: [90], e: [0] },
              { t: 55, s: [0], e: [0] },
              { t: 90, s: [0], e: [90] }
            ]
          },
          r: { a: 0, k: 0 },
          p: { a: 0, k: [50, 50, 0] },
          a: { a: 0, k: [0, 0, 0] },
          s: {
            a: 1,
            k: [
              { t: 0, s: [60, 60, 100], e: [320, 320, 100] },
              { t: 55, s: [320, 320, 100], e: [320, 320, 100] },
              { t: 90, s: [60, 60, 100], e: [60, 60, 100] }
            ]
          }
        },
        ao: 0,
        shapes: [
          {
            ty: 'gr',
            it: [
              {
                ty: 'el',
                d: 1,
                p: { a: 0, k: [0, 0] },
                s: { a: 0, k: [18, 18] }
              },
              {
                ty: 'st',
                c: { a: 0, k: [0.22, 0.74, 0.97, 1] },
                o: { a: 0, k: 100 },
                w: { a: 0, k: 2 }
              },
              {
                ty: 'tr',
                p: { a: 0, k: [0, 0] },
                a: { a: 0, k: [0, 0] },
                s: { a: 0, k: [100, 100] },
                r: { a: 0, k: 0 },
                o: { a: 0, k: 100 }
              }
            ],
            nm: 'Wave Ring 1'
          }
        ],
        ip: 0,
        op
      },
      // Layer 3: Expanding Radar Wave 2 (Offset by 35 frames)
      {
        ddd: 0,
        ind: 3,
        ty: 4,
        nm: 'Radar Wave 2',
        sr: 1,
        ks: {
          o: {
            a: 1,
            k: [
              { t: 0, s: [30], e: [0] },
              { t: 25, s: [0], e: [90] },
              { t: 35, s: [90], e: [0] },
              { t: 90, s: [0], e: [30] }
            ]
          },
          r: { a: 0, k: 0 },
          p: { a: 0, k: [50, 50, 0] },
          a: { a: 0, k: [0, 0, 0] },
          s: {
            a: 1,
            k: [
              { t: 0, s: [220, 220, 100], e: [320, 320, 100] },
              { t: 35, s: [60, 60, 100], e: [320, 320, 100] },
              { t: 90, s: [320, 320, 100], e: [220, 220, 100] }
            ]
          }
        },
        ao: 0,
        shapes: [
          {
            ty: 'gr',
            it: [
              {
                ty: 'el',
                d: 1,
                p: { a: 0, k: [0, 0] },
                s: { a: 0, k: [18, 18] }
              },
              {
                ty: 'st',
                c: { a: 0, k: [0.0, 0.9, 1.0, 1] },
                o: { a: 0, k: 80 },
                w: { a: 0, k: 1.5 }
              },
              {
                ty: 'tr',
                p: { a: 0, k: [0, 0] },
                a: { a: 0, k: [0, 0] },
                s: { a: 0, k: [100, 100] },
                r: { a: 0, k: 0 },
                o: { a: 0, k: 100 }
              }
            ],
            nm: 'Wave Ring 2'
          }
        ],
        ip: 0,
        op
      }
    ]
  }
}

// -----------------------------------------------------------------------------
// 6. Contact Delivery / Success Checkmark (mail-sent)
// -----------------------------------------------------------------------------
function buildMailSentLottie() {
  const w = 200
  const h = 200
  const fr = 60
  const op = 90

  return {
    v: '5.7.4',
    fr,
    ip: 0,
    op,
    w,
    h,
    nm: 'Message Sent Confirmation',
    ddd: 0,
    assets: [],
    layers: [
      // Layer 1: Checkmark Icon
      {
        ddd: 0,
        ind: 1,
        ty: 4,
        nm: 'Checkmark Mark',
        sr: 1,
        ks: {
          o: {
            a: 1,
            k: [
              { t: 0, s: [0], e: [100] },
              { t: 25, s: [100], e: [100] },
              { t: 90, s: [100], e: [100] }
            ]
          },
          r: { a: 0, k: 0 },
          p: { a: 0, k: [100, 100, 0] },
          a: { a: 0, k: [0, 0, 0] },
          s: {
            a: 1,
            k: [
              { t: 0, s: [40, 40, 100], e: [115, 115, 100] },
              { t: 30, s: [115, 115, 100], e: [100, 100, 100] },
              { t: 90, s: [100, 100, 100], e: [100, 100, 100] }
            ]
          }
        },
        ao: 0,
        shapes: [
          {
            ty: 'gr',
            it: [
              // Checkmark stem (Left)
              {
                ty: 'rc',
                d: 1,
                s: { a: 0, k: [18, 6] },
                p: { a: 0, k: [-12, 4] },
                r: { a: 0, k: 3 }
              },
              // Checkmark stem (Right)
              {
                ty: 'rc',
                d: 1,
                s: { a: 0, k: [38, 6] },
                p: { a: 0, k: [10, -3] },
                r: { a: 0, k: 3 }
              },
              {
                ty: 'fl',
                c: { a: 0, k: [0.22, 0.74, 0.97, 1] }, // Cyan
                o: { a: 0, k: 100 }
              },
              {
                ty: 'tr',
                p: { a: 0, k: [0, 0] },
                a: { a: 0, k: [0, 0] },
                s: { a: 0, k: [100, 100] },
                r: { a: 0, k: 0 },
                o: { a: 0, k: 100 }
              }
            ],
            nm: 'Checkmark Arms'
          }
        ],
        ip: 0,
        op
      },
      // Layer 2: Glowing Shield Halo
      {
        ddd: 0,
        ind: 2,
        ty: 4,
        nm: 'Halo Circle',
        sr: 1,
        ks: {
          o: {
            a: 1,
            k: [
              { t: 0, s: [0], e: [100] },
              { t: 20, s: [100], e: [100] },
              { t: 90, s: [100], e: [100] }
            ]
          },
          r: { a: 0, k: 0 },
          p: { a: 0, k: [100, 100, 0] },
          a: { a: 0, k: [0, 0, 0] },
          s: {
            a: 1,
            k: [
              { t: 0, s: [30, 30, 100], e: [105, 105, 100] },
              { t: 25, s: [105, 105, 100], e: [100, 100, 100] },
              { t: 90, s: [100, 100, 100], e: [100, 100, 100] }
            ]
          }
        },
        ao: 0,
        shapes: [
          {
            ty: 'gr',
            it: [
              {
                ty: 'el',
                d: 1,
                p: { a: 0, k: [0, 0] },
                s: { a: 0, k: [110, 110] }
              },
              {
                ty: 'fl',
                c: { a: 0, k: [0.05, 0.2, 0.35, 0.35] },
                o: { a: 0, k: 100 }
              },
              {
                ty: 'st',
                c: { a: 0, k: [0.22, 0.74, 0.97, 1] },
                o: { a: 0, k: 100 },
                w: { a: 0, k: 3 }
              },
              {
                ty: 'tr',
                p: { a: 0, k: [0, 0] },
                a: { a: 0, k: [0, 0] },
                s: { a: 0, k: [100, 100] },
                r: { a: 0, k: 0 },
                o: { a: 0, k: 100 }
              }
            ],
            nm: 'Halo'
          }
        ],
        ip: 0,
        op
      }
    ]
  }
}

// -----------------------------------------------------------------------------
// 7. Site-wide Ambient Retro Space Flight Odyssey Animation
//    Combines childhood retro flight shooter + cyber constellation +
//    fluid quantum waves + digital rain + floating 3D wireframe.
// -----------------------------------------------------------------------------
function buildRetroSpaceShmupAmbientLottie() {
  const w = 1000
  const h = 1000
  const fr = 60
  const op = 240 // 4 seconds ultra-smooth loop

  return {
    v: '5.7.4',
    fr,
    ip: 0,
    op,
    w,
    h,
    nm: 'Ambient Retro Flight Odyssey',
    ddd: 0,
    assets: [],
    layers: [
      // Layer 1: Fluid Quantum Aurora Nebula Wave (Gentle breathing backdrop)
      {
        ddd: 0,
        ind: 1,
        ty: 4,
        nm: 'Quantum Nebula Wave',
        sr: 1,
        ks: {
          o: {
            a: 1,
            k: [
              { t: 0, s: [14], e: [26] },
              { t: 120, s: [26], e: [14] },
              { t: 240, s: [14], e: [14] }
            ]
          },
          r: { a: 0, k: 0 },
          p: {
            a: 1,
            k: [
              { t: 0, s: [500, 360, 0], e: [515, 345, 0] },
              { t: 120, s: [515, 345, 0], e: [500, 360, 0] },
              { t: 240, s: [500, 360, 0], e: [500, 360, 0] }
            ]
          },
          a: { a: 0, k: [0, 0, 0] },
          s: {
            a: 1,
            k: [
              { t: 0, s: [100, 100, 100], e: [108, 106, 100] },
              { t: 120, s: [108, 106, 100], e: [100, 100, 100] },
              { t: 240, s: [100, 100, 100], e: [100, 100, 100] }
            ]
          }
        },
        ao: 0,
        shapes: [
          {
            ty: 'gr',
            it: [
              {
                ty: 'el',
                d: 1,
                p: { a: 0, k: [0, 0] },
                s: { a: 0, k: [820, 260] }
              },
              {
                ty: 'fl',
                c: { a: 0, k: [0.08, 0.45, 0.65, 1] }, // Cyan glow aura
                o: { a: 0, k: 60 }
              },
              {
                ty: 'tr',
                p: { a: 0, k: [0, 0] },
                a: { a: 0, k: [0, 0] },
                s: { a: 0, k: [100, 100] },
                r: { a: 0, k: -8 },
                o: { a: 0, k: 100 }
              }
            ],
            nm: 'Aurora Ellipse'
          }
        ],
        ip: 0,
        op
      },

      // Layer 2: Digital Matrix Warp Rain (Cascading Data Stream Dashes)
      {
        ddd: 0,
        ind: 2,
        ty: 4,
        nm: 'Matrix Stream Dash Col 1',
        sr: 1,
        ks: {
          o: { a: 0, k: 45 },
          r: { a: 0, k: 0 },
          p: {
            a: 1,
            k: [
              { t: 0, s: [180, -60, 0], e: [180, 1060, 0] },
              { t: 120, s: [180, 1060, 0], e: [180, -60, 0] },
              { t: 121, s: [180, -60, 0], e: [180, 1060, 0] },
              { t: 240, s: [180, 1060, 0], e: [180, 1060, 0] }
            ]
          },
          a: { a: 0, k: [0, 0, 0] },
          s: { a: 0, k: [100, 100, 100] }
        },
        ao: 0,
        shapes: [
          {
            ty: 'gr',
            it: [
              {
                ty: 'rc',
                d: 1,
                s: { a: 0, k: [2.5, 34] },
                p: { a: 0, k: [0, 0] },
                r: { a: 0, k: 1 }
              },
              {
                ty: 'fl',
                c: { a: 0, k: [0.22, 0.74, 0.97, 1] }, // Cyan
                o: { a: 0, k: 80 }
              },
              {
                ty: 'tr',
                p: { a: 0, k: [0, 0] },
                a: { a: 0, k: [0, 0] },
                s: { a: 0, k: [100, 100] },
                r: { a: 0, k: 0 },
                o: { a: 0, k: 100 }
              }
            ],
            nm: 'Dash'
          }
        ],
        ip: 0,
        op
      },
      {
        ddd: 0,
        ind: 3,
        ty: 4,
        nm: 'Matrix Stream Dash Col 2',
        sr: 1,
        ks: {
          o: { a: 0, k: 40 },
          r: { a: 0, k: 0 },
          p: {
            a: 1,
            k: [
              { t: 0, s: [380, 500, 0], e: [380, 1060, 0] },
              { t: 60, s: [380, 1060, 0], e: [380, -60, 0] },
              { t: 61, s: [380, -60, 0], e: [380, 1060, 0] },
              { t: 180, s: [380, 1060, 0], e: [380, -60, 0] },
              { t: 181, s: [380, -60, 0], e: [380, 500, 0] },
              { t: 240, s: [380, 500, 0], e: [380, 500, 0] }
            ]
          },
          a: { a: 0, k: [0, 0, 0] },
          s: { a: 0, k: [100, 100, 100] }
        },
        ao: 0,
        shapes: [
          {
            ty: 'gr',
            it: [
              {
                ty: 'rc',
                d: 1,
                s: { a: 0, k: [2.5, 42] },
                p: { a: 0, k: [0, 0] },
                r: { a: 0, k: 1 }
              },
              {
                ty: 'fl',
                c: { a: 0, k: [0.66, 0.35, 0.98, 1] }, // Electric violet
                o: { a: 0, k: 70 }
              },
              {
                ty: 'tr',
                p: { a: 0, k: [0, 0] },
                a: { a: 0, k: [0, 0] },
                s: { a: 0, k: [100, 100] },
                r: { a: 0, k: 0 },
                o: { a: 0, k: 100 }
              }
            ],
            nm: 'Dash'
          }
        ],
        ip: 0,
        op
      },
      {
        ddd: 0,
        ind: 4,
        ty: 4,
        nm: 'Matrix Stream Dash Col 3',
        sr: 1,
        ks: {
          o: { a: 0, k: 35 },
          r: { a: 0, k: 0 },
          p: {
            a: 1,
            k: [
              { t: 0, s: [680, 100, 0], e: [680, 1060, 0] },
              { t: 100, s: [680, 1060, 0], e: [680, -60, 0] },
              { t: 101, s: [680, -60, 0], e: [680, 1060, 0] },
              { t: 220, s: [680, 1060, 0], e: [680, -60, 0] },
              { t: 221, s: [680, -60, 0], e: [680, 100, 0] },
              { t: 240, s: [680, 100, 0], e: [680, 100, 0] }
            ]
          },
          a: { a: 0, k: [0, 0, 0] },
          s: { a: 0, k: [100, 100, 100] }
        },
        ao: 0,
        shapes: [
          {
            ty: 'gr',
            it: [
              {
                ty: 'rc',
                d: 1,
                s: { a: 0, k: [2, 30] },
                p: { a: 0, k: [0, 0] },
                r: { a: 0, k: 1 }
              },
              {
                ty: 'fl',
                c: { a: 0, k: [0.22, 0.74, 0.97, 1] },
                o: { a: 0, k: 70 }
              },
              {
                ty: 'tr',
                p: { a: 0, k: [0, 0] },
                a: { a: 0, k: [0, 0] },
                s: { a: 0, k: [100, 100] },
                r: { a: 0, k: 0 },
                o: { a: 0, k: 100 }
              }
            ],
            nm: 'Dash'
          }
        ],
        ip: 0,
        op
      },
      {
        ddd: 0,
        ind: 5,
        ty: 4,
        nm: 'Matrix Stream Dash Col 4',
        sr: 1,
        ks: {
          o: { a: 0, k: 40 },
          r: { a: 0, k: 0 },
          p: {
            a: 1,
            k: [
              { t: 0, s: [880, -60, 0], e: [880, 1060, 0] },
              { t: 120, s: [880, 1060, 0], e: [880, -60, 0] },
              { t: 121, s: [880, -60, 0], e: [880, 1060, 0] },
              { t: 240, s: [880, 1060, 0], e: [880, 1060, 0] }
            ]
          },
          a: { a: 0, k: [0, 0, 0] },
          s: { a: 0, k: [100, 100, 100] }
        },
        ao: 0,
        shapes: [
          {
            ty: 'gr',
            it: [
              {
                ty: 'rc',
                d: 1,
                s: { a: 0, k: [2, 38] },
                p: { a: 0, k: [0, 0] },
                r: { a: 0, k: 1 }
              },
              {
                ty: 'fl',
                c: { a: 0, k: [0.2, 0.83, 0.6, 1] }, // Emerald
                o: { a: 0, k: 70 }
              },
              {
                ty: 'tr',
                p: { a: 0, k: [0, 0] },
                a: { a: 0, k: [0, 0] },
                s: { a: 0, k: [100, 100] },
                r: { a: 0, k: 0 },
                o: { a: 0, k: 100 }
              }
            ],
            nm: 'Dash'
          }
        ],
        ip: 0,
        op
      },

      // Layer 3: Cyber Constellation Mesh & Neural Nodes
      {
        ddd: 0,
        ind: 6,
        ty: 4,
        nm: 'Neural Constellation Links',
        sr: 1,
        ks: {
          o: {
            a: 1,
            k: [
              { t: 0, s: [25], e: [45] },
              { t: 120, s: [45], e: [25] },
              { t: 240, s: [25], e: [25] }
            ]
          },
          r: { a: 0, k: 0 },
          p: { a: 0, k: [500, 240, 0] },
          a: { a: 0, k: [0, 0, 0] },
          s: { a: 0, k: [100, 100, 100] }
        },
        ao: 0,
        shapes: [
          // Constellation Node 1
          {
            ty: 'gr',
            it: [
              {
                ty: 'el',
                d: 1,
                p: { a: 0, k: [-220, -40] },
                s: { a: 0, k: [8, 8] }
              },
              {
                ty: 'fl',
                c: { a: 0, k: [0.22, 0.74, 0.97, 1] },
                o: { a: 0, k: 100 }
              },
              {
                ty: 'tr',
                p: { a: 0, k: [0, 0] },
                a: { a: 0, k: [0, 0] },
                s: { a: 0, k: [100, 100] },
                r: { a: 0, k: 0 },
                o: { a: 0, k: 100 }
              }
            ],
            nm: 'Node A'
          },
          // Constellation Node 2
          {
            ty: 'gr',
            it: [
              {
                ty: 'el',
                d: 1,
                p: { a: 0, k: [-40, -90] },
                s: { a: 0, k: [10, 10] }
              },
              {
                ty: 'fl',
                c: { a: 0, k: [0.66, 0.35, 0.98, 1] },
                o: { a: 0, k: 100 }
              },
              {
                ty: 'tr',
                p: { a: 0, k: [0, 0] },
                a: { a: 0, k: [0, 0] },
                s: { a: 0, k: [100, 100] },
                r: { a: 0, k: 0 },
                o: { a: 0, k: 100 }
              }
            ],
            nm: 'Node B'
          },
          // Constellation Node 3
          {
            ty: 'gr',
            it: [
              {
                ty: 'el',
                d: 1,
                p: { a: 0, k: [160, -30] },
                s: { a: 0, k: [8, 8] }
              },
              {
                ty: 'fl',
                c: { a: 0, k: [0.22, 0.74, 0.97, 1] },
                o: { a: 0, k: 100 }
              },
              {
                ty: 'tr',
                p: { a: 0, k: [0, 0] },
                a: { a: 0, k: [0, 0] },
                s: { a: 0, k: [100, 100] },
                r: { a: 0, k: 0 },
                o: { a: 0, k: 100 }
              }
            ],
            nm: 'Node C'
          },
          // Constellation Node 4
          {
            ty: 'gr',
            it: [
              {
                ty: 'el',
                d: 1,
                p: { a: 0, k: [320, -70] },
                s: { a: 0, k: [7, 7] }
              },
              {
                ty: 'fl',
                c: { a: 0, k: [0.2, 0.83, 0.6, 1] },
                o: { a: 0, k: 100 }
              },
              {
                ty: 'tr',
                p: { a: 0, k: [0, 0] },
                a: { a: 0, k: [0, 0] },
                s: { a: 0, k: [100, 100] },
                r: { a: 0, k: 0 },
                o: { a: 0, k: 100 }
              }
            ],
            nm: 'Node D'
          }
        ],
        ip: 0,
        op
      },

      // Layer 4: Floating 3D Wireframe Asteroid Cube (Deep Parallax)
      {
        ddd: 0,
        ind: 7,
        ty: 4,
        nm: 'Floating Wireframe Cube',
        sr: 1,
        ks: {
          o: { a: 0, k: 35 },
          r: {
            a: 1,
            k: [
              { t: 0, s: [0], e: [180] },
              { t: 240, s: [180], e: [360] }
            ]
          },
          p: {
            a: 1,
            k: [
              { t: 0, s: [820, 320, 0], e: [805, 345, 0] },
              { t: 120, s: [805, 345, 0], e: [820, 320, 0] },
              { t: 240, s: [820, 320, 0], e: [820, 320, 0] }
            ]
          },
          a: { a: 0, k: [0, 0, 0] },
          s: { a: 0, k: [100, 100, 100] }
        },
        ao: 0,
        shapes: [
          {
            ty: 'gr',
            it: [
              // Outer square
              {
                ty: 'rc',
                d: 1,
                s: { a: 0, k: [56, 56] },
                p: { a: 0, k: [0, 0] },
                r: { a: 0, k: 2 }
              },
              {
                ty: 'st',
                c: { a: 0, k: [0.66, 0.35, 0.98, 1] }, // Violet
                o: { a: 0, k: 70 },
                w: { a: 0, k: 1.5 }
              },
              // Inner tilted square
              {
                ty: 'rc',
                d: 1,
                s: { a: 0, k: [38, 38] },
                p: { a: 0, k: [0, 0] },
                r: { a: 0, k: 2 }
              },
              {
                ty: 'st',
                c: { a: 0, k: [0.22, 0.74, 0.97, 1] }, // Cyan
                o: { a: 0, k: 50 },
                w: { a: 0, k: 1 }
              },
              {
                ty: 'tr',
                p: { a: 0, k: [0, 0] },
                a: { a: 0, k: [0, 0] },
                s: { a: 0, k: [100, 100] },
                r: { a: 0, k: 45 },
                o: { a: 0, k: 100 }
              }
            ],
            nm: 'Wireframe Cube Group'
          }
        ],
        ip: 0,
        op
      },

      // Layer 5: Impact Energy Particle Dispersal Burst (Target Hit Spark)
      {
        ddd: 0,
        ind: 8,
        ty: 4,
        nm: 'Laser Impact Energy Burst',
        sr: 1,
        ks: {
          o: {
            a: 1,
            k: [
              { t: 0, s: [0], e: [0] },
              { t: 55, s: [0], e: [100] },
              { t: 65, s: [100], e: [0] },
              { t: 75, s: [0], e: [0] },
              { t: 175, s: [0], e: [100] },
              { t: 185, s: [100], e: [0] },
              { t: 195, s: [0], e: [0] },
              { t: 240, s: [0], e: [0] }
            ]
          },
          r: {
            a: 1,
            k: [
              { t: 0, s: [0], e: [180] },
              { t: 240, s: [180], e: [360] }
            ]
          },
          p: { a: 0, k: [500, 180, 0] },
          a: { a: 0, k: [0, 0, 0] },
          s: {
            a: 1,
            k: [
              { t: 55, s: [10, 10, 100], e: [120, 120, 100] },
              { t: 75, s: [120, 120, 100], e: [10, 10, 100] },
              { t: 175, s: [10, 10, 100], e: [120, 120, 100] },
              { t: 195, s: [120, 120, 100], e: [10, 10, 100] }
            ]
          }
        },
        ao: 0,
        shapes: [
          {
            ty: 'gr',
            it: [
              {
                ty: 'sr',
                sy: 1,
                p: { a: 0, k: 8 },
                pt: { a: 0, k: [0, 0] },
                ir: { a: 0, k: 6 },
                or: { a: 0, k: 22 },
                is: { a: 0, k: 0 },
                os: { a: 0, k: 0 },
                r: { a: 0, k: 0 }
              },
              {
                ty: 'fl',
                c: { a: 0, k: [0.0, 0.95, 1.0, 1] },
                o: { a: 0, k: 100 }
              },
              {
                ty: 'el',
                d: 1,
                p: { a: 0, k: [0, 0] },
                s: { a: 0, k: [38, 38] }
              },
              {
                ty: 'st',
                c: { a: 0, k: [1, 1, 1, 1] },
                o: { a: 0, k: 90 },
                w: { a: 0, k: 2 }
              },
              {
                ty: 'tr',
                p: { a: 0, k: [0, 0] },
                a: { a: 0, k: [0, 0] },
                s: { a: 0, k: [100, 100] },
                r: { a: 0, k: 0 },
                o: { a: 0, k: 100 }
              }
            ],
            nm: 'Burst'
          }
        ],
        ip: 0,
        op
      },

      // Layer 6: Retro Invader Drone (Childhood Arcade Target Boss)
      {
        ddd: 0,
        ind: 9,
        ty: 4,
        nm: 'Retro Arcade Invader Drone',
        sr: 1,
        ks: {
          o: { a: 0, k: 65 },
          r: {
            a: 1,
            k: [
              { t: 0, s: [-3], e: [3] },
              { t: 120, s: [3], e: [-3] },
              { t: 240, s: [-3], e: [-3] }
            ]
          },
          p: {
            a: 1,
            k: [
              { t: 0, s: [500, 180, 0], e: [550, 175, 0] },
              { t: 60, s: [550, 175, 0], e: [500, 180, 0] },
              { t: 120, s: [500, 180, 0], e: [450, 185, 0] },
              { t: 180, s: [450, 185, 0], e: [500, 180, 0] },
              { t: 240, s: [500, 180, 0], e: [500, 180, 0] }
            ]
          },
          a: { a: 0, k: [0, 0, 0] },
          s: { a: 0, k: [100, 100, 100] }
        },
        ao: 0,
        shapes: [
          // Outer Shield Ring
          {
            ty: 'gr',
            it: [
              {
                ty: 'el',
                d: 1,
                p: { a: 0, k: [0, 0] },
                s: { a: 0, k: [76, 76] }
              },
              {
                ty: 'st',
                c: { a: 0, k: [0.22, 0.74, 0.97, 1] },
                o: { a: 0, k: 40 },
                w: { a: 0, k: 1.5 }
              },
              {
                ty: 'tr',
                p: { a: 0, k: [0, 0] },
                a: { a: 0, k: [0, 0] },
                s: { a: 0, k: [100, 100] },
                r: { a: 0, k: 0 },
                o: { a: 0, k: 100 }
              }
            ],
            nm: 'Invader Shield'
          },
          // Invader Wings / Hexagonal Core
          {
            ty: 'gr',
            it: [
              {
                ty: 'sr',
                sy: 2, // Hexagon
                p: { a: 0, k: 6 },
                pt: { a: 0, k: [0, 0] },
                or: { a: 0, k: 26 },
                os: { a: 0, k: 4 },
                r: { a: 0, k: 0 }
              },
              {
                ty: 'fl',
                c: { a: 0, k: [0.03, 0.08, 0.16, 1] },
                o: { a: 0, k: 90 }
              },
              {
                ty: 'st',
                c: { a: 0, k: [0.66, 0.35, 0.98, 1] }, // Violet outline
                o: { a: 0, k: 80 },
                w: { a: 0, k: 2 }
              },
              // Center Eye
              {
                ty: 'el',
                d: 1,
                p: { a: 0, k: [0, 0] },
                s: { a: 0, k: [12, 12] }
              },
              {
                ty: 'fl',
                c: { a: 0, k: [0.22, 0.74, 0.97, 1] },
                o: { a: 0, k: 100 }
              },
              {
                ty: 'tr',
                p: { a: 0, k: [0, 0] },
                a: { a: 0, k: [0, 0] },
                s: { a: 0, k: [100, 100] },
                r: { a: 0, k: 0 },
                o: { a: 0, k: 100 }
              }
            ],
            nm: 'Invader Core'
          }
        ],
        ip: 0,
        op
      },

      // Layer 7: Dual Plasma Laser Blasts (Volley 1: t 30..60)
      {
        ddd: 0,
        ind: 10,
        ty: 4,
        nm: 'Laser Volley A',
        sr: 1,
        ks: {
          o: {
            a: 1,
            k: [
              { t: 0, s: [0], e: [0] },
              { t: 28, s: [0], e: [100] },
              { t: 30, s: [100], e: [100] },
              { t: 58, s: [100], e: [0] },
              { t: 60, s: [0], e: [0] },
              { t: 240, s: [0], e: [0] }
            ]
          },
          r: { a: 0, k: 0 },
          p: {
            a: 1,
            k: [
              { t: 0, s: [480, 680, 0], e: [480, 680, 0] },
              { t: 30, s: [480, 680, 0], e: [495, 180, 0] },
              { t: 60, s: [495, 180, 0], e: [495, 180, 0] },
              { t: 240, s: [495, 180, 0], e: [495, 180, 0] }
            ]
          },
          a: { a: 0, k: [0, 0, 0] },
          s: { a: 0, k: [100, 100, 100] }
        },
        ao: 0,
        shapes: [
          {
            ty: 'gr',
            it: [
              // Left Bolt
              {
                ty: 'rc',
                d: 1,
                s: { a: 0, k: [3.5, 24] },
                p: { a: 0, k: [-20, 0] },
                r: { a: 0, k: 1 }
              },
              {
                ty: 'fl',
                c: { a: 0, k: [0.0, 0.95, 1.0, 1] }, // Electric cyan
                o: { a: 0, k: 100 }
              },
              // Right Bolt
              {
                ty: 'rc',
                d: 1,
                s: { a: 0, k: [3.5, 24] },
                p: { a: 0, k: [20, 0] },
                r: { a: 0, k: 1 }
              },
              {
                ty: 'fl',
                c: { a: 0, k: [0.0, 0.95, 1.0, 1] },
                o: { a: 0, k: 100 }
              },
              {
                ty: 'tr',
                p: { a: 0, k: [0, 0] },
                a: { a: 0, k: [0, 0] },
                s: { a: 0, k: [100, 100] },
                r: { a: 0, k: 0 },
                o: { a: 0, k: 100 }
              }
            ],
            nm: 'Laser Pair'
          }
        ],
        ip: 0,
        op
      },

      // Layer 8: Dual Plasma Laser Blasts (Volley 2: t 150..180)
      {
        ddd: 0,
        ind: 11,
        ty: 4,
        nm: 'Laser Volley B',
        sr: 1,
        ks: {
          o: {
            a: 1,
            k: [
              { t: 0, s: [0], e: [0] },
              { t: 148, s: [0], e: [100] },
              { t: 150, s: [100], e: [100] },
              { t: 178, s: [100], e: [0] },
              { t: 180, s: [0], e: [0] },
              { t: 240, s: [0], e: [0] }
            ]
          },
          r: { a: 0, k: 0 },
          p: {
            a: 1,
            k: [
              { t: 0, s: [520, 680, 0], e: [520, 680, 0] },
              { t: 150, s: [520, 680, 0], e: [505, 180, 0] },
              { t: 180, s: [505, 180, 0], e: [505, 180, 0] },
              { t: 240, s: [505, 180, 0], e: [505, 180, 0] }
            ]
          },
          a: { a: 0, k: [0, 0, 0] },
          s: { a: 0, k: [100, 100, 100] }
        },
        ao: 0,
        shapes: [
          {
            ty: 'gr',
            it: [
              // Left Bolt
              {
                ty: 'rc',
                d: 1,
                s: { a: 0, k: [3.5, 24] },
                p: { a: 0, k: [-20, 0] },
                r: { a: 0, k: 1 }
              },
              {
                ty: 'fl',
                c: { a: 0, k: [0.0, 0.95, 1.0, 1] },
                o: { a: 0, k: 100 }
              },
              // Right Bolt
              {
                ty: 'rc',
                d: 1,
                s: { a: 0, k: [3.5, 24] },
                p: { a: 0, k: [20, 0] },
                r: { a: 0, k: 1 }
              },
              {
                ty: 'fl',
                c: { a: 0, k: [0.0, 0.95, 1.0, 1] },
                o: { a: 0, k: 100 }
              },
              {
                ty: 'tr',
                p: { a: 0, k: [0, 0] },
                a: { a: 0, k: [0, 0] },
                s: { a: 0, k: [100, 100] },
                r: { a: 0, k: 0 },
                o: { a: 0, k: 100 }
              }
            ],
            nm: 'Laser Pair'
          }
        ],
        ip: 0,
        op
      },

      // Layer 9: Childhood Retro Flight Shooter Starfighter (Piloted Hero Ship)
      {
        ddd: 0,
        ind: 12,
        ty: 4,
        nm: 'Hero Starfighter Ship',
        sr: 1,
        ks: {
          o: { a: 0, k: 80 },
          r: {
            a: 1,
            k: [
              { t: 0, s: [-6], e: [0] },
              { t: 60, s: [0], e: [6] },
              { t: 120, s: [6], e: [0] },
              { t: 180, s: [0], e: [-6] },
              { t: 240, s: [-6], e: [-6] }
            ]
          },
          p: {
            a: 1,
            k: [
              { t: 0, s: [480, 720, 0], e: [430, 720, 0] },
              { t: 60, s: [430, 720, 0], e: [500, 720, 0] },
              { t: 120, s: [500, 720, 0], e: [570, 720, 0] },
              { t: 180, s: [570, 720, 0], e: [480, 720, 0] },
              { t: 240, s: [480, 720, 0], e: [480, 720, 0] }
            ]
          },
          a: { a: 0, k: [0, 0, 0] },
          s: { a: 0, k: [100, 100, 100] }
        },
        ao: 0,
        shapes: [
          // Thruster Exhaust Flames (Animated Pulsing)
          {
            ty: 'gr',
            it: [
              // Left Flame
              {
                ty: 'rc',
                d: 1,
                s: { a: 0, k: [6, 18] },
                p: { a: 0, k: [-12, 30] },
                r: { a: 0, k: 2 }
              },
              {
                ty: 'fl',
                c: { a: 0, k: [0.22, 0.74, 0.97, 1] },
                o: { a: 0, k: 90 }
              },
              // Right Flame
              {
                ty: 'rc',
                d: 1,
                s: { a: 0, k: [6, 18] },
                p: { a: 0, k: [12, 30] },
                r: { a: 0, k: 2 }
              },
              {
                ty: 'fl',
                c: { a: 0, k: [0.22, 0.74, 0.97, 1] },
                o: { a: 0, k: 90 }
              },
              {
                ty: 'tr',
                p: { a: 0, k: [0, 0] },
                a: { a: 0, k: [0, 0] },
                s: { a: 0, k: [100, 100] },
                r: { a: 0, k: 0 },
                o: { a: 0, k: 100 }
              }
            ],
            nm: 'Thruster Exhaust Flames'
          },
          // Main Starfighter Chassis & Delta Wings
          {
            ty: 'gr',
            it: [
              // Delta Wing Body (Triangle)
              {
                ty: 'sr',
                sy: 2, // Polygon
                p: { a: 0, k: 3 },
                pt: { a: 0, k: [0, 0] },
                or: { a: 0, k: 34 },
                os: { a: 0, k: 6 },
                r: { a: 0, k: 0 }
              },
              {
                ty: 'fl',
                c: { a: 0, k: [0.04, 0.09, 0.18, 1] }, // Dark obsidian
                o: { a: 0, k: 95 }
              },
              {
                ty: 'st',
                c: { a: 0, k: [0.22, 0.74, 0.97, 1] }, // Cyan
                o: { a: 0, k: 90 },
                w: { a: 0, k: 2.2 }
              },
              // Left Wing Cannon Pod
              {
                ty: 'rc',
                d: 1,
                s: { a: 0, k: [5, 20] },
                p: { a: 0, k: [-20, 6] },
                r: { a: 0, k: 2 }
              },
              {
                ty: 'fl',
                c: { a: 0, k: [0.66, 0.35, 0.98, 1] }, // Violet cannon
                o: { a: 0, k: 100 }
              },
              // Right Wing Cannon Pod
              {
                ty: 'rc',
                d: 1,
                s: { a: 0, k: [5, 20] },
                p: { a: 0, k: [20, 6] },
                r: { a: 0, k: 2 }
              },
              {
                ty: 'fl',
                c: { a: 0, k: [0.66, 0.35, 0.98, 1] },
                o: { a: 0, k: 100 }
              },
              // Cockpit Jewel Singularity
              {
                ty: 'el',
                d: 1,
                p: { a: 0, k: [0, -6] },
                s: { a: 0, k: [10, 16] }
              },
              {
                ty: 'fl',
                c: { a: 0, k: [0.0, 0.95, 1.0, 1] },
                o: { a: 0, k: 100 }
              },
              {
                ty: 'tr',
                p: { a: 0, k: [0, 0] },
                a: { a: 0, k: [0, 0] },
                s: { a: 0, k: [100, 100] },
                r: { a: 0, k: 0 },
                o: { a: 0, k: 100 }
              }
            ],
            nm: 'Starfighter Chassis'
          }
        ],
        ip: 0,
        op
      }
    ]
  }
}

// -----------------------------------------------------------------------------
// Compilation Runner
// -----------------------------------------------------------------------------
async function main() {
  const targetDir = path.resolve(process.cwd(), 'public/animations')
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true })
  }

  const animations = [
    { id: 'retro-gameboy', fn: buildRetroGameboyLottie },
    { id: 'game-trophy', fn: buildGameTrophyLottie },
    { id: 'code-spark', fn: buildCodeSparkLottie },
    { id: 'ai-quantum-core', fn: buildAiQuantumCoreLottie },
    { id: 'pulse-radar', fn: buildPulseRadarLottie },
    { id: 'mail-sent', fn: buildMailSentLottie },
    { id: 'retro-space-odyssey', fn: buildRetroSpaceShmupAmbientLottie }
  ]

  for (const item of animations) {
    const lottieData = item.fn()
    const jsonPath = path.join(targetDir, `${item.id}.json`)
    fs.writeFileSync(jsonPath, JSON.stringify(lottieData, null, 2))
    console.log(`✓ Generated Lottie JSON: ${jsonPath}`)

    // Compile into authentic .lottie ZIP bundle
    const dotLottie = new DotLottie()
    dotLottie.addAnimation({
      id: item.id,
      data: lottieData
    })

    const built = await dotLottie.build()
    const buffer = Buffer.from(await built.toArrayBuffer())
    const lottiePath = path.join(targetDir, `${item.id}.lottie`)
    fs.writeFileSync(lottiePath, buffer)
    console.log(`✓ Generated DotLottie (.lottie): ${lottiePath} (${buffer.byteLength} bytes)`)
  }

  console.log('\nAll dotLottie and Lottie JSON animations generated successfully!')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
