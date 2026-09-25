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

        <!-- 2. NAVIGATION LINKS (Clean Desktop Menu) -->
        <div class="hidden lg:flex items-center gap-0.5 xl:gap-1 flex-1 justify-center">
          <NuxtLink 
            v-for="item in navItems" 
            :key="item.path" 
            :to="item.path" 
            class="px-2 xl:px-2.5 py-1.5 rounded-full text-xs xl:text-sm font-bold transition-all duration-200 whitespace-nowrap"
            :class="[
              route?.path === item.path 
                ? 'text-[#94FF2B] bg-slate-800/90 shadow-sm border border-slate-700/50' 
                : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
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

          <!-- AUTH / PROFILE SECTION -->
          <div class="flex items-center">
            <!-- LOGGED IN USER (PROFILE DROPDOWN) -->
            <div v-if="isLoggedIn" class="relative" ref="dropdownRef">
              <button 
                @click="isDropdownOpen = !isDropdownOpen"
                class="flex items-center gap-2 pl-2 sm:pl-3 border-l border-slate-800 group cursor-pointer focus:outline-none"
              >
                <!-- የተጠቃሚውን ስም (feleke) አጥፍተን Role ብቻ እንዲታይ አድርገነዋል -->
                <div class="hidden sm:block text-right">
                  <p class="text-xs font-black text-[#94FF2B] uppercase tracking-wider">
                    {{ userProfile?.role || 'Admin' }}
                  </p>
                </div>
                
                <div class="w-8 h-8 xl:w-9 xl:h-9 bg-slate-800 rounded-full flex items-center justify-center border border-slate-700 group-hover:border-[#94FF2B] transition-all">
                  <img 
                    v-if="userProfile?.avatar" 
                    :src="userProfile.avatar" 
                    class="w-full h-full rounded-full object-cover" 
                  />
                  <Icon v-else name="lucide:user" class="w-4 h-4 xl:w-5 xl:h-5 text-slate-300" />
                </div>
                
                <Icon name="lucide:chevron-down" class="w-3.5 h-3.5 text-slate-400 group-hover:text-white transition-transform duration-200" :class="{ 'rotate-180': isDropdownOpen }" />
              </button>

              <!-- DROPDOWN CARD -->
              <Transition
                enter-active-class="transition duration-150 ease-out"
                enter-from-class="transform scale-95 opacity-0 -translate-y-2"
                enter-to-class="transform scale-100 opacity-100 translate-y-0"
                leave-active-class="transition duration-100 ease-in"
                leave-from-class="transform scale-100 opacity-100 translate-y-0"
                leave-to-class="transform scale-95 opacity-0 -translate-y-2"
              >
                <div 
                  v-if="isDropdownOpen" 
                  class="absolute right-0 mt-2 w-52 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-2 z-50 divide-y divide-slate-800/80"
                >
                  <div class="py-1">
                    <!-- DASHBOARD LINK -->
                    <NuxtLink 
                      v-if="dashboardLink !== '/'"
                      :to="dashboardLink" 
                      @click="isDropdownOpen = false"
                      class="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-blue-400 hover:bg-blue-950/40 hover:text-blue-300 transition-colors"
                    >
                      <Icon name="lucide:layout-dashboard" class="w-4 h-4" />
                      <span>{{ dashboardLabel }}</span>
                    </NuxtLink>

                    <!-- MY PROFILE የሚለው ሊንክ ሙሉ በሙሉ ተወግዷል -->
                  </div>

                  <!-- LOGOUT -->
                  <div class="pt-1">
                    <button 
                      @click="handleLogout" 
                      class="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-rose-400 hover:bg-rose-950/40 transition-colors text-left cursor-pointer"
                    >
                      <Icon name="lucide:log-out" class="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              </Transition>
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
        class="flex items-center justify-center gap-2 bg-[#94FF2B] text-slate-950 py-2.5 rounded-xl font-black text-sm mb-1"
      >
        <Icon name="lucide:plus-circle" class="w-5 h-5" />
        Add Venue
      </NuxtLink>
      
      <div v-if="isLoggedIn" class="grid grid-cols-2 gap-2 my-1">
        <NuxtLink 
          v-if="dashboardLink !== '/'"
          :to="dashboardLink" 
          @click="isOpen = false" 
          class="flex items-center justify-center gap-1.5 py-2.5 bg-blue-950/60 border border-blue-800/50 text-blue-400 rounded-xl font-bold text-xs"
        >
          <Icon name="lucide:layout-dashboard" class="w-4 h-4" />
          <span>Dashboard</span>
        </NuxtLink>
        <button 
          @click="handleLogout(); isOpen = false" 
          class="flex items-center justify-center gap-1.5 py-2.5 bg-red-950/50 border border-red-900/50 text-red-400 rounded-xl font-bold text-xs"
          :class="{ 'col-span-2': dashboardLink === '/' }"
        >
          <Icon name="lucide:log-out" class="w-4 h-4" />
          <span>Sign Out</span>
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
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '~/stores/auth'

const route = useRoute()
const router = useRouter()

const authStore = useAuthStore()

const isOpen = ref(false)
const isDropdownOpen = ref(false)
const dropdownRef = ref(null)

const isLoggedIn = computed(() => !!authStore?.token)
const userProfile = computed(() => authStore?.user)

const dashboardLink = computed(() => {
  if (!isLoggedIn.value) return '/auth'
  const role = userProfile.value?.role?.toLowerCase()
  
  if (role === 'admin') return '/admin'
  if (role === 'partner') return '/partner'
  return '/'
})

const dashboardLabel = computed(() => {
  const role = userProfile.value?.role?.toLowerCase()
  if (role === 'admin') return 'Admin Dashboard'
  if (role === 'partner') return 'Partner Dashboard'
  return 'Dashboard'
})

// Clean Static Links
const navItems = [
  { path: '/', label: 'Home', icon: 'lucide:home' },
  { path: '/about', label: 'About Us', icon: 'lucide:info' },
  { path: '/venues', label: 'Venues', icon: 'lucide:stadium' },
  { path: '/events', label: 'Events', icon: 'lucide:calendar' },
  { path: '/blogs', label: 'Blogs', icon: 'lucide:newspaper' },
  { path: '/justplay', label: 'JustPlay', icon: 'lucide:play-circle' },
  { path: '/contact', label: 'Contact', icon: 'lucide:phone' }
]

const handleLogout = () => {
  isDropdownOpen.value = false
  if (authStore?.logout) {
    authStore.logout()
  }
  router.push('/')
}

const handleClickOutside = (event) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
    isDropdownOpen.value = false
  }
}

onMounted(() => {
  if (authStore?.init) {
    authStore.init()
  }
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})

watch(() => route?.path, () => { 
  isOpen.value = false 
  isDropdownOpen.value = false
})
</script>