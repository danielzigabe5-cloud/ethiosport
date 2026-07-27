<template>
  <div class="min-h-screen bg-slate-950 py-12 px-6">
    <div class="max-w-6xl mx-auto space-y-8">
      <div>
        <h1 class="text-3xl font-bold text-white mb-2">📰 የስፖርት ዜናዎች እና ብሎጎች</h1>
        <p class="text-slate-400">ወቅታዊ የስፖርት ትንታኔዎች እና የሀገር ውስጥ ዜናዎች</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <article v-for="post in posts" :key="post.id" class="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 hover:border-slate-700 transition flex flex-col justify-between">
          <div class="space-y-3">
            <span class="text-xs text-emerald-400 font-semibold uppercase">{{ post.category }}</span>
            <h3 class="text-lg font-bold text-white hover:text-emerald-400 transition cursor-pointer">{{ post.title }}</h3>
            <p class="text-slate-400 text-sm leading-relaxed">{{ post.excerpt }}</p>
          </div>
          <div class="pt-4 border-t border-slate-800 flex justify-between items-center text-xs text-slate-500">
            <span>{{ post.author }}</span>
            <span>{{ post.date }}</span>
          </div>
        </article>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const posts = ref([
  { id: 1, title: 'የኢትዮጵያ ፕሪሚየር ሊግ የዚህ ሳምንት ታላላቅ ጨዋታዎች ትንታኔ', category: 'እግር ኳስ', author: 'EthioSport Team', date: 'ትናንት', excerpt: 'የሳምንቱ ተጠባቂ ጨዋታዎች ውጤት እና የቡድኖቹ አሰላለፍ ምልከታ።' },
  { id: 2, title: 'ለጤናማ ህይወት በቀን 30 ደቂቃ መስራት ያለብን እንቅስቃሴዎች', category: 'ጤና እና ስፖርት', author: 'ዶ/ር አበበ', date: 'ከ3 ቀን በፊት', excerpt: 'ቀለል ያሉ የአካል ብቃት እንቅስቃሴዎች እና የጤና ጥቅሞቻቸው።' },
  { id: 3, title: 'የኢትዮጵያ አትሌቲክስ ፌዴሬሽን አዲስ ያወጣው የውድድር መርሃ ግብር', category: 'አትሌቲክስ', author: 'ሰለሞን መኮንን', date: 'ከሳምንት በፊት', excerpt: 'በመጪው ወር የሚካሄዱ የሀገር ውስጥ የሩጫ ውድድሮች ዝርዝር።' }
])
</script>