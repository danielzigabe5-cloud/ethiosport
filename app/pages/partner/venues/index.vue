<script setup>
import { ref } from 'vue'

definePageMeta({ layout: 'partner' })

const venues = ref([
  { id: 1, name: 'Pitch 1 (Artificial Turf)', type: 'Outdoor 7v7', price: 600, status: 'Active' },
  { id: 2, name: 'Pitch 2 (Indoor Futsal)', type: 'Indoor 5v5', price: 800, status: 'Active' }
])

const showModal = ref(false)
const form = ref({ name: '', type: 'Outdoor 7v7', price: 600 })

const saveVenue = () => {
  if (!form.value.name.trim()) return
  venues.value.push({
    id: Date.now(),
    name: form.value.name,
    type: form.value.type,
    price: Number(form.value.price),
    status: 'Active'
  })
  form.value = { name: '', type: 'Outdoor 7v7', price: 600 }
  showModal.value = false
}

const toggleStatus = (venue) => {
  venue.status = venue.status === 'Active' ? 'Maintenance' : 'Active'
}
</script>

<template>
  <div class="space-y-6 max-w-5xl mx-auto">
    <div class="flex justify-between items-center">
      <div>
        <h1 class="text-xl font-black text-white">🏟️ My Venues</h1>
        <p class="text-xs text-slate-400">የሜዳዎችን ዝርዝር እና የሰዓት ዋጋ ማስተካከያ።</p>
      </div>
      <button @click="showModal = true" class="px-4 py-2.5 bg-emerald-500 text-slate-950 font-bold rounded-xl text-xs hover:bg-emerald-400">
        + አዲስ ሜዳ መዝግብ
      </button>
    </div>

    <!-- Cards Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div v-for="v in venues" :key="v.id" class="bg-[#0b111a] border border-[#1a2432] p-5 rounded-2xl flex justify-between items-start">
        <div class="space-y-2">
          <span class="px-2 py-0.5 bg-[#131c27] text-slate-300 border border-[#212e3e] text-[10px] rounded font-semibold">{{ v.type }}</span>
          <h3 class="font-bold text-white text-base">{{ v.name }}</h3>
          <p class="text-emerald-400 font-bold text-sm">{{ v.price.toLocaleString() }} ETB <span class="text-[10px] text-slate-400">/ ሰዓት</span></p>
        </div>
        <button 
          @click="toggleStatus(v)"
          :class="[
            'px-2.5 py-1 rounded-lg text-[10px] font-bold border transition',
            v.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
          ]"
        >
          {{ v.status }}
        </button>
      </div>
    </div>

    <!-- Modal -->
    <div v-if="showModal" class="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
      <div class="bg-[#0b111a] border border-[#1a2432] p-6 rounded-2xl w-full max-w-md space-y-4">
        <h3 class="text-sm font-bold text-white">አዲስ ሜዳ መጨመሪያ</h3>
        <div class="space-y-3">
          <input v-model="form.name" type="text" placeholder="የሜዳው ስም (ምሳሌ: Pitch 3)" class="w-full bg-[#131c27] border border-[#212e3e] p-3 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-500" />
          <select v-model="form.type" class="w-full bg-[#131c27] border border-[#212e3e] p-3 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-500">
            <option value="Outdoor 7v7">Outdoor 7v7</option>
            <option value="Indoor 5v5">Indoor 5v5</option>
            <option value="Natural Grass 11v11">Natural Grass 11v11</option>
          </select>
          <input v-model="form.price" type="number" placeholder="የአንድ ሰዓት ዋጋ (ETB)" class="w-full bg-[#131c27] border border-[#212e3e] p-3 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-500" />
        </div>
        <div class="flex justify-end gap-2 pt-2">
          <button @click="showModal = false" class="px-4 py-2 bg-[#131c27] text-slate-400 rounded-xl text-xs">ሰርዝ</button>
          <button @click="saveVenue" class="px-4 py-2 bg-emerald-500 text-slate-950 font-bold rounded-xl text-xs">መዝግብ</button>
        </div>
      </div>
    </div>
  </div>
</template>