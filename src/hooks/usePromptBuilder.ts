import { useCallback, useMemo } from 'react'
import { buildPrompt, countWords, estimateTokens } from '../lib/buildPrompt'
import { emptyState, EXAMPLE_STATE } from '../lib/sections'
import { DRAFT_KEY } from '../lib/storage'
import type { PromptState, SectionId } from '../lib/types'
import { useLocalStorage } from './useLocalStorage'

/** Holds the builder state (auto-saved as a draft) and derives the assembled prompt. */
export function usePromptBuilder() {
  const [state, setState] = useLocalStorage<PromptState>(DRAFT_KEY, emptyState())

  const setValue = useCallback(
    (id: SectionId, value: string) =>
      setState((prev) => ({ ...prev, values: { ...prev.values, [id]: value } })),
    [setState],
  )

  const setEnabled = useCallback(
    (id: SectionId, enabled: boolean) =>
      setState((prev) => ({ ...prev, enabled: { ...prev.enabled, [id]: enabled } })),
    [setState],
  )

  const replace = useCallback((next: PromptState) => setState(next), [setState])
  const reset = useCallback(() => setState(emptyState()), [setState])
  const loadExample = useCallback(() => setState(EXAMPLE_STATE), [setState])

  const prompt = useMemo(() => buildPrompt(state), [state])
  const stats = useMemo(
    () => ({ words: countWords(prompt), chars: prompt.length, tokens: estimateTokens(prompt) }),
    [prompt],
  )

  return { state, prompt, stats, setValue, setEnabled, replace, reset, loadExample }
}
