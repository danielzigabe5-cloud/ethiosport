<script setup lang="ts">
definePageMeta({ Layout: 'user' })

const { user } = useAuth()

const profile = reactive({
  name: user.value?.name || 'ስፖርተኛ ተጠቃሚ',
  email: user.value?.email || 'user@gmail.com',
  phone: '+251 911 000 000',
  currentPassword: '',
  newPassword: ''
})

const isSaving = ref(false)
const successMsg = ref('')

const handleSaveProfile = () => {
  isSaving.value = true
  setTimeout(() => {
    isSaving.value = false
    successMsg.value = 'የመገለጫ መረጃዎ በስኬት ተዘምኗል!'
    setTimeout(() => successMsg.value = '', 3000)
  }, 1000)
}
</script>

<template>
  <div class="max-w-3xl space-y-6">
    <div>
      <h1 class="text-2xl font-bold text-slate-800">የግል መገለጫ (Profile Settings)</h1>
      <p class="text-xs text-slate-400 mt-1">የግል መረጃዎን እና የይለፍ ቃልዎን እዚህ ያስተካክሉ</p>
    </div>

    <!-- Alert Notification -->
    <div v-if="successMsg" class="p-4 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold rounded-2xl">
      ✅ {{ successMsg }}
    </div>

    <form @submit.prevent="handleSaveProfile" class="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
      
      <!-- Basic Info -->
      <div class="space-y-4">
        <h2 class="text-sm font-bold text-slate-800 border-b border-slate-100 pb-2">መሰረታዊ መረጃዎች</h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-xs font-bold text-slate-600 mb-1">ሙሉ ስም</label>
            <input v-model="profile.name" type="text" class="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm outline-none focus:border-blue-500" required />
          </div>

          <div>
            <label class="block text-xs font-bold text-slate-600 mb-1">ስልክ ቁጥር</label>
            <input v-model="profile.phone" type="text" class="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm outline-none focus:border-blue-500" required />
          </div>
        </div>

        <div>
          <label class="block text-xs font-bold text-slate-600 mb-1">ኢሜይል (Email)</label>
          <input v-model="profile.email" type="email" class="w-full bg-slate-100 border border-slate-200 rounded-xl p-3 text-sm outline-none text-slate-500 cursor-not-allowed" disabled />
        </div>
      </div>

      <!-- Password Change -->
      <div class="space-y-4 pt-4">
        <h2 class="text-sm font-bold text-slate-800 border-b border-slate-100 pb-2">የይለፍ ቃል መቀየሪያ</h2>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-xs font-bold text-slate-600 mb-1">የአሁኑ የይለፍ ቃል</label>
            <input v-model="profile.currentPassword" type="password" placeholder="••••••••" class="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm outline-none focus:border-blue-500" />
          </div>

          <div>
            <label class="block text-xs font-bold text-slate-600 mb-1">አዲስ የይለፍ ቃል</label>
            <input v-model="profile.newPassword" type="password" placeholder="••••••••" class="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm outline-none focus:border-blue-500" />
          </div>
        </div>
      </div>

      <!-- Submit Button -->
      <div class="pt-2 flex justify-end">
        <button 
          type="submit" 
          :disabled="isSaving"
          class="bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm px-6 py-3 rounded-xl transition disabled:opacity-50"
        >
          <span v-if="isSaving">በማስቀመጥ ላይ...</span>
          <span v-else>መረጃውን አዘምን (Save Changes)</span>
        </button>
      </div>

    </form>
  </div>
</template>