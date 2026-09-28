<template>
  <div class="min-h-full bg-gradient-to-br from-slate-50 via-white to-emerald-50/30 p-4 sm:p-6 lg:p-8">
    <div class="mx-auto max-w-5xl space-y-6">

      <!-- ═══════════ BREADCRUMB ═══════════ -->
      <div class="flex items-center gap-2 text-sm font-semibold text-slate-500">
        <NuxtLink to="/admin" class="transition hover:text-emerald-600">Dashboard</NuxtLink>
        <span>/</span>
        <NuxtLink to="/admin/users" class="transition hover:text-emerald-600">Users</NuxtLink>
        <span>/</span>
        <span class="text-slate-700">Profile</span>
      </div>

      <!-- ═══════════ ERROR ═══════════ -->
      <div
        v-if="error"
        class="flex items-center justify-between rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-800 shadow-sm"
      >
        <div class="flex items-center gap-2">
          <AlertCircle :size="18" />
          <span>{{ error }}</span>
        </div>
        <button @click="error = ''" class="ml-3 flex h-7 w-7 items-center justify-center rounded-lg text-lg font-bold hover:bg-red-100">×</button>
      </div>

      <!-- ═══════════ LOADING ═══════════ -->
      <div v-if="loading" class="flex min-h-96 items-center justify-center">
        <div class="flex flex-col items-center gap-3">
          <Loader2 class="h-10 w-10 animate-spin text-emerald-500" />
          <p class="text-sm font-semibold text-slate-500">Loading user profile…</p>
        </div>
      </div>

      <!-- ═══════════ PROFILE ═══════════ -->
      <template v-else-if="user">

        <!-- ── Hero card ── -->
        <div class="relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <!-- Gradient banner -->
          <div class="h-32 bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500"></div>

          <!-- Decorative blobs -->
          <div class="pointer-events-none absolute right-0 top-0 h-40 w-40 rounded-full bg-white/10 blur-2xl"></div>

          <!-- Avatar + name -->
          <div class="relative -mt-16 px-6 pb-6">
            <div class="flex flex-col items-start gap-4 sm:flex-row sm:items-end">
              <div class="relative">
                <div class="flex h-32 w-32 items-center justify-center overflow-hidden rounded-3xl border-4 border-white bg-gradient-to-br from-emerald-100 to-teal-100 text-4xl font-black text-emerald-700 shadow-2xl">
                  <img
                    v-if="user.avatar"
                    :src="user.avatar"
                    :alt="user.name"
                    class="h-full w-full object-cover"
                  />
                  <span v-else>{{ initials(user.name) }}</span>
                </div>
                <span
                  v-if="user.role === 'admin'"
                  class="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full bg-purple-500 text-sm font-black text-white ring-4 ring-white shadow-lg"
                  title="Admin"
                >★</span>
              </div>

              <div class="flex-1 min-w-0 pb-1">
                <h1 class="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
                  {{ user.name }}
                </h1>
                <p class="mt-1 text-sm text-slate-500">{{ user.email }}</p>

                <div class="mt-3 flex flex-wrap items-center gap-2">
                  <span class="inline-flex items-center gap-1.5 rounded-lg px-3 py-1 text-xs font-bold" :class="roleClass(user.role)">
                    {{ roleLabel(user.role) }}
                  </span>
                  <span class="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold" :class="statusClass(user)">
                    <span class="h-1.5 w-1.5 rounded-full" :class="statusDot(user)"></span>
                    {{ statusLabel(user) }}
                  </span>
                  <span class="inline-flex items-center gap-1.5 rounded-lg bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700">
                    ID #{{ user.id }}
                  </span>
                </div>
              </div>

              <div class="flex flex-wrap items-center gap-2">
                <NuxtLink
                  to="/admin/users"
                  class="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 shadow-sm transition hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700"
                >
                  <ArrowLeft :size="16" />
                  Back
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>

        <!-- ── Detail grid ── -->
        <div class="grid grid-cols-1 gap-6 lg:grid-cols-3">

          <!-- ─── Left column (contact info) ─── -->
          <div class="space-y-6 lg:col-span-2">

            <!-- Contact info -->
            <div class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div class="mb-5 flex items-center gap-3">
                <span class="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                  <Phone :size="20" />
                </span>
                <div>
                  <h2 class="text-lg font-black text-slate-900">Contact Information</h2>
                  <p class="text-xs text-slate-500">Phone, email, and location details</p>
                </div>
              </div>

              <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <!-- Phone -->
                <div class="rounded-xl border border-slate-100 bg-slate-50 p-4">
                  <p class="text-[10px] font-bold uppercase tracking-wider text-slate-400">Phone Number</p>
                  <a
                    v-if="getPhone(user)"
                    :href="`tel:${getPhone(user).replace(/\s/g, '')}`"
                    class="mt-1.5 inline-flex items-center gap-2 font-mono text-sm font-bold text-emerald-700 hover:underline"
                  >
                    <Phone :size="14" />
                    {{ getPhone(user) }}
                  </a>
                  <p v-else class="mt-1.5 text-sm font-bold text-slate-400">Not provided</p>
                </div>

                <!-- Email -->
                <div class="rounded-xl border border-slate-100 bg-slate-50 p-4">
                  <p class="text-[10px] font-bold uppercase tracking-wider text-slate-400">Email Address</p>
                  <a
                    v-if="user.email"
                    :href="`mailto:${user.email}`"
                    class="mt-1.5 inline-flex items-center gap-2 truncate text-sm font-bold text-slate-900 hover:underline"
                  >
                    <Mail :size="14" />
                    {{ user.email }}
                  </a>
                  <p v-else class="mt-1.5 text-sm font-bold text-slate-400">Not provided</p>
                </div>

                <!-- Country code -->
                <div class="rounded-xl border border-slate-100 bg-slate-50 p-4">
                  <p class="text-[10px] font-bold uppercase tracking-wider text-slate-400">Country Code</p>
                  <p class="mt-1.5 font-mono text-sm font-bold text-slate-900">
                    {{ user.phone_country_code || '—' }}
                  </p>
                </div>

                <!-- Country ISO -->
                <div class="rounded-xl border border-slate-100 bg-slate-50 p-4">
                  <p class="text-[10px] font-bold uppercase tracking-wider text-slate-400">Country</p>
                  <p class="mt-1.5 text-sm font-bold text-slate-900">
                    {{ user.phone_country_iso || '—' }}
                  </p>
                </div>

                <!-- City -->
                <div class="rounded-xl border border-slate-100 bg-slate-50 p-4 sm:col-span-2">
                  <p class="text-[10px] font-bold uppercase tracking-wider text-slate-400">City</p>
                  <p class="mt-1.5 inline-flex items-center gap-2 text-sm font-bold text-slate-900">
                    <MapPin :size="14" />
                    {{ user.city || 'Not provided' }}
                  </p>
                </div>
              </div>
            </div>

            <!-- Bank Account (only for partners) -->
            <div
              v-if="user.role === 'partner' || user.role === 'owner' || user.bank_name || user.bank_account_number"
              class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div class="mb-5 flex items-center gap-3">
                <span class="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <CreditCard :size="20" />
                </span>
                <div>
                  <h2 class="text-lg font-black text-slate-900">Bank Account</h2>
                  <p class="text-xs text-slate-500">Payout details for this partner</p>
                </div>
              </div>

              <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div class="rounded-xl border border-slate-100 bg-slate-50 p-4 sm:col-span-2">
                  <p class="text-[10px] font-bold uppercase tracking-wider text-slate-400">Bank Name</p>
                  <p class="mt-1.5 text-sm font-bold text-slate-900">
                    {{ user.bank_name || 'Not provided' }}
                  </p>
                </div>
                <div class="rounded-xl border border-slate-100 bg-slate-50 p-4">
                  <p class="text-[10px] font-bold uppercase tracking-wider text-slate-400">Account Number</p>
                  <p class="mt-1.5 font-mono text-sm font-bold text-slate-900">
                    {{ user.bank_account_number || '—' }}
                  </p>
                </div>
                <div class="rounded-xl border border-slate-100 bg-slate-50 p-4">
                  <p class="text-[10px] font-bold uppercase tracking-wider text-slate-400">Account Holder</p>
                  <p class="mt-1.5 text-sm font-bold text-slate-900">
                    {{ user.bank_account_name || '—' }}
                  </p>
                </div>
              </div>
            </div>

            <!-- Account Timeline -->
            <div class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div class="mb-5 flex items-center gap-3">
                <span class="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                  <Clock :size="20" />
                </span>
                <div>
                  <h2 class="text-lg font-black text-slate-900">Account Timeline</h2>
                  <p class="text-xs text-slate-500">Key dates and events</p>
                </div>
              </div>

              <div class="space-y-3">
                <div class="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 p-4">
                  <div class="flex items-center gap-2">
                    <Calendar :size="16" class="text-slate-400" />
                    <span class="text-sm font-semibold text-slate-600">Joined</span>
                  </div>
                  <span class="text-sm font-bold text-slate-900">
                    {{ formatDate(user.created_at) }}
                  </span>
                </div>

                <div v-if="user.email_verified_at" class="flex items-center justify-between rounded-xl border border-emerald-100 bg-emerald-50 p-4">
                  <div class="flex items-center gap-2">
                    <CheckCircle :size="16" class="text-emerald-600" />
                    <span class="text-sm font-semibold text-emerald-700">Email Verified</span>
                  </div>
                  <span class="text-sm font-bold text-emerald-900">
                    {{ formatDate(user.email_verified_at) }}
                  </span>
                </div>

                <div v-if="user.phone_verified_at" class="flex items-center justify-between rounded-xl border border-emerald-100 bg-emerald-50 p-4">
                  <div class="flex items-center gap-2">
                    <CheckCircle :size="16" class="text-emerald-600" />
                    <span class="text-sm font-semibold text-emerald-700">Phone Verified</span>
                  </div>
                  <span class="text-sm font-bold text-emerald-900">
                    {{ formatDate(user.phone_verified_at) }}
                  </span>
                </div>

                <div class="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 p-4">
                  <div class="flex items-center gap-2">
                    <RefreshCw :size="16" class="text-slate-400" />
                    <span class="text-sm font-semibold text-slate-600">Last Updated</span>
                  </div>
                  <span class="text-sm font-bold text-slate-900">
                    {{ formatDate(user.updated_at) }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- ─── Right column (quick stats + actions) ─── -->
          <div class="space-y-6">

            <!-- Quick Stats -->
            <div class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 class="mb-4 text-lg font-black text-slate-900">Quick Stats</h2>

              <div class="space-y-3">
                <div class="flex items-center justify-between rounded-xl bg-slate-50 p-3">
                  <div class="flex items-center gap-2">
                    <MapPin :size="16" class="text-violet-500" />
                    <span class="text-xs font-semibold text-slate-600">Venues</span>
                  </div>
                  <span class="text-sm font-black text-slate-900">
                    {{ user.venues_count ?? 0 }}
                  </span>
                </div>

                <div class="flex items-center justify-between rounded-xl bg-slate-50 p-3">
                  <div class="flex items-center gap-2">
                    <Banknote :size="16" class="text-emerald-500" />
                    <span class="text-xs font-semibold text-slate-600">Total Earnings</span>
                  </div>
                  <span class="text-sm font-black text-emerald-700">
                    {{ formatPrice(user.total_earnings) }}
                  </span>
                </div>

                <div class="flex items-center justify-between rounded-xl bg-slate-50 p-3">
                  <div class="flex items-center gap-2">
                    <CalendarCheck :size="16" class="text-blue-500" />
                    <span class="text-xs font-semibold text-slate-600">Bookings</span>
                  </div>
                  <span class="text-sm font-black text-slate-900">
                    {{ user.bookings_count ?? 0 }}
                  </span>
                </div>
              </div>
            </div>

            <!-- Actions -->
            <div class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 class="mb-4 text-lg font-black text-slate-900">Actions</h2>

              <div class="space-y-2">
                <!-- Role toggle -->
                <div>
                  <p class="mb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">Change Role</p>
                  <div class="space-y-1.5">
                    <button
                      v-for="role in roleOptions"
                      :key="role"
                      @click="changeRole(role)"
                      :disabled="processing || user.role === role"
                      class="flex w-full items-center justify-between gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-left text-sm font-semibold text-slate-700 transition hover:border-emerald-300 hover:bg-emerald-50 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <span>{{ roleLabel(role) }}</span>
                      <span v-if="user.role === role" class="text-xs text-emerald-600">✓</span>
                    </button>
                  </div>
                </div>

                <!-- Status toggle -->
                <div class="border-t border-slate-100 pt-3">
                  <p class="mb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">Status</p>
                  <button
                    v-if="user.status !== 'blocked'"
                    @click="changeStatus('blocked')"
                    :disabled="processing"
                    class="flex w-full items-center justify-center gap-2 rounded-lg bg-red-50 px-3 py-2.5 text-sm font-bold text-red-700 ring-1 ring-red-200 transition hover:bg-red-100 disabled:opacity-50"
                  >
                    <Ban :size="15" />
                    Block User
                  </button>

                  <button
                    v-else
                    @click="changeStatus('active')"
                    :disabled="processing"
                    class="flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-50 px-3 py-2.5 text-sm font-bold text-emerald-700 ring-1 ring-emerald-200 transition hover:bg-emerald-100 disabled:opacity-50"
                  >
                    <CheckCircle :size="15" />
                    Activate User
                  </button>
                </div>
              </div>
            </div>

            <!-- Verification badges -->
            <div class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 class="mb-4 text-lg font-black text-slate-900">Verification</h2>
              <div class="space-y-2">
                <div class="flex items-center justify-between rounded-lg bg-slate-50 p-3">
                  <div class="flex items-center gap-2">
                    <Mail :size="14" class="text-slate-500" />
                    <span class="text-xs font-semibold text-slate-600">Email</span>
                  </div>
                  <span v-if="user.email_verified_at" class="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-700">
                    <CheckCircle :size="10" /> Verified
                  </span>
                  <span v-else class="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-700">
                    ⏳ Pending
                  </span>
                </div>

                <div class="flex items-center justify-between rounded-lg bg-slate-50 p-3">
                  <div class="flex items-center gap-2">
                    <Phone :size="14" class="text-slate-500" />
                    <span class="text-xs font-semibold text-slate-600">Phone</span>
                  </div>
                  <span v-if="user.phone_verified_at" class="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-700">
                    <CheckCircle :size="10" /> Verified
                  </span>
                  <span v-else class="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-700">
                    ⏳ Pending
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>

      <!-- ═══════════ NOT FOUND ═══════════ -->
      <div
        v-else
        class="flex min-h-96 flex-col items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-white p-12 text-center shadow-sm"
      >
        <div class="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-3xl">👤</div>
        <h2 class="text-xl font-bold text-slate-800">User not found</h2>
        <p class="text-sm text-slate-500">The user you're looking for doesn't exist or has been deleted.</p>
        <NuxtLink
          to="/admin/users"
          class="mt-2 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-slate-800"
        >
          <ArrowLeft :size="16" />
          Back to Users
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import {
  Phone, Mail, MapPin, CreditCard, Clock, Calendar, CheckCircle,
  Loader2, AlertCircle, ArrowLeft, Ban, RefreshCw,
  Banknote, CalendarCheck,
} from 'lucide-vue-next'
import { useAuthStore } from '~/stores/auth'

definePageMeta({ layout: 'admin' })

/* ═══════════════════════════════════════════
   TYPES
   ═══════════════════════════════════════════ */
interface UserDetail {
  id: number
  name: string
  email: string
  phone?: string | null
  phone_number?: string | null
  phoneNumber?: string | null
  phone_full?: string | null
  phone_country_code?: string | null
  phone_country_iso?: string | null
  role: string
  status?: string | null
  avatar?: string | null
  city?: string | null
  created_at?: string
  updated_at?: string
  email_verified_at?: string | null
  phone_verified_at?: string | null
  is_active?: boolean
  // Partner fields
  bank_name?: string | null
  bank_account_number?: string | null
  bank_account_name?: string | null
  venues_count?: number
  bookings_count?: number
  total_earnings?: number
}

/* ═══════════════════════════════════════════
   SETUP
   ═══════════════════════════════════════════ */
const route = useRoute()
const config = useRuntimeConfig()
const authStore = useAuthStore()

const userId = computed(() => Number(route.params.id))

const user = ref<UserDetail | null>(null)
const loading = ref(false)
const processing = ref(false)
const error = ref('')

const roleOptions: Array<'admin' | 'partner' | 'user'> = ['admin', 'partner', 'user']

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
const initials = (name: string) =>
  String(name || '?')
    .split(' ')
    .slice(0, 2)
    .map(v => v.charAt(0))
    .join('')
    .toUpperCase() || '?'

const getPhone = (u: any): string => {
  const raw =
    u?.phone_full ||
    u?.phone_number ||
    u?.phone ||
    u?.phoneNumber ||
    ''
  return String(raw).trim()
}

const roleLabel = (role?: string) => {
  const r = String(role || '').toLowerCase()
  if (r === 'admin') return 'Admin'
  if (r === 'partner') return 'Partner'
  if (r === 'owner') return 'Owner'
  if (r === 'user') return 'User'
  return r ? r.charAt(0).toUpperCase() + r.slice(1) : 'User'
}

const roleClass = (role?: string) => {
  const r = String(role || '').toLowerCase()
  if (r === 'admin') return 'bg-purple-100 text-purple-700 ring-1 ring-purple-200'
  if (r === 'partner' || r === 'owner') return 'bg-emerald-100 text-emerald-700 ring-1 ring-emerald-200'
  return 'bg-slate-100 text-slate-700 ring-1 ring-slate-200'
}

const statusLabel = (u: UserDetail) => {
  if (u.status === 'blocked' || u.is_active === false) return 'Blocked'
  if (u.status === 'pending') return 'Pending'
  return 'Active'
}

const statusClass = (u: UserDetail) => {
  const s = statusLabel(u)
  if (s === 'Blocked') return 'bg-red-100 text-red-700 ring-1 ring-red-200'
  if (s === 'Pending') return 'bg-amber-100 text-amber-700 ring-1 ring-amber-200'
  return 'bg-emerald-100 text-emerald-700 ring-1 ring-emerald-200'
}

const statusDot = (u: UserDetail) => {
  const s = statusLabel(u)
  if (s === 'Blocked') return 'bg-red-500'
  if (s === 'Pending') return 'bg-amber-500'
  return 'bg-emerald-500'
}

const formatDate = (value?: string | null) => {
  if (!value) return '—'
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return '—'
  return new Intl.DateTimeFormat('en-ET-u-ca-gregory', {
    day: '2-digit', month: 'short', year: 'numeric',
    timeZone: 'Africa/Addis_Ababa',
  }).format(date)
}

const formatPrice = (n?: number) =>
  `ETB ${new Intl.NumberFormat('en-ET').format(Number(n) || 0)}`

/* ═══════════════════════════════════════════
   LOAD USER
   ═══════════════════════════════════════════ */
const loadUser = async () => {
  loading.value = true
  error.value = ''

  try {
    const response: any = await $fetch(`${apiBase.value}/admin/users/${userId.value}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
        Accept: 'application/json',
      },
    })

    user.value = response?.data ?? response ?? null
  } catch (err: any) {
    console.error('Load user error:', err)
    error.value =
      err?.data?.message ||
      err?.response?._data?.message ||
      'Unable to load user details.'
    user.value = null
  } finally {
    loading.value = false
  }
}

/* ═══════════════════════════════════════════
   ACTIONS
   ═══════════════════════════════════════════ */
const changeRole = async (role: string) => {
  if (!user.value) return
  processing.value = true
  error.value = ''

  try {
    await $fetch(`${apiBase.value}/admin/users/${user.value.id}/role`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${getToken()}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: { role },
    })
    user.value.role = role
  } catch (err: any) {
    console.error('Change role error:', err)
    error.value = err?.data?.message || 'Could not change role.'
  } finally {
    processing.value = false
  }
}

const changeStatus = async (status: 'active' | 'blocked') => {
  if (!user.value) return
  processing.value = true
  error.value = ''

  try {
    await $fetch(`${apiBase.value}/admin/users/${user.value.id}/status`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${getToken()}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: { status },
    })
    user.value.status = status
    user.value.is_active = status === 'active'
  } catch (err: any) {
    console.error('Change status error:', err)
    error.value = err?.data?.message || 'Could not change status.'
  } finally {
    processing.value = false
  }
}

onMounted(loadUser)
</script>