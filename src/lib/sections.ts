import type { PromptState, PromptValues, SectionDef, SectionId, SectionToggles } from './types'

export const SECTIONS: SectionDef[] = [
  {
    id: 'role',
    label: 'Role',
    heading: 'Role',
    placeholder: 'e.g. You are a senior product designer with a focus on accessibility.',
    hint: 'Who should the model act as?',
    multiline: false,
  },
  {
    id: 'task',
    label: 'Task',
    heading: 'Task',
    placeholder: 'e.g. Review the onboarding flow described below and suggest three improvements.',
    hint: 'What do you want done? Be specific.',
    multiline: true,
  },
  {
    id: 'context',
    label: 'Context',
    heading: 'Context',
    placeholder: 'e.g. The product is a mobile budgeting app for first-time users.',
    hint: 'Background the model needs to do a good job.',
    multiline: true,
  },
  {
    id: 'constraints',
    label: 'Constraints',
    heading: 'Constraints',
    placeholder: 'One per line, e.g.\nKeep it under 200 words\nAvoid jargon',
    hint: 'One constraint per line — they become a bulleted list.',
    multiline: true,
  },
  {
    id: 'tone',
    label: 'Tone',
    heading: 'Tone',
    placeholder: 'e.g. Friendly, direct, and encouraging.',
    hint: 'How should the response sound?',
    multiline: false,
  },
  {
    id: 'format',
    label: 'Output format',
    heading: 'Output format',
    placeholder: 'e.g. A numbered list with a one-sentence rationale for each item.',
    hint: 'Describe the shape of the answer.',
    multiline: true,
  },
]

export const SECTION_IDS: SectionId[] = SECTIONS.map((s) => s.id)

export function emptyValues(): PromptValues {
  return { role: '', task: '', context: '', constraints: '', tone: '', format: '' }
}

export function allEnabled(): SectionToggles {
  return { role: true, task: true, context: true, constraints: true, tone: true, format: true }
}

export function emptyState(): PromptState {
  return { values: emptyValues(), enabled: allEnabled() }
}

export const EXAMPLE_STATE: PromptState = {
  values: {
    role: 'You are a senior product designer who specialises in accessible, inclusive interfaces.',
    task: 'Review the onboarding flow described below and suggest three concrete improvements that would raise completion rate.',
    context:
      'The product is a mobile budgeting app aimed at first-time users. The current onboarding has five screens and asks for bank details on screen two.',
    constraints: 'Keep the answer under 200 words\nAvoid design jargon\nReference WCAG 2.2 where relevant',
    tone: 'Friendly, direct and encouraging.',
    format: 'A numbered list; each item has a bold title and a one-sentence rationale.',
  },
  enabled: allEnabled(),
}
