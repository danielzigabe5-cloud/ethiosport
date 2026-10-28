const api = () => useNuxtApp().$api

export const venueService = {
  list: (params?: Record<string, unknown>) => api().get('/venues', { params }).then(({ data }) => data),
  get: (id: string | number) => api().get(`/venues/${id}`).then(({ data }) => data),
  myVenues: () => api().get('/my-venues').then(({ data }) => data),
  adminList: (params?: Record<string, unknown>) => api().get('/admin/venues', { params }).then(({ data }) => data),
  create: (payload: FormData | Record<string, unknown>, role: 'admin' | 'owner') => api().post(`/${role}/venues`, payload).then(({ data }) => data),
  update: (id: string | number, payload: FormData | Record<string, unknown>, role: 'admin' | 'owner') => api().put(`/${role}/venues/${id}`, payload).then(({ data }) => data),
  remove: (id: string | number, role: 'admin' | 'owner') => api().delete(`/${role}/venues/${id}`).then(({ data }) => data),
}