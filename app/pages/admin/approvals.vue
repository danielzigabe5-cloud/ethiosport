<template>
  <div class="space-y-8 min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-[#070b10] dark:via-[#0a111c] dark:to-[#070b10] text-slate-800 dark:text-slate-100 p-4 sm:p-6 lg:p-8">

    <!-- Decorative background blobs -->
    <div class="fixed inset-0 overflow-hidden pointer-events-none -z-10">
      <div class="absolute -top-40 -right-40 w-96 h-96 bg-emerald-400/10 dark:bg-emerald-500/5 rounded-full blur-3xl"></div>
      <div class="absolute -bottom-40 -left-40 w-96 h-96 bg-amber-400/10 dark:bg-amber-500/5 rounded-full blur-3xl"></div>
    </div>

    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div class="flex items-center gap-4">
        <div class="h-14 w-14 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/30 ring-4 ring-white dark:ring-slate-800/60">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div>
          <h1 class="text-3xl font-black tracking-tight bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-400 bg-clip-text text-transparent">
            Approvals
          </h1>
          <p class="text-sm text-slate-500 dark:text-slate-400 mt-0.5">View and manage all venues</p>
        </div>
      </div>

      <div class="flex items-center gap-3">
        <div class="relative group">
          <div class="absolute inset-0 bg-amber-400/30 dark:bg-amber-500/20 rounded-2xl blur-md group-hover:blur-lg transition-all"></div>
          <div class="relative flex items-center gap-2 text-sm font-bold text-amber-700 dark:text-amber-300 bg-white/80 dark:bg-[#0b1320]/80 backdrop-blur-xl px-4 py-2.5 rounded-2xl border border-amber-200/60 dark:border-amber-800/60 shadow-lg">
            <span class="relative flex h-2.5 w-2.5">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500"></span>
            </span>
            {{ pendingVenues.length }} Pending
          </div>
        </div>
      </div>
    </div>

    <!-- Tabs -->
    <div class="flex flex-wrap items-center gap-2 p-1.5 bg-white/60 dark:bg-[#0b1320]/60 backdrop-blur-xl rounded-2xl border border-slate-200/60 dark:border-slate-800/60 shadow-sm w-fit">
      <button
        @click="activeTab = 'all'"
        class="relative px-5 py-2.5 text-sm font-bold rounded-xl transition-all duration-300 flex items-center gap-2"
        :class="activeTab === 'all'
          ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/30 scale-105'
          : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60'"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
        </svg>
        All
        <span class="ml-1 px-2 py-0.5 text-[10px] rounded-full" :class="activeTab === 'all' ? 'bg-white/25' : 'bg-slate-200 dark:bg-slate-700'">{{ allVenues.length }}</span>
      </button>

      <button
        @click="activeTab = 'approved'"
        class="relative px-5 py-2.5 text-sm font-bold rounded-xl transition-all duration-300 flex items-center gap-2"
        :class="activeTab === 'approved'
          ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/30 scale-105'
          : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60'"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Approved
        <span class="ml-1 px-2 py-0.5 text-[10px] rounded-full" :class="activeTab === 'approved' ? 'bg-white/25' : 'bg-slate-200 dark:bg-slate-700'">{{ approvedVenues.length }}</span>
      </button>

      <button
        @click="activeTab = 'pending'"
        class="relative px-5 py-2.5 text-sm font-bold rounded-xl transition-all duration-300 flex items-center gap-2"
        :class="activeTab === 'pending'
          ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg shadow-amber-500/30 scale-105'
          : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60'"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Pending
        <span class="ml-1 px-2 py-0.5 text-[10px] rounded-full" :class="activeTab === 'pending' ? 'bg-white/25' : 'bg-slate-200 dark:bg-slate-700'">{{ pendingVenues.length }}</span>
      </button>
    </div>

    <!-- Error Message -->
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="errorMessage" class="p-4 bg-red-50/80 dark:bg-red-950/30 backdrop-blur-xl border border-red-200/60 dark:border-red-800/60 rounded-2xl shadow-lg">
        <div class="flex items-center gap-3 text-red-700 dark:text-red-300">
          <div class="p-2 bg-red-100 dark:bg-red-900/40 rounded-xl">
            <Icon name="lucide:alert-circle" class="w-5 h-5" />
          </div>
          <span class="text-sm font-bold">{{ errorMessage }}</span>
        </div>
      </div>
    </Transition>

    <!-- Loading State -->
    <div v-if="isLoading" class="text-center py-16">
      <div class="relative inline-block">
        <div class="animate-spin w-14 h-14 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full"></div>
        <div class="absolute inset-0 flex items-center justify-center">
          <div class="w-6 h-6 bg-emerald-500 rounded-full animate-pulse"></div>
        </div>
      </div>
      <p class="mt-4 text-sm font-medium text-slate-500 dark:text-slate-400">Loading venues...</p>
    </div>

    <!-- Empty State -->
    <div v-else-if="currentVenues.length === 0" class="text-center py-20 bg-white/60 dark:bg-[#0b1320]/60 backdrop-blur-xl rounded-3xl border border-slate-200/60 dark:border-slate-800/60 shadow-lg">
      <div class="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-emerald-900/30 dark:to-teal-900/30 mb-5">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-10 h-10 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <h2 class="text-xl font-bold text-gray-900 dark:text-white">No venues found</h2>
      <p class="text-sm text-slate-500 dark:text-slate-400 mt-2">{{ emptyMessage }}</p>
    </div>

    <!-- Venues List -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      <div
        v-for="(venue, index) in currentVenues"
        :key="venue.id"
        class="group relative rounded-3xl overflow-hidden backdrop-blur-xl transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl"
        :class="venue.status === 'approved' || venue.is_active
          ? 'bg-white/80 dark:bg-[#0b1320]/80 border border-emerald-200/60 dark:border-emerald-800/40 hover:shadow-emerald-500/10'
          : 'bg-white/80 dark:bg-[#0b1320]/80 border border-amber-200/60 dark:border-amber-800/40 hover:shadow-amber-500/10'"
        :style="{ animationDelay: `${index * 50}ms` }"
      >
        <!-- Colored top accent line -->
        <div class="absolute top-0 left-0 right-0 h-1 z-10"
          :class="venue.status === 'approved' || venue.is_active
            ? 'bg-gradient-to-r from-emerald-400 to-teal-500'
            : 'bg-gradient-to-r from-amber-400 to-orange-500'"
        ></div>

        <div class="relative h-44 bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-800 dark:to-slate-900 overflow-hidden">
          <img
            v-if="venue.image"
            :src="getVenueImage(venue)"
            :alt="venue.name"
            class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div v-else class="w-full h-full flex items-center justify-center">
            <Icon name="lucide:stadium" class="w-14 h-14 text-gray-400/60" />
          </div>

          <!-- Gradient overlay -->
          <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

          <!-- Status Badge -->
          <span class="absolute top-3 right-3 px-3.5 py-1.5 rounded-full text-xs font-bold text-white shadow-lg backdrop-blur-md flex items-center gap-1.5"
            :class="venue.status === 'approved' || venue.is_active
              ? 'bg-emerald-500/90 ring-1 ring-emerald-300/50'
              : 'bg-amber-500/90 ring-1 ring-amber-300/50'"
          >
            <span class="relative flex h-2 w-2">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                :class="venue.status === 'approved' || venue.is_active ? 'bg-emerald-200' : 'bg-amber-200'"></span>
              <span class="relative inline-flex rounded-full h-2 w-2"
                :class="venue.status === 'approved' || venue.is_active ? 'bg-white' : 'bg-white'"></span>
            </span>
            {{ venue.status === 'approved' || venue.is_active ? 'Approved' : 'Pending' }}
          </span>

          <!-- City Badge -->
          <span class="absolute bottom-3 left-3 px-3 py-1.5 rounded-full text-xs font-bold bg-black/50 text-white backdrop-blur-md flex items-center gap-1.5 ring-1 ring-white/20">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {{ venue.city }}
          </span>
        </div>

        <div class="p-5">
          <h3 class="text-lg font-bold text-slate-900 dark:text-white truncate group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
            {{ venue.name }}
          </h3>
          <p class="text-sm text-slate-500 dark:text-slate-400 truncate">{{ venue.location }}</p>

          <div class="flex items-center gap-2 mt-2 text-xs text-slate-400">
            <div class="w-5 h-5 rounded-full bg-gradient-to-br from-slate-300 to-slate-400 dark:from-slate-600 dark:to-slate-700 flex items-center justify-center text-[10px] font-bold text-white">
              {{ (venue.user?.name || 'U').charAt(0).toUpperCase() }}
            </div>
            <span>Owner: {{ venue.user?.name || 'Unknown' }}</span>
          </div>

          <div class="flex items-center justify-between mt-4">
            <div class="flex items-center gap-4 text-sm">
              <span class="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                {{ venue.capacity }}
              </span>
            </div>
            <span class="font-bold text-base"
              :class="venue.status === 'approved' || venue.is_active ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'"
            >
              {{ venue.price_per_hour }} <span class="text-xs font-semibold opacity-70">ETB/hr</span>
            </span>
          </div>

          <!-- Admin Actions - Only for pending venues -->
          <div
            v-if="venue.status === 'pending' || !venue.is_active"
            class="flex gap-2.5 mt-5 pt-4 border-t border-amber-200/60 dark:border-amber-800/40"
          >
            <button
              @click="approveVenue(venue.id)"
              class="flex-1 group/btn relative px-4 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white text-sm font-bold rounded-xl transition-all duration-300 shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 flex items-center justify-center gap-2 active:scale-95"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              Approve
            </button>
            <button
              @click="rejectVenue(venue.id)"
              class="flex-1 group/btn relative px-4 py-2.5 bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white text-sm font-bold rounded-xl transition-all duration-300 shadow-lg shadow-red-500/25 hover:shadow-red-500/40 flex items-center justify-center gap-2 active:scale-95"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
              Reject
            </button>
          </div>

          <!-- Approved indicator -->
          <div
            v-else
            class="flex items-center gap-2 mt-5 pt-4 border-t border-emerald-200/60 dark:border-emerald-800/40 text-xs font-semibold text-emerald-600 dark:text-emerald-400"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Approved and active
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import { useRuntimeConfig } from '#imports'

const authStore = useAuthStore()
const router = useRouter()
const config = useRuntimeConfig()

const allVenues = ref([])
const approvedVenues = ref([])
const pendingVenues = ref([])
const isLoading = ref(false)
const errorMessage = ref('')
const activeTab = ref('all')

// Redirect if not admin
onMounted(async () => {
  if (authStore.user?.role !== 'admin') {
    router.push('/')
    return
  }
  await fetchAllVenues()
})
definePageMeta({ layout: 'admin' })

// ============================================
// FETCH ALL VENUES (Both Approved & Pending)
// ============================================
const fetchAllVenues = async () => {
  isLoading.value = true
  errorMessage.value = ''
  try {
    const response = await $fetch(`${config.public.apiBase}/admin/venues`, {
      headers: {
        'Authorization': `Bearer ${authStore.token}`
      }
    })

    if (response.success) {
      allVenues.value = response.data?.data || response.data || []

      // Separate into approved and pending
      approvedVenues.value = allVenues.value.filter(v => v.status === 'approved' || v.is_active === true)
      pendingVenues.value = allVenues.value.filter(v => v.status === 'pending' || v.is_active === false)
    }
  } catch (error) {
    console.error('Error fetching venues:', error)
    errorMessage.value = 'Failed to fetch venues. Please try again.'
  } finally {
    isLoading.value = false
  }
}

// ============================================
// COMPUTED
// ============================================
const currentVenues = computed(() => {
  if (activeTab.value === 'all') return allVenues.value
  if (activeTab.value === 'approved') return approvedVenues.value
  if (activeTab.value === 'pending') return pendingVenues.value
  return allVenues.value
})

const emptyMessage = computed(() => {
  if (activeTab.value === 'all') return 'No venues available'
  if (activeTab.value === 'approved') return 'No approved venues yet'
  if (activeTab.value === 'pending') return 'No pending venues to review'
  return ''
})

// ============================================
// APPROVE VENUE
// ============================================
const approveVenue = async (id) => {
  errorMessage.value = ''
  if (!confirm('Are you sure you want to approve this venue?')) return

  try {
    const response = await $fetch(`${config.public.apiBase}/admin/approvals/${id}/approve`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${authStore.token}`
      }
    })

    if (response.success) {
      await fetchAllVenues()
      alert('Venue approved successfully!')
    }
  } catch (error) {
    console.error('Error approving venue:', error)
    errorMessage.value = 'Failed to approve venue. Please try again.'
  }
}

// ============================================
// REJECT VENUE
// ============================================
const rejectVenue = async (id) => {
  errorMessage.value = ''
  if (!confirm('Are you sure you want to reject this venue?')) return

  try {
    const response = await $fetch(`${config.public.apiBase}/admin/approvals/${id}/reject`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${authStore.token}`
      }
    })

    if (response.success) {
      await fetchAllVenues()
      alert('Venue rejected!')
    }
  } catch (error) {
    console.error('Error rejecting venue:', error)
    errorMessage.value = 'Failed to reject venue. Please try again.'
  }
}

const getVenueImage = (venue) => {
  if (!venue) return '/placeholder.png'
  const img = venue.image_full_url || venue.image_url || venue.image
  if (!img) return 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22400%22%20height%3D%22300%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20400%20300%22%3E%3Crect%20width%3D%22400%22%20height%3D%22300%22%20fill%3D%22%23eeeeee%22%3E%3C%2Frect%3E%3Ctext%20x%3D%2250%25%22%20y%3D%2250%25%22%20fill%3D%22%23999999%22%3ENo%20Image%3C%2Ftext%3E%3C%2Fsvg%3E'
  return img.startsWith('http') ? img : `http://127.0.0.1:8000/storage/${img}`
}
</script>