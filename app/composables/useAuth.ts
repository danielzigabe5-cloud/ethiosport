// composables/useAuth.ts
export const useAuth = () => {
  // የገባው ተጠቃሚ መረጃ (null ከሆነ አልገባም)
  const user = useState('user', () => null)

  const login = (email: string, roleFromBackend?: string) => {
    // 💡 Backend እስኪኖር በ Email መለየት ወይም ከ API ከሚመጣው Role መያዝ ይቻላል
    let role = 'user'
    
    if (email.toLowerCase().includes('admin') || roleFromBackend === 'admin') {
      role = 'admin'
    }

    // User State ኔትወርክ ላይ እንዲቆይ መያዝ
    user.value = {
      email,
      role
    }

    return role
  }

  const logout = () => {
    user.value = null
    navigateTo('/login')
  }

  return { user, login, logout }
}