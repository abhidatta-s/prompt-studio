import { useState, type FormEvent, type ReactNode } from 'react'
import { AUTH_KEY } from '../lib/storage'
import { checkPassword, isGateEnabled } from '../lib/gate'

interface Props {
  children: ReactNode
}

/**
 * Renders children directly when VITE_DEMO_PASSWORD is unset.
 * Otherwise shows a password prompt first. Client-side only — a casual deterrent.
 */
export function PasswordGate({ children }: Props) {
  const enabled = isGateEnabled()
  const [unlocked, setUnlocked] = useState(
    () => !enabled || window.sessionStorage.getItem(AUTH_KEY) === '1',
  )
  const [value, setValue] = useState('')
  const [error, setError] = useState(false)

  if (unlocked) return <>{children}</>

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (checkPassword(value)) {
      window.sessionStorage.setItem(AUTH_KEY, '1')
      setUnlocked(true)
    } else {
      setError(true)
    }
  }

  return (
    <main className="gate">
      <form className="gate__card" onSubmit={onSubmit}>
        <div className="logo logo--lg" aria-hidden="true">
          ✦
        </div>
        <h1>Prompt Studio</h1>
        <p className="muted">This demo is password protected. Enter the password you were given.</p>
        <label className="sr-only" htmlFor="gate-password">
          Password
        </label>
        <input
          id="gate-password"
          type="password"
          className="input"
          placeholder="Password"
          autoFocus
          autoComplete="current-password"
          value={value}
          aria-invalid={error}
          onChange={(e) => {
            setValue(e.target.value)
            setError(false)
          }}
        />
        {error && (
          <p className="gate__error" role="alert">
            Incorrect password. Please try again.
          </p>
        )}
        <button type="submit" className="btn btn--primary btn--block">
          Unlock
        </button>
      </form>
    </main>
  )
}
