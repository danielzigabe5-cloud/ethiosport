<script setup lang="ts">
definePageMeta({ Layout: 'admin' })

const venues = ref([
  { id: 1, name: 'አበበ ቢቂላ ስታዲየም', location: 'አዲስ አበባ', type: 'Football', status: 'Active' },
  { id: 2, name: 'ጃንሜዳ ስፖርት ማዕከል', location: 'አዲስ አበባ', type: 'Multi-purpose', status: 'Active' },
  { id: 3, name: 'ሀዋሳ ኢንተርናሽናል ስታዲየም', location: 'ሀዋሳ', type: 'Football', status: 'Maintenance' },
])
</script>

<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <h1 class="text-xl font-bold text-slate-800">የስፖርት ቦታዎች (Venues)</h1>
      <button class="bg-emerald-600 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-emerald-500 transition">
        + አዲስ ቦታ ጨምር
      </button>
    </div>

    <div class="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
      <table class="w-full text-left text-sm text-slate-600">
        <thead class="bg-slate-50 text-slate-700 font-bold border-b border-slate-100">
          <tr>
            <th class="p-4">የቦታው ስም</th>
            <th class="p-4">አድራሻ</th>
            <th class="p-4">አይነት</th>
            <th class="p-4">ሁኔታ</th>
            <th class="p-4">ተግባር</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="venue in venues" :key="venue.id" class="border-b border-slate-50 hover:bg-slate-50/50">
            <td class="p-4 font-bold text-slate-800">{{ venue.name }}</td>
            <td class="p-4">{{ venue.location }}</td>
            <td class="p-4">{{ venue.type }}</td>
            <td class="p-4">
              <span :class="venue.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'" class="px-2.5 py-1 rounded-full text-xs font-bold">
                {{ venue.status }}
              </span>
            </td>
            <td class="p-4">
              <button class="text-blue-600 hover:underline font-bold text-xs">አስተካክል (Edit)</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>