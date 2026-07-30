<template>
  <div class="min-h-screen bg-slate-950 py-12 px-6">
    <div class="max-w-6xl mx-auto space-y-8">
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 class="text-3xl font-bold text-white mb-2">🎮 Just Play (ተጫዋች ይፈልጉ)</h1>
          <p class="text-slate-400">የሚጫወቱበት ቡድን ወይም ሰው አጡ? በአቅራቢያዎ ያሉ ጨዋታዎችን የተቀላቀሉ</p>
        </div>
        <button class="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-lg transition">
          + አዲስ ጨዋታ ፍጠር
        </button>
      </div>

      <!-- Match Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="match in matches" :key="match.id" class="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 hover:border-emerald-500/50 transition">
          <div class="flex justify-between items-center">
            <span class="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full text-xs font-semibold">
              {{ match.sport }}
            </span>
            <span class="text-slate-400 text-xs">📍 {{ match.location }}</span>
          </div>

          <h3 class="text-lg font-bold text-white">{{ match.title }}</h3>

          <div class="text-sm text-slate-400 space-y-2">
            <p>📅 ቀን፦ {{ match.date }}</p>
            <p>⏰ ሰዓት፦ {{ match.time }}</p>
            <p>👥 የሚፈለግ ተጫዋች፦ <span class="text-emerald-400 font-bold">{{ match.needed }} ሰው</span></p>
          </div>

          <button class="w-full py-2.5 bg-slate-800 hover:bg-emerald-600 text-white font-semibold rounded-xl border border-slate-700 hover:border-transparent transition">
            ቡድኑን የተቀላቀሉ
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const matches = ref([
  { id: 1, title: 'የሳር ሜዳ 5v5 ጨዋታ', sport: 'እግር ኳስ', location: 'ቦሌ ሚሊኒየም', date: 'ነገ', time: '11:00 ምሽት', needed: 2 },
  { id: 2, title: 'የባስኬትቦል ወዳጅነት ጨዋታ', sport: 'ባስኬትቦል', location: 'መክሊክ ስታዲየም', date: 'ቅዳሜ', time: '10:00 ጠዋት', needed: 4 },
  { id: 3, title: 'የምሽት 7v7 ጨዋታ', sport: 'እግር ኳስ', location: 'አትሌቲክስ ፌዴሬሽን', date: 'እሁድ', time: '12:00 ምሽት', needed: 1 }
])
</script>