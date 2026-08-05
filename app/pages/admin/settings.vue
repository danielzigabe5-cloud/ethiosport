<script setup>
import { ref, onMounted } from 'vue'

definePageMeta({ layout: 'admin' })

// 1. System General Configurations
const settings = ref({
  platformName: 'EthioSport Platform',
  contactEmail: 'support@ethiosport.com',
  contactPhone: '+251911000000',
  currency: 'ETB',
  commissionRate: 10, // 10% Platform fee
  depositPercentage: 20, // 20% Down payment
  enableNotifications: true,
  autoApproveBookings: false
})

// 2. Admin Account Settings
const adminAccount = ref({
  name: 'Admin User',
  email: 'admin@ethiosport.com',
  currentPassword: '',
  newPassword: ''
})

const isSaved = ref(false)
const saveMessage = ref('')
const activeTab = ref('general') // 'general' | 'financial' | 'account'

// 3. Load saved settings from LocalStorage on mount
onMounted(() => {
  const savedSettings = localStorage.getItem('ethiosport_settings')
  if (savedSettings) {
    settings.value = JSON.parse(savedSettings)
  }
})

// 4. Save General Settings Function
const saveGeneralSettings = () => {
  localStorage.setItem('ethiosport_settings', JSON.stringify(settings.value))
  triggerAlert('የሲስተም ሴቲንግ ማስተካከያዎች በስኬት ተመዝግበዋል!')
}

// 5. Update Admin Password Function
const updatePassword = () => {
  if (!adminAccount.value.currentPassword || !adminAccount.value.newPassword) {
    alert('እባክዎን የነበረውን እና አዲሱን የይለፍ ቃል ያስገቡ!')
    return
  }
  
  // Reset form after saving
  adminAccount.value.currentPassword = ''
  adminAccount.value.newPassword = ''
  triggerAlert('የይለፍ ቃልዎ በተካካ ሁኔታ ተቀይሯል!')
}

const triggerAlert = (msg) => {
  saveMessage.value = msg
  isSaved.value = true
  setTimeout(() => {
    isSaved.value = false
  }, 3500)
}
</script>

<template>
  <div class="space-y-6 max-w-4xl">
    <div>
      <h1 class="text-2xl font-black text-slate-900 dark:text-white">የሲስተም ሴቲንግ (Settings)</h1>
      <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">የEthioSport ፕላትፎርም አጠቃላይ ህጎች፣ የክፍያ መጠኖች እና የአካውንት መረጃዎች ማስተካከያ</p>
    </div>

    <!-- Alert Banner -->
    <div v-if="isSaved" class="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl text-emerald-500 text-xs font-bold flex items-center justify-between transition animate-pulse">
      <span class="flex items-center gap-2">
        <span>✅</span>
        <span>{{ saveMessage }}</span>
      </span>
      <button @click="isSaved = false" class="text-slate-400 hover:text-white">✕</button>
    </div>

    <!-- Navigation Tabs -->
    <div class="flex gap-2 border-b border-slate-200 dark:border-[#212e3e] pb-3 text-xs font-bold">
      <button 
        @click="activeTab = 'general'"
        :class="['px-4 py-2 rounded-xl transition cursor-pointer', activeTab === 'general' ? 'bg-emerald-500 text-slate-950 font-black' : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-[#131c27]']"
      >
        ⚙️ አጠቃላይ (General)
      </button>
      <button 
        @click="activeTab = 'financial'"
        :class="['px-4 py-2 rounded-xl transition cursor-pointer', activeTab === 'financial' ? 'bg-emerald-500 text-slate-950 font-black' : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-[#131c27]']"
      >
        💳 የክፍያ ህጎች (Financial)
      </button>
      <button 
        @click="activeTab = 'account'"
        :class="['px-4 py-2 rounded-xl transition cursor-pointer', activeTab === 'account' ? 'bg-emerald-500 text-slate-950 font-black' : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-[#131c27]']"
      >
        👤 የአካውንት ደህንነት (Account)
      </button>
    </div>

    <!-- TAB 1: GENERAL SETTINGS -->
    <form v-if="activeTab === 'general'" @submit.prevent="saveGeneralSettings" class="bg-white dark:bg-[#0b111a] p-6 rounded-2xl border border-slate-200 dark:border-[#212e3e] space-y-4">
      <h3 class="text-sm font-black text-slate-900 dark:text-white border-b border-slate-100 dark:border-[#212e3e] pb-3">የፕላትፎርሙ መረጃ</h3>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-xs font-bold mb-1.5 text-slate-700 dark:text-slate-300">የፕላትፎርሙ ስም</label>
          <input v-model="settings.platformName" type="text" class="w-full p-3 bg-slate-50 dark:bg-[#131c27] border border-slate-200 dark:border-[#212e3e] rounded-xl text-xs font-bold focus:outline-none focus:border-emerald-500 text-slate-900 dark:text-white" required />
        </div>

        <div>
          <label class="block text-xs font-bold mb-1.5 text-slate-700 dark:text-slate-300">የገንዘብ አይነት (Currency)</label>
          <select v-model="settings.currency" class="w-full p-3 bg-slate-50 dark:bg-[#131c27] border border-slate-200 dark:border-[#212e3e] rounded-xl text-xs font-bold focus:outline-none focus:border-emerald-500 text-slate-900 dark:text-white">
            <option value="ETB">ETB (የኢትዮጵያ ብር)</option>
            <option value="USD">USD ($)</option>
          </select>
        </div>

        <div>
          <label class="block text-xs font-bold mb-1.5 text-slate-700 dark:text-slate-300">የግንኙነት ኢሜይል</label>
          <input v-model="settings.contactEmail" type="email" class="w-full p-3 bg-slate-50 dark:bg-[#131c27] border border-slate-200 dark:border-[#212e3e] rounded-xl text-xs font-bold focus:outline-none focus:border-emerald-500 text-slate-900 dark:text-white" required />
        </div>

        <div>
          <label class="block text-xs font-bold mb-1.5 text-slate-700 dark:text-slate-300">የድጋፍ ስልክ ቁጥር</label>
          <input v-model="settings.contactPhone" type="text" class="w-full p-3 bg-slate-50 dark:bg-[#131c27] border border-slate-200 dark:border-[#212e3e] rounded-xl text-xs font-bold focus:outline-none focus:border-emerald-500 text-slate-900 dark:text-white" required />
        </div>
      </div>

      <div class="space-y-3 pt-3">
        <div class="flex items-center gap-3">
          <input v-model="settings.enableNotifications" type="checkbox" id="notif" class="w-4 h-4 accent-emerald-500 rounded cursor-pointer" />
          <label for="notif" class="text-xs font-bold text-slate-700 dark:text-slate-300 cursor-pointer">የኢሜይል ማስታወቂያዎች (Email Notifications) ይላኩ</label>
        </div>

        <div class="flex items-center gap-3">
          <input v-model="settings.autoApproveBookings" type="checkbox" id="autoApprove" class="w-4 h-4 accent-emerald-500 rounded cursor-pointer" />
          <label for="autoApprove" class="text-xs font-bold text-slate-700 dark:text-slate-300 cursor-pointer">አዳዲስ የቦታ ማስያዣዎችን በራሱ ጊዜ አፅድቅ (Auto-approve Bookings)</label>
        </div>
      </div>

      <div class="pt-4 border-t border-slate-100 dark:border-[#212e3e]">
        <button type="submit" class="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl shadow transition cursor-pointer">
          አጠቃላይ ሴቲንጉን አስቀምጥ
        </button>
      </div>
    </form>

    <!-- TAB 2: FINANCIAL RULES -->
    <form v-if="activeTab === 'financial'" @submit.prevent="saveGeneralSettings" class="bg-white dark:bg-[#0b111a] p-6 rounded-2xl border border-slate-200 dark:border-[#212e3e] space-y-4">
      <h3 class="text-sm font-black text-slate-900 dark:text-white border-b border-slate-100 dark:border-[#212e3e] pb-3">የኮሚሽን እና ክፍያ ህጎች</h3>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-xs font-bold mb-1.5 text-slate-700 dark:text-slate-300">የፕላትፎርም ኮሚሽን (%)</label>
          <input v-model="settings.commissionRate" type="number" min="0" max="100" class="w-full p-3 bg-slate-50 dark:bg-[#131c27] border border-slate-200 dark:border-[#212e3e] rounded-xl text-xs font-bold focus:outline-none focus:border-emerald-500 text-slate-900 dark:text-white" required />
          <p class="text-[10px] text-slate-400 mt-1">ከእያንዳንዱ ሜዳ ማስያዣ ክፍያ ላይ ለEthioSport የሚቀረው ድርሻ</p>
        </div>

        <div>
          <label class="block text-xs font-bold mb-1.5 text-slate-700 dark:text-slate-300">የቅድሚያ ክፍያ / Deposit (%)</label>
          <input v-model="settings.depositPercentage" type="number" min="0" max="100" class="w-full p-3 bg-slate-50 dark:bg-[#131c27] border border-slate-200 dark:border-[#212e3e] rounded-xl text-xs font-bold focus:outline-none focus:border-emerald-500 text-slate-900 dark:text-white" required />
          <p class="text-[10px] text-slate-400 mt-1">ተጠቃሚዎች ቦታ ለማስያዝ መክፈል የሚጠበቅባቸው ቅድሚያ ክፍያ መጠን</p>
        </div>
      </div>

      <div class="pt-4 border-t border-slate-100 dark:border-[#212e3e]">
        <button type="submit" class="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl shadow transition cursor-pointer">
          የክፍያ ህጎችን አስቀምጥ
        </button>
      </div>
    </form>

    <!-- TAB 3: ACCOUNT & SECURITY -->
    <form v-if="activeTab === 'account'" @submit.prevent="updatePassword" class="bg-white dark:bg-[#0b111a] p-6 rounded-2xl border border-slate-200 dark:border-[#212e3e] space-y-4">
      <h3 class="text-sm font-black text-slate-900 dark:text-white border-b border-slate-100 dark:border-[#212e3e] pb-3">የይለፍ ቃል እና መለያ ማስተካከያ</h3>

      <div class="space-y-4">
        <div>
          <label class="block text-xs font-bold mb-1.5 text-slate-700 dark:text-slate-300">የአስተዳዳሪው ስም</label>
          <input v-model="adminAccount.name" type="text" class="w-full p-3 bg-slate-50 dark:bg-[#131c27] border border-slate-200 dark:border-[#212e3e] rounded-xl text-xs font-bold text-slate-900 dark:text-white" />
        </div>

        <div>
          <label class="block text-xs font-bold mb-1.5 text-slate-700 dark:text-slate-300">አሁን ያለው የይለፍ ቃል (Current Password)</label>
          <input v-model="adminAccount.currentPassword" type="password" class="w-full p-3 bg-slate-50 dark:bg-[#131c27] border border-slate-200 dark:border-[#212e3e] rounded-xl text-xs font-bold focus:outline-none focus:border-emerald-500 text-slate-900 dark:text-white" placeholder="••••••••" />
        </div>

        <div>
          <label class="block text-xs font-bold mb-1.5 text-slate-700 dark:text-slate-300">አዲስ የይለፍ ቃል (New Password)</label>
          <input v-model="adminAccount.newPassword" type="password" class="w-full p-3 bg-slate-50 dark:bg-[#131c27] border border-slate-200 dark:border-[#212e3e] rounded-xl text-xs font-bold focus:outline-none focus:border-emerald-500 text-slate-900 dark:text-white" placeholder="••••••••" />
        </div>
      </div>

      <div class="pt-4 border-t border-slate-100 dark:border-[#212e3e]">
        <button type="submit" class="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl shadow transition cursor-pointer">
          የይለፍ ቃል ቀይር
        </button>
      </div>
    </form>
  </div>
</template>