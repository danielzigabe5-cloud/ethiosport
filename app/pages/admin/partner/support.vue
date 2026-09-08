<script setup lang="ts">
import { ref } from 'vue'

definePageMeta({
  layout: 'partner'
})

const subject = ref('')
const message = ref('')
const isSubmitted = ref(false)

const handleSubmit = () => {
  if (!subject.value || !message.value) return
  isSubmitted.value = true
  subject.value = ''
  message.value = ''
}
</script>

<template>
  <div class="space-y-6 max-w-3xl mx-auto font-sans">
    <div>
      <h1 class="text-xl font-black text-white">📣 Support</h1>
      <p class="text-xs text-slate-400">ያጋጠመዎትን ችግር ወይም አስተያየት ለአድሚኑ ያድርሱ።</p>
    </div>

    <div class="bg-[#0b111a] border border-[#1a2432] p-6 rounded-2xl space-y-4">
      <div v-if="isSubmitted" class="p-3 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-xl text-xs font-bold">
        ✅ ሪፖርትዎ በትክክል ደርሷል። በአጭር ጊዜ ውስጥ እናነጋግርዎታለን!
      </div>

      <div>
        <label class="text-[11px] font-semibold text-slate-300 mb-1 block">የጉዳዩ ርዕስ</label>
        <input 
          v-model="subject"
          type="text" 
          placeholder="ምሳሌ: የክፍያ ወይም የሲስተም ችግር..." 
          class="w-full bg-[#131c27] border border-[#212e3e] p-3 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-500 transition"
        />
      </div>

      <div>
        <label class="text-[11px] font-semibold text-slate-300 mb-1 block">ዝርዝር መግለጫ</label>
        <textarea 
          v-model="message"
          rows="5" 
          placeholder="ችግሩን በዝርዝር እዚህ ያስቀምጡ..." 
          class="w-full bg-[#131c27] border border-[#212e3e] p-3 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-500 transition"
        ></textarea>
      </div>

      <button 
        @click="handleSubmit"
        class="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-xs transition cursor-pointer"
      >
        ሪፖርቱን ላክ
      </button>
    </div>
  </div>
</template>