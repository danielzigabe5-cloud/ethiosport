<script setup lang="ts">
definePageMeta({
  Layout: 'user'
})

const { user } = useAuth()

// Mock Quick Summary Data
const upcomingBookings = ref([
  { id: 'BK-101', venue: 'አበበ ቢቂላ ስታዲየም', date: '2026-08-05', time: '10:00 AM - 12:00 PM', status: 'Approved' }
])

const recentTickets = ref([
  { id: 'TK-882', match: 'ቅዱስ ጊዮርጊስ vs ኢትዮጵያ ቡና', stadium: 'አዲስ አበባ ስታዲየም', date: '2026-08-12', seat: 'VIP - Gate 3' }
])
</script>

<template>
  <div class="space-y-8">
    <!-- Hero Greeting Header -->
    <div class="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-8 text-white shadow-lg">
      <h1 class="text-2xl md:text-3xl font-black">እንኳን ደህና መጡ፣ {{ user?.name || 'ስፖርተኛ' }}! 👋</h1>
      <p class="text-blue-100 text-sm mt-2">በ EthioSport የያዟቸውን ቦታዎች፣ የቆረጧቸውን ትኬቶች እና የፕሮፋይል መረጃዎን እዚህ ማስተዳደር ይችላሉ።</p>
      
      <div class="flex flex-wrap gap-3 mt-6">
        <NuxtLink to="/dashboard/my-bookings" class="bg-white text-blue-600 px-5 py-2.5 rounded-xl text-xs font-bold shadow hover:bg-blue-50 transition">
          የያዟቸው ቦታዎች
        </NuxtLink>
        <NuxtLink to="/dashboard/my-tickets" class="bg-blue-700/50 text-white border border-blue-400/30 px-5 py-2.5 rounded-xl text-xs font-bold hover:bg-blue-700 transition">
          የእኔ ትኬቶች
        </NuxtLink>
      </div>
    </div>

    <!-- Overview Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      
      <!-- Upcoming Booking Card -->
      <div class="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm space-y-4">
        <div class="flex justify-between items-center">
          <h2 class="font-bold text-slate-800">የቀጣይ ጊዜ ቦታ ማስያዣ</h2>
          <NuxtLink to="/dashboard/my-bookings" class="text-xs text-blue-600 font-bold hover:underline">ሁሉንም እይ →</NuxtLink>
        </div>

        <div v-if="upcomingBookings.length > 0" class="space-y-3">
          <div v-for="item in upcomingBookings" :key="item.id" class="p-4 bg-slate-50 rounded-xl border border-slate-100">
            <div class="flex justify-between items-start">
              <div>
                <h3 class="font-bold text-slate-800 text-sm">{{ item.venue }}</h3>
                <p class="text-xs text-slate-500 mt-1">📅 {{ item.date }} | ⏰ {{ item.time }}</p>
              </div>
              <span class="bg-emerald-100 text-emerald-700 text-[10px] font-bold px-2.5 py-1 rounded-full">
                {{ item.status }}
              </span>
            </div>
          </div>
        </div>
        <div v-else class="text-center py-6 text-slate-400 text-xs">
          ምንም የተያዘ ቦታ የለም።
        </div>
      </div>

      <!-- Upcoming Matches/Tickets Card -->
      <div class="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm space-y-4">
        <div class="flex justify-between items-center">
          <h2 class="font-bold text-slate-800">የእርስዎ ትኬት</h2>
          <NuxtLink to="/dashboard/my-tickets" class="text-xs text-blue-600 font-bold hover:underline">ሁሉንም እይ →</NuxtLink>
        </div>

        <div v-if="recentTickets.length > 0" class="space-y-3">
          <div v-for="ticket in recentTickets" :key="ticket.id" class="p-4 bg-blue-50/50 rounded-xl border border-blue-100">
            <h3 class="font-bold text-slate-800 text-sm">{{ ticket.match }}</h3>
            <p class="text-xs text-slate-500 mt-1">📍 {{ ticket.stadium }} — 🗓️ {{ ticket.date }}</p>
            <span class="inline-block mt-2 text-[11px] bg-blue-600 text-white font-bold px-2 py-0.5 rounded">
              {{ ticket.seat }}
            </span>
          </div>
        </div>
        <div v-else class="text-center py-6 text-slate-400 text-xs">
          የተቆረጠ ትኬት የለም።
        </div>
      </div>

    </div>
  </div>
</template>