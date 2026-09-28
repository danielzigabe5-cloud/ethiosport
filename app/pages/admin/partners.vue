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
          <span>Partners</span>
        </div>

        <h1 class="mt-2 text-2xl font-bold text-slate-900">
          Partners
        </h1>

        <p class="mt-1 text-sm text-slate-500">
          Manage sport field partners and their accounts.
        </p>
      </div>

      <button
        @click="loadPartners"
        :disabled="loading"
        class="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50 disabled:opacity-50"
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

    <!-- Error -->
    <div
      v-if="error"
      class="mb-6 flex items-center justify-between rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
    >
      <span>{{ error }}</span>
      <button @click="error = ''" class="font-bold">×</button>
    </div>

    <!-- Stats -->
    <div class="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <div
        v-for="stat in stats"
        :key="stat.label"
        class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
      >
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-slate-500">
              {{ stat.label }}
            </p>
            <p class="mt-2 text-2xl font-bold text-slate-900">
              {{ stat.value }}
            </p>
          </div>

          <div
            class="flex h-11 w-11 items-center justify-center rounded-xl"
            :class="stat.bg"
          >
            <span :class="stat.color" class="text-xl">
              {{ stat.icon }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Filters -->
    <div class="mb-5 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div class="grid grid-cols-1 gap-3 md:grid-cols-3">
        <div class="relative">
          <input
            v-model="search"
            type="text"
            placeholder="Search partner..."
            class="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 pl-10 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
          />

          <svg
            class="absolute left-3 top-3.5 h-4 w-4 text-slate-400"
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
          class="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-emerald-500"
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="pending">Pending</option>
          <option value="suspended">Suspended</option>
        </select>

        <select
          v-model="cityFilter"
          class="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-emerald-500"
        >
          <option value="all">All Cities</option>
          <option v-for="city in cities" :key="city" :value="city">
            {{ city }}
          </option>
        </select>
      </div>
    </div>

    <!-- Table -->
    <div class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div class="overflow-x-auto">
        <table class="min-w-[900px] w-full">
          <thead class="border-b border-slate-200 bg-slate-50">
            <tr>
              <th class="px-6 py-4 text-left text-xs font-bold uppercase text-slate-500">
                Partner
              </th>
              <th class="px-6 py-4 text-left text-xs font-bold uppercase text-slate-500">
                Phone
              </th>
              <th class="px-6 py-4 text-left text-xs font-bold uppercase text-slate-500">
                City
              </th>
              <th class="px-6 py-4 text-left text-xs font-bold uppercase text-slate-500">
                Venues
              </th>
              <th class="px-6 py-4 text-left text-xs font-bold uppercase text-slate-500">
                Earnings
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
                Loading partners...
              </td>
            </tr>

            <tr v-else-if="filteredPartners.length === 0">
              <td colspan="7" class="px-6 py-12 text-center text-slate-500">
                No partners found.
              </td>
            </tr>

            <tr
              v-for="partner in filteredPartners"
              :key="partner.id"
              class="hover:bg-slate-50"
            >
              <td class="px-6 py-4">
                <div class="flex items-center gap-3">
                  <div
                    class="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 font-bold text-emerald-700"
                  >
                    {{ initials(partner.name) }}
                  </div>

                  <div>
                    <p class="font-semibold text-slate-900">
                      {{ partner.name }}
                    </p>
                    <p class="text-xs text-slate-500">
                      {{ partner.email }}
                    </p>
                  </div>
                </div>
              </td>

              <td class="px-6 py-4 text-sm text-slate-600">
                {{ partner.phone || '-' }}
              </td>

              <td class="px-6 py-4 text-sm text-slate-600">
                {{ partner.city || '-' }}
              </td>

              <td class="px-6 py-4 text-sm font-semibold text-slate-700">
                {{ partner.venues_count ?? 0 }}
              </td>

              <td class="px-6 py-4 text-sm font-semibold text-slate-700">
                {{ formatMoney(partner.total_earnings || 0) }}
              </td>

              <td class="px-6 py-4">
                <span
                  class="rounded-full px-3 py-1 text-xs font-bold"
                  :class="statusClass(partner.status)"
                >
                  {{ partner.status }}
                </span>
              </td>

              <td class="px-6 py-4 text-right">
                <button
                  v-if="partner.status === 'pending'"
                  @click="changeStatus(partner, 'active')"
                  :disabled="processingId === partner.id"
                  class="rounded-lg bg-emerald-600 px-3 py-2 text-xs font-bold text-white hover:bg-emerald-700 disabled:opacity-50"
                >
                  Approve
                </button>

                <button
                  v-else-if="partner.status === 'active'"
                  @click="changeStatus(partner, 'suspended')"
                  :disabled="processingId === partner.id"
                  class="rounded-lg bg-red-50 px-3 py-2 text-xs font-bold text-red-600 hover:bg-red-100 disabled:opacity-50"
                >
                  Suspend
                </button>

                <button
                  v-else
                  @click="changeStatus(partner, 'active')"
                  :disabled="processingId === partner.id"
                  class="rounded-lg bg-emerald-50 px-3 py-2 text-xs font-bold text-emerald-700 hover:bg-emerald-100 disabled:opacity-50"
                >
                  Activate
                </button>
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

interface Partner {
  id: number
  name: string
  email: string
  phone?: string
  city?: string
  venues_count?: number
  total_earnings?: number
  status: 'active' | 'pending' | 'suspended'
}

const config = useRuntimeConfig()

const partners = ref<Partner[]>([])
const loading = ref(false)
const error = ref('')
const search = ref('')
const statusFilter = ref('all')
const cityFilter = ref('all')
const processingId = ref<number | null>(null)

const apiBase = config.public.apiBase || 'http://127.0.0.1:8001'

const cities = computed(() => {
  return [...new Set(partners.value.map(p => p.city).filter(Boolean) as string[])]
})

const filteredPartners = computed(() => {
  return partners.value.filter(partner => {
    const q = search.value.toLowerCase()

    const matchesSearch =
      !q ||
      partner.name.toLowerCase().includes(q) ||
      partner.email.toLowerCase().includes(q)

    const matchesStatus =
      statusFilter.value === 'all' ||
      partner.status === statusFilter.value

    const matchesCity =
      cityFilter.value === 'all' ||
      partner.city === cityFilter.value

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
  },
  {
    label: 'Active',
    value: partners.value.filter(p => p.status === 'active').length,
    icon: '✓',
    bg: 'bg-emerald-50',
    color: 'text-emerald-600',
  },
  {
    label: 'Pending',
    value: partners.value.filter(p => p.status === 'pending').length,
    icon: '⏳',
    bg: 'bg-amber-50',
    color: 'text-amber-600',
  },
  {
    label: 'Suspended',
    value: partners.value.filter(p => p.status === 'suspended').length,
    icon: '!',
    bg: 'bg-red-50',
    color: 'text-red-600',
  },
])

function formatMoney(value: number) {
  return `${Number(value).toLocaleString()} ETB`
}

function initials(name: string) {
  return name
    .split(' ')
    .slice(0, 2)
    .map(v => v.charAt(0))
    .join('')
    .toUpperCase()
}

function statusClass(status: string) {
  if (status === 'active') return 'bg-emerald-100 text-emerald-700'
  if (status === 'pending') return 'bg-amber-100 text-amber-700'
  return 'bg-red-100 text-red-700'
}

async function loadPartners() {
  loading.value = true
  error.value = ''

  try {
    const response: any = await $fetch(`${apiBase}/api/admin/partners`, {
      credentials: 'include',
    })

    partners.value = response.data ?? response.partners ?? []
  } catch (err: any) {
    error.value =
      err?.data?.message ||
      'Unable to load partners. Check the Laravel API.'
  } finally {
    loading.value = false
  }
}

async function changeStatus(partner: Partner, status: 'active' | 'suspended') {
  processingId.value = partner.id
  error.value = ''

  try {
    await $fetch(
      `${apiBase}/api/admin/partners/${partner.id}/status`,
      {
        method: 'PATCH',
        credentials: 'include',
        body: { status },
      },
    )

    partner.status = status
  } catch (err: any) {
    error.value =
      err?.data?.message ||
      'Partner status could not be updated.'
  } finally {
    processingId.value = null
  }
}

onMounted(loadPartners)
</script>
```
