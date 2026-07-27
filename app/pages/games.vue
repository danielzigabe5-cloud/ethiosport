<template>
  <div class="min-h-screen bg-slate-950 py-12 px-6">
    <div class="max-w-6xl mx-auto space-y-8">
      
      <!-- Header -->
      <div class="text-center md:text-left">
        <h1 class="text-3xl font-bold text-white mb-2">🏆 ስፖርቶች እና መጫወቻ ሜዳዎች</h1>
        <p class="text-slate-400 font-light">የሚፈልጉትን ስፖርት እና ከተማ በመምረጥ ዝርዝር መረጃ ያግኙ</p>
      </div>

      <!-- Selectors Row -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        <!-- 1. ስፖርት መምረጫ (All Sports) -->
        <div class="relative">
          <label class="block text-xs text-emerald-500 uppercase tracking-widest mb-2 font-bold">ስፖርት ይምረጡ</label>
          <div @click="toggleDropdown('sport')" 
               class="bg-slate-900 border border-slate-800 text-white rounded-xl px-5 py-4 flex justify-between items-center cursor-pointer hover:border-emerald-500 transition shadow-xl">
            <span class="flex items-center gap-3 font-semibold">
              <span class="text-xl">{{ selectedSport.icon }}</span> {{ selectedSport.name }}
            </span>
            <svg class="w-4 h-4 text-slate-500 transition" :class="{'rotate-180': dropdowns.sport}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </div>
          <div v-if="dropdowns.sport" class="absolute z-50 w-full mt-2 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl max-h-80 overflow-y-auto overflow-hidden">
            <div v-for="sport in sportsData" :key="sport.id" @click="selectSport(sport)" class="px-5 py-3 hover:bg-slate-800 text-slate-300 cursor-pointer flex items-center gap-3 border-b border-slate-800/50">
              <span class="text-xl">{{ sport.icon }}</span> {{ sport.name }}
            </div>
          </div>
        </div>

        <!-- 2. ከተማ መምረጫ (All Cities) -->
        <div class="relative">
          <label class="block text-xs text-emerald-500 uppercase tracking-widest mb-2 font-bold">ከተማ ይምረጡ</label>
          <div @click="toggleDropdown('city')" 
               class="bg-slate-900 border border-slate-800 text-white rounded-xl px-5 py-4 flex justify-between items-center cursor-pointer hover:border-emerald-500 transition shadow-xl">
            <span class="font-semibold">📍 {{ selectedCity.name }}</span>
            <svg class="w-4 h-4 text-slate-500 transition" :class="{'rotate-180': dropdowns.city}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </div>
          <div v-if="dropdowns.city" class="absolute z-50 w-full mt-2 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl max-h-60 overflow-y-auto overflow-hidden">
            <div v-for="city in citiesData" :key="city.name" @click="selectCity(city)" class="px-5 py-3 hover:bg-slate-800 text-slate-300 cursor-pointer border-b border-slate-800/50">
              {{ city.name }}
            </div>
          </div>
        </div>

        <!-- 3. ክፍለ ከተማ መምረጫ (Sub-City Dropdown) -->
        <div class="relative">
          <label class="block text-xs text-emerald-500 uppercase tracking-widest mb-2 font-bold">ክፍለ ከተማ / አካባቢ</label>
          <div @click="toggleDropdown('subCity')" 
               class="bg-slate-900 border border-slate-800 text-white rounded-xl px-5 py-4 flex justify-between items-center cursor-pointer hover:border-emerald-500 transition shadow-xl">
            <span class="font-semibold">🏢 {{ selectedSubCity }}</span>
            <svg class="w-4 h-4 text-slate-500 transition" :class="{'rotate-180': dropdowns.subCity}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </div>
          <div v-if="dropdowns.subCity" class="absolute z-50 w-full mt-2 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl max-h-60 overflow-y-auto overflow-hidden">
            <div v-for="sub in selectedCity.subCities" :key="sub" @click="selectSubCity(sub)" class="px-5 py-3 hover:bg-slate-800 text-slate-300 cursor-pointer border-b border-slate-800/50">
              {{ sub }}
            </div>
          </div>
        </div>

      </div>

      <!-- Information Display Card -->
      <Transition name="slide-up" mode="out-in">
        <div :key="selectedSport.id" class="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-6">
          
          <!-- Detailed Info Section -->
          <div class="lg:col-span-2 space-y-6">
            <div class="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-lg">
              <div class="flex items-center gap-5 mb-8 pb-6 border-b border-slate-800">
                <span class="text-5xl p-4 bg-slate-950 rounded-2xl border border-slate-800 shadow-inner">{{ selectedSport.icon }}</span>
                <div>
                  <h2 class="text-3xl font-bold text-white">{{ selectedSport.name }}</h2>
                  <p class="text-emerald-500 font-medium">📍 {{ selectedCity.name }}፣ {{ selectedSubCity }}</p>
                </div>
              </div>
              
              <div class="space-y-8">
                <!-- Status/Game -->
                <div class="space-y-3">
                  <h4 class="text-emerald-400 font-bold text-xs uppercase tracking-widest flex items-center gap-2">
                    <span class="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span> ጨዋታው እና ሁኔታው
                  </h4>
                  <p class="text-slate-300 leading-relaxed text-sm md:text-base">{{ selectedSport.game }}</p>
                </div>

                <!-- Location -->
                <div class="space-y-3">
                  <h4 class="text-emerald-400 font-bold text-xs uppercase tracking-widest flex items-center gap-2">
                    🏛️ የመጫወቻ ቦታ እና ሜዳ
                  </h4>
                  <p class="text-slate-300 text-sm md:text-base">{{ selectedSport.location }}</p>
                </div>

                <!-- Business -->
                <div class="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-3">
                  <h4 class="text-emerald-400 font-bold text-xs uppercase tracking-widest">💼 የቢዝነስ ዕድል</h4>
                  <p class="text-slate-400 text-sm">{{ selectedSport.business }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Sidebar Actions -->
          <div class="space-y-6">
            <div class="bg-emerald-600 rounded-3xl p-8 text-white shadow-xl shadow-emerald-900/20 relative overflow-hidden group">
              <div class="relative z-10">
                <h3 class="text-xl font-bold mb-3 italic">Just Play!</h3>
                <p class="text-emerald-100 text-sm mb-6">በአቅራቢያዎ ያሉ የ{{ selectedSport.name }} አፍቃሪዎችን ተቀላቀሉ።</p>
                <NuxtLink to="/justplay" class="block w-full bg-white text-emerald-600 text-center font-bold py-3 rounded-xl hover:scale-105 transition shadow-lg">ቡድን ፈልግ</NuxtLink>
              </div>
              <span class="absolute -right-4 -bottom-4 text-8xl opacity-10 group-hover:scale-110 transition">{{ selectedSport.icon }}</span>
            </div>

            <div class="bg-slate-900 border border-slate-800 rounded-3xl p-8">
              <h3 class="text-white font-bold mb-3">ሜዳ ያስይዙ</h3>
              <p class="text-slate-400 text-sm mb-6">ምርጥ የ{{ selectedSport.name }} ሜዳዎችን በሰዓት ያስይዙ።</p>
              <NuxtLink to="/booking" class="block w-full bg-slate-800 text-white text-center font-bold py-3 rounded-xl hover:bg-slate-700 transition">ሜዳ ተመልከት</NuxtLink>
            </div>
          </div>

        </div>
      </Transition>

    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

// Dropdown States
const dropdowns = reactive({
  sport: false,
  city: false,
  subCity: false
})

const toggleDropdown = (key) => {
  Object.keys(dropdowns).forEach(k => {
    if (k === key) dropdowns[k] = !dropdowns[k]
    else dropdowns[k] = false
  })
}

// Data
const sportsData = [
  { id: 1, name: 'እግር ኳስ (Football)', icon: '⚽', location: 'የሳር ሜዳዎች፣ የሲንቴቲክ (Artificial turf) እና ክፍት የወጣቶች ሜዳዎች።', game: 'በኢትዮጵያ በብዛት ሜዳ እና ትኩረት የሚሰጠው የመጀመሪያው ስፖርት ነው። ጨዋታው በሁለት ቡድኖች (ከ5v5 እስከ 11v11) መካከል ይደረጋል።', business: 'የሜዳ ኪራይ (ProGrass/Turf)፣ የውድድር አዘጋጅነት (Corporate Tournaments)፣ አካዳሚዎች እና የአልባሳት ሽያጭ።' },
  { id: 2, name: 'ቅርጫት ኳስ (Basketball)', icon: '🏀', location: 'የሲሚንቶ ወይም የእንጨት (Indoor/Outdoor) ሜዳዎች።', game: 'የተለየ ሜዳ (Court) የሚፈልግ እና ለቡድን መዝናኛ ተወዳጅ ነው። 5v5 መደበኛ ወይም 3v3 (በአሁኑ ሰዓት በጣም ተወዳጅ) ጨዋታዎች ይደረጋሉ።', business: 'የኮርት ኪራይ፣ የ3v3 ውድድሮች እና የስልጠና አካዳሚዎች።' },
  { id: 3, name: 'መረብ ኳስ (Volleyball)', icon: '🏐', location: 'የአሸዋ ሜዳ (Beach) ወይም የሲሚንቶ/አፈር ሜዳ።', game: 'አነስተኛ ቦታ የሚይዝ ነገር ግን ብዙ ሰዎችን የሚያሳትፍ ነው። 6v6 መደበኛ ወይም በሪዞርቶች አካባቢ Beach Volleyball ይካሄዳል።', business: 'ለሪዞርቶች ደንበኞችን መሳቢያ እና የድርጅቶች ውድድር ማዘጋጀት።' },
  { id: 4, name: 'ቴኒስ (Tennis)', icon: '🎾', location: 'የሸክላ (Clay) ወይም የኮንክሪት ሜዳዎች (Courts)።', game: 'ልዩ ሜዳ የሚፈልግ ስፖርት ነው። 1v1 ወይም በጥንድ (2v2) የሚጫወቱት ዘመናዊ መዝናኛ።', business: 'የሰዓት ኪራይ፣ የትሬነር (Trainer) አገልግሎት እና የመሳሪያዎች ኪራይ።' },
  { id: 5, name: 'ጎልፍ (Golf)', icon: '⛳', location: 'ሰፊ የተፈጥሮ የሳር ሜዳዎች (Golf Course)።', game: 'በጣም ሰፊ ቦታ የሚፈልግ የስፖርት አይነት ነው። በግል ወይም በቡድን (Groups of 4) ተያይዞ የሚደረግ መዝናኛ።', business: 'የከፍተኛ ደረጃ አባልነቶች (Membership) እና የኮርፖሬት ስፖንሰርሺፕ ውድድሮች።' },
  { id: 6, name: 'እጅ ኳስ (Handball)', icon: '🤾', location: 'የኮንክሪት ወይም የቤት ውስጥ (Indoor) ስፖርት ኮምፕሌክስ ሜዳዎች።', game: 'በቡድን የሚከናወን እና የተወሰነ ክፍት ሜዳ የሚፈልግ ነው። 7v7 የሚደረግ ፈጣን ጨዋታ።', business: 'በትምህርት ቤቶች እና በክለቦች ደረጃ ውድድሮችን በማዘጋጀት የሚካሄድ።' },
  { id: 7, name: 'ፈረስ ግልቢያ (Equestrian)', icon: '🏇', location: 'ሰፊ ክፍት ሜዳዎች (ለምሳሌ፦ ጃንሜዳ እና የግል የፈረስ ክለቦች)።', game: 'ሰፊ የሩጫ እና የመለማመጃ ቦታ የሚፈልግ ባህላዊ እና ዘመናዊ ስፖርት ነው።', business: 'ለቱሪዝም፣ ለፈረስ ግልቢያ ትምህርት (Riding lessons) እና ለመዝናኛ።' },
  { id: 8, name: 'ቤዝቦል (Baseball)', icon: '⚾', location: 'የክበብ ቅርጽ ያለው ሰፊ የሳር ሜዳ።', game: 'በኢትዮጵያ ውስጥ ገና እድገት ላይ ያለ ነገር ግን የተለየ ሰፊ የመጫወቻ ዲዛይን ያለው ሜዳ የሚፈልግ ስፖርት ነው።', business: 'ለልዩ የስፖርት ክለቦች እና ለትምህርት ቤት ውድድሮች።' },
  { id: 9, name: 'ሩጫ እና አትሌቲክስ (Running)', icon: '🏃', location: 'በስታዲየም፣ በፓርኮች (ለምሳሌ፡ እንጦጦ) ወይም በከተማ ውጭ ያሉ ቦታዎች።', game: 'በቡድን ሆኖ መሮጥ፣ መራመድ (Hiking) ወይም የ10 ኪ.ሜ / ማራቶን ውድድሮች።', business: 'የHiking አዘጋጅነት፣ የትኬት ሽያጭ እና የስፖንሰርሺፕ ማራቶኖች።' }
]

const citiesData = [
  { name: 'አዲስ አበባ', subCities: ['ቦሌ', 'የካ', 'አራዳ', 'ቂርቆስ', 'ልደታ', 'ንፋስ ስልክ', 'ጉለሌ', 'ኮልፌ ቀራኒዮ', 'አዲስ ከተማ', 'አቃቂ ቃሊቲ', 'ለሚ ኩራ'] },
  { name: 'አዳማ', subCities: ['ቦሌ', 'ዲቤ ቢዬ', 'ገዳ', 'መልካ አዳማ'] },
  { name: 'ባህር ዳር', subCities: ['ግሸ አባይ', 'በላይ ዘለከ', 'ሽምቢጥ', 'ጣና'] },
  { name: 'ሀዋሳ', subCities: ['ታቦር', 'ሀይቅ ዳር', 'ምስራቅ', 'መነሐሪያ'] },
  { name: 'ድሬዳዋ', subCities: ['መገላ', 'ከዚራ', 'ገንደ ተጋሪ'] },
  { name: 'ቢሾፍቱ', subCities: ['ሆራ', 'ባቦጋያ'] }
]

// Selections
const selectedSport = ref(sportsData[0])
const selectedCity = ref(citiesData[0])
const selectedSubCity = ref(citiesData[0].subCities[0])

const selectSport = (sport) => {
  selectedSport.value = sport
  dropdowns.sport = false
}

const selectCity = (city) => {
  selectedCity.value = city
  selectedSubCity.value = city.subCities[0]
  dropdowns.city = false
}

const selectSubCity = (sub) => {
  selectedSubCity.value = sub
  dropdowns.subCity = false
}
</script>

<style scoped>
.slide-up-enter-active, .slide-up-leave-active { transition: all 0.3s ease; }
.slide-up-enter-from { opacity: 0; transform: translateY(15px); }
.slide-up-leave-to { opacity: 0; transform: translateY(-15px); }

.overflow-y-auto::-webkit-scrollbar { width: 4px; }
.overflow-y-auto::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 10px; }
</style>