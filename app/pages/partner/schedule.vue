<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
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
interface Venue {
  id: number
  name: string
}

interface Slot {
  id: number
  time: string
  status: 'available' | 'booked' | 'blocked'
  price?: string
  bookedBy?: string
  phone?: string
  paymentStatus?: string
}

/* ═══════════════════════════════════════════
   SHARED STATE — በሁሉም ገጾች ይጋራል
   ═══════════════════════════════════════════ */

// 🌐 የሜዳ ዝርዝር — አንዴ ብቻ ይመጣል
const sharedVenues = useState<Venue[]>('partner-venues', () => [])
const venuesLoaded = useState<boolean>('partner-venues-loaded', () => false)

// 🌐 የሰዓት ዳታ — በ "venue_id|date" key ይቀመጣል
const sharedSlots = useState<Record<string, Slot[]>>('partner-slots-cache', () => ({}))

/* ═══════════════════════════════════════════
   SETUP
   ═══════════════════════════════════════════ */
const config = useRuntimeConfig()
const authStore = useAuthStore()

const venues = ref<Venue[]>([])
const selectedVenueId = ref<number | null>(null)
const selectedDate = ref(new Date().toISOString().split('T')[0])
const timeSlots = ref<Slot[]>([])
const isLoading = ref(true)
const errorMessage = ref('')

const selectedSlot = ref<Slot | null>(null)
const isModalOpen = ref(false)

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
   CACHE KEY
   ═══════════════════════════════════════════ */
const cacheKey = computed(() => {
  if (!selectedVenueId.value) return ''
  return `${selectedVenueId.value}|${selectedDate.value}`
})

/* ═══════════════════════════════════════════
   1️⃣ FETCH VENUES — cache-aware
   ═══════════════════════════════════════════ */
const fetchVenues = async (force = false) => {
  // 🎯 Cache ካለ ከ cache ውሰድ
  if (!force && venuesLoaded.value && sharedVenues.value.length > 0) {
    venues.value = sharedVenues.value
    selectedVenueId.value = sharedVenues.value[0]?.id ?? null
    return
  }

  try {
    const response = await $fetch<any>(`${apiBase.value}/my-venues`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
        Accept: 'application/json',
      },
    })

    const loadedVenues = Array.isArray(response)
      ? response
      : (response?.data || response?.venues || [])

    venues.value = Array.isArray(loadedVenues) ? loadedVenues : []

    // 🌐 ለሌሎች ገጾች አጋራ
    sharedVenues.value = venues.value
    venuesLoaded.value = true

    if (venues.value.length > 0 && venues.value[0]?.id) {
      selectedVenueId.value = venues.value[0].id
    } else {
      selectedVenueId.value = null
      isLoading.value = false
    }
  } catch (e: any) {
    console.error('Error fetching venues:', e)
    errorMessage.value = e?.data?.message || 'Failed to load venues.'
    venues.value = []
    isLoading.value = false
  }
}

/* ═══════════════════════════════════════════
   2️⃣ FETCH SLOTS — cache-aware
   ═══════════════════════════════════════════ */
const fetchSlots = async (force = false) => {
  if (!selectedVenueId.value) {
    isLoading.value = false
    timeSlots.value = []
    return
  }

  const key = cacheKey.value

  // 🎯 Cache ካለ ከ cache ውሰድ
  if (!force && sharedSlots.value[key]) {
    timeSlots.value = sharedSlots.value[key]
    isLoading.value = false
    return
  }

  isLoading.value = true
  errorMessage.value = ''

  try {
    const response = await $fetch<any>(
      `${apiBase.value}/my-venues/${selectedVenueId.value}/schedule?date=${selectedDate.value}`,
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
          Accept: 'application/json',
        },
      }
    )

    const loadedSlots = Array.isArray(response)
      ? response
      : (response?.slots || response?.data || [])

    timeSlots.value = loadedSlots

    // 🌐 በ cache ውስጥ አስቀምጥ
    sharedSlots.value[key] = loadedSlots
  } catch (e: any) {
    console.error('Error fetching slots:', e)
    errorMessage.value = e?.data?.message || 'Failed to load schedule.'
    timeSlots.value = []
  } finally {
    isLoading.value = false
  }
}

/* ═══════════════════════════════════════════
   3️⃣ TOGGLE SLOT
   ═══════════════════════════════════════════ */
const handleSlotClick = async (slot: Slot) => {
  if (!slot) return

  if (slot.status === 'booked') {
    selectedSlot.value = slot
    isModalOpen.value = true
    return
  }

  const previousStatus = slot.status
  slot.status = slot.status === 'available' ? 'blocked' : 'available'

  // 🌐 የ cache ንም አዘምን
  const key = cacheKey.value
  if (sharedSlots.value[key]) {
    sharedSlots.value[key] = [...timeSlots.value]
  }

  try {
    await $fetch(
      `${apiBase.value}/my-venues/${selectedVenueId.value}/schedule/toggle-block`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${getToken()}`,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: {
          date: selectedDate.value,
          hour: slot.id,
        },
      }
    )
  } catch (e: any) {
    console.error('Error toggling slot:', e)
    slot.status = previousStatus
    errorMessage.value = e?.data?.message || 'Failed to update slot.'
    setTimeout(() => (errorMessage.value = ''), 3000)
  }
}

/* ═══════════════════════════════════════════
   🔄 MANUAL REFRESH
   ═══════════════════════════════════════════ */
const refreshData = async () => {
  // 🌐 Cache ን አጽዳ
  if (cacheKey.value) {
    delete sharedSlots.value[cacheKey.value]
  }
  await fetchSlots(true)
}

/* ═══════════════════════════════════════════
   LIFECYCLE
   ═══════════════════════════════════════════ */
onMounted(async () => {
  if (authStore?.init) authStore.init()
  await fetchVenues()
  if (selectedVenueId.value) {
    await fetchSlots()
  }
})

watch([selectedVenueId, selectedDate], ([newVenue, newDate], [oldVenue, oldDate]) => {
  if (newVenue && (newVenue !== oldVenue || newDate !== oldDate)) {
    fetchSlots()
  }
})

/* ═══════════════════════════════════════════
   COMPUTED
   ═══════════════════════════════════════════ */
const totalSlots = computed(() => timeSlots.value?.length || 0)
const bookedSlots = computed(() => timeSlots.value?.filter((s) => s?.status === 'booked').length || 0)
const availableSlots = computed(() => timeSlots.value?.filter((s) => s?.status === 'available').length || 0)
const blockedSlots = computed(() => timeSlots.value?.filter((s) => s?.status === 'blocked').length || 0)

const formattedDate = computed(() => {
  const d = new Date(selectedDate.value)
  return d.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
})
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50/40 p-4 sm:p-6 lg:p-8">
    <div class="mx-auto max-w-7xl space-y-6">

      <!-- ══════ HEADER ══════ -->
      <header class="flex flex-col justify-between gap-4 border-b border-slate-200 pb-5 md:flex-row md:items-end">
        <div>
          <p class="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-600">
            <span class="relative flex h-2 w-2">
              <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
              <span class="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
            </span>
            Schedule Management
          </p>
          <h1 class="mt-1 text-3xl font-black tracking-tight text-slate-900">Daily Schedule</h1>
          <p class="mt-1 text-sm text-slate-600">
            Manage your venue's open hours or view booked slots.
          </p>
        </div>

        <div class="flex flex-wrap items-center gap-3">
          <!-- Venue Dropdown -->
          <select
            v-model="selectedVenueId"
            :disabled="isLoading"
            class="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-800 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 disabled:opacity-50"
          >
            <option v-if="!venues || venues.length === 0" :value="null" disabled>
              No venues available
            </option>
            <option v-for="venue in venues" :key="venue.id" :value="venue.id">
              {{ venue.name }}
            </option>
          </select>

          <!-- Date Picker -->
          <input
            v-model="selectedDate"
            type="date"
            :disabled="isLoading"
            class="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-800 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 disabled:opacity-50"
          />

          <!-- Refresh Button -->
          <button
            type="button"
            :disabled="isLoading || !selectedVenueId"
            @click="refreshData"
            class="group inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 shadow-sm transition hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700 disabled:opacity-50"
          >
            <svg
              class="h-4 w-4 transition-transform"
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
      </header>

      <!-- ══════ ERROR ══════ -->
      <Transition
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="opacity-0 -translate-y-2"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition duration-200"
        leave-to-class="opacity-0"
      >
        <div
          v-if="errorMessage"
          class="flex items-center gap-3 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-semibold text-red-700"
        >
          <svg class="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          {{ errorMessage }}
        </div>
      </Transition>

      <!-- ══════════════════════════════════════════════
           SKELETON LOADING STATE
           ══════════════════════════════════════════════ -->
      <template v-if="isLoading">
        <!-- Stats Skeleton -->
        <div class="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div
            v-for="i in 4"
            :key="`stat-skel-${i}`"
            class="animate-pulse rounded-2xl border border-slate-200 bg-white p-5"
          >
            <div class="mx-auto h-3 w-20 rounded-full bg-slate-200"></div>
            <div class="mx-auto mt-3 h-8 w-16 rounded-lg bg-slate-200"></div>
          </div>
        </div>

        <!-- Slots Grid Skeleton -->
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <div
            v-for="i in 8"
            :key="`slot-skel-${i}`"
            class="flex h-32 animate-pulse flex-col justify-between rounded-2xl border-2 border-slate-200 bg-white p-4"
          >
            <!-- Top: Time + Badge -->
            <div class="flex items-start justify-between">
              <div class="h-5 w-16 rounded-md bg-slate-200"></div>
              <div class="h-5 w-14 rounded-md bg-slate-200"></div>
            </div>

            <!-- Bottom: Content -->
            <div class="space-y-2">
              <div class="h-4 w-3/4 rounded bg-slate-200"></div>
            </div>
          </div>
        </div>

        <!-- Loading Indicator -->
        <div class="flex items-center justify-center gap-3 pt-4">
          <div class="h-5 w-5 animate-spin rounded-full border-2 border-emerald-500 border-t-transparent"></div>
          <p class="text-sm font-semibold text-slate-500">Loading schedule…</p>
        </div>
      </template>

      <!-- ══════ NO VENUE ══════ -->
      <div
        v-else-if="!selectedVenueId"
        class="rounded-2xl border border-slate-200 bg-white p-12 text-center shadow-sm"
      >
        <div class="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-3xl">
          📭
        </div>
        <p class="text-base font-bold text-slate-900">No venues yet</p>
        <p class="mt-1 text-sm text-slate-500">Add a venue first to manage its daily schedule.</p>
        <NuxtLink
          to="/partner/my-venue"
          class="mt-5 inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg transition hover:bg-emerald-700"
        >
          + Add New Venue
        </NuxtLink>
      </div>

      <!-- ══════════════════════════════════════════════
           MAIN CONTENT
           ══════════════════════════════════════════════ -->
      <template v-else>
        <!-- ══════ STATS ══════ -->
        <div class="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div class="rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-sm transition hover:shadow-md">
            <span class="text-[10px] font-bold uppercase tracking-wider text-slate-500">Total Slots</span>
            <div class="mt-1 text-3xl font-black text-slate-900">{{ totalSlots }}</div>
          </div>
          <div class="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-center shadow-sm transition hover:shadow-md">
            <span class="text-[10px] font-bold uppercase tracking-wider text-emerald-700">Available</span>
            <div class="mt-1 text-3xl font-black text-emerald-700">{{ availableSlots }}</div>
          </div>
          <div class="rounded-2xl border border-blue-200 bg-blue-50 p-5 text-center shadow-sm transition hover:shadow-md">
            <span class="text-[10px] font-bold uppercase tracking-wider text-blue-700">Booked</span>
            <div class="mt-1 text-3xl font-black text-blue-700">{{ bookedSlots }}</div>
          </div>
          <div class="rounded-2xl border border-rose-200 bg-rose-50 p-5 text-center shadow-sm transition hover:shadow-md">
            <span class="text-[10px] font-bold uppercase tracking-wider text-rose-700">Blocked</span>
            <div class="mt-1 text-3xl font-black text-rose-700">{{ blockedSlots }}</div>
          </div>
        </div>

        <!-- ══════ NO SLOTS ══════ -->
        <div
          v-if="timeSlots.length === 0"
          class="rounded-2xl border border-slate-200 bg-white p-12 text-center shadow-sm"
        >
          <div class="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-3xl">
            📅
          </div>
          <p class="text-base font-bold text-slate-900">No slots for this date</p>
          <p class="mt-1 text-sm text-slate-500">
            This venue has no schedule configured for {{ formattedDate }}.
          </p>
          <NuxtLink
            to="/partner/my-venue"
            class="mt-5 inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg transition hover:bg-emerald-700"
          >
            Configure Weekly Schedule
          </NuxtLink>
        </div>

        <!-- ══════ SLOTS GRID ══════ -->
        <div v-else class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <div
            v-for="slot in timeSlots"
            :key="slot.id"
            @click="handleSlotClick(slot)"
            class="group flex h-32 cursor-pointer flex-col justify-between rounded-2xl border-2 p-4 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
            :class="{
              'border-emerald-200 bg-emerald-50 hover:border-emerald-400': slot.status === 'available',
              'border-blue-200 bg-blue-50 hover:border-blue-400': slot.status === 'booked',
              'border-rose-200 bg-rose-50 hover:border-rose-400': slot.status === 'blocked',
            }"
          >
            <div class="flex items-start justify-between">
              <span class="font-mono text-base font-bold text-slate-900">{{ slot.time }}</span>
              <span
                class="rounded-md border px-2 py-0.5 text-[10px] font-black uppercase tracking-wider"
                :class="{
                  'border-emerald-300 bg-emerald-100 text-emerald-700': slot.status === 'available',
                  'border-blue-300 bg-blue-100 text-blue-700': slot.status === 'booked',
                  'border-rose-300 bg-rose-100 text-rose-700': slot.status === 'blocked',
                }"
              >
                {{ slot.status === 'available' ? 'Open' : slot.status === 'booked' ? 'Booked' : 'Closed' }}
              </span>
            </div>

            <div>
              <div
                v-if="slot.status === 'booked'"
                class="flex items-center gap-1.5 text-sm font-bold text-blue-700"
              >
                <span>👤</span>
                <span class="truncate">{{ slot.bookedBy || 'Customer' }}</span>
              </div>
              <div
                v-else-if="slot.status === 'available'"
                class="text-sm font-bold text-emerald-700"
              >
                {{ slot.price || 'Available for booking' }}
              </div>
              <div
                v-else
                class="flex items-center gap-1.5 text-sm font-bold text-rose-700"
              >
                <span>🔒</span>
                <span>Click to open</span>
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>

    <!-- ══════ BOOKING DETAILS MODAL ══════ -->
    <Teleport to="body">
      <Transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="opacity-0 scale-95"
        enter-to-class="opacity-100 scale-100"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="opacity-100 scale-100"
        leave-to-class="opacity-0 scale-95"
      >
        <div
          v-if="isModalOpen && selectedSlot"
          class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-md"
          @click.self="isModalOpen = false"
        >
          <div class="relative w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl ring-1 ring-slate-200">
            <div class="flex items-center justify-between border-b border-slate-100 bg-gradient-to-r from-blue-50 to-indigo-50 px-5 py-4">
              <div class="flex items-center gap-3">
                <div class="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-lg text-white shadow-md">
                  📋
                </div>
                <div>
                  <h3 class="text-sm font-bold text-slate-900">Booking Details</h3>
                  <p class="text-xs text-slate-600">{{ selectedSlot.time }}</p>
                </div>
              </div>
              <button
                @click="isModalOpen = false"
                class="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-slate-500 ring-1 ring-slate-200 transition hover:bg-red-500 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div class="space-y-3 p-5">
              <div class="flex items-center justify-between rounded-xl bg-slate-50 p-4 ring-1 ring-slate-100">
                <span class="text-xs font-bold uppercase tracking-wide text-slate-500">Time Slot</span>
                <span class="font-mono text-sm font-bold text-emerald-700">{{ selectedSlot.time }}</span>
              </div>
              <div class="flex items-center justify-between border-b border-slate-100 pb-3">
                <span class="text-xs font-bold uppercase tracking-wide text-slate-500">Customer</span>
                <span class="text-sm font-bold text-slate-900">{{ selectedSlot.bookedBy || 'Not specified' }}</span>
              </div>
              <div class="flex items-center justify-between border-b border-slate-100 pb-3">
                <span class="text-xs font-bold uppercase tracking-wide text-slate-500">Phone</span>
                <span class="text-sm font-bold text-slate-900">{{ selectedSlot.phone || '+251 9...' }}</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-xs font-bold uppercase tracking-wide text-slate-500">Payment</span>
                <span class="rounded-md border border-emerald-300 bg-emerald-100 px-2 py-0.5 text-xs font-bold text-emerald-700">
                  {{ selectedSlot.paymentStatus || 'Paid' }}
                </span>
              </div>
            </div>

            <div class="border-t border-slate-100 p-4">
              <button
                @click="isModalOpen = false"
                class="w-full rounded-xl bg-slate-800 py-2.5 text-sm font-bold text-white transition hover:bg-slate-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>