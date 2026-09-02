// middleware/auth.ts
export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore()
  const token = useCookie('auth_token')
  
  // Initialize auth store
  authStore.init()
  
  // Public routes (no auth required)
  const publicRoutes = ['/auth/login', '/auth/register', '/auth/otp', '/']
  const isPublicRoute = publicRoutes.includes(to.path) || to.path.startsWith('/auth/')
  
  // If not authenticated and trying to access protected route
  if (!token.value && !isPublicRoute) {
    return navigateTo({
      path: '/auth',
      query: { redirect: to.fullPath }
    })
  }
  
  // If authenticated and trying to access auth pages
  if (token.value && isPublicRoute && to.path !== '/') {
    const role = authStore.user?.role?.toLowerCase()
    
    if (role === 'admin') return navigateTo('/admin')
    if (role === 'partner' || role === 'owner') return navigateTo('/partner/dashboard')
    return navigateTo('/')
  }
  
  // Role-based access for admin routes
  if (to.path.startsWith('/admin')) {
    if (!token.value) {
      return navigateTo('/auth/login')
    }
    if (authStore.user?.role !== 'admin') {
      return navigateTo('/')
    }
  }
  
  // Role-based access for partner routes
  if (to.path.startsWith('/partner')) {
    if (!token.value) {
      return navigateTo('/auth/login')
    }
    if (!['partner', 'owner'].includes(authStore.user?.role || '')) {
      return navigateTo('/')
    }
  }
})