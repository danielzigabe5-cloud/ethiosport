<!-- pages/admin-dashboard/venues.vue -->
<template>
  <div class="space-y-6">
    <!-- Sub-header or Venue-wide Actions/Tabs -->
    <div class="flex items-center justify-between border-b border-slate-800 pb-4">
      <div>
        <h1 class="text-2xl font-black text-white tracking-tight flex items-center gap-2">
          <span>🏟️</span> የሜዳዎች ማዕከል (Venues Management)
        </h1>
        <p class="text-xs text-slate-400 mt-1">
          የስፖርት ሜዳዎችን፣ የቦታ ማስያዣዎችን እና ዋጋዎችን ከዚህ ቦታ ያስተዳድሩ።
        </p>
      </div>

      <div class="flex items-center gap-2">
        <NuxtLink 
          to="/admin-dashboard/venues" 
          class="px-3 py-1.5 rounded-lg text-xs font-semibold transition"
          :class="$route.path === '/admin-dashboard/venues' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'text-slate-400 hover:bg-slate-800'"
        >
          ሁሉንም ሜዳዎች
        </NuxtLink>
      </div>
    </div>

    <!-- Child Routes Render Here -->
    <NuxtPage />
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'admin' // ወይም የምትጠቀመው የ Admin Layout ስም
})
</script>