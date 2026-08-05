<script setup>
import { ref } from 'vue'

// 1. Language Toggle State
const currentLang = ref('AM')
const toggleLanguage = () => {
  currentLang.value = currentLang.value === 'AM' ? 'EN' : 'AM'
}

// 2. Search Filters State
const searchFilters = ref({
  sport: '',
  location: '',
  date: '',
  time: '' // የሰዓት መፈለጊያ ታክሏል
})

const handleSearch = () => {
  console.log('Searching with filters:', searchFilters.value)
  return navigateTo({
    path: '/venues',
    query: searchFilters.value
  })
}

// 3. Newsletter State
const newsletterEmail = ref('')
const handleSubscribe = () => {
  if (newsletterEmail.value) {
    alert(`እናመሰግናለን! ${newsletterEmail.value} በተሳካ ሁኔታ ተመዝግቧል።`)
    newsletterEmail.value = ''
  }
}

// 4. Sample Venues Data
const sampleVenues = ref([
  {
    id: 1,
    name: 'ሳርቤት ፉትሳል ሜዳ',
    category: 'Futsal',
    location: 'ሳርቤት፣ አዲስ አበባ',
    rating: '4.8',
    price: '800',
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 2,
    name: 'ቦሌ አሬና ቴኒስ ክለብ',
    category: 'Tennis',
    location: 'ቦሌ፣ አዲስ አበባ',
    rating: '4.9',
    price: '1200',
    image: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 3,
    name: 'ሲኤምሲ ቅርጫት ኳስ ሜዳ',
    category: 'Basketball',
    location: 'ሲኤምሲ፣ አዲስ አበባ',
    rating: '4.7',
    price: '600',
    image: 'https://images.unsplash.com/photo-1519861531473-9200262188bf?q=80&w=600&auto=format&fit=crop'
  }
])

// 5. Sample Upcoming Pick-up Games Data (አዲስ የተጨመረ)
const upcomingGames = ref([
  {
    id: 101,
    title: 'የቅዳሜ ጧት የ 5v5 ፉትሳል ጨዋታ',
    venue: 'ሳርቤት ፉትሳል ሜዳ',
    time: 'ቅዳሜ | 2:00 - 3:00 ጧት',
    spotsLeft: 3,
    totalSpots: 10,
    pricePerPerson: '80'
  },
  {
    id: 102,
    title: 'የማታ ቅርጫት ኳስ ግጥሚያ',
    venue: 'ሲኤምሲ ቅርጫት ኳስ ሜዳ',
    time: 'እሁድ | 11:00 - 1:00 ማታ',
    spotsLeft: 2,
    totalSpots: 8,
    pricePerPerson: '75'
  }
])

// 6. Navigation Links (ከምስሉ ጋር ተመሳሳይ የተስተካከለ)
const navLinks = [

]
</script>

<template>
  <div class="min-h-screen bg-slate-50 dark:bg-[#070b10] text-slate-800 dark:text-slate-100 font-sans pb-16 md:pb-0">
    
    <!-- 1. NAVIGATION BAR (ለ Desktop nav links የተስተካከለበት) -->
    <header class="sticky top-0 z-40 bg-white/95 dark:bg-[#0b111a]/95 backdrop-blur-md border-b border-slate-200 dark:border-[#212e3e]">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <NuxtLink to="/" class="flex items-center gap-2">
          <div class="w-9 h-9 bg-emerald-500 rounded-xl flex items-center justify-center text-slate-950 font-black text-xl shadow-md">
            
          </div>
          <span class="font-extrabold text-xl text-slate-900 dark:text-white tracking-tight">
            <span class="text-emerald-500"></span>
          </span>
        </NuxtLink>

        <!-- Desktop Navigation Links -->
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

        <!-- Auth & Language Toggle -->
        <div class="flex items-center gap-2 sm:gap-3">
          <button 
            @click="toggleLanguage" 
            class="px-2.5 py-1 text-xs font-bold bg-slate-100 dark:bg-[#212e3e] hover:bg-slate-200 text-slate-700 dark:text-emerald-400 rounded-lg transition uppercase border border-slate-200 dark:border-transparent"
          >
            {{ currentLang }}
          </button>
          
          <NuxtLink 
            to="/login" 
            class="hidden sm:inline-flex px-3.5 py-2 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:text-emerald-500 transition"
          >
            ግቡ
          </NuxtLink>
          
          <NuxtLink 
            to="/register" 
            class="px-4 py-2 text-xs sm:text-sm font-bold text-slate-950 bg-emerald-500 hover:bg-emerald-400 rounded-xl shadow-md shadow-emerald-500/20 transition"
          >
            ተመዝገቡ
          </NuxtLink>
        </div>
      </div>
    </header>

    <main>
      <!-- 2. HERO SECTION & CALL TO ACTIONS (CTA) -->
      <section class="relative bg-slate-900 dark:bg-[#0b111a] text-white pt-12 pb-24 sm:pt-20 sm:pb-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div class="absolute inset-0 opacity-10 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:16px_16px]"></div>

        <div class="relative max-w-4xl mx-auto text-center space-y-5 sm:space-y-6">
          <span class="inline-block px-3.5 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            የኢትዮጵያ ቁጥር #1 የስፖርት ሜዳ ማስያዣ
          </span>
          
          <h1 class="text-3xl sm:text-6xl font-black tracking-tight leading-tight">
            ሜዳዎን በቀላሉ ይያዙ፣ <span class="text-emerald-400">ወዲያውኑ ይጫወቱ!</span>
          </h1>
          
          <p class="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto font-light leading-relaxed">
            በአቅራቢያዎ ያሉ የፉትሳል፣ የቴኒስ እና የቅርጫት ኳስ ሜዳዎችን በሰከንዶች ውስጥ በኢንተርኔት ወይም በሞባይል መተግበሪያችን ይያዙ።
          </p>

          <!-- CTAs -->
          <div class="flex flex-col sm:flex-row justify-center gap-3.5 pt-2 sm:pt-4">
            <NuxtLink 
              to="/venues" 
              class="px-8 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl shadow-lg shadow-emerald-500/20 transition text-center text-sm sm:text-base"
            >
              ሜዳ አሁኑኑ ያዙ (Book Venue)
            </NuxtLink>
            
            <NuxtLink 
              to="/games" 
              class="px-8 py-3.5 bg-slate-800 dark:bg-[#131c27] hover:bg-slate-700 text-white font-semibold rounded-xl border border-slate-700 dark:border-[#212e3e] transition text-center text-sm sm:text-base"
            >
              ጨዋታ ይቀላቀሉ (Join Game)
            </NuxtLink>
          </div>
        </div>
      </section>

      <!-- 3. PROMO CARD & SEARCH BAR TOGETHER -->
      <div class="max-w-5xl mx-auto px-4 sm:px-6 relative z-30 -mt-16 space-y-6">
        
        <!-- MOBILE APP PROMO CARD -->
        <div class="bg-gradient-to-r from-emerald-600 to-teal-700 rounded-2xl p-4 sm:p-6 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div class="flex items-center gap-4 text-center sm:text-left">
            <div class="hidden sm:flex w-12 h-12 bg-white/10 rounded-2xl items-center justify-center text-2xl">
              📱
            </div>
            <div>
              <h3 class="font-extrabold text-lg sm:text-xl">የ EthioSport ሞባይል መተግበሪያን ይጫኑ</h3>
              <p class="text-xs sm:text-sm text-emerald-100">የበለጠ ፈጣን ማስያዣ እና ልዩ ቅናሾችን በስልክዎ ያግኙ!</p>
            </div>
          </div>
          <div class="flex gap-2 w-full sm:w-auto">
            <button class="flex-1 sm:flex-none px-4 py-2 bg-slate-950 hover:bg-slate-900 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 shadow transition">
              <span>Google Play</span>
            </button>
            <button class="flex-1 sm:flex-none px-4 py-2 bg-white hover:bg-emerald-50 text-slate-950 text-xs font-bold rounded-xl flex items-center justify-center gap-2 shadow transition">
              <span>App Store</span>
            </button>
          </div>
        </div>

        <!-- QUICK SEARCH BAR (በከተማ፣ በስፖርት አይነት እና በሰዓት መፈለጊያ) -->
        <div class="bg-white dark:bg-[#131c27] rounded-2xl shadow-xl p-4 sm:p-6 border border-slate-200 dark:border-[#212e3e]">
          <form @submit.prevent="handleSearch" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
            
            <!-- Sport Type Dropdown -->
            <div class="flex flex-col">
              <label class="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-1">የስፖርት አይነት</label>
              <select 
                v-model="searchFilters.sport" 
                class="w-full bg-slate-50 dark:bg-[#0b111a] border border-slate-200 dark:border-[#212e3e] rounded-xl px-3 py-3 font-medium text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
              >
                <option value="">ሁሉም ስፖርቶች</option>
                <option value="futsal">ፉትሳል (Futsal)</option>
                <option value="basketball">ባስኬትቦል</option>
                <option value="tennis">ቴኒስ</option>
              </select>
            </div>

            <!-- Location Dropdown -->
            <div class="flex flex-col">
              <label class="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-1">ቦታ / ሰፈር</label>
              <select 
                v-model="searchFilters.location" 
                class="w-full bg-slate-50 dark:bg-[#0b111a] border border-slate-200 dark:border-[#212e3e] rounded-xl px-3 py-3 font-medium text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
              >
                <option value="">ሁሉም ቦታዎች</option>
                <option value="bole">ቦሌ</option>
                <option value="sarbet">ሳርቤት</option>
                <option value="kazanchis">ካዛንችስ</option>
                <option value="cmc">ሲኤምሲ (CMC)</option>
              </select>
            </div>

            <!-- Date Picker -->
            <div class="flex flex-col">
              <label class="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-1">ቀን</label>
              <input 
                v-model="searchFilters.date"
                type="date" 
                class="w-full bg-slate-50 dark:bg-[#0b111a] border border-slate-200 dark:border-[#212e3e] rounded-xl px-3 py-3 font-medium text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
              />
            </div>

            <!-- Time Slot Input (የሰዓት መፈለጊያ) -->
            <div class="flex flex-col">
              <label class="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-1">ሰዓት</label>
              <input 
                v-model="searchFilters.time"
                type="time" 
                class="w-full bg-slate-50 dark:bg-[#0b111a] border border-slate-200 dark:border-[#212e3e] rounded-xl px-3 py-3 font-medium text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
              />
            </div>

            <!-- Search Button -->
            <div class="flex items-end">
              <button 
                type="submit" 
                class="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-3 px-4 rounded-xl shadow-md transition flex items-center justify-center gap-2 text-sm"
              >
                <span>ፈልግ</span>
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                </svg>
              </button>
            </div>

          </form>
        </div>
      </div>

      <!-- 4. HOW IT WORKS SECTION (አዲስ የተጨመረ - 3 Steps) -->
      <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div class="text-center max-w-2xl mx-auto mb-12">
          <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">እንዴት ይሰራል? (How It Works)</h2>
          <p class="text-slate-600 dark:text-slate-400 text-sm mt-2">በ 3 ቀላል ደረጃዎች ሜዳዎን ይያዙ እና ጨዋታዎን ይጀምሩ</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="bg-white dark:bg-[#131c27] p-8 rounded-2xl border border-slate-200 dark:border-[#212e3e] text-center space-y-4 shadow-sm relative">
            <div class="w-14 h-14 bg-emerald-500/10 text-emerald-500 font-extrabold text-2xl rounded-2xl flex items-center justify-center mx-auto">
              1
            </div>
            <h3 class="text-xl font-bold text-slate-900 dark:text-white">ሜዳ ይፈልጉ (Search)</h3>
            <p class="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              በአቅራቢያዎ የሚገኙ የስፖርት ሜዳዎችን በስፖርት አይነት፣ በቦታ እና ክፍት በሆኑ ሰዓቶች ይፈልጉ።
            </p>
          </div>

          <div class="bg-white dark:bg-[#131c27] p-8 rounded-2xl border border-slate-200 dark:border-[#212e3e] text-center space-y-4 shadow-sm relative">
            <div class="w-14 h-14 bg-emerald-500/10 text-emerald-500 font-extrabold text-2xl rounded-2xl flex items-center justify-center mx-auto">
              2
            </div>
            <h3 class="text-xl font-bold text-slate-900 dark:text-white">ሰዓት መርጠው ይክፈሉ (Select & Pay)</h3>
            <p class="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              የሚመችዎትን ሰዓት ይምረጡ፤ በ ቴሌብር፣ CBE Birr ወይም ባንክ ካርድ በሰከንዶች ውስጥ ይክፈሉ።
            </p>
          </div>

          <div class="bg-white dark:bg-[#131c27] p-8 rounded-2xl border border-slate-200 dark:border-[#212e3e] text-center space-y-4 shadow-sm relative">
            <div class="w-14 h-14 bg-emerald-500/10 text-emerald-500 font-extrabold text-2xl rounded-2xl flex items-center justify-center mx-auto">
              3
            </div>
            <h3 class="text-xl font-bold text-slate-900 dark:text-white">ይጫወቱ (Play!)</h3>
            <p class="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              የተላከሎትን ዲጂታል QR Code ቲኬት ለሜዳው አስተዳዳሪ በማሳየት በደስታ ይጫወቱ።
            </p>
          </div>
        </div>
      </section>

      <!-- 5. FEATURED VENUES SECTION -->
      <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div class="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-3">
          <div>
            <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">ታዋቂ ሜዳዎች</h2>
            <p class="text-slate-600 dark:text-slate-400 text-sm mt-1">በተጫዋቾች ዘንድ ከፍተኛ ደረጃ የተሰጣቸው</p>
          </div>
          <NuxtLink 
            to="/venues" 
            class="text-emerald-500 font-bold hover:text-emerald-400 flex items-center gap-1 transition text-sm"
          >
            ሁሉንም ይመልከቱ &rarr;
          </NuxtLink>
        </div>

        <!-- Venue Cards Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div 
            v-for="venue in sampleVenues" 
            :key="venue.id" 
            class="bg-white dark:bg-[#131c27] rounded-2xl overflow-hidden border border-slate-200 dark:border-[#212e3e] hover:shadow-xl transition flex flex-col group"
          >
            <div class="relative h-48 bg-slate-200 dark:bg-slate-800 overflow-hidden">
              <img 
                :src="venue.image" 
                :alt="venue.name" 
                class="w-full h-full object-cover group-hover:scale-105 transition duration-300" 
                loading="lazy"
              />
              <span class="absolute top-3 right-3 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-bold text-emerald-400 border border-emerald-500/20">
                ⭐ {{ venue.rating }}
              </span>
            </div>

            <div class="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <span class="text-xs font-semibold text-emerald-500 uppercase tracking-wide">{{ venue.category }}</span>
                <h3 class="text-xl font-bold text-slate-900 dark:text-white mt-1">{{ venue.name }}</h3>
                <p class="text-slate-500 dark:text-slate-400 text-sm mt-1 flex items-center gap-1">
                  📍 {{ venue.location }}
                </p>
              </div>

              <div class="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-[#212e3e]">
                <div>
                  <span class="text-lg font-black text-slate-900 dark:text-white">{{ venue.price }} ETB</span>
                  <span class="text-xs text-slate-500 dark:text-slate-400"> / ሰዓት</span>
                </div>
                <NuxtLink 
                  :to="`/venues/${venue.id}`" 
                  class="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold rounded-xl transition shadow-md"
                >
                  ያዝ
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 6. UPCOMING PICK-UP GAMES SECTION (አዲስ የተጨመረ) -->
      <section class="bg-slate-100 dark:bg-[#0b111a] py-16 px-4 sm:px-6 lg:px-8 border-t border-slate-200 dark:border-[#212e3e]">
        <div class="max-w-7xl mx-auto">
          <div class="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-3">
            <div>
              <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">በቅርብ የሚደረጉ ጨዋታዎች (Pick-up Games)</h2>
              <p class="text-slate-600 dark:text-slate-400 text-sm mt-1">ተጫዋች የጎደላቸው ቡድኖችን ይቀላቀሉ ወይም የራስዎን ጨዋታ ይክፈቱ</p>
            </div>
            <NuxtLink 
              to="/games" 
              class="text-emerald-500 font-bold hover:text-emerald-400 flex items-center gap-1 transition text-sm"
            >
              ሁሉንም ጨዋታዎች ይመልከቱ &rarr;
            </NuxtLink>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div 
              v-for="game in upcomingGames" 
              :key="game.id"
              class="bg-white dark:bg-[#131c27] p-6 rounded-2xl border border-slate-200 dark:border-[#212e3e] shadow-sm flex flex-col justify-between space-y-4"
            >
              <div class="flex justify-between items-start">
                <div>
                  <span class="px-2.5 py-1 bg-amber-500/10 text-amber-500 border border-amber-500/20 text-xs font-bold rounded-full">
                    {{ game.spotsLeft }} ሰው ይጎድላል
                  </span>
                  <h3 class="text-lg font-bold text-slate-900 dark:text-white mt-2">{{ game.title }}</h3>
                  <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">📍 {{ game.venue }}</p>
                </div>
                <div class="text-right">
                  <span class="text-base font-extrabold text-emerald-500">{{ game.pricePerPerson }} ETB</span>
                  <span class="text-xs text-slate-400 block">/ሰው</span>
                </div>
              </div>

              <div class="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-[#212e3e]">
                <span class="text-xs font-semibold text-slate-600 dark:text-slate-300">🕒 {{ game.time }}</span>
                <NuxtLink 
                  to="/games"
                  class="px-4 py-2 bg-slate-900 dark:bg-emerald-500 hover:bg-slate-800 dark:hover:bg-emerald-400 text-white dark:text-slate-950 text-xs font-bold rounded-xl transition"
                >
                  ተቀላቀል (Join)
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 7. PARTNER / VENUE OWNER SECTION -->
      <section class="bg-slate-900 dark:bg-[#0b111a] text-white py-16 px-4 sm:px-6 lg:px-8 border-t border-b border-slate-800 dark:border-[#212e3e]">
        <div class="max-w-5xl mx-auto bg-slate-800/60 dark:bg-[#131c27] border border-slate-700 dark:border-[#212e3e] rounded-3xl p-6 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div class="space-y-2 text-center md:text-left">
            <h2 class="text-2xl sm:text-3xl font-extrabold">የስፖርት ሜዳ አለዎት?</h2>
            <p class="text-slate-300 max-w-xl text-sm sm:text-base">
              ከእኛ ጋር በመስራት የሜዳዎን መርሃግብር ያስተዳድሩ፣ ገቢዎን እና ደንበኞችዎን በቀላሉ ያሳድጉ!
            </p>
          </div>
          <NuxtLink 
            to="/register-venue" 
            class="w-full sm:w-auto text-center px-8 py-3.5 bg-emerald-500 text-slate-950 hover:bg-emerald-400 font-bold rounded-xl shadow-lg transition text-sm"
          >
            ሜዳዎን ያስመዝግቡ
          </NuxtLink>
        </div>
      </section>

      <!-- 8. TRUST & PAYMENTS SECTION -->
      <section class="py-10 bg-slate-100 dark:bg-[#070b10] border-b border-slate-200 dark:border-[#212e3e]">
        <div class="max-w-7xl mx-auto px-4 text-center">
          <p class="text-xs font-bold uppercase text-slate-500 dark:text-slate-400 tracking-wider mb-4">
            በቀላሉ እና በአስተማማኝ ሁኔታ ይክፈሉ
          </p>
          <div class="flex flex-wrap items-center justify-center gap-3 sm:gap-6 font-bold text-slate-700 dark:text-slate-300 text-xs sm:text-sm">
            <span class="px-4 py-2 bg-white dark:bg-[#131c27] rounded-xl shadow-sm border border-slate-200 dark:border-[#212e3e]">Telebirr (ቴሌብር)</span>
            <span class="px-4 py-2 bg-white dark:bg-[#131c27] rounded-xl shadow-sm border border-slate-200 dark:border-[#212e3e]">CBE Birr</span>
            <span class="px-4 py-2 bg-white dark:bg-[#131c27] rounded-xl shadow-sm border border-slate-200 dark:border-[#212e3e]">Bank Cards</span>
          </div>
        </div>
      </section>
    </main>

    <!-- 9. FOOTER SECTION -->
    <footer class="bg-slate-900 dark:bg-[#0b111a] text-slate-400 py-10 px-4 sm:px-6 lg:px-8 border-t border-slate-800 dark:border-[#212e3e]">
      <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        <div class="space-y-3">
          <span class="font-bold text-xl text-white">EthioSport</span>
          <p class="text-xs sm:text-sm text-slate-400">
            በኢትዮጵያ ውስጥ የስፖርት ሜዳዎችን በቀላሉ ለመያዝ እና የስፖርት ማህበረሰቡን ለማገናኘት የተሰራ ዲጂታል ፕላትፎርም።
          </p>
        </div>

        <div>
          <h4 class="text-white font-bold mb-3 text-sm">እኛን ለማግኘት</h4>
          <ul class="space-y-2 text-xs sm:text-sm">
            <li>📍 አዲስ አበባ፣ ኢትዮጵያ</li>
            <li>📞 +251 900 000 000</li>
            <li>✉️ info@ethiosport.et</li>
          </ul>
        </div>

        <div>
          <h4 class="text-white font-bold mb-3 text-sm">ጋዜጣችንን ይከታተሉ</h4>
          <form @submit.prevent="handleSubscribe" class="flex flex-col gap-2">
            <input 
              v-model="newsletterEmail"
              type="email" 
              placeholder="ኢሜይልዎን ያስገቡ" 
              required
              class="bg-slate-800 dark:bg-[#131c27] border border-slate-700 dark:border-[#212e3e] rounded-xl px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <button type="submit" class="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-2 rounded-xl text-xs sm:text-sm transition">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div class="max-w-7xl mx-auto pt-6 border-t border-slate-800 dark:border-[#212e3e] text-center text-xs text-slate-500">
        &copy; {{ new Date().getFullYear() }} EthioSport. መብቱ በህግ የተጠበቀ ነው።
      </div>
    </footer>

    <!-- 10. MOBILE BOTTOM NAVIGATION BAR -->
    <nav class="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 dark:bg-[#0b111a]/95 backdrop-blur-lg border-t border-slate-200 dark:border-[#212e3e] px-4 py-2 flex items-center justify-around shadow-lg">
      <NuxtLink to="/" class="flex flex-col items-center text-slate-600 dark:text-slate-400 hover:text-emerald-500 dark:hover:text-emerald-400 font-medium text-[11px] gap-1" active-class="text-emerald-500 font-bold">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 00-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>
        <span>መነሻ</span>
      </NuxtLink>

      <NuxtLink to="/venues" class="flex flex-col items-center text-slate-600 dark:text-slate-400 hover:text-emerald-500 dark:hover:text-emerald-400 font-medium text-[11px] gap-1" active-class="text-emerald-500 font-bold">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5m0 0h4m-4 0v-5a1 1 0 011-1h2a1 1 0 011 1v5"/></svg>
        <span>ሜዳዎች</span>
      </NuxtLink>

      <NuxtLink to="/events" class="flex flex-col items-center text-slate-600 dark:text-slate-400 hover:text-emerald-500 dark:hover:text-emerald-400 font-medium text-[11px] gap-1" active-class="text-emerald-500 font-bold">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
        <span>ውድድሮች</span>
      </NuxtLink>

      <NuxtLink to="/login" class="flex flex-col items-center text-slate-600 dark:text-slate-400 hover:text-emerald-500 dark:hover:text-emerald-400 font-medium text-[11px] gap-1" active-class="text-emerald-500 font-bold">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
        <span>መለያ</span>
      </NuxtLink>
    </nav>

  </div>
</template>