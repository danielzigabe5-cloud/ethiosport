<script setup>
import { ref } from 'vue'

definePageMeta({ layout: 'partner' })

const venues = ref([
  { id: 1, name: 'Pitch 1 - Artificial Turf', type: 'Outdoor 7v7', price: 600, status: 'Active', image: '🌱' },
  { id: 2, name: 'Pitch 2 - Indoor Futsal', type: 'Indoor 5v5', price: 800, status: 'Active', image: '🏀' }
])

const isModalOpen = ref(false)
const newVenue = ref({ name: '', type: 'Outdoor 7v7', price: 500 })

const addVenue = () => {
  if (!newVenue.value.name) return
  venues.value.push({
    id: Date.now(),
    name: newVenue.value.name,
    type: newVenue.value.type,
    price: newVenue.value.price,
    status: 'Active',
    image: '⚽'
  })
  newVenue.value = { name: '', type: 'Outdoor 7v7', price: 500 }
  isModalOpen.value = false
}
</script>

<template>
  <div class="space-y-6 max-w-6xl mx-auto">
    <div class="flex justify-between items-center">
      <div>
        <h1 class="text-xl font-black text-white">🏟️ My Venues</h1>
        <p class="text-xs text-slate-400">የሚያስተዳድሯቸውን ሜዳዎች ዝርዝር እና ዋጋ ያስተካክሉ።</p>
      </div>
      <button @click="isModalOpen = true" class="px-4 py-2.5 bg-emerald-500 text-slate-950 font-bold rounded-xl text-xs">
        + አዲስ ሜዳ ጨምር
      </button>
    </div>

    <!-- Venues List -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div v-for="v in venues" :key="v.id" class="bg-[#0b111a] border border-[#1a2432] p-5 rounded-2xl flex items-center justify-between">
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 bg-[#131c27] border border-[#212e3e] rounded-xl flex items-center justify-center text-2xl">
            {{ v.image }}
          </div>
          <div>
            <h3 class="font-bold text-white text-sm">{{ v.name }}</h3>
            <p class="text-xs text-slate-400">{{ v.type }}</p>
            <p class="text-xs font-bold text-emerald-400 mt-1">{{ v.price }} ETB / ሰዓት</p>
          </div>
        </div>
        <span class="px-2.5 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-bold rounded-lg">
          {{ v.status }}
        </span>
      </div>
    </div>

    <!-- Modal -->
    <div v-if="isModalOpen" class="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
      <div class="bg-[#0b111a] border border-[#1a2432] p-6 rounded-2xl w-full max-w-md space-y-4">
        <h2 class="text-base font-bold text-white">አዲስ ሜዳ መመዝገቢያ</h2>
        <input v-model="newVenue.name" type="text" placeholder="የሜዳው ስም (ምሳሌ: Pitch 3)" class="w-full bg-[#131c27] border border-[#212e3e] p-3 rounded-xl text-xs text-white" />
        <input v-model="newVenue.price" type="number" placeholder="የአንድ ሰዓት ዋጋ (ETB)" class="w-full bg-[#131c27] border border-[#212e3e] p-3 rounded-xl text-xs text-white" />
        <div class="flex justify-end gap-2">
          <button @click="isModalOpen = false" class="px-4 py-2 bg-slate-800 text-slate-300 text-xs rounded-xl">ሰርዝ</button>
          <button @click="addVenue" class="px-4 py-2 bg-emerald-500 text-slate-950 font-bold text-xs rounded-xl">መዝግብ</button>
        </div>
      </div>
    </div>
  </div>
</template>