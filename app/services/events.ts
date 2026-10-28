const api = () => useNuxtApp().$api

export const eventService = {
  list: (params?: Record<string, unknown>) => api().get('/events', { params }).then(({ data }) => data),
  get: (id: string | number) => api().get(`/events/${id}`).then(({ data }) => data),
  create: (payload: Record<string, unknown>) => api().post('/events', payload).then(({ data }) => data),
  update: (id: string | number, payload: Record<string, unknown>) => api().put(`/user/events/${id}`, payload).then(({ data }) => data),
  remove: (id: string | number) => api().delete(`/user/events/${id}`).then(({ data }) => data),
  adminCreate: (payload: Record<string, unknown>) => api().post('/admin/events', payload).then(({ data }) => data),
  adminUpdate: (id: string | number, payload: Record<string, unknown>) => api().put(`/admin/events/${id}`, payload).then(({ data }) => data),
  adminRemove: (id: string | number) => api().delete(`/admin/events/${id}`).then(({ data }) => data),
  join: (id: string | number) => api().post(`/events/${id}/join`).then(({ data }) => data),
  leave: (id: string | number) => api().post(`/events/${id}/leave`).then(({ data }) => data),
  mine: () => api().get('/my-events').then(({ data }) => data),
}