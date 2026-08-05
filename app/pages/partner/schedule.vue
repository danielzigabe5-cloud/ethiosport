<script setup>
import { ref } from 'vue'

definePageMeta({ layout: 'partner' })

const timeSlots = ref([
  { id: 1, time: '06:00 AM - 07:00 AM', status: 'Available', price: 500 },
  { id: 2, time: '07:00 AM - 08:00 AM', status: 'Available', price: 500 },
  { id: 3, time: '02:00 PM - 03:00 PM', status: 'Booked', price: 600 },
  { id: 4, time: '04:00 PM - 05:00 PM', status: 'Booked', price: 600 },
  { id: 5, time: '05:00 PM - 06:00 PM', status: 'Available', price: 800 },
  { id: 6, time: '06:00 PM - 07:00 PM', status: 'Closed', price: 800 }
])

const toggleSlotStatus = (slot) => {
  if (slot.status === 'Booked') return
  slot.status = slot.status === 'Available' ? 'Closed' : 'Available'
}
</script>

<template>
  <div class="space-y-6 max-w-5xl mx-auto">
    <div>
      <h1 class="text-xl font-black text-white">⏰ Time Slots & Pricing</h1>
      <p class="text-xs text-slate-400">የቀን ክፍለ-ጊዜዎችን ይክፈቱ፣ ይዝጉ ወይም ዋጋ ያስተካክሉ።</p>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
      <div 
        v-for="s in timeSlots" 
        :key="s.id"
        class="bg-[#0b111a] border border-[#1a2432] p-4 rounded-2xl flex items-center justify-between"
      >
        <div>
          <p class="text-xs font-bold text-white">{{ s.time }}</p>
          <p class="text-[11px] text-emerald-400 font-semibold mt-0.5">{{ s.price }} ETB</p>
        </div>

        <button 
          @click="toggleSlotStatus(s)"
          :disabled="s.status === 'Booked'"
          :class="[
            'px-3 py-1.5 rounded-xl text-[10px] font-bold transition',
            s.status === 'Available' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' : '',
            s.status === 'Booked' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/30 cursor-not-allowed' : '',
            s.status === 'Closed' ? 'bg-slate-800/60 text-slate-500 border border-slate-700' : ''
          ]"
        >
          {{ s.status }}
        </button>
      </div>
    </div>
  </div>
</template>