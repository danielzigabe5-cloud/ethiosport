<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-black text-white">Reports & Issues</h1>
        <p class="text-xs text-slate-400 mt-1">User complaints and technical disputes</p>
      </div>
      <span class="bg-rose-500/20 text-rose-400 border border-rose-500/30 px-3 py-1 rounded-xl text-xs font-bold">
        {{ reports.length }} Unresolved
      </span>
    </div>

    <div class="space-y-3">
      <div v-for="r in reports" :key="r.id" class="bg-[#0b1320] border border-slate-800 p-4 rounded-2xl space-y-2">
        <div class="flex items-center justify-between">
          <span class="text-xs font-bold text-rose-400">{{ r.type }}</span>
          <span class="text-[10px] text-slate-500">{{ r.time }}</span>
        </div>
        <p class="text-xs text-slate-200">{{ r.message }}</p>
        <div class="text-[11px] text-slate-400 pt-1">Submitted by: {{ r.from }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

definePageMeta({ layout: 'admin' })

const reports = ref([
  { id: 1, type: 'Payment Processing Error', message: 'Booking not confirmed after payment completed.', from: 'Abebe Bekele', time: '10 mins ago' },
  { id: 2, type: 'Slot Conflict', message: 'Double booking issue on pitch #2 during evening slot.', from: 'Yonas', time: '1 hour ago' }
])
</script>