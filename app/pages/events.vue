<script setup>
import { ref, computed } from 'vue'

// SEO Page Title
useHead({ title: 'Events - EthioSport' })

// State variables
const searchQuery = ref('')
const selectedSportCategory = ref('All')
const selectedStatusCategory = ref('All')
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
    status: 'Upcoming',
    statusLabel: 'የሚመጣ',
    date: 'ነሐሴ 15 - ነሐሴ 20',
    location: 'አዲስ አበባ ስታዲየም',
    price: '2000 ETB / ቡድን',
    type: 'Team Registration',
    image: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 2,
    title: 'የበጋ ቴኒስ ኦፕን ውድድር',
    category: 'Tennis',
    status: 'Ongoing',
    statusLabel: 'በመካሄድ ላይ',
    date: 'ነሐሴ 01 - ነሐሴ 10',
    location: 'ቦሌ አሬና',
    price: '500 ETB / ሰው',
    type: 'Ticket',
    image: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 3,
    title: 'የቅርጫት ኳስ ኦፕን ውድድር',
    category: 'Basketball',
    status: 'Upcoming',
    statusLabel: 'የሚመጣ',
    date: 'መስከረም 10 - 12',
    location: 'ሲኤምሲ ስፖርት ኮምፕሌክስ',
    price: '1500 ETB / ቡድን',
    type: 'Team Registration',
    image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 4,
    title: 'የኢትዮጵያ አትሌቲክስ አፕሬንቲስሺፕ',
    category: 'Athletics',
    status: 'Completed',
    statusLabel: 'የተጠናቀቀ',
    date: 'ሐምሌ 20 - ሐምሌ 25',
    location: 'ሱሉልታ አትሌቲክስ ማዕከል',
    price: 'የተጠናቀቀ',
    type: 'Closed',
    image: 'https://images.unsplash.com/photo-1530541930197-ff16ac917b0e?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 5,
    title: 'የመገናኛ ፉትሳል ኖክ-አውት ውድድር',
    category: 'Football',
    status: 'Ongoing',
    statusLabel: 'በመካሄድ ላይ',
    date: 'ነሐሴ 04 - ነሐሴ 08',
    location: 'መገናኛ ፉትሳል ሜዳ',
    price: '1000 ETB / ቡድን',
    type: 'Team Registration',
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 6,
    title: 'የክበባት መረብ ኳስ ውድድር 2025',
    category: 'Volleyball',
    status: 'Completed',
    statusLabel: 'የተጠናቀቀ',
    date: 'ሰኔ 12 - ሰኔ 15',
    location: 'አዲስ አበባ የቤት ውስጥ ስታዲየም',
    price: 'የተጠናቀቀ',
    type: 'Closed',
    image: 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?q=80&w=600&auto=format&fit=crop'
  }
])

// Modal controls
const openRegisterModal = (evt) => {
  if (evt.status === 'Completed') return
  selectedEvent.value = evt
  isModalOpen.value = true
}

const handleRegister = () => {
  alert(`በተካሄደው ምዝገባ እናመሰግናለን! ለ ${selectedEvent.value.title} ምዝገባዎ ተቀባይነት አግኝቷል።`)
  isModalOpen.value = false
  registrationForm.value = { fullName: '', phone: '', teamName: '' }
}

// Filter logic
const filteredEvents = computed(() => {
  return events.value.filter(evt => {
    const matchesStatus = selectedStatusCategory.value === 'All' || evt.status === selectedStatusCategory.value
    const matchesSport = selectedSportCategory.value === 'All' || evt.category === selectedSportCategory.value
    const matchesSearch = evt.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                          evt.location.toLowerCase().includes(searchQuery.value.toLowerCase())
    
    return matchesStatus && matchesSport && matchesSearch
  })
})
</script>

<template>
  <div class="min-h-screen bg-slate-50 dark:bg-[#070b10] text-slate-800 dark:text-slate-100 font-sans pb-16">

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
            @click="openRegisterModal({ title: 'ታላቁ የኮርፖሬት ፉትሳል ሊግ', price: '3500 ETB / ቡድን', type: 'Team Registration', status: 'Upcoming' })"
            class="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs sm:text-sm rounded-xl shadow-lg transition cursor-pointer"
          >
            ቡድንዎን አሁኑኑ ያስመዝግቡ &rarr;
          </button>
        </div>
      </div>

      <!-- STATUS & SPORT CATEGORY FILTERS -->
      <div class="bg-white dark:bg-[#131c27] p-4 rounded-2xl border border-slate-200 dark:border-[#212e3e] space-y-4">
        
        <!-- Status Filter Tabs -->
        <div class="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-100 dark:border-[#212e3e]">
          <span class="text-xs font-bold text-slate-400 mr-2 flex-shrink-0">ሁኔታ:</span>
          <button 
            v-for="st in [
              { key: 'All', label: 'ሁሉም (All Events)' },
              { key: 'Upcoming', label: '📅 የሚመጡ (Upcoming)' },
              { key: 'Ongoing', label: '🔥 በመካሄድ ላይ (Ongoing)' },
              { key: 'Completed', label: '✅ የተጠናቀቁ (Completed)' }
            ]" 
            :key="st.key"
            @click="selectedStatusCategory = st.key"
            :class="[
              'px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer',
              selectedStatusCategory === st.key 
                ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-950 shadow-md' 
                : 'bg-slate-100 dark:bg-[#0b111a] text-slate-600 dark:text-slate-400 hover:text-emerald-500'
            ]"
          >
            {{ st.label }}
          </button>
        </div>

        <!-- Sport Category Tabs & Search Input -->
        <div class="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div class="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
            <span class="text-xs font-bold text-slate-400 mr-1 flex-shrink-0">ስፖርት:</span>
            <button 
              v-for="cat in ['All', 'Football', 'Tennis', 'Basketball', 'Athletics', 'Volleyball']" 
              :key="cat"
              @click="selectedSportCategory = cat"
              :class="[
                'px-3 py-1.5 rounded-lg text-xs font-bold transition whitespace-nowrap cursor-pointer',
                selectedSportCategory === cat 
                  ? 'bg-emerald-500 text-slate-950 shadow-md' 
                  : 'bg-slate-100 dark:bg-[#0b111a] text-slate-600 dark:text-slate-400 hover:text-white'
              ]"
            >
              {{ cat === 'All' ? 'ሁሉም' : cat }}
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

      </div>

      <!-- Events Grid Section -->
      <div class="space-y-4">
        <div class="flex justify-between items-center">
          <h2 class="text-xl font-black text-slate-900 dark:text-white">የውድድሮች ዝርዝር</h2>
          <span class="text-xs font-bold text-slate-400">{{ filteredEvents.length }} ውድድሮች ተገኝተዋል</span>
        </div>
        
        <!-- Empty State -->
        <div v-if="filteredEvents.length === 0" class="text-center py-12 bg-white dark:bg-[#131c27] rounded-2xl border border-slate-200 dark:border-[#212e3e]">
          <span class="text-3xl">🏆</span>
          <p class="text-xs text-slate-500 mt-2">በተመረጠው መስፈርት የተገኘ ውድድር የለም።</p>
        </div>

        <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div 
            v-for="evt in filteredEvents" 
            :key="evt.id" 
            class="bg-white dark:bg-[#131c27] rounded-2xl overflow-hidden border border-slate-200 dark:border-[#212e3e] flex flex-col sm:flex-row hover:shadow-lg transition relative"
          >
            <div class="relative w-full sm:w-48 h-48 sm:h-auto flex-shrink-0">
              <img :src="evt.image" :alt="evt.title" class="w-full h-full object-cover" />
              
              <span 
                :class="[
                  'absolute top-3 left-3 px-2.5 py-1 rounded-md text-[10px] font-extrabold uppercase tracking-wide backdrop-blur-md shadow-md',
                  evt.status === 'Upcoming' ? 'bg-emerald-500 text-slate-950' : '',
                  evt.status === 'Ongoing' ? 'bg-amber-400 text-slate-950 animate-pulse' : '',
                  evt.status === 'Completed' ? 'bg-slate-800 text-slate-300' : ''
                ]"
              >
                {{ evt.statusLabel }}
              </span>
            </div>
            
            <div class="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div class="space-y-2">
                <span class="text-[10px] font-bold text-emerald-500 bg-emerald-500/10 px-2.5 py-1 rounded-md uppercase">
                  {{ evt.category }}
                </span>
                <h3 class="font-black text-base text-slate-900 dark:text-white leading-snug mt-1">{{ evt.title }}</h3>
                <div class="text-xs text-slate-500 dark:text-slate-400 space-y-1">
                  <p>📅 {{ evt.date }}</p>
                  <p>📍 {{ evt.location }}</p>
                </div>
                <p class="text-xs font-bold text-emerald-500 pt-1">ዋጋ: {{ evt.price }}</p>
              </div>

              <button 
                @click="openRegisterModal(evt)"
                :disabled="evt.status === 'Completed'"
                :class="[
                  'w-full py-2.5 font-extrabold text-xs rounded-xl shadow-md transition flex items-center justify-center gap-1',
                  evt.status === 'Completed' 
                    ? 'bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed shadow-none' 
                    : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 cursor-pointer'
                ]"
              >
                <template v-if="evt.status === 'Completed'">
                  <span>ውድድሩ ተጠናቋል</span>
                </template>
                <template v-else-if="evt.status === 'Ongoing'">
                  <span>{{ evt.type === 'Team Registration' ? 'ተቀላቀል / ተመዝገብ' : 'ትኬት ይግዙ' }} &rarr;</span>
                </template>
                <template v-else>
                  <span>{{ evt.type === 'Team Registration' ? 'ቡድን ያስመዝግቡ' : 'ትኬት ይግዙ' }} &rarr;</span>
                </template>
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