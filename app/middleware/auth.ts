// middleware/auth.ts
export default defineNuxtRouteMiddleware(async (to, from) => {
  // ✅ SSR ላይ skip
  if (import.meta.server) return

  const authStore = useAuthStore()

  // ✅ 1. Store ን initialize (token ከ localStorage/cookie ይመጣል)
  authStore.init()

  // ✅ 2. Token ን ከ STORE አንብብ
  let token = authStore.token

  // ✅ 3. Token አለ ግን user ከሌለ → user ን ከ API አምጣ
  if (token && !authStore.user) {
    try {
      await authStore.fetchUser?.()
    } catch {
      // fetchUser ሳይሳካ → token ጠፍቷል
      authStore.logout?.()
      token = null
    }
  }

  // Public routes
  const publicRoutes = ['/auth', '/auth/login', '/auth/register', '/auth/otp', '/']
  const isPublicRoute =
    publicRoutes.includes(to.path) || to.path.startsWith('/auth/')

  // ═══════════════════════════════════════════
  // NOT authenticated → redirect to login
  // ═══════════════════════════════════════════
  if (!token && !isPublicRoute) {
    return navigateTo({
      path: '/auth',
      query: { redirect: to.fullPath },
    })
  }

  // ═══════════════════════════════════════════
  // Authenticated → don't show auth pages
  // ═══════════════════════════════════════════
  if (token && isPublicRoute && to.path !== '/') {
    const role = String(authStore.user?.role || '').trim().toLowerCase()

    if (role === 'admin') return navigateTo('/admin')
    if (role === 'partner' || role === 'owner') return navigateTo('/partner')
    return navigateTo('/')
  }

  // ═══════════════════════════════════════════
  // Admin routes — admin only
  // ═══════════════════════════════════════════
  if (to.path.startsWith('/admin')) {
    if (!token) {
      return navigateTo({
        path: '/auth',
        query: { redirect: to.fullPath },
      })
    }

    const role = String(authStore.user?.role || '').trim().toLowerCase()
    if (role !== 'admin') {
      return navigateTo('/')
    }
  }

  // ═══════════════════════════════════════════
  // Partner routes — partner/owner only
  // ═══════════════════════════════════════════
  if (to.path.startsWith('/partner')) {
    if (!token) {
      return navigateTo({
        path: '/auth',
        query: { redirect: to.fullPath },
      })
    }

    const role = String(authStore.user?.role || '').trim().toLowerCase()
    if (!['partner', 'owner'].includes(role)) {
      return navigateTo('/')
    }
  }
})