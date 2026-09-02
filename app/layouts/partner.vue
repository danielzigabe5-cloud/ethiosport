<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'


const route = useRoute()
const router = useRouter()

const currentLang = ref('አማ')
const isDark = ref(false)

// 1. Top Header Navigation Links (ምስሉ ላይ ያሉት)
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
  { name: 'My Venues)', path: '/partner/venues', icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z' },
  { name: 'payouts', path: '/partner/payouts', icon: 'M3 10h18M7 15h1m4 0h1m-7 4h12a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
  { name: 'Settings', path: '/partner/settings', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z' },
  { name: 'Support', path: '/partner/support', icon: 'M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z' }
]



const toggleTheme = () => {
  isDark.value = !isDark.value
}

const handleLogout = () => {
  router.push('/auth')
}
</script>

<template>
  <div class="min-h-screen w-full bg-[#070c14] text-white font-sans flex flex-col">
    
    <!-- 1. MAIN TOP HEADER 
    <header class="h-16 bg-white border-b border-slate-100 px-6 flex items-center justify-between shrink-0 sticky top-0 z-50">
      
      <!-- Logo -->
      <NuxtLink to="/" class="flex items-center gap-1 text-xl font-black tracking-tight shrink-0">
        <span class="text-slate-900">ETHIO</span>
        <span class="text-emerald-600">SPORT</span>
      </NuxtLink>

      <!-- Main Navigation Links 
      <nav class="hidden lg:flex items-center gap-2">
        <NuxtLink
          v-for="link in topNavLinks"
          :key="link.path"
          :to="link.path"
          class="text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors"
          :class="[
            route.path === link.path
              ? 'bg-emerald-50 text-emerald-600 font-bold'
              : 'text-slate-700 hover:text-emerald-600'
          ]"
        >
          {{ link.name }}
        </NuxtLink>
      </nav>

      <!-- Right Action Controls -->
      <div class="flex items-center gap-3 shrink-0">
        
        <!-- Language Switcher -->
        <button 
          @click="toggleLanguage"
          class="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 transition cursor-pointer"
        >
          <svg class="w-4 h-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3 5h12M9 3v2m1 4h6m-3 0v11m0 0l-3-3m3 3l3-3M3 13h5m0 0l-2-2m2 2l-2 2" />
          </svg>
          <span>{{ currentLang }}</span>
        </button>

        <!-- Dark/Light Theme Toggle -->
        <button 
          @click="toggleTheme"
          class="p-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition cursor-pointer"
        >
          <svg v-if="!isDark" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
          <svg v-else class="w-4 h-4 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        </button>

        <div class="h-5 w-[1px] bg-slate-200 mx-1"></div>

        <!-- Partner Badge / Button -->
        <NuxtLink 
          to="/partner"
          class="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 text-xs font-bold"
        >
          <svg class="w-4 h-4 stroke-current" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5m0 0h4m-4 0V12a1 1 0 011-1h2a1 1 0 011 1v9" />
          </svg>
          <span>Partner</span>
        </NuxtLink>

        <!-- Logout Button -->
        <button 
          @click="handleLogout"
          class="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-100 text-xs font-bold transition cursor-pointer"
        >
          <svg class="w-4 h-4 stroke-current" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          <span>ውጣ</span>
        </button>

      </div>

    

    <!-- 2. BODY WRAPPER (SIDEBAR + MAIN CONTENT) -->
    <div class="flex-1 flex w-full relative">
      
      <!-- PARTNER SIDEBAR (የፓርትነር ብቻ የሆኑ ሊንኮች) -->
      <aside class="w-64 min-w-[256px] min-h-[calc(100vh-64px)] bg-[#0d4026] border-r border-[#135936] p-4 flex flex-col justify-between shrink-0">
        
        <div class="space-y-4">
          <div class="px-2 py-1 text-[11px] font-bold tracking-wider text-emerald-300 uppercase">
            የፓርትነር መቆጣጠሪያ
          </div>

          <!-- Partner Unique Links -->
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

      <!-- MAIN PAGE CONTENT -->
      <div class="flex-1 flex flex-col min-w-0 bg-[#070c14]">
        
        <main class="flex-1 p-6 overflow-x-hidden">
          <slot />
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