<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useAuthStore } from '~/stores/auth'

/* ═══════════════════════════════════════════
   PAGE META
   ═══════════════════════════════════════════ */
definePageMeta({
  layout: 'partner',
  middleware: 'auth',
})

/* ═══════════════════════════════════════════
   TYPES
   ═══════════════════════════════════════════ */
interface Booking {
  id: number
  customer: string
  venue_id: number
  venue_name: string
  date: string
  date_raw: string | null
  time: string
  amount: string
  status: string
}

interface Stats {
  total: number
  confirmed: number
  pending: number
  cancelled: number
  today: number
  venues: number
}

/* ═══════════════════════════════════════════
   🌐 SHARED STATE — በሁሉም ገጾች ይጋራል
   ═══════════════════════════════════════════ */

// የቦታ ማስያዣዎች — በ `status|date` key ይቀመጣል
const sharedBookings = useState<Record<string, Booking[]>>(
  'partner-bookings-cache',
  () => ({})
)

// ስታቲስቲክስ — አንዴ ብቻ ይመጣል
const sharedStats = useState<Stats>('partner-bookings-stats', () => ({
  total: 0,
  confirmed: 0,
  pending: 0,
  cancelled: 0,
  today: 0,
  venues: 0,
}))

// የመጨረሻ ጥሪ ጊዜ — 30 ሰከንድ ካለፈ ዳታው ያረጃል
const lastFetchTime = useState<number>('partner-bookings-last-fetch', () => 0)

/* ═══════════════════════════════════════════
   SETUP
   ═══════════════════════════════════════════ */
const config = useRuntimeConfig()
const authStore = useAuthStore()

const bookings = ref<Booking[]>([])
const stats = ref<Stats>({ ...sharedStats.value })

const isLoading = ref(true)
const isSaving = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

const statusFilter = ref('All')
const dateFilter = ref('')

/* ═══════════════════════════════════════════
   API HELPERS
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
   CACHE KEY — በ filter ይለያያል
   ═══════════════════════════════════════════ */
const cacheKey = computed(() => {
  return `${statusFilter.value}|${dateFilter.value || 'all'}`
})

/* ═══════════════════════════════════════════
   CACHE VALIDITY — 30 ሰከንድ
   ═══════════════════════════════════════════ */
const isCacheValid = computed(() => {
  if (!lastFetchTime.value) return false
  return Date.now() - lastFetchTime.value < 30_000 // 30 seconds
})

/* ═══════════════════════════════════════════
   1️⃣ FETCH BOOKINGS — cache-aware
   ═══════════════════════════════════════════ */
const fetchBookings = async (force = false) => {
  const key = cacheKey.value

  // 🎯 Cache ካለ እና ጥቂት ጊዜ ካለፈ ከ cache ውሰድ
  if (!force && sharedBookings.value[key] && isCacheValid.value) {
    bookings.value = sharedBookings.value[key]
    isLoading.value = false
    return
  }

  isLoading.value = true
  errorMessage.value = ''

  try {
    const params = new URLSearchParams()
    if (statusFilter.value !== 'All') params.append('status', statusFilter.value)
    if (dateFilter.value) params.append('date', dateFilter.value)

    const url = `${apiBase.value}/partner/bookings${params.toString() ? '?' + params.toString() : ''}`

    const response = await $fetch<any>(url, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
        Accept: 'application/json',
      },
    })

    const loaded = Array.isArray(response)
      ? response
      : (response?.data || [])

    bookings.value = loaded

    // 🌐 በ cache ውስጥ አስቀምጥ
    sharedBookings.value[key] = loaded
    lastFetchTime.value = Date.now()
  } catch (e: any) {
    console.error('Error fetching bookings:', e)
    errorMessage.value = e?.data?.message || 'Failed to load bookings.'
    bookings.value = []
  } finally {
    isLoading.value = false
  }
}

/* ═══════════════════════════════════════════
   2️⃣ FETCH STATS — cache-aware
   ═══════════════════════════════════════════ */
const fetchStats = async (force = false) => {
  // 🎯 Cache ካለ ከ cache ውሰድ
  if (!force && sharedStats.value.total > 0 && isCacheValid.value) {
    stats.value = { ...sharedStats.value }
    return
  }

  try {
    const response = await $fetch<any>(`${apiBase.value}/partner/bookings/stats`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
        Accept: 'application/json',
      },
    })

    const data = response?.data || response
    const newStats: Stats = {
      total:     Number(data?.total ?? 0),
      confirmed: Number(data?.confirmed ?? 0),
      pending:   Number(data?.pending ?? 0),
      cancelled: Number(data?.cancelled ?? 0),
      today:     Number(data?.today ?? 0),
      venues:    Number(data?.venues ?? 0),
    }

    stats.value = newStats
    sharedStats.value = newStats
  } catch (e: any) {
    console.error('Error fetching stats:', e)
  }
}

/* ═══════════════════════════════════════════
   3️⃣ CONFIRM BOOKING
   ═══════════════════════════════════════════ */
const confirmBooking = async (booking: Booking) => {
  isSaving.value = true
  try {
    await $fetch(`${apiBase.value}/partner/bookings/${booking.id}/confirm`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${getToken()}`,
        Accept: 'application/json',
      },
    })

    booking.status = 'Confirmed'

    // 🌐 የ cache ን አዘምን
    const key = cacheKey.value
    if (sharedBookings.value[key]) {
      sharedBookings.value[key] = [...bookings.value]
    }

    successMessage.value = 'Booking confirmed!'
    await fetchStats(true) // force refresh
    setTimeout(() => (successMessage.value = ''), 3000)
  } catch (e: any) {
    console.error('Error confirming booking:', e)
    errorMessage.value = e?.data?.message || 'Failed to confirm booking.'
    setTimeout(() => (errorMessage.value = ''), 3000)
  } finally {
    isSaving.value = false
  }
}

/* ═══════════════════════════════════════════
   4️⃣ REJECT BOOKING
   ═══════════════════════════════════════════ */
const rejectBooking = async (booking: Booking) => {
  if (!confirm('Are you sure you want to cancel this booking?')) return

  isSaving.value = true
  try {
    await $fetch(`${apiBase.value}/partner/bookings/${booking.id}/reject`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${getToken()}`,
        Accept: 'application/json',
      },
    })

    booking.status = 'Cancelled'

    // 🌐 የ cache ን አዘምን
    const key = cacheKey.value
    if (sharedBookings.value[key]) {
      sharedBookings.value[key] = [...bookings.value]
    }

    successMessage.value = 'Booking cancelled.'
    await fetchStats(true) // force refresh
    setTimeout(() => (successMessage.value = ''), 3000)
  } catch (e: any) {
    console.error('Error rejecting booking:', e)
    errorMessage.value = e?.data?.message || 'Failed to cancel booking.'
    setTimeout(() => (errorMessage.value = ''), 3000)
  } finally {
    isSaving.value = false
  }
}

/* ═══════════════════════════════════════════
   5️⃣ CLEAR FILTERS
   ═══════════════════════════════════════════ */
const clearFilters = () => {
  statusFilter.value = 'All'
  dateFilter.value = ''
  fetchBookings()
}

/* ═══════════════════════════════════════════
   6️⃣ REFRESH ALL (force reload)
   ═══════════════════════════════════════════ */
const refreshAll = async () => {
  // 🎯 Cache ን አጽዳ
  sharedBookings.value = {}
  lastFetchTime.value = 0

  await Promise.all([
    fetchBookings(true),
    fetchStats(true),
  ])
}

/* ═══════════════════════════════════════════
   LIFECYCLE
   ═══════════════════════════════════════════ */
onMounted(async () => {
  if (authStore?.init) authStore.init()

  // 🎯 Cache ካለ ወዲያውኑ አሳይ (instant)
  const key = cacheKey.value
  if (sharedBookings.value[key]) {
    bookings.value = sharedBookings.value[key]
    isLoading.value = false
  }

  if (sharedStats.value.total > 0) {
    stats.value = { ...sharedStats.value }
  }

  // 🎯 ከዚያ background ውስጥ አድስ (cache ካለፈ)
  await Promise.all([fetchBookings(), fetchStats()])
})

/* ═══════════════════════════════════════════
   COMPUTED
   ═══════════════════════════════════════════ */
const statCards = computed(() => [
  { title: 'Total Bookings', value: stats.value.total,     color: 'slate',   icon: '📊' },
  { title: 'Confirmed',      value: stats.value.confirmed, color: 'emerald', icon: '✓' },
  { title: 'Pending',        value: stats.value.pending,   color: 'amber',   icon: '⏳' },
  { title: 'Cancelled',      value: stats.value.cancelled, color: 'red',     icon: '✕' },
])

const hasActiveFilter = computed(() =>
  statusFilter.value !== 'All' || dateFilter.value !== ''
)

/* ═══════════════════════════════════════════
   HELPERS
   ═══════════════════════════════════════════ */
function statusClass(status: string) {
  const s = status.toLowerCase()
  if (s === 'confirmed') return 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200'
  if (s === 'pending')   return 'bg-amber-50 text-amber-700 ring-1 ring-amber-200'
  if (s === 'cancelled') return 'bg-red-50 text-red-700 ring-1 ring-red-200'
  if (s === 'rejected')  return 'bg-red-50 text-red-700 ring-1 ring-red-200'
  return 'bg-slate-50 text-slate-700 ring-1 ring-slate-200'
}

function initials(name: string) {
  return String(name || '?')
    .split(' ')
    .slice(0, 2)
    .map(n => n.charAt(0))
    .join('')
    .toUpperCase() || '?'
}
</script>

<template>
  <div class="min-h-full bg-slate-50">

    <!-- ═══════════════════════════════════════════
         HEADER
         ═══════════════════════════════════════════ -->
    <div class="border-b border-slate-200 bg-white">
      <div class="mx-auto max-w-[1500px] px-6 py-7 lg:px-8">

        <p class="text-sm font-semibold text-emerald-600">
          My Sport Field
        </p>

        <div class="mt-1 flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 class="text-2xl font-black text-slate-900">
              Bookings
            </h1>
            <p class="mt-1 text-sm text-slate-500">
              Manage customer reservations for your venue.
            </p>
          </div>

          <div class="flex flex-wrap gap-3">
            <!-- Pending Requests Badge -->
            <div
              v-if="stats.pending > 0"
              class="rounded-xl bg-amber-50 px-4 py-3 text-sm font-bold text-amber-700 ring-1 ring-amber-200"
            >
              {{ stats.pending }} Pending Requests
            </div>

            <!-- Venue Count Badge -->
            <div class="rounded-xl bg-emerald-50 px-4 py-3 text-sm font-bold text-emerald-700 ring-1 ring-emerald-200">
              🏟️ {{ stats.venues }} {{ stats.venues === 1 ? 'Venue' : 'Venues' }}
            </div>

            <!-- Today Bookings Badge -->
            <div class="rounded-xl bg-blue-50 px-4 py-3 text-sm font-bold text-blue-700 ring-1 ring-blue-200">
              📅 {{ stats.today }} Today
            </div>
          </div>
        </div>

      </div>
    </div>

    <!-- ═══════════════════════════════════════════
         CONTENT
         ═══════════════════════════════════════════ -->
    <div class="mx-auto max-w-[1500px] px-6 py-7 lg:px-8">

      <!-- SUCCESS MESSAGE -->
      <Transition
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="opacity-0 -translate-y-2"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition duration-200"
        leave-to-class="opacity-0"
      >
        <div
          v-if="successMessage"
          class="mb-6 flex items-center gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm font-semibold text-emerald-700"
        >
          <svg class="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
          {{ successMessage }}
        </div>
      </Transition>

      <!-- ERROR MESSAGE -->
      <Transition
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="opacity-0 -translate-y-2"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition duration-200"
        leave-to-class="opacity-0"
      >
        <div
          v-if="errorMessage"
          class="mb-6 flex items-center gap-3 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-semibold text-red-700"
        >
          <svg class="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          {{ errorMessage }}
        </div>
      </Transition>

      <!-- ══════ STATS — SKELETON ══════ -->
      <div v-if="isLoading" class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div
          v-for="i in 4"
          :key="`stat-skel-${i}`"
          class="animate-pulse rounded-2xl border border-slate-200 bg-white p-5"
        >
          <div class="flex items-start justify-between">
            <div class="flex-1 space-y-3">
              <div class="h-3 w-24 rounded-full bg-slate-200"></div>
              <div class="h-8 w-16 rounded-lg bg-slate-200"></div>
            </div>
            <div class="h-11 w-11 rounded-xl bg-slate-200"></div>
          </div>
        </div>
      </div>

      <!-- ══════ STATS — REAL DATA ══════ -->
      <div v-else class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div
          v-for="stat in statCards"
          :key="stat.title"
          class="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg"
        >
          <div class="flex items-start justify-between">
            <div>
              <p class="text-xs font-semibold text-slate-500">
                {{ stat.title }}
              </p>
              <p class="mt-2 text-3xl font-black text-slate-900">
                {{ stat.value }}
              </p>
            </div>
            <div
              class="flex h-11 w-11 items-center justify-center rounded-xl text-lg"
              :class="{
                'bg-slate-100 text-slate-700': stat.color === 'slate',
                'bg-emerald-50 text-emerald-700': stat.color === 'emerald',
                'bg-amber-50 text-amber-700': stat.color === 'amber',
                'bg-red-50 text-red-700': stat.color === 'red',
              }"
            >
              {{ stat.icon }}
            </div>
          </div>
        </div>
      </div>

      <!-- ══════ TABLE SECTION ══════ -->
      <section class="mt-7 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

        <!-- Filters -->
        <div class="flex flex-col justify-between gap-4 border-b border-slate-100 p-5 md:flex-row md:items-center">
          <div>
            <h2 class="font-black text-slate-900">
              All Bookings
            </h2>
            <p class="mt-1 text-xs text-slate-500">
              <span v-if="isLoading">Loading…</span>
              <span v-else>{{ bookings.length }} {{ bookings.length === 1 ? 'booking' : 'bookings' }} found</span>
            </p>
          </div>

          <div class="flex flex-wrap gap-2">
            <!-- Status Filter -->
            <select
              v-model="statusFilter"
              @change="fetchBookings()"
              :disabled="isLoading"
              class="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 disabled:opacity-50"
            >
              <option value="All">All Status</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Pending">Pending</option>
              <option value="Cancelled">Cancelled</option>
            </select>

            <!-- Date Filter -->
            <input
              v-model="dateFilter"
              type="date"
              @change="fetchBookings()"
              :disabled="isLoading"
              class="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 disabled:opacity-50"
            />

            <!-- Clear Filters -->
            <button
              v-if="hasActiveFilter"
              @click="clearFilters"
              class="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
            >
              Clear
            </button>

            <!-- Refresh -->
            <button
              @click="refreshAll"
              :disabled="isLoading"
              class="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 disabled:opacity-50"
            >
              <svg
                class="h-4 w-4"
                :class="{ 'animate-spin': isLoading }"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Refresh
            </button>
          </div>
        </div>

        <!-- ══════ LOADING SKELETON — TABLE ROWS ══════ -->
        <div v-if="isLoading" class="divide-y divide-slate-100">
          <div
            v-for="i in 6"
            :key="`row-skel-${i}`"
            class="flex animate-pulse items-center gap-4 px-6 py-5"
          >
            <!-- Avatar -->
            <div class="h-10 w-10 flex-shrink-0 rounded-xl bg-slate-200"></div>

            <!-- Name + Booking ID -->
            <div class="flex-1 space-y-2">
              <div class="h-3.5 w-1/3 rounded-full bg-slate-200"></div>
              <div class="h-2.5 w-1/5 rounded-full bg-slate-100"></div>
            </div>

            <!-- Venue -->
            <div class="hidden h-6 w-32 flex-shrink-0 rounded-lg bg-slate-200 md:block"></div>

            <!-- Date -->
            <div class="hidden h-3 w-24 flex-shrink-0 rounded-full bg-slate-200 lg:block"></div>

            <!-- Amount -->
            <div class="hidden h-3 w-16 flex-shrink-0 rounded-full bg-slate-200 xl:block"></div>

            <!-- Status Badge -->
            <div class="h-6 w-20 flex-shrink-0 rounded-full bg-slate-200"></div>

            <!-- Actions -->
            <div class="hidden h-8 w-24 flex-shrink-0 rounded-lg bg-slate-100 lg:block"></div>
          </div>
        </div>

        <!-- ══════ EMPTY STATE ══════ -->
        <div
          v-else-if="bookings.length === 0"
          class="flex flex-col items-center gap-3 px-6 py-16 text-center"
        >
          <div class="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-3xl">
            📭
          </div>
          <div>
            <p class="text-sm font-bold text-slate-900">No bookings found</p>
            <p class="mt-1 text-xs text-slate-500">
              {{ hasActiveFilter ? 'Try changing your filters.' : 'Bookings will appear here once customers reserve your venue.' }}
            </p>
          </div>
          <button
            v-if="hasActiveFilter"
            @click="clearFilters"
            class="mt-3 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg transition hover:bg-emerald-700"
          >
            Clear Filters
          </button>
        </div>

        <!-- ══════ TABLE ══════ -->
        <div v-else class="overflow-x-auto">
          <table class="w-full min-w-[900px] text-left">
            <thead class="bg-slate-50">
              <tr>
                <th class="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-400">
                  Customer
                </th>
                <th class="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-400">
                  Venue
                </th>
                <th class="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-400">
                  Date
                </th>
                <th class="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-400">
                  Time
                </th>
                <th class="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-400">
                  Amount
                </th>
                <th class="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-400">
                  Status
                </th>
                <th class="px-6 py-4 text-right text-xs font-bold uppercase tracking-wider text-slate-400">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody class="divide-y divide-slate-100">
              <tr
                v-for="booking in bookings"
                :key="booking.id"
                class="transition hover:bg-slate-50/60"
              >
                <!-- 🔒 Customer — Name only -->
                <td class="px-6 py-4">
                  <div class="flex items-center gap-3">
                    <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-100 to-teal-100 text-sm font-black text-emerald-700">
                      {{ initials(booking.customer) }}
                    </div>
                    <div>
                      <p class="text-sm font-bold text-slate-900">
                        {{ booking.customer }}
                      </p>
                      <p class="text-xs text-slate-400">
                        Booking #{{ booking.id }}
                      </p>
                    </div>
                  </div>
                </td>

                <!-- Venue Name -->
                <td class="px-6 py-4">
                  <span class="inline-flex items-center gap-1.5 rounded-lg bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-700 ring-1 ring-slate-200">
                    🏟️ {{ booking.venue_name }}
                  </span>
                </td>

                <!-- Date -->
                <td class="px-6 py-4 text-sm font-semibold text-slate-700">
                  {{ booking.date }}
                </td>

                <!-- Time -->
                <td class="px-6 py-4 text-sm text-slate-600">
                  {{ booking.time }}
                </td>

                <!-- Amount -->
                <td class="px-6 py-4 text-sm font-black text-slate-900">
                  ETB {{ booking.amount }}
                </td>

                <!-- Status -->
                <td class="px-6 py-4">
                  <span
                    class="rounded-full px-3 py-1 text-[11px] font-bold"
                    :class="statusClass(booking.status)"
                  >
                    {{ booking.status }}
                  </span>
                </td>

                <!-- Actions -->
                <td class="px-6 py-4">
                  <div class="flex justify-end gap-1.5">
                    <!-- Confirm -->
                    <button
                      v-if="booking.status.toLowerCase() === 'pending'"
                      @click="confirmBooking(booking)"
                      :disabled="isSaving"
                      class="rounded-lg bg-emerald-50 px-3 py-2 text-xs font-bold text-emerald-700 transition hover:bg-emerald-100 disabled:opacity-50"
                      title="Confirm"
                    >
                      ✓ Confirm
                    </button>

                    <!-- Reject -->
                    <button
                      v-if="booking.status.toLowerCase() === 'pending'"
                      @click="rejectBooking(booking)"
                      :disabled="isSaving"
                      class="rounded-lg bg-red-50 px-3 py-2 text-xs font-bold text-red-700 transition hover:bg-red-100 disabled:opacity-50"
                      title="Reject"
                    >
                      ✕ Reject
                    </button>

                    <!-- View -->
                    <button
                      class="rounded-lg px-3 py-2 text-xs font-bold text-slate-500 transition hover:bg-slate-100"
                    >
                      View
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

      </section>

    </div>
  </div>
</template>