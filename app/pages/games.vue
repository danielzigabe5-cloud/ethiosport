<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'

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
const sportsOptions = ['Football', 'Basketball', 'Tennis', 'Volleyball', 'Padel']

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
    date: new Date().toISOString().split('T')[0], // Today
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
    date: '2026-09-10',
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

// Logic: Filter Games
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

// Logic: Create Game
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
      isJoined: true
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
</script>

<template>
  <div class="min-h-screen bg-[#f8fafc] dark:bg-[#0f172a] text-slate-900 dark:text-slate-100 font-sans pb-20">
    
    <!-- Hero Header -->
    <header class="bg-white dark:bg-[#1e293b] border-b border-slate-200 dark:border-slate-800 sticky top-0 z-30 shadow-sm">
      <div class="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div class="flex items-center gap-2">
          <div class="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center text-white font-black shadow-lg shadow-emerald-500/20">ES</div>
          <h1 class="text-xl font-black tracking-tight hidden sm:block">ETHIO<span class="text-emerald-500">SPORT</span></h1>
        </div>
        <button 
          @click="isModalOpen = true"
          class="bg-emerald-500 hover:bg-emerald-600 text-white px-5 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2 shadow-lg shadow-emerald-500/25 active:scale-95"
        >
          <span class="text-lg">+</span> Create New Game
        </button>
      </div>
    </header>

    <main class="max-w-7xl mx-auto px-4 py-8 space-y-8">
      
      <!-- Search & Filters Section -->
      <section class="bg-white dark:bg-[#1e293b] p-6 rounded-3xl shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800 space-y-6">
        <div class="relative">
          <span class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl">🔍</span>
          <input 
            v-model="searchQuery"
            type="text" 
            placeholder="Search by venue or host name..."
            class="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-[#0f172a] rounded-2xl border-none focus:ring-2 focus:ring-emerald-500 transition-all outline-none text-lg"
          />
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div class="space-y-1.5">
            <label class="text-[11px] font-bold uppercase text-slate-400 ml-1">City</label>
            <select v-model="selectedCity" class="w-full p-3 bg-slate-50 dark:bg-[#0f172a] rounded-xl border-none focus:ring-2 focus:ring-emerald-500 text-sm font-medium">
              <option value="All">All Cities</option>
              <option v-for="c in cities" :key="c" :value="c">{{ c }}</option>
            </select>
          </div>
          <div class="space-y-1.5">
            <label class="text-[11px] font-bold uppercase text-slate-400 ml-1">Sub-city</label>
            <select v-model="selectedSubCity" class="w-full p-3 bg-slate-50 dark:bg-[#0f172a] rounded-xl border-none focus:ring-2 focus:ring-emerald-500 text-sm font-medium">
              <option value="All">All Sub-cities</option>
              <option v-for="sc in subCities" :key="sc" :value="sc">{{ sc }}</option>
            </select>
          </div>
          <div class="space-y-1.5">
            <label class="text-[11px] font-bold uppercase text-slate-400 ml-1">Skill Level</label>
            <select v-model="selectedLevel" class="w-full p-3 bg-slate-50 dark:bg-[#0f172a] rounded-xl border-none focus:ring-2 focus:ring-emerald-500 text-sm font-medium">
              <option value="All">All Levels</option>
              <option v-for="l in levels" :key="l" :value="l">{{ l }}</option>
            </select>
          </div>
          <div class="space-y-1.5">
            <label class="text-[11px] font-bold uppercase text-slate-400 ml-1">Date</label>
            <input type="date" v-model="selectedDate" class="w-full p-3 bg-slate-50 dark:bg-[#0f172a] rounded-xl border-none focus:ring-2 focus:ring-emerald-500 text-sm font-medium" />
          </div>
        </div>
      </section>

      <!-- Category Tabs -->
      <div class="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
        <button 
          v-for="cat in ['All', ...sportsOptions]" 
          :key="cat"
          @click="selectedSportCategory = cat"
          :class="[
            'px-6 py-2.5 rounded-full text-sm font-bold transition-all whitespace-nowrap border-2',
            selectedSportCategory === cat 
              ? 'bg-emerald-500 border-emerald-500 text-white shadow-lg shadow-emerald-500/20' 
              : 'bg-white dark:bg-[#1e293b] border-transparent text-slate-500 dark:text-slate-400 hover:border-slate-200'
          ]"
        >
          {{ cat === 'All' ? '🎯 All Games' : cat }}
        </button>
      </div>

      <!-- Games Grid -->
      <div v-if="filteredGames.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div 
          v-for="game in filteredGames" 
          :key="game.id" 
          class="group bg-white dark:bg-[#1e293b] rounded-[2rem] border border-slate-100 dark:border-slate-800 overflow-hidden hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-300 flex flex-col"
        >
          <!-- Top Info -->
          <div class="p-6 flex-1 space-y-4">
            <div class="flex justify-between items-start">
              <div class="flex items-center gap-3">
                <img :src="game.hostAvatar" class="w-12 h-12 rounded-2xl object-cover ring-2 ring-emerald-500/20" />
                <div>
                  <h4 class="font-bold text-slate-900 dark:text-white">{{ game.hostName }}</h4>
                  <span class="text-[10px] text-emerald-500 font-bold bg-emerald-50 dark:bg-emerald-500/10 px-2 py-0.5 rounded-lg">VERIFIED HOST</span>
                </div>
              </div>
              <div v-if="game.isUrgent" class="animate-pulse bg-rose-500 text-white text-[10px] font-black px-2 py-1 rounded-lg">URGENT</div>
            </div>

            <div class="space-y-3">
              <h3 class="text-lg font-black leading-tight text-slate-800 dark:text-slate-100">
                {{ game.venue }}
              </h3>
              <div class="grid grid-cols-2 gap-2 text-[11px] font-bold">
                <div class="flex items-center gap-2 text-slate-500 bg-slate-50 dark:bg-[#0f172a] p-2 rounded-xl">
                  <span>📍</span> {{ game.subCity }}
                </div>
                <div class="flex items-center gap-2 text-slate-500 bg-slate-50 dark:bg-[#0f172a] p-2 rounded-xl">
                  <span>🏆</span> {{ game.level.split(' ')[0] }}
                </div>
                <div class="flex items-center gap-2 text-slate-500 bg-slate-50 dark:bg-[#0f172a] p-2 rounded-xl">
                  <span>⏰</span> {{ game.time }}
                </div>
                <div class="flex items-center gap-2 text-emerald-600 bg-emerald-50 dark:bg-emerald-500/10 p-2 rounded-xl">
                  <span>💰</span> {{ game.price }} ETB
                </div>
              </div>
            </div>

            <!-- Progress Bar -->
            <div class="pt-2 space-y-2">
              <div class="flex justify-between text-[11px] font-bold">
                <span class="text-slate-400">Player Capacity</span>
                <span :class="game.joinedPlayers === game.totalPlayers ? 'text-rose-500' : 'text-emerald-500'">
                  {{ game.joinedPlayers }} / {{ game.totalPlayers }} 
                  {{ game.joinedPlayers === game.totalPlayers ? '(Full)' : '(' + (game.totalPlayers - game.joinedPlayers) + ' left)' }}
                </span>
              </div>
              <div class="h-2.5 bg-slate-100 dark:bg-[#0f172a] rounded-full overflow-hidden">
                <div 
                  class="h-full bg-emerald-500 transition-all duration-500"
                  :style="{ width: `${(game.joinedPlayers / game.totalPlayers) * 100}%` }"
                  :class="{ 'bg-rose-500': game.joinedPlayers === game.totalPlayers }"
                ></div>
              </div>
            </div>
          </div>

          <!-- Action Button -->
          <button 
            @click="toggleJoin(game)"
            :disabled="game.joinedPlayers >= game.totalPlayers && !game.isJoined"
            :class="[
              'w-full py-5 font-black text-sm transition-all',
              game.isJoined 
                ? 'bg-amber-400 text-amber-950 hover:bg-amber-300' 
                : game.joinedPlayers >= game.totalPlayers 
                  ? 'bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-not-allowed' 
                  : 'bg-emerald-500 text-white hover:bg-emerald-600'
            ]"
          >
            {{ game.isJoined ? 'LEAVE MATCH' : (game.joinedPlayers >= game.totalPlayers ? 'MATCH FULL' : 'JOIN MATCH') }}
          </button>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-20 bg-white dark:bg-[#1e293b] rounded-[3rem] border-2 border-dashed border-slate-200 dark:border-slate-800">
        <div class="text-6xl mb-4">⚽</div>
        <h3 class="text-2xl font-black dark:text-white">No Games Found</h3>
        <p class="text-slate-500 mt-2 max-w-xs mx-auto">We couldn't find any games matching your criteria. Try adjusting your filters or create a new game.</p>
        <button @click="searchQuery = ''; selectedSportCategory = 'All'" class="mt-6 text-emerald-500 font-bold hover:underline">Show All Games</button>
      </div>

    </main>

    <!-- Create Game Modal -->
    <div v-if="isModalOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md">
      <div class="bg-white dark:bg-[#1e293b] w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
        <div class="p-8 space-y-6">
          <div class="flex justify-between items-center">
            <h2 class="text-2xl font-black text-slate-900 dark:text-white">Create New Game 🏟️</h2>
            <button @click="isModalOpen = false" class="text-slate-400 hover:text-slate-600 text-2xl">✕</button>
          </div>

          <form @submit.prevent="handleCreateGame" class="space-y-4">
            <div class="grid grid-cols-2 gap-4">
              <div class="col-span-2">
                <label class="text-xs font-bold text-slate-400 mb-1 block">Venue Name</label>
                <input v-model="newMatch.venue" required type="text" placeholder="e.g. Sarbet Futsal Field" class="w-full p-3.5 bg-slate-50 dark:bg-[#0f172a] rounded-2xl border-none focus:ring-2 focus:ring-emerald-500 outline-none" />
              </div>
              <div>
                <label class="text-xs font-bold text-slate-400 mb-1 block">Sport Type</label>
                <select v-model="newMatch.sport" class="w-full p-3.5 bg-slate-50 dark:bg-[#0f172a] rounded-2xl border-none focus:ring-2 focus:ring-emerald-500 outline-none font-medium">
                  <option v-for="s in sportsOptions" :key="s" :value="s">{{ s }}</option>
                </select>
              </div>
              <div>
                <label class="text-xs font-bold text-slate-400 mb-1 block">Level</label>
                <select v-model="newMatch.level" class="w-full p-3.5 bg-slate-50 dark:bg-[#0f172a] rounded-2xl border-none focus:ring-2 focus:ring-emerald-500 outline-none font-medium">
                  <option v-for="l in levels" :key="l" :value="l">{{ l.split(' ')[0] }}</option>
                </select>
              </div>
              <div>
                <label class="text-xs font-bold text-slate-400 mb-1 block">Date</label>
                <input v-model="newMatch.date" required type="date" class="w-full p-3.5 bg-slate-50 dark:bg-[#0f172a] rounded-2xl border-none focus:ring-2 focus:ring-emerald-500 outline-none" />
              </div>
              <div>
                <label class="text-xs font-bold text-slate-400 mb-1 block">Start Time</label>
                <input v-model="newMatch.time" required type="time" class="w-full p-3.5 bg-slate-50 dark:bg-[#0f172a] rounded-2xl border-none focus:ring-2 focus:ring-emerald-500 outline-none" />
              </div>
              <div>
                <label class="text-xs font-bold text-slate-400 mb-1 block">Total Players</label>
                <input v-model.number="newMatch.players" type="number" class="w-full p-3.5 bg-slate-50 dark:bg-[#0f172a] rounded-2xl border-none focus:ring-2 focus:ring-emerald-500 outline-none font-medium" />
              </div>
              <div>
                <label class="text-xs font-bold text-slate-400 mb-1 block">Price per Person (ETB)</label>
                <input v-model.number="newMatch.price" type="number" class="w-full p-3.5 bg-slate-50 dark:bg-[#0f172a] rounded-2xl border-none focus:ring-2 focus:ring-emerald-500 outline-none font-medium" />
              </div>
            </div>

            <button 
              type="submit" 
              :disabled="isLoading"
              class="w-full py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-black rounded-2xl shadow-xl shadow-emerald-500/30 transition-all flex items-center justify-center gap-2"
            >
              <span v-if="isLoading" class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
              {{ isLoading ? 'Publishing...' : 'Publish Game' }}
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

@keyframes slideIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
.grid > div {
  animation: slideIn 0.4s ease-out forwards;
}
</style>