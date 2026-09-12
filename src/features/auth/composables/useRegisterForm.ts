import { reactive, ref } from 'vue'
import type { RegisterFieldErrors, RegisterPayload } from '../types/auth.types'
import { useAuthStore } from '@/stores/auth'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PASSWORD_PATTERN = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/

export function useRegisterForm() {
  const authStore = useAuthStore()
  const step = ref(1)

  const form = reactive<RegisterPayload>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    companyName: '',
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

    return !fieldErrors.companyName
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
    const result = await authStore.register({
      name: form.name,
      email: form.email,
      password: form.password,
      passwordConfirmation: form.confirmPassword,
      companyName: form.companyName,
    })
    loading.value = false

    if (!result.ok) {
      formError.value = result.error
      return false
    }

    return true
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
