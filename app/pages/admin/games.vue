<script setup lang="ts">
import { Plus, Trophy } from 'lucide-vue-next'

definePageMeta({
  layout: 'admin'
})

const games = [
  {
    home: 'Addis United',
    away: 'Bole FC',
    sport: 'Football',
    venue: 'Bole Arena',
    date: 'Sep 30, 2026',
    score: '-'
  },
  {
    home: 'Yeka Hoopers',
    away: 'Kirkos Lions',
    sport: 'Basketball',
    venue: 'Yeka Court',
    date: 'Oct 02, 2026',
    score: '-'
  },
  {
    home: 'Sarbet Futsal',
    away: 'Mexico Stars',
    sport: 'Futsal',
    venue: 'Sarbet Arena',
    date: 'Oct 05, 2026',
    score: '-'
  }
]
</script>

<template>
  <div class="space-y-6">

    <div class="flex flex-col justify-between gap-4 md:flex-row md:items-center">
      <div>
        <h1 class="text-3xl font-black">Games</h1>
        <p class="text-slate-500">
          Manage scheduled games and match results.
        </p>
      </div>

      <button class="flex items-center gap-2 rounded-xl bg-slate-950 px-5 py-3 font-bold text-white">
        <Plus :size="19" />
        Add Game
      </button>
    </div>

    <div class="space-y-4">

      <div
        v-for="game in games"
        :key="game.home"
        class="rounded-2xl bg-white p-6 shadow-sm"
      >

        <div class="flex flex-col items-center justify-between gap-5 md:flex-row">

          <div class="text-center md:w-1/3">
            <div class="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-2xl">
              ⚽
            </div>
            <h2 class="mt-2 font-black">{{ game.home }}</h2>
          </div>

          <div class="text-center">
            <p class="text-xs uppercase text-slate-400">
              {{ game.sport }}
            </p>

            <div class="my-2 text-2xl font-black">
              {{ game.score }}
            </div>

            <p class="text-sm text-slate-500">
              {{ game.date }}
            </p>
          </div>

          <div class="text-center md:w-1/3">
            <div class="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-2xl">
              🏆
            </div>
            <h2 class="mt-2 font-black">{{ game.away }}</h2>
          </div>

        </div>

        <div class="mt-5 flex items-center justify-between border-t pt-4 text-sm text-slate-500">
          <span>{{ game.venue }}</span>

          <button class="flex items-center gap-2 font-bold text-slate-900">
            <Trophy :size="17" />
            Manage
          </button>
        </div>

      </div>

    </div>
  </div>
</template>