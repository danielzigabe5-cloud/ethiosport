<template>
  <div class="min-h-screen bg-slate-950 flex items-center justify-center py-12 px-6">
    <div class="max-w-lg w-full bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl">
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-white mb-2">አዲስ አካውንት ይፍጠሩ</h1>
        <p class="text-slate-400">የኢትዮ ስፖርት ቤተሰብ ይሁኑ</p>
      </div>

      <form @submit.prevent="handleRegister" class="space-y-5">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
          <!-- ሙሉ ስም -->
          <div>
            <label class="block text-slate-300 mb-2 text-sm">ሙሉ ስም</label>
            <input v-model="regForm.fullname" type="text" placeholder="ሙሉ ስም" required 
              class="w-full bg-slate-800 border border-slate-700 text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition">
          </div>
          <!-- ስልክ ቁጥር -->
          <div>
            <label class="block text-slate-300 mb-2 text-sm">ስልክ ቁጥር</label>
            <input v-model="regForm.phone" type="tel" placeholder="09..." required 
              class="w-full bg-slate-800 border border-slate-700 text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition">
          </div>
        </div>

        <!-- ኢሜይል -->
        <div>
          <label class="block text-slate-300 mb-2 text-sm">ኢሜይል</label>
          <input v-model="regForm.email" type="email" placeholder="example@mail.com" required 
            class="w-full bg-slate-800 border border-slate-700 text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition">
        </div>

        <!-- የይለፍ ቃል -->
        <div>
          <label class="block text-slate-300 mb-2 text-sm">የይለፍ ቃል</label>
          <input v-model="regForm.password" type="password" placeholder="••••••••" required 
            class="w-full bg-slate-800 border border-slate-700 text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition">
        </div>

        <!-- የጨዋታ አይነት -->
        <div>
          <label class="block text-slate-300 mb-2 text-sm">የሚመርጡት የጨዋታ አይነት</label>
          <select v-model="regForm.gameType" required 
            class="w-full bg-slate-800 border border-slate-700 text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition">
            <option value="" disabled>ይምረጡ...</option>
            <option value="football">እግር ኳስ</option>
            <option value="basketball">ባስኬትቦል</option>
            <option value="volleyball">ቮሊቦል</option>
            <option value="athletics">አትሌቲክስ</option>
          </select>
        </div>

        <!-- በተኖች -->
        <div class="grid grid-cols-2 gap-4 pt-2">
          <button type="button" @click="resetForm" class="w-full bg-slate-800 hover:bg-slate-700 text-white font-semibold py-3 rounded-lg border border-slate-700 transition">
            አጥፋ (Reset)
          </button>
          <button type="submit" class="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-lg transition shadow-lg shadow-emerald-900/20">
            ይመዝገቡ
          </button>
        </div>

        <div class="text-center mt-4">
          <p class="text-slate-400 text-sm">
            አካውንት አለዎት? 
            <NuxtLink to="/login" class="text-emerald-500 hover:underline font-medium">ይግቡ</NuxtLink>
          </p>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
const initialState = {
  fullname: '',
  phone: '',
  email: '',
  password: '',
  gameType: ''
}

const regForm = ref({ ...initialState })

const handleRegister = () => {
  console.log("Registration Data:", regForm.value)
  alert("ምዝገባዎ በተሳካ ሁኔታ ተጠናቋል!")
}

const resetForm = () => {
  regForm.value = { ...initialState }
}
</script>