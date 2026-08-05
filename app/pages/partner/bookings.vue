<script setup>
import { ref, computed } from 'vue'

definePageMeta({ layout: 'partner' })

const activeTab = ref('All')

const bookings = ref([
  { id: 'BK-9021', name: 'አበበ ከበደ', phone: '0911***890', venue: 'Pitch 1', time: '02:00 PM - 03:00 PM', price: 600, status: 'Checked In' },
  { id: 'BK-9022', name: 'ዮናስ ተስፋዬ', phone: '0922***123', venue: 'Pitch 1', time: '04:00 PM - 05:00 PM', price: 600, status: 'Confirmed' },
  { id: 'BK-9023', name: 'ዳዊት አለሙ', phone: '0933***456', venue: 'Pitch 2', time: '05:00 PM - 06:00 PM', price: 800, status: 'Confirmed' },
  { id: 'BK-9024', name: 'ሔኖክ መኮንን', phone: '0944***789', venue: 'Pitch 1', time: '07:00 PM - 08:00 PM', price: 750, status: 'Pending' }
])

const filteredBookings = computed(() => {
  if (activeTab.value === 'All') return bookings.value
  return bookings.value.filter(b => b.status === activeTab.value)
})
</script>

<template>
  <div class="space-y-6 max-w-6xl mx-auto">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-xl font-black text-white">📅 Bookings Manager</h1>
        <p class="text-xs text-slate-400">የተያዙ ሰዓቶችን እና የተጫዋቾችን ዝርዝር ይከታተሉ።</p>
      </div>

      <!-- Filter Buttons -->
      <div class="flex gap-1.5 bg-[#0b111a] border border-[#1a2432] p-1 rounded-xl self-start">
        <button 
          v-for="tab in ['All', 'Confirmed', 'Checked In', 'Pending']" 
          :key="tab"
          @click="activeTab = tab"
          :class="[
            'px-3 py-1.5 rounded-lg text-xs font-bold transition',
            activeTab === tab ? 'bg-emerald-500 text-slate-950 shadow' : 'text-slate-400 hover:text-white'
          ]"
        >
          {{ tab }}
        </button>
      </div>
    </div>

    <!-- Table -->
    <div class="bg-[#0b111a] border border-[#1a2432] rounded-2xl p-5 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-left text-xs">
          <thead>
            <tr class="border-b border-[#1a2432] text-slate-400 uppercase">
              <th class="py-3 px-3">Booking ID</th>
              <th class="py-3 px-3">ተጫዋች</th>
              <th class="py-3 px-3">ሰዓት</th>
              <th class="py-3 px-3">ሜዳ</th>
              <th class="py-3 px-3">ዋጋ</th>
              <th class="py-3 px-3">Status</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-[#1a2432]">
            <tr v-for="b in filteredBookings" :key="b.id">
              <td class="py-3.5 px-3 font-mono font-bold text-emerald-400">{{ b.id }}</td>
              <td class="py-3.5 px-3 text-white">
                <p class="font-bold">{{ b.name }}</p>
                <p class="text-[10px] text-slate-500">{{ b.phone }}</p>
              </td>
              <td class="py-3.5 px-3 text-slate-300">{{ b.time }}</td>
              <td class="py-3.5 px-3 text-slate-300">{{ b.venue }}</td>
              <td class="py-3.5 px-3 font-bold text-white">{{ b.price }} ETB</td>
              <td class="py-3.5 px-3">
                <span 
                  :class="[
                    'px-2.5 py-1 rounded-md text-[10px] font-bold',
                    b.status === 'Checked In' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' : '',
                    b.status === 'Confirmed' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/30' : '',
                    b.status === 'Pending' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30' : ''
                  ]"
                >
                  {{ b.status }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>