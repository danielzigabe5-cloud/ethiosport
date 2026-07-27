<template>
  <div class="min-h-screen bg-slate-950 py-12 px-6">
    <div class="max-w-6xl mx-auto space-y-8">
      <div>
        <h1 class="text-3xl font-bold text-white mb-2">🎉 የስፖርት ኩነቶች እና ውድድሮች</h1>
        <p class="text-slate-400">በሀገር ውስጥ የሚዘጋጁ ማራቶኖችን እና ውድድሮችን ይከታተሉ</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div v-for="event in events" :key="event.id" class="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-slate-700 transition flex flex-col justify-between">
          <div class="p-6 space-y-4">
            <div class="flex justify-between items-center text-xs">
              <span class="px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-full font-semibold">{{ event.type }}</span>
              <span class="text-slate-400">{{ event.date }}</span>
            </div>
            <h3 class="text-xl font-bold text-white">{{ event.title }}</h3>
            <p class="text-slate-400 text-sm leading-relaxed">{{ event.description }}</p>
            <div class="text-xs text-slate-300 space-y-1">
              <p>📍 ቦታ፦ {{ event.location }}</p>
              <p>💵 የመመዝገቢያ ዋጋ፦ {{ event.price }}</p>
            </div>
          </div>
          
          <!-- እዚህ ጋር በተኑ ተቀይሯል -->
          <div class="p-6 pt-0">
            <NuxtLink 
              to="/register" 
              class="block w-full py-3 bg-emerald-600 hover:bg-emerald-50 text-white hover:text-emerald-700 text-center font-bold rounded-xl transition shadow-lg shadow-emerald-900/10"
            >
              አሁኑኑ ይመዝገቡ
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const events = ref([
  { id: 1, title: 'ታላቁ ሩጫ በኢትዮጵያ 2026', type: 'ማራቶን', date: 'ህዳር 15, 2026', location: 'አዲስ አበባ፣ መስቀል አደባባይ', price: '350 ብር', description: 'በየዓመቱ የሚካሄደው የ10 ኪሎ ሜትር ታላቁ የጎዳና ሩጫ ውድድር።' },
  { id: 2, title: 'የአዲስ አበባ ከተማ ታዳጊዎች የቮሊቦል ውድድር', type: 'ቮሊቦል', date: 'ታህሳስ 02, 2026', location: 'አዲስ አበባ ስታዲየም', price: 'ነፃ', description: 'ለታዳጊዎች የተዘጋጀ የቮሊቦል ሻምፒዮና ውድድር።' }
])
</script>