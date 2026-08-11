export default defineNuxtRouteMiddleware((to, from) => {
  const { user } = useAuth()

  if (!user.value) {
    return navigateTo('/login')
  }

  if (user.value.role !== 'partner') {
    return navigateTo('/admin') // Partner ካልሆነ ወደ Admin Dashboard ይመልሰዋል
  }
})