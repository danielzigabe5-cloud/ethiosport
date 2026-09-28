```vue
<template>
  <div class="min-h-full bg-slate-50">

    <section class="border-b border-slate-200 bg-white">
      <div class="mx-auto max-w-[1500px] px-6 py-7 lg:px-8">

        <p class="text-sm font-semibold text-emerald-600">
          Finance
        </p>

        <h1 class="mt-1 text-2xl font-black text-slate-900">
          Payouts & Wallet
        </h1>

        <p class="mt-1 text-sm text-slate-500">
          Manage your wallet, withdrawals and payout history.
        </p>

      </div>
    </section>

    <div class="mx-auto max-w-[1500px] px-6 py-7 lg:px-8">

      <!-- WALLET -->
      <div class="grid gap-5 lg:grid-cols-[1.4fr_1fr]">

        <div class="rounded-3xl bg-slate-900 p-7 text-white shadow-sm">

          <div class="flex items-center justify-between">
            <div>
              <p class="text-xs font-bold uppercase tracking-wider text-slate-400">
                Available Balance
              </p>

              <p class="mt-3 text-4xl font-black">
                ETB 54,200
              </p>
            </div>

            <div class="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/15 text-2xl">
              💳
            </div>
          </div>

          <div class="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              class="rounded-xl bg-emerald-500 px-5 py-3 text-sm font-bold text-white hover:bg-emerald-600"
              @click="showWithdrawModal = true"
            >
              Withdraw Funds
            </button>

            <NuxtLink
              to="/partner/earnings"
              class="rounded-xl bg-white/10 px-5 py-3 text-center text-sm font-bold text-white hover:bg-white/15"
            >
              View Earnings
            </NuxtLink>
          </div>

        </div>

        <div class="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">

          <p class="text-xs font-bold uppercase tracking-wider text-slate-400">
            Payout Account
          </p>

          <div class="mt-5 flex items-center gap-4">

            <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-xl">
              🏦
            </div>

            <div>
              <p class="font-black text-slate-900">
                Commercial Bank of Ethiopia
              </p>

              <p class="mt-1 text-xs text-slate-500">
                **** **** 4521
              </p>
            </div>

          </div>

          <button
            class="mt-6 w-full rounded-xl border border-slate-200 py-3 text-xs font-bold text-slate-600 hover:bg-slate-50"
          >
            Manage Payout Account
          </button>

        </div>

      </div>

      <!-- PAYOUT STATS -->
      <div class="mt-7 grid gap-4 sm:grid-cols-3">

        <div
          v-for="item in payoutStats"
          :key="item.title"
          class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
        >
          <p class="text-xs text-slate-500">
            {{ item.title }}
          </p>

          <p class="mt-2 text-xl font-black text-slate-900">
            {{ item.value }}
          </p>
        </div>

      </div>

      <!-- HISTORY -->
      <section class="mt-7 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

        <div class="border-b border-slate-100 px-6 py-5">
          <h2 class="font-black text-slate-900">
            Payout History
          </h2>
        </div>

        <div class="overflow-x-auto">

          <table class="w-full min-w-[700px] text-left">

            <thead class="bg-slate-50">
              <tr>
                <th class="px-6 py-4 text-xs font-bold uppercase text-slate-400">
                  Reference
                </th>

                <th class="px-6 py-4 text-xs font-bold uppercase text-slate-400">
                  Date
                </th>

                <th class="px-6 py-4 text-xs font-bold uppercase text-slate-400">
                  Method
                </th>

                <th class="px-6 py-4 text-xs font-bold uppercase text-slate-400">
                  Amount
                </th>

                <th class="px-6 py-4 text-xs font-bold uppercase text-slate-400">
                  Status
                </th>
              </tr>
            </thead>

            <tbody class="divide-y divide-slate-100">

              <tr
                v-for="payout in payouts"
                :key="payout.id"
              >
                <td class="px-6 py-4 text-sm font-bold text-slate-900">
                  {{ payout.reference }}
                </td>

                <td class="px-6 py-4 text-sm text-slate-600">
                  {{ payout.date }}
                </td>

                <td class="px-6 py-4 text-sm text-slate-600">
                  {{ payout.method }}
                </td>

                <td class="px-6 py-4 text-sm font-black text-slate-900">
                  ETB {{ payout.amount }}
                </td>

                <td class="px-6 py-4">
                  <span
                    class="rounded-full px-3 py-1 text-[11px] font-bold"
                    :class="payout.status === 'Completed'
                      ? 'bg-emerald-50 text-emerald-700'
                      : 'bg-amber-50 text-amber-700'"
                  >
                    {{ payout.status }}
                  </span>
                </td>
              </tr>

            </tbody>

          </table>

        </div>

      </section>

    </div>

    <!-- WITHDRAW MODAL -->
    <div
      v-if="showWithdrawModal"
      class="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/50 p-4"
      @click.self="showWithdrawModal = false"
    >
      <div class="w-full max-w-md rounded-3xl bg-white shadow-2xl">

        <div class="border-b border-slate-100 p-6">
          <div class="flex items-center justify-between">
            <h2 class="font-black text-slate-900">
              Withdraw Funds
            </h2>

            <button
              class="text-xl text-slate-400"
              @click="showWithdrawModal = false"
            >
              ×
            </button>
          </div>
        </div>

        <div class="p-6">

          <label class="text-xs font-bold text-slate-500">
            Amount
          </label>

          <div class="mt-2 flex items-center rounded-xl border border-slate-200 px-4">
            <span class="font-bold text-slate-400">ETB</span>

            <input
              v-model="amount"
              type="number"
              placeholder="0.00"
              class="w-full border-0 px-3 py-3 outline-none"
            />
          </div>

          <p class="mt-2 text-xs text-slate-500">
            Available: ETB 54,200
          </p>

        </div>

        <div class="flex justify-end gap-3 border-t border-slate-100 p-6">
          <button
            class="rounded-xl px-4 py-2 text-sm font-bold text-slate-500"
            @click="showWithdrawModal = false"
          >
            Cancel
          </button>

          <button
            class="rounded-xl bg-emerald-600 px-5 py-2 text-sm font-bold text-white hover:bg-emerald-700"
            @click="requestPayout"
          >
            Request Payout
          </button>
        </div>

      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

definePageMeta({
  layout: 'partner',
})

const showWithdrawModal = ref(false)
const amount = ref('')

const payoutStats = [
  { title: 'Total Paid Out', value: 'ETB 432,300' },
  { title: 'Pending Payouts', value: 'ETB 12,500' },
  { title: 'Last Payout', value: 'ETB 45,000' },
]

const payouts = [
  {
    id: 1,
    reference: 'PO-2026-0098',
    date: 'Sep 20, 2026',
    method: 'CBE Bank',
    amount: '45,000',
    status: 'Completed',
  },
  {
    id: 2,
    reference: 'PO-2026-0091',
    date: 'Sep 05, 2026',
    method: 'CBE Bank',
    amount: '38,500',
    status: 'Completed',
  },
  {
    id: 3,
    reference: 'PO-2026-0101',
    date: 'Sep 27, 2026',
    method: 'CBE Bank',
    amount: '12,500',
    status: 'Pending',
  },
]

function requestPayout() {
  if (!amount.value) return

  showWithdrawModal.value = false
  amount.value = ''
}
</script>
```
