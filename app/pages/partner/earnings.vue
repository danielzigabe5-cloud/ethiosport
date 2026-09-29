<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useAuthStore } from '~/stores/auth'

/* ═══════════════════════════════════════════
   PAGE META
   ═══════════════════════════════════════════ */
definePageMeta({
  layout: 'partner',
  middleware: 'auth',
})

/* ═══════════════════════════════════════════
   TYPES
   ═══════════════════════════════════════════ */
interface EarningStat {
  title: string
  value: string
  change: string
  icon: string
  trend: 'up' | 'down' | 'neutral'
}

interface ChartItem {
  month: string
  amount: string
  height: number
}

interface Transaction {
  id: number
  description: string
  date: string
  amount: string
  type: 'income' | 'payout'
}

interface Payout {
  id: number
  reference: string
  date: string
  method: string
  amount: string
  status: 'Completed' | 'Pending' | 'Failed' | 'Processing'
}

interface BankAccount {
  id: number
  bankName: string
  accountNumber: string
  accountHolder: string
  isDefault: boolean
}

/* ═══════════════════════════════════════════
   SETUP
   ═══════════════════════════════════════════ */
const config = useRuntimeConfig()
const authStore = useAuthStore()

const isLoading = ref(true)
const isSaving = ref(false)

const errorMessage = ref('')
const successMessage = ref('')

const period = ref('Last 6 Months')

/* ── Data ── */
const stats = ref<EarningStat[]>([])
const chart = ref<ChartItem[]>([])
const transactions = ref<Transaction[]>([])
const payouts = ref<Payout[]>([])
const bankAccounts = ref<BankAccount[]>([])

const walletBalance = ref(0)
const pendingBalance = ref(0)

/* ── Modals ── */
const showWithdrawModal = ref(false)
const showBankModal = ref(false)

/* ── Withdrawal form ── */
const withdrawForm = ref({
  amount: '',
  bankAccountId: null as number | null,
  method: 'bank' as 'bank' | 'telebirr' | 'cbe_birr',
})

const withdrawErrors = ref<Record<string, string>>({})

/* ═══════════════════════════════════════════
   API HELPERS
   ═══════════════════════════════════════════ */
const apiBase = computed(() => {
  const base = String(config.public.apiBase || 'http://127.0.0.1:8000').replace(/\/+$/, '')
  return base.endsWith('/api') ? base : `${base}/api`
})

const getToken = (): string => {
  if (authStore?.token) return String(authStore.token)
  if (import.meta.client) {
    const c = useCookie<string | null>('auth_token')
    if (c.value) return c.value
    const ls = localStorage.getItem('auth_token') || localStorage.getItem('token')
    if (ls) return ls
  }
  return ''
}

/* ═══════════════════════════════════════════
   FORMATTERS
   ═══════════════════════════════════════════ */
const formatETB = (amount: number | string) => {
  const num = Number(amount) || 0
  return `ETB ${new Intl.NumberFormat('en-ET').format(num)}`
}

/* ═══════════════════════════════════════════
   1️⃣ LOAD ALL DATA
   ═══════════════════════════════════════════ */
const loadAll = async () => {
  isLoading.value = true
  errorMessage.value = ''

  try {
    // 🌐 All API calls in parallel
    const [earningsRes, payoutsRes, accountsRes] = await Promise.allSettled([
      $fetch<any>(`${apiBase.value}/partner/earnings`, {
        headers: { Authorization: `Bearer ${getToken()}`, Accept: 'application/json' },
      }),
      $fetch<any>(`${apiBase.value}/partner/payouts`, {
        headers: { Authorization: `Bearer ${getToken()}`, Accept: 'application/json' },
      }),
      $fetch<any>(`${apiBase.value}/partner/bank-accounts`, {
        headers: { Authorization: `Bearer ${getToken()}`, Accept: 'application/json' },
      }),
    ])

    // ── Earnings ──
    if (earningsRes.status === 'fulfilled') {
      const data = earningsRes.value?.data || earningsRes.value
      stats.value       = data?.stats || []
      chart.value       = data?.chart || []
      transactions.value = data?.transactions || []
      walletBalance.value  = Number(data?.wallet_balance ?? 0)
      pendingBalance.value = Number(data?.pending_balance ?? 0)
    } else {
      // Fallback demo data
      stats.value = [
        { title: 'Total Earnings',    value: 'ETB 486,500', change: '+14.8%',            icon: '💰', trend: 'up' },
        { title: 'This Month',        value: 'ETB 86,500',  change: '+8.4%',             icon: '📈', trend: 'up' },
        { title: 'Available Balance', value: 'ETB 54,200',  change: 'Ready to withdraw', icon: '💳', trend: 'neutral' },
        { title: 'Pending',           value: 'ETB 12,500',  change: 'Processing',        icon: '⏳', trend: 'neutral' },
      ]
      chart.value = [
        { month: 'Apr', amount: '58,000', height: 52 },
        { month: 'May', amount: '64,500', height: 61 },
        { month: 'Jun', amount: '72,300', height: 68 },
        { month: 'Jul', amount: '69,800', height: 65 },
        { month: 'Aug', amount: '79,400', height: 75 },
        { month: 'Sep', amount: '86,500', height: 92 },
      ]
      transactions.value = [
        { id: 1, description: 'Booking #BK-1024', date: 'Today · 4:00 PM', amount: '1,500', type: 'income' },
        { id: 2, description: 'Booking #BK-1021', date: 'Yesterday',       amount: '1,500', type: 'income' },
        { id: 3, description: 'Event registration', date: 'Sep 25, 2026',  amount: '5,000', type: 'income' },
      ]
      walletBalance.value = 54200
      pendingBalance.value = 12500
    }

    // ── Payouts ──
    if (payoutsRes.status === 'fulfilled') {
      const data = payoutsRes.value?.data || payoutsRes.value
      payouts.value = Array.isArray(data) ? data : (data?.payouts || [])
    } else {
      payouts.value = [
        { id: 1, reference: 'PO-2026-0098', date: 'Sep 20, 2026', method: 'CBE Bank', amount: '45,000', status: 'Completed' },
        { id: 2, reference: 'PO-2026-0091', date: 'Sep 05, 2026', method: 'CBE Bank', amount: '38,500', status: 'Completed' },
        { id: 3, reference: 'PO-2026-0101', date: 'Sep 27, 2026', method: 'CBE Bank', amount: '12,500', status: 'Pending' },
      ]
    }

    // ── Bank Accounts ──
    if (accountsRes.status === 'fulfilled') {
      const data = accountsRes.value?.data || accountsRes.value
      bankAccounts.value = Array.isArray(data) ? data : (data?.accounts || [])
    } else {
      bankAccounts.value = [
        { id: 1, bankName: 'Commercial Bank of Ethiopia', accountNumber: '1000123456789', accountHolder: 'Partner Name', isDefault: true },
      ]
    }

    // Auto-select default account
    const defaultAccount = bankAccounts.value.find(a => a.isDefault)
    if (defaultAccount) withdrawForm.value.bankAccountId = defaultAccount.id

  } catch (e: any) {
    console.error('Error loading data:', e)
    errorMessage.value = 'Failed to load financial data.'
  } finally {
    isLoading.value = false
  }
}

/* ═══════════════════════════════════════════
   2️⃣ REQUEST PAYOUT — ወደ አካውንት ማስተላለፍ
   ═══════════════════════════════════════════ */
const validateWithdrawal = (): boolean => {
  const errors: Record<string, string> = {}
  const amount = Number(withdrawForm.value.amount)

  if (!amount || amount <= 0) {
    errors.amount = 'Please enter a valid amount'
  } else if (amount < 100) {
    errors.amount = 'Minimum withdrawal is ETB 100'
  } else if (amount > walletBalance.value) {
    errors.amount = `Amount exceeds available balance (${formatETB(walletBalance.value)})`
  }

  if (withdrawForm.value.method === 'bank' && !withdrawForm.value.bankAccountId) {
    errors.bankAccountId = 'Please select a bank account'
  }

  withdrawErrors.value = errors
  return Object.keys(errors).length === 0
}

const requestPayout = async () => {
  if (!validateWithdrawal()) return

  isSaving.value = true
  errorMessage.value = ''

  try {
    const payload: any = {
      amount: Number(withdrawForm.value.amount),
      method: withdrawForm.value.method,
    }

    if (withdrawForm.value.method === 'bank') {
      payload.bank_account_id = withdrawForm.value.bankAccountId
    }

    const response = await $fetch<any>(`${apiBase.value}/partner/payouts/request`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${getToken()}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: payload,
    })

    if (response?.success) {
      successMessage.value = response.message || 'Payout request submitted!'
      showWithdrawModal.value = false
      withdrawForm.value = {
        amount: '',
        bankAccountId: bankAccounts.value.find(a => a.isDefault)?.id ?? null,
        method: 'bank',
      }
      await loadAll()
      setTimeout(() => (successMessage.value = ''), 4000)
    } else {
      errorMessage.value = response?.message || 'Failed to submit payout request.'
    }
  } catch (e: any) {
    console.error('Payout request error:', e)
    errorMessage.value = e?.data?.message || 'Failed to submit payout request.'
    setTimeout(() => (errorMessage.value = ''), 4000)
  } finally {
    isSaving.value = false
  }
}

/* ═══════════════════════════════════════════
   3️⃣ COMPUTED
   ═══════════════════════════════════════════ */
const selectedBankAccount = computed(() =>
  bankAccounts.value.find(a => a.id === withdrawForm.value.bankAccountId)
)

const maxWithdrawable = computed(() => walletBalance.value)

const canWithdraw = computed(() => walletBalance.value >= 100)

const quickAmounts = [500, 1000, 5000, 10000]

const setQuickAmount = (amt: number) => {
  if (amt <= maxWithdrawable.value) {
    withdrawForm.value.amount = String(amt)
  }
}

const setMaxAmount = () => {
  withdrawForm.value.amount = String(maxWithdrawable.value)
}

/* ── Payout status colors ── */
function payoutStatusClass(status: string) {
  const s = status.toLowerCase()
  if (s === 'completed')  return 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200'
  if (s === 'pending')    return 'bg-amber-50 text-amber-700 ring-1 ring-amber-200'
  if (s === 'processing') return 'bg-blue-50 text-blue-700 ring-1 ring-blue-200'
  if (s === 'failed')     return 'bg-red-50 text-red-700 ring-1 ring-red-200'
  return 'bg-slate-50 text-slate-700 ring-1 ring-slate-200'
}

function trendClass(trend?: string) {
  if (trend === 'up')   return 'text-emerald-600'
  if (trend === 'down') return 'text-red-500'
  return 'text-slate-500'
}

/* ═══════════════════════════════════════════
   LIFECYCLE
   ═══════════════════════════════════════════ */
onMounted(async () => {
  if (authStore?.init) authStore.init()
  await loadAll()
})
</script>

<template>
  <div class="min-h-full bg-gradient-to-b from-slate-50 to-slate-100/50">

    <!-- ═══════════════════════════════════════════
         HEADER
         ═══════════════════════════════════════════ -->
    <section class="border-b border-slate-200 bg-white/80 backdrop-blur-sm">
      <div class="mx-auto max-w-[1500px] px-6 py-7 lg:px-8">

        <p class="flex items-center gap-2 text-sm font-semibold text-emerald-600">
          <span class="relative flex h-2 w-2">
            <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
            <span class="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
          </span>
          Finance
        </p>

        <div class="mt-1 flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 class="text-3xl font-black tracking-tight text-slate-900">
              Earnings & Payouts
            </h1>
            <p class="mt-1 text-sm text-slate-500">
              Track your revenue, wallet balance, and withdraw funds.
            </p>
          </div>

          <div class="flex flex-wrap gap-2">
            <button
              v-if="canWithdraw"
              @click="showWithdrawModal = true"
              class="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-500/25 transition hover:from-emerald-700 hover:to-emerald-600 hover:shadow-emerald-500/40"
            >
              <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
              Withdraw Funds
            </button>

            <button
              @click="showBankModal = true"
              class="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 shadow-sm transition hover:bg-slate-50"
            >
              🏦 Bank Accounts
            </button>
          </div>
        </div>

      </div>
    </section>

    <!-- ═══════════════════════════════════════════
         CONTENT
         ═══════════════════════════════════════════ -->
    <div class="mx-auto max-w-[1500px] px-6 py-7 lg:px-8">

      <!-- SUCCESS MESSAGE -->
      <Transition
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="opacity-0 -translate-y-2"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition duration-200"
        leave-to-class="opacity-0"
      >
        <div
          v-if="successMessage"
          class="mb-6 flex items-center gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm font-semibold text-emerald-700"
        >
          <svg class="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
          {{ successMessage }}
        </div>
      </Transition>

      <!-- ERROR MESSAGE -->
      <Transition
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="opacity-0 -translate-y-2"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition duration-200"
        leave-to-class="opacity-0"
      >
        <div
          v-if="errorMessage"
          class="mb-6 flex items-center gap-3 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-semibold text-red-700"
        >
          <svg class="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          {{ errorMessage }}
        </div>
      </Transition>

      <!-- ══════════════════════════════════════════════
           WALLET HERO — MAIN BALANCE CARD
           ══════════════════════════════════════════════ -->
      <div class="grid gap-5 lg:grid-cols-[1.5fr_1fr]">

        <!-- Wallet Card -->
        <div class="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950 p-7 text-white shadow-2xl">
          <!-- Decorative orbs -->
          <div class="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-emerald-500/20 blur-3xl" />
          <div class="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl" />

          <div class="relative">
            <div class="flex items-start justify-between">
              <div>
                <p class="text-xs font-bold uppercase tracking-wider text-emerald-400">
                  Available Balance
                </p>

                <p v-if="isLoading" class="mt-3 h-12 w-48 animate-pulse rounded-lg bg-white/10"></p>
                <p v-else class="mt-3 text-4xl font-black tracking-tight">
                  {{ formatETB(walletBalance) }}
                </p>

                <p class="mt-2 flex items-center gap-1.5 text-xs text-slate-400">
                  <span class="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
                  Ready to withdraw
                </p>
              </div>

              <div class="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/15 text-3xl ring-1 ring-emerald-500/30">
                💳
              </div>
            </div>

            <!-- Pending balance -->
            <div class="mt-8 flex items-center gap-4 rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
              <div class="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-500/15 text-xl">
                ⏳
              </div>
              <div class="flex-1">
                <p class="text-xs text-slate-400">Pending Balance</p>
                <p class="mt-0.5 text-lg font-black text-white">{{ formatETB(pendingBalance) }}</p>
              </div>
            </div>

            <!-- Actions -->
            <div class="mt-6 flex flex-col gap-3 sm:flex-row">
              <button
                :disabled="!canWithdraw || isLoading"
                @click="showWithdrawModal = true"
                class="group/btn inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-400 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-500/30 transition hover:from-emerald-600 hover:to-emerald-500 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                </svg>
                Withdraw Funds
              </button>

              <NuxtLink
                to="/partner/bookings"
                class="inline-flex items-center justify-center gap-2 rounded-xl bg-white/10 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/15"
              >
                View Bookings
              </NuxtLink>
            </div>
          </div>
        </div>

        <!-- Payout Account Card -->
        <div class="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
          <div class="flex items-start justify-between">
            <p class="text-xs font-bold uppercase tracking-wider text-slate-400">
              Primary Payout Account
            </p>

            <button
              @click="showBankModal = true"
              class="text-xs font-bold text-emerald-600 transition hover:text-emerald-700"
            >
              Manage →
            </button>
          </div>

          <div v-if="selectedBankAccount" class="mt-5">
            <div class="flex items-center gap-4">
              <div class="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 text-2xl ring-1 ring-emerald-100">
                🏦
              </div>
              <div class="min-w-0 flex-1">
                <p class="truncate font-black text-slate-900">
                  {{ selectedBankAccount.bankName }}
                </p>
                <p class="mt-1 font-mono text-xs text-slate-500">
                  ****{{ selectedBankAccount.accountNumber.slice(-4) }}
                </p>
              </div>
            </div>
            <div class="mt-4 rounded-xl bg-slate-50 p-3 text-xs text-slate-600 ring-1 ring-slate-100">
              <p class="font-bold text-slate-700">{{ selectedBankAccount.accountHolder }}</p>
              <p class="mt-0.5">Default account</p>
            </div>
          </div>

          <div v-else-if="isLoading" class="mt-5 h-24 animate-pulse rounded-xl bg-slate-100"></div>

          <div v-else class="mt-5 rounded-xl border-2 border-dashed border-slate-300 p-6 text-center">
            <p class="text-sm font-bold text-slate-700">No bank account</p>
            <button
              @click="showBankModal = true"
              class="mt-3 inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white transition hover:bg-emerald-700"
            >
              + Add Bank Account
            </button>
          </div>

          <!-- Quick stats -->
          <div class="mt-5 grid grid-cols-2 gap-3">
            <div class="rounded-xl bg-slate-50 p-3 text-center ring-1 ring-slate-100">
              <p class="text-[10px] font-bold uppercase tracking-wide text-slate-500">Total Paid</p>
              <p class="mt-1 text-sm font-black text-slate-900">432,300</p>
            </div>
            <div class="rounded-xl bg-slate-50 p-3 text-center ring-1 ring-slate-100">
              <p class="text-[10px] font-bold uppercase tracking-wide text-slate-500">Last Payout</p>
              <p class="mt-1 text-sm font-black text-slate-900">45,000</p>
            </div>
          </div>
        </div>
      </div>

      <!-- ══════════════════════════════════════════════
           STATS CARDS
           ══════════════════════════════════════════════ -->
      <div class="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <template v-if="isLoading">
          <div
            v-for="i in 4"
            :key="`stat-skel-${i}`"
            class="animate-pulse rounded-2xl border border-slate-200 bg-white p-5"
          >
            <div class="flex items-start justify-between">
              <div class="flex-1 space-y-3">
                <div class="h-3 w-24 rounded-full bg-slate-200"></div>
                <div class="h-7 w-20 rounded-lg bg-slate-200"></div>
                <div class="h-3 w-16 rounded-full bg-slate-100"></div>
              </div>
              <div class="h-11 w-11 rounded-xl bg-slate-200"></div>
            </div>
          </div>
        </template>

        <template v-else>
          <div
            v-for="stat in stats"
            :key="stat.title"
            class="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-emerald-200 hover:shadow-lg"
          >
            <div class="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-emerald-50 opacity-0 transition-opacity group-hover:opacity-100" />

            <div class="relative flex items-start justify-between">
              <div>
                <p class="text-xs font-semibold text-slate-500">{{ stat.title }}</p>
                <p class="mt-2 text-2xl font-black text-slate-900">{{ stat.value }}</p>
                <p class="mt-2 text-xs font-semibold" :class="trendClass(stat.trend)">
                  {{ stat.change }}
                </p>
              </div>
              <div class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-50 to-emerald-100 text-xl ring-1 ring-emerald-100 transition-transform group-hover:scale-110">
                {{ stat.icon }}
              </div>
            </div>
          </div>
        </template>
      </div>

      <!-- ══════════════════════════════════════════════
           REVENUE CHART
           ══════════════════════════════════════════════ -->
      <section class="mt-7 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div class="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h2 class="font-black text-slate-900">Revenue Overview</h2>
            <p class="mt-1 text-xs text-slate-500">Monthly venue earnings</p>
          </div>

          <select
            v-model="period"
            class="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
          >
            <option>Last 6 Months</option>
            <option>This Year</option>
          </select>
        </div>

        <!-- Chart -->
        <div v-if="isLoading" class="mt-8 flex h-64 items-end gap-3">
          <div
            v-for="i in 6"
            :key="`chart-skel-${i}`"
            class="h-full flex-1 animate-pulse rounded-t-xl bg-slate-100"
            :style="{ height: `${40 + i * 8}%` }"
          />
        </div>

        <div v-else class="mt-8 flex h-64 items-end gap-3 border-b border-slate-200 px-2">
          <div
            v-for="item in chart"
            :key="item.month"
            class="group flex h-full flex-1 flex-col justify-end"
          >
            <div class="relative flex flex-1 items-end justify-center">
              <div
                class="w-full max-w-[55px] rounded-t-xl bg-gradient-to-t from-emerald-600 to-emerald-400 transition-all hover:from-emerald-700 hover:to-emerald-500"
                :style="{ height: `${item.height}%` }"
              >
                <span class="absolute -top-8 left-1/2 hidden -translate-x-1/2 whitespace-nowrap rounded-lg bg-slate-900 px-2 py-1 text-[10px] font-bold text-white shadow-lg group-hover:block">
                  ETB {{ item.amount }}
                </span>
              </div>
            </div>
            <p class="mt-3 text-center text-[11px] font-semibold text-slate-500">
              {{ item.month }}
            </p>
          </div>
        </div>
      </section>

      <!-- ══════════════════════════════════════════════
           LOWER GRID — TRANSACTIONS + PAYOUTS
           ══════════════════════════════════════════════ -->
      <div class="mt-7 grid gap-7 xl:grid-cols-2">

        <!-- Recent Earnings -->
        <section class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div class="flex items-center justify-between border-b border-slate-100 px-6 py-5">
            <div>
              <h2 class="font-black text-slate-900">Recent Earnings</h2>
              <p class="mt-1 text-xs text-slate-500">Latest income from bookings</p>
            </div>
          </div>

          <div v-if="isLoading" class="divide-y divide-slate-100">
            <div v-for="i in 4" :key="`tx-skel-${i}`" class="flex items-center gap-3 px-6 py-5">
              <div class="h-10 w-10 animate-pulse rounded-xl bg-slate-100" />
              <div class="flex-1 space-y-2">
                <div class="h-3 w-1/3 animate-pulse rounded bg-slate-100" />
                <div class="h-2 w-1/4 animate-pulse rounded bg-slate-100" />
              </div>
              <div class="h-4 w-20 animate-pulse rounded bg-slate-100" />
            </div>
          </div>

          <div v-else-if="transactions.length === 0" class="px-6 py-12 text-center">
            <div class="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-2xl">💰</div>
            <p class="text-sm font-bold text-slate-700">No earnings yet</p>
            <p class="mt-1 text-xs text-slate-500">Bookings will appear here once confirmed.</p>
          </div>

          <div v-else class="divide-y divide-slate-100">
            <div
              v-for="tx in transactions"
              :key="tx.id"
              class="flex items-center gap-3 px-6 py-5 transition hover:bg-slate-50/70"
            >
              <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 ring-1 ring-emerald-100">
                <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <div class="min-w-0 flex-1">
                <p class="truncate text-sm font-bold text-slate-900">{{ tx.description }}</p>
                <p class="mt-1 text-xs text-slate-500">{{ tx.date }}</p>
              </div>
              <p class="text-sm font-black text-emerald-600">+ ETB {{ tx.amount }}</p>
            </div>
          </div>
        </section>

        <!-- Payout History -->
        <section class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div class="flex items-center justify-between border-b border-slate-100 px-6 py-5">
            <div>
              <h2 class="font-black text-slate-900">Payout History</h2>
              <p class="mt-1 text-xs text-slate-500">Withdrawal records</p>
            </div>
          </div>

          <div v-if="isLoading" class="divide-y divide-slate-100">
            <div v-for="i in 3" :key="`po-skel-${i}`" class="flex items-center gap-3 px-6 py-5">
              <div class="h-10 w-10 animate-pulse rounded-xl bg-slate-100" />
              <div class="flex-1 space-y-2">
                <div class="h-3 w-1/3 animate-pulse rounded bg-slate-100" />
                <div class="h-2 w-1/4 animate-pulse rounded bg-slate-100" />
              </div>
            </div>
          </div>

          <div v-else-if="payouts.length === 0" class="px-6 py-12 text-center">
            <div class="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-2xl">💸</div>
            <p class="text-sm font-bold text-slate-700">No payouts yet</p>
            <p class="mt-1 text-xs text-slate-500">Withdraw funds to see your payout history here.</p>
          </div>

          <div v-else class="divide-y divide-slate-100">
            <div
              v-for="payout in payouts"
              :key="payout.id"
              class="flex items-center justify-between gap-3 px-6 py-5 transition hover:bg-slate-50/70"
            >
              <div class="flex items-center gap-3">
                <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 text-sm font-black text-slate-600">
                  🏦
                </div>
                <div>
                  <p class="text-sm font-bold text-slate-900">{{ payout.reference }}</p>
                  <p class="mt-1 text-xs text-slate-500">{{ payout.date }} · {{ payout.method }}</p>
                </div>
              </div>
              <div class="text-right">
                <p class="text-sm font-black text-slate-900">ETB {{ payout.amount }}</p>
                <span
                  class="mt-1 inline-flex rounded-full px-2.5 py-0.5 text-[10px] font-bold"
                  :class="payoutStatusClass(payout.status)"
                >
                  {{ payout.status }}
                </span>
              </div>
            </div>
          </div>
        </section>

      </div>

    </div>

    <!-- ══════════════════════════════════════════════
         WITHDRAW MODAL — ATTRACTIVE UI
         ══════════════════════════════════════════════ -->
    <Teleport to="body">
      <Transition
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition duration-200"
        leave-to-class="opacity-0"
      >
        <div
          v-if="showWithdrawModal"
          class="fixed inset-0 z-50 flex items-end justify-center bg-slate-900/60 p-4 backdrop-blur-md sm:items-center"
          @click.self="showWithdrawModal = false"
        >
          <Transition
            enter-active-class="transition duration-300 ease-out"
            enter-from-class="opacity-0 translate-y-8 sm:scale-95"
            enter-to-class="opacity-100 translate-y-0 sm:scale-100"
            appear
          >
            <div class="relative flex w-full max-w-lg flex-col overflow-hidden rounded-t-3xl bg-white shadow-2xl sm:rounded-3xl">

              <!-- Header -->
              <div class="flex items-start justify-between border-b border-slate-100 bg-gradient-to-r from-emerald-50 to-teal-50 p-6">
                <div class="flex items-center gap-3">
                  <div class="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-xl text-white shadow-lg shadow-emerald-500/30">
                    💸
                  </div>
                  <div>
                    <h3 class="text-lg font-black text-slate-900">Withdraw Funds</h3>
                    <p class="text-xs text-slate-600">Transfer to your bank account</p>
                  </div>
                </div>
                <button
                  @click="showWithdrawModal = false"
                  class="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-slate-500 ring-1 ring-slate-200 transition hover:bg-red-500 hover:text-white"
                >
                  ✕
                </button>
              </div>

              <!-- Body -->
              <div class="max-h-[65vh] space-y-5 overflow-y-auto p-6">

                <!-- Available Balance -->
                <div class="rounded-2xl bg-gradient-to-br from-slate-900 to-emerald-950 p-5 text-white">
                  <p class="text-xs font-bold uppercase tracking-wider text-emerald-400">Available Balance</p>
                  <p class="mt-2 text-2xl font-black">{{ formatETB(walletBalance) }}</p>
                </div>

                <!-- Amount -->
                <div>
                  <label class="mb-1.5 block text-xs font-bold uppercase tracking-wide text-slate-500">
                    Amount (ETB) <span class="text-red-500">*</span>
                  </label>

                  <div class="relative">
                    <span class="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-slate-400">ETB</span>
                    <input
                      v-model="withdrawForm.amount"
                      type="number"
                      min="100"
                      placeholder="0.00"
                      class="w-full rounded-xl border-2 border-slate-200 py-3 pl-14 pr-4 text-lg font-bold text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                      :class="{ 'border-red-400': withdrawErrors.amount }"
                    />
                  </div>
                  <p v-if="withdrawErrors.amount" class="mt-1 text-xs text-red-500">{{ withdrawErrors.amount }}</p>

                  <!-- Quick amounts -->
                  <div class="mt-3 flex flex-wrap gap-2">
                    <button
                      v-for="amt in quickAmounts"
                      :key="amt"
                      type="button"
                      :disabled="amt > maxWithdrawable"
                      @click="setQuickAmount(amt)"
                      class="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-700 transition hover:bg-emerald-50 hover:text-emerald-700 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      +{{ amt.toLocaleString() }}
                    </button>
                    <button
                      type="button"
                      @click="setMaxAmount"
                      class="rounded-lg bg-emerald-100 px-3 py-1.5 text-xs font-bold text-emerald-700 transition hover:bg-emerald-200"
                    >
                      Max
                    </button>
                  </div>
                </div>

                <!-- Withdrawal Method -->
                <div>
                  <label class="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500">
                    Withdrawal Method
                  </label>

                  <div class="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      @click="withdrawForm.method = 'bank'"
                      class="flex items-center gap-2 rounded-xl border-2 p-3 text-left transition"
                      :class="withdrawForm.method === 'bank'
                        ? 'border-emerald-500 bg-emerald-50'
                        : 'border-slate-200 bg-white hover:border-slate-300'"
                    >
                      <span class="text-xl">🏦</span>
                      <div>
                        <p class="text-sm font-bold text-slate-900">Bank</p>
                        <p class="text-[10px] text-slate-500">Direct transfer</p>
                      </div>
                    </button>

                    <button
                      type="button"
                      @click="withdrawForm.method = 'telebirr'"
                      class="flex items-center gap-2 rounded-xl border-2 p-3 text-left transition"
                      :class="withdrawForm.method === 'telebirr'
                        ? 'border-emerald-500 bg-emerald-50'
                        : 'border-slate-200 bg-white hover:border-slate-300'"
                    >
                      <span class="text-xl">📱</span>
                      <div>
                        <p class="text-sm font-bold text-slate-900">Telebirr</p>
                        <p class="text-[10px] text-slate-500">Mobile money</p>
                      </div>
                    </button>
                  </div>
                </div>

                <!-- Bank Account Selector -->
                <div v-if="withdrawForm.method === 'bank'">
                  <label class="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500">
                    Select Bank Account <span class="text-red-500">*</span>
                  </label>

                  <div class="space-y-2">
                    <button
                      v-for="account in bankAccounts"
                      :key="account.id"
                      type="button"
                      @click="withdrawForm.bankAccountId = account.id"
                      class="flex w-full items-center gap-3 rounded-xl border-2 p-3 text-left transition"
                      :class="withdrawForm.bankAccountId === account.id
                        ? 'border-emerald-500 bg-emerald-50'
                        : 'border-slate-200 bg-white hover:border-slate-300'"
                    >
                      <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-lg ring-1 ring-slate-200">
                        🏦
                      </div>
                      <div class="min-w-0 flex-1">
                        <p class="truncate text-sm font-bold text-slate-900">{{ account.bankName }}</p>
                        <p class="mt-0.5 font-mono text-xs text-slate-500">
                          ****{{ account.accountNumber.slice(-4) }} · {{ account.accountHolder }}
                        </p>
                      </div>
                      <div
                        v-if="withdrawForm.bankAccountId === account.id"
                        class="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 text-white"
                      >
                        <svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    </button>

                    <button
                      type="button"
                      @click="showBankModal = true"
                      class="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-slate-300 p-3 text-xs font-bold text-slate-500 transition hover:border-emerald-500 hover:bg-emerald-50 hover:text-emerald-700"
                    >
                      + Add New Bank Account
                    </button>
                  </div>
                  <p v-if="withdrawErrors.bankAccountId" class="mt-1 text-xs text-red-500">{{ withdrawErrors.bankAccountId }}</p>
                </div>

                <!-- Telebirr phone input -->
                <div v-else-if="withdrawForm.method === 'telebirr'">
                  <label class="mb-1.5 block text-xs font-bold uppercase tracking-wide text-slate-500">
                    Telebirr Phone Number <span class="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    placeholder="+251 9XX XXX XXX"
                    class="w-full rounded-xl border-2 border-slate-200 py-3 px-4 text-sm font-bold text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                  />
                </div>

                <!-- Summary -->
                <div class="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-100">
                  <div class="flex items-center justify-between text-sm">
                    <span class="text-slate-500">Withdrawal Amount</span>
                    <span class="font-bold text-slate-900">
                      {{ withdrawForm.amount ? `ETB ${Number(withdrawForm.amount).toLocaleString()}` : '—' }}
                    </span>
                  </div>
                  <div class="mt-3 flex items-center justify-between border-t border-slate-200 pt-3 text-sm">
                    <span class="text-slate-500">Processing Fee</span>
                    <span class="font-bold text-slate-900">Free</span>
                  </div>
                  <div class="mt-3 flex items-center justify-between border-t border-slate-200 pt-3 text-base">
                    <span class="font-bold text-slate-700">You Receive</span>
                    <span class="font-black text-emerald-600">
                      {{ withdrawForm.amount ? `ETB ${Number(withdrawForm.amount).toLocaleString()}` : '—' }}
                    </span>
                  </div>
                </div>

                <!-- Note -->
                <div class="flex items-start gap-3 rounded-xl border border-blue-200 bg-blue-50 p-3">
                  <span class="text-lg">ℹ️</span>
                  <p class="text-xs text-blue-800">
                    Payouts are typically processed within 1-3 business days. You will receive a notification once completed.
                  </p>
                </div>
              </div>

              <!-- Footer -->
              <div class="flex justify-end gap-3 border-t border-slate-100 bg-slate-50 p-4">
                <button
                  type="button"
                  @click="showWithdrawModal = false"
                  class="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  :disabled="isSaving"
                  @click="requestPayout"
                  class="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-emerald-500/30 transition hover:from-emerald-700 hover:to-emerald-600 disabled:opacity-60"
                >
                  <svg v-if="isSaving" class="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  <span>{{ isSaving ? 'Processing…' : 'Request Payout' }}</span>
                </button>
              </div>

            </div>
          </Transition>
        </div>
      </Transition>
    </Teleport>

    <!-- ══════════════════════════════════════════════
         BANK ACCOUNTS MODAL
         ══════════════════════════════════════════════ -->
    <Teleport to="body">
      <Transition
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
      >
        <div
          v-if="showBankModal"
          class="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-md"
          @click.self="showBankModal = false"
        >
          <div class="w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl">
            <div class="flex items-center justify-between border-b border-slate-100 bg-gradient-to-r from-blue-50 to-indigo-50 p-5">
              <div class="flex items-center gap-3">
                <div class="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-lg text-white shadow-md">
                  🏦
                </div>
                <div>
                  <h3 class="text-sm font-bold text-slate-900">Bank Accounts</h3>
                  <p class="text-xs text-slate-600">Manage payout destinations</p>
                </div>
              </div>
              <button
                @click="showBankModal = false"
                class="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-slate-500 ring-1 ring-slate-200 transition hover:bg-red-500 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div class="space-y-3 p-5">
              <div
                v-for="account in bankAccounts"
                :key="account.id"
                class="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4"
              >
                <div class="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-xl ring-1 ring-emerald-100">
                  🏦
                </div>
                <div class="min-w-0 flex-1">
                  <p class="truncate text-sm font-bold text-slate-900">{{ account.bankName }}</p>
                  <p class="mt-0.5 font-mono text-xs text-slate-500">****{{ account.accountNumber.slice(-4) }}</p>
                  <p class="mt-0.5 text-xs text-slate-500">{{ account.accountHolder }}</p>
                </div>
                <span v-if="account.isDefault" class="rounded-full bg-emerald-50 px-2.5 py-0.5 text-[10px] font-bold text-emerald-700">
                  Default
                </span>
              </div>

              <div v-if="bankAccounts.length === 0" class="rounded-xl border-2 border-dashed border-slate-300 p-6 text-center">
                <p class="text-sm font-bold text-slate-700">No bank accounts</p>
                <p class="mt-1 text-xs text-slate-500">Add an account to receive payouts</p>
              </div>

              <button class="mt-3 w-full rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-500/30 transition hover:from-emerald-700 hover:to-emerald-600">
                + Add New Bank Account
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

  </div>
</template>