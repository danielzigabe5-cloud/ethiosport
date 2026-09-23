<template>
  <nav class="font-['Noto_Sans_Ethiopic',sans-serif] bg-slate-900 text-white shadow-lg fixed top-0 left-0 right-0 z-[100] border-b border-slate-800/80 transition-all duration-300 min-h-16 lg:min-h-20 flex items-center w-full backdrop-blur-md bg-opacity-95">
    
    <!-- Responsive Container -->
    <div class="w-full px-3 sm:px-6 lg:px-8 py-2">
      <div class="flex items-center justify-between gap-2 xl:gap-4 w-full">
        
        <!-- 1. LOGO -->
        <NuxtLink to="/" class="flex items-center flex-shrink-0 group">
          <span class="text-xl xl:text-2xl font-black text-white tracking-tight uppercase transition-transform group-hover:scale-105 duration-300">
            Compolojo<span class="text-[#94FF2B]">.</span>
          </span>
        </NuxtLink>

        <!-- 2. NAVIGATION LINKS (Desktop - Adjusted Gap & Padding) -->
        <div class="hidden lg:flex items-center gap-0.5 xl:gap-1 flex-1 justify-center">
          <NuxtLink 
            v-for="item in navItems" 
            :key="item.path" 
            :to="item.path" 
            class="px-2 xl:px-2.5 py-1.5 rounded-full text-xs xl:text-sm font-bold transition-all duration-200 whitespace-nowrap"
            :class="[
              route?.path === item.path 
                ? 'text-[#94FF2B] bg-slate-800/90 shadow-sm border border-slate-700/50' 
                : 'text-slate-300 hover:text-white hover:bg-slate-800/50',
              item.isDashboard ? 'text-blue-400 bg-blue-950/40 border border-blue-800/50 hover:bg-blue-900/50' : ''
            ]"
          >
            {{ item.label }}
          </NuxtLink>
        </div>

        <!-- 3. ACTION AREA -->
        <div class="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
          
          <!-- ADD VENUE BUTTON -->
          <NuxtLink 
            :to="isLoggedIn ? '/venues/create' : '/auth?redirect=/venues/create'" 
            class="hidden md:flex items-center gap-1.5 bg-[#94FF2B] hover:bg-[#82e026] text-slate-950 px-3.5 xl:px-4 py-2 rounded-full font-black text-xs xl:text-[13px] transition-all shadow-md hover:shadow-[#94FF2B]/20 active:scale-95"
          >
            <Icon name="lucide:plus-circle" class="w-4 h-4" />
            Add Venue
          </NuxtLink>

          <!-- AUTH SECTION -->
          <div class="flex items-center">
            <!-- LOGGED IN -->
            <div v-if="isLoggedIn" class="flex items-center gap-2 xl:gap-2.5 pl-2.5 border-l border-slate-800">
              <NuxtLink :to="dashboardLink" class="flex items-center gap-2 group cursor-pointer">
                <div class="hidden sm:block text-right">
                  <p class="text-xs font-black text-white leading-none truncate max-w-[90px] group-hover:text-[#94FF2B] transition-colors">
                    {{ userProfile?.name || 'User' }}
                  </p>
                  <p class="text-[9px] font-extrabold text-[#94FF2B] uppercase mt-1 tracking-wider">
                    {{ userProfile?.role || 'User' }}
                  </p>
                </div>
                <div class="w-8 h-8 xl:w-9 xl:h-9 bg-slate-800 rounded-full flex items-center justify-center border border-slate-700 group-hover:border-[#94FF2B] transition-all">
                  <Icon name="lucide:user" class="w-4 h-4 xl:w-5 xl:h-5 text-slate-300" />
                </div>
              </NuxtLink>

              <button 
                @click="handleLogout" 
                class="text-red-400 hover:bg-red-950/40 p-1.5 rounded-xl transition-colors"
                title="Logout"
              >
                <Icon name="lucide:log-out" class="w-4 h-4" />
              </button>
            </div>

            <!-- GUEST -->
            <NuxtLink 
              v-else 
              to="/auth" 
              class="bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 px-3.5 sm:px-4 py-2 rounded-full font-black text-xs transition-all active:scale-95 whitespace-nowrap"
            >
              Sign In
            </NuxtLink>
          </div>

          <!-- MOBILE TOGGLE -->
          <button 
            @click="isOpen = !isOpen" 
            class="lg:hidden p-2 bg-slate-800 rounded-xl hover:bg-slate-700 transition-all border border-slate-700" 
          >
            <Icon 
              :name="isOpen ? 'lucide:x' : 'lucide:menu'" 
              class="w-5 h-5 text-slate-200" 
            /> 
          </button>
        </div>
      </div>
    </div>

    <!-- MOBILE MENU -->
    <div 
      v-if="isOpen" 
      class="lg:hidden fixed top-16 sm:top-20 left-0 w-full bg-slate-900 border-t border-slate-800 shadow-2xl p-4 z-[90] flex flex-col gap-1.5 overflow-y-auto max-h-[calc(100vh-70px)]"
    >
      <NuxtLink 
        :to="isLoggedIn ? '/venues/create' : '/auth?redirect=/venues/create'" 
        @click="isOpen = false" 
        class="flex items-center justify-center gap-2 bg-[#94FF2B] text-slate-950 py-2.5 rounded-xl font-black text-sm"
      >
        <Icon name="lucide:plus-circle" class="w-5 h-5" />
        Add Venue
      </NuxtLink>
      
      <div v-if="isLoggedIn" class="grid grid-cols-2 gap-2 my-1">
        <NuxtLink 
          :to="dashboardLink" 
          @click="isOpen = false" 
          class="flex items-center justify-center py-2 bg-blue-950/60 border border-blue-800/50 text-blue-400 rounded-xl font-bold text-xs"
        >
          Dashboard
        </NuxtLink>
        <button 
          @click="handleLogout(); isOpen = false" 
          class="py-2 bg-red-950/50 border border-red-900/50 text-red-400 rounded-xl font-bold text-xs"
        >
          Sign Out
        </button>
      </div>

      <NuxtLink 
        v-for="item in navItems" 
        :key="item.path" 
        :to="item.path" 
        @click="isOpen = false"
        class="flex items-center gap-2.5 p-2.5 rounded-xl font-bold text-sm transition-all"
        :class="route?.path === item.path ? 'bg-slate-800 text-[#94FF2B] border border-slate-700/60' : 'text-slate-300 hover:bg-slate-800/50'"
      >
        <Icon :name="item.icon || 'lucide:link'" class="w-5 h-5" />
        {{ item.label }}
      </NuxtLink>
    </div>
  </nav>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useAuthStore } from '~/stores/auth'

const route = useRoute()
const router = useRouter()

// Initialize store safely inside setup
const authStore = useAuthStore()

const isOpen = ref(false)

// Safe state getters
const isLoggedIn = computed(() => !!authStore?.token)
const userProfile = computed(() => authStore?.user)

// Dashboard route resolver
const dashboardLink = computed(() => {
  if (!isLoggedIn.value) return '/auth'
  const role = userProfile.value?.role?.toLowerCase()
  
  if (role === 'admin') return '/admin'
  if (role === 'partner') return '/partner'
  return '/'
})

// Navigation items configuration
const staticNavItems = [
  { path: '/', label: 'Home', icon: 'lucide:home' },
  { path: '/about', label: 'About Us', icon: 'lucide:info' },
  { path: '/games', label: 'Games', icon: 'lucide:gamepad-2' },
  { path: '/venues', label: 'Venues', icon: 'lucide:stadium' }
]

const navItems = computed(() => {
  const items = [...staticNavItems]
  
  if (isLoggedIn.value) {
    const role = userProfile.value?.role?.toLowerCase()
    
    if (role === 'admin' || role === 'partner') {
      const dashboardLabel = role === 'admin' ? 'Admin Dashboard' : 'Partner Dashboard'
      
      items.push({ 
        path: dashboardLink.value, 
        label: dashboardLabel, 
        icon: 'lucide:layout-dashboard',
        isDashboard: true 
      })
    }
  }

  items.push(
    { path: '/events', label: 'Events', icon: 'lucide:calendar' },
    { path: '/blogs', label: 'Blogs', icon: 'lucide:newspaper' },
    { path: '/justplay', label: 'JustPlay', icon: 'lucide:play-circle' },
    { path: '/contact', label: 'Contact', icon: 'lucide:phone' }
  )

  return items
})

const handleLogout = () => {
  if (authStore?.logout) {
    authStore.logout()
  }
  router.push('/')
}

onMounted(() => {
  if (authStore?.init) {
    authStore.init()
  }
})

watch(() => route?.path, () => { 
  isOpen.value = false 
})
</script>