<script setup>
import { ref } from 'vue'

useHead({ title: 'Contact - EthioSport' })

const faqs = ref([
  { question: 'ሜዳ እንዴት ማስያዝ እችላለሁ?', answer: 'ወደ Venues ገጽ በመሄድ የሚፈልጉትን ሜዳ ይምረጡ፣ ቀን እና ሰዓት መርጠው ያስይዙ።', isOpen: false },
  { question: 'ክፍያ በምን መፈፀም ይቻላል?', answer: 'በቴሌብር፣ በሲቢኢ ብር (CBE Birr) እና በባንክ ካርዶች ክፍያ መፈፀም ይችላሉ።', isOpen: false }
])

const toggleFaq = (idx) => {
  faqs.value[idx].isOpen = !faqs.value[idx].isOpen
}
</script>

<template>
  <div class="min-h-screen bg-slate-50 dark:bg-[#070b10] text-slate-800 dark:text-slate-100 py-8 px-4 sm:px-6 lg:px-8">
    <div class="max-w-7xl mx-auto space-y-12">
      
      <!-- Contact Container -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Form -->
        <div class="bg-white dark:bg-[#131c27] p-8 rounded-3xl border border-slate-200 dark:border-[#212e3e] space-y-6">
          <h2 class="text-2xl font-black">መልእክት ይላኩልን</h2>
          <form class="space-y-4 text-xs font-semibold">
            <div>
              <label class="block mb-1">ስም</label>
              <input type="text" placeholder="ሙሉ ስምዎን ያስገቡ" class="w-full p-3 rounded-xl bg-slate-50 dark:bg-[#0b111a] border border-slate-200 dark:border-[#212e3e]" />
            </div>
            <div>
              <label class="block mb-1">ኢሜይል / ስልክ ቁጥር</label>
              <input type="text" placeholder="09..." class="w-full p-3 rounded-xl bg-slate-50 dark:bg-[#0b111a] border border-slate-200 dark:border-[#212e3e]" />
            </div>
            <div>
              <label class="block mb-1">መልእክት</label>
              <textarea rows="4" placeholder="መልእክትዎን እዚህ ይጻፉ..." class="w-full p-3 rounded-xl bg-slate-50 dark:bg-[#0b111a] border border-slate-200 dark:border-[#212e3e]"></textarea>
            </div>
            <button type="button" class="w-full py-3 bg-emerald-500 text-slate-950 font-bold text-sm rounded-xl">መልእክት ላክ</button>
          </form>
        </div>

        <!-- Google Map Integration Dummy Frame -->
        <div class="bg-white dark:bg-[#131c27] rounded-3xl border border-slate-200 dark:border-[#212e3e] overflow-hidden min-h-[300px] flex items-center justify-center relative">
          <iframe 
            src="https://maps.google.com/maps?q=Addis%20Ababa&t=&z=13&ie=UTF8&iwloc=&output=embed" 
            class="w-full h-full absolute inset-0 border-0" 
            loading="lazy"
          ></iframe>
        </div>
      </div>

      <!-- FAQ Accordion -->
      <div class="max-w-3xl mx-auto space-y-4">
        <h3 class="text-xl font-black text-center">ተደጋግመው የሚጠየቁ ጥያቄዎች (FAQ)</h3>
        <div v-for="(faq, idx) in faqs" :key="idx" class="bg-white dark:bg-[#131c27] rounded-2xl border border-slate-200 dark:border-[#212e3e] overflow-hidden">
          <button @click="toggleFaq(idx)" class="w-full p-5 text-left font-bold text-sm flex justify-between items-center">
            <span>{{ faq.question }}</span>
            <span>{{ faq.isOpen ? '▲' : '▼' }}</span>
          </button>
          <div v-if="faq.isOpen" class="p-5 pt-0 text-xs text-slate-500 border-t border-slate-100 dark:border-[#212e3e]">
            {{ faq.answer }}
          </div>
        </div>
      </div>

    </div>
  </div>
</template>