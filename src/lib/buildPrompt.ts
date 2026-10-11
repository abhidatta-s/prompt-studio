import { SECTIONS } from './sections'
import type { PromptState } from './types'

/** Split a multi-line string into trimmed, non-empty lines. */
function toLines(text: string): string[] {
  return text
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean)
}

/**
 * Assemble the final prompt from the builder state.
 * Disabled or empty sections are skipped. Constraints become a bulleted list.
 */
export function buildPrompt(state: PromptState): string {
  const blocks: string[] = []

  for (const section of SECTIONS) {
    if (!state.enabled[section.id]) continue
    const raw = state.values[section.id].trim()
    if (!raw) continue

    if (section.id === 'constraints') {
      const bullets = toLines(raw)
        .map((l) => `- ${l.replace(/^[-*•]\s*/, '')}`)
        .join('\n')
      blocks.push(`## ${section.heading}\n${bullets}`)
    } else {
      blocks.push(`## ${section.heading}\n${raw}`)
    }
  }

  return blocks.join('\n\n')
}

/** Rough token estimate (~4 chars per token) — good enough for a UI hint. */
export function estimateTokens(text: string): number {
  return text.trim() ? Math.ceil(text.length / 4) : 0
}

export function countWords(text: string): number {
  const t = text.trim()
  return t ? t.split(/\s+/).length : 0
}
