<script setup lang="ts">
definePageMeta({ lLayout: 'admin' })

const games = ref([
  { id: 1, title: 'ቅዱስ ጊዮርጊስ vs ቡና', date: '2026-08-10', status: 'Upcoming' },
  { id: 2, title: 'ባህርዳር ከተማ vs ፋሲል ከነማ', date: '2026-08-12', status: 'Upcoming' },
])
</script>

<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <h1 class="text-xl font-bold text-slate-800">ጨዋታዎች (Games / Matches)</h1>
      <button class="bg-emerald-600 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-emerald-500 transition">
        + አዲስ ጨዋታ መዝግብ
      </button>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div v-for="game in games" :key="game.id" class="bg-white p-5 rounded-2xl border border-slate-100 flex justify-between items-center shadow-sm">
        <div>
          <h3 class="font-bold text-slate-800">{{ game.title }}</h3>
          <p class="text-xs text-slate-400 mt-1">📅 {{ game.date }}</p>
        </div>
        <span class="bg-blue-50 text-blue-600 text-xs px-3 py-1 rounded-full font-bold">{{ game.status }}</span>
      </div>
    </div>
  </div>
</template>