<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-2xl font-black text-white">የአድሚን ማጠቃለያ</h1>
      <p class="text-xs text-slate-400 mt-1">አጠቃላይ የሲስተሙ እንቅስቃሴ</p>
    </div>

    <!-- STATS -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div class="bg-[#0b1320] p-5 rounded-2xl border border-slate-800 space-y-3">
        <span class="text-slate-400 font-semibold text-xs">አጠቃላይ ገቢ</span>
        <h2 class="text-2xl font-black text-white">1.2M <span class="text-xs text-slate-500">ETB</span></h2>
      </div>
      <div class="bg-[#0b1320] p-5 rounded-2xl border border-slate-800 space-y-3">
        <span class="text-slate-400 font-semibold text-xs">የተመዘገቡ ፓርትነሮች</span>
        <h2 class="text-2xl font-black text-white">124</h2>
      </div>
      <div class="bg-[#0b1320] p-5 rounded-2xl border border-slate-800 space-y-3">
        <span class="text-slate-400 font-semibold text-xs">አጠቃላይ ተጠቃሚዎች</span>
        <h2 class="text-2xl font-black text-white">15.4K</h2>
      </div>
      <div class="bg-[#0b1320] p-5 rounded-2xl border border-slate-800 space-y-3">
        <span class="text-slate-400 font-semibold text-xs">ክፍት ቅሬታዎች</span>
        <h2 class="text-2xl font-black text-rose-400">5</h2>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin' })
</script>