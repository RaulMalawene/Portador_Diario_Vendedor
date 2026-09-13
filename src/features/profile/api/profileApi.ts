import { apiRequest } from '@/services/apiClient'

interface Resource<T> {
  data: T
}

export interface CompanyDto {
  id: number
  name: string
  contact_name: string | null
  phone: string | null
  email: string | null
  bank_name: string | null
  bank_account_holder: string | null
  bank_account_number_masked: string | null
  updated_at: string
}

export interface CompanyPayload {
  name: string
  contact_name?: string
  phone?: string
  email?: string
  bank_name?: string
  bank_account_holder?: string
  bank_account_number?: string
}

export function fetchCompanyRequest(token: string) {
  return apiRequest<Resource<CompanyDto>>('/company', { token })
}

export function updateCompanyRequest(token: string, payload: CompanyPayload) {
  return apiRequest<Resource<CompanyDto>>('/company', { method: 'PUT', token, body: payload })
}
