```vue
<template>
  <div class="min-h-full bg-slate-50">

    <section class="border-b border-slate-200 bg-white">
      <div class="mx-auto max-w-[1500px] px-6 py-7 lg:px-8">

        <p class="text-sm font-semibold text-emerald-600">
          Finance
        </p>

        <h1 class="mt-1 text-2xl font-black text-slate-900">
          Earnings
        </h1>

        <p class="mt-1 text-sm text-slate-500">
          Track your sport field revenue and booking income.
        </p>

      </div>
    </section>

    <div class="mx-auto max-w-[1500px] px-6 py-7 lg:px-8">

      <!-- CARDS -->
      <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

        <div
          v-for="stat in stats"
          :key="stat.title"
          class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
        >
          <div class="flex items-start justify-between">

            <div>
              <p class="text-xs font-semibold text-slate-500">
                {{ stat.title }}
              </p>

              <p class="mt-2 text-2xl font-black text-slate-900">
                {{ stat.value }}
              </p>

              <p class="mt-2 text-xs font-semibold text-emerald-600">
                {{ stat.change }}
              </p>
            </div>

            <div class="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-xl">
              {{ stat.icon }}
            </div>

          </div>
        </div>

      </div>

      <!-- CHART -->
      <section class="mt-7 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

        <div class="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

          <div>
            <h2 class="font-black text-slate-900">
              Revenue Overview
            </h2>

            <p class="mt-1 text-xs text-slate-500">
              Monthly venue earnings
            </p>
          </div>

          <select
            v-model="period"
            class="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold outline-none"
          >
            <option>Last 6 Months</option>
            <option>This Year</option>
          </select>

        </div>

        <div class="mt-8 flex h-64 items-end gap-3 border-b border-slate-200 px-2">

          <div
            v-for="item in chart"
            :key="item.month"
            class="group flex h-full flex-1 flex-col justify-end"
          >
            <div class="relative flex flex-1 items-end justify-center">

              <div
                class="w-full max-w-[55px] rounded-t-xl bg-emerald-500 transition hover:bg-emerald-600"
                :style="{ height: `${item.height}%` }"
              >
                <span class="absolute -top-7 left-1/2 hidden -translate-x-1/2 whitespace-nowrap rounded-lg bg-slate-900 px-2 py-1 text-[10px] font-bold text-white group-hover:block">
                  ETB {{ item.amount }}
                </span>
              </div>

            </div>

            <p class="mt-3 text-center text-[11px] font-semibold text-slate-500">
              {{ item.month }}
            </p>
          </div>

        </div>

      </section>

      <!-- TRANSACTIONS -->
      <section class="mt-7 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

        <div class="border-b border-slate-100 px-6 py-5">
          <h2 class="font-black text-slate-900">
            Recent Earnings
          </h2>
        </div>

        <div class="divide-y divide-slate-100">

          <div
            v-for="transaction in transactions"
            :key="transaction.id"
            class="flex flex-col gap-3 px-6 py-5 sm:flex-row sm:items-center sm:justify-between"
          >

            <div class="flex items-center gap-3">

              <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                +
              </div>

              <div>
                <p class="text-sm font-bold text-slate-900">
                  {{ transaction.description }}
                </p>

                <p class="mt-1 text-xs text-slate-500">
                  {{ transaction.date }}
                </p>
              </div>

            </div>

            <p class="text-sm font-black text-emerald-600">
              + ETB {{ transaction.amount }}
            </p>

          </div>

        </div>

      </section>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

definePageMeta({
  layout: 'partner',
})

const period = ref('Last 6 Months')

const stats = [
  {
    title: 'Total Earnings',
    value: 'ETB 486,500',
    change: '+14.8%',
    icon: '💰',
  },
  {
    title: 'This Month',
    value: 'ETB 86,500',
    change: '+8.4%',
    icon: '📈',
  },
  {
    title: 'Available Balance',
    value: 'ETB 54,200',
    change: 'Ready to withdraw',
    icon: '💳',
  },
  {
    title: 'Pending',
    value: 'ETB 12,500',
    change: 'Processing',
    icon: '⏳',
  },
]

const chart = [
  { month: 'Apr', amount: '58,000', height: 52 },
  { month: 'May', amount: '64,500', height: 61 },
  { month: 'Jun', amount: '72,300', height: 68 },
  { month: 'Jul', amount: '69,800', height: 65 },
  { month: 'Aug', amount: '79,400', height: 75 },
  { month: 'Sep', amount: '86,500', height: 92 },
]

const transactions = [
  {
    id: 1,
    description: 'Booking #BK-1024',
    date: 'Today · 4:00 PM',
    amount: '1,500',
  },
  {
    id: 2,
    description: 'Booking #BK-1021',
    date: 'Yesterday',
    amount: '1,500',
  },
  {
    id: 3,
    description: 'Event registration',
    date: 'Sep 25, 2026',
    amount: '5,000',
  },
  {
    id: 4,
    description: 'Booking #BK-1018',
    date: 'Sep 24, 2026',
    amount: '1,500',
  },
]
</script>
```
