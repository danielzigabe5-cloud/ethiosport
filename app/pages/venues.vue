<script setup>
import { ref, computed, watch } from 'vue'

// Page Title & Meta (SEO)
useHead({
  title: 'Venues - EthioSport',
  meta: [
    { name: 'description', content: 'የስፖርት ሜዳዎችን ይፈልጉ፣ ያወዳድሩ እና በቀላሉ ያዙ።' }
  ]
})

// Auth State Check
const userToken = useCookie('auth_token')

// Book Now Navigation Logic
const handleBooking = (venueId) => {
  if (!userToken.value) {
    return navigateTo(`/login?redirect=/venues/${venueId}`)
  }
  return navigateTo(`/venues/${venueId}`)
}

// -------------------------------------------------------------
// FILTER OPTIONS & DATA
// -------------------------------------------------------------
const cities = [
  'Addis Ababa',
  'Bahir Dar',
  'Hawassa',
  'Mekelle',
  'Dire Dawa',
  'Nekemte',
  'Woldiya',
  'Hosaena',
  'Arba Minch',
  'Wonji',
  'Harar',
  'Sululta'
]

const addisSubCitiesWithVenues = [
  'Bole',
  'Yeka',
  'Kirkos',
  'Arada',
  'Lideta',
  'Nifas Silk-Lafto',
  'Kolfe Keraniyo',
  'Gullele',
  'Akaky Kaliti',
  'Lemi Kura'
]

const allSportsOptions = [
  'Football',
  'Athletics',
  'Basketball',
  'Volleyball',
  'Handball',
  'Tennis',
  'Golf',
  'Equestrian',
  'Swimming',
  'Traditional Sports'
]

// Filter Input States
const searchQuery = ref('')
const selectedCity = ref('All')
const selectedSubCity = ref('All')
const selectedSport = ref('All')
const maxPrice = ref(2000)
const sortBy = ref('rating')
const isMobileFilterOpen = ref(false)

// Sample Venues Data
const venues = ref([
  {
    id: 1,
    name: 'ሳርቤት ፉትሳል ሜዳ',
    sport: 'Football',
    city: 'Addis Ababa',
    subCity: 'Nifas Silk-Lafto',
    location: 'ሳርቤት፣ አዲስ አበባ',
    rating: 4.8,
    reviewsCount: 124,
    price: 800,
    distance: 2.5,
    images: [
      'https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1529900748604-07564a03e7a6?q=80&w=600&auto=format&fit=crop'
    ],
    currentImageIndex: 0
  },
  {
    id: 2,
    name: 'ቦሌ አሬና ቴኒስ ክለብ',
    sport: 'Tennis',
    city: 'Addis Ababa',
    subCity: 'Bole',
    location: 'ቦሌ፣ አዲስ አበባ',
    rating: 4.9,
    reviewsCount: 88,
    price: 1200,
    distance: 4.1,
    images: [
      'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?q=80&w=600&auto=format&fit=crop'
    ],
    currentImageIndex: 0
  },
  {
    id: 3,
    name: 'ሲኤምሲ ቅርጫት ኳስ ሜዳ',
    sport: 'Basketball',
    city: 'Addis Ababa',
    subCity: 'Yeka',
    location: 'ሲኤምሲ፣ አዲስ አበባ',
    rating: 4.6,
    reviewsCount: 56,
    price: 600,
    distance: 8.0,
    images: [
      'https://images.unsplash.com/photo-1519861531473-9200262188bf?q=80&w=600&auto=format&fit=crop'
    ],
    currentImageIndex: 0
  },
  {
    id: 4,
    name: 'ባህር ዳር ዓለም አቀፍ ስታዲየም',
    sport: 'Football',
    city: 'Bahir Dar',
    subCity: '',
    location: 'ባህር ዳር',
    rating: 4.9,
    reviewsCount: 210,
    price: 1500,
    distance: 1.5,
    images: [
      'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=600&auto=format&fit=crop'
    ],
    currentImageIndex: 0
  },
  {
    id: 5,
    name: 'ሱሉልታ አትሌቲክስ ማዕከል',
    sport: 'Athletics',
    city: 'Sululta',
    subCity: '',
    location: 'ሱሉልታ',
    rating: 4.8,
    reviewsCount: 45,
    price: 1000,
    distance: 18.0,
    images: [
      'https://images.unsplash.com/photo-1530541930197-ff16ac917b0e?q=80&w=600&auto=format&fit=crop'
    ],
    currentImageIndex: 0
  }
])

// Reset sub-city selection whenever city changes
watch(selectedCity, (newCity) => {
  if (newCity !== 'Addis Ababa') {
    selectedSubCity.value = 'All'
  }
})

// Dynamic Filter & Sort Logic
const filteredVenues = computed(() => {
  return venues.value
    .filter(venue => {
      const query = searchQuery.value.trim().toLowerCase()
      const matchesSearch = !query || 
        venue.name.toLowerCase().includes(query) ||
        venue.location.toLowerCase().includes(query)

      const matchesCity = selectedCity.value === 'All' || venue.city === selectedCity.value
      const matchesSubCity = selectedCity.value !== 'Addis Ababa' || selectedSubCity.value === 'All' || venue.subCity === selectedSubCity.value
      const matchesSport = selectedSport.value === 'All' || venue.sport === selectedSport.value
      const matchesPrice = venue.price <= maxPrice.value

      return matchesSearch && matchesCity && matchesSubCity && matchesSport && matchesPrice
    })
    .sort((a, b) => {
      if (sortBy.value === 'price_asc') return a.price - b.price
      if (sortBy.value === 'price_desc') return b.price - a.price
      if (sortBy.value === 'rating') return b.rating - a.rating
      if (sortBy.value === 'distance') return a.distance - b.distance
      return 0
    })
})

// Action performed when user clicks Search / Reset
const executeSearch = () => {
  // Clearing input fields triggers re-evaluation of filteredVenues instantly
  searchQuery.value = ''
  selectedCity.value = 'All'
  selectedSubCity.value = 'All'
  selectedSport.value = 'All'
  maxPrice.value = 2000
  sortBy.value = 'rating'
}

// Carousel Navigation
const nextImage = (venue) => {
  if (venue.images.length > 1) {
    venue.currentImageIndex = (venue.currentImageIndex + 1) % venue.images.length
  }
}

const prevImage = (venue) => {
  if (venue.images.length > 1) {
    venue.currentImageIndex = (venue.currentImageIndex - 1 + venue.images.length) % venue.images.length
  }
}
</script>

<template>
  <div class="min-h-screen bg-slate-50 dark:bg-[#070b10] text-slate-800 dark:text-slate-100 font-sans pb-20 md:pb-12">
    
    <!-- SEARCH HERO BAR & DYNAMIC LOCATION/SPORT DROPDOWNS -->
    <section class="bg-slate-900 dark:bg-[#0b111a] text-white py-8 px-4 sm:px-6 lg:px-8 border-b border-slate-800 dark:border-[#212e3e]">
      <div class="max-w-7xl mx-auto space-y-6">
        <div>
          <h1 class="text-2xl sm:text-3xl font-black tracking-tight">የስፖርት ሜዳዎችን ይፈልጉ</h1>
          <p class="text-slate-400 text-xs sm:text-sm mt-1">በአቅራቢያዎ ያሉ የተሻሉ የፉትሳል፣ አትሌቲክስ፣ ቴኒስ እና ሌሎች የስፖርት ሜዳዎች</p>
        </div>

        <!-- Dynamic Dropdowns Grid -->
        <div class="bg-slate-800/80 dark:bg-[#131c27] p-4 rounded-2xl border border-slate-700/60 dark:border-[#212e3e] shadow-xl">
          <div 
            class="grid gap-3" 
            :class="selectedCity === 'Addis Ababa' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-5' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'"
          >
            <!-- Search Text Input -->
            <div class="relative">
              <input 
                v-model="searchQuery"
                type="text" 
                placeholder="በስም ወይም በቦታ ይፈልጉ..." 
                class="w-full bg-slate-900/90 dark:bg-[#0b111a] text-white border border-slate-700 dark:border-[#212e3e] rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <span class="absolute left-3.5 top-3.5 text-slate-400 text-xs">🔍</span>
            </div>

            <!-- City Select -->
            <div class="relative">
              <select 
                v-model="selectedCity"
                class="w-full bg-slate-900/90 dark:bg-[#0b111a] text-slate-200 text-sm font-medium px-4 py-3 rounded-xl border border-slate-700 dark:border-[#212e3e] focus:outline-none focus:ring-2 focus:ring-emerald-500 appearance-none cursor-pointer"
              >
                <option value="All">All Cities (ሁሉም ከተሞች)</option>
                <option v-for="c in cities" :key="c" :value="c">{{ c }}</option>
              </select>
              <span class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none text-xs">▼</span>
            </div>

            <!-- Conditional Sub-City Select (Only rendered if Addis Ababa is selected) -->
            <div v-if="selectedCity === 'Addis Ababa'" class="relative">
              <select 
                v-model="selectedSubCity"
                class="w-full bg-slate-900/90 dark:bg-[#0b111a] text-slate-200 text-sm font-medium px-4 py-3 rounded-xl border border-slate-700 dark:border-[#212e3e] focus:outline-none focus:ring-2 focus:ring-emerald-500 appearance-none cursor-pointer"
              >
                <option value="All">All Sub-Cities (ሁሉም ክፍለ ከተሞች)</option>
                <option v-for="sc in addisSubCitiesWithVenues" :key="sc" :value="sc">{{ sc }}</option>
              </select>
              <span class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none text-xs">▼</span>
            </div>

            <!-- Sport Type Select -->
            <div class="relative">
              <select 
                v-model="selectedSport"
                class="w-full bg-slate-900/90 dark:bg-[#0b111a] text-slate-200 text-sm font-medium px-4 py-3 rounded-xl border border-slate-700 dark:border-[#212e3e] focus:outline-none focus:ring-2 focus:ring-emerald-500 appearance-none cursor-pointer"
              >
                <option value="All">All Sports (ሁሉም ስፖርቶች)</option>
                <option v-for="s in allSportsOptions" :key="s" :value="s">{{ s }}</option>
              </select>
              <span class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none text-xs">▼</span>
            </div>

            <!-- Search / Reset Button -->
            <button 
              @click="executeSearch" 
              type="button"
              class="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-sm py-3 rounded-xl shadow-md transition-transform active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>🔍</span>
              <span>ይፈልጉ (Search)</span>
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- MAIN BODY -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      <!-- Mobile Filter Toggle -->
      <div class="md:hidden flex justify-between items-center mb-6">
        <button 
          @click="isMobileFilterOpen = !isMobileFilterOpen"
          class="flex items-center gap-2 bg-white dark:bg-[#131c27] px-4 py-2 rounded-xl border border-slate-200 dark:border-[#212e3e] text-sm font-bold shadow-sm"
        >
          <span>⚙️ ተጨማሪ ማጣሪያዎች (Filters)</span>
        </button>
        <span class="text-xs font-semibold text-slate-500">{{ filteredVenues.length }} ሜዳዎች ተገኝተዋል</span>
      </div>

      <div class="flex flex-col md:flex-row gap-8">
        
        <!-- SIDEBAR FILTER -->
        <aside 
          :class="[
            'w-full md:w-64 space-y-6 flex-shrink-0 transition-all duration-300',
            isMobileFilterOpen ? 'block' : 'hidden md:block'
          ]"
        >
          <div class="bg-white dark:bg-[#131c27] p-6 rounded-2xl border border-slate-200 dark:border-[#212e3e] shadow-sm space-y-6 sticky top-8">
            
            <div class="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-[#212e3e]">
              <h3 class="font-extrabold text-base text-slate-900 dark:text-white">ተጨማሪ ማጣሪያዎች</h3>
              <button @click="executeSearch" class="text-xs text-emerald-500 hover:underline font-semibold">
                አጽዳ
              </button>
            </div>

            <!-- Price Range -->
            <div class="space-y-2">
              <div class="flex justify-between items-center text-sm">
                <label class="font-bold text-slate-700 dark:text-slate-300">ከፍተኛ ዋጋ</label>
                <span class="font-extrabold text-emerald-500">{{ maxPrice }} ETB</span>
              </div>
              <input 
                v-model.number="maxPrice" 
                type="range" 
                min="300" 
                max="2000" 
                step="50"
                class="w-full accent-emerald-500 cursor-pointer"
              />
              <div class="flex justify-between text-[11px] text-slate-400">
                <span>300 ETB</span>
                <span>2000 ETB</span>
              </div>
            </div>

            <!-- Sort By -->
            <div class="space-y-2 pt-4 border-t border-slate-100 dark:border-[#212e3e]">
              <label class="font-bold text-sm text-slate-700 dark:text-slate-300 block">ደርድር በ (Sort by)</label>
              <select 
                v-model="sortBy"
                class="w-full bg-slate-50 dark:bg-[#0b111a] border border-slate-200 dark:border-[#212e3e] rounded-xl px-3 py-2.5 text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="rating">ከፍተኛ ደረጃ (Rating)</option>
                <option value="price_asc">ዋጋ: ከአነስተኛ ወደ ከፍተኛ</option>
                <option value="price_desc">ዋጋ: ከከፍተኛ ወደ አነስተኛ</option>
                <option value="distance">በአቅራቢያ ያሉ (Distance)</option>
              </select>
            </div>

          </div>
        </aside>

        <!-- CARDS GRID -->
        <main class="flex-1">
          <div class="hidden md:flex justify-between items-center mb-6">
            <p class="text-sm text-slate-500 dark:text-slate-400">
              <span class="font-bold text-slate-900 dark:text-white">{{ filteredVenues.length }}</span> ሜዳዎች ተገኝተዋል
            </p>
          </div>

          <!-- Empty State -->
          <div v-if="filteredVenues.length === 0" class="text-center py-16 bg-white dark:bg-[#131c27] rounded-2xl border border-slate-200 dark:border-[#212e3e]">
            <span class="text-4xl">🏟️</span>
            <h3 class="text-lg font-bold mt-2 text-slate-800 dark:text-white">ምንም ሜዳ አልተገኘም</h3>
            <p class="text-slate-500 text-xs sm:text-sm mt-1">እባክዎን የማጣሪያ መስፈርቶችን ቀይረው እንደገና ይሞክሩ።</p>
            <button @click="executeSearch" class="mt-4 px-4 py-2 bg-emerald-500 text-slate-950 text-xs font-bold rounded-xl cursor-pointer">
              ማጣሪያዎችን አጽዳ
            </button>
          </div>

          <!-- Cards Grid -->
          <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
            <div 
              v-for="venue in filteredVenues" 
              :key="venue.id" 
              class="bg-white dark:bg-[#131c27] rounded-2xl overflow-hidden border border-slate-200 dark:border-[#212e3e] hover:shadow-xl transition flex flex-col group relative"
            >
              <!-- Carousel Image Container -->
              <div class="relative h-52 bg-slate-200 dark:bg-slate-800 overflow-hidden">
                <img 
                  :src="venue.images[venue.currentImageIndex]" 
                  :alt="venue.name" 
                  class="w-full h-full object-cover transition duration-300" 
                  loading="lazy"
                />

                <template v-if="venue.images.length > 1">
                  <button 
                    @click.stop="prevImage(venue)"
                    class="absolute left-2 top-1/2 -translate-y-1/2 bg-slate-950/60 hover:bg-slate-950 text-white w-7 h-7 rounded-full flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition z-10"
                  >
                    ❮
                  </button>
                  <button 
                    @click.stop="nextImage(venue)"
                    class="absolute right-2 top-1/2 -translate-y-1/2 bg-slate-950/60 hover:bg-slate-950 text-white w-7 h-7 rounded-full flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition z-10"
                  >
                    ❯
                  </button>

                  <div class="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 z-10">
                    <span 
                      v-for="(img, idx) in venue.images" 
                      :key="idx"
                      :class="[
                        'w-1.5 h-1.5 rounded-full transition-all',
                        idx === venue.currentImageIndex ? 'bg-white w-3' : 'bg-white/50'
                      ]"
                    ></span>
                  </div>
                </template>

                <span class="absolute top-3 right-3 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-bold text-amber-400 border border-amber-500/20 flex items-center gap-1 z-10">
                  ⭐ {{ venue.rating }} <span class="text-slate-400 text-[10px]">({{ venue.reviewsCount }})</span>
                </span>

                <span class="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] font-semibold text-slate-200 z-10">
                  📍 {{ venue.distance }} km እርቀት
                </span>
              </div>

              <!-- Venue Info -->
              <div class="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <span class="text-[11px] font-bold text-emerald-500 uppercase tracking-wide bg-emerald-500/10 px-2 py-0.5 rounded-md">
                    {{ venue.sport }}
                  </span>
                  
                  <h2 class="text-lg font-bold text-slate-900 dark:text-white mt-2">
                    {{ venue.name }}
                  </h2>
                  
                  <p class="text-slate-500 dark:text-slate-400 text-xs mt-1 flex items-center gap-1">
                    📍 {{ venue.location }}
                  </p>
                </div>

                <div class="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-[#212e3e]">
                  <div>
                    <span class="text-xs text-slate-400 block">መነሻ ዋጋ</span>
                    <span class="text-base font-extrabold text-slate-900 dark:text-white">ከ {{ venue.price }} ETB</span>
                    <span class="text-[10px] text-slate-500 dark:text-slate-400">/ሰዓት</span>
                  </div>

                  <button 
                    @click="handleBooking(venue.id)"
                    class="px-4 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold rounded-xl shadow-md transition flex items-center gap-1 cursor-pointer"
                  >
                    <span>Book Now</span>
                    <span>&rarr;</span>
                  </button>
                </div>
              </div>

            </div>
          </div>
        </main>

      </div>
    </div>
  </div>
</template>