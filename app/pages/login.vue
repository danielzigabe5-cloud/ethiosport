<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center p-4 font-sans">
    <div class="max-w-md w-full bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
      
      <!-- ሎጎ -->
      <div class="text-center mb-8">
        <NuxtLink to="/" class="inline-flex items-center gap-2 mb-2">
          <Icon name="lucide:football" class="w-8 h-8 text-green-600" />
          <span class="text-2xl font-black text-gray-900 tracking-tighter uppercase">Ethio<span class="text-green-600">Sport</span></span>
        </NuxtLink>
        <p class="text-gray-500 font-medium">ወደ አካውንትዎ ይግቡ</p>
      </div>

      <!-- የ Error መልዕክት ማሳያ -->
      <div v-if="errorMsg" class="mb-4 p-3 bg-red-50 text-red-600 text-sm font-bold rounded-xl text-center border border-red-100">
        {{ errorMsg }}
      </div>

      <!-- ፎርም -->
      <form @submit.prevent="handleLogin" class="space-y-5">
        <div>
          <label class="block text-sm font-bold text-gray-700 mb-1.5">ኢሜል (Email)</label>
          <div class="relative">
            <Icon name="lucide:mail" class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input 
              v-model="email" 
              type="email" 
              required
              placeholder="admin@ethiosport.com" 
              class="w-full pl-11 pr-4 py-3 bg-gray-50 text-gray-900 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 font-medium"
            />
          </div>
        </div>

        <div>
          <label class="block text-sm font-bold text-gray-700 mb-1.5">የይለፍ ቃል (Password)</label>
          <div class="relative">
            <Icon name="lucide:lock" class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input 
              v-model="password" 
              :type="showPassword ? 'text' : 'password'" 
              required
              placeholder="••••••••" 
              class="w-full pl-11 pr-12 py-3 bg-gray-50 text-gray-900 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 font-medium"
            />
            <button 
              type="button" 
              @click="showPassword = !showPassword" 
              class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-green-600 transition-colors"
            >
              <Icon :name="showPassword ? 'lucide:eye-off' : 'lucide:eye'" class="w-5 h-5" />
            </button>
          </div>
        </div>

        <button type="submit" class="w-full py-3.5 bg-green-600 hover:bg-green-700 active:scale-95 text-white font-bold rounded-xl shadow-md transition-all">
          ግባ (Login)
        </button>
      </form>

      <!-- ለቴስት መረጃ -->
      <div class="mt-8 p-4 bg-blue-50 rounded-xl border border-blue-100 text-xs text-blue-800">
        <p class="font-black mb-2 flex items-center gap-1"><Icon name="lucide:info" class="w-4 h-4"/> ለቴስት (Test Credentials):</p>
        <ul class="space-y-1 font-medium">
          <li>👉 <b>Admin:</b> admin@ethiosport.com / admin123</li>
          <li>👉 <b>Partner:</b> partner@ethiosport.com / partner123</li>
        </ul>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

// የገባውን ተጠቃሚ ማንነት የምናስቀምጥበት state
const userRole = useState('userRole', () => null) 
const router = useRouter()

const email = ref('')
const password = ref('')
const errorMsg = ref('')
const showPassword = ref(false)

const handleLogin = () => {
  errorMsg.value = ''
  
  if (email.value === 'admin@ethiosport.com' && password.value === 'admin123') {
    userRole.value = 'admin'
    localStorage.setItem('userRole', 'admin') // እንዳይጠፋ ማህደረ ትውስታ ውስጥ ማስቀመጥ
    router.push('/admin')
  } 
  else if (email.value === 'partner@ethiosport.com' && password.value === 'partner123') {
    userRole.value = 'partner'
    localStorage.setItem('userRole', 'partner') // እንዳይጠፋ ማህደረ ትውስታ ውስጥ ማስቀመጥ
    router.push('/partner')
  } 
  else {
    errorMsg.value = 'የተሳሳተ ኢሜል ወይም የይለፍ ቃል አስገብተዋል!'
  }
}
</script>