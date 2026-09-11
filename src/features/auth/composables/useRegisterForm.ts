import { reactive, ref } from 'vue'
import type { RegisterFieldErrors, RegisterPayload } from '../types/auth.types'
import { register } from '../services/auth.service'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PASSWORD_PATTERN = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/
const TAX_ID_PATTERN = /^\d{9}$/

export function useRegisterForm() {
  const step = ref(1)

  const form = reactive<RegisterPayload>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    companyName: '',
    taxId: '',
    phone: '',
    address: '',
  })

  const fieldErrors = reactive<RegisterFieldErrors>({})
  const loading = ref(false)
  const formError = ref('')

  function validateAccountStep(): boolean {
    fieldErrors.name = form.name ? undefined : 'O nome é obrigatório'

    fieldErrors.email = !form.email
      ? 'O email é obrigatório'
      : !EMAIL_PATTERN.test(form.email)
        ? 'Introduza um email válido'
        : undefined

    fieldErrors.password = !form.password
      ? 'A palavra-passe é obrigatória'
      : !PASSWORD_PATTERN.test(form.password)
        ? 'Use pelo menos 8 caracteres, com letras e números'
        : undefined

    fieldErrors.confirmPassword =
      form.confirmPassword !== form.password ? 'As palavras-passe não coincidem' : undefined

    return (
      !fieldErrors.name &&
      !fieldErrors.email &&
      !fieldErrors.password &&
      !fieldErrors.confirmPassword
    )
  }

  function validateCompanyStep(): boolean {
    fieldErrors.companyName = form.companyName ? undefined : 'O nome da empresa é obrigatório'

    fieldErrors.taxId = !form.taxId
      ? 'O NUIT é obrigatório'
      : !TAX_ID_PATTERN.test(form.taxId)
        ? 'O NUIT deve ter 9 dígitos'
        : undefined

    fieldErrors.phone = form.phone ? undefined : 'O contacto é obrigatório'
    fieldErrors.address = form.address ? undefined : 'O endereço é obrigatório'

    return (
      !fieldErrors.companyName && !fieldErrors.taxId && !fieldErrors.phone && !fieldErrors.address
    )
  }

  function goToNextStep() {
    formError.value = ''
    if (validateAccountStep()) step.value = 2
  }

  function goToPreviousStep() {
    formError.value = ''
    step.value = 1
  }

  async function submit(): Promise<boolean> {
    formError.value = ''

    if (!validateCompanyStep()) return false

    loading.value = true
    try {
      await register({ ...form })
      return true
    } catch {
      formError.value = 'Não foi possível concluir o registo. Tente novamente.'
      return false
    } finally {
      loading.value = false
    }
  }

  return {
    step,
    form,
    fieldErrors,
    loading,
    formError,
    goToNextStep,
    goToPreviousStep,
    submit,
  }
}
