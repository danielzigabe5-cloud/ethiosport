<script setup lang="ts">
import { computed } from 'vue'
import type { Booking } from '~/composables/usePartnerDashboard'

definePageMeta({
  layout: 'partner',
})

const {
  data,
  loading,
  error,
  fetchDashboard,
  refresh,
} = usePartnerDashboard()

await useAsyncData('partner-dashboard', async () => {
  try {
    await fetchDashboard()
  } catch (err) {
    console.error('Partner dashboard error:', err)
  }

  return true
})

const quickActions = [
  {
    to: '/partner/schedule',
    icon: '◷',
    title: 'Manage Slots',
    description: 'Set available times',
  },
  {
    to: '/partner/bookings',
    icon: '📅',
    title: 'Bookings',
    description: 'Manage reservations',
  },
  {
    to: '/partner/events',
    icon: '🎯',
    title: 'Create Event',
    description: 'Add sport events',
  },
  {
    to: '/partner/earnings',
    icon: '💰',
    title: 'Earnings',
    description: 'View your revenue',
  },
]

const pendingCount = computed(() => {
  const stat = data.value?.stats?.find(
    (s) => s.title === 'Pending Requests',
  )

  return Number(stat?.value ?? 0)
})

function statusClass(status: Booking['status']) {
  const map: Record<Booking['status'], string> = {
    Confirmed:
      'bg-emerald-50 text-emerald-700 ring-emerald-200',

    Pending:
      'bg-amber-50 text-amber-700 ring-amber-200',

    Cancelled:
      'bg-red-50 text-red-700 ring-red-200',

    Completed:
      'bg-sky-50 text-sky-700 ring-sky-200',
  }

  return (
    map[status] ??
    'bg-slate-50 text-slate-700 ring-slate-200'
  )
}

function trendClass(trend?: 'up' | 'down' | 'neutral') {
  if (trend === 'up') {
    return 'text-emerald-600'
  }

  if (trend === 'down') {
    return 'text-red-500'
  }

  return 'text-slate-500'
}

function getInitials(name: string) {
  return name
    .split(' ')
    .filter(Boolean)
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
}
</script>

<template>
  <div class="min-h-full bg-gradient-to-b from-slate-50 to-slate-100/50">

    <!-- HEADER -->
    <section class="border-b border-slate-200 bg-white/80 backdrop-blur-sm">
      <div class="mx-auto max-w-[1500px] px-6 py-7 lg:px-8">

        <div
          class="flex flex-col justify-between gap-5 md:flex-row md:items-center"
        >

          <!-- TITLE -->
          <div>
            <p
              class="flex items-center gap-2 text-sm font-semibold text-emerald-600"
            >
              <span class="relative flex h-2 w-2">
                <span
                  class="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"
                ></span>

                <span
                  class="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"
                ></span>
              </span>

              Welcome back 👋
            </p>

            <h1
              class="mt-1 text-2xl font-black tracking-tight text-slate-900 lg:text-3xl"
            >
              Partner Dashboard
            </h1>

            <p class="mt-1 text-sm text-slate-500">
              Manage your Addis Ababa sport field, bookings and earnings.
            </p>
          </div>

          <!-- ACTIONS -->
          <div class="flex flex-wrap items-center gap-3">

            <!-- Notification -->
            <button
              type="button"
              class="relative rounded-xl border border-slate-200 bg-white p-3 shadow-sm transition hover:bg-slate-50"
            >
              <span class="text-lg">🔔</span>

              <span
                v-if="pendingCount > 0"
                class="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white ring-2 ring-white"
              >
                {{ pendingCount }}
              </span>
            </button>

            <!-- Refresh -->
            <button
              type="button"
              :disabled="loading"
              class="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700 shadow-sm transition hover:bg-slate-50 hover:shadow disabled:cursor-not-allowed disabled:opacity-50"
              @click="refresh"
            >
              <svg
                class="h-4 w-4 transition-transform"
                :class="{ 'animate-spin': loading }"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>

              Refresh
            </button>

            <!-- Manage Venue -->
            <NuxtLink
              to="/partner/my-venue"
              class="group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-500/25 transition hover:from-emerald-700 hover:to-emerald-600 hover:shadow-emerald-500/40"
            >
              ⚽ Manage My Venue

              <svg
                class="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </NuxtLink>

          </div>
        </div>
      </div>
    </section>

    <!-- CONTENT -->
    <div class="mx-auto max-w-[1500px] px-6 py-7 lg:px-8">

      <!-- ERROR -->
      <div
        v-if="error"
        class="mb-7 flex items-center gap-3 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-semibold text-red-700"
      >
        <svg
          class="h-5 w-5 shrink-0"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>

        {{ error }}

        <button
          type="button"
          class="ml-auto rounded-lg bg-red-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-red-700"
          @click="refresh"
        >
          Retry
        </button>
      </div>

      <!-- VENUE LOADING -->
      <div
        v-if="loading"
        class="mb-7 h-64 animate-pulse overflow-hidden rounded-3xl bg-slate-200"
      ></div>

      <!-- VENUE CARD -->
      <div
        v-else-if="data"
        class="group relative mb-7 overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 shadow-2xl"
      >

        <!-- Decorative -->
        <div
          class="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-emerald-500/20 blur-3xl"
        ></div>

        <div
          class="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl"
        ></div>

        <div class="relative grid lg:grid-cols-[1fr_360px]">

          <!-- VENUE INFORMATION -->
          <div class="p-7 lg:p-9">

            <div class="mb-5 flex items-center gap-3">

              <div
                class="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/15 text-2xl ring-1 ring-emerald-500/30"
              >
                ⚽
              </div>

              <div>
                <p
                  class="text-xs font-bold uppercase tracking-wider text-emerald-400"
                >
                  My Sport Field
                </p>

                <h2 class="text-xl font-black text-white">
                  {{ data.venue.name }}
                </h2>
              </div>

            </div>

            <div class="grid gap-4 sm:grid-cols-3">

              <!-- Location -->
              <div
                class="rounded-xl bg-white/5 p-3 ring-1 ring-white/10"
              >
                <p class="text-xs text-slate-400">
                  Location
                </p>

                <p class="mt-1 font-bold text-white">
                  {{ data.venue.location }}
                </p>
              </div>

              <!-- Sport -->
              <div
                class="rounded-xl bg-white/5 p-3 ring-1 ring-white/10"
              >
                <p class="text-xs text-slate-400">
                  Sport Type
                </p>

                <p class="mt-1 font-bold text-white">
                  {{ data.venue.sportType }}
                </p>
              </div>

              <!-- Price -->
              <div
                class="rounded-xl bg-white/5 p-3 ring-1 ring-white/10"
              >
                <p class="text-xs text-slate-400">
                  Price / Hour
                </p>

                <p class="mt-1 font-bold text-white">
                  ETB {{ data.venue.pricePerHour.toLocaleString() }}
                </p>
              </div>

            </div>
          </div>

          <!-- VENUE STATUS -->
          <div
            class="flex items-center border-t border-white/10 bg-white/5 p-7 backdrop-blur-sm lg:border-l lg:border-t-0"
          >

            <div class="w-full">

              <div class="flex items-center justify-between">

                <span class="text-sm text-slate-400">
                  Venue Status
                </span>

                <span
                  class="flex items-center gap-2 text-sm font-bold text-emerald-400"
                >
                  <span
                    class="h-2 w-2 animate-pulse rounded-full bg-emerald-400"
                  ></span>

                  {{ data.venue.status }}
                </span>

              </div>

              <!-- Completion -->
              <div class="mt-5">

                <div class="mb-2 flex justify-between text-xs">

                  <span class="text-slate-400">
                    Profile completion
                  </span>

                  <span class="font-bold text-white">
                    {{ data.venue.completion }}%
                  </span>

                </div>

                <div class="h-2 overflow-hidden rounded-full bg-white/10">

                  <div
                    class="h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400 transition-all duration-1000 ease-out"
                    :style="{
                      width: `${data.venue.completion}%`,
                    }"
                  ></div>

                </div>

              </div>

              <NuxtLink
                to="/partner/my-venue"
                class="mt-5 block rounded-xl bg-white px-4 py-3 text-center text-sm font-bold text-slate-900 transition hover:bg-slate-100 hover:shadow-lg"
              >
                View Venue
              </NuxtLink>

            </div>
          </div>

        </div>
      </div>

      <!-- STATS -->
      <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

        <!-- Loading -->
        <template v-if="loading">

          <div
            v-for="i in 4"
            :key="i"
            class="h-32 animate-pulse rounded-2xl border border-slate-200 bg-white"
          ></div>

        </template>

        <!-- Data -->
        <template v-else-if="data">

          <div
            v-for="(stat, index) in data.stats"
            :key="stat.title"
            class="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-emerald-200 hover:shadow-lg"
            :style="{
              animationDelay: `${index * 75}ms`,
            }"
          >

            <div
              class="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-emerald-50 opacity-0 transition-opacity group-hover:opacity-100"
            ></div>

            <div class="relative flex items-start justify-between">

              <div>

                <p class="text-sm font-medium text-slate-500">
                  {{ stat.title }}
                </p>

                <p class="mt-2 text-2xl font-black text-slate-900">
                  {{ stat.value }}
                </p>

                <p
                  class="mt-2 flex items-center gap-1 text-xs font-semibold"
                  :class="trendClass(stat.trend)"
                >

                  <svg
                    v-if="stat.trend === 'up'"
                    class="h-3 w-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2.5"
                      d="M5 10l7-7m0 0l7 7m-7-7v18"
                    />
                  </svg>

                  <svg
                    v-else-if="stat.trend === 'down'"
                    class="h-3 w-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2.5"
                      d="M19 14l-7 7m0 0l-7-7m7 7V3"
                    />
                  </svg>

                  {{ stat.change }}

                </p>

              </div>

              <div
                class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-50 to-emerald-100 text-xl ring-1 ring-emerald-100 transition-transform group-hover:scale-110"
              >
                {{ stat.icon }}
              </div>

            </div>
          </div>

        </template>

      </div>

      <!-- LOWER GRID -->
      <div class="mt-7 grid gap-7 xl:grid-cols-[1.5fr_1fr]">

        <!-- BOOKINGS -->
        <section
          class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
        >

          <div
            class="flex items-center justify-between border-b border-slate-100 px-6 py-5"
          >

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
              class="group inline-flex items-center gap-1 text-sm font-bold text-emerald-600 transition hover:text-emerald-700"
            >
              View All

              <span
                class="transition-transform group-hover:translate-x-0.5"
              >
                →
              </span>
            </NuxtLink>

          </div>

          <div class="divide-y divide-slate-100">

            <!-- Loading -->
            <template v-if="loading">

              <div
                v-for="i in 4"
                :key="i"
                class="flex items-center gap-3 px-6 py-5"
              >

                <div
                  class="h-10 w-10 animate-pulse rounded-xl bg-slate-100"
                ></div>

                <div class="flex-1 space-y-2">

                  <div
                    class="h-3 w-1/3 animate-pulse rounded bg-slate-100"
                  ></div>

                  <div
                    class="h-2 w-1/4 animate-pulse rounded bg-slate-100"
                  ></div>

                </div>

              </div>

            </template>

            <!-- Bookings -->
            <template v-else-if="data">

              <div
                v-for="booking in data.bookings"
                :key="booking.id"
                class="flex flex-col gap-3 px-6 py-5 transition hover:bg-slate-50/70 sm:flex-row sm:items-center sm:justify-between"
              >

                <div class="flex items-center gap-3">

                  <div
                    class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 text-sm font-bold text-slate-600"
                  >
                    {{ getInitials(booking.customer) }}
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

                <div
                  class="flex items-center justify-between gap-5 sm:justify-end"
                >

                  <p class="text-sm font-black text-slate-900">
                    ETB {{ booking.amount }}
                  </p>

                  <span
                    class="rounded-full px-3 py-1 text-[11px] font-bold ring-1 ring-inset"
                    :class="statusClass(booking.status)"
                  >
                    {{ booking.status }}
                  </span>

                </div>

              </div>

              <!-- Empty -->
              <div
                v-if="!data.bookings.length"
                class="flex flex-col items-center gap-3 px-6 py-16 text-center"
              >

                <div
                  class="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-3xl"
                >
                  📭
                </div>

                <div>

                  <p class="text-sm font-bold text-slate-900">
                    No bookings yet
                  </p>

                  <p class="mt-1 text-xs text-slate-500">
                    Bookings will appear here once customers reserve your venue.
                  </p>

                </div>

                <NuxtLink
                  to="/partner/schedule"
                  class="mt-2 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white hover:bg-emerald-700"
                >
                  Add Available Slots
                </NuxtLink>

              </div>

            </template>

          </div>
        </section>

        <!-- QUICK ACTIONS -->
        <section
          class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
        >

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
              v-for="action in quickActions"
              :key="action.to"
              :to="action.to"
              class="group rounded-2xl border border-slate-200 p-4 transition-all hover:-translate-y-0.5 hover:border-emerald-300 hover:bg-gradient-to-br hover:from-emerald-50 hover:to-white hover:shadow-md"
            >

              <span
                class="inline-block text-xl transition-transform group-hover:scale-110"
              >
                {{ action.icon }}
              </span>

              <p class="mt-3 text-sm font-bold text-slate-900">
                {{ action.title }}
              </p>

              <p class="mt-1 text-[11px] text-slate-500">
                {{ action.description }}
              </p>

            </NuxtLink>

          </div>
        </section>

      </div>
    </div>
  </div>
</template>