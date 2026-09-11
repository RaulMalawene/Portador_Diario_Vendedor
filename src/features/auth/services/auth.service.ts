import type { LoginCredentials, RegisterPayload } from '../types/auth.types'

const SIMULATED_LATENCY_MS = 900

export async function login(credentials: LoginCredentials): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, SIMULATED_LATENCY_MS))

  if (!credentials.email || !credentials.password) {
    throw new Error('Missing credentials')
  }
}

export async function register(payload: RegisterPayload): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, SIMULATED_LATENCY_MS))

  if (!payload.email || !payload.password || !payload.companyName) {
    throw new Error('Missing registration data')
  }
}

export async function requestPasswordReset(email: string): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, SIMULATED_LATENCY_MS))

  if (!email) {
    throw new Error('Missing email')
  }
}
