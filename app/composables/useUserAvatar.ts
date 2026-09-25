import { useAuthStore } from '~/stores/auth'

export const useUserAvatar = () => {
  const authStore = useAuthStore()

  const userAvatar = computed(() => {
    return authStore.user?.avatar || '/default-avatar.png'
  })

  return {
    userAvatar
  }
}