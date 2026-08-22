<template>
  <div class="p-10">
    <NuxtLink to="/" class="text-green-600 font-bold mb-4 block">← Back to Home</NuxtLink>
    <h1 class="text-3xl font-bold">Venue Details</h1>
    <p class="mt-4 text-gray-600">Showing details for Venue ID: {{ route.params.id }}</p>
    
    <!-- You can now use the ID to fetch data from an API or filter your list -->
  </div>
</template>

<script setup>
const route = useRoute()
</script>