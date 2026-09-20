<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const isDark = ref(false)
const isLoading = ref(true)
const currentLang = ref('አማ')

// 1. Reactive Variables
const dashboardStats = ref({
  earnings: 'birr 0',
  venues: '0',
  bookings: '0',
  pending: 'birr 0'
})
const recentBookings = ref([])

// 2. ዳታውን ከባክኤንድ የመጥሪያ ፈንክሽን
const fetchDashboardData = async () => {
  isLoading.value = true
  try {
    const token = localStorage.getItem('auth_token')
    const response = await fetch('http://localhost:8000/api/owner/overview', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) throw new Error('Network response was not ok')

    const data = await response.json()
    
    // ከባክኤንድ የመጣውን ዳታ ለተለዋዋጮች መስጠት
    dashboardStats.value = data.stats
    recentBookings.value = data.recentBookings
  } catch (error) {
    console.error("ዳታ መጫን አልተቻለም:", error)
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchDashboardData()
})

// 3. የካርዶቹ ዝርዝር (Computed)
const statsCards = computed(() => [
  {
    title: 'ጠቅላላ ገቢ (Earnings)',
    value: dashboardStats.value.earnings,
    change: '+12.5%',
    isPositive: true,
    icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
  },
  {
    title: 'የእኔ ሜዳዎች (My Venues)',
    value: dashboardStats.value.venues,
    change: 'ንቁ ሜዳዎች',
    isPositive: true,
    icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z'
  },
  {
    title: 'የዚህ ወር ቡኪንግ (Bookings)',
    value: dashboardStats.value.bookings,
    change: 'በዚህ ወር',
    isPositive: true,
    icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
  },
  {
    title: 'ያልተከፈሉ ክፍያዎች (Pending)',
    value: dashboardStats.value.pending,
    change: 'በሂደት ላይ',
    isPositive: false,
    icon: 'M3 10h18M7 15h1m4 0h1m-7 4h12a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
  }
])

// Sidebar Links
const partnerSidebarLinks = [
  { name: 'Dashboard', path: '/partner', icon: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z' },
  { name: 'Schedule', path: '/partner/schedule', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
  { name: 'My Venues', path: '/partner/venues', icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z' },
  { name: 'Payouts', path: '/partner/payouts', icon: 'M3 10h18M7 15h1m4 0h1m-7 4h12a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
  { name: 'Settings', path: '/partner/settings', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z' },
]

const toggleLanguage = () => { currentLang.value = currentLang.value === 'አማ' ? 'EN' : 'አማ' }
const toggleTheme = () => { isDark.value = !isDark.value }
const handleLogout = () => { 
  localStorage.removeItem('auth_token')
  router.push('/auth') 
}
</script>

<template>
  <div class="min-h-screen w-full bg-slate-50 text-slate-800 font-sans flex flex-col">
    
    <!-- TOP HEADER -->
    <header class="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between sticky top-0 z-50 shadow-xs">
      <NuxtLink to="/" class="flex items-center gap-1 text-xl font-black tracking-tight">
        <span class="text-slate-900">ETHIO</span><span class="text-emerald-600">SPORT</span>
      </NuxtLink>

      <div class="flex items-center gap-3">
        <button @click="toggleLanguage" class="px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-xs font-bold text-slate-700 transition cursor-pointer">
          {{ currentLang }}
        </button>
        <button @click="handleLogout" class="px-3 py-1.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 hover:bg-rose-100 text-xs font-bold transition cursor-pointer">
          Logout
        </button>
      </div>
    </header>

    <div class="flex-1 flex w-full relative">
      <!-- SIDEBAR -->
      <aside class="w-64 bg-white border-r border-slate-200 p-4 hidden md:flex flex-col">
        <div class="px-2 py-1 text-[11px] font-bold tracking-wider text-slate-400 uppercase mb-4">
          የፓርትነር መቆጣጠሪያ
        </div>
        <nav class="space-y-1">
          <NuxtLink
            v-for="item in partnerSidebarLinks" :key="item.path" :to="item.path"
            class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition"
            :class="[route.path === item.path ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900']"
          >
            <svg class="w-4 h-4 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" :d="item.icon" />
            </svg>
            <span>{{ item.name }}</span>
          </NuxtLink>
        </nav>
      </aside>

      <!-- MAIN CONTENT -->
      <main class="flex-1 p-6 space-y-6 overflow-x-hidden">
        
        <!-- LOADING STATE -->
        <div v-if="isLoading" class="flex items-center justify-center h-64">
           <div class="animate-spin rounded-full h-10 w-10 border-t-2 border-emerald-600 border-r-2"></div>
        </div>

        <template v-else>
          <!-- PAGE HEADER -->
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
            <div>
              <h1 class="text-xl font-black text-slate-900 tracking-tight">የፓርትነር ዳሽቦርድ (Overview)</h1>
              <p class="text-xs text-slate-500 mt-1">እንኳን በደህና መጡ! የሜዳዎችዎን እንቅስቃሴና ገቢ እዚህ መከታተል ይችላሉ።</p>
            </div>
            <NuxtLink to="/venues/create" class="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition shadow-xs text-center">
              + አዲስ ሜዳ ጨምር
            </NuxtLink>
          </div>

          <!-- OVERVIEW STATS CARDS -->
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div v-for="(card, index) in statsCards" :key="index" class="bg-white border border-slate-200 rounded-2xl p-4 flex flex-col justify-between shadow-xs hover:border-slate-300 transition duration-200">
              <div class="flex items-center justify-between">
                <span class="text-xs font-semibold text-slate-500">{{ card.title }}</span>
                <div class="p-2 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100">
                  <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" :d="card.icon" />
                  </svg>
                </div>
              </div>
              <div class="mt-4">
                <div class="text-2xl font-black text-slate-900 tracking-tight">{{ card.value }}</div>
                <div class="text-[11px] font-bold mt-1" :class="card.isPositive ? 'text-emerald-600' : 'text-amber-600'">
                  {{ card.change }} <span class="text-slate-400 font-normal">ከባለፈው ወር</span>
                </div>
              </div>
            </div>
          </div>

          <!-- RECENT BOOKINGS TABLE -->
          <div class="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
            <h2 class="text-sm font-bold text-slate-900 mb-4">የቅርብ ጊዜ ቦታ ማስያዣዎች</h2>
            <div class="overflow-x-auto">
              <table class="w-full text-left border-collapse">
                <thead>
                  <tr class="border-b border-slate-200 text-[11px] text-slate-400 uppercase font-bold bg-slate-50/50">
                    <th class="py-3 px-3 rounded-l-lg">የቦታ ID</th>
                    <th class="py-3 px-3">ተጫዋች</th>
                    <th class="py-3 px-3">ሜዳ</th>
                    <th class="py-3 px-3">ቀንና ሰዓት</th>
                    <th class="py-3 px-3">ዋጋ</th>
                    <th class="py-3 px-3 text-right rounded-r-lg">ሁኔታ</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-100 text-xs">
                  <tr v-for="booking in recentBookings" :key="booking.id" class="hover:bg-slate-50 transition">
                    <td class="py-3.5 px-3 font-mono font-bold text-slate-700">{{ booking.id }}</td>
                    <td class="py-3.5 px-3 font-semibold text-slate-900">{{ booking.customer }}</td>
                    <td class="py-3.5 px-3 text-slate-600">{{ booking.venue }}</td>
                    <td class="py-3.5 px-3 text-slate-700">
                      <div>{{ booking.date }}</div>
                      <div class="text-[10px] text-slate-400">{{ booking.time }}</div>
                    </td>
                    <td class="py-3.5 px-3 font-bold text-emerald-600">{{ booking.amount }}</td>
                    <td class="py-3.5 px-3 text-right">
                      <span class="px-2.5 py-1 rounded-md text-[10px] font-bold border" :class="booking.statusColor">
                        {{ booking.status }}
                      </span>
                    </td>
                  </tr>
                  <tr v-if="recentBookings.length === 0">
                    <td colspan="6" class="py-10 text-center text-slate-400">ምንም አይነት የቅርብ ጊዜ ቦታ ማስያዣ የለም።</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </template>

      </main>
    </div>
  </div>
</template>