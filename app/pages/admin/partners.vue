<template>
  <div class="min-h-full bg-gradient-to-br from-slate-50 via-white to-emerald-50/30 p-4 sm:p-6 lg:p-8">
    <div class="mx-auto max-w-7xl space-y-6">

      <!-- ═══════════ HEADER ═══════════ -->
      <div class="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div class="flex items-center gap-2 text-sm font-semibold text-slate-500">
            <NuxtLink to="/admin" class="hover:text-emerald-600">Dashboard</NuxtLink>
            <span>/</span>
            <span class="text-slate-700">Partners</span>
          </div>

          <h1 class="mt-2 text-3xl font-black tracking-tight text-slate-900">
            Partners
          </h1>

          <p class="mt-1 text-sm text-slate-500">
            Manage sport field partners, their accounts, and payouts.
          </p>
        </div>

        <div class="flex items-center gap-2">
          <button
            @click="loadPartners"
            :disabled="loading"
            class="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 shadow-sm transition hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700 disabled:opacity-50"
          >
            <svg
              class="h-4 w-4"
              :class="{ 'animate-spin': loading }"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 4v5h.582M20 20v-5h-.581M5.07 19A9 9 0 1118.93 5"
              />
            </svg>
            Refresh
          </button>
        </div>
      </div>

      <!-- ═══════════ ERROR ═══════════ -->
      <div
        v-if="error"
        class="flex items-center justify-between rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-800 shadow-sm"
      >
        <span>{{ error }}</span>
        <button @click="error = ''" class="ml-3 flex h-7 w-7 items-center justify-center rounded-lg text-lg font-bold hover:bg-red-100">×</button>
      </div>

      <!-- ═══════════ STATS ═══════════ -->
      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div
          v-for="stat in stats"
          :key="stat.label"
          class="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
        >
          <div class="absolute inset-x-0 top-0 h-1" :class="stat.accent"></div>
          <div class="flex items-center justify-between">
            <div>
              <p class="text-xs font-bold uppercase tracking-wider text-slate-500">
                {{ stat.label }}
              </p>
              <p class="mt-2 text-3xl font-black text-slate-900">
                {{ stat.value }}
              </p>
            </div>

            <div
              class="flex h-12 w-12 items-center justify-center rounded-2xl text-xl transition group-hover:scale-110"
              :class="stat.bg"
            >
              <span :class="stat.color">{{ stat.icon }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- ═══════════ FILTERS ═══════════ -->
      <div class="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div class="grid grid-cols-1 gap-3 md:grid-cols-3">
          <div class="relative">
            <input
              v-model="search"
              type="text"
              placeholder="Search partner, email, or phone..."
              class="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10"
            />

            <svg
              class="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m21 21-4.35-4.35m2.1-5.4a7.5 7.5 0 11-15 0 7.5 7.5 0 0115 0z"
              />
            </svg>
          </div>

          <select
            v-model="statusFilter"
            class="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="pending">Pending</option>
            <option value="suspended">Suspended</option>
          </select>

          <select
            v-model="cityFilter"
            class="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10"
          >
            <option value="all">All Cities</option>
            <option v-for="city in cities" :key="city" :value="city">
              {{ city }}
            </option>
          </select>
        </div>
      </div>

      <!-- ═══════════ TABLE ═══════════ -->
      <div class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div class="overflow-x-auto">
          <table class="min-w-[1100px] w-full">
            <thead class="border-b border-slate-200 bg-slate-50">
              <tr>
                <th class="px-5 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500">Partner</th>
                <th class="px-5 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500">Phone</th>
                <th class="px-5 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500">City</th>
                <th class="px-5 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500">Bank Account</th>
                <th class="px-5 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500">Venues</th>
                <th class="px-5 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500">Earnings</th>
                <th class="px-5 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500">Status</th>
                <th class="px-5 py-4 text-right text-[11px] font-bold uppercase tracking-wider text-slate-500">Action</th>
              </tr>
            </thead>

            <tbody class="divide-y divide-slate-100">
              <!-- Loading -->
              <tr v-if="loading">
                <td colspan="8" class="px-6 py-16 text-center">
                  <div class="flex flex-col items-center gap-3">
                    <svg class="h-8 w-8 animate-spin text-emerald-500" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                    </svg>
                    <p class="text-sm font-semibold text-slate-500">Loading partners…</p>
                  </div>
                </td>
              </tr>

              <!-- Empty -->
              <tr v-else-if="filteredPartners.length === 0">
                <td colspan="8" class="px-6 py-16 text-center">
                  <div class="flex flex-col items-center gap-2">
                    <div class="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-2xl">👥</div>
                    <p class="font-bold text-slate-800">No partners found</p>
                    <p class="text-sm text-slate-500">Try another search or filter.</p>
                  </div>
                </td>
              </tr>

              <!-- Rows -->
              <tr
                v-for="partner in filteredPartners"
                :key="partner.id"
                class="transition-colors hover:bg-emerald-50/40"
              >
                <!-- Partner (name + email) -->
                <td class="px-5 py-4">
                  <div class="flex items-center gap-3">
                    <div class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-emerald-100 to-teal-100 text-xs font-black text-emerald-700 ring-2 ring-white shadow-sm">
                      {{ initials(partner.name) }}
                    </div>
                    <div class="min-w-0">
                      <p class="truncate font-bold text-slate-900">{{ partner.name }}</p>
                      <p class="truncate text-xs text-slate-500">{{ partner.email }}</p>
                    </div>
                  </div>
                </td>

                <!-- Phone -->
                <td class="px-5 py-4 text-sm text-slate-700">
                  <span v-if="partner.phone" class="font-mono">{{ partner.phone }}</span>
                  <span v-else class="text-slate-400">—</span>
                </td>

                <!-- City -->
                <td class="px-5 py-4 text-sm text-slate-700">
                  {{ partner.city || '—' }}
                </td>

                <!-- 🆕 Bank Account -->
                <td class="px-5 py-4 text-sm">
                  <div v-if="partner.bank_name || partner.bank_account_number" class="space-y-0.5">
                    <p class="font-bold text-slate-800">{{ partner.bank_name || '—' }}</p>
                    <p class="font-mono text-xs text-slate-500">
                      {{ maskAccount(partner.bank_account_number) }}
                    </p>
                    <p v-if="partner.bank_account_name" class="text-xs text-slate-500">
                      {{ partner.bank_account_name }}
                    </p>
                  </div>
                  <span v-else class="text-xs text-slate-400">Not provided</span>
                </td>

                <!-- Venues count -->
                <td class="px-5 py-4">
                  <span class="inline-flex items-center rounded-lg bg-emerald-50 px-3 py-1 text-sm font-bold text-emerald-700 ring-1 ring-emerald-200">
                    {{ partner.venues_count ?? 0 }}
                  </span>
                </td>

                <!-- Earnings -->
                <td class="px-5 py-4">
                  <span class="font-black text-slate-900">
                    {{ formatMoney(partner.total_earnings || 0) }}
                  </span>
                </td>

                <!-- Status -->
                <td class="px-5 py-4">
                  <span
                    class="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold"
                    :class="statusClass(partner.status)"
                  >
                    <span class="h-1.5 w-1.5 rounded-full" :class="statusDot(partner.status)"></span>
                    {{ statusLabel(partner.status) }}
                  </span>
                </td>

                <!-- Actions -->
                <td class="px-5 py-4 text-right">
                  <div class="flex items-center justify-end gap-2">
                    <!-- View details -->
                    <NuxtLink
                      :to="`/admin/partners/${partner.id}`"
                      class="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 transition hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700"
                      title="View details"
                    >
                      <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </NuxtLink>

                    <!-- Status change -->
                    <button
                      v-if="partner.status === 'pending'"
                      @click="changeStatus(partner, 'active')"
                      :disabled="processingId === partner.id"
                      class="rounded-lg bg-emerald-600 px-4 py-2 text-xs font-bold text-white shadow-sm transition hover:bg-emerald-700 disabled:opacity-50"
                    >
                      <span v-if="processingId === partner.id">…</span>
                      <span v-else>Approve</span>
                    </button>

                    <button
                      v-else-if="partner.status === 'active'"
                      @click="changeStatus(partner, 'suspended')"
                      :disabled="processingId === partner.id"
                      class="rounded-lg bg-red-50 px-4 py-2 text-xs font-bold text-red-600 ring-1 ring-red-200 transition hover:bg-red-100 disabled:opacity-50"
                    >
                      <span v-if="processingId === partner.id">…</span>
                      <span v-else>Suspend</span>
                    </button>

                    <button
                      v-else
                      @click="changeStatus(partner, 'active')"
                      :disabled="processingId === partner.id"
                      class="rounded-lg bg-emerald-50 px-4 py-2 text-xs font-bold text-emerald-700 ring-1 ring-emerald-200 transition hover:bg-emerald-100 disabled:opacity-50"
                    >
                      <span v-if="processingId === partner.id">…</span>
                      <span v-else>Activate</span>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Summary footer -->
      <div v-if="!loading && filteredPartners.length > 0" class="text-center text-xs text-slate-400">
        Showing {{ filteredPartners.length }} of {{ partners.length }} partners
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useAuthStore } from '~/stores/auth'

definePageMeta({ layout: 'admin' })

/* ═══════════════════════════════════════════
   TYPES — match your backend
   ═══════════════════════════════════════════ */
interface Partner {
  id: number
  name: string
  email: string
  phone?: string | null
  city?: string | null
  venues_count?: number
  total_earnings?: number
  status: 'active' | 'pending' | 'suspended'
  // 🆕 Bank account fields
  bank_name?: string | null
  bank_account_number?: string | null
  bank_account_name?: string | null
  // Optional
  avatar?: string | null
  created_at?: string
}

/* ═══════════════════════════════════════════
   SETUP
   ═══════════════════════════════════════════ */
const config = useRuntimeConfig()
const authStore = useAuthStore()

const partners = ref<Partner[]>([])
const loading = ref(false)
const error = ref('')
const search = ref('')
const statusFilter = ref<'all' | 'active' | 'pending' | 'suspended'>('all')
const cityFilter = ref('all')
const processingId = ref<number | null>(null)

/* ═══════════════════════════════════════════
   API BASE
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
   COMPUTED
   ═══════════════════════════════════════════ */
const cities = computed(() =>
  [...new Set(partners.value.map(p => p.city).filter(Boolean) as string[])].sort()
)

const filteredPartners = computed(() => {
  const q = search.value.trim().toLowerCase()
  return partners.value.filter(partner => {
    const matchesSearch =
      !q ||
      partner.name?.toLowerCase().includes(q) ||
      partner.email?.toLowerCase().includes(q) ||
      partner.phone?.toLowerCase().includes(q)

    const matchesStatus =
      statusFilter.value === 'all' || partner.status === statusFilter.value

    const matchesCity =
      cityFilter.value === 'all' || partner.city === cityFilter.value

    return matchesSearch && matchesStatus && matchesCity
  })
})

const stats = computed(() => [
  {
    label: 'Total Partners',
    value: partners.value.length,
    icon: '👥',
    bg: 'bg-blue-50',
    color: 'text-blue-600',
    accent: 'bg-gradient-to-r from-blue-400 to-indigo-500',
  },
  {
    label: 'Active',
    value: partners.value.filter(p => p.status === 'active').length,
    icon: '✓',
    bg: 'bg-emerald-50',
    color: 'text-emerald-600',
    accent: 'bg-gradient-to-r from-emerald-400 to-teal-500',
  },
  {
    label: 'Pending',
    value: partners.value.filter(p => p.status === 'pending').length,
    icon: '⏳',
    bg: 'bg-amber-50',
    color: 'text-amber-600',
    accent: 'bg-gradient-to-r from-amber-400 to-orange-500',
  },
  {
    label: 'Suspended',
    value: partners.value.filter(p => p.status === 'suspended').length,
    icon: '!',
    bg: 'bg-red-50',
    color: 'text-red-600',
    accent: 'bg-gradient-to-r from-red-400 to-rose-500',
  },
])

/* ═══════════════════════════════════════════
   HELPERS
   ═══════════════════════════════════════════ */
function formatMoney(value: number) {
  return `${Number(value || 0).toLocaleString('en-ET')} ETB`
}

function initials(name: string) {
  return String(name || '?')
    .split(' ')
    .slice(0, 2)
    .map(v => v.charAt(0))
    .join('')
    .toUpperCase() || '?'
}

/** Mask the middle of the account number for privacy */
function maskAccount(num?: string | null) {
  if (!num) return '—'
  const s = String(num)
  if (s.length <= 4) return s
  return `${s.slice(0, 2)}••••${s.slice(-4)}`
}

function statusLabel(status: string) {
  if (status === 'active') return 'Active'
  if (status === 'pending') return 'Pending'
  if (status === 'suspended') return 'Suspended'
  return status
}

function statusClass(status: string) {
  if (status === 'active') return 'bg-emerald-100 text-emerald-700 ring-1 ring-emerald-200'
  if (status === 'pending') return 'bg-amber-100 text-amber-700 ring-1 ring-amber-200'
  return 'bg-red-100 text-red-700 ring-1 ring-red-200'
}

function statusDot(status: string) {
  if (status === 'active') return 'bg-emerald-500'
  if (status === 'pending') return 'bg-amber-500'
  return 'bg-red-500'
}

/* ═══════════════════════════════════════════
   LOAD PARTNERS
   ═══════════════════════════════════════════ */
async function loadPartners() {
  loading.value = true
  error.value = ''

  try {
    const response: any = await $fetch(`${apiBase.value}/admin/partners`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
        Accept: 'application/json',
      },
    })

    const rows = response?.data ?? response?.partners ?? response ?? []
    partners.value = Array.isArray(rows) ? rows : []
  } catch (err: any) {
    console.error('Load partners error:', err)
    error.value =
      err?.data?.message ||
      err?.response?._data?.message ||
      'Unable to load partners. Check the Laravel API.'
    partners.value = []
  } finally {
    loading.value = false
  }
}

/* ═══════════════════════════════════════════
   CHANGE STATUS
   ═══════════════════════════════════════════ */
async function changeStatus(partner: Partner, status: 'active' | 'suspended') {
  processingId.value = partner.id
  error.value = ''

  try {
    await $fetch(`${apiBase.value}/admin/partners/${partner.id}/status`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${getToken()}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: { status },
    })

    // Optimistic update
    partner.status = status
  } catch (err: any) {
    console.error('Change status error:', err)
    error.value =
      err?.data?.message ||
      err?.response?._data?.message ||
      'Partner status could not be updated.'
  } finally {
    processingId.value = null
  }
}

onMounted(loadPartners)
</script>