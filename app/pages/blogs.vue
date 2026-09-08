<script setup>
import { ref, computed } from 'vue'

// SEO Page Title
useHead({ 
  title: 'Insights & News - Combolojo',
  meta: [
    { name: 'description', content: 'Explore sports insights and learn how to book matches with the Combolojo app.' }
  ]
})

// Search & Filter state
const searchQuery = ref('')
const selectedCategory = ref('All')

// Categories
const categories = ['All', 'Football', 'Athletics', 'Basketball', 'Fitness']

// Realistic Blog Data
const blogs = ref([
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

// Booking Guide Steps (Mirroring the screenshot layout)
const bookingSteps = [
  { id: 1, title: 'DOWNLOAD APP', desc: 'Get the Combolojo app on App Store or Google Play.', icon: '📱' },
  { id: 2, title: 'FIND VENUE', desc: 'Browse available fields near you by sport or location.', icon: '📍' },
  { id: 3, title: 'PICK A SLOT', desc: 'Choose your preferred date and time from the live calendar.', icon: '⏰' },
  { id: 4, title: 'CONFIRM & PLAY', desc: 'Pay securely via Telebirr or CBE Birr and get your QR code.', icon: '⚽' }
]

// Filter Logic
const filteredBlogs = computed(() => {
  return blogs.value.filter(blog => {
    const matchesCategory = selectedCategory.value === 'All' || blog.category === selectedCategory.value
    const matchesSearch = blog.title.toLowerCase().includes(searchQuery.value.toLowerCase())
    return matchesCategory && matchesSearch
  })
})
</script>

<template>
  <!-- pt-32 ensures navbar doesn't cover content -->
  <div class="min-h-screen bg-slate-50 text-slate-900 font-sans pb-20 pt-24 md:pt-32">

    <!-- HERO HEADER -->
    <header class="bg-white py-12 md:py-20 border-b border-slate-100">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <h1 class="text-4xl md:text-6xl font-black tracking-tight text-[#0f172a]">
          Combolojo <span class="text-emerald-500 text-gradient">Insights</span>
        </h1>
        <p class="text-slate-500 font-medium max-w-xl mx-auto">Latest news, expert tips, and platform updates for the Ethiopian sports community.</p>
      </div>
    </header>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
      
      <!-- HOW TO BOOK SECTION (Exact Replica of your Screenshot) -->
      <section class="bg-[#0b1120] rounded-[2.5rem] p-8 md:p-14 mb-20 shadow-2xl border border-white/5 relative overflow-hidden">
        <!-- Glow Effect -->
        <div class="absolute -right-20 -top-20 w-80 h-80 bg-emerald-500/10 rounded-full blur-[120px]"></div>
        
        <div class="relative z-10 space-y-12">
          <!-- Text Heading -->
          <div class="space-y-4">
            <h2 class="text-3xl md:text-5xl font-black text-white leading-tight">
              Book Your Match in <span class="text-emerald-400">Minutes</span>
            </h2>
            <p class="text-slate-400 max-w-2xl text-sm md:text-base leading-relaxed">
              Experience the future of sports booking. Download the Combolojo mobile app and secure your favorite venue instantly.
            </p>
          </div>
          
          <!-- Steps Grid (ICON TOP, TITLE MIDDLE, DESC BOTTOM) -->
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div 
              v-for="step in bookingSteps" 
              :key="step.id" 
              class="bg-white/5 border border-white/10 p-8 rounded-[2rem] hover:bg-white/10 transition-all duration-300 group"
            >
              <!-- 1. ICON (TOP) -->
              <div class="text-4xl mb-6 transform group-hover:scale-110 transition-transform">{{ step.icon }}</div>
              
              <!-- 2. TITLE (MIDDLE) -->
              <h4 class="text-white font-black text-sm uppercase tracking-wider mb-3">
                {{ step.title }}
              </h4>
              
              <!-- 3. DESCRIPTION (BOTTOM) -->
              <p class="text-slate-400 text-xs leading-relaxed">
                {{ step.desc }}
              </p>
            </div>
          </div>

          <!-- App Buttons -->
          <div class="flex flex-wrap gap-4 pt-4">
            <button class="bg-white text-slate-950 px-8 py-4 rounded-2xl font-black text-xs hover:bg-emerald-400 transition-all active:scale-95 shadow-xl flex items-center gap-2">
              🍎 APP STORE
            </button>
            <button class="bg-emerald-500 text-slate-950 px-8 py-4 rounded-2xl font-black text-xs hover:bg-emerald-400 transition-all active:scale-95 shadow-xl shadow-emerald-500/20 flex items-center gap-2">
              🤖 GOOGLE PLAY
            </button>
          </div>
        </div>
      </section>

      <!-- BLOG SEARCH & CATEGORY BAR -->
      <div class="bg-white p-6 md:p-8 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col lg:flex-row justify-between items-center gap-6 mb-16">
        <div class="flex bg-slate-100 p-1.5 rounded-2xl w-full lg:w-auto overflow-x-auto scrollbar-hide">
          <button 
            v-for="cat in categories" 
            :key="cat"
            @click="selectedCategory = cat"
            :class="[
              'flex-1 lg:flex-none px-6 py-2.5 rounded-xl text-xs font-black uppercase transition-all whitespace-nowrap',
              selectedCategory === cat ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-500 hover:text-slate-900'
            ]"
          >
            {{ cat }}
          </button>
        </div>

        <div class="relative w-full lg:w-96">
          <input 
            v-model="searchQuery" 
            type="text" 
            placeholder="Search stories..." 
            class="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-sm focus:ring-2 focus:ring-emerald-500 outline-none font-medium"
          />
          <span class="absolute left-5 top-1/2 -translate-y-1/2 opacity-30 text-lg">🔍</span>
        </div>
      </div>

      <!-- BLOG GRID -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        <article 
          v-for="blog in filteredBlogs" 
          :key="blog.id" 
          class="group bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 hover:shadow-2xl transition-all duration-500 flex flex-col h-full"
        >
          <div class="relative h-64 overflow-hidden">
            <img :src="blog.image" :alt="blog.title" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <div class="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent"></div>
            <span class="absolute top-6 left-6 px-4 py-1.5 bg-white/90 backdrop-blur-md text-emerald-600 text-[10px] font-black uppercase tracking-widest rounded-xl shadow-lg">
              {{ blog.category }}
            </span>
          </div>

          <div class="p-8 flex-1 flex flex-col justify-between space-y-6">
            <div class="space-y-4">
              <div class="flex items-center gap-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                <span>📅 {{ blog.date }}</span>
                <span class="w-1 h-1 bg-slate-300 rounded-full"></span>
                <span>⏱️ {{ blog.readTime }}</span>
              </div>
              <h3 class="text-2xl font-black text-slate-900 leading-tight group-hover:text-emerald-600 transition-colors">
                {{ blog.title }}
              </h3>
              <p class="text-slate-500 text-sm leading-relaxed font-medium line-clamp-3">
                {{ blog.excerpt }}
              </p>
            </div>

            <div class="pt-6 border-t border-slate-50 flex items-center justify-between">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-black text-xs border border-emerald-200">
                  {{ blog.author.charAt(0) }}
                </div>
                <div>
                  <p class="text-xs font-black text-slate-900">{{ blog.author }}</p>
                  <p class="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{{ blog.authorRole }}</p>
                </div>
              </div>
              <button class="w-10 h-10 rounded-full bg-slate-50 group-hover:bg-emerald-600 flex items-center justify-center transition-all group-hover:text-white">
                <span class="text-xl">→</span>
              </button>
            </div>
          </div>
        </article>
      </div>

    </div>
  </div>
</template>

<style scoped>
.scrollbar-hide::-webkit-scrollbar { display: none; }
.scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }

.text-gradient {
  background: linear-gradient(to right, #10b981, #34d399);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

article {
  animation: slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
</style>