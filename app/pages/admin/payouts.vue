<template>
  <div class="min-h-full bg-gradient-to-br from-slate-50 via-white to-emerald-50/30 p-4 sm:p-6 lg:p-8">
    <div class="mx-auto max-w-7xl space-y-6">

      <!-- ═══════ HEADER ═══════ -->
      <div class="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div class="flex items-center gap-2 text-sm font-semibold text-slate-500">
            <NuxtLink to="/admin" class="transition hover:text-emerald-600">Dashboard</NuxtLink>
            <span>/</span>
            <span class="text-slate-700">Payouts &amp; Wallet</span>
          </div>
          <h1 class="mt-2 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
            Payouts &amp; Wallet
          </h1>
          <p class="mt-1 text-sm text-slate-500">
            Monitor platform funds and process partner payouts.
          </p>
        </div>

        <div class="flex items-center gap-2">
          <button
            @click="loadData"
            :disabled="loading"
            class="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 shadow-sm transition hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700 disabled:opacity-50"
          >
            <RefreshCw :size="16" :class="loading ? 'animate-spin' : ''" />
            Refresh
          </button>

          <button
            @click="exportCSV"
            class="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 shadow-sm transition hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700"
          >
            <Download :size="16" />
            Export
          </button>
        </div>
      </div>

      <!-- ═══════ ERROR ═══════ -->
      <Transition
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="opacity-0 -translate-y-2"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition duration-200"
        leave-to-class="opacity-0"
      >
        <div
          v-if="error"
          class="flex items-center justify-between rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-800 shadow-sm"
        >
          <div class="flex items-center gap-2">
            <AlertCircle :size="18" />
            <span>{{ error }}</span>
          </div>
          <button @click="error = ''" class="ml-3 flex h-7 w-7 items-center justify-center rounded-lg text-lg font-bold hover:bg-red-100">×</button>
        </div>
      </Transition>

      <!-- ═══════ SUCCESS ═══════ -->
      <Transition
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="opacity-0 -translate-y-2"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition duration-200"
        leave-to-class="opacity-0"
      >
        <div
          v-if="success"
          class="flex items-center gap-2 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm font-semibold text-emerald-800 shadow-sm"
        >
          <CheckCircle :size="18" />
          <span>{{ success }}</span>
        </div>
      </Transition>

      <!-- ═══════ WALLET HERO ═══════ -->
      <div class="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-emerald-950 to-emerald-900 p-6 text-white shadow-2xl sm:p-8">
        <!-- Decorative blobs -->
        <div class="pointer-events-none absolute -top-32 -right-32 h-80 w-80 rounded-full bg-emerald-500/20 blur-3xl"></div>
        <div class="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-teal-500/10 blur-3xl"></div>

        <!-- Sparkles decoration -->
        <div class="pointer-events-none absolute top-10 left-1/3 h-2 w-2 rounded-full bg-emerald-300/60 blur-sm"></div>
        <div class="pointer-events-none absolute top-20 right-1/4 h-1.5 w-1.5 rounded-full bg-emerald-300/60 blur-sm"></div>

        <div class="relative">
          <div class="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-300">
            <Wallet :size="14" />
            Platform Wallet Overview
          </div>

          <div class="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
            <!-- Available -->
            <div class="group relative">
              <div class="absolute inset-0 rounded-2xl bg-white/5 opacity-0 transition group-hover:opacity-100"></div>
              <div class="relative">
                <div class="flex items-center gap-2">
                  <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-300">
                    <TrendingUp :size="16" />
                  </div>
                  <p class="text-xs font-bold uppercase tracking-wider text-emerald-300">Available Balance</p>
                </div>
                <p class="mt-3 text-3xl font-black sm:text-4xl">
                  <span v-if="loading" class="inline-block h-9 w-40 animate-pulse rounded-lg bg-white/10"></span>
                  <span v-else>{{ formatMoney(wallet.available_balance) }}</span>
                </p>
                <p class="mt-2 text-xs text-slate-400">Funds currently available for payouts</p>
              </div>
            </div>

            <!-- Pending -->
            <div class="group relative">
              <div class="absolute inset-0 rounded-2xl bg-white/5 opacity-0 transition group-hover:opacity-100"></div>
              <div class="relative">
                <div class="flex items-center gap-2">
                  <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/20 text-amber-300">
                    <Clock :size="16" />
                  </div>
                  <p class="text-xs font-bold uppercase tracking-wider text-amber-300">Pending Payouts</p>
                </div>
                <p class="mt-3 text-3xl font-black text-amber-400 sm:text-4xl">
                  <span v-if="loading" class="inline-block h-9 w-40 animate-pulse rounded-lg bg-white/10"></span>
                  <span v-else>{{ formatMoney(wallet.pending_payouts) }}</span>
                </p>
                <p class="mt-2 text-xs text-slate-400">Waiting for your approval</p>
              </div>
            </div>

            <!-- Paid -->
            <div class="group relative">
              <div class="absolute inset-0 rounded-2xl bg-white/5 opacity-0 transition group-hover:opacity-100"></div>
              <div class="relative">
                <div class="flex items-center gap-2">
                  <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-300">
                    <CheckCircle :size="16" />
                  </div>
                  <p class="text-xs font-bold uppercase tracking-wider text-emerald-300">Total Paid Out</p>
                </div>
                <p class="mt-3 text-3xl font-black text-emerald-400 sm:text-4xl">
                  <span v-if="loading" class="inline-block h-9 w-40 animate-pulse rounded-lg bg-white/10"></span>
                  <span v-else>{{ formatMoney(wallet.total_paid_out) }}</span>
                </p>
                <p class="mt-2 text-xs text-slate-400">Successfully processed payouts</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ═══════ STATS ═══════ -->
      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div
          v-for="stat in stats"
          :key="stat.label"
          class="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
        >
          <div class="absolute inset-x-0 top-0 h-1" :class="stat.accent"></div>

          <div class="flex items-center justify-between">
            <div>
              <p class="text-xs font-bold uppercase tracking-wider text-slate-500">{{ stat.label }}</p>
              <p class="mt-2 text-3xl font-black text-slate-900">
                <span v-if="loading" class="inline-block h-7 w-16 animate-pulse rounded bg-slate-100"></span>
                <span v-else>{{ stat.value }}</span>
              </p>
              <p class="mt-1 text-[11px] font-medium text-slate-400">{{ stat.sub }}</p>
            </div>

            <div class="flex h-12 w-12 items-center justify-center rounded-2xl transition group-hover:scale-110" :class="stat.bg">
              <component :is="stat.icon" :size="22" :class="stat.color" />
            </div>
          </div>
        </div>
      </div>

      <!-- ═══════ FILTERS + TABS ═══════ -->
      <div class="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div class="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">

          <!-- Tabs -->
          <div class="flex gap-1 rounded-xl bg-slate-50 p-1 ring-1 ring-slate-100">
            <button
              @click="activeTab = 'payouts'"
              :class="[
                'relative whitespace-nowrap rounded-lg px-4 py-2 text-xs font-bold transition-all duration-200',
                activeTab === 'payouts'
                  ? 'bg-white text-emerald-700 shadow-md ring-1 ring-emerald-200'
                  : 'text-slate-500 hover:bg-white/60 hover:text-slate-700'
              ]"
            >
              Payout Requests
              <span
                class="ml-1.5 inline-flex min-w-[18px] items-center justify-center rounded-full px-1.5 py-0.5 text-[10px] font-black"
                :class="activeTab === 'payouts' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-500'"
              >
                {{ payouts.length }}
              </span>
            </button>

            <button
              @click="activeTab = 'transactions'"
              :class="[
                'relative whitespace-nowrap rounded-lg px-4 py-2 text-xs font-bold transition-all duration-200',
                activeTab === 'transactions'
                  ? 'bg-white text-emerald-700 shadow-md ring-1 ring-emerald-200'
                  : 'text-slate-500 hover:bg-white/60 hover:text-slate-700'
              ]"
            >
              Transactions
              <span
                class="ml-1.5 inline-flex min-w-[18px] items-center justify-center rounded-full px-1.5 py-0.5 text-[10px] font-black"
                :class="activeTab === 'transactions' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-500'"
              >
                {{ transactions.length }}
              </span>
            </button>
          </div>

          <!-- Filters -->
          <div class="flex flex-wrap items-center gap-2">
            <!-- Status filter (payouts only) -->
            <select
              v-if="activeTab === 'payouts'"
              v-model="statusFilter"
              class="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-bold text-slate-700 outline-none transition focus:border-emerald-500 focus:bg-white"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="paid">Paid</option>
              <option value="rejected">Rejected</option>
            </select>

            <!-- Type filter (transactions only) -->
            <select
              v-if="activeTab === 'transactions'"
              v-model="typeFilter"
              class="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-bold text-slate-700 outline-none transition focus:border-emerald-500 focus:bg-white"
            >
              <option value="all">All Types</option>
              <option value="credit">Credit (+)</option>
              <option value="debit">Debit (−)</option>
            </select>

            <!-- Search -->
            <div class="relative">
              <Search class="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
              <input
                v-model="search"
                type="text"
                placeholder="Search..."
                class="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-xs font-semibold outline-none transition focus:border-emerald-500 focus:bg-white lg:w-64"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- ═══════ PAYOUTS TABLE ═══════ -->
      <div v-if="activeTab === 'payouts'" class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div class="overflow-x-auto">
          <table class="w-full min-w-[1000px]">
            <thead class="border-b border-slate-200 bg-gradient-to-r from-slate-50 to-slate-100">
              <tr>
                <th class="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500">Partner</th>
                <th class="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500">Amount</th>
                <th class="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500">Method</th>
                <th class="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500">Account</th>
                <th class="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500">Date</th>
                <th class="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500">Status</th>
                <th class="px-6 py-4 text-right text-[11px] font-bold uppercase tracking-wider text-slate-500">Action</th>
              </tr>
            </thead>

            <tbody class="divide-y divide-slate-100">
              <tr v-if="loading">
                <td colspan="7" class="px-6 py-16 text-center">
                  <div class="flex flex-col items-center gap-3">
                    <Loader2 class="h-8 w-8 animate-spin text-emerald-500" />
                    <p class="text-sm font-semibold text-slate-500">Loading payouts…</p>
                  </div>
                </td>
              </tr>

              <tr v-else-if="filteredPayouts.length === 0">
                <td colspan="7" class="px-6 py-16 text-center">
                  <div class="flex flex-col items-center gap-2">
                    <div class="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-2xl">💸</div>
                    <p class="font-bold text-slate-800">No payout requests</p>
                    <p class="text-sm text-slate-500">Try another filter or wait for partner requests.</p>
                  </div>
                </td>
              </tr>

              <tr
                v-for="payout in filteredPayouts"
                :key="payout.id"
                class="group transition-colors hover:bg-emerald-50/40"
              >
                <!-- Partner -->
                <td class="px-6 py-4">
                  <div class="flex items-center gap-3">
                    <div class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-emerald-100 to-teal-100 text-xs font-black text-emerald-700 ring-2 ring-white shadow-sm">
                      {{ initials(payout.partner_name) }}
                    </div>
                    <div class="min-w-0">
                      <p class="truncate font-bold text-slate-900">{{ payout.partner_name }}</p>
                      <p class="truncate text-xs text-slate-500">{{ payout.partner_email || '—' }}</p>
                    </div>
                  </div>
                </td>

                <!-- Amount -->
                <td class="px-6 py-4">
                  <span class="inline-flex items-center rounded-lg bg-emerald-50 px-3 py-1.5 text-sm font-black text-emerald-700 ring-1 ring-emerald-200">
                    {{ formatMoney(payout.amount) }}
                  </span>
                </td>

                <!-- Method -->
                <td class="px-6 py-4 text-sm text-slate-600">
                  {{ payout.method || '—' }}
                </td>

                <!-- Account -->
                <td class="px-6 py-4 text-sm font-mono text-slate-600">
                  {{ payout.account_number || '—' }}
                </td>

                <!-- Date -->
                <td class="px-6 py-4 text-sm text-slate-500">
                  {{ formatDate(payout.created_at) }}
                </td>

                <!-- Status -->
                <td class="px-6 py-4">
                  <span
                    class="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold"
                    :class="statusClass(payout.status)"
                  >
                    <span class="h-1.5 w-1.5 rounded-full" :class="statusDot(payout.status)"></span>
                    {{ statusLabel(payout.status) }}
                  </span>
                </td>

                <!-- Action -->
                <td class="px-6 py-4 text-right">
                  <div v-if="payout.status === 'pending'" class="flex justify-end gap-2">
                    <button
                      @click="openRejectModal(payout)"
                      :disabled="processingId === payout.id"
                      class="inline-flex items-center gap-1 rounded-lg bg-red-50 px-3 py-2 text-xs font-bold text-red-700 ring-1 ring-red-200 transition hover:bg-red-100 disabled:opacity-50"
                    >
                      <X :size="13" />
                      Reject
                    </button>
                    <button
                      @click="openApproveModal(payout)"
                      :disabled="processingId === payout.id"
                      class="inline-flex items-center gap-1 rounded-lg bg-emerald-600 px-3 py-2 text-xs font-bold text-white transition hover:bg-emerald-700 disabled:opacity-50"
                    >
                      <Check :size="13" />
                      Pay
                    </button>
                  </div>

                  <NuxtLink
                    v-else
                    :to="`/admin/payouts/${payout.id}`"
                    class="inline-flex items-center gap-1 rounded-lg bg-slate-50 px-3 py-2 text-xs font-bold text-slate-600 ring-1 ring-slate-200 transition hover:bg-slate-100"
                  >
                    <Eye :size="13" />
                    View
                  </NuxtLink>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Results footer -->
        <div v-if="!loading && filteredPayouts.length > 0" class="border-t border-slate-100 bg-slate-50 px-6 py-3 text-center text-xs font-semibold text-slate-500">
          Showing {{ filteredPayouts.length }} of {{ payouts.length }} payout{{ payouts.length === 1 ? '' : 's' }}
        </div>
      </div>

      <!-- ═══════ TRANSACTIONS TABLE ═══════ -->
      <div v-else class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div class="overflow-x-auto">
          <table class="w-full min-w-[850px]">
            <thead class="border-b border-slate-200 bg-gradient-to-r from-slate-50 to-slate-100">
              <tr>
                <th class="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500">Transaction</th>
                <th class="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500">Type</th>
                <th class="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500">Amount</th>
                <th class="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500">Reference</th>
                <th class="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500">Date</th>
              </tr>
            </thead>

            <tbody class="divide-y divide-slate-100">
              <tr v-if="loading">
                <td colspan="5" class="px-6 py-16 text-center">
                  <Loader2 class="mx-auto h-8 w-8 animate-spin text-emerald-500" />
                </td>
              </tr>

              <tr v-else-if="filteredTransactions.length === 0">
                <td colspan="5" class="px-6 py-16 text-center">
                  <div class="flex flex-col items-center gap-2">
                    <div class="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-2xl">📋</div>
                    <p class="font-bold text-slate-800">No transactions</p>
                    <p class="text-sm text-slate-500">Payout activity will show up here.</p>
                  </div>
                </td>
              </tr>

              <tr
                v-for="tx in filteredTransactions"
                :key="tx.id"
                class="group transition-colors hover:bg-emerald-50/40"
              >
                <td class="px-6 py-4">
                  <div class="flex items-center gap-3">
                    <div
                      class="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg font-black"
                      :class="tx.type === 'credit' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'"
                    >
                      <component :is="tx.type === 'credit' ? ArrowDownLeft : ArrowUpRight" :size="16" />
                    </div>
                    <p class="font-semibold text-slate-900">{{ tx.description }}</p>
                  </div>
                </td>

                <td class="px-6 py-4">
                  <span
                    class="rounded-full px-3 py-1 text-xs font-bold"
                    :class="tx.type === 'credit'
                      ? 'bg-emerald-100 text-emerald-700 ring-1 ring-emerald-200'
                      : 'bg-red-100 text-red-700 ring-1 ring-red-200'"
                  >
                    {{ tx.type === 'credit' ? 'Credit' : 'Debit' }}
                  </span>
                </td>

                <td
                  class="px-6 py-4 font-black"
                  :class="tx.type === 'credit' ? 'text-emerald-600' : 'text-red-600'"
                >
                  {{ tx.type === 'credit' ? '+' : '−' }} {{ formatMoney(tx.amount) }}
                </td>

                <td class="px-6 py-4 font-mono text-xs text-slate-500">{{ tx.reference || '—' }}</td>

                <td class="px-6 py-4 text-sm text-slate-500">{{ formatDate(tx.created_at) }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div v-if="!loading && filteredTransactions.length > 0" class="border-t border-slate-100 bg-slate-50 px-6 py-3 text-center text-xs font-semibold text-slate-500">
          Showing {{ filteredTransactions.length }} of {{ transactions.length }} transaction{{ transactions.length === 1 ? '' : 's' }}
        </div>
      </div>

    </div>

    <!-- ═══════ APPROVE MODAL ═══════ -->
    <Teleport to="body">
      <Transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="showApproveModal"
          class="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-md"
          @click.self="showApproveModal = false"
        >
          <Transition
            enter-active-class="transition duration-300 ease-out"
            enter-from-class="opacity-0 scale-95 translate-y-4"
            enter-to-class="opacity-100 scale-100 translate-y-0"
            leave-active-class="transition duration-200 ease-in"
            leave-from-class="opacity-100 scale-100"
            leave-to-class="opacity-0 scale-95"
          >
            <div class="relative w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl">

              <div class="flex items-center justify-between border-b border-slate-100 bg-gradient-to-r from-emerald-50 to-teal-50 px-6 py-5">
                <div class="flex items-center gap-3">
                  <div class="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-md">
                    <Check :size="20" />
                  </div>
                  <div>
                    <h3 class="text-base font-black text-slate-900">Confirm Payout</h3>
                    <p class="text-xs text-slate-500">This action cannot be undone</p>
                  </div>
                </div>
                <button @click="showApproveModal = false" class="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-slate-500 ring-1 ring-slate-200 transition hover:bg-red-500 hover:text-white">
                  <X :size="18" />
                </button>
              </div>

              <div class="p-6">
                <div v-if="selectedPayout" class="space-y-4">
                  <div class="rounded-xl border border-slate-200 bg-slate-50 p-4">
                    <div class="flex items-center justify-between">
                      <p class="text-xs font-bold uppercase tracking-wider text-slate-500">Partner</p>
                      <p class="text-sm font-black text-slate-900">{{ selectedPayout.partner_name }}</p>
                    </div>
                  </div>

                  <div class="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
                    <div class="flex items-center justify-between">
                      <p class="text-xs font-bold uppercase tracking-wider text-emerald-700">Amount</p>
                      <p class="text-2xl font-black text-emerald-700">{{ formatMoney(selectedPayout.amount) }}</p>
                    </div>
                  </div>

                  <div class="grid grid-cols-2 gap-3">
                    <div class="rounded-xl border border-slate-200 bg-slate-50 p-3">
                      <p class="text-[10px] font-bold uppercase tracking-wider text-slate-500">Method</p>
                      <p class="mt-1 text-sm font-bold text-slate-900">{{ selectedPayout.method || '—' }}</p>
                    </div>
                    <div class="rounded-xl border border-slate-200 bg-slate-50 p-3">
                      <p class="text-[10px] font-bold uppercase tracking-wider text-slate-500">Account</p>
                      <p class="mt-1 truncate font-mono text-sm font-bold text-slate-900">{{ selectedPayout.account_number || '—' }}</p>
                    </div>
                  </div>

                  <div class="rounded-xl bg-amber-50 border border-amber-200 p-3 text-xs text-amber-800">
                    <p class="font-bold">⚠️ Confirm before paying</p>
                    <p class="mt-1">Make sure the bank details above are correct before transferring the money.</p>
                  </div>
                </div>
              </div>

              <div class="flex flex-col-reverse justify-end gap-3 border-t border-slate-100 bg-slate-50 px-6 py-4 sm:flex-row">
                <button
                  @click="showApproveModal = false"
                  class="rounded-xl border border-slate-200 bg-white px-6 py-2.5 text-sm font-bold text-slate-700 transition hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  @click="processPayout(selectedPayout!, 'approve')"
                  :disabled="processingId === selectedPayout?.id"
                  class="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-emerald-500/30 transition hover:from-emerald-700 hover:to-teal-700 disabled:opacity-60"
                >
                  <Loader2 v-if="processingId === selectedPayout?.id" class="animate-spin" :size="16" />
                  <Check v-else :size="16" />
                  {{ processingId === selectedPayout?.id ? 'Processing…' : 'Confirm & Pay' }}
                </button>
              </div>
            </div>
          </Transition>
        </div>
      </Transition>
    </Teleport>

    <!-- ═══════ REJECT MODAL ═══════ -->
    <Teleport to="body">
      <Transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="showRejectModal"
          class="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-md"
          @click.self="showRejectModal = false"
        >
          <Transition
            enter-active-class="transition duration-300 ease-out"
            enter-from-class="opacity-0 scale-95 translate-y-4"
            enter-to-class="opacity-100 scale-100 translate-y-0"
            leave-active-class="transition duration-200 ease-in"
            leave-from-class="opacity-100 scale-100"
            leave-to-class="opacity-0 scale-95"
          >
            <div class="relative w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl">

              <div class="flex items-center justify-between border-b border-slate-100 bg-gradient-to-r from-red-50 to-rose-50 px-6 py-5">
                <div class="flex items-center gap-3">
                  <div class="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-red-500 to-rose-600 text-white shadow-md">
                    <X :size="20" />
                  </div>
                  <div>
                    <h3 class="text-base font-black text-slate-900">Reject Payout</h3>
                    <p class="text-xs text-slate-500">Funds will be returned to the partner's wallet</p>
                  </div>
                </div>
                <button @click="showRejectModal = false" class="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-slate-500 ring-1 ring-slate-200 transition hover:bg-red-500 hover:text-white">
                  <X :size="18" />
                </button>
              </div>

              <div class="p-6 space-y-4">
                <div class="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <div class="flex items-center justify-between">
                    <p class="text-xs font-bold uppercase tracking-wider text-slate-500">Partner</p>
                    <p class="text-sm font-black text-slate-900">{{ selectedPayout?.partner_name }}</p>
                  </div>
                </div>

                <div>
                  <label class="block text-xs font-bold text-slate-600 mb-1.5">Reason for rejection (optional)</label>
                  <textarea
                    v-model="rejectionReason"
                    rows="3"
                    placeholder="e.g., Incorrect bank details, duplicate request…"
                    class="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none transition focus:border-red-500 focus:bg-white focus:ring-4 focus:ring-red-500/10"
                  ></textarea>
                </div>
              </div>

              <div class="flex flex-col-reverse justify-end gap-3 border-t border-slate-100 bg-slate-50 px-6 py-4 sm:flex-row">
                <button
                  @click="showRejectModal = false"
                  class="rounded-xl border border-slate-200 bg-white px-6 py-2.5 text-sm font-bold text-slate-700 transition hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  @click="processPayout(selectedPayout!, 'reject')"
                  :disabled="processingId === selectedPayout?.id"
                  class="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-red-500/30 transition hover:from-red-700 hover:to-rose-700 disabled:opacity-60"
                >
                  <Loader2 v-if="processingId === selectedPayout?.id" class="animate-spin" :size="16" />
                  <X v-else :size="16" />
                  {{ processingId === selectedPayout?.id ? 'Rejecting…' : 'Reject Payout' }}
                </button>
              </div>
            </div>
          </Transition>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import {
  RefreshCw, AlertCircle, CheckCircle, Loader2, Check, X, Download, Search,
  Wallet, TrendingUp, Clock, ArrowDownLeft, ArrowUpRight, Eye, Banknote, Users,
} from 'lucide-vue-next'
import { useAuthStore } from '~/stores/auth'

definePageMeta({ layout: 'admin' })

/* ═══════════════════════════════════════════
   TYPES
   ═══════════════════════════════════════════ */
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

/* ═══════════════════════════════════════════
   SETUP
   ═══════════════════════════════════════════ */
const config = useRuntimeConfig()
const authStore = useAuthStore()

const loading = ref(false)
const error = ref('')
const success = ref('')
const activeTab = ref<'payouts' | 'transactions'>('payouts')
const processingId = ref<number | null>(null)

const search = ref('')
const statusFilter = ref<'all' | 'pending' | 'paid' | 'rejected'>('all')
const typeFilter = ref<'all' | 'credit' | 'debit'>('all')

const wallet = ref<Wallet>({
  available_balance: 0,
  pending_payouts: 0,
  total_paid_out: 0,
})

const payouts = ref<Payout[]>([])
const transactions = ref<Transaction[]>([])

/* Modals */
const showApproveModal = ref(false)
const showRejectModal = ref(false)
const selectedPayout = ref<Payout | null>(null)
const rejectionReason = ref('')

/* ═══════════════════════════════════════════
   API
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
   COMPUTED — filters + stats
   ═══════════════════════════════════════════ */
const filteredPayouts = computed(() => {
  const q = search.value.trim().toLowerCase()
  return payouts.value.filter(p => {
    const matchStatus = statusFilter.value === 'all' || p.status === statusFilter.value
    const matchSearch =
      !q ||
      p.partner_name?.toLowerCase().includes(q) ||
      p.partner_email?.toLowerCase().includes(q) ||
      p.account_number?.toLowerCase().includes(q)
    return matchStatus && matchSearch
  })
})

const filteredTransactions = computed(() => {
  const q = search.value.trim().toLowerCase()
  return transactions.value.filter(t => {
    const matchType = typeFilter.value === 'all' || t.type === typeFilter.value
    const matchSearch =
      !q ||
      t.description?.toLowerCase().includes(q) ||
      t.reference?.toLowerCase().includes(q)
    return matchType && matchSearch
  })
})

const stats = computed(() => [
  {
    label: 'Pending Requests',
    value: payouts.value.filter(p => p.status === 'pending').length,
    sub: 'Awaiting approval',
    icon: Clock,
    bg: 'bg-amber-50',
    color: 'text-amber-600',
    accent: 'bg-gradient-to-r from-amber-400 to-orange-500',
  },
  {
    label: 'Paid Requests',
    value: payouts.value.filter(p => p.status === 'paid').length,
    sub: 'Completed payouts',
    icon: CheckCircle,
    bg: 'bg-emerald-50',
    color: 'text-emerald-600',
    accent: 'bg-gradient-to-r from-emerald-400 to-teal-500',
  },
  {
    label: 'Rejected',
    value: payouts.value.filter(p => p.status === 'rejected').length,
    sub: 'Not processed',
    icon: X,
    bg: 'bg-red-50',
    color: 'text-red-600',
    accent: 'bg-gradient-to-r from-red-400 to-rose-500',
  },
  {
    label: 'Transactions',
    value: transactions.value.length,
    sub: 'Recent activity',
    icon: Banknote,
    bg: 'bg-blue-50',
    color: 'text-blue-600',
    accent: 'bg-gradient-to-r from-blue-400 to-indigo-500',
  },
])

/* ═══════════════════════════════════════════
   HELPERS
   ═══════════════════════════════════════════ */
const formatMoney = (value: number) =>
  `ETB ${Number(value || 0).toLocaleString('en-ET')}`

const formatDate = (date?: string) => {
  if (!date) return '—'
  const d = new Date(date)
  if (Number.isNaN(d.getTime())) return '—'
  return new Intl.DateTimeFormat('en-ET-u-ca-gregory', {
    day: '2-digit', month: 'short', year: 'numeric',
    timeZone: 'Africa/Addis_Ababa',
  }).format(d)
}

const initials = (name?: string) =>
  String(name || '?').split(' ').slice(0, 2).map(w => w.charAt(0)).join('').toUpperCase() || '?'

const statusLabel = (s: string) => {
  if (s === 'paid') return 'Paid'
  if (s === 'pending') return 'Pending'
  if (s === 'rejected') return 'Rejected'
  return s
}

const statusClass = (s: string) => {
  if (s === 'paid') return 'bg-emerald-100 text-emerald-700 ring-1 ring-emerald-200'
  if (s === 'pending') return 'bg-amber-100 text-amber-700 ring-1 ring-amber-200'
  return 'bg-red-100 text-red-700 ring-1 ring-red-200'
}

const statusDot = (s: string) => {
  if (s === 'paid') return 'bg-emerald-500'
  if (s === 'pending') return 'bg-amber-500'
  return 'bg-red-500'
}

/* ═══════════════════════════════════════════
   LOAD DATA
   ═══════════════════════════════════════════ */
const loadData = async () => {
  loading.value = true
  error.value = ''

  try {
    const headers = {
      Authorization: `Bearer ${getToken()}`,
      Accept: 'application/json',
    }

    const [walletRes, payoutsRes]: any = await Promise.all([
      $fetch(`${apiBase.value}/admin/wallet`, { headers }),
      $fetch(`${apiBase.value}/admin/payouts`, { headers }),
    ])

    // Wallet
    wallet.value = {
      available_balance: Number(walletRes?.data?.available_balance ?? walletRes?.available_balance ?? 0),
      pending_payouts:   Number(walletRes?.data?.pending_payouts   ?? walletRes?.pending_payouts   ?? 0),
      total_paid_out:    Number(walletRes?.data?.total_paid_out    ?? walletRes?.total_paid_out    ?? 0),
    }

    // Payouts + Transactions
    payouts.value =
      payoutsRes?.data?.payouts ??
      payoutsRes?.payouts ??
      (Array.isArray(payoutsRes?.data) ? payoutsRes.data : []) ??
      []

    transactions.value =
      payoutsRes?.data?.transactions ??
      payoutsRes?.transactions ??
      []
  } catch (err: any) {
    console.error('Load payouts error:', err)
    error.value =
      err?.data?.message ||
      err?.response?._data?.message ||
      'Unable to load wallet and payout information.'
    payouts.value = []
    transactions.value = []
  } finally {
    loading.value = false
  }
}

/* ═══════════════════════════════════════════
   MODAL HANDLERS
   ═══════════════════════════════════════════ */
const openApproveModal = (payout: Payout) => {
  selectedPayout.value = payout
  showApproveModal.value = true
}

const openRejectModal = (payout: Payout) => {
  selectedPayout.value = payout
  rejectionReason.value = ''
  showRejectModal.value = true
}

/* ═══════════════════════════════════════════
   PROCESS PAYOUT
   ═══════════════════════════════════════════ */
const processPayout = async (payout: Payout, action: 'approve' | 'reject') => {
  processingId.value = payout.id
  error.value = ''
  success.value = ''

  try {
    await $fetch(`${apiBase.value}/admin/payouts/${payout.id}/${action}`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${getToken()}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: action === 'reject'
        ? { reason: rejectionReason.value }
        : {},
    })

    success.value = action === 'approve'
      ? `Payout of ${formatMoney(payout.amount)} approved!`
      : 'Payout rejected and funds returned to partner.'

    showApproveModal.value = false
    showRejectModal.value = false
    selectedPayout.value = null

    await loadData()
    setTimeout(() => (success.value = ''), 4000)
  } catch (err: any) {
    console.error(`Process ${action} error:`, err)
    error.value =
      err?.data?.message ||
      err?.response?._data?.message ||
      `Unable to ${action} payout.`
  } finally {
    processingId.value = null
  }
}

/* ═══════════════════════════════════════════
   EXPORT CSV
   ═══════════════════════════════════════════ */
const exportCSV = () => {
  const rows = activeTab.value === 'payouts' ? filteredPayouts.value : filteredTransactions.value
  if (!rows.length) {
    error.value = 'Nothing to export.'
    return
  }

  const headers =
    activeTab.value === 'payouts'
      ? ['ID', 'Partner', 'Email', 'Amount', 'Method', 'Account', 'Status', 'Date']
      : ['ID', 'Description', 'Type', 'Amount', 'Reference', 'Date']

  const csv = [
    headers.join(','),
    ...rows.map((row: any) =>
      activeTab.value === 'payouts'
        ? [row.id, row.partner_name, row.partner_email, row.amount, row.method, row.account_number, row.status, row.created_at]
            .map(v => `"${v ?? ''}"`).join(',')
        : [row.id, row.description, row.type, row.amount, row.reference, row.created_at]
            .map(v => `"${v ?? ''}"`).join(',')
    ),
  ].join('\n')

  const blob = new Blob([csv], { type: 'text/csv' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${activeTab.value}-${Date.now()}.csv`
  a.click()
  URL.revokeObjectURL(url)
}

onMounted(loadData)
</script>