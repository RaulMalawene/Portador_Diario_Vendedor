import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import {
  login as loginRequest,
  logout as logoutRequest,
  register as registerRequest,
  type AuthUser,
  type RegisterInput,
} from '@/features/auth/services/auth.service'
import type { ApiResult } from '@/services/apiClient'

interface StoredAuth {
  token: string
  user: AuthUser
}

type AuthOutcome = { ok: true } | { ok: false; error: string }

const STORAGE_KEY = 'vendor.auth'

function readStoredAuth(): StoredAuth | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as StoredAuth) : null
  } catch {
    return null
  }
}

export const useAuthStore = defineStore('auth', () => {
  const stored = readStoredAuth()
  const token = ref<string | null>(stored?.token ?? null)
  const user = ref<AuthUser | null>(stored?.user ?? null)

  const isAuthenticated = computed(() => token.value !== null)

  const initials = computed(() => {
    const name = user.value?.name
    if (!name) return ''
    return name
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]!.toUpperCase())
      .join('')
  })

  function persist() {
    if (token.value && user.value) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ token: token.value, user: user.value }))
    } else {
      localStorage.removeItem(STORAGE_KEY)
    }
  }

  function applyResult(
    result: ApiResult<{ token: string; user: AuthUser }>,
    fallbackError: string,
  ): AuthOutcome {
    if (!result.ok || !result.data) {
      return { ok: false, error: result.error ?? fallbackError }
    }

    const { id, name, email } = result.data.user
    token.value = result.data.token
    user.value = { id, name, email }
    persist()

    return { ok: true }
  }

  async function login(email: string, password: string): Promise<AuthOutcome> {
    const result = await loginRequest(email, password)
    return applyResult(result, 'Não foi possível iniciar sessão.')
  }

  async function register(payload: RegisterInput): Promise<AuthOutcome> {
    const result = await registerRequest(payload)
    return applyResult(result, 'Não foi possível concluir o registo.')
  }

  function logout() {
    const currentToken = token.value
    token.value = null
    user.value = null
    persist()

    if (currentToken) void logoutRequest(currentToken)
  }

  return { token, user, isAuthenticated, initials, login, register, logout }
})
