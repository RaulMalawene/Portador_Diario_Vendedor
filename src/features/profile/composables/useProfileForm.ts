import { reactive, ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { fetchCompanyRequest, updateCompanyRequest, type CompanyDto } from '../api/profileApi'
import type { CompanyFormState } from '../types/profile.types'

const EMPTY_FORM: CompanyFormState = {
  name: '',
  contactName: '',
  phone: '',
  email: '',
  bankName: '',
  bankAccountHolder: '',
  bankAccountNumber: '',
}

export function useProfileForm() {
  const authStore = useAuthStore()

  const form = reactive<CompanyFormState>({ ...EMPTY_FORM })
  const bankAccountNumberMasked = ref<string | null>(null)

  const isLoading = ref(false)
  const loadError = ref<string | null>(null)
  const isSaving = ref(false)
  const saveError = ref<string | null>(null)
  const justSaved = ref(false)

  function applyDto(dto: CompanyDto) {
    Object.assign(form, {
      name: dto.name,
      contactName: dto.contact_name ?? '',
      phone: dto.phone ?? '',
      email: dto.email ?? '',
      bankName: dto.bank_name ?? '',
      bankAccountHolder: dto.bank_account_holder ?? '',
      bankAccountNumber: '',
    })
    bankAccountNumberMasked.value = dto.bank_account_number_masked
  }

  async function load() {
    const token = authStore.token
    if (!token) return

    isLoading.value = true
    loadError.value = null

    const result = await fetchCompanyRequest(token)
    isLoading.value = false

    if (result.ok && result.data) applyDto(result.data.data)
    else loadError.value = result.error ?? 'Não foi possível carregar os dados da empresa.'
  }

  async function save(): Promise<boolean> {
    const token = authStore.token
    if (!token) return false

    isSaving.value = true
    saveError.value = null
    justSaved.value = false

    const bankAccountNumber = form.bankAccountNumber.trim()

    const result = await updateCompanyRequest(token, {
      name: form.name.trim(),
      contact_name: form.contactName.trim(),
      phone: form.phone.trim(),
      email: form.email.trim(),
      bank_name: form.bankName.trim(),
      bank_account_holder: form.bankAccountHolder.trim(),
      // Só vai no pedido se o utilizador escrever um valor novo — em branco
      // significa "não alterar", nunca "apagar" (a API não devolve o actual).
      ...(bankAccountNumber ? { bank_account_number: bankAccountNumber } : {}),
    })

    isSaving.value = false

    if (!result.ok || !result.data) {
      saveError.value = result.error ?? 'Não foi possível guardar as alterações.'
      return false
    }

    applyDto(result.data.data)
    justSaved.value = true
    return true
  }

  return {
    form,
    bankAccountNumberMasked,
    isLoading,
    loadError,
    isSaving,
    saveError,
    justSaved,
    load,
    save,
  }
}
