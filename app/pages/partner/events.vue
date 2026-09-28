```vue
<template>
  <div class="min-h-full bg-slate-50">

    <!-- HEADER -->
    <section class="border-b border-slate-200 bg-white">
      <div class="mx-auto max-w-[1500px] px-6 py-7 lg:px-8">
        <div class="flex flex-col justify-between gap-5 md:flex-row md:items-center">
          <div>
            <p class="text-sm font-semibold text-emerald-600">
              Management
            </p>
            <h1 class="mt-1 text-2xl font-black text-slate-900">
              Events
            </h1>
            <p class="mt-1 text-sm text-slate-500">
              Create and manage sports events hosted at your venue.
            </p>
          </div>

          <button
            class="rounded-xl bg-emerald-600 px-5 py-3 text-sm font-bold text-white shadow-sm hover:bg-emerald-700"
            @click="openCreateModal"
          >
            + Create Event
          </button>
        </div>
      </div>
    </section>

    <div class="mx-auto max-w-[1500px] px-6 py-7 lg:px-8">

      <!-- STATS -->
      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
            </div>

            <div class="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-xl">
              {{ stat.icon }}
            </div>
          </div>
        </div>
      </div>

      <!-- FILTER -->
      <div class="mt-7 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div class="flex flex-col gap-3 md:flex-row">
          <input
            v-model="search"
            type="text"
            placeholder="Search events..."
            class="flex-1 rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-emerald-500"
          />

          <select
            v-model="statusFilter"
            class="rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold outline-none focus:border-emerald-500"
          >
            <option value="All">All Status</option>
            <option value="Upcoming">Upcoming</option>
            <option value="Ongoing">Ongoing</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
      </div>

      <!-- EVENTS -->
      <div class="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        <div
          v-for="event in filteredEvents"
          :key="event.id"
          class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
        >
          <div class="relative h-40 bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-800">
            <div class="absolute left-5 top-5 rounded-xl bg-white/10 px-3 py-2 text-2xl">
              {{ event.icon }}
            </div>

            <div class="absolute bottom-4 left-5">
              <span
                class="rounded-full px-3 py-1 text-[10px] font-bold"
                :class="eventStatusClass(event.status)"
              >
                {{ event.status }}
              </span>
            </div>
          </div>

          <div class="p-5">
            <h2 class="font-black text-slate-900">
              {{ event.name }}
            </h2>

            <div class="mt-4 space-y-2 text-xs text-slate-500">
              <p>📅 {{ event.date }}</p>
              <p>⏰ {{ event.time }}</p>
              <p>👥 {{ event.participants }} Participants</p>
            </div>

            <div class="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
              <p class="text-sm font-black text-slate-900">
                ETB {{ event.price }}
              </p>

              <button
                class="rounded-lg bg-slate-100 px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-200"
              >
                Manage
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        v-if="filteredEvents.length === 0"
        class="mt-6 rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center"
      >
        <div class="text-4xl">🎯</div>
        <h3 class="mt-3 font-black text-slate-900">
          No events found
        </h3>
      </div>

    </div>

    <!-- CREATE MODAL -->
    <div
      v-if="showModal"
      class="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/50 p-4"
      @click.self="showModal = false"
    >
      <div class="w-full max-w-lg rounded-3xl bg-white shadow-2xl">

        <div class="flex items-center justify-between border-b border-slate-100 p-6">
          <div>
            <h2 class="text-lg font-black text-slate-900">
              Create Event
            </h2>
            <p class="mt-1 text-xs text-slate-500">
              Add a new event to your venue.
            </p>
          </div>

          <button
            class="text-xl text-slate-400 hover:text-slate-700"
            @click="showModal = false"
          >
            ×
          </button>
        </div>

        <div class="space-y-4 p-6">
          <input
            v-model="form.name"
            placeholder="Event name"
            class="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-emerald-500"
          />

          <div class="grid grid-cols-2 gap-3">
            <input
              v-model="form.date"
              type="date"
              class="rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-emerald-500"
            />

            <input
              v-model="form.time"
              type="time"
              class="rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-emerald-500"
            />
          </div>

          <input
            v-model="form.price"
            type="number"
            placeholder="Entry price"
            class="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-emerald-500"
          />
        </div>

        <div class="flex justify-end gap-3 border-t border-slate-100 p-6">
          <button
            class="rounded-xl px-4 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-100"
            @click="showModal = false"
          >
            Cancel
          </button>

          <button
            class="rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-emerald-700"
            @click="createEvent"
          >
            Create Event
          </button>
        </div>

      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

definePageMeta({
  layout: 'partner',
})

const search = ref('')
const statusFilter = ref('All')
const showModal = ref(false)

const form = ref({
  name: '',
  date: '',
  time: '',
  price: '',
})

const stats = [
  { title: 'Total Events', value: '18', icon: '🎯' },
  { title: 'Upcoming', value: '6', icon: '📅' },
  { title: 'Participants', value: '248', icon: '👥' },
  { title: 'Event Revenue', value: 'ETB 74,500', icon: '💰' },
]

const events = ref([
  {
    id: 1,
    name: 'Addis Futsal Championship',
    date: 'Sep 30, 2026',
    time: '4:00 PM',
    participants: 32,
    price: '500',
    status: 'Upcoming',
    icon: '🏆',
  },
  {
    id: 2,
    name: 'Bole Weekend Football',
    date: 'Oct 03, 2026',
    time: '3:00 PM',
    participants: 48,
    price: '300',
    status: 'Upcoming',
    icon: '⚽',
  },
  {
    id: 3,
    name: 'Sarbet Futsal Friendly',
    date: 'Sep 25, 2026',
    time: '5:00 PM',
    participants: 20,
    price: '250',
    status: 'Completed',
    icon: '🎯',
  },
])

const filteredEvents = computed(() => {
  return events.value.filter(event => {
    const matchesSearch =
      event.name.toLowerCase().includes(search.value.toLowerCase())

    const matchesStatus =
      statusFilter.value === 'All' ||
      event.status === statusFilter.value

    return matchesSearch && matchesStatus
  })
})

function eventStatusClass(status: string) {
  if (status === 'Upcoming') {
    return 'bg-emerald-100 text-emerald-700'
  }

  if (status === 'Ongoing') {
    return 'bg-blue-100 text-blue-700'
  }

  return 'bg-slate-200 text-slate-600'
}

function openCreateModal() {
  showModal.value = true
}

function createEvent() {
  if (!form.value.name) return

  events.value.unshift({
    id: Date.now(),
    name: form.value.name,
    date: form.value.date || 'TBD',
    time: form.value.time || 'TBD',
    participants: 0,
    price: form.value.price || '0',
    status: 'Upcoming',
    icon: '🏆',
  })

  form.value = {
    name: '',
    date: '',
    time: '',
    price: '',
  }

  showModal.value = false
}
</script>
```
