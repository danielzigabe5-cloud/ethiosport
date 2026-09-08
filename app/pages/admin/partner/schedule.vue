<script setup lang="ts">
import { ref } from 'vue'

definePageMeta({
  layout: 'partner'
})

const slots = ref([
  { time: '08:00 AM - 09:00 AM', status: 'Free', price: 600 },
  { time: '09:00 AM - 10:00 AM', status: 'Booked', customer: 'አቤል ተስፋዬ', price: 600 },
  { time: '10:00 AM - 11:00 AM', status: 'Booked', customer: 'ዮሴፍ ቄስ', price: 600 },
  { time: '11:00 AM - 12:00 PM', status: 'Blocked', price: 600 },
  { time: '02:00 PM - 03:00 PM', status: 'Free', price: 800 }
])

const toggleBlock = (index: number) => {
  if (slots.value[index].status === 'Free') {
    slots.value[index].status = 'Blocked'
  } else if (slots.value[index].status === 'Blocked') {
    slots.value[index].status = 'Free'
  }
}
</script>

<template>
  <div class="space-y-6 max-w-6xl mx-auto font-sans">
    <div>
      <h1 class="text-xl font-black text-white">📅 Schedule</h1>
      <p class="text-xs text-slate-400">የሜዳዎን ክፍት እና የተያዙ ሰዓቶች ያስተዳድሩ።</p>
    </div>

    <div class="bg-[#0b111a] border border-[#1a2432] rounded-2xl p-5 divide-y divide-[#1a2432]">
      <div 
        v-for="(slot, i) in slots" 
        :key="i"
        class="py-3 flex items-center justify-between text-xs"
      >
        <div class="flex items-center gap-4">
          <span class="font-bold text-white w-36">{{ slot.time }}</span>
          <span 
            class="px-2.5 py-1 rounded-lg text-[10px] font-bold"
            :class="{
              'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20': slot.status === 'Free',
              'bg-blue-500/10 text-blue-400 border border-blue-500/20': slot.status === 'Booked',
              'bg-rose-500/10 text-rose-400 border border-rose-500/20': slot.status === 'Blocked'
            }"
          >
            {{ slot.status === 'Free' ? 'ክፍት (Free)' : slot.status === 'Booked' ? `የተያዘ (${slot.customer})` : 'የተዘጋ (Blocked)' }}
          </span>
        </div>

        <div class="flex items-center gap-3">
          <span class="text-slate-400 font-semibold">{{ slot.price }} ETB</span>
          <button 
            v-if="slot.status !== 'Booked'"
            @click="toggleBlock(i)"
            class="px-3 py-1.5 rounded-lg text-[11px] font-bold transition cursor-pointer"
            :class="slot.status === 'Blocked' ? 'bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30' : 'bg-rose-500/20 text-rose-400 hover:bg-rose-500/30'"
          >
            {{ slot.status === 'Blocked' ? 'ክፈት (Unblock)' : 'ዝጋ (Block)' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>