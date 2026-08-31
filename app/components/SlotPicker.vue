<template>
  <div class="w-full max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
    <!-- 1. Header & Date Selection -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-gray-100">
      <div>
        <h3 class="text-xl font-bold text-gray-900">ሰዓት ይምረጡ (Select Slot)</h3>
        <p class="text-sm text-gray-500">የሚመችዎትን ቀን እና ክፍት ሰዓት ይምረጡ</p>
      </div>

      <!-- Date Navigation -->
      <div class="flex items-center gap-2 bg-gray-50 p-1.5 rounded-xl border border-gray-200">
        <button 
          @click="changeDate(-1)" 
          class="p-2 rounded-lg hover:bg-white hover:shadow-sm text-gray-600 transition"
        >
          ‹
        </button>
        <span class="text-sm font-semibold px-3 text-gray-800">
          {{ formattedDate }}
        </span>
        <button 
          @click="changeDate(1)" 
          class="p-2 rounded-lg hover:bg-white hover:shadow-sm text-gray-600 transition"
        >
          ›
        </button>
      </div>
    </div>

    <!-- 2. Status Indicators (Color Legend) -->
    <div class="flex items-center gap-6 mb-6 text-xs font-medium text-gray-600">
      <div class="flex items-center gap-2">
        <span class="w-3 h-3 rounded-full bg-emerald-500"></span>
        <span>ክፍት (Available)</span>
      </div>
      <div class="flex items-center gap-2">
        <span class="w-3 h-3 rounded-full bg-emerald-600 ring-2 ring-emerald-600 ring-offset-1"></span>
        <span>የተመረጠ (Selected)</span>
      </div>
      <div class="flex items-center gap-2">
        <span class="w-3 h-3 rounded-full bg-rose-200"></span>
        <span>የተያዘ (Booked)</span>
      </div>
    </div>

    <!-- 3. Time Slots Grid -->
    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-8">
      <button
        v-for="slot in slots"
        :key="slot.id"
        :disabled="slot.isBooked"
        @click="selectSlot(slot)"
        :class="[
          'py-3 px-4 rounded-xl border text-sm font-semibold transition-all duration-200 flex flex-col items-center gap-1',
          slot.isBooked 
            ? 'bg-rose-50 border-rose-100 text-rose-400 cursor-not-allowed line-through' 
            : selectedSlotId === slot.id
            ? 'bg-emerald-600 border-emerald-600 text-white shadow-md shadow-emerald-200 scale-105'
            : 'bg-white border-gray-200 text-gray-700 hover:border-emerald-500 hover:text-emerald-600'
        ]"
      >
        <span>{{ slot.time }}</span>
        <span class="text-xs font-normal opacity-80 font-mono">
          {{ slot.price }} ETB
        </span>
      </button>
    </div>

    <!-- 4. Selected Slot Summary Bar -->
    <div 
      v-if="selectedSlot" 
      class="flex items-center justify-between p-4 bg-emerald-50 border border-emerald-200 rounded-xl"
    >
      <div>
        <span class="text-xs font-semibold text-emerald-800 uppercase tracking-wider block">የተመረጠው ሰዓት</span>
        <p class="text-emerald-950 font-bold text-base">
          {{ formattedDate }} — {{ selectedSlot.time }}
        </p>
      </div>
      <button 
        @click="confirmBooking"
        class="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2.5 rounded-lg text-sm font-semibold shadow-md transition"
      >
        ቀጥል (Proceed) →
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface Slot {
  id: number
  time: string
  price: number
  isBooked: boolean
}

// Current Selected Date State
const currentDate = ref(new Date())
const selectedSlotId = ref<number | null>(null)

// Format date for UI (e.g. "Aug 4, 2026")
const formattedDate = computed(() => {
  return currentDate.value.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
})

// Sample Dummy Slots Data (በመተግበሪያዎ ከ Laravel API በ $fetch ይመጣል)
const slots = ref<Slot[]>([
  { id: 1, time: '02:00 - 03:00 ጧት', price: 600, isBooked: false },
  { id: 2, time: '03:00 - 04:00 ጧት', price: 600, isBooked: true },
  { id: 3, time: '04:00 - 05:00 ጧት', price: 600, isBooked: false },
  { id: 4, time: '08:00 - 09:00 ከሰዓት', price: 750, isBooked: false },
  { id: 5, time: '09:00 - 10:00 ከሰዓት', price: 750, isBooked: true },
  { id: 6, time: '10:00 - 11:00 ማታ', price: 900, isBooked: false },
  { id: 7, time: '11:00 - 12:00 ማታ', price: 900, isBooked: false },
  { id: 8, time: '12:00 - 01:00 ማታ', price: 900, isBooked: false },
])

// Get selected slot object
const selectedSlot = computed(() => {
  return slots.value.find(s => s.id === selectedSlotId.value) || null
})

// Change date handler
const changeDate = (days: number) => {
  const newDate = new Date(currentDate.value)
  newDate.setDate(newDate.getDate() + days)
  currentDate.value = newDate
  selectedSlotId.value = null // reset selection on date change
}

// Select slot handler
const selectSlot = (slot: Slot) => {
  if (slot.isBooked) return
  selectedSlotId.value = selectedSlotId.value === slot.id ? null : slot.id
}

// Confirm booking action
const confirmBooking = () => {
  if (!selectedSlot.value) return
  
  // እዚህ ላይ Pinia Store ወይም router ን በመጠቀም ወደ Checkout ገጽ መምራት ይቻላል
  alert(`የተያዘው ሰዓት፡ ${selectedSlot.value.time} በ ${selectedSlot.value.price} ETB`)
  // navigateTo('/checkout')
}
</script>