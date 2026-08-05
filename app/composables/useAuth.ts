export const useAuth = () => {
  // ተጠቃሚው Login ማድረጉን በ Cookie ይይዛል (ከ Refresh በኋላ እንዳይጠፋ)
  const isAuthenticated = useCookie<boolean>('auth_logged_in', { default: () => false })
  const userRole = useCookie<string | null>('auth_role', { default: () => null })

  const login = (role: string) => {
    isAuthenticated.value = true
    userRole.value = role
  }

  const logout = async () => {
    isAuthenticated.value = false
    userRole.value = null
    await navigateTo('/login')
  }

  return {
    isAuthenticated,
    userRole,
    login,
    logout
  }
}