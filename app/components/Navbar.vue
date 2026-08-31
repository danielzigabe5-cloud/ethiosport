<template>
  <nav class="font-['Noto_Sans_Ethiopic',sans-serif] bg-white dark:bg-gray-900 shadow-sm fixed top-0 left-0 right-0 z-[100] border-b dark:border-gray-800 transition-all duration-300 min-h-20 flex items-center">
    <div class="max-w-[1440px] mx-auto px-4 sm:px-6 w-full py-3">
      <div class="flex flex-wrap lg:flex-nowrap justify-between items-center gap-2 lg:gap-4">
        
        <!-- 1. LOGO -->
        <NuxtLink to="/" class="flex items-center flex-shrink-0 group">
          <span class="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white tracking-tighter uppercase transition-transform group-hover:scale-105 duration-300">
            Combolojo
          </span>
        </NuxtLink>

        <!-- 2. NAVIGATION LINKS (Desktop - ለትልቅ ስክሪን ብቻ) -->
        <div class="hidden lg:flex items-center gap-1 flex-1 justify-center">
          <NuxtLink v-for="item in navItems" :key="item.path" :to="item.path" 
            class="px-4 py-2 rounded-xl text-[15px] font-bold transition-all duration-200 whitespace-nowrap"
            :class="[
              route.path === item.path 
                ? 'text-green-600 bg-green-50/50 dark:bg-green-900/10' 
                : 'text-gray-600 dark:text-gray-400 hover:text-green-600 hover:bg-gray-50 dark:hover:bg-gray-800',
              item.isDashboard ? 'text-blue-600 bg-blue-50/50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800' : ''
            ]">
            {{ currentLang === 'am' ? item.am : item.en }}
          </NuxtLink>
        </div>

        <!-- 3. ACTION AREA -->
        <div class="flex items-center gap-2 sm:gap-4 flex-shrink-0">
          
          <!-- LANGUAGE & THEME -->
          <div class="hidden sm:flex items-center gap-3 border-r dark:border-gray-700 pr-4">
            <button @click="toggleLang" class="text-xs font-black text-gray-500 hover:text-green-600 transition-colors uppercase">
              {{ currentLang === 'am' ? 'EN' : 'አማ' }}
            </button>
            <button @click="toggleTheme" class="text-gray-500">
              <Icon :name="isDark ? 'lucide:sun' : 'lucide:moon'" class="w-5 h-5" />
            </button>
          </div>

          <!-- ADD VENUE BUTTON -->
          <NuxtLink 
            :to="authStore.token ? '/venues/create' : '/auth?redirect=/venues/create'" 
            class="hidden md:flex items-center gap-2 bg-[#94FF2B] hover:bg-[#82e026] text-black px-6 py-2.5 rounded-full font-black text-[13px] transition-all shadow-lg active:scale-95"
          >
            <Icon name="lucide:plus-circle" class="w-4 h-4" />
            {{ currentLang === 'am' ? 'Add Venue' : 'Add Venue' }}
          </NuxtLink>

          <!-- AUTH SECTION -->
          <div class="flex items-center">
            <!-- A. IF LOGGED IN -->
            <div v-if="authStore.token" class="flex items-center gap-3 pl-4 border-l dark:border-gray-700">
              
              <!-- Profile Click Logic (ወደ የራሱ ዳሽቦርድ ይወስዳል) -->
              <NuxtLink :to="dashboardLink" class="flex items-center gap-3 group cursor-pointer">
                <div class="hidden sm:block text-right">
                  <p class="text-[13px] font-black text-gray-900 dark:text-white leading-none truncate max-w-[100px] group-hover:text-green-600 transition-colors">
                    {{ authStore.user?.name || 'User' }}
                  </p>
                  <p class="text-[10px] font-bold text-green-600 uppercase mt-1 tracking-wider">
                    {{ authStore.user?.role || 'User' }}
                  </p>
                </div>
                <div class="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center border-2 border-green-500/30 overflow-hidden group-hover:border-green-500 transition-all">
                  <Icon name="lucide:user" class="w-6 h-6 text-gray-500" />
                </div>
              </NuxtLink>

              <!-- Logout -->
              <button @click="handleLogout" class="text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors">
                <Icon name="lucide:log-out" class="w-5 h-5" />
              </button>
            </div>

            <!-- B. IF GUEST -->
            <NuxtLink v-else to="/auth" class="bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-8 py-3 rounded-xl font-black text-sm hover:opacity-90 transition-all active:scale-95">
              {{ currentLang === 'am' ? 'Sign In' : 'Sign In' }}
            </NuxtLink>
          </div>

          <!-- MOBILE TOGGLE -->
          <button @click="isOpen = !isOpen" class="lg:hidden p-2 text-gray-600 dark:text-gray-300">
            <Icon :name="isOpen ? 'lucide:x' : 'lucide:menu'" class="w-7 h-7" />
          </button>
        </div>
      </div>
    </div>

    <!-- MOBILE MENU -->
    <div v-if="isOpen" class="lg:hidden fixed top-20 left-0 w-full bg-white dark:bg-gray-900 border-t dark:border-gray-800 shadow-2xl p-6 z-[90] flex flex-col gap-4 overflow-y-auto max-h-[calc(100vh-80px)]">
      <NuxtLink :to="authStore.token  ? '/venues/create' : '/auth?redirect=/venues/create'" @click="isOpen = false" class="flex items-center justify-center gap-2 bg-[#94FF2B] text-black py-4 rounded-2xl font-black">
         <span>➕</span> Add Venue
      </NuxtLink>
      
      <div v-if="authStore.token" class="grid grid-cols-2 gap-3 mb-4">
          <NuxtLink :to="dashboardLink" @click="isOpen = false" class="flex items-center justify-center py-3 bg-blue-50 text-blue-600 rounded-xl font-bold">ዳሽቦርድ</NuxtLink>
          <button @click="handleLogout(); isOpen = false" class="py-3 bg-red-50 text-red-600 rounded-xl font-bold">ውጣ</button>
      </div>

      <NuxtLink v-for="item in navItems" :key="item.path" :to="item.path" @click="isOpen = false"
        class="flex items-center gap-4 p-4 rounded-2xl font-black"
        :class="route.path === item.path ? 'bg-green-50 text-green-600' : 'text-gray-700 dark:text-gray-200'">
        <Icon :name="item.icon || 'lucide:link'" class="w-6 h-6" />
        {{ currentLang === 'am' ? item.am : item.en }}
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
const currentLang = useState('locale', () => 'am')

// Dashboard redirection logic
const dashboardLink = computed(() => {
  if (!authStore.token) return '/auth'
  const role = authStore.user?.role?.toLowerCase()
  
  if (role === 'admin') return '/admin'
  if (role === 'partner') return '/partner'
  return '/' // User ለሆነ ወደ መነሻ ይሂድ (ዳሽቦርድ የለውም)
})

const staticNavItems = [
  { path: '/', am: 'Home', en: 'Home', icon: 'lucide:home' },
  { path: '/games', am: 'Games', en: 'Games', icon: 'lucide:gamepad-2' },
  { path: '/venues', am: 'Venues', en: 'Venues', icon: 'lucide:stadium' }
]

const navItems = computed(() => {
  let items = [...staticNavItems]
  
  // Login ካደረገ ዳሽቦርድ እንዲታይ
  if (authStore.token) {
    const role = authStore.user?.role?.toLowerCase()
    
    // Admin እና Partner ብቻ ዳሽቦርድ ያሳያሉ
    if (role === 'admin' || role === 'partner') {
      const dashboardLabel = role === 'admin' ? 'አድሚን ዳሽቦርድ' : 'የፓርትነር ዳሽቦርድ'
      
      items.push({ 
        path: dashboardLink.value, 
        am: dashboardLabel, 
        en: 'Dashboard',
        icon: 'lucide:layout-dashboard',
        isDashboard: true 
      })
      
      // Partner እና Admin ብቻ የራሳቸውን ሜዳዎች ያያሉ
  
    }
  }

  items.push(
    { path: '/events', am: 'Events', en: 'Events', icon: 'lucide:calendar' },
    { path: '/blogs', am: 'Blogs', en: 'Blogs', icon: 'lucide:newspaper' },
    { path: '/justplay', am: 'Justplay', en: 'JustPlay', icon: 'lucide:play-circle' },
    { path: '/contact', am: 'Contact', en: 'Contact', icon: 'lucide:phone' }
  )
  return items
})

const handleLogout = () => {
  authStore.logout()
  router.push('/')
}

const toggleTheme = () => {
  isDark.value = !isDark.value
  document.documentElement.classList.toggle('dark', isDark.value)
}

const toggleLang = () => {
  currentLang.value = currentLang.value === 'am' ? 'en' : 'am'
}

onMounted(() => {
  authStore.init()
  
  // የ role ትክክለኛነትን ለማረጋገጥ
  console.log('Auth Store User:', authStore.user)
  console.log('Auth Store Role:', authStore.user?.role)
})

watch(() => route.path, () => { isOpen.value = false })
</script>