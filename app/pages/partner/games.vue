```vue
<template>
  <div class="min-h-full bg-slate-50">

    <section class="border-b border-slate-200 bg-white">
      <div class="mx-auto max-w-[1500px] px-6 py-7 lg:px-8">
        <div class="flex flex-col justify-between gap-5 md:flex-row md:items-center">
          <div>
            <p class="text-sm font-semibold text-emerald-600">
              Management
            </p>

            <h1 class="mt-1 text-2xl font-black text-slate-900">
              Games
            </h1>

            <p class="mt-1 text-sm text-slate-500">
              Manage games and Just Play activities at your venue.
            </p>
          </div>

          <button
            class="rounded-xl bg-emerald-600 px-5 py-3 text-sm font-bold text-white hover:bg-emerald-700"
            @click="showModal = true"
          >
            + Create Game
          </button>
        </div>
      </div>
    </section>

    <div class="mx-auto max-w-[1500px] px-6 py-7 lg:px-8">

      <!-- SUMMARY -->
      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div
          v-for="item in summary"
          :key="item.title"
          class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
        >
          <p class="text-xs font-semibold text-slate-500">
            {{ item.title }}
          </p>

          <p class="mt-2 text-2xl font-black text-slate-900">
            {{ item.value }}
          </p>

          <p class="mt-2 text-xs font-semibold text-emerald-600">
            {{ item.note }}
          </p>
        </div>
      </div>

      <!-- GAMES -->
      <div class="mt-7 grid gap-5 md:grid-cols-2 xl:grid-cols-3">

        <div
          v-for="game in games"
          :key="game.id"
          class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
        >
          <div class="flex items-start justify-between">

            <div class="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-2xl">
              {{ game.icon }}
            </div>

            <span
              class="rounded-full px-3 py-1 text-[10px] font-bold"
              :class="game.active ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'"
            >
              {{ game.active ? 'Active' : 'Inactive' }}
            </span>

          </div>

          <h2 class="mt-5 font-black text-slate-900">
            {{ game.name }}
          </h2>

          <p class="mt-1 text-xs text-slate-500">
            {{ game.type }}
          </p>

          <div class="mt-5 grid grid-cols-2 gap-3">

            <div class="rounded-xl bg-slate-50 p-3">
              <p class="text-[10px] text-slate-400">Players</p>
              <p class="mt-1 text-sm font-black text-slate-900">
                {{ game.players }}
              </p>
            </div>

            <div class="rounded-xl bg-slate-50 p-3">
              <p class="text-[10px] text-slate-400">Price</p>
              <p class="mt-1 text-sm font-black text-slate-900">
                ETB {{ game.price }}
              </p>
            </div>

          </div>

          <button
            class="mt-5 w-full rounded-xl border border-slate-200 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-50"
          >
            Manage Game
          </button>

        </div>

      </div>

    </div>

    <!-- MODAL -->
    <div
      v-if="showModal"
      class="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/50 p-4"
      @click.self="showModal = false"
    >
      <div class="w-full max-w-lg rounded-3xl bg-white shadow-2xl">

        <div class="border-b border-slate-100 p-6">
          <div class="flex items-center justify-between">
            <h2 class="font-black text-slate-900">
              Create Game
            </h2>

            <button
              class="text-xl text-slate-400"
              @click="showModal = false"
            >
              ×
            </button>
          </div>
        </div>

        <div class="space-y-4 p-6">

          <input
            v-model="form.name"
            placeholder="Game name"
            class="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-emerald-500"
          />

          <select
            v-model="form.type"
            class="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-emerald-500"
          >
            <option>Football</option>
            <option>Futsal</option>
            <option>Basketball</option>
            <option>Volleyball</option>
            <option>Just Play</option>
          </select>

          <input
            v-model="form.price"
            type="number"
            placeholder="Price"
            class="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-emerald-500"
          />

        </div>

        <div class="flex justify-end gap-3 border-t border-slate-100 p-6">
          <button
            class="rounded-xl px-4 py-2 text-sm font-bold text-slate-500"
            @click="showModal = false"
          >
            Cancel
          </button>

          <button
            class="rounded-xl bg-emerald-600 px-5 py-2 text-sm font-bold text-white hover:bg-emerald-700"
            @click="createGame"
          >
            Create
          </button>
        </div>

      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

definePageMeta({
  layout: 'partner',
})

const showModal = ref(false)

const summary = [
  { title: 'Active Games', value: '8', note: '+2 this month' },
  { title: 'Players Today', value: '46', note: 'Across all games' },
  { title: 'Game Sessions', value: '124', note: 'This month' },
  { title: 'Revenue', value: 'ETB 38,200', note: '+11.2%' },
]

const games = ref([
  {
    id: 1,
    name: 'Futsal Just Play',
    type: 'Futsal',
    players: '10 / 14',
    price: '200',
    icon: '⚽',
    active: true,
  },
  {
    id: 2,
    name: 'Weekend Football',
    type: 'Football',
    players: '18 / 22',
    price: '250',
    icon: '🏟️',
    active: true,
  },
  {
    id: 3,
    name: 'Basketball Open Play',
    type: 'Basketball',
    players: '8 / 10',
    price: '150',
    icon: '🏀',
    active: true,
  },
  {
    id: 4,
    name: 'Volleyball Game',
    type: 'Volleyball',
    players: '10 / 12',
    price: '150',
    icon: '🏐',
    active: false,
  },
])

const form = ref({
  name: '',
  type: 'Football',
  price: '',
})

function createGame() {
  if (!form.value.name) return

  games.value.unshift({
    id: Date.now(),
    name: form.value.name,
    type: form.value.type,
    players: '0 / 14',
    price: form.value.price || '0',
    icon: '⚽',
    active: true,
  })

  form.value = {
    name: '',
    type: 'Football',
    price: '',
  }

  showModal.value = false
}
</script>
```
