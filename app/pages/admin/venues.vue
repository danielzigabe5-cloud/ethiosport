<script setup>
import { ref } from 'vue'

definePageMeta({ layout: 'admin' })

const isModalOpen = ref(false)
const venues = ref([
  { id: 1, name: 'ሳርቤት ፉትሳል ሜዳ', category: 'Football', price: '800 ETB/hr', status: 'Active' },
  { id: 2, name: 'ቦሌ አሬና ቴኒስ', category: 'Tennis', price: '1200 ETB/hr', status: 'Active' },
  { id: 3, name: 'ካዛንችስ ስፖርት ሴንተር', category: 'Basketball', price: '1000 ETB/hr', status: 'Maintenance' }
])

const newVenue = ref({ name: '', category: 'Football', price: '', status: 'Active' })

const addVenue = () => {
  if (!newVenue.value.name || !newVenue.value.price) return
  venues.value.push({
    id: Date.now(),
    name: newVenue.value.name,
    category: newVenue.value.category,
    price: `${newVenue.value.price} ETB/hr`,
    status: newVenue.value.status
  })
  newVenue.value = { name: '', category: 'Football', price: '', status: 'Active' }
  isModalOpen.value = false
}

const toggleStatus = (venue) => {
  venue.status = venue.status === 'Active' ? 'Maintenance' : 'Active'
}

const deleteVenue = (id) => {
  venues.value = venues.value.filter(v => v.id !== id)
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <div>
        <h1 class="text-2xl font-black text-slate-900 dark:text-white">የሜዳዎች ማኔጅመንት</h1>
        <p class="text-xs text-slate-500">ሜዳዎችን ይጨምሩ፣ ሁኔታቸውን ይቆጣጠሩ</p>
      </div>
      <button @click="isModalOpen = true" class="px-4 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl shadow transition cursor-pointer">
        + አዲስ ሜዳ ጨምር
      </button>
    </div>

    <!-- Table -->
    <div class="bg-white dark:bg-[#0b111a] rounded-2xl border border-slate-200 dark:border-[#212e3e] overflow-hidden">
      <table class="w-full text-left text-xs">
        <thead class="bg-slate-50 dark:bg-[#131c27] text-slate-400 font-black uppercase">
          <tr>
            <th class="p-4">ID</th>
            <th class="p-4">የሜዳው ስም</th>
            <th class="p-4">አይነት</th>
            <th class="p-4">ዋጋ</th>
            <th class="p-4">ሁኔታ</th>
            <th class="p-4 text-right">ተግባር (Actions)</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100 dark:divide-[#212e3e]">
          <tr v-for="v in venues" :key="v.id" class="font-semibold">
            <td class="p-4 text-emerald-500">#{{ v.id }}</td>
            <td class="p-4 font-bold text-slate-900 dark:text-white">{{ v.name }}</td>
            <td class="p-4">{{ v.category }}</td>
            <td class="p-4">{{ v.price }}</td>
            <td class="p-4">
              <span :class="['px-2.5 py-1 rounded-full text-[10px] font-bold', v.status === 'Active' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500']">
                {{ v.status }}
              </span>
            </td>
            <td class="p-4 text-right space-x-2">
              <button @click="toggleStatus(v)" class="px-3 py-1 bg-slate-100 dark:bg-[#131c27] hover:bg-slate-200 rounded-lg text-[11px] font-bold transition">
                ቀይር
              </button>
              <button @click="deleteVenue(v.id)" class="px-3 py-1 bg-rose-500/10 text-rose-500 hover:bg-rose-500 hover:text-white rounded-lg text-[11px] font-bold transition">
                ሰርዝ
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Add Venue Modal -->
    <div v-if="isModalOpen" class="fixed inset-0 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div class="bg-white dark:bg-[#0b111a] border border-slate-200 dark:border-[#212e3e] w-full max-w-md rounded-2xl p-6 space-y-4">
        <h3 class="text-lg font-black text-slate-900 dark:text-white">አዲስ የስፖርት ሜዳ መመዝገቢያ</h3>
        
        <div class="space-y-3">
          <div>
            <label class="block text-xs font-bold mb-1">የሜዳው ስም</label>
            <input v-model="newVenue.name" type="text" class="w-full p-2.5 bg-slate-100 dark:bg-[#131c27] border rounded-xl text-xs font-bold" placeholder="ለምሳሌ፡ 22 ፉትሳል" />
          </div>
          <div>
            <label class="block text-xs font-bold mb-1">አይነት</label>
            <select v-model="newVenue.category" class="w-full p-2.5 bg-slate-100 dark:bg-[#131c27] border rounded-xl text-xs font-bold">
              <option value="Football">Football</option>
              <option value="Tennis">Tennis</option>
              <option value="Basketball">Basketball</option>
            </select>
          </div>
          <div>
            <label class="block text-xs font-bold mb-1">ዋጋ በሰዓት (ETB)</label>
            <input v-model="newVenue.price" type="number" class="w-full p-2.5 bg-slate-100 dark:bg-[#131c27] border rounded-xl text-xs font-bold" placeholder="800" />
          </div>
        </div>

        <div class="flex justify-end gap-2 pt-2">
          <button @click="isModalOpen = false" class="px-4 py-2 bg-slate-200 dark:bg-[#131c27] text-xs font-bold rounded-xl">ሰርዝ</button>
          <button @click="addVenue" class="px-4 py-2 bg-emerald-500 text-slate-950 text-xs font-bold rounded-xl">መዝግብ</button>
        </div>
      </div>
    </div>
  </div>
</template>