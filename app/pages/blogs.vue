<script setup>
import { ref, computed } from 'vue'

// SEO Page Title
useHead({ title: 'Blogs - EthioSport' })

// Navigation Links
const navLinks = [
 
]

const searchQuery = ref('')
const selectedCategory = ref('All')

// Sample Blogs Data
const blogs = ref([
  {
    id: 1,
    title: 'የፉትሳል ጨዋታ ህጎች እና ታክቲክ ጠቃሚ ምክሮች',
    category: 'Football',
    author: 'አበበ በቀለ',
    date: 'ሐምሌ 20, 2026',
    readTime: '5 min read',
    excerpt: 'በፉትሳል ጨዋታ ላይ የተሻለ አፈፃፀም ለማሳየት የሚያስችሉ ዋና ዋና ታክቲኮች እና የቡድን አሰራሮች...',
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 2,
    title: 'ለቴኒስ ተጫዋቾች አስፈላጊ የአካል ብቃት እንቅስቃሴዎች',
    category: 'Tennis',
    author: 'ዮናስ ታደሰ',
    date: 'ሐምሌ 15, 2026',
    readTime: '4 min read',
    excerpt: 'የቴኒስ ስፖርት ከፍተኛ የሰውነት ቅልጥፍናን የሚጠይቅ በመሆኑ እነዚህን ልምምዶች ማድረጋችሁ አቅማችሁን ይጨምረዋል...',
    image: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?q=80&w=600&auto=format&fit=crop'
  }
])

const filteredBlogs = computed(() => {
  return blogs.value.filter(blog => {
    const matchesCategory = selectedCategory.value === 'All' || blog.category === selectedCategory.value
    const matchesSearch = blog.title.toLowerCase().includes(searchQuery.value.toLowerCase())
    return matchesCategory && matchesSearch
  })
})
</script>

<template>
  <div class="min-h-screen bg-slate-50 dark:bg-[#070b10] text-slate-800 dark:text-slate-100 font-sans pb-16">
    
    <!-- HEADER NAVBAR -->
    <header class="sticky top-0 z-40 bg-white/95 dark:bg-[#0b111a]/95 backdrop-blur-md border-b border-slate-200 dark:border-[#212e3e]">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <NuxtLink to="/" class="flex items-center gap-2">
          <div class="w-9 h-9 bg-emerald-500 rounded-xl flex items-center justify-center text-slate-950 font-black text-xl shadow-md">
            E
          </div>
          <span class="font-extrabold text-xl text-slate-900 dark:text-white tracking-tight">
            ETHIO-<span class="text-emerald-500">sports</span>
          </span>
        </NuxtLink>

        <nav class="hidden md:flex items-center gap-6">
          <NuxtLink 
            v-for="link in navLinks" 
            :key="link.path" 
            :to="link.path"
            class="text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-emerald-500 dark:hover:text-emerald-400 transition"
            active-class="text-emerald-500 dark:text-emerald-400 font-bold border-b-2 border-emerald-500 pb-1"
          >
            {{ link.name }}
          </NuxtLink>
        </nav>

        <div class="flex items-center gap-3">
          <NuxtLink to="/login" class="px-4 py-2 text-xs sm:text-sm font-bold text-slate-950 bg-emerald-500 hover:bg-emerald-400 rounded-xl shadow-md transition">
            ግቡ
          </NuxtLink>
        </div>
      </div>
    </header>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
      
      <!-- Page Title -->
      <div class="bg-white dark:bg-[#131c27] p-6 rounded-2xl border border-slate-200 dark:border-[#212e3e] flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 class="text-2xl font-black text-slate-900 dark:text-white">የስፖርት ብሎጎች እና ጽሁፎች</h1>
          <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">ስፖርታዊ መረጃዎች፣ የጤና እና የቴክኒክ ጠቃሚ ጽሁፎች</p>
        </div>

        <div class="w-full md:w-64">
          <input 
            v-model="searchQuery" 
            type="text" 
            placeholder="ጽሁፍ ፈልግ..." 
            class="w-full px-4 py-2 rounded-xl bg-slate-50 dark:bg-[#0b111a] border border-slate-200 dark:border-[#212e3e] text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
      </div>

      <!-- Blogs Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div 
          v-for="blog in filteredBlogs" 
          :key="blog.id" 
          class="bg-white dark:bg-[#131c27] rounded-2xl overflow-hidden border border-slate-200 dark:border-[#212e3e] hover:shadow-lg transition flex flex-col justify-between"
        >
          <div>
            <img :src="blog.image" :alt="blog.title" class="w-full h-48 object-cover" />
            <div class="p-6 space-y-3">
              <div class="flex justify-between items-center text-[11px] font-bold text-slate-400">
                <span class="text-emerald-500 bg-emerald-500/10 px-2.5 py-0.5 rounded-md">{{ blog.category }}</span>
                <span>{{ blog.readTime }}</span>
              </div>
              <h3 class="font-black text-lg text-slate-900 dark:text-white leading-snug">{{ blog.title }}</h3>
              <p class="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{{ blog.excerpt }}</p>
            </div>
          </div>

          <div class="px-6 pb-6 pt-2 flex justify-between items-center border-t border-slate-100 dark:border-[#212e3e] text-xs font-semibold text-slate-500">
            <span>✍️ {{ blog.author }}</span>
            <span>📅 {{ blog.date }}</span>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>