<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import {
  Check, ChevronLeft, ChevronRight, Download, Eye, ImageIcon, Loader2,
  Maximize2, RefreshCw, RotateCw, Search, X, XCircle, ZoomIn, ZoomOut
} from 'lucide-vue-next'
import { useAuthStore } from '~/stores/auth'

definePageMeta({ layout: 'admin' })

interface Booking {
  id: string | number
  booking_code?: string
  status?: string
  payment_method?: string
  payment_type?: string
  user?: { name?: string }
  customer?: { name?: string }
  customer_name?: string
  user_name?: string
  full_name?: string
  phone_number?: string
  venue?: { name?: string; sport_types?: string[] | string; sport_type?: string }
  venue_name?: string
  sport?: string
  start_time?: string
  end_time?: string
  time?: string
  total_price?: number | string
  price?: number | string
  transaction_ref?: string
  payment_screenshot?: string
  screenshot?: string
  proof_image?: string
  payment_proof?: string
  receipt_image?: string
  screenshot_url?: string
  payment_screenshot_url?: string
}

const config = useRuntimeConfig()
const authStore = useAuthStore()

const filters = ['All', 'Pending', 'Confirmed', 'Rejected']
const activeFilter = ref('All')
const searchQuery = ref('')
const bookings = ref<Booking[]>([])
const isLoading = ref(false)
const updatingBookingId = ref<string | number | null>(null)
const errorMessage = ref('')

const previewBooking = ref<Booking | null>(null)
const zoom = ref(1)
const rotation = ref(0)

const CHAPA_DEFAULT_IMAGE = '/images/chapa-default.png'

const CHAPA_FALLBACK =
  'data:image/svg+xml;charset=UTF-8,' +
  encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#00A651"/>
          <stop offset="100%" stop-color="#007A3D"/>
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill="url(#g)"/>
      <g fill="#ffffff" font-family="Arial, sans-serif" text-anchor="middle">
        <text x="200" y="130" font-size="34" font-weight="bold">Chapa</text>
        <text x="200" y="170" font-size="14" opacity="0.9">Payment Receipt</text>
        <text x="200" y="205" font-size="11" opacity="0.7">Screenshot unavailable</text>
      </g>
    </svg>
  `)

const apiBase = computed(() => {
  const base = String(config.public.apiBase || 'http://127.0.0.1:8000').replace(/\/+$/, '')
  return base.endsWith('/api') ? base : `${base}/api`
})

const storageBase = computed(() => {
  const base = String(config.public.apiBase || 'http://127.0.0.1:8000').replace(/\/+$/, '')
  return base.endsWith('/api') ? base.replace(/\/api$/, '') : base
})

const filteredBookings = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()
  return bookings.value.filter((booking) => {
    const status = String(booking.status || '').trim().toLowerCase()
    const statusMatches =
      activeFilter.value === 'All' ||
      (activeFilter.value === 'Confirmed'
        ? ['confirmed', 'approved'].includes(status)
        : activeFilter.value === 'Rejected'
          ? ['rejected', 'cancelled', 'canceled'].includes(status)
          : status === activeFilter.value.toLowerCase())
    const searchFields = [
      booking.id, booking.booking_code, booking.user?.name, booking.customer?.name,
      booking.customer_name, booking.user_name, booking.full_name, booking.phone_number,
      booking.venue?.name, booking.venue_name, booking.transaction_ref,
    ]
    const searchMatches =
      !query || searchFields.some(value => String(value || '').toLowerCase().includes(query))
    return statusMatches && searchMatches
  })
})

const getToken = () => authStore.token || useCookie('auth_token').value || ''

const loadBookings = async () => {
  isLoading.value = true
  errorMessage.value = ''
  try {
    const response = await $fetch<any>(`${apiBase.value}/admin/bookings-list`, {
      headers: { Authorization: `Bearer ${getToken()}`, Accept: 'application/json' },
    })
    const payload = response?.data ?? response
    const rows = Array.isArray(payload) ? payload : payload?.data || payload?.bookings || []
    bookings.value = Array.isArray(rows) ? rows : []
  } catch (error: any) {
    console.error('Failed to load bookings:', error)
    errorMessage.value =
      error?.data?.message || error?.response?._data?.message ||
      'Bookings could not be loaded. Check the server connection and try again.'
    bookings.value = []
  } finally {
    isLoading.value = false
  }
}

const updateBookingStatus = async (booking: Booking, action: 'confirm' | 'reject') => {
  updatingBookingId.value = booking.id
  errorMessage.value = ''
  try {
    await $fetch(`${apiBase.value}/admin/bookings/${booking.id}/${action}`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${getToken()}`, Accept: 'application/json' },
    })
    await loadBookings()
  } catch (error: any) {
    console.error(`Failed to ${action} booking:`, error)
    errorMessage.value =
      error?.data?.message || error?.response?._data?.message ||
      `Could not ${action} this booking. Please try again.`
  } finally {
    updatingBookingId.value = null
  }
}

const isChapaPayment = (booking: Booking): boolean => {
  const method = String(booking.payment_method || booking.payment_type || '').toLowerCase()
  return method.includes('chapa')
}

const getScreenshotUrl = (booking: Booking): string | null => {
  const raw =
    booking.payment_screenshot_url || booking.screenshot_url || booking.payment_screenshot ||
    booking.screenshot || booking.proof_image || booking.payment_proof || booking.receipt_image
  if (raw) {
    if (raw.startsWith('http://') || raw.startsWith('https://') || raw.startsWith('data:')) return raw
    const clean = raw.replace(/^\/+/, '')
    return `${storageBase.value}/storage/${clean}`
  }
  if (isChapaPayment(booking)) return CHAPA_DEFAULT_IMAGE
  return null
}

const onImageError = (event: Event) => {
  const img = event.target as HTMLImageElement
  if (img.src !== CHAPA_FALLBACK) img.src = CHAPA_FALLBACK
}

const hasScreenshot = (booking: Booking) => !!getScreenshotUrl(booking)

const openPreview = (booking: Booking) => {
  previewBooking.value = booking
  zoom.value = 1
  rotation.value = 0
}

const closePreview = () => {
  previewBooking.value = null
  zoom.value = 1
  rotation.value = 0
}

const zoomIn = () => { zoom.value = Math.min(zoom.value + 0.25, 4) }
const zoomOut = () => { zoom.value = Math.max(zoom.value - 0.25, 0.5) }
const resetZoom = () => { zoom.value = 1; rotation.value = 0 }
const rotateImage = () => { rotation.value = (rotation.value + 90) % 360 }

const currentIndex = computed(() =>
  previewBooking.value
    ? filteredBookings.value.findIndex(b => b.id === previewBooking.value!.id)
    : -1
)
const canGoPrev = computed(() => currentIndex.value > 0)
const canGoNext = computed(() => currentIndex.value >= 0 && currentIndex.value < filteredBookings.value.length - 1)
const goPrev = () => { if (canGoPrev.value) openPreview(filteredBookings.value[currentIndex.value - 1]) }
const goNext = () => { if (canGoNext.value) openPreview(filteredBookings.value[currentIndex.value + 1]) }

const handleKeydown = (e: KeyboardEvent) => {
  if (!previewBooking.value) return
  if (e.key === 'Escape') closePreview()
  else if (e.key === 'ArrowLeft') goPrev()
  else if (e.key === 'ArrowRight') goNext()
  else if (e.key === '+' || e.key === '=') zoomIn()
  else if (e.key === '-') zoomOut()
  else if (e.key === '0') resetZoom()
}

onMounted(() => {
  loadBookings()
  window.addEventListener('keydown', handleKeydown)
})
onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
})

const customerName = (booking: Booking) =>
  booking.user?.name || booking.customer?.name || booking.customer_name ||
  booking.user_name || booking.full_name || booking.phone_number || '—'

const customerInitial = (booking: Booking) => {
  const name = customerName(booking)
  return name && name !== '—' ? name.charAt(0).toUpperCase() : '?'
}

const venueName = (booking: Booking) => booking.venue?.name || booking.venue_name || 'Sport field'

const sportName = (booking: Booking) => {
  const sport = booking.sport || booking.venue?.sport_types || booking.venue?.sport_type
  if (Array.isArray(sport)) return sport.join(', ')
  return String(sport || 'Sports').replace(/[\[\]"']/g, '')
}

const formatDate = (value?: string) => {
  if (!value) return '—'
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value
  return new Intl.DateTimeFormat('en-ET-u-ca-gregory', {
    day: '2-digit', month: 'short', year: 'numeric', timeZone: 'Africa/Addis_Ababa',
  }).format(date)
}

const formatTime = (booking: Booking) => {
  if (booking.time) return booking.time
  if (!booking.start_time) return '—'
  const format = (value: string) => {
    const date = new Date(value)
    if (Number.isNaN(date.getTime())) return ''
    return new Intl.DateTimeFormat('en-ET', {
      hour: 'numeric', minute: '2-digit', timeZone: 'Africa/Addis_Ababa',
    }).format(date)
  }
  const start = format(booking.start_time)
  const end = booking.end_time ? format(booking.end_time) : ''
  return end ? `${start} - ${end}` : start || '—'
}

const formatPrice = (value?: number | string) =>
  `ETB ${new Intl.NumberFormat('en-ET').format(Number(value) || 0)}`

const statusLabel = (value?: string) => {
  const status = String(value || 'Unknown').trim().toLowerCase()
  if (status === 'approved') return 'Confirmed'
  if (status === 'cancelled' || status === 'canceled') return 'Rejected'
  return status.charAt(0).toUpperCase() + status.slice(1)
}

const statusClass = (value?: string) => {
  const status = String(value || '').trim().toLowerCase()
  if (status === 'confirmed' || status === 'approved') return 'bg-emerald-100 text-emerald-800 ring-1 ring-emerald-200'
  if (status === 'pending') return 'bg-amber-100 text-amber-800 ring-1 ring-amber-200'
  if (status === 'rejected' || status === 'cancelled' || status === 'canceled') return 'bg-red-100 text-red-800 ring-1 ring-red-200'
  return 'bg-slate-100 text-slate-700 ring-1 ring-slate-200'
}

const statusDot = (value?: string) => {
  const status = String(value || '').trim().toLowerCase()
  if (status === 'confirmed' || status === 'approved') return 'bg-emerald-500'
  if (status === 'pending') return 'bg-amber-500'
  if (status === 'rejected' || status === 'cancelled' || status === 'canceled') return 'bg-red-500'
  return 'bg-slate-400'
}
</script>

<template>
  <!-- ☀️ Full Light Theme — no black anywhere -->
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50/40 p-4 sm:p-6 lg:p-8">
    <div class="mx-auto max-w-7xl space-y-6">

      <!-- ══════ HEADER ══════ -->
      <header class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p class="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-600">
            <span class="relative flex h-2 w-2">
              <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
              <span class="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
            </span>
            Addis Ababa · Ethiopia
          </p>
          <h1 class="mt-1 text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
            Booking Management
          </h1>
          <p class="mt-1 text-sm text-slate-600">
            Review sport field reservations, payment screenshots, and payments in ETB.
          </p>
        </div>

        <button
          type="button"
          @click="loadBookings"
          :disabled="isLoading"
          class="group inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 shadow-sm transition hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700 hover:shadow-md disabled:cursor-wait disabled:opacity-60"
        >
          <RefreshCw :size="16" :class="isLoading ? 'animate-spin' : 'transition group-hover:rotate-180'" />
          Refresh
        </button>
      </header>

      <!-- ══════ FILTER BAR ══════ -->
      <section class="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div class="flex gap-1 overflow-x-auto rounded-xl bg-slate-50 p-1 ring-1 ring-slate-200">
          <button
            v-for="item in filters"
            :key="item"
            type="button"
            @click="activeFilter = item"
            :aria-pressed="activeFilter === item"
            :class="[
              'relative whitespace-nowrap rounded-lg px-4 py-2 text-xs font-bold transition-all duration-200',
              activeFilter === item
                ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-md shadow-emerald-500/30'
                : 'text-slate-600 hover:bg-white hover:text-emerald-700'
            ]"
          >
            {{ item }}
          </button>
        </div>

        <label class="relative block w-full sm:max-w-sm">
          <Search class="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" :size="17" />
          <input
            v-model="searchQuery"
            type="search"
            placeholder="Search booking, customer, or field"
            class="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
          />
        </label>
      </section>

      <!-- ══════ ERROR ══════ -->
      <div v-if="errorMessage" role="alert" class="flex flex-col gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-800 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <span class="flex items-center gap-2">
          <XCircle :size="18" class="flex-shrink-0" />
          {{ errorMessage }}
        </span>
        <button type="button" @click="loadBookings" class="font-bold underline underline-offset-2">Try again</button>
      </div>

      <!-- ══════ TABLE ══════ -->
      <section class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div v-if="isLoading && bookings.length === 0" class="flex min-h-56 flex-col items-center justify-center gap-3 text-slate-500">
          <Loader2 class="animate-spin text-emerald-600" :size="28" />
          <p class="text-sm font-semibold">Loading bookings…</p>
        </div>

        <div v-else-if="filteredBookings.length === 0" class="flex min-h-56 flex-col items-center justify-center gap-2 px-6 text-center">
          <div class="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100">
            <Search class="text-slate-400" :size="24" />
          </div>
          <h2 class="font-bold text-slate-800">No bookings found</h2>
          <p class="text-sm text-slate-500">Try another search or status filter.</p>
        </div>

        <div v-else class="overflow-x-auto">
          <table class="w-full min-w-[1080px] text-left">
            <thead class="bg-slate-50 text-[11px] font-bold uppercase tracking-wider text-slate-600">
              <tr class="border-b border-slate-200">
                <th class="px-5 py-4">Booking</th>
                <th class="px-5 py-4">Customer</th>
                <th class="px-5 py-4">Sport field</th>
                <th class="px-5 py-4">Date & time (EAT)</th>
                <th class="px-5 py-4">Total</th>
                <th class="px-5 py-4 text-center">Screenshot</th>
                <th class="px-5 py-4">Status</th>
                <th class="px-5 py-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody class="divide-y divide-slate-100">
              <tr
                v-for="booking in filteredBookings"
                :key="booking.id"
                class="group align-top transition-colors duration-200 hover:bg-emerald-50/40"
              >
                <td class="px-5 py-4">
                  <div class="flex items-center gap-3">
                    <div class="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-[10px] font-black text-white shadow-sm">
                      BK
                    </div>
                    <div class="min-w-0">
                      <p class="font-bold text-slate-900">{{ booking.booking_code || `BK-${booking.id}` }}</p>
                      <p class="mt-0.5 truncate font-mono text-[11px] text-slate-500">{{ booking.transaction_ref || 'No transaction ref' }}</p>
                    </div>
                  </div>
                </td>

                <td class="px-5 py-4">
                  <div class="flex items-center gap-3">
                    <div class="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-emerald-100 to-teal-100 text-xs font-black text-emerald-700 ring-2 ring-white shadow-sm">
                      {{ customerInitial(booking) }}
                    </div>
                    <div class="min-w-0">
                      <p class="truncate font-semibold text-slate-800">{{ customerName(booking) }}</p>
                      <p class="mt-0.5 truncate text-xs text-slate-500">{{ booking.phone_number || 'Phone not provided' }}</p>
                    </div>
                  </div>
                </td>

                <td class="px-5 py-4">
                  <p class="font-semibold text-slate-800">{{ venueName(booking) }}</p>
                  <p class="mt-1 inline-flex items-center gap-1 rounded-md bg-emerald-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-emerald-700 ring-1 ring-emerald-100">
                    {{ sportName(booking) }}
                  </p>
                </td>

                <td class="px-5 py-4">
                  <p class="font-semibold text-slate-800">{{ formatDate(booking.start_time) }}</p>
                  <p class="mt-1 text-xs text-slate-500">{{ formatTime(booking) }}</p>
                </td>

                <td class="px-5 py-4">
                  <span class="inline-flex items-center rounded-lg bg-gradient-to-r from-emerald-50 to-teal-50 px-3 py-1.5 text-sm font-black text-emerald-700 ring-1 ring-emerald-200">
                    {{ formatPrice(booking.total_price ?? booking.price) }}
                  </span>
                </td>

                <!-- Screenshot -->
                <td class="px-5 py-4">
                  <div class="flex justify-center">
                    <button
                      v-if="hasScreenshot(booking)"
                      type="button"
                      @click="openPreview(booking)"
                      class="group/img relative block h-14 w-20 overflow-hidden rounded-lg border-2 border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-emerald-400 hover:shadow-lg hover:shadow-emerald-500/20"
                      :aria-label="`View payment screenshot for ${booking.booking_code || booking.id}`"
                    >
                      <img
                        :src="getScreenshotUrl(booking)!"
                        :alt="`Payment screenshot for ${booking.booking_code || booking.id}`"
                        class="h-full w-full object-cover transition duration-500 group-hover/img:scale-110"
                        loading="lazy"
                        @error="onImageError"
                      />
                      <span
                        v-if="isChapaPayment(booking) && !(booking.payment_screenshot || booking.screenshot || booking.proof_image || booking.payment_proof || booking.receipt_image || booking.screenshot_url || booking.payment_screenshot_url)"
                        class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-emerald-600/90 to-transparent px-1 py-0.5 text-center text-[8px] font-black uppercase tracking-wide text-white"
                      >
                        Chapa
                      </span>
                      <span class="absolute inset-0 flex items-center justify-center bg-white/0 text-white opacity-0 backdrop-blur-[1px] transition group-hover/img:bg-emerald-600/50 group-hover/img:opacity-100">
                        <Eye :size="18" />
                      </span>
                    </button>

                    <div
                      v-else
                      class="flex h-14 w-20 flex-col items-center justify-center gap-1 rounded-lg border-2 border-dashed border-slate-200 bg-slate-50 text-slate-400"
                      title="No screenshot uploaded"
                    >
                      <ImageIcon :size="16" />
                      <span class="text-[9px] font-bold uppercase tracking-wide">No image</span>
                    </div>
                  </div>
                </td>

                <td class="px-5 py-4">
                  <span :class="statusClass(booking.status)" class="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold">
                    <span :class="statusDot(booking.status)" class="h-1.5 w-1.5 rounded-full"></span>
                    {{ statusLabel(booking.status) }}
                  </span>
                </td>

                <td class="px-5 py-4">
                  <div class="flex justify-end gap-2">
                    <template v-if="String(booking.status).toLowerCase() === 'pending'">
                      <button
                        type="button"
                        :disabled="updatingBookingId === booking.id"
                        aria-label="Confirm booking"
                        title="Confirm booking"
                        @click="updateBookingStatus(booking, 'confirm')"
                        class="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200 transition hover:bg-emerald-600 hover:text-white hover:ring-emerald-600 disabled:opacity-50"
                      >
                        <Loader2 v-if="updatingBookingId === booking.id" class="animate-spin" :size="16" />
                        <Check v-else :size="16" />
                      </button>
                      <button
                        type="button"
                        :disabled="updatingBookingId === booking.id"
                        aria-label="Reject booking"
                        title="Reject booking"
                        @click="updateBookingStatus(booking, 'reject')"
                        class="flex h-9 w-9 items-center justify-center rounded-lg bg-red-50 text-red-700 ring-1 ring-red-200 transition hover:bg-red-600 hover:text-white hover:ring-red-600 disabled:opacity-50"
                      >
                        <X :size="16" />
                      </button>
                    </template>
                    <span v-else class="px-2 py-2 text-xs font-medium text-slate-400">—</span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>

    <!-- ══════ MODAL — FULLY LIGHT ══════ -->
    <Teleport to="body">
      <Transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="previewBooking"
          class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-md"
          @click.self="closePreview"
        >
          <Transition
            enter-active-class="transition duration-300 ease-out"
            enter-from-class="opacity-0 scale-95 translate-y-4"
            enter-to-class="opacity-100 scale-100 translate-y-0"
            leave-active-class="transition duration-200 ease-in"
            leave-from-class="opacity-100 scale-100"
            leave-to-class="opacity-0 scale-95"
          >
            <div
              v-if="previewBooking"
              class="relative flex w-full max-w-3xl flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl shadow-emerald-900/10"
            >
              <!-- Header -->
              <div class="flex items-center justify-between gap-3 border-b border-slate-100 bg-gradient-to-r from-emerald-50 to-teal-50 px-5 py-4">
                <div class="flex min-w-0 items-center gap-3">
                  <div class="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-md">
                    <ImageIcon :size="20" />
                  </div>
                  <div class="min-w-0">
                    <h3 class="truncate text-sm font-bold text-slate-900">
                      Payment Screenshot · {{ previewBooking.booking_code || `BK-${previewBooking.id}` }}
                    </h3>
                    <p class="mt-0.5 truncate text-xs text-slate-600">
                      {{ customerName(previewBooking) }} ·
                      <span class="font-bold text-emerald-700">{{ formatPrice(previewBooking.total_price ?? previewBooking.price) }}</span>
                    </p>
                  </div>
                </div>

                <div class="flex items-center gap-2">
                  <span class="hidden rounded-full bg-white px-3 py-1 text-[10px] font-bold text-slate-600 ring-1 ring-slate-200 sm:inline-block">
                    {{ currentIndex + 1 }} / {{ filteredBookings.length }}
                  </span>
                  <button
                    type="button"
                    @click="closePreview"
                    class="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-slate-500 ring-1 ring-slate-200 transition hover:bg-red-500 hover:text-white hover:ring-red-500"
                    aria-label="Close preview"
                  >
                    <XCircle :size="18" />
                  </button>
                </div>
              </div>

              <!-- Toolbar -->
              <div class="flex items-center justify-between gap-2 border-b border-slate-100 bg-white px-5 py-2.5">
                <div class="flex items-center gap-1">
                  <button
                    type="button"
                    @click="zoomOut"
                    class="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 transition hover:bg-emerald-50 hover:text-emerald-700"
                    title="Zoom out (-)"
                  >
                    <ZoomOut :size="16" />
                  </button>
                  <span class="w-12 text-center font-mono text-xs font-bold text-emerald-700">{{ Math.round(zoom * 100) }}%</span>
                  <button
                    type="button"
                    @click="zoomIn"
                    class="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 transition hover:bg-emerald-50 hover:text-emerald-700"
                    title="Zoom in (+)"
                  >
                    <ZoomIn :size="16" />
                  </button>
                  <div class="mx-1 h-5 w-px bg-slate-200"></div>
                  <button
                    type="button"
                    @click="rotateImage"
                    class="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 transition hover:bg-emerald-50 hover:text-emerald-700"
                    title="Rotate 90°"
                  >
                    <RotateCw :size="16" />
                  </button>
                  <button
                    type="button"
                    @click="resetZoom"
                    class="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 transition hover:bg-emerald-50 hover:text-emerald-700"
                    title="Reset (0)"
                  >
                    <Maximize2 :size="16" />
                  </button>
                </div>

                <div class="flex items-center gap-1">
                  <button
                    type="button"
                    :disabled="!canGoPrev"
                    @click="goPrev"
                    class="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 transition hover:bg-emerald-50 hover:text-emerald-700 disabled:opacity-30"
                    title="Previous (←)"
                  >
                    <ChevronLeft :size="18" />
                  </button>
                  <button
                    type="button"
                    :disabled="!canGoNext"
                    @click="goNext"
                    class="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 transition hover:bg-emerald-50 hover:text-emerald-700 disabled:opacity-30"
                    title="Next (→)"
                  >
                    <ChevronRight :size="18" />
                  </button>
                  <div class="mx-1 h-5 w-px bg-slate-200"></div>
                  <a
                    :href="getScreenshotUrl(previewBooking)!"
                    download
                    class="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 transition hover:bg-emerald-50 hover:text-emerald-700"
                    title="Download"
                  >
                    <Download :size="16" />
                  </a>
                </div>
              </div>

              <!-- 🖼️ Image Stage — pure light neutral -->
              <div class="relative flex max-h-[68vh] min-h-[340px] items-center justify-center overflow-auto bg-[#f1f4f7] p-6">
                <!-- subtle checkerboard -->
                <div
                  class="pointer-events-none absolute inset-0 opacity-60"
                  style="background-image: linear-gradient(45deg, #e2e8ee 25%, transparent 25%), linear-gradient(-45deg, #e2e8ee 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #e2e8ee 75%), linear-gradient(-45deg, transparent 75%, #e2e8ee 75%); background-size: 24px 24px; background-position: 0 0, 0 12px, 12px -12px, -12px 0px;"
                ></div>

                <img
                  :src="getScreenshotUrl(previewBooking)!"
                  :alt="`Payment screenshot for ${previewBooking.booking_code || previewBooking.id}`"
                  class="relative max-h-full w-auto max-w-full select-none rounded-xl bg-white object-contain shadow-[0_10px_40px_-10px_rgba(15,23,42,0.2)] ring-1 ring-slate-200 transition-transform duration-200"
                  :style="{ transform: `scale(${zoom}) rotate(${rotation}deg)` }"
                  draggable="false"
                  @error="onImageError"
                />

                <!-- Chapa badge -->
                <div
                  v-if="isChapaPayment(previewBooking) && !(previewBooking.payment_screenshot || previewBooking.screenshot || previewBooking.proof_image || previewBooking.payment_proof || previewBooking.receipt_image || previewBooking.screenshot_url || previewBooking.payment_screenshot_url)"
                  class="absolute left-4 top-4 flex items-center gap-1.5 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-white shadow-lg ring-2 ring-white"
                >
                  <span class="h-1.5 w-1.5 animate-pulse rounded-full bg-white"></span>
                  Chapa Default
                </div>
              </div>

              <!-- Footer details — light -->
              <div class="grid grid-cols-2 gap-3 border-t border-slate-100 bg-slate-50 px-5 py-4 text-xs sm:grid-cols-4">
                <div>
                  <p class="text-slate-500">Booking ID</p>
                  <p class="mt-0.5 truncate font-bold text-slate-900">{{ previewBooking.booking_code || `BK-${previewBooking.id}` }}</p>
                </div>
                <div>
                  <p class="text-slate-500">Transaction Ref</p>
                  <p class="mt-0.5 truncate font-mono font-bold text-emerald-700">{{ previewBooking.transaction_ref || '—' }}</p>
                </div>
                <div>
                  <p class="text-slate-500">Venue</p>
                  <p class="mt-0.5 truncate font-bold text-slate-900">{{ venueName(previewBooking) }}</p>
                </div>
                <div>
                  <p class="text-slate-500">Status</p>
                  <p class="mt-0.5 font-bold text-slate-900">{{ statusLabel(previewBooking.status) }}</p>
                </div>
              </div>

              <!-- Keyboard hints — light -->
              <div class="border-t border-slate-100 bg-white px-5 py-2 text-center text-[10px] text-slate-500">
                <kbd class="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-slate-600 ring-1 ring-slate-200">Esc</kbd> close ·
                <kbd class="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-slate-600 ring-1 ring-slate-200">←</kbd> prev ·
                <kbd class="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-slate-600 ring-1 ring-slate-200">→</kbd> next ·
                <kbd class="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-slate-600 ring-1 ring-slate-200">+/-</kbd> zoom ·
                <kbd class="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-slate-600 ring-1 ring-slate-200">0</kbd> reset
              </div>
            </div>
          </Transition>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>