<template>
  <div class="max-w-4xl space-y-6">
    <!-- Toast Notification -->
    <Transition name="fade">
      <div 
        v-if="toast.show" 
        class="fixed top-5 right-5 z-50 px-4 py-3 rounded-xl text-xs font-bold text-white shadow-xl flex items-center gap-2"
        :class="toast.type === 'success' ? 'bg-[#10B981]' : 'bg-rose-600'"
      >
        <span>{{ toast.message }}</span>
      </div>
    </Transition>

    <div>
      <h1 class="text-2xl font-black text-slate-900">System Settings</h1>
      <p class="text-xs text-slate-500 mt-1">Manage platform rules, commission rates, and API keys</p>
    </div>

    <!-- Navigation Tabs -->
    <div class="flex gap-2 border-b border-slate-200 pb-2 overflow-x-auto">
      <button 
        @click="activeTab = 'general'"
        class="px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer"
        :class="activeTab === 'general' ? 'bg-[#10B981] text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'"
      >
        General Settings
      </button>
      <button 
        @click="activeTab = 'payment'"
        class="px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer"
        :class="activeTab === 'payment' ? 'bg-[#10B981] text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'"
      >
        Finance & Gateways
      </button>
      <button 
        @click="activeTab = 'notifications'"
        class="px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer"
        :class="activeTab === 'notifications' ? 'bg-[#10B981] text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'"
      >
        Notifications & Rules
      </button>
    </div>

    <!-- General Settings Tab -->
    <div v-if="activeTab === 'general'" class="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-xs">
      <form @submit.prevent="saveSettings('General settings saved successfully')" class="space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-xs font-medium text-slate-700 mb-1">Platform Name</label>
            <input 
              v-model="settings.appName" 
              type="text" 
              required
              class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-emerald-500 focus:bg-white transition" 
            />
          </div>
          <div>
            <label class="block text-xs font-medium text-slate-700 mb-1">Support Phone</label>
            <input 
              v-model="settings.supportPhone" 
              type="text" 
              required
              class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-emerald-500 focus:bg-white transition" 
            />
          </div>
          <div>
            <label class="block text-xs font-medium text-slate-700 mb-1">Support Email</label>
            <input 
              v-model="settings.supportEmail" 
              type="email" 
              required
              class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-emerald-500 focus:bg-white transition" 
            />
          </div>
          <div>
            <label class="block text-xs font-medium text-slate-700 mb-1">Currency</label>
            <select 
              v-model="settings.currency"
              class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-emerald-500 focus:bg-white transition"
            >
              <option value="ETB">ETB - Ethiopian Birr</option>
              <option value="USD">USD - US Dollar</option>
            </select>
          </div>
        </div>

        <button 
          type="submit" 
          :disabled="isSaving"
          class="bg-[#10B981] hover:bg-emerald-600 active:scale-95 text-white text-xs font-bold px-6 py-2.5 rounded-xl transition shadow-xs disabled:opacity-50 cursor-pointer"
        >
          {{ isSaving ? 'Saving...' : 'Save Settings' }}
        </button>
      </form>
    </div>

    <!-- Finance & Gateways Tab -->
    <div v-if="activeTab === 'payment'" class="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-xs">
      <form @submit.prevent="saveSettings('Payment rules & API keys updated')" class="space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-xs font-medium text-slate-700 mb-1">System Commission Rate (%)</label>
            <input 
              v-model.number="settings.commissionRate" 
              type="number" 
              min="0" 
              max="100"
              required
              class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-emerald-500 focus:bg-white transition" 
            />
          </div>
          <div>
            <label class="block text-xs font-medium text-slate-700 mb-1">Minimum Payout Threshold (ETB)</label>
            <input 
              v-model.number="settings.minPayoutAmount" 
              type="number" 
              min="0"
              required
              class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-emerald-500 focus:bg-white transition" 
            />
          </div>
        </div>

        <div class="border-t border-slate-100 pt-4 space-y-3">
          <h3 class="text-xs font-bold text-emerald-700">Payment Gateway Keys</h3>
          
          <div>
            <label class="block text-xs font-medium text-slate-700 mb-1">Chapa Secret Key</label>
            <input 
              v-model="settings.chapaSecretKey" 
              type="password" 
              placeholder="CHASECK_TEST-..."
              class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 font-mono focus:outline-none focus:border-emerald-500 focus:bg-white transition" 
            />
          </div>

          <div>
            <label class="block text-xs font-medium text-slate-700 mb-1">Telebirr Merchant App ID</label>
            <input 
              v-model="settings.telebirrAppId" 
              type="text" 
              placeholder="e.g. 84739201"
              class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 font-mono focus:outline-none focus:border-emerald-500 focus:bg-white transition" 
            />
          </div>
        </div>

        <button 
          type="submit" 
          :disabled="isSaving"
          class="bg-[#10B981] hover:bg-emerald-600 active:scale-95 text-white text-xs font-bold px-6 py-2.5 rounded-xl transition shadow-xs disabled:opacity-50 cursor-pointer"
        >
          {{ isSaving ? 'Saving...' : 'Save Payment Rules' }}
        </button>
      </form>
    </div>

    <!-- Notifications & Rules Tab -->
    <div v-if="activeTab === 'notifications'" class="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-xs">
      <form @submit.prevent="saveSettings('Notification preferences updated')" class="space-y-4">
        <div class="space-y-3">
          <div class="flex items-center justify-between bg-slate-50 p-3.5 rounded-xl border border-slate-200">
            <div>
              <p class="text-xs font-bold text-slate-900">SMS Booking Confirmations</p>
              <p class="text-[10px] text-slate-500">Send SMS to players when a booking is confirmed</p>
            </div>
            <input v-model="settings.enableSms" type="checkbox" class="accent-emerald-600 w-4 h-4 cursor-pointer" />
          </div>

          <div class="flex items-center justify-between bg-slate-50 p-3.5 rounded-xl border border-slate-200">
            <div>
              <p class="text-xs font-bold text-slate-900">Auto Approve Payout Requests</p>
              <p class="text-[10px] text-slate-500">Automatically process payout requests under 5,000 ETB</p>
            </div>
            <input v-model="settings.autoApprovePayouts" type="checkbox" class="accent-emerald-600 w-4 h-4 cursor-pointer" />
          </div>

          <div class="flex items-center justify-between bg-slate-50 p-3.5 rounded-xl border border-slate-200">
            <div>
              <p class="text-xs font-bold text-slate-900">Maintenance Mode</p>
              <p class="text-[10px] text-slate-500">Temporarily disable booking features for platform updates</p>
            </div>
            <input v-model="settings.maintenanceMode" type="checkbox" class="accent-rose-600 w-4 h-4 cursor-pointer" />
          </div>
        </div>

        <button 
          type="submit" 
          :disabled="isSaving"
          class="bg-[#10B981] hover:bg-emerald-600 active:scale-95 text-white text-xs font-bold px-6 py-2.5 rounded-xl transition shadow-xs disabled:opacity-50 cursor-pointer"
        >
          {{ isSaving ? 'Saving...' : 'Save Notification Rules' }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

definePageMeta({ layout: 'admin' })

const activeTab = ref('general')
const isSaving = ref(false)

const toast = ref({
  show: false,
  message: '',
  type: 'success'
})

// Central State using useState
const settings = useState('system-settings', () => ({
  appName: 'Combolojo Portal',
  supportPhone: '+251 911 000 000',
  supportEmail: 'support@combolojo.com',
  currency: 'ETB',
  commissionRate: 10,
  minPayoutAmount: 1000,
  chapaSecretKey: 'CHASECK_TEST-1234567890',
  telebirrAppId: '84739201',
  enableSms: true,
  autoApprovePayouts: false,
  maintenanceMode: false
}))

const triggerToast = (msg: string, type = 'success') => {
  toast.value = { show: true, message: msg, type }
  setTimeout(() => {
    toast.value.show = false
  }, 3000)
}

const saveSettings = async (successMsg: string) => {
  isSaving.value = true
  
  try {
    // Backend API Call Simulation (Replace with actual $fetch or axios)
    // await $fetch('/api/admin/settings', { method: 'POST', body: settings.value })
    await new Promise(resolve => setTimeout(resolve, 600))
    
    triggerToast(successMsg)
  } catch (error) {
    triggerToast('Failed to save settings. Try again.', 'error')
  } finally {
    isSaving.value = false
  }
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>