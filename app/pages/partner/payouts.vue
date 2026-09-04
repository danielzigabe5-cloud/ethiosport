<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'

// ገጹ የፓርትነር ሌይአውትን እንዲጠቀም (layouts/partner.vue ካለህ)
definePageMeta({ layout: 'partner' })

// 1. የዳታ መቀመጫዎች (State)
const stats = ref({
  totalEarned: 0,
  availableBalance: 0,
  pendingWithdrawal: 0,
  lifetimeWithdrawals: 0
})

const transactions = ref([])
const isLoading = ref(true)
const isSubmitting = ref(false)
const isModalOpen = ref(false)

// 2. የማጣሪያ መቀመጫዎች (Filter State)
type TabType = 'all' | 'completed' | 'pending' | 'failed'
const selectedTab = ref<TabType>('all')
const searchQuery = ref('')

// 3. የገንዘብ ማውጫ ፎርም መቀመጫዎች
const withdrawAmount = ref<number | ''>('')
const selectedMethod = ref('CBE')
const accountNumber = ref('')

// 4. ዳታውን ከባክኤንድ የመጥሪያ ፈንክሽን
const fetchPayouts = async () => {
  isLoading.value = true
  try {
    const token = localStorage.getItem('auth_token')
    // ማሳሰቢያ፡ ባክኤንድህ የሚገኝበትን URL እዚህ ጋር አስተካክል
    const response = await fetch(`http://localhost:8000/api/owner/payouts?status=${selectedTab.value}&search=${searchQuery.value}`, {
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json'
      }
    })
    const data = await response.json()
    if (response.ok) {
      stats.value = data.stats
      transactions.value = data.transactions
    }
  } catch (e) {
    console.error("ዳታውን መጫን አልተቻለም:", e)
  } finally {
    isLoading.value = false
  }
}

// 5. ገንዘብ ማውጫ ጥያቄ መላክ
const handleWithdrawal = async () => {
  if (!withdrawAmount.value || withdrawAmount.value <= 0) return
  
  isSubmitting.value = true
  try {
    const token = localStorage.getItem('auth_token')
    const response = await fetch('http://localhost:8000/api/owner/withdraw', {
      method: 'POST',
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        amount: withdrawAmount.value,
        method: selectedMethod.value,
        account_number: accountNumber.value
      })
    })
    
    const result = await response.json()
    if (response.ok) {
      alert(result.message)
      isModalOpen.value = false
      // ፎርሙን ባዶ አድርግ
      withdrawAmount.value = ''
      accountNumber.value = ''
      fetchPayouts() // ገጹን አድስ
    } else {
      alert(result.message || "ስህተት ተከስቷል")
    }
  } catch (e) {
    alert("ከባክኤንድ ጋር መገናኘት አልተቻለም!")
  } finally {
    isSubmitting.value = false
  }
}

// ገጹ ሲከፈት ዳታ ጥራ
onMounted(fetchPayouts)

// ማጣሪያው (Filter) ሲቀየር ዳታውን በድጋሚ ጥራ
watch([selectedTab, searchQuery], () => {
  fetchPayouts()
})
</script>

<template>
  <div class="p-6 space-y-6 bg-[#070c14] min-h-screen text-white">
    <!-- Header Section -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl font-black text-white">የክፍያ ታሪክ (Payouts)</h1>
        <p class="text-slate-400 text-sm mt-1">የተሰበሰበ ገቢንና የወጪ ጥያቄዎችን እዚህ መከታተል ይችላሉ።</p>
      </div>

      <button 
        @click="isModalOpen = true"
        class="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-5 py-2.5 rounded-xl transition shadow-lg active:scale-95 text-sm cursor-pointer"
      >
        ገንዘብ ወጪ አድርግ (Withdraw)
      </button>
    </div>

    <!-- Overview Stats Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div class="bg-[#0d1522] border border-[#1a2432] p-5 rounded-2xl">
        <span class="text-slate-400 text-xs font-semibold uppercase">ጠቅላላ ገቢ</span>
        <div class="text-2xl font-black text-white mt-2">{{ stats.totalEarned.toLocaleString() }} ETB</div>
      </div>

      <div class="bg-[#0d1522] border border-emerald-500/30 p-5 rounded-2xl">
        <span class="text-emerald-400 text-xs font-semibold uppercase">ሊወጣ የሚችል ሂሳብ</span>
        <div class="text-2xl font-black text-emerald-400 mt-2">{{ stats.availableBalance.toLocaleString() }} ETB</div>
      </div>

      <div class="bg-[#0d1522] border border-[#1a2432] p-5 rounded-2xl">
        <span class="text-slate-400 text-xs font-semibold uppercase">በሂደት ላይ (Pending)</span>
        <div class="text-2xl font-black text-amber-400 mt-2">{{ stats.pendingWithdrawal.toLocaleString() }} ETB</div>
      </div>

      <div class="bg-[#0d1522] border border-[#1a2432] p-5 rounded-2xl">
        <span class="text-slate-400 text-xs font-semibold uppercase">የወጡ ክፍያዎች</span>
        <div class="text-2xl font-black text-slate-300 mt-2">{{ stats.lifetimeWithdrawals.toLocaleString() }} ETB</div>
      </div>
    </div>

    <!-- Filter Bar -->
    <div class="flex flex-col md:flex-row justify-between items-center gap-4 bg-[#0d1522] p-4 rounded-2xl border border-[#1a2432]">
      <div class="flex gap-1 bg-[#070c14] p-1 rounded-xl border border-[#1a2432]">
        <button 
          v-for="tab in (['all', 'completed', 'pending', 'failed'] as const)" 
          :key="tab"
          @click="selectedTab = tab"
          class="px-4 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer"
          :class="selectedTab === tab ? 'bg-[#152338] text-emerald-400 border border-[#24354d]' : 'text-slate-400'"
        >
          {{ tab === 'all' ? 'ሁሉም' : tab === 'completed' ? 'የተጠናቀቁ' : tab === 'pending' ? 'በሂደት ላይ' : 'ያልተሳኩ' }}
        </button>
      </div>

      <input 
        v-model="searchQuery" 
        type="text" 
        placeholder="በመለያ ቁጥር ፈልግ..."
        class="bg-[#070c14] border border-[#1a2432] rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-emerald-500 w-full md:w-64"
      />
    </div>

    <!-- Transactions Table -->
    <div class="bg-[#0d1522] border border-[#1a2432] rounded-2xl overflow-hidden shadow-xl">
      <div v-if="isLoading" class="p-10 text-center text-slate-500">በመጫን ላይ...</div>
      <table v-else class="w-full text-left text-xs">
        <thead class="bg-[#070c14] border-b border-[#1a2432] text-slate-400 uppercase">
          <tr>
            <th class="py-4 px-4">የክፍያ መለያ</th>
            <th class="py-4 px-4">ቀን</th>
            <th class="py-4 px-4">የክፍያ መንገድ</th>
            <th class="py-4 px-4">መጠን (ETB)</th>
            <th class="py-4 px-4">ሁኔታ</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-[#1a2432]/60 text-slate-300">
          <tr v-for="tx in transactions" :key="tx.id" class="hover:bg-[#131f30] transition">
            <td class="py-4 px-4 font-mono font-bold text-white">{{ tx.id }}</td>
            <td class="py-4 px-4">{{ tx.date }}</td>
            <td class="py-4 px-4">{{ tx.method }}</td>
            <td class="py-4 px-4 font-black text-white">{{ tx.amount.toLocaleString() }}</td>
            <td class="py-4 px-4">
              <span 
                class="px-2.5 py-1 rounded-full text-[10px] font-bold border"
                :class="{
                  'bg-emerald-500/10 text-emerald-400 border-emerald-500/20': tx.status === 'completed',
                  'bg-amber-500/10 text-amber-400 border-amber-500/20': tx.status === 'pending',
                  'bg-rose-500/10 text-rose-400 border-rose-500/20': tx.status === 'failed'
                }"
              >
                {{ tx.status }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- WITHDRAWAL MODAL -->
    <div v-if="isModalOpen" class="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div class="bg-[#0d1522] border border-[#1a2432] rounded-2xl w-full max-w-md p-6 space-y-5">
        <h3 class="text-lg font-bold text-white border-b border-[#1a2432] pb-3">የገንዘብ ማውጫ ጥያቄ</h3>
        
        <div class="space-y-4">
          <div>
            <label class="block text-xs font-semibold text-slate-300 mb-1">የማውጫ መጠን (ETB)</label>
            <input v-model="withdrawAmount" type="number" class="w-full bg-[#070c14] border border-[#1a2432] rounded-xl px-4 py-2.5 text-white" />
          </div>
          <div>
            <label class="block text-xs font-semibold text-slate-300 mb-1">የክፍያ ዘዴ</label>
            <select v-model="selectedMethod" class="w-full bg-[#070c14] border border-[#1a2432] rounded-xl px-4 py-2.5 text-white">
              <option value="CBE">CBE</option>
              <option value="Telebirr">Telebirr</option>
            </select>
          </div>
          <div>
            <label class="block text-xs font-semibold text-slate-300 mb-1">የሂሳብ ቁጥር</label>
            <input v-model="accountNumber" type="text" class="w-full bg-[#070c14] border border-[#1a2432] rounded-xl px-4 py-2.5 text-white" />
          </div>
        </div>

        <div class="flex justify-end gap-3 pt-4">
          <button @click="isModalOpen = false" class="text-slate-400 text-sm font-bold">ሰርዝ</button>
          <button 
            @click="handleWithdrawal" 
            :disabled="isSubmitting"
            class="bg-emerald-500 text-slate-950 px-5 py-2 rounded-xl font-bold text-sm disabled:opacity-50"
          >
            {{ isSubmitting ? 'በመላክ ላይ...' : 'ጥያቄውን ላክ' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>