import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as any,
    token: null as string | null,
    tempEmail: '',
    tempPhone: '',
  }),
  
  actions: {
    getApiUrl(path: string) {
      const config = useRuntimeConfig()
      // መጨረሻው ላይ /api መኖሩን ያረጋግጣል
      const base = config.public.apiBase.endsWith('/') 
        ? config.public.apiBase.slice(0, -1) 
        : config.public.apiBase
      return `${base}${path}`
    },

    async login(payload: { email: string; password: string }) {
      try {
        const res: any = await $fetch(this.getApiUrl('/auth/login'), {
          method: 'POST',
          body: payload,
          timeout: 30000, // 30 ሰከንድ እንዲጠብቅ (መዘግየት ቢኖር እንኳ እንዳይቋረጥ)
          headers: {
            'Accept': 'application/json',
          }
        })

        if (res.success) {
          this.token = res.data?.token || res.token
          this.user = res.data?.user || res.user
          
          if (this.token) localStorage.setItem('auth_token', this.token)
          if (this.user) {
            localStorage.setItem('auth_user', JSON.stringify(this.user))
            localStorage.setItem('userRole', this.user.role || 'user')
            const roleState = useState('userRole')
            roleState.value = this.user.role || 'user'
          }
        }
        return res
      } catch (error: any) {
    // 👈 እዚህ ጋር ነው ስህተቱን የምንቀይረው
    if (error.status === 404) {
      // ሰርቨሩ 404 ካለ፣ ወይ አድራሻው ተሳስቷል ወይም ኢሜይሉ የለም
      throw { message: 'user not found ፤ please first register' }
    }
    if (error.status === 401) {
       throw { message: 'invalid credintial' }
    }
    // ሌላ ማንኛውም ስህተት ሲመጣ
    throw error.data || { message: 'server error!' }
  }
    },

    async sendOTP(payload: { email: string; phone: string }) {
      try {
        const res: any = await $fetch(this.getApiUrl('/auth/send-otp'), {
          method: 'POST',
          body: payload,
          timeout: 600000
        })
        this.tempEmail = payload.email
        this.tempPhone = payload.phone
        return res
      } catch (error: any) {
        throw error.data || { message: 'Failed to send OTP' }
      }
    },
    async verifyOTP(email: string, otp: string) {
      try {
        const res: any = await $fetch(this.getApiUrl('/auth/verify-otp'), {
          method: 'POST',
          body: { email, otp }
        })
        
        if (res.success) {
          this.token = res.data?.token || res.token
          this.user = res.data?.user || res.user
          
          if (this.token) localStorage.setItem('auth_token', this.token)
          if (this.user) {
            localStorage.setItem('auth_user', JSON.stringify(this.user))
            localStorage.setItem('userRole', this.user.role || 'user')
            
            const roleState = useState('userRole')
            roleState.value = this.user.role || 'user'
          }
        }
        return res
      } catch (error: any) {
        throw error.data || error
      }
    },

    async completeProfile(payload: { 
      name: string; 
      password: string; 
      password_confirmation: string 
    }) {
      try {
        const res: any = await $fetch(this.getApiUrl('/auth/complete-profile'), {
          method: 'POST',
          headers: { 
            Authorization: `Bearer ${this.token}`,
            'Content-Type': 'application/json'
          },
          body: payload
        })
        
        if (res.success) {
          if (res.data?.user) {
            this.user = res.data.user
            localStorage.setItem('auth_user', JSON.stringify(res.data.user))
            localStorage.setItem('userRole', res.data.user.role || 'user')
            
            const roleState = useState('userRole')
            roleState.value = res.data.user.role || 'user'
          }
          if (res.data?.token) {
            this.token = res.data.token
            localStorage.setItem('auth_token', res.data.token)
          }
        }
        return res
      } catch (error: any) {
        throw error.data || error
      }
    },
    
    init() {
      if (process.client) {
        const token = localStorage.getItem('auth_token')
        const user = localStorage.getItem('auth_user')
        const role = localStorage.getItem('userRole')
        if (token) this.token = token
        if (user) this.user = JSON.parse(user)
        if (role) {
          const roleState = useState('userRole')
          roleState.value = role
        }
      }
    },
    
    logout() {
      this.token = null
      this.user = null
      localStorage.removeItem('auth_token')
      localStorage.removeItem('auth_user')
      localStorage.removeItem('userRole')
      const roleState = useState('userRole')
      roleState.value = null
    }
  }
  
})