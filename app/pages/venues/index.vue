<template>
  <div class="min-h-screen bg-slate-50 dark:bg-[#070b10] pb-20">
    
    <!-- ✅ POPUP NOTIFICATION - በገፁ ላይ የሚታይ -->
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

    <!-- SEARCH HERO -->
    <section class="bg-slate-900 dark:bg-[#0b111a] text-white py-8 px-4 sm:px-6 lg:px-8 border-b border-slate-800 dark:border-[#212e3e]">
      <div class="max-w-7xl mx-auto space-y-6">
        <div>
          <h1 class="text-2xl sm:text-3xl font-black tracking-tight">
            Find Sports Venues
          </h1>
          <p class="text-slate-400 text-xs sm:text-sm mt-1">
            Find and book the best sports venues near you
          </p>
        </div>

        <!-- ✅ SEARCH BAR & FILTERS -->
        <div class="bg-slate-800/80 dark:bg-[#131c27] p-4 rounded-2xl border border-slate-700/60 dark:border-[#212e3e] shadow-xl">
          <div class="grid gap-3" :class="selectedCity === 'Addis Ababa' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-6' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-5'">
            
            <!-- ✅ Search Bar -->
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

            <!-- Reset Button -->
            <button
              @click="resetFilters"
              type="button"
              class="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-sm py-3 rounded-xl shadow-md transition-transform active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>⟳</span>
              <span>Reset</span>
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- MAIN CONTENT -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      <!-- ADMIN: Approved & Pending Venues Section -->
      <div v-if="user?.role === 'admin' && (approvedVenues.length > 0 || pendingVenues.length > 0)" class="mb-8">
        
        <!-- Tabs for Switching -->
        <div class="flex items-center gap-2 mb-4 border-b border-slate-200 dark:border-[#212e3e] pb-2">
          <button
            @click="activeTab = 'approved'"
            class="px-4 py-2 text-sm font-bold rounded-xl transition"
            :class="activeTab === 'approved' 
              ? 'bg-emerald-500 text-slate-950' 
              : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'"
          >
            ✅ Approved ({{ approvedVenues.length }})
          </button>
          <button
            @click="activeTab = 'pending'"
            class="px-4 py-2 text-sm font-bold rounded-xl transition"
            :class="activeTab === 'pending' 
              ? 'bg-amber-500 text-white' 
              : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'"
          >
            ⏳ Pending ({{ pendingVenues.length }})
          </button>
        </div>

        <!-- APPROVED VENUES TAB -->
        <div v-if="activeTab === 'approved'">
          <div v-if="approvedVenues.length === 0" class="text-center py-8">
            <p class="text-slate-500 dark:text-slate-400">No approved venues found</p>
          </div>
          <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div
              v-for="venue in approvedVenues"
              :key="venue.id"
              class="bg-emerald-50 dark:bg-emerald-950/20 border-2 border-emerald-200 dark:border-emerald-800 rounded-2xl overflow-hidden"
            >
              <div class="relative h-40 bg-slate-200 dark:bg-slate-800">
                <img
                  :src="venue.image_url || venue.image || 'https://via.placeholder.com/400x300?text=Approved'"
                  :alt="venue.name"
                  class="w-full h-full object-cover"
                  loading="lazy"
                />
                <span class="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500 text-white">
                  ✅ Approved
                </span>
                <span class="absolute bottom-3 left-3 px-3 py-1 rounded-full text-xs font-bold bg-slate-950/70 text-white">
                  {{ venue.city }}
                </span>
              </div>

              <div class="p-4">
                <h3 class="text-lg font-bold text-slate-900 dark:text-white">{{ venue.name }}</h3>
                <p class="text-sm text-slate-500 dark:text-slate-400">{{ venue.location }}</p>
                <p class="text-xs text-slate-400 mt-1">
                  Owner: {{ venue.user?.name || venue.owner?.name || 'Unknown' }}
                </p>
                <div class="flex items-center gap-4 mt-3 text-sm">
                  <span>👥 {{ venue.capacity }}</span>
                  <span class="text-emerald-500 font-bold">{{ venue.price_per_hour }} ETB/hr</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- PENDING VENUES TAB -->
        <div v-if="activeTab === 'pending'">
          <div v-if="pendingVenues.length === 0" class="text-center py-8">
            <p class="text-slate-500 dark:text-slate-400">No pending venues found</p>
          </div>
          <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div
              v-for="venue in pendingVenues"
              :key="venue.id"
              class="bg-amber-50 dark:bg-amber-950/20 border-2 border-amber-200 dark:border-amber-800 rounded-2xl overflow-hidden"
            >
              <div class="relative h-40 bg-slate-200 dark:bg-slate-800">
                <img
                  :src="venue.image_url || venue.image || 'https://via.placeholder.com/400x300?text=Pending'"
                  :alt="venue.name"
                  class="w-full h-full object-cover"
                  loading="lazy"
                />
                <span class="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold bg-amber-500 text-white">
                  ⏳ Pending
                </span>
                <span class="absolute bottom-3 left-3 px-3 py-1 rounded-full text-xs font-bold bg-slate-950/70 text-white">
                  {{ venue.city }}
                </span>
              </div>

              <div class="p-4">
                <h3 class="text-lg font-bold text-slate-900 dark:text-white">{{ venue.name }}</h3>
                <p class="text-sm text-slate-500 dark:text-slate-400">{{ venue.location }}</p>
                <p class="text-xs text-slate-400 mt-1">
                  Owner: {{ venue.user?.name || venue.owner?.name || 'Unknown' }}
                </p>
                <div class="flex items-center gap-4 mt-3 text-sm">
                  <span>👥 {{ venue.capacity }}</span>
                  <span class="text-amber-500 font-bold">{{ venue.price_per_hour }} ETB/hr</span>
                </div>
                
                <!-- Admin Actions -->
                <div class="flex gap-2 mt-4 pt-4 border-t border-amber-200 dark:border-amber-800">
                  <button
                    @click="approveVenue(venue.id)"
                    class="flex-1 px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-sm font-bold rounded-xl transition"
                  >
                    ✅ Approve
                  </button>
                  <button
                    @click="rejectVenue(venue.id)"
                    class="flex-1 px-4 py-2 bg-red-500 hover:bg-red-400 text-white text-sm font-bold rounded-xl transition"
                  >
                    ❌ Reject
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Results Header -->
      <div class="flex justify-between items-center mb-6">
        <p class="text-sm text-slate-500 dark:text-slate-400">
          <span class="font-bold text-slate-900 dark:text-white">{{ venues.length }}</span>
          venues found
        </p>
      </div>

      <!-- Loading -->
      <div v-if="isLoading" class="text-center py-16">
        <div class="animate-spin text-4xl">⏳</div>
        <p class="text-slate-500 dark:text-slate-400 mt-4">Loading venues...</p>
      </div>

      <!-- Error -->
      <div v-else-if="error" class="text-center py-16 bg-white dark:bg-[#131c27] rounded-2xl border border-slate-200 dark:border-[#212e3e]">
        <div class="text-4xl mb-4">❌</div>
        <p class="text-red-500">{{ error }}</p>
        <button
          @click="fetchVenues"
          class="mt-4 px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl"
        >
          Try Again
        </button>
      </div>

      <!-- Empty State -->
      <div v-else-if="venues.length === 0" class="text-center py-16 bg-white dark:bg-[#131c27] rounded-2xl border border-slate-200 dark:border-[#212e3e]">
        <div class="text-6xl mb-4">🏟️</div>
        <h3 class="text-xl font-bold text-slate-900 dark:text-white">No venues found</h3>
        <p class="text-slate-500 dark:text-slate-400 mt-2">
          Please adjust your filter criteria and try again
        </p>
        <button
          @click="resetFilters"
          class="mt-6 px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl transition"
        >
          Reset Filters
        </button>
      </div>

      <!-- ✅ Venues Grid -->
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="venue in venues"
          :key="venue.id"
          class="bg-white dark:bg-[#131c27] rounded-2xl overflow-hidden border border-slate-200 dark:border-[#212e3e] hover:shadow-xl transition flex flex-col group relative"
        >
          <!-- Image -->
          <div class="relative h-48 sm:h-52 md:h-56 bg-slate-200 dark:bg-slate-800 overflow-hidden">
    <img
      :src="getVenueImage(venue)"
      :alt="venue.name"
      class="w-full h-full object-cover transition duration-300"
      loading="lazy"
      @error="(e) => {
        // ምስል ካልተጫነ ነባሪ ምስል ያሳይ
        e.target.src = 'https://via.placeholder.com/400x300?text=No+Image'
      }"
    />
    
           <!-- Rating -->
    <span class="absolute top-3 right-3 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-bold text-amber-400 border border-amber-500/20 flex items-center gap-1">
      ⭐ {{ venue.rating || '4.5' }}
    </span>
  </div>

          <!-- Info -->
          <div class="p-5 flex-1 flex flex-col justify-between space-y-4">
            <div>
              <!-- Sport Type Badge -->
              <span class="text-[11px] font-bold text-emerald-500 uppercase tracking-wide bg-emerald-500/10 px-2 py-0.5 rounded-md">
                {{ Array.isArray(venue.sport_types) ? venue.sport_types[0] : 'Sports' }}
              </span>
              
              <h2 class="text-lg font-bold text-slate-900 dark:text-white mt-2">
                {{ venue.name }}
              </h2>
              
              <p class="text-slate-500 dark:text-slate-400 text-xs mt-1 flex items-center gap-1">
                📍 {{ venue.location }}
              </p>
              
              <p class="text-slate-500 dark:text-slate-400 text-xs flex items-center gap-1">
                🏙️ {{ venue.city }} {{ venue.sub_city ? `- ${venue.sub_city}` : '' }}
              </p>
            </div>

            <!-- Bottom -->
            <div class="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-[#212e3e]">
              <div>
                <span class="text-xs text-slate-400 block">Base Price</span>
                <span class="text-base font-extrabold text-slate-900 dark:text-white">
                  {{ venue.price_per_hour }} ETB
                </span>
                <span class="text-[10px] text-slate-500 dark:text-slate-400">/hour</span>
              </div>

              <button
                @click="handleBooking(venue.id)"
                class="px-4 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold rounded-xl shadow-md transition flex items-center gap-1 cursor-pointer"
              >
                <span>Book Now</span>
                <span>→</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const userToken = useCookie('auth_token')
const user = useState('user')

// ============================================
// STATE
// ============================================
const venues = ref([])
const approvedVenues = ref([])
const pendingVenues = ref([])
const isLoading = ref(true)
const error = ref(null)
const searchQuery = ref('')
const selectedCity = ref('All')
const selectedSubCity = ref('All')
const selectedSport = ref('All')
const maxPrice = ref(2000)
const sortBy = ref('rating')
const activeTab = ref('approved')

// ✅ Notification
const notification = ref(null)

const showNotification = (message, type = 'info') => {
  notification.value = { message, type }
  setTimeout(() => {
    notification.value = null
  }, 5000)
}

// ============================================
// FILTER OPTIONS
// ============================================
const cities = [
  'Addis Ababa', 'Bahir Dar', 'Hawassa', 'Mekelle',
  'Dire Dawa', 'Nekemte', 'Woldiya', 'Hosaena',
  'Arba Minch', 'Wonji', 'Harar', 'Sululta'
]

const subCities = [
  'Bole', 'Yeka', 'Kirkos', 'Arada', 'Lideta',
  'Nifas Silk-Lafto', 'Kolfe Keraniyo', 'Gullele',
  'Akaky Kaliti', 'Lemi Kura'
]

const sportTypes = [
  'Football', 'Athletics', 'Basketball', 'Volleyball',
  'Handball', 'Tennis', 'Golf', 'Equestrian',
  'Swimming', 'Traditional Sports'
]

// ============================================
// READ QUERY PARAMS
// ============================================
const initializeFiltersFromQuery = () => {
  const query = route.query
  
  if (query.city) selectedCity.value = query.city
  if (query.sport) selectedSport.value = query.sport
  if (query.search) searchQuery.value = query.search
}

// ============================================
// FETCH VENUES
// ============================================
const fetchVenues = async () => {
  isLoading.value = true
  error.value = null
  
  try {
    const config = useRuntimeConfig()
    const API_BASE = config.public.apiBase || 'http://127.0.0.1:8000/api'
    
    const params = new URLSearchParams()
    
    if (selectedCity.value !== 'All' && selectedCity.value) {
      params.append('city', selectedCity.value)
    }
    
    if (selectedCity.value === 'Addis Ababa' && selectedSubCity.value !== 'All' && selectedSubCity.value) {
      params.append('sub_city', selectedSubCity.value)
    }
    
    if (selectedSport.value !== 'All' && selectedSport.value) {
      params.append('sport', selectedSport.value)
    }
    
    if (maxPrice.value > 0) {
      params.append('max_price', maxPrice.value.toString())
    }
    
    if (searchQuery.value && searchQuery.value.trim()) {
      params.append('search', searchQuery.value.trim())
    }
    
    if (sortBy.value) {
      params.append('sort_by', sortBy.value)
    }
    
    const response = await $fetch(`${API_BASE}/venues?${params.toString()}`)
    
    let allVenues = []
    
    if (response.success && Array.isArray(response.data)) {
      allVenues = response.data
    }
    
    // ✅ Only approved venues
    venues.value = allVenues.filter(venue => 
      venue.is_active === true && venue.status === 'approved'
    )
    
    // ✅ Admin - separate approved and pending
    if (user.value?.role === 'admin') {
      approvedVenues.value = allVenues.filter(venue => 
        venue.is_active === true && venue.status === 'approved'
      )
      pendingVenues.value = allVenues.filter(venue => 
        venue.status === 'pending' || venue.is_active === false
      )
    }
    
  } catch (err) {
    console.error('Error fetching venues:', err)
    error.value = err.message || 'Failed to load venues'
    venues.value = []
  } finally {
    isLoading.value = false
  }
}
const getVenueImage = (venue) => {
  if (!venue) {
    return 'https://via.placeholder.com/400x300?text=No+Image'
  }
  
  // ✅ በመጀመሪያ ከBackend የመጣውን ሙሉ URL ይፈትሹ
  if (venue.image_full_url) {
    return venue.image_full_url
  }
  
  // ✅ ወይም የBackend አቀራረብ የመጣውን image_url
  if (venue.image_url) {
    return venue.image_url
  }
  
  // ✅ ወይም የተከማቸ ምስል ከሆነ
  if (venue.image) {
    // ሙሉ URL ከሆነ
    if (venue.image.startsWith('http')) {
      return venue.image
    }
    // የተከማቸ ምስል ከሆነ - Backend አድራሻ ይጠቀሙ
    const apiBase = useRuntimeConfig().public.apiBase || 'http://127.0.0.1:8000/api'
    const baseUrl = apiBase.replace('/api', '')
    return `${baseUrl}/storage/${venue.image}`
  }
  
  // ምንም ከሌለ ነባሪ
  return 'https://via.placeholder.com/400x300?text=No+Image'
}


// ============================================
// ADMIN - APPROVE VENUE
// ============================================
const approveVenue = async (id) => {
  if (!confirm('Approve this venue?')) return
  
  try {
    const config = useRuntimeConfig()
    const API_BASE = config.public.apiBase || 'http://127.0.0.1:8000/api'
    
    const response = await $fetch(`${API_BASE}/admin/approvals/${id}/approve`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${userToken.value}`
      }
    })
    
    if (response.success) {
      await fetchVenues()
      showNotification('Venue approved successfully!', 'success')
    }
  } catch (err) {
    console.error('Approval error:', err)
    showNotification('Failed to approve venue', 'error')
  }
}

// ============================================
// ADMIN - REJECT VENUE
// ============================================
const rejectVenue = async (id) => {
  if (!confirm('Reject this venue?')) return
  
  try {
    const config = useRuntimeConfig()
    const API_BASE = config.public.apiBase || 'http://127.0.0.1:8000/api'
    
    const response = await $fetch(`${API_BASE}/admin/approvals/${id}/reject`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${userToken.value}`
      }
    })
    
    if (response.success) {
      await fetchVenues()
      showNotification('Venue rejected', 'info')
    }
  } catch (err) {
    console.error('Reject error:', err)
    showNotification('Failed to reject venue', 'error')
  }
}

// ============================================
// BOOKING NAVIGATION
// ============================================
const handleBooking = (venueId) => {
  if (!userToken.value) {
    return navigateTo(`/auth?redirect=/venues/${venueId}`)
  }
  return navigateTo(`/venues/${venueId}`)
}

// ============================================
// RESET FILTERS
// ============================================
const resetFilters = () => {
  searchQuery.value = ''
  selectedCity.value = 'All'
  selectedSubCity.value = 'All'
  selectedSport.value = 'All'
  maxPrice.value = 2000
  sortBy.value = 'rating'
  fetchVenues()
}

// ============================================
// WATCHERS - Search bar updates automatically
// ============================================
watch([selectedCity, selectedSubCity, selectedSport, maxPrice, sortBy, searchQuery], () => {
  fetchVenues()
})

// ============================================
// LIFECYCLE
// ============================================
onMounted(() => {
  initializeFiltersFromQuery()
  fetchVenues()
})
</script>