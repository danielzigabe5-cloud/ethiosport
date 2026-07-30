<!-- components/GetStartedModal.vue -->
<template>
  <!-- 1. z-[999] በመጠቀም ከ Navbar በላይ መሆኑ ተረጋግጧል -->
  <div 
    v-if="isOpen" 
    class="fixed inset-0 z-[999] flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4 overflow-y-auto"
    @click.self="closeModal"
  >
    <!-- 2. የሞዳሉ ሳጥን (በስክሪኑ መሃል እንዲሆን my-auto ተጨምሯል) -->
    <div class="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl my-auto">
      
      <!-- X (Close) Button -->
      <button 
        @click="closeModal" 
        class="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition cursor-pointer"
      >
        ✕
      </button>

      <!-- Step 1: ቁጥር/ኢሜይል መጠየቂያ -->
      <div v-if="step === 'check'">
        <h3 class="text-xl font-bold text-white mb-2 text-center">ወደ ኢትዮ ስፖርት ይጀምሩ</h3>
        <p class="text-slate-400 text-xs mb-6 text-center">ለማስቀጠል ኢሜይልዎን ወይም ስልክ ቁጥርዎን ያስገቡ</p>
        
        <form @submit.prevent="checkUser" class="space-y-4">
          <div>
            <label class="block text-slate-300 text-xs mb-1">ኢሜይል ወይም ስልክ</label>
            <input 
              v-model="identifier" 
              type="text" 
              placeholder="example@mail.com ወይም 09..." 
              required
              class="w-full bg-slate-800 border border-slate-700 text-white rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none transition"
            >
          </div>
          <button 
            type="submit" 
            class="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-2.5 rounded-lg text-sm transition cursor-pointer"
          >
            ቀጥል
          </button>
        </form>
      </div>

      <!-- Step 2A: ነባር ከሆነ (LOGIN FORM) -->
      <div v-else-if="step === 'login'">
        <h3 class="text-xl font-bold text-white mb-2 text-center">እንኳን ደህና መጡ!</h3>
        <p class="text-slate-400 text-xs mb-4 text-center">{{ identifier }}</p>
        
        <form @submit.prevent="handleLogin" class="space-y-4">
          <div>
            <label class="block text-slate-300 text-xs mb-1">የይለፍ ቃል</label>
            <input 
              v-model="password" 
              type="password" 
              placeholder="••••••••" 
              required
              class="w-full bg-slate-800 border border-slate-700 text-white rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none transition"
            >
          </div>
          <button 
            type="submit" 
            class="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-2.5 rounded-lg text-sm transition cursor-pointer"
          >
            ይግቡ (Login)
          </button>
          <button 
            type="button" 
            @click="step = 'check'" 
            class="w-full text-xs text-slate-400 hover:underline text-center block cursor-pointer mt-2"
          >
            ተመለስ / ሌላ ቁጥር ቀይር
          </button>
        </form>
      </div>

      <!-- Step 2B: አዲስ ከሆነ (REGISTER FORM) -->
      <div v-else-if="step === 'register'">
        <h3 class="text-xl font-bold text-white mb-2 text-center">አዲስ አካውንት ይፍጠሩ</h3>
        <p class="text-slate-400 text-xs mb-4 text-center">መረጃዎን በመሙላት ይመዝገቡ</p>
        
        <form @submit.prevent="handleRegister" class="space-y-3">
          <div>
            <label class="block text-slate-300 text-xs mb-1">ሙሉ ስም</label>
            <input 
              v-model="regData.fullname" 
              type="text" 
              required 
              class="w-full bg-slate-800 border border-slate-700 text-white rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none transition"
            >
          </div>
          <div>
            <label class="block text-slate-300 text-xs mb-1">የይለፍ ቃል</label>
            <input 
              v-model="regData.password" 
              type="password" 
              required 
              class="w-full bg-slate-800 border border-slate-700 text-white rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none transition"
            >
          </div>
          <button 
            type="submit" 
            class="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-2.5 rounded-lg text-sm transition mt-2 cursor-pointer"
          >
            ይምዝገቡ (Register)
          </button>
          <button 
            type="button" 
            @click="step = 'check'" 
            class="w-full text-xs text-slate-400 hover:underline text-center block cursor-pointer mt-2"
          >
            ተመለስ
          </button>
        </form>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({ isOpen: Boolean })
const emit = defineEmits(['close'])

const step = ref('check') // 'check', 'login', 'register'
const identifier = ref('')
const password = ref('')
const regData = ref({ fullname: '', password: '' })

// አስመሳይ የተመዘገቡ ተጠቃሚዎች ዝርዝር
const existingUsers = ['0911111111', 'test@gmail.com']

const checkUser = () => {
  if (existingUsers.includes(identifier.value)) {
    step.value = 'login'
  } else {
    step.value = 'register'
  }
}

const handleLogin = () => {
  alert('በተሳካ ሁኔታ ገብተዋል!')
  closeModal()
}

const handleRegister = () => {
  alert('ምዝገባዎ ተጠናቋል!')
  closeModal()
}

const closeModal = () => {
  step.value = 'check'
  identifier.value = ''
  password.value = ''
  regData.value = { fullname: '', password: '' }
  emit('close')
}
</script>