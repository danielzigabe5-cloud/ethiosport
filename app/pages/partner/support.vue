<script setup lang="ts">
import { ref } from 'vue'

definePageMeta({ layout: 'partner' })

// 1. FAQ Items State
interface FAQ {
  question: string
  answer: string
  isOpen: boolean
}

const faqs = ref<FAQ[]>([
  {
    question: 'ከሜዳ ማስያዣ የሚሰበሰበውን ገንዘብ እንዴት ማውጣት እችላለሁ?',
    answer: 'በ "የክፍያ ታሪክ (Payouts)" ገጽ ላይ በመግባት "ገንዘብ ወጪ አድርግ" የሚለውን በመጫን የጥያቄ መጠንና የባንክ አካውንትዎን በማስገባት በ 24 ሰአት ውስጥ ገቢ ማድረግ ይችላሉ።',
    isOpen: false
  },
  {
    question: 'የሜዳ ማስያዣ ዋጋን ወይም ሰአታትን እንዴት ማስተካከል እችላለሁ?',
    answer: 'በ "የእኔ ሜዳዎች" ገጽ ውስጥ የፈለጉትን ሜዳ መርጠው "Edit" የሚለውን በመጫን ዋጋ፣ የሜዳ አይነት እና ሌሎች መረጃዎችን በቅርቡ ማስተካከል ይችላሉ።',
    isOpen: false
  },
  {
    question: 'ደንበኛ የያዘውን ሰአት ቢሰርዝ ገንዘቡ እንዴት ይሆናል?',
    answer: 'የስረዛ ፖሊሲው እንደ ድርጅቱ ህግ የሚወሰን ሲሆን ደንበኛው ከ 12 ሰአት በፊት ከሰረዘ ሙሉ ገንዘቡ ይመለስለታል፤ አለበለዚያ የተወሰነ ቅጣት ታስቦ ቀሪው ገቢ ይደረጋል።',
    isOpen: false
  }
])

const toggleFaq = (index: number) => {
  faqs.value[index].isOpen = !faqs.value[index].isOpen
}

// 2. Support Ticket State
const ticketForm = ref({
  subject: '',
  category: 'Technical',
  message: '',
  priority: 'medium'
})

const isSubmitting = ref(false)
const showSuccessAlert = ref(false)

// 3. Mock Tickets List
interface Ticket {
  id: string
  subject: string
  date: string
  status: 'Open' | 'Resolved' | 'In Progress'
}

const existingTickets = ref<Ticket[]>([
  { id: 'TCK-8821', subject: 'የቴሌብር ክፍያ ማረጋገጫ አልደረሰኝም', date: '2026-08-25', status: 'Resolved' },
  { id: 'TCK-9012', subject: 'የሜዳ አዲስ ፎቶ መስቀል አልቻልኩም', date: '2026-08-29', status: 'In Progress' }
])

// Submit Support Ticket
const handleSubmitTicket = () => {
  if (!ticketForm.value.subject || !ticketForm.value.message) return

  isSubmitting.value = true

  setTimeout(() => {
    existingTickets.value.unshift({
      id: `TCK-${Math.floor(1000 + Math.random() * 9000)}`,
      subject: ticketForm.value.subject,
      date: new Date().toISOString().split('T')[0],
      status: 'Open'
    })

    isSubmitting.value = false
    showSuccessAlert.value = true
    
    ticketForm.value = {
      subject: '',
      category: 'Technical',
      message: '',
      priority: 'medium'
    }

    setTimeout(() => {
      showSuccessAlert.value = false
    }, 4000)
  }, 800)
}
</script>

<template>
  <div class="space-y-6 max-w-6xl">
    <!-- Header -->
    <div>
      <h1 class="text-2xl font-black text-white">የእርዳታ ማዕከል (Support)</h1>
      <p class="text-xs sm:text-sm text-slate-400 mt-1">
        የቴክኒክ ችግር ካጋጠመዎት ወይም ተጨማሪ ጥያቄ ካለዎት የድጋፍ ቡድናችንን ያነጋግሩ።
      </p>
    </div>

    <!-- Quick Contact Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <a href="tel:+251911000000" class="bg-[#0d1522] border border-[#1a2432] hover:border-emerald-500/50 p-4 rounded-2xl flex items-center gap-4 transition group cursor-pointer">
        <div class="p-3 bg-emerald-500/10 text-emerald-400 rounded-xl group-hover:scale-110 transition">
          <Icon name="lucide:phone-call" class="w-5 h-5" />
        </div>
        <div>
          <span class="text-[11px] text-slate-400 font-semibold block">በስልክ ይደውሉ</span>
          <span class="text-xs sm:text-sm font-bold text-white">+251 911 000 000</span>
        </div>
      </a>

      <a href="https://t.me/ethiosport_support" target="_blank" class="bg-[#0d1522] border border-[#1a2432] hover:border-emerald-500/50 p-4 rounded-2xl flex items-center gap-4 transition group cursor-pointer">
        <div class="p-3 bg-sky-500/10 text-sky-400 rounded-xl group-hover:scale-110 transition">
          <Icon name="lucide:send" class="w-5 h-5" />
        </div>
        <div>
          <span class="text-[11px] text-slate-400 font-semibold block">በቴሌግራም ያነጋግሩን</span>
          <span class="text-xs sm:text-sm font-bold text-white">@EthioSportSupport</span>
        </div>
      </a>

      <a href="mailto:support@ethiosport.et" class="bg-[#0d1522] border border-[#1a2432] hover:border-emerald-500/50 p-4 rounded-2xl flex items-center gap-4 transition group cursor-pointer">
        <div class="p-3 bg-amber-500/10 text-amber-400 rounded-xl group-hover:scale-110 transition">
          <Icon name="lucide:mail" class="w-5 h-5" />
        </div>
        <div>
          <span class="text-[11px] text-slate-400 font-semibold block">በኢሜይል ይፃፉልን</span>
          <span class="text-xs sm:text-sm font-bold text-white">support@ethiosport.et</span>
        </div>
      </a>
    </div>

    <!-- Main Section: Form & Previous Tickets -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      <!-- Contact Form (2 Cols) -->
      <div class="lg:col-span-2 bg-[#0d1522] border border-[#1a2432] rounded-2xl p-6 space-y-5">
        <div class="border-b border-[#1a2432] pb-3">
          <h3 class="text-base font-bold text-white">የእርዳታ ጥያቄ (Support Ticket) ላክ</h3>
          <p class="text-xs text-slate-400 mt-0.5">ቡድናችን በጥያቄዎ መሰረት በፍጥነት ምላሽ ይሰጥዎታል።</p>
        </div>

        <div v-if="showSuccessAlert" class="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400 text-xs font-bold flex items-center gap-2">
          <Icon name="lucide:check-circle" class="w-4 h-4 shrink-0" />
          <span>ጥያቄዎ በስኬት ተልኳል! በቅርቡ በስልክ ወይም በኢሜይል እንመልስልዎታለን።</span>
        </div>

        <form @submit.prevent="handleSubmitTicket" class="space-y-4">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-semibold text-slate-300 mb-1">የጥያቄው ርዕስ</label>
              <input 
                v-model="ticketForm.subject" 
                type="text" 
                required
                placeholder="ምሳሌ፡ የክፍያ መዘግየት አጋጥሞኛል"
                class="w-full bg-[#070c14] border border-[#1a2432] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label class="block text-xs font-semibold text-slate-300 mb-1">የጥያቄው አይነት (Category)</label>
              <select 
                v-model="ticketForm.category"
                class="w-full bg-[#070c14] border border-[#1a2432] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
              >
                <option value="Technical">የቴክኒክ / የሲስተም ችግር</option>
                <option value="Payout">የክፍያ እና ባንክ ጥያቄ</option>
                <option value="Booking">የማስያዣ (Booking) ችግር</option>
                <option value="General">ሌላ አጠቃላይ ጥያቄ</option>
              </select>
            </div>
          </div>

          <div>
            <label class="block text-xs font-semibold text-slate-300 mb-1">ዝርዝር ማብራሪያ</label>
            <textarea 
              v-model="ticketForm.message" 
              rows="4" 
              required
              placeholder="ያጋጠመዎትን ችግር በዝርዝር እዚህ ያስቀምጡ..."
              class="w-full bg-[#070c14] border border-[#1a2432] rounded-xl p-4 text-xs text-white focus:outline-none focus:border-emerald-500 resize-none"
            ></textarea>
          </div>

          <div class="flex justify-end">
            <button 
              type="submit" 
              :disabled="isSubmitting"
              class="bg-emerald-500 hover:bg-emerald-400 text-slate-950 px-6 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition active:scale-95 disabled:opacity-50 cursor-pointer"
            >
              <Icon v-if="isSubmitting" name="lucide:loader-2" class="w-4 h-4 animate-spin" />
              <span>ጥያቄውን ላክ (Submit Ticket)</span>
            </button>
          </div>
        </form>
      </div>

      <!-- Recent Tickets (1 Col) -->
      <div class="bg-[#0d1522] border border-[#1a2432] rounded-2xl p-6 space-y-4">
        <h3 class="text-base font-bold text-white border-b border-[#1a2432] pb-3">የተላኩ ጥያቄዎች</h3>

        <div class="space-y-3">
          <div 
            v-for="ticket in existingTickets" 
            :key="ticket.id" 
            class="bg-[#070c14] border border-[#1a2432] p-3.5 rounded-xl space-y-2"
          >
            <div class="flex items-center justify-between">
              <span class="text-[11px] font-mono font-bold text-emerald-400">{{ ticket.id }}</span>
              <span 
                class="px-2 py-0.5 rounded text-[10px] font-bold"
                :class="{
                  'bg-emerald-500/10 text-emerald-400': ticket.status === 'Resolved',
                  'bg-amber-500/10 text-amber-400': ticket.status === 'In Progress',
                  'bg-sky-500/10 text-sky-400': ticket.status === 'Open'
                }"
              >
                {{ ticket.status === 'Resolved' ? 'የተመለሰ' : ticket.status === 'In Progress' ? 'በሂደት ላይ' : 'አዲስ' }}
              </span>
            </div>
            <p class="text-xs font-semibold text-slate-200 line-clamp-1">{{ ticket.subject }}</p>
            <span class="text-[10px] text-slate-500 block">{{ ticket.date }}</span>
          </div>
        </div>
      </div>

    </div>

    <!-- FAQ Accordion Section -->
    <div class="bg-[#0d1522] border border-[#1a2432] rounded-2xl p-6 space-y-4">
      <h3 class="text-base font-bold text-white border-b border-[#1a2432] pb-3">ተደጋግመው የሚጠየቁ ጥያቄዎች (FAQ)</h3>

      <div class="space-y-3">
        <div 
          v-for="(faq, index) in faqs" 
          :key="index" 
          class="border border-[#1a2432] rounded-xl overflow-hidden bg-[#070c14]"
        >
          <button 
            @click="toggleFaq(index)"
            class="w-full text-left p-4 text-xs font-bold text-slate-200 flex items-center justify-between hover:text-emerald-400 transition cursor-pointer"
          >
            <span>{{ faq.question }}</span>
            <Icon 
              :name="faq.isOpen ? 'lucide:chevron-up' : 'lucide:chevron-down'" 
              class="w-4 h-4 text-slate-400 shrink-0" 
            />
          </button>

          <div v-if="faq.isOpen" class="p-4 pt-0 text-xs text-slate-400 border-t border-[#1a2432]/50 leading-relaxed">
            {{ faq.answer }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>