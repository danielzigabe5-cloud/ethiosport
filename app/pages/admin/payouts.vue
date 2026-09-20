<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl font-black text-slate-900">Finance & Payouts</h1>
        <p class="text-xs text-slate-500 mt-1">Process partner commission withdrawals and track payout history</p>
      </div>
      <button 
        @click="openAddRequestModal"
        class="bg-[#10B981] hover:bg-emerald-600 active:scale-95 text-white px-4 py-2 rounded-xl text-xs font-bold transition text-center shadow-xs cursor-pointer"
      >
        + Request Manual Payout
      </button>
    </div>

    <!-- Wallet Summary Cards -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div class="bg-white border border-slate-200 p-4 rounded-2xl shadow-xs">
        <p class="text-slate-500 text-[11px] font-medium">Pending Payouts</p>
        <h2 class="text-xl font-black text-amber-600 mt-1">{{ totalPending.toLocaleString() }} ETB</h2>
        <span class="text-[10px] text-slate-400">{{ pendingPayouts.length }} Requests waiting</span>
      </div>

      <div class="bg-white border border-slate-200 p-4 rounded-2xl shadow-xs">
        <p class="text-slate-500 text-[11px] font-medium">Total Paid Out</p>
        <h2 class="text-xl font-black text-emerald-600 mt-1">{{ totalCompleted.toLocaleString() }} ETB</h2>
        <span class="text-[10px] text-slate-400">{{ completedPayouts.length }} Payments processed</span>
      </div>

      <div class="bg-white border border-slate-200 p-4 rounded-2xl shadow-xs">
        <p class="text-slate-500 text-[11px] font-medium">Platform Total Commission</p>
        <h2 class="text-xl font-black text-slate-900 mt-1">{{ (totalPending + totalCompleted).toLocaleString() }} ETB</h2>
        <span class="text-[10px] text-emerald-600 font-semibold">Live Balance Track</span>
      </div>
    </div>

    <!-- Main Content Area -->
    <div class="space-y-6">
      <!-- Pending Requests Section -->
      <div class="bg-white border border-slate-200 rounded-2xl p-5 space-y-4 shadow-xs">
        <div class="flex items-center justify-between border-b border-slate-100 pb-3">
          <h2 class="text-sm font-bold text-amber-700">Pending Withdrawal Requests</h2>
          <span class="text-xs bg-amber-50 text-amber-700 border border-amber-200 px-2.5 py-0.5 rounded-full font-bold">
            {{ pendingPayouts.length }} Pending
          </span>
        </div>

        <div v-if="pendingPayouts.length > 0" class="space-y-3">
          <div 
            v-for="p in pendingPayouts" 
            :key="p.id" 
            class="flex flex-col sm:flex-row sm:items-center justify-between bg-slate-50 p-4 rounded-xl border border-slate-200 gap-3"
          >
            <div>
              <p class="text-xs font-bold text-slate-900">{{ p.venue }}</p>
              <p class="text-[10px] text-slate-500">{{ p.bank }} - <span class="text-slate-700 font-mono">{{ p.account }}</span></p>
              <p class="text-[10px] text-slate-400 mt-0.5">Requested: {{ p.date }}</p>
            </div>

            <div class="flex items-center justify-between sm:justify-end gap-4">
              <div class="text-left sm:text-right">
                <p class="text-xs font-bold text-emerald-600">{{ p.amount.toLocaleString() }} ETB</p>
              </div>
              
              <div class="flex items-center gap-2">
                <button 
                  @click="confirmPayout(p)" 
                  class="text-[10px] bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 px-3 py-1.5 rounded-lg font-bold transition cursor-pointer"
                >
                  Process Payment
                </button>
                <button 
                  @click="rejectPayout(p.id)" 
                  class="text-[10px] bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 px-3 py-1.5 rounded-lg font-bold transition cursor-pointer"
                >
                  Reject
                </button>
              </div>
            </div>
          </div>
        </div>

        <div v-else class="text-center py-6 text-slate-400 text-xs">
          No pending withdrawal requests at the moment.
        </div>
      </div>

      <!-- Completed Payouts History -->
      <div class="bg-white border border-slate-200 rounded-2xl p-5 space-y-4 shadow-xs">
        <div class="flex items-center justify-between border-b border-slate-100 pb-3">
          <h2 class="text-sm font-bold text-emerald-700">Processed Payment History</h2>
          <span class="text-xs text-slate-400 font-medium">Recently Paid</span>
        </div>

        <div v-if="completedPayouts.length > 0" class="overflow-x-auto">
          <table class="w-full text-left text-xs text-slate-600">
            <thead class="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-bold">
              <tr>
                <th class="p-3">Venue</th>
                <th class="p-3">Bank Info</th>
                <th class="p-3">Amount</th>
                <th class="p-3">Processed Date</th>
                <th class="p-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 font-medium">
              <tr v-for="h in completedPayouts" :key="h.id" class="hover:bg-slate-50 transition">
                <td class="p-3 font-bold text-slate-900">{{ h.venue }}</td>
                <td class="p-3 text-slate-500">{{ h.bank }} ({{ h.account }})</td>
                <td class="p-3 font-bold text-emerald-600">{{ h.amount.toLocaleString() }} ETB</td>
                <td class="p-3 text-slate-400">{{ h.date }}</td>
                <td class="p-3 text-right">
                  <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    Completed
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div v-else class="text-center py-6 text-slate-400 text-xs">
          No completed transaction history yet.
        </div>
      </div>
    </div>

    <!-- Manual Request Modal -->
    <div v-if="showModal" class="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
      <div class="bg-white border border-slate-200 w-full max-w-md rounded-2xl p-6 space-y-4 shadow-xl">
        <h2 class="text-lg font-bold text-slate-900">Create Payout Request</h2>

        <form @submit.prevent="saveNewRequest" class="space-y-4">
          <div>
            <label class="block text-xs font-bold text-slate-600 mb-1">Venue Name</label>
            <input 
              v-model="form.venue" 
              type="text" 
              required 
              placeholder="e.g. Meskel Friendship Pitch"
              class="w-full bg-slate-50 border border-slate-200 text-slate-800 text-xs rounded-xl p-3 focus:outline-none focus:border-emerald-500 focus:bg-white transition"
            />
          </div>

          <div>
            <label class="block text-xs font-bold text-slate-600 mb-1">Bank Name</label>
            <select 
              v-model="form.bank" 
              required
              class="w-full bg-slate-50 border border-slate-200 text-slate-800 text-xs rounded-xl p-3 focus:outline-none focus:border-emerald-500 focus:bg-white transition"
            >
              <option value="" disabled>Select Bank</option>
              <option value="Commercial Bank of Ethiopia">Commercial Bank of Ethiopia</option>
              <option value="Bank of Abyssinia">Bank of Abyssinia</option>
              <option value="Awash Bank">Awash Bank</option>
              <option value="Telebirr">Telebirr Wallet</option>
            </select>
          </div>

          <div>
            <label class="block text-xs font-bold text-slate-600 mb-1">Account Number</label>
            <input 
              v-model="form.account" 
              type="text" 
              required 
              placeholder="1000..."
              class="w-full bg-slate-50 border border-slate-200 text-slate-800 text-xs rounded-xl p-3 focus:outline-none focus:border-emerald-500 focus:bg-white transition font-mono"
            />
          </div>

          <div>
            <label class="block text-xs font-bold text-slate-600 mb-1">Amount (ETB)</label>
            <input 
              v-model.number="form.amount" 
              type="number" 
              min="1"
              required 
              placeholder="0.00"
              class="w-full bg-slate-50 border border-slate-200 text-slate-800 text-xs rounded-xl p-3 focus:outline-none focus:border-emerald-500 focus:bg-white transition"
            />
          </div>

          <div class="flex gap-3 pt-2">
            <button 
              type="submit" 
              class="flex-1 bg-[#10B981] hover:bg-emerald-600 text-white text-xs font-bold py-3 rounded-xl transition shadow-xs cursor-pointer"
            >
              Submit Request
            </button>
            <button 
              type="button" 
              @click="showModal = false" 
              class="px-5 bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-bold py-3 rounded-xl transition cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

definePageMeta({ layout: 'admin' })

interface Payout {
  id: number
  venue: string
  bank: string
  account: string
  amount: number
  status: 'pending' | 'completed'
  date: string
}

const showModal = ref(false)

const form = ref({
  venue: '',
  bank: '',
  account: '',
  amount: 0
})

// Shared State via useState
const payouts = useState<Payout[]>('payouts-list', () => [
  { id: 1, venue: 'Bole Futsal Arena', bank: 'Commercial Bank of Ethiopia', account: '100012345678', amount: 24500, status: 'pending', date: '2026-09-01' },
  { id: 2, venue: 'Kazanchis Sports Zone', bank: 'Bank of Abyssinia', account: '987654321', amount: 18000, status: 'pending', date: '2026-09-02' },
  { id: 3, venue: 'Sarbet Pitch', bank: 'Awash Bank', account: '0132098765', amount: 12000, status: 'completed', date: '2026-08-28' }
])

// Computed Properties for Wallet Dashboard
const pendingPayouts = computed(() => payouts.value.filter(p => p.status === 'pending'))
const completedPayouts = computed(() => payouts.value.filter(p => p.status === 'completed'))

const totalPending = computed(() => pendingPayouts.value.reduce((acc, curr) => acc + curr.amount, 0))
const totalCompleted = computed(() => completedPayouts.value.reduce((acc, curr) => acc + curr.amount, 0))

// Handlers
const confirmPayout = (payout: Payout) => {
  if (confirm(`Confirm processing payout of ${payout.amount.toLocaleString()} ETB to ${payout.venue}?`)) {
    payout.status = 'completed'
    payout.date = new Date().toISOString().split('T')[0]
  }
}

const rejectPayout = (id: number) => {
  if (confirm('Are you sure you want to reject this request?')) {
    payouts.value = payouts.value.filter(p => p.id !== id)
  }
}

const openAddRequestModal = () => {
  form.value = { venue: '', bank: '', account: '', amount: 0 }
  showModal.value = true
}

const saveNewRequest = () => {
  const newId = payouts.value.length ? Math.max(...payouts.value.map(p => p.id)) + 1 : 1
  payouts.value.unshift({
    id: newId,
    venue: form.value.venue,
    bank: form.value.bank,
    account: form.value.account,
    amount: form.value.amount,
    status: 'pending',
    date: new Date().toISOString().split('T')[0]
  })
  showModal.value = false
}
</script>