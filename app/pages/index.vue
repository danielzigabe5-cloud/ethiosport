<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

// Import images
import img1 from '~/assets/images/venu1.jpg'
import img2 from '~/assets/images/venue2.jpg'
import img3 from '~/assets/images/venue3.jpg'
import img4 from '~/assets/images/venue4.jpg'
import img5 from '~/assets/images/venue5.jpg'
import img6 from '~/assets/images/venues6.jpg'
import img7 from '~/assets/images/venues7.jpg'
import img8 from '~/assets/images/venues8.jpg'
import img9 from '~/assets/images/venues9.jpg'
import img10 from '~/assets/images/venuess10.jpg'
import img11 from '~/assets/images/venuess11.jpg'
import img12 from '~/assets/images/venuess12.png'
import img13 from '~/assets/images/venuess13.jpg'
import img14 from '~/assets/images/venuess14.jpg'
import heroBg from '~/assets/images/images.jpg'

// Dynamic App Download Links
const appStoreUrl = ref('https://apps.apple.com')
const playStoreUrl = ref('https://play.google.com/store')

// Placeholder image
const placeholderImage = 'https://via.placeholder.com/400x300/2d7d46/ffffff?text=EthioSport'

// Search variables
const selectedCity = ref('all')
const selectedSubCity = ref('all')
const selectedSport = ref('all')

const cities = ['Addis Ababa', 'Bahir Dar', 'Hawassa', 'Mekelle', 'Dire Dawa']
const subCities = ['Bole', 'Kirkos', 'Arada', 'Yeka', 'Lideta', 'Nifas Silk']

// All 14 venues
const venues = ref([
  { id: 1, name: 'Yidnekachew Tessema Stadium', city: 'Addis Ababa', subCity: 'Kirkos', sportType: 'football', price: '2500', image: img1 },
  { id: 2, name: 'Abebe Bikila Stadium', city: 'Addis Ababa', subCity: 'Arada', sportType: 'athletics', price: '1800', image: img2 },
  { id: 3, name: 'Bahir Dar Stadium', city: 'Bahir Dar', subCity: '', sportType: 'football', price: '2000', image: img3 },
  { id: 4, name: 'Bole Atlas Field', city: 'Addis Ababa', subCity: 'Bole', sportType: 'basketball', price: '1000', image: img4 },
  { id: 5, name: 'Mekelle Martyrs Stadium', city: 'Mekelle', subCity: '', sportType: 'football', price: '1500', image: img5 },
  { id: 6, name: 'Hawassa International Stadium', city: 'Hawassa', subCity: '', sportType: 'athletics', price: '2200', image: img6 },
  { id: 7, name: 'Dire Dawa Stadium', city: 'Dire Dawa', subCity: '', sportType: 'football', price: '1700', image: img7 },
  { id: 8, name: 'Gonder Sports Arena', city: 'Bahir Dar', subCity: '', sportType: 'athletics', price: '1900', image: img8 },
  { id: 9, name: 'Jimma Athletics Field', city: 'Addis Ababa', subCity: 'Yeka', sportType: 'athletics', price: '1600', image: img9 },
  { id: 10, name: 'Harar Football Field', city: 'Dire Dawa', subCity: '', sportType: 'football', price: '1400', image: img10 },
  { id: 11, name: 'Addis Ababa Basketball Arena', city: 'Addis Ababa', subCity: 'Lideta', sportType: 'basketball', price: '1200', image: img11 },
  { id: 12, name: 'Ethiopia International Stadium', city: 'Addis Ababa', subCity: 'Kirkos', sportType: 'athletics', price: '3000', image: img12 },
  { id: 13, name: 'Arba Minch Sports Complex', city: 'Hawassa', subCity: '', sportType: 'football', price: '2100', image: img13 },
  { id: 14, name: 'Bole Resort Sports Field', city: 'Addis Ababa', subCity: 'Bole', sportType: 'basketball', price: '2500', image: img14 }
])

// Hero Section Animation
const heroImages = [img14, img11, img3, img4, img5, img6]
const currentImageIndex = ref(0)

let animationInterval: NodeJS.Timeout

onMounted(() => {
  animationInterval = setInterval(() => {
    currentImageIndex.value = (currentImageIndex.value + 1) % heroImages.length
  }, 3000)
})

const handleCityChange = () => {
  selectedSubCity.value = 'all'
}

const filteredVenues = computed(() => {
  return venues.value.filter(v => {
    const matchesCity = selectedCity.value === 'all' || v.city === selectedCity.value
    const matchesSub = selectedCity.value !== 'Addis Ababa' || selectedSubCity.value === 'all' || v.subCity === selectedSubCity.value
    const matchesSport = selectedSport.value === 'all' || v.sportType === selectedSport.value
    return matchesCity && matchesSub && matchesSport
  })
})

const resetFilters = () => {
  selectedCity.value = 'all'
  selectedSubCity.value = 'all'
  selectedSport.value = 'all'
}

const executeSearch = () => {
  const element = document.getElementById('venues')
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<template>
  <div class="min-h-screen w-full bg-green-50 m-0 p-0 overflow-x-hidden">

    <!-- HERO SECTION (Full Width) -->
    <section class="relative bg-gradient-to-br from-green-800 via-green-700 to-emerald-800 text-white pt-24 pb-44 px-4 sm:px-8 overflow-hidden min-h-[600px] w-full">

      <!-- Background Image Slider -->
      <div class="absolute inset-0 w-full h-full">
        <div 
          v-for="(img, index) in heroImages" 
          :key="index"
          class="absolute inset-0 w-full h-full transition-all duration-1500 ease-in-out"
          :class="currentImageIndex === index ? 'opacity-50 scale-100' : 'opacity-0 scale-110'"
        >
          <img :src="img" alt="" class="w-full h-full object-cover" />
        </div>
      </div>

      <!-- Floating Elements -->
      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <div class="absolute top-10 left-10 w-48 h-48 bg-green-400/10 rounded-full blur-3xl"></div>
        <div class="absolute bottom-10 right-10 w-56 h-56 bg-emerald-400/10 rounded-full blur-3xl"></div>
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-green-300/5 rounded-full blur-3xl"></div>
      </div>

      <!-- Content -->
      <div class="relative z-10 w-full text-center">
        <!-- Dots -->
        <div class="flex justify-center gap-3 mb-6">
          <button 
            v-for="(_, index) in heroImages" 
            :key="index"
            class="h-2.5 rounded-full transition-all duration-300"
            :class="currentImageIndex === index ? 'w-10 bg-white shadow-lg' : 'w-2.5 bg-white/40 hover:bg-white/70'"
            @click="currentImageIndex = index"
          ></button>
        </div>

        <!-- Image counter -->
        <div class="text-white/50 text-sm mb-4 font-light tracking-wider">
          {{ currentImageIndex + 1 }} / {{ heroImages.length }}
        </div>

        <h1 class="text-3xl sm:text-5xl md:text-6xl font-bold mb-6 tracking-tight leading-tight drop-shadow-lg max-w-5xl mx-auto">
          <i>WELCOME TO COMBOLOJO SPORT VENUES PLATFORM</i>
        </h1>

        <p class="text-green-100 text-lg sm:text-xl md:text-2xl mb-10 max-w-2xl mx-auto leading-relaxed drop-shadow-md">
          Find and book sports venues near you with ease.
        </p>

        <!-- Download Buttons (ተስተካክለዋል) -->
        <div class="flex flex-wrap justify-center gap-4">
          <a :href="appStoreUrl" target="_blank" rel="noopener noreferrer" class="flex items-center bg-black/60 backdrop-blur-sm text-white px-6 py-3.5 rounded-2xl hover:bg-black/80 transition-all border border-white/20 hover:border-white/40 hover:scale-105 duration-300 shadow-lg">
            <svg class="w-7 h-7 mr-3" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
            </svg>
            <div class="text-left">
              <p class="text-[9px] uppercase opacity-70">Download on the</p>
              <p class="text-base font-semibold">App Store</p>
            </div>
          </a>
          <a :href="playStoreUrl" target="_blank" rel="noopener noreferrer" class="flex items-center bg-black/60 backdrop-blur-sm text-white px-6 py-3.5 rounded-2xl hover:bg-black/80 transition-all border border-white/20 hover:border-white/40 hover:scale-105 duration-300 shadow-lg">
            <svg class="w-7 h-7 mr-3" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734c0-.38.223-.727.609-.92zM14.5 12.71l-5.26 5.26 5.26-5.26zM14.5 11.29L9.24 6.03l5.26 5.26zM15.5 6.79l-1.79 1.79 1.79 1.79zM15.5 13.63l-1.79 1.79 1.79 1.79z"/>
            </svg>
            <div class="text-left">
              <p class="text-[9px] uppercase opacity-70">Get it on</p>
              <p class="text-base font-semibold">Google Play</p>
            </div>
          </a>
        </div>

        <!-- Scroll down arrow -->
        <div class="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce cursor-pointer">
          <svg class="w-8 h-8 text-white/60 hover:text-white/80 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </div>
    </section>

    <!-- VENUES DISPLAY -->
    <section id="venues" class="w-full px-4 sm:px-8 lg:px-12 py-12">
      <!-- Header -->
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-xl sm:text-2xl font-bold dark:text-white">
          Venues 
          <span class="text-green-600 text-sm font-normal">({{ filteredVenues.length }})</span>
        </h2>
        <button @click="resetFilters" class="text-sm text-green-600 hover:text-green-700 font-medium">
          Show All
        </button>
      </div>

      <!-- Venues Grid -->
      <div v-if="filteredVenues.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 w-full">
        <div 
          v-for="venue in filteredVenues" 
          :key="venue.id" 
          class="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all border border-gray-100 dark:border-gray-800 hover:-translate-y-1 w-full flex flex-col justify-between"
        >
          <div>
            <div class="h-48 overflow-hidden relative bg-gray-200">
              <img :src="venue.image" :alt="venue.name" class="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
              <div class="absolute top-3 right-3 bg-white/90 px-2.5 py-1 rounded-full text-xs font-bold text-green-700">
                {{ venue.price }} Birr
              </div>
              <div class="absolute bottom-3 left-3 bg-black/60 px-2.5 py-1 rounded-full text-[10px] font-semibold text-white uppercase">
                {{ venue.sportType }}
              </div>
              <div v-if="venue.image === placeholderImage" class="absolute top-3 left-3 bg-yellow-500/80 px-2 py-0.5 rounded text-[9px] font-bold text-white">
                No Image
              </div>
            </div>
            <div class="p-5">
              <h3 class="text-lg font-bold dark:text-white text-black mb-1 truncate">{{ venue.name }}</h3>
              <p class="text-gray-500 text-sm mb-4">{{ venue.city }}{{ venue.subCity ? ', ' + venue.subCity : '' }}</p>
            </div>
          </div>

          <!-- View Details Button (ተስተካክሏል) -->
          <div class="px-5 pb-5">
            <NuxtLink 
              :to="'/venues/' + venue.id" 
              class="w-full block text-center bg-gray-100 dark:bg-gray-800 hover:bg-green-600 hover:text-white py-2.5 rounded-xl font-semibold transition-colors text-sm text-black dark:text-white"
            >
              View Details
            </NuxtLink>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-16 bg-gray-50 dark:bg-gray-900/50 rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-800 w-full">
        <svg class="w-16 h-16 mx-auto text-gray-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <h3 class="text-xl font-bold text-gray-400">No Venues Found</h3>
        <p class="text-gray-400 text-sm mt-1">Please adjust your search filters</p>
        <button @click="resetFilters" class="text-green-600 font-medium mt-3 hover:underline text-sm">
          Show All
        </button>
      </div>
    </section>

  </div>
</template>

<style scoped>
/* Smooth image transition */
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

.duration-1500 {
  transition-duration: 1500ms;
}

/* Bounce animation */
@keyframes bounce {
  0%, 100% {
    transform: translateY(-25%);
    animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
  }
  50% {
    transform: translateY(0);
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
  }
}

.animate-bounce {
  animation: bounce 2s infinite;
}

/* Text shadows */
.drop-shadow-lg {
  filter: drop-shadow(0 10px 8px blue);
}

.drop-shadow-md {
  filter: drop-shadow
}
</style>