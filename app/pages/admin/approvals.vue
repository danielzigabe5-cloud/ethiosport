
<template>
  <div class="min-h-screen space-y-8 bg-slate-50 p-4 text-slate-800 dark:bg-[#070b10] dark:text-slate-100 sm:p-6 lg:p-8">
    <!-- Header -->
    <header class="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
      <div class="flex items-center gap-4">
        <div class="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-600 text-white shadow-lg">
          <Icon name="lucide:shield-check" class="h-7 w-7" />
        </div>

        <div>
          <h1 class="text-3xl font-black tracking-tight">Venue Approvals</h1>
          <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Review partner venue submissions
          </p>
        </div>
      </div>

      <div class="flex flex-wrap items-center gap-3">
        <button
          type="button"
          @click="fetchAllVenues(true)"
          :disabled="isLoading"
          class="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold hover:bg-slate-100 disabled:opacity-50 dark:border-slate-700 dark:bg-slate-900"
        >
          <Icon
            name="lucide:refresh-cw"
            class="h-4 w-4"
            :class="{ 'animate-spin': isLoading }"
          />
          Refresh
        </button>

        <div class="rounded-xl border border-amber-200 bg-amber-50 px-4 py-2.5 text-sm font-bold text-amber-700 dark:border-amber-900 dark:bg-amber-950/30 dark:text-amber-300">
          {{ pendingVenues.length }} Pending
        </div>
      </div>
    </header>

    <!-- Error -->
    <div
      v-if="errorMessage"
      role="alert"
      class="flex items-start justify-between gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/30 dark:text-red-300"
    >
      <div>
        <p class="font-bold">Request failed</p>
        <p class="mt-1">{{ errorMessage }}</p>
      </div>

      <button
        type="button"
        aria-label="Dismiss error"
        @click="errorMessage = ''"
      >
        <Icon name="lucide:x" class="h-5 w-5" />
      </button>
    </div>

    <!-- Success -->
    <div
      v-if="successMessage"
      role="status"
      class="flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm font-semibold text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/30 dark:text-emerald-300"
    >
      <Icon name="lucide:check-circle-2" class="h-5 w-5 shrink-0" />
      {{ successMessage }}
    </div>

    <!-- Statistics -->
    <section class="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <button
        v-for="stat in summaryCards"
        :key="stat.key"
        type="button"
        @click="activeTab = stat.key"
        class="rounded-2xl border bg-white p-5 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:bg-[#0b1320]"
        :class="[
          stat.cardClass,
          activeTab === stat.key ? 'ring-2 ring-emerald-500/40' : ''
        ]"
      >
        <div class="flex items-center justify-between gap-3">
          <div>
            <p class="text-sm font-semibold text-slate-500 dark:text-slate-400">
              {{ stat.label }}
            </p>
            <p class="mt-2 text-3xl font-black">{{ stat.value }}</p>
          </div>

          <div
            class="flex h-12 w-12 items-center justify-center rounded-xl"
            :class="stat.iconClass"
          >
            <Icon :name="stat.icon" class="h-6 w-6" />
          </div>
        </div>
      </button>
    </section>

    <!-- Search and tabs -->
    <section class="space-y-4 rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-[#0b1320]">
      <div class="relative w-full">
        <Icon
          name="lucide:search"
          class="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
        />

        <input
          v-model="searchQuery"
          type="search"
          placeholder="Search venue, owner, city, sport..."
          class="w-full rounded-xl border border-slate-200 bg-white py-3 pl-12 pr-4 text-sm outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 dark:border-slate-700 dark:bg-slate-900"
        />
      </div>

      <div class="flex flex-wrap gap-2">
        <button
          v-for="tab in tabs"
          :key="tab.key"
          type="button"
          @click="activeTab = tab.key"
          class="inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold transition"
          :class="activeTab === tab.key
            ? tab.activeClass
            : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300'"
        >
          <Icon :name="tab.icon" class="h-4 w-4" />
          {{ tab.label }}
          <span class="rounded-full bg-black/10 px-2 py-0.5 text-xs dark:bg-white/10">
            {{ tab.count }}
          </span>
        </button>
      </div>
    </section>

    <!-- Loading -->
    <section
      v-if="isLoading && allVenues.length === 0"
      class="rounded-2xl border border-slate-200 bg-white py-20 text-center dark:border-slate-800 dark:bg-[#0b1320]"
    >
      <Icon name="lucide:loader-circle" class="mx-auto h-10 w-10 animate-spin text-emerald-500" />
      <p class="mt-4 font-bold">Loading venues...</p>
    </section>

    <!-- Empty -->
    <section
      v-else-if="filteredVenues.length === 0"
      class="rounded-2xl border border-slate-200 bg-white px-5 py-20 text-center dark:border-slate-800 dark:bg-[#0b1320]"
    >
      <Icon name="lucide:building-2" class="mx-auto h-12 w-12 text-slate-400" />

      <h2 class="mt-4 text-xl font-black">
        {{ searchQuery ? 'No matching venues' : 'No venues found' }}
      </h2>

      <p class="mt-2 text-sm text-slate-500 dark:text-slate-400">
        {{ emptyMessage }}
      </p>

      <button
        v-if="searchQuery"
        type="button"
        @click="searchQuery = ''"
        class="mt-4 rounded-xl bg-emerald-600 px-4 py-2 text-sm font-bold text-white"
      >
        Clear search
      </button>
    </section>

    <!-- Venue cards -->
    <section v-else class="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
      <article
        v-for="venue in filteredVenues"
        :key="venue.id"
        class="overflow-hidden rounded-2xl border bg-white shadow-sm transition hover:shadow-xl dark:bg-[#0b1320]"
        :class="borderClass(venue)"
      >
        <!-- Image -->
        <div class="relative h-48 bg-slate-200 dark:bg-slate-800">
          <img
            v-if="getVenueImage(venue)"
            :src="getVenueImage(venue)"
            :alt="venue.name || 'Sports venue'"
            class="h-full w-full object-cover"
            @error="handleImageError"
          />

          <div
            v-else
            class="flex h-full items-center justify-center bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-slate-800 dark:to-slate-900"
          >
            <Icon name="lucide:building-2" class="h-14 w-14 text-emerald-500/60" />
          </div>

          <div class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4 pt-12">
            <h2 class="truncate text-xl font-black text-white">
              {{ venue.name || 'Unnamed Venue' }}
            </h2>
            <p class="mt-1 flex items-center gap-1 text-sm text-white/80">
              <Icon name="lucide:map-pin" class="h-4 w-4" />
              {{ venue.city || venue.sub_city || 'Location not specified' }}
            </p>
          </div>

          <span
            class="absolute right-3 top-3 rounded-full px-3 py-1.5 text-xs font-black text-white"
            :class="statusBadgeClass(venue)"
          >
            {{ approvalStatusLabel(venue) }}
          </span>
        </div>

        <!-- Details -->
        <div class="space-y-4 p-5">
          <p class="line-clamp-2 min-h-10 text-sm text-slate-500 dark:text-slate-400">
            {{ venue.location || venue.address || 'No additional location details' }}
          </p>

          <div class="flex items-center gap-3 rounded-xl bg-slate-50 p-3 dark:bg-slate-800/60">
            <div class="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-600 font-black text-white">
              {{ ownerInitial(venue) }}
            </div>

            <div class="min-w-0 flex-1">
              <p class="text-xs text-slate-400">Venue owner</p>
              <p class="truncate text-sm font-bold">{{ ownerName(venue) }}</p>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-3">
            <div class="rounded-xl border border-slate-100 p-3 dark:border-slate-800">
              <p class="text-xs text-slate-400">Capacity</p>
              <p class="mt-2 text-lg font-black">{{ venue.capacity ?? '—' }}</p>
            </div>

            <div class="rounded-xl border border-slate-100 p-3 dark:border-slate-800">
              <p class="text-xs text-slate-400">Price per hour</p>
              <p class="mt-2 text-lg font-black text-emerald-600 dark:text-emerald-400">
                {{ formatPrice(venue.price_per_hour) }} ETB
              </p>
            </div>
          </div>

          <div
            v-if="venue.sport || venue.sport_type"
            class="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400"
          >
            <Icon name="lucide:trophy" class="h-4 w-4 text-emerald-500" />
            {{ sportName(venue) }}
          </div>

          <!-- Pending venues only -->
          <div
            v-if="venueApprovalStatus(venue) === 'pending'"
            class="grid grid-cols-2 gap-3 border-t border-slate-200 pt-4 dark:border-slate-800"
          >
            <button
              type="button"
              @click="approveVenue(venue)"
              :disabled="isProcessing(venue.id)"
              class="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-3 py-3 text-sm font-black text-white hover:bg-emerald-700 disabled:opacity-50"
            >
              <Icon
                :name="isProcessing(venue.id) ? 'lucide:loader-circle' : 'lucide:check-circle-2'"
                class="h-4 w-4"
                :class="{ 'animate-spin': isProcessing(venue.id) }"
              />
              {{ isProcessing(venue.id) ? 'Processing...' : 'Approve' }}
            </button>

            <button
              type="button"
              @click="rejectVenue(venue)"
              :disabled="isProcessing(venue.id)"
              class="inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-3 py-3 text-sm font-black text-white hover:bg-red-700 disabled:opacity-50"
            >
              <Icon name="lucide:x-circle" class="h-4 w-4" />
              Reject
            </button>
          </div>

          <!-- Final status -->
          <div
            v-else
            class="flex items-center gap-2 border-t border-slate-200 pt-4 text-sm font-bold dark:border-slate-800"
            :class="venueApprovalStatus(venue) === 'approved'
              ? 'text-emerald-600 dark:text-emerald-400'
              : 'text-red-600 dark:text-red-400'"
          >
            <Icon :name="statusIcon(venue)" class="h-5 w-5" />
            {{
              venueApprovalStatus(venue) === 'approved'
                ? 'This venue has been approved'
                : 'This venue has been rejected'
            }}
          </div>
        </div>
      </article>
    </section>

    <footer class="flex flex-col justify-between gap-2 border-t border-slate-200 pt-5 text-xs text-slate-400 sm:flex-row dark:border-slate-800">
      <p>CombolojoSPORT · Venue Approval Management</p>
      <p>Showing {{ filteredVenues.length }} of {{ allVenues.length }} venues</p>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useAuthStore } from '~/stores/auth'
import { useRouter } from 'vue-router'
import { useRuntimeConfig } from '#imports'

definePageMeta({
  layout: 'admin'
})

const authStore = useAuthStore()
const router = useRouter()
const config = useRuntimeConfig()

const allVenues = ref([])
const isLoading = ref(false)
const errorMessage = ref('')
const successMessage = ref('')
const activeTab = ref('pending')
const searchQuery = ref('')
const processingIds = ref([])

const configuredBase = String(
  config.public.apiBase || 'http://127.0.0.1:8000'
).replace(/\/+$/, '')

const apiBase = computed(() =>
  configuredBase.endsWith('/api')
    ? configuredBase
    : `${configuredBase}/api`
)

const storageBase = computed(() =>
  apiBase.value.replace(/\/api$/, '')
)

/*
 * All API requests use the same Laravel base URL
 * and the logged-in user's Bearer token.
 */
const apiRequest = (path, options = {}) => {
  if (!authStore.token) {
    throw new Error('Your login session has expired. Please log in again.')
  }

  return $fetch(`${apiBase.value}${path}`, {
    ...options,
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${authStore.token}`,
      ...options.headers
    }
  })
}

/*
 * Handle common Laravel response shapes:
 * [...]
 * { data: [...] }
 * { success: true, data: [...] }
 * { data: { data: [...] } }
 */
const normalizeList = (response) => {
  let result = response?.data ?? response

  if (result && !Array.isArray(result) && Array.isArray(result.data)) {
    result = result.data
  }

  return Array.isArray(result) ? result : []
}

/*
 * IMPORTANT:
 * The database approval status is authoritative.
 * Do not use is_active to override an explicit status.
 */
const venueApprovalStatus = (venue) => {
  const raw = venue?.approval_status
    ?? venue?.status
    ?? venue?.approvalStatus
    ?? ''

  const status = String(raw).toLowerCase().trim()

  if (['approved', 'active'].includes(status)) return 'approved'
  if (['rejected', 'declined'].includes(status)) return 'rejected'
  if (['pending', 'awaiting_approval', 'awaiting approval'].includes(status)) {
    return 'pending'
  }

  // Only use is_active when no status field was supplied.
  if (!status) {
    if (
      venue?.is_active === true ||
      venue?.is_active === 1 ||
      venue?.is_active === '1'
    ) {
      return 'approved'
    }
  }

  // Unknown/missing statuses should not be publicly treated as approved.
  return 'pending'
}

const approvalStatusLabel = (venue) => {
  const status = venueApprovalStatus(venue)
  return status.charAt(0).toUpperCase() + status.slice(1)
}

const statusIcon = (venue) => {
  const status = venueApprovalStatus(venue)
  if (status === 'approved') return 'lucide:check-circle-2'
  if (status === 'rejected') return 'lucide:x-circle'
  return 'lucide:clock-3'
}

const statusBadgeClass = (venue) => {
  const status = venueApprovalStatus(venue)
  if (status === 'approved') return 'bg-emerald-600'
  if (status === 'rejected') return 'bg-red-600'
  return 'bg-amber-500'
}

const borderClass = (venue) => {
  const status = venueApprovalStatus(venue)
  if (status === 'approved') return 'border-emerald-200 dark:border-emerald-900/60'
  if (status === 'rejected') return 'border-red-200 dark:border-red-900/60'
  return 'border-amber-200 dark:border-amber-900/60'
}

const approvedVenues = computed(() =>
  allVenues.value.filter(v => venueApprovalStatus(v) === 'approved')
)

const pendingVenues = computed(() =>
  allVenues.value.filter(v => venueApprovalStatus(v) === 'pending')
)

const rejectedVenues = computed(() =>
  allVenues.value.filter(v => venueApprovalStatus(v) === 'rejected')
)

const tabs = computed(() => [
  {
    key: 'all',
    label: 'All',
    icon: 'lucide:layout-grid',
    count: allVenues.value.length,
    activeClass: 'bg-emerald-600 text-white'
  },
  {
    key: 'pending',
    label: 'Pending',
    icon: 'lucide:clock-3',
    count: pendingVenues.value.length,
    activeClass: 'bg-amber-500 text-white'
  },
  {
    key: 'approved',
    label: 'Approved',
    icon: 'lucide:check-circle-2',
    count: approvedVenues.value.length,
    activeClass: 'bg-emerald-600 text-white'
  },
  {
    key: 'rejected',
    label: 'Rejected',
    icon: 'lucide:x-circle',
    count: rejectedVenues.value.length,
    activeClass: 'bg-red-600 text-white'
  }
])

const summaryCards = computed(() => [
  {
    key: 'all',
    label: 'Total Venues',
    value: allVenues.value.length,
    icon: 'lucide:building-2',
    cardClass: 'border-slate-200 dark:border-slate-800',
    iconClass: 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'
  },
  {
    key: 'approved',
    label: 'Approved Venues',
    value: approvedVenues.value.length,
    icon: 'lucide:check-circle-2',
    cardClass: 'border-emerald-200 dark:border-emerald-900/60',
    iconClass: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300'
  },
  {
    key: 'pending',
    label: 'Pending Review',
    value: pendingVenues.value.length,
    icon: 'lucide:clock-3',
    cardClass: 'border-amber-200 dark:border-amber-900/60',
    iconClass: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300'
  },
  {
    key: 'rejected',
    label: 'Rejected Venues',
    value: rejectedVenues.value.length,
    icon: 'lucide:x-circle',
    cardClass: 'border-red-200 dark:border-red-900/60',
    iconClass: 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300'
  }
])

const filteredVenues = computed(() => {
  let venues = allVenues.value

  if (activeTab.value === 'pending') venues = pendingVenues.value
  if (activeTab.value === 'approved') venues = approvedVenues.value
  if (activeTab.value === 'rejected') venues = rejectedVenues.value

  const query = searchQuery.value.trim().toLowerCase()
  if (!query) return venues

  return venues.filter((venue) => {
    const values = [
      venue.name,
      venue.city,
      venue.sub_city,
      venue.location,
      venue.address,
      venue.sport,
      venue.sport_type,
      venue.user?.name,
      venue.owner?.name,
      venue.partner?.name
    ]

    return values.some(value => {
      const text = typeof value === 'object'
        ? value?.name ?? ''
        : value ?? ''

      return String(text).toLowerCase().includes(query)
    })
  })
})

const emptyMessage = computed(() => {
  if (searchQuery.value.trim()) {
    return 'Try a different venue name, owner, city, or sport.'
  }

  const messages = {
    all: 'No venues have been submitted yet.',
    pending: 'There are no venues waiting for approval.',
    approved: 'There are no approved venues yet.',
    rejected: 'There are no rejected venues.'
  }

  return messages[activeTab.value] || 'No venues found.'
})

/*
 * GET /api/admin/venues
 * Force refresh is used after approval/rejection.
 */
const fetchAllVenues = async (force = false) => {
  if (isLoading.value && !force) return

  isLoading.value = true
  errorMessage.value = ''

  try {
    const response = await apiRequest('/admin/venues')

    if (response?.success === false) {
      throw new Error(response.message || 'Unable to load venues.')
    }

    allVenues.value = normalizeList(response)
  } catch (error) {
    console.error('Failed to fetch admin venues:', error)

    if (error?.status === 401) {
      errorMessage.value = 'Your session has expired. Please log in again.'
      await router.replace('/login')
    } else if (error?.status === 403) {
      errorMessage.value = 'Access denied. An administrator account is required.'
    } else {
      errorMessage.value =
        error?.data?.message ||
        error?.message ||
        'Failed to load venues. Check the Laravel API and try again.'
    }
  } finally {
    isLoading.value = false
  }
}

const isProcessing = (id) => processingIds.value.includes(String(id))

/*
 * POST /api/admin/approvals/{id}/approve
 * POST /api/admin/approvals/{id}/reject
 *
 * Do not show success until Laravel accepts the request
 * and the saved venue list is refreshed successfully.
 */
const updateVenueStatus = async (venue, action) => {
  const id = venue?.id

  if (id === null || id === undefined || isProcessing(id)) return

  if (venueApprovalStatus(venue) !== 'pending') {
    errorMessage.value = 'Only pending venues can be approved or rejected.'
    return
  }

  const approve = action === 'approve'

  const confirmed = window.confirm(
    approve
      ? `Approve "${venue.name || 'this venue'}"? It should then appear on the public venues page.`
      : `Reject "${venue.name || 'this venue'}"?`
  )

  if (!confirmed) return

  errorMessage.value = ''
  successMessage.value = ''
  processingIds.value = [...processingIds.value, String(id)]

  try {
    const response = await apiRequest(
      `/admin/approvals/${encodeURIComponent(id)}/${action}`,
      { method: 'POST' }
    )

    if (response?.success === false) {
      throw new Error(response.message || `Unable to ${action} this venue.`)
    }

    /*
     * Update the local list immediately so the UI responds,
     * then read the authoritative saved data from Laravel.
     */
    allVenues.value = allVenues.value.map((item) => {
      if (String(item.id) !== String(id)) return item

      return {
        ...item,
        status: approve ? 'approved' : 'rejected',
        approval_status: approve ? 'approved' : 'rejected'
      }
    })

    const previousError = errorMessage.value
    await fetchAllVenues(true)

    if (errorMessage.value) {
      // The mutation succeeded, but the reload failed.
      successMessage.value = approve
        ? 'Venue approved. Refresh failed; reload the page to verify the saved status.'
        : 'Venue rejected. Refresh failed; reload the page to verify the saved status.'
      return
    }

    const savedVenue = allVenues.value.find(
      item => String(item.id) === String(id)
    )

    if (savedVenue && venueApprovalStatus(savedVenue) !== (approve ? 'approved' : 'rejected')) {
      errorMessage.value =
        'Laravel accepted the request, but the returned venue status does not match. Check the AdminApprovalController status field.'
      return
    }

    successMessage.value = approve
      ? 'Venue approved successfully. It is now marked Approved.'
      : 'Venue rejected successfully.'

    // Approved venues disappear from the Pending tab.
    activeTab.value = approve ? 'approved' : 'rejected'
  } catch (error) {
    console.error(`Failed to ${action} venue:`, error)

    errorMessage.value =
      error?.data?.message ||
      error?.message ||
      `Failed to ${action} venue. Please try again.`
  } finally {
    processingIds.value = processingIds.value.filter(
      itemId => itemId !== String(id)
    )
  }
}

const approveVenue = (venue) => updateVenueStatus(venue, 'approve')
const rejectVenue = (venue) => updateVenueStatus(venue, 'reject')

const getVenueImage = (venue) => {
  const image = venue?.image_full_url || venue?.image_url || venue?.image

  if (!image || typeof image !== 'string') return ''

  if (/^(https?:\/\/|data:|blob:)/i.test(image)) return image

  const path = image.replace(/^\/+/, '')

  return path.startsWith('storage/')
    ? `${storageBase.value}/${path}`
    : `${storageBase.value}/storage/${path}`
}

const handleImageError = (event) => {
  // Hide broken image; the image container retains its background.
  event.target.style.display = 'none'
}

const ownerName = (venue) =>
  venue?.user?.name ||
  venue?.owner?.name ||
  venue?.partner?.name ||
  'Unknown owner'

const ownerInitial = (venue) =>
  ownerName(venue).charAt(0).toUpperCase() || 'U'

const sportName = (venue) => {
  const sport = venue?.sport || venue?.sport_type

  if (typeof sport === 'object') return sport?.name || 'Sports venue'

  return sport || 'Sports venue'
}

const formatPrice = (value) => {
  if (value === null || value === undefined || value === '') return '—'

  const amount = Number(value)

  return Number.isFinite(amount)
    ? new Intl.NumberFormat('en-ET', { maximumFractionDigits: 2 }).format(amount)
    : String(value)
}

/*
 * Resolve auth state before checking role, so an uninitialized
 * Pinia store is not immediately redirected by this page.
 */
onMounted(async () => {
  try {
    if (typeof authStore.init === 'function') {
      await authStore.init()
    }
  } catch (error) {
    console.error('Unable to initialize authentication:', error)
  }

  if (!authStore.token) {
    await router.replace('/login')
    return
  }

  if (String(authStore.user?.role || '').toLowerCase() !== 'admin') {
    await router.replace('/')
    return
  }

  await fetchAllVenues()
})
</script>
