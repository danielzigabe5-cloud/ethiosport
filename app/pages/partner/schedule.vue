<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'

definePageMeta({ layout: 'partner' })

const venues = ref([])
const selectedVenueId = ref<number | null>(null)
const selectedDate = ref(new Date().toISOString().split('T')[0])
const timeSlots = ref([])
const isLoading = ref(true)

// 1. የሜዳዎችን ዝርዝር ማምጣት
const fetchVenues = async () => {
  try {
    const token = localStorage.getItem('auth_token')
    const res = await fetch('http://localhost:8000/api/owner/schedule/venues', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    const data = await res.json()
    venues.value = data
    if (data.length > 0) selectedVenueId.value = data[0].id
  } catch (e) { console.error(e) }
}

// 2. የሰዓት ዝርዝሮችን ማምጣት
const fetchSlots = async () => {
  if (!selectedVenueId.value) return
  isLoading.value = true
  try {
    const token = localStorage.getItem('auth_token')
    const res = await fetch(`http://localhost:8000/api/owner/schedule/slots?venue_id=${selectedVenueId.value}&date=${selectedDate.value}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    timeSlots.value = await res.json()
  } catch (e) { console.error(e) }
  finally { isLoading.value = false }
}

// 3. ሰዓት መዝጋት/መክፈት
const toggleSlotStatus = async (slot: any) => {
  if (slot.status === 'booked') {
    selectedSlot.value = slot
    isModalOpen.value = true
    return
  }

  try {
    const token = localStorage.getItem('auth_token')
    await fetch('http://localhost:8000/api/owner/schedule/toggle-block', {
      method: 'POST',
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        venue_id: selectedVenueId.value,
        date: selectedDate.value,
        hour: slot.id
      })
    })
    fetchSlots() // ዳታውን ለማደስ
  } catch (e) { console.error(e) }
}

onMounted(async () => {
  await fetchVenues()
  await fetchSlots()
})

// ሜዳ ወይም ቀን ሲቀየር ዳታውን በራስ-ሰር አድስ
watch([selectedVenueId, selectedDate], fetchSlots)

const selectedSlot = ref<any>(null)
const isModalOpen = ref(false)

const totalSlots = computed(() => timeSlots.value.length)
const bookedSlots = computed(() => timeSlots.value.filter((s:any) => s.status === 'booked').length)
const availableSlots = computed(() => timeSlots.value.filter((s:any) => s.status === 'available').length)
</script>

<template>
  <div class="space-y-6">
    <!-- Header & Controls -->
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl font-black text-white">የቀን መርሃግብር (Schedule)</h1>
        <p class="text-xs text-slate-400">የሜዳዎችን ክፍት ሰዓታት ያስተካክሉ ወይም የተያዙ ቦታዎችን ይመልከቱ።</p>
      </div>

      <div class="flex gap-3">
        <select v-model="selectedVenueId" class="bg-[#0d1522] border border-[#1a2432] text-xs text-white px-3 py-2 rounded-xl focus:border-emerald-500">
          <option v-for="venue in venues" :key="venue.id" :value="venue.id">{{ venue.name }}</option>
        </select>
        <input v-model="selectedDate" type="date" class="bg-[#0d1522] border border-[#1a2432] text-xs text-white px-3 py-2 rounded-xl focus:border-emerald-500"/>
      </div>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-3 gap-4" v-if="!isLoading">
      <div class="bg-[#0d1522] p-4 rounded-2xl text-center border border-[#1a2432]">
        <span class="text-[10px] text-slate-400 uppercase">ጠቅላላ</span>
        <div class="text-xl font-black text-white">{{ totalSlots }}</div>
      </div>
      <div class="bg-[#0d1522] p-4 rounded-2xl text-center border border-emerald-500/30">
        <span class="text-[10px] text-emerald-400 uppercase">ክፍት</span>
        <div class="text-xl font-black text-emerald-400">{{ availableSlots }}</div>
      </div>
      <div class="bg-[#0d1522] p-4 rounded-2xl text-center border border-blue-500/30">
        <span class="text-[10px] text-blue-400 uppercase">የተያዙ</span>
        <div class="text-xl font-black text-blue-400">{{ bookedSlots }}</div>
      </div>
    </div>

    <!-- Time Slots Grid -->
    <div v-if="isLoading" class="text-center py-10 text-slate-500">በመጫን ላይ...</div>
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div 
        v-for="slot in timeSlots" :key="slot.id" @click="toggleSlotStatus(slot)"
        class="p-4 rounded-2xl border transition cursor-pointer h-28 flex flex-col justify-between"
        :class="{
          'bg-emerald-500/10 border-emerald-500/30': slot.status === 'available',
          'bg-blue-500/10 border-blue-500/30': slot.status === 'booked',
          'bg-rose-500/10 border-rose-500/30': slot.status === 'blocked'
        }"
      >
        <div class="flex justify-between items-start">
          <span class="text-xs font-mono font-bold text-white">{{ slot.time }}</span>
          <span class="text-[9px] font-bold uppercase px-2 py-0.5 rounded-full border border-current">{{ slot.status }}</span>
        </div>
        <div class="mt-2">
          <div v-if="slot.status === 'booked'" class="text-xs text-white truncate font-bold">👤 {{ slot.bookedBy }}</div>
          <div v-else-if="slot.status === 'available'" class="text-xs text-emerald-400 font-bold">{{ slot.price }}</div>
          <div v-else class="text-xs text-rose-400 font-bold">የተዘጋ</div>
        </div>
      </div>
    </div>

    <!-- MODAL (ያለውን ኮድ ይጠቀሙ...) -->
  </div>
</template>