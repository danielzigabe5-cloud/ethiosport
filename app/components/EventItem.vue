<template>
  <div class="flex flex-col md:flex-row items-start md:items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition group">
    <div class="flex items-start md:items-center gap-4 mb-3 md:mb-0">
      <div class="bg-green-100 dark:bg-green-900 p-3 rounded-lg group-hover:scale-105 transition">
        <Icon name="lucide:calendar" class="w-6 h-6 text-green-600" />
      </div>
      <div>
        <h3 class="font-semibold text-gray-800 dark:text-white">{{ event.title }}</h3>
        <div class="flex flex-wrap gap-3 text-sm text-gray-600 dark:text-gray-400 mt-1">
          <span class="flex items-center gap-1">
            <Icon name="lucide:map-pin" class="w-3 h-3" />
            {{ event.venue }}
          </span>
          <span class="flex items-center gap-1">
            <Icon name="lucide:clock" class="w-3 h-3" />
            {{ formatDate(event.date) }} - {{ event.time }}
          </span>
          <span class="flex items-center gap-1">
            <Icon name="lucide:tag" class="w-3 h-3" />
            {{ event.category }}
          </span>
        </div>
      </div>
    </div>
    <div class="flex items-center gap-4 w-full md:w-auto">
      <span class="text-sm text-gray-500 dark:text-gray-400">
        {{ event.tickets }} ቲኬቶች
      </span>
      <span class="text-sm font-semibold text-green-600">
        {{ event.price }}
      </span>
      <button class="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition text-sm font-semibold whitespace-nowrap flex items-center gap-1">
        <Icon name="lucide:ticket" class="w-4 h-4" />
        ቲኬት ያስይዙ
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  event: {
    type: Object,
    required: true
  }
})

const formatDate = (date) => {
  const d = new Date(date)
  return d.toLocaleDateString('en-ET', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })
}
</script>