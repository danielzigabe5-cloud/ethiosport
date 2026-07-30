<script setup lang="ts">
definePageMeta({ Layout: 'user' })

const tickets = ref([
  {
    id: 'TK-882',
    match: 'ቅዱስ ጊዮርጊስ vs ኢትዮጵያ ቡና',
    league: 'የኢትዮጵያ ፕሪሚየር ሊግ',
    stadium: 'አዲስ አበባ ስታዲየም',
    date: '2026-08-12',
    time: '03:00 PM',
    seat: 'VIP - Gate 3',
    qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=TK-882'
  }
])
</script>

<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-2xl font-bold text-slate-800">የእኔ ትኬቶች (My Tickets)</h1>
      <p class="text-xs text-slate-400 mt-1">ለጨዋታዎች የቆረጧቸውን ዲጂታል ትኬቶች እና QR Code እዚህ ያግኙ</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div 
        v-for="ticket in tickets" 
        :key="ticket.id" 
        class="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden flex flex-col justify-between"
      >
        <!-- Ticket Header -->
        <div class="bg-slate-900 text-white p-6 relative">
          <span class="text-[10px] font-bold tracking-widest text-emerald-400 uppercase">{{ ticket.league }}</span>
          <h2 class="text-lg font-bold mt-1">{{ ticket.match }}</h2>
          <p class="text-xs text-slate-400 mt-2">📍 {{ ticket.stadium }}</p>
        </div>

        <!-- Ticket Body -->
        <div class="p-6 flex justify-between items-center bg-slate-50/50">
          <div class="space-y-2">
            <div>
              <span class="text-[10px] text-slate-400 uppercase font-bold block">ቀንና ሰዓት</span>
              <span class="text-xs font-bold text-slate-700">📅 {{ ticket.date }} ({{ ticket.time }})</span>
            </div>
            <div>
              <span class="text-[10px] text-slate-400 uppercase font-bold block">የመቀመጫ ቦታ</span>
              <span class="text-xs font-black text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                {{ ticket.seat }}
              </span>
            </div>
          </div>

          <!-- Mock QR Code -->
          <div class="text-center">
            <img :src="ticket.qrCode" alt="QR Code" class="w-20 h-20 rounded-lg border p-1 bg-white" />
            <span class="text-[9px] font-mono text-slate-400 mt-1 block">{{ ticket.id }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>