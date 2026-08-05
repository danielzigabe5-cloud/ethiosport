<script setup>
import { ref, computed } from 'vue'

// Page Title & Meta (SEO)
useHead({
  title: 'Venues - EthioSport',
  meta: [
    { name: 'description', content: 'የስፖርት ሜዳዎችን ይፈልጉ፣ ያወዳድሩ እና በቀላሉ ያዙ።' }
  ]
})

// Navigation Links (ለ Header)
const navLinks = [
  
]

// Auth State Check
const userToken = useCookie('auth_token')

// Book Now ሲነካ የሚሰራ Navigation Logic
const handleBooking = (venueId) => {
  if (!userToken.value) {
    return navigateTo(`/login?redirect=/venues/${venueId}`)
  }
  return navigateTo(`/venues/${venueId}`)
}

// Sample Venues Data
const venues = ref([
  {
    id: 1,
    name: 'ሳርቤት ፉትሳል ሜዳ',
    sport: 'Football',
    location: 'ሳርቤት፣ አዲስ አበባ',
    rating: 4.8,
    reviewsCount: 124,
    price: 800,
    distance: 2.5,
    images: [
      'https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1529900748604-07564a03e7a6?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=600&auto=format&fit=crop'
    ],
    currentImageIndex: 0
  },
  {
    id: 2,
    name: 'ቦሌ አሬና ቴኒስ ክለብ',
    sport: 'Tennis',
    location: 'ቦሌ፣ አዲስ አበባ',
    rating: 4.9,
    reviewsCount: 88,
    price: 1200,
    distance: 4.1,
    images: [
      'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?q=80&w=600&auto=format&fit=crop'
    ],
    currentImageIndex: 0
  },
  {
    id: 3,
    name: 'ሲኤምሲ ቅርጫት ኳስ ሜዳ',
    sport: 'Basketball',
    location: 'ሲኤምሲ፣ አዲስ አበባ',
    rating: 4.6,
    reviewsCount: 56,
    price: 600,
    distance: 8.0,
    images: [
      'https://images.unsplash.com/photo-1519861531473-9200262188bf?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=600&auto=format&fit=crop'
    ],
    currentImageIndex: 0
  },
  {
    id: 4,
    name: 'ካዛንችስ ስፖርት ሴንተር',
    sport: 'Football',
    location: 'ካዛንችስ፣ አዲስ አበባ',
    rating: 4.7,
    reviewsCount: 92,
    price: 1000,
    distance: 1.2,
    images: [
      'https://images.unsplash.com/photo-1529900748604-07564a03e7a6?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=600&auto=format&fit=crop'
    ],
    currentImageIndex: 0
  },
  {
    id: 5,
    name: 'ጃክሮስ ቴኒስ ሜዳ',
    sport: 'Tennis',
    location: 'ጃክሮስ፣ አዲስ አበባ',
    rating: 4.4,
    reviewsCount: 34,
    price: 900,
    distance: 10.5,
    images: [
      'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?q=80&w=600&auto=format&fit=crop'
    ],
    currentImageIndex: 0
  },
  {
    id: 6,
    name: 'አትሌቲክስ ባስኬትቦል አሬና',
    sport: 'Basketball',
    location: 'መክሲኮ፣ አዲስ አበባ',
    rating: 4.8,
    reviewsCount: 110,
    price: 750,
    distance: 3.0,
    images: [
      'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=600&auto=format&fit=crop'
    ],
    currentImageIndex: 0
  }
])

// Filter States
const maxPrice = ref(2000)
const selectedSports = ref(['Football', 'Basketball', 'Tennis'])
const sortBy = ref('rating')
const searchQuery = ref('')
const isMobileFilterOpen = ref(false)

// Carousel Actions
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

// Filter & Sort Logic
const filteredVenues = computed(() => {
  return venues.value
    .filter(venue => {
      const matchesSport = selectedSports.value.includes(venue.sport)
      const matchesPrice = venue.price <= maxPrice.value
      const matchesSearch = venue.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                            venue.location.toLowerCase().includes(searchQuery.value.toLowerCase())
      
      return matchesSport && matchesPrice && matchesSearch
    })
    .sort((a, b) => {
      if (sortBy.value === 'price_asc') return a.price - b.price
      if (sortBy.value === 'price_desc') return b.price - a.price
      if (sortBy.value === 'rating') return b.rating - a.rating
      if (sortBy.value === 'distance') return a.distance - b.distance
      return 0
    })
})

const resetFilters = () => {
  maxPrice.value = 2000
  selectedSports.value = ['Football', 'Basketball', 'Tennis']
  sortBy.value = 'rating'
  searchQuery.value = ''
}
</script>

<template>
  <div class="min-h-screen bg-slate-50 dark:bg-[#070b10] text-slate-800 dark:text-slate-100 font-sans pb-20 md:pb-12">
    
    <!-- HEADER NAVBAR -->
    <header class="sticky top-0 z-40 bg-white/95 dark:bg-[#0b111a]/95 backdrop-blur-md border-b border-slate-200 dark:border-[#212e3e]">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <NuxtLink to="/" class="flex items-center gap-2">
          <div class="w-9 h-9 bg-emerald-500 rounded-xl flex items-center justify-center text-slate-950 font-black text-xl shadow-md">
            E
          </div>
          <span class="font-extrabold text-xl text-slate-900 dark:text-white tracking-tight">
            ETHIO-<span class="text-emerald-500">sports</span>
          </span>
        </NuxtLink>

        <nav class="hidden md:flex items-center gap-6">
          <NuxtLink 
            v-for="link in navLinks" 
            :key="link.path" 
            :to="link.path"
            class="text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-emerald-500 dark:hover:text-emerald-400 transition"
            active-class="text-emerald-500 dark:text-emerald-400 font-bold border-b-2 border-emerald-500 pb-1"
          >
            {{ link.name }}
          </NuxtLink>
        </nav>

        <div class="flex items-center gap-3">
          <NuxtLink to="/login" class="px-4 py-2 text-xs sm:text-sm font-bold text-slate-950 bg-emerald-500 hover:bg-emerald-400 rounded-xl shadow-md transition">
            ግቡ
          </NuxtLink>
        </div>
      </div>
    </header>

    <!-- SEARCH HERO BAR -->
    <section class="bg-slate-900 dark:bg-[#0b111a] text-white py-8 px-4 sm:px-6 lg:px-8 border-b border-slate-800 dark:border-[#212e3e]">
      <div class="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 class="text-2xl sm:text-3xl font-black tracking-tight">የስፖርት ሜዳዎችን ይፈልጉ</h1>
          <p class="text-slate-400 text-xs sm:text-sm mt-1">በአቅራቢያዎ ያሉ የተሻሉ የፉትሳል፣ ቴኒስ እና ባስኬትቦል ሜዳዎች</p>
        </div>

        <div class="w-full md:w-80 relative">
          <input 
            v-model="searchQuery"
            type="text" 
            placeholder="በስም ወይም በቦታ ይፈልጉ..." 
            class="w-full bg-slate-800 dark:bg-[#131c27] text-white border border-slate-700 dark:border-[#212e3e] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 pl-10"
          />
          <span class="absolute left-3 top-3 text-slate-400">🔍</span>
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
          <span>⚙️ ማጣሪያዎች (Filters)</span>
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
          <div class="bg-white dark:bg-[#131c27] p-6 rounded-2xl border border-slate-200 dark:border-[#212e3e] shadow-sm space-y-6 sticky top-24">
            
            <div class="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-[#212e3e]">
              <h3 class="font-extrabold text-base text-slate-900 dark:text-white">ማጣሪያዎች</h3>
              <button @click="resetFilters" class="text-xs text-emerald-500 hover:underline font-semibold">
                አጽዳ (Reset)
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

            <!-- Sport Type Checkboxes -->
            <div class="space-y-3">
              <label class="font-bold text-sm text-slate-700 dark:text-slate-300 block">የስፖርት ዓይነት</label>
              <div class="space-y-2">
                <label class="flex items-center gap-2.5 text-sm cursor-pointer text-slate-600 dark:text-slate-300">
                  <input 
                    type="checkbox" 
                    value="Football" 
                    v-model="selectedSports" 
                    class="w-4 h-4 rounded text-emerald-500 focus:ring-emerald-500 accent-emerald-500"
                  />
                  ⚽ Football (ፉትሳል)
                </label>
                <label class="flex items-center gap-2.5 text-sm cursor-pointer text-slate-600 dark:text-slate-300">
                  <input 
                    type="checkbox" 
                    value="Basketball" 
                    v-model="selectedSports" 
                    class="w-4 h-4 rounded text-emerald-500 focus:ring-emerald-500 accent-emerald-500"
                  />
                  🏀 Basketball (ቅርጫት ኳስ)
                </label>
                <label class="flex items-center gap-2.5 text-sm cursor-pointer text-slate-600 dark:text-slate-300">
                  <input 
                    type="checkbox" 
                    value="Tennis" 
                    v-model="selectedSports" 
                    class="w-4 h-4 rounded text-emerald-500 focus:ring-emerald-500 accent-emerald-500"
                  />
                  🎾 Tennis (ቴኒስ)
                </label>
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

          <div v-if="filteredVenues.length === 0" class="text-center py-16 bg-white dark:bg-[#131c27] rounded-2xl border border-slate-200 dark:border-[#212e3e]">
            <span class="text-4xl">🏟️</span>
            <h3 class="text-lg font-bold mt-2 text-slate-800 dark:text-white">ምንም ሜዳ አልተገኘም</h3>
            <p class="text-slate-500 text-xs sm:text-sm mt-1">እባክዎን የማጣሪያ መስፈርቶችን ቀይረው እንደገና ይሞክሩ።</p>
            <button @click="resetFilters" class="mt-4 px-4 py-2 bg-emerald-500 text-slate-950 text-xs font-bold rounded-xl">
              ማጣሪያዎችን አጽዳ
            </button>
          </div>

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