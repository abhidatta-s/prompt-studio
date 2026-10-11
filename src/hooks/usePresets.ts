import { useCallback } from 'react'
import { PRESETS_KEY, isPresetArray } from '../lib/storage'
import type { Preset, PromptState } from '../lib/types'
import { useLocalStorage } from './useLocalStorage'

function makeId(): string {
  return typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
}

/** Save / load / delete named prompt presets, persisted in localStorage. */
export function usePresets() {
  const [stored, setPresets] = useLocalStorage<Preset[]>(PRESETS_KEY, [])
  const presets: Preset[] = isPresetArray(stored) ? stored : []

  const savePreset = useCallback(
    (name: string, state: PromptState) => {
      const trimmed = name.trim()
      if (!trimmed) return
      setPresets((prev) => {
        const list = isPresetArray(prev) ? prev : []
        const existing = list.find((p) => p.name.toLowerCase() === trimmed.toLowerCase())
        const entry: Preset = {
          id: existing?.id ?? makeId(),
          name: trimmed,
          savedAt: Date.now(),
          state,
        }
        return existing ? list.map((p) => (p.id === existing.id ? entry : p)) : [entry, ...list]
      })
    },
    [setPresets],
  )

  const deletePreset = useCallback(
    (id: string) => setPresets((prev) => (isPresetArray(prev) ? prev.filter((p) => p.id !== id) : [])),
    [setPresets],
  )

  return { presets, savePreset, deletePreset }
}
