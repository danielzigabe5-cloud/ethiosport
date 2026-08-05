<script setup>
import { ref } from 'vue'

useHead({ title: 'JustPlay - EthioSport' })

const queuePlayers = ref([
  { id: 1, name: 'ዮናስ ታደሰ', position: 'Striker', status: 'Searching...' },
  { id: 2, name: 'ዳዊት አሰፋ', position: 'Goalkeeper', status: 'Ready' },
  { id: 3, name: 'ኤልያስ ሰለሞን', position: 'Midfielder', status: 'Searching...' }
])
</script>

<template>
  <div class="min-h-screen bg-slate-50 dark:bg-[#070b10] text-slate-800 dark:text-slate-100 py-8 px-4 sm:px-6 lg:px-8">
    <div class="max-w-4xl mx-auto space-y-8">
      
      <!-- Quick Matchmaking Card -->
      <div class="bg-gradient-to-r from-emerald-600 to-teal-800 text-white p-8 rounded-3xl shadow-xl text-center space-y-6">
        <h1 class="text-3xl font-black">JustPlay - ፈጣን ጨዋታ ፍለጋ</h1>
        <p class="text-xs sm:text-sm text-emerald-100 max-w-md mx-auto">ቦታ እና ሰዓት ብቻ ይምረጡ፤ ሲስተሙ ተመሳሳይ ፍላጎት ያላቸውን ተጫዋቾች ወዲያው ያገኛልዎታል።</p>
        
        <div class="flex flex-col sm:flex-row justify-center gap-3 max-w-lg mx-auto">
          <input type="text" placeholder="ቦታ (e.g. ቦሌ)" class="px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-xs text-white placeholder-emerald-200 outline-none" />
          <button class="px-6 py-3 bg-amber-400 text-slate-950 font-extrabold text-sm rounded-xl shadow-lg hover:bg-amber-300 transition">
            ⚡ Find Me a Match
          </button>
        </div>
      </div>

      <!-- Live Waiting Queue -->
      <div class="bg-white dark:bg-[#131c27] p-6 rounded-2xl border border-slate-200 dark:border-[#212e3e] space-y-4">
        <h3 class="font-bold text-base flex items-center gap-2">
          <span class="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span> 
          በአቅራቢያ ያሉ ተጫዋቾች (Live Queue)
        </h3>

        <div class="divide-y divide-slate-100 dark:divide-[#212e3e]">
          <div v-for="player in queuePlayers" :key="player.id" class="py-3 flex justify-between items-center text-xs">
            <div>
              <p class="font-bold text-slate-900 dark:text-white">{{ player.name }}</p>
              <span class="text-slate-500">{{ player.position }}</span>
            </div>
            <span class="px-2.5 py-1 bg-slate-100 dark:bg-[#0b111a] font-semibold text-emerald-500 rounded-md">{{ player.status }}</span>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>