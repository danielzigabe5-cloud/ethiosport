<template>
  <div class="min-h-screen bg-slate-950 flex items-center justify-center py-12 px-6">
    <div class="max-w-md w-full bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl">
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-white mb-2">እንኳን ደህና መጡ</h1>
        <p class="text-slate-400 text-sm">ወደ አካውንትዎ ይግቡ</p>
      </div>

      <form @submit.prevent="handleLogin" class="space-y-5">
        <!-- ኢሜይል -->
        <div>
          <label class="block text-slate-300 mb-2 text-sm">ኢሜይል</label>
          <input 
            v-model="loginForm.email" 
            type="email" 
            placeholder="example@mail.com" 
            required 
            class="w-full bg-slate-800 border border-slate-700 text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition"
          >
        </div>

        <!-- የይለፍ ቃል -->
        <div>
          <label class="block text-slate-300 mb-2 text-sm">የይለፍ ቃል</label>
          <input 
            v-model="loginForm.password" 
            type="password" 
            placeholder="••••••••" 
            required 
            class="w-full bg-slate-800 border border-slate-700 text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition"
          >
        </div>

        <!-- መግቢያ በተን -->
        <button 
          type="submit" 
          class="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-lg transition-all shadow-lg shadow-emerald-900/20 cursor-pointer"
        >
          ይግቡ (Login)
        </button>

        <!-- ወደ ምዝገባ መመለሻ -->
        <div class="text-center mt-6">
          <p class="text-slate-400 text-sm">
            አካውንት የለዎትም? 
            <NuxtLink to="/register" class="text-emerald-500 hover:underline font-medium">አሁኑኑ ይመዝገቡ</NuxtLink>
          </p>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const loginForm = ref({
  email: '',
  password: ''
})

const handleLogin = () => {
  console.log("Login Data:", loginForm.value)
  alert("በተሳካ ሁኔታ ገብተዋል!")
}
</script>