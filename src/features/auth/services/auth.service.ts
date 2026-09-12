import { apiRequest, type ApiResult } from '@/services/apiClient'

const SIMULATED_LATENCY_MS = 900

export interface AuthUser {
  id: number
  name: string
  email: string
}

interface AuthResponse {
  token: string
  // A API devolve também os dados da empresa (`company`) aqui, mas não são
  // necessários no frontend — só guardamos o essencial da conta.
  user: AuthUser
}

export function login(email: string, password: string): Promise<ApiResult<AuthResponse>> {
  return apiRequest<AuthResponse>('/login', {
    method: 'POST',
    body: { email, password },
  })
}

export interface RegisterInput {
  name: string
  email: string
  password: string
  passwordConfirmation: string
  companyName: string
}

export function register(payload: RegisterInput): Promise<ApiResult<AuthResponse>> {
  return apiRequest<AuthResponse>('/register', {
    method: 'POST',
    body: {
      name: payload.name,
      email: payload.email,
      password: payload.password,
      password_confirmation: payload.passwordConfirmation,
      company_name: payload.companyName,
    },
  })
}

export function logout(token: string): Promise<ApiResult<{ message: string }>> {
  return apiRequest<{ message: string }>('/logout', { method: 'POST', token })
}

// A recuperação de password mantém-se simulada por agora: o backend ainda
// não expõe esse endpoint.
export async function requestPasswordReset(email: string): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, SIMULATED_LATENCY_MS))

  if (!email) {
    throw new Error('Missing email')
  }
}
