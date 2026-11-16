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
    { id: 'code-spark', fn: buildCodeSparkLottie }
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
