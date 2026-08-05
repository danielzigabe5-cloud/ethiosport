<!-- app/layouts/partner.vue -->
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const isMobileMenuOpen = ref(false)

const navItems = [
  { name: 'Overview', path: '/partner', icon: '📊' },
  { name: 'QR Ticket Verifier', path: '/partner/scan', icon: '📷' },
  { name: 'My Venues', path: '/partner/venues', icon: '🏟️' },
  { name: 'Time Slots & Pricing', path: '/partner/schedule', icon: '⏰' },
  { name: 'Bookings', path: '/partner/bookings', icon: '📅' },
  { name: 'Earnings & Payouts', path: '/partner/earnings', icon: '💰' },
  { name: 'Settings', path: '/partner/settings', icon: '⚙️' }
]

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}

const handleLogout = () => {
  // Session / Token ፅዳት
  // localStorage.clear()
  
  // ወደ Login Redirect ማድረጊያ
  router.push('/login')
}
</script>

<template>
  <div class="min-h-screen bg-[#06090e] text-slate-100 flex flex-col font-sans">
    
    <!-- TOP NAVBAR (ለዴስክቶፕ እና ለሞባይል ሁልጊዜ ከላይ የሚታይ) -->
    <header class="bg-[#0b111a] border-b border-[#1a2432] px-4 py-3 flex items-center justify-between sticky top-0 z-40">
      <div class="flex items-center gap-3">
        <!-- Mobile Menu Toggle -->
        <button @click="isMobileMenuOpen = !isMobileMenuOpen" class="lg:hidden p-2 text-slate-300 bg-[#131c27] rounded-xl focus:outline-none">
          {{ isMobileMenuOpen ? '✕' : '☰' }}
        </button>
        
        <div class="flex items-center gap-2">
          <div class="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center text-slate-950 font-black text-base">⚽</div>
          <h2 class="font-black text-sm text-white hidden sm:block">EthioSport Partner</h2>
        </div>
      </div>

      <!-- TOP RIGHT ACTIONS: USER & LOGOUT BUTTON -->
      <div class="flex items-center gap-3">
        <div class="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-[#131c27] rounded-xl border border-[#212e3e]">
          <span class="w-2 h-2 rounded-full bg-emerald-400"></span>
          <span class="text-xs font-bold text-slate-200">ሳርቤት ፉትሳል</span>
        </div>

        <!-- TOP LOGOUT BUTTON (ሁልጊዜ ከላይ የሚታይ) -->
        <button 
          @click="handleLogout"
          class="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-rose-400 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 transition-all cursor-pointer"
        >
          <span>🚪</span>
          <span>Logout</span>
        </button>
      </div>
    </header>

    <!-- Main Wrapper (Sidebar + Content Area) -->
    <div class="flex flex-1">
      
      <!-- SIDEBAR -->
      <aside 
        class="bg-[#0b111a] border-r border-[#1a2432] w-64 p-5 flex flex-col justify-between shrink-0 h-[calc(100vh-57px)] sticky top-[57px] z-30 transition-all duration-300"
        :class="[isMobileMenuOpen ? 'fixed inset-y-0 left-0 flex z-50 w-72 shadow-2xl top-0 h-full' : 'hidden lg:flex']"
      >
        <div class="space-y-6">
          <div class="flex items-center gap-3 px-2">
            <div class="w-9 h-9 bg-emerald-500 rounded-xl flex items-center justify-center text-slate-950 font-black text-lg shadow-lg shadow-emerald-500/20">⚽</div>
            <div>
              <h2 class="font-black text-sm text-white tracking-wide">EthioSport</h2>
              <span class="text-[10px] text-emerald-400 font-bold uppercase tracking-wider block -mt-1">Partner Portal</span>
            </div>
          </div>

          <!-- Navigation Links -->
          <nav class="space-y-1 font-semibold text-xs">
            <NuxtLink 
              v-for="item in navItems" 
              :key="item.path" 
              :to="item.path"
              @click="closeMobileMenu"
              class="flex items-center gap-3 px-3.5 py-3 rounded-xl text-slate-400 hover:text-white hover:bg-[#131c27] transition-all"
              active-class="bg-emerald-500/10 !text-emerald-400 border border-emerald-500/30 font-bold shadow-sm"
            >
              <span class="text-base">{{ item.icon }}</span>
              <span>{{ item.name }}</span>
            </NuxtLink>
          </nav>
        </div>

        <!-- SIDEBAR BOTTOM LOGOUT SECTION -->
        <div class="pt-4 border-t border-[#1a2432] space-y-2">
          <button 
            @click="handleLogout"
            class="w-full flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 transition-all shadow-md cursor-pointer"
          >
            <span>🚪</span>
            <span>Logout Account</span>
          </button>
        </div>
      </aside>

      <!-- Mobile Overlay -->
      <div 
        v-if="isMobileMenuOpen" 
        @click="closeMobileMenu" 
        class="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-sm"
      ></div>

      <!-- MAIN CONTENT AREA -->
      <div class="flex-1 flex flex-col min-w-0 min-h-[calc(100vh-57px)]">
        
        <main class="flex-1 p-4 md:p-8">
          <slot />
        </main>

        <!-- FOOTER -->
        <footer class="bg-[#0b111a] border-t border-[#1a2432] p-6 text-slate-400 text-xs mt-auto">
          <div class="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
            <div class="flex items-center gap-2">
              <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
              <p class="font-bold text-white">EthioSport Partner Portal</p>
              <span class="text-slate-600">|</span>
              <p class="text-slate-500 text-[11px]">© 2026 EthioSport</p>
            </div>

            <div class="flex items-center gap-6 text-[11px] font-semibold">
              <NuxtLink to="/partner/settings" class="hover:text-emerald-400 transition">Settings</NuxtLink>
              <button @click="handleLogout" class="text-rose-400 hover:underline cursor-pointer">Logout</button>
              <a href="tel:+251911000000" class="text-emerald-400 hover:underline">Support</a>
            </div>
          </div>
        </footer>

      </div>

    </div>
  </div>
</template>