<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

// 1. Top Navigation Links
const topNavLinks = [
  { name: 'Home', path: '/' },
  { name: 'About Us', path: '/about' },
  { name: 'Games', path: '/games' },
  { name: 'Venues', path: '/venues' },
  { name: 'Partner Dashboard', path: '/partner' },
  { name: 'Events', path: '/events' },
  { name: 'Blogs', path: '/blogs' },
  { name: 'JustPlay', path: '/justplay' },
  { name: 'Contact', path: '/contact' }
]

// 2. Sidebar Navigation Links
const partnerSidebarLinks = [
  { name: 'Dashboard', path: '/partner', icon: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z' },
  { name: 'Schedule', path: '/partner/schedule', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
  { name: 'My Venues', path: '/partner/venues', icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z' },
  { name: 'Payouts', path: '/partner/payouts', icon: 'M3 10h18M7 15h1m4 0h1m-7 4h12a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
  { name: 'Settings', path: '/partner/settings', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z' },
  { name: 'Support', path: '/partner/support', icon: 'M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z' }
]

// 3. Navbar Logic
const isPartnerRoute = (linkPath: string) => {
  if (linkPath === '/partner') {
    return route.path.startsWith('/partner')
  }
  return route.path === linkPath
}

const handleLogout = () => {
  router.push('/auth')
}
</script>

<template>
  <div class="min-h-screen w-full bg-[#060d13] text-white font-sans flex flex-col justify-between">
    
    <div>
      <!-- 1. TOP NAVBAR -->
      <header class="h-16 bg-[#0a141d] border-b border-[#162330] px-4 lg:px-6 flex items-center justify-between shrink-0 sticky top-0 z-50">
        
        <!-- LOGO -->
        <NuxtLink to="/" class="flex items-center gap-1 text-xl font-black tracking-wider uppercase">
          <span class="text-white">COMPO</span>
          <span class="text-emerald-500">LOJO</span>
        </NuxtLink>

        <!-- TOP NAV LINKS -->
        <nav class="hidden lg:flex items-center gap-1">
          <NuxtLink
            v-for="link in topNavLinks"
            :key="link.path"
            :to="link.path"
            class="text-xs font-semibold px-3 py-1.5 rounded-xl transition-all"
            :class="[
              isPartnerRoute(link.path)
                ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-500/40 font-bold'
                : 'text-slate-300 hover:text-white'
            ]"
          >
            {{ link.name }}
          </NuxtLink>
        </nav>

        <!-- RIGHT SIDE ACTIONS -->
        <div class="flex items-center gap-3">
          <NuxtLink 
            to="/venues/create" 
            class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-lime-400 hover:bg-lime-300 text-black text-xs font-bold transition shadow"
          >
            <svg class="w-4 h-4 stroke-current" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            <span>Add Venue</span>
          </NuxtLink>

          <div class="flex items-center gap-2 pl-2 border-l border-[#1a2936]">
            <div class="text-right hidden sm:block">
              <div class="text-xs font-bold leading-none text-white">user</div>
              <div class="text-[9px] font-extrabold leading-none text-emerald-400 tracking-wider uppercase mt-0.5">PARTNER</div>
            </div>
            <div class="w-7 h-7 rounded-full bg-[#12202c] border border-[#1e3042] flex items-center justify-center text-slate-300">
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
          </div>

          <button 
            @click="handleLogout"
            class="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 transition"
            title="Logout"
          >
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </button>
        </div>
      </header>

      <!-- 2. MAIN BODY (Sidebar + Page Content) -->
      <div class="flex-1 flex w-full min-h-[calc(100vh-4rem)]">
        
        <!-- SIDEBAR -->
        <aside class="w-60 min-w-[240px] bg-[#092215] border-r border-[#103a24] p-4 flex flex-col justify-between shrink-0">
          <div class="space-y-4">
            <div class="px-2 text-[11px] font-bold tracking-wider text-emerald-400 italic">
              የፓርትነር መቆጣጠሪያ
            </div>

            <nav class="space-y-1">
              <NuxtLink
                v-for="item in partnerSidebarLinks"
                :key="item.path"
                :to="item.path"
                class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all"
                :class="[
                  route.path === item.path
                    ? 'bg-emerald-900/60 text-white font-bold border border-emerald-600/40'
                    : 'text-emerald-100/70 hover:bg-emerald-950/40 hover:text-white'
                ]"
              >
                <svg class="w-4 h-4 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" :d="item.icon" />
                </svg>
                <span>{{ item.name }}</span>
              </NuxtLink>
            </nav>
          </div>
        </aside>

        <!-- DYNAMIC PAGE CONTENT CONTAINER -->
        <main class="flex-1 p-6 bg-[#060d13]">
          <slot />
        </main>

      </div>
    </div>

    <!-- 3. FOOTER -->
    <footer class="bg-[#0f172a] text-slate-200 pt-16 pb-8 border-t-4 border-green-600 w-full shrink-0">
      <div class="container mx-auto px-6">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          <!-- Column 1: About -->
          <div class="flex flex-col space-y-5">
            <div class="flex items-center space-x-2">
              <span class="text-3xl font-black text-green-500 italic">ETHIO</span>
              <span class="text-3xl font-black text-white italic">SPORT</span>
            </div>
            <p class="text-slate-400 text-sm leading-relaxed">
              Your premier destination for the latest Ethiopian sports news, transfer updates, and live match results.
            </p>
            <div class="flex space-x-4 pt-2">
              <a href="#" class="p-2 bg-slate-800 rounded-full hover:bg-green-600 transition-all text-white">FB</a>
              <a href="#" class="p-2 bg-slate-800 rounded-full hover:bg-green-600 transition-all text-white">TG</a>
              <a href="#" class="p-2 bg-slate-800 rounded-full hover:bg-green-600 transition-all text-white">YT</a>
            </div>
          </div>

          <!-- Column 2: Quick Links -->
          <div>
            <h3 class="text-white font-bold mb-6 uppercase tracking-widest text-sm">Quick Links</h3>
            <ul class="space-y-4 text-slate-400 text-sm">
              <li><NuxtLink to="/" class="hover:text-green-500 transition-all">Ethiopian Premier League</NuxtLink></li>
              <li><NuxtLink to="/" class="hover:text-green-500 transition-all">National Team (Walias)</NuxtLink></li>
              <li><NuxtLink to="/" class="hover:text-green-500 transition-all">Transfer News</NuxtLink></li>
              <li><NuxtLink to="/" class="hover:text-green-500 transition-all">League Table</NuxtLink></li>
            </ul>
          </div>

          <!-- Column 3: Support -->
          <div>
            <h3 class="text-white font-bold mb-6 uppercase tracking-widest text-sm">Support</h3>
            <ul class="space-y-4 text-slate-400 text-sm">
              <li><NuxtLink to="/" class="hover:text-green-500 transition-all">About Us</NuxtLink></li>
              <li><NuxtLink to="/" class="hover:text-green-500 transition-all">Contact Us</NuxtLink></li>
              <li><NuxtLink to="/" class="hover:text-green-500 transition-all">Advertise</NuxtLink></li>
              <li><NuxtLink to="/" class="hover:text-green-500 transition-all">Privacy Policy</NuxtLink></li>
            </ul>
          </div>

          <!-- Column 4: Newsletter -->
          <div>
            <h3 class="text-white font-bold mb-6 uppercase tracking-widest text-sm">Stay Updated</h3>
            <p class="text-slate-400 text-sm mb-6">Subscribe to get the latest sports headlines daily.</p>
            <div class="flex flex-col gap-2">
              <input 
                type="email" 
                placeholder="Enter your email..." 
                class="w-full bg-slate-800 border-none rounded-lg py-3 px-4 text-sm text-white focus:ring-2 focus:ring-green-500 outline-none"
              />
              <button class="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition-all">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <!-- Bottom Bar -->
        <div class="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-slate-500 text-xs">
          <p>© {{ new Date().getFullYear() }} EthioSport Platform. All Rights Reserved.</p>
          <div class="flex space-x-6 mt-4 md:mt-0">
            <span>Addis Ababa, Ethiopia</span>
          </div>
        </div>
      </div>
    </footer>

  </div>
</template>