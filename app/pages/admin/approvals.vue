```vue
<template>
  <div class="min-h-full bg-slate-50 p-4 sm:p-6 lg:p-8">
    <div class="mb-6">
      <div class="flex items-center gap-2 text-sm text-slate-500">
        <NuxtLink to="/admin" class="hover:text-emerald-600">
          Dashboard
        </NuxtLink>
        <span>/</span>
        <span>Approvals</span>
      </div>

      <h1 class="mt-2 text-2xl font-bold text-slate-900">
        Approvals
      </h1>

      <p class="mt-1 text-sm text-slate-500">
        Review and approve sport field and partner submissions.
      </p>
    </div>

    <div
      v-if="error"
      class="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
    >
      {{ error }}
    </div>

    <!-- Summary -->
    <div class="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
      <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <p class="text-sm text-slate-500">Pending Approvals</p>
        <p class="mt-2 text-3xl font-bold text-slate-900">
          {{ approvals.length }}
        </p>
      </div>

      <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <p class="text-sm text-slate-500">Sport Fields</p>
        <p class="mt-2 text-3xl font-bold text-emerald-600">
          {{ approvals.filter(a => a.type === 'venue').length }}
        </p>
      </div>

      <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <p class="text-sm text-slate-500">Partners</p>
        <p class="mt-2 text-3xl font-bold text-blue-600">
          {{ approvals.filter(a => a.type === 'partner').length }}
        </p>
      </div>
    </div>

    <!-- Filter -->
    <div class="mb-5 flex flex-wrap gap-2">
      <button
        v-for="filter in filters"
        :key="filter.value"
        @click="activeFilter = filter.value"
        class="rounded-xl px-4 py-2.5 text-sm font-semibold transition"
        :class="
          activeFilter === filter.value
            ? 'bg-emerald-600 text-white shadow-sm'
            : 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
        "
      >
        {{ filter.label }}
      </button>
    </div>

    <!-- Approval Cards -->
    <div class="space-y-4">
      <div
        v-if="loading"
        class="rounded-2xl border border-slate-200 bg-white p-10 text-center text-slate-500"
      >
        Loading approval requests...
      </div>

      <div
        v-else-if="filteredApprovals.length === 0"
        class="rounded-2xl border border-slate-200 bg-white p-10 text-center"
      >
        <div class="text-4xl">✓</div>
        <h3 class="mt-3 font-bold text-slate-900">
          No pending approvals
        </h3>
        <p class="mt-1 text-sm text-slate-500">
          Everything is currently reviewed.
        </p>
      </div>

      <div
        v-for="item in filteredApprovals"
        :key="item.id"
        class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
      >
        <div class="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div class="flex gap-4">
            <div
              class="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl"
              :class="
                item.type === 'venue'
                  ? 'bg-emerald-100 text-emerald-700'
                  : 'bg-blue-100 text-blue-700'
              "
            >
              <span class="text-2xl">
                {{ item.type === 'venue' ? '⚽' : '👤' }}
              </span>
            </div>

            <div>
              <div class="flex flex-wrap items-center gap-2">
                <h3 class="font-bold text-slate-900">
                  {{ item.title }}
                </h3>

                <span
                  class="rounded-full px-2.5 py-1 text-xs font-bold"
                  :class="
                    item.type === 'venue'
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'bg-blue-100 text-blue-700'
                  "
                >
                  {{ item.type === 'venue' ? 'Sport Field' : 'Partner' }}
                </span>
              </div>

              <p class="mt-1 text-sm text-slate-500">
                Submitted by {{ item.submitted_by }}
              </p>

              <div class="mt-3 flex flex-wrap gap-4 text-xs text-slate-500">
                <span>📍 {{ item.city }}</span>
                <span v-if="item.sport_type">
                  🏆 {{ item.sport_type }}
                </span>
                <span>📅 {{ formatDate(item.created_at) }}</span>
              </div>
            </div>
          </div>

          <div class="flex gap-2">
            <button
              @click="rejectApproval(item)"
              :disabled="processingId === item.id"
              class="rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-sm font-bold text-red-600 hover:bg-red-100 disabled:opacity-50"
            >
              Reject
            </button>

            <button
              @click="approveApproval(item)"
              :disabled="processingId === item.id"
              class="rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-bold text-white hover:bg-emerald-700 disabled:opacity-50"
            >
              {{ processingId === item.id ? 'Processing...' : 'Approve' }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Reject Modal -->
    <div
      v-if="showRejectModal"
      class="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4"
    >
      <div class="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
        <h2 class="text-xl font-bold text-slate-900">
          Reject Request
        </h2>

        <p class="mt-2 text-sm text-slate-500">
          Please provide a reason for rejecting this request.
        </p>

        <textarea
          v-model="rejectReason"
          rows="4"
          placeholder="Reason..."
          class="mt-4 w-full rounded-xl border border-slate-200 p-3 text-sm outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100"
        />

        <div class="mt-5 flex justify-end gap-2">
          <button
            @click="closeRejectModal"
            class="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600"
          >
            Cancel
          </button>

          <button
            @click="confirmReject"
            :disabled="!rejectReason.trim() || processingId !== null"
            class="rounded-xl bg-red-600 px-4 py-2.5 text-sm font-bold text-white disabled:opacity-50"
          >
            Reject Request
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

definePageMeta({
  layout: 'admin',
})

interface Approval {
  id: number
  type: 'venue' | 'partner'
  title: string
  submitted_by: string
  city?: string
  sport_type?: string
  created_at: string
}

const config = useRuntimeConfig()
const apiBase = config.public.apiBase || 'http://127.0.0.1:8001'

const approvals = ref<Approval[]>([])
const loading = ref(false)
const error = ref('')
const activeFilter = ref('all')
const processingId = ref<number | null>(null)

const showRejectModal = ref(false)
const selectedApproval = ref<Approval | null>(null)
const rejectReason = ref('')

const filters = [
  { label: 'All', value: 'all' },
  { label: 'Sport Fields', value: 'venue' },
  { label: 'Partners', value: 'partner' },
]

const filteredApprovals = computed(() => {
  if (activeFilter.value === 'all') {
    return approvals.value
  }

  return approvals.value.filter(
    item => item.type === activeFilter.value,
  )
})

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

async function loadApprovals() {
  loading.value = true
  error.value = ''

  try {
    const response: any = await $fetch(
      `${apiBase}/api/admin/approvals`,
      {
        credentials: 'include',
      },
    )

    approvals.value =
      response.data ??
      response.approvals ??
      []
  } catch (err: any) {
    error.value =
      err?.data?.message ||
      'Unable to load approval requests.'
  } finally {
    loading.value = false
  }
}

async function approveApproval(item: Approval) {
  processingId.value = item.id
  error.value = ''

  try {
    await $fetch(
      `${apiBase}/api/admin/approvals/${item.id}/approve`,
      {
        method: 'PATCH',
        credentials: 'include',
        body: {
          type: item.type,
        },
      },
    )

    approvals.value = approvals.value.filter(
      a => a.id !== item.id,
    )
  } catch (err: any) {
    error.value =
      err?.data?.message ||
      'Approval failed.'
  } finally {
    processingId.value = null
  }
}

function rejectApproval(item: Approval) {
  selectedApproval.value = item
  rejectReason.value = ''
  showRejectModal.value = true
}

function closeRejectModal() {
  showRejectModal.value = false
  selectedApproval.value = null
  rejectReason.value = ''
}

async function confirmReject() {
  if (!selectedApproval.value || !rejectReason.value.trim()) {
    return
  }

  const item = selectedApproval.value

  processingId.value = item.id
  error.value = ''

  try {
    await $fetch(
      `${apiBase}/api/admin/approvals/${item.id}/reject`,
      {
        method: 'PATCH',
        credentials: 'include',
        body: {
          type: item.type,
          reason: rejectReason.value.trim(),
        },
      },
    )

    approvals.value = approvals.value.filter(
      a => a.id !== item.id,
    )

    closeRejectModal()
  } catch (err: any) {
    error.value =
      err?.data?.message ||
      'Rejection failed.'
  } finally {
    processingId.value = null
  }
}

onMounted(loadApprovals)
</script>
```
