import { useState, type FormEvent } from 'react'
import type { Preset, PromptState } from '../lib/types'

interface Props {
  presets: Preset[]
  current: PromptState
  onSave: (name: string, state: PromptState) => void
  onLoad: (state: PromptState) => void
  onDelete: (id: string) => void
}

export function PresetsPanel({ presets, current, onSave, onLoad, onDelete }: Props) {
  const [name, setName] = useState('')

  const submit = (e: FormEvent) => {
    e.preventDefault()
    if (!name.trim()) return
    onSave(name, current)
    setName('')
  }

  return (
    <section className="card" aria-labelledby="presets-title">
      <h2 id="presets-title" className="card__title">
        Presets
      </h2>

      <form className="presets__form" onSubmit={submit}>
        <input
          className="input"
          type="text"
          placeholder="Preset name"
          aria-label="Preset name"
          value={name}
          maxLength={60}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit" className="btn" disabled={!name.trim()}>
          Save
        </button>
      </form>

      {presets.length === 0 ? (
        <p className="muted small">No presets yet. Name your current prompt and hit Save — it stays in this browser.</p>
      ) : (
        <ul className="presets__list">
          {presets.map((p) => (
            <li key={p.id} className="preset">
              <div className="preset__meta">
                <span className="preset__name">{p.name}</span>
                <span className="muted small">{new Date(p.savedAt).toLocaleString()}</span>
              </div>
              <div className="preset__actions">
                <button type="button" className="btn btn--sm" onClick={() => onLoad(p.state)}>
                  Load
                </button>
                <button
                  type="button"
                  className="btn btn--sm btn--ghost"
                  onClick={() => onDelete(p.id)}
                  aria-label={`Delete preset ${p.name}`}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
