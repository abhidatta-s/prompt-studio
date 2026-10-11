interface Props {
  onExample: () => void
  onReset: () => void
}

export function Header({ onExample, onReset }: Props) {
  return (
    <header className="header">
      <div className="header__brand">
        <div className="logo" aria-hidden="true">
          ✦
        </div>
        <div>
          <h1 className="header__title">Prompt Studio</h1>
          <p className="header__subtitle">Build structured prompts, preview them live, and save presets.</p>
        </div>
      </div>
      <div className="header__actions">
        <button type="button" className="btn" onClick={onExample}>
          Load example
        </button>
        <button type="button" className="btn btn--ghost" onClick={onReset}>
          Clear all
        </button>
      </div>
    </header>
  )
}
