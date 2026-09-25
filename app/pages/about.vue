<script setup lang="ts">
import { ref } from 'vue'

// assets/images/venuess12.png Import ማድረግ
import venueImg from '~/assets/images/venuess12.png'

useHead({
  title: 'About Us - EthioSport | Compolojo',
  meta: [
    { name: 'description', content: 'Learn about EthioSport & Compolojo and how we connect sports enthusiasts with venues across Ethiopia.' }
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
const activeTab = ref<'players' | 'venues' | 'community'>('players')

const tabContent = {
  players: {
    title: 'For Athletes & Casual Players',
    desc: 'Never miss a game because of a short roster count. Discover active matches nearby, join squads, or host your own match effortlessly with Compolojo.',
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
    title: 'Real-Time Pitch Availability',
    desc: 'See live slot openings for futsal, basketball, and football pitches near you instantly.',
    icon: '⚡'
  },
  {
    title: 'Seamless Digital Payments',
    desc: 'Pay for your bookings securely with integrated mobile payment solutions.',
    icon: '💳'
  },
  {
    title: 'Smart Match-Maker Engine',
    desc: 'Find players of similar skill levels when you need extra teammates for your games.',
    icon: '🎯'
  }
]

// Testimonials
const reviews = [
  {
    name: 'Abebe Tadesse',
    role: 'Amateur Footballer',
    comment: 'Finding a weekend match around Bole used to take hours of phone calls. Compolojo & EthioSport solved that completely!',
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
  <div class="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-emerald-500 selection:text-white">
    
    <!-- 1. Hero Section (ምንም overlay ማጨለሚያ የሌለው ጥርት ያለ) -->
    <section class="relative pt-12 pb-16 px-4 sm:px-6 lg:px-8 border-b border-slate-200 overflow-hidden bg-slate-900">
      
      <!-- Background Image -->
      <img 
        :src="venueImg" 
        alt="Compolojo Sports Venue Background" 
        class="absolute inset-0 w-full h-full object-cover object-center z-0"
      />

      <!-- Hero Content -->
      <div class="max-w-4xl mx-auto text-center space-y-4 relative z-10">
        
        <!-- Top Badge -->
        <div class="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-300 bg-slate-900/85 border border-emerald-400/40 px-4 py-1 rounded-full shadow-lg backdrop-blur-md">
          <span class="relative flex h-2 w-2">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
          </span>
          About EthioSport & Compolojo
        </div>
        
        <!-- Main Title -->
        <h1 class="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight [text-shadow:_0_2px_10px_rgba(0,0,0,0.8)]">
          Uniting Ethiopian Sports <br class="hidden sm:inline" />
          <span class="bg-gradient-to-r from-emerald-400 via-amber-300 to-rose-400 bg-clip-text text-transparent">
            Communities & Venues
          </span>
        </h1>
        
        <!-- Subtitle -->
        <p class="text-xs sm:text-sm text-white leading-relaxed max-w-2xl mx-auto font-semibold [text-shadow:_0_2px_8px_rgba(0,0,0,0.9)]">
          Compolojo is Ethiopia's premier sports facility management & match-making platform. We connect passionate players with local arenas effortlessly.
        </p>

        <!-- Popular Hubs -->
        <div class="pt-3">
          <div class="bg-slate-950/80 backdrop-blur-md border border-white/20 rounded-xl p-3.5 max-w-2xl mx-auto shadow-2xl">
            <h3 class="text-[11px] font-bold text-amber-300 uppercase tracking-widest mb-2">
              📍 Popular Hubs Covered
            </h3>
            <div class="flex flex-wrap justify-center items-center gap-1.5">
              <span 
                v-for="city in subCities" 
                :key="city"
                class="text-xs px-3 py-1 bg-slate-900 hover:bg-emerald-600 text-white rounded-lg border border-white/20 transition-all cursor-default font-medium shadow-sm"
              >
                {{ city }}
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>

    <!-- 2. Stats Section -->
    <section class="py-10 md:py-12 bg-slate-50 px-4 sm:px-6 lg:px-8 relative z-10 -mt-8">
      <div class="max-w-7xl mx-auto">
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div 
            v-for="stat in stats" 
            :key="stat.id"
            class="group bg-white p-6 rounded-2xl border border-slate-200/80 text-center shadow-lg shadow-slate-200/50 hover:border-emerald-500/50 hover:-translate-y-1 transition-all duration-300"
          >
            <div class="text-2xl mb-2">{{ stat.icon }}</div>
            <div class="text-3xl sm:text-4xl font-black text-emerald-600 tracking-tight group-hover:scale-105 transition-transform duration-300">
              {{ stat.value }}
            </div>
            <div class="text-sm font-bold text-slate-800 mt-2">{{ stat.label }}</div>
            <div class="text-xs text-slate-500 mt-1">{{ stat.description }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- 3. Mission & Vision Section -->
    <section class="py-12 bg-white px-4 sm:px-6 lg:px-8 border-y border-slate-100">
      <div class="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        <div class="bg-slate-50 p-8 rounded-3xl border border-slate-200/80 space-y-4 hover:shadow-md transition-shadow duration-300">
          <div class="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center text-2xl font-bold border border-emerald-200 shadow-sm">🎯</div>
          <h3 class="text-xl lg:text-2xl font-bold text-slate-900">Our Mission</h3>
          <p class="text-sm text-slate-600 leading-relaxed">
            To empower sports lovers in Ethiopia by creating a seamless digital network through Compolojo, where court booking, player match-making, and community building happen instantly.
          </p>
        </div>

        <div class="bg-slate-50 p-8 rounded-3xl border border-slate-200/80 space-y-4 hover:shadow-md transition-shadow duration-300">
          <div class="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center text-2xl font-bold border border-amber-200 shadow-sm">🚀</div>
          <h3 class="text-xl lg:text-2xl font-bold text-slate-900">Our Vision</h3>
          <p class="text-sm text-slate-600 leading-relaxed">
            To make Compolojo East Africa's leading athletic community hub, digitizing sports facilities and inspiring healthier, active lifestyles in every neighborhood.
          </p>
        </div>
      </div>
    </section>

    <!-- 4. Core Features Section -->
    <section class="py-12 md:py-16 bg-slate-50 px-4 sm:px-6 lg:px-8">
      <div class="max-w-6xl mx-auto">
        <div class="text-center max-w-2xl mx-auto space-y-2 mb-10">
          <h2 class="text-2xl sm:text-3xl font-bold text-slate-900">Why Choose Compolojo?</h2>
          <p class="text-sm text-slate-500">Everything you need for an unmatched sports experience.</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div v-for="(feat, idx) in features" :key="idx" class="bg-white p-6 rounded-3xl border border-slate-200/80 space-y-3 hover:border-emerald-500/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <div class="text-3xl bg-slate-50 w-14 h-14 rounded-2xl flex items-center justify-center">{{ feat.icon }}</div>
            <h3 class="text-lg font-bold text-slate-900">{{ feat.title }}</h3>
            <p class="text-sm text-slate-500 leading-relaxed">{{ feat.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 5. Interactive Focus / Ecosystem Section -->
    <section class="py-12 md:py-16 bg-white px-4 sm:px-6 lg:px-8 border-y border-slate-100">
      <div class="max-w-5xl mx-auto space-y-8">
        <div class="text-center max-w-2xl mx-auto space-y-2">
          <h2 class="text-2xl sm:text-3xl font-bold text-slate-900">Empowering the Ecosystem</h2>
          <p class="text-sm text-slate-500">Tailored solutions for every member of our sports community.</p>
        </div>

        <!-- Tab Buttons -->
        <div class="flex justify-center border-b border-slate-200 pb-2 gap-2 sm:gap-4 overflow-x-auto px-2">
          <button 
            @click="activeTab = 'players'"
            :class="activeTab === 'players' 
              ? 'bg-emerald-600 text-white font-bold shadow-lg shadow-emerald-600/30 -translate-y-0.5' 
              : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200'"
            class="px-5 py-3 rounded-xl font-bold text-xs sm:text-sm transition-all whitespace-nowrap duration-300"
          >
            ⚽ For Athletes
          </button>
          <button 
            @click="activeTab = 'venues'"
            :class="activeTab === 'venues' 
              ? 'bg-emerald-600 text-white font-bold shadow-lg shadow-emerald-600/30 -translate-y-0.5' 
              : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200'"
            class="px-5 py-3 rounded-xl font-bold text-xs sm:text-sm transition-all whitespace-nowrap duration-300"
          >
            🏟️ For Venues
          </button>
          <button 
            @click="activeTab = 'community'"
            :class="activeTab === 'community' 
              ? 'bg-emerald-600 text-white font-bold shadow-lg shadow-emerald-600/30 -translate-y-0.5' 
              : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200'"
            class="px-5 py-3 rounded-xl font-bold text-xs sm:text-sm transition-all whitespace-nowrap duration-300"
          >
            🤝 Community Impact
          </button>
        </div>

        <!-- Tab Content -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center pt-4">
          <div class="space-y-4">
            <h3 class="text-xl sm:text-2xl font-bold text-slate-900">
              {{ tabContent[activeTab].title }}
            </h3>
            <p class="text-sm text-slate-600 leading-relaxed">
              {{ tabContent[activeTab].desc }}
            </p>
            <ul class="space-y-3 pt-2">
              <li 
                v-for="(point, idx) in tabContent[activeTab].highlights" 
                :key="idx"
                class="flex items-center gap-3 text-sm text-slate-700 font-medium"
              >
                <span class="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold shadow-sm">✓</span>
                {{ point }}
              </li>
            </ul>
          </div>

          <!-- Dynamic Side Panel / Venue Image Preview -->
          <div class="bg-slate-50 p-6 rounded-3xl border border-slate-200/80 space-y-4 shadow-sm">
            <div v-if="activeTab === 'venues'" class="rounded-xl overflow-hidden border border-slate-200 shadow-sm">
              <img :src="venueImg" alt="Venue Management" class="w-full h-40 object-cover" />
            </div>
            
            <div class="flex items-start gap-3">
              <div class="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex shrink-0 items-center justify-center text-xl shadow-sm">⚡</div>
              <div>
                <h4 class="font-bold text-sm text-slate-900 mb-0.5">Fast Mobile Discovery</h4>
                <p class="text-xs text-slate-500">Optimized for low bandwidth & high speed.</p>
              </div>
            </div>
            <p class="text-xs text-slate-600 leading-relaxed border-t border-slate-200 pt-3">
              Whether you're organizing a quick weekend futsal match or running a multi-court facility, Compolojo adapts to your workflow seamlessly.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- 6. Testimonials Section -->
    <section class="py-12 md:py-16 bg-slate-50 px-4 sm:px-6 lg:px-8">
      <div class="max-w-5xl mx-auto">
        <div class="text-center max-w-2xl mx-auto space-y-2 mb-10">
          <h2 class="text-2xl sm:text-3xl font-bold text-slate-900">Loved by Players & Venues</h2>
          <p class="text-sm text-slate-500">Here is what people are saying about Compolojo.</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div v-for="(rev, idx) in reviews" :key="idx" class="bg-white p-6 rounded-3xl border border-slate-200/80 space-y-4 shadow-md shadow-slate-200/50">
            <p class="text-sm italic text-slate-600 leading-relaxed">"{{ rev.comment }}"</p>
            <div class="flex items-center gap-3 pt-3 border-t border-slate-100">
              <div class="text-3xl bg-slate-50 w-10 h-10 rounded-full flex items-center justify-center">{{ rev.avatar }}</div>
              <div>
                <div class="text-sm font-bold text-slate-900">{{ rev.name }}</div>
                <div class="text-xs text-emerald-600 font-bold uppercase tracking-wider mt-0.5">{{ rev.role }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 7. CTA Section -->
    <section class="py-12 md:py-16 px-4 sm:px-6 lg:px-8 bg-white mb-10">
      <div class="max-w-5xl mx-auto">
        <div class="relative overflow-hidden bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-800 rounded-3xl p-8 sm:p-14 text-white text-center shadow-xl">
          
          <!-- Background Glows -->
          <div class="absolute top-0 right-0 w-64 h-64 bg-amber-300/20 rounded-full blur-3xl pointer-events-none"></div>
          <div class="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>

          <div class="relative z-10 max-w-3xl mx-auto space-y-6">
            <h2 class="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight drop-shadow-sm">
              Ready to Hit the Field with <br class="hidden sm:inline" />
              <span class="text-amber-300">Compolojo</span>?
            </h2>
            <p class="text-sm sm:text-base text-emerald-100 leading-relaxed max-w-xl mx-auto">
              Explore active matches across sub-cities in Addis Ababa or register your venue with EthioSport.
            </p>
            
            <div class="pt-4 flex flex-wrap justify-center gap-4">
              <NuxtLink 
                to="/games" 
                class="px-6 py-3 bg-white hover:bg-emerald-50 text-emerald-950 font-bold text-sm rounded-xl shadow-lg transition-all hover:-translate-y-1 active:translate-y-0"
              >
                ⚽ Find Games Now
              </NuxtLink>
              <NuxtLink 
                to="/business/register" 
                class="px-6 py-3 bg-emerald-900/50 hover:bg-emerald-900 text-white font-bold text-sm rounded-xl border border-white/30 backdrop-blur-sm transition-all hover:-translate-y-1 active:translate-y-0"
              >
                🏟️ Register Venue
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>