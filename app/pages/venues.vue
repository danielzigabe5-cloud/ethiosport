<template>
  <div class="min-h-screen bg-slate-950 py-16 px-6">
    <div class="max-w-7xl mx-auto">
      <!-- Title & Filter Section -->
      <div class="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
        <div>
          <h1 class="text-3xl font-bold text-white mb-2">ለመጫወት ዝግጁ የሆኑ ሜዳዎች</h1>
          <p class="text-slate-400">ምርጥ አገልግሎት የሚሰጡ የስፖርት ማዕከላት</p>
        </div>
        <div class="flex gap-3">
          <input type="text" placeholder="ሜዳ ይፈልጉ..." class="bg-slate-900 border border-slate-800 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-emerald-500">
        </div>
      </div>

      <!-- Venues Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="venue in venues" :key="venue.id" class="bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 group">
          <!-- Venue Image placeholder -->
          <div class="h-52 bg-slate-800 relative overflow-hidden">
             <div class="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-60"></div>
             <span class="absolute top-4 right-4 bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-full">
               {{ venue.price }} ብር/ሰዓት
             </span>
             <div class="absolute inset-0 flex items-center justify-center text-slate-700">
               <svg class="w-16 h-16 fill-current" viewBox="0 0 24 24"><path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.18l8 4v7.64l-8 4-8-4V8.18l8-4z"/></svg>
             </div>
          </div>

          <!-- Venue Details -->
          <div class="p-6">
            <h3 class="text-xl font-bold text-white mb-1">{{ venue.name }}</h3>
            <p class="text-emerald-500 text-sm mb-4 flex items-center gap-1">
              📍 {{ venue.location }}
            </p>
            <div class="flex items-center gap-4 mb-6">
              <span v-for="tag in venue.tags" :key="tag" class="text-[10px] uppercase tracking-wider bg-slate-800 text-slate-300 px-2 py-1 rounded">
                {{ tag }}
              </span>
            </div>
            <NuxtLink :to="`/booking?venue=${venue.id}`" 
              class="block text-center w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-xl transition-all">
              አሁን ያስይዙ (Book)
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const venues = [
  {
    id: 1,
    name: 'አቤቤ ቢቂላ ስታዲየም ተርፍ',
    location: 'አዲስ አበባ (አዲሱ ገበያ)',
    price: 1200,
    tags: ['እግር ኳስ', 'Artificial Turf', 'Night Lights']
  },
  {
    id: 2,
    name: 'ጃን ሜዳ ባስኬትቦል',
    location: 'አዲስ አበባ (6 ኪሎ)',
    price: 500,
    tags: ['ባስኬትቦል', 'Outdoor', 'Public']
  },
  {
    id: 3,
    name: 'የካ ስፖርት ማዕከል',
    location: 'አዲስ አበባ (መገናኛ)',
    price: 1500,
    tags: ['እግር ኳስ', 'ቮሊቦል', 'Shower']
  },
  {
    id: 4,
    name: 'ጎላጉል የቤት ውስጥ ሜዳ',
    location: 'አዲስ አበባ (22 አካባቢ)',
    price: 2000,
    tags: ['Futsal', 'Indoor', 'Parking']
  },
  {
    id: 5,
    name: 'ቦሌ ስፖርት ዞን',
    location: 'አዲስ አበባ (ቦሌ)',
    price: 1800,
    tags: ['ባስኬትቦል', 'Gym', 'Locker Room']
  }
]
</script>