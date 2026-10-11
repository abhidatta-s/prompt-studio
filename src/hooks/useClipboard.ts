import { useCallback, useEffect, useRef, useState } from 'react'

/** Copy text to the clipboard and expose a short-lived "copied" flag. */
export function useClipboard(resetMs = 1800) {
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState(false)
  const timer = useRef<number | undefined>(undefined)

  useEffect(() => () => window.clearTimeout(timer.current), [])

  const copy = useCallback(
    async (text: string) => {
      try {
        if (navigator.clipboard?.writeText) {
          await navigator.clipboard.writeText(text)
        } else {
          // Fallback for insecure contexts / older browsers
          const ta = document.createElement('textarea')
          ta.value = text
          ta.style.position = 'fixed'
          ta.style.opacity = '0'
          document.body.appendChild(ta)
          ta.select()
          document.execCommand('copy')
          document.body.removeChild(ta)
        }
        setError(false)
        setCopied(true)
      } catch {
        setCopied(false)
        setError(true)
      }
      window.clearTimeout(timer.current)
      timer.current = window.setTimeout(() => {
        setCopied(false)
        setError(false)
      }, resetMs)
    },
    [resetMs],
  )

  return { copied, error, copy }
}
