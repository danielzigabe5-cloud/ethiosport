<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import {
  MapPin, Users, Banknote, TrendingUp, TrendingDown,
  RefreshCw, AlertCircle, Loader2, XCircle, CheckCircle,
  Clock, Trophy, UserPlus, CalendarCheck, Sparkles,
  ArrowUpRight, Target,
} from 'lucide-vue-next'
import { useAuthStore } from '~/stores/auth'

definePageMeta({ layout: 'admin' })

/* ═══════════════════════════════════════════
   TYPES
   ═══════════════════════════════════════════ */
interface RecentBooking {
  id: number | string
  userName: string
  venueName: string
  amount: number | string
  status: string
  createdAt: string
}

interface VenuePerformanceRow {
  name: string
  bookings_count: number
}

interface DashboardData {
  totalPartners: number
  newPartnersThisWeek: number
  totalUsers: number
  activeUsersToday: number
  pendingReports: number
  totalVenues: number
  totalGames: number
  todayBookings: number
  completionRate: number
  recentBookings: RecentBooking[]
  venuePerformance: VenuePerformanceRow[]
}

/* ═══════════════════════════════════════════
   SETUP
   ═══════════════════════════════════════════ */
const config = useRuntimeConfig()
const authStore = useAuthStore()

const isLoading = ref(false)
const errorMessage = ref('')

const dashboard = ref<DashboardData>({
  totalPartners: 0,
  newPartnersThisWeek: 0,
  totalUsers: 0,
  activeUsersToday: 0,
  pendingReports: 0,
  totalVenues: 0,
  totalGames: 0,
  todayBookings: 0,
  completionRate: 0,
  recentBookings: [],
  venuePerformance: [],
})

/* ═══════════════════════════════════════════
   API BASE
   ═══════════════════════════════════════════ */
const apiBase = computed(() => {
  const base = String(config.public.apiBase || 'http://127.0.0.1:8000').replace(/\/+$/, '')
  return base.endsWith('/api') ? base : `${base}/api`
})

/* ═══════════════════════════════════════════
   🎯 FIXED: TOKEN READER — tries every source
   ═══════════════════════════════════════════ */
const getToken = (): string => {
  // 1. Pinia store (if hydrated)
  if (authStore?.token) return String(authStore.token)

  // 2. Cookie — named 'auth_token' (this is YOUR case)
  if (import.meta.client) {
    const cookie = useCookie<string | null>('auth_token')
    if (cookie.value) return cookie.value
  }

  // 3. localStorage fallbacks
  if (import.meta.client) {
    const ls =
      localStorage.getItem('auth_token') ||
      localStorage.getItem('token') ||
      localStorage.getItem('access_token')
    if (ls) return ls
  }

  // 4. sessionStorage fallback
  if (import.meta.client) {
    const ss =
      sessionStorage.getItem('auth_token') ||
      sessionStorage.getItem('token')
    if (ss) return ss
  }

  return ''
}

/* ═══════════════════════════════════════════
   LOAD DASHBOARD
   ═══════════════════════════════════════════ */
const loadDashboard = async () => {
  isLoading.value = true
  errorMessage.value = ''

  const token = getToken()
  if (!token) {
    isLoading.value = false
    errorMessage.value = 'You are not logged in. Please sign in again.'
    console.warn('❌ No token found anywhere — aborting fetch.')
    return
  }

  console.log('🔑 Token used:', token.substring(0, 15) + '...')

  try {
    const response = await $fetch<any>(`${apiBase.value}/admin/dashboard`, {
      headers: {
        Authorization: `Bearer ${token}`,   // ✅ token now always present
        Accept: 'application/json',
      },
    })

    const d = response?.data ?? {}
    const raw = d.stats ?? d

    dashboard.value = {
      totalPartners:       Number(raw.totalPartners       ?? raw.total_partners       ?? 0),
      newPartnersThisWeek: Number(raw.newPartnersThisWeek ?? raw.new_partners_this_week ?? 0),
      totalUsers:          Number(raw.totalUsers          ?? raw.total_users          ?? 0),
      activeUsersToday:    Number(raw.activeUsersToday    ?? raw.active_users_today    ?? 0),
      pendingReports:      Number(raw.pendingReports      ?? raw.pending_reports      ?? 0),
      totalVenues:         Number(raw.totalVenues         ?? raw.total_venues         ?? 0),
      totalGames:          Number(raw.totalGames          ?? raw.total_games          ?? 0),
      todayBookings:       Number(raw.todayBookings       ?? raw.today_bookings       ?? 0),
      completionRate:      Number(raw.completionRate      ?? raw.completion_rate      ?? 0),
      recentBookings:      Array.isArray(raw.recentBookings ?? raw.recent_bookings)
                              ? (raw.recentBookings ?? raw.recent_bookings) : [],
      venuePerformance:    Array.isArray(raw.venuePerformance ?? raw.venue_performance)
                              ? (raw.venuePerformance ?? raw.venue_performance) : [],
    }
  } catch (error: any) {
    console.error('Dashboard load error:', error)
    errorMessage.value =
      error?.data?.message ||
      error?.response?._data?.message ||
      'Could not load dashboard data. Please try again.'
  } finally {
    isLoading.value = false
  }
}

/* ═══════════════════════════════════════════
   HELPERS
   ═══════════════════════════════════════════ */
const formatNumber = (n?: number) =>
  new Intl.NumberFormat('en-ET').format(Number(n) || 0)

const formatPrice = (n?: number) => `ETB ${formatNumber(n)}`

const formatDate = (value?: string) => {
  if (!value) return '—'
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value
  return new Intl.DateTimeFormat('en-ET-u-ca-gregory', {
    day: '2-digit', month: 'short', year: 'numeric',
    timeZone: 'Africa/Addis_Ababa',
  }).format(date)
}

const formatTime = (value?: string) => {
  if (!value) return '—'
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value
  return new Intl.DateTimeFormat('en-ET', {
    hour: 'numeric', minute: '2-digit', timeZone: 'Africa/Addis_Ababa',
  }).format(date)
}

const timeAgo = (value?: string) => {
  if (!value) return '—'
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return '—'
  const diff = Math.floor((Date.now() - date.getTime()) / 1000)
  if (diff < 60) return 'just now'
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`
  if (diff < 604800) return `${Math.floor(diff / 86400)}d ago`
  return formatDate(value)
}

const statusLabel = (value?: string) => {
  const s = String(value || '').trim().toLowerCase()
  if (s === 'completed') return 'Completed'
  if (s === 'confirmed' || s === 'approved') return 'Confirmed'
  if (s === 'pending') return 'Pending'
  if (s === 'cancelled' || s === 'canceled' || s === 'rejected') return 'Cancelled'
  return s ? s.charAt(0).toUpperCase() + s.slice(1) : 'Unknown'
}

const statusClass = (value?: string) => {
  const s = String(value || '').trim().toLowerCase()
  if (s === 'completed') return 'bg-blue-100 text-blue-700 ring-1 ring-blue-200'
  if (s === 'confirmed' || s === 'approved') return 'bg-emerald-100 text-emerald-700 ring-1 ring-emerald-200'
  if (s === 'pending') return 'bg-amber-100 text-amber-700 ring-1 ring-amber-200'
  if (s === 'cancelled' || s === 'canceled' || s === 'rejected') return 'bg-red-100 text-red-700 ring-1 ring-red-200'
  return 'bg-slate-100 text-slate-700 ring-1 ring-slate-200'
}

const statusDot = (value?: string) => {
  const s = String(value || '').trim().toLowerCase()
  if (s === 'completed') return 'bg-blue-500'
  if (s === 'confirmed' || s === 'approved') return 'bg-emerald-500'
  if (s === 'pending') return 'bg-amber-500'
  if (s === 'cancelled' || s === 'canceled' || s === 'rejected') return 'bg-red-500'
  return 'bg-slate-400'
}

/* ═══════════════════════════════════════════
   STAT CARDS
   ═══════════════════════════════════════════ */
const statCards = computed(() => [
  {
    title: 'Total Venues',
    value: formatNumber(dashboard.value.totalVenues),
    changeLabel: `${formatNumber(dashboard.value.todayBookings)} today`,
    sub: 'bookings today',
    icon: MapPin,
    accent: 'from-violet-400 to-purple-500',
    bgIcon: 'bg-violet-50 text-violet-600',
    positive: true,
  },
  {
    title: 'Registered Users',
    value: formatNumber(dashboard.value.totalUsers),
    changeLabel: `${formatNumber(dashboard.value.activeUsersToday)} active`,
    sub: 'today',
    icon: Users,
    accent: 'from-blue-400 to-indigo-500',
    bgIcon: 'bg-blue-50 text-blue-600',
    positive: true,
  },
  {
    title: 'Partners',
    value: formatNumber(dashboard.value.totalPartners),
    changeLabel: `+${formatNumber(dashboard.value.newPartnersThisWeek)} this week`,
    sub: 'new signups',
    icon: UserPlus,
    accent: 'from-amber-400 to-orange-500',
    bgIcon: 'bg-amber-50 text-amber-600',
    positive: true,
  },
])

/* ═══════════════════════════════════════════
   ATTENTION ITEMS
   ═══════════════════════════════════════════ */
const attentionItems = computed(() => {
  const items: { label: string; link?: string; tone: 'warn' | 'info' }[] = []
  if (dashboard.value.pendingReports > 0) {
    items.push({ label: `${dashboard.value.pendingReports} pending reports`, tone: 'warn' })
  }
  if (dashboard.value.totalVenues > 0) {
    items.push({
      label: `${formatNumber(dashboard.value.totalVenues)} sport fields in system`,
      link: '/admin/approvals',
      tone: 'info',
    })
  }
  if (dashboard.value.todayBookings > 0) {
    items.push({
      label: `${formatNumber(dashboard.value.todayBookings)} new bookings today`,
      link: '/admin/bookings',
      tone: 'info',
    })
  }
  return items
})

/* ═══════════════════════════════════════════
   MOUNT — wait for store init, then fetch
   ═══════════════════════════════════════════ */
onMounted(async () => {
  try { await (authStore as any)?.init?.() } catch {}
  await loadDashboard()
})
</script>

<template>
  <div class="space-y-8 pb-10">

    <!-- ═══════════════════════════════════════════
         HEADER — Gradient greeting card
         ═══════════════════════════════════════════ -->
    <div class="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 p-6 sm:p-8 shadow-xl">

      <!-- Decorative blobs -->
      <div class="pointer-events-none absolute -top-20 -right-20 h-64 w-64 rounded-full bg-emerald-500/20 blur-3xl"></div>
      <div class="pointer-events-none absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-teal-500/10 blur-3xl"></div>

      <div class="relative flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
        <div>
          <p class="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-300">
            <Sparkles :size="14" />
            Admin Panel · Overview
          </p>
          <h1 class="mt-2 text-3xl font-black tracking-tight text-white sm:text-4xl">
            Welcome back, {{ authStore.user?.name || 'Admin' }} 👋
          </h1>
          <p class="mt-2 max-w-xl text-sm text-slate-300">
            Here's your platform's snapshot — venues, users, and bookings at a glance.
          </p>
        </div>

        <div class="flex flex-wrap items-center gap-3">
          <button
            type="button"
            @click="loadDashboard"
            :disabled="isLoading"
            class="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-2.5 text-sm font-bold text-white backdrop-blur-sm transition hover:border-white/40 hover:bg-white/20 disabled:opacity-60"
          >
            <RefreshCw :size="16" :class="isLoading ? 'animate-spin' : ''" />
            Refresh
          </button>

          <NuxtLink
            to="/admin/venues/create"
            class="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-bold text-slate-900 shadow-lg transition hover:bg-emerald-50"
          >
            <span class="text-lg leading-none">+</span>
            Add Sport Field
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- ═══════════════════════════════════════════
         ERROR
         ═══════════════════════════════════════════ -->
    <div
      v-if="errorMessage"
      role="alert"
      class="flex items-center gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-800 shadow-sm"
    >
      <XCircle :size="18" class="flex-shrink-0" />
      {{ errorMessage }}
    </div>

    <!-- ═══════════════════════════════════════════
         STAT CARDS
         ═══════════════════════════════════════════ -->
    <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
      <div
        v-for="stat in statCards"
        :key="stat.title"
        class="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:ring-emerald-200"
      >
        <!-- Accent top line -->
        <div class="absolute inset-x-0 top-0 h-1 bg-gradient-to-r" :class="stat.accent"></div>

        <div class="flex items-start justify-between">
          <div class="min-w-0">
            <p class="text-xs font-bold uppercase tracking-wider text-slate-500">{{ stat.title }}</p>
            <h3 class="mt-2 text-2xl font-black text-slate-900 sm:text-3xl">
              <span v-if="isLoading" class="inline-block h-8 w-24 animate-pulse rounded bg-slate-100"></span>
              <span v-else>{{ stat.value }}</span>
            </h3>
          </div>

          <div class="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl transition group-hover:scale-110" :class="stat.bgIcon">
            <component :is="stat.icon" :size="22" />
          </div>
        </div>

        <div class="mt-5 flex items-center gap-2 text-sm">
          <component
            :is="stat.positive ? TrendingUp : TrendingDown"
            :size="16"
            :class="stat.positive ? 'text-emerald-600' : 'text-red-500'"
          />
          <span
            class="font-bold"
            :class="stat.positive ? 'text-emerald-700' : 'text-red-600'"
          >
            {{ stat.changeLabel }}
          </span>
          <span class="truncate text-slate-400">{{ stat.sub }}</span>
        </div>
      </div>
    </div>

    <!-- ═══════════════════════════════════════════
         MID GRID — Top Venues + Needs Attention
         ═══════════════════════════════════════════ -->
    <div class="grid grid-cols-1 gap-6 xl:grid-cols-3">

      <!-- ── Top Performing Venues ── -->
      <div class="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100 xl:col-span-2">
        <div class="mb-5 flex items-center justify-between">
          <div>
            <h2 class="flex items-center gap-2 text-lg font-black text-slate-900">
              <span class="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-50 text-amber-500">
                <Trophy :size="18" />
              </span>
              Top Performing Venues
            </h2>
            
          </div>

          <NuxtLink
            to="/venues"
            class="hidden text-sm font-bold text-emerald-700 hover:underline sm:block"
          >
            View all
          </NuxtLink>
        </div>

        <!-- Loading -->
        <div v-if="isLoading" class="space-y-3">
          <div v-for="i in 3" :key="i" class="h-16 animate-pulse rounded-xl bg-slate-100"></div>
        </div>

        <!-- Empty -->
        <div
          v-else-if="dashboard.venuePerformance.length === 0"
          class="flex flex-col items-center justify-center gap-3 rounded-2xl bg-slate-50 py-12 text-center"
        >
          <div class="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-slate-300 shadow-sm">
            <Trophy :size="26" />
          </div>
          <div>
            <p class="font-bold text-slate-800">No venue data yet</p>
            <p class="text-sm text-slate-500">Bookings will populate this section automatically.</p>
          </div>
        </div>

        <!-- List -->
        <div v-else class="space-y-3">
          <div
            v-for="(v, idx) in dashboard.venuePerformance"
            :key="idx"
            class="group flex items-center justify-between rounded-xl bg-slate-50 p-4 transition-all duration-200 hover:bg-gradient-to-r hover:from-emerald-50 hover:to-teal-50"
          >
            <div class="flex min-w-0 items-center gap-3">
              <!-- Rank badge -->
              <div
                class="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl font-black text-white shadow-md transition group-hover:scale-105"
                :class="{
                  'bg-gradient-to-br from-amber-400 to-yellow-500': idx === 0,
                  'bg-gradient-to-br from-slate-300 to-slate-400': idx === 1,
                  'bg-gradient-to-br from-orange-300 to-orange-400': idx === 2,
                  'bg-slate-200 !text-slate-600': idx > 2,
                }"
              >
                #{{ idx + 1 }}
              </div>

              <div class="min-w-0">
                <p class="truncate font-bold text-slate-900">{{ v.name }}</p>
                <p class="text-xs text-slate-500">
                  {{ formatNumber(v.bookings_count) }} booking{{ v.bookings_count === 1 ? '' : 's' }}
                </p>
              </div>
            </div>

           
          </div>
        </div>
      </div>

      <!-- ── Needs Attention ── -->
      <div class="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
        <div class="mb-5 flex items-center gap-2">
          <span class="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-50 text-orange-500">
            <AlertCircle :size="18" />
          </span>
          <h2 class="text-lg font-black text-slate-900">Needs Attention</h2>
        </div>

        <!-- Loading -->
        <div v-if="isLoading" class="space-y-3">
          <div v-for="i in 3" :key="i" class="h-14 animate-pulse rounded-xl bg-slate-100"></div>
        </div>

        <!-- All clear -->
        <div
          v-else-if="attentionItems.length === 0"
          class="flex items-center gap-3 rounded-xl bg-emerald-50 p-4 ring-1 ring-emerald-100"
        >
          <div class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
            <CheckCircle :size="20" />
          </div>
          <div>
            <p class="text-sm font-bold text-emerald-800">All clear!</p>
            <p class="text-xs text-emerald-600">Nothing needs your attention right now.</p>
          </div>
        </div>

        <!-- Items -->
        <div v-else class="space-y-3">
          <component
            :is="item.link ? 'NuxtLink' : 'div'"
            v-for="(item, idx) in attentionItems"
            :key="idx"
            :to="item.link"
            class="group flex items-start gap-3 rounded-xl bg-slate-50 p-4 transition-all duration-200 hover:bg-orange-50"
            :class="{ 'cursor-pointer': !!item.link }"
          >
            <div
              class="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg"
              :class="item.tone === 'warn' ? 'bg-red-100 text-red-500' : 'bg-orange-100 text-orange-500'"
            >
              <AlertCircle :size="16" />
            </div>
            <div class="min-w-0 flex-1">
              <p class="text-sm font-semibold text-slate-700">{{ item.label }}</p>
              <p v-if="item.link" class="mt-0.5 text-xs text-slate-400 group-hover:text-emerald-600">
                Click to review →
              </p>
            </div>
          </component>
        </div>

        <!-- Completion rate -->
        <div class="mt-6 space-y-3 border-t border-slate-100 pt-5">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2 text-sm">
              <Target :size="16" class="text-slate-400" />
              <span class="font-semibold text-slate-500">Completion Rate</span>
            </div>
            <span class="text-sm font-black text-slate-900">{{ dashboard.completionRate }}%</span>
          </div>
          <div class="relative h-2.5 overflow-hidden rounded-full bg-slate-100">
            <div
              class="h-full rounded-full bg-gradient-to-r from-emerald-400 via-teal-500 to-emerald-600 shadow-[0_0_10px_rgba(16,185,129,0.5)] transition-all duration-700"
              :style="{ width: `${Math.min(dashboard.completionRate, 100)}%` }"
            ></div>
          </div>
          <p class="text-xs text-slate-400">
            {{ dashboard.completionRate >= 70 ? 'Great progress!' : 'Room for improvement.' }}
          </p>
        </div>
      </div>
    </div>

    <!-- ═══════════════════════════════════════════
         RECENT BOOKINGS
         ═══════════════════════════════════════════ -->
    <div class="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-100">
      <!-- Header -->
      <div class="flex items-center justify-between border-b border-slate-100 p-6">
        <div class="flex items-center gap-3">
          <span class="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
            <CalendarCheck :size="20" />
          </span>
          <div>
            <h2 class="text-lg font-black text-slate-900">Recent Bookings</h2>
            <p class="text-sm text-slate-500">Latest sport field reservations</p>
          </div>
        </div>

        <NuxtLink
          to="/admin/bookings"
          class="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-bold text-slate-700 transition hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700"
        >
          View all
          <ArrowUpRight :size="14" />
        </NuxtLink>
      </div>

      <!-- Loading -->
      <div v-if="isLoading" class="flex min-h-40 items-center justify-center">
        <Loader2 class="animate-spin text-emerald-600" :size="28" />
      </div>

      <!-- Empty -->
      <div
        v-else-if="dashboard.recentBookings.length === 0"
        class="flex min-h-48 flex-col items-center justify-center gap-3 px-6 py-12 text-center"
      >
        <div class="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-50 text-slate-300">
          <Clock :size="30" />
        </div>
        <div>
          <p class="font-bold text-slate-800">No recent bookings</p>
          <p class="text-sm text-slate-500">New reservations will appear here.</p>
        </div>
      </div>

      <!-- Table -->
      <div v-else class="overflow-x-auto">
        <table class="w-full min-w-[760px] text-left">
          <thead class="bg-slate-50 text-[11px] font-bold uppercase tracking-wider text-slate-500">
            <tr>
              <th class="px-6 py-4">Customer</th>
              <th class="px-6 py-4">Sport Field</th>
              <th class="px-6 py-4">Amount</th>
              <th class="px-6 py-4">When</th>
              <th class="px-6 py-4">Status</th>
            </tr>
          </thead>

          <tbody class="divide-y divide-slate-100">
            <tr
              v-for="booking in dashboard.recentBookings"
              :key="booking.id"
              class="group transition-colors hover:bg-emerald-50/40"
            >
              <!-- Customer -->
              <td class="px-6 py-4">
                <div class="flex items-center gap-3">
                  <div class="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-emerald-100 to-teal-100 text-xs font-black text-emerald-700 ring-2 ring-white shadow-sm">
                    {{ (booking.userName || 'G').charAt(0).toUpperCase() }}
                  </div>
                  <div class="min-w-0">
                    <p class="truncate font-bold text-slate-900">
                      {{ booking.userName || 'Guest' }}
                    </p>
                  </div>
                </div>
              </td>

              <!-- Venue -->
              <td class="px-6 py-4">
                <p class="truncate font-semibold text-slate-700">
                  {{ booking.venueName || '—' }}
                </p>
              </td>

              <!-- Amount -->
              <td class="px-6 py-4">
                <span class="inline-flex items-center rounded-lg bg-emerald-50 px-3 py-1.5 text-sm font-black text-emerald-700 ring-1 ring-emerald-200">
                  {{ formatPrice(Number(booking.amount) || 0) }}
                </span>
              </td>

              <!-- When -->
              <td class="px-6 py-4">
                <p class="text-sm font-semibold text-slate-700">{{ formatDate(booking.createdAt) }}</p>
                <p class="text-xs text-slate-400">
                  {{ formatTime(booking.createdAt) }} · {{ timeAgo(booking.createdAt) }}
                </p>
              </td>

              <!-- Status -->
              <td class="px-6 py-4">
                <span
                  class="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold"
                  :class="statusClass(booking.status)"
                >
                  <span class="h-1.5 w-1.5 rounded-full" :class="statusDot(booking.status)"></span>
                  {{ statusLabel(booking.status) }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>