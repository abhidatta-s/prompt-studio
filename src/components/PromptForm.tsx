import { SECTIONS } from '../lib/sections'
import type { PromptState, SectionId } from '../lib/types'
import { SectionField } from './SectionField'

interface Props {
  state: PromptState
  onValue: (id: SectionId, value: string) => void
  onToggle: (id: SectionId, enabled: boolean) => void
}

export function PromptForm({ state, onValue, onToggle }: Props) {
  return (
    <section className="card" aria-labelledby="builder-title">
      <h2 id="builder-title" className="card__title">
        Builder
      </h2>
      <div className="form">
        {SECTIONS.map((section) => (
          <SectionField
            key={section.id}
            section={section}
            value={state.values[section.id]}
            enabled={state.enabled[section.id]}
            onChange={(v) => onValue(section.id, v)}
            onToggle={(on) => onToggle(section.id, on)}
          />
        ))}
      </div>
    </section>
  )
}
