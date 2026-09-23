<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'

definePageMeta({ layout: 'partner' })

interface Venue {
  id: number
  name: string
}

interface Slot {
  id: number
  time: string
  status: 'available' | 'booked' | 'blocked'
  price?: string
  bookedBy?: string
  phone?: string
  paymentStatus?: string
}

const venues = ref<Venue[]>([])
const selectedVenueId = ref<number | null>(null)
const selectedDate = ref(new Date().toISOString().split('T')[0])
const timeSlots = ref<Slot[]>([])
const isLoading = ref(true)

const selectedSlot = ref<Slot | null>(null)
const isModalOpen = ref(false)

// 1. የሜዳዎችን ዝርዝር ማምጣት
const fetchVenues = async () => {
  try {
    const token = localStorage.getItem('auth_token')
    const res = await fetch('http://localhost:8000/api/owner/schedule/venues', {
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json'
      }
    })
    
    if (!res.ok) throw new Error('Failed to fetch venues')
    
    const responseData = await res.json()
    // Laravel API Resource Array ወይም Plain Array መሆኑን መፈተሽ
    const loadedVenues = Array.isArray(responseData) ? responseData : (responseData?.data || [])
    venues.value = loadedVenues

    if (loadedVenues.length > 0 && loadedVenues[0]?.id) {
      selectedVenueId.value = loadedVenues[0].id
    } else {
      selectedVenueId.value = null
      isLoading.value = false
    }
  } catch (e) { 
    console.error('Error fetching venues:', e)
    venues.value = []
    isLoading.value = false
  }
}

// 2. የሰዓት ዝርዝሮችን ማምጣት
const fetchSlots = async () => {
  if (!selectedVenueId.value) {
    isLoading.value = false
    timeSlots.value = []
    return
  }

  isLoading.value = true
  try {
    const token = localStorage.getItem('auth_token')
    const res = await fetch(`http://localhost:8000/api/owner/schedule/slots?venue_id=${selectedVenueId.value}&date=${selectedDate.value}`, {
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json'
      }
    })
    
    if (!res.ok) throw new Error('Failed to fetch slots')
    
    const responseData = await res.json()
    timeSlots.value = Array.isArray(responseData) ? responseData : (responseData?.slots || responseData?.data || [])
  } catch (e) { 
    console.error('Error fetching slots:', e) 
    timeSlots.value = []
  } finally { 
    isLoading.value = false 
  }
}

// 3. ሰዓት መዝጋት/መክፈት (Toggle Slot)
const handleSlotClick = async (slot: Slot) => {
  if (!slot) return

  // የተያዘ ሰዓት ከሆነ የያዘውን ሰው መረጃ በሞዳል አሳይ
  if (slot.status === 'booked') {
    selectedSlot.value = slot
    isModalOpen.value = true
    return
  }

  // UI ላይ ወዲያውኑ ቀይረው (Optimistic Update)
  const previousStatus = slot.status
  slot.status = slot.status === 'available' ? 'blocked' : 'available'

  try {
    const token = localStorage.getItem('auth_token')
    const res = await fetch('http://localhost:8000/api/owner/schedule/toggle-block', {
      method: 'POST',
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        venue_id: selectedVenueId.value,
        date: selectedDate.value,
        hour: slot.id
      })
    })

    if (!res.ok) {
      // API ከተሳሳተ ወደነበረበት መልሰው
      slot.status = previousStatus
    }
  } catch (e) { 
    console.error('Error toggling slot:', e) 
    slot.status = previousStatus
  }
}

onMounted(async () => {
  await fetchVenues()
  if (selectedVenueId.value) {
    await fetchSlots()
  }
})

// ሜዳ ወይም ቀን ሲቀየር ዳታውን በራስ-ሰር አድስ
watch([selectedVenueId, selectedDate], () => {
  if (selectedVenueId.value) {
    fetchSlots()
  }
})

const totalSlots = computed(() => timeSlots.value?.length || 0)
const bookedSlots = computed(() => timeSlots.value?.filter((s) => s?.status === 'booked').length || 0)
const availableSlots = computed(() => timeSlots.value?.filter((s) => s?.status === 'available').length || 0)
</script>

<template>
  <div class="space-y-6">
    <!-- Header & Controls -->
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-5">
      <div>
        <h1 class="text-2xl font-black text-white tracking-tight">የቀን መርሃግብር (Schedule)</h1>
        <p class="text-xs text-slate-400 mt-1">የሜዳዎችን ክፍት ሰዓታት ያስተካክሉ ወይም የተያዙ ቦታዎችን ይመልከቱ።</p>
      </div>

      <div class="flex flex-wrap items-center gap-3">
        <select 
          v-model="selectedVenueId" 
          class="bg-[#111c2a] border border-slate-800 text-xs font-semibold text-slate-200 px-3.5 py-2.5 rounded-xl focus:outline-none focus:border-emerald-500 shadow-sm"
        >
          <option v-if="!venues || venues.length === 0" :value="null" disabled class="bg-[#111c2a]">ምንም ሜዳ የለም</option>
          <option v-for="venue in venues" :key="venue.id" :value="venue.id" class="bg-[#111c2a]">{{ venue.name }}</option>
        </select>

        <input 
          v-model="selectedDate" 
          type="date" 
          class="bg-[#111c2a] border border-slate-800 text-xs font-semibold text-slate-200 px-3.5 py-2.5 rounded-xl focus:outline-none focus:border-emerald-500 shadow-sm color-scheme-dark"
        />
      </div>
    </div>

    <!-- Stats Section -->
    <div class="grid grid-cols-3 gap-4" v-if="!isLoading && selectedVenueId">
      <div class="bg-[#111c2a] p-4 rounded-2xl text-center border border-slate-800 shadow-sm">
        <span class="text-[10px] text-slate-400 font-bold uppercase tracking-wider">ጠቅላላ ሰዓታት</span>
        <div class="text-2xl font-black text-white mt-0.5">{{ totalSlots }}</div>
      </div>
      <div class="bg-emerald-950/20 p-4 rounded-2xl text-center border border-emerald-500/20 shadow-sm">
        <span class="text-[10px] text-emerald-400 font-bold uppercase tracking-wider">ክፍት ሰዓታት</span>
        <div class="text-2xl font-black text-emerald-400 mt-0.5">{{ availableSlots }}</div>
      </div>
      <div class="bg-blue-950/20 p-4 rounded-2xl text-center border border-blue-500/20 shadow-sm">
        <span class="text-[10px] text-blue-400 font-bold uppercase tracking-wider">የተያዙ ሰዓታት</span>
        <div class="text-2xl font-black text-blue-400 mt-0.5">{{ bookedSlots }}</div>
      </div>
    </div>

    <!-- Main Content Area -->
    <div v-if="isLoading" class="flex items-center justify-center py-20">
      <div class="animate-spin rounded-full h-9 w-9 border-t-2 border-emerald-500 border-r-2 border-slate-700"></div>
    </div>

    <div v-else-if="!selectedVenueId" class="text-center py-16 bg-[#111c2a] rounded-2xl border border-slate-800 shadow-sm">
      <p class="text-slate-400 font-medium text-sm">እባክዎን መርሃግብር ለማየት አስቀድመው ሜዳ ይመዝግቡ ወይም ይምረጡ።</p>
      <NuxtLink to="/partner/venues/create" class="inline-block mt-4 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl transition shadow-sm">
        + አዲስ ሜዳ ጨምር
      </NuxtLink>
    </div>

    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div 
        v-for="slot in timeSlots" 
        :key="slot.id" 
        @click="handleSlotClick(slot)"
        class="p-4 rounded-2xl border transition cursor-pointer h-28 flex flex-col justify-between shadow-sm select-none"
        :class="{
          'bg-emerald-950/15 border-emerald-500/30 hover:border-emerald-500/60': slot.status === 'available',
          'bg-blue-950/15 border-blue-500/30 hover:border-blue-500/60': slot.status === 'booked',
          'bg-rose-950/15 border-rose-500/30 hover:border-rose-500/60': slot.status === 'blocked'
        }"
      >
        <div class="flex justify-between items-start">
          <span class="text-xs font-mono font-bold text-white">{{ slot.time }}</span>
          <span 
            class="text-[9px] font-black uppercase px-2 py-0.5 rounded-md border"
            :class="{
              'bg-emerald-500/10 text-emerald-400 border-emerald-500/30': slot.status === 'available',
              'bg-blue-500/10 text-blue-400 border-blue-500/30': slot.status === 'booked',
              'bg-rose-500/10 text-rose-400 border-rose-500/30': slot.status === 'blocked'
            }"
          >
            {{ slot.status === 'available' ? 'ክፍት' : slot.status === 'booked' ? 'የተያዘ' : 'የተዘጋ' }}
          </span>
        </div>

        <div class="mt-2">
          <div v-if="slot.status === 'booked'" class="text-xs text-blue-300 truncate font-bold flex items-center gap-1.5">
            <span>👤</span>
            <span class="truncate">{{ slot.bookedBy || 'ደንበኛ' }}</span>
          </div>
          <div v-else-if="slot.status === 'available'" class="text-xs text-emerald-400 font-bold">
            {{ slot.price || 'ክፍት ሰዓት' }}
          </div>
          <div v-else class="text-xs text-rose-400 font-bold flex items-center gap-1.5">
            <span>🔒</span>
            <span>ተዘግቷል (ለመክፈት ይጫኑ)</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Booking Details Modal -->
    <div v-if="isModalOpen" class="fixed inset-0 z-[120] bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div class="bg-[#111c2a] border border-slate-800 rounded-2xl w-full max-w-md p-6 space-y-5 shadow-2xl relative text-white">
        <div class="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 class="text-base font-bold text-white">የቦታ ማስያዝ መረጃ</h3>
          <button @click="isModalOpen = false" class="text-slate-400 hover:text-white transition cursor-pointer font-bold px-2 py-1">✕</button>
        </div>

        <div v-if="selectedSlot" class="space-y-3.5 text-xs">
          <div class="bg-[#0b131e] p-3 rounded-xl border border-slate-800 flex justify-between items-center">
            <span class="text-slate-400 font-medium">የተያዘው ሰዓት</span>
            <span class="font-bold font-mono text-emerald-400">{{ selectedSlot.time }}</span>
          </div>
          <div class="flex justify-between items-center py-1 border-b border-slate-800/40">
            <span class="text-slate-400 font-medium">ተጫዋች / ደንበኛ</span>
            <span class="font-bold text-white">{{ selectedSlot.bookedBy || 'አልተጠቀሰም' }}</span>
          </div>
          <div class="flex justify-between items-center py-1 border-b border-slate-800/40">
            <span class="text-slate-400 font-medium">ስልክ ቁጥር</span>
            <span class="font-bold text-white">{{ selectedSlot.phone || '+251 9... ' }}</span>
          </div>
          <div class="flex justify-between items-center py-1">
            <span class="text-slate-400 font-medium">የክፍያ ሁኔታ</span>
            <span class="px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              {{ selectedSlot.paymentStatus || 'ተከፍሏል' }}
            </span>
          </div>
        </div>

        <div class="pt-3 border-t border-slate-800 flex justify-end">
          <button @click="isModalOpen = false" class="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 transition cursor-pointer">
            ዝጋ
          </button>
        </div>
      </div>
    </div>

  </div>
</template>