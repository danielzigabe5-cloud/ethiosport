// app/middleware/auth.ts
export default defineNuxtRouteMiddleware((to, from) => {
  const { isAuthenticated } = useAuth()

  // 1. መዳረሻችን /auth ከሆነ እዚህ ጋር ይቁም (Loop እንዳይፈጠር)
  if (to.path === '/auth') return

  // 2. Login ካላደረገ ብቻ ወደ /auth ይላክ
  if (!isAuthenticated.value) {
    return navigateTo('/auth')
  }
})