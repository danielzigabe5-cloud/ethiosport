<script setup lang="ts">
definePageMeta({ Layout: 'user' })

const bookings = ref([
  { id: 'BK-101', venue: 'አበበ ቢቂላ ስታዲየም', price: '1,500 ETB', date: '2026-08-05', time: '10:00 AM - 12:00 PM', status: 'Approved' },
  { id: 'BK-098', venue: 'ጃንሜዳ የስፖርት ማዕከል', price: '800 ETB', date: '2026-07-20', time: '04:00 PM - 06:00 PM', status: 'Completed' },
  { id: 'BK-094', venue: 'ሀዋሳ ኢንተርናሽናል ስታዲየም', price: '2,000 ETB', date: '2026-06-11', time: '02:00 PM - 04:00 PM', status: 'Cancelled' }
])

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'Approved': return 'bg-emerald-100 text-emerald-700'
    case 'Completed': return 'bg-slate-100 text-slate-600'
    case 'Cancelled': return 'bg-rose-100 text-rose-700'
    default: return 'bg-amber-100 text-amber-700'
  }
}
</script>

<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-2xl font-bold text-slate-800">የእኔ ቦታ ማስያዣዎች (My Bookings)</h1>
      <p class="text-xs text-slate-400 mt-1">የያዟቸውን ሜዳዎችና ስታዲየሞች ሁኔታ እዚህ ይከታተሉ</p>
    </div>

    <div class="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-left text-sm text-slate-600">
          <thead class="bg-slate-50 text-slate-700 font-bold border-b border-slate-100">
            <tr>
              <th class="p-4">ID</th>
              <th class="p-4">የቦታው ስም</th>
              <th class="p-4">ቀንና ሰዓት</th>
              <th class="p-4">ክፍያ</th>
              <th class="p-4">ሁኔታ</th>
              <th class="p-4">ተግባር</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in bookings" :key="item.id" class="border-b border-slate-50 hover:bg-slate-50/50">
              <td class="p-4 font-bold text-slate-800">{{ item.id }}</td>
              <td class="p-4 font-medium text-slate-800">{{ item.venue }}</td>
              <td class="p-4 text-xs">
                <div>📅 {{ item.date }}</div>
                <div class="text-slate-400">⏰ {{ item.time }}</div>
              </td>
              <td class="p-4 font-bold text-slate-700 text-xs">{{ item.price }}</td>
              <td class="p-4">
                <span :class="['px-2.5 py-1 rounded-full text-xs font-bold', getStatusBadge(item.status)]">
                  {{ item.status }}
                </span>
              </td>
              <td class="p-4">
                <button class="text-blue-600 hover:underline font-bold text-xs">ደረሰኝ እይ (Slip)</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>