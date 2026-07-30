<template>
  <nav class="bg-slate-950 text-white border-b border-slate-800 px-6 py-4 flex items-center justify-between">
    <!-- Logo -->
    <div class="text-xl font-bold text-emerald-400">
      EthioSport
    </div>

    <!-- Nav Links -->
    <div class="flex items-center gap-6 text-sm font-medium text-slate-300">
      <NuxtLink to="/" class="hover:text-emerald-400 transition-colors">Home</NuxtLink>
      <NuxtLink to="/venues" class="hover:text-emerald-400 transition-colors">Venues</NuxtLink>
      <NuxtLink to="/just-play" class="hover:text-emerald-400 transition-colors">Just Play</NuxtLink>
      <NuxtLink to="/events" class="hover:text-emerald-400 transition-colors">Events</NuxtLink>
      <NuxtLink to="/blogs" class="hover:text-emerald-400 transition-colors">Blogs</NuxtLink>
      <NuxtLink to="/contact" class="hover:text-emerald-400 transition-colors">Contact</NuxtLink>
       
    </div>

    <!-- Action Button -->
    <div>
      <NuxtLink to="/login" class="bg-emerald-600 hover:bg-emerald-500 text-white text-xs px-4 py-2 rounded-lg font-semibold transition-colors">
        ይመዝገቡ (Get Started)
      </NuxtLink>
    </div>
  </nav>
</template>