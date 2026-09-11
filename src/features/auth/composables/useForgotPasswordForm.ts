import { reactive, ref } from 'vue'
import type { ForgotPasswordFieldErrors } from '../types/auth.types'
import { requestPasswordReset } from '../services/auth.service'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function useForgotPasswordForm() {
  const email = ref('')
  const fieldErrors = reactive<ForgotPasswordFieldErrors>({})
  const loading = ref(false)
  const formError = ref('')
  const submitted = ref(false)

  function validate(): boolean {
    fieldErrors.email = !email.value
      ? 'O email é obrigatório'
      : !EMAIL_PATTERN.test(email.value)
        ? 'Introduza um email válido'
        : undefined

    return !fieldErrors.email
  }

  async function submit(): Promise<boolean> {
    formError.value = ''

    if (!validate()) return false

    loading.value = true
    try {
      await requestPasswordReset(email.value)
      submitted.value = true
      return true
    } catch {
      formError.value = 'Não foi possível enviar o email. Tente novamente.'
      return false
    } finally {
      loading.value = false
    }
  }

  function reset() {
    email.value = ''
    fieldErrors.email = undefined
    formError.value = ''
    submitted.value = false
    loading.value = false
  }

  return {
    email,
    fieldErrors,
    loading,
    formError,
    submitted,
    submit,
    reset,
  }
}
