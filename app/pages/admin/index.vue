<script setup lang="ts">
import {
  MapPin,
  Users,
  CalendarCheck,
  Banknote,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-vue-next'

definePageMeta({
  layout: 'admin'
})

const stats = [
  {
    title: 'Total Sport Fields',
    value: '128',
    change: '+12%',
    icon: MapPin
  },
  {
    title: 'Registered Users',
    value: '8,542',
    change: '+18%',
    icon: Users
  },
  {
    title: 'Total Bookings',
    value: '1,845',
    change: '+24%',
    icon: CalendarCheck
  },
  {
    title: 'Revenue',
    value: '485K',
    change: '+16%',
    icon: Banknote
  }
]

const recentBookings = [
  {
    user: 'Mekonnen T.',
    venue: 'Sarbet Futsal Arena',
    sport: 'Futsal',
    date: 'Sep 28, 2026',
    time: '4:00 PM',
    status: 'Confirmed'
  },
  {
    user: 'Dawit K.',
    venue: 'Unity Football Arena',
    sport: 'Football',
    date: 'Sep 28, 2026',
    time: '6:00 PM',
    status: 'Pending'
  },
  {
    user: 'Samuel A.',
    venue: 'Yeka Basketball Court',
    sport: 'Basketball',
    date: 'Sep 29, 2026',
    time: '3:00 PM',
    status: 'Confirmed'
  },
  {
    user: 'Abebe M.',
    venue: 'Summit Sports Complex',
    sport: 'Football',
    date: 'Sep 29, 2026',
    time: '5:00 PM',
    status: 'Cancelled'
  }
]

const pending = [
  '9 sport fields waiting for approval',
  '14 partner applications',
  '7 booking complaints'
]
</script>

<template>
  <div class="space-y-8">

    <!-- Title -->
    <div class="flex flex-col justify-between gap-4 md:flex-row md:items-center">
      <div>
        <h1 class="text-3xl font-black text-slate-900">
          Dashboard
        </h1>
        <p class="mt-1 text-slate-500">
          Welcome back, Admin. Here's what's happening today.
        </p>
      </div>

      <button class="rounded-xl bg-slate-950 px-5 py-3 font-semibold text-white hover:bg-slate-800">
        + Add Sport Field
      </button>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">

      <div
        v-for="stat in stats"
        :key="stat.title"
        class="rounded-2xl bg-white p-6 shadow-sm"
      >
        <div class="flex items-start justify-between">
          <div>
            <p class="text-sm text-slate-500">{{ stat.title }}</p>
            <h3 class="mt-2 text-3xl font-black text-slate-900">
              {{ stat.value }}
            </h3>
          </div>

          <div class="rounded-xl bg-slate-100 p-3">
            <component :is="stat.icon" :size="24" />
          </div>
        </div>

        <div class="mt-5 flex items-center gap-2 text-sm">
          <TrendingUp :size="16" />
          <span class="font-semibold">{{ stat.change }}</span>
          <span class="text-slate-400">vs last month</span>
        </div>
      </div>

    </div>

    <!-- Charts -->
    <div class="grid grid-cols-1 gap-6 xl:grid-cols-3">

      <div class="rounded-2xl bg-white p-6 xl:col-span-2">
        <div class="flex items-center justify-between">
          <div>
            <h2 class="text-lg font-bold">Booking Overview</h2>
            <p class="text-sm text-slate-500">Monthly bookings</p>
          </div>

          <select class="rounded-lg border px-3 py-2 text-sm">
            <option>2026</option>
            <option>2025</option>
          </select>
        </div>

        <div class="mt-8 flex h-64 items-end gap-3">
          <div
            v-for="height in [35,52,44,65,58,72,80,61,88,76,94,82]"
            :key="height"
            class="flex-1 rounded-t-lg bg-[#94FF2B] transition hover:opacity-70"
            :style="{ height: `${height}%` }"
          />
        </div>

        <div class="mt-4 grid grid-cols-12 text-center text-xs text-slate-400">
          <span v-for="month in ['J','F','M','A','M','J','J','A','S','O','N','D']" :key="month">
            {{ month }}
          </span>
        </div>
      </div>

      <!-- Pending -->
      <div class="rounded-2xl bg-white p-6">
        <h2 class="text-lg font-bold">Needs Attention</h2>

        <div class="mt-5 space-y-4">

          <div
            v-for="item in pending"
            :key="item"
            class="flex gap-3 rounded-xl bg-slate-50 p-4"
          >
            <AlertCircle class="shrink-0 text-orange-500" :size="21" />

            <p class="text-sm text-slate-700">
              {{ item }}
            </p>
          </div>

        </div>
      </div>

    </div>

    <!-- Recent bookings -->
    <div class="rounded-2xl bg-white p-6">

      <div class="mb-5 flex items-center justify-between">
        <div>
          <h2 class="text-lg font-bold">Recent Bookings</h2>
          <p class="text-sm text-slate-500">
            Latest sport field reservations
          </p>
        </div>

        <NuxtLink
          to="/admin/bookings"
          class="text-sm font-semibold text-slate-900 hover:underline"
        >
          View all
        </NuxtLink>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full min-w-[750px] text-left">

          <thead>
            <tr class="border-b text-xs uppercase text-slate-400">
              <th class="px-4 py-4">User</th>
              <th class="px-4 py-4">Sport Field</th>
              <th class="px-4 py-4">Sport</th>
              <th class="px-4 py-4">Date</th>
              <th class="px-4 py-4">Time</th>
              <th class="px-4 py-4">Status</th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="booking in recentBookings"
              :key="booking.user"
              class="border-b last:border-0 hover:bg-slate-50"
            >
              <td class="px-4 py-4 font-semibold">
                {{ booking.user }}
              </td>

              <td class="px-4 py-4">
                {{ booking.venue }}
              </td>

              <td class="px-4 py-4">
                {{ booking.sport }}
              </td>

              <td class="px-4 py-4 text-sm text-slate-500">
                {{ booking.date }}
              </td>

              <td class="px-4 py-4 text-sm">
                {{ booking.time }}
              </td>

              <td class="px-4 py-4">
                <span
                  class="rounded-full px-3 py-1 text-xs font-bold"
                  :class="{
                    'bg-green-100 text-green-700': booking.status === 'Confirmed',
                    'bg-yellow-100 text-yellow-700': booking.status === 'Pending',
                    'bg-red-100 text-red-700': booking.status === 'Cancelled'
                  }"
                >
                  {{ booking.status }}
                </span>
              </td>
            </tr>
          </tbody>

        </table>
      </div>

    </div>

  </div>
</template>