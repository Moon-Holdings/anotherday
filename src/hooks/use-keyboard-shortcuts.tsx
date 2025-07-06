
import { useEffect } from 'react'

interface KeyboardShortcut {
  key: string
  ctrlKey?: boolean
  altKey?: boolean
  shiftKey?: boolean
  action: () => void
  description: string
}

interface UseKeyboardShortcutsProps {
  shortcuts: KeyboardShortcut[]
  enabled?: boolean
}

export const useKeyboardShortcuts = ({ shortcuts, enabled = true }: UseKeyboardShortcutsProps) => {
  useEffect(() => {
    if (!enabled) return

    const handleKeydown = (event: KeyboardEvent) => {
      const shortcut = shortcuts.find(s => 
        s.key.toLowerCase() === event.key.toLowerCase() &&
        !!s.ctrlKey === event.ctrlKey &&
        !!s.altKey === event.altKey &&
        !!s.shiftKey === event.shiftKey
      )

      if (shortcut) {
        event.preventDefault()
        shortcut.action()
      }
    }

    document.addEventListener('keydown', handleKeydown)
    return () => document.removeEventListener('keydown', handleKeydown)
  }, [shortcuts, enabled])

  return shortcuts
}

export default useKeyboardShortcuts
