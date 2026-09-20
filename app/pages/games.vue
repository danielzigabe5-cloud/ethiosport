<script setup>
import { ref, computed } from 'vue'

// SEO & Page Title
useHead({ 
  title: 'EthioSport - Pick-up Games',
  meta: [
    { name: 'description', content: 'Find and join Futsal, Basketball, and other sports games near you, or create your own match.' }
  ]
})

// UI States
const isModalOpen = ref(false)
const isLoading = ref(false)
const selectedSportCategory = ref('All')

// Search & Filter States
const searchQuery = ref('')
const selectedCity = ref('Addis Ababa')
const selectedSubCity = ref('All')
const selectedLevel = ref('All')
const selectedDate = ref('')

const cities = ['Addis Ababa', 'Bahir Dar', 'Hawassa', 'Adama', 'Dire Dawa']
const subCities = ['Bole', 'Yeka', 'Kirkos', 'Arada', 'Lideta', 'Nifas Silk', 'Kolfe', 'Gullele', 'Akaky', 'Lemi Kura']
const levels = ['Casual (Recreational)', 'Intermediate', 'Competitive']
const sportsOptions = [
  { name: 'Football', icon: '⚽' },
  { name: 'Basketball', icon: '🏀' },
  { name: 'Tennis', icon: '🎾' },
  { name: 'Volleyball', icon: '🏐' },
  { name: 'Padel', icon: '🏓' }
]

// Realistic Ethiopian Match Data
const games = ref([
  {
    id: 1,
    hostName: 'Abel Tesfaye',
    hostAvatar: 'https://ui-avatars.com/api/?name=Abel+Tesfaye&background=10b981&color=fff',
    venue: 'Sarbet Futsal Field',
    city: 'Addis Ababa',
    subCity: 'Nifas Silk',
    sport: 'Football',
    level: 'Intermediate',
    time: '05:30 PM',
    date: new Date().toISOString().split('T')[0],
    joinedPlayers: 9,
    totalPlayers: 10,
    price: 120,
    isJoined: false,
    isUrgent: true
  },
  {
    id: 2,
    hostName: 'Samrawit Demisse',
    hostAvatar: 'https://ui-avatars.com/api/?name=Samri+Demisse&background=f59e0b&color=fff',
    venue: 'Bole Atlas Tennis Club',
    city: 'Addis Ababa',
    subCity: 'Bole',
    sport: 'Tennis',
    level: 'Competitive',
    time: '04:00 PM',
    date: '2026-09-25',
    joinedPlayers: 2,
    totalPlayers: 4,
    price: 250,
    isJoined: false,
    isUrgent: false
  },
  {
    id: 3,
    hostName: 'Yonas Kassahun',
    hostAvatar: 'https://ui-avatars.com/api/?name=Yonas+K&background=3b82f6&color=fff',
    venue: 'CMC Sport Center',
    city: 'Addis Ababa',
    subCity: 'Yeka',
    sport: 'Basketball',
    level: 'Casual (Recreational)',
    time: '07:00 PM',
    date: new Date().toISOString().split('T')[0],
    joinedPlayers: 12,
    totalPlayers: 12,
    price: 80,
    isJoined: false,
    isUrgent: false
  }
])

// Filter Logic
const filteredGames = computed(() => {
  return games.value.filter(game => {
    const matchesTab = selectedSportCategory.value === 'All' || game.sport === selectedSportCategory.value
    const matchesSearch = !searchQuery.value || game.venue.toLowerCase().includes(searchQuery.value.toLowerCase()) || game.hostName.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesCity = selectedCity.value === 'All' || game.city === selectedCity.value
    const matchesSubCity = selectedSubCity.value === 'All' || game.subCity === selectedSubCity.value
    const matchesLevel = selectedLevel.value === 'All' || game.level.includes(selectedLevel.value)
    const matchesDate = !selectedDate.value || game.date === selectedDate.value
    
    return matchesTab && matchesSearch && matchesCity && matchesSubCity && matchesLevel && matchesDate
  })
})

// New Game State
const newMatch = ref({
  venue: '', city: 'Addis Ababa', subCity: 'Bole', sport: 'Football',
  level: 'Intermediate', date: '', time: '', players: 10, price: 100
})

const handleCreateGame = () => {
  isLoading.value = true
  setTimeout(() => {
    games.value.unshift({
      id: Date.now(),
      hostName: 'You (Host)',
      hostAvatar: 'https://ui-avatars.com/api/?name=You&background=10b981&color=fff',
      venue: newMatch.value.venue,
      city: newMatch.value.city,
      subCity: newMatch.value.subCity,
      sport: newMatch.value.sport,
      level: newMatch.value.level,
      time: newMatch.value.time,
      date: newMatch.value.date,
      joinedPlayers: 1,
      totalPlayers: newMatch.value.players,
      price: newMatch.value.price,
      isJoined: true,
      isUrgent: false
    })
    isModalOpen.value = false
    isLoading.value = false
  }, 800)
}

const toggleJoin = (game) => {
  if (game.isJoined) {
    game.joinedPlayers--
    game.isJoined = false
  } else if (game.joinedPlayers < game.totalPlayers) {
    game.joinedPlayers++
    game.isJoined = true
  }
}

const getSportIcon = (sportName) => {
  const found = sportsOptions.find(s => s.name === sportName)
  return found ? found.icon : '🎮'
}
</script>

<template>
  <div class="min-h-screen bg-slate-50 dark:bg-[#070b10] text-slate-800 dark:text-slate-100 font-sans pb-24 relative overflow-hidden selection:bg-emerald-500 selection:text-white">
    
    <!-- Ambient Background Glows -->
    <div class="absolute top-0 left-1/4 w-[500px] h-[300px] bg-emerald-500/10 blur-[130px] pointer-events-none rounded-full"></div>
    <div class="absolute top-1/3 right-10 w-[400px] h-[400px] bg-teal-500/10 blur-[150px] pointer-events-none rounded-full"></div>

    <!-- Header / Navbar -->
    <header class="bg-white/80 dark:bg-[#0f172a]/80 backdrop-blur-xl border-b border-slate-200/80 dark:border-slate-800/80 sticky top-0 z-40 shadow-xs">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 bg-gradient-to-tr from-emerald-600 to-teal-400 rounded-xl flex items-center justify-center text-white font-black text-lg shadow-md shadow-emerald-500/20">
            ES
          </div>
          <div>
            <h1 class="text-xl font-black tracking-tight leading-none text-slate-900 dark:text-white">
              ETHIO<span class="text-emerald-500">SPORT</span>
            </h1>
            <span class="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Community Hub</span>
          </div>
        </div>
        
        <button 
          @click="isModalOpen = true"
          class="bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-white px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all duration-200 flex items-center gap-2 shadow-lg shadow-emerald-500/25 cursor-pointer"
        >
          <span class="text-lg leading-none">+</span> Host a Match
        </button>
      </div>
    </header>

    <main class="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8 relative z-10">
      
      <!-- Search & Filters Container -->
      <section class="bg-white dark:bg-[#131c27] p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-[#212e3e] shadow-xl shadow-slate-200/40 dark:shadow-none space-y-6">
        
        <!-- Search Input -->
        <div class="relative">
          <span class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg">🔍</span>
          <input 
            v-model="searchQuery"
            type="text" 
            placeholder="Search by venue name, sub-city, or host..."
            class="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-[#0b111a] text-slate-900 dark:text-slate-100 rounded-2xl border border-slate-200 dark:border-[#212e3e] focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all outline-none text-sm sm:text-base font-medium placeholder:text-slate-400"
          />
        </div>

        <!-- Filter Selects Grid -->
        <div class="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div class="space-y-1.5">
            <label class="text-[11px] font-bold uppercase tracking-wider text-slate-400 ml-1">City</label>
            <select v-model="selectedCity" class="w-full p-3 bg-slate-50 dark:bg-[#0b111a] text-slate-800 dark:text-slate-200 rounded-xl border border-slate-200 dark:border-[#212e3e] focus:border-emerald-500 text-xs sm:text-sm font-semibold outline-none">
              <option value="All">All Cities</option>
              <option v-for="c in cities" :key="c" :value="c">{{ c }}</option>
            </select>
          </div>

          <div class="space-y-1.5">
            <label class="text-[11px] font-bold uppercase tracking-wider text-slate-400 ml-1">Sub-City</label>
            <select v-model="selectedSubCity" class="w-full p-3 bg-slate-50 dark:bg-[#0b111a] text-slate-800 dark:text-slate-200 rounded-xl border border-slate-200 dark:border-[#212e3e] focus:border-emerald-500 text-xs sm:text-sm font-semibold outline-none">
              <option value="All">All Sub-cities</option>
              <option v-for="sc in subCities" :key="sc" :value="sc">{{ sc }}</option>
            </select>
          </div>

          <div class="space-y-1.5">
            <label class="text-[11px] font-bold uppercase tracking-wider text-slate-400 ml-1">Skill Level</label>
            <select v-model="selectedLevel" class="w-full p-3 bg-slate-50 dark:bg-[#0b111a] text-slate-800 dark:text-slate-200 rounded-xl border border-slate-200 dark:border-[#212e3e] focus:border-emerald-500 text-xs sm:text-sm font-semibold outline-none">
              <option value="All">All Skill Levels</option>
              <option v-for="l in levels" :key="l" :value="l">{{ l }}</option>
            </select>
          </div>

          <div class="space-y-1.5">
            <label class="text-[11px] font-bold uppercase tracking-wider text-slate-400 ml-1">Date</label>
            <input type="date" v-model="selectedDate" class="w-full p-3 bg-slate-50 dark:bg-[#0b111a] text-slate-800 dark:text-slate-200 rounded-xl border border-slate-200 dark:border-[#212e3e] focus:border-emerald-500 text-xs sm:text-sm font-semibold outline-none" />
          </div>
        </div>
      </section>

      <!-- Category Filter Pills -->
      <div class="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-hide">
        <button 
          @click="selectedSportCategory = 'All'"
          :class="[
            'px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 whitespace-nowrap cursor-pointer',
            selectedSportCategory === 'All' 
              ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/20' 
              : 'bg-white dark:bg-[#131c27] text-slate-600 dark:text-slate-400 border border-slate-200/80 dark:border-[#212e3e] hover:border-emerald-500/50'
          ]"
        >
          🎯 All Matches
        </button>
        <button 
          v-for="sport in sportsOptions" 
          :key="sport.name"
          @click="selectedSportCategory = sport.name"
          :class="[
            'px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 whitespace-nowrap flex items-center gap-2 cursor-pointer',
            selectedSportCategory === sport.name 
              ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/20' 
              : 'bg-white dark:bg-[#131c27] text-slate-600 dark:text-slate-400 border border-slate-200/80 dark:border-[#212e3e] hover:border-emerald-500/50'
          ]"
        >
          <span>{{ sport.icon }}</span> {{ sport.name }}
        </button>
      </div>

      <!-- Games Cards Grid -->
      <div v-if="filteredGames.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div 
          v-for="game in filteredGames" 
          :key="game.id" 
          class="group bg-white dark:bg-[#131c27] rounded-3xl border border-slate-200/80 dark:border-[#212e3e] hover:border-emerald-500/50 shadow-sm hover:shadow-xl hover:shadow-emerald-500/5 transition-all duration-300 flex flex-col justify-between overflow-hidden relative"
        >
          <!-- Top Card Banner & Host Info -->
          <div class="p-6 space-y-5">
            <div class="flex justify-between items-start">
              <div class="flex items-center gap-3">
                <img :src="game.hostAvatar" class="w-11 h-11 rounded-xl object-cover ring-2 ring-emerald-500/30" />
                <div>
                  <h4 class="font-bold text-sm text-slate-900 dark:text-white leading-tight">{{ game.hostName }}</h4>
                  <span class="text-[10px] text-emerald-500 font-extrabold tracking-wide uppercase">Verified Host</span>
                </div>
              </div>
              
              <div class="flex items-center gap-1.5">
                <span class="text-xs bg-slate-100 dark:bg-[#0b111a] px-2.5 py-1 rounded-lg border border-slate-200 dark:border-[#212e3e] font-semibold">
                  {{ getSportIcon(game.sport) }} {{ game.sport }}
                </span>
                <span v-if="game.isUrgent" class="animate-pulse bg-rose-500/10 text-rose-500 border border-rose-500/20 text-[10px] font-black px-2 py-1 rounded-lg">
                  URGENT
                </span>
              </div>
            </div>

            <!-- Venue & Time Details -->
            <div class="space-y-3">
              <h3 class="text-xl font-black text-slate-900 dark:text-white leading-snug group-hover:text-emerald-500 transition-colors">
                {{ game.venue }}
              </h3>

              <div class="grid grid-cols-2 gap-2 text-xs font-semibold">
                <div class="flex items-center gap-2 text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-[#0b111a] p-2.5 rounded-xl border border-slate-100 dark:border-[#212e3e]">
                  <span>📍</span> {{ game.subCity }}
                </div>
                <div class="flex items-center gap-2 text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-[#0b111a] p-2.5 rounded-xl border border-slate-100 dark:border-[#212e3e]">
                  <span>⏰</span> {{ game.time }}
                </div>
                <div class="flex items-center gap-2 text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-[#0b111a] p-2.5 rounded-xl border border-slate-100 dark:border-[#212e3e]">
                  <span>🏆</span> {{ game.level.split(' ')[0] }}
                </div>
                <div class="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 p-2.5 rounded-xl border border-emerald-500/20 font-extrabold">
                  <span>💵</span> {{ game.price }} ETB / spot
                </div>
              </div>
            </div>

            <!-- Capacity Progress Bar -->
            <div class="pt-2 space-y-2">
              <div class="flex justify-between items-center text-xs font-bold">
                <span class="text-slate-400">Roster Status</span>
                <span :class="game.joinedPlayers === game.totalPlayers ? 'text-rose-500' : 'text-emerald-500'">
                  {{ game.joinedPlayers }} / {{ game.totalPlayers }} Players
                  <span class="text-[10px] font-medium text-slate-400">
                    ({{ game.joinedPlayers === game.totalPlayers ? 'Full' : (game.totalPlayers - game.joinedPlayers) + ' left' }})
                  </span>
                </span>
              </div>
              <div class="h-2 bg-slate-100 dark:bg-[#0b111a] rounded-full overflow-hidden p-0.5">
                <div 
                  class="h-full rounded-full transition-all duration-500"
                  :style="{ width: `${(game.joinedPlayers / game.totalPlayers) * 100}%` }"
                  :class="game.joinedPlayers === game.totalPlayers ? 'bg-rose-500' : 'bg-emerald-500'"
                ></div>
              </div>
            </div>
          </div>

          <!-- Action Button -->
          <button 
            @click="toggleJoin(game)"
            :disabled="game.joinedPlayers >= game.totalPlayers && !game.isJoined"
            :class="[
              'w-full py-4 font-black text-xs sm:text-sm tracking-wide transition-all uppercase cursor-pointer border-t border-slate-100 dark:border-[#212e3e]',
              game.isJoined 
                ? 'bg-amber-500 hover:bg-amber-600 text-white' 
                : game.joinedPlayers >= game.totalPlayers 
                  ? 'bg-slate-100 dark:bg-[#0b111a] text-slate-400 cursor-not-allowed' 
                  : 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-md shadow-emerald-500/10'
            ]"
          >
            {{ game.isJoined ? 'Leave Match' : (game.joinedPlayers >= game.totalPlayers ? 'Match Full' : 'Join Match Spot') }}
          </button>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-20 bg-white dark:bg-[#131c27] rounded-3xl border border-dashed border-slate-200 dark:border-[#212e3e] space-y-4">
        <div class="text-5xl">⚽</div>
        <div class="space-y-1">
          <h3 class="text-xl font-bold text-slate-900 dark:text-white">No Matches Found</h3>
          <p class="text-xs sm:text-sm text-slate-400 max-w-sm mx-auto">There are no matches fitting your filter criteria right now. Be the first to host one!</p>
        </div>
        <button 
          @click="searchQuery = ''; selectedSportCategory = 'All'; selectedCity = 'All'; selectedSubCity = 'All'" 
          class="text-xs font-bold text-emerald-500 hover:underline cursor-pointer"
        >
          Reset All Filters
        </button>
      </div>

    </main>

    <!-- Create Game Modal -->
    <div v-if="isModalOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div class="bg-white dark:bg-[#131c27] border border-slate-200 dark:border-[#212e3e] w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        <div class="p-6 sm:p-8 space-y-6">
          
          <div class="flex justify-between items-center">
            <div>
              <h2 class="text-xl font-black text-slate-900 dark:text-white">Host a Match 🏟️</h2>
              <p class="text-xs text-slate-400">Fill in details to open up roster spots.</p>
            </div>
            <button @click="isModalOpen = false" class="text-slate-400 hover:text-slate-600 text-xl font-bold cursor-pointer">✕</button>
          </div>

          <form @submit.prevent="handleCreateGame" class="space-y-4">
            <div class="grid grid-cols-2 gap-3.5">
              
              <div class="col-span-2">
                <label class="text-[11px] font-bold uppercase text-slate-400 mb-1 block">Venue Name</label>
                <input v-model="newMatch.venue" required type="text" placeholder="e.g. Sarbet Futsal Arena" class="w-full p-3 bg-slate-50 dark:bg-[#0b111a] rounded-xl border border-slate-200 dark:border-[#212e3e] focus:border-emerald-500 text-xs sm:text-sm outline-none" />
              </div>

              <div>
                <label class="text-[11px] font-bold uppercase text-slate-400 mb-1 block">Sport Type</label>
                <select v-model="newMatch.sport" class="w-full p-3 bg-slate-50 dark:bg-[#0b111a] text-slate-800 dark:text-slate-200 rounded-xl border border-slate-200 dark:border-[#212e3e] focus:border-emerald-500 text-xs sm:text-sm font-semibold outline-none">
                  <option v-for="s in sportsOptions" :key="s.name" :value="s.name">{{ s.name }}</option>
                </select>
              </div>

              <div>
                <label class="text-[11px] font-bold uppercase text-slate-400 mb-1 block">Sub-city</label>
                <select v-model="newMatch.subCity" class="w-full p-3 bg-slate-50 dark:bg-[#0b111a] text-slate-800 dark:text-slate-200 rounded-xl border border-slate-200 dark:border-[#212e3e] focus:border-emerald-500 text-xs sm:text-sm font-semibold outline-none">
                  <option v-for="sc in subCities" :key="sc" :value="sc">{{ sc }}</option>
                </select>
              </div>

              <div>
                <label class="text-[11px] font-bold uppercase text-slate-400 mb-1 block">Date</label>
                <input v-model="newMatch.date" required type="date" class="w-full p-3 bg-slate-50 dark:bg-[#0b111a] rounded-xl border border-slate-200 dark:border-[#212e3e] focus:border-emerald-500 text-xs sm:text-sm outline-none" />
              </div>

              <div>
                <label class="text-[11px] font-bold uppercase text-slate-400 mb-1 block">Start Time</label>
                <input v-model="newMatch.time" required type="time" class="w-full p-3 bg-slate-50 dark:bg-[#0b111a] rounded-xl border border-slate-200 dark:border-[#212e3e] focus:border-emerald-500 text-xs sm:text-sm outline-none" />
              </div>

              <div>
                <label class="text-[11px] font-bold uppercase text-slate-400 mb-1 block">Total Players</label>
                <input v-model.number="newMatch.players" type="number" class="w-full p-3 bg-slate-50 dark:bg-[#0b111a] rounded-xl border border-slate-200 dark:border-[#212e3e] focus:border-emerald-500 text-xs sm:text-sm font-semibold outline-none" />
              </div>

              <div>
                <label class="text-[11px] font-bold uppercase text-slate-400 mb-1 block">Price / Person (ETB)</label>
                <input v-model.number="newMatch.price" type="number" class="w-full p-3 bg-slate-50 dark:bg-[#0b111a] rounded-xl border border-slate-200 dark:border-[#212e3e] focus:border-emerald-500 text-xs sm:text-sm font-semibold outline-none" />
              </div>

            </div>

            <button 
              type="submit" 
              :disabled="isLoading"
              class="w-full py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs sm:text-sm rounded-xl shadow-lg shadow-emerald-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
            >
              <span v-if="isLoading" class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
              {{ isLoading ? 'Publishing Match...' : 'Publish Match' }}
            </button>
          </form>

        </div>
      </div>
    </div>

  </div>
</template>

<style scoped>
.scrollbar-hide::-webkit-scrollbar { display: none; }
.scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
</style>