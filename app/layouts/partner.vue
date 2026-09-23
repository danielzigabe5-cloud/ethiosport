<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from '#imports'

const route = useRoute()
const router = useRouter()

const isMobileMenuOpen = ref(false)
const isProfileMenuOpen = ref(false)
const isNotificationsOpen = ref(false)

const notifications = ref([
  { id: 1, title: 'New Booking Request', message: 'Mulugeta booked Field 1 for 4:00 PM', time: '10m ago', unread: true },
  { id: 2, title: 'Payment Confirmed', message: 'ETB 1,200 received for Booking #482', time: '1h ago', unread: true },
  { id: 3, title: 'System Notice', message: 'Payout sent to your CBE account', time: '1d ago', unread: false }
])

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const toggleProfileMenu = () => {
  isProfileMenuOpen.value = !isProfileMenuOpen.value
  if (isProfileMenuOpen.value) isNotificationsOpen.value = false
}

const toggleNotifications = () => {
  isNotificationsOpen.value = !isNotificationsOpen.value
  if (isNotificationsOpen.value) isProfileMenuOpen.value = false
}

const navLinks = [
  {
    name: 'Dashboard',
    path: '/partner',
    icon: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z'
  },
  {
    name: 'My Venue',
    path: '/partner/venue',
    icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4'
  },
  {
    name: 'Bookings',
    path: '/partner/bookings',
    icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2'
  },
  {
    name: 'Earnings',
    path: '/partner/earnings',
    icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
  },
  {
    name: 'Support',
    path: '/partner/support',
    icon: 'M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z'
  }
]

const handleLogout = () => {
  isProfileMenuOpen.value = false
  router.push('/login')
}
</script>

<template>
  <div class="flex min-h-screen bg-slate-100 font-sans text-slate-800">
    
    <!-- Mobile Backdrop -->
    <div 
      v-if="isMobileMenuOpen" 
      @click="isMobileMenuOpen = false"
      class="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 lg:hidden"
    ></div>

    <!-- Permanent Sidebar -->
    <aside 
      :class="[
        'w-64 bg-[#0a141d] text-slate-300 flex flex-col justify-between shrink-0 fixed lg:sticky top-0 h-screen z-50 transition-transform duration-300 ease-in-out',
        isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      ]"
    >
      <div>
        <div class="p-5 flex items-center justify-between border-b border-slate-800">
          <NuxtLink to="/partner" class="text-xl font-black uppercase tracking-wider text-white">
            <span class="text-emerald-400">Combolojo</span>SPORT
          </NuxtLink>
          <button @click="isMobileMenuOpen = false" class="lg:hidden text-slate-400 hover:text-white">
            <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <nav class="p-4 space-y-1 text-sm font-medium">
          <NuxtLink 
            v-for="link in navLinks" 
            :key="link.path"
            :to="link.path"
            @click="isMobileMenuOpen = false"
            :class="[
              'flex items-center gap-3 px-3 py-2.5 rounded-lg transition duration-150',
              route.path === link.path || (link.path !== '/partner' && route.path.startsWith(link.path))
                ? 'bg-emerald-600/20 text-emerald-400 font-semibold border border-emerald-500/30'
                : 'hover:bg-slate-800 hover:text-white'
            ]"
          >
            <svg class="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="link.icon" />
            </svg>
            <span>{{ link.name }}</span>
          </NuxtLink>
        </nav>
      </div>

      <div class="p-4 m-4 bg-[#12202c] rounded-xl border border-slate-700/50 text-xs">
        <div class="flex items-center gap-2 font-bold text-white mb-1">
          <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          Partner Portal
        </div>
        <p class="text-slate-400 text-[11px]">Manage your venue with CombolojoSPORT.</p>
      </div>
    </aside>

    <!-- Main Dynamic Content Area -->
    <div class="flex-1 flex flex-col min-w-0">
      <header class="h-16 bg-white border-b border-slate-200 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30 shadow-sm">
        <div class="flex items-center gap-3">
          <button 
            @click="toggleMobileMenu" 
            class="p-2 text-slate-600 hover:bg-slate-100 rounded-lg lg:hidden"
            aria-label="Toggle Sidebar"
          >
            <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
          </button>
        </div>

        <div class="flex items-center gap-3 sm:gap-4 relative">
          <!-- Notifications -->
          <div class="relative">
            <button 
              @click="toggleNotifications" 
              class="p-2 text-slate-500 hover:text-slate-700 rounded-full hover:bg-slate-100 relative transition"
            >
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
              <span class="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full"></span>
            </button>

            <div 
              v-if="isNotificationsOpen" 
              class="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50"
            >
              <div class="px-4 py-2 border-b border-slate-100 flex items-center justify-between">
                <span class="text-xs font-bold text-slate-800">Notifications</span>
                <span class="text-[10px] bg-emerald-100 text-emerald-700 font-bold px-2 py-0.5 rounded-full">2 New</span>
              </div>
              <div class="max-h-64 overflow-y-auto divide-y divide-slate-50">
                <div 
                  v-for="item in notifications" 
                  :key="item.id" 
                  class="p-3 hover:bg-slate-50 transition cursor-pointer text-xs"
                >
                  <div class="font-bold text-slate-800 flex justify-between">
                    <span>{{ item.title }}</span>
                    <span class="text-[10px] text-slate-400 font-normal">{{ item.time }}</span>
                  </div>
                  <p class="text-slate-500 text-[11px] mt-0.5">{{ item.message }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- User Profile -->
          <div class="relative pl-3 border-l border-slate-200">
            <button 
              @click="toggleProfileMenu" 
              class="flex items-center gap-3 text-left hover:opacity-80 transition focus:outline-none"
            >
              <div class="w-9 h-9 rounded-full bg-slate-200 overflow-hidden ring-2 ring-emerald-500/20">
                <img 
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" 
                  alt="Avatar" 
                  class="w-full h-full object-cover" 
                />
              </div>
              <div class="hidden sm:block">
                <div class="text-xs font-bold text-slate-800 leading-tight">Abebe Kassa</div>
                <div class="text-[10px] text-slate-500">Sarbet Futsal</div>
              </div>
            </button>

            <div 
              v-if="isProfileMenuOpen" 
              class="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-slate-100 py-1 z-50 text-xs text-slate-700"
            >
              <NuxtLink 
                to="/partner/profile" 
                @click="isProfileMenuOpen = false"
                class="flex items-center gap-2 px-4 py-2.5 hover:bg-slate-50 font-medium transition"
              >
                Account Profile
              </NuxtLink>
              <button 
                @click="handleLogout" 
                class="w-full flex items-center gap-2 px-4 py-2.5 text-rose-600 hover:bg-rose-50 font-bold transition text-left"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <!-- Dynamic Page Slot -->
      <main class="p-4 sm:p-6 space-y-6 overflow-y-auto flex-1">
        <slot />
      </main>
    </div>

  </div>
</template>