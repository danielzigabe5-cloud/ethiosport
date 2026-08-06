<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-950 font-sans selection:bg-green-200 selection:text-green-900 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-gray-50 dark:[&::-webkit-scrollbar-track]:bg-gray-900 [&::-webkit-scrollbar-thumb]:bg-green-600 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-green-700">
    
    <!-- HEADER & NAVBAR -->
    <header 
      :class="[
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b',
        isScrolled ? 'bg-green-800/95 backdrop-blur-lg border-white/10 shadow-lg py-2' : 'bg-green-700/80 backdrop-blur-sm border-transparent py-4'
      ]"
    >
      <div class="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center gap-2">
          <Icon name="lucide:trophy" class="w-8 h-8 text-yellow-400" />
          <span class="text-2xl font-black text-white tracking-tight">ሜዳወች <span class="text-yellow-400">Ethiopia</span></span>
        </NuxtLink>

        <!-- Desktop Navigation Links -->
        <nav class="hidden md:flex items-center gap-8 font-semibold text-white/90 text-sm tracking-wide">
          <button type="button" @click="scrollToSection('hero')" class="hover:text-yellow-400 transition-colors">መነሻ</button>
          <button type="button" @click="scrollToSection('sports-info')" class="hover:text-yellow-400 transition-colors">ስለ ስፖርቶች</button>
          <button type="button" @click="scrollToSection('how-it-works')" class="hover:text-yellow-400 transition-colors">አሰራራችን</button>
          <button type="button" @click="scrollToSection('venues')" class="hover:text-yellow-400 transition-colors">ሜዳዎች</button>
          <NuxtLink to="/justplay" class="hover:text-yellow-400 transition-colors">ጨዋታዎች</NuxtLink>
          <NuxtLink to="/contact" class="hover:text-yellow-400 transition-colors">አግኙን</NuxtLink>
        </nav>

        <!-- Right Side: Language & Auth -->
        <div class="hidden md:flex items-center gap-5">
          <!-- Language Selector -->
          <div class="relative group">
            <button type="button" class="flex items-center gap-2 px-2 py-1 text-white font-medium text-sm transition hover:text-yellow-400">
              <Icon name="lucide:globe" class="w-4 h-4" />
              <span>{{ currentLang.code }}</span>
              <Icon name="lucide:chevron-down" class="w-3 h-3" />
            </button>
            <div class="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-900 rounded-xl shadow-xl border dark:border-gray-800 py-2 hidden group-hover:block transition-all z-50">
              <button 
                type="button"
                v-for="lang in languages" 
                :key="lang.code"
                @click="changeLanguage(lang)"
                class="w-full px-4 py-2 text-left flex items-center gap-3 text-sm font-semibold text-gray-700 dark:text-gray-200 hover:bg-green-50 dark:hover:bg-gray-800 hover:text-green-600 transition"
              >
                <span>{{ lang.flag }}</span>
                <span>{{ lang.name }}</span>
              </button>
            </div>
          </div>

          <!-- Auth Buttons -->
          <div class="flex items-center gap-3">
            <NuxtLink to="/login" class="text-white hover:text-yellow-400 font-semibold text-sm transition">
              ግባ
            </NuxtLink>
            <NuxtLink to="/register" class="bg-yellow-500 hover:bg-yellow-400 text-green-950 font-bold px-5 py-2.5 rounded-xl transition shadow-md flex items-center gap-2 text-sm">
              <Icon name="lucide:user-plus" class="w-4 h-4" />
              ተመዝገብ
            </NuxtLink>
          </div>
        </div>

        <!-- Mobile Menu Toggle -->
        <button type="button" @click="isMobileMenuOpen = !isMobileMenuOpen" class="md:hidden text-white p-2">
          <Icon :name="isMobileMenuOpen ? 'lucide:x' : 'lucide:menu'" class="w-7 h-7" />
        </button>
      </div>

      <!-- Mobile Dropdown Menu -->
      <Transition 
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="opacity-0 -translate-y-2"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition duration-200 ease-in"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-2"
      >
        <div v-if="isMobileMenuOpen" class="md:hidden bg-green-800 dark:bg-green-950 border-t border-white/10 px-4 pt-4 pb-6 space-y-4 shadow-xl">
          <nav class="flex flex-col gap-2 font-semibold text-white text-sm">
            <button type="button" @click="scrollToSection('hero', true)" class="text-left py-3 border-b border-white/10">መነሻ</button>
            <button type="button" @click="scrollToSection('sports-info', true)" class="text-left py-3 border-b border-white/10">ስለ ስፖርቶች</button>
            <button type="button" @click="scrollToSection('how-it-works', true)" class="text-left py-3 border-b border-white/10">አሰራራችን</button>
            <button type="button" @click="scrollToSection('venues', true)" class="text-left py-3 border-b border-white/10">ሜዳዎች</button>
            <NuxtLink to="/justplay" @click="isMobileMenuOpen = false" class="py-3 border-b border-white/10">ጨዋታዎች</NuxtLink>
            <NuxtLink to="/contact" @click="isMobileMenuOpen = false" class="py-3 border-b border-white/10">አግኙን</NuxtLink>
          </nav>
          <div class="grid grid-cols-2 gap-3 pt-4">
            <NuxtLink to="/login" @click="isMobileMenuOpen = false" class="bg-white/10 text-white border border-white/20 font-bold py-3 rounded-xl text-center text-sm">
              ግባ
            </NuxtLink>
            <NuxtLink to="/register" @click="isMobileMenuOpen = false" class="bg-yellow-500 text-green-950 font-bold py-3 rounded-xl text-center text-sm">
              ተመዝገብ
            </NuxtLink>
          </div>
        </div>
      </Transition>
    </header>

    <!-- 1. HERO SECTION -->
    <section id="hero" class="relative min-h-[85vh] flex items-center bg-gradient-to-br from-green-800 via-green-700 to-green-900 text-white pt-24 pb-16 px-4 overflow-hidden">
      <div class="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:30px_30px]"></div>
      
      <div class="max-w-6xl mx-auto relative z-10">
        <div class="grid lg:grid-cols-2 gap-8 items-center">
          <div class="space-y-8 text-center lg:text-left">
            <div class="inline-flex items-center gap-2 px-4 py-2 bg-green-900/50 backdrop-blur-md border border-green-500/30 rounded-full">
              <span class="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></span>
              <span class="text-xs font-bold text-yellow-400 uppercase tracking-wider">የኢትዮጵያ የስፖርት ሜዳዎች መፈለጊያ</span>
            </div>
            
            <h1 class="text-5xl md:text-6xl lg:text-7xl font-black mb-4 leading-[1.1] tracking-tight">
              የስፖርት ሜዳዎችን <br/> 
              <span class="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-500">በዘመናዊ መንገድ</span> ያግኙ
            </h1>
            
            <p class="text-lg md:text-xl text-green-50/90 leading-relaxed max-w-xl mx-auto lg:mx-0 font-medium">
              በኢትዮጵያ ውስጥ ያሉ የራሳቸው ሜዳ እና መሰረተ ልማት ያላቸውን የስፖርት ቦታዎች ይፈልጉ፣ ቀጠሮ ይያዙ።
            </p>
            
            <div class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2">
              <NuxtLink to="/download" class="bg-yellow-500 hover:bg-yellow-400 text-green-950 font-bold px-8 py-4 rounded-xl shadow-lg transition-transform transform hover:-translate-y-1 flex items-center justify-center gap-2">
                <Icon name="lucide:download" class="w-5 h-5" />
                መተግበሪያውን ያውርዱ
              </NuxtLink>
              
              <NuxtLink to="/justplay" class="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold px-8 py-4 rounded-xl transition-all flex items-center justify-center gap-2 backdrop-blur-sm">
                <Icon name="lucide:users" class="w-5 h-5" />
                ተጫዋች ፈልግ
              </NuxtLink>
            </div>
          </div>

          <!-- Hero Illustration -->
          <div class="hidden lg:block relative">
            <div class="absolute inset-0 bg-gradient-to-tr from-green-400/30 to-yellow-500/20 rounded-3xl blur-3xl"></div>
            <img src="https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=1000" alt="Football pitch" class="relative rounded-3xl shadow-2xl border border-white/10 object-cover h-[450px] w-full" />
            
            <div class="absolute -bottom-6 -left-6 bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-2xl border dark:border-gray-800 flex items-center gap-4 animate-bounce [animation-duration:4s]">
              <div class="bg-green-100 dark:bg-green-900/50 p-4 rounded-full text-green-600 dark:text-green-400">
                <Icon name="lucide:activity" class="w-8 h-8" />
              </div>
              <div>
                <p class="text-3xl font-black text-gray-900 dark:text-white">100+</p>
                <p class="text-sm font-semibold text-gray-500">ዕለታዊ ጨዋታዎች</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 2. SMART SEARCH BAR -->
    <div class="max-w-6xl mx-auto px-4 -mt-12 relative z-30 mb-16">
      <div class="bg-white dark:bg-gray-900 p-4 rounded-2xl shadow-xl shadow-gray-200/50 dark:shadow-none border dark:border-gray-800 flex flex-col md:flex-row flex-wrap lg:flex-nowrap gap-3 items-center">
        
        <!-- Text Search -->
        <div class="w-full flex-1 relative group">
          <Icon name="lucide:search" class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-green-500 transition-colors" />
          <input 
            v-model="searchQuery"
            type="text" 
            placeholder="የሜዳ ስም ወይም ቦታ..." 
            class="w-full pl-12 pr-4 py-3.5 bg-gray-50 dark:bg-gray-800/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 transition-all dark:text-white text-sm font-medium" 
          />
        </div>

        <!-- Dropdown: All Cities -->
        <div class="w-full md:w-48 lg:w-56 relative group">
          <Icon name="lucide:map-pin" class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-green-500 transition-colors z-10" />
          <select 
            v-model="selectedCity"
            @change="handleCityChange"
            class="w-full pl-11 pr-8 py-3.5 bg-gray-50 dark:bg-gray-800/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 transition-all dark:text-white appearance-none cursor-pointer text-sm font-medium"
          >
            <option value="all">ሁሉም ከተሞች (All Cities)</option>
            <option v-for="city in cities" :key="city" :value="city">{{ city }}</option>
          </select>
          <Icon name="lucide:chevron-down" class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none w-4 h-4" />
        </div>

        <!-- Dynamic Dropdown: Sub-Cities (Appears only if Addis Ababa is selected) -->
        <div v-if="selectedCity === 'አዲስ አበባ (Addis Ababa)'" class="w-full md:w-48 lg:w-56 relative group">
          <Icon name="lucide:building-2" class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-green-500 transition-colors z-10" />
          <select 
            v-model="selectedSubCity"
            class="w-full pl-11 pr-8 py-3.5 bg-gray-50 dark:bg-gray-800/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 transition-all dark:text-white appearance-none cursor-pointer text-sm font-medium"
          >
            <option value="all">ሁሉም ክፍለ ከተሞች</option>
            <option v-for="subCity in subCities" :key="subCity" :value="subCity">{{ subCity }}</option>
          </select>
          <Icon name="lucide:chevron-down" class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none w-4 h-4" />
        </div>

        <!-- Dropdown: All Sports -->
        <div class="w-full md:w-48 lg:w-56 relative group">
          <Icon name="lucide:trophy" class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-green-500 transition-colors z-10" />
          <select 
            v-model="selectedSport"
            class="w-full pl-11 pr-8 py-3.5 bg-gray-50 dark:bg-gray-800/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 transition-all dark:text-white appearance-none cursor-pointer text-sm font-medium"
          >
            <option value="all">ሁሉም ስፖርቶች (All Sports)</option>
            <option v-for="sport in sportsList" :key="sport.id" :value="sport.id">{{ sport.name }}</option>
          </select>
          <Icon name="lucide:chevron-down" class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none w-4 h-4" />
        </div>

        <!-- Search Button -->
        <button type="button" @click="executeSearch" class="w-full md:w-auto px-8 py-3.5 bg-green-600 hover:bg-green-700 active:scale-95 text-white font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 text-sm whitespace-nowrap">
          <Icon name="lucide:search" class="w-4 h-4" />
          ፈልግ
        </button>

      </div>
    </div>

    <!-- 3. SPORTS OVERVIEW SECTION -->
    <section id="sports-info" class="py-12 bg-white dark:bg-gray-900 border-b dark:border-gray-800">
      <div class="max-w-6xl mx-auto px-4">
        <div class="text-center max-w-3xl mx-auto mb-12">
          <h2 class="text-3xl font-black dark:text-white mb-3">በኢትዮጵያ የራሳቸው ሜዳ ያላቸው የስፖርት ዓይነቶች</h2>
          <p class="text-gray-500 dark:text-gray-400 text-sm md:text-base leading-relaxed">
            በሀገራችን በስፋት የሚዘወተሩ፣ የራሳቸው መሰረተ ልማት እና የተዘጋጁ ሜዳዎች ያሏቸው ዋና ዋና የስፖርት ዓይነቶች እና የጨዋታ ቦታዎች መረጃ።
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div v-for="sport in sportsOverview" :key="sport.title" class="p-5 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border dark:border-gray-800 hover:border-green-500/40 transition-all">
            <div class="w-12 h-12 bg-green-100 dark:bg-green-900/40 text-green-600 dark:text-green-400 rounded-xl flex items-center justify-center mb-4">
              <Icon :name="sport.icon" class="w-6 h-6" />
            </div>
            <h3 class="font-bold text-lg dark:text-white mb-2">{{ sport.title }}</h3>
            <p class="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">{{ sport.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 4. HOW IT WORKS -->
    <section id="how-it-works" class="py-20 bg-gray-50 dark:bg-gray-950">
      <div class="max-w-6xl mx-auto px-4 text-center">
        <h2 class="text-3xl md:text-4xl font-black dark:text-white mb-3 tracking-tight">አሰራራችን እጅግ ቀላል ነው</h2>
        <p class="text-gray-500 mb-16 font-medium text-lg">በሶስት ቀላል ደረጃዎች የራስዎን ሜዳ ያግኙ</p>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          <div class="hidden md:block absolute top-12 left-[16%] right-[16%] h-[2px] bg-gradient-to-r from-gray-200 via-green-500 to-gray-200 dark:from-gray-800 dark:via-green-600 dark:to-gray-800 -z-0"></div>
          
          <div v-for="(step, i) in steps" :key="i" class="relative z-10 bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-sm border dark:border-gray-800 flex flex-col items-center hover:-translate-y-2 transition-transform duration-300">
            <div class="w-20 h-20 bg-green-50 dark:bg-green-900/30 text-green-600 rounded-2xl flex items-center justify-center mb-6 shadow-inner rotate-3">
              <Icon :name="step.icon" class="w-10 h-10" />
            </div>
            <h3 class="text-xl font-bold dark:text-white mb-3">{{ step.title }}</h3>
            <p class="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{{ step.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 5. FEATURED VENUES -->
    <section id="venues" class="py-24 bg-white dark:bg-gray-900">
      <div class="max-w-6xl mx-auto px-4">
        <div class="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <h2 class="text-3xl md:text-4xl font-black dark:text-white mb-3 tracking-tight">የተመዘገቡ ሜዳዎችና ስታዲየሞች</h2>
            <p class="text-gray-500 font-medium">በመረጡት ቦታ እና የስፖርት አይነት የተለዩ ሜዳዎች</p>
          </div>
          <NuxtLink to="/venues" class="text-green-600 font-bold hover:text-green-700 flex items-center gap-1 group">
            ሁሉንም ተመልከት <Icon name="lucide:arrow-right" class="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </NuxtLink>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div v-for="venue in filteredVenues" :key="venue.id" class="bg-gray-50 dark:bg-gray-800/40 rounded-[2rem] overflow-hidden border dark:border-gray-800 hover:shadow-2xl hover:shadow-gray-200 dark:hover:shadow-none hover:border-green-500/30 transition-all duration-300 flex flex-col group">
            <div class="h-64 relative overflow-hidden">
              <img :src="venue.image" class="w-full h-full object-cover group-hover:scale-110 transition duration-700" :alt="venue.name" loading="lazy" />
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div class="absolute top-4 right-4 px-3 py-1 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md rounded-lg text-xs font-bold text-gray-900 dark:text-white shadow-sm uppercase">
                {{ venue.sportType }}
              </div>
            </div>
            <div class="p-6 flex flex-col flex-grow">
              <div class="flex justify-between items-start mb-4">
                <div>
                  <h3 class="text-xl font-bold dark:text-white mb-2 group-hover:text-green-600 transition-colors">{{ venue.name }}</h3>
                  <p class="text-gray-500 text-sm flex items-center gap-1.5 font-medium">
                    <Icon name="lucide:map-pin" class="w-4 h-4 text-gray-400" /> {{ venue.city }} <span v-if="venue.subCity">({{ venue.subCity }})</span>
                  </p>
                  <p class="text-xs text-gray-400 mt-1">{{ venue.address }}</p>
                </div>
                <div class="flex items-center gap-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-500 px-2.5 py-1.5 rounded-lg text-xs font-bold">
                  <Icon name="lucide:star" class="w-3.5 h-3.5 fill-current" />
                  {{ venue.rating }}
                </div>
              </div>
              <div class="mt-auto pt-5 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
                <div>
                  <p class="text-xs text-gray-500 font-medium mb-0.5">ዋጋ በሰዓት</p>
                  <p class="text-xl font-black text-green-600">{{ venue.price }} <span class="text-xs text-gray-500 font-medium">ብር</span></p>
                </div>
                <NuxtLink :to="`/venues/${venue.id}`" class="px-6 py-3 bg-gray-900 dark:bg-gray-700 hover:bg-green-600 dark:hover:bg-green-600 text-white rounded-xl font-semibold text-sm transition-colors shadow-sm">
                  ዝርዝር እይ
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-if="filteredVenues.length === 0" class="py-20 text-center bg-gray-50 dark:bg-gray-800/30 rounded-[2rem] border border-dashed dark:border-gray-700 mt-8">
          <Icon name="lucide:search-x" class="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 class="text-xl font-bold dark:text-white">ምንም ሜዳ አልተገኘም!</h3>
          <p class="text-gray-500 text-sm mt-2">እባክዎን ሌላ ከተማ፣ ክፍለ ከተማ ወይም የስፖርት ዓይነት ይሞክሩ።</p>
          <button type="button" @click="resetFilters" class="mt-4 text-green-600 font-semibold hover:underline">ፍለጋውን አጽዳ</button>
        </div>
      </div>
    </section>

    <!-- 6. CALL TO ACTION -->
    <section class="py-16 bg-green-800 relative overflow-hidden">
      <div class="absolute -right-20 -top-20 w-96 h-96 bg-green-600 rounded-full blur-3xl opacity-50"></div>
      
      <div class="max-w-6xl mx-auto px-4 relative z-10 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-8">
        <div class="max-w-2xl">
          <h2 class="text-3xl md:text-4xl font-black text-white mb-3">የራስዎ የስፖርት ሜዳ አለዎት?</h2>
          <p class="text-green-100 font-medium text-lg leading-relaxed">በሜዳወች መተግበሪያ ላይ በመመዝገብ ደንበኞችዎን በቀላሉ ያስተዳድሩ፣ ገቢዎን ያሳድጉ። የዘመናዊው አሰራር አካል ይሁኑ።</p>
        </div>
        <NuxtLink to="/business/register" class="whitespace-nowrap bg-yellow-500 text-green-950 hover:bg-yellow-400 font-bold px-10 py-5 rounded-2xl shadow-xl transition-all hover:scale-105 flex items-center gap-2">
          <Icon name="lucide:building" class="w-5 h-5" />
          ሜዳዎን ያስመዝግቡ
        </NuxtLink>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
interface Language {
  code: string
  name: string
  flag: string
}

interface Sport {
  id: string
  name: string
}

interface Venue {
  id: number
  name: string
  city: string
  subCity: string
  address: string
  sportType: string
  price: string
  rating: string
  image: string
}

const isScrolled = ref(false)
const isMobileMenuOpen = ref(false)

const handleScroll = () => {
  if (import.meta.client) {
    isScrolled.value = window.scrollY > 50
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

const scrollToSection = (id: string, closeMobileMenu = false) => {
  if (closeMobileMenu) isMobileMenuOpen.value = false
  
  const element = document.getElementById(id)
  if (element) {
    const headerOffset = 70
    const elementPosition = element.getBoundingClientRect().top
    const offsetPosition = elementPosition + window.scrollY - headerOffset
  
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    })
  }
}

// Languages
const languages: Language[] = [
  { code: 'AM', name: 'አማርኛ', flag: '🇪🇹' },
  { code: 'EN', name: 'English', flag: '🇬🇧' }
]
const currentLang = ref<Language>(languages[0])
const changeLanguage = (lang: Language) => { currentLang.value = lang }

// Search State
const searchQuery = ref('')
const selectedCity = ref('all')
const selectedSubCity = ref('all')
const selectedSport = ref('all')

const handleCityChange = () => {
  if (selectedCity.value !== 'አዲስ አበባ (Addis Ababa)') {
    selectedSubCity.value = 'all'
  }
}

const resetFilters = () => {
  searchQuery.value = ''
  selectedCity.value = 'all'
  selectedSubCity.value = 'all'
  selectedSport.value = 'all'
}

const executeSearch = () => {
  scrollToSection('venues')
}

// Cities and Sub-Cities Data
const cities = [
  'አዲስ አበባ (Addis Ababa)',
  'ባህር ዳር (Bahir Dar)',
  'ሀዋሳ (Hawassa)',
  'መቀሌ (Mekelle)',
  'ድሬዳዋ (Dire Dawa)',
  'ነቀምቴ (Nekemte)',
  'ወልዲያ (Woldia)',
  'ሆሳዕና (Hosaena)',
  'አርባ ምንጭ (Arba Minch)',
  'ሐረር (Harar)',
  'ሱሉልታ (Sululta)'
]

const subCities = [
  'ቦሌ (Bole)',
  'አራዳ (Arada)',
  'አዲስ ከተማ (Addis Ketema)',
  'ልደታ (Lideta)',
  'ቂርቆስ / ካዛንችስ / ሜክሲኮ',
  'የካ (Yeka)',
  'ጉለሌ (Gullele)',
  'አቃቂ ቃሊቲ (Akaki Kality)',
  'ኮልፌ ቀራኒዮ (Kolfe Keraniyo)',
  'ንፋስ ስልክ ላፍቶ (Nifas Silk Lafto)'
]

// All Sports List
const sportsList: Sport[] = [
  { id: 'football', name: 'እግር ኳስ (Football / Futsal)' },
  { id: 'athletics', name: 'አትሌቲክስ (Athletics)' },
  { id: 'basketball', name: 'ቅርጫት ኳስ / ቮሊቦል / ሃንድቦል' },
  { id: 'tennis', name: 'ቴኒስ (Tennis)' },
  { id: 'golf', name: 'ጎልፍ (Golf)' },
  { id: 'equestrian', name: 'የፈረስ ጉልበት / ሽርጥ' },
  { id: 'swimming', name: 'ዋና (Swimming)' },
  { id: 'traditional', name: 'ባህላዊ ስፖርቶች (ትግል፣ ገበጣ)' }
]

// Sports Info Section Data (Updated with standard Lucide icon identifiers)
const sportsOverview = [
  {
    title: 'እግር ኳስ (Football)',
    icon: 'lucide:trophy',
    description: 'በኢትዮጵያ ከፍተኛ ቁጥር ያለው የስፖርት ሜዳና ስታዲየም የተዘጋጀለት የስፖርት ዓይነት ነው።'
  },
  {
    title: 'አትሌቲክስ (Athletics)',
    icon: 'lucide:activity',
    description: 'አብዛኛዎቹ ዋና ዋና ስታዲየሞች የሩጫ ታርታን አላቸው። እንደ ሱሉልታ ያሉ ልዩ ማሰልጠኛዎች ይገኛሉ።'
  },
  {
    title: 'ሜዳ ኳሶች (Courts)',
    icon: 'lucide:target',
    description: 'ቅርጫት ኳስ፣ ቮሊቦልና ሃንድቦል በወጣቶች ማዕከላትና ሜክሲኮ በሚገኘው የቅርጫት ኳስ ሜዳ ይከናወናሉ።'
  },
  {
    title: 'ቴኒስ እና ጎልፍ',
    icon: 'lucide:flag',
    description: 'አዲስ አበባ ቴኒስ ክለብ፣ ሆቴሎች እና የአዲስ አበባ ጎልፍ ክለብ (ሜክሲኮ) የተዘጋጁ ሜዳዎች አሏቸው።'
  },
  {
    title: 'ፈረስ ጉልበት (Equestrian)',
    icon: 'lucide:shield',
    description: 'የኢትዮጵያ ፈረስ ጉልበት ማህበር በጃንሜዳ አካባቢ የተዘጋጀ የራሱ የፈረስ ግልቢያ ሜዳ አለው።'
  },
  {
    title: 'ዋና (Swimming)',
    icon: 'lucide:waves',
    description: 'በብሔራዊ ሆቴሎች፣ በወጣቶች ማዕከላት እና አዲስ ስፖርት ፓርክ ባሉ ቦታዎች የዋና ገንዳዎች አሉ።'
  },
  {
    title: 'ባህላዊ ስፖርቶች',
    icon: 'lucide:swords',
    description: 'ትግል፣ ገበጣ እና ቅርጫ በበዓላት ወቅት በጃንሜዳ እና በክልል ባህል ማዕከላት ይካሄዳሉ።'
  },
  {
    title: 'ባህር ዳርና ክልል ስታዲየሞች',
    icon: 'lucide:map-pin',
    description: 'በሀዋሳ፣ መቀሌ፣ ድሬዳዋ፣ ወለጋ፣ ወልዲያና ሆሳዕና የሚገኙ ብሔራዊ ደረጃ ያላቸው ስታዲየሞች።'
  }
]

const steps = [
  { icon: 'lucide:search', title: '1. ሜዳ ይፈልጉ', desc: 'በአቅራቢያዎ የሚገኙትን ምርጥ የስፖርት ሜዳዎች በቀላሉ በድረ-ገጻችን ያግኙ።' },
  { icon: 'lucide:calendar-clock', title: '2. ሰዓት ይምረጡ', desc: 'ለእርስዎ የሚመችዎትን ሰዓት እና ቀን በመምረጥ ክፍያዎን ይፈጽሙ።' },
  { icon: 'lucide:check-circle-2', title: '3. ይጫወቱ', desc: 'ቦታው ተይዞሎታል! ከጓደኞችዎ ጋር በመሄድ ጨዋታዎን በደስታ ያካሂዱ።' }
]

// Mock Venues Data
const venues: Venue[] = [
  { id: 1, name: 'ይድነቃቸው ተሰማ ስታዲየም', city: 'አዲስ አበባ (Addis Ababa)', subCity: 'ቂርቆስ / ካዛንችስ / ሜክሲኮ', address: 'ለገሃር / መስቀል አደባባይ', sportType: 'football', price: '2500', rating: '4.8', image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=800' },
  { id: 2, name: 'አበበ ቢቂላ ስታዲየም', city: 'አዲስ አበባ (Addis Ababa)', subCity: 'አዲስ ከተማ (Addis Ketema)', address: 'ካሳንችስ / አዲስ ከተማ', sportType: 'athletics', price: '1800', rating: '4.6', image: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?q=80&w=800' },
  { id: 3, name: 'ጃንሜዳ ስፖርት ማዕከል', city: 'አዲስ አበባ (Addis Ababa)', subCity: 'አራዳ (Arada)', address: 'አራት ኪሎ / 6 ኪሎ', sportType: 'equestrian', price: '1000', rating: '4.7', image: 'https://images.unsplash.com/photo-1551958219-acbc608c6377?q=80&w=800' },
  { id: 4, name: 'አዲስ አበባ ጎልፍ ክለብ', city: 'አዲስ አበባ (Addis Ababa)', subCity: 'ቂርቆስ / ካዛንችስ / ሜክሲኮ', address: 'ሜክሲኮ / ለገሃር', sportType: 'golf', price: '3000', rating: '4.9', image: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?q=80&w=800' },
  { id: 5, name: 'አዲስ ስፖርት ፓርክ', city: 'አዲስ አበባ (Addis Ababa)', subCity: 'ቦሌ (Bole)', address: 'ቦሌ / አዲስ አበባ', sportType: 'swimming', price: '1200', rating: '4.8', image: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=800' },
  { id: 6, name: 'ባህር ዳር ዓለም አቀፍ ስታዲየም', city: 'ባህር ዳር (Bahir Dar)', subCity: '', address: 'ባህር ዳር ከተማ', sportType: 'football', price: '2000', rating: '4.9', image: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=800' },
  { id: 7, name: 'ሱሉልታ አትሌቲክስ ማዕከል', city: 'ሱሉልታ (Sululta)', subCity: '', address: 'ሱሉልታ', sportType: 'athletics', price: '1500', rating: '4.7', image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=800' }
]

// Filter Logic
const filteredVenues = computed(() => {
  return venues.filter(venue => {
    // 1. Text Search
    const query = searchQuery.value.trim().toLowerCase()
    const matchesSearch = query === '' || 
      venue.name.toLowerCase().includes(query) || 
      venue.address.toLowerCase().includes(query)

    // 2. City Filter
    const matchesCity = selectedCity.value === 'all' || venue.city === selectedCity.value

    // 3. Sub-City Filter (Only applied if Addis Ababa is selected)
    const matchesSubCity = selectedCity.value !== 'አዲስ አበባ (Addis Ababa)' || 
                           selectedSubCity.value === 'all' || 
                           venue.subCity === selectedSubCity.value

    // 4. Sport Filter
    const matchesSport = selectedSport.value === 'all' || venue.sportType === selectedSport.value

    return matchesSearch && matchesCity && matchesSubCity && matchesSport
  })
})
</script>