<template>
  <div class="h-screen w-full bg-[#f8fafc] dark:bg-[#080c14] text-slate-800 dark:text-slate-100 flex flex-col font-sans overflow-hidden antialiased">
    
    <!-- 1. DASHBOARD HEADER (NAVBAR) -->
    <header class="h-16 shrink-0 bg-white/70 dark:bg-[#0d1527]/80 backdrop-blur-xl border-b border-slate-200/80 dark:border-slate-800/60 z-50 px-4 lg:px-8 flex items-center justify-between shadow-xs">
      
      <!-- Logo & Welcome Subtitle Under COMPOLOJO -->
      <div class="flex items-center gap-4">
        <button 
          @click="isMobileSidebarOpen = !isMobileSidebarOpen"
          class="lg:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition active:scale-95 cursor-pointer"
        >
          <Icon name="lucide:menu" class="w-5 h-5" />
        </button>

        <div class="flex flex-col justify-center">
          <NuxtLink to="/admin" class="flex items-center gap-1.5 text-xl font-black uppercase tracking-widest group leading-none">
            <span class="text-slate-900 dark:text-white transition group-hover:text-emerald-400">COMPO</span>
            <span class="text-emerald-500 drop-shadow-[0_0_12px_rgba(16,185,129,0.4)]">LOJO</span>
          </NuxtLink>

          <!-- WELCOME TO ADMIN DASHBOARD (UNDER LOGO) -->
          <div class="flex items-center gap-1.5 mt-1">
            <span class="inline-block w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse"></span>
            <span class="text-[10px] font-black tracking-wider uppercase bg-gradient-to-r from-purple-400 via-indigo-400 to-purple-300 bg-clip-text text-transparent">
              Welcome to Admin Dashboard
            </span>
          </div>
        </div>

        <span class="hidden xl:inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-black px-3 py-1 rounded-full border border-emerald-500/20 uppercase tracking-widest ml-2">
          <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          Admin Portal
        </span>
      </div>

      <!-- Right Header Actions -->
      <div class="flex items-center gap-3 md:gap-5">
        
        <!-- Public Website Link -->
        <NuxtLink 
          to="/" 
          target="_blank" 
          class="hidden sm:flex items-center gap-2 text-xs font-bold text-slate-500 dark:text-slate-400 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors py-2 px-3.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/40"
        >
          <span>View Site</span>
          <Icon name="lucide:external-link" class="w-3.5 h-3.5" />
        </NuxtLink>

        <!-- Add Venue Button -->
        <NuxtLink 
          :to="authStore.user ? '/venues/create' : '/auth?redirect=/venues/create'" 
          class="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-black transition-all duration-200 shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_25px_rgba(16,185,129,0.5)] active:scale-95"
        >
          <Icon name="lucide:plus" class="w-4 h-4 stroke-[3]" />
          <span>Add Venue</span>
        </NuxtLink>

        <!-- Profile Avatar Box -->
        <div class="flex items-center gap-3 pl-3 border-l border-slate-200 dark:border-slate-800">
          <div class="text-right hidden md:block">
            <div class="text-xs font-extrabold text-slate-900 dark:text-slate-100 leading-tight">
              {{ authStore.user?.name || 'Super Admin' }}
            </div>
            <div class="text-[10px] font-bold text-emerald-500 uppercase tracking-wider mt-0.5">
              System Admin
            </div>
          </div>
          
          <div class="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-slate-950 flex items-center justify-center font-black text-sm shadow-md shadow-emerald-500/20">
            {{ (authStore.user?.name || 'A').charAt(0).toUpperCase() }}
          </div>
        </div>
      </div>
    </header>

    <!-- 2. BODY CONTAINER -->
    <div class="flex-1 flex overflow-hidden relative">
      
      <!-- MOBILE BACKDROP -->
      <Transition
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition duration-200 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div 
          v-if="isMobileSidebarOpen" 
          @click="isMobileSidebarOpen = false"
          class="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-40 lg:hidden"
        ></div>
      </Transition>

      <!-- ADMIN SIDEBAR WITH DEBZEZ YALE BLUE GLOW -->
      <aside 
        class="fixed lg:static left-0 top-16 bottom-0 w-64 bg-slate-900/90 dark:bg-[#090e1a]/95 backdrop-blur-2xl border-r border-blue-900/30 dark:border-blue-500/10 z-40 flex flex-col justify-between transition-transform duration-300 ease-in-out lg:translate-x-0 h-[calc(100vh-64px)] shrink-0 shadow-[10px_0_30px_-10px_rgba(30,58,138,0.15)] relative overflow-hidden"
        :class="isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'"
      >
        <!-- DEBZEZ YALE BLUE BACKGROUND GLOWS -->
        <div class="absolute -top-12 -left-12 w-40 h-40 bg-blue-600/20 rounded-full blur-3xl pointer-events-none"></div>
        <div class="absolute top-1/2 -right-12 w-36 h-36 bg-purple-600/15 rounded-full blur-3xl pointer-events-none"></div>
        <div class="absolute -bottom-10 -left-10 w-44 h-44 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div class="p-4 overflow-y-auto flex-1 custom-scrollbar relative z-10 space-y-4">
          <div>
            <div class="text-[10px] font-black text-blue-300/50 uppercase tracking-widest mb-3 px-2 pt-1">
              Main Menu
            </div>
            
            <nav class="space-y-1.5">
              <NuxtLink 
                v-for="item in adminMenuItems" 
                :key="item.path" 
                :to="item.path"
                @click="isMobileSidebarOpen = false"
                class="group relative flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all duration-300"
                :class="isLinkActive(item.path) 
                  ? 'bg-gradient-to-r from-blue-600/25 via-indigo-600/15 to-transparent text-emerald-400 font-extrabold border border-blue-500/30 shadow-md shadow-blue-950/40' 
                  : 'text-slate-400 hover:bg-blue-900/20 hover:text-slate-100 hover:border hover:border-blue-500/10'"
              >
                <!-- Active Indicator Bar -->
                <span 
                  v-if="isLinkActive(item.path)" 
                  class="absolute left-0 top-2 bottom-2 w-1 bg-emerald-400 rounded-r-full shadow-[0_0_10px_rgba(52,211,153,0.8)]"
                ></span>

                <Icon 
                  :name="item.icon" 
                  class="w-4 h-4 shrink-0 transition-transform duration-300 group-hover:scale-110" 
                  :class="isLinkActive(item.path) ? 'text-emerald-400' : 'text-slate-400 group-hover:text-blue-300'"
                />
                <span class="truncate">{{ item.label }}</span>
              </NuxtLink>
            </nav>
          </div>
        </div>

        <!-- SIDEBAR FOOTER -->
        <div class="p-4 border-t border-blue-900/30 bg-slate-950/40 backdrop-blur-md relative z-10">
          <button 
            @click="handleLogout"
            class="w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-bold text-rose-400 hover:bg-rose-500/10 hover:border hover:border-rose-500/20 transition-all duration-200 active:scale-95 cursor-pointer"
          >
            <div class="flex items-center gap-3">
              <Icon name="lucide:log-out" class="w-4 h-4" />
              <span>Logout</span>
            </div>
            <Icon name="lucide:chevron-right" class="w-3.5 h-3.5 opacity-50" />
          </button>
        </div>
      </aside>

      <!-- 3. MAIN CONTENT -->
      <main class="flex-1 min-w-0 h-full overflow-y-auto bg-slate-100/60 dark:bg-[#080c14] custom-scrollbar p-4 lg:p-8">
        <div class="max-w-7xl mx-auto">
          <slot />
        </div>
      </main>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

const isMobileSidebarOpen = ref(false)

const isLinkActive = (path) => {
  if (path === '/admin') return route.path === '/admin'
  return route.path.startsWith(path)
}

const adminMenuItems = [
  { path: '/admin', label: 'Overview', icon: 'lucide:layout-dashboard' },
  { path: '/admin/my-venues', label: 'My Venues', icon: 'lucide:map-pin' },
  { path: '/admin/approvals', label: 'Approvals', icon: 'lucide:check-circle' },
  { path: '/admin/bookings', label: 'Bookings', icon: 'lucide:wallet' },
  { path: '/admin/partners', label: 'Partners', icon: 'lucide:users' },
  { path: '/admin/users', label: 'Users', icon: 'lucide:user-check' },
  { path: '/admin/payouts', label: 'Payouts & Wallet', icon: 'lucide:wallet-cards' },
  { path: '/admin/settings', label: 'Settings', icon: 'lucide:settings' },
]

const handleLogout = () => {
  if (authStore.logout) {
    authStore.logout()
  }
  router.push('/')
}
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 5px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(100, 116, 139, 0.2);
  border-radius: 20px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: rgba(100, 116, 139, 0.4);
}
</style>