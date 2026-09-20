<script setup lang="ts">
import { ref, computed } from 'vue'

definePageMeta({ layout: 'partner' })

// 1. Venue Interface Definition
interface Venue {
  id: string
  name: string
  type: '5v5' | '7v7' | '11v11'
  pricePerHour: number
  location: string
  surfaceType: 'Artificial Turf' | 'Natural Grass' | 'Indoor'
  status: 'active' | 'maintenance' | 'inactive'
  image: string
}

// 2. Mock Venues State
const venues = ref<Venue[]>([
  {
    id: 'V-101',
    name: 'አዲስ አሬና ፉትሳል (Field A)',
    type: '5v5',
    pricePerHour: 1200,
    location: 'ቦሌ፣ አዲስ አበባ',
    surfaceType: 'Artificial Turf',
    status: 'active',
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'V-102',
    name: 'አዲስ አሬና ዋና ሜዳ (Field B)',
    type: '7v7',
    pricePerHour: 1800,
    location: 'ቦሌ፣ አዲስ አበባ',
    surfaceType: 'Artificial Turf',
    status: 'active',
    image: 'https://images.unsplash.com/photo-1529900748604-07564a03e7a6?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'V-103',
    name: 'ስታዲየም ዞን 3',
    type: '11v11',
    pricePerHour: 3500,
    location: 'መገናኛ፣ አዲስ አበባ',
    surfaceType: 'Natural Grass',
    status: 'maintenance',
    image: 'https://images.unsplash.com/photo-1459865264687-595d652de67e?auto=format&fit=crop&w=600&q=80'
  }
])

// 3. Search & Filter
const searchQuery = ref('')
const filteredVenues = computed(() => {
  return venues.value.filter(venue => 
    venue.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    venue.location.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

// 4. Modal & Form State
const isModalOpen = ref(false)
const isEditing = ref(false)
const editingId = ref<string | null>(null)

const formData = ref({
  name: '',
  type: '5v5' as '5v5' | '7v7' | '11v11',
  pricePerHour: 1000,
  location: '',
  surfaceType: 'Artificial Turf' as 'Artificial Turf' | 'Natural Grass' | 'Indoor',
  status: 'active' as 'active' | 'maintenance' | 'inactive'
})

// Open Modal for Create
const openCreateModal = () => {
  isEditing.value = false
  editingId.value = null
  formData.value = {
    name: '',
    type: '5v5',
    pricePerHour: 1200,
    location: '',
    surfaceType: 'Artificial Turf',
    status: 'active'
  }
  isModalOpen.value = true
}

// Open Modal for Edit
const openEditModal = (venue: Venue) => {
  isEditing.value = true
  editingId.value = venue.id
  formData.value = {
    name: venue.name,
    type: venue.type,
    pricePerHour: venue.pricePerHour,
    location: venue.location,
    surfaceType: venue.surfaceType,
    status: venue.status
  }
  isModalOpen.value = true
}

// Save Venue (Create or Update)
const saveVenue = () => {
  if (!formData.value.name || !formData.value.location) return

  if (isEditing.value && editingId.value) {
    const index = venues.value.findIndex(v => v.id === editingId.value)
    if (index !== -1) {
      venues.value[index] = {
        ...venues.value[index],
        ...formData.value
      }
    }
  } else {
    venues.value.unshift({
      id: `V-${Math.floor(100 + Math.random() * 900)}`,
      ...formData.value,
      image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=600&q=80'
    })
  }

  isModalOpen.value = false
}

// Toggle Venue Status
const toggleStatus = (venue: Venue) => {
  venue.status = venue.status === 'active' ? 'inactive' : 'active'
}

// Delete Venue
const deleteVenue = (id: string) => {
  if (confirm('እርግጠኛ ነዎት ይህንን ሜዳ መሰረዝ ይፈልጋሉ?')) {
    venues.value = venues.value.filter(v => v.id !== id)
  }
}
</script>

<template>
  <div class="space-y-6">
    <!-- Header Section -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl font-black text-slate-900 tracking-tight">የእኔ ሜዳዎች (My Venues)</h1>
        <p class="text-xs sm:text-sm text-slate-500 mt-1">
          የተመዘገቡ ሜዳዎችዎን ያስተዳድሩ፣ ዋጋ ወይም መረጃ ያሻሽሉ።
        </p>
      </div>

      <button 
        @click="openCreateModal" 
        class="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition shadow-xs cursor-pointer text-center"
      >
        + አዲስ ሜዳ ጨምር
      </button>
    </div>

    <!-- Search Bar -->
    <div class="bg-white border border-slate-200 p-4 rounded-2xl flex items-center justify-between gap-4 shadow-xs">
      <div class="relative w-full sm:w-80">
        <Icon name="lucide:search" class="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input 
          v-model="searchQuery" 
          type="text" 
          placeholder="በሜዳ ስም ወይም ቦታ ፈልግ..."
          class="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:bg-white transition"
        />
      </div>

      <div class="text-xs text-slate-500 font-semibold hidden sm:block">
        ጠቅላላ ሜዳዎች: <span class="text-emerald-600 font-bold">{{ venues.length }}</span>
      </div>
    </div>

    <!-- Venues Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      <div 
        v-for="venue in filteredVenues" 
        :key="venue.id" 
        class="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs flex flex-col justify-between group hover:border-slate-300 hover:shadow-md transition duration-200"
      >
        <!-- Venue Image & Badges -->
        <div class="relative h-44 overflow-hidden bg-slate-100">
          <img :src="venue.image" :alt="venue.name" class="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
          <div class="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent"></div>
          
          <div class="absolute top-3 left-3 flex gap-2">
            <span class="bg-white/90 backdrop-blur-md text-emerald-700 font-extrabold text-[11px] px-2.5 py-1 rounded-lg border border-emerald-100 shadow-xs">
              {{ venue.type }}
            </span>
            <span class="bg-white/90 backdrop-blur-md text-slate-700 text-[11px] font-semibold px-2.5 py-1 rounded-lg border border-slate-200 shadow-xs">
              {{ venue.surfaceType }}
            </span>
          </div>

          <!-- Status Badge -->
          <div class="absolute top-3 right-3">
            <span 
              class="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider backdrop-blur-md shadow-xs"
              :class="{
                'bg-emerald-500/90 text-white': venue.status === 'active',
                'bg-amber-500/90 text-white': venue.status === 'maintenance',
                'bg-rose-500/90 text-white': venue.status === 'inactive'
              }"
            >
              {{ venue.status === 'active' ? 'በስራ ላይ' : venue.status === 'maintenance' ? 'ጥገና ላይ' : 'የተዘጋ' }}
            </span>
          </div>
        </div>

        <!-- Details -->
        <div class="p-5 space-y-3 flex-1">
          <div class="flex items-start justify-between gap-2">
            <h3 class="text-base font-bold text-slate-900 leading-snug">{{ venue.name }}</h3>
          </div>
          
          <p class="text-xs text-slate-500 flex items-center gap-1.5">
            <Icon name="lucide:map-pin" class="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>{{ venue.location }}</span>
          </p>

          <div class="pt-2 border-t border-slate-100 flex items-center justify-between">
            <span class="text-xs text-slate-500">የአንድ ሰአት ሂሳብ:</span>
            <span class="text-base font-black text-slate-900">
              {{ venue.pricePerHour.toLocaleString() }} <span class="text-xs font-bold text-emerald-600">ETB</span>
            </span>
          </div>
        </div>

        <!-- Actions Bar -->
        <div class="bg-slate-50 border-t border-slate-100 p-3 px-5 flex items-center justify-between gap-2">
          <button 
            @click="toggleStatus(venue)" 
            class="text-xs font-semibold text-slate-600 hover:text-slate-900 transition flex items-center gap-1 cursor-pointer"
          >
            <Icon :name="venue.status === 'active' ? 'lucide:power-off' : 'lucide:power'" class="w-3.5 h-3.5" />
            <span>{{ venue.status === 'active' ? 'አቦዝን' : 'አንቅታ' }}</span>
          </button>

          <div class="flex items-center gap-2">
            <button 
              @click="openEditModal(venue)"
              class="p-2 bg-white hover:bg-slate-200/60 text-slate-700 border border-slate-200 rounded-lg transition cursor-pointer shadow-xs"
              title="አስተካክል"
            >
              <Icon name="lucide:edit-3" class="w-4 h-4" />
            </button>
            <button 
              @click="deleteVenue(venue.id)"
              class="p-2 bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 rounded-lg transition cursor-pointer"
              title="ሰርዝ"
            >
              <Icon name="lucide:trash-2" class="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-if="filteredVenues.length === 0" class="bg-white border border-slate-200 rounded-2xl p-12 text-center text-slate-500 space-y-3 shadow-xs">
      <Icon name="lucide:map-pin-off" class="w-10 h-10 mx-auto text-slate-400" />
      <p class="text-sm font-semibold">ምንም የተገኘ ሜዳ የለም።</p>
    </div>

    <!-- CREATE / EDIT MODAL -->
    <div v-if="isModalOpen" class="fixed inset-0 z-[120] bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div class="bg-white border border-slate-200 rounded-2xl w-full max-w-lg p-6 space-y-5 shadow-2xl relative">
        
        <div class="flex items-center justify-between border-b border-slate-100 pb-4">
          <h3 class="text-base font-bold text-slate-900">
            {{ isEditing ? 'የሜዳ መረጃ አስተካክል' : 'አዲስ ሜዳ መዝግብ' }}
          </h3>
          <button @click="isModalOpen = false" class="text-slate-400 hover:text-slate-600 transition">
            <Icon name="lucide:x" class="w-5 h-5" />
          </button>
        </div>

        <form @submit.prevent="saveVenue" class="space-y-4">
          <div>
            <label class="block text-xs font-semibold text-slate-700 mb-1">የሜዳው ስም</label>
            <input 
              v-model="formData.name" 
              type="text" 
              required
              placeholder="ምሳሌ: ቦሌ ፉትሳል Field A"
              class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-emerald-500 focus:bg-white transition"
            />
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1">የሜዳ አይነት</label>
              <select 
                v-model="formData.type"
                class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-emerald-500 focus:bg-white transition"
              >
                <option value="5v5">5v5</option>
                <option value="7v7">7v7</option>
                <option value="11v11">11v11</option>
              </select>
            </div>

            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1">የሳር አይነት (Surface)</label>
              <select 
                v-model="formData.surfaceType"
                class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-emerald-500 focus:bg-white transition"
              >
                <option value="Artificial Turf">Artificial Turf</option>
                <option value="Natural Grass">Natural Grass</option>
                <option value="Indoor">Indoor</option>
              </select>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1">የአንድ ሰአት ዋጋ (ETB)</label>
              <input 
                v-model.number="formData.pricePerHour" 
                type="number" 
                required
                min="100"
                class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-emerald-500 focus:bg-white transition"
              />
            </div>

            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1">ሁኔታ (Status)</label>
              <select 
                v-model="formData.status"
                class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-emerald-500 focus:bg-white transition"
              >
                <option value="active">በስራ ላይ (Active)</option>
                <option value="maintenance">ጥገና ላይ (Maintenance)</option>
                <option value="inactive">የተዘጋ (Inactive)</option>
              </select>
            </div>
          </div>

          <div>
            <label class="block text-xs font-semibold text-slate-700 mb-1">አድራሻ / ቦታ</label>
            <input 
              v-model="formData.location" 
              type="text" 
              required
              placeholder="ምሳሌ: ቦሌ፣ ማሊያ ህንፃ ጀርባ"
              class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-emerald-500 focus:bg-white transition"
            />
          </div>

          <div class="pt-3 flex justify-end gap-3 border-t border-slate-100">
            <button 
              type="button" 
              @click="isModalOpen = false" 
              class="px-4 py-2 rounded-xl text-xs font-bold text-slate-500 hover:bg-slate-100 transition"
            >
              ሰርዝ
            </button>
            <button 
              type="submit" 
              class="px-5 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white transition active:scale-95 shadow-xs"
            >
              {{ isEditing ? 'አስቀምጥ' : 'መዝግብ' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>