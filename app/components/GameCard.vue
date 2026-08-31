<template>
  <NuxtLink :to="`/games/${game.id}`" class="group">
    <div class="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
      <div class="p-4">
        <!-- League Badge -->
        <div class="flex justify-between items-start mb-3">
          <span class="text-xs font-semibold text-green-600 bg-green-100 dark:bg-green-900 px-2 py-1 rounded">
            {{ game.league }}
          </span>
          <span 
            class="px-2 py-1 rounded text-xs font-semibold"
            :class="{
              'bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-400': game.status === 'live',
              'bg-yellow-100 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-400': game.status === 'upcoming',
              'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400': game.status === 'finished'
            }"
          >
            {{ game.status === 'live' ? 'በሂደት ላይ' : game.status === 'upcoming' ? 'በቅርቡ' : 'ጨርሷል' }}
          </span>
        </div>

        <!-- Teams -->
        <div class="space-y-2">
          <div class="flex items-center justify-between">
            <span class="text-gray-800 dark:text-white font-semibold">{{ game.homeTeam }}</span>
            <span v-if="game.homeScore !== null" class="text-xl font-bold text-green-600">{{ game.homeScore }}</span>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-gray-800 dark:text-white font-semibold">{{ game.awayTeam }}</span>
            <span v-if="game.awayScore !== null" class="text-xl font-bold text-green-600">{{ game.awayScore }}</span>
          </div>
        </div>

        <!-- Venue & Time -->
        <div class="mt-3 pt-3 border-t dark:border-gray-700 space-y-1">
          <div class="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <Icon name="lucide:map-pin" class="w-4 h-4" />
            <span>{{ game.venue }}</span>
          </div>
          <div class="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <Icon name="lucide:clock" class="w-4 h-4" />
            <span>{{ game.time }}</span>
          </div>
        </div>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup>
defineProps({
  game: {
    type: Object,
    required: true
  }
})
</script>