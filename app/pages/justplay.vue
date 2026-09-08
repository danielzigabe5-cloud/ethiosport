<script setup>
import { ref } from 'vue'

// SEO Page Title
useHead({ 
  title: 'JustPlay Matchmaking - Combolojo',
  meta: [
    { name: 'description', content: 'Find local pickup games, join a team, and play sports instantly with the Combolojo matchmaking system.' }
  ]
})

// Matchmaking State
const locationInput = ref('')
const isSearching = ref(false)
const searchCompleted = ref(false)

// Sample Active Queue (Real-time Feel)
const queuePlayers = ref([
  { id: 1, name: 'Abel T.', level: 'Advanced', position: 'Striker', location: 'Bole', status: 'In Queue', icon: '⚽' },
  { id: 2, name: 'Sami D.', level: 'Intermediate', position: 'Goalkeeper', location: 'Sarbet', status: 'Ready', icon: '🧤' },
  { id: 3, name: 'Yonas K.', level: 'Beginner', position: 'Midfielder', location: 'CMC', status: 'In Queue', icon: '👟' },
  { id: 4, name: 'Sara L.', level: 'Intermediate', position: 'Defender', location: 'Megenagna', status: 'Ready', icon: '🛡️' }
])

// Open Pickup Games
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
    organizer: 'Abel'
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
    organizer: 'Timothy'
  }
])

// Matchmaking Search Simulation
const triggerMatchmaking = () => {
  if (!locationInput.value.trim()) return
  isSearching.value = true
  searchCompleted.value = false
  
  setTimeout(() => {
    isSearching.value = false
    searchCompleted.value = true
  }, 2000)
}
</script>

<template>
  <!-- pt-24 md:pt-32 to prevent Navbar overlap -->
  <div class="min-h-screen bg-slate-50 text-slate-900 font-sans pb-20 pt-24 md:pt-32">

    <!-- HERO & QUICK SEARCH -->
    <header class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="bg-white rounded-[3rem] p-8 md:p-16 shadow-2xl shadow-slate-200/50 border border-slate-100 relative overflow-hidden text-center space-y-8">
        <!-- Abstract BG Decoration -->
        <div class="absolute -top-24 -left-24 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl"></div>
        <div class="absolute -bottom-24 -right-24 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl"></div>

        <div class="relative z-10 space-y-4">
          <div class="flex justify-center">
            <span class="px-4 py-1.5 bg-emerald-50 text-emerald-600 rounded-full text-xs font-black uppercase tracking-widest border border-emerald-100">
              ⚡ Instant Matchmaking
            </span>
          </div>
          <h1 class="text-4xl md:text-6xl font-black tracking-tight text-slate-900">
            Just<span class="text-emerald-600">Play</span> Matchmaker
          </h1>
          <p class="text-lg text-slate-500 max-w-2xl mx-auto font-medium">
            Short of players? Or looking for a game to join? Enter your location and find matches happening right now.
          </p>
        </div>

        <!-- Search Bar -->
        <div class="relative max-w-xl mx-auto z-10">
          <div class="flex flex-col md:flex-row gap-3">
            <div class="relative flex-1">
              <input 
                v-model="locationInput"
                type="text" 
                placeholder="Enter location (e.g. Bole, Sarbet...)" 
                class="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all font-medium"
              />
              <span class="absolute left-1 top-1/2 -translate-y-1/2 opacity-0">📍</span>
            </div>
            <button 
              @click="triggerMatchmaking"
              :disabled="isSearching"
              class="px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-2xl shadow-xl shadow-emerald-200 transition-all active:scale-95 disabled:opacity-50 whitespace-nowrap"
            >
              <span v-if="isSearching" class="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></span>
              {{ isSearching ? 'Finding Matches...' : 'Find Me a Game' }}
            </button>
          </div>
          
          <!-- Search Result Hint -->
          <p v-if="searchCompleted" class="mt-4 text-emerald-600 font-bold text-sm animate-bounce">
            🎉 Found 4 players and 2 open games near {{ locationInput }}!
          </p>
        </div>
      </div>
    </header>

    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">

      <!-- HOW IT WORKS -->
      <section class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/40 space-y-4">
          <div class="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center text-2xl font-black">1</div>
          <h4 class="text-lg font-black uppercase tracking-tight">Set Location</h4>
          <p class="text-sm text-slate-500 leading-relaxed">Tell us where you are. We'll scan fields and players within a 5km radius.</p>
        </div>
        <div class="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/40 space-y-4">
          <div class="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center text-2xl font-black">2</div>
          <h4 class="text-lg font-black uppercase tracking-tight">Pick a Team</h4>
          <p class="text-sm text-slate-500 leading-relaxed">Browse teams looking for players of your skill level (Beginner to Pro).</p>
        </div>
        <div class="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/40 space-y-4">
          <div class="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center text-2xl font-black">3</div>
          <h4 class="text-lg font-black uppercase tracking-tight">Just Play</h4>
          <p class="text-sm text-slate-500 leading-relaxed">Show up, play your match, and get rated. Level up your Combolojo rank!</p>
        </div>
      </section>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        <!-- BROWSE OPEN GAMES (2/3 Width) -->
        <section class="lg:col-span-2 space-y-8">
          <div class="flex justify-between items-end border-b border-slate-200 pb-4">
            <h2 class="text-2xl font-black uppercase tracking-tight">Open Pickup Games</h2>
            <button class="text-emerald-600 text-xs font-bold hover:underline">See All</button>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div 
              v-for="game in openGames" 
              :key="game.id" 
              class="group bg-white rounded-[2rem] p-6 border border-slate-100 hover:shadow-2xl transition-all flex flex-col justify-between"
            >
              <div class="space-y-4">
                <div class="flex justify-between items-start">
                  <div>
                    <span class="text-[10px] font-black text-emerald-500 uppercase tracking-widest">{{ game.sport }}</span>
                    <h4 class="text-xl font-black text-slate-900 group-hover:text-emerald-600 transition-colors">{{ game.title }}</h4>
                  </div>
                  <span class="px-3 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-black rounded-lg">
                    {{ game.neededPlayers }} SPOTS LEFT
                  </span>
                </div>
                <div class="space-y-1.5 pt-2">
                  <p class="text-xs text-slate-500 font-bold flex items-center gap-2">📍 {{ game.venue }} <span class="text-emerald-400">• {{ game.distance }}</span></p>
                  <p class="text-xs text-slate-500 font-bold flex items-center gap-2">⏰ {{ game.time }}</p>
                </div>
              </div>

              <div class="mt-6 pt-6 border-t border-slate-50 flex items-center justify-between">
                <div>
                  <p class="text-[10px] text-slate-400 font-bold uppercase">Price</p>
                  <p class="text-lg font-black text-slate-900">{{ game.price }}</p>
                </div>
                <button class="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs rounded-xl shadow-lg shadow-emerald-100 transition-all active:scale-95">
                  JOIN NOW
                </button>
              </div>
            </div>
          </div>
        </section>

        <!-- LIVE WAITING QUEUE (1/3 Width) -->
        <aside class="space-y-8">
          <div class="flex items-center gap-3 border-b border-slate-200 pb-4">
            <span class="w-3 h-3 bg-emerald-500 rounded-full animate-ping"></span>
            <h2 class="text-2xl font-black uppercase tracking-tight">Live Queue</h2>
          </div>

          <div class="bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden shadow-xl shadow-slate-200/30">
            <div class="divide-y divide-slate-50">
              <div 
                v-for="player in queuePlayers" 
                :key="player.id" 
                class="p-5 flex justify-between items-center group hover:bg-slate-50 transition-colors"
              >
                <div class="flex items-center gap-4">
                  <div class="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-xl grayscale group-hover:grayscale-0 transition-all">
                    {{ player.icon }}
                  </div>
                  <div>
                    <p class="text-sm font-black text-slate-900">{{ player.name }}</p>
                    <p class="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{{ player.position }} • {{ player.level }}</p>
                  </div>
                </div>
                <div class="text-right">
                  <span class="text-[10px] font-black text-emerald-500 bg-emerald-50 px-2 py-1 rounded-md">
                    {{ player.status }}
                  </span>
                  <p class="text-[9px] font-bold text-slate-400 mt-1">📍 {{ player.location }}</p>
                </div>
              </div>
            </div>
            <button class="w-full py-4 bg-slate-50 text-slate-500 text-xs font-black uppercase hover:bg-slate-100 transition-colors">
              Join the Queue
            </button>
          </div>
        </aside>
      </div>
    </main>

    <!-- APP CALL TO ACTION -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
      <div class="bg-slate-900 rounded-[3rem] p-10 md:p-20 text-center space-y-8 relative overflow-hidden">
        <div class="absolute top-0 right-0 p-10 text-white/5 text-[150px] font-black select-none pointer-events-none">PLAY</div>
        <div class="relative z-10 max-w-2xl mx-auto space-y-4 text-center">
          <h2 class="text-3xl md:text-5xl font-black text-white leading-tight">Matchmaking is faster on <span class="text-emerald-500">Mobile</span></h2>
          <p class="text-slate-400 text-lg">Get real-time push notifications when a match starts near you. Download the Combolojo App today.</p>
          <div class="flex flex-wrap justify-center gap-4 pt-6">
            <button class="bg-white text-slate-900 px-8 py-4 rounded-2xl font-black text-xs hover:bg-emerald-400 transition-all active:scale-95">🍎 DOWNLOAD IOS</button>
            <button class="bg-emerald-500 text-slate-900 px-8 py-4 rounded-2xl font-black text-xs hover:bg-emerald-400 transition-all active:scale-95">🤖 DOWNLOAD ANDROID</button>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>

<style scoped>
.scrollbar-hide::-webkit-scrollbar { display: none; }
.scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }

@keyframes slideUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

.bg-white {
  animation: slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
</style>