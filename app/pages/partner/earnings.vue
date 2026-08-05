<script setup>
import { ref } from 'vue'

definePageMeta({ layout: 'partner' })

const availablePayout = ref(12500)
const totalEarnings = ref(38400)
const isProcessing = ref(false)

const payoutHistory = ref([
  { id: 'PO-991', date: '2026-08-01', amount: 15000, account: 'CBE (***4512)', status: 'Completed' }
])

const requestPayout = () => {
  if (availablePayout.value <= 0) return
  isProcessing.value = true
  setTimeout(() => {
    payoutHistory.value.unshift({
      id: `PO-${Math.floor(100 + Math.random() * 900)}`,
      date: new Date().toISOString().split('T')[0],
      amount: availablePayout.value,
      account: 'CBE (***4512)',
      status: 'Pending Approval'
    })
    availablePayout.value = 0
    isProcessing.value = false
  }, 1000)
}
</script>

<template>
  <div class="space-y-6 max-w-5xl mx-auto">
    <div>
      <h1 class="text-xl font-black text-white">💰 Earnings & Payouts</h1>
      <p class="text-xs text-slate-400">የሜዳዎትን ገቢ እና የወጡ ክፍያዎችን ያስተዳድሩ።</p>
    </div>

    <!-- Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div class="bg-[#0b111a] border border-[#1a2432] p-6 rounded-2xl space-y-4">
        <span class="text-xs font-bold text-slate-400 uppercase">ሊወጣ የሚችል ገቢ (Available Payout)</span>
        <p class="text-3xl font-black text-white">{{ availablePayout.toLocaleString() }} <span class="text-xs text-emerald-400">ETB</span></p>
        <button 
          @click="requestPayout"
          :disabled="availablePayout <= 0 || isProcessing"
          :class="[
            'w-full py-3 rounded-xl font-bold text-xs transition',
            availablePayout > 0 ? 'bg-emerald-500 text-slate-950 hover:bg-emerald-400' : 'bg-slate-800 text-slate-500 cursor-not-allowed'
          ]"
        >
          {{ isProcessing ? 'በማስፈጸም ላይ...' : 'ወደ ባንክ አዛውር (Request Payout)' }}
        </button>
      </div>

      <div class="bg-[#0b111a] border border-[#1a2432] p-6 rounded-2xl space-y-2">
        <span class="text-xs font-bold text-slate-400 uppercase">የዚህ ወር ጠቅላላ ገቢ</span>
        <p class="text-3xl font-black text-white">{{ totalEarnings.toLocaleString() }} <span class="text-xs text-slate-400">ETB</span></p>
      </div>
    </div>

    <!-- History -->
    <div class="bg-[#0b111a] border border-[#1a2432] p-5 rounded-2xl space-y-3">
      <h3 class="text-xs font-bold text-slate-400 uppercase">የወጡ ክፍያዎች ታሪክ</h3>
      <div class="divide-y divide-[#1a2432]">
        <div v-for="p in payoutHistory" :key="p.id" class="py-3 flex justify-between items-center text-xs">
          <div>
            <p class="font-bold text-white">{{ p.amount.toLocaleString() }} ETB</p>
            <p class="text-[10px] text-slate-500">{{ p.account }} • {{ p.date }}</p>
          </div>
          <span class="px-2.5 py-1 bg-emerald-500/10 text-emerald-400 rounded-lg text-[10px] font-bold">{{ p.status }}</span>
        </div>
      </div>
    </div>
  </div>
</template>