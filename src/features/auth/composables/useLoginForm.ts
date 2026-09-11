import { reactive, ref } from 'vue'
import type { LoginCredentials, LoginFieldErrors } from '../types/auth.types'
import { login } from '../services/auth.service'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function useLoginForm() {
  const form = reactive<LoginCredentials>({ email: '', password: '', remember: false })
  const fieldErrors = reactive<LoginFieldErrors>({})
  const loading = ref(false)
  const formError = ref('')

  function validate(): boolean {
    fieldErrors.email = !form.email
      ? 'O email é obrigatório'
      : !EMAIL_PATTERN.test(form.email)
        ? 'Introduza um email válido'
        : undefined

    fieldErrors.password = form.password ? undefined : 'A palavra-passe é obrigatória'

    return !fieldErrors.email && !fieldErrors.password
  }

  async function submit(): Promise<boolean> {
    formError.value = ''

    if (!validate()) return false

    loading.value = true
    try {
      await login({ ...form })
      return true
    } catch {
      formError.value = 'Não foi possível iniciar sessão. Verifique as suas credenciais.'
      return false
    } finally {
      loading.value = false
    }
  }

  return {
    form,
    fieldErrors,
    loading,
    formError,
    submit,
  }
}
