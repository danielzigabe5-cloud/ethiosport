<template>
  <div class="min-h-full bg-gradient-to-br from-slate-50 via-white to-emerald-50/30 p-4 sm:p-6 lg:p-8">
    <div class="mx-auto max-w-5xl space-y-6">

      <!-- Header -->
      <div class="flex items-center gap-4">
        <NuxtLink to="/admin/partners" class="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 hover:bg-slate-50">
          <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </NuxtLink>
        <div>
          <h1 class="text-2xl font-black text-slate-900">Partner Details</h1>
          <p class="text-sm text-slate-500">View partner information and venues</p>
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
      <div v-else-if="partner" class="space-y-6">

        <!-- Partner Info Card -->
        <div class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div class="flex items-start gap-4">
            <div class="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-emerald-100 to-teal-100 text-xl font-black text-emerald-700">
              {{ initials(partner.name) }}
            </div>
            <div class="flex-1">
              <h2 class="text-xl font-bold text-slate-900">{{ partner.name }}</h2>
              <p class="text-sm text-slate-500">{{ partner.email }}</p>
              <p class="text-sm text-slate-500">{{ partner.phone || '—' }}</p>
              <span class="mt-2 inline-flex items-center rounded-full px-3 py-1 text-xs font-bold" :class="statusClass(partner.status)">
                {{ partner.status }}
              </span>
            </div>
          </div>

          <!-- Stats Grid -->
          <div class="mt-6 grid grid-cols-2 gap-4 border-t border-slate-100 pt-4 sm:grid-cols-4">
            <div>
              <p class="text-xs font-bold uppercase text-slate-400">Total Venues</p>
              <p class="text-lg font-black text-slate-900">{{ partner.venues_count || 0 }}</p>
            </div>
            <div>
              <p class="text-xs font-bold uppercase text-slate-400">Total Earnings</p>
              <p class="text-lg font-black text-slate-900">{{ formatMoney(partner.total_earnings || 0) }}</p>
            </div>
            <div>
              <p class="text-xs font-bold uppercase text-slate-400">Total Bookings</p>
              <p class="text-lg font-black text-slate-900">{{ partner.totalBookings || 0 }}</p>
            </div>
            <div>
              <p class="text-xs font-bold uppercase text-slate-400">Total Revenue</p>
              <p class="text-lg font-black text-slate-900">{{ partner.totalRevenue || 'ETB 0' }}</p>
            </div>
          </div>
        </div>

        <!-- Bank Account -->
        <div class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 class="font-bold text-slate-900 mb-4">Bank Account</h3>
          <div v-if="partner.bank_name || partner.bank_account_number" class="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <p class="text-xs font-bold uppercase text-slate-400">Bank Name</p>
              <p class="font-bold text-slate-800">{{ partner.bank_name || '—' }}</p>
            </div>
            <div>
              <p class="text-xs font-bold uppercase text-slate-400">Account Number</p>
              <p class="font-mono text-slate-800">{{ maskAccount(partner.bank_account_number) }}</p>
            </div>
            <div>
              <p class="text-xs font-bold uppercase text-slate-400">Account Name</p>
              <p class="text-slate-800">{{ partner.bank_account_name || '—' }}</p>
            </div>
          </div>
          <p v-else class="text-sm text-slate-400">No bank account information provided.</p>
        </div>

        <!-- Venues List -->
        <div class="rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div class="border-b border-slate-100 p-5">
            <h3 class="font-bold text-slate-900">Venues ({{ partner.venues?.length || 0 }})</h3>
          </div>
          <div v-if="partner.venues && partner.venues.length > 0" class="divide-y divide-slate-100">
            <div v-for="venue in partner.venues" :key="venue.id" class="flex items-center justify-between p-5">
              <div>
                <p class="font-bold text-slate-900">{{ venue.name }}</p>
                <p class="text-sm text-slate-500">{{ venue.location || '—' }}</p>
              </div>
              <div class="text-right">
                <p class="font-bold text-slate-900">{{ formatMoney(venue.price_per_hour || 0) }}/hr</p>
                <span class="rounded-lg px-3 py-1 text-xs font-bold" :class="venue.is_active ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'">
                  {{ venue.is_active ? 'Active' : 'Inactive' }}
                </span>
              </div>
            </div>
          </div>
          <div v-else class="p-10 text-center text-slate-400">
            No venues found for this partner.
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

const partner = ref<any>(null)
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

function initials(name: string) {
  return String(name || '?').split(' ').slice(0, 2).map(v => v.charAt(0)).join('').toUpperCase() || '?'
}

function formatMoney(value: number) {
  return `${Number(value || 0).toLocaleString('en-ET')} ETB`
}

function maskAccount(num?: string | null) {
  if (!num) return '—'
  const s = String(num)
  if (s.length <= 4) return s
  return `${s.slice(0, 2)}••••${s.slice(-4)}`
}

function statusClass(status: string) {
  if (status === 'active') return 'bg-emerald-100 text-emerald-700'
  if (status === 'pending') return 'bg-amber-100 text-amber-700'
  return 'bg-red-100 text-red-700'
}

async function loadPartner() {
  loading.value = true
  error.value = ''

  try {
    const response: any = await $fetch(`${apiBase.value}/admin/partners/${route.params.id}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
        Accept: 'application/json',
      },
    })

    // Backend 'data' ውስጥ ያለውን ይወስዳል
    partner.value = response?.data || response
  } catch (err: any) {
    console.error('Load partner error:', err)
    error.value = err?.data?.message || 'Failed to load partner details.'
  } finally {
    loading.value = false
  }
}

onMounted(loadPartner)
</script>