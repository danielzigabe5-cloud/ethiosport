export interface User {
  id: string
  name: string
  email: string
  role: 'admin' | 'partner'
  venueName?: string // ለPartner ብቻ
}

export const useAuth = () => {
  const user = useState<User | null>('auth_user', () => null)

  const loginAsAdmin = () => {
    user.value = {
      id: 'usr-admin-1',
      name: 'EthioSport System Admin',
      email: 'admin@ethiosport.et',
      role: 'admin'
    }
  }

  const loginAsPartner = () => {
    user.value = {
      id: 'usr-[#0b111a]-partner',
      name: 'ሳርቤት ፉትሳል',
      email: 'sarbet@futsal.et',
      role: 'partner',
      venueName: 'ሳርቤት ፉትሳል ሜዳ'
    }
  }

  const logout = async () => {
    user.value = null
    await navigateTo('/login')
  }

  return {
    user,
    loginAsAdmin,
    loginAsPartner,
    logout
  }
}