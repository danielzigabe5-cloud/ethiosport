<script setup lang="ts">
import { Download, TrendingUp, Calendar, Banknote, MapPin } from 'lucide-vue-next'

definePageMeta({
  layout: 'admin'
})

const reports = [
  {
    title: 'Total Bookings',
    value: '1,845',
    change: '+24%',
    icon: Calendar
  },
  {
    title: 'Total Revenue',
    value: '485,000 ETB',
    change: '+16%',
    icon: Banknote
  },
  {
    title: 'Active Fields',
    value: '112',
    change: '+12%',
    icon: MapPin
  }
]
</script>

<template>
  <div class="space-y-6">

    <div class="flex flex-col justify-between gap-4 md:flex-row md:items-center">
      <div>
        <h1 class="text-3xl font-black">Reports</h1>
        <p class="text-slate-500">
          Platform performance and revenue reports.
        </p>
      </div>

      <button class="flex items-center gap-2 rounded-xl bg-slate-950 px-5 py-3 font-bold text-white">
        <Download :size="18" />
        Export Report
      </button>
    </div>

    <div class="grid grid-cols-1 gap-5 md:grid-cols-3">

      <div
        v-for="report in reports"
        :key="report.title"
        class="rounded-2xl bg-white p-6 shadow-sm"
      >

        <div class="flex justify-between">
          <div>
            <p class="text-sm text-slate-500">
              {{ report.title }}
            </p>

            <h2 class="mt-2 text-3xl font-black">
              {{ report.value }}
            </h2>
          </div>

          <div class="rounded-xl bg-slate-100 p-3">
            <component :is="report.icon" />
          </div>
        </div>

        <p class="mt-4 flex items-center gap-2 text-sm font-bold">
          <TrendingUp :size="16" />
          {{ report.change }}
        </p>

      </div>

    </div>

    <div class="rounded-2xl bg-white p-6">

      <h2 class="text-lg font-bold">
        Monthly Revenue
      </h2>

      <div class="mt-8 flex h-72 items-end gap-3">

        <div
          v-for="height in [30,45,38,60,55,70,64,78,68,85,76,95]"
          :key="height"
          class="flex-1 rounded-t-xl bg-[#94FF2B]"
          :style="{ height: `${height}%` }"
        />

      </div>

      <div class="mt-4 grid grid-cols-12 text-center text-xs text-slate-400">
        <span v-for="month in ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']" :key="month">
          {{ month }}
        </span>
      </div>

    </div>

  </div>
</template>