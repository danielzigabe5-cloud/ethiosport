<script setup>
import { ref, computed } from 'vue'

useHead({ title: 'Overview - EthioSport' })

const selectedTicket = ref(null)

const user = ref({
  name: 'አበበ በቀለ',
  email: 'abebe.bekele@example.com',
  phone: '+251 911 22 33 44',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250'
})

const bookings = ref([
  {
    id: 'BK-9921',
    venueName: 'ሳርቤት ፉትሳል ሜዳ (Pitch A)',
    location: 'Sarbet, Addis Ababa',
    coordinates: '8.9806,38.7578',
    date: '2026-08-10',
    time: '05:00 PM - 06:00 PM',
    price: 800,
    status: 'Upcoming',
    paymentStatus: 'Paid',
    verifyCode: '4821'
  },
  {
    id: 'BK-9925',
    venueName: 'ቦሌ አሬና ቴኒስ ኮርት',
    location: 'Bole, Addis Ababa',
    coordinates: '8.9917,38.7862',
    date: '2026-08-14',
    time: '08:00 AM - 09:00 AM',
    price: 1200,
    status: 'Upcoming',
    paymentStatus: 'Pending',
    verifyCode: '9102'
  }
])

const upcomingBookings = computed(() => bookings.value.filter(b => b.status === 'Upcoming'))

const openMap = (coords) => {
  window.open(`https://www.google.com/maps/search/?api=1&query=${coords}`, '_blank')
}
</script>

<template>
  <div class="space-y-6">

    <!-- Header Stats Card -->
    <div class="bg-[#0b111a] border border-[#1a2432] rounded-3xl p-6 flex flex-col md:flex-row justify-between items-center gap-6">
      <div class="flex items-center gap-4">
        <img :src="user.avatar" class="w-16 h-16 rounded-2xl object-cover border-2 border-emerald-500" />
        <div>
          <div class="flex items-center gap-2">
            <h2 class="text-xl font-bold text-white">{{ user.name }}</h2>
            <span class="px-2 py-0.5 text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-md">VERIFIED PLAYER</span>
          </div>
          <p class="text-xs text-slate-400 font-medium">{{ user.email }} • {{ user.phone }}</p>
        </div>
      </div>

      <div class="flex gap-4">
        <div class="text-center bg-[#131c27] px-6 py-3 rounded-2xl border border-[#212e3e]">
          <p class="text-[10px] font-bold text-slate-400 uppercase">በቅርብ የሚመጡ</p>
          <p class="text-xl font-bold text-emerald-400">{{ upcomingBookings.length }}</p>
        </div>
      </div>
    </div>

    <!-- Active Bookings List -->
    <div class="space-y-4">
      <h3 class="text-sm font-bold text-slate-300">🎟️ በቅርብ የሚመጡ ማስያዣዎች</h3>

      <div 
        v-for="b in upcomingBookings" 
        :key="b.id"
        class="bg-[#0b111a] border border-[#1a2432] rounded-2xl p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:border-emerald-500/30 transition"
      >
        <div class="space-y-1">
          <div class="flex items-center gap-2">
            <span class="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">ID: {{ b.id }}</span>
            <span class="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">● {{ b.paymentStatus }}</span>
          </div>
          <h4 class="font-bold text-base text-white">{{ b.venueName }}</h4>
          <p class="text-xs text-slate-400 font-medium">📅 {{ b.date }} • ⏰ {{ b.time }} • <span class="text-emerald-400 font-bold">{{ b.price }} ETB</span></p>
        </div>

        <div class="flex items-center gap-2 w-full md:w-auto">
          <button @click="openMap(b.coordinates)" class="px-3 py-2 bg-[#131c27] text-slate-300 text-xs rounded-xl border border-[#212e3e]">📍 Map</button>
          <button @click="selectedTicket = b" class="flex-1 md:flex-none px-4 py-2 bg-emerald-500 text-slate-950 font-bold text-xs rounded-xl">📱 Show QR Code</button>
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
        <p class="text-xs text-emerald-400 font-mono font-bold">PIN: {{ selectedTicket.verifyCode }}</p>
        <button @click="selectedTicket = null" class="w-full py-2 bg-[#131c27] text-slate-200 text-xs rounded-xl border border-[#212e3e]">ዝጋ (Close)</button>
      </div>
    </div>

  </div>
</template>