// middleware/auth.ts
export default defineNuxtRouteMiddleware((to, from) => {
  const { user } = useAuth()

  // 1. ጨርሶ ካልገባ ወደ /login ይመልሰዋል
  if (!user.value) {
    return navigateTo('/login')
  }

  // 2. ወደ Admin ገጽ ለመግባት ሲሞክር ተጠቃሚው Admin ካልሆነ ወደ /dashboard ያዞረዋል
  if (to.path.startsWith('/admin') && user.value.Role !== 'admin') {
    return navigateTo('/dashboard')
  }
})