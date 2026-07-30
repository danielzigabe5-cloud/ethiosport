<script setup lang="ts">
definePageMeta({ Layout: 'admin' })

const blogs = ref([
  { id: 1, title: 'የኢትዮጵያ ብሔራዊ ቡድን አዲስ አሰልጣኝ ሾመ', author: 'Admin', date: '2026-07-28' },
  { id: 2, title: 'የፕሪሚየር ሊጉ ሳምንት አስደናቂ ጨዋታዎች', author: 'Admin', date: '2026-07-25' },
])
</script>

<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <h1 class="text-xl font-bold text-slate-800">የስፖርት ዜናዎችና ብሎጎች</h1>
      <button class="bg-emerald-600 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-emerald-500 transition">
        + አዲስ ብሎግ ጻፍ
      </button>
    </div>

    <div class="bg-white rounded-2xl border border-slate-100 p-6 space-y-4 shadow-sm">
      <div v-for="blog in blogs" :key="blog.id" class="flex justify-between items-center border-b border-slate-50 pb-4 last:border-0">
        <div>
          <h3 class="font-bold text-slate-800 hover:text-emerald-600 cursor-pointer">{{ blog.title }}</h3>
          <p class="text-xs text-slate-400 mt-1">በ {{ blog.author }} | {{ blog.date }}</p>
        </div>
        <div class="flex gap-2">
          <button class="text-xs font-bold text-blue-600">አስተካክል</button>
          <button class="text-xs font-bold text-rose-600">ሰርዝ</button>
        </div>
      </div>
    </div>
  </div>
</template>