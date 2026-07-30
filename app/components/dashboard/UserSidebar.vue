<script setup lang="ts">
const navItems = [
  { name: 'አጠቃላይ (Overview)', path: '/dashboard', icon: 'i-heroicons-home' },
  { name: 'የያዝኳቸው ሜዳዎች', path: '/dashboard/bookings', icon: 'i-heroicons-calendar' },
  { name: 'Just Play ጨዋታዎች', path: '/dashboard/matches', icon: 'i-heroicons-user-group' },
  { name: 'ክፍያዎችና ቦርሳ', path: '/dashboard/wallet', icon: 'i-heroicons-credit-card' },
  { name: 'የመለያ ማስተካከያ', path: '/dashboard/profile', icon: 'i-heroicons-cog-6-tooth' },
]
</script>

<template>
  <aside class="w-64 bg-slate-900 border-r border-slate-800 text-slate-300 min-h-screen p-4 flex flex-col justify-between">
    <div>
      <div class="px-4 py-3 font-bold text-xl text-emerald-400 border-b border-slate-800 mb-6">
        EthioSport User
      </div>
      <nav class="space-y-1">
        <NuxtLink 
          v-for="item in navItems" 
          :key="item.path" 
          :to="item.path"
          active-class="bg-emerald-600/20 text-emerald-400 font-semibold"
          class="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm hover:bg-slate-800 hover:text-white transition-colors"
        >
          <span>{{ item.name }}</span>
        </NuxtLink>
      </nav>
    </div>
    <div class="border-t border-slate-800 pt-4">
      <NuxtLink to="/" class="text-xs text-slate-400 hover:text-white block px-4 py-2">
        ← ወደ ዋናው ገፅ ተመለስ
      </NuxtLink>
    </div>
  </aside>
</template>