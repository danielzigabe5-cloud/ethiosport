<template>
  <div class="h-screen w-full bg-[#f8fafc] dark:bg-[#080c14] text-slate-800 dark:text-slate-100 flex flex-col font-sans overflow-hidden antialiased">
    
    <!-- 1. DASHBOARD HEADER (NAVBAR) -->
    <header class="h-16 shrink-0 bg-white/80 dark:bg-[#0d1527]/90 backdrop-blur-xl border-b border-slate-200/80 dark:border-slate-800/60 z-50 px-4 lg:px-8 flex items-center justify-between shadow-xs">
      
      <!-- Logo & Subtitle -->
      <div class="flex items-center gap-4">
        <!-- TOGGLE SIDEBAR BUTTON (Desktop & Mobile) -->
        <button 
          @click="toggleSidebar"
          class="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition active:scale-95 cursor-pointer"
          title="Toggle Navigation Menu"
        >
          <Icon name="lucide:menu" class="w-5 h-5" />
        </button>

        <div class="flex flex-col justify-center">
          <NuxtLink to="/admin" class="flex items-center gap-1.5 text-xl font-black uppercase tracking-widest group leading-none">
            <span class="text-slate-900 dark:text-white transition group-hover:text-emerald-400">COMPO</span>
            <span class="text-emerald-500 drop-shadow-[0_0_12px_rgba(16,185,129,0.4)]">LOJO</span>
          </NuxtLink>

          <div class="flex items-center gap-1.5 mt-1">
            <span class="inline-block w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
            <!-- TEXT WITH DEBZEZ BLUE & WEGNETEJ BLUE COLOR -->
            <span class="text-[10px] font-black tracking-wider uppercase text-blue-900 dark:text-blue-300">
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
        
        <NuxtLink 
          to="/" 
          target="_blank" 
          class="hidden sm:flex items-center gap-2 text-xs font-bold text-slate-500 dark:text-slate-400 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors py-2 px-3.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/40"
        >
          <span>View Site</span>
          <Icon name="lucide:external-link" class="w-3.5 h-3.5" />
        </NuxtLink>

        <NuxtLink 
          :to="authStore.user ? '/venues/create' : '/auth?redirect=/venues/create'" 
          class="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-black transition-all duration-200 shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_25px_rgba(16,185,129,0.5)] active:scale-95"
        >
          <Icon name="lucide:plus" class="w-4 h-4 stroke-[3]" />
          <span>Add Venue</span>
        </NuxtLink>

        <!-- PROFILE TRIGGER (IMAGE ONLY) -->
        <div class="relative" ref="dropdownRef">
          <button 
            @click="toggleDropdown" 
            type="button"
            class="flex items-center pl-2 border-l border-slate-200 dark:border-slate-800/80 hover:opacity-90 transition-all focus:outline-none cursor-pointer group"
            title="Account Settings"
          >
            <div class="relative shrink-0">
              <img 
                v-if="userAvatar"
                :src="userAvatar" 
                alt="Profile Avatar" 
                class="w-10 h-10 rounded-xl object-cover border-2 border-emerald-500/60 shadow-md shadow-emerald-500/20 group-hover:border-emerald-400 transition-all"
              />
              <div 
                v-else 
                class="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 via-teal-500 to-cyan-500 text-slate-950 flex items-center justify-center font-black text-sm shadow-md shadow-emerald-500/20 border-2 border-emerald-500/60 group-hover:border-emerald-400 transition-all"
              >
                <Icon name="lucide:user" class="w-5 h-5 text-slate-950" />
              </div>
              <span class="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 border-2 border-white dark:border-[#0d1527] rounded-full shadow-xs"></span>
            </div>
          </button>

          <!-- Profile Dropdown Card -->
          <Transition
            enter-active-class="transition duration-150 ease-out"
            enter-from-class="transform scale-95 opacity-0 -translate-y-2"
            enter-to-class="transform scale-100 opacity-100 translate-y-0"
            leave-active-class="transition duration-100 ease-in"
            leave-from-class="transform scale-100 opacity-100 translate-y-0"
            leave-to-class="transform scale-95 opacity-0 -translate-y-2"
          >
            <div 
              v-if="isProfileOpen" 
              class="absolute right-0 mt-3 w-56 bg-white dark:bg-[#0d1527] rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800/80 p-2 z-50 divide-y divide-slate-100 dark:divide-slate-800/80"
            >
              <!-- User Info Section -->
              <div class="px-3 py-2.5">
                <p class="text-[10px] font-black text-slate-400 uppercase tracking-wider">Signed in as</p>
                <p class="text-xs font-bold text-slate-800 dark:text-slate-200 truncate mt-0.5">
                  {{ authStore.user?.email || 'admin@compolojo.com' }}
                </p>
              </div>

              <!-- Menu Options: Profile Settings -->
              <div class="py-1">
                <NuxtLink 
                  to="/admin/profile" 
                  @click="isProfileOpen = false"
                  class="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors"
                >
                  <Icon name="lucide:user-cog" class="w-4 h-4 text-emerald-400" />
                  <span>Profile Settings</span>
                </NuxtLink>
              </div>

              <!-- Logout Action -->
              <div class="pt-1">
                <button 
                  type="button"
                  @click="handleLogout" 
                  :disabled="isLoggingOut"
                  class="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-bold text-rose-500 hover:bg-rose-500/10 dark:hover:bg-rose-500/20 rounded-xl transition-colors disabled:opacity-50 cursor-pointer text-left"
                >
                  <span v-if="isLoggingOut" class="w-4 h-4 border-2 border-rose-500 border-t-transparent rounded-full animate-spin"></span>
                  <template v-else>
                    <Icon name="lucide:log-out" class="w-4 h-4" />
                    <span>Logout</span>
                  </template>
                </button>
              </div>
            </div>
          </Transition>
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

      <!-- ADMIN SIDEBAR (DEBZEZ BLUE COLOR APPLIED) -->
      <aside 
        class="fixed lg:static left-0 top-16 bottom-0 bg-[#0B1528] dark:bg-[#0f172a] backdrop-blur-2xl border-r border-blue-900/40 z-40 flex flex-col justify-between transition-all duration-300 ease-in-out h-[calc(100vh-64px)] shrink-0 shadow-[10px_0_30px_-10px_rgba(15,23,42,0.6)] relative overflow-hidden"
        :class="[
          isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
          isSidebarCollapsed ? 'lg:w-0 lg:p-0 lg:overflow-hidden lg:border-none' : 'w-64'
        ]"
      >
        <div class="p-4 overflow-y-auto flex-1 custom-scrollbar relative z-10 space-y-4">
          <div>
            <div class="text-[10px] font-black text-blue-300/60 uppercase tracking-widest mb-3 px-2 pt-1">
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
                  ? 'bg-gradient-to-r from-blue-600/30 via-indigo-600/20 to-transparent text-emerald-400 font-extrabold border border-blue-500/30 shadow-md shadow-blue-950/60' 
                  : 'text-slate-300 hover:bg-blue-900/30 hover:text-white hover:border hover:border-blue-500/20'"
              >
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

        <!-- LOGOUT BUTTON AT SIDEBAR BOTTOM -->
        <div class="p-4 border-t border-blue-900/40 bg-[#070d1a]/80 backdrop-blur-md relative z-10">
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

      <!-- 3. MAIN CONTENT AREA -->
      <main class="flex-1 min-w-0 h-full overflow-y-auto bg-slate-100/60 dark:bg-[#080c14] custom-scrollbar p-4 lg:p-8">
        <div class="max-w-7xl mx-auto">
          <slot />
        </div>
      </main>

    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

const isMobileSidebarOpen = ref(false)
const isSidebarCollapsed = ref(false)
const isProfileOpen = ref(false)
const dropdownRef = ref(null)

const isLoggingOut = ref(false)

const userAvatar = computed(() => authStore.user?.avatar || '')

const toggleSidebar = () => {
  // Mobile check
  if (window.innerWidth < 1024) {
    isMobileSidebarOpen.value = !isMobileSidebarOpen.value
  } else {
    isSidebarCollapsed.value = !isSidebarCollapsed.value
  }
}

const toggleDropdown = () => {
  isProfileOpen.value = !isProfileOpen.value
}

const isLinkActive = (path) => {
  if (path === '/admin') return route.path === '/admin'
  return route.path.startsWith(path)
}

const handleClickOutside = (event) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
    isProfileOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})

const handleLogout = async () => {
  isLoggingOut.value = true
  try {
    if (authStore.logout) {
      await authStore.logout()
    } else {
      useCookie('auth_token').value = null
    }
    isProfileOpen.value = false
    router.push('/')
  } catch (error) {
    console.error('Logout failed:', error)
  } finally {
    isLoggingOut.value = false
  }
}

// Menu Navigasi Admin Sidebar
const adminMenuItems = [
  { path: '/admin', label: 'Overview', icon: 'lucide:layout-dashboard' },
  { path: '/admin/my-venues', label: 'My Venues', icon: 'lucide:map-pin' },
  { path: '/admin/approvals', label: 'Approvals', icon: 'lucide:check-circle' },
  { path: '/admin/bookings', label: 'Bookings', icon: 'lucide:wallet' },
  { path: '/admin/partners', label: 'Partners', icon: 'lucide:users' },
  { path: '/admin/users', label: 'Users', icon: 'lucide:user-check' },
  { path: '/admin/payouts', label: 'Payouts & Wallet', icon: 'lucide:wallet-cards' },
  { path: '/admin/profile', label: 'Profile Settings', icon: 'lucide:user-cog' },
  { path: '/admin/settings', label: 'Settings', icon: 'lucide:settings' },
]
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