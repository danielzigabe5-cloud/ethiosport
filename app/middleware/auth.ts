export default defineNuxtRouteMiddleware((to, from) => {
  const { isAuthenticated, userRole } = useAuth()

  // 1. ተጠቃሚው Login ካላደረገ ወደ /login ይመልሰው
  if (!isAuthenticated.value) {
    return navigateTo('/login')
  }

  // 2. Role-based Access Control (የተሳሳተ Role ያለው ቦታ እንዳይገባ ማገድ)
  if (to.path.startsWith('/admin') && userRole.value !== 'admin') {
    return navigateTo('/login')
  }

  if (to.path.startsWith('/partner') && userRole.value !== 'partner') {
    return navigateTo('/login')
  }
})