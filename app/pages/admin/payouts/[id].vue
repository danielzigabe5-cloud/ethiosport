<template>
  <div class="min-h-full bg-gradient-to-br from-slate-50 via-white to-emerald-50/30 p-4 sm:p-6 lg:p-8">
    <div class="mx-auto max-w-4xl space-y-6">

      <!-- Header -->
      <div class="flex items-center gap-4">
        <NuxtLink to="/admin/payouts" class="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 hover:bg-slate-50">
          <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </NuxtLink>
        <div>
          <h1 class="text-2xl font-black text-slate-900">Payout Details</h1>
          <p class="text-sm text-slate-500">View payout information and status</p>
        </div>
      </div>

      <!-- Loading -->
      <div v-if="loading" class="flex justify-center py-20">
        <svg class="h-8 w-8 animate-spin text-emerald-500" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
        </svg>
      </div>

      <!-- Error -->
      <div v-else-if="error" class="rounded-2xl border border-red-200 bg-red-50 p-4 text-red-800">
        {{ error }}
      </div>

      <!-- Content -->
      <div v-else-if="payout" class="space-y-6">

        <!-- Status Banner -->
        <div class="rounded-2xl border p-6 shadow-sm" :class="statusBannerClass(payout.status)">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="flex h-12 w-12 items-center justify-center rounded-xl" :class="statusIconClass(payout.status)">
                <svg v-if="payout.status === 'paid'" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <svg v-else-if="payout.status === 'pending'" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <svg v-else class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <div>
                <p class="text-xs font-bold uppercase tracking-wider opacity-70">Status</p>
                <p class="text-xl font-black">{{ statusLabel(payout.status) }}</p>
              </div>
            </div>
            <div class="text-right">
              <p class="text-xs font-bold uppercase tracking-wider opacity-70">Amount</p>
              <p class="text-2xl font-black">{{ formatMoney(payout.amount) }}</p>
            </div>
          </div>
        </div>

        <!-- Partner Info -->
        <div class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 class="mb-4 font-bold text-slate-900">Partner Information</h3>
          <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <p class="text-xs font-bold uppercase text-slate-400">Name</p>
              <p class="font-bold text-slate-900">{{ payout.partner_name || '—' }}</p>
            </div>
            <div>
              <p class="text-xs font-bold uppercase text-slate-400">Email</p>
              <p class="text-slate-800">{{ payout.partner_email || '—' }}</p>
            </div>
            <div>
              <p class="text-xs font-bold uppercase text-slate-400">Phone</p>
              <p class="text-slate-800">{{ payout.partner_phone || '—' }}</p>
            </div>
          </div>
        </div>

        <!-- Payment Details -->
        <div class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 class="mb-4 font-bold text-slate-900">Payment Details</h3>
          <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <p class="text-xs font-bold uppercase text-slate-400">Method</p>
              <p class="font-bold text-slate-900">{{ payout.method || '—' }}</p>
            </div>
            <div>
              <p class="text-xs font-bold uppercase text-slate-400">Account Number</p>
              <p class="font-mono text-slate-800">{{ payout.account_number || '—' }}</p>
            </div>
            <div>
              <p class="text-xs font-bold uppercase text-slate-400">Requested Date</p>
              <p class="text-slate-800">{{ formatDate(payout.created_at) }}</p>
            </div>
            <div>
              <p class="text-xs font-bold uppercase text-slate-400">Processed Date</p>
              <p class="text-slate-800">{{ formatDate(payout.processed_at) }}</p>
            </div>
          </div>

          <!-- Rejection reason -->
          <div v-if="payout.status === 'rejected' && payout.rejection_reason" class="mt-4 rounded-xl bg-red-50 border border-red-200 p-4">
            <p class="text-xs font-bold uppercase text-red-700">Rejection Reason</p>
            <p class="mt-1 text-sm text-red-800">{{ payout.rejection_reason }}</p>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '~/stores/auth'

definePageMeta({ layout: 'admin' })

const route = useRoute()
const config = useRuntimeConfig()
const authStore = useAuthStore()

const payout = ref<any>(null)
const loading = ref(true)
const error = ref('')

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

function formatMoney(value: number) {
  return `ETB ${Number(value || 0).toLocaleString('en-ET')}`
}

function formatDate(date?: string) {
  if (!date) return '—'
  const d = new Date(date)
  if (Number.isNaN(d.getTime())) return '—'
  return new Intl.DateTimeFormat('en-ET-u-ca-gregory', {
    day: '2-digit', month: 'short', year: 'numeric',
    timeZone: 'Africa/Addis_Ababa',
  }).format(d)
}

function statusLabel(s: string) {
  if (s === 'paid') return 'Paid'
  if (s === 'pending') return 'Pending'
  if (s === 'rejected') return 'Rejected'
  return s
}

function statusBannerClass(s: string) {
  if (s === 'paid') return 'border-emerald-200 bg-emerald-50 text-emerald-800'
  if (s === 'pending') return 'border-amber-200 bg-amber-50 text-amber-800'
  return 'border-red-200 bg-red-50 text-red-800'
}

function statusIconClass(s: string) {
  if (s === 'paid') return 'bg-emerald-500 text-white'
  if (s === 'pending') return 'bg-amber-500 text-white'
  return 'bg-red-500 text-white'
}

async function loadPayout() {
  loading.value = true
  error.value = ''
  try {
    const response: any = await $fetch(`${apiBase.value}/admin/payouts/${route.params.id}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
        Accept: 'application/json',
      },
    })
    payout.value = response?.data || response
  } catch (err: any) {
    console.error('Load payout error:', err)
    error.value = err?.data?.message || 'Failed to load payout details.'
  } finally {
    loading.value = false
  }
}

onMounted(loadPayout)
</script>