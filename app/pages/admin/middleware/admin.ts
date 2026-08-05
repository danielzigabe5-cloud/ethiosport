export default defineNuxtRouteMiddleware((to, from) => {
  // 🧪 Mock Auth Check (ለጊዜው)
  // እውነተኛ Backend ሲኖር ከ cookie ወይም useState ላይ የ User state ይነበባል
  const userRole = useCookie('user-role').value || 'user'

  // Admin ካልሆነ ወደ Login ወይም Dashboard እንዲመለስ ማድረግ
  if (userRole !== 'admin') {
    return navigateTo('/login')
  }
})