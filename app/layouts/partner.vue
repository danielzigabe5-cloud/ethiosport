<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRoute, useRouter } from 'vue-router'

const authStore = useAuthStore()
const route = useRoute()
const router = useRouter()

const isDark = ref(false)
const isOpen = ref(false)
const currentLang = ref('አማ')

// Dashboard Route Resolver
const dashboardLink = computed(() => {
  if (!authStore?.token) return '/auth'
  const role = authStore.user?.role?.toLowerCase()
  
  if (role === 'admin') return '/admin'
  if (role === 'partner') return '/partner'
  return '/'
})

// Static English Navigation Items
const staticNavItems = [
  { path: '/', label: 'Home', icon: 'lucide:home' },
  { path: '/about', label: 'About Us', icon: 'lucide:info' },
  { path: '/games', label: 'Games', icon: 'lucide:gamepad-2' },
  { path: '/venues', label: 'Venues', icon: 'lucide:stadium' }
]

// Dynamic Navbar Links with Admin/Partner support
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

// Partner Sidebar Links
const partnerSidebarLinks = [
  { name: 'Dashboard', path: '/partner', icon: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z' },
  { name: 'Schedule', path: '/partner/schedule', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
  { name: 'My Venues', path: '/partner/venues', icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z' },
  { name: 'Payouts', path: '/partner/payouts', icon: 'M3 10h18M7 15h1m4 0h1m-7 4h12a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
  { name: 'Settings', path: '/partner/settings', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z' },
  { name: 'Support', path: '/partner/support', icon: 'M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z' }
]

const handleLogout = () => {
  authStore.logout()
  router.push('/')
}

const toggleTheme = () => {
  isDark.value = !isDark.value
  document.documentElement.classList.toggle('dark', isDark.value)
}

const toggleLanguage = () => {
  currentLang.value = currentLang.value === 'አማ' ? 'EN' : 'አማ'
}

onMounted(() => {
  authStore.init()
})

watch(() => route?.path, () => { 
  isOpen.value = false 
})
</script>

<template>
  <div class="min-h-screen w-full bg-[#070c14] dark:bg-gray-900 text-white font-sans flex flex-col pt-20">
    
    <!-- 1. FULL NAVBAR TOP HEADER -->
    <nav class="font-['Noto_Sans_Ethiopic',sans-serif] bg-white dark:bg-gray-900 shadow-sm fixed top-0 left-0 right-0 z-[100] border-b dark:border-gray-800 transition-all duration-300 min-h-20 flex items-center w-full">
      <div class="w-full px-3 sm:px-6 lg:px-10 2xl:px-16 py-3">
        <div class="flex flex-wrap lg:flex-nowrap justify-between items-center gap-2 lg:gap-4 w-full">
          
          <!-- Logo -->
          <NuxtLink to="/" class="flex items-center flex-shrink-0 group">
            <span class="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white tracking-tighter uppercase transition-transform group-hover:scale-105 duration-300">
              Compolojo
            </span>
          </NuxtLink>

          <!-- Navigation Links (Desktop) -->
          <div class="hidden lg:flex items-center gap-0.5 xl:gap-1 flex-1 justify-center">
            <NuxtLink 
              v-for="item in navItems" 
              :key="item.path" 
              :to="item.path" 
              class="px-1.5 xl:px-2.5 py-1.5 rounded-xl text-xs xl:text-sm font-bold transition-all duration-200 whitespace-nowrap"
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

          <!-- Action Controls & Auth -->
          <div class="flex items-center gap-2 sm:gap-4 flex-shrink-0">
            
            <!-- Language Switcher -->
            <button 
              @click="toggleLanguage"
              class="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-gray-200 dark:border-gray-700 text-xs font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition cursor-pointer"
            >
              <Icon name="lucide:languages" class="w-4 h-4 text-green-500" />
              <span>{{ currentLang }}</span>
            </button>

            <!-- Theme Switcher -->
            <button 
              @click="toggleTheme" 
              class="p-2 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition cursor-pointer"
            >
              <Icon :name="isDark ? 'lucide:sun' : 'lucide:moon'" class="w-4 h-4 text-amber-500" />
            </button>

            <!-- Add Venue Button -->
            <NuxtLink 
              :to="authStore?.token ? '/venues/create' : '/auth?redirect=/venues/create'" 
              class="hidden md:flex items-center gap-2 bg-[#94FF2B] hover:bg-[#82e026] text-black px-4 xl:px-6 py-2.5 rounded-full font-black text-xs xl:text-[13px] transition-all shadow-lg active:scale-95"
            >
              <Icon name="lucide:plus-circle" class="w-4 h-4" />
              Add Venue
            </NuxtLink>

            <!-- Auth Section -->
            <div class="flex items-center">
              <div v-if="authStore?.token" class="flex items-center gap-2 xl:gap-3 pl-2 sm:pl-4 border-l dark:border-gray-700">
                <NuxtLink :to="dashboardLink" class="flex items-center gap-3 group cursor-pointer">
                  <div class="hidden sm:block text-right">
                    <p class="text-[13px] font-black text-gray-900 dark:text-white leading-none truncate max-w-[100px] group-hover:text-green-600 transition-colors">
                      {{ authStore.user?.name || 'User' }}
                    </p>
                    <p class="text-[10px] font-bold text-green-600 uppercase mt-1 tracking-wider">
                      {{ authStore.user?.role || 'User' }}
                    </p>
                  </div>
                  <div class="w-9 h-9 xl:w-10 xl:h-10 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center border-2 border-green-500/30 overflow-hidden group-hover:border-green-500 transition-all">
                    <Icon name="lucide:user" class="w-5 h-5 xl:w-6 xl:h-6 text-gray-500" />
                  </div>
                </NuxtLink>

                <button 
                  @click="handleLogout" 
                  class="text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 p-2 rounded-lg transition-colors"
                  title="Logout"
                >
                  <Icon name="lucide:log-out" class="w-5 h-5" />
                </button>
              </div>

              <NuxtLink 
                v-else 
                to="/auth" 
                class="bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-4 sm:px-8 py-2.5 sm:py-3 rounded-xl font-black text-xs sm:text-sm hover:opacity-90 transition-all active:scale-95"
              >
                Sign In
              </NuxtLink>
            </div>

            <!-- Mobile Toggle Button -->
            <button 
              @click="isOpen = !isOpen" 
              class="lg:hidden p-2.5 bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 hover:scale-105 transition-all" 
            >
              <Icon 
                :name="isOpen ? 'lucide:x' : 'lucide:menu'" 
                class="w-6 h-6 text-gray-700 dark:text-white" 
              /> 
            </button>
          </div>
        </div>
      </div>

      <!-- Mobile Dropdown Menu -->
      <div 
        v-if="isOpen" 
        class="lg:hidden fixed top-20 left-0 w-full bg-white dark:bg-gray-900 border-t dark:border-gray-800 shadow-2xl p-6 z-[90] flex flex-col gap-4 overflow-y-auto max-h-[calc(100vh-80px)]"
      >
        <NuxtLink 
          :to="authStore?.token ? '/venues/create' : '/auth?redirect=/venues/create'" 
          @click="isOpen = false" 
          class="flex items-center justify-center gap-2 bg-[#94FF2B] text-black py-4 rounded-2xl font-black"
        >
          <Icon name="lucide:plus-circle" class="w-5 h-5" />
          Add Venue
        </NuxtLink>
        
        <div v-if="authStore?.token" class="grid grid-cols-2 gap-3 mb-4">
          <NuxtLink 
            :to="dashboardLink" 
            @click="isOpen = false" 
            class="flex items-center justify-center py-3 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl font-bold"
          >
            Dashboard
          </NuxtLink>
          <button 
            @click="handleLogout(); isOpen = false" 
            class="py-3 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-xl font-bold"
          >
            Sign Out
          </button>
        </div>

        <NuxtLink 
          v-for="item in navItems" 
          :key="item.path" 
          :to="item.path" 
          @click="isOpen = false"
          class="flex items-center gap-4 p-4 rounded-2xl font-black"
          :class="route?.path === item.path ? 'bg-green-50 dark:bg-green-900/20 text-green-600' : 'text-gray-700 dark:text-gray-200'"
        >
          <Icon :name="item.icon || 'lucide:link'" class="w-6 h-6" />
          {{ item.label }}
        </NuxtLink>
      </div>
    </nav>

    <!-- 2. SIDEBAR + MAIN CONTENT WRAPPER -->
    <div class="flex-1 flex w-full relative">
      
      <!-- Partner Sidebar -->
      <aside class="w-64 min-w-[256px] min-h-[calc(100vh-80px)] bg-[#0d4026] border-r border-[#135936] p-4 flex flex-col justify-between shrink-0">
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

      <!-- Main Page Slot Content & Integrated Footer -->
      <div class="flex-1 flex flex-col min-w-0 bg-[#070c14]">
        <main class="flex-1 p-6 overflow-x-hidden">
          <slot />
        </main>

        <!-- New Updated Footer Component -->
        <footer class="bg-[#0f172a] text-slate-200 pt-16 pb-8 border-t-4 border-green-600 shrink-0">
          <div class="container mx-auto px-6">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
              
              <!-- Column 1: About -->
              <div class="flex flex-col space-y-5">
                <div class="flex items-center space-x-2">
                  <span class="text-3xl font-black text-green-500 italic">ETHIO</span>
                  <span class="text-3xl font-black text-white italic">SPORT</span>
                </div>
                <p class="text-slate-400 text-sm leading-relaxed">
                  Your premier destination for the latest Ethiopian sports news, transfer updates, and live match results.
                </p>
                <div class="flex space-x-4 pt-2">
                  <a href="#" class="p-2 bg-slate-800 rounded-full hover:bg-green-600 transition-all text-white">FB</a>
                  <a href="#" class="p-2 bg-slate-800 rounded-full hover:bg-green-600 transition-all text-white">TG</a>
                  <a href="#" class="p-2 bg-slate-800 rounded-full hover:bg-green-600 transition-all text-white">YT</a>
                </div>
              </div>

              <!-- Column 2: Quick Links -->
              <div>
                <h3 class="text-white font-bold text-lg mb-6 uppercase tracking-widest text-sm">Quick Links</h3>
                <ul class="space-y-4 text-slate-400 text-sm">
                  <li><NuxtLink to="/" class="hover:text-green-500 transition-all">Ethiopian Premier League</NuxtLink></li>
                  <li><NuxtLink to="/" class="hover:text-green-500 transition-all">National Team (Walias)</NuxtLink></li>
                  <li><NuxtLink to="/" class="hover:text-green-500 transition-all">Transfer News</NuxtLink></li>
                  <li><NuxtLink to="/" class="hover:text-green-500 transition-all">League Table</NuxtLink></li>
                </ul>
              </div>

              <!-- Column 3: Support -->
              <div>
                <h3 class="text-white font-bold text-lg mb-6 uppercase tracking-widest text-sm">Support</h3>
                <ul class="space-y-4 text-slate-400 text-sm">
                  <li><NuxtLink to="/" class="hover:text-green-500 transition-all">About Us</NuxtLink></li>
                  <li><NuxtLink to="/" class="hover:text-green-500 transition-all">Contact Us</NuxtLink></li>
                  <li><NuxtLink to="/" class="hover:text-green-500 transition-all">Advertise</NuxtLink></li>
                  <li><NuxtLink to="/" class="hover:text-green-500 transition-all">Privacy Policy</NuxtLink></li>
                </ul>
              </div>

              <!-- Column 4: Newsletter -->
              <div>
                <h3 class="text-white font-bold text-lg mb-6 uppercase tracking-widest text-sm">Stay Updated</h3>
                <p class="text-slate-400 text-sm mb-6">Subscribe to get the latest sports headlines daily.</p>
                <div class="flex flex-col gap-2">
                  <input 
                    type="email" 
                    placeholder="Enter your email..." 
                    class="w-full bg-slate-800 border-none rounded-lg py-3 px-4 text-sm text-white focus:ring-2 focus:ring-green-500 outline-none"
                  />
                  <button class="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition-all cursor-pointer">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>

            <!-- Bottom Bar -->
            <div class="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-slate-500 text-xs">
              <p>© {{ new Date().getFullYear() }} EthioSport Platform. All Rights Reserved.</p>
              <div class="flex space-x-6 mt-4 md:mt-0">
                <span>Addis Ababa, Ethiopia</span>
              </div>
            </div>
          </div>
        </footer>

      </div>

    </div>

  </div>
</template>