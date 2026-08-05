<!-- pages/admin/index.vue -->
<script setup>
import { ref } from 'vue'

definePageMeta({
  layout: 'admin'
})

// Dynamic Stats Data
const stats = ref([
  { title: 'ጠቅላላ ተጠቃሚዎች', value: '1,240', change: '+12%', icon: '👥' },
  { title: 'የተመዘገቡ ሜዳዎች', value: '48', change: '+3', icon: '🏟️' },
  { title: 'የተደረጉ ይዞታዎች', value: '856', change: '+18%', icon: '🎟️' },
  { title: 'ጠቅላላ ገቢ (ETB)', value: '452,000', change: '+24%', icon: '💵' }
])

// Recent Bookings List
const recentBookings = ref([
  { id: 'BK-9921', user: 'አበበ በቀለ', venue: 'ሳርቤት ፉትሳል ሜዳ', date: '2026-08-04', price: '800 ETB', status: 'Approved' },
  { id: 'BK-9922', user: 'ዮናስ ኃይሌ', venue: 'ቦሌ አሬና ቴኒስ', date: '2026-08-05', price: '1200 ETB', status: 'Pending' },
  { id: 'BK-9923', user: 'ሜሮን ሀይሉ', venue: 'ካዛንችስ ስፖርት ሴንተር', date: '2026-08-06', price: '1000 ETB', status: 'Approved' }
])

const approveBooking = (id) => {
  const target = recentBookings.value.find(b => b.id === id)
  if (target) target.status = 'Approved'
}
</script>

<template>
  <!-- h-screen እና overflow-hidden እዚህ ጋር በፍጹም አይገቡም -->
  <div class="space-y-8 pb-8">
    
    <!-- HEADER TITLE -->
    <div>
      <h1 class="text-2xl font-black text-slate-900 dark:text-white">Admin Dashboard</h1>
      <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">የEthioSport አጠቃላይ እንቅስቃሴ እና ስታቲስቲክስ</p>
    </div>

    <!-- 1. STATS OVERVIEW CARDS -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div 
        v-for="(card, index) in stats" 
        :key="index"
        class="bg-white dark:bg-[#0b111a] p-5 rounded-3xl border border-slate-200 dark:border-[#212e3e] shadow-sm flex flex-col justify-between space-y-4"
      >
        <div class="flex items-center justify-between">
          <div class="w-10 h-10 bg-slate-100 dark:bg-[#131c27] rounded-2xl flex items-center justify-center text-xl">
            {{ card.icon }}
          </div>
          <span class="px-2.5 py-1 bg-emerald-500/10 text-emerald-500 text-[10px] font-black rounded-full">
            {{ card.change }}
          </span>
        </div>

        <div>
          <h3 class="text-2xl font-black text-slate-900 dark:text-white tracking-tight">{{ card.value }}</h3>
          <p class="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-0.5">{{ card.title }}</p>
        </div>
      </div>
    </div>

    <!-- 2. RECENT BOOKINGS TABLE SECTION -->
    <div class="bg-white dark:bg-[#0b111a] rounded-3xl border border-slate-200 dark:border-[#212e3e] p-6 space-y-4 shadow-sm">
      
      <div class="flex items-center justify-between">
        <div>
          <h2 class="text-base font-black text-slate-900 dark:text-white">የቅርብ ጊዜ ይዞታዎች (Recent Bookings)</h2>
          <p class="text-xs text-slate-500 dark:text-slate-400">በቅርቡ በደንበኞች የተያዙ ቦታዎች</p>
        </div>
        
        <NuxtLink 
          to="/admin/bookings" 
          class="text-xs font-bold text-emerald-500 hover:text-emerald-400 flex items-center gap-1 transition"
        >
          <span>ሁሉንም ይመልከቱ</span>
          <span>→</span>
        </NuxtLink>
      </div>

      <!-- TABLE -->
      <div class="overflow-x-auto">
        <table class="w-full text-left text-xs">
          <thead class="bg-slate-50 dark:bg-[#131c27] border-b border-slate-200 dark:border-[#212e3e] text-slate-400 font-black uppercase">
            <tr>
              <th class="p-4">ID</th>
              <th class="p-4">ተጠቃሚ</th>
              <th class="p-4">ሜዳ</th>
              <th class="p-4">ቀን</th>
              <th class="p-4">ክፍያ</th>
              <th class="p-4">ሁኔታ</th>
              <th class="p-4 text-right">ተግባር</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100 dark:divide-[#212e3e]">
            <tr v-for="b in recentBookings" :key="b.id" class="font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50/50 dark:hover:bg-[#131c27]/50">
              <td class="p-4 text-emerald-500 font-bold">{{ b.id }}</td>
              <td class="p-4 font-bold text-slate-900 dark:text-white">{{ b.user }}</td>
              <td class="p-4">{{ b.venue }}</td>
              <td class="p-4">{{ b.date }}</td>
              <td class="p-4">{{ b.price }}</td>
              <td class="p-4">
                <span :class="[
                  'px-2.5 py-1 rounded-full text-[10px] font-bold',
                  b.status === 'Approved' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'
                ]">
                  {{ b.status }}
                </span>
              </td>
              <td class="p-4 text-right">
                <button 
                  v-if="b.status === 'Pending'" 
                  @click="approveBooking(b.id)"
                  class="px-3 py-1 bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500 hover:text-slate-950 rounded-lg text-[11px] font-bold transition cursor-pointer"
                >
                  አጽድቅ
                </button>
                <span v-else class="text-slate-400 text-[11px]">ተጠናቅቋል</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>

  </div>
</template>