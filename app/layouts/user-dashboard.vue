<template>
  <div class="min-h-screen bg-slate-950 flex text-slate-200">
    <!-- Sidebar -->
    <aside class="w-64 bg-slate-900 border-r border-slate-800 hidden md:flex flex-col sticky top-0 h-screen">
      <div class="p-6 border-b border-slate-800">
        <NuxtLink to="/" class="text-xl font-bold text-white flex items-center gap-2">
          Ethio<span class="text-emerald-500">Sport</span>
        </NuxtLink>
      </div>
      
      <nav class="flex-1 p-4 space-y-2 overflow-y-auto">
        <NuxtLink v-for="item in menuItems" :key="item.path" :to="item.path"
          class="flex items-center gap-3 px-4 py-3 rounded-xl transition-all hover:bg-slate-800"
          :class="{'bg-emerald-600/10 text-emerald-500 font-bold border border-emerald-500/20': $route.path === item.path}"
        >
          <span>{{ item.icon }}</span> {{ item.name }}
        </NuxtLink>
      </nav>

      <div class="p-4 border-t border-slate-800">
        <button @click="handleLogout" class="flex items-center gap-3 px-4 py-3 w-full text-red-400 hover:bg-red-500/10 rounded-xl transition">
          <span>🚪</span> ይውጡ
        </button>
      </div>
    </aside>

    <!-- Main Content -->
    <div class="flex-1 flex flex-col">
      <header class="h-16 border-b border-slate-800 bg-slate-900/50 backdrop-blur-md flex items-center justify-between px-8 sticky top-0 z-40">
        <h2 class="font-bold text-lg text-white">የእኔ ዳሽቦርድ</h2>
        <div class="flex items-center gap-4">
          <NuxtLink to="/dashboard/wallet" class="bg-emerald-500/10 text-emerald-500 px-3 py-1 rounded-full text-xs font-bold border border-emerald-500/20">
            2,450.00 ብር
          </NuxtLink>
          <div class="w-10 h-10 bg-slate-800 rounded-full border border-slate-700"></div>
        </div>
      </header>

      <main class="p-8">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup>
const menuItems = [
  { name: 'ዋና ገጽ (Overview)', path: '/dashboard', icon: '📊' },
  { name: 'የሜዳ ማስያዣዎች', path: '/dashboard/bookings', icon: '🏟️' },
  { name: 'የተመዘገቡ Events', path: '/dashboard/events', icon: '🎉' },
  { name: 'Just Play', path: '/dashboard/justplay', icon: '⚽' },
  { name: 'ዋሌት (Wallet)', path: '/dashboard/wallet', icon: '💳' },
  { name: 'ፕሮፋይል', path: '/dashboard/profile', icon: '👤' },
]

const handleLogout = () => {
  navigateTo('/login')
}
</script>