const api = () => useNuxtApp().$api

export const bookingService = {
  list: (params?: Record<string, unknown>) => api().get('/bookings', { params }).then(({ data }) => data),
  adminList: (params?: Record<string, unknown>) => api().get('/admin/bookings', { params }).then(({ data }) => data),
  ownerList: (params?: Record<string, unknown>) => api().get('/owner/bookings', { params }).then(({ data }) => data),
  get: (id: string | number) => api().get(`/bookings/${id}`).then(({ data }) => data),
  create: (payload: Record<string, unknown>) => api().post('/bookings', payload).then(({ data }) => data),
  update: (id: string | number, payload: Record<string, unknown>) => api().put(`/bookings/${id}`, payload).then(({ data }) => data),
  cancel: (id: string | number) => api().post(`/bookings/${id}/cancel`).then(({ data }) => data),
  confirm: (id: string | number, role: 'admin' | 'owner') => api().post(`/${role}/bookings/${id}/confirm`).then(({ data }) => data),
  cancelForManager: (id: string | number, role: 'admin' | 'owner') => api().post(`/${role}/bookings/${id}/cancel`).then(({ data }) => data),
  remove: (id: string | number) => api().delete(`/admin/bookings/${id}`).then(({ data }) => data),
}