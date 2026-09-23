<template>
  <div class="min-h-screen bg-slate-100 text-slate-800 pb-20 font-sans transition-colors duration-300">
    
    <!-- Notification Popup -->
    <Transition
      enter-active-class="transform transition duration-300 ease-out"
      enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
      enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
      leave-active-class="transition duration-100 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="notification"
        class="fixed top-5 right-5 z-50 max-w-sm w-full p-4 rounded-2xl shadow-xl backdrop-blur-xl border flex items-start gap-3"
        :class="{
          'bg-emerald-50 border-emerald-300 text-emerald-800': notification.type === 'success',
          'bg-rose-50 border-rose-300 text-rose-800': notification.type === 'error',
          'bg-sky-50 border-sky-300 text-sky-800': notification.type === 'info'
        }"
      >
        <div class="p-1">
          <svg v-if="notification.type === 'success'" class="w-5 h-5 fill-current" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/></svg>
          <svg v-else-if="notification.type === 'error'" class="w-5 h-5 fill-current" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/></svg>
          <svg v-else class="w-5 h-5 fill-current" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"/></svg>
        </div>
        <div class="flex-1 text-sm font-semibold pt-0.5">{{ notification.message }}</div>
        <button @click="notification = null" class="text-slate-400 hover:text-slate-600 p-1">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
        </button>
      </div>
    </Transition>

    <!-- Search Hero Section -->
    <section class="relative bg-gradient-to-b from-emerald-50 via-teal-50 to-slate-100 text-slate-800 pt-28 pb-12 px-4 sm:px-6 lg:px-8 border-b border-slate-200 overflow-hidden">
      <!-- Ambient Glow FX -->
      <div class="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-64 bg-emerald-300/30 blur-[120px] pointer-events-none rounded-full"></div>

      <div class="max-w-7xl mx-auto space-y-8 relative z-10">
        <div class="text-center sm:text-left space-y-2">
          <span class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 border border-emerald-200 text-xs font-semibold uppercase tracking-wider">
            ⚡ Quick Booking
          </span>
          <h1 class="text-3xl sm:text-5xl font-black tracking-tight text-slate-900">
            Find & Reserve <span class="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Sports Venues</span>
          </h1>
          <p class="text-slate-600 text-sm sm:text-base max-w-2xl">
            Discover premier sports facilities, pitches, and courts tailored to your game.
          </p>
        </div>

        <!-- Search Form -->
        <div class="bg-white/90 backdrop-blur-xl p-3 sm:p-5 rounded-3xl border border-slate-200 shadow-xl">
          <div class="grid gap-3" :class="selectedCity === 'Addis Ababa' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-6' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-5'">
            
            <!-- Search Input -->
            <div class="relative">
              <input
                v-model="searchQuery"
                @keyup.enter="executeSearch"
                type="text"
                placeholder="Name or location..."
                class="w-full bg-slate-50 text-slate-900 border border-slate-300 rounded-2xl pl-11 pr-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all placeholder:text-slate-400"
              />
              <svg class="w-5 h-5 absolute left-3.5 top-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
            </div>

            <!-- City -->
            <div class="relative">
              <select
                v-model="selectedCity"
                class="w-full bg-slate-50 text-slate-700 text-sm font-medium px-4 py-3.5 rounded-2xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 appearance-none cursor-pointer transition-all"
              >
                <option value="All">All Cities</option>
                <option v-for="city in cities" :key="city" :value="city">{{ city }}</option>
              </select>
              <svg class="w-4 h-4 absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
            </div>

            <!-- Sub City -->
            <div v-if="selectedCity === 'Addis Ababa'" class="relative">
              <select
                v-model="selectedSubCity"
                class="w-full bg-slate-50 text-slate-700 text-sm font-medium px-4 py-3.5 rounded-2xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 appearance-none cursor-pointer transition-all"
              >
                <option value="All">All Sub Cities</option>
                <option v-for="sub in subCities" :key="sub" :value="sub">{{ sub }}</option>
              </select>
              <svg class="w-4 h-4 absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
            </div>

            <!-- Sport -->
            <div class="relative">
              <select
                v-model="selectedSport"
                class="w-full bg-slate-50 text-slate-700 text-sm font-medium px-4 py-3.5 rounded-2xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 appearance-none cursor-pointer transition-all"
              >
                <option value="All">All Sports</option>
                <option v-for="sport in sportTypes" :key="sport" :value="sport">{{ sport }}</option>
              </select>
              <svg class="w-4 h-4 absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
            </div>

            <!-- Search Button -->
            <button
              @click="executeSearch"
              type="button"
              class="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm py-3.5 rounded-2xl shadow-lg shadow-emerald-600/20 active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
            >
              <svg class="w-5 h-5 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
              <span>Search</span>
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      <!-- Admin Management Section -->
      <div v-if="user?.role === 'admin' && (approvedVenues.length > 0 || pendingVenues.length > 0)" class="mb-10 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div class="flex items-center gap-3 mb-6 border-b border-slate-200 pb-4">
          <button @click="activeTab = 'approved'" class="px-5 py-2.5 text-xs font-bold rounded-xl transition-all duration-200 flex items-center gap-2"
            :class="activeTab === 'approved' ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/20' : 'bg-slate-100 text-slate-600 hover:text-slate-900'">
            <span>✅ Approved</span>
            <span class="px-2 py-0.5 rounded-full bg-white/30 text-[10px]">{{ approvedVenues.length }}</span>
          </button>
          <button @click="activeTab = 'pending'" class="px-5 py-2.5 text-xs font-bold rounded-xl transition-all duration-200 flex items-center gap-2"
            :class="activeTab === 'pending' ? 'bg-amber-500 text-white shadow-md shadow-amber-500/20' : 'bg-slate-100 text-slate-600 hover:text-slate-900'">
            <span>⏳ Pending</span>
            <span class="px-2 py-0.5 rounded-full bg-white/30 text-[10px]">{{ pendingVenues.length }}</span>
          </button>
        </div>

        <!-- Admin Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <div v-for="venue in (activeTab === 'approved' ? approvedVenues : pendingVenues)" :key="venue.id"
            class="bg-white border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-200"
            :class="activeTab === 'approved' ? 'border-emerald-200' : 'border-amber-200'">
            <div class="relative h-44 overflow-hidden">
              <img :src="getVenueImage(venue)" class="w-full h-full object-cover" />
              <span class="absolute top-3 right-3 px-2.5 py-1 rounded-lg text-[10px] font-extrabold uppercase tracking-wide text-white shadow-sm"
                :class="activeTab === 'approved' ? 'bg-emerald-500' : 'bg-amber-500'">
                {{ activeTab === 'approved' ? 'Approved' : 'Pending' }}
              </span>
            </div>
            <div class="p-5">
              <h3 class="font-bold text-slate-900 text-base">{{ venue.name }}</h3>
              <p class="text-xs text-slate-500 mt-1 flex items-center gap-1">
                📍 {{ venue.location }}, {{ venue.city }}
              </p>
              
              <div v-if="activeTab === 'pending'" class="flex gap-2 mt-5">
                <button @click="approveVenue(venue.id)" class="flex-1 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold rounded-xl transition-all active:scale-95">Approve</button>
                <button @click="rejectVenue(venue.id)" class="flex-1 py-2.5 bg-rose-500 hover:bg-rose-600 text-white text-xs font-bold rounded-xl transition-all active:scale-95">Reject</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- User Results Header -->
      <div class="flex justify-between items-center mb-6">
        <div class="flex items-center gap-2">
          <h2 class="text-lg font-bold text-slate-900">Available Venues</h2>
          <span class="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
            {{ venues.length }}
          </span>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="isLoading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="i in 6" :key="i" class="bg-white rounded-3xl border border-slate-200 p-4 space-y-4 animate-pulse">
          <div class="bg-slate-200 h-48 rounded-2xl"></div>
          <div class="h-4 bg-slate-200 rounded w-2/3"></div>
          <div class="h-3 bg-slate-200 rounded w-1/2"></div>
          <div class="flex justify-between items-center pt-2">
            <div class="h-6 bg-slate-200 rounded w-1/3"></div>
            <div class="h-9 bg-slate-200 rounded-xl w-24"></div>
          </div>
        </div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="text-center py-16 bg-rose-50 border border-rose-200 rounded-3xl my-6">
        <div class="text-3xl mb-2">⚠️</div>
        <p class="text-rose-600 font-semibold text-sm">{{ error }}</p>
        <button @click="fetchVenues" class="mt-4 px-4 py-2 bg-rose-500 hover:bg-rose-600 text-white rounded-xl text-xs font-bold">Try Again</button>
      </div>

      <!-- Empty State -->
      <div v-else-if="venues.length === 0" class="text-center py-20 bg-white rounded-3xl border border-slate-200 shadow-sm">
        <div class="w-16 h-16 mx-auto mb-4 bg-slate-100 rounded-2xl flex items-center justify-center text-3xl">
          🏟️
        </div>
        <h3 class="text-lg font-bold text-slate-900">No Venues Found</h3>
        <p class="text-slate-500 text-xs sm:text-sm mt-1 max-w-sm mx-auto">
          We couldn't find any venues matching your current criteria.
        </p>
        <button @click="resetFilters" class="mt-5 px-5 py-2.5 bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white border border-emerald-200 text-xs font-bold rounded-xl transition-all duration-200">
          Reset All Filters
        </button>
      </div>

      <!-- Venues Grid -->
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div 
          v-for="venue in venues" 
          :key="venue.id" 
          class="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col"
        >
          <!-- Venue Image -->
          <div class="relative h-52 overflow-hidden bg-slate-100">
            <img 
              :src="getVenueImage(venue)" 
              class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
              @error="handleImageError" 
              alt="Venue"
            />
            <div class="absolute top-3 right-3 bg-white/80 backdrop-blur-md px-2.5 py-1 rounded-xl text-xs text-amber-600 font-extrabold flex items-center gap-1 border border-slate-200 shadow-sm">
              <svg class="w-3.5 h-3.5 fill-current text-amber-500" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
              <span>{{ venue.rating || '4.8' }}</span>
            </div>
          </div>

          <!-- Card Content -->
          <div class="p-5 flex-1 flex flex-col justify-between space-y-4">
            <div class="space-y-2">
              <!-- Sports Tags -->
              <div class="flex flex-wrap gap-1.5">
                <span 
                  v-for="s in formatSportArray(venue.sport_types)" 
                  :key="s" 
                  class="text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-0.5 rounded-lg font-extrabold uppercase tracking-wide"
                >
                  {{ s }}
                </span>
              </div>

              <h3 class="text-lg font-black text-slate-900 tracking-tight group-hover:text-emerald-600 transition-colors">
                {{ venue.name }}
              </h3>
              
              <p class="text-xs text-slate-500 flex items-center gap-1">
                <svg class="w-3.5 h-3.5 text-slate-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                <span class="truncate">{{ venue.location }}, {{ venue.city }}</span>
              </p>
            </div>

            <!-- Pricing and Action -->
            <div class="pt-4 border-t border-slate-100 flex items-center justify-between">
              <div>
                <span class="text-xl font-black text-slate-900">{{ venue.price_per_hour }}</span>
                <span class="text-[11px] font-semibold text-emerald-600 ml-1">ETB</span>
                <span class="text-[10px] text-slate-400 block font-medium">per hour</span>
              </div>
              <button 
                @click="handleBooking(venue.id)" 
                class="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-extrabold rounded-2xl shadow-lg shadow-emerald-600/10 active:scale-95 transition-all duration-200 cursor-pointer"
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const userToken = useCookie('auth_token')
const user = useState('user')

// State
const venues = ref([])
const approvedVenues = ref([])
const pendingVenues = ref([])
const isLoading = ref(false)
const error = ref(null)
const searchQuery = ref('')
const selectedCity = ref('All')
const selectedSubCity = ref('All')
const selectedSport = ref('All')
const activeTab = ref('approved')
const notification = ref(null)

// Constants
const cities = ['Addis Ababa', 'Bahir Dar', 'Hawassa', 'Mekelle', 'Dire Dawa', 'Nekemte', 'Woldiya', 'Hosaena', 'Arba Minch', 'Wonji', 'Harar', 'Sululta']
const subCities = ['Bole', 'Yeka', 'Kirkos', 'Arada', 'Lideta', 'Nifas Silk-Lafto', 'Kolfe Keraniyo', 'Gullele', 'Akaky Kaliti', 'Lemi Kura']
const sportTypes = ['Football', 'Athletics', 'Basketball', 'Volleyball', 'Handball', 'Tennis', 'Golf', 'Equestrian', 'Swimming', 'Traditional Sports']

// Light theme fallback placeholder image
const placeholderSvg = 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22400%22%20height%3D%22300%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20400%20300%22%3E%3Crect%20width%3D%22400%22%20height%3D%22300%22%20fill%3D%22%23f1f5f9%22%3E%3C%2Frect%3E%3Ctext%20x%3D%2250%25%22%20y%3D%2250%25%22%20fill%3D%22%2394a3b8%22%20text-anchor%3D%22middle%22%20font-family%3D%22sans-serif%22%3ENo%20Image%3C%2Ftext%3E%3C%2Fsvg%3E'

// Helpers
const showNotification = (message, type = 'info') => {
  notification.value = { message, type }
  setTimeout(() => { notification.value = null }, 5000)
}

const getVenueImage = (venue) => {
  if (!venue) return '/placeholder.png'
  const img = venue.image_full_url || venue.image_url || venue.image
  if (!img) return placeholderSvg
  return img.startsWith('http') ? img : `http://127.0.0.1:8000/storage/${img}`
}

const handleImageError = (e) => {
  e.target.src = placeholderSvg
}

const formatSportArray = (data) => {
  if (!data) return []
  if (Array.isArray(data)) return data
  try {
    const parsed = JSON.parse(data)
    return Array.isArray(parsed) ? parsed : [parsed]
  } catch (e) {
    return [data]
  }
}

// Search
const executeSearch = () => {
  venues.value = []
  fetchVenues()
}

// Fetch Logic
const fetchVenues = async () => {
  isLoading.value = true
  error.value = null
  
  try {
    const config = useRuntimeConfig()
    const API_BASE = config.public.apiBase || 'http://127.0.0.1:8000/api'
    
    const params = new URLSearchParams()
    if (searchQuery.value?.trim()) params.append('search', searchQuery.value.trim())
    if (selectedCity.value !== 'All') params.append('city', selectedCity.value)
    if (selectedCity.value === 'Addis Ababa' && selectedSubCity.value !== 'All') params.append('sub_city', selectedSubCity.value)
    if (selectedSport.value !== 'All') params.append('sport', selectedSport.value)

    const response = await $fetch(`${API_BASE}/venues?${params.toString()}`)
    
    let rawData = []
    if (response.success && Array.isArray(response.data)) rawData = response.data
    else if (Array.isArray(response)) rawData = response
    else if (response.data) rawData = response.data

    const filtered = rawData.filter(v => {
      const isApproved = v.status === 'approved' || v.is_active == 1;

      let matchesSport = true
      if (selectedSport.value !== 'All') {
        const target = selectedSport.value.toLowerCase()
        const vSports = formatSportArray(v.sport_types || v.sport_type).map(s => String(s).toLowerCase())
        matchesSport = vSports.some(s => s === target || s.includes(target))
      }

      let matchesCity = true
      if (selectedCity.value !== 'All') {
        matchesCity = String(v.city).toLowerCase() === selectedCity.value.toLowerCase()
      }

      return isApproved && matchesSport && matchesCity
    })

    venues.value = filtered
    
    if (user.value?.role === 'admin') {
      approvedVenues.value = filtered
      pendingVenues.value = rawData.filter(v => v.status !== 'approved' && v.is_active != 1)
    }

  } catch (err) {
    console.error('❌ Error:', err)
    error.value = 'Failed to load venues. Please check your network connection.'
  } finally {
    isLoading.value = false
  }
}

// Admin Actions
const approveVenue = async (id) => {
  if (!confirm('Approve this venue?')) return
  try {
    const res = await $fetch(`${useRuntimeConfig().public.apiBase}/admin/approvals/${id}/approve`, {
      method: 'POST', headers: { 'Authorization': `Bearer ${userToken.value}` }
    })
    if (res.success) { fetchVenues(); showNotification('Venue approved successfully!', 'success') }
  } catch (err) { showNotification('Failed to approve venue.', 'error') }
}

const rejectVenue = async (id) => {
  if (!confirm('Reject this venue?')) return
  try {
    const res = await $fetch(`${useRuntimeConfig().public.apiBase}/admin/approvals/${id}/reject`, {
      method: 'POST', headers: { 'Authorization': `Bearer ${userToken.value}` }
    })
    if (res.success) { fetchVenues(); showNotification('Venue rejected.', 'info') }
  } catch (err) { showNotification('Failed to reject venue.', 'error') }
}

const handleBooking = (id) => navigateTo(userToken.value ? `/venues/${id}` : `/auth?redirect=/venues/${id}`)
const resetFilters = () => { searchQuery.value = ''; selectedCity.value = 'All'; selectedSubCity.value = 'All'; selectedSport.value = 'All'; fetchVenues(); }

onMounted(fetchVenues)
</script>