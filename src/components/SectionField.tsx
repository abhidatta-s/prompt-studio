import { useId } from 'react'
import type { SectionDef } from '../lib/types'

interface Props {
  section: SectionDef
  value: string
  enabled: boolean
  onChange: (value: string) => void
  onToggle: (enabled: boolean) => void
}

export function SectionField({ section, value, enabled, onChange, onToggle }: Props) {
  const id = useId()
  const common = {
    id,
    className: 'input',
    placeholder: section.placeholder,
    value,
    disabled: !enabled,
  }

  return (
    <div className={`field${enabled ? '' : ' field--off'}`}>
      <div className="field__head">
        <label className="field__label" htmlFor={id}>
          {section.label}
        </label>
        <label className="switch" title={enabled ? 'Included in prompt' : 'Excluded from prompt'}>
          <input
            type="checkbox"
            checked={enabled}
            onChange={(e) => onToggle(e.target.checked)}
            aria-label={`Include ${section.label} in prompt`}
          />
          <span className="switch__track" aria-hidden="true" />
        </label>
      </div>
      {section.multiline ? (
        <textarea {...common} rows={3} onChange={(e) => onChange(e.target.value)} />
      ) : (
        <input {...common} type="text" onChange={(e) => onChange(e.target.value)} />
      )}
      <p className="field__hint">{section.hint}</p>
    </div>
  )
}
