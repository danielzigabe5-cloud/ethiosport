<script setup lang="ts">
definePageMeta({ Layout: 'admin' })

const bookings = ref([
  { id: 'BK-101', user: 'ዳንኤል ዘገየ', venue: 'አበበ ቢቂላ ስታዲየም', date: '2026-08-05', time: '10:00 AM', status: 'Approved' },
  { id: 'BK-102', user: 'ሰለሞን ተስፋዬ', venue: 'ጃንሜዳ', date: '2026-08-06', time: '02:00 PM', status: 'Pending' },
])
</script>

<template>
  <div class="space-y-6">
    <h1 class="text-xl font-bold text-slate-800">የቦታ ማስያዣዎች (Bookings)</h1>

    <div class="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
      <table class="w-full text-left text-sm text-slate-600">
        <thead class="bg-slate-50 text-slate-700 font-bold border-b border-slate-100">
          <tr>
            <th class="p-4">የትዕዛዝ ID</th>
            <th class="p-4">ተጠቃሚ</th>
            <th class="p-4">የቦታው ስም</th>
            <th class="p-4">ቀንና ሰዓት</th>
            <th class="p-4">ሁኔታ</th>
            <th class="p-4">ውሳኔ</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in bookings" :key="item.id" class="border-b border-slate-50">
            <td class="p-4 font-bold text-slate-800">{{ item.id }}</td>
            <td class="p-4">{{ item.user }}</td>
            <td class="p-4">{{ item.venue }}</td>
            <td class="p-4">{{ item.date }} ({{ item.time }})</td>
            <td class="p-4">
              <span :class="item.status === 'Approved' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'" class="px-2.5 py-1 rounded-full text-xs font-bold">
                {{ item.status }}
              </span>
            </td>
            <td class="p-4 flex gap-2">
              <button class="bg-emerald-600 text-white px-3 py-1 rounded-lg text-xs font-bold">ፈቅድ</button>
              <button class="bg-rose-50 text-rose-600 px-3 py-1 rounded-lg text-xs font-bold">ሰርዝ</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>