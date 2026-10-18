import { describe, it, expect } from 'vitest'

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

function validateContactInput(body: {
  name?: string
  email?: string
  message?: string
  company?: string
}) {
  const errors: Record<string, string> = {}

  if (body.company) {
    return { ok: true, isSpam: true, errors }
  }

  const name = body.name?.trim() ?? ''
  const email = body.email?.trim() ?? ''
  const message = body.message?.trim() ?? ''

  if (name.length < 2 || name.length > 100) {
    errors.name = 'Please provide your name.'
  }
  if (!isValidEmail(email) || email.length > 200) {
    errors.email = 'Please provide a valid email address.'
  }
  if (message.length < 10 || message.length > 2000) {
    errors.message = 'Your message should be between 10 and 2000 characters.'
  }

  return {
    ok: Object.keys(errors).length === 0,
    isSpam: false,
    errors,
  }
}

describe('Contact Form Validation & Security Logic', () => {
  it('accepts valid contact messages', () => {
    const res = validateContactInput({
      name: 'John Doe',
      email: 'john@example.com',
      message: 'Hello, I want to collaborate on a Nuxt project!',
    })
    expect(res.ok).toBe(true)
    expect(res.isSpam).toBe(false)
    expect(Object.keys(res.errors).length).toBe(0)
  })

  it('rejects short or empty names', () => {
    const res = validateContactInput({
      name: 'J',
      email: 'john@example.com',
      message: 'Hello, I want to collaborate on a Nuxt project!',
    })
    expect(res.ok).toBe(false)
    expect(res.errors.name).toBe('Please provide your name.')
  })

  it('rejects invalid email formats', () => {
    const invalidEmails = ['invalid', 'john@', '@example.com', 'john @example.com', 'john@.com']
    invalidEmails.forEach((email) => {
      const res = validateContactInput({
        name: 'John Doe',
        email,
        message: 'Hello, I want to collaborate on a Nuxt project!',
      })
      expect(res.ok).toBe(false)
      expect(res.errors.email).toBe('Please provide a valid email address.')
    })
  })

  it('rejects messages that are too short', () => {
    const res = validateContactInput({
      name: 'John Doe',
      email: 'john@example.com',
      message: 'Too short',
    })
    expect(res.ok).toBe(false)
    expect(res.errors.message).toBe('Your message should be between 10 and 2000 characters.')
  })

  it('detects and silently defuses honeypot bots', () => {
    const res = validateContactInput({
      name: 'Spam Bot',
      email: 'bot@spam.com',
      message: 'Buy cheap watches now!',
      company: 'Spam Inc',
    })
    expect(res.ok).toBe(true)
    expect(res.isSpam).toBe(true)
  })
})
