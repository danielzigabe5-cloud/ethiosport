<!-- components/Navbar.vue -->
<template>
  <nav class="sticky top-0 z-40 bg-[#0b0f19]/90 backdrop-blur-md border-b border-slate-800 px-6 py-4">
    <div class="max-w-7xl mx-auto flex justify-between items-center">
      
      <!-- LOGO -->
      <NuxtLink to="/" class="text-2xl font-bold text-white flex items-center gap-2">
        Ethio<span class="text-emerald-500">Sport</span>
      </NuxtLink>

      <!-- NAVIGATION LINKS -->
      <div class="hidden lg:flex items-center gap-7">
        <NuxtLink 
          v-for="link in navLinks" 
          :key="link.path" 
          :to="link.path" 
          class="text-slate-300 hover:text-emerald-400 transition text-sm font-medium"
        >
          {{ link.name }}
        </NuxtLink>
      </div>

      <!-- ACTION BUTTON -->
      <div class="flex items-center gap-3">
        <button 
          @click="isModalOpen = true"
          class="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl transition shadow-lg shadow-emerald-500/20 cursor-pointer transform hover:scale-105"
        >
          ይጀምሩ (Get Started)
        </button>

        <!-- Mobile Hamburger -->
        <button @click="isMobileMenuOpen = !isMobileMenuOpen" class="lg:hidden text-white focus:outline-none ml-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </div>
    </div>

    <!-- MOBILE MENU -->
    <Transition name="slide">
      <div v-if="isMobileMenuOpen" class="lg:hidden absolute top-full left-0 w-full bg-[#0b0f19] border-b border-slate-800 p-6 space-y-4 shadow-xl">
        <NuxtLink 
          v-for="link in navLinks" 
          :key="link.path" 
          :to="link.path" 
          @click="isMobileMenuOpen = false"
          class="block text-slate-300 hover:text-emerald-400 text-lg font-medium"
        >
          {{ link.name }}
        </NuxtLink>

        <div class="pt-2 border-t border-slate-800">
          <button 
            @click="isMobileMenuOpen = false; isModalOpen = true"
            class="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm py-3 rounded-xl transition shadow-lg shadow-emerald-500/20 text-center"
          >
            ይጀምሩ (Get Started)
          </button>
        </div>
      </div>
    </Transition>

    <!-- 💡 ClientOnly እና Teleport ን በመጠቀም ሞዳሉን ከ Navbar ወሰን በፍጹም ነፃ እናደርገዋለን -->
    <ClientOnly>
      <Teleport to="body">
        <GetStartedModal 
          :is-open="isModalOpen" 
          @close="isModalOpen = false" 
        />
      </Teleport>
    </ClientOnly>
  </nav>
</template>

<script setup>
import { ref } from 'vue'
import GetStartedModal from '~/components/GetStartedModal.vue'

const isMobileMenuOpen = ref(false)
const isModalOpen = ref(false)

const navLinks = [
  { name: 'home', path: '/' },
  { name: 'features', path: '/features' },
  { name: 'venues', path: '/venues' },
  { name: 'games', path: '/games' },
  { name: 'Just Play', path: '/justplay' },
  { name: 'Events', path: '/events' },
  { name: 'blogs', path: '/blogs' },
  { name: 'contact', path: '/contact' },
]
</script>

<style scoped>
.router-link-active {
  color: #10b981;
}
.slide-enter-active, .slide-leave-active {
  transition: all 0.3s ease-out;
}
.slide-enter-from, .slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>