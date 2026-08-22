<template>
  <div class="min-h-screen bg-gray-100 dark:bg-gray-950 font-sans">
    
    <!-- 1. HERO SECTION -->
    <section class="bg-green-800 text-white pt-20 pb-32 px-4 relative">
      <div class="max-w-6xl mx-auto text-center">
        <h1 class="text-4xl md:text-6xl font-black mb-4">የስፖርት ሜዳዎችን ያግኙ</h1>
        <p class="text-green-100 text-lg">በመረጡት ከተማ እና የስፖርት አይነት ሜዳዎችን ይፈልጉ</p>
      </div>
    </section>

    <!-- 2. SEARCH BAR SECTION (ሙሉ በሙሉ የተስተካከለ) -->
    <div class="max-w-6xl mx-auto px-4 relative z-40 -mt-16">
      <div class="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800">
        
        <!-- Input Row -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          
         
          

          <!-- ከተማ መምረጫ -->
          <div class="flex flex-col">
            <label class="text-xs font-bold text-gray-500 mb-1 ml-1">ከተማ</label>
            <select 
              v-model="selectedCity"
              @change="handleCityChange"
              class="w-full p-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-green-500 outline-none text-black dark:text-white cursor-pointer"
            >
              <option value="all">ሁሉም ከተሞች</option>
              <option v-for="city in cities" :key="city" :value="city">{{ city }}</option>
            </select>
          </div>

          <!-- ክፍለ ከተማ (አዲስ አበባ ብቻ ሲመረጥ የሚመጣ) -->
          <div v-if="selectedCity === 'Addis Ababa'" class="flex flex-col animate-in fade-in slide-in-from-top-2 duration-300">
            <label class="text-xs font-bold text-green-600 mb-1 ml-1">ክፍለ ከተማ</label>
            <select 
              v-model="selectedSubCity"
              class="w-full p-3 bg-green-50 dark:bg-gray-800 border border-green-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-green-500 outline-none text-black dark:text-white cursor-pointer"
            >
              <option value="all">ሁሉም ክፍለ ከተሞች</option>
              <option v-for="subCity in subCities" :key="subCity" :value="subCity">{{ subCity }}</option>
            </select>
          </div>

          <!-- ስፖርት አይነት -->
          <div class="flex flex-col">
            <label class="text-xs font-bold text-gray-500 mb-1 ml-1">የስፖርት አይነት</label>
            <select 
              v-model="selectedSport"
              class="w-full p-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-green-500 outline-none text-black dark:text-white cursor-pointer"
            >
              <option value="all">ሁሉም ስፖርቶች</option>
              <option value="football">እግር ኳስ</option>
              <option value="basketball">ቅርጫት ኳስ</option>
              <option value="athletics">አትሌቲክስ</option>
            </select>
          </div>
           <!-- መፈለጊያ ቁልፍ -->
          
            
          <button 
          @click="executeSearch"
          class="w-full p-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-500 rounded-xl focus:ring-2 focus:ring-green-500 hover:bg-green-00 text-black font-bold rounded-xl shadow-lg transition-all active:scale-95 "
        >
          ሜዳዎችን ፈልግ
        </button>
      
        </div>

       
        
      </div>
    </div>

    <!-- 3. VENUES DISPLAY -->
    <section id="venues" class="max-w-6xl mx-auto px-4 py-20">
      <div v-if="filteredVenues.length > 0" class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div v-for="venue in filteredVenues" :key="venue.id" class="bg-white dark:bg-gray-900 rounded-3xl overflow-hidden shadow-md border border-gray-100 dark:border-gray-800">
          <img :src="venue.image" class="w-full h-48 object-cover" />
          <div class="p-6">
            <div class="text-xs font-bold text-green-600 uppercase mb-2">{{ venue.sportType }}</div>
            <h3 class="text-xl font-bold dark:text-white mb-2">{{ venue.name }}</h3>
            <p class="text-gray-500 text-sm mb-4">{{ venue.city }} {{ venue.subCity ? '- ' + venue.subCity : '' }}</p>
            <div class="flex justify-between items-center border-t pt-4">
              <span class="text-lg font-black text-gray-900 dark:text-white">{{ venue.price }} ብር</span>
              <button class="bg-gray-100 dark:bg-gray-800 p-2 px-4 rounded-lg font-bold dark:text-white">እይ</button>
            </div>
          </div>
        </div>
      </div>

      <!-- No Results -->
      <div v-else class="text-center py-20">
        <h3 class="text-2xl font-bold text-gray-400">ምንም ሜዳ አልተገኘም!</h3>
        <button @click="resetFilters" class="text-green-600 underline mt-4">ሁሉንም አሳይ</button>
      </div>
    </section>

  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

// የፍለጋ ተለዋዋጮች
const searchQuery = ref('')
const selectedCity = ref('all')
const selectedSubCity = ref('all')
const selectedSport = ref('all')

// ዳታዎች
const cities = ['Addis Ababa', 'Bahir Dar', 'Hawassa', 'Mekelle', 'Dire Dawa']
const subCities = ['Bole', 'Kirkos', 'Arada', 'Yeka', 'Lideta', 'Nifas Silk']

const venues = ref([
  { id: 1, name: 'ይድነቃቸው ተሰማ ስታዲየም', city: 'Addis Ababa', subCity: 'Kirkos', sportType: 'football', price: '2500', image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=500' },
  { id: 2, name: 'አበበ ቢቂላ ስታዲየም', city: 'Addis Ababa', subCity: 'Arada', sportType: 'athletics', price: '1800', image: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=500' },
  { id: 3, name: 'ባህር ዳር ስታዲየም', city: 'Bahir Dar', subCity: '', sportType: 'football', price: '2000', image: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=500' },
  { id: 4, name: 'ቦሌ አትላስ ሜዳ', city: 'Addis Ababa', subCity: 'Bole', sportType: 'basketball', price: '1000', image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=500' }
])

// ከተማ ሲቀየር
const handleCityChange = () => {
  selectedSubCity.value = 'all'
}

// ፊልተር ሎጂክ
const filteredVenues = computed(() => {
  return venues.value.filter(v => {
    const s = searchQuery.value.toLowerCase()
    const matchesName = v.name.toLowerCase().includes(s)
    const matchesCity = selectedCity.value === 'all' || v.city === selectedCity.value
    const matchesSub = selectedCity.value !== 'Addis Ababa' || selectedSubCity.value === 'all' || v.subCity === selectedSubCity.value
    const matchesSport = selectedSport.value === 'all' || v.sportType === selectedSport.value
    
    return matchesName && matchesCity && matchesSub && matchesSport
  })
})

const resetFilters = () => {
  searchQuery.value = ''
  selectedCity.value = 'all'
  selectedSubCity.value = 'all'
  selectedSport.value = 'all'
}

const executeSearch = () => {
  document.getElementById('venues')?.scrollIntoView({ behavior: 'smooth' })
}
</script>