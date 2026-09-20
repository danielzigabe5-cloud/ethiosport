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
</script>

<template>
  <div class="space-y-6 max-w-5xl">
    <!-- Header -->
    <div>
      <h1 class="text-2xl font-black text-white tracking-tight">የእርዳታ ማዕከል (Support)</h1>
      <p class="text-xs sm:text-sm text-slate-400 mt-1">
        የቴክኒክ ችግር ካጋጠመዎት ወይም ተጨማሪ ጥያቄ ካለዎት ከታች ባሉት አማራጮች የድጋፍ ቡድናችንን ማነጋገር ይችላሉ።
      </p>
    </div>

    <!-- Contact Cards (Phone, Telegram, Email) -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <a href="tel:+251911000000" class="bg-[#0f172a] border border-slate-800 hover:border-emerald-500/50 p-5 rounded-2xl flex items-center gap-4 transition duration-200 group cursor-pointer shadow-xs">
        <div class="p-3.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-xl group-hover:scale-110 transition duration-200 shrink-0">
          <Icon name="lucide:phone-call" class="w-6 h-6" />
        </div>
        <div>
          <span class="text-xs text-slate-400 font-semibold block mb-0.5">በስልክ ይደውሉ</span>
          <span class="text-sm font-bold text-white group-hover:text-emerald-400 transition"> +251 911 000 000</span>
        </div>
      </a>

      <a href="https://t.me/ethiosport_support" target="_blank" class="bg-[#0f172a] border border-slate-800 hover:border-sky-500/50 p-5 rounded-2xl flex items-center gap-4 transition duration-200 group cursor-pointer shadow-xs">
        <div class="p-3.5 bg-sky-500/10 text-sky-400 border border-sky-500/20 rounded-xl group-hover:scale-110 transition duration-200 shrink-0">
          <Icon name="lucide:send" class="w-6 h-6" />
        </div>
        <div>
          <span class="text-xs text-slate-400 font-semibold block mb-0.5">በቴሌግራም ያነጋግሩን</span>
          <span class="text-sm font-bold text-white group-hover:text-sky-400 transition">@EthioSportSupport</span>
        </div>
      </a>

      <a href="mailto:support@ethiosport.et" class="bg-[#0f172a] border border-slate-800 hover:border-amber-500/50 p-5 rounded-2xl flex items-center gap-4 transition duration-200 group cursor-pointer shadow-xs">
        <div class="p-3.5 bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-xl group-hover:scale-110 transition duration-200 shrink-0">
          <Icon name="lucide:mail" class="w-6 h-6" />
        </div>
        <div>
          <span class="text-xs text-slate-400 font-semibold block mb-0.5">በኢሜይል ይፃፉልን</span>
          <span class="text-sm font-bold text-white group-hover:text-amber-400 transition">support@ethiosport.et</span>
        </div>
      </a>
    </div>

    <!-- FAQ Accordion Section -->
    <div class="bg-[#0f172a] border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xs">
      <h3 class="text-base font-bold text-white border-b border-slate-800 pb-3">ተደጋግመው የሚጠየቁ ጥያቄዎች (FAQ)</h3>

      <div class="space-y-3">
        <div 
          v-for="(faq, index) in faqs" 
          :key="index" 
          class="border border-slate-800/80 hover:border-slate-700 rounded-xl overflow-hidden bg-[#0c1322] transition duration-200"
        >
          <button 
            @click="toggleFaq(index)"
            class="w-full text-left p-4 text-xs font-bold text-slate-200 flex items-center justify-between hover:text-emerald-400 transition cursor-pointer"
          >
            <span>{{ faq.question }}</span>
            <Icon 
              :name="faq.isOpen ? 'lucide:chevron-up' : 'lucide:chevron-down'" 
              class="w-4 h-4 text-slate-400 shrink-0 ml-2" 
            />
          </button>

          <div v-if="faq.isOpen" class="p-4 pt-0 text-xs text-slate-400 border-t border-slate-800/60 leading-relaxed mt-1">
            {{ faq.answer }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>