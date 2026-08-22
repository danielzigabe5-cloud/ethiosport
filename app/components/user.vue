<script setup>
import { ref } from 'vue'

// በFrontend በኩል Login ማድረጉን የሚያሳውቅ State
const isLoggedIn = ref(true)

const userProfile = ref({
  name: 'አበበ በቀለ',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250'
})
</script>

<template>
  <header class="bg-[#0b111a] border-b border-[#1a2432] px-4 sm:px-8 py-4 flex justify-between items-center sticky top-0 z-40">
    <NuxtLink to="/" class="text-xl font-extrabold text-emerald-400 tracking-wider">
      ETHIOSPORT
    </NuxtLink>

    <!-- Navigation Links -->
    <nav class="hidden md:flex items-center gap-6 text-xs font-semibold text-slate-300">
      <NuxtLink to="/" class="hover:text-emerald-400 transition">Home</NuxtLink>
      <NuxtLink to="/venues" class="hover:text-emerald-400 transition">Venues</NuxtLink>
      <NuxtLink to="/events" class="hover:text-emerald-400 transition">Events</NuxtLink>
      <NuxtLink to="/justplay" class="hover:text-emerald-400 transition">JustPlay</NuxtLink>
    </nav>

    <!-- Auth Actions -->
    <div class="flex items-center gap-3">
      <!-- ተጠቃሚው Login ካላደረገ የሚታይ -->
      <template v-if="!isLoggedIn">
    
        <NuxtLink to="/auth" class="text-xs font-semibold text-white bg-emerald-500 px-3 py-2 rounded-lg hover:bg-emerald-600 transition">
          login
        </NuxtLink>
      </template>

      <!-- ተጠቃሚው Login ካደረገ የሚታይ (Profile Avatar) -->
      <template v-else>
        <div class="flex items-center gap-3">
          <NuxtLink to="/dashboard" class="flex items-center gap-2 bg-[#131c27] border border-[#212e3e] px-3 py-1.5 rounded-2xl hover:border-emerald-500/50 transition">
            <img :src="userProfile.avatar" alt="User Avatar" class="w-7 h-7 rounded-xl object-cover border border-emerald-500" />
            <span class="text-xs font-semibold text-white hidden sm:inline">{{ userProfile.name }}</span>
          </NuxtLink>
          <button @click="isLoggedIn = false" class="text-[11px] font-semibold text-rose-400 hover:underline cursor-pointer">
            ወጣ (Logout)
          </button>
        </div>
      </template>
    </div>
  </header>
</template>