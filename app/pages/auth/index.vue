
<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

definePageMeta({
  layout: false
})

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

const isLogin = ref(true)
const loading = ref(false)
const showPassword = ref(false)

const dashboardLink = computed(() => {
  const role = String(authStore.user?.role || '')
    .trim()
    .toLowerCase()

  if (role === 'admin') return '/admin'
  if (role === 'partner' || role === 'owner') return '/partner'

  return '/'
})

const resolveRedirect = (): string => {
  const redirect = route.query.redirect

  // Prevent external redirects
  if (
    typeof redirect === 'string' &&
    redirect.startsWith('/') &&
    !redirect.startsWith('//')
  ) {
    return redirect
  }

  return dashboardLink.value
}

const feedback = reactive({
  show: false,
  message: '',
  type: 'success' as 'success' | 'error'
})

const showAlert = (
  message: string,
  type: 'success' | 'error' = 'success'
) => {
  feedback.message = message
  feedback.type = type
  feedback.show = true
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

const validateEmail = () => {
  const email = form.email.trim()

  if (!email) {
    errors.email = 'Email is required'
    return false
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  if (!emailRegex.test(email)) {
    errors.email = 'Please enter a valid email address'
    return false
  }

  errors.email = ''
  return true
}

const validatePhone = () => {
  if (isLogin.value) {
    errors.phone = ''
    return true
  }

  const phone = form.phone.replace(/\s/g, '')

  if (!phone) {
    errors.phone = 'Phone number is required'
    return false
  }

  const phoneRegex = /^\+?[0-9]{9,12}$/

  if (!phoneRegex.test(phone)) {
    errors.phone = 'Enter a valid phone number, e.g. +251911111111'
    return false
  }

  errors.phone = ''
  return true
}

const validatePassword = () => {
  if (!isLogin.value) {
    errors.password = ''
    return true
  }

  if (!form.password) {
    errors.password = 'Password is required'
    return false
  }

  if (form.password.length < 6) {
    errors.password = 'Password must be at least 6 characters'
    return false
  }

  errors.password = ''
  return true
}

const validateAll = () => {
  const emailValid = validateEmail()
  const phoneValid = validatePhone()
  const passwordValid = validatePassword()

  return emailValid && phoneValid && passwordValid
}

const isFormValid = computed(() => {
  if (isLogin.value) {
    return (
      !!form.email.trim() &&
      !errors.email &&
      !!form.password &&
      form.password.length >= 6 &&
      !errors.password
    )
  }

  return (
    !!form.email.trim() &&
    !errors.email &&
    !!form.phone.trim() &&
    !errors.phone
  )
})

const toggleMode = () => {
  isLogin.value = !isLogin.value
  showPassword.value = false

  form.password = ''

  errors.email = ''
  errors.phone = ''
  errors.password = ''

  feedback.show = false
}

onMounted(() => {
  authStore.init()

  if (authStore.token) {
    router.replace(resolveRedirect())
  }
})

const handleSubmit = async () => {
  if (loading.value || !validateAll()) return

  loading.value = true
  feedback.show = false

  try {
    if (isLogin.value) {
      const res = await authStore.login({
        email: form.email.trim(),
        password: form.password
      })

      if (res.success) {
        showAlert('Login successful!', 'success')

        setTimeout(() => {
          router.replace(resolveRedirect())
        }, 800)
      } else {
        showAlert('Login failed. Please check your credentials.', 'error')
      }
    } else {
      const res = await authStore.sendOTP({
        email: form.email.trim(),
        phone: form.phone.trim()
      })

      if (res.success) {
        showAlert('OTP sent successfully!', 'success')

        router.push({
          path: '/auth/otp',
          query: { email: form.email.trim() }
        })
      } else {
        showAlert('Unable to send OTP. Please try again.', 'error')
      }
    }
  } catch (error: unknown) {
    const message =
      error instanceof Error
        ? error.message
        : 'Connection error. Please check the backend.'

    showAlert(message, 'error')
    console.error('Authentication error:', error)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <main
    class="min-h-screen flex items-center justify-center
           bg-slate-50 px-4 py-8 sm:px-6"
  >
    <section
      class="w-full max-w-md overflow-hidden rounded-3xl
             border border-gray-100 bg-white p-6 shadow-xl
             sm:p-8"
    >
      <!-- Brand -->
      <div class="mb-7 text-center">
        <NuxtLink
          to="/"
          class="mb-5 inline-flex items-center gap-1 text-2xl
                 font-black tracking-tight"
        >
          <span class="text-slate-900">COMBOLOJO</span>
          <span class="text-green-600">SPORT</span>
        </NuxtLink>

        <div
          class="mx-auto mb-4 flex h-16 w-16 items-center
                 justify-center rounded-2xl bg-green-50"
        >
          <span class="text-3xl">⚽</span>
        </div>

        <h1 class="text-2xl font-extrabold text-slate-900">
          {{ isLogin ? 'Welcome Back' : 'Create Account' }}
        </h1>

        <p class="mt-2 text-sm text-gray-500">
          {{
            isLogin
              ? 'Sign in to your CombolojoSPORT account'
              : 'Enter your details to receive an OTP'
          }}
        </p>

        <p
          v-if="route.query.redirect"
          class="mt-3 break-all rounded-lg bg-green-50
                 px-3 py-2 text-xs text-green-700"
        >
          Please sign in to continue to
          {{ route.query.redirect }}
        </p>
      </div>

      <!-- Feedback -->
      <div
        v-if="feedback.show"
        role="status"
        aria-live="polite"
        :class="[
          'mb-5 rounded-xl border p-3 text-sm',
          feedback.type === 'success'
            ? 'border-green-200 bg-green-50 text-green-700'
            : 'border-red-200 bg-red-50 text-red-700'
        ]"
      >
        {{ feedback.message }}
      </div>

      <!-- Authentication form -->
      <form
        class="space-y-5"
        @submit.prevent="handleSubmit"
      >
        <!-- Phone: registration only -->
        <div v-if="!isLogin">
          <label
            for="phone"
            class="mb-2 block text-sm font-semibold text-gray-700"
          >
            Mobile Number *
          </label>

          <input
            id="phone"
            v-model="form.phone"
            type="tel"
            autocomplete="tel"
            placeholder="+251911111111"
            required
            :aria-invalid="!!errors.phone"
            class="w-full rounded-xl border bg-gray-50
                   px-4 py-3.5 text-gray-900 outline-none
                   transition focus:border-green-500
                   focus:ring-4 focus:ring-green-100"
            :class="errors.phone ? 'border-red-500' : 'border-gray-200'"
            @blur="validatePhone"
            @input="errors.phone = ''"
          />

          <p v-if="errors.phone" class="mt-1 text-sm text-red-600">
            {{ errors.phone }}
          </p>
        </div>

        <!-- Email -->
        <div>
          <label
            for="email"
            class="mb-2 block text-sm font-semibold text-gray-700"
          >
            Email Address *
          </label>

          <input
            id="email"
            v-model="form.email"
            type="email"
            autocomplete="email"
            placeholder="example@gmail.com"
            required
            :aria-invalid="!!errors.email"
            class="w-full rounded-xl border bg-gray-50
                   px-4 py-3.5 text-gray-900 outline-none
                   transition focus:border-green-500
                   focus:ring-4 focus:ring-green-100"
            :class="errors.email ? 'border-red-500' : 'border-gray-200'"
            @blur="validateEmail"
            @input="errors.email = ''"
          />

          <p v-if="errors.email" class="mt-1 text-sm text-red-600">
            {{ errors.email }}
          </p>
        </div>

        <!-- Password: login only -->
        <div v-if="isLogin">
          <label
            for="password"
            class="mb-2 block text-sm font-semibold text-gray-700"
          >
            Password *
          </label>

          <div class="relative">
            <input
              id="password"
              v-model="form.password"
              :type="showPassword ? 'text' : 'password'"
              autocomplete="current-password"
              placeholder="Enter your password"
              required
              minlength="6"
              :aria-invalid="!!errors.password"
              class="w-full rounded-xl border bg-gray-50
                     px-4 py-3.5 pr-14 text-gray-900 outline-none
                     transition focus:border-green-500
                     focus:ring-4 focus:ring-green-100"
              :class="errors.password ? 'border-red-500' : 'border-gray-200'"
              @blur="validatePassword"
              @input="errors.password = ''"
            />

            <button
              type="button"
              :aria-label="showPassword ? 'Hide password' : 'Show password'"
              class="absolute inset-y-0 right-0 flex items-center
                     px-4 text-gray-500 hover:text-green-600"
              @click="showPassword = !showPassword"
            >
              {{ showPassword ? '🙈' : '👁️' }}
            </button>
          </div>

          <p v-if="errors.password" class="mt-1 text-sm text-red-600">
            {{ errors.password }}
          </p>
        </div>

        <!-- Submit -->
        <button
          type="submit"
          :disabled="loading || !isFormValid"
          class="flex w-full items-center justify-center gap-2
                 rounded-xl bg-green-600 py-4 font-bold text-white
                 shadow-lg shadow-green-600/20 transition
                 hover:bg-green-700
                 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <svg
            v-if="loading"
            class="h-5 w-5 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            />
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            />
          </svg>

          {{
            loading
              ? 'PLEASE WAIT...'
              : isLogin
                ? 'SIGN IN'
                : 'REGISTER & GET OTP'
          }}
        </button>
      </form>

      <!-- Switch login / register -->
      <div class="mt-6 text-center text-sm text-gray-600">
        {{ isLogin ? "Don't have an account?" : 'Already have an account?' }}

        <button
          type="button"
          class="ml-1 font-bold text-green-700 hover:text-green-800"
          @click="toggleMode"
        >
          {{ isLogin ? 'Register here' : 'Sign in here' }}
        </button>
      </div>

      <!-- Back to website -->
      <div class="mt-6 border-t border-gray-100 pt-5 text-center">
        <NuxtLink
          to="/"
          class="text-sm font-medium text-gray-500 transition hover:text-green-700"
        >
          ← Back to CombolojoSPORT
        </NuxtLink>
      </div>
    </section>
  </main>
</template>
