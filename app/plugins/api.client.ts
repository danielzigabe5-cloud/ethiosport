import axios from 'axios'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  const configuredBase = String(config.public.apiBase || 'http://127.0.0.1:8000').replace(/\/+$/, '')
  const apiBase = configuredBase.endsWith('/api') ? configuredBase : `${configuredBase}/api`

  const api = axios.create({
    baseURL: apiBase,
    headers: { Accept: 'application/json' },
    timeout: 30000,
  })

  api.interceptors.request.use((request) => {
    const token = localStorage.getItem('auth_token') || localStorage.getItem('token')
    if (token) request.headers.Authorization = `Bearer ${token}`
    return request
  })

  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        localStorage.removeItem('auth_token')
        localStorage.removeItem('token')
        localStorage.removeItem('auth_user')
        localStorage.removeItem('userRole')
        const tokenCookie = useCookie<string | null>('auth_token')
        tokenCookie.value = null
      }
      return Promise.reject(error)
    },
  )

  return { provide: { api } }
})