<template>
  <div class="min-h-full bg-gradient-to-br from-slate-50 via-white to-emerald-50/30 p-4 sm:p-6 lg:p-8">
    <div class="mx-auto max-w-7xl space-y-6">

      <!-- ═══════ HEADER ═══════ -->
      <div class="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div class="flex items-center gap-2 text-sm font-semibold text-slate-500">
            <NuxtLink to="/admin" class="transition hover:text-emerald-600">Dashboard</NuxtLink>
            <span>/</span>
            <span class="text-slate-700">Reports</span>
          </div>
          <h1 class="mt-2 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
            Reports &amp; Analytics
          </h1>
          <p class="mt-1 text-sm text-slate-500">
            Platform performance, revenue insights, and business intelligence.
          </p>
        </div>

        <div class="flex flex-wrap items-center gap-2">
          <button
            @click="loadReports"
            :disabled="loading"
            class="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 shadow-sm transition hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700 disabled:opacity-50"
          >
            <RefreshCw :size="16" :class="loading ? 'animate-spin' : ''" />
            Refresh
          </button>

          <button
            @click="exportCSV"
            class="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 shadow-sm transition hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700"
          >
            <FileSpreadsheet :size="16" />
            CSV
          </button>

          <button
            @click="printReport"
            class="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-emerald-500/30 transition hover:from-emerald-700 hover:to-teal-700"
          >
            <Printer :size="16" />
            Print Report
          </button>
        </div>
      </div>

      <!-- ═══════ ERROR ═══════ -->
      <Transition
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="opacity-0 -translate-y-2"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition duration-200"
        leave-to-class="opacity-0"
      >
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
      </Transition>

      <!-- ═══════ DATE FILTER ═══════ -->
      <div class="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div class="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div class="flex gap-1 rounded-xl bg-slate-50 p-1 ring-1 ring-slate-100">
            <button
              v-for="range in dateRanges"
              :key="range.value"
              @click="setDateRange(range.value)"
              :class="[
                'whitespace-nowrap rounded-lg px-4 py-2 text-xs font-bold transition-all duration-200',
                dateRange === range.value
                  ? 'bg-white text-emerald-700 shadow-md ring-1 ring-emerald-200'
                  : 'text-slate-500 hover:bg-white/60 hover:text-slate-700'
              ]"
            >
              {{ range.label }}
            </button>
          </div>

          <div v-if="dateRange === 'custom'" class="flex flex-wrap items-center gap-2">
            <input
              v-model="customStart"
              type="date"
              class="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-bold text-slate-700 outline-none transition focus:border-emerald-500 focus:bg-white"
            />
            <span class="text-slate-400">→</span>
            <input
              v-model="customEnd"
              type="date"
              class="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-bold text-slate-700 outline-none transition focus:border-emerald-500 focus:bg-white"
            />
            <button
              @click="loadReports"
              class="rounded-lg bg-emerald-600 px-3 py-2 text-xs font-bold text-white transition hover:bg-emerald-700"
            >
              Apply
            </button>
          </div>

          <p class="text-xs font-semibold text-slate-500">
            Showing data from <span class="text-slate-900">{{ formatDate(currentRange.start) }}</span>
            to <span class="text-slate-900">{{ formatDate(currentRange.end) }}</span>
          </p>
        </div>
      </div>

      <!-- ═══════ MAIN STATS ═══════ -->
      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div
          v-for="stat in mainStats"
          :key="stat.label"
          class="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
        >
          <div class="absolute inset-x-0 top-0 h-1" :class="stat.accent"></div>

          <div class="flex items-center justify-between">
            <div class="min-w-0">
              <p class="text-xs font-bold uppercase tracking-wider text-slate-500">{{ stat.label }}</p>
              <p class="mt-2 text-3xl font-black text-slate-900">
                <span v-if="loading" class="inline-block h-7 w-24 animate-pulse rounded bg-slate-100"></span>
                <span v-else>{{ stat.value }}</span>
              </p>
              <p
                v-if="stat.change !== null"
                class="mt-2 inline-flex items-center gap-1 text-xs font-bold"
                :class="stat.change >= 0 ? 'text-emerald-600' : 'text-red-500'"
              >
                <component :is="stat.change >= 0 ? TrendingUp : TrendingDown" :size="12" />
                {{ stat.change >= 0 ? '+' : '' }}{{ stat.change }}% vs previous
              </p>
            </div>

            <div class="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl transition group-hover:scale-110" :class="stat.bg">
              <component :is="stat.icon" :size="22" :class="stat.color" />
            </div>
          </div>
        </div>
      </div>

      <!-- ═══════ CHARTS GRID ═══════ -->
      <div class="grid grid-cols-1 gap-6 lg:grid-cols-3">

        <!-- Revenue Chart (2 cols) -->
        <div class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">
          <div class="mb-6 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 class="flex items-center gap-2 text-lg font-black text-slate-900">
                <BarChart3 :size="20" class="text-emerald-600" />
                Revenue Trend
              </h2>
              <p class="mt-1 text-sm text-slate-500">Monthly revenue · ETB</p>
            </div>

            <div class="flex gap-1 rounded-lg bg-slate-50 p-1">
              <button
                @click="chartMetric = 'revenue'"
                :class="[
                  'rounded-md px-3 py-1.5 text-xs font-bold transition',
                  chartMetric === 'revenue' ? 'bg-white text-emerald-700 shadow-sm' : 'text-slate-500'
                ]"
              >
                Revenue
              </button>
              <button
                @click="chartMetric = 'bookings'"
                :class="[
                  'rounded-md px-3 py-1.5 text-xs font-bold transition',
                  chartMetric === 'bookings' ? 'bg-white text-emerald-700 shadow-sm' : 'text-slate-500'
                ]"
              >
                Bookings
              </button>
            </div>
          </div>

          <!-- Loading -->
          <div v-if="loading" class="flex h-72 items-center justify-center">
            <Loader2 class="h-10 w-10 animate-spin text-emerald-500" />
          </div>

          <!-- Chart -->
          <div v-else class="relative">
            <!-- Y-axis grid lines -->
            <div class="absolute inset-x-0 top-0 h-64 flex flex-col justify-between pointer-events-none">
              <div v-for="i in 5" :key="i" class="border-t border-dashed border-slate-100"></div>
            </div>

            <div class="relative flex h-64 items-end gap-2 sm:gap-3">
              <div
                v-for="(bar, idx) in chartData"
                :key="idx"
                class="group relative flex-1 cursor-pointer"
                :style="{ height: `${Math.max(bar.height, 4)}%` }"
              >
                <!-- Bar -->
                <div
                  class="h-full rounded-t-lg transition-all duration-300 group-hover:brightness-110"
                  :class="chartMetric === 'revenue'
                    ? 'bg-gradient-to-t from-emerald-500 to-lime-400'
                    : 'bg-gradient-to-t from-blue-500 to-indigo-400'"
                ></div>

                <!-- Tooltip -->
                <div class="pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-slate-900 px-3 py-1.5 text-[10px] font-bold text-white opacity-0 transition group-hover:opacity-100">
                  <p>{{ bar.label }}</p>
                  <p class="text-emerald-300">
                    {{ chartMetric === 'revenue' ? formatMoney(bar.value) : `${bar.value} bookings` }}
                  </p>
                </div>
              </div>
            </div>

            <!-- X-axis -->
            <div class="mt-4 grid grid-cols-12 text-center text-[10px] font-bold text-slate-400">
              <span v-for="(bar, idx) in chartData" :key="idx">{{ bar.short }}</span>
            </div>
          </div>
        </div>

        <!-- Top Sports -->
        <div class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 class="flex items-center gap-2 text-lg font-black text-slate-900">
            <Trophy :size="20" class="text-amber-500" />
            Top Sports
          </h2>
          <p class="mt-1 text-sm text-slate-500">By booking volume</p>

          <div v-if="loading" class="mt-6 space-y-3">
            <div v-for="i in 5" :key="i" class="h-14 animate-pulse rounded-xl bg-slate-100"></div>
          </div>

          <div v-else-if="topSports.length === 0" class="mt-6 rounded-xl bg-slate-50 py-12 text-center">
            <p class="text-sm font-bold text-slate-500">No data yet</p>
          </div>

          <div v-else class="mt-6 space-y-3">
            <div
              v-for="(sport, idx) in topSports"
              :key="idx"
              class="group flex items-center gap-3"
            >
              <div
                class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl text-lg font-black"
                :class="{
                  'bg-gradient-to-br from-amber-400 to-yellow-500 text-white shadow-md': idx === 0,
                  'bg-gradient-to-br from-slate-300 to-slate-400 text-white': idx === 1,
                  'bg-gradient-to-br from-orange-300 to-orange-400 text-white': idx === 2,
                  'bg-slate-100 text-slate-600': idx > 2,
                }"
              >
                {{ sport.icon }}
              </div>

              <div class="min-w-0 flex-1">
                <div class="flex items-center justify-between gap-2">
                  <p class="truncate text-sm font-bold text-slate-900">{{ sport.name }}</p>
                  <p class="text-xs font-black text-slate-500">{{ sport.count }}</p>
                </div>
                <div class="mt-1 h-1.5 overflow-hidden rounded-full bg-slate-100">
                  <div
                    class="h-full rounded-full bg-gradient-to-r from-emerald-500 to-lime-400 transition-all duration-700"
                    :style="{ width: `${sport.percent}%` }"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ═══════ DETAILED BREAKDOWNS ═══════ -->
      <div class="grid grid-cols-1 gap-6 lg:grid-cols-3">

        <!-- Top Venues -->
        <div class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 class="flex items-center gap-2 text-lg font-black text-slate-900">
            <MapPin :size="20" class="text-violet-600" />
            Top Venues
          </h2>
          <p class="mt-1 text-sm text-slate-500">Highest earning venues</p>

          <div v-if="loading" class="mt-6 space-y-3">
            <div v-for="i in 4" :key="i" class="h-16 animate-pulse rounded-xl bg-slate-100"></div>
          </div>

          <div v-else-if="topVenues.length === 0" class="mt-6 rounded-xl bg-slate-50 py-12 text-center">
            <p class="text-sm font-bold text-slate-500">No venues yet</p>
          </div>

          <div v-else class="mt-6 space-y-3">
            <div
              v-for="(venue, idx) in topVenues"
              :key="idx"
              class="flex items-center justify-between rounded-xl bg-slate-50 p-3 transition hover:bg-emerald-50"
            >
              <div class="flex min-w-0 items-center gap-3">
                <div class="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-white text-xs font-black text-slate-700 shadow-sm">
                  #{{ idx + 1 }}
                </div>
                <div class="min-w-0">
                  <p class="truncate text-sm font-bold text-slate-900">{{ venue.name }}</p>
                  <p class="text-xs text-slate-500">{{ venue.bookings }} bookings</p>
                </div>
              </div>
              <p class="whitespace-nowrap text-sm font-black text-emerald-700">
                {{ formatMoney(venue.revenue) }}
              </p>
            </div>
          </div>
        </div>

        <!-- Top Partners -->
        <div class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 class="flex items-center gap-2 text-lg font-black text-slate-900">
            <Handshake :size="20" class="text-emerald-600" />
            Top Partners
          </h2>
          <p class="mt-1 text-sm text-slate-500">By earnings</p>

          <div v-if="loading" class="mt-6 space-y-3">
            <div v-for="i in 4" :key="i" class="h-16 animate-pulse rounded-xl bg-slate-100"></div>
          </div>

          <div v-else-if="topPartners.length === 0" class="mt-6 rounded-xl bg-slate-50 py-12 text-center">
            <p class="text-sm font-bold text-slate-500">No partners yet</p>
          </div>

          <div v-else class="mt-6 space-y-3">
            <div
              v-for="(partner, idx) in topPartners"
              :key="idx"
              class="flex items-center justify-between rounded-xl bg-slate-50 p-3 transition hover:bg-emerald-50"
            >
              <div class="flex min-w-0 items-center gap-3">
                <div class="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-emerald-100 to-teal-100 text-xs font-black text-emerald-700">
                  {{ initials(partner.name) }}
                </div>
                <div class="min-w-0">
                  <p class="truncate text-sm font-bold text-slate-900">{{ partner.name }}</p>
                  <p class="text-xs text-slate-500">{{ partner.venues }} venues</p>
                </div>
              </div>
              <p class="whitespace-nowrap text-sm font-black text-emerald-700">
                {{ formatMoney(partner.earnings) }}
              </p>
            </div>
          </div>
        </div>

        <!-- Top Cities -->
        <div class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 class="flex items-center gap-2 text-lg font-black text-slate-900">
            <Building2 :size="20" class="text-blue-600" />
            Cities
          </h2>
          <p class="mt-1 text-sm text-slate-500">Booking distribution</p>

          <div v-if="loading" class="mt-6 space-y-3">
            <div v-for="i in 4" :key="i" class="h-12 animate-pulse rounded-xl bg-slate-100"></div>
          </div>

          <div v-else-if="topCities.length === 0" class="mt-6 rounded-xl bg-slate-50 py-12 text-center">
            <p class="text-sm font-bold text-slate-500">No city data yet</p>
          </div>

          <div v-else class="mt-6 space-y-4">
            <div v-for="(city, idx) in topCities" :key="idx">
              <div class="flex items-center justify-between text-sm">
                <p class="font-bold text-slate-700">{{ city.name }}</p>
                <p class="text-xs font-black text-slate-500">{{ city.count }} bookings</p>
              </div>
              <div class="mt-1.5 h-2 overflow-hidden rounded-full bg-slate-100">
                <div
                  class="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-400 transition-all duration-700"
                  :style="{ width: `${city.percent}%` }"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ═══════ SUMMARY TABLE ═══════ -->
      <div class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div class="border-b border-slate-100 p-6">
          <div class="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 class="flex items-center gap-2 text-lg font-black text-slate-900">
                <Table2 :size="20" class="text-slate-700" />
                Detailed Summary
              </h2>
              <p class="mt-1 text-sm text-slate-500">Breakdown by venue</p>
            </div>
            <p class="text-xs font-bold text-slate-500">
              {{ summaryRows.length }} venues
            </p>
          </div>
        </div>

        <div v-if="loading" class="flex min-h-40 items-center justify-center">
          <Loader2 class="h-8 w-8 animate-spin text-emerald-500" />
        </div>

        <div v-else-if="summaryRows.length === 0" class="flex min-h-40 flex-col items-center justify-center gap-2 p-12 text-center">
          <div class="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-2xl">📊</div>
          <p class="font-bold text-slate-800">No data to display</p>
          <p class="text-sm text-slate-500">Bookings will populate this table.</p>
        </div>

        <div v-else class="overflow-x-auto">
          <table class="w-full min-w-[900px]">
            <thead class="border-b border-slate-200 bg-slate-50">
              <tr>
                <th class="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500">Venue</th>
                <th class="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500">City</th>
                <th class="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500">Bookings</th>
                <th class="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500">Revenue</th>
                <th class="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500">Avg. Booking</th>
              </tr>
            </thead>

            <tbody class="divide-y divide-slate-100">
              <tr v-for="row in summaryRows" :key="row.id" class="transition hover:bg-emerald-50/40">
                <td class="px-6 py-4 font-bold text-slate-900">{{ row.name }}</td>
                <td class="px-6 py-4 text-sm text-slate-600">{{ row.city || '—' }}</td>
                <td class="px-6 py-4">
                  <span class="inline-flex rounded-lg bg-emerald-50 px-3 py-1 text-xs font-black text-emerald-700 ring-1 ring-emerald-200">
                    {{ row.bookings }}
                  </span>
                </td>
                <td class="px-6 py-4 font-black text-slate-900">{{ formatMoney(row.revenue) }}</td>
                <td class="px-6 py-4 text-sm font-bold text-slate-600">
                  {{ row.bookings > 0 ? formatMoney(row.revenue / row.bookings) : '—' }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import {
  RefreshCw, AlertCircle, Loader2, FileSpreadsheet, Printer,
  TrendingUp, TrendingDown, Calendar, Banknote, MapPin, Users,
  BarChart3, Trophy, Handshake, Building2, Table2, Percent,
} from 'lucide-vue-next'
import { useAuthStore } from '~/stores/auth'

definePageMeta({ layout: 'admin' })

/* ═══════════════════════════════════════════
   TYPES
   ═══════════════════════════════════════════ */
interface Summary {
  total_bookings: number
  total_revenue: number
  total_venues: number
  total_users: number
  bookings_change: number
  revenue_change: number
  venues_change: number
  users_change: number
  completion_rate: number
  monthly: { month: string; revenue: number; bookings: number }[]
  top_venues: { id: number; name: string; city: string; bookings: number; revenue: number }[]
  top_sports: { name: string; count: number }[]
  top_partners: { id: number; name: string; venues: number; earnings: number }[]
  top_cities: { name: string; count: number }[]
  summary_rows: {
    id: number; name: string; city: string;
    bookings: number; revenue: number;
  }[]
}

/* ═══════════════════════════════════════════
   SETUP
   ═══════════════════════════════════════════ */
const config = useRuntimeConfig()
const authStore = useAuthStore()

const loading = ref(false)
const error = ref('')

const dateRanges = [
  { label: '7 Days',  value: 'week'   },
  { label: '30 Days', value: 'month'  },
  { label: 'This Year', value: 'year' },
  { label: 'All Time', value: 'all'   },
  { label: 'Custom',  value: 'custom' },
]
const dateRange = ref<'week' | 'month' | 'year' | 'all' | 'custom'>('month')
const customStart = ref('')
const customEnd = ref('')

const chartMetric = ref<'revenue' | 'bookings'>('revenue')

const report = ref<Summary>({
  total_bookings: 0,
  total_revenue: 0,
  total_venues: 0,
  total_users: 0,
  bookings_change: 0,
  revenue_change: 0,
  venues_change: 0,
  users_change: 0,
  completion_rate: 0,
  monthly: [],
  top_venues: [],
  top_sports: [],
  top_partners: [],
  top_cities: [],
  summary_rows: [],
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
   DATE RANGE HELPERS
   ═══════════════════════════════════════════ */
const currentRange = computed(() => {
  const now = new Date()
  const start = new Date()

  switch (dateRange.value) {
    case 'week':
      start.setDate(now.getDate() - 7)
      break
    case 'month':
      start.setMonth(now.getMonth() - 1)
      break
    case 'year':
      start.setFullYear(now.getFullYear() - 1)
      break
    case 'all':
      return { start: '2020-01-01', end: now.toISOString().split('T')[0] }
    case 'custom':
      return { start: customStart.value, end: customEnd.value }
  }

  return {
    start: start.toISOString().split('T')[0],
    end: now.toISOString().split('T')[0],
  }
})

const setDateRange = (val: typeof dateRange.value) => {
  dateRange.value = val
  if (val !== 'custom') loadReports()
}

/* ═══════════════════════════════════════════
   COMPUTED — Main stat cards
   ═══════════════════════════════════════════ */
const mainStats = computed(() => [
  {
    label: 'Total Revenue',
    value: formatMoney(report.value.total_revenue),
    change: report.value.revenue_change,
    icon: Banknote,
    bg: 'bg-emerald-50',
    color: 'text-emerald-600',
    accent: 'bg-gradient-to-r from-emerald-400 to-teal-500',
  },
  {
    label: 'Total Bookings',
    value: formatNumber(report.value.total_bookings),
    change: report.value.bookings_change,
    icon: Calendar,
    bg: 'bg-blue-50',
    color: 'text-blue-600',
    accent: 'bg-gradient-to-r from-blue-400 to-indigo-500',
  },
  {
    label: 'Active Venues',
    value: formatNumber(report.value.total_venues),
    change: report.value.venues_change,
    icon: MapPin,
    bg: 'bg-violet-50',
    color: 'text-violet-600',
    accent: 'bg-gradient-to-r from-violet-400 to-fuchsia-500',
  },
  {
    label: 'Registered Users',
    value: formatNumber(report.value.total_users),
    change: report.value.users_change,
    icon: Users,
    bg: 'bg-amber-50',
    color: 'text-amber-600',
    accent: 'bg-gradient-to-r from-amber-400 to-orange-500',
  },
])

/* ═══════════════════════════════════════════
   COMPUTED — Chart data
   ═══════════════════════════════════════════ */
const chartData = computed(() => {
  const monthly = report.value.monthly || []
  const values = monthly.map(m => chartMetric.value === 'revenue' ? m.revenue : m.bookings)
  const max = Math.max(...values, 1)

  return monthly.map(m => ({
    label: `${m.month} — ${chartMetric.value === 'revenue' ? formatMoney(m.revenue) : `${m.bookings} bookings`}`,
    short: m.month.substring(0, 3),
    value: chartMetric.value === 'revenue' ? m.revenue : m.bookings,
    height: ((chartMetric.value === 'revenue' ? m.revenue : m.bookings) / max) * 100,
  }))
})

/* ═══════════════════════════════════════════
   COMPUTED — Top lists with percentages
   ═══════════════════════════════════════════ */
const topSports = computed(() => {
  const sports = report.value.top_sports || []
  const max = Math.max(...sports.map(s => s.count), 1)
  return sports.slice(0, 5).map(s => ({
    name: s.name,
    count: s.count,
    percent: (s.count / max) * 100,
    icon: sportIcon(s.name),
  }))
})

const topVenues = computed(() => report.value.top_venues?.slice(0, 5) || [])

const topPartners = computed(() => report.value.top_partners?.slice(0, 5) || [])

const topCities = computed(() => {
  const cities = report.value.top_cities || []
  const max = Math.max(...cities.map(c => c.count), 1)
  return cities.slice(0, 5).map(c => ({
    name: c.name,
    count: c.count,
    percent: (c.count / max) * 100,
  }))
})

const summaryRows = computed(() => report.value.summary_rows || [])

/* ═══════════════════════════════════════════
   HELPERS
   ═══════════════════════════════════════════ */
const formatMoney = (n?: number) =>
  `ETB ${new Intl.NumberFormat('en-ET').format(Math.round(Number(n) || 0))}`

const formatNumber = (n?: number) =>
  new Intl.NumberFormat('en-ET').format(Number(n) || 0)

const formatDate = (d?: string) => {
  if (!d) return '—'
  const date = new Date(d)
  if (Number.isNaN(date.getTime())) return '—'
  return new Intl.DateTimeFormat('en-ET-u-ca-gregory', {
    day: '2-digit', month: 'short', year: 'numeric',
    timeZone: 'Africa/Addis_Ababa',
  }).format(date)
}

const initials = (name?: string) =>
  String(name || '?').split(' ').slice(0, 2).map(n => n.charAt(0)).join('').toUpperCase()

const sportIcon = (sport?: string) => {
  const s = String(sport || '').toLowerCase()
  if (s.includes('football')) return '⚽'
  if (s.includes('futsal')) return '🥅'
  if (s.includes('basket')) return '🏀'
  if (s.includes('volley')) return '🏐'
  if (s.includes('tennis')) return '🎾'
  if (s.includes('athletic') || s.includes('run')) return '🏃'
  if (s.includes('swim')) return '🏊'
  if (s.includes('handball')) return '🤾'
  if (s.includes('golf')) return '⛳'
  return '🏆'
}

/* ═══════════════════════════════════════════
   LOAD REPORTS
   ═══════════════════════════════════════════ */
const loadReports = async () => {
  loading.value = true
  error.value = ''

  const range = currentRange.value

  try {
    const res: any = await $fetch(`${apiBase.value}/admin/reports`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
        Accept: 'application/json',
      },
      query: {
        start: range.start,
        end:   range.end,
        range: dateRange.value,
      },
    })

    const d = res?.data ?? res ?? {}

    report.value = {
      total_bookings:   Number(d.total_bookings   ?? 0),
      total_revenue:    Number(d.total_revenue    ?? 0),
      total_venues:     Number(d.total_venues     ?? 0),
      total_users:      Number(d.total_users      ?? 0),
      bookings_change:  Number(d.bookings_change  ?? 0),
      revenue_change:   Number(d.revenue_change   ?? 0),
      venues_change:    Number(d.venues_change    ?? 0),
      users_change:     Number(d.users_change     ?? 0),
      completion_rate:  Number(d.completion_rate  ?? 0),
      monthly:      Array.isArray(d.monthly)       ? d.monthly       : [],
      top_venues:   Array.isArray(d.top_venues)    ? d.top_venues    : [],
      top_sports:   Array.isArray(d.top_sports)    ? d.top_sports    : [],
      top_partners: Array.isArray(d.top_partners)  ? d.top_partners  : [],
      top_cities:   Array.isArray(d.top_cities)    ? d.top_cities    : [],
      summary_rows: Array.isArray(d.summary_rows)  ? d.summary_rows  : [],
    }
  } catch (e: any) {
    console.error('Reports load error:', e)
    error.value =
      e?.data?.message ||
      e?.response?._data?.message ||
      'Unable to load reports.'
  } finally {
    loading.value = false
  }
}

/* ═══════════════════════════════════════════
   EXPORT CSV
   ═══════════════════════════════════════════ */
const exportCSV = () => {
  const rows = summaryRows.value
  if (!rows.length) {
    error.value = 'Nothing to export.'
    return
  }

  const csv = [
    ['Venue', 'City', 'Bookings', 'Revenue', 'Avg Booking'].join(','),
    ...rows.map(r =>
      [
        `"${r.name}"`,
        `"${r.city || ''}"`,
        r.bookings,
        r.revenue,
        r.bookings ? Math.round(r.revenue / r.bookings) : 0,
      ].join(',')
    ),
  ].join('\n')

  const blob = new Blob([csv], { type: 'text/csv' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `reports-${dateRange.value}-${Date.now()}.csv`
  a.click()
  URL.revokeObjectURL(url)
}

/* ═══════════════════════════════════════════
   PRINT
   ═══════════════════════════════════════════ */
const printReport = () => {
  if (import.meta.client) window.print()
}

onMounted(loadReports)
</script>

<style>
@media print {
  body * { visibility: hidden; }
  .min-h-full, .min-h-full * { visibility: visible; }
  .min-h-full { position: absolute; left: 0; top: 0; width: 100%; }
  button { display: none !important; }
}
</style>