/**
 * Optional client-side password gate.
 *
 * IMPORTANT: this is a casual deterrent, not real security. Anything prefixed
 * with VITE_ is bundled into the public JavaScript, so anyone who inspects the
 * page can read the password.
 */
export function getGatePassword(): string {
  return (import.meta.env.VITE_DEMO_PASSWORD ?? '').trim()
}

export function isGateEnabled(): boolean {
  return getGatePassword().length > 0
}

export function checkPassword(input: string): boolean {
  return input === getGatePassword()
}
