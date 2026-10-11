import { useClipboard } from '../hooks/useClipboard'

interface Props {
  prompt: string
  stats: { words: number; chars: number; tokens: number }
}

export function PromptPreview({ prompt, stats }: Props) {
  const { copied, error, copy } = useClipboard()
  const empty = prompt.length === 0

  return (
    <section className="card card--sticky" aria-labelledby="preview-title">
      <div className="card__row">
        <h2 id="preview-title" className="card__title">
          Live preview
        </h2>
        <button
          type="button"
          className="btn btn--primary"
          onClick={() => copy(prompt)}
          disabled={empty}
          aria-live="polite"
        >
          {copied ? '✓ Copied' : error ? 'Copy failed' : 'Copy prompt'}
        </button>
      </div>

      <pre className={`preview${empty ? ' preview--empty' : ''}`} aria-label="Assembled prompt">
        {empty ? 'Start filling in the sections on the left — your prompt will appear here.' : prompt}
      </pre>

      <dl className="stats">
        <div>
          <dt>Words</dt>
          <dd>{stats.words}</dd>
        </div>
        <div>
          <dt>Characters</dt>
          <dd>{stats.chars}</dd>
        </div>
        <div>
          <dt>~Tokens</dt>
          <dd>{stats.tokens}</dd>
        </div>
      </dl>
    </section>
  )
}
