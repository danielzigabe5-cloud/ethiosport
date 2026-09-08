<script setup lang="ts">
import { ref } from 'vue'

definePageMeta({
  layout: 'partner'
})

const venues = ref([
  { id: 1, name: ' Pitch 1 - Artificial Turf', type: 'Outdoor 7v7', price: 600, status: 'Active', image: '🌱' },
  { id: 2, name: ' Pitch 2 - Indoor Futsal', type: 'Indoor 5v5', price: 800, status: 'Active', image: '🏀' }
])
</script>

<template>
  <div class="space-y-6 max-w-6xl mx-auto font-sans">
    <div class="flex justify-between items-center">
      <div>
        <h1 class="text-xl font-black text-white">🏟️ My Venues</h1>
        <p class="text-xs text-slate-400">የሚያስተዳድሯቸውን ሜዳዎች ዝርዝር እና ዋጋ ያስተካክሉ።</p>
      </div>
      <button class="px-4 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-xs transition cursor-pointer">
        + አዲስ ሜዳ ጨምር
      </button>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div 
        v-for="v in venues" 
        :key="v.id" 
        class="bg-[#0b111a] border border-[#1a2432] p-5 rounded-2xl flex items-center justify-between shadow-md"
      >
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 bg-[#131c27] border border-[#212e3e] rounded-xl flex items-center justify-center text-2xl">
            {{ v.image }}
          </div>
          <div>
            <h3 class="font-bold text-white text-sm">{{ v.name }}</h3>
            <p class="text-xs text-slate-400">{{ v.type }}</p>
            <p class="text-xs font-bold text-emerald-400 mt-1">{{ v.price }} ETB / ሰዓት</p>
          </div>
        </div>
        <span class="px-2.5 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-bold rounded-lg">
          {{ v.status }}
        </span>
      </div>
    </div>
  </div>
</template>