<script setup>
import { ref } from 'vue'

useHead({ title: 'JustPlay - EthioSport' })

// Active Matchmaking Input States
const locationInput = ref('')
const selectedSport = ref('Football')
const isSearching = ref(false)

// Sample Queue Players
const queuePlayers = ref([
  { id: 1, name: 'ዮናስ ታደሰ', position: 'Striker', location: 'ቦሌ', status: 'Searching...' },
  { id: 2, name: 'ዳዊት አሰፋ', position: 'Goalkeeper', location: 'ሳርቤት', status: 'Ready' },
  { id: 3, name: 'ኤልያስ ሰለሞን', position: 'Midfielder', location: 'ሲኤምሲ', status: 'Searching...' },
  { id: 4, name: 'ናታን አበበ', position: 'Defender', location: 'መገናኛ', status: 'Ready' }
])

// Open Pickup Games List
const openGames = ref([
  {
    id: 101,
    title: 'የ 5v5 ፉትሳል ጨዋታ',
    venue: 'ሳርቤት ፉትሳል ሜዳ',
    time: 'ዛሬ 12:00 ምሽት',
    neededPlayers: 2,
    pricePerPerson: '100 ETB',
    organizer: 'አቤል'
  },
  {
    id: 102,
    title: 'የቅርጫት ኳስ ግጥሚያ',
    venue: 'ሲኤምሲ አሬና',
    time: 'ነገ 10:00 ጠዋት',
    neededPlayers: 3,
    pricePerPerson: '80 ETB',
    organizer: 'ቲሞቲ'
  }
])

// Quick Match Search Logic
const triggerMatchmaking = () => {
  if (!locationInput.value.trim()) return
  isSearching.value = true
  setTimeout(() => {
    isSearching.value = false
    alert(`${locationInput.value} አቅራቢያ የሚገኙ ተጫዋቾች ተፈልገዋል!`)
  }, 1500)
}
</script>

<template>
  <div class="min-h-screen bg-slate-50 dark:bg-[#070b10] text-slate-800 dark:text-slate-100 py-8 px-4 sm:px-6 lg:px-8">
    <div class="max-w-4xl mx-auto space-y-8">
      
      <!-- HERO & QUICK MATCHMAKING CARD -->
      <div class="bg-gradient-to-r from-emerald-600 via-teal-700 to-slate-900 text-white p-6 sm:p-10 rounded-3xl shadow-xl text-center space-y-6 relative overflow-hidden">
        
        <!-- Background Accent Glow -->
        <div class="absolute -top-12 -right-12 w-40 h-40 bg-emerald-400/20 rounded-full blur-2xl pointer-events-none"></div>

        <div class="space-y-2">
          <span class="inline-block px-3 py-1 bg-white/10 text-emerald-300 font-extrabold text-[11px] rounded-full uppercase tracking-wider">
            ⚽ JustPlay Matchmaking
          </span>
          <h1 class="text-3xl sm:text-4xl font-black tracking-tight">ፈጣን ጨዋታ እና ተጫዋች ፍለጋ</h1>
          <p class="text-xs sm:text-sm text-emerald-100 max-w-lg mx-auto">
            ተጫዋች አጡ? ወይም ጨዋታ መቀላቀል ይፈልጋሉ? ቦታዎን ያስገቡ፤ ሲስተሙ በአቅራቢያዎ ያሉ ተጫዋቾችን እና ክፍት ጨዋታዎችን ያገናኝዎታል።
          </p>
        </div>
        
        <!-- Search Input Bar -->
        <div class="flex flex-col sm:flex-row justify-center gap-3 max-w-xl mx-auto">
          <input 
            v-model="locationInput"
            type="text" 
            placeholder="ቦታ ያስገቡ (e.g. ቦሌ፣ ሳርቤት...)" 
            class="px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-xs sm:text-sm text-white placeholder-emerald-200/70 outline-none focus:ring-2 focus:ring-amber-400 transition flex-1"
          />
          <button 
            @click="triggerMatchmaking"
            :disabled="isSearching"
            class="px-6 py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-sm rounded-xl shadow-lg transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <span>⚡</span>
            <span>{{ isSearching ? 'እየፈለገ ነው...' : 'Find Me a Match' }}</span>
          </button>
        </div>

        <!-- ACTION BUTTONS: APP DOWNLOAD & BROWSE GAMES -->
        <div class="pt-4 border-t border-white/10 flex flex-wrap justify-center items-center gap-4">
          
          <!-- Browse Open Games Button -->
          <a 
            href="#browse-games" 
            class="px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold transition flex items-center gap-2 border border-white/15"
          >
            <span>🎮</span>
            <span>ጨዋታዎችን ይመልከቱ (Browse Games)</span>
          </a>

          <!-- Download App Button -->
          <button 
            @click="alert('የ EthioSport/JustPlay ሞባይል መተግበሪያ በቅርቡ በ Play Store እና App Store ይለቀቃል!')"
            class="px-5 py-2.5 bg-slate-950/60 hover:bg-slate-950 text-white rounded-xl text-xs font-bold transition flex items-center gap-2 border border-slate-700 cursor-pointer"
          >
            <span>📲</span>
            <span>መተግበሪያውን ያውርዱ (Download App)</span>
          </button>

        </div>
      </div>

      <!-- FEATURES / HOW IT WORKS SECTION -->
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div class="bg-white dark:bg-[#131c27] p-5 rounded-2xl border border-slate-200 dark:border-[#212e3e] space-y-2">
          <span class="text-2xl">📍</span>
          <h4 class="font-extrabold text-sm text-slate-900 dark:text-white">1. ቦታ ይምረጡ</h4>
          <p class="text-xs text-slate-500 dark:text-slate-400">በአቅራቢያዎ የሚገኙ ሜዳዎችን እና የሚመችዎትን ሰዓት ይምረጡ።</p>
        </div>
        <div class="bg-white dark:bg-[#131c27] p-5 rounded-2xl border border-slate-200 dark:border-[#212e3e] space-y-2">
          <span class="text-2xl">🤝</span>
          <h4 class="font-extrabold text-sm text-slate-900 dark:text-white">2. ቡድን ይቀላቀሉ</h4>
          <p class="text-xs text-slate-500 dark:text-slate-400">ተጫዋች የሚፈልጉ ቡድኖችን ይቀላቀሉ ወይም የራስዎን ጨዋታ ይክፈቱ።</p>
        </div>
        <div class="bg-white dark:bg-[#131c27] p-5 rounded-2xl border border-slate-200 dark:border-[#212e3e] space-y-2">
          <span class="text-2xl">🏆</span>
          <h4 class="font-extrabold text-sm text-slate-900 dark:text-white">3. ይጫወቱ</h4>
          <p class="text-xs text-slate-500 dark:text-slate-400">ወደ ሜዳ በመሄድ ጨዋታዎን ያድርጉ፤ ደረጃዎን (Rating) ያሳድጉ።</p>
        </div>
      </div>

      <!-- BROWSE OPEN GAMES SECTION -->
      <div id="browse-games" class="bg-white dark:bg-[#131c27] p-6 rounded-2xl border border-slate-200 dark:border-[#212e3e] space-y-4">
        <div class="flex justify-between items-center">
          <h3 class="font-bold text-base flex items-center gap-2 text-slate-900 dark:text-white">
            <span>🏟️</span> 
            ክፍት ጨዋታዎች (Open Pickup Games)
          </h3>
          <span class="text-xs font-semibold text-emerald-500 hover:underline cursor-pointer">ሁሉንም ይመልከቱ &rarr;</span>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div 
            v-for="game in openGames" 
            :key="game.id" 
            class="p-4 bg-slate-50 dark:bg-[#0b111a] rounded-xl border border-slate-200 dark:border-[#212e3e] space-y-3 flex flex-col justify-between"
          >
            <div class="space-y-1">
              <div class="flex justify-between items-start">
                <h4 class="font-bold text-sm text-slate-900 dark:text-white">{{ game.title }}</h4>
                <span class="px-2 py-0.5 bg-emerald-500/10 text-emerald-500 text-[10px] font-extrabold rounded-md">
                  {{ game.neededPlayers }} ተጫዋች ይፈለጋል
                </span>
              </div>
              <p class="text-xs text-slate-500 dark:text-slate-400">📍 {{ game.venue }}</p>
              <p class="text-xs text-slate-500 dark:text-slate-400">⏰ {{ game.time }}</p>
            </div>

            <div class="flex items-center justify-between pt-3 border-t border-slate-200/60 dark:border-[#212e3e]">
              <div>
                <span class="text-[10px] text-slate-400 block">አዘጋጅ: {{ game.organizer }}</span>
                <span class="text-xs font-extrabold text-slate-900 dark:text-white">{{ game.pricePerPerson }} /ሰው</span>
              </div>
              <button class="px-3.5 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs rounded-lg transition cursor-pointer">
                ተቀላቀል (Join)
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- LIVE WAITING QUEUE -->
      <div class="bg-white dark:bg-[#131c27] p-6 rounded-2xl border border-slate-200 dark:border-[#212e3e] space-y-4">
        <h3 class="font-bold text-base flex items-center gap-2 text-slate-900 dark:text-white">
          <span class="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span> 
          በአቅራቢያ ያሉ ተጫዋቾች (Live Queue)
        </h3>

        <div class="divide-y divide-slate-100 dark:divide-[#212e3e]">
          <div 
            v-for="player in queuePlayers" 
            :key="player.id" 
            class="py-3 flex justify-between items-center text-xs"
          >
            <div>
              <p class="font-bold text-slate-900 dark:text-white">{{ player.name }}</p>
              <span class="text-slate-500 text-[11px]">{{ player.position }} • 📍 {{ player.location }}</span>
            </div>
            <span class="px-2.5 py-1 bg-slate-100 dark:bg-[#0b111a] font-semibold text-emerald-500 rounded-md">
              {{ player.status }}
            </span>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>