<template>
  <div class="min-h-full bg-gradient-to-br from-slate-50 via-white to-emerald-50/30 p-4 sm:p-6 lg:p-8">
    <div class="mx-auto max-w-7xl space-y-6">

      <!-- ═══════════ HEADER ═══════════ -->
      <div class="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div class="flex items-center gap-2 text-sm font-semibold text-slate-500">
            <NuxtLink to="/admin" class="transition hover:text-emerald-600">Dashboard</NuxtLink>
            <span>/</span>
            <span class="text-slate-700">Users</span>
          </div>

          <h1 class="mt-2 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
            Users
          </h1>

          <p class="mt-1 text-sm text-slate-500">
            Manage all registered Combolojo users, roles, and account status.
          </p>
        </div>

        <div class="flex items-center gap-2">
          <button
            @click="loadUsers"
            :disabled="loading"
            class="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 shadow-sm transition hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700 disabled:opacity-50"
          >
            <RefreshCw :size="16" :class="loading ? 'animate-spin' : ''" />
            Refresh
          </button>
        </div>
      </div>

      <!-- ═══════════ ERROR ═══════════ -->
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

      <!-- ═══════════ STATS ═══════════ -->
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
            </div>

            <div
              class="flex h-12 w-12 items-center justify-center rounded-2xl transition group-hover:scale-110"
              :class="stat.bg"
            >
              <component :is="stat.icon" :size="22" :class="stat.color" />
            </div>
          </div>
        </div>
      </div>

      <!-- ═══════════ FILTERS ═══════════ -->
      <div class="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div class="grid grid-cols-1 gap-3 lg:grid-cols-4">
          <div class="relative lg:col-span-2">
            <Search class="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              v-model="search"
              type="text"
              placeholder="Search by name, email, or phone..."
              class="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10"
            />
          </div>

          <select
            v-model="roleFilter"
            class="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10"
          >
            <option value="all">All Roles</option>
            <option value="admin">Admin</option>
            <option value="partner">Partner</option>
            <option value="user">User</option>
          </select>

          <select
            v-model="statusFilter"
            class="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="pending">Pending</option>
            <option value="blocked">Blocked</option>
          </select>
        </div>

        <div class="mt-3 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-3">
          <div class="flex items-center gap-2 text-xs text-slate-500">
            <span>Sort by:</span>
            <select
              v-model="sortBy"
              class="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold outline-none focus:border-emerald-500"
            >
              <option value="newest">Newest first</option>
              <option value="oldest">Oldest first</option>
              <option value="name">Name (A–Z)</option>
              <option value="role">Role</option>
            </select>
          </div>

          <p class="text-xs font-semibold text-slate-500">
            <span class="text-slate-900">{{ filteredUsers.length }}</span> user<span v-if="filteredUsers.length !== 1">s</span> found
          </p>
        </div>
      </div>

      <!-- ═══════════ BULK ACTIONS ═══════════ -->
      <Transition
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="opacity-0 -translate-y-2"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition duration-200"
        leave-to-class="opacity-0"
      >
        <div
          v-if="selectedIds.length > 0"
          class="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 shadow-sm"
        >
          <div class="flex items-center gap-3">
            <div class="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500 font-bold text-white">
              {{ selectedIds.length }}
            </div>
            <p class="text-sm font-bold text-emerald-900">
              {{ selectedIds.length }} user<span v-if="selectedIds.length !== 1">s</span> selected
            </p>
          </div>

          <div class="flex flex-wrap items-center gap-2">
            <button
              @click="bulkAction('active')"
              :disabled="bulkProcessing"
              class="inline-flex items-center gap-1.5 rounded-lg bg-white px-3 py-2 text-xs font-bold text-emerald-700 ring-1 ring-emerald-200 transition hover:bg-emerald-100 disabled:opacity-50"
            >
              <Check :size="14" /> Activate
            </button>

            <button
              @click="bulkAction('blocked')"
              :disabled="bulkProcessing"
              class="inline-flex items-center gap-1.5 rounded-lg bg-white px-3 py-2 text-xs font-bold text-red-700 ring-1 ring-red-200 transition hover:bg-red-100 disabled:opacity-50"
            >
              <Ban :size="14" /> Block
            </button>

            <button
              @click="selectedIds = []"
              class="rounded-lg px-3 py-2 text-xs font-bold text-slate-500 transition hover:bg-white hover:text-slate-700"
            >
              Clear
            </button>
          </div>
        </div>
      </Transition>

      <!-- ═══════════ TABLE ═══════════ -->
      <div class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div class="overflow-x-auto">
          <table class="w-full min-w-[1000px]">
            <thead class="border-b border-slate-200 bg-gradient-to-r from-slate-50 to-slate-100">
              <tr>
                <th class="w-12 px-4 py-4">
                  <input
                    type="checkbox"
                    :checked="allSelected"
                    @change="toggleSelectAll"
                    class="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                  />
                </th>
                <th class="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500">User</th>
                <th class="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500">Phone</th>
                <th class="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500">Role</th>
                <th class="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500">Joined</th>
                <th class="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500">Status</th>
                <th class="px-6 py-4 text-right text-[11px] font-bold uppercase tracking-wider text-slate-500">Actions</th>
              </tr>
            </thead>

            <tbody class="divide-y divide-slate-100">
              <tr v-if="loading">
                <td colspan="7" class="px-6 py-16 text-center">
                  <div class="flex flex-col items-center gap-3">
                    <Loader2 class="h-8 w-8 animate-spin text-emerald-500" />
                    <p class="text-sm font-semibold text-slate-500">Loading users…</p>
                  </div>
                </td>
              </tr>

              <tr v-else-if="paginatedUsers.length === 0">
                <td colspan="7" class="px-6 py-16 text-center">
                  <div class="flex flex-col items-center gap-2">
                    <div class="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-2xl">👥</div>
                    <p class="font-bold text-slate-800">No users found</p>
                    <p class="text-sm text-slate-500">Try another search or filter.</p>
                  </div>
                </td>
              </tr>

              <tr
                v-for="user in paginatedUsers"
                :key="user.id"
                class="group transition-colors hover:bg-emerald-50/40"
                :class="{ 'bg-emerald-50/60': selectedIds.includes(user.id) }"
              >
                <td class="px-4 py-4">
                  <input
                    type="checkbox"
                    :value="user.id"
                    v-model="selectedIds"
                    class="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                  />
                </td>

                <td class="px-6 py-4">
                  <div class="flex items-center gap-3">
                    <div class="relative">
                      <div class="flex h-10 w-10 flex-shrink-0 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-emerald-100 to-teal-100 text-xs font-black text-emerald-700 ring-2 ring-white shadow-sm">
                        <img
                          v-if="user.avatar"
                          :src="user.avatar"
                          :alt="user.name"
                          class="h-full w-full object-cover"
                          @error="onAvatarError"
                        />
                        <span v-else>{{ initials(user.name) }}</span>
                      </div>
                      <span
                        v-if="user.role === 'admin'"
                        class="absolute -bottom-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-purple-500 text-[8px] font-black text-white ring-2 ring-white"
                        title="Admin"
                      >★</span>
                    </div>
                    <div class="min-w-0">
                      <p class="truncate font-bold text-slate-900">{{ user.name }}</p>
                      <p class="truncate text-xs text-slate-500">{{ user.email }}</p>
                    </div>
                  </div>
                </td>

                <td class="px-6 py-4 text-sm text-slate-700">
                  <span v-if="getPhone(user)" class="font-mono">{{ getPhone(user) }}</span>
                  <span v-else class="text-slate-400">—</span>
                </td>

                <td class="px-6 py-4">
                  <span
                    class="inline-flex items-center gap-1.5 rounded-lg px-3 py-1 text-xs font-bold"
                    :class="roleClass(user.role)"
                  >
                    {{ roleLabel(user.role) }}
                  </span>
                </td>

                <td class="px-6 py-4 text-sm text-slate-600">
                  {{ formatDate(user.created_at) }}
                </td>

                <td class="px-6 py-4">
                  <span
                    class="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold"
                    :class="statusClass(user)"
                  >
                    <span class="h-1.5 w-1.5 rounded-full" :class="statusDot(user)"></span>
                    {{ statusLabel(user) }}
                  </span>
                </td>

                <td class="px-6 py-4 text-right">
                  <div class="flex items-center justify-end gap-1.5">
                    <button
                      @click="openDetail(user)"
                      class="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
                      title="View details"
                    >
                      <Eye :size="17" />
                    </button>

                    <div class="relative">
                      <button
                        @click="toggleMenu(user.id)"
                        class="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
                      >
                        <MoreVertical :size="18" />
                      </button>

                      <Transition
                        enter-active-class="transition duration-150 ease-out"
                        enter-from-class="opacity-0 scale-95 -translate-y-1"
                        enter-to-class="opacity-100 scale-100 translate-y-0"
                        leave-active-class="transition duration-100 ease-in"
                        leave-from-class="opacity-100 scale-100"
                        leave-to-class="opacity-0 scale-95"
                      >
                        <div
                          v-if="openMenuId === user.id"
                          class="absolute right-0 z-20 mt-1 w-56 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-2xl"
                          @click.stop
                        >
                          <div class="border-b border-slate-100 px-3 py-2">
                            <p class="text-[10px] font-bold uppercase tracking-wider text-slate-400">Change Role</p>
                          </div>

                          <button
                            v-for="role in roleOptions"
                            :key="role"
                            @click="changeRole(user, role)"
                            :disabled="processingId === user.id || user.role === role"
                            class="flex w-full items-center justify-between gap-2 px-3 py-2 text-left text-sm font-semibold text-slate-700 transition hover:bg-emerald-50 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            <span>{{ roleLabel(role) }}</span>
                            <span v-if="user.role === role" class="text-xs text-emerald-600">✓</span>
                          </button>

                          <div class="border-t border-slate-100 px-3 py-2">
                            <p class="text-[10px] font-bold uppercase tracking-wider text-slate-400">Status</p>
                          </div>

                          <button
                            v-if="statusLabel(user) !== 'Blocked'"
                            @click="changeStatus(user, 'blocked')"
                            :disabled="processingId === user.id"
                            class="flex w-full items-center gap-2 px-3 py-2 text-left text-sm font-semibold text-red-600 transition hover:bg-red-50 disabled:opacity-50"
                          >
                            <Ban :size="14" />
                            Block User
                          </button>

                          <button
                            v-else
                            @click="changeStatus(user, 'active')"
                            :disabled="processingId === user.id"
                            class="flex w-full items-center gap-2 px-3 py-2 text-left text-sm font-semibold text-emerald-600 transition hover:bg-emerald-50 disabled:opacity-50"
                          >
                            <Check :size="14" />
                            Activate User
                          </button>

                          <div class="border-t border-slate-100">
                            <button
                              @click="goToFullProfile(user.id)"
                              class="flex w-full items-center gap-2 px-3 py-2 text-left text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
                            >
                              <ExternalLink :size="14" />
                              Full Profile
                            </button>
                          </div>
                        </div>
                      </Transition>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination -->
        <div
          v-if="!loading && filteredUsers.length > 0"
          class="flex flex-col items-center justify-between gap-3 border-t border-slate-100 bg-slate-50 px-6 py-4 sm:flex-row"
        >
          <p class="text-xs font-semibold text-slate-500">
            Showing {{ pageStart + 1 }}–{{ pageEnd }} of {{ filteredUsers.length }}
          </p>

          <div class="flex items-center gap-1">
            <button
              @click="page--"
              :disabled="page === 1"
              class="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition hover:border-emerald-300 hover:bg-emerald-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronLeft :size="16" />
            </button>

            <span class="px-4 text-sm font-bold text-slate-700">
              Page {{ page }} of {{ totalPages }}
            </span>

            <button
              @click="page++"
              :disabled="page >= totalPages"
              class="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition hover:border-emerald-300 hover:bg-emerald-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronRight :size="16" />
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- ═══════════ DETAIL DRAWER ═══════════ -->
    <Teleport to="body">
      <Transition
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition duration-200 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="detailUser"
          class="fixed inset-0 z-50 flex justify-end bg-slate-950/40 backdrop-blur-sm"
          @click.self="detailUser = null"
        >
          <Transition
            enter-active-class="transition duration-300 ease-out"
            enter-from-class="translate-x-full"
            enter-to-class="translate-x-0"
            leave-active-class="transition duration-200 ease-in"
            leave-from-class="translate-x-0"
            leave-to-class="translate-x-full"
          >
            <div
              v-if="detailUser"
              class="relative h-full w-full max-w-md overflow-y-auto bg-white shadow-2xl"
            >
              <div class="sticky top-0 z-10 flex items-center justify-between border-b border-slate-100 bg-white/95 px-6 py-4 backdrop-blur">
                <h3 class="text-lg font-bold text-slate-900">User Details</h3>
                <button
                  @click="detailUser = null"
                  class="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
                >
                  <X :size="18" />
                </button>
              </div>

              <div class="space-y-6 p-6">
                <div class="flex flex-col items-center text-center">
                  <div class="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-emerald-100 to-teal-100 text-2xl font-black text-emerald-700 ring-4 ring-white shadow-xl">
                    <img
                      v-if="detailUser.avatar"
                      :src="detailUser.avatar"
                      :alt="detailUser.name"
                      class="h-full w-full object-cover"
                    />
                    <span v-else>{{ initials(detailUser.name) }}</span>
                  </div>
                  <h4 class="mt-3 text-xl font-black text-slate-900">{{ detailUser.name }}</h4>
                  <p class="text-sm text-slate-500">{{ detailUser.email }}</p>

                  <div class="mt-3 flex flex-wrap items-center justify-center gap-2">
                    <span class="inline-flex items-center gap-1.5 rounded-lg px-3 py-1 text-xs font-bold" :class="roleClass(detailUser.role)">
                      {{ roleLabel(detailUser.role) }}
                    </span>
                    <span class="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold" :class="statusClass(detailUser)">
                      <span class="h-1.5 w-1.5 rounded-full" :class="statusDot(detailUser)"></span>
                      {{ statusLabel(detailUser) }}
                    </span>
                  </div>
                </div>

                <div class="space-y-3">
                  <div class="rounded-xl border border-slate-100 bg-slate-50 p-3">
                    <p class="text-[10px] font-bold uppercase tracking-wider text-slate-400">Phone Number</p>
                    <p class="mt-1 font-mono text-sm font-bold text-slate-900">
                      {{ getPhone(detailUser) || '—' }}
                    </p>
                  </div>

                  <div class="rounded-xl border border-slate-100 bg-slate-50 p-3">
                    <p class="text-[10px] font-bold uppercase tracking-wider text-slate-400">City</p>
                    <p class="mt-1 text-sm font-bold text-slate-900">
                      {{ detailUser.city || '—' }}
                    </p>
                  </div>

                  <div class="rounded-xl border border-slate-100 bg-slate-50 p-3">
                    <p class="text-[10px] font-bold uppercase tracking-wider text-slate-400">Joined</p>
                    <p class="mt-1 text-sm font-bold text-slate-900">
                      {{ formatDate(detailUser.created_at) }}
                    </p>
                  </div>

                  <div class="rounded-xl border border-slate-100 bg-slate-50 p-3">
                    <p class="text-[10px] font-bold uppercase tracking-wider text-slate-400">User ID</p>
                    <p class="mt-1 font-mono text-sm font-bold text-slate-900">
                      #{{ detailUser.id }}
                    </p>
                  </div>
                </div>

                <div class="space-y-2 border-t border-slate-100 pt-4">
                  <p class="text-[10px] font-bold uppercase tracking-wider text-slate-400">Quick Actions</p>

                  <div class="grid grid-cols-2 gap-2">
                    <button
                      v-if="statusLabel(detailUser) !== 'Blocked'"
                      @click="changeStatus(detailUser, 'blocked').then(() => detailUser = null)"
                      class="flex items-center justify-center gap-1.5 rounded-xl bg-red-50 px-3 py-2.5 text-xs font-bold text-red-700 ring-1 ring-red-200 transition hover:bg-red-100"
                    >
                      <Ban :size="14" /> Block
                    </button>

                    <button
                      v-else
                      @click="changeStatus(detailUser, 'active').then(() => detailUser = null)"
                      class="flex items-center justify-center gap-1.5 rounded-xl bg-emerald-50 px-3 py-2.5 text-xs font-bold text-emerald-700 ring-1 ring-emerald-200 transition hover:bg-emerald-100"
                    >
                      <Check :size="14" /> Activate
                    </button>

                    <button
                      type="button"
                      @click="goToFullProfile(detailUser.id)"
                      class="flex items-center justify-center gap-1.5 rounded-xl bg-slate-900 px-3 py-2.5 text-xs font-bold text-white ring-1 ring-slate-900 transition hover:bg-slate-800"
                    >
                      <ExternalLink :size="14" /> Full Profile
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </Transition>
    </Teleport>

    <div v-if="openMenuId !== null" class="fixed inset-0 z-10" @click="openMenuId = null"></div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import {
  Search, RefreshCw, Loader2, MoreVertical, Eye, X,
  AlertCircle, Check, Ban, ChevronLeft, ChevronRight,
  ExternalLink, Users as UsersIcon, Shield, Handshake,
} from 'lucide-vue-next'
import { useAuthStore } from '~/stores/auth'

definePageMeta({ layout: 'admin' })

/* ═══════════════════════════════════════════
   TYPES
   ═══════════════════════════════════════════ */
interface UserRow {
  id: number
  name: string
  email: string
  phone?: string | null
  phone_number?: string | null
  phoneNumber?: string | null
  phone_full?: string | null
  phone_country_code?: string | null
  phone_country_iso?: string | null
  role: string
  status?: string | null
  avatar?: string | null
  city?: string | null
  created_at?: string
  is_active?: boolean
}

/* ═══════════════════════════════════════════
   SETUP
   ═══════════════════════════════════════════ */
const config = useRuntimeConfig()
const authStore = useAuthStore()
const router = useRouter()

const users = ref<UserRow[]>([])
const loading = ref(false)
const bulkProcessing = ref(false)
const error = ref('')
const search = ref('')
const roleFilter = ref<'all' | 'admin' | 'partner' | 'owner' | 'user'>('all')
const statusFilter = ref<'all' | 'active' | 'pending' | 'blocked'>('all')
const sortBy = ref<'newest' | 'oldest' | 'name' | 'role'>('newest')
const processingId = ref<number | null>(null)
const openMenuId = ref<number | null>(null)
const selectedIds = ref<number[]>([])
const detailUser = ref<UserRow | null>(null)
const page = ref(1)
const perPage = 10

const roleOptions: Array<'admin' | 'partner' | 'user'> = ['admin', 'partner', 'user']

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
   PHONE HELPER
   ═══════════════════════════════════════════ */
const getPhone = (user: any): string => {
  const raw =
    user?.phone_full ||
    user?.phone_number ||
    user?.phone ||
    user?.phoneNumber ||
    ''
  return String(raw).trim()
}

/* ═══════════════════════════════════════════
   ✅ FIXED: filteredUsers computed
   — everything inside the callback
   ═══════════════════════════════════════════ */
const filteredUsers = computed(() => {
  const q = search.value.trim().toLowerCase()

  // 1) Filter
  let list = users.value.filter(user => {
    const phone = getPhone(user).toLowerCase()

    const matchesSearch =
      !q ||
      user.name?.toLowerCase().includes(q) ||
      user.email?.toLowerCase().includes(q) ||
      phone.includes(q)

    const matchesRole =
      roleFilter.value === 'all' ||
      user.role?.toLowerCase() === roleFilter.value

    const effectiveStatus =
      (user.status === 'blocked' || user.is_active === false)
        ? 'blocked'
        : (user.status || 'active')

    const matchesStatus =
      statusFilter.value === 'all' ||
      effectiveStatus === statusFilter.value

    return matchesSearch && matchesRole && matchesStatus
  })

  // 2) Sort
  list = [...list].sort((a, b) => {
    if (sortBy.value === 'newest') {
      return new Date(b.created_at || 0).getTime() -
             new Date(a.created_at || 0).getTime()
    }
    if (sortBy.value === 'oldest') {
      return new Date(a.created_at || 0).getTime() -
             new Date(b.created_at || 0).getTime()
    }
    if (sortBy.value === 'name') {
      return (a.name || '').localeCompare(b.name || '')
    }
    if (sortBy.value === 'role') {
      return (a.role || '').localeCompare(b.role || '')
    }
    return 0
  })

  // 3) Return
  return list
})

const totalPages = computed(() => Math.max(1, Math.ceil(filteredUsers.value.length / perPage)))
const pageStart = computed(() => (page.value - 1) * perPage)
const pageEnd = computed(() => Math.min(pageStart.value + perPage, filteredUsers.value.length))
const paginatedUsers = computed(() => filteredUsers.value.slice(pageStart.value, pageEnd.value))

const allSelected = computed(() =>
  paginatedUsers.value.length > 0 &&
  paginatedUsers.value.every(u => selectedIds.value.includes(u.id))
)

const stats = computed(() => [
  {
    label: 'Total Users',
    value: users.value.length,
    icon: UsersIcon,
    bg: 'bg-blue-50',
    color: 'text-blue-600',
    accent: 'bg-gradient-to-r from-blue-400 to-indigo-500',
  },
  {
    label: 'Admins',
    value: users.value.filter(u => u.role === 'admin').length,
    icon: Shield,
    bg: 'bg-purple-50',
    color: 'text-purple-600',
    accent: 'bg-gradient-to-r from-purple-400 to-fuchsia-500',
  },
  {
    label: 'Partners',
    value: users.value.filter(u => u.role === 'partner' || u.role === 'owner').length,
    icon: Handshake,
    bg: 'bg-emerald-50',
    color: 'text-emerald-600',
    accent: 'bg-gradient-to-r from-emerald-400 to-teal-500',
  },
  {
    label: 'Blocked',
    value: users.value.filter(u => u.status === 'blocked' || u.is_active === false).length,
    icon: Ban,
    bg: 'bg-red-50',
    color: 'text-red-600',
    accent: 'bg-gradient-to-r from-red-400 to-rose-500',
  },
])

/* ═══════════════════════════════════════════
   HELPERS
   ═══════════════════════════════════════════ */
const initials = (name: string) =>
  String(name || '?')
    .split(' ')
    .slice(0, 2)
    .map(v => v.charAt(0))
    .join('')
    .toUpperCase() || '?'

const roleLabel = (role?: string) => {
  const r = String(role || '').toLowerCase()
  if (r === 'admin') return 'Admin'
  if (r === 'partner') return 'Partner'
  if (r === 'owner') return 'Owner'
  if (r === 'user') return 'User'
  return r ? r.charAt(0).toUpperCase() + r.slice(1) : 'User'
}

const roleClass = (role?: string) => {
  const r = String(role || '').toLowerCase()
  if (r === 'admin') return 'bg-purple-100 text-purple-700 ring-1 ring-purple-200'
  if (r === 'partner' || r === 'owner') return 'bg-emerald-100 text-emerald-700 ring-1 ring-emerald-200'
  return 'bg-slate-100 text-slate-700 ring-1 ring-slate-200'
}

const statusLabel = (user: UserRow) => {
  if (user.status === 'blocked' || user.is_active === false) return 'Blocked'
  if (user.status === 'pending') return 'Pending'
  return 'Active'
}

const statusClass = (user: UserRow) => {
  const s = statusLabel(user)
  if (s === 'Blocked') return 'bg-red-100 text-red-700 ring-1 ring-red-200'
  if (s === 'Pending') return 'bg-amber-100 text-amber-700 ring-1 ring-amber-200'
  return 'bg-emerald-100 text-emerald-700 ring-1 ring-emerald-200'
}

const statusDot = (user: UserRow) => {
  const s = statusLabel(user)
  if (s === 'Blocked') return 'bg-red-500'
  if (s === 'Pending') return 'bg-amber-500'
  return 'bg-emerald-500'
}

const formatDate = (value?: string) => {
  if (!value) return '—'
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return '—'
  return new Intl.DateTimeFormat('en-ET-u-ca-gregory', {
    day: '2-digit', month: 'short', year: 'numeric',
    timeZone: 'Africa/Addis_Ababa',
  }).format(date)
}

const onAvatarError = (event: Event) => {
  (event.target as HTMLImageElement).style.display = 'none'
}

const toggleMenu = (id: number) => {
  openMenuId.value = openMenuId.value === id ? null : id
}

const openDetail = (user: UserRow) => {
  detailUser.value = user
}

/**
 * Close the drawer and navigate to full profile page.
 */
const goToFullProfile = (id: number) => {
  detailUser.value = null
  openMenuId.value = null
  router.push(`/admin/users/${id}`)
}

const toggleSelectAll = (event: Event) => {
  const checked = (event.target as HTMLInputElement).checked
  if (checked) {
    selectedIds.value = paginatedUsers.value.map(u => u.id)
  } else {
    selectedIds.value = []
  }
}

watch([search, roleFilter, statusFilter, sortBy], () => {
  page.value = 1
})

/* ═══════════════════════════════════════════
   API ACTIONS
   ═══════════════════════════════════════════ */
async function loadUsers() {
  loading.value = true
  error.value = ''

  try {
    const response: any = await $fetch(`${apiBase.value}/admin/users`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
        Accept: 'application/json',
      },
    })

    const rows = response?.data ?? response?.users ?? response ?? []
    users.value = Array.isArray(rows) ? rows : []

    if (import.meta.client && users.value.length > 0) {
      console.log('🔎 First user from API:', users.value[0])
    }
  } catch (err: any) {
    console.error('Load users error:', err)
    error.value =
      err?.data?.message ||
      err?.response?._data?.message ||
      'Unable to load users. Check the Laravel API.'
    users.value = []
  } finally {
    loading.value = false
  }
}

async function changeRole(user: UserRow, role: string) {
  processingId.value = user.id
  openMenuId.value = null
  error.value = ''

  try {
    await $fetch(`${apiBase.value}/admin/users/${user.id}/role`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${getToken()}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: { role },
    })

    user.role = role
  } catch (err: any) {
    console.error('Change role error:', err)
    error.value = err?.data?.message || 'Could not change the user role.'
  } finally {
    processingId.value = null
  }
}

async function changeStatus(user: UserRow, status: 'active' | 'blocked') {
  processingId.value = user.id
  openMenuId.value = null
  error.value = ''

  try {
    await $fetch(`${apiBase.value}/admin/users/${user.id}/status`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${getToken()}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: { status },
    })

    user.status = status
    user.is_active = status === 'active'
  } catch (err: any) {
    console.error('Change status error:', err)
    error.value = err?.data?.message || 'Could not change the user status.'
  } finally {
    processingId.value = null
  }
}

async function bulkAction(status: 'active' | 'blocked') {
  if (selectedIds.value.length === 0) return

  bulkProcessing.value = true
  error.value = ''

  try {
    await Promise.all(
      selectedIds.value.map(id =>
        $fetch(`${apiBase.value}/admin/users/${id}/status`, {
          method: 'PATCH',
          headers: {
            Authorization: `Bearer ${getToken()}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: { status },
        }).catch(() => null)
      )
    )

    users.value = users.value.map(u =>
      selectedIds.value.includes(u.id)
        ? { ...u, status, is_active: status === 'active' }
        : u
    )

    selectedIds.value = []
  } catch (err: any) {
    console.error('Bulk action error:', err)
    error.value = 'Some users could not be updated.'
  } finally {
    bulkProcessing.value = false
  }
}

onMounted(loadUsers)
</script>