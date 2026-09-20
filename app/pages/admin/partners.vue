<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl font-black text-slate-900">Partners & Venues</h1>
        <p class="text-xs text-slate-500 mt-1">Manage registered venues and status approvals</p>
      </div>
      <NuxtLink 
        to="/venues/create" 
        class="bg-[#10B981] hover:bg-emerald-600 active:scale-95 text-white px-4 py-2 rounded-xl text-xs font-bold transition text-center shadow-xs"
      >
        + Add New Venue
      </NuxtLink>
    </div>

    <!-- Search & Filter Controls -->
    <div class="flex flex-col sm:flex-row gap-3 justify-between">
      <input 
        v-model="searchQuery"
        type="text" 
        placeholder="Search venue or owner..." 
        class="bg-white border border-slate-200 text-slate-800 text-xs rounded-xl px-4 py-2.5 focus:outline-none focus:border-emerald-500 w-full sm:w-64 shadow-xs"
      />
      
      <select 
        v-model="selectedStatus" 
        class="bg-white border border-slate-200 text-slate-700 text-xs rounded-xl px-3 py-2.5 focus:outline-none focus:border-emerald-500 shadow-xs"
      >
        <option value="all">All Status</option>
        <option value="active">Approved</option>
        <option value="pending">Pending Review</option>
      </select>
    </div>

    <!-- Data Table -->
    <div class="bg-white border border-slate-200 rounded-2xl overflow-x-auto shadow-xs">
      <table class="w-full text-left text-xs text-slate-600">
        <thead class="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-bold">
          <tr>
            <th class="p-4">Venue Name</th>
            <th class="p-4">Owner</th>
            <th class="p-4">Location</th>
            <th class="p-4">Status</th>
            <th class="p-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100">
          <tr v-for="p in filteredPartners" :key="p.id" class="hover:bg-slate-50 transition">
            <td class="p-4 font-bold text-slate-900">{{ p.name }}</td>
            <td class="p-4">{{ p.owner }}</td>
            <td class="p-4">{{ p.location }}</td>
            <td class="p-4">
              <span 
                class="px-2.5 py-1 rounded-full text-[10px] font-bold border inline-block"
                :class="p.active 
                  ? 'bg-emerald-50 text-emerald-600 border-emerald-200' 
                  : 'bg-amber-50 text-amber-600 border-amber-200'"
              >
                {{ p.active ? 'Approved' : 'Pending Review' }}
              </span>
            </td>
            <td class="p-4 text-right space-x-3">
              <!-- Approve / Disable Button -->
              <button 
                @click="toggleStatus(p.id)" 
                class="font-semibold transition cursor-pointer"
                :class="p.active ? 'text-amber-600 hover:text-amber-700' : 'text-emerald-600 hover:text-emerald-700'"
              >
                {{ p.active ? 'Disable' : 'Approve' }}
              </button>

              <!-- Edit Button -->
              <NuxtLink 
                :to="`/venues/edit/${p.id}`" 
                class="text-blue-600 hover:text-blue-700 font-semibold transition"
              >
                Edit
              </NuxtLink>

              <!-- Delete Button -->
              <button 
                @click="deletePartner(p.id)" 
                class="text-rose-600 hover:text-rose-700 font-semibold transition cursor-pointer"
              >
                Delete
              </button>
            </td>
          </tr>

          <tr v-if="filteredPartners.length === 0">
            <td colspan="5" class="p-8 text-center text-slate-400">
              No partners or venues found.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

definePageMeta({ layout: 'admin' })

const searchQuery = ref('')
const selectedStatus = ref('all')

const partners = useState('partners-list', () => [
  { id: 1, name: 'Bole Futsal Arena', owner: 'Dawit Abebe', location: 'Addis Ababa, Bole', active: true },
  { id: 2, name: 'Kazanchis Sports Zone', owner: 'Yonas Tesfaye', location: 'Addis Ababa, Kazanchis', active: false },
  { id: 3, name: 'Meskel Friendship Pitch', owner: 'Sara Kebede', location: 'Addis Ababa, Stadium', active: true }
])

const filteredPartners = computed(() => {
  return partners.value.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                          item.owner.toLowerCase().includes(searchQuery.value.toLowerCase())
    
    if (selectedStatus.value === 'active') return matchesSearch && item.active
    if (selectedStatus.value === 'pending') return matchesSearch && !item.active
    return matchesSearch
  })
})

const toggleStatus = (id: number) => {
  const item = partners.value.find(p => p.id === id)
  if (item) item.active = !item.active
}

const deletePartner = (id: number) => {
  if (confirm('Are you sure you want to delete this venue?')) {
    partners.value = partners.value.filter(p => p.id !== id)
  }
}
</script>