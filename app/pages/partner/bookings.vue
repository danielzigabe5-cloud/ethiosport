```vue
<template>
  <div class="min-h-full bg-slate-50">

    <div class="border-b border-slate-200 bg-white">
      <div class="mx-auto max-w-[1500px] px-6 py-7 lg:px-8">

        <p class="text-sm font-semibold text-emerald-600">
          My Sport Field
        </p>

        <div class="mt-1 flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 class="text-2xl font-black text-slate-900">
              Bookings
            </h1>

            <p class="mt-1 text-sm text-slate-500">
              Manage customer reservations for your venue.
            </p>
          </div>

          <div class="rounded-xl bg-emerald-50 px-4 py-3 text-sm font-bold text-emerald-700">
            7 Pending Requests
          </div>
        </div>

      </div>
    </div>

    <div class="mx-auto max-w-[1500px] px-6 py-7 lg:px-8">

      <!-- STATS -->
      <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

        <div
          v-for="stat in stats"
          :key="stat.title"
          class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
        >
          <p class="text-xs font-semibold text-slate-500">
            {{ stat.title }}
          </p>

          <p class="mt-2 text-2xl font-black text-slate-900">
            {{ stat.value }}
          </p>
        </div>

      </div>

      <!-- TABLE -->
      <section class="mt-7 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

        <div class="flex flex-col justify-between gap-4 border-b border-slate-100 p-5 md:flex-row md:items-center">

          <div>
            <h2 class="font-black text-slate-900">
              All Bookings
            </h2>
          </div>

          <div class="flex gap-2">

            <select
              v-model="statusFilter"
              class="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold outline-none focus:border-emerald-500"
            >
              <option value="All">All Status</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Pending">Pending</option>
              <option value="Cancelled">Cancelled</option>
            </select>

          </div>

        </div>

        <div class="overflow-x-auto">

          <table class="w-full min-w-[800px] text-left">

            <thead class="bg-slate-50">
              <tr>
                <th class="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-400">
                  Customer
                </th>

                <th class="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-400">
                  Date
                </th>

                <th class="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-400">
                  Time
                </th>

                <th class="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-400">
                  Amount
                </th>

                <th class="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-400">
                  Status
                </th>

                <th class="px-6 py-4"></th>
              </tr>
            </thead>

            <tbody class="divide-y divide-slate-100">

              <tr
                v-for="booking in filteredBookings"
                :key="booking.id"
                class="hover:bg-slate-50"
              >

                <td class="px-6 py-4">
                  <div class="flex items-center gap-3">
                    <div class="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-700">
                      {{ booking.customer.charAt(0) }}
                    </div>

                    <div>
                      <p class="text-sm font-bold text-slate-900">
                        {{ booking.customer }}
                      </p>

                      <p class="text-xs text-slate-500">
                        {{ booking.phone }}
                      </p>
                    </div>
                  </div>
                </td>

                <td class="px-6 py-4 text-sm font-semibold text-slate-700">
                  {{ booking.date }}
                </td>

                <td class="px-6 py-4 text-sm text-slate-600">
                  {{ booking.time }}
                </td>

                <td class="px-6 py-4 text-sm font-black text-slate-900">
                  ETB {{ booking.amount }}
                </td>

                <td class="px-6 py-4">
                  <span
                    class="rounded-full px-3 py-1 text-[11px] font-bold"
                    :class="statusClass(booking.status)"
                  >
                    {{ booking.status }}
                  </span>
                </td>

                <td class="px-6 py-4 text-right">
                  <button class="rounded-lg px-3 py-2 text-xs font-bold text-slate-500 hover:bg-slate-100">
                    View
                  </button>
                </td>

              </tr>

            </tbody>

          </table>

        </div>

      </section>

    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

definePageMeta({
  layout: 'partner',
})

const statusFilter = ref('All')

const stats = [
  { title: 'Total Bookings', value: '128' },
  { title: 'Confirmed', value: '96' },
  { title: 'Pending', value: '7' },
  { title: 'Cancelled', value: '25' },
]

const bookings = [
  {
    id: 1,
    customer: 'Abebe Kebede',
    phone: '0911 234 567',
    date: 'Sep 28, 2026',
    time: '4:00 PM - 5:00 PM',
    amount: '1,500',
    status: 'Confirmed',
  },
  {
    id: 2,
    customer: 'Nahom Team',
    phone: '0922 345 678',
    date: 'Sep 28, 2026',
    time: '6:00 PM - 7:00 PM',
    amount: '1,500',
    status: 'Pending',
  },
  {
    id: 3,
    customer: 'Bole United',
    phone: '0933 456 789',
    date: 'Sep 29, 2026',
    time: '7:00 PM - 8:00 PM',
    amount: '1,500',
    status: 'Confirmed',
  },
  {
    id: 4,
    customer: 'Mekdes Football',
    phone: '0944 567 890',
    date: 'Sep 29, 2026',
    time: '5:00 PM - 6:00 PM',
    amount: '1,500',
    status: 'Cancelled',
  },
]

const filteredBookings = computed(() => {
  if (statusFilter.value === 'All') {
    return bookings
  }

  return bookings.filter(
    booking => booking.status === statusFilter.value
  )
})

function statusClass(status: string) {
  if (status === 'Confirmed') {
    return 'bg-emerald-50 text-emerald-700'
  }

  if (status === 'Pending') {
    return 'bg-amber-50 text-amber-700'
  }

  return 'bg-red-50 text-red-700'
}
</script>
```
