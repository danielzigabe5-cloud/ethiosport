<script setup>
import { ref, computed, watch } from 'vue'

// SEO Page Title
useHead({ title: 'Search Sports & Games - EthioSport' })

const isModalOpen = ref(false)
const selectedSportCategory = ref('All')

// Search & Filter Input States
const searchQuery = ref('')
const selectedCity = ref('All')
const selectedSubCity = ref('All')
const selectedSport = ref('All')
const selectedDate = ref('')

// Cities Options
const cities = [
  'Addis Ababa',
  'Bahir Dar',
  'Hawassa',
  'Mekelle',
  'Dire Dawa',
  'Adama'
]

// Available Sub-Cities in Addis Ababa with Sports Venues
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

// Sports Options
const sportsOptions = ['Football', 'Basketball', 'Tennis', 'Volleyball']

// Sample Games Mock Data
const games = ref([
  {
    id: 1,
    hostName: 'አበበ በቀለ',
    hostAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
    venue: 'ሳርቤት ፉትሳል ሜዳ',
    city: 'Addis Ababa',
    subCity: 'Nifas Silk-Lafto',
    sport: 'Football',
    time: '2026-08-10 05:00 PM',
    date: '2026-08-10',
    joinedPlayers: 7,
    totalPlayers: 10,
    pricePerPerson: 80,
    isJoined: false
  },
  {
    id: 2,
    hostName: 'ኬቨን ዴብሩይነ',
    hostAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
    venue: 'ቦሌ አሬና ቴኒስ',
    city: 'Addis Ababa',
    subCity: 'Bole',
    sport: 'Tennis',
    time: '2026-08-11 04:00 PM',
    date: '2026-08-11',
    joinedPlayers: 4,
    totalPlayers: 4,
    pricePerPerson: 300,
    isJoined: false
  },
  {
    id: 3,
    hostName: 'ዮናስ ታደሰ',
    hostAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop',
    venue: 'ሲኤምሲ ቅርጫት ኳስ ሜዳ',
    city: 'Addis Ababa',
    subCity: 'Yeka',
    sport: 'Basketball',
    time: '2026-08-10 07:00 PM',
    date: '2026-08-10',
    joinedPlayers: 5,
    totalPlayers: 8,
    pricePerPerson: 70,
    isJoined: false
  }
])

// Reset sub-city selection whenever city changes
watch(selectedCity, (newCity) => {
  if (newCity !== 'Addis Ababa') {
    selectedSubCity.value = 'All'
  }
})

// Form input state
const newGame = ref({
  venue: '',
  city: 'Addis Ababa',
  subCity: 'Bole',
  sport: 'Football',
  time: '',
  date: new Date().toISOString().split('T')[0],
  totalPlayers: 10,
  pricePerPerson: 100
})

// Create game logic
const createGame = () => {
  if (!newGame.value.venue || !newGame.value.time) return

  games.value.unshift({
    id: Date.now(),
    hostName: 'እርስዎ (You)',
    hostAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop',
    venue: newGame.value.venue,
    city: newGame.value.city,
    subCity: newGame.value.city === 'Addis Ababa' ? newGame.value.subCity : '',
    sport: newGame.value.sport,
    time: newGame.value.time,
    date: newGame.value.date,
    joinedPlayers: 1,
    totalPlayers: newGame.value.totalPlayers,
    pricePerPerson: newGame.value.pricePerPerson,
    isJoined: true
  })

  // Reset Form
  newGame.value = {
    venue: '',
    city: 'Addis Ababa',
    subCity: 'Bole',
    sport: 'Football',
    time: '',
    date: new Date().toISOString().split('T')[0],
    totalPlayers: 10,
    pricePerPerson: 100
  }
  isModalOpen.value = false
}

// Join Game Logic
const toggleJoinGame = (game) => {
  if (game.isJoined) {
    game.joinedPlayers--
    game.isJoined = false
  } else {
    if (game.joinedPlayers < game.totalPlayers) {
      game.joinedPlayers++
      game.isJoined = true
    }
  }
}

// Computed Filtered List
const filteredGames = computed(() => {
  return games.value.filter(game => {
    const matchesCategoryTab = selectedSportCategory.value === 'All' || game.sport === selectedSportCategory.value
    
    const query = searchQuery.value.trim().toLowerCase()
    const matchesText = !query || 
      game.venue.toLowerCase().includes(query) || 
      game.hostName.toLowerCase().includes(query) ||
      game.sport.toLowerCase().includes(query)

    const matchesCity = selectedCity.value === 'All' || game.city === selectedCity.value
    const matchesSubCity = selectedCity.value !== 'Addis Ababa' || selectedSubCity.value === 'All' || game.subCity === selectedSubCity.value
    const matchesSport = selectedSport.value === 'All' || game.sport === selectedSport.value
    const matchesDate = !selectedDate.value || game.date === selectedDate.value

    return matchesCategoryTab && matchesText && matchesCity && matchesSubCity && matchesSport && matchesDate
  })
})

const resetSearch = () => {
  searchQuery.value = ''
  selectedCity.value = 'All'
  selectedSubCity.value = 'All'
  selectedSport.value = 'All'
  selectedDate.value = ''
}
</script>

<template>
  <div class="min-h-screen bg-slate-50 dark:bg-[#070b10] text-slate-800 dark:text-slate-100 font-sans pb-16 pt-6">
    
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      
      <!-- Top Section Banner & Action Button -->
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-[#131c27] p-6 rounded-2xl border border-slate-200 dark:border-[#212e3e]">
        <div>
          <h1 class="text-2xl font-black text-slate-900 dark:text-white">የጨዋታ ጥሪዎች (Join Games)</h1>
          <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">ተጫዋች የሚጎድላቸውን ጨዋታዎች ይቀላቀሉ ወይም አዲስ ጥሪ ይክፈቱ</p>
        </div>
        <button 
          @click="isModalOpen = true"
          class="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm rounded-xl shadow-md transition cursor-pointer"
        >
          + Create Game (አዲስ ጥሪ)
        </button>
      </div>

      <!-- MAIN SEARCH BAR & DYNAMIC FILTERS -->
      <div class="bg-[#242628] p-4 sm:p-5 rounded-2xl shadow-xl space-y-3">
        <!-- Text Input Search Bar -->
        <div>
          <input 
            v-model="searchQuery"
            type="text" 
            placeholder="Search by game name, venue, or host..."
            class="w-full bg-[#1b1c1e] text-slate-200 placeholder-slate-400 text-sm px-4 py-3.5 rounded-xl border border-transparent focus:border-[#a3ff12] focus:outline-none transition"
          />
        </div>

        <!-- Dynamic Filter Controls -->
        <div 
          class="grid gap-3 pt-1" 
          :class="selectedCity === 'Addis Ababa' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-5' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'"
        >
          <!-- Cities Selection Dropdown -->
          <div class="relative">
            <select 
              v-model="selectedCity"
              class="w-full bg-[#1b1c1e] text-slate-200 text-sm font-medium px-4 py-3 rounded-xl border border-transparent focus:border-[#a3ff12] focus:outline-none appearance-none cursor-pointer"
            >
              <option value="All">All Cities</option>
              <option v-for="c in cities" :key="c" :value="c">{{ c }}</option>
            </select>
            <span class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none text-xs">▼</span>
          </div>

          <!-- Sub-Cities Dropdown (Renders only when Addis Ababa is selected) -->
          <div v-if="selectedCity === 'Addis Ababa'" class="relative">
            <select 
              v-model="selectedSubCity"
              class="w-full bg-[#1b1c1e] text-slate-200 text-sm font-medium px-4 py-3 rounded-xl border border-transparent focus:border-[#a3ff12] focus:outline-none appearance-none cursor-pointer"
            >
              <option value="All">All Sub-Cities (ክፍለ ከተማ)</option>
              <option v-for="sc in addisSubCitiesWithVenues" :key="sc" :value="sc">{{ sc }}</option>
            </select>
            <span class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none text-xs">▼</span>
          </div>

          <!-- All Sports Dropdown -->
          <div class="relative">
            <select 
              v-model="selectedSport"
              class="w-full bg-[#1b1c1e] text-slate-200 text-sm font-medium px-4 py-3 rounded-xl border border-transparent focus:border-[#a3ff12] focus:outline-none appearance-none cursor-pointer"
            >
              <option value="All">All Sports</option>
              <option v-for="s in sportsOptions" :key="s" :value="s">{{ s }}</option>
            </select>
            <span class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none text-xs">▼</span>
          </div>

          <!-- Date Selector -->
          <div class="relative">
            <input 
              v-model="selectedDate"
              type="date" 
              class="w-full bg-[#1b1c1e] text-slate-200 text-sm font-medium px-4 py-3 rounded-xl border border-transparent focus:border-[#a3ff12] focus:outline-none appearance-none cursor-pointer"
            />
          </div>

          <!-- Search Button -->
          <button 
            type="button" 
            class="w-full bg-[#a3ff12] hover:bg-[#8ee600] text-black font-extrabold text-sm py-3 rounded-xl shadow-md transition-transform active:scale-95 flex items-center justify-center cursor-pointer"
          >
            Search
          </button>
        </div>
      </div>

      <!-- Category Filter Tabs -->
      <div class="flex items-center gap-2 overflow-x-auto pb-2">
        <button 
          v-for="cat in ['All', 'Football', 'Basketball', 'Tennis']" 
          :key="cat"
          @click="selectedSportCategory = cat"
          :class="[
            'px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer',
            selectedSportCategory === cat 
              ? 'bg-slate-900 dark:bg-emerald-500 text-white dark:text-slate-950 shadow-md' 
              : 'bg-white dark:bg-[#131c27] border border-slate-200 dark:border-[#212e3e] text-slate-600 dark:text-slate-300'
          ]"
        >
          {{ cat === 'All' ? 'ሁሉም ጨዋታዎች' : cat }}
        </button>
      </div>

      <!-- Empty State -->
      <div v-if="filteredGames.length === 0" class="text-center py-16 bg-white dark:bg-[#131c27] rounded-2xl border border-slate-200 dark:border-[#212e3e]">
        <span class="text-4xl">⚽</span>
        <h3 class="text-lg font-bold mt-2">ምንም ጨዋታ አልተገኘም</h3>
        <p class="text-slate-500 text-xs mt-1">በዚህ ፍለጋ የተከፈተ የጨዋታ ጥሪ የለም። እርሶ አዲስ ጥሪ መክፈት ይችላሉ!</p>
        <button @click="resetSearch" class="mt-4 text-xs font-bold text-emerald-500 hover:underline">ፍለጋውን አጽዳ</button>
      </div>

      <!-- Game Cards Grid -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div 
          v-for="game in filteredGames" 
          :key="game.id" 
          class="bg-white dark:bg-[#131c27] p-6 rounded-2xl border border-slate-200 dark:border-[#212e3e] space-y-5 flex flex-col justify-between hover:shadow-lg transition"
        >
          <div class="space-y-4">
            <!-- Host Info -->
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-3">
                <img :src="game.hostAvatar" :alt="game.hostName" class="w-10 h-10 rounded-full object-cover border border-emerald-500/30" />
                <div>
                  <h4 class="font-bold text-sm text-slate-900 dark:text-white">{{ game.hostName }}</h4>
                  <span class="text-[10px] text-emerald-500 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded-md">Host</span>
                </div>
              </div>
              <span class="text-[11px] font-bold text-slate-400 bg-slate-100 dark:bg-[#0b111a] px-2.5 py-1 rounded-md">
                {{ game.sport }}
              </span>
            </div>

            <!-- Game Details -->
            <div class="space-y-1.5 text-xs text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-[#0b111a] p-3 rounded-xl border border-slate-100 dark:border-[#212e3e]">
              <p class="flex items-center gap-1.5">
                <span>📍</span> 
                <strong class="text-slate-900 dark:text-white">
                  {{ game.venue }} ({{ game.city }}<span v-if="game.subCity">, {{ game.subCity }}</span>)
                </strong>
              </p>
              <p class="flex items-center gap-1.5">
                <span>⏰</span> {{ game.time }}
              </p>
              <p class="flex items-center gap-1.5">
                <span>💰</span> <span class="font-bold text-emerald-500">{{ game.pricePerPerson }} ETB</span> / ሰው
              </p>
            </div>

            <!-- Progress Bar Indicator -->
            <div class="space-y-1.5">
              <div class="flex justify-between text-xs font-bold">
                <span class="text-slate-500">ተጫዋቾች</span>
                <span :class="game.joinedPlayers === game.totalPlayers ? 'text-rose-500' : 'text-emerald-500'">
                  {{ game.joinedPlayers }}/{{ game.totalPlayers }} Joined
                </span>
              </div>
              <div class="w-full h-2 bg-slate-100 dark:bg-[#0b111a] rounded-full overflow-hidden">
                <div 
                  class="h-full bg-emerald-500 transition-all duration-300"
                  :style="{ width: `${(game.joinedPlayers / game.totalPlayers) * 100}%` }"
                  :class="{ 'bg-rose-500': game.joinedPlayers === game.totalPlayers }"
                ></div>
              </div>
            </div>
          </div>

          <!-- Action Button -->
          <button 
            @click="toggleJoinGame(game)"
            :disabled="game.joinedPlayers >= game.totalPlayers && !game.isJoined"
            :class="[
              'w-full py-2.5 font-bold text-xs rounded-xl transition cursor-pointer',
              game.isJoined 
                ? 'bg-amber-500 hover:bg-amber-400 text-slate-950' 
                : game.joinedPlayers >= game.totalPlayers 
                  ? 'bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed' 
                  : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-md'
            ]"
          >
            <template v-if="game.isJoined">Leave Game (ውጣ)</template>
            <template v-else-if="game.joinedPlayers >= game.totalPlayers">Full (ተሞልቷል)</template>
            <template v-else>Join Game &rarr;</template>
          </button>

        </div>
      </div>

      <!-- JOIN WITH US & APP DOWNLOAD SECTION -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
        <!-- Join With Us CTA -->
        <div class="bg-gradient-to-r from-emerald-600 to-teal-700 p-6 sm:p-8 rounded-2xl text-white space-y-4 shadow-xl flex flex-col justify-between">
          <div>
            <span class="text-xs font-bold uppercase tracking-wider bg-white/20 px-3 py-1 rounded-full">ለስፖርት ማዕከላት</span>
            <h3 class="text-2xl font-black mt-3">Join With Us (ከእኛ ጋር ይስሩ)</h3>
            <p class="text-xs sm:text-sm text-emerald-100 mt-2 leading-relaxed">
              የራስዎ የስፖርት ሜዳ አለዎት? በEthioSport መተግበሪያ ላይ በመመዝገብ ሜዳዎን ያስተዳድሩ፣ ገቢዎን ያሳድጉ።
            </p>
          </div>
          <NuxtLink 
            to="/business/register" 
            class="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white hover:bg-emerald-50 text-slate-950 font-extrabold text-xs sm:text-sm rounded-xl shadow-md transition"
          >
            ሜዳዎን ያስመዝግቡ (Partner Registration) &rarr;
          </NuxtLink>
        </div>

        <!-- App Store & Google Play Download -->
        <div class="bg-slate-900 border border-slate-800 p-6 sm:p-8 rounded-2xl text-white space-y-5 flex flex-col justify-between">
          <div>
            <span class="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full">Mobile App</span>
            <h3 class="text-2xl font-black mt-3">መተግበሪያችንን ያውርዱ</h3>
            <p class="text-xs sm:text-sm text-slate-400 mt-2 leading-relaxed">
              በቀላሉ በስልክዎ ሜዳዎችን ለመያዝ እና ከጓደኞችዎ ጋር ለመጫወት የEthioSport ሞባይል መተግበሪያን ያውርዱ።
            </p>
          </div>
          
          <div class="flex flex-wrap items-center gap-3">
            <!-- Google Play Button -->
            <a 
              href="https://play.google.com" 
              target="_blank" 
              class="flex items-center gap-3 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl transition shadow-md"
            >
              <svg class="w-6 h-6 fill-current text-emerald-400" viewBox="0 0 24 24">
                <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L18.81,13.12C19.44,12.5 19.44,11.5 18.81,10.88L16.81,8.88L14.75,10.94L16.81,15.12M4.5,3.32L14,12.82L15.4,11.42L4.5,0.52C4.5,0.52 4.5,3.32 4.5,3.32Z"/>
              </svg>
              <div class="text-left">
                <div class="text-[9px] uppercase tracking-wide text-slate-400">Get it on</div>
                <div class="text-xs font-bold text-white">Google Play</div>
              </div>
            </a>

            <!-- App Store Button -->
            <a 
              href="https://apple.com/app-store" 
              target="_blank" 
              class="flex items-center gap-3 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl transition shadow-md"
            >
              <svg class="w-6 h-6 fill-current text-white" viewBox="0 0 24 24">
                <path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,21.97C7.79,22 6.82,20.68 5.97,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.1 17.41,12.63C17.44,15.65 20.06,16.66 20.09,16.67C20.06,16.74 19.67,18.11 18.71,19.5M13,3.5C13.73,2.67 14.94,2.04 15.94,2C16.07,3.17 15.6,4.35 14.9,5.19C14.21,6.04 13.07,6.7 11.95,6.61C11.8,5.46 12.36,4.26 13,3.5Z"/>
              </svg>
              <div class="text-left">
                <div class="text-[9px] uppercase tracking-wide text-slate-400">Download on the</div>
                <div class="text-xs font-bold text-white">App Store</div>
              </div>
            </a>
          </div>
        </div>
      </div>

      <!-- Create Game Modal (Pop-up Window) -->
      <div v-if="isModalOpen" class="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
        <div class="bg-white dark:bg-[#131c27] max-w-md w-full p-6 rounded-2xl border border-slate-200 dark:border-[#212e3e] space-y-6 shadow-2xl">
          <div class="flex justify-between items-center pb-3 border-b border-slate-100 dark:border-[#212e3e]">
            <h3 class="font-black text-lg text-slate-900 dark:text-white">አዲስ ጨዋታ ይክፈቱ</h3>
            <button @click="isModalOpen = false" class="text-slate-400 hover:text-white text-lg">✕</button>
          </div>

          <form @submit.prevent="createGame" class="space-y-4 text-xs font-semibold">
            <div>
              <label class="block mb-1 text-slate-700 dark:text-slate-300">የሜዳ ስም / ቦታ</label>
              <input 
                v-model="newGame.venue" 
                type="text" 
                required
                placeholder="ለምሳሌ: ሳርቤት ፉትሳል" 
                class="w-full p-3 rounded-xl bg-slate-50 dark:bg-[#0b111a] border border-slate-200 dark:border-[#212e3e] text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500" 
              />
            </div>

            <div>
              <label class="block mb-1 text-slate-700 dark:text-slate-300">ከተማ</label>
              <select 
                v-model="newGame.city"
                class="w-full p-3 rounded-xl bg-slate-50 dark:bg-[#0b111a] border border-slate-200 dark:border-[#212e3e] text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option v-for="c in cities" :key="c" :value="c">{{ c }}</option>
              </select>
            </div>

            <div v-if="newGame.city === 'Addis Ababa'">
              <label class="block mb-1 text-slate-700 dark:text-slate-300">ክፍለ ከተማ</label>
              <select 
                v-model="newGame.subCity"
                class="w-full p-3 rounded-xl bg-slate-50 dark:bg-[#0b111a] border border-slate-200 dark:border-[#212e3e] text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option v-for="sc in addisSubCitiesWithVenues" :key="sc" :value="sc">{{ sc }}</option>
              </select>
            </div>

            <div>
              <label class="block mb-1 text-slate-700 dark:text-slate-300">የስፖርት ዓይነት</label>
              <select 
                v-model="newGame.sport"
                class="w-full p-3 rounded-xl bg-slate-50 dark:bg-[#0b111a] border border-slate-200 dark:border-[#212e3e] text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="Football">⚽ Football (ፉትሳል)</option>
                <option value="Basketball">🏀 Basketball (ቅርጫት ኳስ)</option>
                <option value="Tennis">🎾 Tennis (ቴኒስ)</option>
              </select>
            </div>

            <div>
              <label class="block mb-1 text-slate-700 dark:text-slate-300">ቀን እና ሰዓት</label>
              <input 
                v-model="newGame.time" 
                type="text" 
                required
                placeholder="ለምሳሌ: 2026-08-10 05:00 PM" 
                class="w-full p-3 rounded-xl bg-slate-50 dark:bg-[#0b111a] border border-slate-200 dark:border-[#212e3e] text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500" 
              />
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block mb-1 text-slate-700 dark:text-slate-300">የሚያስፈልጉ ተጫዋቾች</label>
                <input 
                  v-model.number="newGame.totalPlayers" 
                  type="number" 
                  min="2"
                  max="30"
                  required
                  class="w-full p-3 rounded-xl bg-slate-50 dark:bg-[#0b111a] border border-slate-200 dark:border-[#212e3e] text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500" 
                />
              </div>
              <div>
                <label class="block mb-1 text-slate-700 dark:text-slate-300">የሰው ድርሻ (ETB)</label>
                <input 
                  v-model.number="newGame.pricePerPerson" 
                  type="number" 
                  min="0"
                  required
                  class="w-full p-3 rounded-xl bg-slate-50 dark:bg-[#0b111a] border border-slate-200 dark:border-[#212e3e] text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500" 
                />
              </div>
            </div>

            <div class="flex justify-end gap-3 pt-4 border-t border-slate-100 dark:border-[#212e3e]">
              <button 
                type="button" 
                @click="isModalOpen = false"
                class="px-4 py-2.5 bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl font-bold"
              >
                ሰርዝ
              </button>
              <button 
                type="submit" 
                class="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm rounded-xl shadow-md cursor-pointer"
              >
                ጥሪውን ይለጥፉ (Publish)
              </button>
            </div>
          </form>
        </div>
      </div>

    </div>
  </div>
</template>