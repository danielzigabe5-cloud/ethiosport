<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'

definePageMeta({ layout: 'partner' })

const authStore = useAuthStore()

// 1. Navigation Active Tab State
const activeTab = ref<'profile' | 'payouts' | 'security'>('profile')

// 2. Profile Form State
const profileData = ref({
  fullName: '',
  email: '',
  phone: '',
  businessName: '',
  city: 'Addis Ababa'
})

// 3. Payout Method / Bank Form State
const bankData = ref({
  primaryBank: 'CBE',
  accountName: '',
  accountNumber: '',
  telebirrPhone: ''
})

// 4. Security Form State
const securityData = ref({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
})

// UI Notification States
const isSaving = ref(false)
const successMessage = ref('')
const errorMessage = ref('')

// Pre-fill user data from Pinia Store on mount
onMounted(() => {
  if (authStore?.user) {
    profileData.value.fullName = authStore.user.name || ''
    profileData.value.email = authStore.user.email || ''
    profileData.value.phone = authStore.user.phone || ''
    profileData.value.businessName = authStore.user.businessName || 'የሜዳ ባለቤት'
    bankData.value.accountName = authStore.user.name || ''
  }
})

// General Notification Helper
const triggerNotification = (msg: string, isError = false) => {
  if (isError) {
    errorMessage.value = msg
    setTimeout(() => { errorMessage.value = '' }, 3500)
  } else {
    successMessage.value = msg
    setTimeout(() => { successMessage.value = '' }, 3500)
  }
}

// 5. Update Profile Action
const handleUpdateProfile = () => {
  isSaving.value = true
  setTimeout(() => {
    if (authStore?.user) {
      authStore.user.name = profileData.value.fullName
      authStore.user.phone = profileData.value.phone
    }
    isSaving.value = false
    triggerNotification('የፕሮፋይል መረጃዎ በስኬት ተዘምኗል!')
  }, 800)
}

// 6. Update Bank Details Action
const handleUpdateBank = () => {
  if (!bankData.value.accountNumber) {
    triggerNotification('እባክዎን የባንክ ሂሳብ ቁጥር ያስገቡ!', true)
    return
  }

  isSaving.value = true
  setTimeout(() => {
    isSaving.value = false
    triggerNotification('የባንክ መረጃዎ በስኬት ተቀምጧል!')
  }, 800)
}

// 7. Update Password Action
const handleUpdatePassword = () => {
  if (securityData.value.newPassword !== securityData.value.confirmPassword) {
    triggerNotification('አዲሱ የይለፍ ቃል እና ማረጋገጫው አይመሳሰሉም!', true)
    return
  }

  if (securityData.value.newPassword.length < 6) {
    triggerNotification('የይለፍ ቃል ቢያንስ 6 ፊደላት/ቁጥሮች መሆን አለበት!', true)
    return
  }

  isSaving.value = true
  setTimeout(() => {
    isSaving.value = false
    securityData.value.currentPassword = ''
    securityData.value.newPassword = ''
    securityData.value.confirmPassword = ''
    triggerNotification('የይለፍ ቃልዎ በስኬት ተቀይሯል!')
  }, 800)
}
</script>

<template>
  <div class="space-y-6 max-w-5xl">
    <!-- Title & Description -->
    <div>
      <h1 class="text-2xl font-black text-white">የመለያ ቅንብሮች (Settings)</h1>
      <p class="text-xs sm:text-sm text-slate-400 mt-1">
        የግል ፕሮፋይልዎን፣ የባንክ ሂሳብዎን እና የደህንነት መረጃዎን እዚህ ማስተካከል ይችላሉ።
      </p>
    </div>

    <!-- Alert Notifications -->
    <div v-if="successMessage" class="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400 text-xs font-bold flex items-center gap-2">
      <Icon name="lucide:check-circle" class="w-4 h-4 shrink-0" />
      <span>{{ successMessage }}</span>
    </div>

    <div v-if="errorMessage" class="p-4 bg-rose-500/10 border border-rose-500/30 rounded-xl text-rose-400 text-xs font-bold flex items-center gap-2">
      <Icon name="lucide:alert-triangle" class="w-4 h-4 shrink-0" />
      <span>{{ errorMessage }}</span>
    </div>

    <!-- Navigation Tabs -->
    <div class="flex items-center gap-2 border-b border-[#1a2432] pb-2 overflow-x-auto">
      <button 
        @click="activeTab = 'profile'"
        class="px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 whitespace-nowrap cursor-pointer"
        :class="activeTab === 'profile' ? 'bg-[#152338] text-emerald-400 border border-[#24354d]' : 'text-slate-400 hover:text-white'"
      >
        <Icon name="lucide:user" class="w-4 h-4" />
        <span>የፕሮፋይል መረጃ</span>
      </button>

      <button 
        @click="activeTab = 'payouts'"
        class="px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 whitespace-nowrap cursor-pointer"
        :class="activeTab === 'payouts' ? 'bg-[#152338] text-emerald-400 border border-[#24354d]' : 'text-slate-400 hover:text-white'"
      >
        <Icon name="lucide:credit-card" class="w-4 h-4" />
        <span>የባንክ መረጃ (Payout Account)</span>
      </button>

      <button 
        @click="activeTab = 'security'"
        class="px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 whitespace-nowrap cursor-pointer"
        :class="activeTab === 'security' ? 'bg-[#152338] text-emerald-400 border border-[#24354d]' : 'text-slate-400 hover:text-white'"
      >
        <Icon name="lucide:shield-check" class="w-4 h-4" />
        <span>የደህንነት ቅንብር (Security)</span>
      </button>
    </div>

    <!-- TAB 1: PROFILE SETTINGS -->
    <div v-if="activeTab === 'profile'" class="bg-[#0d1522] border border-[#1a2432] rounded-2xl p-6 space-y-6">
      <h3 class="text-base font-bold text-white border-b border-[#1a2432] pb-3">የግል እና የንግድ መረጃ</h3>
      
      <form @submit.prevent="handleUpdateProfile" class="space-y-4">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="block text-xs font-semibold text-slate-300 mb-1">ሙሉ ስም</label>
            <input 
              v-model="profileData.fullName" 
              type="text" 
              required
              class="w-full bg-[#070c14] border border-[#1a2432] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label class="block text-xs font-semibold text-slate-300 mb-1">ኢሜይል አድራሻ</label>
            <input 
              v-model="profileData.email" 
              type="email" 
              disabled
              class="w-full bg-[#070c14]/50 border border-[#1a2432] rounded-xl px-4 py-2.5 text-xs text-slate-500 cursor-not-allowed"
            />
          </div>

          <div>
            <label class="block text-xs font-semibold text-slate-300 mb-1">ስልክ ቁጥር</label>
            <input 
              v-model="profileData.phone" 
              type="text" 
              placeholder="0911XXXXXX"
              class="w-full bg-[#070c14] border border-[#1a2432] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label class="block text-xs font-semibold text-slate-300 mb-1">የድርጅት / ሜዳ ስም (Business Name)</label>
            <input 
              v-model="profileData.businessName" 
              type="text" 
              class="w-full bg-[#070c14] border border-[#1a2432] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        <div class="pt-4 flex justify-end">
          <button 
            type="submit" 
            :disabled="isSaving"
            class="bg-emerald-500 hover:bg-emerald-400 text-slate-950 px-6 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition active:scale-95 disabled:opacity-50"
          >
            <Icon v-if="isSaving" name="lucide:loader-2" class="w-4 h-4 animate-spin" />
            <span>ለውጦችን አስቀምጥ</span>
          </button>
        </div>
      </form>
    </div>

    <!-- TAB 2: BANK / PAYOUT SETTINGS -->
    <div v-if="activeTab === 'payouts'" class="bg-[#0d1522] border border-[#1a2432] rounded-2xl p-6 space-y-6">
      <h3 class="text-base font-bold text-white border-b border-[#1a2432] pb-3">ክፍያ መቀበያ የባንክ ሂሳብ (Withdrawal Account)</h3>
      
      <form @submit.prevent="handleUpdateBank" class="space-y-4">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="block text-xs font-semibold text-slate-300 mb-1">ዋና የክፍያ ተቋም (Primary Bank)</label>
            <select 
              v-model="bankData.primaryBank"
              class="w-full bg-[#070c14] border border-[#1a2432] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
            >
              <option value="CBE">የኢትዮጵያ ንግድ ባንክ (CBE)</option>
              <option value="CBO">የኦሮሚያ ህብረት ስራ ባንክ (CBO)</option>
              <option value="BOA">አቢሲንያ ባንክ (BOA)</option>
              <option value="Telebirr">ቴሌብር (Telebirr)</option>
            </select>
          </div>

          <div>
            <label class="block text-xs font-semibold text-slate-300 mb-1">የአካውንት ባለቤት ስም (Account Holder Name)</label>
            <input 
              v-model="bankData.accountName" 
              type="text" 
              required
              placeholder="በባንክ የተመዘገበ ሙሉ ስም"
              class="w-full bg-[#070c14] border border-[#1a2432] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label class="block text-xs font-semibold text-slate-300 mb-1">የባንክ ሂሳብ ቁጥር (Account Number)</label>
            <input 
              v-model="bankData.accountNumber" 
              type="text" 
              required
              placeholder="1000XXXXXXXXX"
              class="w-full bg-[#070c14] border border-[#1a2432] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500 font-mono"
            />
          </div>

          <div>
            <label class="block text-xs font-semibold text-slate-300 mb-1">የቴሌብር ስልክ ቁጥር (ከተፈለገ)</label>
            <input 
              v-model="bankData.telebirrPhone" 
              type="text" 
              placeholder="09XXXXXXXX"
              class="w-full bg-[#070c14] border border-[#1a2432] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500 font-mono"
            />
          </div>
        </div>

        <div class="pt-4 flex justify-end">
          <button 
            type="submit" 
            :disabled="isSaving"
            class="bg-emerald-500 hover:bg-emerald-400 text-slate-950 px-6 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition active:scale-95 disabled:opacity-50"
          >
            <Icon v-if="isSaving" name="lucide:loader-2" class="w-4 h-4 animate-spin" />
            <span>የባንክ መረጃ መዝግብ</span>
          </button>
        </div>
      </form>
    </div>

    <!-- TAB 3: SECURITY SETTINGS -->
    <div v-if="activeTab === 'security'" class="bg-[#0d1522] border border-[#1a2432] rounded-2xl p-6 space-y-6">
      <h3 class="text-base font-bold text-white border-b border-[#1a2432] pb-3">የይለፍ ቃል ማስተካከያ (Password Change)</h3>
      
      <form @submit.prevent="handleUpdatePassword" class="space-y-4 max-w-md">
        <div>
          <label class="block text-xs font-semibold text-slate-300 mb-1">የአሁኑ የይለፍ ቃል (Current Password)</label>
          <input 
            v-model="securityData.currentPassword" 
            type="password" 
            required
            class="w-full bg-[#070c14] border border-[#1a2432] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div>
          <label class="block text-xs font-semibold text-slate-300 mb-1">አዲስ የይለፍ ቃል (New Password)</label>
          <input 
            v-model="securityData.newPassword" 
            type="password" 
            required
            class="w-full bg-[#070c14] border border-[#1a2432] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div>
          <label class="block text-xs font-semibold text-slate-300 mb-1">አዲሱን የይለፍ ቃል ያረጋግጡ (Confirm New Password)</label>
          <input 
            v-model="securityData.confirmPassword" 
            type="password" 
            required
            class="w-full bg-[#070c14] border border-[#1a2432] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div class="pt-4 flex justify-start">
          <button 
            type="submit" 
            :disabled="isSaving"
            class="bg-emerald-500 hover:bg-emerald-400 text-slate-950 px-6 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition active:scale-95 disabled:opacity-50"
          >
            <Icon v-if="isSaving" name="lucide:loader-2" class="w-4 h-4 animate-spin" />
            <span>የይለፍ ቃል ቀይር</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>