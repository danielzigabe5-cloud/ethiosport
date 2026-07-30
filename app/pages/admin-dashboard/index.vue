<!-- pages/admin-dashboard/venues/index.vue -->
<template>
  <div class="space-y-6">
    
    <!-- STATS OVERVIEW -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div class="bg-slate-900 border border-slate-800 rounded-2xl p-4">
        <p class="text-[11px] font-bold text-slate-400 uppercase tracking-wider">ጠቅላላ ሜዳዎች</p>
        <p class="text-2xl font-extrabold text-white mt-1">{{ venues.length }}</p>
      </div>
      <div class="bg-slate-900 border border-slate-800 rounded-2xl p-4">
        <p class="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">Active ሜዳዎች</p>
        <p class="text-2xl font-extrabold text-emerald-400 mt-1">{{ activeCount }}</p>
      </div>
      <div class="bg-slate-900 border border-slate-800 rounded-2xl p-4">
        <p class="text-[11px] font-bold text-amber-400 uppercase tracking-wider">Pending (ማረጋገጫ የሚጠብቁ)</p>
        <p class="text-2xl font-extrabold text-amber-400 mt-1">{{ pendingCount }}</p>
      </div>
    </div>

    <!-- ACTION BAR: SEARCH & ADD BUTTON -->
    <div class="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row justify-between gap-4 items-center">
      <div class="w-full sm:w-80">
        <input 
          v-model="searchQuery" 
          type="text" 
          placeholder="በሜዳ ስም ወይም ቦታ ፈልግ..." 
          class="w-full bg-slate-950 border border-slate-800 text-white placeholder-slate-500 rounded-xl px-4 py-2 text-xs outline-none focus:border-emerald-500 transition"
        />
      </div>

      <button 
        @click="showModal = true"
        class="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-2 rounded-xl text-xs transition flex items-center justify-center gap-2"
      >
        <span>+</span> አዲስ ሜዳ ጨምር
      </button>
    </div>

    <!-- VENUES TABLE -->
    <div class="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-left text-xs text-slate-300">
          <thead class="bg-slate-950 text-slate-400 font-semibold border-b border-slate-800 uppercase tracking-wider">
            <tr>
              <th class="p-4">ሜዳ</th>
              <th class="p-4">ስፖርት</th>
              <th class="p-4">ቦታ</th>
              <th class="p-4">የሰዓት ዋጋ</th>
              <th class="p-4">Status</th>
              <th class="p-4 text-right">ተግባር</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-800/60">
            <tr v-for="venue in filteredVenues" :key="venue.id" class="hover:bg-slate-800/30 transition">
              <td class="p-4 font-bold text-white flex items-center gap-3">
                <span class="text-lg p-2 bg-slate-950 rounded-lg border border-slate-800">{{ venue.icon }}</span>
                <div>
                  <p class="text-sm font-bold text-white">{{ venue.name }}</p>
                  <p class="text-[10px] text-slate-500">ባለቤት፦ {{ venue.owner }}</p>
                </div>
              </td>
              <td class="p-4 text-slate-300">{{ venue.sport }}</td>
              <td class="p-4 text-slate-400">📍 {{ venue.location }}</td>
              <td class="p-4 font-bold text-emerald-400">{{ venue.pricePerHour }} ETB</td>
              <td class="p-4">
                <span 
                  class="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider"
                  :class="venue.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'"
                >
                  {{ venue.status }}
                </span>
              </td>
              <td class="p-4 text-right space-x-2">
                <button 
                  @click="toggleStatus(venue)"
                  class="px-3 py-1 rounded-lg text-[10px] font-bold border transition"
                  :class="venue.status === 'Active' ? 'border-amber-500/30 text-amber-400 hover:bg-amber-500/10' : 'border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10'"
                >
                  {{ venue.status === 'Active' ? 'Disable' : 'Approve' }}
                </button>
                <button 
                  @click="deleteVenue(venue.id)"
                  class="px-3 py-1 bg-rose-500/10 border border-rose-500/20 text-rose-400 hover:bg-rose-500/20 rounded-lg text-[10px] font-bold transition"
                >
                  Delete
                </button>
              </td>
            </tr>
            <tr v-if="filteredVenues.length === 0">
              <td colspan="6" class="p-6 text-center text-slate-500">ምንም የተገኘ ሜዳ የለም።</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- ADD VENUE MODAL -->
    <div v-if="showModal" class="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div class="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-md w-full space-y-4">
        <div class="flex justify-between items-center border-b border-slate-800 pb-3">
          <h3 class="text-sm font-bold text-white">አዲስ ሜዳ መመዝገቢያ</h3>
          <button @click="showModal = false" class="text-slate-400 hover:text-white">&times;</button>
        </div>

        <form @submit.prevent="addVenue" class="space-y-3">
          <div>
            <label class="block text-[11px] font-semibold text-slate-300 mb-1">የሜዳው ስም</label>
            <input v-model="form.name" type="text" class="w-full bg-slate-950 border border-slate-800 text-white rounded-lg p-2.5 text-xs outline-none focus:border-emerald-500" required />
          </div>
          <div class="grid grid-cols-2 gap-2">
            <div>
              <label class="block text-[11px] font-semibold text-slate-300 mb-1">ስፖርት</label>
              <select v-model="form.sport" class="w-full bg-slate-950 border border-slate-800 text-white rounded-lg p-2.5 text-xs outline-none focus:border-emerald-500">
                <option value="እግር ኳስ">እግር ኳስ</option>
                <option value="ቅርጫት ኳስ">ቅርጫት ኳስ</option>
                <option value="ቴኒስ">ቴኒስ</option>
              </select>
            </div>
            <div>
              <label class="block text-[11px] font-semibold text-slate-300 mb-1">የሰዓት ዋጋ (ETB)</label>
              <input v-model="form.pricePerHour" type="number" class="w-full bg-slate-950 border border-slate-800 text-white rounded-lg p-2.5 text-xs outline-none focus:border-emerald-500" required />
            </div>
          </div>
          <div>
            <label class="block text-[11px] font-semibold text-slate-300 mb-1">ቦታ</label>
            <input v-model="form.location" type="text" class="w-full bg-slate-950 border border-slate-800 text-white rounded-lg p-2.5 text-xs outline-none focus:border-emerald-500" required />
          </div>
          <div>
            <label class="block text-[11px] font-semibold text-slate-300 mb-1">የባለቤት ስም</label>
            <input v-model="form.owner" type="text" class="w-full bg-slate-950 border border-slate-800 text-white rounded-lg p-2.5 text-xs outline-none focus:border-emerald-500" required />
          </div>

          <button type="submit" class="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 rounded-lg text-xs transition mt-2">
            መዝግብ
          </button>
        </form>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const showModal = ref(false)
const searchQuery = ref('')

const venues = ref([
  { id: 1, name: 'ቦሌ አትሌቲክስ ፕሮ ግራስ', sport: 'እግር ኳስ', icon: '⚽', location: 'አዲስ አበባ፣ ቦሌ', pricePerHour: 1200, owner: 'ካሌብ ተስፋዬ', status: 'Active' },
  { id: 2, name: 'መክሊክ ኢንዶር ኮርት', sport: 'ቅርጫት ኳስ', icon: '🏀', location: 'አዲስ አበባ፣ ቂርቆስ', pricePerHour: 800, owner: 'ዮናስ አለሙ', status: 'Active' },
  { id: 3, name: 'ጣና ሪዞርት ቴኒስ ኮርት', sport: 'ቴኒስ', icon: '🎾', location: 'ባህር ዳር', pricePerHour: 600, owner: 'ሰለሞን ኃይሉ', status: 'Pending' }
])

const activeCount = computed(() => venues.value.filter(v => v.status === 'Active').length)
const pendingCount = computed(() => venues.value.filter(v => v.status === 'Pending').length)

const filteredVenues = computed(() => {
  return venues.value.filter(v => 
    v.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    v.location.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

const toggleStatus = (venue) => {
  venue.status = venue.status === 'Active' ? 'Pending' : 'Active'
}

const deleteVenue = (id) => {
  venues.value = venues.value.filter(v => v.id !== id)
}

const form = ref({ name: '', sport: 'እግር ኳስ', pricePerHour: '', location: '', owner: '' })

const addVenue = () => {
  venues.value.unshift({
    id: Date.now(),
    ...form.value,
    icon: form.value.sport === 'እግር ኳስ' ? '⚽' : form.value.sport === 'ቅርጫት ኳስ' ? '🏀' : '🎾',
    status: 'Active'
  })
  showModal.value = false
  form.value = { name: '', sport: 'እግር ኳስ', pricePerHour: '', location: '', owner: '' }
}
</script>