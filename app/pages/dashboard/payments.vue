<script setup>
useHead({ title: 'Payment History - EthioSport' })

const payments = ref([
  {
    txRef: 'TX-882193',
    venue: 'ሳርቤት ፉትሳል ሜዳ',
    method: 'Telebirr',
    amount: 800,
    date: '2026-08-01',
    status: 'Completed'
  },
  {
    txRef: 'TX-773104',
    venue: 'ቦሌ አሬና ቴኒስ ኮርት',
    method: 'CBE Birr',
    amount: 1200,
    date: '2026-07-28',
    status: 'Completed'
  }
])
</script>

<template>
  <div class="space-y-6">
    <div>
      <h2 class="text-xl font-bold text-white">💰 Payment History</h2>
      <p class="text-xs text-slate-400">በሜዳ ማስያዣዎች ወቅት የፈጸሟቸውን የክፍያ ታሪኮች ይመልከቱ።</p>
    </div>

    <div class="bg-[#0b111a] border border-[#1a2432] rounded-3xl overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse text-xs">
          <thead>
            <tr class="border-b border-[#1a2432] bg-[#131c27] text-slate-400 font-semibold">
              <th class="p-4">Transaction Ref</th>
              <th class="p-4">የሜዳው ስም</th>
              <th class="p-4">የክፍያ መንገድ</th>
              <th class="p-4">ቀን</th>
              <th class="p-4">መጠን</th>
              <th class="p-4">ሁኔታ</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-[#1a2432] text-slate-300">
            <tr v-for="item in payments" :key="item.txRef" class="hover:bg-[#131c27]/50 transition">
              <td class="p-4 font-mono font-bold text-emerald-400">{{ item.txRef }}</td>
              <td class="p-4 font-bold text-white">{{ item.venue }}</td>
              <td class="p-4">{{ item.method }}</td>
              <td class="p-4">{{ item.date }}</td>
              <td class="p-4 font-bold text-white">{{ item.amount }} ETB</td>
              <td class="p-4">
                <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  {{ item.status }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>