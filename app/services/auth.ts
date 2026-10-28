const api = () => useNuxtApp().$api

export const authService = {
  register: (payload: Record<string, unknown>) => api().post('/auth/register', payload).then(({ data }) => data),
  verifyOTP: (payload: { email: string; otp: string }) => api().post('/auth/verify-otp', payload).then(({ data }) => data),
  login: (payload: { email: string; password: string }) => api().post('/auth/login', payload).then(({ data }) => data),
  logout: () => api().post('/auth/logout').then(({ data }) => data),
  me: () => api().get('/auth/me').then(({ data }) => data),
  completeProfile: (payload: Record<string, unknown>) => api().post('/auth/complete-profile', payload).then(({ data }) => data),
}