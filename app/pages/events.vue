<script setup>
import { ref, computed } from 'vue'

useHead({ 
  title: 'Elite Tournaments - EthioSport',
})

// --- STATE MANAGEMENT ---
const searchQuery = ref('')
const selectedSportCategory = ref('All')
const selectedStatusCategory = ref('All')
const isModalOpen = ref(false)
const selectedEvent = ref(null)
const isSubmitting = ref(false)
const registrationSuccess = ref(false)

const registrationForm = ref({ fullName: '', phone: '', teamName: '' })

// --- DATA ---
const events = ref([
  {
    id: 1,
    title: 'Addis Corporate Futsal League',
    category: 'Football',
    status: 'Upcoming',
    date: 'Oct 12 - Oct 30, 2026',
    location: 'Sarbet Futsal Arena',
    price: '3,500 ETB',
    type: 'Team Registration',
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 2,
    title: 'Bole Tennis Summer Open',
    category: 'Tennis',
    status: 'Ongoing',
    date: 'Sep 01 - Sep 15, 2026',
    location: 'Bole Atlas Club',
    price: '600 ETB',
    type: 'Individual',
    image: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 3,
    title: 'CMC Elite Basketball Cup',
    category: 'Basketball',
    status: 'Upcoming',
    date: 'Nov 05 - Nov 10, 2026',
    location: 'CMC Sports Complex',
    price: '2,000 ETB',
    type: 'Team Registration',
    image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=800&auto=format&fit=crop'
  }
])

const filteredEvents = computed(() => {
  return events.value.filter(evt => {
    const matchesStatus = selectedStatusCategory.value === 'All' || evt.status === selectedStatusCategory.value
    const matchesSport = selectedSportCategory.value === 'All' || evt.category === selectedSportCategory.value
    const matchesSearch = !searchQuery.value || 
                          evt.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                          evt.location.toLowerCase().includes(searchQuery.value.toLowerCase())
    return matchesStatus && matchesSport && matchesSearch
  })
})

const openRegisterModal = (evt) => {
  if (evt.status === 'Completed') return
  selectedEvent.value = evt
  registrationSuccess.value = false
  isModalOpen.value = true
}

const handleRegister = () => {
  isSubmitting.value = true
  setTimeout(() => {
    isSubmitting.value = false
    registrationSuccess.value = true
    setTimeout(() => { isModalOpen.value = false }, 2000)
  }, 1200)
}
</script>

<template>
  <!-- pt-24 ወይም pt-32 የሚለው Navbar እንዳይሸፍነው ያደርጋል -->
  <div class="min-h-screen bg-slate-50 text-slate-900 font-sans pb-20 pt-24 md:pt-32">

    <!-- HERO SECTION: pt-12 በመጨመር ጽሁፉ ወደ ታች እንዲወርድ ተደርጓል -->
    <section class="relative bg-white pt-12 pb-24 border-b border-slate-100">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        <div class="flex justify-center">
          <div class="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-50 text-emerald-600 rounded-full text-xs font-bold uppercase tracking-widest border border-emerald-100">
            <span class="w-2 h-2 bg-emerald-500 rounded-full animate-ping"></span>
            New Tournaments Live
          </div>
        </div>
        
        <h1 class="text-5xl md:text-7xl font-black tracking-tight text-slate-900 leading-tight">
          Compete in <span class="text-emerald-600">Elite</span> Tournaments
        </h1>
        
        <p class="text-lg md:text-xl text-slate-500 max-w-3xl mx-auto font-medium leading-relaxed">
          The ultimate sports platform for Ethiopian athletes. Find leagues, track progress, and register with ease.
        </p>
      </div>
    </section>

    <!-- FLOATING FILTER BAR -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-20">
      <div class="bg-white p-5 md:p-8 rounded-[2.5rem] shadow-2xl shadow-slate-200/50 border border-slate-100 space-y-6">
        <div class="flex flex-col lg:flex-row justify-between items-center gap-6">
          
          <!-- Status Tabs -->
          <div class="flex bg-slate-100 p-1.5 rounded-2xl w-full lg:w-auto">
            <button 
              v-for="st in ['All', 'Upcoming', 'Ongoing', 'Completed']" 
              :key="st"
              @click="selectedStatusCategory = st"
              :class="[
                'flex-1 lg:flex-none px-6 py-3 rounded-xl text-xs font-bold transition-all',
                selectedStatusCategory === st 
                  ? 'bg-white text-emerald-600 shadow-sm' 
                  : 'text-slate-500 hover:text-slate-800'
              ]"
            >
              {{ st }}
            </button>
          </div>

          <!-- Search -->
          <div class="relative w-full lg:w-96">
            <input 
              v-model="searchQuery" 
              type="text" 
              placeholder="Search by venue or title..." 
              class="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <span class="absolute left-5 top-1/2 -translate-y-1/2 opacity-30">🔍</span>
          </div>
        </div>

        <!-- Sport Category Pills -->
        <div class="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide border-t border-slate-50 pt-6">
          <button 
            v-for="cat in ['All', 'Football', 'Basketball', 'Tennis', 'Volleyball', 'Athletics']" 
            :key="cat"
            @click="selectedSportCategory = cat"
            :class="[
              'px-6 py-2.5 rounded-full text-[11px] font-bold uppercase transition-all whitespace-nowrap',
              selectedSportCategory === cat 
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-200' 
                : 'bg-slate-50 text-slate-500 hover:bg-slate-200'
            ]"
          >
            {{ cat }}
          </button>
        </div>
      </div>

      <!-- EVENT GRID -->
      <div class="mt-20 space-y-10">
        <div class="flex justify-between items-end border-b border-slate-200 pb-6">
          <div>
            <h2 class="text-3xl font-black text-slate-900 uppercase tracking-tight">Available Events</h2>
            <p class="text-slate-400 font-medium">Browse and join active tournaments</p>
          </div>
          <span class="text-sm font-bold text-emerald-600 bg-emerald-50 px-4 py-1 rounded-full border border-emerald-100">
            {{ filteredEvents.length }} Events
          </span>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          <div 
            v-for="evt in filteredEvents" 
            :key="evt.id" 
            class="group bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 hover:shadow-2xl transition-all duration-500 flex flex-col"
          >
            <div class="relative h-60 overflow-hidden">
              <img :src="evt.image" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div 
                class="absolute top-5 left-5 px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl backdrop-blur-md"
                :class="{
                  'bg-white/90 text-emerald-600': evt.status === 'Upcoming',
                  'bg-emerald-600 text-white': evt.status === 'Ongoing',
                  'bg-slate-200 text-slate-500': evt.status === 'Completed'
                }"
              >
                {{ evt.status }}
              </div>
            </div>

            <div class="p-8 space-y-5 flex-1 flex flex-col">
              <div class="flex-1 space-y-3">
                <span class="text-[11px] font-black text-emerald-600 uppercase tracking-widest">{{ evt.category }}</span>
                <h3 class="text-2xl font-black text-slate-900 leading-tight group-hover:text-emerald-600 transition-colors">{{ evt.title }}</h3>
                <div class="space-y-2 pt-2">
                  <div class="flex items-center gap-3 text-xs text-slate-500 font-bold">
                    <span class="text-lg">📅</span> {{ evt.date }}
                  </div>
                  <div class="flex items-center gap-3 text-xs text-slate-500 font-bold">
                    <span class="text-lg">📍</span> {{ evt.location }}
                  </div>
                </div>
              </div>

              <div class="pt-6 border-t border-slate-50 flex items-center justify-between">
                <div class="flex flex-col">
                  <span class="text-[10px] font-bold text-slate-400 uppercase">Registration Fee</span>
                  <span class="text-xl font-black text-slate-900">{{ evt.price }}</span>
                </div>
                <button 
                  @click="openRegisterModal(evt)"
                  class="px-8 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-2xl shadow-xl shadow-emerald-100 transition-all active:scale-95 text-xs"
                >
                  Register Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- MODAL (ምዝገባ) -->
    <div v-if="isModalOpen" class="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div class="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" @click="isModalOpen = false"></div>
      <div class="relative bg-white w-full max-w-md rounded-[3rem] p-10 shadow-2xl">
         <div v-if="registrationSuccess" class="text-center py-10 space-y-4">
            <div class="text-6xl">✅</div>
            <h3 class="text-2xl font-black">Success!</h3>
            <p class="text-slate-500">You're registered for {{ selectedEvent?.title }}</p>
         </div>
         <form v-else @submit.prevent="handleRegister" class="space-y-6">
            <h3 class="text-2xl font-black">Event Registration</h3>
            <div class="space-y-4 text-left">
               <div>
                  <label class="text-[10px] font-black uppercase text-slate-400 mb-1 block">Full Name</label>
                  <input v-model="registrationForm.fullName" required type="text" class="w-full p-4 rounded-2xl bg-slate-50 border-none ring-1 ring-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none" />
               </div>
               <div>
                  <label class="text-[10px] font-black uppercase text-slate-400 mb-1 block">Phone Number</label>
                  <input v-model="registrationForm.phone" required type="tel" class="w-full p-4 rounded-2xl bg-slate-50 border-none ring-1 ring-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none" />
               </div>
            </div>
            <button class="w-full py-4 bg-emerald-600 text-white font-black rounded-2xl shadow-xl shadow-emerald-200">
               {{ isSubmitting ? 'Processing...' : 'Confirm Registration' }}
            </button>
         </form>
      </div>
    </div>

  </div>
</template>

<style scoped>
.scrollbar-hide::-webkit-scrollbar { display: none; }
</style>