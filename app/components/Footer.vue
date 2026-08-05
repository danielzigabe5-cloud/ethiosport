<template>
  <footer class="bg-[#0b111a] border-t border-[#212e3e] text-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <!-- ዋና የፉተር ይዘት -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <!-- ስለ ETHIO-MEDA -->
        <div class="col-span-1">
          <NuxtLink to="/" class="flex items-center gap-2 mb-4 group">
            <Icon name="lucide:football" class="w-8 h-8 text-emerald-500 group-hover:scale-110 transition-transform" />
            <span class="text-xl font-bold text-white">
              ETHIO-<span class="text-emerald-500">MEDA</span>
            </span>
          </NuxtLink>
          <p class="text-gray-400 text-sm leading-relaxed">
            Ethiopia's leading digital platform for booking sports fields, organizing matches, and connecting sports lovers.
          </p>
          <div class="flex flex-wrap gap-2 mt-4">
            <span class="text-xs bg-[#212e3e] text-gray-400 px-3 py-1 rounded-full">Addis Ababa</span>
            <span class="text-xs bg-[#212e3e] text-gray-400 px-3 py-1 rounded-full">Hawassa</span>
            <span class="text-xs bg-[#212e3e] text-gray-400 px-3 py-1 rounded-full">Adama</span>
            <span class="text-xs bg-[#212e3e] text-gray-400 px-3 py-1 rounded-full">Bahir Dar</span>
          </div>
        </div>

        <!-- ናቪጌሽን -->
        <div>
          <h4 class="font-semibold text-white mb-4">NAVIGATION</h4>
          <ul class="space-y-2">
            <li v-for="item in footerNav" :key="item.path">
              <NuxtLink 
                :to="item.path" 
                class="text-gray-400 hover:text-emerald-500 transition text-sm flex items-center gap-2"
              >
                <Icon :name="item.icon" class="w-4 h-4" />
                {{ item.label }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- ተወዳጅ ቦታዎች -->
        <div>
          <h4 class="font-semibold text-white mb-4">TOP PITCH LOCATIONS</h4>
          <ul class="space-y-2">
            <li 
              v-for="location in topLocations" 
              :key="location.name"
              class="flex justify-between items-center text-gray-400 hover:text-emerald-500 transition cursor-pointer text-sm group"
            >
              <span>{{ location.name }}</span>
              <span class="text-emerald-500 group-hover:scale-105 transition">{{ location.venues }} Venues</span>
            </li>
          </ul>
        </div>

        <!-- አግኙን -->
        <div>
          <h4 class="font-semibold text-white mb-4">CONTACT</h4>
          <ul class="space-y-3 text-sm">
            <li class="flex items-center gap-2 text-gray-400 hover:text-emerald-500 transition">
              <Icon name="lucide:phone" class="w-4 h-4 text-emerald-500" />
              <span>+251 911 00 11 22</span>
            </li>
            <li class="flex items-center gap-2 text-gray-400 hover:text-emerald-500 transition">
              <Icon name="lucide:phone" class="w-4 h-4 text-emerald-500" />
              <span>+251 922 33 44 55</span>
            </li>
            <li class="flex items-center gap-2 text-gray-400 hover:text-emerald-500 transition">
              <Icon name="lucide:mail" class="w-4 h-4 text-emerald-500" />
              <span>support@ethiomeda.et</span>
            </li>
            <li class="flex items-center gap-2 text-gray-400 hover:text-emerald-500 transition">
              <Icon name="lucide:send" class="w-4 h-4 text-emerald-500" />
              <span class="font-semibold text-emerald-500">@EthioMedaOfficial</span>
            </li>
          </ul>
          
          <!-- ማህበራዊ ሚዲያ -->
          <div class="flex gap-3 mt-4">
            <a 
              v-for="social in socialLinks" 
              :key="social.name"
              :href="social.url"
              target="_blank"
              class="w-10 h-10 rounded-lg bg-[#212e3e] flex items-center justify-center hover:bg-emerald-500 transition-all duration-300 group"
            >
              <Icon :name="social.icon" class="w-5 h-5 text-gray-400 group-hover:text-white transition" />
            </a>
          </div>
        </div>
      </div>

      <!-- የቅጂ መብት -->
      <div class="border-t border-[#212e3e] mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
        <p>© 2026 ETHIO-MEDA. All rights reserved. Built with ❤️ for Ethiopian Sports lovers</p>
        <div class="flex gap-6">
          <NuxtLink to="/privacy" class="hover:text-emerald-500 transition">Privacy Policy</NuxtLink>
          <NuxtLink to="/terms" class="hover:text-emerald-500 transition">Terms of Service</NuxtLink>
          <NuxtLink to="/faq" class="hover:text-emerald-500 transition">Field Owners FAQ</NuxtLink>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
const footerNav = [
  { path: '/', label: 'Home', icon: 'lucide:home' },
  { path: '/features', label: 'Features', icon: 'lucide:sparkles' },
  { path: '/venues', label: 'Venues', icon: 'lucide:stadium' },
  { path: '/events', label: 'Events', icon: 'lucide:calendar' },
  { path: '/games', label: 'Games', icon: 'lucide:gamepad-2' },
  { path: '/justplay', label: 'JustPlay', icon: 'lucide:play-circle' },
  { path: '/blog', label: 'Blog', icon: 'lucide:newspaper' },
  { path: '/contact', label: 'Contact', icon: 'lucide:phone' }
]

const topLocations = [
  { name: 'Bole (ቦሌ)', venues: 18 },
  { name: 'Kirkos / Sarbet', venues: 14 },
  { name: 'Yeka / Summit', venues: 12 },
  { name: 'Nifas Silk / Gotera', venues: 10 },
  { name: 'Arada / Piassa', venues: 8 }
]

const socialLinks = [
  { name: 'Facebook', icon: 'lucide:facebook', url: '#' },
  { name: 'Twitter', icon: 'lucide:twitter', url: '#' },
  { name: 'Instagram', icon: 'lucide:instagram', url: '#' },
  { name: 'YouTube', icon: 'lucide:youtube', url: '#' },
  { name: 'Telegram', icon: 'lucide:send', url: '#' }
]
</script>