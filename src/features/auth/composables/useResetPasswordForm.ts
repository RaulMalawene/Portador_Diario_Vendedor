import { reactive, ref } from 'vue'
import type { ResetPasswordFieldErrors } from '../types/auth.types'
import { resetPassword } from '../services/auth.service'

const PASSWORD_PATTERN = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/

export function useResetPasswordForm(token: string, email: string) {
  const password = ref('')
  const confirmPassword = ref('')
  const fieldErrors = reactive<ResetPasswordFieldErrors>({})
  const loading = ref(false)
  const formError = ref('')
  const succeeded = ref(false)

  function validate(): boolean {
    fieldErrors.password = !password.value
      ? 'A palavra-passe é obrigatória'
      : !PASSWORD_PATTERN.test(password.value)
        ? 'Use pelo menos 8 caracteres, com letras e números'
        : undefined

    fieldErrors.confirmPassword =
      confirmPassword.value !== password.value ? 'As palavras-passe não coincidem' : undefined

    return !fieldErrors.password && !fieldErrors.confirmPassword
  }

  async function submit(): Promise<boolean> {
    formError.value = ''

    if (!token || !email) {
      formError.value = 'Link de recuperação inválido ou expirado.'
      return false
    }

    if (!validate()) return false

    loading.value = true
    const result = await resetPassword({
      token,
      email,
      password: password.value,
      passwordConfirmation: confirmPassword.value,
    })
    loading.value = false

    if (!result.ok) {
      formError.value = result.error ?? 'Não foi possível repor a palavra-passe. Tente novamente.'
      return false
    }

    succeeded.value = true
    return true
  }

  return {
    password,
    confirmPassword,
    fieldErrors,
    loading,
    formError,
    succeeded,
    submit,
  }
}
