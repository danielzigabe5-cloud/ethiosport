<script setup>
import { ref, computed } from 'vue'

// SEO Page Title
useHead({ title: 'Games - EthioSport' })

// Navigation Links
const navLinks = [
 
]

const isModalOpen = ref(false)
const selectedSportCategory = ref('All')

// Sample Games Mock Data
const games = ref([
  {
    id: 1,
    hostName: 'አበበ በቀለ',
    hostAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
    venue: 'ሳርቤት ፉትሳል ሜዳ',
    sport: 'Football',
    time: 'ዛሬ - 05:00 PM',
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
    sport: 'Tennis',
    time: 'ነገ - 04:00 PM',
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
    sport: 'Basketball',
    time: 'ዛሬ - 07:00 PM',
    joinedPlayers: 5,
    totalPlayers: 8,
    pricePerPerson: 70,
    isJoined: false
  }
])

// Form input state
const newGame = ref({
  venue: '',
  sport: 'Football',
  time: '',
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
    sport: newGame.value.sport,
    time: newGame.value.time,
    joinedPlayers: 1,
    totalPlayers: newGame.value.totalPlayers,
    pricePerPerson: newGame.value.pricePerPerson,
    isJoined: true
  })

  // Reset Form
  newGame.value = {
    venue: '',
    sport: 'Football',
    time: '',
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

// Filter games by sport type
const filteredGames = computed(() => {
  if (selectedSportCategory.value === 'All') return games.value
  return games.value.filter(g => g.sport === selectedSportCategory.value)
})
</script>

<template>
  <div class="min-h-screen bg-slate-50 dark:bg-[#070b10] text-slate-800 dark:text-slate-100 font-sans pb-16">
    
    <!-- HEADER NAVBAR -->
    <header class="sticky top-0 z-40 bg-white/95 dark:bg-[#0b111a]/95 backdrop-blur-md border-b border-slate-200 dark:border-[#212e3e]">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <NuxtLink to="/" class="flex items-center gap-2">
          <div class="w-9 h-9 bg-emerald-500 rounded-xl flex items-center justify-center text-slate-950 font-black text-xl shadow-md">
            E
          </div>
          <span class="font-extrabold text-xl text-slate-900 dark:text-white tracking-tight">
            <span class="text-emerald-500"></span>
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

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
      
      <!-- Top Action Bar -->
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
        <p class="text-slate-500 text-xs mt-1">በዚህ ዘርፍ የተከፈተ የጨዋታ ጥሪ የለም። እርሶ አዲስ ጥሪ መክፈት ይችላሉ!</p>
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
                <span>📍</span> <strong class="text-slate-900 dark:text-white">{{ game.venue }}</strong>
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
                placeholder="ለምሳሌ: ዛሬ - 05:00 PM" 
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