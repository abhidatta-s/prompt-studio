export type SectionId = 'role' | 'task' | 'context' | 'constraints' | 'tone' | 'format'

export interface SectionDef {
  id: SectionId
  label: string
  heading: string
  placeholder: string
  hint: string
  multiline: boolean
}

export type PromptValues = Record<SectionId, string>

export type SectionToggles = Record<SectionId, boolean>

export interface PromptState {
  values: PromptValues
  enabled: SectionToggles
}

export interface Preset {
  id: string
  name: string
  savedAt: number
  state: PromptState
}
