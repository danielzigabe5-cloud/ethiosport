<template>
  <div class="min-h-full bg-gradient-to-br from-slate-50 via-white to-emerald-50/30 p-4 sm:p-6 lg:p-8">
    <div class="mx-auto max-w-2xl">

      <!-- ═══════ HEADER ═══════ -->
      <div class="mb-6">
        <div class="flex items-center gap-2 text-sm font-semibold text-slate-500">
          <NuxtLink :to="backLink" class="transition hover:text-emerald-600">
            {{ backLabel }}
          </NuxtLink>
          <span>/</span>
          <span class="text-slate-700">Profile</span>
        </div>
        <h1 class="mt-2 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
          Edit Profile
        </h1>
        <p class="mt-1 text-sm text-slate-500">
          Update your personal information and account settings.
        </p>
      </div>

      <!-- ═══════ SUCCESS / ERROR ═══════ -->
      <Transition
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="opacity-0 -translate-y-2"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition duration-200"
        leave-to-class="opacity-0"
      >
        <div
          v-if="statusMessage.text"
          :class="statusMessage.isError
            ? 'border-red-200 bg-red-50 text-red-800'
            : 'border-emerald-200 bg-emerald-50 text-emerald-800'"
          class="mb-5 flex items-center gap-3 rounded-2xl border p-4 text-sm font-semibold shadow-sm"
        >
          <component
            :is="statusMessage.isError ? AlertCircle : CheckCircle"
            :size="18"
            class="shrink-0"
          />
          <span>{{ statusMessage.text }}</span>
        </div>
      </Transition>

      <!-- ═══════ CARD ═══════ -->
      <div class="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

        <!-- Card header -->
        <div class="flex items-center gap-4 border-b border-slate-100 bg-gradient-to-r from-emerald-50 to-teal-50 px-6 py-5">
          <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-md">
            <UserCog :size="22" />
          </div>
          <div>
            <h2 class="text-lg font-black text-slate-900">Account Information</h2>
            <p class="text-xs text-slate-500">Update your name, email, photo, or password</p>
          </div>
        </div>

        <!-- Form -->
        <form @submit.prevent="updateProfile" class="space-y-6 p-6">

          <!-- ═══ AVATAR ═══ -->
          <section>
            <label class="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
              Profile Photo
            </label>

            <div class="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
              <!-- Avatar preview -->
              <div class="relative">
                <div class="flex h-24 w-24 items-center justify-center overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-100 to-teal-100 text-3xl font-black text-emerald-700 ring-4 ring-white shadow-xl">
                  <img
                    v-if="avatarPreview || authStore.user?.avatar"
                    :src="avatarPreview || authStore.user?.avatar"
                    alt="Profile"
                    class="h-full w-full object-cover"
                    @error="onAvatarError"
                  />
                  <span v-else>{{ initials(authStore.user?.name) }}</span>
                </div>

                <!-- Remove button -->
                <button
                  v-if="avatarPreview"
                  type="button"
                  @click="removeAvatar"
                  class="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full bg-red-500 text-white shadow-lg transition hover:bg-red-600"
                  title="Remove"
                >
                  <X :size="14" />
                </button>
              </div>

              <!-- Upload controls -->
              <div class="flex-1 text-center sm:text-left">
                <input
                  ref="fileInput"
                  type="file"
                  accept="image/jpeg,image/png,image/jpg,image/webp"
                  class="hidden"
                  @change="handleFileChange"
                />

                <div class="flex flex-wrap items-center justify-center gap-2 sm:justify-start">
                  <button
                    type="button"
                    @click="fileInput?.click()"
                    class="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 shadow-sm transition hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700"
                  >
                    <Upload :size="15" />
                    Change Photo
                  </button>

                  <button
                    v-if="avatarPreview"
                    type="button"
                    @click="removeAvatar"
                    class="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-red-600 shadow-sm transition hover:border-red-300 hover:bg-red-50"
                  >
                    <Trash2 :size="15" />
                    Remove
                  </button>
                </div>

                <p class="mt-2 text-xs text-slate-400">
                  JPEG, PNG, JPG, or WEBP · Max 2MB
                </p>
                <p v-if="fileName" class="mt-1 inline-flex items-center gap-1 text-xs font-bold text-emerald-600">
                  <CheckCircle :size="12" />
                  {{ fileName }}
                </p>
              </div>
            </div>
          </section>

          <!-- ═══ PERSONAL INFO ═══ -->
          <section class="space-y-4">
            <h3 class="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-emerald-600">
              <User :size="14" />
              Personal Information
            </h3>

            <!-- Name -->
            <div>
              <label class="mb-1.5 block text-xs font-bold text- black text-slate-600">
                Full Name <span class="text-red-500">*</span>
              </label>
              <div class="relative">
                <User class="absolute left-3.5 top-1/2 h-4 w-4  text-black -translate-y-1/2 text-slate-400" />
                <input
                  v-model="form.name"
                  type="text"
                  required
                  placeholder="Enter your full name"
                  class="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm outline-none text-black transition focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10"
                  :class="{ 'border-red-400': errors.name }"
                />
              </div>
              <p v-if="errors.name" class="mt-1 text-xs text-red-500">{{ errors.name }}</p>
            </div>

            <!-- Email -->
            <div>
              <label class="mb-1.5 block text-xs font-bold text-slate-600">
                Email Address <span class="text-red-500">*</span>
              </label>
              <div class="relative">
                <Mail class="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  v-model="form.email"
                  type="email"
                  required
                  placeholder="Enter your email"
                  class="w-full rounded-xl border text-black border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10"
                  :class="{ 'border-red-400': errors.email }"
                />
              </div>
              <p v-if="errors.email" class="mt-1 text-xs text-red-500">{{ errors.email }}</p>
            </div>

            <!-- Phone (optional) -->
            <div>
              <label class="mb-1.5 block text-xs font-bold text-slate-600">
                Phone Number
              </label>
              <div class="relative">
                <Phone class="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  v-model="form.phone_number"
                  type="tel"
                  placeholder="+251 9..."
                  class="w-full rounded-xl border text-black  border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10"
                />
              </div>
            </div>
          </section>

          <!-- ═══ SECURITY ═══ -->
          <section class="space-y-4">
            <h3 class="flex items-center gap-2 text-xs text-black  font-black uppercase tracking-widest text-emerald-600">
              <Lock :size="14" />
              Change Password
            </h3>

            <p class="rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-800">
              💡 Leave blank if you don't want to change your password.
            </p>

            <!-- Current password -->
            <div>
              <label class="mb-1.5 block text-xs font-bold text-slate-600">
                Current Password
              </label>
              <div class="relative">
                <Lock class="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  v-model="form.current_password"
                  type="password"
                  placeholder="••••••"
                  class="w-full rounded-xl text-black border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10"
                  :class="{ 'border-red-400': errors.current_password }"
                />
              </div>
              <p v-if="errors.current_password" class="mt-1 text-xs text-red-500">
                {{ errors.current_password }}
              </p>
            </div>

            <!-- New password -->
            <div>
              <label class="mb-1.5 block text-xs font-bold text-slate-600">
                New Password
              </label>
              <div class="relative">
                <KeyRound class="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  v-model="form.password"
                  type="password"
                  placeholder="Min. 6 characters"
                  class="w-full rounded-xl text-black border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10"
                  :class="{ 'border-red-400': errors.password }"
                />
              </div>
              <p v-if="errors.password" class="mt-1 text-xs text-red-500">{{ errors.password }}</p>
            </div>

            <!-- Confirm password -->
            <div>
              <label class="mb-1.5 block text-xs font-bold text-slate-600">
                Confirm New Password
              </label>
              <div class="relative">
                <KeyRound class="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  v-model="form.password_confirmation"
                  type="password"
                  placeholder="Re-enter new password"
                  class="w-full rounded-xl text-black border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10"
                />
              </div>
            </div>
          </section>

          <!-- ═══ ACTIONS ═══ -->
          <div class="flex flex-col-reverse justify-end gap-3 border-t border-slate-100 pt-5 sm:flex-row">
            <NuxtLink
              :to="backLink"
              class="rounded-xl border border-slate-200 bg-white px-6 py-2.5 text-center text-sm font-bold text-slate-700 transition hover:bg-slate-50"
            >
              Cancel
            </NuxtLink>

            <button
              type="submit"
              :disabled="isLoading"
              class="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-emerald-500/30 transition hover:from-emerald-600 hover:to-teal-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Loader2 v-if="isLoading" class="animate-spin" :size="16" />
              <Save v-else :size="16" />
              {{ isLoading ? 'Saving…' : 'Save Changes' }}
            </button>
          </div>
        </form>
      </div>

      <!-- ═══════ META INFO ═══════ -->
      <div class="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div class="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <p class="text-[10px] font-bold uppercase tracking-wider text-slate-500">Member Since</p>
          <p class="mt-1 text-sm font-black text-slate-900">{{ formatDate(authStore.user?.created_at) }}</p>
        </div>
        <div class="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <p class="text-[10px] font-bold uppercase tracking-wider text-slate-500">Role</p>
          <p class="mt-1 text-sm font-black capitalize text-slate-900">{{ authStore.user?.role || 'User' }}</p>
        </div>
        <div class="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <p class="text-[10px] font-bold uppercase tracking-wider text-slate-500">User ID</p>
          <p class="mt-1 font-mono text-sm font-black text-slate-900">#{{ authStore.user?.id }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'
import {
  User, Mail, Phone, Lock, KeyRound, Upload, Trash2, X, CheckCircle,
  AlertCircle, Loader2, Save, UserCog,
} from 'lucide-vue-next'
import { useAuthStore } from '~/stores/auth'

/* ═══════════════════════════════════════════
   PAGE META — ሁሉም role ይጠቀምበታል
   ═══════════════════════════════════════════ */
definePageMeta({
  layout: 'default',
  middleware: 'auth',
})

/* ═══════════════════════════════════════════
   SETUP
   ═══════════════════════════════════════════ */
const config = useRuntimeConfig()
const authStore = useAuthStore()

const isLoading = ref(false)
const selectedFile = ref<File | null>(null)
const avatarPreview = ref<string | null>(null)
const fileInput = ref<HTMLInputElement | null>(null)

const statusMessage = reactive({
  text: '',
  isError: false,
})

const errors = reactive<Record<string, string>>({})

const form = reactive({
  name: '',
  email: '',
  phone_number: '',
  current_password: '',
  password: '',
  password_confirmation: '',
})

/* ═══════════════════════════════════════════
   ROLE-AWARE BACK LINK
   ═══════════════════════════════════════════ */
const backLink = computed(() => {
  const role = authStore.user?.role?.toLowerCase()
  if (role === 'admin') return '/admin'
  if (role === 'partner' || role === 'owner') return '/partner'
  return '/'
})

const backLabel = computed(() => {
  const role = authStore.user?.role?.toLowerCase()
  if (role === 'admin') return 'Dashboard'
  if (role === 'partner' || role === 'owner') return 'Partner Dashboard'
  return 'Home'
})

/* ═══════════════════════════════════════════
   API
   ═══════════════════════════════════════════ */
const apiBase = computed(() => {
  const base = String(config.public.apiBase || 'http://127.0.0.1:8000').replace(/\/+$/, '')
  return base.endsWith('/api') ? base : `${base}/api`
})

const getToken = (): string => {
  if (authStore?.token) return String(authStore.token)
  if (import.meta.client) {
    const c = useCookie<string | null>('auth_token')
    if (c.value) return c.value
    const ls = localStorage.getItem('auth_token') || localStorage.getItem('token')
    if (ls) return ls
  }
  return ''
}

/* ═══════════════════════════════════════════
   HELPERS
   ═══════════════════════════════════════════ */
const initials = (name?: string) =>
  String(name || '?').split(' ').slice(0, 2).map(n => n.charAt(0)).join('').toUpperCase() || '?'

const formatDate = (value?: string) => {
  if (!value) return '—'
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return '—'
  return new Intl.DateTimeFormat('en-ET-u-ca-gregory', {
    day: '2-digit', month: 'short', year: 'numeric',
    timeZone: 'Africa/Addis_Ababa',
  }).format(date)
}

const fileName = computed(() => selectedFile.value?.name || '')

const onAvatarError = (e: Event) => {
  (e.target as HTMLImageElement).style.display = 'none'
}

/* ═══════════════════════════════════════════
   FILE HANDLING
   ═══════════════════════════════════════════ */
const handleFileChange = (e: Event) => {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (!file) return

  if (file.size > 2 * 1024 * 1024) {
    statusMessage.text = 'Image must be smaller than 2MB.'
    statusMessage.isError = true
    return
  }

  if (!['image/jpeg', 'image/png', 'image/jpg', 'image/webp'].includes(file.type)) {
    statusMessage.text = 'Only JPEG, PNG, JPG, or WEBP allowed.'
    statusMessage.isError = true
    return
  }

  selectedFile.value = file
  avatarPreview.value = URL.createObjectURL(file)
  statusMessage.text = ''
}

const removeAvatar = () => {
  selectedFile.value = null
  avatarPreview.value = null
  if (fileInput.value) fileInput.value.value = ''
}

/* ═══════════════════════════════════════════
   LOAD USER DATA
   ═══════════════════════════════════════════ */
const loadProfile = async () => {
  try {
    const res: any = await $fetch(`${apiBase.value}/auth/me`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
        Accept: 'application/json',
      },
    })

    const user = res?.user ?? res?.data ?? null
    if (user) {
      authStore.user = user
      form.name = user.name || ''
      form.email = user.email || ''
      form.phone_number = user.phone_number || ''
    }
  } catch (e) {
    if (authStore.user) {
      form.name = authStore.user.name || ''
      form.email = authStore.user.email || ''
      form.phone_number = authStore.user.phone_number || ''
    }
  }
}

/* ═══════════════════════════════════════════
   SUBMIT — ሁሉም role ወደ /profile (PUT)
   ═══════════════════════════════════════════ */
const updateProfile = async () => {
  isLoading.value = true
  statusMessage.text = ''

  // ✅ የቀደሙትን errors አጽዳ
  Object.keys(errors).forEach((k) => delete errors[k])

  try {
    const fd = new FormData()
    fd.append('name', form.name)
    fd.append('email', form.email)
    if (form.phone_number) fd.append('phone_number', form.phone_number)

    if (form.password || form.password_confirmation) {
      fd.append('current_password', form.current_password)
      fd.append('password', form.password)
      fd.append('password_confirmation', form.password_confirmation)
    }

    if (selectedFile.value) {
      fd.append('avatar', selectedFile.value)
    }

    fd.append('_method', 'PUT')

    const res: any = await $fetch(`${apiBase.value}/auth/profile`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${getToken()}`,
        Accept: 'application/json',
      },
      body: fd,
    })

    const updated = res?.user ?? res?.data ?? null
    if (updated) {
      authStore.user = { ...authStore.user, ...updated }
    }

    statusMessage.text = 'Profile updated successfully!'
    statusMessage.isError = false

    form.current_password = ''
    form.password = ''
    form.password_confirmation = ''
    selectedFile.value = null
    avatarPreview.value = null

    setTimeout(() => (statusMessage.text = ''), 4000)
  } catch (err: any) {
    // ✅ DEBUG — የስህተቱን ሙሉ መዋቅር አሳይ
    console.error('🔴 Update Profile Error:', err)
    console.log('err.data:', err?.data)
    console.log('err.response:', err?.response)
    console.log('err.statusCode:', err?.statusCode)
    console.log('err.status:', err?.status)

    // ✅ የስህተት መረጃን ከሁሉም ቦታ ሞክር
    const responseData =
      err?.data ||                    // Nuxt $fetch (አዲስ)
      err?.response?._data ||         // Axios
      err?.response?.data ||          // Axios አማራጭ
      err?.body ||                    // fetch API
      null

    console.log('📦 Parsed responseData:', responseData)

    // ✅ Validation errors (422)
    if (responseData?.errors && typeof responseData.errors === 'object') {
      Object.entries(responseData.errors).forEach(([key, value]) => {
        errors[key] = Array.isArray(value) ? value[0] : String(value)
      })

      // ✅ የመጀመሪያውን ስህተት አሳይ
      const firstError = Object.values(errors)[0] || 'Validation failed.'
      statusMessage.text = firstError
      statusMessage.isError = true

      console.log('✅ Errors mapped:', errors)
    }
    // ✅ Message ብቻ ካለ
    else if (responseData?.message) {
      statusMessage.text = responseData.message
      statusMessage.isError = true
    }
    // ✅ ሌላ ስህተት
    else if (err?.message) {
      statusMessage.text = err.message
      statusMessage.isError = true
    }
    // ✅ ምንም ካልተገኘ
    else {
      statusMessage.text = 'Could not save changes. Please try again.'
      statusMessage.isError = true
    }
  } finally {
    isLoading.value = false
  }
}

/* ═══════════════════════════════════════════
   MOUNT
   ═══════════════════════════════════════════ */
onMounted(async () => {
  if (authStore.user) {
    form.name = authStore.user.name || ''
    form.email = authStore.user.email || ''
    form.phone_number = authStore.user.phone_number || ''
  }
  await loadProfile()
})
</script>