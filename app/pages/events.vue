<script setup>
import { ref, computed } from 'vue'

// SEO Page Title
useHead({ title: 'Events - EthioSport' })

// Navigation Links
const navLinks = [
 
]

// State variables
const searchQuery = ref('')
const selectedCategory = ref('All')
const isModalOpen = ref(false)
const selectedEvent = ref(null)

// Registration Form State
const registrationForm = ref({
  fullName: '',
  phone: '',
  teamName: ''
})

// Sample Events Data
const events = ref([
  {
    id: 1,
    title: 'አዲስ ፉትሳል ሻምፒዮንሽፕ 2026',
    category: 'Football',
    date: 'ነሐሴ 15 - ነሐሴ 20',
    location: 'አዲስ አበባ ስታዲየም',
    price: '2000 ETB / ቡድን',
    type: 'Team Registration',
    image: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 2,
    title: 'የበጋ ቴኒስ ውድድር',
    category: 'Tennis',
    date: 'ጳጉሜ 01 - 03',
    location: 'ቦሌ አሬና',
    price: '500 ETB / ሰው',
    type: 'Ticket',
    image: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 3,
    title: 'የቅርጫት ኳስ ኦፕን ውድድር',
    category: 'Basketball',
    date: 'መስከረም 10 - 12',
    location: 'ሲኤምሲ ስፖርት ኮምፕሌክስ',
    price: '1500 ETB / ቡድን',
    type: 'Team Registration',
    image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=600&auto=format&fit=crop'
  }
])

// Open Modal for specific event
const openRegisterModal = (evt) => {
  selectedEvent.value = evt
  isModalOpen.value = true
}

// Handle registration submit
const handleRegister = () => {
  alert(`በተካሄደው ምዝገባ እናመሰግናለን! ለ ${selectedEvent.value.title} ምዝገባዎ ተቀባይነት አግኝቷል።`)
  isModalOpen.value = false
  registrationForm.value = { fullName: '', phone: '', teamName: '' }
}

// Dynamic Filter
const filteredEvents = computed(() => {
  return events.value.filter(evt => {
    const matchesCategory = selectedCategory.value === 'All' || evt.category === selectedCategory.value
    const matchesSearch = evt.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                          evt.location.toLowerCase().includes(searchQuery.value.toLowerCase())
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
      
      <!-- Featured Banner -->
      <div class="relative rounded-3xl overflow-hidden bg-slate-900 text-white p-8 md:p-12 flex flex-col justify-end min-h-[340px] shadow-xl border border-slate-800">
        <img src="https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=1200&auto=format&fit=crop" class="absolute inset-0 w-full h-full object-cover opacity-35" />
        <div class="relative z-10 max-w-xl space-y-4">
          <span class="px-3.5 py-1.5 bg-emerald-500 text-slate-950 font-extrabold text-xs rounded-lg uppercase tracking-wider inline-block">
            Featured League
          </span>
          <h1 class="text-3xl md:text-5xl font-black leading-tight">ታላቁ የኮርፖሬት ፉትሳል ሊግ</h1>
          <p class="text-xs md:text-sm text-slate-300 leading-relaxed">
            የድርጅቶች እና ተቋማት ታላቅ የፉትሳል ውድድር። አሁኑኑ ቡድንዎን ያስመዝግቡና የዋንጫው ተፎካካሪ ይሁኑ!
          </p>
          <button 
            @click="openRegisterModal({ title: 'ታላቁ የኮርፖሬት ፉትሳል ሊግ', price: '3500 ETB / ቡድን', type: 'Team Registration' })"
            class="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs sm:text-sm rounded-xl shadow-lg transition cursor-pointer"
          >
            ቡድንዎን አሁኑኑ ያስመዝግቡ &rarr;
          </button>
        </div>
      </div>

      <!-- Search and Filter Bar -->
      <div class="flex flex-col md:flex-row gap-4 items-center justify-between bg-white dark:bg-[#131c27] p-4 rounded-2xl border border-slate-200 dark:border-[#212e3e]">
        
        <!-- Category Tabs -->
        <div class="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
          <button 
            v-for="cat in ['All', 'Football', 'Tennis', 'Basketball']" 
            :key="cat"
            @click="selectedCategory = cat"
            :class="[
              'px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer',
              selectedCategory === cat 
                ? 'bg-emerald-500 text-slate-950 shadow-md' 
                : 'bg-slate-100 dark:bg-[#0b111a] text-slate-600 dark:text-slate-400 hover:text-white'
            ]"
          >
            {{ cat === 'All' ? 'ሁሉም ውድድሮች' : cat }}
          </button>
        </div>

        <!-- Search Input -->
        <div class="w-full md:w-72">
          <input 
            v-model="searchQuery" 
            type="text" 
            placeholder="ውድድር ወይም ቦታ ፈልግ..." 
            class="w-full px-4 py-2 rounded-xl bg-slate-50 dark:bg-[#0b111a] border border-slate-200 dark:border-[#212e3e] text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
      </div>

      <!-- Events Grid Section -->
      <div class="space-y-4">
        <h2 class="text-xl font-black text-slate-900 dark:text-white">የሚመጡ ውድድሮች (Upcoming Events)</h2>
        
        <!-- Empty State -->
        <div v-if="filteredEvents.length === 0" class="text-center py-12 bg-white dark:bg-[#131c27] rounded-2xl border border-slate-200 dark:border-[#212e3e]">
          <span class="text-3xl">🏆</span>
          <p class="text-xs text-slate-500 mt-2">ምንም የተገኘ ውድድር የለም።</p>
        </div>

        <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div 
            v-for="evt in filteredEvents" 
            :key="evt.id" 
            class="bg-white dark:bg-[#131c27] rounded-2xl overflow-hidden border border-slate-200 dark:border-[#212e3e] flex flex-col sm:flex-row hover:shadow-lg transition"
          >
            <img :src="evt.image" :alt="evt.title" class="w-full sm:w-48 h-48 sm:h-auto object-cover" />
            
            <div class="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div class="space-y-2">
                <span class="text-[10px] font-bold text-emerald-500 bg-emerald-500/10 px-2.5 py-1 rounded-md uppercase">
                  {{ evt.category }}
                </span>
                <h3 class="font-black text-base text-slate-900 dark:text-white leading-snug">{{ evt.title }}</h3>
                <div class="text-xs text-slate-500 dark:text-slate-400 space-y-1">
                  <p>📅 {{ evt.date }}</p>
                  <p>📍 {{ evt.location }}</p>
                </div>
                <p class="text-xs font-bold text-emerald-500 pt-1">ዋጋ: {{ evt.price }}</p>
              </div>

              <button 
                @click="openRegisterModal(evt)"
                class="w-full py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs rounded-xl shadow-md transition cursor-pointer"
              >
                {{ evt.type === 'Team Registration' ? 'ቡድን ያስመዝግቡ' : 'ትኬት ይግዙ' }} &rarr;
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Registration Modal Window -->
      <div v-if="isModalOpen" class="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
        <div class="bg-white dark:bg-[#131c27] max-w-md w-full p-6 rounded-2xl border border-slate-200 dark:border-[#212e3e] space-y-6 shadow-2xl">
          <div class="flex justify-between items-center pb-3 border-b border-slate-100 dark:border-[#212e3e]">
            <div>
              <h3 class="font-black text-base text-slate-900 dark:text-white">የውድድር ምዝገባ</h3>
              <p class="text-xs text-emerald-500 font-semibold mt-0.5">{{ selectedEvent?.title }}</p>
            </div>
            <button @click="isModalOpen = false" class="text-slate-400 hover:text-white text-lg">✕</button>
          </div>

          <form @submit.prevent="handleRegister" class="space-y-4 text-xs font-semibold">
            <div>
              <label class="block mb-1 text-slate-700 dark:text-slate-300">ሙሉ ስም</label>
              <input 
                v-model="registrationForm.fullName" 
                type="text" 
                required
                placeholder="ስምዎን ያስገቡ" 
                class="w-full p-3 rounded-xl bg-slate-50 dark:bg-[#0b111a] border border-slate-200 dark:border-[#212e3e] text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500" 
              />
            </div>

            <div>
              <label class="block mb-1 text-slate-700 dark:text-slate-300">ስልክ ቁጥር</label>
              <input 
                v-model="registrationForm.phone" 
                type="tel" 
                required
                placeholder="09..." 
                class="w-full p-3 rounded-xl bg-slate-50 dark:bg-[#0b111a] border border-slate-200 dark:border-[#212e3e] text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500" 
              />
            </div>

            <div v-if="selectedEvent?.type === 'Team Registration'">
              <label class="block mb-1 text-slate-700 dark:text-slate-300">የቡድን ስም</label>
              <input 
                v-model="registrationForm.teamName" 
                type="text" 
                required
                placeholder="የቡድንዎን ስም ያስገቡ" 
                class="w-full p-3 rounded-xl bg-slate-50 dark:bg-[#0b111a] border border-slate-200 dark:border-[#212e3e] text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500" 
              />
            </div>

            <div class="bg-slate-50 dark:bg-[#0b111a] p-3 rounded-xl border border-slate-100 dark:border-[#212e3e] flex justify-between items-center">
              <span class="text-slate-500">የክፍያ መጠን:</span>
              <span class="font-extrabold text-emerald-500 text-sm">{{ selectedEvent?.price }}</span>
            </div>

            <div class="flex justify-end gap-3 pt-2">
              <button 
                type="button" 
                @click="isModalOpen = false"
                class="px-4 py-2.5 bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl font-bold cursor-pointer"
              >
                ሰርዝ
              </button>
              <button 
                type="submit" 
                class="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl shadow-md cursor-pointer"
              >
                ምዝገባውን አረጋግጥ
              </button>
            </div>
          </form>
        </div>
      </div>

    </div>
  </div>
</template>