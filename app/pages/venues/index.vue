<template>
  <div class="min-h-screen bg-slate-50 dark:bg-[#070b10] pb-20">
    
    <!-- Notification Popup -->
    <div
      v-if="notification"
      class="fixed top-4 right-4 z-50 max-w-md w-full p-4 rounded-xl shadow-lg transition-all duration-300"
      :class="{
        'bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-800': notification.type === 'success',
        'bg-red-50 dark:bg-red-950/80 border border-red-200 dark:border-red-800': notification.type === 'error',
        'bg-blue-50 dark:bg-blue-950/80 border border-blue-200 dark:border-blue-800': notification.type === 'info'
      }"
    >
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2">
          <span class="text-xl">{{ notification.type === 'success' ? '✅' : notification.type === 'error' ? '❌' : 'ℹ️' }}</span>
          <span class="text-sm font-medium">{{ notification.message }}</span>
        </div>
        <button @click="notification = null" class="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
          ✕
        </button>
      </div>
    </div>

    <!-- Search Hero Section -->
    <section class="bg-slate-900 dark:bg-[#0b111a] text-white py-8 px-4 sm:px-6 lg:px-8 border-b border-slate-800 dark:border-[#212e3e]">
      <div class="max-w-7xl mx-auto space-y-6 mt-20">
        <div>
          <h1 class="text-2xl sm:text-3xl font-black tracking-tight">
            Find Sports Venues
          </h1>
          <p class="text-slate-400 text-xs sm:text-sm mt-1">
            Find and book the best sports venues near you
          </p>
        </div>

        <!-- Search Form -->
        <div class="bg-slate-800/80 dark:bg-[#131c27] p-4 rounded-2xl border border-slate-700/60 dark:border-[#212e3e] shadow-xl">
          <div class="grid gap-3" :class="selectedCity === 'Addis Ababa' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-6' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-5'">
            
            <!-- Search Input -->
            <div class="relative">
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Search by name or location..."
                class="w-full bg-slate-900/90 dark:bg-[#0b111a] text-white border border-slate-700 dark:border-[#212e3e] rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <span class="absolute left-3.5 top-3.5 text-slate-400">🔍</span>
            </div>

            <!-- City -->
            <div class="relative">
              <select
                v-model="selectedCity"
                class="w-full bg-slate-900/90 dark:bg-[#0b111a] text-slate-200 text-sm font-medium px-4 py-3 rounded-xl border border-slate-700 dark:border-[#212e3e] focus:outline-none focus:ring-2 focus:ring-emerald-500 appearance-none cursor-pointer"
              >
                <option value="All">All Cities</option>
                <option v-for="city in cities" :key="city" :value="city">{{ city }}</option>
              </select>
              <span class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">▼</span>
            </div>

            <!-- Sub City (Addis Ababa only) -->
            <div v-if="selectedCity === 'Addis Ababa'" class="relative">
              <select
                v-model="selectedSubCity"
                class="w-full bg-slate-900/90 dark:bg-[#0b111a] text-slate-200 text-sm font-medium px-4 py-3 rounded-xl border border-slate-700 dark:border-[#212e3e] focus:outline-none focus:ring-2 focus:ring-emerald-500 appearance-none cursor-pointer"
              >
                <option value="All">All Sub Cities</option>
                <option v-for="sub in subCities" :key="sub" :value="sub">{{ sub }}</option>
              </select>
              <span class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">▼</span>
            </div>

            <!-- Sport -->
            <div class="relative">
              <select
                v-model="selectedSport"
                class="w-full bg-slate-900/90 dark:bg-[#0b111a] text-slate-200 text-sm font-medium px-4 py-3 rounded-xl border border-slate-700 dark:border-[#212e3e] focus:outline-none focus:ring-2 focus:ring-emerald-500 appearance-none cursor-pointer"
              >
                <option value="All">All Sports</option>
                <option v-for="sport in sportTypes" :key="sport" :value="sport">{{ sport }}</option>
              </select>
              <span class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">▼</span>
            </div>

            <!-- Search Button -->
            <button
              @click="executeSearch"
              type="button"
              class="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-sm py-3 rounded-xl shadow-md transition-transform active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>🔍</span>
              <span>Search</span>
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      <!-- Admin Section -->
      <div v-if="user?.role === 'admin' && (approvedVenues.length > 0 || pendingVenues.length > 0)" class="mb-8">
        <div class="flex items-center gap-2 mb-4 border-b border-slate-200 dark:border-[#212e3e] pb-2">
          <button @click="activeTab = 'approved'" class="px-4 py-2 text-sm font-bold rounded-xl transition"
            :class="activeTab === 'approved' ? 'bg-emerald-500 text-slate-950' : 'text-slate-500 dark:text-slate-400'">
            ✅ Approved ({{ approvedVenues.length }})
          </button>
          <button @click="activeTab = 'pending'" class="px-4 py-2 text-sm font-bold rounded-xl transition"
            :class="activeTab === 'pending' ? 'bg-amber-500 text-white' : 'text-slate-500 dark:text-slate-400'">
            ⏳ Pending ({{ pendingVenues.length }})
          </button>
        </div>

        <!-- Admin Venues Display -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div v-for="venue in (activeTab === 'approved' ? approvedVenues : pendingVenues)" :key="venue.id"
            class="bg-white dark:bg-[#131c27] border rounded-2xl overflow-hidden shadow-sm"
            :class="activeTab === 'approved' ? 'border-emerald-200 dark:border-emerald-800' : 'border-amber-200 dark:border-amber-800'">
            <div class="relative h-40">
              <img :src="getVenueImage(venue)" class="w-full h-full object-cover" />
              <span class="absolute top-2 right-2 px-2 py-1 rounded text-[10px] font-bold text-white"
                :class="activeTab === 'approved' ? 'bg-emerald-500' : 'bg-amber-500'">
                {{ activeTab === 'approved' ? 'Approved' : 'Pending' }}
              </span>
            </div>
            <div class="p-4">
              <h3 class="font-bold text-slate-900 dark:text-white">{{ venue.name }}</h3>
              <p class="text-xs text-slate-500">{{ venue.location }} - {{ venue.city }}</p>
              
              <div v-if="activeTab === 'pending'" class="flex gap-2 mt-4">
                <button @click="approveVenue(venue.id)" class="flex-1 py-2 bg-emerald-500 text-xs font-bold rounded-lg">Approve</button>
                <button @click="rejectVenue(venue.id)" class="flex-1 py-2 bg-red-500 text-white text-xs font-bold rounded-lg">Reject</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- User Results Header -->
      <div class="flex justify-between items-center mb-6">
        <p class="text-sm text-slate-500">
          <span class="font-bold text-slate-900 dark:text-white">{{ venues.length }}</span> venues found
        </p>
      </div>

      <!-- Loading / Error / Empty States -->
      <div v-if="isLoading" class="text-center py-20 animate-pulse text-slate-400">Loading Venues...</div>
      <div v-else-if="error" class="text-center py-20 text-red-500">{{ error }}</div>
      <div v-else-if="venues.length === 0" class="text-center py-20">
        <div class="text-5xl mb-4">🏟️</div>
        <h3 class="text-lg font-bold dark:text-white">No Specific Venues Found</h3>
        <p class="text-slate-500 text-sm">Try adjusting your filters.</p>
        <button @click="resetFilters" class="mt-4 text-emerald-500 font-bold">Reset All Filters</button>
      </div>

      <!-- Venues Grid -->
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="venue in venues" :key="venue.id" class="bg-white dark:bg-[#131c27] rounded-2xl overflow-hidden border border-slate-200 dark:border-[#212e3e] group">
          <div class="relative h-52 overflow-hidden">
            <img :src="getVenueImage(venue)" class="w-full h-full object-cover transition-transform group-hover:scale-105" @error="handleImageError" />
            <div class="absolute top-3 right-3 bg-black/50 backdrop-blur-sm px-2 py-1 rounded-lg text-xs text-amber-400 font-bold">
              ⭐ {{ venue.rating || '4.8' }}
            </div>
          </div>
          <div class="p-5">
            <div class="flex flex-wrap gap-1 mb-2">
              <!-- ✅ Displaying Sport Types correctly from the array -->
              <span v-for="s in formatSportArray(venue.sport_types)" :key="s" 
                class="text-[10px] bg-emerald-500/10 text-emerald-500 px-2 py-0.5 rounded font-bold uppercase">
                {{ s }}
              </span>
            </div>
            <h2 class="text-lg font-bold text-slate-900 dark:text-white">{{ venue.name }}</h2>
            <p class="text-xs text-slate-500 mt-1">📍 {{ venue.location }}, {{ venue.city }}</p>
            
            <div class="mt-4 flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
              <div>
                <span class="text-lg font-black dark:text-white text-black">{{ venue.price_per_hour }} ETB</span>
                <span class="text-[10px] text-slate-500">/hr</span>
              </div>
              <button @click="handleBooking(venue.id)" class="px-4 py-2 bg-emerald-500 text-slate-950 text-xs font-bold rounded-xl">Book Now</button>
            </div>
          </div>
        </div>
      </div>
    </div>
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

// Helpers
const showNotification = (message, type = 'info') => {
  notification.value = { message, type }
  setTimeout(() => { notification.value = null }, 5000)
}

const getVenueImage = (venue) => {
  if (!venue) return '/placeholder.png'
  const img = venue.image_full_url || venue.image_url || venue.image
  if (!img) return 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22400%22%20height%3D%22300%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20400%20300%22%3E%3Crect%20width%3D%22400%22%20height%3D%22300%22%20fill%3D%22%23eeeeee%22%3E%3C%2Frect%3E%3Ctext%20x%3D%2250%25%22%20y%3D%2250%25%22%20fill%3D%22%23999999%22%3ENo%20Image%3C/text%3E%3C/svg%3E'
  return img.startsWith('http') ? img : `http://127.0.0.1:8000/storage/${img}`
}

// ✅ አዲስ የተጨመረ Helper: በምዝገባ ወቅት የተላከውን JSON Array በትክክል እንዲያነብ
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

// ✅ Search Function
const executeSearch = () => {
  venues.value = []
  fetchVenues()
}

// ✅ Fetch Venues Logic (Strict Specific Filter)
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

    console.log('📡 Requesting:', params.toString())
    const response = await $fetch(`${API_BASE}/venues?${params.toString()}`)
    
    let rawData = []
    if (response.success && Array.isArray(response.data)) rawData = response.data
    else if (Array.isArray(response)) rawData = response
    else if (response.data) rawData = response.data

    // 🔍 STRICTOR FRONTEND FILTER (Specifically for JSON sport_types)
    const filtered = rawData.filter(v => {
      // 1. Status Check
      const isApproved = v.status === 'approved' || v.is_active == 1;

      // 2. Sport Matching (Handles Array stored in DB)
      let matchesSport = true
      if (selectedSport.value !== 'All') {
        const target = selectedSport.value.toLowerCase()
        const vSports = formatSportArray(v.sport_types || v.sport_type).map(s => String(s).toLowerCase())
        matchesSport = vSports.some(s => s === target || s.includes(target))
      }

      // 3. City Matching
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
    error.value = 'Failed to load venues.'
  } finally {
    isLoading.value = false
  }
}

// Admin Actions
const approveVenue = async (id) => {
  if (!confirm('Approve?')) return
  try {
    const res = await $fetch(`${useRuntimeConfig().public.apiBase}/admin/approvals/${id}/approve`, {
      method: 'POST', headers: { 'Authorization': `Bearer ${userToken.value}` }
    })
    if (res.success) { fetchVenues(); showNotification('Approved!', 'success') }
  } catch (err) { showNotification('Error', 'error') }
}

const rejectVenue = async (id) => {
  if (!confirm('Reject?')) return
  try {
    const res = await $fetch(`${useRuntimeConfig().public.apiBase}/admin/approvals/${id}/reject`, {
      method: 'POST', headers: { 'Authorization': `Bearer ${userToken.value}` }
    })
    if (res.success) { fetchVenues(); showNotification('Rejected', 'info') }
  } catch (err) { showNotification('Error', 'error') }
}

const handleBooking = (id) => navigateTo(userToken.value ? `/venues/${id}` : `/auth?redirect=/venues/${id}`)
const resetFilters = () => { searchQuery.value = ''; selectedCity.value = 'All'; selectedSport.value = 'All'; fetchVenues(); }

onMounted(fetchVenues)
</script>