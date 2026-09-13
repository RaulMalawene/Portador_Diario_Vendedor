import { ref } from 'vue'
import type { ClientSession } from '../types/client.types'

const STORAGE_KEY = 'loja.session'

function readStoredSession(): ClientSession | null {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as ClientSession) : null
  } catch {
    return null
  }
}

const session = ref<ClientSession | null>(readStoredSession())

export function useClientSession() {
  function setSession(next: ClientSession) {
    session.value = next
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  }

  function clearSession() {
    session.value = null
    sessionStorage.removeItem(STORAGE_KEY)
  }

  return { session, setSession, clearSession }
}

export function hasStoredClientSession(): boolean {
  return readStoredSession() !== null
}
