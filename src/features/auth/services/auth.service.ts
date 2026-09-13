import { apiRequest, type ApiResult } from '@/services/apiClient'

export interface AuthUser {
  id: number
  name: string
  email: string
}

interface AuthResponse {
  token: string
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

export function requestPasswordReset(email: string): Promise<ApiResult<{ message: string }>> {
  return apiRequest<{ message: string }>('/forgot-password', {
    method: 'POST',
    body: { email },
  })
}

export interface ResetPasswordInput {
  token: string
  email: string
  password: string
  passwordConfirmation: string
}

export function resetPassword(payload: ResetPasswordInput): Promise<ApiResult<{ message: string }>> {
  return apiRequest<{ message: string }>('/reset-password', {
    method: 'POST',
    body: {
      token: payload.token,
      email: payload.email,
      password: payload.password,
      password_confirmation: payload.passwordConfirmation,
    },
  })
}
