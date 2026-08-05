<script setup>
import { ref } from 'vue'

definePageMeta({ layout: 'partner' })

const searchQuery = ref('')
const scanResult = ref(null)
const scanError = ref('')
const scanHistory = ref([
  { id: 'BK-9021', name: 'አበበ ከበደ', venue: 'Pitch 1', time: '02:00 PM', status: 'Checked In', scannedAt: '01:52 PM' }
])

// Simulated Database
const database = [
  { id: 'BK-9022', name: 'ዮናስ ተስፋዬ', phone: '0922***123', venue: 'Pitch 1 (Artificial Turf)', time: '04:00 PM - 05:00 PM', price: 600, isUsed: false },
  { id: 'BK-9023', name: 'ዳዊት አለሙ', phone: '0933***456', venue: 'Pitch 2 (Indoor Futsal)', time: '05:00 PM - 06:00 PM', price: 800, isUsed: true }
]

const verifyTicket = () => {
  scanResult.value = null
  scanError.value = ''
  
  const code = searchQuery.value.trim().toUpperCase()
  if (!code) return

  const found = database.find(item => item.id === code)

  if (!found) {
    scanError.value = `ትኬት ቁጥር "${code}" አልተገኘም። እባክዎን ቁጥሩን ያረጋግጡ።`
    return
  }

  scanResult.value = { ...found }
}

const processCheckIn = () => {
  if (!scanResult.value) return

  const target = database.find(item => item.id === scanResult.value.id)
  if (target) target.isUsed = true

  scanHistory.value.unshift({
    id: scanResult.value.id,
    name: scanResult.value.name,
    venue: scanResult.value.venue,
    time: scanResult.value.time,
    status: 'Checked In',
    scannedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  })

  scanResult.value.isUsed = true
}
</script>

<template>
  <div class="max-w-4xl mx-auto space-y-6">
    <div>
      <h1 class="text-xl font-black text-white">📷 QR Ticket Verifier</h1>
      <p class="text-xs text-slate-400">የትኬት ቁጥር ወይም QR ኮድ በማስገባት የተጫዋቾችን ትኬት ያረጋግጡ።</p>
    </div>

    <!-- Search Form -->
    <div class="bg-[#0b111a] border border-[#1a2432] p-6 rounded-2xl space-y-4">
      <form @submit.prevent="verifyTicket" class="flex flex-col sm:flex-row gap-3">
        <input 
          v-model="searchQuery"
          type="text" 
          placeholder="ENTER BOOKING ID (E.G. BK-9022)" 
          class="flex-1 bg-[#131c27] border border-[#212e3e] px-4 py-3 rounded-xl text-xs text-white uppercase focus:outline-none focus:border-emerald-500 font-mono tracking-wider"
        />
        <button type="submit" class="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl transition">
          አረጋግጥ
        </button>
      </form>

      <!-- Error Message -->
      <div v-if="scanError" class="p-4 bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs rounded-xl font-bold">
        ⚠️ {{ scanError }}
      </div>

      <!-- Result Card -->
      <div v-if="scanResult" class="p-5 bg-[#131c27] border border-[#212e3e] rounded-xl space-y-4">
        <div class="flex justify-between items-center border-b border-[#212e3e] pb-3">
          <div>
            <span class="text-[10px] text-slate-400 uppercase font-bold">Booking ID</span>
            <p class="text-base font-black text-emerald-400 font-mono">{{ scanResult.id }}</p>
          </div>
          <span 
            :class="[
              'px-3 py-1 rounded-full text-[10px] font-bold uppercase',
              scanResult.isUsed ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30' : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
            ]"
          >
            {{ scanResult.isUsed ? 'ተጠቅመውበታል (ALREADY USED)' : 'ትክክለኛ ትኬት (VALID)' }}
          </span>
        </div>

        <div class="grid grid-cols-2 gap-4 text-xs">
          <div>
            <span class="text-slate-400">ተጫዋች:</span>
            <p class="font-bold text-white">{{ scanResult.name }}</p>
          </div>
          <div>
            <span class="text-slate-400">ስልክ:</span>
            <p class="font-bold text-white">{{ scanResult.phone }}</p>
          </div>
          <div>
            <span class="text-slate-400">ሜዳ:</span>
            <p class="font-bold text-white">{{ scanResult.venue }}</p>
          </div>
          <div>
            <span class="text-slate-400">ሰዓት:</span>
            <p class="font-bold text-white">{{ scanResult.time }}</p>
          </div>
        </div>

        <button 
          @click="processCheckIn"
          :disabled="scanResult.isUsed"
          :class="[
            'w-full py-3 rounded-xl font-bold text-xs transition',
            scanResult.isUsed ? 'bg-slate-800 text-slate-500 cursor-not-allowed' : 'bg-emerald-500 text-slate-950 hover:bg-emerald-400'
          ]"
        >
          {{ scanResult.isUsed ? 'ትኬቱ ቀደም ብሎ ተገብቶበታል' : 'ተጫዋቹን አስገባ (CONFIRM CHECK-IN)' }}
        </button>
      </div>
    </div>

    <!-- History -->
    <div class="bg-[#0b111a] border border-[#1a2432] p-5 rounded-2xl space-y-3">
      <h3 class="text-xs font-bold text-slate-400 uppercase">የቅርብ ጊዜ Check-In ታሪክ</h3>
      <div class="divide-y divide-[#1a2432]">
        <div v-for="h in scanHistory" :key="h.id + h.scannedAt" class="py-2.5 flex justify-between items-center text-xs">
          <div>
            <p class="font-bold text-white">{{ h.name }} <span class="text-slate-500 text-[10px]">({{ h.venue }})</span></p>
            <p class="text-[10px] text-slate-400">{{ h.time }}</p>
          </div>
          <div class="text-right">
            <span class="text-emerald-400 font-mono font-bold">{{ h.id }}</span>
            <span class="block text-[10px] text-slate-500">{{ h.scannedAt }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>