<template>
  <!-- font-['Noto_Sans_Ethiopic',sans-serif] በመጠቀም ፎንቱን በ Tailwind ብቻ አድርገነዋል -->
  <nav class="font-['Noto_Sans_Ethiopic',sans-serif] bg-white dark:bg-gray-900 shadow-md fixed top-0 left-0 right-0 z-[100] border-b dark:border-gray-800 transition-colors duration-300">
    <div class="max-w-7xl mx-auto px-4">
      <div class="flex justify-between items-center h-16">
        
        <!-- 1. ሎጎ (Logo) -->
        <NuxtLink to="/" class="flex items-center flex-shrink-0 group">
          <span class="text-2xl md:text-3xl font-black text-gray-900 dark:text-white tracking-tighter uppercase transition-transform group-hover:scale-105 duration-300">
            ETHIO<span class="text-green-600">SPORT</span>
          </span>
        </NuxtLink>

        <!-- 2. የዴስክቶፕ ሜኑ (Nav Links) -->
        <div class="hidden lg:flex items-center gap-1">
          <NuxtLink v-for="item in navItems" :key="item.path" :to="item.path" 
            class="px-3 py-2 rounded-lg text-sm font-bold transition-all duration-200"
            :class="route.path === item.path 
              ? 'bg-green-50 dark:bg-green-900/20 text-green-600' 
              : 'text-gray-600 dark:text-gray-400 hover:text-green-600 hover:bg-gray-50 dark:hover:bg-gray-800'">
            {{ currentLang === 'am' ? item.am : item.en }}
          </NuxtLink>
        </div>

        <!-- 3. የቀኝ በኩል አዝራሮች (Auth + Settings) -->
        <div class="flex items-center gap-1 sm:gap-3">
          
          <!-- የቋንቋ መቀያየሪያ -->
          <button @click="toggleLang" 
            class="flex items-center gap-2 px-3 py-2 bg-gray-50 dark:bg-gray-800 rounded-xl text-xs font-black text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-700 hover:border-green-500 transition-all active:scale-95">
            <Icon name="lucide:languages" class="w-4 h-4 text-green-600" />
            <span class="w-5 text-center">{{ currentLang === 'am' ? 'EN' : 'አማ' }}</span>
          </button>

          <!-- የጨለማ ሁነታ -->
          <button @click="toggleTheme" 
            class="p-2.5 bg-gray-50 dark:bg-gray-800 rounded-xl text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:text-green-600 transition-all">
            <Icon :name="isDark ? 'lucide:sun' : 'lucide:moon'" class="w-4 h-4" />
          </button>

          <!-- Login/Signup (ዴስክቶፕ) -->
          <div class="hidden md:flex items-center gap-2 ml-2 border-l border-gray-200 dark:border-gray-700 pl-4">
            <NuxtLink to="/login" class="text-sm font-black text-gray-600 dark:text-gray-300 hover:text-green-600 transition">
              {{ t.login }}
            </NuxtLink>
            <NuxtLink to="/signup" class="bg-green-600 hover:bg-green-700 text-white text-xs font-black px-5 py-2.5 rounded-xl transition shadow-lg shadow-green-600/20 active:scale-95">
              {{ t.signup }}
            </NuxtLink>
          </div>

          <!-- የሞባይል ሜኑ መክፈቻ (hamburger) -->
          <button @click="isOpen = !isOpen" class="lg:hidden p-2.5 bg-gray-50 dark:bg-gray-800 rounded-xl text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700">
            <div class="w-6 h-5 flex flex-col justify-between overflow-hidden">
              <span class="w-full h-0.5 bg-current transition-all duration-300 origin-left" :class="{'rotate-45 translate-x-1': isOpen}"></span>
              <span class="w-full h-0.5 bg-current transition-all duration-300" :class="{'translate-x-10 opacity-0': isOpen}"></span>
              <span class="w-full h-0.5 bg-current transition-all duration-300 origin-left" :class="{'-rotate-45 translate-x-1': isOpen}"></span>
            </div>
          </button>
        </div>
      </div>
    </div>

    <!-- 4. የሞባይል ድሮፕዳውን ሜኑ -->
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="transform -translate-y-10 opacity-0"
      enter-to-class="transform translate-y-0 opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="transform translate-y-0 opacity-100"
      leave-to-class="transform -translate-y-10 opacity-0"
    >
      <div v-if="isOpen" class="lg:hidden absolute top-16 left-0 w-full bg-white dark:bg-gray-900 border-t dark:border-gray-800 shadow-2xl p-4 flex flex-col gap-2 overflow-y-auto max-h-[calc(100vh-4rem)]">
        
        <!-- Auth Buttons for Mobile -->
        <div class="grid grid-cols-2 gap-3 pb-4 mb-2 border-b dark:border-gray-800">
          <NuxtLink to="/login" @click="isOpen = false" class="flex items-center justify-center py-3 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white rounded-xl font-black text-sm">
            {{ t.login }}
          </NuxtLink>
          <NuxtLink to="/signup" @click="isOpen = false" class="flex items-center justify-center py-3 bg-green-600 text-white rounded-xl font-black text-sm shadow-lg shadow-green-600/20">
            {{ t.signup }}
          </NuxtLink>
        </div>

        <!-- Nav Links -->
        <NuxtLink 
          v-for="item in navItems" 
          :key="item.path"
          :to="item.path"
          @click="isOpen = false"
          class="p-4 rounded-2xl flex items-center gap-4 transition-all"
          :class="route.path === item.path 
            ? 'bg-green-50 dark:bg-green-900/30 text-green-600' 
            : 'text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800'"
        >
          <Icon :name="item.icon" class="w-6 h-6" :class="route.path === item.path ? 'text-green-600' : 'text-gray-400'" />
          <span class="font-black text-base">{{ currentLang === 'am' ? item.am : item.en }}</span>
        </NuxtLink>
      </div>
    </Transition>
  </nav>
  
  <div class="h-16"></div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'

// የጉግል ፎንትን በ Nuxt head ውስጥ እናስገባዋለን (ከ <style> ይልቅ)
useHead({
  link: [
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Noto+Sans+Ethiopic:wght@100..900&display=swap'
    }
  ]
})

const route = useRoute()
const isDark = ref(false)
const isOpen = ref(false)

// --- የቋንቋ Logic ---
const currentLang = useState('locale', () => 'am')

// --- የቋንቋ መዝገብ (Translations) ---
const translations = {
  am: {
    login: 'ይግቡ',
    signup: 'ይመዝገቡ',
  },
  en: {
    login: 'Login',
    signup: 'Sign Up',
  }
}

// አሁን ያለውን ቋንቋ መዝገብ የሚመልስ computed
const t = computed(() => translations[currentLang.value])

const navItems = [
  { path: '/', am: 'መነሻ', en: 'Home', icon: 'lucide:home' },
  { path: '/games', am: 'ጨዋታዎች', en: 'Games', icon: 'lucide:gamepad-2' },
  { path: '/venues', am: 'ሜዳዎች', en: 'Venues', icon: 'lucide:stadium' },
  { path: '/events', am: 'ክስተቶች', en: 'Events', icon: 'lucide:calendar' },
  { path: '/blogs', am: 'ብሎጎች', en: 'Blogs', icon: 'lucide:newspaper' },
  { path: '/justplay', am: 'ፈጣን ጨዋታ', en: 'JustPlay', icon: 'lucide:play-circle' },
  { path: '/contact', am: 'አግኙን', en: 'Contact', icon: 'lucide:phone' }
]

const toggleTheme = () => {
  isDark.value = !isDark.value
  document.documentElement.classList.toggle('dark', isDark.value)
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
}

const toggleLang = () => {
  currentLang.value = currentLang.value === 'am' ? 'en' : 'am'
  localStorage.setItem('locale', currentLang.value)
}

onMounted(() => {
  // ቋንቋን ከማህደረ ትውስታ መመለስ
  const savedLocale = localStorage.getItem('locale')
  if (savedLocale) currentLang.value = savedLocale

  // ጭብጥን (Theme) ከማህደረ ትውስታ መመለስ
  const savedTheme = localStorage.getItem('theme')
  if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    isDark.value = true
    document.documentElement.classList.add('dark')
  }
})

watch(() => route.path, () => {
  isOpen.value = false
})
</script>
<!-- ምንም አይነት <style> ታግ አያስፈልግም! ፎንቱ በ Tailwind እና useHead ተሰርቷል -->