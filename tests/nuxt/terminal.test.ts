import { describe, it, expect } from 'vitest'

function parseTerminalCommand(input: string): { command: string; args: string[] } {
  const raw = input.trim()
  if (!raw) return { command: '', args: [] }
  const [cmd, ...args] = raw.toLowerCase().split(/\s+/)
  return { command: cmd || '', args }
}

const supportedCommands = ['help', 'about', 'projects', 'skills', 'cv', 'contact', 'matrix', 'clear']

describe('PET-2001 Terminal Command Parser', () => {
  it('correctly parses simple command strings', () => {
    const { command, args } = parseTerminalCommand('help')
    expect(command).toBe('help')
    expect(args).toEqual([])
  })

  it('correctly parses commands with mixed case and leading/trailing whitespace', () => {
    const { command, args } = parseTerminalCommand('   PROJECTS  extra-arg  ')
    expect(command).toBe('projects')
    expect(args).toEqual(['extra-arg'])
  })

  it('identifies valid supported commands', () => {
    supportedCommands.forEach((cmd) => {
      const { command } = parseTerminalCommand(cmd)
      expect(supportedCommands.includes(command)).toBe(true)
    })
  })

  it('handles empty input gracefully', () => {
    const { command, args } = parseTerminalCommand('   ')
    expect(command).toBe('')
    expect(args).toEqual([])
  })
})
