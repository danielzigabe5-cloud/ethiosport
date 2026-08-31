export default defineNuxtRouteMiddleware((to, from) => {
  const { isAuthenticated, userRole } = useAuth()

  // 1. Login ካላደረገ ወደ /auth ይሂድ
  if (!isAuthenticated.value) {
    return navigateTo('/auth')
  }

  // 2. Partner ካልሆነ ወደ ዋናው ገጽ (Home) ይመለስ
  if (userRole.value !== 'partner') {
    if (to.path === '/') return
    return navigateTo('/')
  }
})