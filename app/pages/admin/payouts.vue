```vue
<template>
  <div class="min-h-full bg-slate-50 p-4 sm:p-6 lg:p-8">
    <!-- Header -->
    <div class="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <div class="flex items-center gap-2 text-sm text-slate-500">
          <NuxtLink to="/admin" class="hover:text-emerald-600">
            Dashboard
          </NuxtLink>
          <span>/</span>
          <span>Payouts & Wallet</span>
        </div>

        <h1 class="mt-2 text-2xl font-bold text-slate-900">
          Payouts & Wallet
        </h1>

        <p class="mt-1 text-sm text-slate-500">
          Monitor platform funds and process partner payouts.
        </p>
      </div>

      <button
        @click="loadData"
        :disabled="loading"
        class="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 shadow-sm hover:bg-slate-50 disabled:opacity-50"
      >
        ↻ Refresh
      </button>
    </div>

    <div
      v-if="error"
      class="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
    >
      {{ error }}
    </div>

    <!-- Wallet -->
    <div
      class="mb-6 overflow-hidden rounded-2xl bg-slate-900 p-6 text-white shadow-lg"
    >
      <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div>
          <p class="text-sm text-slate-400">
            Available Wallet Balance
          </p>

          <p class="mt-2 text-3xl font-bold">
            {{ formatMoney(wallet.available_balance) }}
          </p>

          <p class="mt-2 text-xs text-slate-400">
            Funds currently available
          </p>
        </div>

        <div>
          <p class="text-sm text-slate-400">
            Pending Payouts
          </p>

          <p class="mt-2 text-3xl font-bold text-amber-400">
            {{ formatMoney(wallet.pending_payouts) }}
          </p>

          <p class="mt-2 text-xs text-slate-400">
            Waiting for admin processing
          </p>
        </div>

        <div>
          <p class="text-sm text-slate-400">
            Total Paid Out
          </p>

          <p class="mt-2 text-3xl font-bold text-emerald-400">
            {{ formatMoney(wallet.total_paid_out) }}
          </p>

          <p class="mt-2 text-xs text-slate-400">
            Completed partner payouts
          </p>
        </div>
      </div>
    </div>

    <!-- Payout stats -->
    <div class="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <div
        v-for="stat in stats"
        :key="stat.label"
        class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
      >
        <p class="text-sm text-slate-500">
          {{ stat.label }}
        </p>

        <p class="mt-2 text-2xl font-bold text-slate-900">
          {{ stat.value }}
        </p>
      </div>
    </div>

    <!-- Tabs -->
    <div class="mb-5 flex gap-2">
      <button
        @click="activeTab = 'payouts'"
        class="rounded-xl px-4 py-2.5 text-sm font-bold"
        :class="
          activeTab === 'payouts'
            ? 'bg-emerald-600 text-white'
            : 'bg-white text-slate-600 border border-slate-200'
        "
      >
        Payout Requests
      </button>

      <button
        @click="activeTab = 'transactions'"
        class="rounded-xl px-4 py-2.5 text-sm font-bold"
        :class="
          activeTab === 'transactions'
            ? 'bg-emerald-600 text-white'
            : 'bg-white text-slate-600 border border-slate-200'
        "
      >
        Transactions
      </button>
    </div>

    <!-- Payout Requests -->
    <div
      v-if="activeTab === 'payouts'"
      class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
    >
      <div class="overflow-x-auto">
        <table class="min-w-[900px] w-full">
          <thead class="border-b border-slate-200 bg-slate-50">
            <tr>
              <th class="px-6 py-4 text-left text-xs font-bold uppercase text-slate-500">
                Partner
              </th>
              <th class="px-6 py-4 text-left text-xs font-bold uppercase text-slate-500">
                Amount
              </th>
              <th class="px-6 py-4 text-left text-xs font-bold uppercase text-slate-500">
                Method
              </th>
              <th class="px-6 py-4 text-left text-xs font-bold uppercase text-slate-500">
                Account
              </th>
              <th class="px-6 py-4 text-left text-xs font-bold uppercase text-slate-500">
                Date
              </th>
              <th class="px-6 py-4 text-left text-xs font-bold uppercase text-slate-500">
                Status
              </th>
              <th class="px-6 py-4 text-right text-xs font-bold uppercase text-slate-500">
                Action
              </th>
            </tr>
          </thead>

          <tbody class="divide-y divide-slate-100">
            <tr v-if="loading">
              <td colspan="7" class="px-6 py-12 text-center text-slate-500">
                Loading payout requests...
              </td>
            </tr>

            <tr v-else-if="payouts.length === 0">
              <td colspan="7" class="px-6 py-12 text-center text-slate-500">
                No payout requests.
              </td>
            </tr>

            <tr
              v-for="payout in payouts"
              :key="payout.id"
              class="hover:bg-slate-50"
            >
              <td class="px-6 py-4">
                <p class="font-semibold text-slate-900">
                  {{ payout.partner_name }}
                </p>
                <p class="text-xs text-slate-500">
                  {{ payout.partner_email }}
                </p>
              </td>

              <td class="px-6 py-4 font-bold text-slate-900">
                {{ formatMoney(payout.amount) }}
              </td>

              <td class="px-6 py-4 text-sm text-slate-600">
                {{ payout.method || '-' }}
              </td>

              <td class="px-6 py-4 text-sm text-slate-600">
                {{ payout.account_number || '-' }}
              </td>

              <td class="px-6 py-4 text-sm text-slate-500">
                {{ formatDate(payout.created_at) }}
              </td>

              <td class="px-6 py-4">
                <span
                  class="rounded-full px-3 py-1 text-xs font-bold"
                  :class="statusClass(payout.status)"
                >
                  {{ payout.status }}
                </span>
              </td>

              <td class="px-6 py-4 text-right">
                <div
                  v-if="payout.status === 'pending'"
                  class="flex justify-end gap-2"
                >
                  <button
                    @click="processPayout(payout, 'reject')"
                    :disabled="processingId === payout.id"
                    class="rounded-lg bg-red-50 px-3 py-2 text-xs font-bold text-red-600 hover:bg-red-100 disabled:opacity-50"
                  >
                    Reject
                  </button>

                  <button
                    @click="processPayout(payout, 'approve')"
                    :disabled="processingId === payout.id"
                    class="rounded-lg bg-emerald-600 px-3 py-2 text-xs font-bold text-white hover:bg-emerald-700 disabled:opacity-50"
                  >
                    {{ processingId === payout.id ? '...' : 'Pay' }}
                  </button>
                </div>

                <span
                  v-else
                  class="text-xs font-semibold text-slate-400"
                >
                  Completed
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Transactions -->
    <div
      v-else
      class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
    >
      <div class="overflow-x-auto">
        <table class="min-w-[800px] w-full">
          <thead class="border-b border-slate-200 bg-slate-50">
            <tr>
              <th class="px-6 py-4 text-left text-xs font-bold uppercase text-slate-500">
                Transaction
              </th>
              <th class="px-6 py-4 text-left text-xs font-bold uppercase text-slate-500">
                Type
              </th>
              <th class="px-6 py-4 text-left text-xs font-bold uppercase text-slate-500">
                Amount
              </th>
              <th class="px-6 py-4 text-left text-xs font-bold uppercase text-slate-500">
                Reference
              </th>
              <th class="px-6 py-4 text-left text-xs font-bold uppercase text-slate-500">
                Date
              </th>
            </tr>
          </thead>

          <tbody class="divide-y divide-slate-100">
            <tr
              v-for="transaction in transactions"
              :key="transaction.id"
            >
              <td class="px-6 py-4">
                <p class="font-semibold text-slate-900">
                  {{ transaction.description }}
                </p>
              </td>

              <td class="px-6 py-4">
                <span
                  class="rounded-full px-3 py-1 text-xs font-bold"
                  :class="
                    transaction.type === 'credit'
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'bg-red-100 text-red-700'
                  "
                >
                  {{ transaction.type }}
                </span>
              </td>

              <td
                class="px-6 py-4 font-bold"
                :class="
                  transaction.type === 'credit'
                    ? 'text-emerald-600'
                    : 'text-red-600'
                "
              >
                {{ transaction.type === 'credit' ? '+' : '-' }}
                {{ formatMoney(transaction.amount) }}
              </td>

              <td class="px-6 py-4 text-sm text-slate-500">
                {{ transaction.reference || '-' }}
              </td>

              <td class="px-6 py-4 text-sm text-slate-500">
                {{ formatDate(transaction.created_at) }}
              </td>
            </tr>

            <tr v-if="!loading && transactions.length === 0">
              <td colspan="5" class="px-6 py-12 text-center text-slate-500">
                No transactions found.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

definePageMeta({
  layout: 'admin',
})

interface Wallet {
  available_balance: number
  pending_payouts: number
  total_paid_out: number
}

interface Payout {
  id: number
  partner_name: string
  partner_email?: string
  amount: number
  method?: string
  account_number?: string
  status: 'pending' | 'paid' | 'rejected'
  created_at: string
}

interface Transaction {
  id: number
  description: string
  type: 'credit' | 'debit'
  amount: number
  reference?: string
  created_at: string
}

const config = useRuntimeConfig()
const apiBase = config.public.apiBase || 'http://127.0.0.1:8001'

const loading = ref(false)
const error = ref('')
const activeTab = ref<'payouts' | 'transactions'>('payouts')

const wallet = ref<Wallet>({
  available_balance: 0,
  pending_payouts: 0,
  total_paid_out: 0,
})

const payouts = ref<Payout[]>([])
const transactions = ref<Transaction[]>([])
const processingId = ref<number | null>(null)

const stats = computed(() => [
  {
    label: 'Pending Requests',
    value: payouts.value.filter(p => p.status === 'pending').length,
  },
  {
    label: 'Paid Requests',
    value: payouts.value.filter(p => p.status === 'paid').length,
  },
  {
    label: 'Rejected',
    value: payouts.value.filter(p => p.status === 'rejected').length,
  },
  {
    label: 'Transactions',
    value: transactions.value.length,
  },
])

function formatMoney(value: number) {
  return `${Number(value || 0).toLocaleString()} ETB`
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

function statusClass(status: string) {
  if (status === 'paid') {
    return 'bg-emerald-100 text-emerald-700'
  }

  if (status === 'pending') {
    return 'bg-amber-100 text-amber-700'
  }

  return 'bg-red-100 text-red-700'
}

async function loadData() {
  loading.value = true
  error.value = ''

  try {
    const [walletResponse, payoutResponse] = await Promise.all([
      $fetch<any>(`${apiBase}/api/admin/wallet`, {
        credentials: 'include',
      }),

      $fetch<any>(`${apiBase}/api/admin/payouts`, {
        credentials: 'include',
      }),
    ])

    wallet.value = {
      available_balance:
        walletResponse?.data?.available_balance ??
        walletResponse?.available_balance ??
        0,

      pending_payouts:
        walletResponse?.data?.pending_payouts ??
        walletResponse?.pending_payouts ??
        0,

      total_paid_out:
        walletResponse?.data?.total_paid_out ??
        walletResponse?.total_paid_out ??
        0,
    }

    payouts.value =
      payoutResponse?.data?.payouts ??
      payoutResponse?.payouts ??
      payoutResponse?.data ??
      []

    transactions.value =
      payoutResponse?.data?.transactions ??
      payoutResponse?.transactions ??
      []
  } catch (err: any) {
    error.value =
      err?.data?.message ||
      'Unable to load wallet and payout information.'
  } finally {
    loading.value = false
  }
}

async function processPayout(
  payout: Payout,
  action: 'approve' | 'reject',
) {
  processingId.value = payout.id
  error.value = ''

  try {
    await $fetch(
      `${apiBase}/api/admin/payouts/${payout.id}/${action}`,
      {
        method: 'PATCH',
        credentials: 'include',
      },
    )

    payout.status =
      action === 'approve'
        ? 'paid'
        : 'rejected'

    await loadData()
  } catch (err: any) {
    error.value =
      err?.data?.message ||
      `Unable to ${action} payout.`
  } finally {
    processingId.value = null
  }
}

onMounted(loadData)
</script>
```
