<template>
  <nav class="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-md border-b border-slate-900 px-6 py-4">
    <div class="max-w-7xl mx-auto flex justify-between items-center">
      
      <!-- 1. ሎጎ (Logo) -->
      <NuxtLink to="/" class="text-2xl font-bold text-white flex items-center gap-2">
        Ethio<span class="text-emerald-500">Sport</span>
      </NuxtLink>

      <!-- 2. ዋና ሊንኮች (ለኮምፒውተር) -->
      <div class="hidden lg:flex items-center gap-7">
        <NuxtLink v-for="link in navLinks" :key="link.path" :to="link.path" 
          class="text-slate-300 hover:text-emerald-400 transition text-sm font-medium active-link">
          {{ link.name }}
        </NuxtLink>
      </div>

      <!-- 3. የሎጊን በተን (Login Button) -->
      <div class="flex items-center gap-4">
        <NuxtLink to="/login" 
          class="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold rounded-full transition-all shadow-lg shadow-emerald-900/20 transform hover:scale-105">
          ይግቡ (Login)
        </NuxtLink>

        <!-- ለሞባይል ሜኑ መክፈቻ (Hamburger Icon) -->
        <button @click="isMobileMenuOpen = !isMobileMenuOpen" class="lg:hidden text-white focus:outline-none">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </div>
    </div>

    <!-- 4. የሞባይል ሜኑ (Mobile Menu) -->
    <Transition name="slide">
      <div v-if="isMobileMenuOpen" class="lg:hidden absolute top-full left-0 w-full bg-slate-900 border-b border-slate-800 p-6 space-y-4 shadow-xl">
        <NuxtLink v-for="link in navLinks" :key="link.path" :to="link.path" @click="isMobileMenuOpen = false"
          class="block text-slate-300 hover:text-emerald-400 text-lg font-medium">
          {{ link.name }}
        </NuxtLink>
      </div>
    </Transition>
  </nav>
</template>

<script setup>
import { ref } from 'vue'

const isMobileMenuOpen = ref(false)

// የናቭባር ሊንኮች ዝርዝር
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
/* አክቲቭ የሆነው ሊንክ ላይ ከለር እንዲቀይር (አማራጭ) */
.router-link-active {
  color: #10b981; /* emerald-500 */
}

/* ለሞባይል ሜኑ አኒሜሽን */
.slide-enter-active, .slide-leave-active {
  transition: all 0.3s ease-out;
}
.slide-enter-from, .slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>