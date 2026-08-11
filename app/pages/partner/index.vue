<script setup lang="ts">
import { ref } from 'vue'

definePageMeta({
  layout: 'partner'
})

const upcomingBookings = ref([
  { time: '10:00 - 11:00 ጠዋት', customer: 'አቤል ተስፋዬ (FC)', phone: '0911 *** 45', status: 'ተከፍሏል (Paid)' },
  { time: '12:00 - 01:00 ከሰዓት', customer: 'ዮሴፍ ቄስ', phone: '0922 *** 12', status: 'በአካል የተከፈለ' }
])
</script>

<template>
  <div class="space-y-6 w-full font-sans">
    
    <!-- Title -->
    <div>
      <h1 class="text-xl font-black text-white">እንኳን ደህና መጡ!</h1>
      <p class="text-xs text-slate-400 mt-0.5">የዛሬ የራሱ እንቅስቃሴዎች መከታተያ።</p>
    </div>

    <!-- Metric Cards Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      
      <div class="bg-[#0b111a] border border-[#1a2432] p-4 rounded-xl flex items-center justify-between">
        <div>
          <p class="text-[11px] font-bold text-slate-400">የዛሬ ቀጠሮዎች</p>
          <div class="flex items-baseline gap-2 mt-2">
            <span class="text-2xl font-black text-white">8</span>
            <span class="text-xs font-bold text-emerald-400">+2 አዲስ</span>
          </div>
        </div>
        <div class="w-9 h-9 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
      </div>

      <div class="bg-[#0b111a] border border-[#1a2432] p-4 rounded-xl flex items-center justify-between">
        <div>
          <p class="text-[11px] font-bold text-slate-400">የወሩ ገቢ</p>
          <div class="flex items-baseline gap-1 mt-2">
            <span class="text-2xl font-black text-emerald-400">45K</span>
            <span class="text-xs font-bold text-slate-400">ETB</span>
          </div>
        </div>
        <div class="w-9 h-9 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center">
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      </div>

      <div class="bg-[#0b111a] border border-[#1a2432] p-4 rounded-xl flex items-center justify-between">
        <div>
          <p class="text-[11px] font-bold text-slate-400">ያልወጣ (Pending)</p>
          <div class="mt-2">
            <span class="text-2xl font-black text-amber-400">12,500</span>
          </div>
        </div>
        <div class="w-9 h-9 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center">
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
      </div>

      <div class="bg-[#0b111a] border border-[#1a2432] p-4 rounded-xl flex items-center justify-between">
        <div>
          <p class="text-[11px] font-bold text-slate-400">የሜዳው እይታዎች</p>
          <div class="mt-2">
            <span class="text-2xl font-black text-white">340</span>
          </div>
        </div>
        <div class="w-9 h-9 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center">
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
        </div>
      </div>

    </div>

    <!-- Table Section -->
    <div class="bg-[#0b111a] border border-[#1a2432] rounded-xl p-5 space-y-4">
      <div class="flex items-center justify-between">
        <h2 class="text-xs font-bold text-white">የዛሬ ተራኛ ተጫዋቾች (Upcoming)</h2>
        <button class="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-lg transition cursor-pointer">
          ሰዓት ዝጋ (Block Time)
        </button>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="text-[11px] text-slate-400 border-b border-[#1a2432]">
              <th class="py-2.5 px-2">ሰዓት</th>
              <th class="py-2.5 px-2">ተጫዋች / ቡድን</th>
              <th class="py-2.5 px-2">ስልክ ቁጥር</th>
              <th class="py-2.5 px-2">ክፍያ ሁኔታ</th>
              <th class="py-2.5 px-2 text-right">እርምጃ (ACTION)</th>
            </tr>
          </thead>
          <tbody class="text-xs divide-y divide-[#1a2432]">
            <tr v-for="(b, i) in upcomingBookings" :key="i">
              <td class="py-3 px-2 font-bold text-white">{{ b.time }}</td>
              <td class="py-3 px-2 text-slate-300">{{ b.customer }}</td>
              <td class="py-3 px-2 text-slate-400">{{ b.phone }}</td>
              <td class="py-3 px-2">
                <span class="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[10px] font-bold">
                  {{ b.status }}
                </span>
              </td>
              <td class="py-3 px-2 text-right">
                <button class="text-rose-400 hover:text-rose-300 text-[11px] font-semibold hover:underline cursor-pointer">
                  ሳይመጡ ቀሩ (No-Show) ሪፖርት አድርግ
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

  </div>
</template>