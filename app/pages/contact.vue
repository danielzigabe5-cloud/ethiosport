<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

// Route handling to capture coming references from previous pages (e.g. ?ref=5v5 Futsal Night)
const route = useRoute()

useHead({ title: 'Contact Us - EthioSport Combolojo' })

// Form State
const formData = ref({
  fullName: '',
  contactInfo: '',
  subject: '',
  message: ''
})

const isSubmitting = ref(false)
const showSuccessMessage = ref(false)
const errorMessage = ref('')

// Pre-fill subject or message if redirected from another page
onMounted(() => {
  if (route.query.ref) {
    formData.value.subject = `Inquiry regarding: ${route.query.ref}`
    formData.value.message = `Hello, I would like to get more details or participate in "${route.query.ref}".`
  }
})

// FAQ Accordion State
const faqs = ref([
  { question: 'How can I book a venue?', answer: 'Go to the Venues page, select your preferred venue, pick a date and time, and complete the booking in just a few clicks.', isOpen: false },
  { question: 'What payment methods are supported?', answer: 'You can pay using Telebirr, CBE Birr, and credit/debit cards (Mastercard/Visa).', isOpen: false },
  { question: 'Can I cancel or reschedule my booking?', answer: 'Yes! If you cancel at least 24 hours before the game starts, you will receive a full refund.', isOpen: false },
  { question: 'Can I rent a venue for private tournaments or corporate events?', answer: 'Yes, we offer special arrangements for corporate events and large tournaments. Please give us a call for details.', isOpen: false }
])

const toggleFaq = (idx) => {
  faqs.value[idx].isOpen = !faqs.value[idx].isOpen
}

// Form Submission Handler
const handleSubmit = () => {
  errorMessage.value = ''
  
  if (!formData.value.fullName || !formData.value.contactInfo || !formData.value.message) {
    errorMessage.value = 'Please fill in all required fields correctly!'
    return
  }

  isSubmitting.value = true

  // Simulate API Call
  setTimeout(() => {
    isSubmitting.value = false
    showSuccessMessage.value = true

    // Reset Form
    formData.value = {
      fullName: '',
      contactInfo: '',
      subject: '',
      message: ''
    }

    // Hide success message after 5 seconds
    setTimeout(() => {
      showSuccessMessage.value = false
    }, 5000)
  }, 1200)
}
</script>

<template>
  <div class="min-h-screen bg-slate-50 dark:bg-[#070b10] text-slate-800 dark:text-slate-100 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
    <div class="max-w-7xl mx-auto space-y-12">
      
      <!-- PAGE HEADER -->
      <div class="text-center max-w-2xl mx-auto space-y-3">
        <span class="px-3 py-1 bg-emerald-500/10 text-emerald-500 rounded-full text-xs font-bold uppercase tracking-widest border border-emerald-500/20">
          Get In Touch
        </span>
        <h1 class="text-3xl md:text-5xl font-black text-slate-900 dark:text-white">Contact Us</h1>
        <p class="text-slate-500 dark:text-slate-400 text-sm md:text-base font-medium">
          Have questions, feedback, or need help with booking a venue? Send us a message and we'll reply promptly!
        </p>
      </div>

      <!-- CONTACT INFO CARDS -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="bg-white dark:bg-[#131c27] p-6 rounded-3xl border border-slate-200 dark:border-[#212e3e] shadow-sm flex items-center gap-4">
          <div class="w-12 h-12 bg-emerald-500/10 text-emerald-500 rounded-2xl flex items-center justify-center text-xl font-bold border border-emerald-500/20">
            📞
          </div>
          <div>
            <h4 class="text-xs text-slate-400 font-bold uppercase tracking-wider">Phone Number</h4>
            <p class="text-sm font-black text-slate-900 dark:text-white mt-0.5">+251 911 000 000</p>
            <p class="text-[11px] text-slate-500">+251 922 111 222</p>
          </div>
        </div>

        <div class="bg-white dark:bg-[#131c27] p-6 rounded-3xl border border-slate-200 dark:border-[#212e3e] shadow-sm flex items-center gap-4">
          <div class="w-12 h-12 bg-emerald-500/10 text-emerald-500 rounded-2xl flex items-center justify-center text-xl font-bold border border-emerald-500/20">
            ✉️
          </div>
          <div>
            <h4 class="text-xs text-slate-400 font-bold uppercase tracking-wider">Email Address</h4>
            <p class="text-sm font-black text-slate-900 dark:text-white mt-0.5">support@ethiosport.com</p>
            <p class="text-[11px] text-slate-500">info@combolojo.com</p>
          </div>
        </div>

        <div class="bg-white dark:bg-[#131c27] p-6 rounded-3xl border border-slate-200 dark:border-[#212e3e] shadow-sm flex items-center gap-4">
          <div class="w-12 h-12 bg-emerald-500/10 text-emerald-500 rounded-2xl flex items-center justify-center text-xl font-bold border border-emerald-500/20">
            📍
          </div>
          <div>
            <h4 class="text-xs text-slate-400 font-bold uppercase tracking-wider">Headquarters</h4>
            <p class="text-sm font-black text-slate-900 dark:text-white mt-0.5">Addis Ababa, Ethiopia</p>
            <p class="text-[11px] text-slate-500">Bole, Near Edna Mall</p>
          </div>
        </div>
      </div>

      <!-- MAIN CONTENT: FORM + GOOGLE MAP -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        
        <!-- CONTACT FORM -->
        <div class="bg-white dark:bg-[#131c27] p-8 rounded-3xl border border-slate-200 dark:border-[#212e3e] shadow-sm space-y-6">
          <div>
            <h2 class="text-2xl font-black text-slate-900 dark:text-white">Send Us a Message</h2>
            <p class="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">Fill out the form below to reach us.</p>
          </div>

          <!-- SUCCESS ALERT -->
          <transition name="fade">
            <div v-if="showSuccessMessage" class="p-4 bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 rounded-2xl text-xs font-bold flex items-center gap-2">
              <span>✅</span> Your message has been sent successfully! We will get back to you shortly.
            </div>
          </transition>

          <!-- ERROR ALERT -->
          <transition name="fade">
            <div v-if="errorMessage" class="p-4 bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-400 rounded-2xl text-xs font-bold flex items-center gap-2">
              <span>⚠️</span> {{ errorMessage }}
            </div>
          </transition>

          <form @submit.prevent="handleSubmit" class="space-y-4 text-xs font-semibold">
            <div>
              <label class="block mb-1.5 text-slate-700 dark:text-slate-300">Full Name <span class="text-rose-500">*</span></label>
              <input 
                v-model="formData.fullName"
                type="text" 
                placeholder="Enter your full name" 
                class="w-full p-3.5 rounded-xl bg-slate-50 dark:bg-[#0b111a] border border-slate-200 dark:border-[#212e3e] text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 dark:focus:border-emerald-500 transition-colors" 
              />
            </div>

            <div>
              <label class="block mb-1.5 text-slate-700 dark:text-slate-300">Email / Phone Number <span class="text-rose-500">*</span></label>
              <input 
                v-model="formData.contactInfo"
                type="text" 
                placeholder="09... or name@example.com" 
                class="w-full p-3.5 rounded-xl bg-slate-50 dark:bg-[#0b111a] border border-slate-200 dark:border-[#212e3e] text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 dark:focus:border-emerald-500 transition-colors" 
              />
            </div>

            <div>
              <label class="block mb-1.5 text-slate-700 dark:text-slate-300">Subject</label>
              <input 
                v-model="formData.subject"
                type="text" 
                placeholder="e.g., Venue Booking Inquiry" 
                class="w-full p-3.5 rounded-xl bg-slate-50 dark:bg-[#0b111a] border border-slate-200 dark:border-[#212e3e] text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 dark:focus:border-emerald-500 transition-colors" 
              />
            </div>

            <div>
              <label class="block mb-1.5 text-slate-700 dark:text-slate-300">Message <span class="text-rose-500">*</span></label>
              <textarea 
                v-model="formData.message"
                rows="4" 
                placeholder="Type your message here..." 
                class="w-full p-3.5 rounded-xl bg-slate-50 dark:bg-[#0b111a] border border-slate-200 dark:border-[#212e3e] text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 dark:focus:border-emerald-500 transition-colors resize-none"
              ></textarea>
            </div>

            <button 
              type="submit" 
              :disabled="isSubmitting"
              class="w-full py-4 bg-emerald-500 hover:bg-emerald-600 active:scale-98 text-slate-950 font-black text-sm rounded-xl shadow-lg shadow-emerald-500/20 transition-all duration-200 disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span v-if="isSubmitting" class="w-4 h-4 border-2 border-slate-950/30 border-t-slate-950 rounded-full animate-spin"></span>
              <span>{{ isSubmitting ? 'Sending...' : 'Send Message' }}</span>
            </button>
          </form>
        </div>

        <!-- GOOGLE MAP INTEGRATION -->
        <div class="bg-white dark:bg-[#131c27] p-2 rounded-3xl border border-slate-200 dark:border-[#212e3e] shadow-sm overflow-hidden h-[480px] relative flex flex-col">
          <div class="p-4">
            <h3 class="text-sm font-black text-slate-900 dark:text-white">Our Location</h3>
            <p class="text-xs text-slate-500 dark:text-slate-400">Bole, Addis Ababa - Ethiopia</p>
          </div>
          <div class="flex-1 rounded-2xl overflow-hidden relative">
            <iframe 
              src="https://maps.google.com/maps?q=Bole%20Medhanialem%20Addis%20Ababa&t=&z=14&ie=UTF8&iwloc=&output=embed" 
              class="w-full h-full border-0 absolute inset-0" 
              loading="lazy"
              allowfullscreen
            ></iframe>
          </div>
        </div>

      </div>

      <!-- FAQ ACCORDION -->
      <div class="max-w-3xl mx-auto space-y-6 pt-6">
        <div class="text-center space-y-2">
          <h3 class="text-2xl font-black text-slate-900 dark:text-white">Frequently Asked Questions (FAQ)</h3>
          <p class="text-xs text-slate-500 dark:text-slate-400">Find quick answers to common questions about our service below</p>
        </div>

        <div class="space-y-3">
          <div 
            v-for="(faq, idx) in faqs" 
            :key="idx" 
            class="bg-white dark:bg-[#131c27] rounded-2xl border border-slate-200 dark:border-[#212e3e] overflow-hidden transition-all duration-200 shadow-sm"
          >
            <button 
              @click="toggleFaq(idx)" 
              class="w-full p-5 text-left font-bold text-xs md:text-sm flex justify-between items-center gap-4 hover:bg-slate-50 dark:hover:bg-[#182330] transition-colors cursor-pointer"
            >
              <span class="text-slate-900 dark:text-white">{{ faq.question }}</span>
              <span class="text-emerald-500 text-xs font-black transition-transform duration-200" :class="{ 'rotate-180': faq.isOpen }">
                ▼
              </span>
            </button>
            <transition name="accordion">
              <div v-if="faq.isOpen" class="p-5 pt-0 text-xs text-slate-600 dark:text-slate-400 border-t border-slate-100 dark:border-[#212e3e]/60 leading-relaxed">
                {{ faq.answer }}
              </div>
            </transition>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.accordion-enter-active,
.accordion-leave-active {
  transition: all 0.2s ease-out;
  max-height: 200px;
}

.accordion-enter-from,
.accordion-leave-to {
  opacity: 0;
  max-height: 0;
}
</style>