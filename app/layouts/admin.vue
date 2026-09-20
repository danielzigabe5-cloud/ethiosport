<template>
  <div class="min-h-screen bg-slate-100 dark:bg-[#070b10] text-gray-900 dark:text-slate-100 flex flex-col font-sans">
    
    <!-- 1. DASHBOARD HEADER / NAVBAR -->
    <header class="h-16 bg-white dark:bg-[#0b1320] border-b border-slate-200 dark:border-slate-800/80 sticky top-0 z-50 px-4 lg:px-6 flex items-center justify-between shadow-xs">
      
      <!-- Logo & Panel Badge -->
      <div class="flex items-center gap-3">
        <button 
          @click="isMobileSidebarOpen = !isMobileSidebarOpen"
          class="lg:hidden p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
        >
          <Icon name="lucide:menu" class="w-5 h-5" />
        </button>

        <NuxtLink to="/admin" class="flex items-center gap-1 text-lg font-black uppercase tracking-wider">
          <span class="text-slate-900 dark:text-white">COMPO</span>
          <span class="text-emerald-500">LOJO</span>
        </NuxtLink>

        <span class="hidden sm:inline-block bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border border-emerald-500/20 uppercase">
          Admin Panel
        </span>
      </div>

      <!-- Right Header Actions -->
      <div class="flex items-center gap-3 md:gap-4">
        
        <!-- Public Website Link -->
        <NuxtLink 
          to="/" 
          target="_blank" 
          class="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition"
        >
          <span>View Site</span>
          <Icon name="lucide:external-link" class="w-3.5 h-3.5" />
        </NuxtLink>

        <!-- Add Venue Button -->
        <NuxtLink 
          :to="authStore.user ? '/venues/create' : '/auth?redirect=/venues/create'" 
          class="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#94FF2B] hover:bg-[#82e026] text-slate-950 text-xs font-black transition shadow-xs active:scale-95"
        >
          <Icon name="lucide:plus-circle" class="w-4 h-4 shrink-0" />
          <span>Add Venue</span>
        </NuxtLink>

        <!-- Navbar Admin Badge & Profile Info -->
        <div class="flex items-center gap-3 pl-3 border-l border-slate-200 dark:border-slate-800">
          <div class="text-right hidden md:block">
            <div class="flex items-center justify-end gap-1.5">
              <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span class="text-xs font-bold leading-none text-slate-900 dark:text-slate-100">
                {{ authStore.user?.name || 'Super Admin' }}
              </span>
            </div>
            <div class="text-[9px] font-extrabold text-emerald-600 dark:text-emerald-400 uppercase tracking-wide leading-none mt-1">
              System Administrator
            </div>
          </div>
          
          <div class="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-black text-xs border border-emerald-500/30 shadow-xs">
            {{ (authStore.user?.name || 'A').charAt(0).toUpperCase() }}
          </div>
        </div>
      </div>
    </header>

    <!-- 2. ADMIN BODY CONTAINER -->
    <div class="flex-1 flex relative">
      
      <!-- MOBILE SIDEBAR BACKDROP -->
      <div 
        v-if="isMobileSidebarOpen" 
        @click="isMobileSidebarOpen = false"
        class="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-40 lg:hidden"
      ></div>

      <!-- ADMIN SIDEBAR -->
      <aside 
        class="fixed left-0 top-16 bottom-0 w-64 bg-slate-900 dark:bg-[#04070d] border-r border-slate-800 z-40 flex flex-col justify-between transition-transform duration-300 lg:translate-x-0 shadow-xl"
        :class="isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'"
      >
        <div class="p-4 overflow-y-auto max-h-[calc(100vh-64px)]">
          <div class="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-3 px-3">
            Admin Navigation
          </div>
          
          <nav class="space-y-1.5">
            <NuxtLink 
              v-for="item in adminMenuItems" 
              :key="item.path" 
              :to="item.path"
              @click="isMobileSidebarOpen = false"
              class="flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-bold transition-all"
              :class="isLinkActive(item.path) 
                ? 'bg-emerald-500 text-slate-950 font-extrabold shadow-md' 
                : 'text-slate-400 hover:bg-slate-800/80 hover:text-white'"
            >
              <Icon :name="item.icon" class="w-4 h-4 shrink-0" />
              <span class="truncate">{{ item.label }}</span>
            </NuxtLink>
          </nav>
        </div>

        <!-- SIDEBAR FOOTER -->
        <div class="p-4 border-t border-slate-800/80 bg-slate-900/50 dark:bg-[#04070d]">
          <button 
            @click="handleLogout"
            class="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-bold text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 transition cursor-pointer"
          >
            <Icon name="lucide:log-out" class="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      <!-- MAIN ADMIN PAGE CONTENT & FOOTER WRAPPER -->
      <main class="flex-1 lg:ml-64 min-w-0 overflow-y-auto flex flex-col justify-between min-h-[calc(100vh-64px)] bg-slate-100 dark:bg-[#070b10]">
        
        <!-- PAGE CONTENT AREA -->
        <div class="p-4 md:p-8">
          <slot />
        </div>

        <!-- 3. REPLACED DETAILED FOOTER -->
        <footer class="bg-[#0f172a] text-slate-200 pt-16 pb-8 border-t-4 border-green-600">
          <div class="container mx-auto px-6">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
              
              <!-- Column 1: About -->
              <div class="flex flex-col space-y-5">
                <div class="flex items-center space-x-2">
                  <span class="text-3xl font-black text-green-500 italic">COMBO</span>
                  <span class="text-3xl font-black text-white italic">LOJO</span>
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
                <h3 class="text-white font-bold mb-6 uppercase tracking-widest text-sm">Quick Links</h3>
                <ul class="space-y-4 text-slate-400 text-sm">
                  <li><NuxtLink to="/" class="hover:text-green-500 transition-all">Ethiopian Premier League</NuxtLink></li>
                  <li><NuxtLink to="/" class="hover:text-green-500 transition-all">National Team (Walias)</NuxtLink></li>
                  <li><NuxtLink to="/" class="hover:text-green-500 transition-all">Transfer News</NuxtLink></li>
                  <li><NuxtLink to="/" class="hover:text-green-500 transition-all">League Table</NuxtLink></li>
                </ul>
              </div>

              <!-- Column 3: Support -->
              <div>
                <h3 class="text-white font-bold mb-6 uppercase tracking-widest text-sm">Support</h3>
                <ul class="space-y-4 text-slate-400 text-sm">
                  <li><NuxtLink to="/" class="hover:text-green-500 transition-all">About Us</NuxtLink></li>
                  <li><NuxtLink to="/" class="hover:text-green-500 transition-all">Contact Us</NuxtLink></li>
                  <li><NuxtLink to="/" class="hover:text-green-500 transition-all">Advertise</NuxtLink></li>
                  <li><NuxtLink to="/" class="hover:text-green-500 transition-all">Privacy Policy</NuxtLink></li>
                </ul>
              </div>

              <!-- Column 4: Newsletter -->
              <div>
                <h3 class="text-white font-bold mb-6 uppercase tracking-widest text-sm">Stay Updated</h3>
                <p class="text-slate-400 text-sm mb-6">Subscribe to get the latest sports headlines daily.</p>
                <div class="flex flex-col gap-2">
                  <input 
                    type="email" 
                    placeholder="Enter your email..." 
                    class="w-full bg-slate-800 border-none rounded-lg py-3 px-4 text-sm text-white focus:ring-2 focus:ring-green-500 outline-none"
                  />
                  <button class="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition-all">
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

// active link checker
const isLinkActive = (path) => {
  if (path === '/admin') return route.path === '/admin'
  return route.path.startsWith(path)
}

// admin navigation items
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