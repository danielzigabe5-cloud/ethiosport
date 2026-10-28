const api = () => useNuxtApp().$api

export const dashboardService = {
  admin: () => api().get('/admin/dashboard').then(({ data }) => data),
  users: (params?: Record<string, unknown>) => api().get('/admin/users', { params }).then(({ data }) => data),
  userDetail: (id: string | number) => api().get(`/admin/users/${id}`).then(({ data }) => data),
  updateUserRole: (id: string | number, role: string) => api().put(`/admin/users/${id}/role`, { role }).then(({ data }) => data),
  adminBookings: (params?: Record<string, unknown>) => api().get('/admin/bookings', { params }).then(({ data }) => data),
  owner: () => api().get('/owner/dashboard').then(({ data }) => data),
  ownerVenues: () => api().get('/owner/venues').then(({ data }) => data),
  ownerBookings: (params?: Record<string, unknown>) => api().get('/owner/bookings', { params }).then(({ data }) => data),
  userDashboard: () => api().get('/user/dashboard').then(({ data }) => data),
  userBookings: (params?: Record<string, unknown>) => api().get('/user/bookings', { params }).then(({ data }) => data),
  userEvents: () => api().get('/user/events').then(({ data }) => data),
  userGames: () => api().get('/user/games').then(({ data }) => data),
}