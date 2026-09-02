<script setup>
import { ref, computed, onMounted } from 'vue'

const userToken = useCookie('auth_token')

if (!userToken.value) {
  navigateTo('/auth?redirect=/venues/my-venues')
}

useHead({ title: 'My Venues - EthioSport' })

// ============================================
// STATE
// ============================================
const venues = ref([])
const isLoading = ref(true)
const error = ref(null)
const searchQuery = ref('')
const statusFilter = ref('all')
const notification = ref(null)

// ============================================
// FETCH
// ============================================
const fetchMyVenues = async () => {
  isLoading.value = true
  error.value = null
  
  try {
    const response = await $fetch('/api/my-venues', {
      headers: { 'Authorization': `Bearer ${userToken.value}` }
    })
    venues.value = response.data?.data || []
  } catch (err) {
    error.value = err.data?.message || 'Failed to load venues'
  } finally {
    isLoading.value = false
  }
}

// ============================================
// FILTERED
// ============================================
const filteredVenues = computed(() => {
  let result = venues.value
  
  if (searchQuery.value.trim()) {
    const q = searchQuery.value.trim().toLowerCase()
    result = result.filter(v => 
      v.name.toLowerCase().includes(q) ||
      v.location.toLowerCase().includes(q)
    )
  }
  
  if (statusFilter.value !== 'all') {
    result = result.filter(v => {
      if (statusFilter.value === 'active') return v.is_active === true
      if (statusFilter.value === 'inactive') return v.is_active === false
      return true
    })
  }
  
  return result
})

// ============================================
// ACTIONS
// ============================================
const deleteVenue = async (id) => {
  if (!confirm('Delete this venue?')) return
  
  try {
    await $fetch(`/api/venues/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${userToken.value}` }
    })
    venues.value = venues.value.filter(v => v.id !== id)
    showNotification('Venue deleted', 'success')
  } catch (err) {
    showNotification(err.data?.message || 'Delete failed', 'error')
  }
}

const toggleStatus = async (venue) => {
  try {
    const response = await $fetch(`/api/venues/${venue.id}`, {
      method: 'PUT',
      body: { is_active: !venue.is_active },
      headers: { 'Authorization': `Bearer ${userToken.value}` }
    })
    if (response.success) {
      venue.is_active = !venue.is_active
      showNotification(`Venue ${venue.is_active ? 'activated' : 'deactivated'}`, 'success')
    }
  } catch (err) {
    showNotification(err.data?.message || 'Update failed', 'error')
  }
}

// ============================================
// NOTIFICATIONS
// ============================================
const showNotification = (message, type = 'info') => {
  notification.value = { message, type }
  setTimeout(() => { notification.value = null }, 5000)
}

// ============================================
// LIFECYCLE
// ============================================
onMounted(fetchMyVenues)
</script>

<template>
  <div class="min-h-screen bg-slate-50 dark:bg-[#070b10] py-8 px-4">
    <!-- Notification -->
    <div v-if="notification" class="fixed top-4 right-4 z-50 max-w-md p-4 rounded-xl shadow-lg"
      :class="[
        notification.type === 'success' ? 'bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-200' : 
        'bg-red-50 dark:bg-red-950/80 border border-red-200'
      ]">
      <div class="flex justify-between">
        <span>{{ notification.message }}</span>
        <button @click="notification = null">✕</button>
      </div>
    </div>

    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <div class="flex flex-wrap justify-between items-center gap-4 mb-8">
        <div>
          <h1 class="text-3xl font-black dark:text-white">My Venues</h1>
          <p class="text-slate-500 dark:text-slate-400">Manage your registered venues</p>
        </div>
        <NuxtLink to="/venues/create"
          class="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl flex items-center gap-2">
          ➕ Register New
        </NuxtLink>
      </div>

      <!-- Stats -->
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <div class="bg-white dark:bg-[#131c27] p-4 rounded-xl border">
          <div class="text-sm text-slate-500">Total</div>
          <div class="text-2xl font-bold">{{ venues.length }}</div>
        </div>
        <div class="bg-white dark:bg-[#131c27] p-4 rounded-xl border">
          <div class="text-sm text-slate-500">Active</div>
          <div class="text-2xl font-bold text-emerald-500">{{ venues.filter(v => v.is_active).length }}</div>
        </div>
        <div class="bg-white dark:bg-[#131c27] p-4 rounded-xl border">
          <div class="text-sm text-slate-500">Inactive</div>
          <div class="text-2xl font-bold text-amber-500">{{ venues.filter(v => !v.is_active).length }}</div>
        </div>
        <div class="bg-white dark:bg-[#131c27] p-4 rounded-xl border">
          <div class="text-sm text-slate-500">Bookings</div>
          <div class="text-2xl font-bold text-blue-500">{{ venues.reduce((sum, v) => sum + (v.bookings_count || 0), 0) }}</div>
        </div>
      </div>

      <!-- Filters -->
      <div class="flex flex-wrap gap-4 mb-6">
        <div class="flex-1 relative">
          <input v-model="searchQuery" type="text" placeholder="Search venues..."
            class="w-full bg-white dark:bg-[#131c27] border rounded-xl pl-10 pr-4 py-3 text-sm focus:ring-2 focus:ring-emerald-500" />
          <span class="absolute left-3.5 top-3.5">🔍</span>
        </div>
        <div class="flex gap-2">
          <button v-for="status in ['all', 'active', 'inactive']" :key="status"
            @click="statusFilter = status"
            class="px-4 py-2 rounded-xl text-sm font-medium transition capitalize border"
            :class="[
              statusFilter === status
                ? 'bg-emerald-500 text-slate-950 border-emerald-500'
                : 'bg-white dark:bg-[#131c27] text-slate-700 dark:text-slate-300 border-slate-200 dark:border-[#212e3e]'
            ]">
            {{ status }}
          </button>
        </div>
      </div>

      <!-- Loading -->
      <div v-if="isLoading" class="text-center py-12">
        <div class="animate-spin text-3xl">⏳</div>
        <p class="text-slate-500">Loading...</p>
      </div>

      <!-- Error -->
      <div v-else-if="error" class="text-center py-12">
        <div class="text-3xl">❌</div>
        <p class="text-red-500">{{ error }}</p>
        <button @click="fetchMyVenues" class="mt-4 px-4 py-2 bg-emerald-500 text-slate-950 rounded-xl">Try Again</button>
      </div>

      <!-- Empty -->
      <div v-else-if="venues.length === 0" class="text-center py-16 bg-white dark:bg-[#131c27] rounded-2xl border">
        <div class="text-6xl">🏟️</div>
        <h3 class="text-xl font-bold mt-4">No Venues Registered</h3>
        <p class="text-slate-500">Start by registering your first venue</p>
        <NuxtLink to="/venues/create" class="inline-block mt-6 px-6 py-3 bg-emerald-500 text-slate-950 font-bold rounded-xl">
          Register Venue
        </NuxtLink>
      </div>

      <!-- Venues Grid -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="venue in filteredVenues" :key="venue.id"
          class="bg-white dark:bg-[#131c27] rounded-2xl overflow-hidden border hover:shadow-xl transition">
          
          <div class="relative h-48 bg-slate-200 dark:bg-slate-800">
            <img :src="venue.image_url || 'https://via.placeholder.com/400x300?text=No+Image'" 
                 :alt="venue.name" class="w-full h-full object-cover" loading="lazy" />
            <span class="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold backdrop-blur-md"
              :class="venue.is_active ? 'bg-emerald-500/80 text-white' : 'bg-amber-500/80 text-white'">
              {{ venue.is_active ? 'Active' : 'Inactive' }}
            </span>
          </div>

          <div class="p-5">
            <h3 class="text-lg font-bold">{{ venue.name }}</h3>
            <p class="text-sm text-slate-500 flex items-center gap-1">📍 {{ venue.location }}</p>
            
            <div class="flex items-center gap-4 mt-3 text-sm">
              <span>👥 {{ venue.capacity }}</span>
              <span class="text-emerald-500 font-bold">{{ venue.price_per_hour }} ETB/hr</span>
            </div>

            <div class="flex flex-wrap gap-2 mt-4 pt-4 border-t">
              <button @click="toggleStatus(venue)"
                class="px-3 py-1.5 text-xs font-medium rounded-lg"
                :class="venue.is_active 
                  ? 'bg-amber-50 text-amber-600 hover:bg-amber-100'
                  : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'">
                {{ venue.is_active ? 'Deactivate' : 'Activate' }}
              </button>
              <NuxtLink :to="`/venues/${venue.id}/edit`"
                class="px-3 py-1.5 text-xs font-medium rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100">
                Edit
              </NuxtLink>
              <button @click="deleteVenue(venue.id)"
                class="px-3 py-1.5 text-xs font-medium rounded-lg bg-red-50 text-red-600 hover:bg-red-100">
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>