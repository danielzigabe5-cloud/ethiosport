<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()

// የUser Navigation Links
const userNavLinks = [
  { name: 'Overview', path: '/dashboard', icon: '📊' },
  { name: 'My Bookings', path: '/dashboard/bookings', icon: '📅' },
  { name: 'Saved Venues', path: '/dashboard/favorites', icon: '⭐' },
  { name: 'Payment History', path: '/dashboard/payments', icon: '💰' },
  { name: 'Settings', path: '/dashboard/settings', icon: '⚙️' },
]

// State / Dynamic User Info
const user = useState('user', () => ({
  name: 'አበበ በቀለ',
  email: 'abebe.bekele@example.com',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250'
}))

const isLoggedIn = useState('isLoggedIn', () => true)

const handleLogout = () => {
  isLoggedIn.value = false
  navigateTo('/login')
}
</script>

<template>
  <div class="min-h-screen bg-[#05080c] text-slate-100 flex font-sans">
    
    <!-- LEFT SIDEBAR -->
    <aside class="w-64 bg-[#0b111a] border-r border-[#1a2432] flex flex-col justify-between shrink-0 min-h-screen">
      <div>
        <!-- Brand Logo -->
        <div class="p-6 border-b border-[#1a2432] flex items-center gap-3">
          <NuxtLink to="/" class="flex items-center gap-2">
            <div class="w-8 h-8 rounded-xl bg-emerald-500 flex items-center justify-center font-bold text-slate-950">
              ⚽
            </div>
            <div>
              <h1 class="font-black text-base tracking-wider text-white">ETHIOSPORT</h1>
              <p class="text-[9px] text-emerald-400 font-bold uppercase tracking-widest">Player Portal</p>
            </div>
          </NuxtLink>
        </div>

        <!-- Navigation Links -->
        <nav class="p-4 space-y-1">
          <NuxtLink
            v-for="item in userNavLinks"
            :key="item.path"
            :to="item.path"
            :class="[
              'flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold transition',
              route.path === item.path
                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                : 'text-slate-400 hover:text-white hover:bg-[#131c27]'
            ]"
          >
            <span>{{ item.icon }}</span>
            <span>{{ item.name }}</span>
          </NuxtLink>
        </nav>
      </div>

      <!-- Bottom User Profile & Logout -->
      <div class="p-4 border-t border-[#1a2432] space-y-3">
        <div class="flex items-center gap-3 px-2">
          <img :src="user.avatar" class="w-8 h-8 rounded-xl object-cover border border-emerald-500" />
          <div class="overflow-hidden">
            <p class="text-xs font-bold text-white truncate">{{ user.name }}</p>
            <p class="text-[10px] text-slate-400 truncate">{{ user.email }}</p>
          </div>
        </div>

        <button 
          @click="handleLogout" 
          class="w-full py-2 bg-rose-500/10 hover:bg-rose-500 text-rose-400 hover:text-white font-bold text-xs rounded-xl border border-rose-500/20 transition cursor-pointer"
        >
          🚪 Logout Account
        </button>
      </div>
    </aside>

    <!-- RIGHT MAIN CONTENT AREA -->
    <div class="flex-1 flex flex-col min-w-0">
      
      <!-- Top Navigation Header -->
      <header class="h-16 border-b border-[#1a2432] bg-[#0b111a] px-8 flex justify-between items-center">
        <div class="flex items-center gap-4 text-xs font-medium text-slate-400">
          <NuxtLink to="/" class="hover:text-white">Home</NuxtLink>
          <span>/</span>
          <NuxtLink to="/venues" class="hover:text-white">Venues</NuxtLink>
          <span>/</span>
          <span class="text-emerald-400 font-semibold">Dashboard</span>
        </div>

        <NuxtLink to="/venues" class="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl transition">
          + Explore Venues
        </NuxtLink>
      </header>

      <!-- Dashboard page Content -->
      <main class="flex-1 p-8 overflow-y-auto">
        <slot />
      </main>

      <!-- Footer -->
      <footer class="px-8 py-4 border-t border-[#1a2432] bg-[#0b111a] flex justify-between items-center text-[11px] text-slate-400">
        <p>🟢 <strong class="text-white">EthioSport Player Portal</strong> | © 2026 EthioSport</p>
        <div class="flex gap-4">
          <NuxtLink to="/help" class="hover:underline">Support</NuxtLink>
          <NuxtLink to="/terms" class="hover:underline">Terms</NuxtLink>
        </div>
      </footer>

    </div>

  </div>
</template>