import type { Preset } from './types'

export const PRESETS_KEY = 'prompt-studio:presets:v1'
export const DRAFT_KEY = 'prompt-studio:draft:v1'
export const AUTH_KEY = 'prompt-studio:unlocked:v1'

/** Safely read and parse JSON from localStorage. */
export function readJSON<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : fallback
  } catch {
    return fallback
  }
}

/** Safely write JSON to localStorage. Returns false if storage is unavailable. */
export function writeJSON(key: string, value: unknown): boolean {
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
    return true
  } catch {
    return false
  }
}

export function isPresetArray(value: unknown): value is Preset[] {
  return (
    Array.isArray(value) &&
    value.every(
      (p) =>
        p &&
        typeof p === 'object' &&
        typeof (p as Preset).id === 'string' &&
        typeof (p as Preset).name === 'string' &&
        typeof (p as Preset).state === 'object',
    )
  )
}
