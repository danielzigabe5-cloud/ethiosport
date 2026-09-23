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
  registrationForm.value = { fullName: '', phone: '', teamName: '' }
  isModalOpen.value = true
}

const handleRegister = () => {
  isSubmitting.value = true
  setTimeout(() => {
    isSubmitting.value = false
    registrationSuccess.value = true
    setTimeout(() => { isModalOpen.value = false }, 2200)
  }, 1200)
}
</script>

<template>
  <div class="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans pb-24 pt-20 transition-colors duration-300">

    <!-- HERO SECTION -->
    <section class="relative overflow-hidden bg-white dark:bg-slate-900 pt-16 pb-28 border-b border-slate-200/60 dark:border-slate-800/80">
      <!-- Background Decorative Glows -->
      <div class="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full overflow-hidden pointer-events-none opacity-40">
        <div class="absolute -top-24 left-1/4 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl"></div>
        <div class="absolute top-1/2 right-1/4 w-80 h-80 bg-blue-500/15 rounded-full blur-3xl"></div>
      </div>

      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 z-10">
        <div class="flex justify-center">
          <div class="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-full text-xs font-black uppercase tracking-widest border border-emerald-500/20 shadow-xs">
            <span class="relative flex h-2 w-2">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>New Tournaments Live</span>
          </div>
        </div>
        
        <h1 class="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.1]">
          Compete in <span class="bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-600 bg-clip-text text-transparent">Elite</span> Tournaments
        </h1>
        
        <p class="text-base sm:text-lg md:text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto font-medium leading-relaxed">
          The ultimate sports platform for Ethiopian athletes. Find leagues, track progress, and register seamlessly.
        </p>
      </div>
    </section>

    <!-- FLOATING FILTER BAR -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-14 relative z-20">
      <div class="bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl p-4 sm:p-6 md:p-8 rounded-3xl shadow-2xl shadow-slate-200/80 dark:shadow-none border border-slate-200/80 dark:border-slate-800 space-y-5">
        
        <div class="flex flex-col lg:flex-row justify-between items-center gap-4">
          <!-- Status Tabs -->
          <div class="flex bg-slate-100 dark:bg-slate-800/80 p-1.5 rounded-2xl w-full lg:w-auto overflow-x-auto">
            <button 
              v-for="st in ['All', 'Upcoming', 'Ongoing', 'Completed']" 
              :key="st"
              @click="selectedStatusCategory = st"
              :class="[
                'flex-1 lg:flex-none px-5 py-2.5 rounded-xl text-xs font-black transition-all duration-200 whitespace-nowrap cursor-pointer',
                selectedStatusCategory === st 
                  ? 'bg-white dark:bg-slate-950 text-emerald-600 dark:text-emerald-400 shadow-md shadow-slate-200/50 dark:shadow-none' 
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              ]"
            >
              {{ st }}
            </button>
          </div>

          <!-- Search Input -->
          <div class="relative w-full lg:w-96">
            <Icon name="lucide:search" class="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              v-model="searchQuery" 
              type="text" 
              placeholder="Search by venue or title..." 
              class="w-full pl-11 pr-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all text-slate-900 dark:text-white placeholder:text-slate-400"
            />
          </div>
        </div>

        <!-- Sport Category Pills -->
        <div class="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide border-t border-slate-100 dark:border-slate-800/80 pt-4">
          <button 
            v-for="cat in ['All', 'Football', 'Basketball', 'Tennis', 'Volleyball', 'Athletics']" 
            :key="cat"
            @click="selectedSportCategory = cat"
            :class="[
              'px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-200 whitespace-nowrap cursor-pointer',
              selectedSportCategory === cat 
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-500/20' 
                : 'bg-slate-100 dark:bg-slate-800/60 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800'
            ]"
          >
            {{ cat }}
          </button>
        </div>
      </div>

      <!-- EVENT GRID SECTION -->
      <div class="mt-14 space-y-8">
        <div class="flex justify-between items-end border-b border-slate-200 dark:border-slate-800 pb-4">
          <div>
            <h2 class="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight uppercase">
              Available Events
            </h2>
            <p class="text-xs sm:text-sm font-semibold text-slate-500 dark:text-slate-400 mt-1">
              Browse and join active tournaments
            </p>
          </div>
          <span class="text-xs font-extrabold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 px-3.5 py-1.5 rounded-full border border-emerald-200/50 dark:border-emerald-500/20">
            {{ filteredEvents.length }} {{ filteredEvents.length === 1 ? 'Event' : 'Events' }}
          </span>
        </div>

        <!-- Empty State -->
        <div v-if="filteredEvents.length === 0" class="text-center py-16 bg-white dark:bg-slate-900 rounded-3xl border border-dashed border-slate-300 dark:border-slate-800 space-y-3">
          <Icon name="lucide:calendar-x" class="w-12 h-12 text-slate-400 mx-auto" />
          <h3 class="text-lg font-bold text-slate-700 dark:text-slate-300">No tournaments found</h3>
          <p class="text-xs text-slate-400">Try adjusting your filters or search query.</p>
        </div>

        <!-- Cards Grid -->
        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div 
            v-for="evt in filteredEvents" 
            :key="evt.id" 
            class="group bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-200/80 dark:border-slate-800 hover:shadow-2xl hover:shadow-emerald-500/10 hover:-translate-y-2 transition-all duration-300 flex flex-col"
          >
            <!-- Image Wrapper -->
            <div class="relative h-56 overflow-hidden">
              <img 
                :src="evt.image" 
                :alt="evt.title"
                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
              />
              <div class="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>

              <!-- Status Badge -->
              <div 
                class="absolute top-4 left-4 px-3 py-1 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg backdrop-blur-md border border-white/20"
                :class="{
                  'bg-white/90 text-emerald-600': evt.status === 'Upcoming',
                  'bg-emerald-500 text-white': evt.status === 'Ongoing',
                  'bg-slate-800/90 text-slate-400': evt.status === 'Completed'
                }"
              >
                {{ evt.status }}
              </div>

              <!-- Registration Type Badge -->
              <div class="absolute bottom-3 left-4 text-xs font-extrabold text-white/90 flex items-center gap-1.5">
                <Icon name="lucide:users" class="w-3.5 h-3.5 text-emerald-400" />
                <span>{{ evt.type }}</span>
              </div>
            </div>

            <!-- Card Body -->
            <div class="p-6 space-y-4 flex-1 flex flex-col justify-between">
              <div class="space-y-2">
                <span class="text-[10px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest bg-emerald-50 dark:bg-emerald-500/10 px-2.5 py-1 rounded-md">
                  {{ evt.category }}
                </span>
                <h3 class="text-xl font-black text-slate-900 dark:text-white leading-snug group-hover:text-emerald-500 transition-colors pt-1">
                  {{ evt.title }}
                </h3>
                
                <div class="space-y-1.5 pt-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
                  <div class="flex items-center gap-2">
                    <Icon name="lucide:calendar" class="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    <span>{{ evt.date }}</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <Icon name="lucide:map-pin" class="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    <span class="truncate">{{ evt.location }}</span>
                  </div>
                </div>
              </div>

              <!-- Card Footer -->
              <div class="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-2 mt-4">
                <div>
                  <span class="block text-[9px] font-extrabold text-slate-400 uppercase tracking-wider">Fee</span>
                  <span class="text-base font-black text-slate-900 dark:text-white">{{ evt.price }}</span>
                </div>
                
                <button 
                  @click="openRegisterModal(evt)"
                  :disabled="evt.status === 'Completed'"
                  :class="[
                    'px-5 py-2.5 rounded-xl font-black text-xs transition-all duration-200 active:scale-95 flex items-center gap-1.5 cursor-pointer',
                    evt.status === 'Completed'
                      ? 'bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
                      : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-500/20'
                  ]"
                >
                  <span>{{ evt.status === 'Completed' ? 'Closed' : 'Register' }}</span>
                  <Icon v-if="evt.status !== 'Completed'" name="lucide:arrow-right" class="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- REGISTRATION MODAL -->
    <div v-if="isModalOpen" class="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div class="absolute inset-0 bg-slate-950/70 backdrop-blur-md" @click="isModalOpen = false"></div>
      
      <div class="relative bg-white dark:bg-slate-900 w-full max-w-md rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-800 z-10 animate-in zoom-in-95 duration-200">
        
        <!-- Close Button -->
        <button @click="isModalOpen = false" class="absolute top-5 right-5 text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors">
          <Icon name="lucide:x" class="w-5 h-5" />
        </button>

        <!-- Success Message -->
        <div v-if="registrationSuccess" class="text-center py-8 space-y-3">
          <div class="w-16 h-16 bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto text-2xl">
            ✓
          </div>
          <h3 class="text-2xl font-black text-slate-900 dark:text-white">Successfully Registered!</h3>
          <p class="text-xs font-semibold text-slate-500 dark:text-slate-400">
            You're confirmed for <span class="text-emerald-600 dark:text-emerald-400 font-bold">{{ selectedEvent?.title }}</span>. We'll send details to your phone.
          </p>
        </div>

        <!-- Registration Form -->
        <form v-else @submit.prevent="handleRegister" class="space-y-5">
          <div>
            <h3 class="text-xl font-black text-slate-900 dark:text-white">Event Registration</h3>
            <p class="text-xs font-semibold text-slate-400 mt-0.5">{{ selectedEvent?.title }}</p>
          </div>

          <div class="space-y-3">
            <div>
              <label class="text-[10px] font-black uppercase text-slate-400 mb-1 block">Full Name</label>
              <input 
                v-model="registrationForm.fullName" 
                required 
                type="text" 
                placeholder="e.g. Abebe Bikila"
                class="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none" 
              />
            </div>

            <div>
              <label class="text-[10px] font-black uppercase text-slate-400 mb-1 block">Phone Number</label>
              <input 
                v-model="registrationForm.phone" 
                required 
                type="tel" 
                placeholder="+251 9..."
                class="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none" 
              />
            </div>

            <div v-if="selectedEvent?.type === 'Team Registration'">
              <label class="text-[10px] font-black uppercase text-slate-400 mb-1 block">Team Name</label>
              <input 
                v-model="registrationForm.teamName" 
                required 
                type="text" 
                placeholder="Enter team name"
                class="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none" 
              />
            </div>
          </div>

          <button 
            type="submit" 
            :disabled="isSubmitting"
            class="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs rounded-xl shadow-lg shadow-emerald-500/20 transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
          >
            <Icon v-if="isSubmitting" name="lucide:loader-2" class="w-4 h-4 animate-spin" />
            <span>{{ isSubmitting ? 'Processing...' : 'Confirm Registration' }}</span>
          </button>
        </form>
      </div>
    </div>

  </div>
</template>

<style scoped>
.scrollbar-hide::-webkit-scrollbar { display: none; }
.scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
</style>