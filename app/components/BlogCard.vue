<template>
  <NuxtLink :to="`/blogs/${blog.id}`" class="group">
    <div class="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
      <div class="relative h-48 bg-gray-300 dark:bg-gray-700">
        <div class="w-full h-full flex items-center justify-center text-gray-500 dark:text-gray-400">
          <Icon name="lucide:image" class="w-12 h-12" />
        </div>
        <div class="absolute top-4 left-4 bg-green-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
          {{ blog.category }}
        </div>
      </div>
      <div class="p-4">
        <h3 class="text-xl font-semibold text-gray-800 dark:text-white group-hover:text-green-600 transition line-clamp-2">
          {{ blog.title }}
        </h3>
        <p class="text-gray-600 dark:text-gray-400 mt-2 text-sm line-clamp-2">
          {{ blog.excerpt }}
        </p>
        <div class="mt-3 pt-3 border-t dark:border-gray-700 flex justify-between items-center text-sm">
          <div class="flex items-center gap-2">
            <div class="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
              <Icon name="lucide:user" class="w-4 h-4 text-green-600" />
            </div>
            <div>
              <p class="text-gray-800 dark:text-white font-medium">{{ blog.author }}</p>
              <p class="text-gray-500 dark:text-gray-400 text-xs">{{ blog.date }}</p>
            </div>
          </div>
          <span class="text-gray-500 dark:text-gray-400 text-xs flex items-center gap-1">
            <Icon name="lucide:clock" class="w-3 h-3" />
            {{ blog.readTime }}
          </span>
        </div>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup>
defineProps({
  blog: {
    type: Object,
    required: true
  }
})
</script>