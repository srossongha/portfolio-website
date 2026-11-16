/**
 * useTerminal.ts
 *
 * Global state management for the 1970s Commodore PET-2001 / DEC VT100
 * interactive CLI shell modal. Accessible from any header, hero button,
 * footer link, or command palette item.
 */

export function useTerminal() {
  const isOpen = useState<boolean>('terminal_modal_open', () => false)

  function open() {
    isOpen.value = true
  }

  function close() {
    isOpen.value = false
  }

  function toggle() {
    isOpen.value = !isOpen.value
  }

  return {
    isOpen,
    open,
    close,
    toggle,
  }
}
