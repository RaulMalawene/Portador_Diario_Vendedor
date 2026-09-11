export interface LoginCredentials {
  email: string
  password: string
  remember: boolean
}

export interface LoginFieldErrors {
  email?: string
  password?: string
}

export interface RegisterPayload {
  name: string
  email: string
  password: string
  confirmPassword: string
  companyName: string
  taxId: string
  phone: string
  address: string
}

export interface RegisterFieldErrors {
  name?: string
  email?: string
  password?: string
  confirmPassword?: string
  companyName?: string
  taxId?: string
  phone?: string
  address?: string
}

export interface ForgotPasswordFieldErrors {
  email?: string
}
