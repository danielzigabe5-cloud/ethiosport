<script setup>
import { ref } from 'vue'

const email = ref('')
const password = ref('')
const isLoading = ref(false)
const errorMessage = ref('')

const { login } = useAuth()

const handleLogin = async () => {
  isLoading.value = true
  errorMessage.value = ''

  try {
    let role = 'user'

    if (email.value.includes('partner')) {
      role = 'partner'
    } else if (email.value.includes('admin')) {
      role = 'admin'
    }

    // የ Auth State መመዝገብ
    login(role)

    // ወደሚገባው ገጽ ማዞር
    if (role === 'partner') {
      await navigateTo('/partner')
    } else if (role === 'admin') {
      await navigateTo('/admin')
    } else {
      await navigateTo('/dashboard')
    }

  } catch (err) {
    errorMessage.value = 'የተሳሳተ ኢሜይል ወይም የይለፍ ቃል!'
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen bg-[#070b10] flex flex-col items-center justify-center p-4">
    <div class="bg-[#0b111a] border border-[#1a2432] p-8 rounded-3xl max-w-md w-full space-y-6">
      
      <div class="text-center space-y-2">
        <h1 class="text-2xl font-black text-white">ወደ EthioSport ይግቡ</h1>
        <p class="text-xs text-slate-400">የተጫዋች፣ የፓርትነር ወይም የአድሚን አካውንትዎን ይጠቀሙ</p>
      </div>

      <form @submit.prevent="handleLogin" class="space-y-4">
        <div class="space-y-1">
          <label class="text-xs font-bold text-slate-300">ኢሜይል</label>
          <input 
            v-model="email"
            type="email" 
            placeholder="partner@example.com ወይም admin@example.com"
            required
            class="w-full bg-[#131c27] border border-[#212e3e] rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div class="space-y-1">
          <label class="text-xs font-bold text-slate-300">የይለፍ ቃል (Password)</label>
          <input 
            v-model="password"
            type="password" 
            required
            class="w-full bg-[#131c27] border border-[#212e3e] rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-emerald-500"
          />
        </div>

        <p v-if="errorMessage" class="text-xs text-rose-400 bg-rose-500/10 p-2.5 rounded-xl border border-rose-500/20 text-center">
          {{ errorMessage }}
        </p>

        <button 
          type="submit" 
          :disabled="isLoading"
          class="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs rounded-xl shadow-lg transition cursor-pointer"
        >
          {{ isLoading ? 'በመግባት ላይ...' : 'ይግቡ (Login)' }}
        </button>
      </form>

      <!-- Public Pages Links -->
      <div class="pt-4 border-t border-[#1a2432] text-center space-y-2">
        <p class="text-[11px] text-slate-400">ህዝባዊ ገጾችን መጎብኘት ይፈልጋሉ?</p>
        <div class="flex justify-center gap-3 text-xs text-emerald-400">
          <NuxtLink to="/" class="hover:underline">Home</NuxtLink>
          <span>•</span>
          <NuxtLink to="/privacy" class="hover:underline">Privacy</NuxtLink>
          <span>•</span>
          <NuxtLink to="/terms" class="hover:underline">Terms</NuxtLink>
          <span>•</span>
          <NuxtLink to="/faq" class="hover:underline">FAQ</NuxtLink>
        </div>
      </div>

    </div>
  </div>
</template>