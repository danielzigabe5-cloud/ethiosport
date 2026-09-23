<script setup lang="ts">
import { ref } from 'vue'

useHead({
  title: 'About Us - EthioSport | Compolojo',
  meta: [
    { name: 'description', content: 'Learn about EthioSport and how we connect sports enthusiasts with venues across Ethiopia.' }
  ]
})

// Platform Stats Data
const stats = [
  { id: 1, label: 'Active Players', value: '10K+', description: 'Engaged sports lovers', icon: '⚽' },
  { id: 2, label: 'Partner Venues', value: '150+', description: 'Arenas & futsal pitches', icon: '🏟️' },
  { id: 3, label: 'Cities Covered', value: '10+', description: 'Expanding nationwide', icon: '📍' },
  { id: 4, label: 'Games Hosted', value: '25K+', description: 'Successful matches', icon: '🔥' },
]

// Interactive Focus Tabs
const activeTab = ref('players')

const tabContent = {
  players: {
    title: 'For Athletes & Casual Players',
    desc: 'Never miss a game because of a short roster count. Discover active matches nearby, join squads, or host your own match effortlessly with a single tap.',
    highlights: ['Instant spot reservation', 'Filter by skill level & sub-city', 'Direct organizer contact & chat']
  },
  venues: {
    title: 'For Venue & Arena Owners',
    desc: 'Maximize your venue slot utilization during off-peak hours and manage your booking schedule with zero operational hassle.',
    highlights: ['Automated booking workflow', 'Real-time revenue metrics', 'Broad player community reach']
  },
  community: {
    title: 'For Sports Communities',
    desc: 'Building healthier, more active, and connected neighborhoods across Ethiopian cities through organized match-making.',
    highlights: ['Local tournament hubs', 'Fair match ratings & badges', 'Active sports networks']
  }
}

// Core Features
const features = [
  {
    title: 'Real-Time Availability',
    desc: 'See live slot openings for futsal, basketball, and football pitches near you instantly.',
    icon: '⚡'
  },
  {
    title: 'Seamless Payments',
    desc: 'Pay for your bookings securely with integrated mobile payment solutions.',
    icon: '💳'
  },
  {
    title: 'Match-Maker Engine',
    desc: 'Find players of similar skill levels when you need extra teammates for your games.',
    icon: '🎯'
  }
]

// Testimonials
const reviews = [
  {
    name: 'Abebe Tadesse',
    role: 'Amateur Footballer',
    comment: 'Finding a weekend match around Bole used to take hours of phone calls. EthioSport solved that completely!',
    avatar: '👨‍💼'
  },
  {
    name: 'Selam Hailu',
    role: 'Arena Owner',
    comment: 'Our venue slot occupancy increased by 40% after listing on Compolojo. Highly recommended for arena owners.',
    avatar: '👩‍💼'
  }
]

const subCities = ['Bole', 'Yeka', 'Nifas Silk', 'Arada', 'Kirkos', 'Gullele', 'Lideta', 'Hawassa', 'Bahir Dar']
</script>

<template>
  <div class="min-h-screen bg-slate-50 dark:bg-[#070b10] text-slate-800 dark:text-slate-100 py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden selection:bg-emerald-500 selection:text-white">
    
    <!-- Background Light Effects -->
    <div class="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-emerald-500/15 blur-[140px] rounded-full pointer-events-none"></div>
    <div class="absolute top-1/2 right-10 w-[450px] h-[450px] bg-teal-500/10 blur-[150px] rounded-full pointer-events-none"></div>

    <div class="max-w-6xl mx-auto space-y-24 relative z-10">
      
      <!-- Hero Section -->
      <section class="text-center space-y-6 max-w-4xl mx-auto pt-4">
        <div class="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-4 py-1.5 rounded-full shadow-sm">
          <span class="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
          About EthioSport & Compolojo
        </div>
        
        <h1 class="text-4xl sm:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.12]">
          Uniting Ethiopian Sports <br class="hidden sm:inline" />
          <span class="bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-500 bg-clip-text text-transparent">
            Communities & Venues
          </span>
        </h1>
        
        <p class="text-base sm:text-xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto font-normal">
          EthioSport is Ethiopia's premier sports facility and match-making platform. We connect passionate players with local arenas, eliminating friction in match scheduling and court bookings.
        </p>

        <!-- Sub-cities tags -->
        <div class="pt-4 flex flex-wrap justify-center items-center gap-2">
          <span class="text-xs font-semibold text-slate-400 uppercase tracking-wider mr-2">Popular Hubs:</span>
          <span 
            v-for="city in subCities" 
            :key="city"
            class="text-xs px-3 py-1.5 bg-white dark:bg-[#131c27] text-slate-700 dark:text-slate-300 rounded-xl border border-slate-200 dark:border-[#212e3e] shadow-xs hover:border-emerald-500 transition-colors duration-200"
          >
            📍 {{ city }}
          </span>
        </div>
      </section>

      <!-- Stats Grid -->
      <section class="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div 
          v-for="stat in stats" 
          :key="stat.id"
          class="group bg-white dark:bg-[#131c27] p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-[#212e3e] text-center shadow-sm hover:border-emerald-500/50 hover:shadow-xl hover:shadow-emerald-500/10 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
        >
          <div class="text-2xl mb-2">{{ stat.icon }}</div>
          <div class="text-3xl sm:text-5xl font-black text-emerald-500 dark:text-emerald-400 tracking-tight group-hover:scale-105 transition-transform duration-300">
            {{ stat.value }}
          </div>
          <div class="text-sm font-bold text-slate-900 dark:text-slate-100 mt-2">{{ stat.label }}</div>
          <div class="text-xs text-slate-500 dark:text-slate-400 mt-1">{{ stat.description }}</div>
        </div>
      </section>

      <!-- Mission & Vision Cards -->
      <section class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div class="bg-gradient-to-br from-emerald-500/10 via-transparent to-transparent bg-white dark:bg-[#131c27] p-8 rounded-3xl border border-slate-200 dark:border-[#212e3e] space-y-4 shadow-sm">
          <div class="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-500 flex items-center justify-center text-2xl font-bold">🎯</div>
          <h3 class="text-2xl font-bold text-slate-900 dark:text-white">Our Mission</h3>
          <p class="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            To empower sports lovers in Ethiopia by creating a seamless digital network where court booking, player match-making, and community building happen instantly.
          </p>
        </div>

        <div class="bg-gradient-to-br from-teal-500/10 via-transparent to-transparent bg-white dark:bg-[#131c27] p-8 rounded-3xl border border-slate-200 dark:border-[#212e3e] space-y-4 shadow-sm">
          <div class="w-12 h-12 rounded-2xl bg-teal-500/20 text-teal-400 flex items-center justify-center text-2xl font-bold">🚀</div>
          <h3 class="text-2xl font-bold text-slate-900 dark:text-white">Our Vision</h3>
          <p class="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            To become East Africa's leading athletic community hub, digitizing sports facilities and inspiring healthier, active lifestyles in every neighborhood.
          </p>
        </div>
      </section>

      <!-- Core Features Section -->
      <section class="space-y-8">
        <div class="text-center max-w-xl mx-auto space-y-2">
          <h2 class="text-2xl sm:text-4xl font-bold text-slate-900 dark:text-white">Why Choose EthioSport?</h2>
          <p class="text-sm text-slate-500 dark:text-slate-400">Everything you need for an unmatched sports experience.</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div v-for="(feat, idx) in features" :key="idx" class="bg-white dark:bg-[#131c27] p-6 rounded-3xl border border-slate-200 dark:border-[#212e3e] space-y-3 hover:border-emerald-500/40 transition-all shadow-xs">
            <div class="text-3xl">{{ feat.icon }}</div>
            <h3 class="text-lg font-bold text-slate-900 dark:text-white">{{ feat.title }}</h3>
            <p class="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{{ feat.desc }}</p>
          </div>
        </div>
      </section>

      <!-- Interactive Focus / Values Section -->
      <section class="space-y-8 bg-white dark:bg-[#131c27] border border-slate-200 dark:border-[#212e3e] rounded-3xl p-6 sm:p-12 shadow-sm">
        <div class="text-center max-w-xl mx-auto space-y-2">
          <h2 class="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">Empowering the Ecosystem</h2>
          <p class="text-sm text-slate-500 dark:text-slate-400">Tailored solutions for every member of our community.</p>
        </div>

        <!-- Tab Buttons -->
        <div class="flex justify-center border-b border-slate-200 dark:border-[#212e3e] pb-4 gap-2 sm:gap-4 overflow-x-auto">
          <button 
            @click="activeTab = 'players'"
            :class="activeTab === 'players' 
              ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/25 scale-105' 
              : 'bg-slate-100 dark:bg-[#0b111a] text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'"
            class="px-6 py-3 rounded-2xl font-bold text-xs sm:text-sm transition-all whitespace-nowrap duration-200"
          >
            ⚽ For Athletes
          </button>
          <button 
            @click="activeTab = 'venues'"
            :class="activeTab === 'venues' 
              ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/25 scale-105' 
              : 'bg-slate-100 dark:bg-[#0b111a] text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'"
            class="px-6 py-3 rounded-2xl font-bold text-xs sm:text-sm transition-all whitespace-nowrap duration-200"
          >
            🏟️ For Venues
          </button>
          <button 
            @click="activeTab = 'community'"
            :class="activeTab === 'community' 
              ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/25 scale-105' 
              : 'bg-slate-100 dark:bg-[#0b111a] text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'"
            class="px-6 py-3 rounded-2xl font-bold text-xs sm:text-sm transition-all whitespace-nowrap duration-200"
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
            <ul class="space-y-2.5 pt-2">
              <li 
                v-for="(point, idx) in tabContent[activeTab].highlights" 
                :key="idx"
                class="flex items-center gap-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium"
              >
                <span class="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center text-xs font-bold">✓</span>
                {{ point }}
              </li>
            </ul>
          </div>

          <div class="bg-slate-50 dark:bg-[#0b111a] p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-[#212e3e] space-y-4">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-500 flex items-center justify-center text-xl">⚡</div>
              <div>
                <h4 class="font-bold text-sm text-slate-900 dark:text-white">Fast Mobile Discovery</h4>
                <p class="text-xs text-slate-500 dark:text-slate-400">Optimized for low bandwidth & speed.</p>
              </div>
            </div>
            <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Whether you're organizing a quick weekend futsal match or running a multi-court facility, our platform adapts to your workflow seamlessly.
            </p>
          </div>
        </div>
      </section>

      <!-- Testimonials -->
      <section class="space-y-8">
        <div class="text-center max-w-xl mx-auto space-y-2">
          <h2 class="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">Loved by Players & Owners</h2>
          <p class="text-sm text-slate-500 dark:text-slate-400">Here is what people are saying about EthioSport.</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div v-for="(rev, idx) in reviews" :key="idx" class="bg-white dark:bg-[#131c27] p-6 rounded-3xl border border-slate-200 dark:border-[#212e3e] space-y-4 shadow-xs">
            <p class="text-sm italic text-slate-600 dark:text-slate-300">"{{ rev.comment }}"</p>
            <div class="flex items-center gap-3 pt-2">
              <div class="text-2xl">{{ rev.avatar }}</div>
              <div>
                <div class="text-xs font-bold text-slate-900 dark:text-white">{{ rev.name }}</div>
                <div class="text-[11px] text-slate-400">{{ rev.role }}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- CTA Section -->
      <section class="relative overflow-hidden bg-gradient-to-br from-emerald-600 via-teal-700 to-slate-950 rounded-3xl p-8 sm:p-16 text-white text-center space-y-6 shadow-2xl border border-emerald-500/20">
        <div class="relative z-10 max-w-2xl mx-auto space-y-4">
          <h2 class="text-3xl sm:text-5xl font-black tracking-tight">Ready to Hit the Field?</h2>
          <p class="text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
            Explore active matches across sub-cities in Addis Ababa or register your facility with EthioSport to reach thousands of sports lovers.
          </p>
          <div class="pt-4 flex flex-wrap justify-center gap-4">
            <NuxtLink 
              to="/games" 
              class="px-8 py-4 bg-white text-slate-950 hover:bg-emerald-50 font-extrabold text-xs sm:text-sm rounded-2xl shadow-xl transition-all hover:scale-105 active:scale-100"
            >
              ⚽ Find Games Now
            </NuxtLink>
            <NuxtLink 
              to="/business/register" 
              class="px-8 py-4 bg-emerald-950/60 hover:bg-emerald-900/80 text-white font-extrabold text-xs sm:text-sm rounded-2xl border border-white/20 transition-all hover:scale-105 active:scale-100"
            >
              🏟️ Register Venue
            </NuxtLink>
          </div>
        </div>
      </section>

    </div>
  </div>
</template>