<template>
  <div class="space-y-6">
    <!-- PAGE HEADER -->
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 class="text-2xl font-black text-gray-900 dark:text-white tracking-tight">My Venues</h1>
        <p class="text-xs text-gray-500 dark:text-slate-400 mt-1">Manage and monitor all platform sports arenas</p>
      </div>

      <div class="flex items-center gap-3">
        <button 
          @click="refreshVenues" 
          :disabled="pending"
          class="flex items-center gap-2 text-xs font-bold text-gray-700 dark:text-slate-300 bg-white dark:bg-[#0b1320] border border-gray-200 dark:border-slate-800 hover:border-emerald-500 px-3.5 py-2.5 rounded-xl transition active:scale-95 disabled:opacity-50 cursor-pointer"
        >
          <Icon name="lucide:refresh-cw" :class="{ 'animate-spin': pending }" class="w-4 h-4" />
          Refresh
        </button>

        <button 
          @click="isAddModalOpen = true"
          class="flex items-center gap-2 text-xs font-bold text-black bg-emerald-500 hover:bg-emerald-400 px-4 py-2.5 rounded-xl transition active:scale-95 shadow-lg shadow-emerald-500/10 cursor-pointer"
        >
          <Icon name="lucide:plus" class="w-4 h-4" />
          Add New Venue
        </button>
      </div>
    </div>

    <!-- API ERROR ALERT -->
    <div v-if="error" class="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-between text-rose-500 text-xs">
      <div class="flex items-center gap-2">
        <Icon name="lucide:alert-triangle" class="w-4 h-4 shrink-0" />
        <span>የመጫን ስህተት ተፈጥሯል። Laravel Backend እየሰራ መሆኑን ያረጋግጡ።</span>
      </div>
      <button @click="refreshVenues" class="underline font-bold hover:text-rose-400 cursor-pointer">እንደገና ሞክር</button>
    </div>

    <!-- CONTROLS & FILTERS -->
    <div class="flex flex-col sm:flex-row justify-between gap-4 bg-white dark:bg-[#0b1320] p-4 rounded-2xl border border-gray-200 dark:border-slate-800">
      <!-- Search Input -->
      <div class="relative flex-1 max-w-md">
        <Icon name="lucide:search" class="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input 
          v-model="searchQuery"
          type="text" 
          placeholder="Search venue name, location..." 
          class="w-full bg-gray-50 dark:bg-[#070b10] border border-gray-200 dark:border-slate-800 text-xs rounded-xl pl-10 pr-4 py-2.5 text-gray-800 dark:text-slate-200 focus:outline-none focus:border-emerald-500 transition"
        />
      </div>

      <!-- Filter Tabs -->
      <div class="flex items-center gap-1 bg-gray-100 dark:bg-[#070b10] p-1 rounded-xl border border-gray-200 dark:border-slate-800">
        <button 
          v-for="status in ['all', 'active', 'pending']" 
          :key="status"
          @click="selectedStatus = status"
          class="px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition cursor-pointer"
          :class="selectedStatus === status ? 'bg-white dark:bg-[#0b1320] text-emerald-600 dark:text-emerald-400 shadow-sm' : 'text-gray-500 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white'"
        >
          {{ status }}
        </button>
      </div>
    </div>

    <!-- LOADING STATE (SKELETON CARDS) -->
    <div v-if="pending && !venuesData" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="n in 6" :key="n" class="bg-white dark:bg-[#0b1320] border border-gray-200 dark:border-slate-800 rounded-2xl p-5 space-y-4 animate-pulse">
        <div class="h-40 bg-gray-200 dark:bg-slate-800/60 rounded-xl"></div>
        <div class="h-4 bg-gray-200 dark:bg-slate-800/60 rounded w-3/4"></div>
        <div class="h-3 bg-gray-200 dark:bg-slate-800/60 rounded w-1/2"></div>
      </div>
    </div>

    <!-- EMPTY STATE -->
    <div v-else-if="filteredVenues.length === 0" class="text-center py-16 bg-white dark:bg-[#0b1320] rounded-2xl border border-gray-200 dark:border-slate-800">
      <Icon name="lucide:map-pin-off" class="w-12 h-12 text-gray-400 mx-auto mb-3" />
      <h3 class="text-sm font-bold text-gray-700 dark:text-slate-300">No Venues Found</h3>
      <p class="text-xs text-gray-500 dark:text-slate-500 mt-1">ምንም አይነት ቬኑ አልተገኘም።</p>
    </div>

    <!-- VENUES GRID -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div 
        v-for="venue in filteredVenues" 
        :key="venue.id"
        class="bg-white dark:bg-[#0b1320] border border-gray-200 dark:border-slate-800 rounded-2xl overflow-hidden hover:border-emerald-500/40 transition flex flex-col justify-between"
      >
        <div>
          <!-- VENUE IMAGE & BADGE -->
          <div class="relative h-44 bg-slate-800">
            <img 
              :src="venue.image || '/images/default-venue.jpg'" 
              :alt="venue.name" 
              class="w-full h-full object-cover"
              loading="lazy"
              @error="(e) => (e.target as HTMLImageElement).src = '/images/default-venue.jpg'"
            />
            <div class="absolute top-3 right-3">
              <span 
                class="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border"
                :class="{
                  'bg-emerald-500/20 text-emerald-400 border-emerald-500/30': venue.status === 'active',
                  'bg-amber-500/20 text-amber-400 border-amber-500/30': venue.status === 'pending'
                }"
              >
                {{ venue.status }}
              </span>
            </div>
            <div class="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-lg text-[11px] font-bold text-white flex items-center gap-1">
              <Icon name="lucide:tag" class="w-3 h-3 text-emerald-400" />
              {{ venue.pricePerHour }} ETB / hr
            </div>
          </div>

          <!-- VENUE INFO -->
          <div class="p-5 space-y-3">
            <div>
              <h3 class="font-black text-base text-gray-900 dark:text-white truncate">{{ venue.name }}</h3>
              <p class="text-xs text-gray-500 dark:text-slate-400 flex items-center gap-1 mt-1">
                <Icon name="lucide:map-pin" class="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span class="truncate">{{ venue.location }}</span>
              </p>
            </div>

            <div class="grid grid-cols-2 gap-2 pt-2 border-t border-gray-100 dark:border-slate-800/80 text-xs">
              <div class="bg-gray-50 dark:bg-[#070b10] p-2 rounded-xl">
                <span class="text-[10px] text-gray-400 block uppercase font-bold">Category</span>
                <span class="font-bold text-gray-700 dark:text-slate-200 capitalize">{{ venue.type || 'Futsal' }}</span>
              </div>
              <div class="bg-gray-50 dark:bg-[#070b10] p-2 rounded-xl">
                <span class="text-[10px] text-gray-400 block uppercase font-bold">Owner / Partner</span>
                <span class="font-bold text-gray-700 dark:text-slate-200 truncate block">{{ venue.ownerName || 'N/A' }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- ACTIONS FOOTER -->
        <div class="p-4 bg-gray-50 dark:bg-[#070c14] border-t border-gray-200 dark:border-slate-800 flex items-center justify-between">
          <button 
            @click="toggleStatus(venue)"
            :disabled="updatingId === venue.id"
            class="text-xs font-bold px-3 py-1.5 rounded-lg border transition flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
            :class="venue.status === 'active' ? 'border-amber-500/30 text-amber-500 hover:bg-amber-500/10' : 'border-emerald-500/30 text-emerald-500 hover:bg-emerald-500/10'"
          >
            <Icon v-if="updatingId === venue.id" name="lucide:loader-2" class="w-3.5 h-3.5 animate-spin" />
            <span>{{ venue.status === 'active' ? 'Deactivate' : 'Approve & Activate' }}</span>
          </button>

          <NuxtLink 
            :to="`/admin/my-venues/${venue.id}`"
            class="text-xs font-bold text-gray-600 dark:text-slate-400 hover:text-emerald-500 flex items-center gap-1"
          >
            Details
            <Icon name="lucide:arrow-right" class="w-3.5 h-3.5" />
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- ADD VENUE MODAL -->
    <div v-if="isAddModalOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div class="bg-white dark:bg-[#0b1320] border border-gray-200 dark:border-slate-800 rounded-2xl w-full max-w-lg p-6 space-y-5 shadow-2xl relative">
        <div class="flex justify-between items-center border-b border-gray-100 dark:border-slate-800 pb-3">
          <h3 class="text-base font-black text-gray-900 dark:text-white">Add New Venue</h3>
          <button @click="isAddModalOpen = false" class="text-gray-400 hover:text-white">
            <Icon name="lucide:x" class="w-5 h-5" />
          </button>
        </div>

        <form @submit.prevent="handleAddVenue" class="space-y-4">
          <div>
            <label class="block text-xs font-bold text-gray-700 dark:text-slate-300 mb-1">Venue Name</label>
            <input v-model="newVenue.name" type="text" required class="w-full bg-gray-50 dark:bg-[#070b10] border border-gray-200 dark:border-slate-800 text-xs rounded-xl p-3 text-gray-900 dark:text-white focus:outline-none focus:border-emerald-500" placeholder="e.g. Bole Futsal Arena" />
          </div>

          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-xs font-bold text-gray-700 dark:text-slate-300 mb-1">Location</label>
              <input v-model="newVenue.location" type="text" required class="w-full bg-gray-50 dark:bg-[#070b10] border border-gray-200 dark:border-slate-800 text-xs rounded-xl p-3 text-gray-900 dark:text-white focus:outline-none focus:border-emerald-500" placeholder="e.g. Bole, Addis Ababa" />
            </div>
            <div>
              <label class="block text-xs font-bold text-gray-700 dark:text-slate-300 mb-1">Price per hour (ETB)</label>
              <input v-model.number="newVenue.pricePerHour" type="number" required class="w-full bg-gray-50 dark:bg-[#070b10] border border-gray-200 dark:border-slate-800 text-xs rounded-xl p-3 text-gray-900 dark:text-white focus:outline-none focus:border-emerald-500" placeholder="1000" />
            </div>
          </div>

          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-xs font-bold text-gray-700 dark:text-slate-300 mb-1">Category / Type</label>
              <select v-model="newVenue.type" class="w-full bg-gray-50 dark:bg-[#070b10] border border-gray-200 dark:border-slate-800 text-xs rounded-xl p-3 text-gray-900 dark:text-white focus:outline-none focus:border-emerald-500">
                <option value="Futsal">Futsal</option>
                <option value="Basketball">Basketball</option>
                <option value="Tennis">Tennis</option>
                <option value="Volleyball">Volleyball</option>
              </select>
            </div>
            <div>
              <label class="block text-xs font-bold text-gray-700 dark:text-slate-300 mb-1">Owner Name</label>
              <input v-model="newVenue.ownerName" type="text" class="w-full bg-gray-50 dark:bg-[#070b10] border border-gray-200 dark:border-slate-800 text-xs rounded-xl p-3 text-gray-900 dark:text-white focus:outline-none focus:border-emerald-500" placeholder="Owner or Partner Name" />
            </div>
          </div>

          <div>
            <label class="block text-xs font-bold text-gray-700 dark:text-slate-300 mb-1">Image URL</label>
            <input v-model="newVenue.image" type="url" class="w-full bg-gray-50 dark:bg-[#070b10] border border-gray-200 dark:border-slate-800 text-xs rounded-xl p-3 text-gray-900 dark:text-white focus:outline-none focus:border-emerald-500" placeholder="https://example.com/image.jpg" />
          </div>

          <div class="flex justify-end gap-3 pt-3 border-t border-gray-100 dark:border-slate-800">
            <button type="button" @click="isAddModalOpen = false" class="px-4 py-2.5 rounded-xl text-xs font-bold text-gray-500 hover:text-gray-700 dark:hover:text-white">Cancel</button>
            <button type="submit" :disabled="isSubmitting" class="flex items-center gap-2 px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs rounded-xl transition disabled:opacity-50 cursor-pointer">
              <Icon v-if="isSubmitting" name="lucide:loader-2" class="w-4 h-4 animate-spin" />
              <span>Save Venue</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

definePageMeta({
  layout: 'admin',
})

const config = useRuntimeConfig()
const token = useCookie('auth_token')

const searchQuery = ref('')
const selectedStatus = ref('all')
const isAddModalOpen = ref(false)
const isSubmitting = ref(false)
const updatingId = ref<number | null>(null)

interface Venue {
  id: number
  name: string
  location: string
  pricePerHour: number
  type: string
  status: 'active' | 'pending'
  image?: string
  ownerName?: string
}

const newVenue = ref({
  name: '',
  location: '',
  pricePerHour: 1000,
  type: 'Futsal',
  ownerName: '',
  image: ''
})

// LAZY & ASYNC DATA FETCHING FOR INSTANT NAVIGATION
const { data: venuesData, pending, error, refresh: refreshVenues } = useLazyFetch<Venue[]>('/admin/venues', {
  baseURL: config.public.apiBase || 'http://localhost:8000',
  headers: {
    Authorization: token.value ? `Bearer ${token.value}` : '',
    Accept: 'application/json'
  },
  // CACHE & SPEED OPTIMIZATIONS
  key: 'admin-venues-list',
  server: false,
  lazy: true
})

// FILTER & SEARCH LOGIC
const filteredVenues = computed(() => {
  const list = venuesData.value || []
  return list.filter(venue => {
    const matchesSearch = (venue.name?.toLowerCase() || '').includes(searchQuery.value.toLowerCase()) ||
                          (venue.location?.toLowerCase() || '').includes(searchQuery.value.toLowerCase())
    const matchesStatus = selectedStatus.value === 'all' || venue.status === selectedStatus.value
    return matchesSearch && matchesStatus
  })
})

// TOGGLE STATUS
const toggleStatus = async (venue: Venue) => {
  updatingId.value = venue.id
  const newStatus = venue.status === 'active' ? 'pending' : 'active'
  
  try {
    await $fetch(`/admin/venues/${venue.id}/status`, {
      baseURL: config.public.apiBase || 'http://localhost:8000',
      method: 'PATCH',
      headers: {
        Authorization: token.value ? `Bearer ${token.value}` : '',
        Accept: 'application/json'
      },
      body: { status: newStatus }
    })
    venue.status = newStatus
  } catch (err) {
    alert('Status መቀየር አልተቻለም!')
  } finally {
    updatingId.value = null
  }
}

// ADD NEW VENUE
const handleAddVenue = async () => {
  isSubmitting.value = true
  try {
    await $fetch<Venue>('/admin/venues', {
      baseURL: config.public.apiBase || 'http://localhost:8000',
      method: 'POST',
      headers: {
        Authorization: token.value ? `Bearer ${token.value}` : '',
        Accept: 'application/json'
      },
      body: newVenue.value
    })

    newVenue.value = { name: '', location: '', pricePerHour: 1000, type: 'Futsal', ownerName: '', image: '' }
    isAddModalOpen.value = false
    await refreshVenues()
  } catch (err) {
    alert('አዲስ ቬኑ መመዝገብ አልተቻለም።')
  } finally {
    isSubmitting.value = false
  }
}
</script>