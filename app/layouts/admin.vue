<script setup>
const adminLinks = [
  { name: 'Dashboard', path: '/admin', icon: '📊' },
  { name: 'Venues (ሜዳዎች)', path: '/admin/venues', icon: '🏟️' },
  { name: 'Bookings (ትእዛዞች)', path: '/admin/bookings', icon: '🎟️' },
  { name: 'Users (ተጠቃሚዎች)', path: '/admin/users', icon: '👥' },
  { name: 'Settings', path: '/admin/settings', icon: '⚙️' }
]

const handleLogout = async () => {
  const userRole = useCookie('user_role')
  userRole.value = null
  await navigateTo('/login')
}
</script>

<template>
  <div class="min-h-screen bg-[#070b10] text-slate-100 flex font-sans">
    
    <!-- SIDEBAR (LEFT - STICKY TO SCREEN) -->
    <aside class="w-64 bg-[#0b111a] border-r border-[#1a2432] hidden md:flex flex-col justify-between shrink-0 h-screen sticky top-0 z-30">
      <div class="p-6 space-y-8">
        <NuxtLink to="/admin" class="flex items-center gap-2">
          <div class="w-9 h-9 bg-emerald-500 rounded-xl flex items-center justify-center text-slate-950 font-black text-xl shadow-md">
            E
          </div>
          <span class="font-extrabold text-lg text-white tracking-tight">
            ETHIO-<span class="text-emerald-400">ADMIN</span>
          </span>
        </NuxtLink>

        <!-- Navigation Links -->
        <nav class="space-y-1">
          <NuxtLink 
            v-for="link in adminLinks" 
            :key="link.path" 
            :to="link.path"
            class="flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition text-slate-400 hover:bg-[#131c27] hover:text-white"
            active-class="bg-emerald-500/10 text-emerald-400 font-black border border-emerald-500/20"
          >
            <span class="text-base">{{ link.icon }}</span>
            <span>{{ link.name }}</span>
          </NuxtLink>
        </nav>
      </div>

      <!-- Logout Button -->
      <div class="p-4 border-t border-[#1a2432]">
        <button 
          @click="handleLogout"
          class="w-full flex items-center justify-center gap-2 py-2.5 bg-rose-500/10 text-rose-500 hover:bg-rose-500 hover:text-white font-bold text-xs rounded-xl transition cursor-pointer"
        >
          <span>🚪</span>
          <span>ወጣ (Logout)</span>
        </button>
      </div>
    </aside>

    <!-- RIGHT CONTAINER (MAIN CONTENT + FULL 4-COLUMN FOOTER) -->
    <div class="flex-1 flex flex-col min-h-screen min-w-0 justify-between bg-[#070b10]">
      
      <div>
        <!-- TOPBAR -->
        <header class="h-16 bg-[#0b111a] border-b border-[#1a2432] px-6 flex items-center justify-between sticky top-0 z-20 shrink-0">
          <h2 class="font-black text-sm text-white">የአስተዳዳሪ መቆጣጠሪያ ፓነል</h2>
          
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center font-black text-xs border border-emerald-500/30">
              AD
            </div>
            <span class="text-xs font-bold text-slate-300">Admin User</span>
          </div>
        </header>

        <!-- MAIN CONTENT AREA -->
        <main class="p-6">
          <div class="bg-[#0b111a] border border-[#1a2432] rounded-2xl p-6 min-h-[500px] shadow-sm">
            <slot />
          </div>
        </main>
      </div>

      <!-- FULL 4-COLUMN DARK FOOTER -->
      <footer class="w-full bg-[#05080c] border-t-2 border-[#1a2432] text-slate-400 text-xs shrink-0 font-sans pt-10 pb-6 px-6 mt-12">
        <div class="max-w-7xl mx-auto space-y-8">
          
          <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
            
            <!-- COL 1: BRAND & LOCATIONS BADGES -->
            <div class="space-y-4">
              <span class="font-black text-lg text-white tracking-wider">
                ETHIO-<span class="text-emerald-400">MEDA</span>
              </span>
              <p class="text-[11px] leading-relaxed text-slate-400">
                Ethiopia's leading digital platform for booking sports fields, organizing matches, and connecting sports lovers.
              </p>
              <div class="flex flex-wrap gap-1.5 pt-1">
                <span class="px-2.5 py-1 bg-[#131c27] text-slate-300 text-[10px] rounded-md border border-[#212e3e]">Addis Ababa</span>
                <span class="px-2.5 py-1 bg-[#131c27] text-slate-300 text-[10px] rounded-md border border-[#212e3e]">Hawassa</span>
                <span class="px-2.5 py-1 bg-[#131c27] text-slate-300 text-[10px] rounded-md border border-[#212e3e]">Adama</span>
                <span class="px-2.5 py-1 bg-[#131c27] text-slate-300 text-[10px] rounded-md border border-[#212e3e]">Bahir Dar</span>
              </div>
            </div>

            <!-- COL 2: NAVIGATION -->
            <div class="space-y-3">
              <h4 class="text-xs font-bold uppercase tracking-wider text-white">NAVIGATION</h4>
              <ul class="space-y-2 text-[11px] font-medium text-slate-400">
                <li><NuxtLink to="/admin" class="hover:text-emerald-400 transition">Dashboard</NuxtLink></li>
                <li><NuxtLink to="/admin/venues" class="hover:text-emerald-400 transition">Venues</NuxtLink></li>
                <li><NuxtLink to="/admin/bookings" class="hover:text-emerald-400 transition">Bookings</NuxtLink></li>
                <li><NuxtLink to="/admin/users" class="hover:text-emerald-400 transition">Users</NuxtLink></li>
                <li><NuxtLink to="/admin/settings" class="hover:text-emerald-400 transition">Settings</NuxtLink></li>
              </ul>
            </div>

            <!-- COL 3: LOCATIONS -->
            <div class="space-y-3">
              <h4 class="text-xs font-bold uppercase tracking-wider text-white">TOP PITCH LOCATIONS</h4>
              <ul class="space-y-2 text-[11px]">
                <li class="flex justify-between"><span class="text-slate-400">Bole (ቦሌ)</span><span class="text-emerald-400 font-bold">18 Venues</span></li>
                <li class="flex justify-between"><span class="text-slate-400">Kirkos / Sarbet</span><span class="text-emerald-400 font-bold">14 Venues</span></li>
                <li class="flex justify-between"><span class="text-slate-400">Yeka / Summit</span><span class="text-emerald-400 font-bold">12 Venues</span></li>
                <li class="flex justify-between"><span class="text-slate-400">Nifas Silk / Gotera</span><span class="text-emerald-400 font-bold">10 Venues</span></li>
                <li class="flex justify-between"><span class="text-slate-400">Arada / Piassa</span><span class="text-emerald-400 font-bold">8 Venues</span></li>
              </ul>
            </div>

            <!-- COL 4: CONTACT -->
            <div class="space-y-3">
              <h4 class="text-xs font-bold uppercase tracking-wider text-white">CONTACT</h4>
              <div class="space-y-2 text-[11px] text-slate-400">
                <p>+251 911 00 11 22</p>
                <p>+251 922 33 44 55</p>
                <p class="hover:text-emerald-400 cursor-pointer">support@ethiomeda.et</p>
                <p class="text-emerald-400 font-semibold cursor-pointer">@EthioMedaOfficial</p>
              </div>
            </div>

          </div>

          <!-- BOTTOM BAR -->
          <div class="pt-6 border-t border-[#1a2432] flex flex-col sm:flex-row justify-between gap-4 text-[11px] text-slate-400">
            <div>© 2026 ETHIO-MEDA. All rights reserved. Built with <span class="text-rose-500">❤️</span> for Ethiopian Sports lovers</div>
            <div class="flex gap-4">
              <NuxtLink to="#" class="hover:text-emerald-400 transition">Privacy Policy</NuxtLink>
              <NuxtLink to="#" class="hover:text-emerald-400 transition">Terms of Service</NuxtLink>
            </div>
          </div>

        </div>
      </footer>

    </div>

  </div>
</template>