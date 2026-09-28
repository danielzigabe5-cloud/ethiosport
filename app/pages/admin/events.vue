<script setup lang="ts">
import { Plus, CalendarDays, MapPin, Users } from 'lucide-vue-next'

definePageMeta({
  layout: 'admin'
})

const events = [
  {
    name: 'Addis 5-a-Side Football Tournament',
    venue: 'Bole Arena',
    date: 'Aug 30, 2026',
    participants: 64,
    status: 'Upcoming'
  },
  {
    name: 'Basketball Friendly Match',
    venue: 'Yeka Court',
    date: 'Sep 05, 2026',
    participants: 32,
    status: 'Upcoming'
  },
  {
    name: 'Futsal Championship',
    venue: 'Summit Complex',
    date: 'Sep 12, 2026',
    participants: 48,
    status: 'Registration'
  }
]
</script>

<template>
  <div class="space-y-6">

    <div class="flex flex-col justify-between gap-4 md:flex-row md:items-center">
      <div>
        <h1 class="text-3xl font-black">Events</h1>
        <p class="text-slate-500">Manage sport events and tournaments.</p>
      </div>

      <button class="flex items-center gap-2 rounded-xl bg-slate-950 px-5 py-3 font-bold text-white">
        <Plus :size="19" />
        Create Event
      </button>
    </div>

    <div class="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">

      <div
        v-for="event in events"
        :key="event.name"
        class="overflow-hidden rounded-2xl bg-white shadow-sm"
      >

        <div class="flex h-36 items-center justify-center bg-slate-900 text-6xl">
          🏆
        </div>

        <div class="p-5">

          <span class="rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700">
            {{ event.status }}
          </span>

          <h2 class="mt-3 font-black">
            {{ event.name }}
          </h2>

          <div class="mt-4 space-y-2 text-sm text-slate-500">

            <p class="flex items-center gap-2">
              <CalendarDays :size="17" />
              {{ event.date }}
            </p>

            <p class="flex items-center gap-2">
              <MapPin :size="17" />
              {{ event.venue }}
            </p>

            <p class="flex items-center gap-2">
              <Users :size="17" />
              {{ event.participants }} participants
            </p>

          </div>

          <button class="mt-5 w-full rounded-xl bg-slate-100 py-3 text-sm font-bold hover:bg-slate-200">
            Manage Event
          </button>

        </div>
      </div>

    </div>
  </div>
</template>