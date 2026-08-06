<script setup>
useHead({ title: 'Saved Venues - EthioSport' })

const favorites = ref([
  {
    id: 101,
    name: 'ሳርቤት ፉትሳል ሜዳ',
    location: 'Sarbet, Addis Ababa',
    rating: 4.9,
    price: 800,
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 102,
    name: 'ቦሌ አሬና ቴኒስ ኮርት',
    location: 'Bole, Addis Ababa',
    rating: 4.7,
    price: 1200,
    image: 'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?auto=format&fit=crop&q=80&w=400'
  }
])

const removeFavorite = (id) => {
  favorites.value = favorites.value.filter(item => item.id !== id)
}
</script>

<template>
  <div class="space-y-6">
    <div>
      <h2 class="text-xl font-bold text-white">⭐ Saved Venues</h2>
      <p class="text-xs text-slate-400">የወደዷቸውን እና በኋላ ሊይዟቸው ያስቀመጧቸውን ሜዳዎች ይመልከቱ።</p>
    </div>

    <div v-if="favorites.length === 0" class="text-center py-12 bg-[#0b111a] rounded-3xl border border-[#1a2432]">
      <p class="text-slate-400 text-xs">ምንም የተቀመጠ ሜዳ የለም።</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div 
        v-for="venue in favorites" 
        :key="venue.id"
        class="bg-[#0b111a] border border-[#1a2432] rounded-2xl overflow-hidden flex flex-col justify-between hover:border-emerald-500/30 transition"
      >
        <div class="h-36 relative">
          <img :src="venue.image" class="w-full h-full object-cover" />
          <button 
            @click="removeFavorite(venue.id)" 
            class="absolute top-3 right-3 p-2 bg-slate-950/70 hover:bg-rose-500/80 rounded-full text-white text-xs transition"
          >
            🗑️
          </button>
        </div>
        
        <div class="p-5 space-y-3">
          <div class="flex justify-between items-start">
            <div>
              <h3 class="font-bold text-base text-white">{{ venue.name }}</h3>
              <p class="text-xs text-slate-400">📍 {{ venue.location }}</p>
            </div>
            <span class="text-xs font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
              ★ {{ venue.rating }}
            </span>
          </div>

          <div class="flex items-center justify-between pt-2 border-t border-[#1a2432]">
            <span class="text-xs font-bold text-emerald-400">{{ venue.price }} ETB / ሰዓት</span>
            <NuxtLink :to="`/venues/${venue.id}`" class="px-3 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl transition">
              ቦታ ያዙ
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>