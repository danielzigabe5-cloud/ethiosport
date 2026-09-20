<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

// Mobile sidebar toggle state
const isMobileSidebarOpen = ref(false)

// Partner Sidebar Navigation Links
const partnerSidebarLinks = [
  { name: 'Dashboard', path: '/partner', icon: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z' },
  { name: 'Schedule', path: '/partner/schedule', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
  { name: 'My Venues', path: '/partner/venues', icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z' },
  { name: 'Payouts', path: '/partner/payouts', icon: 'M3 10h18M7 15h1m4 0h1m-7 4h12a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
  { name: 'Settings', path: '/partner/settings', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z' },
  { name: 'Support', path: '/partner/support', icon: 'M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z' }
]

const handleLogout = () => {
  router.push('/auth')
}
</script>

<template>
  <div class="min-h-screen w-full bg-[#060d13] text-white font-sans flex flex-col">
    
    <!-- 1. TOP NAVBAR (Clean Header for Partner Panel) -->
    <header class="h-16 bg-[#0a141d] border-b border-[#162330] px-4 lg:px-6 flex items-center justify-between shrink-0 sticky top-0 z-50">
      
      <!-- LOGO & PARTNER BADGE -->
      <div class="flex items-center gap-3">
        <!-- Mobile Sidebar Toggle Button -->
        <button 
          @click="isMobileSidebarOpen = !isMobileSidebarOpen"
          class="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-[#12202c]"
        >
          <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <NuxtLink to="/partner" class="flex items-center gap-1 text-xl font-black tracking-wider uppercase">
          <span class="text-white">COMPO</span>
          <span class="text-emerald-500">LOJO</span>
        </NuxtLink>

        <span class="hidden sm:inline-block bg-emerald-950/80 text-emerald-400 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border border-emerald-500/30 uppercase tracking-wide">
          Partner Portal
        </span>
      </div>

      <!-- RIGHT SIDE ACTIONS -->
      <div class="flex items-center gap-3">
        <!-- Optional View Public Site Button -->
        <NuxtLink 
          to="/" 
          target="_blank"
          class="hidden sm:inline-flex items-center gap-1 text-xs text-slate-400 hover:text-emerald-400 transition mr-2"
        >
          <span>View Website</span>
          <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </NuxtLink>

        <NuxtLink 
          to="/venues/create" 
          class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-lime-400 hover:bg-lime-300 text-black text-xs font-bold transition shadow"
        >
          <svg class="w-4 h-4 stroke-current" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          <span>Add Venue</span>
        </NuxtLink>

        <!-- USER PROFILE -->
        <div class="flex items-center gap-2 pl-2 border-l border-[#1a2936]">
          <div class="text-right hidden sm:block">
            <div class="text-xs font-bold leading-none text-white">Partner Name</div>
            <div class="text-[9px] font-extrabold leading-none text-emerald-400 tracking-wider uppercase mt-0.5">PARTNER</div>
          </div>
          <div class="w-7 h-7 rounded-full bg-[#12202c] border border-[#1e3042] flex items-center justify-center text-slate-300 font-bold text-xs">
            P
          </div>
        </div>

        <!-- LOGOUT -->
        <button 
          @click="handleLogout"
          class="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 transition"
          title="Logout"
        >
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
        </button>
      </div>
    </header>

    <!-- 2. MAIN BODY (Sidebar + Content Area Container) -->
    <div class="flex-1 flex w-full relative">
      
      <!-- MOBILE BACKDROP -->
      <div 
        v-if="isMobileSidebarOpen"
        @click="isMobileSidebarOpen = false"
        class="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
      ></div>

      <!-- SIDEBAR -->
      <aside 
        class="fixed lg:static top-16 bottom-0 left-0 z-40 w-60 min-w-[240px] bg-[#092215] border-r border-[#103a24] p-4 flex flex-col justify-between shrink-0 transition-transform duration-300"
        :class="isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'"
      >
        <div class="space-y-4">
          <div class="px-2 text-[11px] font-bold tracking-wider text-emerald-400 italic uppercase">
            የፓርትነር መቆጣጠሪያ
          </div>

          <nav class="space-y-1">
            <NuxtLink
              v-for="item in partnerSidebarLinks"
              :key="item.path"
              :to="item.path"
              @click="isMobileSidebarOpen = false"
              class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all"
              :class="[
                route.path === item.path
                  ? 'bg-emerald-900/60 text-white font-bold border border-emerald-600/40'
                  : 'text-emerald-100/70 hover:bg-emerald-950/40 hover:text-white'
              ]"
            >
              <svg class="w-4 h-4 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" :d="item.icon" />
              </svg>
              <span>{{ item.name }}</span>
            </NuxtLink>
          </nav>
        </div>
      </aside>

      <!-- RIGHT SIDE WRAPPER (Main Content + Minimal Dashboard Footer) -->
      <div class="flex-1 flex flex-col min-w-0">
        
        <!-- DYNAMIC PAGE CONTENT CONTAINER -->
        <main class="flex-1 p-4 md:p-6 bg-[#060d13]">
          <slot />
        </main>

        <!-- 3. MINIMAL DASHBOARD FOOTER -->
        <footer class="bg-[#0a141d] text-slate-500 py-4 px-6 border-t border-[#162330] text-xs flex flex-col sm:flex-row justify-between items-center gap-2 shrink-0">
          <div>
            © {{ new Date().getFullYear() }} <span class="text-slate-300 font-semibold">EthioSport</span> Partner Dashboard.
          </div>
          <div class="flex gap-4 text-[11px]">
            <NuxtLink to="/partner/support" class="hover:text-emerald-400 transition">Partner Support</NuxtLink>
            <NuxtLink to="/terms" class="hover:text-emerald-400 transition">Terms of Service</NuxtLink>
          </div>
        </footer>

      </div>

    </div>

  </div>
</template>