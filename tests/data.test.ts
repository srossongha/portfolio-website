import { describe, it, expect } from 'vitest'
import {
  profile,
  socials,
  projects,
  marqueeRows,
  skillGroups,
  experiences,
  navLinks,
  seo,
} from '../app/data/site'

describe('app/data/site data integrity', () => {
  it('profile has valid personal identity fields', () => {
    expect(profile.name).toBeTruthy()
    expect(profile.role).toBeTruthy()
    expect(profile.tagline).toBeTruthy()
    expect(profile.bio.length).toBeGreaterThan(0)
    expect(profile.location).toBeTruthy()
    expect(profile.availability).toBeTruthy()
    expect(profile.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
    expect(profile.stats.length).toBeGreaterThanOrEqual(3)
    profile.stats.forEach((stat) => {
      expect(typeof stat.value).toBe('number')
      expect(typeof stat.label).toBe('string')
    })
  })

  it('socials contain valid links and labels', () => {
    expect(socials.length).toBeGreaterThanOrEqual(3)
    socials.forEach((social) => {
      expect(social.label).toBeTruthy()
      expect(social.href).toBeTruthy()
      expect(social.handle).toBeTruthy()
    })
  })

  it('projects have unique slugs and all required fields', () => {
    const slugs = new Set<string>()
    expect(projects.length).toBeGreaterThan(0)

    projects.forEach((project) => {
      expect(project.slug).toBeTruthy()
      expect(slugs.has(project.slug)).toBe(false)
      slugs.add(project.slug)

      expect(project.title).toBeTruthy()
      expect(project.tagline).toBeTruthy()
      expect(project.description).toBeTruthy()
      expect(project.year).toBeTruthy()
      expect(project.role).toBeTruthy()
      expect(Array.isArray(project.stack)).toBe(true)
      expect(project.stack.length).toBeGreaterThan(0)
      expect(Array.isArray(project.tags)).toBe(true)
      expect(project.tags.length).toBeGreaterThan(0)
      expect(Array.isArray(project.highlights)).toBe(true)
      expect(project.highlights.length).toBeGreaterThan(0)

      // Accent must be a valid 2-color tuple
      expect(Array.isArray(project.accent)).toBe(true)
      expect(project.accent.length).toBe(2)
      expect(project.accent[0]).toBeTruthy()
      expect(project.accent[1]).toBeTruthy()

      // Verify links
      expect(Array.isArray(project.links)).toBe(true)
      project.links.forEach((link) => {
        expect(link.label).toBeTruthy()
        if (link.href !== undefined) {
          expect(typeof link.href).toBe('string')
          expect(link.href.length).toBeGreaterThan(0)
        }
      })
    })
  })

  it('experiences are ordered with complete company info', () => {
    expect(experiences.length).toBeGreaterThanOrEqual(2)
    experiences.forEach((exp) => {
      expect(exp.period).toBeTruthy()
      expect(exp.role).toBeTruthy()
      expect(exp.organisation).toBeTruthy()
      expect(exp.description).toBeTruthy()
      expect(Array.isArray(exp.tags)).toBe(true)
    })
  })

  it('skill groups have valid items with numeric levels', () => {
    expect(skillGroups.length).toBeGreaterThan(0)
    skillGroups.forEach((group) => {
      expect(group.title).toBeTruthy()
      expect(group.summary).toBeTruthy()
      expect(group.items.length).toBeGreaterThan(0)
      group.items.forEach((item) => {
        expect(item.name).toBeTruthy()
        expect(typeof item.level).toBe('number')
        expect(item.level).toBeGreaterThanOrEqual(0)
        expect(item.level).toBeLessThanOrEqual(100)
      })
    })
  })

  it('marquee rows have distinct tech tags', () => {
    expect(marqueeRows.length).toBe(3)
    marqueeRows.forEach((row) => {
      expect(row.length).toBeGreaterThanOrEqual(5)
    })
  })

  it('navLinks point to valid root anchors', () => {
    expect(navLinks.length).toBeGreaterThanOrEqual(4)
    navLinks.forEach((nav) => {
      expect(nav.label).toBeTruthy()
      expect(nav.to.startsWith('/#')).toBe(true)
      expect(nav.section).toBeTruthy()
    })
  })

  it('seo metadata has valid title and url', () => {
    expect(seo.title).toBeTruthy()
    expect(seo.description).toBeTruthy()
    expect(seo.url.startsWith('https://')).toBe(true)
  })
})
