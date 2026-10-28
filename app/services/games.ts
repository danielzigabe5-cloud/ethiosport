const api = () => useNuxtApp().$api

export const gameService = {
  list: (params?: Record<string, unknown>) => api().get('/games', { params }).then(({ data }) => data),
  get: (id: string | number) => api().get(`/games/${id}`).then(({ data }) => data),
  create: (payload: Record<string, unknown>) => api().post('/games', payload).then(({ data }) => data),
  update: (id: string | number, payload: Record<string, unknown>) => api().put(`/user/games/${id}`, payload).then(({ data }) => data),
  remove: (id: string | number) => api().delete(`/user/games/${id}`).then(({ data }) => data),
  adminCreate: (payload: Record<string, unknown>) => api().post('/admin/games', payload).then(({ data }) => data),
  adminUpdate: (id: string | number, payload: Record<string, unknown>) => api().put(`/admin/games/${id}`, payload).then(({ data }) => data),
  adminRemove: (id: string | number) => api().delete(`/admin/games/${id}`).then(({ data }) => data),
  join: (id: string | number) => api().post(`/games/${id}/join`).then(({ data }) => data),
  leave: (id: string | number) => api().post(`/games/${id}/leave`).then(({ data }) => data),
  mine: () => api().get('/my-games').then(({ data }) => data),
}