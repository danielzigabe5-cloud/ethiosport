<script setup>
import { ref, computed } from 'vue'

// 1. Auth Guard (ያለ Login እንዳይገባ ይከላከላል)
definePageMeta({
  middleware: ['auth']
})

// 2. Auth Composable
const { logout } = useAuth()

// SEO Meta
useHead({ title: 'My Dashboard - EthioSport' })

// Active Tab State ('upcoming' | 'history' | 'settings')
const activeTab = ref('upcoming')
const selectedTicket = ref(null)

// User Profile Data
const user = ref({
  name: 'አበበ በቀለ',
  email: 'abebe.bekele@example.com',
  phone: '+251 911 22 33 44',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250'
})

// Bookings Data (Active and History)
const bookings = ref([
  {
    id: 'BK-9921',
    venueName: 'ሳርቤት ፉትሳል ሜዳ (Pitch A)',
    location: 'Sarbet, Addis Ababa',
    date: '2026-08-10',
    time: '05:00 PM - 06:00 PM',
    price: 800,
    status: 'Upcoming'
  },
  {
    id: 'BK-9925',
    venueName: 'ቦሌ አሬና ቴኒስ ኮርት',
    location: 'Bole, Addis Ababa',
    date: '2026-08-14',
    time: '08:00 AM - 09:00 AM',
    price: 1200,
    status: 'Upcoming'
  },
  {
    id: 'BK-4410',
    venueName: 'ሱሚት ፉትሳል ኮምፕሌክስ',
    location: 'Summit, Addis Ababa',
    date: '2026-07-28',
    time: '04:00 PM - 05:00 PM',
    price: 900,
    status: 'Completed'
  },
  {
    id: 'BK-3102',
    venueName: 'ጎተራ ስፖርት ማዕከል',
    location: 'Gotera, Addis Ababa',
    date: '2026-06-12',
    time: '06:00 PM - 07:00 PM',
    price: 850,
    status: 'Completed'
  }
])

// Computed Filters
const upcomingBookings = computed(() => 
  bookings.value.filter(b => b.status === 'Upcoming')
)

const pastBookings = computed(() => 
  bookings.value.filter(b => b.status === 'Completed')
)

// Actions
const handleLogout = async () => {
  await logout()
}
</script>

<template>
  <div class="min-h-screen bg-slate-950 text-slate-100 font-sans pb-20">
    
    <!-- DASHBOARD CONTAINER -->
    <main class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">

      <!-- ========================================== -->
      <!-- SECTION 1: PROFILE HEADER                  -->
      <!-- ========================================== -->
      <section class="bg-[#0b111a] border border-[#1a2432] rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl relative overflow-hidden">
        
        <div class="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left z-10">
          <div class="relative">
            <img 
              :src="user.avatar" 
              alt="Profile Picture" 
              class="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border-2 border-emerald-500 shadow-lg"
            />
            <span class="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 border-2 border-[#0b111a] rounded-full"></span>
          </div>

          <div class="space-y-1">
            <div class="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <h1 class="text-2xl font-black text-white tracking-tight">{{ user.name }}</h1>
              <span class="px-2.5 py-0.5 text-[10px] font-extrabold uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-md">
                Verified Player
              </span>
            </div>
            <p class="text-xs text-slate-400 font-medium">{{ user.email }} • {{ user.phone }}</p>
            <p class="text-xs text-emerald-400/90 pt-1 font-semibold">
              👋 እንኳን ደህና መጡ! የቀደሙ እንቅስቃሴዎችንና ትኬቶችዎን እዚህ ያግኙ።
            </p>
          </div>
        </div>

        <!-- Quick Stats -->
        <div class="flex items-center gap-4 w-full md:w-auto justify-stretch border-t md:border-t-0 border-[#1a2432] pt-4 md:pt-0 z-10">
          <div class="flex-1 md:flex-none text-center bg-[#131c27] px-5 py-3 rounded-2xl border border-[#212e3e]">
            <p class="text-[10px] font-bold text-slate-400 uppercase tracking-wider">በቅርብ የሚመጡ</p>
            <p class="text-xl font-black text-emerald-400">{{ upcomingBookings.length }}</p>
          </div>
          <div class="flex-1 md:flex-none text-center bg-[#131c27] px-5 py-3 rounded-2xl border border-[#212e3e]">
            <p class="text-[10px] font-bold text-slate-400 uppercase tracking-wider">የተጠናቀቁ</p>
            <p class="text-xl font-black text-slate-200">{{ pastBookings.length }}</p>
          </div>
        </div>

        <!-- Background Decorative Glow -->
        <div class="absolute -right-10 -bottom-10 w-48 h-48 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none"></div>
      </section>

      <!-- NAVIGATION TABS -->
      <div class="flex items-center border-b border-[#1a2432] gap-6 text-sm font-bold">
        <button 
          @click="activeTab = 'upcoming'"
          :class="[
            'pb-3 transition relative cursor-pointer',
            activeTab === 'upcoming' ? 'text-emerald-400' : 'text-slate-400 hover:text-slate-200'
          ]"
        >
          🎟️ በቅርብ የሚመጡ ({{ upcomingBookings.length }})
          <span v-if="activeTab === 'upcoming'" class="absolute bottom-0 left-0 w-full h-0.5 bg-emerald-500 rounded-full"></span>
        </button>

        <button 
          @click="activeTab = 'history'"
          :class="[
            'pb-3 transition relative cursor-pointer',
            activeTab === 'history' ? 'text-emerald-400' : 'text-slate-400 hover:text-slate-200'
          ]"
        >
          📜 የታሪክ መዝገብ ({{ pastBookings.length }})
          <span v-if="activeTab === 'history'" class="absolute bottom-0 left-0 w-full h-0.5 bg-emerald-500 rounded-full"></span>
        </button>

        <button 
          @click="activeTab = 'settings'"
          :class="[
            'pb-3 transition relative cursor-pointer',
            activeTab === 'settings' ? 'text-emerald-400' : 'text-slate-400 hover:text-slate-200'
          ]"
        >
          ⚙️ መቼቶች (Settings)
          <span v-if="activeTab === 'settings'" class="absolute bottom-0 left-0 w-full h-0.5 bg-emerald-500 rounded-full"></span>
        </button>
      </div>

      <!-- ========================================== -->
      <!-- SECTION 2: UPCOMING BOOKINGS               -->
      <!-- ========================================== -->
      <section v-if="activeTab === 'upcoming'" class="space-y-4">
        <div v-if="upcomingBookings.length === 0" class="text-center py-12 bg-[#0b111a] rounded-3xl border border-[#1a2432]">
          <p class="text-slate-400 text-sm">በቅርብ የተያዘ ምንም አይነት ሜዳ የለም።</p>
          <NuxtLink to="/venues" class="inline-block mt-4 px-5 py-2.5 bg-emerald-500 text-slate-950 font-bold text-xs rounded-xl hover:bg-emerald-400 transition">
            አሁን ሜዳ ይያዙ
          </NuxtLink>
        </div>

        <div 
          v-for="b in upcomingBookings" 
          :key="b.id"
          class="bg-[#0b111a] border border-[#1a2432] hover:border-emerald-500/40 rounded-3xl p-6 transition flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 shadow-md"
        >
          <div class="space-y-2">
            <div class="flex items-center gap-2">
              <span class="text-[10px] font-black uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/20">
                ID: {{ b.id }}
              </span>
              <span class="text-xs text-slate-400">📍 {{ b.location }}</span>
            </div>
            <h3 class="text-lg font-black text-white">{{ b.venueName }}</h3>
            <div class="flex flex-wrap gap-4 text-xs text-slate-300 font-semibold">
              <span>📅 {{ b.date }}</span>
              <span>⏰ {{ b.time }}</span>
              <span class="text-emerald-400 font-bold">💰 {{ b.price }} ETB</span>
            </div>
          </div>

          <button 
            @click="selectedTicket = b"
            class="w-full sm:w-auto px-5 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs rounded-2xl shadow-lg transition flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>📱</span>
            <span>Show QR Code</span>
          </button>
        </div>
      </section>

      <!-- ========================================== -->
      <!-- SECTION 3: PAST HISTORY                    -->
      <!-- ========================================== -->
      <section v-if="activeTab === 'history'" class="space-y-4">
        <div 
          v-for="b in pastBookings" 
          :key="b.id"
          class="bg-[#0b111a] border border-[#1a2432] rounded-3xl p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 opacity-80 hover:opacity-100 transition"
        >
          <div class="space-y-1">
            <div class="flex items-center gap-2">
              <span class="text-[10px] font-bold text-slate-400">ID: {{ b.id }}</span>
              <span class="text-[10px] font-bold text-slate-400 bg-slate-800 px-2 py-0.5 rounded">የተጠናቀቀ</span>
            </div>
            <h3 class="text-base font-bold text-white">{{ b.venueName }}</h3>
            <p class="text-xs text-slate-400">📅 {{ b.date }} • ⏰ {{ b.time }}</p>
          </div>

          <div class="text-right flex sm:flex-col justify-between w-full sm:w-auto items-center sm:items-end border-t sm:border-0 border-[#1a2432] pt-3 sm:pt-0">
            <span class="text-xs font-bold text-slate-300">{{ b.price }} ETB</span>
            <span class="text-[11px] text-emerald-400 font-medium cursor-pointer hover:underline">ደረሰኝ አውርድ (Receipt)</span>
          </div>
        </div>
      </section>

      <!-- ========================================== -->
      <!-- SECTION 4: QUICK ACTIONS / SETTINGS       -->
      <!-- ========================================== -->
      <section v-if="activeTab === 'settings'" class="bg-[#0b111a] border border-[#1a2432] rounded-3xl p-6 sm:p-8 space-y-6">
        <h3 class="text-base font-black text-white border-b border-[#1a2432] pb-4">የመለያ ማስተካከያዎች (Profile & Account Settings)</h3>

        <form @submit.prevent class="space-y-4 max-w-xl">
          <div class="space-y-1">
            <label class="text-xs font-bold text-slate-400">ሙሉ ስም</label>
            <input 
              v-model="user.name" 
              type="text" 
              class="w-full bg-[#131c27] border border-[#212e3e] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div class="space-y-1">
            <label class="text-xs font-bold text-slate-400">ኢሜይል አድራሻ</label>
            <input 
              v-model="user.email" 
              type="email" 
              class="w-full bg-[#131c27] border border-[#212e3e] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div class="space-y-1">
            <label class="text-xs font-bold text-slate-400">ስልክ ቁጥር</label>
            <input 
              v-model="user.phone" 
              type="text" 
              class="w-full bg-[#131c27] border border-[#212e3e] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div class="pt-2 flex flex-wrap gap-4">
            <button type="submit" class="px-5 py-2.5 bg-emerald-500 text-slate-950 font-bold text-xs rounded-xl hover:bg-emerald-400 transition cursor-pointer">
              ለወደፊቱ አስቀምጥ (Save Changes)
            </button>
            <button 
              type="button" 
              @click="handleLogout"
              class="px-5 py-2.5 bg-rose-500/10 text-rose-500 hover:bg-rose-500 hover:text-white font-bold text-xs rounded-xl transition cursor-pointer"
            >
              🚪 ወጣ (Logout)
            </button>
          </div>
        </form>
      </section>

    </main>

    <!-- DIGITAL TICKET MODAL (QR CODE DISPLAY) -->
    <Transition 
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div v-if="selectedTicket" class="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
        <div class="bg-[#0b111a] max-w-sm w-full p-6 rounded-3xl border border-[#1a2432] text-center space-y-6 shadow-2xl relative">
          
          <div class="flex justify-between items-center border-b border-[#1a2432] pb-3">
            <h3 class="font-black text-sm text-white">የዲጂታል ትኬት (QR Code)</h3>
            <button @click="selectedTicket = null" class="text-slate-400 hover:text-rose-500 text-lg cursor-pointer">✕</button>
          </div>

          <div class="space-y-1">
            <h4 class="font-black text-base text-white">{{ selectedTicket.venueName }}</h4>
            <p class="text-xs text-slate-400">📅 {{ selectedTicket.date }} | ⏰ {{ selectedTicket.time }}</p>
            <p class="text-xs font-bold text-emerald-400 pt-1">ትእዛዝ ID: {{ selectedTicket.id }}</p>
          </div>

          <!-- QR Code Container -->
          <div class="p-4 bg-white rounded-2xl inline-block border border-slate-200 shadow-inner">
            <img 
              :src="`https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${selectedTicket.id}`" 
              alt="Ticket QR Code" 
              class="w-40 h-40 mx-auto" 
            />
          </div>
          
          <p class="text-[11px] font-semibold text-slate-400 bg-[#131c27] p-3 rounded-xl border border-[#212e3e]">
            📌 ይህንን QR Code ሜዳው ሲደርሱ ለሜዳው ተቆጣጣሪ ያሳዩ
          </p>

          <button 
            @click="selectedTicket = null" 
            class="w-full py-2.5 bg-[#131c27] hover:bg-[#1a2432] text-slate-200 text-xs font-bold rounded-xl border border-[#212e3e] transition cursor-pointer"
          >
            ዝጋ (Close)
          </button>
        </div>
      </div>
    </Transition>

  </div>
</template>