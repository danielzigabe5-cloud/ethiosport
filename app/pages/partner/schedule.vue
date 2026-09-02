<script setup lang="ts">
import { ref, computed } from 'vue'

definePageMeta({ layout: 'partner' })

// 1. Venues List
const venues = ref([
  { id: 1, name: 'አዲስ አበበ ሚኒ ስታዲየም (Futsal A)' },
  { id: 2, name: 'ቦሌ ስፖርት ኮምፕሌክስ (Pitch 2)' },
  { id: 3, name: 'ካዛንችስ ፉትሳል ሜዳ' }
])

const selectedVenueId = ref(1)
const selectedDate = ref('2026-09-02')

// 2. Time Slots Mock Data (8:00 AM - 10:00 PM)
const timeSlots = ref([
  { id: 101, time: '08:00 AM - 09:00 AM', status: 'available', bookedBy: null, phone: null, price: '1,000 ETB' },
  { id: 102, time: '09:00 AM - 10:00 AM', status: 'booked', bookedBy: 'አበበ ከበደ', phone: '0911223344', price: '1,000 ETB' },
  { id: 103, time: '10:00 AM - 11:00 AM', status: 'booked', bookedBy: 'ዮናስ ታደሰ', phone: '0922334455', price: '1,000 ETB' },
  { id: 104, time: '11:00 AM - 12:00 PM', status: 'blocked', bookedBy: null, phone: null, price: '1,000 ETB' },
  { id: 105, time: '12:00 PM - 01:00 PM', status: 'available', bookedBy: null, phone: null, price: '1,000 ETB' },
  { id: 106, time: '01:00 PM - 02:00 PM', status: 'available', bookedBy: null, phone: null, price: '1,000 ETB' },
  { id: 107, time: '02:00 PM - 03:00 PM', status: 'booked', bookedBy: 'ሳራ ሰለሞን', phone: '0933445566', price: '1,200 ETB' },
  { id: 108, time: '03:00 PM - 04:00 PM', status: 'available', bookedBy: null, phone: null, price: '1,200 ETB' },
  { id: 109, time: '04:00 PM - 05:00 PM', status: 'blocked', bookedBy: null, phone: null, price: '1,200 ETB' },
  { id: 110, time: '05:00 PM - 06:00 PM', status: 'booked', bookedBy: 'ዳንኤል መኮንን', phone: '0944556677', price: '1,500 ETB' },
  { id: 111, time: '06:00 PM - 07:00 PM', status: 'available', bookedBy: null, phone: null, price: '1,500 ETB' },
  { id: 112, time: '07:00 PM - 08:00 PM', status: 'available', bookedBy: null, phone: null, price: '1,500 ETB' }
])

// Selected Slot for Modal Detail
const selectedSlot = ref<any>(null)
const isModalOpen = ref(false)

// Count Stats
const totalSlots = computed(() => timeSlots.value.length)
const bookedSlots = computed(() => timeSlots.value.filter(s => s.status === 'booked').length)
const availableSlots = computed(() => timeSlots.value.filter(s => s.status === 'available').length)

// Actions
const handleSlotClick = (slot: any) => {
  if (slot.status === 'booked') {
    selectedSlot.value = slot
    isModalOpen.value = true
  } else if (slot.status === 'available') {
    slot.status = 'blocked'
  } else if (slot.status === 'blocked') {
    slot.status = 'available'
  }
}
</script>

<template>
  <div class="space-y-6">
    <!-- Header & Controls -->
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl font-black text-white">የቀን መርሃግብር (Schedule)</h1>
        <p class="text-xs sm:text-sm text-slate-400 mt-1">
          የሜዳዎችን ክፍት ሰዓታት ያስተካክሉ ወይም የተያዙ ቦታዎችን ዝርዝር ይመልከቱ።
        </p>
      </div>

      <!-- Select Controls -->
      <div class="flex flex-wrap items-center gap-3">
        <select 
          v-model="selectedVenueId"
          class="bg-[#0d1522] border border-[#1a2432] text-xs font-semibold text-white px-3 py-2 rounded-xl focus:outline-none focus:border-emerald-500"
        >
          <option v-for="venue in venues" :key="venue.id" :value="venue.id">
            {{ venue.name }}
          </option>
        </select>

        <input 
          v-model="selectedDate"
          type="date" 
          class="bg-[#0d1522] border border-[#1a2432] text-xs font-semibold text-white px-3 py-2 rounded-xl focus:outline-none focus:border-emerald-500"
        />
      </div>
    </div>

    <!-- Quick Stats -->
    <div class="grid grid-cols-3 gap-3 sm:gap-4">
      <div class="bg-[#0d1522] border border-[#1a2432] p-4 rounded-2xl text-center">
        <span class="text-[11px] font-bold text-slate-400 uppercase">ጠቅላላ ሰዓታት</span>
        <div class="text-xl font-black text-white mt-1">{{ totalSlots }}</div>
      </div>
      <div class="bg-[#0d1522] border border-emerald-500/30 p-4 rounded-2xl text-center">
        <span class="text-[11px] font-bold text-emerald-400 uppercase">ክፍት ሰዓታት</span>
        <div class="text-xl font-black text-emerald-400 mt-1">{{ availableSlots }}</div>
      </div>
      <div class="bg-[#0d1522] border border-blue-500/30 p-4 rounded-2xl text-center">
        <span class="text-[11px] font-bold text-blue-400 uppercase">የተያዙ ሰዓታት</span>
        <div class="text-xl font-black text-blue-400 mt-1">{{ bookedSlots }}</div>
      </div>
    </div>

    <!-- Legend Indicator -->
    <div class="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-400 bg-[#0d1522] border border-[#1a2432] p-3 rounded-xl">
      <div class="flex items-center gap-2">
        <span class="w-3 h-3 rounded-md bg-emerald-500/20 border border-emerald-500"></span>
        <span>ክፍት (Available) - ለመዝጋት ይጫኑ</span>
      </div>
      <div class="flex items-center gap-2">
        <span class="w-3 h-3 rounded-md bg-blue-500/20 border border-blue-500"></span>
        <span>የተያዘ (Booked) - መረጃ ለማየት ይጫኑ</span>
      </div>
      <div class="flex items-center gap-2">
        <span class="w-3 h-3 rounded-md bg-rose-500/20 border border-rose-500"></span>
        <span>የተዘጋ (Blocked) - ለመክፈት ይጫኑ</span>
      </div>
    </div>

    <!-- Time Slots Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <div 
        v-for="slot in timeSlots" 
        :key="slot.id"
        @click="handleSlotClick(slot)"
        class="p-4 rounded-2xl border transition duration-200 cursor-pointer flex flex-col justify-between h-28 relative overflow-hidden group"
        :class="{
          'bg-emerald-500/10 border-emerald-500/30 hover:border-emerald-500': slot.status === 'available',
          'bg-blue-500/10 border-blue-500/30 hover:border-blue-500': slot.status === 'booked',
          'bg-rose-500/10 border-rose-500/30 hover:border-rose-500 opacity-75': slot.status === 'blocked'
        }"
      >
        <div class="flex justify-between items-start">
          <span class="text-xs font-mono font-bold text-white">{{ slot.time }}</span>
          <span 
            class="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full border"
            :class="{
              'bg-emerald-500/20 text-emerald-400 border-emerald-500/30': slot.status === 'available',
              'bg-blue-500/20 text-blue-400 border-blue-500/30': slot.status === 'booked',
              'bg-rose-500/20 text-rose-400 border-rose-500/30': slot.status === 'blocked'
            }"
          >
            {{ slot.status }}
          </span>
        </div>

        <div class="mt-2">
          <div v-if="slot.status === 'booked'" class="text-xs text-slate-200 truncate">
            👤 <span class="font-bold">{{ slot.bookedBy }}</span>
          </div>
          <div v-else-if="slot.status === 'available'" class="text-xs text-emerald-400 font-bold">
            {{ slot.price }}
          </div>
          <div v-else class="text-xs text-rose-400 font-bold">
            ሜዳው ተዘግቷል
          </div>
        </div>
      </div>
    </div>

    <!-- BOOKING DETAIL MODAL -->
    <div v-if="isModalOpen" class="fixed inset-0 z-[120] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div class="bg-[#0d1522] border border-[#1a2432] rounded-2xl w-full max-w-sm p-5 space-y-4 shadow-2xl">
        <div class="flex items-center justify-between border-b border-[#1a2432] pb-3">
          <h3 class="text-sm font-bold text-white">የቦታ ማስያዝ መረጃ</h3>
          <button @click="isModalOpen = false" class="text-slate-400 hover:text-white">
            <Icon name="lucide:x" class="w-5 h-5" />
          </button>
        </div>

        <div class="space-y-3 text-xs">
          <div>
            <span class="text-slate-400">ተጫዋች name:</span>
            <p class="text-white font-bold text-sm mt-0.5">{{ selectedSlot?.bookedBy }}</p>
          </div>
          <div>
            <span class="text-slate-400">ስልክ ቁጥር:</span>
            <p class="text-emerald-400 font-mono font-bold mt-0.5">{{ selectedSlot?.phone }}</p>
          </div>
          <div>
            <span class="text-slate-400">የተያዘበት ሰዓት:</span>
            <p class="text-white font-bold mt-0.5">{{ selectedSlot?.time }}</p>
          </div>
          <div>
            <span class="text-slate-400">ክፍያ:</span>
            <p class="text-white font-bold mt-0.5">{{ selectedSlot?.price }} (የተከፈለ)</p>
          </div>
        </div>

        <button 
          @click="isModalOpen = false"
          class="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-2 rounded-xl text-xs transition"
        >
          ዝጋ
        </button>
      </div>
    </div>
  </div>
</template>