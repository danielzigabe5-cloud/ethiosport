<script setup lang="ts">
const adminNav = [
  { name: 'Analytics (ስታቲስቲክስ)', path: '/admin', icon: 'i-heroicons-chart-bar' },
  { name: 'የቡኪንግ መቆጣጠሪያ', path: '/admin/bookings', icon: 'i-heroicons-table-cells' },
  { name: 'የሜዳዎች አስተዳደር', path: '/admin/venues', icon: 'i-heroicons-map-pin' },
  { name: 'ተጠቃሚዎችና Role', path: '/admin/users', icon: 'i-heroicons-users' },
]
</script>

<template>
  <aside class="w-64 bg-slate-900 border-r border-slate-800 text-slate-300 min-h-screen p-4 flex flex-col justify-between">
    <div>
      <div class="px-4 py-3 font-bold text-xl text-indigo-400 border-b border-slate-800 mb-6 flex items-center justify-between">
        <span>EthioSport</span>
        <span class="text-xs bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-2 py-0.5 rounded">Admin</span>
      </div>
      <nav class="space-y-1">
        <NuxtLink 
          v-for="item in adminNav" 
          :key="item.path" 
          :to="item.path"
          active-class="bg-indigo-600/20 text-indigo-400 font-semibold"
          class="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm hover:bg-slate-800 hover:text-white transition-colors"
        >
          <span>{{ item.name }}</span>
        </NuxtLink>
      </nav>
    </div>
  </aside>
</template>