<template>
  <nav class="font-['Noto_Sans_Ethiopic',sans-serif] bg-white dark:bg-gray-900 shadow-sm fixed top-0 left-0 right-0 z-[100] border-b dark:border-gray-800 transition-all duration-300 min-h-16 lg:min-h-20 flex items-center w-full">
    
    <!-- Responsive Container -->
    <div class="w-full px-3 sm:px-6 lg:px-8 2xl:px-12 py-2">
      <div class="flex items-center justify-between gap-3 xl:gap-6 w-full">
        
        <!-- 1. LOGO -->
        <NuxtLink to="/" class="flex items-center flex-shrink-0 group">
          <span class="text-lg sm:text-xl xl:text-2xl font-bold text-gray-900 dark:text-white tracking-tighter uppercase transition-transform group-hover:scale-105 duration-300">
            Compolojo
          </span>
        </NuxtLink>

        <!-- 2. NAVIGATION LINKS (Desktop) -->
        <div class="hidden lg:flex items-center justify-end xl:justify-center gap-1 xl:gap-2 flex-1 min-w-0">
          <NuxtLink 
            v-for="item in navItems" 
            :key="item.path" 
            :to="item.path" 
            class="px-2 xl:px-3 py-1.5 rounded-lg text-xs xl:text-[13px] font-bold transition-all duration-200 whitespace-nowrap"
            :class="[
              route?.path === item.path 
                ? 'text-green-600 bg-green-50/50 dark:bg-green-900/10' 
                : 'text-gray-600 dark:text-gray-400 hover:text-green-600 hover:bg-gray-50 dark:hover:bg-gray-800',
              item.isDashboard ? 'text-blue-600 bg-blue-50/50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800' : ''
            ]"
          >
            {{ item.label }}
          </NuxtLink>
        </div>

        <!-- 3. ACTION AREA -->
        <div class="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          
          <!-- ADD VENUE BUTTON -->
          <NuxtLink 
            :to="authStore?.token ? '/venues/create' : '/auth?redirect=/venues/create'" 
            class="hidden xl:flex items-center gap-1.5 bg-[#94FF2B] hover:bg-[#82e026] text-black px-3.5 xl:px-4 py-2 rounded-full font-black text-xs transition-all shadow-md active:scale-95 whitespace-nowrap"
          >
            <Icon name="lucide:plus-circle" class="w-4 h-4" />
            Add Venue
          </NuxtLink>

          <!-- AUTH SECTION -->
          <div class="flex items-center">
            <!-- LOGGED IN -->
            <div v-if="authStore?.token" class="flex items-center gap-1.5 xl:gap-2 pl-2 border-l dark:border-gray-700">
              <NuxtLink :to="dashboardLink" class="flex items-center gap-2 group cursor-pointer">
                <div class="hidden sm:block text-right">
                  <p class="text-xs font-black text-gray-900 dark:text-white leading-none truncate max-w-[80px] group-hover:text-green-600 transition-colors">
                    {{ authStore.user?.name || 'User' }}
                  </p>
                  <p class="text-[9px] font-bold text-green-600 uppercase mt-0.5 tracking-wider">
                    {{ authStore.user?.role || 'User' }}
                  </p>
                </div>
                <div class="w-8 h-8 xl:w-9 xl:h-9 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center border-2 border-green-500/30 overflow-hidden group-hover:border-green-500 transition-all">
                  <Icon name="lucide:user" class="w-4 h-4 xl:w-5 xl:h-5 text-gray-500" />
                </div>
              </NuxtLink>

              <button 
                @click="handleLogout" 
                class="text-red-500 hover:bg-red-50 p-1.5 rounded-lg transition-colors"
                title="Logout"
              >
                <Icon name="lucide:log-out" class="w-4 h-4" />
              </button>
            </div>

            <!-- GUEST -->
            <NuxtLink 
              v-else 
              to="/auth" 
              class="bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-4 sm:px-5 py-2 rounded-xl font-black text-xs hover:opacity-90 transition-all active:scale-95 whitespace-nowrap"
            >
              Sign In
            </NuxtLink>
          </div>

          <!-- MOBILE TOGGLE -->
          <button 
            @click="isOpen = !isOpen" 
            class="lg:hidden p-2 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow transition-all border border-gray-200 dark:border-gray-700" 
          >
            <Icon 
              :name="isOpen ? 'lucide:x' : 'lucide:menu'" 
              class="w-5 h-5 text-gray-700 dark:text-white" 
            /> 
          </button>
        </div>
      </div>
    </div>

    <!-- MOBILE MENU -->
    <div 
      v-if="isOpen" 
      class="lg:hidden fixed top-16 sm:top-20 left-0 w-full bg-white dark:bg-gray-900 border-t dark:border-gray-800 shadow-2xl p-4 sm:p-6 z-[90] flex flex-col gap-3 overflow-y-auto max-h-[calc(100vh-70px)]"
    >
      <NuxtLink 
        :to="authStore?.token ? '/venues/create' : '/auth?redirect=/venues/create'" 
        @click="isOpen = false" 
        class="flex items-center justify-center gap-2 bg-[#94FF2B] text-black py-3 rounded-xl font-black text-sm"
      >
        <Icon name="lucide:plus-circle" class="w-5 h-5" />
        Add Venue
      </NuxtLink>
      
      <div v-if="authStore?.token" class="grid grid-cols-2 gap-2 mb-2">
        <NuxtLink 
          :to="dashboardLink" 
          @click="isOpen = false" 
          class="flex items-center justify-center py-2.5 bg-blue-50 text-blue-600 rounded-xl font-bold text-xs"
        >
          Dashboard
        </NuxtLink>
        <button 
          @click="handleLogout(); isOpen = false" 
          class="py-2.5 bg-red-50 text-red-600 rounded-xl font-bold text-xs"
        >
          Sign Out
        </button>
      </div>

      <NuxtLink 
        v-for="item in navItems" 
        :key="item.path" 
        :to="item.path" 
        @click="isOpen = false"
        class="flex items-center gap-3 p-3 rounded-xl font-bold text-sm"
        :class="route?.path === item.path ? 'bg-green-50 text-green-600 dark:bg-green-900/20' : 'text-gray-700 dark:text-gray-200'"
      >
        <Icon :name="item.icon || 'lucide:link'" class="w-5 h-5" />
        {{ item.label }}
      </NuxtLink>
    </div>
  </nav>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRoute, useRouter } from 'vue-router'

const authStore = useAuthStore()
const route = useRoute()
const router = useRouter()
const isDark = ref(false)
const isOpen = ref(false)

// Dashboard route resolver
const dashboardLink = computed(() => {
  if (!authStore?.token) return '/auth'
  const role = authStore.user?.role?.toLowerCase()
  
  if (role === 'admin') return '/admin'
  if (role === 'partner') return '/partner'
  return '/'
})

// Static English navigation items
const staticNavItems = [
  { path: '/', label: 'Home', icon: 'lucide:home' },
  { path: '/about', label: 'About Us', icon: 'lucide:info' },
  { path: '/games', label: 'Games', icon: 'lucide:gamepad-2' },
  { path: '/venues', label: 'Venues', icon: 'lucide:stadium' }
]

// Computed navigation list with dynamic dashboard link
const navItems = computed(() => {
  const items = [...staticNavItems]
  
  if (authStore?.token) {
    const role = authStore.user?.role?.toLowerCase()
    
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
  authStore.logout()
  router.push('/')
}

onMounted(() => {
  authStore.init()
})

watch(() => route?.path, () => { 
  isOpen.value = false 
})
</script>