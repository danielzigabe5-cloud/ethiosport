<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth.ts'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()
const isLogin = ref(true)
const loading = ref(false)
const showPassword = ref(false)

// ለAlert መልዕክት የሚሆኑ
const feedback = reactive({
  show: false,
  message: '',
  type: 'success' as 'success' | 'error'
})

const showAlert = (msg: string, type: 'success' | 'error' = 'success') => {
  feedback.message = msg
  feedback.type = type
  feedback.show = true
  // ከ 5 ሰከንድ በኋላ በራሱ እንዲጠፋ
  setTimeout(() => { feedback.show = false }, 5000)
}

const form = reactive({
  email: '',
  phone: '',
  password: ''
})

const errors = reactive({
  email: '',
  phone: '',
  password: ''
})

// Validation Functions
const validateEmail = () => {
  if (!form.email) {
    errors.email = 'Email is required'
    return false
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(form.email)) {
    errors.email = 'Please enter a valid email address'
    return false
  }
  errors.email = ''
  return true
}

const validatePhone = () => {
  if (!isLogin.value && !form.phone) {
    errors.phone = 'Phone number is required'
    return false
  }
  const phoneRegex = /^\+?[0-9]{9,12}$/
  if (!isLogin.value && !phoneRegex.test(form.phone.replace(/\s/g, ''))) {
    errors.phone = 'Please enter a valid phone number (e.g., +251...)'
    return false
  }
  errors.phone = ''
  return true
}

const validatePassword = () => {
  if (isLogin.value && !form.password) {
    errors.password = 'Password is required'
    return false
  }
  if (isLogin.value && form.password.length < 6) {
    errors.password = 'Password must be at least 6 characters'
    return false
  }
  errors.password = ''
  return true
}

const validateAll = () => {
  const isEmailValid = validateEmail()
  const isPhoneValid = validatePhone()
  const isPasswordValid = validatePassword()
  return isEmailValid && isPhoneValid && isPasswordValid
}

const isFormValid = computed(() => {
  if (isLogin.value) {
    return form.email && !errors.email && form.password && !errors.password
  }
  return form.email && !errors.email && form.phone && !errors.phone
})

const toggleMode = () => {
  isLogin.value = !isLogin.value
  showPassword.value = false
  form.password = ''
  errors.password = ''
  errors.phone = ''
  feedback.show = false // mode ሲቀየር alert እንዲጠፋ
}

const dashboardLink = computed(() => {
  const role = authStore.user?.role?.toLowerCase()
  if (role === 'admin') return '/admin'
  if (role === 'partner') return '/partner'
  return '/' 
})

onMounted(() => {
  authStore.init()
  if (authStore.token) {
    const redirectTo = route.query.redirect as string || dashboardLink.value
    router.push(redirectTo)
  }
})
const handleSubmit = async () => {
  if (!validateAll()) return
  loading.value = true
  feedback.show = false 

  try {
    if (isLogin.value) {
      const res = await authStore.login({ email: form.email, password: form.password })
      if (res.success) {
        showAlert('Login successful!', 'success')
        setTimeout(() => { router.push(dashboardLink.value) }, 1500)
      }
    } else {
      const res = await authStore.sendOTP({ email: form.email, phone: form.phone })
      if (res.success) {
        showAlert('OTP sent!', 'success')
        router.push({ path: '/auth/otp', query: { email: form.email } })
      }
    }
  } catch (error: any) {
    // 👈 እዚህ ጋር ትክክለኛውን የቤክኤንድ መልዕክት ያሳያል
    const msg = error.message || 'Connection error. Check if backend is running.'
     showAlert(error.message, 'error')
    console.error("Login Error Details:", error)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
    <div class="w-full max-w-md bg-white rounded-3xl shadow-sm p-8">

      <!-- Header -->
      <div class="flex flex-col items-center mb-6">
        <div class="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-4">
          <span class="text-blue-600 text-4xl">🛍️</span>
        </div>

        <h1 class="text-2xl font-bold text-gray-900">
          {{ isLogin ? 'Welcome Back' : 'Create Account' }}
        </h1>

        <p class="text-gray-500 text-center mt-2">
          {{ isLogin ? 'Sign in to your account' : 'Enter details to receive OTP' }}
        </p>
      </div>

      <!-- Alert Messages (Success/Error) -->
      <div v-if="feedback.show" 
           :class="[
             'mb-6 p-4 rounded-xl text-sm font-medium flex items-center gap-3 animate-pulse',
             feedback.type === 'success' ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-red-50 text-red-700 border border-red-100'
           ]">
        <span>{{ feedback.type === 'success' ? '✅' : '⚠️' }}</span>
        <p>{{ feedback.message }}</p>
      </div>

      <!-- Form -->
      <form @submit.prevent="handleSubmit" class="space-y-5">

        <!-- Phone - Register Only -->
        <div v-if="!isLogin">
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Mobile Number *
          </label>
          <input
            v-model="form.phone"
            type="tel"
            placeholder="+251..."
            class="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-gray-900"
            :class="errors.phone ? 'border-red-500' : 'border-gray-200'"
            @blur="validatePhone"
            required
          />
          <p v-if="errors.phone" class="text-red-500 text-sm mt-1">{{ errors.phone }}</p>
        </div>

        <!-- Email -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Email Address *
          </label>
          <input
            v-model="form.email"
            type="email"
            placeholder="example@gmail.com"
            class="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-gray-900"
            :class="errors.email ? 'border-red-500' : 'border-gray-200'"
            @blur="validateEmail"
            required
          />
          <p v-if="errors.email" class="text-red-500 text-sm mt-1">{{ errors.email }}</p>
        </div>

        <!-- Password - Login Only -->
        <div v-if="isLogin">
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Password *
          </label>
          <div class="relative">
            <input
              v-model="form.password"
              :type="showPassword ? 'text' : 'password'"
              placeholder="Enter password"
              class="w-full p-3 pr-12 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-gray-900"
              :class="errors.password ? 'border-red-500' : 'border-gray-200'"
              @blur="validatePassword"
              required
            />
            <button
              type="button"
              @click="showPassword = !showPassword"
              class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-600 transition"
            >
              <span class="text-xl">{{ showPassword ? '🙈' : '👁️' }}</span>
            </button>
          </div>
          <p v-if="errors.password" class="text-red-500 text-sm mt-1">{{ errors.password }}</p>
        </div>

        <!-- Submit -->
        <button
          type="submit"
          :disabled="loading || !isFormValid"
          class="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition disabled:bg-blue-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          <svg v-if="loading" class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span>{{ loading ? 'PROCESSING...' : (isLogin ? 'LOGIN' : 'REGISTER & GET OTP') }}</span>
        </button>

      </form>

      <!-- Toggle Login / Register -->
      <div class="mt-6 text-center">
        <p class="text-gray-600">
          {{ isLogin ? "Don't have an account?" : "Already have an account?" }}
          <button type="button" @click="toggleMode" class="text-blue-600 font-semibold ml-1 underline">
            {{ isLogin ? 'Register here' : 'Login here' }}
          </button>
        </p>
      </div>

    </div>
  </div>
</template>