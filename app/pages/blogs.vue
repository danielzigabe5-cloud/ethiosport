<script setup lang="ts">
import { ref, computed } from 'vue'

// SEO Meta Configuration
useHead({ 
  title: 'Insights & News - Combolojo',
  meta: [
    { name: 'description', content: 'Explore sports insights and learn how to book matches with the Combolojo app.' },
    { property: 'og:title', content: 'Insights & News - Combolojo' },
    { property: 'og:description', content: 'Explore sports insights and learn how to book matches with the Combolojo app.' },
    { property: 'og:type', content: 'website' }
  ]
})

interface Blog {
  id: number
  title: string
  category: string
  author: string
  authorRole: string
  date: string
  readTime: string
  excerpt: string
  image: string
}

// Reactive States
const searchQuery = ref('')
const selectedCategory = ref('All')

// Categories
const categories = ['All', 'Football', 'Athletics', 'Basketball', 'Fitness']

// Blog Posts Data
const blogs = ref<Blog[]>([
  {
    id: 1,
    title: 'Ethiopian Premier League 2026/27: Major Transfer News & Team Previews',
    category: 'Football',
    author: 'Mensur Abdulkeni',
    authorRole: 'Senior Analyst',
    date: 'Sep 02, 2026',
    readTime: '6 min read',
    excerpt: 'An in-depth look at the major club signings and tactical changes ahead of the new season...',
    image: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 2,
    title: 'Tokyo Athletics 2025: Ethiopias Gold Medal Prospects and Training',
    category: 'Athletics',
    author: 'Abebe Germa',
    authorRole: 'Sports Correspondent',
    date: 'Aug 28, 2026',
    readTime: '5 min read',
    excerpt: 'Detailed coverage of the training regimens for 5000m and Marathon runners expected to dominate...',
    image: 'https://images.unsplash.com/photo-1530541930197-ff16ac917b0e?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 3,
    title: 'Modern Recovery Techniques for Local Amateur Futsal Players',
    category: 'Fitness',
    author: 'Dr. Tesfaye Bekele',
    authorRole: 'Sports Physician',
    date: 'Aug 18, 2026',
    readTime: '4 min read',
    excerpt: 'Essential physiotherapy tips and recovery methods to avoid common injuries during weekly matches...',
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop'
  }
])

// Booking Steps Data
const bookingSteps = [
  { id: 1, title: 'DOWNLOAD APP', desc: 'Get the Combolojo app on App Store or Google Play.', icon: '📱' },
  { id: 2, title: 'FIND VENUE', desc: 'Browse available fields near you by sport or location.', icon: '📍' },
  { id: 3, title: 'PICK A SLOT', desc: 'Choose your preferred date and time from the live calendar.', icon: '⏰' },
  { id: 4, title: 'CONFIRM & PLAY', desc: 'Pay securely via Telebirr or CBE Birr and get your QR code.', icon: '⚽' }
]

// Filtered Blogs Computed Property
const filteredBlogs = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()
  return blogs.value.filter(blog => {
    const matchesCategory = selectedCategory.value === 'All' || blog.category === selectedCategory.value
    const matchesSearch = !query || 
      blog.title.toLowerCase().includes(query) || 
      blog.excerpt.toLowerCase().includes(query)
    
    return matchesCategory && matchesSearch
  })
})

const clearFilters = () => {
  searchQuery.value = ''
  selectedCategory.value = 'All'
}
</script>

<template>
  <div class="min-h-screen bg-slate-50 text-slate-800 font-sans pb-20 pt-20 md:pt-28 selection:bg-emerald-500 selection:text-white">

    <!-- HERO HEADER -->
    <header class="relative py-16 md:py-20 bg-white border-b border-slate-200/80 shadow-sm overflow-hidden">
      <!-- Gradient Glow Behind Header -->
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[200px] bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 relative z-10">
        <h1 class="text-4xl md:text-6xl font-black tracking-tight text-slate-900">
          Combolojo <span class="text-gradient">Insights</span>
        </h1>
        <p class="text-slate-600 font-medium max-w-xl mx-auto text-sm md:text-base">
          Latest news, expert tips, and platform updates for the Ethiopian sports community.
        </p>
      </div>
    </header>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20">
      
      <!-- HOW TO BOOK SECTION -->
      <section 
        aria-labelledby="booking-heading"
        class="bg-gradient-to-br from-emerald-600 to-teal-700 rounded-[2.5rem] p-8 md:p-14 mb-16 shadow-xl shadow-emerald-900/10 text-white relative overflow-hidden"
      >
        <!-- Soft Glow Effect -->
        <div class="absolute -right-20 -top-20 w-80 h-80 bg-white/10 rounded-full blur-[100px] pointer-events-none"></div>
        
        <div class="relative z-10 space-y-10">
          <!-- Text Heading -->
          <div class="space-y-3">
            <h2 id="booking-heading" class="text-3xl md:text-5xl font-black text-white leading-tight">
              Book Your Match in <span class="text-emerald-200">Minutes</span>
            </h2>
            <p class="text-emerald-100 max-w-2xl text-sm md:text-base leading-relaxed font-medium">
              Experience the future of sports booking. Download the Combolojo mobile app and secure your favorite venue instantly.
            </p>
          </div>
          
          <!-- Steps Grid -->
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div 
              v-for="step in bookingSteps" 
              :key="step.id" 
              class="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-[2rem] hover:bg-white/20 transition-all duration-300 group/card"
            >
              <div class="text-3xl mb-4 transform group-hover/card:scale-110 transition-transform" aria-hidden="true">
                {{ step.icon }}
              </div>
              <h3 class="text-white font-black text-xs uppercase tracking-wider mb-2">
                {{ step.title }}
              </h3>
              <p class="text-emerald-100/90 text-xs leading-relaxed font-medium">
                {{ step.desc }}
              </p>
            </div>
          </div>

          <!-- App Download CTA Buttons -->
          <div class="flex flex-wrap gap-4 pt-2">
            <a 
              href="#" 
              aria-label="Download on App Store"
              class="bg-white text-slate-900 px-8 py-4 rounded-2xl font-black text-xs hover:bg-slate-100 transition-all active:scale-95 shadow-lg flex items-center gap-2"
            >
              <span>🍎</span> APP STORE
            </a>
            <a 
              href="#" 
              aria-label="Get it on Google Play"
              class="bg-slate-900 text-white px-8 py-4 rounded-2xl font-black text-xs hover:bg-slate-800 transition-all active:scale-95 shadow-lg flex items-center gap-2"
            >
              <span>🤖</span> GOOGLE PLAY
            </a>
          </div>
        </div>
      </section>

      <!-- SEARCH & CATEGORY FILTER BAR -->
      <div class="bg-white p-4 md:p-6 rounded-[2.5rem] shadow-xl shadow-slate-200/60 border border-slate-200/60 flex flex-col lg:flex-row justify-between items-center gap-6 mb-12">
        <!-- Category Selector -->
        <div 
          role="tablist" 
          aria-label="Filter blog categories"
          class="flex bg-slate-100/80 p-1.5 rounded-2xl w-full lg:w-auto overflow-x-auto scrollbar-hide border border-slate-200/50"
        >
          <button 
            v-for="cat in categories" 
            :key="cat"
            role="tab"
            :aria-selected="selectedCategory === cat"
            @click="selectedCategory = cat"
            :class="[
              'flex-1 lg:flex-none px-6 py-2.5 rounded-xl text-xs font-black uppercase transition-all whitespace-nowrap',
              selectedCategory === cat ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/20' : 'text-slate-600 hover:text-slate-900'
            ]"
          >
            {{ cat }}
          </button>
        </div>

        <!-- Search Input -->
        <div class="relative w-full lg:w-96">
          <input 
            v-model="searchQuery" 
            type="search" 
            aria-label="Search articles"
            placeholder="Search stories..." 
            class="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-sm focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none font-medium text-slate-900 placeholder-slate-400 transition-all"
          />
          <span class="absolute left-5 top-1/2 -translate-y-1/2 opacity-40 text-lg pointer-events-none" aria-hidden="true">🔍</span>
        </div>
      </div>

      <!-- BLOG GRID -->
      <div v-if="filteredBlogs.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <article 
          v-for="blog in filteredBlogs" 
          :key="blog.id" 
          class="group bg-white rounded-[2.5rem] overflow-hidden border border-slate-200/80 shadow-md hover:shadow-xl hover:border-emerald-500/30 transition-all duration-300 flex flex-col h-full"
        >
          <!-- Image Banner -->
          <div class="relative h-60 overflow-hidden bg-slate-100">
            <img 
              :src="blog.image" 
              :alt="blog.title" 
              loading="lazy"
              decoding="async"
              class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
            />
            <div class="absolute inset-0 bg-gradient-to-t from-slate-900/30 to-transparent"></div>
            <span class="absolute top-5 left-5 px-4 py-1.5 bg-white/90 backdrop-blur-md text-emerald-700 text-[10px] font-black uppercase tracking-widest rounded-xl shadow-sm">
              {{ blog.category }}
            </span>
          </div>

          <!-- Content Body -->
          <div class="p-7 flex-1 flex flex-col justify-between space-y-6">
            <div class="space-y-3">
              <div class="flex items-center gap-3 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                <span>📅 {{ blog.date }}</span>
                <span class="w-1 h-1 bg-slate-300 rounded-full" aria-hidden="true"></span>
                <span>⏱️ {{ blog.readTime }}</span>
              </div>
              
              <NuxtLink :to="`/blog/${blog.id}`">
                <h3 class="text-xl font-black text-slate-900 leading-snug group-hover:text-emerald-600 transition-colors">
                  {{ blog.title }}
                </h3>
              </NuxtLink>

              <p class="text-slate-500 text-xs leading-relaxed font-medium line-clamp-3">
                {{ blog.excerpt }}
              </p>
            </div>

            <!-- Footer & Link -->
            <div class="pt-5 border-t border-slate-100 flex items-center justify-between">
              <div class="flex items-center gap-3">
                <div class="w-9 h-9 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 font-black text-xs border border-emerald-100">
                  {{ blog.author.charAt(0) }}
                </div>
                <div>
                  <p class="text-xs font-black text-slate-800">{{ blog.author }}</p>
                  <p class="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{{ blog.authorRole }}</p>
                </div>
              </div>

              <NuxtLink 
                :to="`/blog/${blog.id}`" 
                :aria-label="`Read story: ${blog.title}`"
                class="w-9 h-9 rounded-full bg-slate-100 group-hover:bg-emerald-500 flex items-center justify-center transition-all text-slate-600 group-hover:text-white"
              >
                <span class="text-lg" aria-hidden="true">→</span>
              </NuxtLink>
            </div>
          </div>
        </article>
      </div>

      <!-- EMPTY STATE -->
      <div v-else class="text-center py-16 bg-white rounded-[2.5rem] border border-slate-200/80 shadow-md space-y-3">
        <div class="text-4xl mb-2">🔍</div>
        <h3 class="text-xl font-black text-slate-900">No matching articles found</h3>
        <p class="text-slate-500 text-xs max-w-md mx-auto">
          We couldn't find anything matching your search criteria. Try adjusting your query or active category.
        </p>
        <button 
          @click="clearFilters" 
          class="mt-3 px-6 py-2.5 bg-emerald-500 text-white font-black text-xs uppercase tracking-wider rounded-xl hover:bg-emerald-600 transition-all shadow-md shadow-emerald-500/20"
        >
          Reset Filters
        </button>
      </div>

    </div>
  </div>
</template>

<style scoped>
.scrollbar-hide::-webkit-scrollbar { display: none; }
.scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }

.text-gradient {
  background: linear-gradient(to right, #059669, #10b981);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

article {
  animation: slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
</style>