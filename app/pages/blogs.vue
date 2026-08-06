<script setup>
import { ref, computed } from 'vue'

// SEO Page Title
useHead({ title: 'Blogs & News - EthioSport' })

// Search & Filter state
const searchQuery = ref('')
const selectedCategory = ref('All')

// Categories
const categories = ['All', 'Football', 'Athletics', 'Basketball', 'Fitness']

// Real/Realistic Ethiopian & Global Sports News & Blogs Data
const blogs = ref([
  {
    id: 1,
    title: 'የኢትዮጵያ ፕሪሚየር ሊግ 2026/27፡ አዳዲስ የዝውውር ዜናዎች እና የቡድኖች ዝግጅት',
    category: 'Football',
    author: 'መንሱር አብዱልቀኒ',
    date: 'ነሐሴ 02, 2026',
    readTime: '6 min read',
    excerpt: 'የዘመኑ የኢትዮጵያ ፕሪሚየር ሊግ ከመጀመሩ በፊት ክለቦች ያደረጓቸው ዋና ዋና የክበብ ዝውውሮች፣ የአሰልጣኞች ቅያሬ እና የታክቲክ ዝግጅቶች...',
    image: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 2,
    title: 'የቶኪዮ ወርልድ አትሌቲክስ ቻምፒዮንሽፕ 2025፡ የኢትዮጵያ አትሌቶች የወርቅ ተስፋዎች',
    category: 'Athletics',
    author: 'አበበ ግርማ',
    date: 'ሐምሌ 28, 2026',
    readTime: '5 min read',
    excerpt: 'በ 5000m፣ 10000m እና በማራቶን ርቀቶች የኢትዮጵያ አትሌቶች ያደረጉት ጥብቅ ልምምድ እና በጃፓን የሚጠበቁ ከፍተኛ ውጤቶች ሙሉ ትንተና...',
    image: 'https://images.unsplash.com/photo-1530541930197-ff16ac917b0e?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 3,
    title: 'የእግር ኳስ ተጫዋቾች የጉዳት መከላከያ እና የሰውነት ማገገሚያ (Recovery) መንገዶች',
    category: 'Fitness',
    author: 'ዶ/ር ተስፋዬ በቀለ',
    date: 'ሐምሌ 18, 2026',
    readTime: '4 min read',
    excerpt: 'በየሳምንቱ አጣዳፊ ጨዋታዎችን ለሚያደርጉ የፉትሳል እና የሜዳ እግር ኳስ ተጫዋቾች ከጉዳት ለመጠበቅ የሚያስችሉ የፊዚዮቴራፒ ምክሮች...',
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 4,
    title: 'የአፍሪካ የቅርጫት ኳስ ሊግ (BAL)፡ የኢትዮጵያ ክለቦች ዕድል እና ተፎካካሪነት',
    category: 'Basketball',
    author: 'ዮናስ ታደሰ',
    date: 'ሰኔ 30, 2026',
    readTime: '4 min read',
    excerpt: 'በቀጣዩ BAL ውድድር ላይ የሚሳተፉ የአገር ውስጥ የቅርጫት ኳስ ቡድኖች የቴክኒክ ዝግጅት እና ከሌሎች የአፍሪካ ሃገራት ጋር ያላቸው ንፅፅር...',
    image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 5,
    title: 'በአዲስ አበባ እና በዙሪያዋ የሚገኙ የፉትሳል ሜዳዎች ዕድገት እና የስፖርት ማህበረሰቡ ጥቅም',
    category: 'Football',
    author: 'ኤልያስ ወንድሙ',
    date: 'ሰኔ 12, 2026',
    readTime: '3 min read',
    excerpt: 'የፉትሳል ሜዳዎች መስፋፋት በወጣቶች አካላዊ ብቃት፣ በሳምንቱ መጨረሻ መዝናኛ እና በኮርፖሬት ጨዋታዎች ላይ ያመጣው ትልቅ ለውጥ...',
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=800&auto=format&fit=crop'
  }
])

// Filter Logic
const filteredBlogs = computed(() => {
  return blogs.value.filter(blog => {
    const matchesCategory = selectedCategory.value === 'All' || blog.category === selectedCategory.value
    const matchesSearch = blog.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                          blog.excerpt.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                          blog.author.toLowerCase().includes(searchQuery.value.toLowerCase())
    return matchesCategory && matchesSearch
  })
})
</script>

<template>
  <div class="min-h-screen bg-slate-50 dark:bg-[#070b10] text-slate-800 dark:text-slate-100 font-sans pb-16">
    
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
      
      <!-- Page Header & Search -->
      <div class="bg-white dark:bg-[#131c27] p-6 rounded-3xl border border-slate-200 dark:border-[#212e3e] flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-sm">
        <div>
          <h1 class="text-2xl md:text-3xl font-black text-slate-900 dark:text-white">የስፖርት ዜናዎች እና ብሎጎች</h1>
          <p class="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-1">ትኩስ ስፖርታዊ መረጃዎች፣ የትንተና ጽሁፎች እና የጤና ጠቃሚ ምክሮች</p>
        </div>

        <!-- Search Input -->
        <div class="w-full md:w-72">
          <input 
            v-model="searchQuery" 
            type="text" 
            placeholder="ጽሁፍ ወይም ፀሃፊ ፈልግ..." 
            class="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#0b111a] border border-slate-200 dark:border-[#212e3e] text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
      </div>

      <!-- Categories Filter Tabs -->
      <div class="flex items-center gap-2 overflow-x-auto pb-1">
        <span class="text-xs font-bold text-slate-400 mr-2 flex-shrink-0">ምድብ:</span>
        <button 
          v-for="cat in categories" 
          :key="cat"
          @click="selectedCategory = cat"
          :class="[
            'px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer',
            selectedCategory === cat 
              ? 'bg-emerald-500 text-slate-950 shadow-md' 
              : 'bg-white dark:bg-[#131c27] border border-slate-200 dark:border-[#212e3e] text-slate-600 dark:text-slate-300 hover:text-emerald-500'
          ]"
        >
          {{ cat === 'All' ? 'ሁሉም (All)' : cat }}
        </button>
      </div>

      <!-- Empty State -->
      <div v-if="filteredBlogs.length === 0" class="text-center py-16 bg-white dark:bg-[#131c27] rounded-3xl border border-slate-200 dark:border-[#212e3e]">
        <span class="text-4xl">📰</span>
        <p class="text-xs text-slate-500 mt-2 font-semibold">የፈለጉት ጽሁፍ አልተገኘም። እባክዎ ሌላ ቃል ይሞክሩ።</p>
      </div>

      <!-- Blogs Grid -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div 
          v-for="blog in filteredBlogs" 
          :key="blog.id" 
          class="bg-white dark:bg-[#131c27] rounded-3xl overflow-hidden border border-slate-200 dark:border-[#212e3e] hover:shadow-xl transition duration-300 flex flex-col justify-between group"
        >
          <div>
            <div class="relative overflow-hidden h-48">
              <img 
                :src="blog.image" 
                :alt="blog.title" 
                class="w-full h-full object-cover group-hover:scale-105 transition duration-500" 
              />
              <span class="absolute top-3 left-3 bg-emerald-500 text-slate-950 font-extrabold text-[10px] uppercase px-3 py-1 rounded-lg shadow-md">
                {{ blog.category }}
              </span>
            </div>

            <div class="p-6 space-y-3">
              <div class="flex justify-between items-center text-[11px] font-bold text-slate-400">
                <span>📅 {{ blog.date }}</span>
                <span>⏱️ {{ blog.readTime }}</span>
              </div>
              
              <h3 class="font-black text-base md:text-lg text-slate-900 dark:text-white leading-snug group-hover:text-emerald-500 transition">
                {{ blog.title }}
              </h3>
              
              <p class="text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-3">
                {{ blog.excerpt }}
              </p>
            </div>
          </div>

          <div class="px-6 pb-6 pt-3 flex justify-between items-center border-t border-slate-100 dark:border-[#212e3e]/60 text-xs font-bold text-slate-500">
            <span class="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
              ✍️ {{ blog.author }}
            </span>
            <span class="text-emerald-500 hover:underline cursor-pointer">
              ያነቡ &rarr;
            </span>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>