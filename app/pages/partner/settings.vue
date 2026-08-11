<script setup lang="ts">
import { ref } from 'vue'

// 1. Layout-ኡ የ partner layout መሆኑን ያረጋግጣል (ሳይድባሩ እንዳይጠፋ)
definePageMeta({
  layout: 'partner'
})

const activeTab = ref('profile')

const profile = ref({
  venueName: 'ቤኪ ፉትሳል (Beki Futsal)',
  ownerName: 'በረከት ተስፋዬ',
  phone: '0911223344',
  email: 'beki.futsal@gmail.com',
  location: 'አዲስ አበባ፣ ቦሌ ክፍለ ከተማ',
  description: 'ከፍተኛ ደረጃ ያለው የቤት ውስጥ (Indoor) የፉትሳል ሜዳ ከቀጥታ የብርሃን ማብሪያ እና አገልግሎቶች ጋር።'
})

const bank = ref({
  bankName: 'CBE',
  accountName: 'Bereket Tesfaye',
  accountNumber: '1000123456789'
})

const security = ref({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
})

const isSaved = ref(false)

const handleSave = () => {
  isSaved.value = true
  setTimeout(() => {
    isSaved.value = false
  }, 3000)
}
</script>

<template>
  <div class="max-w-5xl mx-auto space-y-6 text-slate-100">
    
    <!-- Page Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
      <div>
        <h1 class="text-xl font-bold text-white">የመቼቶች ገጽ (Settings)</h1>
        <p class="text-xs text-slate-400 mt-1">የሜዳዎን መረጃ፣ የክፍያ አካውንት እና የደህንነት መቼቶችን እዚህ ያስተካክሉ።</p>
      </div>

      <transition name="fade">
        <div v-if="isSaved" class="bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2">
          <span>✓</span> መረጃው በትክክል ተዘምኗል!
        </div>
      </transition>
    </div>

    <!-- Navigation Tabs -->
    <div class="flex gap-2 border-b border-slate-800 overflow-x-auto pb-1">
      <button
        @click="activeTab = 'profile'"
        class="px-4 py-2 rounded-lg text-xs font-bold transition whitespace-nowrap cursor-pointer"
        :class="activeTab === 'profile' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'"
      >
        🏢 የፕሮፋይል መረጃ
      </button>

      <button
        @click="activeTab = 'payout'"
        class="px-4 py-2 rounded-lg text-xs font-bold transition whitespace-nowrap cursor-pointer"
        :class="activeTab === 'payout' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'"
      >
        💳 የክፍያ አካውንት (Bank)
      </button>

      <button
        @click="activeTab = 'security'"
        class="px-4 py-2 rounded-lg text-xs font-bold transition whitespace-nowrap cursor-pointer"
        :class="activeTab === 'security' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'"
      >
        🔒 ደህንነት እና ፓስወርድ
      </button>
    </div>

    <!-- TAB 1: Profile -->
    <div v-if="activeTab === 'profile'" class="bg-[#0d1520] border border-slate-800 rounded-2xl p-6 space-y-6">
      <h2 class="text-sm font-bold text-emerald-400 border-b border-slate-800 pb-3">የሜዳ እና የባለቤት መረጃ</h2>
      
      <form @submit.prevent="handleSave" class="space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-xs font-medium text-slate-300 mb-1.5">የሜዳው ስም (Venue Name)</label>
            <input v-model="profile.venueName" type="text" class="w-full bg-[#070c14] border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500" />
          </div>

          <div>
            <label class="block text-xs font-medium text-slate-300 mb-1.5">የባለቤቱ ስም (Owner Name)</label>
            <input v-model="profile.ownerName" type="text" class="w-full bg-[#070c14] border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500" />
          </div>

          <div>
            <label class="block text-xs font-medium text-slate-300 mb-1.5">ስልክ ቁጥር (Phone)</label>
            <input v-model="profile.phone" type="text" class="w-full bg-[#070c14] border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500" />
          </div>

          <div>
            <label class="block text-xs font-medium text-slate-300 mb-1.5">ኢሜይል (Email)</label>
            <input v-model="profile.email" type="email" class="w-full bg-[#070c14] border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500" />
          </div>
        </div>

        <div>
          <label class="block text-xs font-medium text-slate-300 mb-1.5">አድራሻ (Location)</label>
          <input v-model="profile.location" type="text" class="w-full bg-[#070c14] border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500" />
        </div>

        <div>
          <label class="block text-xs font-medium text-slate-300 mb-1.5">ስለ ሜዳው ማብራሪያ (Description)</label>
          <textarea v-model="profile.description" rows="3" class="w-full bg-[#070c14] border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500 resize-none"></textarea>
        </div>

        <div class="flex justify-end pt-2">
          <button type="submit" class="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-6 py-2.5 rounded-xl transition cursor-pointer">
            ለውጦችን መዝግብ
          </button>
        </div>
      </form>
    </div>

    <!-- TAB 2: Payout -->
    <div v-if="activeTab === 'payout'" class="bg-[#0d1520] border border-slate-800 rounded-2xl p-6 space-y-6">
      <h2 class="text-sm font-bold text-emerald-400 border-b border-slate-800 pb-3">የባንክ መረጃ (ገቢ የሚተላለፍበት)</h2>

      <form @submit.prevent="handleSave" class="space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label class="block text-xs font-medium text-slate-300 mb-1.5">የባንክ ስም</label>
            <select v-model="bank.bankName" class="w-full bg-[#070c14] border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500">
              <option value="CBE">የኢትዮጵያ ንግድ ባንክ (CBE)</option>
              <option value="BOA">አቢሲንያ ባንክ (Abyssinia)</option>
              <option value="Awash">አዋሽ ባንክ (Awash)</option>
              <option value="Telebirr">ቴሌብር (Telebirr)</option>
            </select>
          </div>

          <div>
            <label class="block text-xs font-medium text-slate-300 mb-1.5">የአካውንት ስም (Account Holder Name)</label>
            <input v-model="bank.accountName" type="text" class="w-full bg-[#070c14] border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500" />
          </div>

          <div>
            <label class="block text-xs font-medium text-slate-300 mb-1.5">የሂሳብ ቁጥር (Account Number)</label>
            <input v-model="bank.accountNumber" type="text" class="w-full bg-[#070c14] border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500" />
          </div>
        </div>

        <div class="flex justify-end pt-2">
          <button type="submit" class="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-6 py-2.5 rounded-xl transition cursor-pointer">
            የባንክ መረጃውን አዘምን
          </button>
        </div>
      </form>
    </div>

    <!-- TAB 3: Security -->
    <div v-if="activeTab === 'security'" class="bg-[#0d1520] border border-slate-800 rounded-2xl p-6 space-y-6">
      <h2 class="text-sm font-bold text-emerald-400 border-b border-slate-800 pb-3">የይለፍ ቃል (Password) ይቀይሩ</h2>

      <form @submit.prevent="handleSave" class="space-y-4 max-w-md">
        <div>
          <label class="block text-xs font-medium text-slate-300 mb-1.5">የአሁኑ የይለፍ ቃል</label>
          <input v-model="security.currentPassword" type="password" placeholder="••••••••" class="w-full bg-[#070c14] border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500" />
        </div>

        <div>
          <label class="block text-xs font-medium text-slate-300 mb-1.5">አዲስ የይለፍ ቃል</label>
          <input v-model="security.newPassword" type="password" placeholder="••••••••" class="w-full bg-[#070c14] border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500" />
        </div>

        <div>
          <label class="block text-xs font-medium text-slate-300 mb-1.5">አዲሱን የይለፍ ቃል ያረጋግጡ</label>
          <input v-model="security.confirmPassword" type="password" placeholder="••••••••" class="w-full bg-[#070c14] border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500" />
        </div>

        <div class="pt-2">
          <button type="submit" class="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-6 py-2.5 rounded-xl transition cursor-pointer">
            ፓስወርድ ቀይር
          </button>
        </div>
      </form>
    </div>

  </div>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>