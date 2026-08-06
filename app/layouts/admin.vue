<!-- app/layouts/admin.vue -->
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const isMobileMenuOpen = ref(false)

// የSidebar ሊንኮች ዝርዝር
const navItems = [
  { name: 'Dashboard', path: '/admin', icon: '📊' },
  { name: 'Venues', path: '/admin/venues', icon: '🏟️' },
  { name: 'Bookings', path: '/admin/bookings', icon: '📅' },
  { name: 'Users', path: '/admin/users', icon: '👥' },
  { name: 'Reports', path: '/admin/reports', icon: '📈' },
  { name: 'Settings', path: '/admin/settings', icon: '⚙️' }
]

const handleLogout = () => {
  router.push('/login')
}
</script>

<template>
  <div class="min-h-screen bg-[#06090e] text-slate-100 flex flex-col font-sans">
    
    <!-- MAIN WRAPPER -->
    <div class="flex flex-1 min-h-screen">
      
      <!-- SIDEBAR -->
      <aside 
        class="bg-[#0b111a] border-r border-[#1a2432] w-64 p-5 flex flex-col justify-between shrink-0 h-screen sticky top-0 z-30"
      >
        <div class="space-y-6">
          <!-- Logo -->
          <div class="flex items-center gap-3 px-2">
            <div class="w-9 h-9 bg-emerald-500 rounded-xl flex items-center justify-center text-slate-950 font-black text-lg shadow-lg shadow-emerald-500/20">
              E
            </div>
            <div>
              <h2 class="font-black text-base text-white tracking-wide">
                ETHIO-<span class="text-emerald-400">ADMIN</span>
              </h2>
            </div>
          </div>

          <!-- NAV LINKS (እነዚህ ናቸው የጠፉት) -->
          <nav class="space-y-1 font-semibold text-xs">
            <NuxtLink 
              v-for="item in navItems" 
              :key="item.path" 
              :to="item.path"
              class="flex items-center gap-3 px-3.5 py-3 rounded-xl text-slate-400 hover:text-white hover:bg-[#131c27] transition-all"
              active-class="bg-emerald-500/10 !text-emerald-400 border border-emerald-500/30 font-bold shadow-sm"
            >
              <span class="text-base">{{ item.icon }}</span>
              <span>{{ item.name }}</span>
            </NuxtLink>
          </nav>
        </div>

        <!-- Admin Profile & Logout -->
        <div class="pt-4 border-t border-[#1a2432] space-y-2">
          <div class="bg-[#131c27] p-3 rounded-2xl border border-[#212e3e] flex items-center gap-3">
            <div class="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-black text-xs">
              AD
            </div>
            <div class="truncate">
              <p class="text-xs font-bold text-white truncate">System Admin</p>
              <p class="text-[10px] text-slate-400 truncate">admin@ethiosport.et</p>
            </div>
          </div>

          <button 
            @click="handleLogout"
            class="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-rose-400 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 transition-all cursor-pointer"
          >
            <span>🚪</span>
            <span>Logout</span>
          </button>
        </div>
      </aside>

      <!-- MAIN CONTENT -->
      <div class="flex-1 flex flex-col min-w-0">
        <!-- Top Navbar -->
        <header class="bg-[#0b111a] border-b border-[#1a2432] px-8 py-4">
          <h1 class="text-sm font-bold text-slate-300">የአስተዳዳሪ መቆጣጠሪያ ፕላትፎርም</h1>
        </header>

        <main class="flex-1 p-8">
          <slot />
        </main>
      </div>

    </div>
  </div>
</template>