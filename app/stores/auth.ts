import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as any,
    token: null as string | null,
    tempEmail: '',
    tempPhone: '',
  }),

  getters: {
    isLoggedIn: (state) => !!state.token,
    isAdmin: (state) =>
      String(state.user?.role || '').toLowerCase() === 'admin',
    isPartner: (state) => {
      const role = String(state.user?.role || '').toLowerCase()
      return role === 'partner' || role === 'owner'
    },
  },

  actions: {
    getApiUrl(path: string) {
      const config = useRuntimeConfig()
      const base = config.public.apiBase.endsWith('/')
        ? config.public.apiBase.slice(0, -1)
        : config.public.apiBase
      return `${base}${path}`
    },

    /* ═══════════════════════════════════════════
       SAVE AUTH — token + user በአንድ ቦታ
       ═══════════════════════════════════════════ */
    saveAuth(token: string, user: any) {
      this.token = token
      this.user = user

      if (import.meta.client) {
        // ✅ localStorage
        localStorage.setItem('auth_token', token)
        localStorage.setItem('auth_user', JSON.stringify(user))
        localStorage.setItem('userRole', user?.role || 'user')

        // ✅ COOKIE — ለ middleware እና SSR
        const cookie = useCookie<string | null>('auth_token', {
          maxAge: 60 * 60 * 24 * 7, // 7 days
          path: '/',
          sameSite: 'lax',
        })
        cookie.value = token

        // ✅ Role state
        const roleState = useState('userRole')
        roleState.value = user?.role || 'user'
      }
    },

    /* ═══════════════════════════════════════════
       LOGIN
       ═══════════════════════════════════════════ */
    async login(payload: { email: string; password: string }) {
      try {
        const res: any = await $fetch(this.getApiUrl('/auth/login'), {
          method: 'POST',
          body: payload,
          timeout: 30000,
          headers: { Accept: 'application/json' },
        })

        if (res.success) {
          const token = res.data?.token || res.token
          const user = res.data?.user || res.user
          if (token) this.saveAuth(token, user)
        }
        return res
      } catch (error: any) {
        if (error.status === 404) {
          throw { message: 'user not found ፤ please first register' }
        }
        if (error.status === 401) {
          throw { message: 'invalid credintial' }
        }
        throw error.data || { message: 'server error!' }
      }
    },

    /* ═══════════════════════════════════════════
       SEND OTP
       ═══════════════════════════════════════════ */
    async sendOTP(payload: { email: string; phone: string }) {
      try {
        const res: any = await $fetch(this.getApiUrl('/auth/send-otp'), {
          method: 'POST',
          body: payload,
          timeout: 600000,
        })
        this.tempEmail = payload.email
        this.tempPhone = payload.phone
        return res
      } catch (error: any) {
        throw error.data || { message: 'Failed to send OTP' }
      }
    },

    /* ═══════════════════════════════════════════
       VERIFY OTP
       ═══════════════════════════════════════════ */
    async verifyOTP(email: string, otp: string) {
      try {
        const res: any = await $fetch(this.getApiUrl('/auth/verify-otp'), {
          method: 'POST',
          body: { email, otp },
        })

        if (res.success) {
          const token = res.data?.token || res.token
          const user = res.data?.user || res.user
          if (token) this.saveAuth(token, user)
        }
        return res
      } catch (error: any) {
        throw error.data || error
      }
    },

    /* ═══════════════════════════════════════════
       COMPLETE PROFILE
       ═══════════════════════════════════════════ */
    async completeProfile(payload: {
      name: string
      password: string
      password_confirmation: string
    }) {
      try {
        const res: any = await $fetch(
          this.getApiUrl('/auth/complete-profile'),
          {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${this.token}`,
              'Content-Type': 'application/json',
            },
            body: payload,
          }
        )

        if (res.success) {
          const newToken = res.data?.token || this.token
          const newUser = res.data?.user || this.user
          if (newToken) this.saveAuth(newToken, newUser)
        }
        return res
      } catch (error: any) {
        throw error.data || error
      }
    },

    /* ═══════════════════════════════════════════
       FETCH USER — ከ API አድስ (avatar ወዘተ)
       ═══════════════════════════════════════════ */
    async fetchUser() {
      if (!import.meta.client) return null
      if (!this.token) this.init()
      if (!this.token) return null

      try {
        const res: any = await $fetch(this.getApiUrl('/auth/me'), {
          headers: {
            Authorization: `Bearer ${this.token}`,
            Accept: 'application/json',
          },
        })

        const user = res?.user ?? res?.data ?? null
        if (user) {
          this.user = user
          localStorage.setItem('auth_user', JSON.stringify(user))
        }
        return user
      } catch (error: any) {
        if (error?.status === 401) this.logout()
        return null
      }
    },

    /* ═══════════════════════════════════════════
       INIT — ገጹ ሲጫን ከ localStorage/cookie መልስ
       ═══════════════════════════════════════════ */
    init() {
      if (!import.meta.client) return

      // 1️⃣ localStorage
      let token = localStorage.getItem('auth_token') || localStorage.getItem('token')

      // 2️⃣ cookie (fallback)
      if (!token) {
        const cookie = useCookie<string | null>('auth_token')
        if (cookie.value) token = cookie.value
      }

      if (token) this.token = token

      const user = localStorage.getItem('auth_user')
      if (user) {
        try {
          this.user = JSON.parse(user)
        } catch {
          this.user = null
        }
      }

      const role = localStorage.getItem('userRole')
      if (role) {
        const roleState = useState('userRole')
        roleState.value = role
      }
    },

    /* ═══════════════════════════════════════════
       LOGOUT
       ═══════════════════════════════════════════ */
    logout() {
      this.token = null
      this.user = null

      if (import.meta.client) {
        localStorage.removeItem('auth_token')
        localStorage.removeItem('token')
        localStorage.removeItem('auth_user')
        localStorage.removeItem('userRole')

        // ✅ Cookie ን አጥፋ
        const cookie = useCookie<string | null>('auth_token')
        cookie.value = null

        const roleState = useState('userRole')
        roleState.value = null
      }
    },
  },
})