<script setup lang="ts">
definePageMeta({
  layout: 'partner'
})

const transactions = [
  { id: 'TX-9021', date: 'Aug 10, 2026', amount: '1,200 ETB', type: 'Booking Payment', status: 'Completed' },
  { id: 'TX-9020', date: 'Aug 09, 2026', amount: '800 ETB', type: 'Booking Payment', status: 'Completed' },
  { id: 'TX-8991', date: 'Aug 05, 2026', amount: '12,500 ETB', type: 'Bank Withdrawal', status: 'Paid' }
]
</script>

<template>
  <div class="space-y-6 max-w-6xl mx-auto font-sans">
    <div>
      <h1 class="text-xl font-black text-white">💰 ገቢ እና ክፍያዎች (Earnings & Payouts)</h1>
      <p class="text-xs text-slate-400">የተሰበሰበውን ገቢ እና የባንክ ወጪዎችን ይከታተሉ።</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div class="bg-[#0b111a] border border-[#1a2432] p-5 rounded-2xl">
        <p class="text-xs text-slate-400 font-semibold">የተጠራቀመ ቀሪ ሂሳብ</p>
        <p class="text-2xl font-black text-emerald-400 mt-2">45,000 ETB</p>
      </div>
      <div class="bg-[#0b111a] border border-[#1a2432] p-5 rounded-2xl">
        <p class="text-xs text-slate-400 font-semibold">በሂደት ላይ ያለ (Pending)</p>
        <p class="text-2xl font-black text-amber-400 mt-2">12,500 ETB</p>
      </div>
      <div class="bg-[#0b111a] border border-[#1a2432] p-5 rounded-2xl">
        <p class="text-xs text-slate-400 font-semibold">ወደ ባንክ የተላከ (Total Paid out)</p>
        <p class="text-2xl font-black text-white mt-2">120,000 ETB</p>
      </div>
    </div>

    <div class="bg-[#0b111a] border border-[#1a2432] rounded-2xl p-5">
      <h3 class="text-sm font-bold text-white mb-4">የቅርብ ጊዜ ዝውውሮች (Recent Transactions)</h3>
      <div class="space-y-3">
        <div v-for="tx in transactions" :key="tx.id" class="flex justify-between items-center border-b border-[#1a2432] pb-3 text-xs">
          <div>
            <p class="font-bold text-white">{{ tx.type }} ({{ tx.id }})</p>
            <p class="text-[10px] text-slate-400">{{ tx.date }}</p>
          </div>
          <div class="text-right">
            <p class="font-bold text-emerald-400">{{ tx.amount }}</p>
            <span class="text-[10px] text-slate-400">{{ tx.status }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>