<script setup lang="ts">
import { ref, computed } from 'vue'

definePageMeta({ layout: 'partner' })

// 1. Stats State
const stats = ref({
  totalEarned: 145800,
  availableBalance: 32400,
  pendingWithdrawal: 12000,
  lifetimeWithdrawals: 101400
})

// 2. Filter State
const selectedTab = ref<'all' | 'completed' | 'pending' | 'failed'>('all')
const searchQuery = ref('')

// 3. Transactions Interface & Mock Data
interface Transaction {
  id: string
  date: string
  amount: number
  method: string
  accountNumber: string
  status: 'completed' | 'pending' | 'failed'
  type: string
}

const transactions = ref<Transaction[]>([
  {
    id: 'TX-90821',
    date: '2026-08-28',
    amount: 12000,
    method: 'Commercial Bank of Ethiopia (CBE)',
    accountNumber: '1000****4821',
    status: 'pending',
    type: 'withdrawal'
  },
  {
    id: 'TX-88310',
    date: '2026-08-15',
    amount: 25000,
    method: 'Telebirr',
    accountNumber: '0911****56',
    status: 'completed',
    type: 'withdrawal'
  },
  {
    id: 'TX-82109',
    date: '2026-08-01',
    amount: 18500,
    method: 'Cooperative Bank of Oromia (CBO)',
    accountNumber: '1029****9912',
    status: 'completed',
    type: 'withdrawal'
  },
  {
    id: 'TX-79201',
    date: '2026-07-20',
    amount: 5000,
    method: 'Telebirr',
    accountNumber: '0911****56',
    status: 'failed',
    type: 'withdrawal'
  }
])

// 4. Withdrawal Modal State
const isModalOpen = ref(false)
const withdrawAmount = ref<number | ''>('')
const selectedMethod = ref('CBE')
const accountNumber = ref('')
const isSubmitting = ref(false)

// Filter Logic
const filteredTransactions = computed(() => {
  return transactions.value.filter(tx => {
    const matchesTab = selectedTab.value === 'all' || tx.status === selectedTab.value
    const matchesSearch = tx.id.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                          tx.method.toLowerCase().includes(searchQuery.value.toLowerCase())
    return matchesTab && matchesSearch
  })
})

// Handle Withdrawal Submit
const handleWithdrawal = () => {
  const amount = Number(withdrawAmount.value)
  if (!amount || amount <= 0) return
  
  if (amount > stats.value.availableBalance) {
    alert('በቂ የሂሳብ መጠን የሎትም!')
    return
  }

  isSubmitting.value = true

  // Simulate API Request Delay
  setTimeout(() => {
    const selectedBankName = selectedMethod.value === 'CBE' 
      ? 'Commercial Bank of Ethiopia (CBE)' 
      : selectedMethod.value === 'CBO' 
      ? 'Cooperative Bank of Oromia (CBO)' 
      : 'Telebirr'

    transactions.value.unshift({
      id: `TX-${Math.floor(10000 + Math.random() * 90000)}`,
      date: new Date().toISOString().split('T')[0],
      amount: amount,
      method: selectedBankName,
      accountNumber: accountNumber.value || 'N/A',
      status: 'pending',
      type: 'withdrawal'
    })

    stats.value.availableBalance -= amount
    stats.value.pendingWithdrawal += amount

    isSubmitting.value = false
    isModalOpen.value = false
    withdrawAmount.value = ''
    accountNumber.value = ''
  }, 800)
}
</script>

<template>
  <div class="space-y-6">
    <!-- Header Section -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl font-black text-white">የክፍያ ታሪክ (Payouts)</h1>
        <p class="text-slate-400 text-xs sm:text-sm mt-1">
          የተሰበሰበ ገቢን፣ የተከፈሉ ክፍያዎችን እና የወጪ ጥያቄዎችን እዚህ መከታተል ይችላሉ።
        </p>
      </div>

      <button 
        @click="isModalOpen = true"
        class="flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-5 py-2.5 rounded-xl transition shadow-lg active:scale-95 text-xs sm:text-sm cursor-pointer"
      >
        <Icon name="lucide:arrow-up-right" class="w-4 h-4" />
        <span>ገንዘብ ወጪ አድርግ (Withdraw)</span>
      </button>
    </div>

    <!-- Overview Stats Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div class="bg-[#0d1522] border border-[#1a2432] p-5 rounded-2xl">
        <span class="text-slate-400 text-xs font-semibold uppercase tracking-wider">ጠቅላላ ገቢ (Total Earned)</span>
        <div class="text-2xl font-black text-white mt-2">
          {{ stats.totalEarned.toLocaleString() }} <span class="text-xs text-emerald-400 font-bold">ETB</span>
        </div>
      </div>

      <div class="bg-[#0d1522] border border-emerald-500/30 p-5 rounded-2xl relative overflow-hidden">
        <span class="text-emerald-400 text-xs font-semibold uppercase tracking-wider">ሊወጣ የሚችል ሂሳብ</span>
        <div class="text-2xl font-black text-emerald-400 mt-2">
          {{ stats.availableBalance.toLocaleString() }} <span class="text-xs font-bold">ETB</span>
        </div>
        <div class="absolute -right-3 -bottom-3 w-16 h-16 bg-emerald-500/10 rounded-full blur-xl pointer-events-none"></div>
      </div>

      <div class="bg-[#0d1522] border border-[#1a2432] p-5 rounded-2xl">
        <span class="text-slate-400 text-xs font-semibold uppercase tracking-wider">በሂደት ላይ ያለ (Pending)</span>
        <div class="text-2xl font-black text-amber-400 mt-2">
          {{ stats.pendingWithdrawal.toLocaleString() }} <span class="text-xs font-bold">ETB</span>
        </div>
      </div>

      <div class="bg-[#0d1522] border border-[#1a2432] p-5 rounded-2xl">
        <span class="text-slate-400 text-xs font-semibold uppercase tracking-wider">የወጡ ክፍያዎች</span>
        <div class="text-2xl font-black text-slate-300 mt-2">
          {{ stats.lifetimeWithdrawals.toLocaleString() }} <span class="text-xs font-bold">ETB</span>
        </div>
      </div>
    </div>

    <!-- Filter Bar & Search -->
    <div class="bg-[#0d1522] border border-[#1a2432] p-4 rounded-2xl flex flex-col md:flex-row justify-between items-center gap-4">
      
      <!-- Filter Tabs -->
      <div class="flex items-center gap-1 bg-[#070c14] p-1 rounded-xl border border-[#1a2432] w-full md:w-auto">
        <button 
          v-for="tab in (['all', 'completed', 'pending', 'failed'] as const)" 
          :key="tab"
          @click="selectedTab = tab"
          class="flex-1 md:flex-none px-4 py-1.5 rounded-lg text-xs font-bold capitalize transition cursor-pointer"
          :class="selectedTab === tab ? 'bg-[#152338] text-emerald-400 border border-[#24354d]' : 'text-slate-400 hover:text-white'"
        >
          {{ tab === 'all' ? 'ሁሉም' : tab === 'completed' ? 'የተጠናቀቁ' : tab === 'pending' ? 'በሂደት ላይ' : 'ያልተሳኩ' }}
        </button>
      </div>

      <!-- Search Input -->
      <div class="relative w-full md:w-64">
        <Icon name="lucide:search" class="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
        <input 
          v-model="searchQuery" 
          type="text" 
          placeholder="በመለያ ቁጥር ወይም በባንክ ፈልግ..."
          class="w-full bg-[#070c14] border border-[#1a2432] rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition"
        />
      </div>

    </div>

    <!-- Transactions Table -->
    <div class="bg-[#0d1522] border border-[#1a2432] rounded-2xl overflow-hidden shadow-xl">
      <div class="overflow-x-auto">
        <table class="w-full text-left text-xs">
          <thead class="bg-[#070c14] border-b border-[#1a2432] text-slate-400 uppercase tracking-wider">
            <tr>
              <th class="py-3.5 px-4">የክፍያ መለያ</th>
              <th class="py-3.5 px-4">ቀን</th>
              <th class="py-3.5 px-4">የክፍያ መንገድ</th>
              <th class="py-3.5 px-4">የመለያ ቁጥር</th>
              <th class="py-3.5 px-4">መጠን (ETB)</th>
              <th class="py-3.5 px-4">ሁኔታ (Status)</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-[#1a2432]/60 text-slate-300">
            <tr v-for="tx in filteredTransactions" :key="tx.id" class="hover:bg-[#131f30] transition">
              <td class="py-3.5 px-4 font-mono font-bold text-white">{{ tx.id }}</td>
              <td class="py-3.5 px-4 text-slate-400">{{ tx.date }}</td>
              <td class="py-3.5 px-4 font-medium">{{ tx.method }}</td>
              <td class="py-3.5 px-4 font-mono text-slate-400">{{ tx.accountNumber }}</td>
              <td class="py-3.5 px-4 font-black text-white">
                {{ tx.amount.toLocaleString() }} ETB
              </td>
              <td class="py-3.5 px-4">
                <span 
                  class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold"
                  :class="{
                    'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20': tx.status === 'completed',
                    'bg-amber-500/10 text-amber-400 border border-amber-500/20': tx.status === 'pending',
                    'bg-rose-500/10 text-rose-400 border border-rose-500/20': tx.status === 'failed'
                  }"
                >
                  <span class="w-1.5 h-1.5 rounded-full" :class="{
                    'bg-emerald-400': tx.status === 'completed',
                    'bg-amber-400': tx.status === 'pending',
                    'bg-rose-400': tx.status === 'failed'
                  }"></span>
                  {{ tx.status === 'completed' ? 'የተጠናቀቀ' : tx.status === 'pending' ? 'በሂደት ላይ' : 'ያልተሳካ' }}
                </span>
              </td>
            </tr>
            <tr v-if="filteredTransactions.length === 0">
              <td colspan="6" class="py-8 text-center text-slate-500">
                ምንም የተገኘ የክፍያ ታሪክ የለም።
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- WITHDRAWAL MODAL -->
    <div v-if="isModalOpen" class="fixed inset-0 z-[120] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div class="bg-[#0d1522] border border-[#1a2432] rounded-2xl w-full max-w-md p-6 space-y-5 relative shadow-2xl">
        
        <div class="flex items-center justify-between border-b border-[#1a2432] pb-4">
          <h3 class="text-base font-bold text-white">የገንዘብ ማውጫ ጥያቄ (Withdrawal)</h3>
          <button @click="isModalOpen = false" type="button" class="text-slate-400 hover:text-white">
            <Icon name="lucide:x" class="w-5 h-5" />
          </button>
        </div>

        <form @submit.prevent="handleWithdrawal" class="space-y-4">
          
          <div>
            <label class="block text-xs font-semibold text-slate-300 mb-1">የማውጫ መጠን (ETB)</label>
            <input 
              v-model="withdrawAmount" 
              type="number" 
              required
              min="100"
              :max="stats.availableBalance"
              placeholder="ምሳሌ: 5000"
              class="w-full bg-[#070c14] border border-[#1a2432] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
            />
            <p class="text-[11px] text-slate-400 mt-1">
              ተጨማሪ ሊወጣ የሚችል: <span class="text-emerald-400 font-bold">{{ stats.availableBalance.toLocaleString() }} ETB</span>
            </p>
          </div>

          <div>
            <label class="block text-xs font-semibold text-slate-300 mb-1">የክፍያ ዘዴ (Method)</label>
            <select 
              v-model="selectedMethod" 
              class="w-full bg-[#070c14] border border-[#1a2432] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
            >
              <option value="CBE">Commercial Bank of Ethiopia (CBE)</option>
              <option value="CBO">Cooperative Bank of Oromia (CBO)</option>
              <option value="Telebirr">Telebirr</option>
            </select>
          </div>

          <div>
            <label class="block text-xs font-semibold text-slate-300 mb-1">የባንክ / የቴሌብር ሂሳብ ቁጥር</label>
            <input 
              v-model="accountNumber" 
              type="text" 
              required
              placeholder="1000XXXXXXXXX / 09XXXXXXXX"
              class="w-full bg-[#070c14] border border-[#1a2432] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div class="pt-2 flex justify-end gap-3">
            <button 
              type="button" 
              @click="isModalOpen = false" 
              class="px-4 py-2 rounded-xl text-xs font-bold text-slate-400 hover:bg-[#131f30] transition"
            >
              ሰርዝ
            </button>
            <button 
              type="submit" 
              :disabled="isSubmitting"
              class="px-5 py-2 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 flex items-center gap-2 transition active:scale-95 disabled:opacity-50"
            >
              <Icon v-if="isSubmitting" name="lucide:loader-2" class="w-4 h-4 animate-spin" />
              <span>የጥያቄው ማረጋገጫ ላክ</span>
            </button>
          </div>

        </form>

      </div>
    </div>

  </div>
</template>