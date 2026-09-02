<script setup>
useHead({
  title: 'About Us - EthioSport | Compolojo',
  meta: [
    { name: 'description', content: 'Learn about EthioSport and how we connect sports enthusiasts with venues across Ethiopia.' }
  ]
})

// Sample Team / Platform Stats Data
const stats = [
  { id: 1, label: 'Active Players', value: '10K+' },
  { id: 2, label: 'Partner Venues', value: '150+' },
  { id: 3, label: 'Cities Covered', value: '6+' },
  { id: 4, label: 'Games Played', value: '25K+' },
]

const values = [
  {
    icon: '⚽',
    title: 'Connecting Athletes',
    desc: 'We bridge the gap between missing players and active games so no match gets canceled.'
  },
  {
    icon: '🏟️',
    title: 'Empowering Venues',
    desc: 'Helping sports facility owners in Addis Ababa and beyond manage bookings and grow revenue.'
  },
  {
    icon: '⚡',
    title: 'Instant Booking',
    desc: 'Seamlessly search, filter by sub-city or sport, and join matches in just a few clicks.'
  }
]
</script>

<template>
  <div class="min-h-screen bg-slate-50 dark:bg-[#070b10] text-slate-800 dark:text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-6xl mx-auto space-y-16">
      
      <!-- Hero Section -->
      <section class="text-center space-y-4 max-w-3xl mx-auto">
        <span class="text-xs font-bold uppercase tracking-wider text-emerald-500 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
          About EthioSport & Compolojo
        </span>
        <h1 class="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          Bringing Ethiopian Sports Communities Together
        </h1>
        <p class="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
          EthioSport is Ethiopia's premier sports facility and match-making platform. Whether you need an extra player for a weekend futsal game or want to manage your sports arena, we make sports accessible to everyone.
        </p>
      </section>

      <!-- Stats Grid -->
      <section class="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div 
          v-for="stat in stats" 
          :key="stat.id"
          class="bg-white dark:bg-[#131c27] p-6 rounded-2xl border border-slate-200 dark:border-[#212e3e] text-center shadow-sm hover:border-emerald-500/40 transition"
        >
          <div class="text-2xl sm:text-4xl font-black text-emerald-500">{{ stat.value }}</div>
          <div class="text-xs sm:text-sm font-semibold text-slate-500 dark:text-slate-400 mt-1">{{ stat.label }}</div>
        </div>
      </section>

      <!-- Mission & Core Values -->
      <section class="space-y-8">
        <div class="text-center">
          <h2 class="text-2xl font-bold text-slate-900 dark:text-white">Why Choose EthioSport?</h2>
          <p class="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">Built for players, hosts, and venue managers.</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div 
            v-for="(item, idx) in values" 
            :key="idx"
            class="bg-white dark:bg-[#131c27] p-6 rounded-2xl border border-slate-200 dark:border-[#212e3e] space-y-3 shadow-sm flex flex-col items-start"
          >
            <span class="text-3xl p-3 bg-slate-100 dark:bg-[#0b111a] rounded-xl border border-slate-200 dark:border-[#212e3e]">{{ item.icon }}</span>
            <h3 class="text-lg font-bold text-slate-900 dark:text-white">{{ item.title }}</h3>
            <p class="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{{ item.desc }}</p>
          </div>
        </div>
      </section>

      <!-- CTA Section -->
      <section class="bg-gradient-to-r from-emerald-600 to-teal-700 rounded-3xl p-8 sm:p-12 text-white text-center space-y-6 shadow-xl">
        <h2 class="text-2xl sm:text-4xl font-black">Ready to Hit the Field?</h2>
        <p class="text-xs sm:text-sm text-emerald-100 max-w-xl mx-auto">
          Explore active games in Bole, Yeka, Nifas Silk, and other sub-cities, or register your venue today.
        </p>
        <div class="flex flex-wrap justify-center gap-4">
          <NuxtLink 
            to="/games" 
            class="px-6 py-3 bg-white text-slate-950 font-bold text-xs sm:text-sm rounded-xl shadow-md hover:bg-emerald-50 transition"
          >
            Find Games
          </NuxtLink>
          <NuxtLink 
            to="/business/register" 
            class="px-6 py-3 bg-slate-900/60 hover:bg-slate-900 text-white font-bold text-xs sm:text-sm rounded-xl border border-white/20 transition"
          >
            Register Venue
          </NuxtLink>
        </div>
      </section>

    </div>
  </div>
</template>