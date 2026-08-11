<template>
  <div class="min-h-screen bg-[#070c14] text-slate-100 flex flex-col font-sans">
    
    <!-- TOP NAVBAR (ከላይ ያለው ዋና ናቭባር) -->
    <header class="h-16 border-b border-slate-800 bg-[#0b1320] px-6 flex items-center justify-between sticky top-0 z-50">
      
      <!-- Logo & Main Nav Links -->
      <div class="flex items-center gap-8">
        <NuxtLink to="/" class="flex items-center gap-2">
          <span class="text-emerald-500 font-black text-2xl tracking-wide">ETHIO<span class="text-emerald-400">SPORT</span></span>
        </NuxtLink>

        <!-- Main Website Links -->
        <nav class="hidden lg:flex items-center gap-6 text-xs font-semibold text-slate-300">
          <NuxtLink to="/" class="hover:text-emerald-400 transition">Home</NuxtLink>
          <NuxtLink to="/games" class="hover:text-emerald-400 transition">Games</NuxtLink>
          <NuxtLink to="/venues" class="hover:text-emerald-400 transition">Venues</NuxtLink>
          <NuxtLink to="/events" class="hover:text-emerald-400 transition">Events</NuxtLink>
          <NuxtLink to="/blogs" class="hover:text-emerald-400 transition">Blogs</NuxtLink>
          <NuxtLink to="/justplay" class="hover:text-emerald-400 transition">JustPlay</NuxtLink>
          <NuxtLink to="/contact" class="hover:text-emerald-400 transition">Contact</NuxtLink>
        </nav>
      </div>

      <!-- Right Side Controls -->
      <div class="flex items-center gap-3">
        <!-- Language Switcher -->
        <button class="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-800 bg-[#070c14] text-xs font-bold text-slate-300 hover:text-white transition">
          <Icon name="lucide:languages" class="w-4 h-4 text-emerald-400" />
          <span>አማ</span>
        </button>

        <!-- Theme Toggle -->
        <button class="p-2 rounded-xl border border-slate-800 bg-[#070c14] text-slate-400 hover:text-white transition">
          <Icon name="lucide:moon" class="w-4 h-4" />
        </button>

        <div class="h-5 w-[1px] bg-slate-800 mx-1"></div>

        <!-- Admin Badge -->
        <div class="flex items-center gap-2 px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-xl text-xs font-bold text-white">
          <Icon name="lucide:shield-check" class="w-4 h-4 text-emerald-400" />
          <span>Admin</span>
        </div>

        <!-- Partner Link -->
        <NuxtLink to="/partner" class="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-xs font-bold text-emerald-400 hover:bg-emerald-500/20 transition">
          <Icon name="lucide:building" class="w-4 h-4" />
          <span>Partner</span>
        </NuxtLink>

        <!-- Logout -->
        <NuxtLink to="/login" class="flex items-center gap-2 px-3 py-1.5 bg-rose-500/10 border border-rose-500/30 rounded-xl text-xs font-bold text-rose-400 hover:bg-rose-500/20 transition">
          <Icon name="lucide:log-out" class="w-4 h-4" />
          <span>ወጣ</span>
        </NuxtLink>
      </div>
    </header>

    <!-- BODY CONTAINER (SIDEBAR + MAIN CONTENT) -->
    <div class="flex flex-1">
      
      <!-- ADMIN SIDEBAR (ከጎን ያለው አድሚን ሳይድባር) -->
      <aside class="w-64 min-w-[256px] min-h-[calc(100vh-4rem)] bg-[#0b1320] border-r border-slate-800 p-4 flex flex-col justify-between shrink-0">
        <div class="space-y-6">
          
          <div class="px-2">
            <span class="text-xs font-bold text-slate-500 uppercase tracking-wider">የአድሚን ማውጫ</span>
          </div>

          <!-- Navigation Links -->
          <nav class="space-y-1.5">
            
            <!-- 1. ዳሽቦርድ -->
            <NuxtLink
              to="/admin"
              class="flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-semibold transition"
              :class="[
                $route.path === '/admin'
                  ? 'bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 font-bold'
                  : 'text-slate-400 hover:bg-slate-800/60 hover:text-white'
              ]"
            >
              <Icon name="lucide:layout-dashboard" class="w-4 h-4 shrink-0" />
              <span>ዳሽቦርድ</span>
            </NuxtLink>

            <!-- 2. ፓርትነሮች (ሜዳዎች) -->
            <NuxtLink
              to="/admin/partners"
              class="flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-semibold transition"
              :class="[
                $route.path === '/admin/partners'
                  ? 'bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 font-bold'
                  : 'text-slate-400 hover:bg-slate-800/60 hover:text-white'
              ]"
            >
              <Icon name="lucide:building" class="w-4 h-4 shrink-0" />
              <span>ፓርትነሮች (ሜዳዎች)</span>
            </NuxtLink>

            <!-- 3. ተጠቃሚዎች -->
            <NuxtLink
              to="/admin/users"
              class="flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-semibold transition"
              :class="[
                $route.path === '/admin/users'
                  ? 'bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 font-bold'
                  : 'text-slate-400 hover:bg-slate-800/60 hover:text-white'
              ]"
            >
              <Icon name="lucide:users" class="w-4 h-4 shrink-0" />
              <span>ተጠቃሚዎች</span>
            </NuxtLink>

            <!-- 4. ፋይናንስ እና ክፍያዎች -->
            <NuxtLink
              to="/admin/payouts"
              class="flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-semibold transition"
              :class="[
                $route.path === '/admin/payouts'
                  ? 'bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 font-bold'
                  : 'text-slate-400 hover:bg-slate-800/60 hover:text-white'
              ]"
            >
              <Icon name="lucide:wallet" class="w-4 h-4 shrink-0" />
              <span>ፋይናንስ እና ክፍያዎች</span>
            </NuxtLink>

            <!-- 5. ሪፖርቶችና ቅሬታዎች -->
            <NuxtLink
              to="/admin/reports"
              class="flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-semibold transition relative"
              :class="[
                $route.path === '/admin/reports'
                  ? 'bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 font-bold'
                  : 'text-slate-400 hover:bg-slate-800/60 hover:text-white'
              ]"
            >
              <Icon name="lucide:flag" class="w-4 h-4 shrink-0" />
              <span>ሪፖርቶችና ቅሬታዎች</span>
              <span class="ml-auto bg-rose-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full">5</span>
            </NuxtLink>

            <!-- 6. መቼቶች (Settings) -->
            <NuxtLink
              to="/admin/settings"
              class="flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-semibold transition"
              :class="[
                $route.path === '/admin/settings'
                  ? 'bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 font-bold'
                  : 'text-slate-400 hover:bg-slate-800/60 hover:text-white'
              ]"
            >
              <Icon name="lucide:settings" class="w-4 h-4 shrink-0" />
              <span>መቼቶች (Settings)</span>
            </NuxtLink>

          </nav>
        </div>
      </aside>

      <!-- PAGE CONTENT SLOT + ADMIN FOOTER -->
      <main class="flex-1 p-6 overflow-y-auto flex flex-col justify-between">
        
        <!-- Page Body Content -->
        <div>
          <slot />
        </div>

        <!-- Dedicated Admin Footer -->
        <footer class="mt-12 pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
          <div class="flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <p>© 2026 EthioSport Admin Portal. All rights reserved.</p>
          </div>
          
          <div class="flex items-center gap-4 text-[11px] font-medium">
            <span class="bg-slate-800/80 text-slate-400 px-2.5 py-1 rounded-md border border-slate-700/50">v1.0.0</span>
            <NuxtLink to="/admin/settings" class="hover:text-emerald-400 transition">የሲስተም መቼቶች</NuxtLink>
            <NuxtLink to="/contact" class="hover:text-emerald-400 transition">እርዳታ (Support)</NuxtLink>
          </div>
        </footer>

      </main>

    </div>

  </div>
</template>

<script setup lang="ts">
// Admin Layout Script
</script>