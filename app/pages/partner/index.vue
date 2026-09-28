```vue
<template>
  <div class="min-h-full bg-slate-50">

    <!-- HEADER -->
    <section class="border-b border-slate-200 bg-white">
      <div class="mx-auto max-w-[1500px] px-6 py-7 lg:px-8">
        <div class="flex flex-col justify-between gap-5 md:flex-row md:items-center">
          <div>
            <p class="text-sm font-semibold text-emerald-600">
              Welcome back 👋
            </p>

            <h1 class="mt-1 text-2xl font-black tracking-tight text-slate-900">
              Partner Dashboard
            </h1>

            <p class="mt-1 text-sm text-slate-500">
              Manage your Addis Ababa sport field, bookings and earnings.
            </p>
          </div>

          <NuxtLink
            to="/partner/my-venue"
            class="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-emerald-700"
          >
            ⚽ Manage My Venue
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- CONTENT -->
    <div class="mx-auto max-w-[1500px] px-6 py-7 lg:px-8">

      <!-- VENUE CARD -->
      <div class="mb-7 overflow-hidden rounded-3xl bg-slate-900">
        <div class="grid lg:grid-cols-[1fr_360px]">

          <div class="p-7 lg:p-9">
            <div class="mb-5 flex items-center gap-3">
              <div class="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/15 text-2xl">
                ⚽
              </div>

              <div>
                <p class="text-xs font-bold uppercase tracking-wider text-emerald-400">
                  My Sport Field
                </p>

                <h2 class="text-xl font-black text-white">
                  Sarbet Futsal Arena
                </h2>
              </div>
            </div>

            <div class="grid gap-4 sm:grid-cols-3">

              <div>
                <p class="text-xs text-slate-400">Location</p>
                <p class="mt-1 font-bold text-white">
                  Bole, Addis Ababa
                </p>
              </div>

              <div>
                <p class="text-xs text-slate-400">Sport Type</p>
                <p class="mt-1 font-bold text-white">
                  Futsal
                </p>
              </div>

              <div>
                <p class="text-xs text-slate-400">Price / Hour</p>
                <p class="mt-1 font-bold text-white">
                  ETB 1,500
                </p>
              </div>

            </div>
          </div>

          <div class="flex items-center border-t border-white/10 bg-white/5 p-7 lg:border-l lg:border-t-0">
            <div class="w-full">
              <div class="flex items-center justify-between">
                <span class="text-sm text-slate-400">
                  Venue Status
                </span>

                <span class="flex items-center gap-2 text-sm font-bold text-emerald-400">
                  <span class="h-2 w-2 rounded-full bg-emerald-400"></span>
                  Active
                </span>
              </div>

              <div class="mt-5">
                <div class="mb-2 flex justify-between text-xs">
                  <span class="text-slate-400">Profile completion</span>
                  <span class="font-bold text-white">92%</span>
                </div>

                <div class="h-2 overflow-hidden rounded-full bg-white/10">
                  <div class="h-full w-[92%] rounded-full bg-emerald-500"></div>
                </div>
              </div>

              <NuxtLink
                to="/partner/my-venue"
                class="mt-5 block rounded-xl bg-white px-4 py-3 text-center text-sm font-bold text-slate-900 hover:bg-slate-100"
              >
                View Venue
              </NuxtLink>
            </div>
          </div>

        </div>
      </div>

      <!-- STATS -->
      <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

        <div
          v-for="stat in stats"
          :key="stat.title"
          class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
        >
          <div class="flex items-start justify-between">
            <div>
              <p class="text-sm font-medium text-slate-500">
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

      <!-- LOWER GRID -->
      <div class="mt-7 grid gap-7 xl:grid-cols-[1.5fr_1fr]">

        <!-- BOOKINGS -->
        <section class="rounded-2xl border border-slate-200 bg-white shadow-sm">

          <div class="flex items-center justify-between border-b border-slate-100 px-6 py-5">
            <div>
              <h2 class="font-black text-slate-900">
                Recent Bookings
              </h2>

              <p class="mt-1 text-xs text-slate-500">
                Latest reservations for your sport field
              </p>
            </div>

            <NuxtLink
              to="/partner/bookings"
              class="text-sm font-bold text-emerald-600 hover:text-emerald-700"
            >
              View All →
            </NuxtLink>
          </div>

          <div class="divide-y divide-slate-100">

            <div
              v-for="booking in bookings"
              :key="booking.id"
              class="flex flex-col gap-3 px-6 py-5 sm:flex-row sm:items-center sm:justify-between"
            >
              <div class="flex items-center gap-3">

                <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100">
                  👤
                </div>

                <div>
                  <p class="text-sm font-bold text-slate-900">
                    {{ booking.customer }}
                  </p>

                  <p class="mt-1 text-xs text-slate-500">
                    {{ booking.date }} · {{ booking.time }}
                  </p>
                </div>

              </div>

              <div class="flex items-center justify-between gap-5 sm:justify-end">

                <p class="text-sm font-black text-slate-900">
                  ETB {{ booking.amount }}
                </p>

                <span
                  class="rounded-full px-3 py-1 text-[11px] font-bold"
                  :class="statusClass(booking.status)"
                >
                  {{ booking.status }}
                </span>

              </div>
            </div>

          </div>
        </section>

        <!-- QUICK ACTIONS -->
        <section class="rounded-2xl border border-slate-200 bg-white shadow-sm">

          <div class="border-b border-slate-100 px-6 py-5">
            <h2 class="font-black text-slate-900">
              Quick Actions
            </h2>

            <p class="mt-1 text-xs text-slate-500">
              Frequently used partner tools
            </p>
          </div>

          <div class="grid grid-cols-2 gap-3 p-5">

            <NuxtLink
              to="/partner/slots"
              class="rounded-2xl border border-slate-200 p-4 transition hover:border-emerald-300 hover:bg-emerald-50"
            >
              <span class="text-xl">◷</span>

              <p class="mt-3 text-sm font-bold text-slate-900">
                Manage Slots
              </p>

              <p class="mt-1 text-[11px] text-slate-500">
                Set available times
              </p>
            </NuxtLink>

            <NuxtLink
              to="/partner/bookings"
              class="rounded-2xl border border-slate-200 p-4 transition hover:border-emerald-300 hover:bg-emerald-50"
            >
              <span class="text-xl">📅</span>

              <p class="mt-3 text-sm font-bold text-slate-900">
                Bookings
              </p>

              <p class="mt-1 text-[11px] text-slate-500">
                Manage reservations
              </p>
            </NuxtLink>

            <NuxtLink
              to="/partner/events"
              class="rounded-2xl border border-slate-200 p-4 transition hover:border-emerald-300 hover:bg-emerald-50"
            >
              <span class="text-xl">🎯</span>

              <p class="mt-3 text-sm font-bold text-slate-900">
                Create Event
              </p>

              <p class="mt-1 text-[11px] text-slate-500">
                Add sport events
              </p>
            </NuxtLink>

            <NuxtLink
              to="/partner/earnings"
              class="rounded-2xl border border-slate-200 p-4 transition hover:border-emerald-300 hover:bg-emerald-50"
            >
              <span class="text-xl">💰</span>

              <p class="mt-3 text-sm font-bold text-slate-900">
                Earnings
              </p>

              <p class="mt-1 text-[11px] text-slate-500">
                View your revenue
              </p>
            </NuxtLink>

          </div>
        </section>

      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'partner',
})

const stats = [
  {
    title: 'Total Bookings',
    value: '128',
    change: '+12% this month',
    icon: '📅',
  },
  {
    title: 'This Month Revenue',
    value: 'ETB 86,500',
    change: '+8.4% from last month',
    icon: '💰',
  },
  {
    title: 'Available Slots',
    value: '24',
    change: 'Today',
    icon: '◷',
  },
  {
    title: 'Pending Requests',
    value: '7',
    change: 'Needs attention',
    icon: '🔔',
  },
]

const bookings = [
  {
    id: 1,
    customer: 'Abebe Kebede',
    date: 'Today',
    time: '4:00 PM - 5:00 PM',
    amount: '1,500',
    status: 'Confirmed',
  },
  {
    id: 2,
    customer: 'Nahom Team',
    date: 'Today',
    time: '6:00 PM - 7:00 PM',
    amount: '1,500',
    status: 'Pending',
  },
  {
    id: 3,
    customer: 'Bole United',
    date: 'Tomorrow',
    time: '7:00 PM - 8:00 PM',
    amount: '1,500',
    status: 'Confirmed',
  },
  {
    id: 4,
    customer: 'Mekdes Football',
    date: 'Sep 29',
    time: '5:00 PM - 6:00 PM',
    amount: '1,500',
    status: 'Cancelled',
  },
]

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
