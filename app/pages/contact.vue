<template>
  <div class="min-h-screen bg-slate-950 py-12 px-6">
    <div class="max-w-4xl mx-auto space-y-8">
      
      <!-- ርዕስ -->
      <div class="text-center">
        <h1 class="text-3xl font-bold text-white mb-2">📞 ያግኙን (Contact Us)</h1>
        <p class="text-slate-400">ጥያቄ፣ አስተያየት ወይም የንግድ ጥያቄ ካለዎት ይፃፉልን</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-xl">
        <!-- Contact Info (ግራ በኩል) -->
        <div class="space-y-8">
          <div>
            <h3 class="text-xl font-bold text-white mb-4">አድራሻችን</h3>
            <div class="space-y-5 text-slate-300">
              <div class="flex items-start gap-4">
                <span class="text-emerald-500 text-xl">📍</span>
                <div>
                  <p class="font-semibold text-white">ቢሮአችን</p>
                  <p class="text-sm">አዲስ አበባ፣ ኢትዮጵያ (ቦሌ፣ ኤድናሞል አካባቢ)</p>
                </div>
              </div>
              <div class="flex items-start gap-4">
                <span class="text-emerald-500 text-xl">📞</span>
                <div>
                  <p class="font-semibold text-white">ስልክ</p>
                  <p class="text-sm">+251 911 00 00 00</p>
                </div>
              </div>
              <div class="flex items-start gap-4">
                <span class="text-emerald-500 text-xl">✉️</span>
                <div>
                  <p class="font-semibold text-white">ኢሜይል</p>
                  <p class="text-sm">info@ethiosporthub.com</p>
                </div>
              </div>
            </div>
          </div>

          <!-- ማህበራዊ ሚዲያ (Social Icons) -->
          <div class="pt-4 border-t border-slate-800">
            <p class="text-xs text-slate-500 uppercase tracking-widest mb-3">ይከተሉን</p>
            <div class="flex gap-4">
               <div class="w-8 h-8 bg-slate-800 rounded flex items-center justify-center hover:bg-emerald-600 transition cursor-pointer text-white">f</div>
               <div class="w-8 h-8 bg-slate-800 rounded flex items-center justify-center hover:bg-emerald-600 transition cursor-pointer text-white">t</div>
               <div class="w-8 h-8 bg-slate-800 rounded flex items-center justify-center hover:bg-emerald-600 transition cursor-pointer text-white">i</div>
            </div>
          </div>
        </div>

        <!-- Contact Form (ቀኝ በኩል) -->
        <form @submit.prevent="handleSubmit" class="space-y-4">
          <div>
            <label class="block text-xs text-slate-400 mb-1">ስምዎ</label>
            <input v-model="contactForm.name" type="text" required class="w-full bg-slate-800 border border-slate-700 text-white rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-500 transition" />
          </div>
          <div>
            <label class="block text-xs text-slate-400 mb-1">ኢሜይል</label>
            <input v-model="contactForm.email" type="email" required class="w-full bg-slate-800 border border-slate-700 text-white rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-500 transition" />
          </div>
          <div>
            <label class="block text-xs text-slate-400 mb-1">መልእክት</label>
            <textarea v-model="contactForm.message" rows="4" required class="w-full bg-slate-800 border border-slate-700 text-white rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-500 transition"></textarea>
          </div>
          <button type="submit" class="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg text-sm transition-all shadow-lg shadow-emerald-900/20">
            መልእክት ላክ
          </button>
        </form>
      </div>

      <!-- ካርታ (Map Location Section) -->
      <div class="w-full h-80 rounded-2xl overflow-hidden border border-slate-800 shadow-2xl">
        <!-- ይህ Google Maps Iframe ነው (ቦሌ አካባቢ እንዲያሳይ ተደርጓል) -->
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15762.33842189028!2d38.78187895!3d9.00065095!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b85002b1f8349%3A0xc4a38d975193f412!2sBole%2C%20Addis%20Ababa!5e0!3m2!1sen!2set!4v1700000000000!5m2!1sen!2set" 
          width="100%" 
          height="100%" 
          style="border:0;" 
          allowfullscreen="" 
          loading="lazy" 
          referrerpolicy="no-referrer-when-downgrade"
          class="grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
        ></iframe>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const contactForm = ref({
  name: '',
  email: '',
  message: ''
})

const handleSubmit = () => {
  alert('መልእክትዎ በተሳካ ሁኔታ ተልኳል! እናመሰግናለን።')
  contactForm.value = { name: '', email: '', message: '' } // ፎርሙን ባዶ ለማድረግ
}
</script>

<style scoped>
/* ካርታው ከድረገጹ ዲዛይን ጋር እንዲሄድ ጥቁር እና ነጭ (Grayscale) አድርጌዋለሁ */
iframe {
  filter: invert(90%) hue-rotate(180deg) brightness(95%) contrast(90%);
}
</style>