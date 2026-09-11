import { reactive, ref, watch } from 'vue'
import type { ProfileFormState } from '../types/profile.types'
import { profile as initialProfile } from '../data/profile.mock'

export function useProfileForm() {
  const form = reactive<ProfileFormState>({ ...initialProfile })
  const justSaved = ref(false)

  watch(form, () => {
    justSaved.value = false
  })

  function save() {
    Object.assign(initialProfile, form)
    justSaved.value = true
  }

  return { form, justSaved, save }
}
