<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const currentLang = ref('አማ')
const isDark = ref(false)

// 1. Top Header Navigation Links
const topNavLinks = [
  { name: 'Home', path: '/' },
  { name: 'Games', path: '/games' },
  { name: 'Venues', path: '/venues' },
  { name: 'Events', path: '/events' },
  { name: 'Blogs', path: '/blogs' },
  { name: 'JustPlay', path: '/justplay' },
  { name: 'Contact', path: '/contact' }
]

// 2. Sidebar Navigation Links 
const partnerSidebarLinks = [
  { name: 'Dashboard', path: '/partner', icon: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z' },
  { name: 'Schedule', path: '/partner/schedule', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
  { name: 'My Venues', path: '/partner/venues', icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z' },
  { name: 'Payouts', path: '/partner/payouts', icon: 'M3 10h18M7 15h1m4 0h1m-7 4h12a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
  { name: 'Settings', path: '/partner/settings', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z' },
  { name: 'Support', path: '/partner/support', icon: 'M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z' }
]

// 3. Overview Cards Data
const stats = ref([
  {
    title: 'ጠቅላላ ገቢ (Earnings)',
    value: 'ብር 48,500',
    change: '+12.5%',
    isPositive: true,
    icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
  },
  {
    title: 'የእኔ ሜዳዎች (My Venues)',
    value: '4',
    change: '2 ንቁ ሜዳዎች',
    isPositive: true,
    icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z'
  },
  {
    title: 'የዚህ ወር ቡኪንግ (Bookings)',
    value: '128',
    change: '+8.2%',
    isPositive: true,
    icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
  },
  {
    title: 'ያልተከፈሉ ክፍያዎች (Pending)',
    value: 'ብር 6,200',
    change: 'በሂደት ላይ',
    isPositive: false,
    icon: 'M3 10h18M7 15h1m4 0h1m-7 4h12a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
  }
])

// 4. Recent Bookings List
const recentBookings = ref([
  {
    id: '#BK-8901',
    customer: 'አበበ ከበደ',
    venue: 'አዲስ አበበ ሚኒ ስታዲየም',
    date: '2026-09-02',
    time: '10:00 AM - 12:00 PM',
    amount: 'ብር 1,200',
    status: 'የተረጋገጠ',
    statusColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
  },
  {
    id: '#BK-8902',
    customer: 'ዮናስ ታደሰ',
    venue: 'ቦሌ ስፖርት ኮምፕሌክስ',
    date: '2026-09-03',
    time: '02:00 PM - 04:00 PM',
    amount: 'ብር 1,500',
    status: 'የተረጋገጠ',
    statusColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
  },
  {
    id: '#BK-8903',
    customer: 'ሳራ ሰለሞን',
    venue: 'አዲስ አበበ ሚኒ ስታዲየም',
    date: '2026-09-04',
    time: '08:00 AM - 10:00 AM',
    amount: 'ብር 1,200',
    status: 'የሚጠበቅ',
    statusColor: 'bg-amber-500/10 text-amber-400 border-amber-500/20'
  },
  {
    id: '#BK-8904',
    customer: 'ዳንኤል መኮንን',
    venue: 'ካዛንችስ ፉትሳል',
    date: '2026-09-05',
    time: '04:00 PM - 06:00 PM',
    amount: 'ብር 1,000',
    status: 'የተሰረዘ',
    statusColor: 'bg-rose-500/10 text-rose-400 border-rose-500/20'
  }
])

const toggleTheme = () => {
  isDark.value = !isDark.value
}

const toggleLanguage = () => {
  currentLang.value = currentLang.value === 'አማ' ? 'EN' : 'አማ'
}

const handleLogout = () => {
  router.push('/auth')
}
</script>

<template>
  <div class="min-h-screen w-full bg-[#070c14] text-white font-sans flex flex-col">
    
    <!-- TOP HEADER -->
    <header class="h-16 bg-[#0a111e] border-b border-[#1a2432] px-6 flex items-center justify-between shrink-0 sticky top-0 z-50">
      <NuxtLink to="/" class="flex items-center gap-1 text-xl font-black tracking-tight shrink-0">
        <span class="text-white">ETHIO</span>
        <span class="text-emerald-500">SPORT</span>
      </NuxtLink>

      <nav class="hidden lg:flex items-center gap-2">
        <NuxtLink
          v-for="link in topNavLinks"
          :key="link.path"
          :to="link.path"
          class="text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors"
          :class="[
            route.path === link.path
              ? 'bg-emerald-500/10 text-emerald-400 font-bold border border-emerald-500/20'
              : 'text-slate-300 hover:text-emerald-400'
          ]"
        >
          {{ link.name }}
        </NuxtLink>
      </nav>

      <div class="flex items-center gap-3 shrink-0">
        <button 
          @click="toggleLanguage"
          class="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#1a2432] text-xs font-bold text-slate-300 hover:bg-[#131f30] transition cursor-pointer"
        >
          <svg class="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3 5h12M9 3v2m1 4h6m-3 0v11m0 0l-3-3m3 3l3-3M3 13h5m0 0l-2-2m2 2l-2 2" />
          </svg>
          <span>{{ currentLang }}</span>
        </button>

        <button 
          @click="toggleTheme"
          class="p-2 rounded-xl border border-[#1a2432] text-slate-300 hover:bg-[#131f30] transition cursor-pointer"
        >
          <svg v-if="!isDark" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
          <svg v-else class="w-4 h-4 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        </button>

        <div class="h-5 w-[1px] bg-[#1a2432] mx-1"></div>

        <NuxtLink 
          to="/partner"
          class="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-bold"
        >
          <svg class="w-4 h-4 stroke-current" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5m0 0h4m-4 0V12a1 1 0 011-1h2a1 1 0 011 1v9" />
          </svg>
          <span>Partner</span>
        </NuxtLink>

        <button 
          @click="handleLogout"
          class="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 text-xs font-bold transition cursor-pointer"
        >
          <svg class="w-4 h-4 stroke-current" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          <span>Logout</span>
        </button>
      </div>
    </header>

    <!-- BODY WRAPPER -->
    <div class="flex-1 flex w-full relative">
      
      <!-- SIDEBAR -->
      <aside class="w-64 min-w-[256px] min-h-[calc(100vh-64px)] bg-[#0d4026] border-r border-[#135936] p-4 flex flex-col justify-between shrink-0">
        <div class="space-y-4">
          <div class="px-2 py-1 text-[11px] font-bold tracking-wider text-emerald-300 uppercase">
            የፓርትነር መቆጣጠሪያ
          </div>

          <nav class="space-y-1">
            <NuxtLink
              v-for="item in partnerSidebarLinks"
              :key="item.path"
              :to="item.path"
              class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold transition-all"
              :class="[
                route.path === item.path
                  ? 'bg-[#155a36] text-white font-bold border border-[#1f7347]'
                  : 'text-emerald-100/70 hover:bg-[#10482c] hover:text-white'
              ]"
            >
              <svg class="w-4 h-4 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" :d="item.icon" />
              </svg>
              <span class="truncate">{{ item.name }}</span>
            </NuxtLink>
          </nav>
        </div>
      </aside>

      <!-- MAIN OVERVIEW CONTENT -->
      <div class="flex-1 flex flex-col min-w-0 bg-[#070c14]">
        <main class="flex-1 p-6 overflow-x-hidden space-y-6">
          
          <!-- PAGE HEADER -->
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1a2432] pb-5">
            <div>
              <h1 class="text-xl font-extrabold text-white tracking-tight">የፓርትነር ዳሽቦርድ (Overview)</h1>
              <p class="text-xs text-slate-400 mt-1">እንኳን በደህና መጡ! የሜዳዎችዎን እንቅስቃሴና ገቢ እዚህ መከታተል ይችላሉ።</p>
            </div>
            
            <NuxtLink 
              to="/venues/create" 
              class="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition shadow-lg shadow-emerald-900/20 active:scale-95 w-fit"
            >
              <svg class="w-4 h-4 stroke-current" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              <span>አዲስ ሜዳ ጨምር</span>
            </NuxtLink>
          </div>

          <!-- OVERVIEW STATS CARDS -->
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div 
              v-for="(card, index) in stats" 
              :key="index"
              class="bg-[#0d1522] border border-[#1a2432] rounded-2xl p-4 flex flex-col justify-between hover:border-emerald-500/30 transition duration-200"
            >
              <div class="flex items-center justify-between">
                <span class="text-xs font-semibold text-slate-400">{{ card.title }}</span>
                <div class="p-2 rounded-xl bg-[#131f30] text-emerald-400 border border-[#1e2d42]">
                  <svg class="w-4 h-4 stroke-current" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" :d="card.icon" />
                  </svg>
                </div>
              </div>

              <div class="mt-4">
                <div class="text-2xl font-black text-white tracking-tight">{{ card.value }}</div>
                <div class="flex items-center gap-1.5 mt-1">
                  <span 
                    class="text-[11px] font-bold"
                    :class="card.isPositive ? 'text-emerald-400' : 'text-amber-400'"
                  >
                    {{ card.change }}
                  </span>
                  <span class="text-[10px] text-slate-500">ከባለፈው ወር</span>
                </div>
              </div>
            </div>
          </div>

          <!-- RECENT BOOKINGS & QUICK ACTIONS -->
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            <div class="lg:col-span-2 bg-[#0d1522] border border-[#1a2432] rounded-2xl p-5 space-y-4">
              <div class="flex items-center justify-between">
                <div>
                  <h2 class="text-sm font-bold text-white">የቅርብ ጊዜ ቦታ ማስያዣዎች</h2>
                  <p class="text-[11px] text-slate-400">በቅርቡ በደንበኞች የተያዙ የሜዳ ሰዓቶች</p>
                </div>
                <NuxtLink to="/partner/schedule" class="text-xs font-bold text-emerald-400 hover:underline">
                  ሁሉንም እይ →
                </NuxtLink>
              </div>

              <div class="overflow-x-auto">
                <table class="w-full text-left border-collapse">
                  <thead>
                    <tr class="border-b border-[#1a2432] text-[11px] text-slate-400 uppercase font-bold">
                      <th class="py-3 px-3">የቦታ ID</th>
                      <th class="py-3 px-3">ተጫዋች</th>
                      <th class="py-3 px-3">ሜዳ</th>
                      <th class="py-3 px-3">ቀንና ሰዓት</th>
                      <th class="py-3 px-3">ዋጋ</th>
                      <th class="py-3 px-3 text-right">ሁኔታ</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-[#16202e] text-xs">
                    <tr 
                      v-for="booking in recentBookings" 
                      :key="booking.id"
                      class="hover:bg-[#111a28] transition"
                    >
                      <td class="py-3 px-3 font-mono font-bold text-slate-300">{{ booking.id }}</td>
                      <td class="py-3 px-3 font-semibold text-white">{{ booking.customer }}</td>
                      <td class="py-3 px-3 text-slate-400 truncate max-w-[120px]">{{ booking.venue }}</td>
                      <td class="py-3 px-3 text-slate-300">
                        <div class="font-medium">{{ booking.date }}</div>
                        <div class="text-[10px] text-slate-500">{{ booking.time }}</div>
                      </td>
                      <td class="py-3 px-3 font-bold text-emerald-400">{{ booking.amount }}</td>
                      <td class="py-3 px-3 text-right">
                        <span 
                          class="px-2 py-1 rounded-md text-[10px] font-bold border"
                          :class="booking.statusColor"
                        >
                          {{ booking.status }}
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <!-- QUICK ACTIONS -->
            <div class="space-y-6">
              <div class="bg-[#0d1522] border border-[#1a2432] rounded-2xl p-5 space-y-3">
                <h2 class="text-sm font-bold text-white">አቋራጮች (Quick Actions)</h2>
                
                <div class="grid grid-cols-1 gap-2 pt-1">
                  <NuxtLink 
                    to="/partner/schedule" 
                    class="flex items-center gap-3 p-3 rounded-xl bg-[#131f30] hover:bg-[#17263b] text-slate-200 text-xs font-semibold border border-[#1e2d42] transition"
                  >
                    <div class="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
                      <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <span>የቀን መርሃግብር አስተካክል</span>
                  </NuxtLink>

                  <NuxtLink 
                    to="/partner/payouts" 
                    class="flex items-center gap-3 p-3 rounded-xl bg-[#131f30] hover:bg-[#17263b] text-slate-200 text-xs font-semibold border border-[#1e2d42] transition"
                  >
                    <div class="p-2 rounded-lg bg-blue-500/10 text-blue-400">
                      <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <span>ክፍያ ጠይቅ (Withdraw)</span>
                  </NuxtLink>

                  <NuxtLink 
                    to="/partner/settings" 
                    class="flex items-center gap-3 p-3 rounded-xl bg-[#131f30] hover:bg-[#17263b] text-slate-200 text-xs font-semibold border border-[#1e2d42] transition"
                  >
                    <div class="p-2 rounded-lg bg-amber-500/10 text-amber-400">
                      <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <span>የፕሮፋይል ቅንብሮች</span>
                  </NuxtLink>
                </div>
              </div>

              <!-- SUPPORT -->
              <div class="bg-gradient-to-br from-[#0d4026] to-[#0a2c1a] border border-[#135936] rounded-2xl p-4 text-white space-y-2">
                <div class="text-xs font-bold text-emerald-300">እርዳታ ይፈልጋሉ?</div>
                <p class="text-[11px] text-emerald-100/80 leading-relaxed">
                  በሜዳ ምዝገባ ወይም በክፍያ ሂደት ላይ ማንኛውም ችግር ካጋጠመዎት የቴክኒክ ቡድናችንን ያግኙ።
                </p>
                <NuxtLink 
                  to="/partner/support" 
                  class="inline-block mt-2 text-xs font-bold text-white underline hover:text-emerald-200"
                >
                  የድጋፍ መስመር ያግኙ →
                </NuxtLink>
              </div>

            </div>

          </div>

        </main>

        <!-- FOOTER -->
        <footer class="border-t border-[#1a2432] bg-[#070c14] py-4 px-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500 shrink-0">
          <p>© 2026 EthioSport Portal. መብቱ በህግ የተጠበቀ ነው።</p>
          <div class="flex gap-4">
            <a href="#" class="hover:text-slate-300 transition">የግላዊነት ፖሊሲ</a>
            <a href="#" class="hover:text-slate-300 transition">የአገልግሎት ውሎች</a>
          </div>
        </footer>

      </div>

    </div>

  </div>
</template>