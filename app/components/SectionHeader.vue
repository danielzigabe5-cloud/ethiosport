<template>
  <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
    <div>
      <h2 class="text-3xl font-bold text-gray-800 dark:text-white">{{ title }}</h2>
      <p v-if="subtitle" class="text-gray-600 dark:text-gray-400 mt-1">{{ subtitle }}</p>
    </div>
    <NuxtLink 
      v-if="link" 
      :to="link" 
      class="mt-2 md:mt-0 text-green-600 hover:text-green-700 font-semibold flex items-center gap-1 group"
    >
      {{ linkText || 'ሁሉንም ይመልከቱ' }}
      <Icon name="lucide:arrow-right" class="w-4 h-4 group-hover:translate-x-1 transition" />
    </NuxtLink>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  subtitle: {
    type: String,
    default: ''
  },
  link: {
    type: String,
    default: ''
  },
  linkText: {
    type: String,
    default: 'ሁሉንም ይመልከቱ'
  }
})
</script>