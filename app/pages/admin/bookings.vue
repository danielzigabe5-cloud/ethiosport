<script setup>
import { ref } from 'vue'

definePageMeta({ layout: 'admin' })

const bookings = ref([
  { id: 'BK-9921', user: 'አበበ በቀለ', venue: 'ሳርቤት ፉትሳል ሜዳ', date: '2026-08-04', price: '800 ETB', status: 'Pending' },
  { id: 'BK-9922', user: 'ዮናስ ኃይሌ', venue: 'ቦሌ አሬና ቴኒስ', date: '2026-08-05', price: '1200 ETB', status: 'Approved' },
  { id: 'BK-9923', user: 'ሜሮን ሀይሉ', venue: 'ካዛንችስ ስፖርት', date: '2026-08-06', price: '1000 ETB', status: 'Pending' }
])

const updateStatus = (booking, newStatus) => {
  booking.status = newStatus
}
</script>

<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-2xl font-black text-slate-900 dark:text-white">የይዞታዎች ማኔጅመንት (Bookings)</h1>
      <p class="text-xs text-slate-500">የተጠቃሚዎችን የቦታ ማስያዝ ትእዛዝ ያፅድቁ ወይም ይሰርዙ</p>
    </div>

    <div class="bg-white dark:bg-[#0b111a] rounded-2xl border border-slate-200 dark:border-[#212e3e] overflow-hidden">
      <table class="w-full text-left text-xs">
        <thead class="bg-slate-50 dark:bg-[#131c27] text-slate-400 font-black uppercase">
          <tr>
            <th class="p-4">ID</th>
            <th class="p-4">ተጠቃሚ</th>
            <th class="p-4">ሜዳ</th>
            <th class="p-4">ቀን</th>
            <th class="p-4">ክፍያ</th>
            <th class="p-4">ሁኔታ</th>
            <th class="p-4 text-right">ውሳኔ (Decision)</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100 dark:divide-[#212e3e]">
          <tr v-for="b in bookings" :key="b.id" class="font-semibold">
            <td class="p-4 text-emerald-500">{{ b.id }}</td>
            <td class="p-4 font-bold text-slate-900 dark:text-white">{{ b.user }}</td>
            <td class="p-4">{{ b.venue }}</td>
            <td class="p-4">{{ b.date }}</td>
            <td class="p-4">{{ b.price }}</td>
            <td class="p-4">
              <span :class="[
                'px-2.5 py-1 rounded-full text-[10px] font-bold',
                b.status === 'Approved' ? 'bg-emerald-500/10 text-emerald-500' : 
                b.status === 'Cancelled' ? 'bg-rose-500/10 text-rose-500' : 'bg-amber-500/10 text-amber-500'
              ]">
                {{ b.status }}
              </span>
            </td>
            <td class="p-4 text-right space-x-2">
              <button 
                v-if="b.status !== 'Approved'" 
                @click="updateStatus(b, 'Approved')" 
                class="px-3 py-1 bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500 hover:text-slate-950 rounded-lg text-[11px] font-bold transition"
              >
                Approve
              </button>
              <button 
                v-if="b.status !== 'Cancelled'" 
                @click="updateStatus(b, 'Cancelled')" 
                class="px-3 py-1 bg-rose-500/10 text-rose-500 hover:bg-rose-500 hover:text-white rounded-lg text-[11px] font-bold transition"
              >
                Cancel
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>