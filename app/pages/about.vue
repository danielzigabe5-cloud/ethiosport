<script setup>
import { ref } from 'vue'

useHead({
  title: 'About Us - EthioSport | Compolojo',
  meta: [
    { name: 'description', content: 'Learn about EthioSport and how we connect sports enthusiasts with venues across Ethiopia.' }
  ]
})

// Platform Stats Data
const stats = [
  { id: 1, label: 'Active Players', value: '10K+', description: 'Engaged sports lovers' },
  { id: 2, label: 'Partner Venues', value: '150+', description: 'Arenas & futsal pitches' },
  { id: 3, label: 'Cities & Sub-Cities', value: '10+', description: 'Expanding coverage' },
  { id: 4, label: 'Games Hosted', value: '25K+', description: 'Successful matches' },
]

// Interactive Focus Tabs
const activeTab = ref('players')

const tabContent = {
  players: {
    title: 'For Athletes & Casual Players',
    desc: 'Never miss a game because of short roster count. Discover active matches nearby, join squads, or host your own match effortlessly.',
    highlights: ['Instant spot reservation', 'Filter by skill level & sub-city', 'Direct organizer contact']
  },
  venues: {
    title: 'For Venue & Arena Owners',
    desc: 'Maximize your venue slot utilization during off-peak hours and manage your booking schedule with zero hassle.',
    highlights: ['Automated booking workflow', 'Real-time revenue metrics', 'Broad player community reach']
  },
  community: {
    title: 'For Sports Communities',
    desc: 'Building healthier and connected neighborhoods in Addis Ababa and beyond through organized match-making.',
    highlights: ['Local tournament hubs', 'Fair match ratings', 'Active sports networks']
  }
}

const subCities = ['Bole', 'Yeka', 'Nifas Silk', 'Arada', 'Kirkos', 'Gullele', 'Lideta']
</script>

<template>
  <div class="min-h-screen bg-slate-50 dark:bg-[#070b10] text-slate-800 dark:text-slate-100 py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden selection:bg-emerald-500 selection:text-white">
    
    <!-- Subtle Background Glows -->
    <div class="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none"></div>
    <div class="absolute bottom-20 right-10 w-[400px] h-[400px] bg-teal-500/10 blur-[140px] rounded-full pointer-events-none"></div>

    <div class="max-w-6xl mx-auto space-y-20 relative z-10">
      
      <!-- Hero Section -->
      <section class="text-center space-y-6 max-w-4xl mx-auto pt-6">
        <div class="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-4 py-1.5 rounded-full shadow-sm">
          <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          About EthioSport & Compolojo
        </div>
        
        <h1 class="text-4xl sm:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.15]">
          Uniting Ethiopian Sports <br class="hidden sm:inline" />
          <span class="bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-500 bg-clip-text text-transparent">
            Communities & Venues
          </span>
        </h1>
        
        <p class="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto">
          EthioSport is Ethiopia's premier sports facility and match-making platform. We connect passionate players with local arenas, eliminating friction in match scheduling and court bookings.
        </p>

        <!-- Sub-cities tags -->
        <div class="pt-2 flex flex-wrap justify-center items-center gap-2">
          <span class="text-xs font-medium text-slate-500 dark:text-slate-400 mr-2">Popular hubs:</span>
          <span 
            v-for="city in subCities" 
            :key="city"
            class="text-xs px-2.5 py-1 bg-white dark:bg-[#131c27] text-slate-700 dark:text-slate-300 rounded-lg border border-slate-200 dark:border-[#212e3e] shadow-xs"
          >
            {{ city }}
          </span>
        </div>
      </section>

      <!-- Stats Grid -->
      <section class="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div 
          v-for="stat in stats" 
          :key="stat.id"
          class="group bg-white dark:bg-[#131c27] p-6 rounded-2xl border border-slate-200 dark:border-[#212e3e] text-center shadow-sm hover:border-emerald-500/50 hover:shadow-lg hover:shadow-emerald-500/5 transition-all duration-300 relative overflow-hidden"
        >
          <div class="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div class="text-3xl sm:text-5xl font-black text-emerald-500 dark:text-emerald-400 tracking-tight group-hover:scale-105 transition-transform duration-300">
            {{ stat.value }}
          </div>
          <div class="text-sm font-bold text-slate-900 dark:text-slate-100 mt-2">{{ stat.label }}</div>
          <div class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{{ stat.description }}</div>
        </div>
      </section>

      <!-- Interactive Focus / Values Section -->
      <section class="space-y-8 bg-white dark:bg-[#131c27] border border-slate-200 dark:border-[#212e3e] rounded-3xl p-6 sm:p-10 shadow-sm">
        <div class="text-center max-w-xl mx-auto space-y-2">
          <h2 class="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">Empowering the Ecosystem</h2>
          <p class="text-sm text-slate-500 dark:text-slate-400">Discover how EthioSport serves every participant in the sports network.</p>
        </div>

        <!-- Tab Buttons -->
        <div class="flex justify-center border-b border-slate-200 dark:border-[#212e3e] pb-4 gap-2 sm:gap-4 overflow-x-auto">
          <button 
            @click="activeTab = 'players'"
            :class="activeTab === 'players' 
              ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/20' 
              : 'bg-slate-100 dark:bg-[#0b111a] text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'"
            class="px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition-all whitespace-nowrap"
          >
            ⚽ For Athletes
          </button>
          <button 
            @click="activeTab = 'venues'"
            :class="activeTab === 'venues' 
              ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/20' 
              : 'bg-slate-100 dark:bg-[#0b111a] text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'"
            class="px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition-all whitespace-nowrap"
          >
            🏟️ For Venues
          </button>
          <button 
            @click="activeTab = 'community'"
            :class="activeTab === 'community' 
              ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/20' 
              : 'bg-slate-100 dark:bg-[#0b111a] text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'"
            class="px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition-all whitespace-nowrap"
          >
            🤝 Community Impact
          </button>
        </div>

        <!-- Tab Display Content -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center pt-4">
          <div class="space-y-4">
            <h3 class="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              {{ tabContent[activeTab].title }}
            </h3>
            <p class="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {{ tabContent[activeTab].desc }}
            </p>
            <ul class="space-y-2 pt-2">
              <li 
                v-for="(point, idx) in tabContent[activeTab].highlights" 
                :key="idx"
                class="flex items-center gap-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300"
              >
                <span class="w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center text-xs font-bold">✓</span>
                {{ point }}
              </li>
            </ul>
          </div>

          <div class="bg-slate-50 dark:bg-[#0b111a] p-6 rounded-2xl border border-slate-200 dark:border-[#212e3e] space-y-4">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-500 flex items-center justify-center text-xl">⚡</div>
              <div>
                <h4 class="font-bold text-sm text-slate-900 dark:text-white">Quick & Reliable Experience</h4>
                <p class="text-xs text-slate-500 dark:text-slate-400">Optimized for fast mobile discovery.</p>
              </div>
            </div>
            <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Whether you're organizing a quick weekend futsal match or running a multi-court facility, our platform adapts to your workflow.
            </p>
          </div>
        </div>
      </section>

      <!-- CTA Section -->
      <section class="relative overflow-hidden bg-gradient-to-br from-emerald-600 via-teal-700 to-slate-900 rounded-3xl p-8 sm:p-14 text-white text-center space-y-6 shadow-2xl">
        <div class="relative z-10 max-w-2xl mx-auto space-y-4">
          <h2 class="text-3xl sm:text-5xl font-black tracking-tight">Ready to Hit the Field?</h2>
          <p class="text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
            Explore active matches across sub-cities in Addis Ababa or register your facility with EthioSport to reach thousands of sports lovers.
          </p>
          <div class="pt-4 flex flex-wrap justify-center gap-4">
            <NuxtLink 
              to="/games" 
              class="px-8 py-3.5 bg-white text-slate-950 hover:bg-emerald-50 font-bold text-xs sm:text-sm rounded-xl shadow-lg transition-transform hover:-translate-y-0.5 active:translate-y-0"
            >
              Find Games Now
            </NuxtLink>
            <NuxtLink 
              to="/business/register" 
              class="px-8 py-3.5 bg-emerald-950/40 hover:bg-emerald-950/70 text-white font-bold text-xs sm:text-sm rounded-xl border border-white/20 transition-all"
            >
              Register Venue
            </NuxtLink>
          </div>
        </div>
      </section>

    </div>
  </div>
</template>