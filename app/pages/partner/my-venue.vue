<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import {
  Search, Plus, Eye, Pencil, Trash2, MapPin, Loader2, X,
  Calendar, Clock, RefreshCw, Check, AlertCircle, ImageIcon, Save,
  Building2
} from 'lucide-vue-next'
import { useAuthStore } from '~/stores/auth'

definePageMeta({
  layout: 'partner',
  middleware: 'auth',
})

/* ═══════════════════════════════════════════
   TYPES
   ═══════════════════════════════════════════ */
interface Venue {
  id: number | string
  name: string
  location?: string
  city?: string
  sub_city?: string
  address?: string
  sport?: string
  sport_type?: string
  sport_types?: string[] | string
  facilities?: string[] | string
  price_per_hour?: number | string
  price?: number | string
  status?: string
  is_active?: boolean
  capacity?: number
  image?: string
  image_url?: string
  image_full_url?: string
  description?: string
  opening_time?: string
  closing_time?: string
  schedule?: VenueSchedule[]
  owner_id?: number | string
  user_id?: number | string
  user?: { name?: string }
}

interface VenueSchedule {
  id?: number | string
  venue_id?: number | string
  day_of_week: string | number
  open_time: string
  close_time: string
  is_closed?: boolean
}

/* ═══════════════════════════════════════════
   SETUP
   ═══════════════════════════════════════════ */
const config = useRuntimeConfig()
const authStore = useAuthStore()

const search = ref('')
const selectedSubCity = ref('All')
const selectedSport = ref('All')

const subCities = [
  'All', 'Bole', 'Yeka', 'Kirkos', 'Arada', 'Lideta', 'Gullele',
  'Kolfe Keranio', 'Nifas Silk-Lafto', 'Addis Ketema', 'Akaki Kality',
]

const sports = [
  'All', 'Football', 'Futsal', 'Basketball', 'Volleyball', 'Athletics', 'Tennis',
]

const cities = [
  'Addis Ababa', 'Bahir Dar', 'Hawassa', 'Mekelle', 'Dire Dawa',
  'Nekemte', 'Woldiya', 'Hosaena', 'Arba Minch', 'Wonji', 'Harar', 'Sululta',
]

const sportOptions = [
  'Football', 'Athletics', 'Basketball', 'Volleyball',
  'Handball', 'Tennis', 'Golf', 'Equestrian',
  'Swimming', 'Traditional Sports', 'Futsal',
]

const facilityOptions = [
  'Changing Rooms', 'Showers', 'Parking', 'Cafeteria',
  'Equipment Rental', 'First Aid', 'Lighting',
  'Security', 'WiFi', 'Seating Area', 'Flood Lights',
  'Water', 'Rest Room',
]

const venues = ref<Venue[]>([])
const isLoading = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

/* ── Modal state ── */
const showEditModal = ref(false)
const showScheduleModal = ref(false)
const showViewModal = ref(false)
const editingVenue = ref<Venue | null>(null)
const viewingVenue = ref<Venue | null>(null)
const isSaving = ref(false)

/* ── Edit form ── */
const editForm = ref({
  name: '',
  description: '',
  location: '',
  city: 'Addis Ababa',
  sub_city: '',
  capacity: 0,
  price_per_hour: 0,
  is_active: true,
})

const editImageFile = ref<File | null>(null)
const editImagePreview = ref<string | null>(null)
const existingImageUrl = ref<string | null>(null)
const editSelectedSportTypes = ref<string[]>([])
const editSelectedFacilities = ref<string[]>([])
const editErrors = ref<Record<string, string>>({})

/* ── Schedule form ── */
const scheduleForm = ref<VenueSchedule[]>([])
const daysOfWeek = [
  { value: 1, label: 'Monday' },
  { value: 2, label: 'Tuesday' },
  { value: 3, label: 'Wednesday' },
  { value: 4, label: 'Thursday' },
  { value: 5, label: 'Friday' },
  { value: 6, label: 'Saturday' },
  { value: 0, label: 'Sunday' },
]

/* ═══════════════════════════════════════════
   API HELPERS
   ═══════════════════════════════════════════ */
const apiBase = computed(() => {
  const base = String(config.public.apiBase || 'http://127.0.0.1:8000').replace(/\/+$/, '')
  return base.endsWith('/api') ? base : `${base}/api`
})

const storageBase = computed(() => {
  const base = String(config.public.apiBase || 'http://127.0.0.1:8000').replace(/\/+$/, '')
  return base.endsWith('/api') ? base.replace(/\/api$/, '') : base
})

const getToken = () => authStore.token || useCookie('auth_token').value || ''

/* ═══════════════════════════════════════════
   FETCH PARTNER'S VENUES
   ═══════════════════════════════════════════ */
const loadVenues = async () => {
  isLoading.value = true
  errorMessage.value = ''
  try {
    const response = await $fetch<any>(`${apiBase.value}/my-venues`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
        Accept: 'application/json',
      },
    })

    const payload = response?.data ?? response
    const rows = Array.isArray(payload) ? payload : payload?.data || payload?.venues || []
    venues.value = Array.isArray(rows) ? rows : []
  } catch (error: any) {
    console.error('Failed to load venues:', error)
    errorMessage.value =
      error?.data?.message ||
      error?.response?._data?.message ||
      'Could not load your venues. Please try again.'
    venues.value = []
  } finally {
    isLoading.value = false
  }
}

/* ═══════════════════════════════════════════
   HELPERS
   ═══════════════════════════════════════════ */
const formatPrice = (v?: number | string) =>
  `${new Intl.NumberFormat('en-ET').format(Number(v) || 0)} ETB`

const getImageUrl = (venue: Venue): string | null => {
  const raw = venue.image_full_url || venue.image_url || venue.image
  if (!raw) return null
  if (raw.startsWith('http://') || raw.startsWith('https://') || raw.startsWith('data:')) return raw
  const clean = raw.replace(/^\/+/, '')
  return `${storageBase.value}/storage/${clean}`
}

const onImageError = (event: Event) => {
  (event.target as HTMLImageElement).style.display = 'none'
}

const venueSport = (venue: Venue): string => {
  const s = venue.sport || venue.sport_type || venue.sport_types
  if (Array.isArray(s)) return s.join(', ')
  return String(s || 'Sports').replace(/[\[\]"']/g, '')
}

const venueSubCity = (venue: Venue): string =>
  venue.sub_city || venue.location || venue.city || '—'

const statusLabel = (venue: Venue): string => {
  if (venue.is_active === true) return 'Active'
  if (venue.is_active === false) return 'Inactive'
  const s = String(venue.status || '').toLowerCase()
  if (s === 'active') return 'Active'
  if (s === 'pending') return 'Pending'
  if (s === 'inactive') return 'Inactive'
  return s ? s.charAt(0).toUpperCase() + s.slice(1) : 'Unknown'
}

const statusClass = (venue: Venue) => {
  const s = statusLabel(venue)
  if (s === 'Active') return 'bg-emerald-100 text-emerald-700 ring-1 ring-emerald-200'
  if (s === 'Pending') return 'bg-amber-100 text-amber-700 ring-1 ring-amber-200'
  if (s === 'Inactive') return 'bg-red-100 text-red-700 ring-1 ring-red-200'
  return 'bg-slate-100 text-slate-700 ring-1 ring-slate-200'
}

/* ═══════════════════════════════════════════
   FILTER
   ═══════════════════════════════════════════ */
const filteredVenues = computed(() => {
  const q = search.value.trim().toLowerCase()
  return venues.value.filter((venue) => {
    const matchesSearch =
      !q ||
      venue.name?.toLowerCase().includes(q) ||
      venue.address?.toLowerCase().includes(q) ||
      venueSubCity(venue).toLowerCase().includes(q)

    const matchesLocation =
      selectedSubCity.value === 'All' ||
      venueSubCity(venue) === selectedSubCity.value

    const matchesSport =
      selectedSport.value === 'All' ||
      venueSport(venue).toLowerCase().includes(selectedSport.value.toLowerCase())

    return matchesSearch && matchesLocation && matchesSport
  })
})

/* ═══════════════════════════════════════════
   VIEW VENUE
   ═══════════════════════════════════════════ */
const openView = (venue: Venue) => {
  viewingVenue.value = venue
  showViewModal.value = true
}

/* ═══════════════════════════════════════════
   EDIT VENUE
   ═══════════════════════════════════════════ */
const openEdit = (venue: Venue) => {
  editingVenue.value = venue

  const rawSports = venue.sport_types
  let sportList: string[] = []
  if (Array.isArray(rawSports)) {
    sportList = rawSports as string[]
  } else if (typeof rawSports === 'string' && rawSports.trim()) {
    sportList = rawSports.split(',').map(s => s.trim()).filter(Boolean)
  } else if (venue.sport) {
    sportList = [venue.sport]
  }

  const rawFacilities = venue.facilities
  let facilityList: string[] = []
  if (Array.isArray(rawFacilities)) {
    facilityList = rawFacilities as string[]
  } else if (typeof rawFacilities === 'string' && rawFacilities.trim()) {
    facilityList = rawFacilities.split(',').map(s => s.trim()).filter(Boolean)
  }

  editForm.value = {
    name: venue.name || '',
    description: venue.description || '',
    location: venue.location || venue.address || '',
    city: venue.city || 'Addis Ababa',
    sub_city: venue.sub_city || '',
    capacity: Number(venue.capacity ?? 0),
    price_per_hour: Number(venue.price_per_hour ?? venue.price ?? 0),
    is_active: venue.is_active !== false,
  }

  editSelectedSportTypes.value = sportList
  editSelectedFacilities.value = facilityList

  editImageFile.value = null
  editImagePreview.value = null
  existingImageUrl.value = getImageUrl(venue)

  editErrors.value = {}
  showEditModal.value = true
}

const handleEditImageUpload = (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (!file) return

  if (file.size > 2 * 1024 * 1024) {
    editErrors.value.image = 'Image size must be less than 2MB'
    return
  }
  if (!['image/jpeg', 'image/png', 'image/jpg'].includes(file.type)) {
    editErrors.value.image = 'Only JPEG, PNG, and JPG images are allowed'
    return
  }

  editImageFile.value = file
  editImagePreview.value = URL.createObjectURL(file)
  editErrors.value.image = ''
}

const handleEditImageDrop = (event: DragEvent) => {
  const file = event.dataTransfer?.files?.[0]
  if (!file) return
  handleEditImageUpload({ target: { files: [file] } } as any)
}

const removeEditImage = () => {
  editImageFile.value = null
  editImagePreview.value = null
  const input = document.getElementById('edit-image-upload') as HTMLInputElement | null
  if (input) input.value = ''
}

const validateEditForm = () => {
  const e: Record<string, string> = {}
  const f = editForm.value

  if (!f.name || f.name.length < 3) e.name = 'Venue name must be at least 3 characters'
  if (!f.location) e.location = 'Location is required'
  if (!f.city) e.city = 'City is required'
  if (f.city === 'Addis Ababa' && !f.sub_city) e.sub_city = 'Sub-city is required for Addis Ababa'
  if (!f.capacity || f.capacity < 1) e.capacity = 'Capacity must be at least 1'
  if (f.price_per_hour === null || f.price_per_hour < 0) e.price_per_hour = 'Valid price per hour is required'
  if (editSelectedSportTypes.value.length === 0) e.sportTypes = 'Please select at least one sport type'

  editErrors.value = e
  return Object.keys(e).length === 0
}

const saveEdit = async () => {
  if (!editingVenue.value) return
  if (!validateEditForm()) return

  isSaving.value = true
  errorMessage.value = ''
  successMessage.value = ''

  try {
    const fd = new FormData()
    fd.append('_method', 'PUT')
    fd.append('name', editForm.value.name)
    fd.append('description', editForm.value.description || '')
    fd.append('location', editForm.value.location)
    fd.append('city', editForm.value.city)
    if (editForm.value.sub_city) fd.append('sub_city', editForm.value.sub_city)
    fd.append('capacity', String(editForm.value.capacity))
    fd.append('price_per_hour', String(editForm.value.price_per_hour))
    fd.append('is_active', editForm.value.is_active ? '1' : '0')
    fd.append('sport_types', JSON.stringify(editSelectedSportTypes.value))
    fd.append('facilities', JSON.stringify(editSelectedFacilities.value))

    if (editImageFile.value) {
      fd.append('image', editImageFile.value)
    }

    await $fetch(`${apiBase.value}/my-venues/${editingVenue.value.id}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${getToken()}`,
        Accept: 'application/json',
      },
      body: fd,
    })

    successMessage.value = 'Venue updated successfully!'
    showEditModal.value = false
    await loadVenues()
    setTimeout(() => (successMessage.value = ''), 3000)
  } catch (error: any) {
    console.error('Failed to update venue:', error)
    const validationErrors = error?.data?.errors || error?.response?._data?.errors
    if (validationErrors) {
      const firstKey = Object.keys(validationErrors)[0]
      errorMessage.value = validationErrors[firstKey]?.[0] || 'Validation failed'
    } else {
      errorMessage.value =
        error?.data?.message ||
        error?.response?._data?.message ||
        'Could not update venue. Please try again.'
    }
  } finally {
    isSaving.value = false
  }
}

/* ═══════════════════════════════════════════
   SCHEDULE
   ═══════════════════════════════════════════ */
const openSchedule = async (venue: Venue) => {
  editingVenue.value = venue
  showScheduleModal.value = true
  scheduleForm.value = []

  try {
    const response = await $fetch<any>(`${apiBase.value}/my-venues/${venue.id}/schedule`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
        Accept: 'application/json',
      },
    })
    const rows = response?.data ?? response
    scheduleForm.value = Array.isArray(rows) ? rows : []
  } catch {
    scheduleForm.value = []
  }

  const existingDays = new Set(scheduleForm.value.map(s => Number(s.day_of_week)))
  daysOfWeek.forEach((d) => {
    if (!existingDays.has(d.value)) {
      scheduleForm.value.push({
        day_of_week: d.value,
        open_time: venue.opening_time || '06:00',
        close_time: venue.closing_time || '22:00',
        is_closed: false,
      })
    }
  })

  scheduleForm.value.sort((a, b) => Number(a.day_of_week) - Number(b.day_of_week))
}

const saveSchedule = async () => {
  if (!editingVenue.value) return
  isSaving.value = true
  errorMessage.value = ''
  successMessage.value = ''

  try {
    await $fetch(`${apiBase.value}/my-venues/${editingVenue.value.id}/schedule`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${getToken()}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: { schedule: scheduleForm.value },
    })

    successMessage.value = 'Schedule saved successfully!'
    showScheduleModal.value = false
    setTimeout(() => (successMessage.value = ''), 3000)
  } catch (error: any) {
    console.error('Failed to save schedule:', error)
    errorMessage.value =
      error?.data?.message ||
      error?.response?._data?.message ||
      'Could not save schedule. Please try again.'
  } finally {
    isSaving.value = false
  }
}

const dayLabel = (value: string | number) =>
  daysOfWeek.find(d => d.value === Number(value))?.label || 'Unknown'

/* ═══════════════════════════════════════════
   DELETE VENUE
   ═══════════════════════════════════════════ */
const deleteVenue = async (id: number | string) => {
  if (!confirm('Are you sure you want to delete this venue?')) return
  try {
    await $fetch(`${apiBase.value}/my-venues/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${getToken()}`, Accept: 'application/json' },
    })
    venues.value = venues.value.filter(v => v.id !== id)
    successMessage.value = 'Venue deleted.'
    setTimeout(() => (successMessage.value = ''), 3000)
  } catch (error: any) {
    console.error('Delete failed:', error)
    errorMessage.value = error?.data?.message || 'Could not delete venue.'
  }
}

/* ═══════════════════════════════════════════
   KEYBOARD
   ═══════════════════════════════════════════ */
const handleKeydown = (e: KeyboardEvent) => {
  if (e.key !== 'Escape') return
  showEditModal.value = false
  showScheduleModal.value = false
  showViewModal.value = false
}

onMounted(() => {
  loadVenues()
  window.addEventListener('keydown', handleKeydown)
})
onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50/40 p-4 sm:p-6 lg:p-8">
    <div class="mx-auto max-w-7xl space-y-6">

      <!-- HEADER -->
      <header class="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p class="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-600">
            <span class="relative flex h-2 w-2">
              <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
              <span class="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
            </span>
            My Sport Fields · Addis Ababa
          </p>
          <h1 class="mt-1 text-3xl font-black tracking-tight text-slate-900">My Venues</h1>
          <p class="mt-1 text-sm text-slate-600">
            Manage your sport fields — view, edit, update schedules, or remove.
          </p>
        </div>

        <div class="flex items-center gap-2">
          <button
            type="button"
            @click="loadVenues"
            :disabled="isLoading"
            class="group inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 shadow-sm transition hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700 disabled:opacity-60"
          >
            <RefreshCw :size="16" :class="isLoading ? 'animate-spin' : 'transition group-hover:rotate-180'" />
            Refresh
          </button>

          <NuxtLink
            to="/venues/create"
            class="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-emerald-500/30 transition hover:from-emerald-600 hover:to-teal-700"
          >
            <Plus :size="18" />
            Add Sport Field
          </NuxtLink>
        </div>
      </header>

      <!-- SUCCESS -->
      <Transition
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="opacity-0 -translate-y-2"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition duration-200"
        leave-to-class="opacity-0"
      >
        <div v-if="successMessage" class="flex items-center gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm font-semibold text-emerald-800 shadow-sm">
          <Check :size="18" class="flex-shrink-0" />
          {{ successMessage }}
        </div>
      </Transition>

      <!-- ERROR -->
      <div v-if="errorMessage" role="alert" class="flex items-center gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-800 shadow-sm">
        <AlertCircle :size="18" class="flex-shrink-0" />
        {{ errorMessage }}
      </div>

      <!-- FILTERS -->
      <section class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div class="relative">
            <Search class="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" :size="19" />
            <input
              v-model="search"
              placeholder="Search your sport fields..."
              class="w-full rounded-xl border border-slate-200 py-3 pl-11 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
            />
          </div>

          <select
            v-model="selectedSubCity"
            class="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
          >
            <option v-for="city in subCities" :key="city" :value="city">
              {{ city === 'All' ? 'All Sub-Cities' : city }}
            </option>
          </select>

          <select
            v-model="selectedSport"
            class="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
          >
            <option v-for="sport in sports" :key="sport" :value="sport">
              {{ sport === 'All' ? 'All Sports' : sport }}
            </option>
          </select>
        </div>
      </section>

      <!-- TABLE -->
      <section class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div class="border-b border-slate-100 p-5">
          <div class="flex items-center justify-between">
            <div>
              <h2 class="font-bold text-slate-900">My Sport Fields</h2>
              <p class="text-sm text-slate-500">{{ filteredVenues.length }} field(s) found</p>
            </div>
            <div class="flex items-center gap-2 text-sm text-slate-500">
              <Building2 :size="17" />
              Your Venues
            </div>
          </div>
        </div>

        <div v-if="isLoading && venues.length === 0" class="flex min-h-56 flex-col items-center justify-center gap-3 text-slate-500">
          <Loader2 class="animate-spin text-emerald-600" :size="28" />
          <p class="text-sm font-semibold">Loading venues…</p>
        </div>

        <div v-else-if="filteredVenues.length === 0" class="flex min-h-56 flex-col items-center justify-center gap-2 px-6 py-12 text-center">
          <div class="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100">
            <Search class="text-slate-400" :size="24" />
          </div>
          <h2 class="font-bold text-slate-800">No venues found</h2>
          <p class="text-sm text-slate-500">
            {{ venues.length === 0 ? 'Add your first venue to get started.' : 'Try another search or filter.' }}
          </p>
          <NuxtLink
            v-if="venues.length === 0"
            to="/partner/venues/create"
            class="mt-3 inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-5 py-2.5 text-sm font-bold text-white shadow-lg transition hover:bg-emerald-600"
          >
            <Plus :size="16" />
            Add Your First Venue
          </NuxtLink>
        </div>

        <div v-else class="overflow-x-auto">
          <table class="w-full min-w-[900px]">
            <thead>
              <tr class="bg-slate-50 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500">
                <th class="px-6 py-4">Sport Field</th>
                <th class="px-6 py-4">Sub-City</th>
                <th class="px-6 py-4">Sport</th>
                <th class="px-6 py-4">Price / Hour</th>
                <th class="px-6 py-4">Status</th>
                <th class="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody class="divide-y divide-slate-100">
              <tr
                v-for="venue in filteredVenues"
                :key="venue.id"
                class="transition-colors hover:bg-emerald-50/40"
              >
                <td class="px-6 py-5">
                  <div class="flex items-center gap-3">
                    <div class="flex h-11 w-11 flex-shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-emerald-100 to-teal-100 text-xl ring-1 ring-emerald-200/50">
                      <img
                        v-if="getImageUrl(venue)"
                        :src="getImageUrl(venue)!"
                        :alt="venue.name"
                        class="h-full w-full object-cover"
                        @error="onImageError"
                      />
                      <span v-else>⚽</span>
                    </div>
                    <div class="min-w-0">
                      <p class="truncate font-bold text-slate-900">{{ venue.name }}</p>
                      <p class="truncate text-xs text-slate-500">
                        {{ venue.address || 'Addis Ababa' }}
                      </p>
                    </div>
                  </div>
                </td>

                <td class="px-6 py-5 text-sm text-slate-700">
                  {{ venueSubCity(venue) }}
                </td>

                <td class="px-6 py-5">
                  <span class="inline-flex rounded-lg bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 ring-1 ring-emerald-100">
                    {{ venueSport(venue) }}
                  </span>
                </td>

                <td class="px-6 py-5">
                  <span class="inline-flex items-center rounded-lg bg-slate-50 px-3 py-1.5 text-sm font-black text-slate-800 ring-1 ring-slate-200">
                    {{ formatPrice(venue.price_per_hour ?? venue.price) }}
                  </span>
                </td>

                <td class="px-6 py-5">
                  <span
                    class="inline-flex rounded-full px-3 py-1 text-xs font-bold"
                    :class="statusClass(venue)"
                  >
                    {{ statusLabel(venue) }}
                  </span>
                </td>

                <td class="px-6 py-5">
                  <div class="flex justify-end gap-1.5">
                    <button
                      type="button"
                      @click="openView(venue)"
                      title="View"
                      class="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
                    >
                      <Eye :size="17" />
                    </button>

                    <button
                      type="button"
                      @click="openEdit(venue)"
                      title="Edit"
                      class="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition hover:bg-emerald-50 hover:text-emerald-700"
                    >
                      <Pencil :size="17" />
                    </button>

                    <button
                      type="button"
                      @click="openSchedule(venue)"
                      title="Schedule"
                      class="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition hover:bg-amber-50 hover:text-amber-700"
                    >
                      <Calendar :size="17" />
                    </button>

                    <button
                      type="button"
                      @click="deleteVenue(venue.id)"
                      title="Delete"
                      class="flex h-9 w-9 items-center justify-center rounded-lg text-red-500 transition hover:bg-red-50 hover:text-red-700"
                    >
                      <Trash2 :size="17" />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>

    <!-- ══════════════════════════════════════════════
         VIEW MODAL
         ══════════════════════════════════════════════ -->
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
          v-if="showViewModal && viewingVenue"
          class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-md"
          @click.self="showViewModal = false"
        >
          <div class="relative flex w-full max-w-2xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl shadow-emerald-900/10 ring-1 ring-slate-200">
            <div class="flex items-center justify-between border-b border-slate-100 bg-gradient-to-r from-emerald-50 to-teal-50 px-5 py-4">
              <div class="flex items-center gap-3">
                <div class="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-md">
                  <Eye :size="20" />
                </div>
                <div>
                  <h3 class="text-sm font-bold text-slate-900">{{ viewingVenue.name }}</h3>
                  <p class="text-xs text-slate-600">{{ venueSubCity(viewingVenue) }}</p>
                </div>
              </div>
              <button
                @click="showViewModal = false"
                class="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-slate-500 ring-1 ring-slate-200 transition hover:bg-red-500 hover:text-white"
              >
                <X :size="18" />
              </button>
            </div>

            <div class="max-h-[60vh] overflow-y-auto p-5">
              <div v-if="getImageUrl(viewingVenue)" class="mb-5 overflow-hidden rounded-2xl ring-1 ring-slate-200">
                <img :src="getImageUrl(viewingVenue)!" :alt="viewingVenue.name" class="w-full object-cover" />
              </div>

              <div class="grid grid-cols-2 gap-4 text-sm">
                <div class="rounded-xl bg-slate-50 p-4 ring-1 ring-slate-100">
                  <p class="text-xs font-bold uppercase tracking-wide text-slate-500">Sport</p>
                  <p class="mt-1 font-bold text-slate-900">{{ venueSport(viewingVenue) }}</p>
                </div>
                <div class="rounded-xl bg-slate-50 p-4 ring-1 ring-slate-100">
                  <p class="text-xs font-bold uppercase tracking-wide text-slate-500">Price / Hour</p>
                  <p class="mt-1 font-bold text-emerald-700">{{ formatPrice(viewingVenue.price_per_hour ?? viewingVenue.price) }}</p>
                </div>
                <div class="rounded-xl bg-slate-50 p-4 ring-1 ring-slate-100">
                  <p class="text-xs font-bold uppercase tracking-wide text-slate-500">Capacity</p>
                  <p class="mt-1 font-bold text-slate-900">{{ viewingVenue.capacity || '—' }} people</p>
                </div>
                <div class="rounded-xl bg-slate-50 p-4 ring-1 ring-slate-100">
                  <p class="text-xs font-bold uppercase tracking-wide text-slate-500">Status</p>
                  <span class="mt-1 inline-flex rounded-full px-2.5 py-0.5 text-xs font-bold" :class="statusClass(viewingVenue)">
                    {{ statusLabel(viewingVenue) }}
                  </span>
                </div>
                <div class="col-span-2 rounded-xl bg-slate-50 p-4 ring-1 ring-slate-100">
                  <p class="text-xs font-bold uppercase tracking-wide text-slate-500">Address</p>
                  <p class="mt-1 font-bold text-slate-900">{{ viewingVenue.address || 'Addis Ababa' }}</p>
                </div>
                <div v-if="viewingVenue.description" class="col-span-2 rounded-xl bg-slate-50 p-4 ring-1 ring-slate-100">
                  <p class="text-xs font-bold uppercase tracking-wide text-slate-500">Description</p>
                  <p class="mt-1 text-slate-700">{{ viewingVenue.description }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- ══════════════════════════════════════════════
         EDIT MODAL
         ══════════════════════════════════════════════ -->
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
          v-if="showEditModal && editingVenue"
          class="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-slate-900/50 p-4 backdrop-blur-md sm:items-center"
          @click.self="showEditModal = false"
        >
          <div class="relative my-8 flex w-full max-w-4xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl shadow-emerald-900/20 ring-1 ring-slate-200">
            <div class="flex items-center justify-between border-b border-slate-100 bg-gradient-to-r from-emerald-50 to-teal-50 px-5 py-4 sm:px-6">
              <div class="flex items-center gap-3">
                <div class="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-md">
                  <Pencil :size="20" />
                </div>
                <div>
                  <h3 class="text-base font-bold text-slate-900">Edit Venue</h3>
                  <p class="text-xs text-slate-600">{{ editingVenue.name }}</p>
                </div>
              </div>
              <button
                @click="showEditModal = false"
                class="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-slate-500 ring-1 ring-slate-200 transition hover:bg-red-500 hover:text-white"
              >
                <X :size="18" />
              </button>
            </div>

            <form @submit.prevent="saveEdit" class="max-h-[75vh] overflow-y-auto px-5 py-6 sm:px-6">
              <div class="space-y-8">

                <!-- BASIC -->
                <section class="rounded-2xl border border-slate-200 bg-white p-5">
                  <h4 class="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-slate-700">
                    📋 Basic Information
                  </h4>
                  <div class="space-y-4">
                    <div>
                      <label class="block text-xs font-bold uppercase tracking-wide text-slate-500 mb-1">
                        Venue Name <span class="text-red-500">*</span>
                      </label>
                      <input
                        v-model="editForm.name"
                        type="text"
                        placeholder="e.g., Sarbeet Football Field"
                        class="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                        :class="{ 'border-red-500': editErrors.name }"
                      />
                      <p v-if="editErrors.name" class="mt-1 text-xs text-red-500">{{ editErrors.name }}</p>
                    </div>

                    <div>
                      <label class="block text-xs font-bold uppercase tracking-wide text-slate-500 mb-1">
                        Description
                      </label>
                      <textarea
                        v-model="editForm.description"
                        rows="3"
                        placeholder="Describe your venue..."
                        class="w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                      ></textarea>
                    </div>
                  </div>
                </section>

                <!-- LOCATION -->
                <section class="rounded-2xl border border-slate-200 bg-white p-5">
                  <h4 class="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-slate-700">
                    📍 Location
                  </h4>
                  <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label class="block text-xs font-bold uppercase tracking-wide text-slate-500 mb-1">
                        City <span class="text-red-500">*</span>
                      </label>
                      <select
                        v-model="editForm.city"
                        class="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                        :class="{ 'border-red-500': editErrors.city }"
                      >
                        <option value="">Select city</option>
                        <option v-for="city in cities" :key="city" :value="city">{{ city }}</option>
                      </select>
                      <p v-if="editErrors.city" class="mt-1 text-xs text-red-500">{{ editErrors.city }}</p>
                    </div>

                    <div v-if="editForm.city === 'Addis Ababa'">
                      <label class="block text-xs font-bold uppercase tracking-wide text-slate-500 mb-1">
                        Sub-City <span class="text-red-500">*</span>
                      </label>
                      <select
                        v-model="editForm.sub_city"
                        class="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                        :class="{ 'border-red-500': editErrors.sub_city }"
                      >
                        <option value="">Select sub-city</option>
                        <option v-for="sub in subCities.filter(c => c !== 'All')" :key="sub" :value="sub">
                          {{ sub }}
                        </option>
                      </select>
                      <p v-if="editErrors.sub_city" class="mt-1 text-xs text-red-500">{{ editErrors.sub_city }}</p>
                    </div>

                    <div class="sm:col-span-2">
                      <label class="block text-xs font-bold uppercase tracking-wide text-slate-500 mb-1">
                        Specific Location <span class="text-red-500">*</span>
                      </label>
                      <input
                        v-model="editForm.location"
                        type="text"
                        placeholder="e.g., Near Sarbeet Church"
                        class="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                        :class="{ 'border-red-500': editErrors.location }"
                      />
                      <p v-if="editErrors.location" class="mt-1 text-xs text-red-500">{{ editErrors.location }}</p>
                    </div>
                  </div>
                </section>

                <!-- DETAILS -->
                <section class="rounded-2xl border border-slate-200 bg-white p-5">
                  <h4 class="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-slate-700">
                    ⚽ Venue Details
                  </h4>
                  <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div class="sm:col-span-2">
                      <label class="block text-xs font-bold uppercase tracking-wide text-slate-500 mb-2">
                        Sport Types <span class="text-red-500">*</span>
                      </label>
                      <div class="flex flex-wrap gap-2">
                        <label
                          v-for="sport in sportOptions"
                          :key="sport"
                          class="inline-flex cursor-pointer items-center gap-2 rounded-xl border px-4 py-2 transition-all"
                          :class="editSelectedSportTypes.includes(sport)
                            ? 'border-emerald-500 bg-emerald-50'
                            : 'border-slate-200 bg-white hover:border-emerald-200'"
                        >
                          <input
                            type="checkbox"
                            :value="sport"
                            v-model="editSelectedSportTypes"
                            class="hidden"
                          />
                          <span class="text-sm font-medium text-slate-800">{{ sport }}</span>
                        </label>
                      </div>
                      <p v-if="editErrors.sportTypes" class="mt-1 text-xs text-red-500">{{ editErrors.sportTypes }}</p>
                    </div>

                    <div>
                      <label class="block text-xs font-bold uppercase tracking-wide text-slate-500 mb-1">
                        Capacity <span class="text-red-500">*</span>
                      </label>
                      <input
                        v-model.number="editForm.capacity"
                        type="number"
                        min="1"
                        class="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                        :class="{ 'border-red-500': editErrors.capacity }"
                      />
                      <p v-if="editErrors.capacity" class="mt-1 text-xs text-red-500">{{ editErrors.capacity }}</p>
                    </div>

                    <div>
                      <label class="block text-xs font-bold uppercase tracking-wide text-slate-500 mb-1">
                        Price per Hour (ETB) <span class="text-red-500">*</span>
                      </label>
                      <input
                        v-model.number="editForm.price_per_hour"
                        type="number"
                        min="0"
                        step="50"
                        class="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                        :class="{ 'border-red-500': editErrors.price_per_hour }"
                      />
                      <p v-if="editErrors.price_per_hour" class="mt-1 text-xs text-red-500">{{ editErrors.price_per_hour }}</p>
                    </div>
                  </div>
                </section>

                <!-- FACILITIES -->
                <section class="rounded-2xl border border-slate-200 bg-white p-5">
                  <h4 class="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-slate-700">
                    🏗️ Facilities
                  </h4>
                  <div class="flex flex-wrap gap-2">
                    <label
                      v-for="facility in facilityOptions"
                      :key="facility"
                      class="inline-flex cursor-pointer items-center gap-2 rounded-xl border px-4 py-2 transition-all"
                      :class="editSelectedFacilities.includes(facility)
                        ? 'border-emerald-500 bg-emerald-50'
                        : 'border-slate-200 bg-white hover:border-emerald-200'"
                    >
                      <input
                        type="checkbox"
                        :value="facility"
                        v-model="editSelectedFacilities"
                        class="hidden"
                      />
                      <span class="text-sm font-medium text-slate-800">{{ facility }}</span>
                    </label>
                  </div>
                </section>

                <!-- IMAGE -->
                <section class="rounded-2xl border border-slate-200 bg-white p-5">
                  <h4 class="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-slate-700">
                    🖼️ Venue Image
                  </h4>
                  <div
                    class="relative rounded-2xl border-2 border-dashed border-slate-300 p-6 text-center transition-colors hover:border-emerald-500"
                    @dragover.prevent
                    @drop.prevent="handleEditImageDrop"
                  >
                    <div v-if="editImagePreview" class="relative">
                      <img :src="editImagePreview" alt="Preview" class="mx-auto max-h-64 rounded-xl object-contain" />
                      <button
                        type="button"
                        @click="removeEditImage"
                        class="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-red-500 text-sm font-bold text-white shadow-lg hover:bg-red-600"
                      >
                        ✕
                      </button>
                    </div>

                    <div v-else-if="existingImageUrl" class="space-y-3">
                      <img :src="existingImageUrl" alt="Current" class="mx-auto max-h-56 rounded-xl object-contain ring-1 ring-slate-200" />
                      <p class="text-xs text-slate-500">Current image</p>
                      <label class="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-emerald-500 bg-emerald-50 px-4 py-2 text-sm font-bold text-emerald-700 transition hover:bg-emerald-100">
                        <ImageIcon :size="15" />
                        Replace Image
                        <input
                          id="edit-image-upload"
                          type="file"
                          accept="image/jpeg,image/png,image/jpg"
                          class="hidden"
                          @change="handleEditImageUpload"
                        />
                      </label>
                    </div>

                    <div v-else class="space-y-3">
                      <div class="text-4xl">📸</div>
                      <div class="text-sm text-slate-500">Drag and drop or click to browse</div>
                      <input
                        id="edit-image-upload"
                        type="file"
                        accept="image/jpeg,image/png,image/jpg"
                        class="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                        @change="handleEditImageUpload"
                      />
                    </div>
                  </div>
                </section>

                <!-- ACTIVE TOGGLE -->
                <section class="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-5">
                  <input
                    id="venue-active"
                    v-model="editForm.is_active"
                    type="checkbox"
                    class="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                  />
                  <label for="venue-active" class="text-sm font-semibold text-slate-700">
                    Venue is active — visible to customers
                  </label>
                </section>
              </div>

              <div class="mt-6 flex flex-col-reverse justify-end gap-3 border-t border-slate-100 pt-5 sm:flex-row">
                <button
                  type="button"
                  @click="showEditModal = false"
                  class="rounded-xl border border-slate-200 bg-white px-6 py-2.5 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  :disabled="isSaving"
                  class="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-emerald-500/30 transition hover:from-emerald-600 hover:to-teal-700 disabled:opacity-60"
                >
                  <Loader2 v-if="isSaving" class="animate-spin" :size="16" />
                  <Save v-else :size="16" />
                  {{ isSaving ? 'Saving…' : 'Save Changes' }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- ══════════════════════════════════════════════
         SCHEDULE MODAL
         ══════════════════════════════════════════════ -->
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
          v-if="showScheduleModal && editingVenue"
          class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-md"
          @click.self="showScheduleModal = false"
        >
          <div class="relative flex w-full max-w-2xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl ring-1 ring-slate-200">
            <div class="flex items-center justify-between border-b border-slate-100 bg-gradient-to-r from-amber-50 to-orange-50 px-5 py-4">
              <div class="flex items-center gap-3">
                <div class="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 text-white shadow-md">
                  <Calendar :size="20" />
                </div>
                <div>
                  <h3 class="text-sm font-bold text-slate-900">Venue Schedule</h3>
                  <p class="text-xs text-slate-600">{{ editingVenue.name }}</p>
                </div>
              </div>
              <button
                @click="showScheduleModal = false"
                class="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-slate-500 ring-1 ring-slate-200 transition hover:bg-red-500 hover:text-white"
              >
                <X :size="18" />
              </button>
            </div>

            <div class="max-h-[65vh] overflow-y-auto p-5">
              <div class="space-y-3">
                <div
                  v-for="(slot, idx) in scheduleForm"
                  :key="idx"
                  class="grid grid-cols-12 items-center gap-3 rounded-xl border border-slate-200 bg-white p-3"
                >
                  <div class="col-span-3 flex items-center gap-2">
                    <Calendar :size="15" class="text-amber-600" />
                    <span class="text-sm font-bold text-slate-800">{{ dayLabel(slot.day_of_week) }}</span>
                  </div>

                  <div class="col-span-4 relative">
                    <Clock class="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" :size="14" />
                    <input
                      v-model="slot.open_time"
                      type="time"
                      :disabled="slot.is_closed"
                      class="w-full rounded-lg border border-slate-200 py-2 pl-8 pr-2 text-sm outline-none focus:border-emerald-500 disabled:bg-slate-50"
                    />
                  </div>

                  <div class="col-span-4 relative">
                    <Clock class="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" :size="14" />
                    <input
                      v-model="slot.close_time"
                      type="time"
                      :disabled="slot.is_closed"
                      class="w-full rounded-lg border border-slate-200 py-2 pl-8 pr-2 text-sm outline-none focus:border-emerald-500 disabled:bg-slate-50"
                    />
                  </div>

                  <label class="col-span-1 flex items-center justify-center">
                    <input
                      v-model="slot.is_closed"
                      type="checkbox"
                      class="h-4 w-4 rounded border-slate-300 text-red-600"
                      title="Closed"
                    />
                  </label>
                </div>
              </div>

              <div class="mt-6 flex justify-end gap-3 border-t border-slate-100 pt-4">
                <button type="button" @click="showScheduleModal = false"
                  class="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-bold text-slate-700 transition hover:bg-slate-50">
                  Cancel
                </button>
                <button type="button" @click="saveSchedule" :disabled="isSaving"
                  class="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-amber-500/30 transition hover:from-amber-600 hover:to-orange-600 disabled:opacity-60">
                  <Loader2 v-if="isSaving" class="animate-spin" :size="16" />
                  <Save v-else :size="16" />
                  {{ isSaving ? 'Saving…' : 'Save Schedule' }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>