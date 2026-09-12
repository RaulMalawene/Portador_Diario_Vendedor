import { ref } from 'vue'
import type { ClientSession } from '../types/client.types'

// sessionStorage (não localStorage) é intencional: cada separador do
// navegador fica com a sua própria sessão, o que permite abrir várias abas
// autenticadas (à mesma conta ou a contas diferentes) para testar pedidos
// simultâneos ao backend.
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

/** Leitura simples (sem reactividade), usada pelo guarda de rotas. */
export function hasStoredClientSession(): boolean {
  return readStoredSession() !== null
}
