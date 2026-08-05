<script setup>
import { ref } from 'vue'

definePageMeta({ layout: 'partner' })

const isSaving = ref(false)
const savedSuccess = ref(false)

const profile = ref({
  arenaName: 'ሳርቤት ፉትሳል አሬና',
  phone: '0911223344',
  location: 'ሳርቤት፣ አዲስ አበባ',
  cbeAccount: '1000123456789'
})

const saveProfile = () => {
  isSaving.value = true
  savedSuccess.value = false
  setTimeout(() => {
    isSaving.value = false
    savedSuccess.value = true
    setTimeout(() => savedSuccess.value = false, 3000)
  }, 800)
}
</script>

<template>
  <div class="space-y-6 max-w-3xl mx-auto">
    <div>
      <h1 class="text-xl font-black text-white">⚙️ Settings</h1>
      <p class="text-xs text-slate-400">የአሬናዎን መረጃ እና የክፍያ መቀበያ አካውንት ያስተካክሉ።</p>
    </div>

    <form @submit.prevent="saveProfile" class="bg-[#0b111a] border border-[#1a2432] p-6 rounded-2xl space-y-4">
      <div>
        <label class="block text-xs font-bold text-slate-400 mb-1">የአሬና/ሜዳ ስም</label>
        <input v-model="profile.arenaName" type="text" class="w-full bg-[#131c27] border border-[#212e3e] px-4 py-2.5 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-500" />
      </div>

      <div>
        <label class="block text-xs font-bold text-slate-400 mb-1">ስልክ ቁጥር</label>
        <input v-model="profile.phone" type="text" class="w-full bg-[#131c27] border border-[#212e3e] px-4 py-2.5 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-500" />
      </div>

      <div>
        <label class="block text-xs font-bold text-slate-400 mb-1">አድራሻ / ቦታ</label>
        <input v-model="profile.location" type="text" class="w-full bg-[#131c27] border border-[#212e3e] px-4 py-2.5 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-500" />
      </div>

      <div>
        <label class="block text-xs font-bold text-slate-400 mb-1">የCBE ባንክ ሂሳብ ቁጥር (ለPayout)</label>
        <input v-model="profile.cbeAccount" type="text" class="w-full bg-[#131c27] border border-[#212e3e] px-4 py-2.5 rounded-xl text-xs text-white font-mono focus:outline-none focus:border-emerald-500" />
      </div>

      <div class="flex items-center justify-between pt-2">
        <button type="submit" :disabled="isSaving" class="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-xs transition">
          {{ isSaving ? 'በመቀየር ላይ...' : 'ለወጣቶችን መዝግብ (Save Changes)' }}
        </button>
        <span v-if="savedSuccess" class="text-xs text-emerald-400 font-bold">✓ መረጃው ተዘምኗል!</span>
      </div>
    </form>
  </div>
</template>