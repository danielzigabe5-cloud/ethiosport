<template>
  <footer class="bg-[#0f172a] text-slate-200 pt-16 pb-8 border-t-4 border-emerald-500">
    <div class="container mx-auto px-6">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
        
        <!-- Column 1: Brand & About -->
        <div class="flex flex-col space-y-5">
          <NuxtLink to="/" class="flex flex-col items-start group">
            <img 
              :src="'/logo.png'" 
              alt="COMBOLOJO Logo" 
              class="h-9 w-auto object-contain transition-transform group-hover:scale-105 duration-300"
              @error="$event.target.style.display='none'"
            />
            <span class="text-lg font-black tracking-tight leading-none mt-1">
              <span class="text-emerald-400">COMBO</span><span class="text-amber-400">LOJO</span>
            </span>
          </NuxtLink>
          <p class="text-slate-400 text-sm leading-relaxed">
            Your premier destination for booking sports fields, stadium venues, tournaments, and recreational facilities across Ethiopia.
          </p>
          <div class="flex space-x-3 pt-2">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" class="w-9 h-9 bg-slate-800 rounded-lg hover:bg-emerald-500 hover:text-slate-950 transition-all flex items-center justify-center text-white font-bold text-xs">FB</a>
            <a href="https://t.me" target="_blank" rel="noopener noreferrer" aria-label="Telegram" class="w-9 h-9 bg-slate-800 rounded-lg hover:bg-emerald-500 hover:text-slate-950 transition-all flex items-center justify-center text-white font-bold text-xs">TG</a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube" class="w-9 h-9 bg-slate-800 rounded-lg hover:bg-emerald-500 hover:text-slate-950 transition-all flex items-center justify-center text-white font-bold text-xs">YT</a>
          </div>
        </div>

        <!-- Column 2: Quick Links (ወደ ተለያዩ ገጾች የተያያዙ) -->
        <div>
          <h3 class="text-white font-bold mb-6 uppercase tracking-widest text-xs border-b border-slate-800 pb-2">Quick Links</h3>
          <ul class="space-y-3 text-slate-400 text-sm">
            <li><NuxtLink to="/" class="hover:text-emerald-400 transition-all flex items-center gap-2"><span class="text-xs text-emerald-500">›</span> Home</NuxtLink></li>
            <li><NuxtLink to="/fields" class="hover:text-emerald-400 transition-all flex items-center gap-2"><span class="text-xs text-emerald-500">›</span> Explore Fields</NuxtLink></li>
            <li><NuxtLink to="/tournaments" class="hover:text-emerald-400 transition-all flex items-center gap-2"><span class="text-xs text-emerald-500">›</span> Tournaments</NuxtLink></li>
            <li><NuxtLink to="/pricing" class="hover:text-emerald-400 transition-all flex items-center gap-2"><span class="text-xs text-emerald-500">›</span> Pricing & Rates</NuxtLink></li>
            <li><NuxtLink to="/venues/create" class="hover:text-amber-400 transition-all flex items-center gap-2"><span class="text-xs text-amber-400">★</span> List Your Venue</NuxtLink></li>
          </ul>
        </div>

        <!-- Column 3: Support & Information -->
        <div>
          <h3 class="text-white font-bold mb-6 uppercase tracking-widest text-xs border-b border-slate-800 pb-2">Support & Info</h3>
          <ul class="space-y-3 text-slate-400 text-sm">
            <li><NuxtLink to="/about" class="hover:text-emerald-400 transition-all flex items-center gap-2"><span class="text-xs text-emerald-500">›</span> About Us</NuxtLink></li>
            <li><NuxtLink to="/contact" class="hover:text-emerald-400 transition-all flex items-center gap-2"><span class="text-xs text-emerald-500">›</span> Contact Us</NuxtLink></li>
            <li><NuxtLink to="/auth" class="hover:text-emerald-400 transition-all flex items-center gap-2"><span class="text-xs text-emerald-500">›</span> Sign In / Register</NuxtLink></li>
            <li><NuxtLink to="/about" class="hover:text-emerald-400 transition-all flex items-center gap-2"><span class="text-xs text-emerald-500">›</span> Privacy Policy & Terms</NuxtLink></li>
          </ul>
        </div>

        <!-- Column 4: Newsletter -->
        <div>
          <h3 class="text-white font-bold mb-6 uppercase tracking-widest text-xs border-b border-slate-800 pb-2">Stay Updated</h3>
          <p class="text-slate-400 text-sm mb-4">Subscribe to get instant updates on pitch availability and local sports events.</p>
          <form @submit.prevent="handleSubscribe" class="flex flex-col gap-2.5">
            <input 
              v-model="email"
              type="email" 
              required
              placeholder="Enter your email..." 
              class="w-full bg-slate-800/80 border border-slate-700/60 rounded-lg py-2.5 px-4 text-sm text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all placeholder:text-slate-500"
            />
            <button type="submit" class="w-full bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold py-2.5 rounded-lg transition-all shadow-lg shadow-emerald-500/10 active:scale-[0.98]">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="border-t border-slate-800/80 pt-8 flex flex-col md:flex-row justify-between items-center text-slate-500 text-xs gap-4">
        <p>© {{ currentYear }} COMBOLOJO Platform. All Rights Reserved.</p>
        <div class="flex items-center space-x-6">
          <NuxtLink to="/about" class="hover:text-slate-400 transition-colors">Privacy</NuxtLink>
          <NuxtLink to="/about" class="hover:text-slate-400 transition-colors">Terms</NuxtLink>
          <span class="text-slate-700">|</span>
          <span class="text-emerald-500 font-medium">Addis Ababa, Ethiopia</span>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref, computed } from 'vue'

const email = ref('')
const currentYear = computed(() => new Date().getFullYear())

const handleSubscribe = () => {
  if (email.value) {
    alert('Thank you for subscribing!')
    email.value = ''
  }
}
</script>