<script setup lang="ts">
import { Search, Check, X, Eye } from 'lucide-vue-next'

definePageMeta({
  layout: 'admin'
})

const filter = ref('All')

const bookings = ref([
  {
    id: 'BK-1001',
    user: 'Abebe Kebede',
    venue: 'Sarbet Futsal Arena',
    sport: 'Futsal',
    date: 'Sep 28, 2026',
    time: '4:00 PM - 5:00 PM',
    price: 1500,
    status: 'Confirmed'
  },
  {
    id: 'BK-1002',
    user: 'Dawit Alemu',
    venue: 'Unity Football Arena',
    sport: 'Football',
    date: 'Sep 28, 2026',
    time: '6:00 PM - 7:00 PM',
    price: 2000,
    status: 'Pending'
  },
  {
    id: 'BK-1003',
    user: 'Samuel A.',
    venue: 'Yeka Basketball Court',
    sport: 'Basketball',
    date: 'Sep 29, 2026',
    time: '3:00 PM - 4:00 PM',
    price: 1200,
    status: 'Confirmed'
  }
])

const filtered = computed(() =>
  filter.value === 'All'
    ? bookings.value
    : bookings.value.filter(b => b.status === filter.value)
)

const confirmBooking = (booking: any) => {
  booking.status = 'Confirmed'
}

const rejectBooking = (booking: any) => {
  booking.status = 'Rejected'
}
</script>

<template>
  <div class="space-y-6">

    <div>
      <h1 class="text-3xl font-black">Bookings</h1>
      <p class="text-slate-500">
        Manage all Addis Ababa sport field bookings.
      </p>
    </div>

    <div class="flex flex-wrap gap-2">
      <button
        v-for="item in ['All', 'Pending', 'Confirmed', 'Rejected']"
        :key="item"
        @click="filter = item"
        class="rounded-xl px-5 py-2.5 text-sm font-semibold"
        :class="
          filter === item
            ? 'bg-slate-950 text-white'
            : 'bg-white text-slate-600'
        "
      >
        {{ item }}
      </button>
    </div>

    <div class="overflow-hidden rounded-2xl bg-white shadow-sm">

      <div class="border-b p-5">
        <div class="relative max-w-md">
          <Search
            class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            :size="19"
          />

          <input
            placeholder="Search booking..."
            class="w-full rounded-xl border py-3 pl-10 pr-4"
          />
        </div>
      </div>

      <div class="overflow-x-auto">

        <table class="w-full min-w-[1000px]">

          <thead class="bg-slate-50 text-left text-xs uppercase text-slate-500">
            <tr>
              <th class="px-5 py-4">Booking</th>
              <th class="px-5 py-4">User</th>
              <th class="px-5 py-4">Sport Field</th>
              <th class="px-5 py-4">Date</th>
              <th class="px-5 py-4">Time</th>
              <th class="px-5 py-4">Price</th>
              <th class="px-5 py-4">Status</th>
              <th class="px-5 py-4">Actions</th>
            </tr>
          </thead>

          <tbody>

            <tr
              v-for="booking in filtered"
              :key="booking.id"
              class="border-t"
            >

              <td class="px-5 py-5 font-bold">
                {{ booking.id }}
              </td>

              <td class="px-5 py-5">
                {{ booking.user }}
              </td>

              <td class="px-5 py-5">
                <p class="font-semibold">{{ booking.venue }}</p>
                <p class="text-xs text-slate-500">{{ booking.sport }}</p>
              </td>

              <td class="px-5 py-5">
                {{ booking.date }}
              </td>

              <td class="px-5 py-5">
                {{ booking.time }}
              </td>

              <td class="px-5 py-5 font-bold">
                {{ booking.price.toLocaleString() }} ETB
              </td>

              <td class="px-5 py-5">
                <span
                  class="rounded-full px-3 py-1 text-xs font-bold"
                  :class="{
                    'bg-green-100 text-green-700': booking.status === 'Confirmed',
                    'bg-yellow-100 text-yellow-700': booking.status === 'Pending',
                    'bg-red-100 text-red-700': booking.status === 'Rejected'
                  }"
                >
                  {{ booking.status }}
                </span>
              </td>

              <td class="px-5 py-5">
                <div class="flex gap-2">

                  <button class="rounded-lg bg-slate-100 p-2">
                    <Eye :size="17" />
                  </button>

                  <button
                    v-if="booking.status === 'Pending'"
                    @click="confirmBooking(booking)"
                    class="rounded-lg bg-green-100 p-2 text-green-700"
                  >
                    <Check :size="17" />
                  </button>

                  <button
                    v-if="booking.status === 'Pending'"
                    @click="rejectBooking(booking)"
                    class="rounded-lg bg-red-100 p-2 text-red-700"
                  >
                    <X :size="17" />
                  </button>

                </div>
              </td>

            </tr>

          </tbody>

        </table>

      </div>
    </div>
  </div>
</template>