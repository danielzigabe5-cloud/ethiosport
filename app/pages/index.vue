<script setup lang="ts">
import { ref, computed } from 'vue'

// Import all images directly from app/assets/images/
import heroBg from '~/assets/images/images.jpg'
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

// State for Modal
const selectedVenue = ref<any>(null)
const isModalOpen = ref(false)
const isDownloadModalOpen = ref(false)

const openVenueModal = (venue: any) => {
  selectedVenue.value = venue
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
  selectedVenue.value = null
}

const handleBookNow = () => {
  isModalOpen.value = false
  isDownloadModalOpen.value = true
}

const closeDownloadModal = () => {
  isDownloadModalOpen.value = false
}

// Search State
const searchQuery = ref('')
const selectedType = ref('All Types')

// Sports Categories
const categories = [
  { name: 'Football', label: 'Fields & Courts', icon: '⚽' },
  { name: 'Basketball', label: 'Courts & Gyms', icon: '🏀' },
  { name: 'Futsal', label: 'Indoor & Outdoor', icon: '⚽' },
  { name: 'Volleyball', label: 'Courts & Halls', icon: '🏐' },
  { name: 'Just Play', label: 'Find Players', icon: '🏃' },
  { name: 'Events', label: 'Tournaments & More', icon: '📅' }
]

// All Venues with extended details in English
const venues = ref([
  { 
    id: 1, 
    name: 'Sarbet Futsal Arena', 
    location: 'Bole, Addis Ababa', 
    type: 'Futsal', 
    badge: 'Indoor', 
    rating: '4.8', 
    reviews: '124', 
    price: '1,500', 
    tag: 'Top Rated', 
    image: img1, 
    phone: '+251 911 123 456', 
    hours: '06:00 AM - 11:00 PM', 
    description: 'Sarbet Futsal Arena offers state-of-the-art indoor artificial turf pitches ideal for competitive matches and casual games with friends.',
    rules: ['Futsal or turf shoes are required.', 'Arrive at least 15 minutes before your booked slot.', 'Smoking and alcohol are strictly prohibited inside the arena.'],
    amenities: ['Night Lighting', 'Shower Room', 'Secure Parking', 'Cafeteria & Lounge', 'Locker Room'] 
  },
  { 
    id: 2, 
    name: 'Unity Football Arena', 
    location: 'Mexico, Addis Ababa', 
    type: 'Football', 
    badge: 'Outdoor', 
    rating: '4.6', 
    reviews: '98', 
    price: '2,000', 
    image: img2, 
    phone: '+251 922 234 567', 
    hours: '06:00 AM - 10:00 PM', 
    description: 'A spacious outdoor football ground located in the center of the city. Perfect for group training, friendly games, and local leagues.',
    rules: ['Change into sports apparel inside dressing rooms only.', 'Respect reserved time slots.'],
    amenities: ['High-Grade Turf', 'Dressing Room', 'Parking', 'First Aid On-Site'] 
  },
  { 
    id: 3, 
    name: 'Yeka Basketball Court', 
    location: 'Yeka, Addis Ababa', 
    type: 'Basketball', 
    badge: 'Indoor', 
    rating: '4.5', 
    reviews: '76', 
    price: '1,200', 
    image: img3, 
    phone: '+251 933 345 678', 
    hours: '07:00 AM - 09:00 PM', 
    description: 'Modern indoor basketball facility with professional wooden flooring, scoreboard, and private shower amenities.',
    rules: ['Indoor basketball non-marking shoes only.', 'No food or sugary drinks on the playing surface.'],
    amenities: ['Professional Hoops', 'Digital Scoreboard', 'Shower Room', 'Spectator Seating'] 
  },
  { 
    id: 4, 
    name: 'Summit Sports Complex', 
    location: 'Kirkos, Addis Ababa', 
    type: 'Football', 
    badge: 'Outdoor', 
    rating: '4.7', 
    reviews: '62', 
    price: '2,500', 
    image: img4, 
    phone: '+251 944 456 789', 
    hours: '06:00 AM - 11:00 PM', 
    description: 'Premium outdoor venue equipped with floodlights for evening games and full spectator stands.',
    rules: ['Full sports kit required.', 'Ensure personal belongings are stored safely.'],
    amenities: ['Floodlights', 'Spectator Stands', 'Cafeteria', 'VIP Lounge'] 
  },
  { id: 5, name: 'Mekelle Martyrs Stadium', location: 'Mekelle', type: 'Football', badge: 'Outdoor', rating: '4.4', reviews: '45', price: '1,500', image: img5, phone: '+251 955 567 890', hours: '06:00 AM - 08:00 PM', description: 'Standard stadium with natural grass field suitable for tournament fixtures.', rules: ['Follow field safety guidelines.'], amenities: ['Natural Grass', 'Parking', 'Restrooms'] },
  { id: 6, name: 'Hawassa International Stadium', location: 'Hawassa', type: 'Athletics', badge: 'Outdoor', rating: '4.9', reviews: '110', price: '2,200', image: img6, phone: '+251 966 678 901', hours: '06:00 AM - 07:00 PM', description: 'Comprehensive athletic running track and full-size football arena.', rules: ['Track spikes must conform to regulation length.'], amenities: ['Running Track', 'Locker Room', 'First Aid Station'] },
  { id: 7, name: 'Dire Dawa Stadium', location: 'Dire Dawa', type: 'Football', badge: 'Outdoor', rating: '4.3', reviews: '38', price: '1,700', image: img7, phone: '+251 977 789 012', hours: '06:00 AM - 09:00 PM', description: 'Multi-purpose sports ground featuring night floodlights.', rules: ['No pets allowed on the playing pitch.'], amenities: ['Night Lighting', 'Parking'] },
  { id: 8, name: 'Bahir Dar Sports Arena', location: 'Bahir Dar', type: 'Athletics', badge: 'Outdoor', rating: '4.6', reviews: '84', price: '1,900', image: img8, phone: '+251 988 890 123', hours: '06:00 AM - 08:00 PM', description: 'Premier athletics track and field arena.', rules: ['Respect other athletes on the track.'], amenities: ['Running Track', 'Shower Room'] },
  { id: 9, name: 'Jimma Athletics Field', location: 'Yeka, Addis Ababa', type: 'Athletics', badge: 'Outdoor', rating: '4.2', reviews: '29', price: '1,600', image: img9, phone: '+251 911 000 111', hours: '06:00 AM - 07:00 PM', description: 'Open-air athletic pitch with training facilities.', rules: ['Keep the facility clean.'], amenities: ['Open Air Ground', 'Parking'] },
  { id: 10, name: 'Harar Football Field', location: 'Dire Dawa', type: 'Football', badge: 'Outdoor', rating: '4.1', reviews: '19', price: '1,400', image: img10, phone: '+251 922 111 222', hours: '06:00 AM - 08:00 PM', description: 'Natural turf football ground.', rules: ['Follow stadium rules.'], amenities: ['Grass Field', 'Water Station'] },
  { id: 11, name: 'Addis Ababa Basketball Arena', location: 'Lideta, Addis Ababa', type: 'Basketball', badge: 'Indoor', rating: '4.8', reviews: '150', price: '1,200', image: img11, phone: '+251 933 222 333', hours: '07:00 AM - 10:00 PM', description: 'High-grade indoor hardwood basketball arena.', rules: ['Proper basketball footwear required.'], amenities: ['Hardwood Floor', 'Shower Room', 'Night Lighting'] },
  { id: 12, name: 'Ethiopia International Stadium', location: 'Kirkos, Addis Ababa', type: 'Athletics', badge: 'Outdoor', rating: '5.0', reviews: '210', price: '3,000', image: img12, phone: '+251 944 333 444', hours: '06:00 AM - 10:00 PM', description: 'World-class international arena for grand sports events.', rules: ['Strict security protocols apply.'], amenities: ['VIP Section', 'Night Lighting', 'Full Sports Kit Services'] },
  { id: 13, name: 'Arba Minch Sports Complex', location: 'Hawassa', type: 'Football', badge: 'Outdoor', rating: '4.5', reviews: '53', price: '2,100', image: img13, phone: '+251 955 444 555', hours: '06:00 AM - 09:00 PM', description: 'Modern artificial turf complex.', rules: ['Respect scheduled game times.'], amenities: ['Artificial Turf', 'Cafeteria'] },
  { id: 14, name: 'Bole Resort Sports Field', location: 'Bole, Addis Ababa', type: 'Basketball', badge: 'Outdoor', rating: '4.7', reviews: '88', price: '2,500', image: img14, phone: '+251 966 555 666', hours: '06:00 AM - 11:00 PM', description: 'Luxury outdoor sports court situated within resort premises.', rules: ['Resort guest guidelines apply.'], amenities: ['Resort View', 'Night Lighting', 'VIP Bar'] }
])

// Events Data
const events = ref([
  { id: 1, month: 'AUG', day: '30', title: '5-a-side Football Tournament', location: 'Bole Arena', time: '9:00 AM – 5:00 PM', image: img6 },
  { id: 2, month: 'SEP', day: '05', title: 'Basketball Friendly Match', location: 'Yeka Court', time: '4:00 PM – 7:00 PM', image: img11 },
  { id: 3, month: 'SEP', day: '12', title: 'Futsal Championship', location: 'Summit Complex', time: '10:00 AM – 6:00 PM', image: img12 }
])

// Search filter implementation
const filteredVenues = computed(() => {
  const result = venues.value.filter(v => {
    const matchesSearch = searchQuery.value === '' || 
      v.name.toLowerCase().includes(searchQuery.value.toLowerCase()) || 
      v.location.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesType = selectedType.value === 'All Types' || v.type.toLowerCase() === selectedType.value.toLowerCase()
    
    return matchesSearch && matchesType
  })
  return result.slice(0, 4)
})
</script>

<template>
  <div class="min-h-screen bg-gray-50 text-gray-800 font-sans">

    <!-- NAVBAR -->
    <header class="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <!-- Logo -->
        <div class="flex items-center gap-2">
          <div class="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold text-xl">
            ⚽
          </div>
          <span class="text-2xl font-bold text-gray-900">
            Combolojo<span class="text-emerald-600">SPORT</span>
          </span>
        </div>

        <!-- Navigation Links -->
        <nav class="hidden md:flex items-center gap-8 font-medium text-sm text-gray-600">
          <NuxtLink to="/" class="text-emerald-600 font-semibold border-b-2 border-emerald-600 pb-1">Home</NuxtLink>
          <NuxtLink to="/venues" class="hover:text-emerald-600 transition-colors">Venues</NuxtLink>
          <NuxtLink to="/events" class="hover:text-emerald-600 transition-colors">Events</NuxtLink>
          <NuxtLink to="/just-play" class="hover:text-emerald-600 transition-colors">Just Play</NuxtLink>
          <NuxtLink to="/contact" class="hover:text-emerald-600 transition-colors">Contact</NuxtLink>
        </nav>

        <!-- Right Side Controls -->
        <div class="flex items-center gap-4">
          <NuxtLink to="/contact" class="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-xs px-3.5 py-2 rounded-full flex items-center gap-1 transition-all">
            <span>⊕</span> Add Venue
          </NuxtLink>
          <div class="relative">
            <button class="p-2 text-gray-500 hover:text-emerald-600">🔔</button>
            <span class="absolute top-1 right-1 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">3</span>
          </div>
          <div class="flex items-center gap-2 border-l pl-4 border-gray-200">
            <div class="w-9 h-9 rounded-full bg-slate-700 text-white flex items-center justify-center text-sm font-semibold">
              A
            </div>
            <span class="text-sm font-medium hidden sm:inline">Alemu</span>
            <span class="text-xs text-gray-400">▼</span>
          </div>
        </div>
      </div>
    </header>

    <!-- HERO SECTION WITH SLOW ZOOM ANIMATION -->
    <section class="relative bg-slate-900 text-white py-20 px-4 sm:px-6 lg:px-8 overflow-hidden min-h-[480px] flex items-center">
      <div 
        class="absolute inset-0 z-0 opacity-40 bg-cover bg-center animate-hero-zoom" 
        :style="{ backgroundImage: `url(${heroBg})` }"
      ></div>
      
      <div class="max-w-7xl mx-auto w-full relative z-10 grid md:grid-cols-2 gap-8 items-center">
        <div>
          <span class="text-emerald-400 font-semibold tracking-wider text-sm uppercase mb-2 block animate-pulse">
            Play · Book · Connect
          </span>
          <h1 class="text-4xl sm:text-5xl font-extrabold leading-tight mb-4">
            Your Sports Experience <br />
            <span class="text-emerald-400">Starts Here</span>
          </h1>
          <p class="text-gray-300 text-base sm:text-lg mb-8 max-w-lg leading-relaxed">
            Find and book the best sports venues, join exciting events, play with friends, or create your own game. CombolojoSPORT brings the sports community together.
          </p>

          <!-- Search Bar Box -->
          <div class="bg-white rounded-2xl p-2 shadow-2xl flex flex-col sm:flex-row gap-2 max-w-xl text-gray-800">
            <div class="flex-1 flex items-center gap-2 px-3">
              <span class="text-gray-400">📍</span>
              <input 
                v-model="searchQuery" 
                type="text" 
                placeholder="Search venues, events or games..." 
                class="w-full bg-transparent focus:outline-none text-sm"
              />
            </div>
            <div class="border-t sm:border-t-0 sm:border-l border-gray-200 flex items-center px-3 py-2 sm:py-0">
              <select v-model="selectedType" class="bg-transparent text-sm focus:outline-none cursor-pointer text-gray-600">
                <option>All Types</option>
                <option>Football</option>
                <option>Basketball</option>
                <option>Futsal</option>
                <option>Athletics</option>
              </select>
            </div>
            <button class="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all">
              🔍 Search
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- CATEGORIES SECTION -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 mb-12">
      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        <div 
          v-for="cat in categories" 
          :key="cat.name"
          class="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 text-center border border-gray-100 cursor-pointer flex flex-col items-center justify-center group"
        >
          <div class="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 text-2xl flex items-center justify-center mb-3 leading-none shrink-0 group-hover:scale-110 transition-transform">
            <span class="flex items-center justify-center leading-none">{{ cat.icon }}</span>
          </div>
          <h3 class="font-bold text-gray-900 text-sm mb-0.5 leading-snug">{{ cat.name }}</h3>
          <p class="text-xs text-gray-400 font-normal">{{ cat.label }}</p>
        </div>
      </div>
    </section>

    <!-- TOP RATED SPORTS VENUES -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="flex justify-between items-end mb-8">
        <div>
          <span class="text-emerald-600 font-semibold text-xs uppercase tracking-widest">Featured Venues</span>
          <h2 class="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-1">Top Rated Sports Venues</h2>
          <p class="text-gray-500 text-sm mt-1">Discover and book the best venues near you. Quality facilities, fair prices, and great experiences.</p>
        </div>
        <NuxtLink to="/venues" class="text-emerald-600 hover:text-emerald-700 font-semibold text-sm flex items-center gap-1">
          View All Venues →
        </NuxtLink>
      </div>

      <!-- Venues Grid Card Display -->
      <div v-if="filteredVenues.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div 
          v-for="venue in filteredVenues" 
          :key="venue.id"
          class="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col justify-between"
        >
          <div>
            <!-- Card Image Box -->
            <div class="relative h-48 overflow-hidden bg-gray-200">
              <img :src="venue.image" :alt="venue.name" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              
              <span v-if="venue.tag" class="absolute top-3 left-3 bg-emerald-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow">
                {{ venue.tag }}
              </span>
              
              <button class="absolute top-3 right-3 bg-slate-900/40 text-white p-2 rounded-full backdrop-blur-sm hover:bg-slate-900/60 transition-colors">
                🤍
              </button>
            </div>

            <!-- Card Body -->
            <div class="p-5">
              <h3 class="font-bold text-gray-900 text-base mb-1 truncate">{{ venue.name }}</h3>
              <p class="text-xs text-gray-500 flex items-center gap-1 mb-3">
                📍 {{ venue.location }}
              </p>

              <div class="flex items-center gap-2 mb-4">
                <span class="text-xs bg-gray-100 text-gray-600 px-2.5 py-0.5 rounded-md font-medium">⚽ {{ venue.type }}</span>
                <span class="text-xs bg-gray-100 text-gray-600 px-2.5 py-0.5 rounded-md font-medium">🏢 {{ venue.badge }}</span>
              </div>

              <div class="flex justify-between items-center text-xs border-t pt-3 border-gray-100">
                <div class="flex items-center gap-1">
                  <span class="text-amber-500 font-bold">★ {{ venue.rating }}</span>
                  <span class="text-gray-400">({{ venue.reviews }})</span>
                </div>
                <div>
                  <span class="font-bold text-emerald-600 text-sm">ETB {{ venue.price }}</span>
                  <span class="text-gray-400"> / hr</span>
                </div>
              </div>
            </div>
          </div>

          <div class="px-5 pb-5">
            <button 
              @click="openVenueModal(venue)"
              class="w-full bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-medium text-xs py-2.5 rounded-xl transition-all shadow-sm hover:shadow"
            >
              View Details →
            </button>
          </div>
        </div>
      </div>

      <div v-else class="text-center py-12 text-gray-500">
        No sports venues found matching your criteria.
      </div>
    </section>

    <!-- FULL PAGE MODAL FOR VENUE DETAILS -->
    <div v-if="isModalOpen" class="fixed inset-0 z-50 overflow-y-auto bg-slate-900/80 backdrop-blur-md flex items-start justify-center p-2 sm:p-4 pt-16 sm:pt-20 animate-fade-in">
      <div class="bg-white rounded-3xl max-w-4xl w-full my-6 overflow-hidden shadow-2xl relative border border-gray-100 animate-scale-up">
        
        <!-- Modal Top Floating Close Button -->
        <button @click="closeModal" class="absolute top-4 right-4 bg-slate-900/80 hover:bg-slate-950 text-white rounded-full w-9 h-9 flex items-center justify-center font-bold z-40 backdrop-blur-sm transition-colors border border-white/20 shadow-md">
          ✕
        </button>

        <!-- Header Section: Title & Badge -->
        <div class="bg-slate-950 p-6 sm:p-8 pb-4 text-white">
          <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <span class="bg-emerald-500 text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow">
                {{ selectedVenue?.type }} • {{ selectedVenue?.badge }}
              </span>
              <h2 class="text-2xl sm:text-3xl font-extrabold mt-2 text-white">{{ selectedVenue?.name }}</h2>
              <p class="text-xs sm:text-sm text-gray-300 flex items-center gap-1 mt-1">
                📍 {{ selectedVenue?.location }}
              </p>
            </div>

            <div class="bg-slate-900/90 border border-white/10 p-3 rounded-2xl text-right shrink-0">
              <span class="text-xs text-gray-400 block">Hourly Rate</span>
              <span class="text-xl sm:text-2xl font-black text-emerald-400">ETB {{ selectedVenue?.price }}</span>
              <span class="text-xs text-gray-400"> / hour</span>
            </div>
          </div>
        </div>

        <!-- Complete Uncropped Center Image -->
        <div class="relative w-full bg-slate-950 flex items-center justify-center border-t border-slate-800/80 overflow-hidden min-h-[250px] sm:min-h-[350px]">
          
          <!-- Background Blurred Ambient Effect -->
          <img :src="selectedVenue?.image" :alt="selectedVenue?.name" class="absolute inset-0 w-full h-full object-cover blur-3xl opacity-30 scale-110" />

          <!-- Full Uncropped Center Image -->
          <img 
            :src="selectedVenue?.image" 
            :alt="selectedVenue?.name" 
            class="relative z-10 w-full max-h-[60vh] object-contain mx-auto shadow-xl" 
          />
        </div>

        <!-- Detailed Content Body -->
        <div class="p-6 sm:p-8 space-y-8">
          
          <!-- Key Metrics -->
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-gray-50 p-4 rounded-2xl border border-gray-100">
            <div>
              <span class="text-xs text-gray-400 block">Rating & Reviews</span>
              <div class="flex items-center gap-1 font-bold text-gray-800 mt-0.5">
                <span class="text-amber-500">★ {{ selectedVenue?.rating }}</span>
                <span class="text-xs text-gray-500 font-normal">({{ selectedVenue?.reviews }} reviews)</span>
              </div>
            </div>
            <div>
              <span class="text-xs text-gray-400 block">Opening Hours</span>
              <span class="font-bold text-gray-800 text-xs sm:text-sm block mt-0.5">{{ selectedVenue?.hours }}</span>
            </div>
            <div>
              <span class="text-xs text-gray-400 block">Contact Phone</span>
              <span class="font-bold text-gray-800 text-xs sm:text-sm block mt-0.5">{{ selectedVenue?.phone }}</span>
            </div>
            <div>
              <span class="text-xs text-gray-400 block">Instant Booking</span>
              <span class="text-emerald-600 font-bold text-xs sm:text-sm block mt-0.5">✓ Available</span>
            </div>
          </div>

          <!-- Description Section -->
          <div>
            <h3 class="text-sm font-bold text-gray-900 uppercase tracking-wider mb-2">About This Venue</h3>
            <p class="text-gray-600 text-sm leading-relaxed">{{ selectedVenue?.description }}</p>
          </div>

          <!-- Amenities Section -->
          <div>
            <h3 class="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3">Facility Amenities</h3>
            <div class="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div v-for="item in selectedVenue?.amenities" :key="item" class="bg-emerald-50/60 border border-emerald-100/80 p-3 rounded-xl flex items-center gap-2 text-xs text-emerald-900 font-medium">
                <span class="text-emerald-600 text-base">✓</span> {{ item }}
              </div>
            </div>
          </div>

          <!-- Venue Rules Section -->
          <div v-if="selectedVenue?.rules?.length">
            <h3 class="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3">Venue Rules & Terms</h3>
            <div class="bg-amber-50/50 border border-amber-100 p-4 rounded-2xl">
              <ul class="space-y-2 text-xs text-gray-700">
                <li v-for="(rule, idx) in selectedVenue?.rules" :key="idx" class="flex items-start gap-2">
                  <span class="text-amber-500 font-bold">•</span>
                  <span>{{ rule }}</span>
                </li>
              </ul>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex flex-col sm:flex-row gap-3 border-t border-gray-100 pt-6">
            <button @click="closeModal" class="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold text-xs py-3.5 rounded-xl transition-all text-center">
              Back to Venues
            </button>
            <button @click="handleBookNow" class="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-3.5 rounded-xl transition-all shadow-md text-center">
              Proceed to Booking
            </button>
          </div>

        </div>
      </div>
    </div>

    <!-- DOWNLOAD APP MODAL -->
    <div v-if="isDownloadModalOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div class="bg-white rounded-3xl max-w-sm w-full p-6 text-center shadow-2xl relative border border-gray-100 animate-scale-up">
        <button @click="closeDownloadModal" class="absolute top-3 right-3 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-full w-8 h-8 flex items-center justify-center font-bold z-10">
          ✕
        </button>

        <div class="w-16 h-16 bg-emerald-100 text-emerald-600 text-3xl rounded-full flex items-center justify-center mx-auto mb-4">
          📱
        </div>

        <h3 class="text-xl font-bold text-gray-900 mb-2">Get Mobile App</h3>
        <p class="text-xs text-gray-600 mb-6 leading-relaxed">
          Please download the CombolojoSPORT mobile app on your smartphone to complete venue reservations.
        </p>

        <div class="space-y-3">
          <button @click="closeDownloadModal" class="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-xl text-xs flex items-center justify-center gap-2 transition-all">
            <span>📲</span> Download Mobile App
          </button>
          <button @click="closeDownloadModal" class="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-2.5 rounded-xl text-xs transition-all">
            Cancel
          </button>
        </div>
      </div>
    </div>

    <!-- UPCOMING EVENTS SECTION -->
    <section class="bg-slate-900 text-white py-16 px-4 sm:px-6 lg:px-8">
      <div class="max-w-7xl mx-auto">
        <div class="grid lg:grid-cols-4 gap-8">
          <div>
            <span class="text-emerald-400 font-semibold text-xs uppercase tracking-widest">Upcoming Events</span>
            <h2 class="text-2xl sm:text-3xl font-extrabold mt-1 mb-3">Don't Miss These Events</h2>
            <p class="text-gray-400 text-sm mb-6 leading-relaxed">
              Tournaments, friendly matches, and community events. Be part of the action!
            </p>
            <NuxtLink to="/events" class="inline-block bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl text-xs font-semibold transition-all">
              View All Events →
            </NuxtLink>
          </div>

          <div class="lg:col-span-3 grid sm:grid-cols-3 gap-4">
            <div 
              v-for="event in events" 
              :key="event.id"
              class="bg-slate-800/80 hover:bg-slate-800 rounded-2xl overflow-hidden border border-slate-700 p-4 relative flex flex-col justify-between transition-all duration-300 hover:border-emerald-500/50 group"
            >
              <div>
                <div class="relative h-32 rounded-xl overflow-hidden mb-3 bg-slate-700">
                  <img :src="event.image" :alt="event.title" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  <span class="absolute top-2 left-2 bg-white text-slate-900 font-bold text-center px-2 py-1 rounded-lg text-xs leading-tight shadow">
                    <strong class="block text-[10px] text-emerald-600 uppercase">{{ event.month }}</strong>
                    {{ event.day }}
                  </span>
                </div>
                <h4 class="font-bold text-sm mb-1 text-white truncate">{{ event.title }}</h4>
                <p class="text-xs text-gray-400 mb-1">📍 {{ event.location }}</p>
                <p class="text-[11px] text-gray-400 mb-4">⏰ {{ event.time }}</p>
              </div>

              <!-- Redirects to Contact Page -->
              <NuxtLink to="/contact" class="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-medium py-2 rounded-lg text-center transition-all block">
                Join Event
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- STATS COUNTER SECTION -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-b border-gray-200">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        <div class="flex items-center justify-center gap-3">
          <span class="text-3xl bg-emerald-50 text-emerald-600 p-3 rounded-2xl">⚽</span>
          <div class="text-left">
            <h4 class="text-xl font-black text-gray-900">50+</h4>
            <p class="text-xs text-gray-500 font-medium">Active Venues</p>
          </div>
        </div>

        <div class="flex items-center justify-center gap-3">
          <span class="text-3xl bg-emerald-50 text-emerald-600 p-3 rounded-2xl">👥</span>
          <div class="text-left">
            <h4 class="text-xl font-black text-gray-900">10K+</h4>
            <p class="text-xs text-gray-500 font-medium">Registered Users</p>
          </div>
        </div>

        <div class="flex items-center justify-center gap-3">
          <span class="text-3xl bg-emerald-50 text-emerald-600 p-3 rounded-2xl">🏆</span>
          <div class="text-left">
            <h4 class="text-xl font-black text-gray-900">120+</h4>
            <p class="text-xs text-gray-500 font-medium">Tournaments</p>
          </div>
        </div>

        <div class="flex items-center justify-center gap-3">
          <span class="text-3xl bg-emerald-50 text-emerald-600 p-3 rounded-2xl">⭐</span>
          <div class="text-left">
            <h4 class="text-xl font-black text-gray-900">4.9</h4>
            <p class="text-xs text-gray-500 font-medium">Average Rating</p>
          </div>
        </div>
      </div>
    </section>

    <!-- READY TO PLAY? CTA SECTION WITH VENUE IMAGES -->
    <section class="relative bg-slate-950 text-white py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <!-- Background Venue Images Grid with Overlay -->
      <div class="absolute inset-0 grid grid-cols-2 sm:grid-cols-4 gap-2 opacity-15 pointer-events-none scale-105">
        <img :src="img1" class="w-full h-full object-cover" />
        <img :src="img2" class="w-full h-full object-cover" />
        <img :src="img3" class="w-full h-full object-cover" />
        <img :src="img4" class="w-full h-full object-cover" />
      </div>

      <!-- Linear Gradient Overlay to enhance text readability -->
      <div class="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-slate-950/80"></div>

      <!-- Main Content -->
      <div class="relative z-10 max-w-4xl mx-auto text-center space-y-6">
        <span class="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider inline-block">
          Join The Community
        </span>
        
        <h2 class="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
          Ready to Play? <br />
          <span class="text-emerald-400">Find Players & Matches Nearby</span>
        </h2>
        
        <p class="text-gray-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          Looking for opponents, extra teammates, or open games? Jump straight into Just Play to organize or join matches instantly!
        </p>

        <div class="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <NuxtLink to="/just-play" class="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm px-8 py-3.5 rounded-xl shadow-lg transition-all">
            Find Matches Now
          </NuxtLink>
          <button @click="isDownloadModalOpen = true" class="w-full sm:w-auto bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm px-8 py-3.5 rounded-xl border border-slate-700 transition-all">
            Get Mobile App
          </button>
        </div>
      </div>
    </section>

   

  </div>
</template>