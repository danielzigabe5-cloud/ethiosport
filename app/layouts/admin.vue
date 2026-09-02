<template>
  <div class="min-h-screen bg-gray-50 dark:bg-[#070b10] text-gray-900 dark:text-slate-100">
    
    <!-- 1. MAIN NAVIGATION (Navbar.vue Component) -->
    <Navbar />

    <!-- 2. ADMIN BODY CONTAINER (Navbar ቁመቱ 80px / h-20 ስለሆነ Top Padding pt-20 ተጨምሯል) -->
    <div class="pt-20 flex relative min-h-screen">
      
      <!-- MOBILE SIDEBAR BACKDROP -->
      <div 
        v-if="isMobileSidebarOpen" 
        @click="isMobileSidebarOpen = false"
        class="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
      ></div>

      <!-- ADMIN SIDEBAR (ከ Navbar በታች top-20 ብሎ ይጀምራል) -->
      <aside 
        class="fixed left-0 top-20 bottom-0 w-64 bg-white dark:bg-[#0b1320] border-r border-gray-200 dark:border-slate-800 z-40 flex flex-col justify-between transition-transform duration-300 lg:translate-x-0"
        :class="isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'"
      >
        <div class="p-4 overflow-y-auto max-h-[calc(100vh-80px)]">
          <div class="text-[11px] font-black text-gray-400 dark:text-slate-500 uppercase tracking-wider mb-3 px-3">
            Admin Menu
          </div>
          
          <nav class="space-y-1.5">
            <NuxtLink 
              v-for="item in adminMenuItems" 
              :key="item.path" 
              :to="item.path"
              @click="isMobileSidebarOpen = false"
              class="flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all"
              :class="isLinkActive(item.path) ? 'bg-green-50 text-green-600 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border dark:border-emerald-500/20' : 'text-gray-600 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-slate-800/60 hover:text-gray-900 dark:hover:text-white'"
            >
              <Icon :name="item.icon" class="w-4 h-4 shrink-0" />
              <span class="truncate">{{ item.label }}</span>
            </NuxtLink>
          </nav>
        </div>

        <!-- SIDEBAR FOOTER -->
        <div class="p-4 border-t border-gray-200 dark:border-slate-800 bg-white dark:bg-[#0b1320]">
          <button 
            @click="handleLogout"
            class="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-bold text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition cursor-pointer"
          >
            <Icon name="lucide:log-out" class="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      <!-- MAIN ADMIN PAGE CONTENT -->
      <main class="flex-1 lg:ml-64 min-w-0 overflow-y-auto flex flex-col justify-between min-h-[calc(100vh-80px)]">
        <div class="p-4 md:p-8">
          <!-- Mobile Toggle Button for Sidebar -->
          <div class="lg:hidden mb-4">
            <button 
              @click="isMobileSidebarOpen = !isMobileSidebarOpen"
              class="p-2.5 bg-white dark:bg-[#0b1320] border border-gray-200 dark:border-slate-800 rounded-xl text-xs font-bold flex items-center gap-2 text-gray-700 dark:text-slate-300 shadow-sm"
            >
              <Icon name="lucide:panel-left" class="w-4 h-4" />
              <span>Toggle Admin Menu</span>
            </button>
          </div>

          <!-- DYNAMIC PAGE CONTENT SLOT -->
          <slot />
        </div>

        <!-- FOOTER HERE -->
        <Footer />
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