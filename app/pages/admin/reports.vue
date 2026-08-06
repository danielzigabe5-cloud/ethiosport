<!-- app/pages/admin/reports.vue -->
<script setup>
import { ref } from 'vue'

definePageMeta({
  layout: 'admin'
})

// Selected Date Range Filter
const selectedRange = ref('30days')

// Summary Overview Metrics
const metrics = ref([
  { title: 'Total Revenue', value: '485,200 ETB', change: '+18.4%', isPositive: true, icon: '💰' },
  { title: 'Total Bookings', value: '1,240', change: '+12.1%', isPositive: true, icon: '📅' },
  { title: 'Active Partner Venues', value: '38', change: '+4.5%', isPositive: true, icon: '🏟️' },
  { title: 'Cancelled Bookings', value: '24', change: '-2.3%', isPositive: false, icon: '❌' }
])

// Top Performing Venues Data
const topVenues = ref([
  { name: 'ሳርቤት ፉትሳል (Sarbet Futsal)', city: 'Addis Ababa', bookings: 342, revenue: '136,800 ETB', rating: '4.9' },
  { name: 'ሜክሲኮ ስፖርት ሴንተር (Mexico Sport)', city: 'Addis Ababa', bookings: 280, revenue: '112,000 ETB', rating: '4.8' },
  { name: 'ቦሌ አሬና (Bole Arena)', city: 'Addis Ababa', bookings: 210, revenue: '94,500 ETB', rating: '4.7' },
  { name: 'አዳማ ስፖርት ክለብ (Adama Sport)', city: 'Adama', bookings: 165, revenue: '66,000 ETB', rating: '4.6' }
])

// Recent Payout / Transaction Log
const recentTransactions = ref([
  { id: 'TRX-9821', partner: 'ሳርቤት ፉትሳል', amount: '24,500 ETB', date: '2026-08-04', status: 'Completed' },
  { id: 'TRX-9820', partner: 'ሜክሲኮ ስፖርት', amount: '18,200 ETB', date: '2026-08-03', status: 'Completed' },
  { id: 'TRX-9819', partner: 'ቦሌ አሬና', amount: '31,000 ETB', date: '2026-08-01', status: 'Pending' },
  { id: 'TRX-9818', partner: 'አዳማ ስፖርት', amount: '12,400 ETB', date: '2026-07-28', status: 'Completed' }
])
</script>

<template>
  <div class="space-y-8">
    
    <!-- PAGE HEADER & FILTER -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#0b111a] p-6 rounded-2xl border border-[#1a2432]">
      <div>
        <h1 class="text-2xl font-black text-white tracking-wide">System Reports & Analytics</h1>
        <p class="text-xs text-slate-400 mt-1">የEthioSport አጠቃላይ የገቢ፣ የቦታ ማስያዣዎች እና የፓርትነሮች እንቅስቃሴ ዘገባ</p>
      </div>

      <!-- Actions: Range Selector & Export -->
      <div class="flex items-center gap-3">
        <select 
          v-model="selectedRange" 
          class="bg-[#131c27] border border-[#212e3e] text-slate-200 text-xs font-semibold rounded-xl px-4 py-2.5 focus:outline-none focus:border-emerald-500"
        >
          <option value="7days">Last 7 Days</option>
          <option value="30days">Last 30 Days</option>
          <option value="90days">Last 3 Months</option>
          <option value="year">This Year (2026)</option>
        </select>

        <button 
          @click="alert('Report PDF Exporter Coming Soon!')"
          class="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-slate-950 text-xs font-bold px-4 py-2.5 rounded-xl transition shadow-lg shadow-emerald-500/10 cursor-pointer"
        >
          <span>📥</span>
          <span>Export PDF/CSV</span>
        </button>
      </div>
    </div>

    <!-- METRICS CARDS -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      <div 
        v-for="(item, idx) in metrics" 
        :key="idx" 
        class="bg-[#0b111a] border border-[#1a2432] p-5 rounded-2xl flex flex-col justify-between"
      >
        <div class="flex items-center justify-between">
          <span class="text-2xl">{{ item.icon }}</span>
          <span 
            class="text-[11px] font-bold px-2.5 py-1 rounded-full"
            :class="item.isPositive ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'"
          >
            {{ item.change }}
          </span>
        </div>
        <div class="mt-4">
          <p class="text-xs font-semibold text-slate-400">{{ item.title }}</p>
          <h3 class="text-2xl font-black text-white mt-1">{{ item.value }}</h3>
        </div>
      </div>
    </div>

    <!-- GRAPH & ANALYTICS PLACEHOLDER -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      <!-- Revenue Breakdown Chart View -->
      <div class="lg:col-span-2 bg-[#0b111a] border border-[#1a2432] p-6 rounded-2xl flex flex-col justify-between">
        <div class="flex items-center justify-between mb-6">
          <div>
            <h3 class="font-bold text-white text-base">Revenue Overview (ETB)</h3>
            <p class="text-xs text-slate-400">የወራት ገቢ ንፅፅር</p>
          </div>
          <span class="text-xs text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-lg border border-emerald-500/20 font-bold">
            +18.4% Growth
          </span>
        </div>

        <!-- Visual Bar Chart Representation -->
        <div class="h-56 flex items-end justify-between gap-3 pt-8 pb-2 px-4 bg-[#131c27]/40 rounded-xl border border-[#1a2432]">
          <div v-for="(height, month) in { Jan: '40%', Feb: '55%', Mar: '45%', Apr: '70%', May: '60%', Jun: '85%', Jul: '95%' }" :key="month" class="flex-1 flex flex-col items-center gap-2 group">
            <div class="w-full bg-emerald-500/20 group-hover:bg-emerald-500 transition-all rounded-t-md relative flex items-end justify-center" :style="{ height: height }">
              <span class="opacity-0 group-hover:opacity-100 absolute -top-7 text-[10px] bg-slate-800 text-emerald-400 px-1.5 py-0.5 rounded font-bold transition">
                {{ height }}
              </span>
            </div>
            <span class="text-[10px] text-slate-400 font-bold uppercase">{{ month }}</span>
          </div>
        </div>
      </div>

      <!-- Platform Commission Summary -->
      <div class="bg-[#0b111a] border border-[#1a2432] p-6 rounded-2xl flex flex-col justify-between">
        <div>
          <h3 class="font-bold text-white text-base">Platform Earnings</h3>
          <p class="text-xs text-slate-400 mt-0.5">የEthioSport የኮሚሽን ድርሻ (10%)</p>

          <div class="mt-6 p-4 bg-[#131c27] rounded-xl border border-[#212e3e] space-y-3">
            <div class="flex justify-between text-xs">
              <span class="text-slate-400">Total Booking Cut:</span>
              <span class="font-bold text-white">48,520 ETB</span>
            </div>
            <div class="flex justify-between text-xs">
              <span class="text-slate-400">Pending Payouts:</span>
              <span class="font-bold text-amber-400">31,000 ETB</span>
            </div>
            <div class="flex justify-between text-xs">
              <span class="text-slate-400">Processed Payouts:</span>
              <span class="font-bold text-emerald-400">405,680 ETB</span>
            </div>
          </div>
        </div>

        <div class="mt-6 pt-4 border-t border-[#1a2432] text-center">
          <NuxtLink to="/admin/venues" class="text-xs text-emerald-400 hover:underline font-bold">
            Manage Partner Payouts →
          </NuxtLink>
        </div>
      </div>

    </div>

    <!-- TOP VENUES TABLE -->
    <div class="bg-[#0b111a] border border-[#1a2432] rounded-2xl overflow-hidden">
      <div class="p-6 border-b border-[#1a2432]">
        <h3 class="font-bold text-white text-base">Top Performing Sports Venues</h3>
        <p class="text-xs text-slate-400">በከፍተኛ ገቢ እና ቦታ በማስያዝ አግኝተው ቀደምት የሆኑ ሜዳዎች</p>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full text-left text-xs text-slate-300">
          <thead class="bg-[#131c27] text-slate-400 font-semibold border-b border-[#1a2432]">
            <tr>
              <th class="p-4">Venue Name</th>
              <th class="p-4">Location</th>
              <th class="p-4">Total Bookings</th>
              <th class="p-4">Total Revenue</th>
              <th class="p-4">User Rating</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-[#1a2432]">
            <tr v-for="(venue, index) in topVenues" :key="index" class="hover:bg-[#131c27]/50 transition">
              <td class="p-4 font-bold text-white flex items-center gap-2">
                <span class="text-emerald-400 font-black">#{{ index + 1 }}</span>
                {{ venue.name }}
              </td>
              <td class="p-4 text-slate-400">{{ venue.city }}</td>
              <td class="p-4 font-semibold text-slate-200">{{ venue.bookings }} times</td>
              <td class="p-4 font-bold text-emerald-400">{{ venue.revenue }}</td>
              <td class="p-4">
                <span class="bg-amber-500/10 text-amber-400 px-2 py-1 rounded-md border border-amber-500/20 font-bold">
                  ⭐ {{ venue.rating }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

  </div>
</template>