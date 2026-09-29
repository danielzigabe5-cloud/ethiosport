// composables/usePartnerDashboard.ts

export interface Stat {
  title: string
  value: string
  change: string
  icon: string
  trend?: 'up' | 'down' | 'neutral'
}

export interface Booking {
  id: number
  customer: string
  date: string
  time: string
  amount: string
  status: 'Confirmed' | 'Pending' | 'Cancelled' | 'Completed'
}

export interface Venue {
  id: number
  name: string
  location: string
  sportType: string
  pricePerHour: number
  status: 'Active' | 'Inactive' | 'Pending'
  completion: number
}

export interface DashboardData {
  venue: Venue
  stats: Stat[]
  bookings: Booking[]
}

interface ApiResponse {
  success: boolean
  data: DashboardData
  message?: string
}

export const usePartnerDashboard = () => {
  const config    = useRuntimeConfig()
  const authStore = useAuthStore()  // 🔑 Auth store ከ stores/auth.ts

  const data    = ref<DashboardData | null>(null)
  const loading = ref(false)
  const error   = ref<string | null>(null)

  const fetchDashboard = async () => {
    loading.value = true
    error.value   = null

    try {
      // 🔑 Token ከ authStore ወይም cookie ያንብቡ
      const token = authStore.token
        || useCookie('auth_token').value
        || (import.meta.client ? localStorage.getItem('auth_token') : null)

      console.log('[Dashboard] Token present:', !!token)

      if (!token) {
        error.value = 'No auth token found. Please log in again.'
        await navigateTo('/auth')
        return
      }

      // 🔑 የ Authorization header ይጨምሩ
      const response = await $fetch<ApiResponse>(
        `${config.public.apiBase}/partner/dashboard`,
        {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,  // 🔑 ይህ ወሳኝ ነው!
          },
          credentials: 'include',  // ለ cookieም ጠቃሚ ነው
        },
      )

      data.value = response.data
    } catch (e: any) {
      const status = e?.response?.status || e?.statusCode

      console.error('[usePartnerDashboard]', {
        status,
        message: e?.data?.message,
        error: e,
      })

      if (status === 401) {
        error.value = 'Session expired. Please log in again.'
        await navigateTo('/auth')
      } else if (status === 403) {
        error.value = 'Access denied. Partner account required.'
      } else if (status === 404) {
        error.value = 'Venue not found for this partner.'
      } else {
        error.value = e?.data?.message || 'Failed to load dashboard data.'
      }
    } finally {
      loading.value = false
    }
  }

  const refresh = async () => {
    await fetchDashboard()
  }

  return {
    data,
    loading,
    error,
    fetchDashboard,
    refresh,
  }
}