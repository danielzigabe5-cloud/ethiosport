<template>
  <NuxtLink :to="`/venues/${venue.id}`" class="group">
    <div class="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
      <div class="relative h-48 bg-gray-300 dark:bg-gray-700">
        <div class="w-full h-full flex items-center justify-center text-gray-500 dark:text-gray-400">
          <Icon name="lucide:stadium" class="w-12 h-12" />
        </div>
        <div class="absolute top-4 right-4 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
          ★ {{ venue.rating }}
        </div>
        <div class="absolute bottom-4 left-4 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
          {{ venue.sport }}
        </div>
      </div>
      <div class="p-4">
        <h3 class="text-xl font-semibold text-gray-800 dark:text-white group-hover:text-green-600 transition">
          {{ venue.name }}
        </h3>
        <div class="flex items-center gap-2 text-gray-600 dark:text-gray-400 mt-1">
          <Icon name="lucide:map-pin" class="w-4 h-4" />
          <span>{{ venue.location }}</span>
        </div>
        <div class="flex items-center gap-2 text-gray-600 dark:text-gray-400 mt-1">
          <Icon name="lucide:users" class="w-4 h-4" />
          <span>{{ venue.capacity }} ተመልካቾች</span>
        </div>
        <div class="mt-3 pt-3 border-t dark:border-gray-700 flex flex-wrap gap-2">
          <span v-for="amenity in venue.amenities" :key="amenity" 
                class="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded">
            {{ amenity }}
          </span>
        </div>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup>
defineProps({
  venue: {
    type: Object,
    required: true
  }
})
</script>