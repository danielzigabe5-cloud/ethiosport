<script setup>
useHead({ title: 'My Bookings - EthioSport' })

const activeTab = ref('upcoming')
const selectedTicket = ref(null)

const bookings = ref([
  {
    id: 'BK-9921',
    venueName: 'ሳርቤት ፉትሳል ሜዳ (Pitch A)',
    location: 'Sarbet, Addis Ababa',
    date: '2026-08-10',
    time: '05:00 PM - 06:00 PM',
    price: 800,
    status: 'Upcoming',
    paymentStatus: 'Paid',
    pinCode: '4821'
  },
  {
    id: 'BK-9925',
    venueName: 'ቦሌ አሬና ቴኒስ ኮርት',
    location: 'Bole, Addis Ababa',
    date: '2026-08-14',
    time: '08:00 AM - 09:00 AM',
    price: 1200,
    status: 'Upcoming',
    paymentStatus: 'Pending',
    pinCode: '9102'
  },
  {
    id: 'BK-8812',
    venueName: 'ጃኖሜዳ ፉትሳል',
    location: '4 Kilo, Addis Ababa',
    date: '2026-07-20',
    time: '04:00 PM - 05:00 PM',
    price: 700,
    status: 'Completed',
    paymentStatus: 'Paid',
    pinCode: '1109'
  }
])

const upcomingBookings = computed(() => bookings.value.filter(b => b.status === 'Upcoming'))
const pastBookings = computed(() => bookings.value.filter(b => b.status === 'Completed' || b.status === 'Cancelled'))

const cancelBooking = (id) => {
  if (confirm('ቦታ ማስያዣውን መሰረዝ ይፈልጋሉ?')) {
    const item = bookings.value.find(b => b.id === id)
    if (item) item.status = 'Cancelled'
  }
}
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex justify-between items-center">
      <div>
        <h2 class="text-xl font-bold text-white">📅 My Bookings</h2>
        <p class="text-xs text-slate-400">የያዟቸውን ሜዳዎች መረጃ እና የQR ትኬት እዚህ ያግኙ።</p>
      </div>
    </div>

    <!-- Tabs Nav -->
    <div class="flex border-b border-[#1a2432] gap-6 text-xs font-bold">
      <button 
        @click="activeTab = 'upcoming'" 
        :class="['pb-3 transition relative cursor-pointer', activeTab === 'upcoming' ? 'text-emerald-400' : 'text-slate-400']"
      >
        በቅርብ የሚመጡ ({{ upcomingBookings.length }})
        <span v-if="activeTab === 'upcoming'" class="absolute bottom-0 left-0 w-full h-0.5 bg-emerald-500 rounded-full"></span>
      </button>
      <button 
        @click="activeTab = 'history'" 
        :class="['pb-3 transition relative cursor-pointer', activeTab === 'history' ? 'text-emerald-400' : 'text-slate-400']"
      >
        የታሪክ መዝገብ ({{ pastBookings.length }})
        <span v-if="activeTab === 'history'" class="absolute bottom-0 left-0 w-full h-0.5 bg-emerald-500 rounded-full"></span>
      </button>
    </div>

    <!-- Upcoming Bookings List -->
    <div v-if="activeTab === 'upcoming'" class="space-y-4">
      <div v-if="upcomingBookings.length === 0" class="text-center py-12 bg-[#0b111a] rounded-3xl border border-[#1a2432]">
        <p class="text-slate-400 text-xs">ምንም አይነት የቅርብ ጊዜ ማስያዣ የለዎትም።</p>
      </div>

      <div 
        v-for="b in upcomingBookings" 
        :key="b.id"
        class="bg-[#0b111a] border border-[#1a2432] rounded-2xl p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:border-emerald-500/30 transition"
      >
        <div class="space-y-1">
          <div class="flex items-center gap-2">
            <span class="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">ID: {{ b.id }}</span>
            <span :class="['text-[10px] font-bold px-2 py-0.5 rounded', b.paymentStatus === 'Paid' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20']">
              ● {{ b.paymentStatus }}
            </span>
          </div>
          <h3 class="font-bold text-base text-white">{{ b.venueName }}</h3>
          <p class="text-xs text-slate-400">📅 {{ b.date }} • ⏰ {{ b.time }} • <span class="text-emerald-400 font-bold">{{ b.price }} ETB</span></p>
        </div>

        <div class="flex items-center gap-2 w-full md:w-auto">
          <button @click="cancelBooking(b.id)" class="px-3 py-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 text-xs font-semibold rounded-xl border border-rose-500/20 transition">
            ሰርዝ
          </button>
          <button @click="selectedTicket = b" class="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl transition">
            📱 QR Code አሳይ
          </button>
        </div>
      </div>
    </div>

    <!-- History List -->
    <div v-if="activeTab === 'history'" class="space-y-4">
      <div 
        v-for="b in pastBookings" 
        :key="b.id"
        class="bg-[#0b111a] border border-[#1a2432] rounded-2xl p-5 flex justify-between items-center opacity-75"
      >
        <div>
          <span class="text-[10px] font-bold text-slate-400 bg-slate-800 px-2 py-0.5 rounded">{{ b.status }}</span>
          <h3 class="font-bold text-sm text-white pt-1">{{ b.venueName }}</h3>
          <p class="text-xs text-slate-400">📅 {{ b.date }} • {{ b.price }} ETB</p>
        </div>
      </div>
    </div>

    <!-- QR Modal -->
    <div v-if="selectedTicket" class="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div class="bg-[#0b111a] max-w-sm w-full p-6 rounded-3xl border border-[#1a2432] text-center space-y-4">
        <h3 class="font-bold text-sm text-white">የዲጂታል ትኬት (QR Code)</h3>
        <p class="text-xs text-slate-400">{{ selectedTicket.venueName }}</p>
        <div class="p-4 bg-white rounded-2xl inline-block">
          <img :src="`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${selectedTicket.id}`" class="w-36 h-36 mx-auto" />
        </div>
        <p class="text-xs text-emerald-400 font-mono font-bold">PIN Code: {{ selectedTicket.pinCode }}</p>
        <button @click="selectedTicket = null" class="w-full py-2 bg-[#131c27] hover:bg-[#1a2534] text-slate-200 text-xs font-semibold rounded-xl border border-[#212e3e] transition">
          ዝጋ (Close)
        </button>
      </div>
    </div>
  </div>
</template>