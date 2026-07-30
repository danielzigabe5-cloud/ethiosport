<!-- pages/login.vue -->
<script setup>
const email = ref('')
const password = ref('')
const { login } = useAuth()

const handleLogin = async () => {
  if (!email.value) return

  // 1. Login አድርገን ሚናውን (Role) እንቀበላለን
  // (ከ Backend ሲሆን ከ API Response የሚመጣውን Role ታስገባለህ)
  const userRole = login(email.value)

  // 2. በ Role መሰረት መለየት
  if (userRole === 'admin') {
    // ኢሜይሉ አድሚን ከሆነ ወደ Admin Dashboard ይሄዳል
    await navigateTo('/admin/events')
  } else {
    // መደበኛ ተጠቃሚ ከሆነ ወደ User Dashboard ይሄዳል
    await navigateTo('/dashboard')
  }
}
</script>

<template>
  <div class="max-w-md mx-auto my-12 p-6 bg-white rounded-xl shadow-md">
    <h2 class="text-xl font-bold mb-4">ይግቡ</h2>
    <form @submit.prevent="handleLogin" class="space-y-4">
      <input 
        v-model="email" 
        type="email" 
        placeholder="ኢሜይል አስገባ (ለ Admin: admin@gmail.com)" 
        class="w-full border p-2 rounded-lg text-sm" 
        required
      />
      <input 
        v-model="password" 
        type="password" 
        placeholder="የይለፍ ቃል" 
        class="w-full border p-2 rounded-lg text-sm" 
        required
      />
      <button type="submit" class="w-full bg-blue-600 text-white py-2 rounded-lg">
        Login
      </button>
    </form>
  </div>
</template>