import { describe, it, expect } from 'vitest'
import { cn, clamp, lerp, mapRange, pad } from '../../app/lib/utils'

describe('app/lib/utils', () => {
  describe('cn (class names)', () => {
    it('merges class names correctly', () => {
      expect(cn('px-2', 'py-1')).toBe('px-2 py-1')
    })

    it('resolves tailwind conflicts in favor of later classes', () => {
      expect(cn('p-2', 'p-8')).toBe('p-8')
    })

    it('handles falsy conditionals', () => {
      const active = false
      expect(cn('base', active && 'active', 'other')).toBe('base other')
    })
  })

  describe('clamp', () => {
    it('keeps values within [min, max]', () => {
      expect(clamp(0.5, 0, 1)).toBe(0.5)
      expect(clamp(-5, 0, 1)).toBe(0)
      expect(clamp(15, 0, 1)).toBe(1)
      expect(clamp(50, 10, 100)).toBe(50)
      expect(clamp(5, 10, 100)).toBe(10)
      expect(clamp(105, 10, 100)).toBe(100)
    })
  })

  describe('lerp', () => {
    it('interpolates linearly', () => {
      expect(lerp(0, 100, 0.5)).toBe(50)
      expect(lerp(0, 100, 0)).toBe(0)
      expect(lerp(0, 100, 1)).toBe(100)
      expect(lerp(20, 40, 0.25)).toBe(25)
    })
  })

  describe('mapRange', () => {
    it('re-maps from input range to output range', () => {
      expect(mapRange(5, 0, 10, 0, 100)).toBe(50)
      expect(mapRange(0, 0, 10, 100, 200)).toBe(100)
      expect(mapRange(10, 0, 10, 100, 200)).toBe(200)
    })
  })

  describe('pad', () => {
    it('pads single digits with leading zero', () => {
      expect(pad(1)).toBe('01')
      expect(pad(9)).toBe('09')
      expect(pad(10)).toBe('10')
      expect(pad(5, 3)).toBe('005')
    })
  })
})

