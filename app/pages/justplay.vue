<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Import izobrazheniya
import venueImg from '~/assets/images/venues20.jpg'

// SEO Zagolovok
useHead({ 
  title: 'JustPlay Matchmaking - Combolojo',
  meta: [
    { name: 'description', content: 'Find local pickup games, join a team, and play sports instantly with the Combolojo matchmaking system.' }
  ]
})

// Sostoyanie Matchmaking
const locationInput = ref('')
const isSearching = ref(false)
const searchCompleted = ref(false)

// Navigaciya na Contact
const goToContact = (gameTitle = '') => {
  router.push({ 
    path: '/contact',
    query: gameTitle ? { ref: gameTitle } : {} 
  })
}

// Spisok igrokov v ocheredi
const queuePlayers = ref([
  { id: 1, name: 'Abel T.', level: 'Advanced', position: 'Striker', location: 'Bole', status: 'In Queue', icon: '⚽' },
  { id: 2, name: 'Sami D.', level: 'Intermediate', position: 'Goalkeeper', location: 'Sarbet', status: 'Ready', icon: '🧤' },
  { id: 3, name: 'Yonas K.', level: 'Beginner', position: 'Midfielder', location: 'CMC', status: 'In Queue', icon: '👟' },
  { id: 4, name: 'Sara L.', level: 'Intermediate', position: 'Defender', location: 'Megenagna', status: 'Ready', icon: '🛡️' }
])

// Spisok otkrytykh igr
const openGames = ref([
  {
    id: 101,
    title: '5v5 Futsal Night',
    venue: 'Sarbet Futsal Field',
    sport: 'Football',
    time: 'Tonight 06:00 PM',
    distance: '1.2 km away',
    neededPlayers: 2,
    price: '120 ETB',
    organizer: 'Abel',
    image: venueImg
  },
  {
    id: 102,
    title: '3v3 Street Hoops',
    venue: 'CMC Arena',
    sport: 'Basketball',
    time: 'Tomorrow 10:00 AM',
    distance: '3.5 km away',
    neededPlayers: 3,
    price: '80 ETB',
    organizer: 'Timothy',
    image: venueImg
  }
])

// Imitaciya poiska
const triggerMatchmaking = () => {
  if (!locationInput.value.trim()) return
  isSearching.value = true
  searchCompleted.value = false
  
  setTimeout(() => {
    isSearching.value = false
    searchCompleted.value = true
  }, 1500)
}
</script>

<template>
  <!-- pt-24 md:pt-32 የነበረው ወደ pt-16 md:pt-20 ተቀንሷል -->
  <div class="min-h-screen bg-slate-50 text-slate-800 font-sans pb-20 pt-16 md:pt-20 relative overflow-hidden selection:bg-cyan-500 selection:text-white">

    <!-- Glowing Background Gradients -->
    <div class="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] bg-gradient-to-b from-cyan-200/40 via-sky-100/20 to-transparent blur-3xl pointer-events-none"></div>

    <!-- HERO & QUICK SEARCH (py-8 md:py-12 የነበረው ወደ py-3 md:py-4 ተቀንሷል) -->
    <header class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 md:py-4 relative z-10">
      <div class="rounded-[2.5rem] p-6 md:p-12 border border-slate-800 shadow-2xl text-center space-y-6 relative overflow-hidden bg-slate-900">
        
        <!-- Bright Full Background Image -->
        <div class="absolute inset-0 pointer-events-none">
          <img :src="venueImg" alt="Venue Background" class="w-full h-full object-cover object-center scale-105" />
          <div class="absolute inset-0 bg-slate-950/45 backdrop-blur-[2px]"></div>
        </div>

        <!-- Content Container -->
        <div class="relative z-10 space-y-4 max-w-3xl mx-auto">
          <div class="flex justify-center">
            <span class="inline-flex items-center gap-2 px-4 py-1.5 bg-slate-900/80 text-cyan-400 rounded-full text-xs font-black uppercase tracking-widest border border-cyan-400/40 shadow-lg backdrop-blur-md">
              <span class="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
              Instant Matchmaking
            </span>
          </div>

          <h1 class="text-4xl md:text-6xl font-black tracking-tight text-white leading-tight drop-shadow-lg">
            Just<span class="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-teal-300">Play</span> Matchmaker
          </h1>

          <p class="text-base md:text-lg text-slate-100 font-bold leading-relaxed drop-shadow-md">
            Short of players? Or looking for a game to join? Enter your location and find matches happening right now.
          </p>
        </div>

        <!-- Search Bar -->
        <div class="relative max-w-2xl mx-auto z-10">
          <div class="flex flex-col sm:flex-row gap-3 p-2 bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-slate-700/80 focus-within:border-cyan-400 transition-all shadow-2xl">
            <div class="relative flex-1 flex items-center">
              <span class="pl-4 text-slate-300 text-lg">📍</span>
              <input 
                v-model="locationInput"
                type="text" 
                placeholder="Enter location (e.g. Bole, Sarbet...)" 
                class="w-full px-3 py-3.5 bg-transparent text-white placeholder-slate-300 text-sm focus:outline-none font-semibold"
                @keyup.enter="triggerMatchmaking"
              />
            </div>
            <button 
              @click="triggerMatchmaking"
              :disabled="isSearching"
              class="px-8 py-3.5 bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-white font-black rounded-xl shadow-lg shadow-cyan-500/30 transition-all duration-200 active:scale-95 disabled:opacity-50 whitespace-nowrap flex items-center justify-center gap-2 cursor-pointer"
            >
              <span v-if="isSearching" class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
              <span>{{ isSearching ? 'Finding Matches...' : 'Find Me a Game' }}</span>
            </button>
          </div>
          
          <!-- Search Result Hint -->
          <transition name="fade">
            <p v-if="searchCompleted" class="mt-4 text-cyan-300 font-black text-sm flex items-center justify-center gap-2 drop-shadow">
              <span>🎉</span> Found 4 players and 2 open games near <span class="underline decoration-cyan-400">{{ locationInput }}</span>!
            </p>
          </transition>
        </div>

      </div>
    </header>

    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 relative z-10">

      <!-- HOW IT WORKS -->
      <section class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="bg-white p-8 rounded-3xl border border-slate-200/80 hover:border-cyan-300 transition-all shadow-sm hover:shadow-md space-y-4 group">
          <div class="w-12 h-12 bg-cyan-50 text-cyan-600 rounded-2xl flex items-center justify-center text-xl font-black border border-cyan-100 group-hover:scale-110 transition-transform">1</div>
          <h4 class="text-lg font-black uppercase tracking-tight text-slate-900">Set Location</h4>
          <p class="text-sm text-slate-600 leading-relaxed">Tell us where you are. We'll scan fields and players within a 5km radius.</p>
        </div>
        <div class="bg-white p-8 rounded-3xl border border-slate-200/80 hover:border-cyan-300 transition-all shadow-sm hover:shadow-md space-y-4 group">
          <div class="w-12 h-12 bg-cyan-50 text-cyan-600 rounded-2xl flex items-center justify-center text-xl font-black border border-cyan-100 group-hover:scale-110 transition-transform">2</div>
          <h4 class="text-lg font-black uppercase tracking-tight text-slate-900">Pick a Team</h4>
          <p class="text-sm text-slate-600 leading-relaxed">Browse teams looking for players of your skill level (Beginner to Pro).</p>
        </div>
        <div class="bg-white p-8 rounded-3xl border border-slate-200/80 hover:border-cyan-300 transition-all shadow-sm hover:shadow-md space-y-4 group">
          <div class="w-12 h-12 bg-cyan-50 text-cyan-600 rounded-2xl flex items-center justify-center text-xl font-black border border-cyan-100 group-hover:scale-110 transition-transform">3</div>
          <h4 class="text-lg font-black uppercase tracking-tight text-slate-900">Just Play</h4>
          <p class="text-sm text-slate-600 leading-relaxed">Show up, play your match, and get rated. Level up your Combolojo rank!</p>
        </div>
      </section>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        <!-- BROWSE OPEN GAMES -->
        <section class="lg:col-span-2 space-y-6">
          <div class="flex justify-between items-end border-b border-slate-200 pb-4">
            <div>
              <h2 class="text-2xl font-black uppercase tracking-tight text-slate-900">Open Pickup Games</h2>
              <p class="text-xs text-slate-500 font-medium mt-1">Join matches created by organizers nearby</p>
            </div>
            <button @click="goToContact()" class="text-cyan-600 text-xs font-bold hover:text-cyan-700 transition-colors uppercase tracking-wider cursor-pointer">See All →</button>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div 
              v-for="game in openGames" 
              :key="game.id" 
              class="group bg-white rounded-3xl overflow-hidden border border-slate-200 hover:border-cyan-400 transition-all duration-300 flex flex-col justify-between shadow-sm hover:shadow-xl hover:shadow-cyan-900/5"
            >
              <div class="h-36 w-full relative overflow-hidden bg-slate-100">
                <img :src="game.image" :alt="game.title" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <span class="absolute top-3 left-3 text-[10px] font-black text-white uppercase tracking-widest bg-cyan-600/90 px-2.5 py-1 rounded-md backdrop-blur-md shadow-sm">
                  {{ game.sport }}
                </span>
                <span class="absolute top-3 right-3 px-3 py-1 bg-amber-500/90 text-white text-[10px] font-black rounded-lg whitespace-nowrap backdrop-blur-md shadow-sm">
                  {{ game.neededPlayers }} SPOTS LEFT
                </span>
              </div>

              <div class="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 class="text-xl font-black text-slate-900 group-hover:text-cyan-600 transition-colors">{{ game.title }}</h3>
                  <div class="space-y-2 pt-3">
                    <p class="text-xs text-slate-600 font-bold flex items-center gap-2">
                      <span class="text-slate-400">📍</span> {{ game.venue }} 
                      <span class="text-cyan-600 text-[11px] font-semibold">• {{ game.distance }}</span>
                    </p>
                    <p class="text-xs text-slate-600 font-bold flex items-center gap-2">
                      <span class="text-slate-400">⏰</span> {{ game.time }}
                    </p>
                  </div>
                </div>

                <div class="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <p class="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Price / Player</p>
                    <p class="text-lg font-black text-cyan-600">{{ game.price }}</p>
                  </div>
                  <button 
                    @click="goToContact(game.title)"
                    class="px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white font-black text-xs rounded-xl shadow-md shadow-cyan-500/20 transition-all active:scale-95 cursor-pointer"
                  >
                    JOIN NOW
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- LIVE WAITING QUEUE -->
        <aside class="space-y-6">
          <div class="flex items-center justify-between border-b border-slate-200 pb-4">
            <div class="flex items-center gap-3">
              <span class="relative flex h-3 w-3">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span class="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
              </span>
              <h2 class="text-2xl font-black uppercase tracking-tight text-slate-900">Live Queue</h2>
            </div>
            <span class="text-xs text-slate-500 font-bold">{{ queuePlayers.length }} Players</span>
          </div>

          <div class="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
            <div class="divide-y divide-slate-100">
              <div 
                v-for="player in queuePlayers" 
                :key="player.id" 
                class="p-4 flex justify-between items-center hover:bg-slate-50 transition-colors"
              >
                <div class="flex items-center gap-3.5">
                  <div class="w-10 h-10 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center text-lg">
                    {{ player.icon }}
                  </div>
                  <div>
                    <p class="text-sm font-black text-slate-900">{{ player.name }}</p>
                    <p class="text-[10px] font-bold text-slate-500 uppercase tracking-tight">{{ player.position }} • <span class="text-cyan-600">{{ player.level }}</span></p>
                  </div>
                </div>
                <div class="text-right">
                  <span 
                    class="text-[9px] font-black px-2 py-0.5 rounded-md uppercase tracking-wider"
                    :class="player.status === 'Ready' ? 'bg-cyan-50 text-cyan-700 border border-cyan-200' : 'bg-slate-100 text-slate-600 border border-slate-200'"
                  >
                    {{ player.status }}
                  </span>
                  <p class="text-[9px] font-bold text-slate-400 mt-1">📍 {{ player.location }}</p>
                </div>
              </div>
            </div>
            <button 
              @click="goToContact('Queue Joining')"
              class="w-full py-3.5 bg-slate-50 hover:bg-slate-100 text-cyan-600 text-xs font-black uppercase tracking-wider transition-colors border-t border-slate-200 cursor-pointer"
            >
              + Join the Queue
            </button>
          </div>
        </aside>
      </div>
    </main>

    <!-- APP CALL TO ACTION -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 relative z-10">
      <div class="bg-gradient-to-r from-cyan-600 via-teal-600 to-cyan-700 rounded-[2.5rem] p-8 md:p-16 text-center space-y-6 relative overflow-hidden shadow-2xl shadow-cyan-900/10">
        <div class="absolute inset-0 opacity-15 pointer-events-none mix-blend-overlay">
          <img :src="venueImg" alt="Venue CTA" class="w-full h-full object-cover" />
        </div>
        <div class="absolute -right-10 -bottom-10 text-white/10 text-[180px] font-black select-none pointer-events-none leading-none">PLAY</div>
        <div class="relative z-10 max-w-2xl mx-auto space-y-4 text-center">
          <h2 class="text-3xl md:text-5xl font-black text-white leading-tight">Matchmaking is faster on Mobile</h2>
          <p class="text-cyan-100 text-base md:text-lg">Get real-time push notifications when a match starts near you. Download the Combolojo App today.</p>
          <div class="flex flex-wrap justify-center gap-4 pt-4">
            <button @click="goToContact('iOS App')" class="bg-slate-900 hover:bg-slate-800 text-white px-7 py-3.5 rounded-2xl font-black text-xs transition-all active:scale-95 shadow-lg flex items-center gap-2 cursor-pointer">
              <span>🍎</span> DOWNLOAD IOS
            </button>
            <button @click="goToContact('Android App')" class="bg-white hover:bg-slate-100 text-slate-900 px-7 py-3.5 rounded-2xl font-black text-xs transition-all active:scale-95 shadow-lg flex items-center gap-2 cursor-pointer">
              <span>🤖</span> DOWNLOAD ANDROID
            </button>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>