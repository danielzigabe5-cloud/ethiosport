<template>
  <div class="min-h-full bg-gradient-to-br from-slate-50 via-white to-emerald-50/30 p-4 sm:p-6 lg:p-8">
    <div class="mx-auto max-w-5xl space-y-6">

      <!-- ═══════ HEADER ═══════ -->
      <div class="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div class="flex items-center gap-2 text-sm font-semibold text-slate-500">
            <NuxtLink to="/admin" class="transition hover:text-emerald-600">Dashboard</NuxtLink>
            <span>/</span>
            <span class="text-slate-700">Settings</span>
          </div>
          <h1 class="mt-2 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
            Platform Settings
          </h1>
          <p class="mt-1 text-sm text-slate-500">
            Control every aspect of your CombolojoSPORT platform.
          </p>
        </div>

        <button
          @click="saveAll"
          :disabled="saving"
          class="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-emerald-500/30 transition hover:from-emerald-600 hover:to-teal-700 disabled:opacity-60"
        >
          <Loader2 v-if="saving" class="animate-spin" :size="16" />
          <Save v-else :size="16" />
          {{ saving ? 'Saving…' : 'Save All Changes' }}
        </button>
      </div>

      <!-- ═══════ STATUS BANNER ═══════ -->
      <Transition
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="opacity-0 -translate-y-2"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition duration-200"
        leave-to-class="opacity-0"
      >
        <div
          v-if="status.text"
          :class="status.isError
            ? 'border-red-200 bg-red-50 text-red-800'
            : 'border-emerald-200 bg-emerald-50 text-emerald-800'"
          class="flex items-center gap-3 rounded-2xl border p-4 text-sm font-semibold shadow-sm"
        >
          <component :is="status.isError ? AlertCircle : CheckCircle" :size="18" class="shrink-0" />
          <span>{{ status.text }}</span>
        </div>
      </Transition>

      <!-- ═══════ TABS ═══════ -->
      <div class="flex gap-1 overflow-x-auto rounded-2xl border border-slate-200 bg-white p-1.5 shadow-sm">
        <button
          v-for="tab in tabs"
          :key="tab.value"
          @click="activeTab = tab.value"
          :class="[
            'flex items-center gap-2 whitespace-nowrap rounded-xl px-4 py-2.5 text-xs font-bold transition-all',
            activeTab === tab.value
              ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-md shadow-emerald-500/30'
              : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
          ]"
        >
          <component :is="tab.icon" :size="15" />
          {{ tab.label }}
        </button>
      </div>

      <!-- ═══════════════════════════════════════════
           GENERAL TAB
           ═══════════════════════════════════════════ -->
      <div v-show="activeTab === 'general'" class="space-y-6">
        <div class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div class="flex items-center gap-3 border-b border-slate-100 bg-gradient-to-r from-emerald-50 to-teal-50 px-6 py-5">
            <div class="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-md">
              <Globe :size="20" />
            </div>
            <div>
              <h2 class="text-lg font-black text-slate-900">General Settings</h2>
              <p class="text-xs text-slate-500">Basic platform information</p>
            </div>
          </div>

          <div class="grid grid-cols-1 gap-5 p-6 md:grid-cols-2">
            <div>
              <label class="mb-1.5 block text-xs font-bold text-slate-600">Platform Name</label>
              <input
                v-model="settings.platform_name"
                type="text"
                class="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10"
              />
            </div>

            <div>
              <label class="mb-1.5 block text-xs font-bold text-slate-600">Main City</label>
              <input
                v-model="settings.city"
                type="text"
                class="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10"
              />
            </div>

            <div>
              <label class="mb-1.5 block text-xs font-bold text-slate-600">Admin Email</label>
              <input
                v-model="settings.admin_email"
                type="email"
                class="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10"
              />
            </div>

            <div>
              <label class="mb-1.5 block text-xs font-bold text-slate-600">Support Phone</label>
              <input
                v-model="settings.support_phone"
                type="tel"
                class="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10"
              />
            </div>

            <div>
              <label class="mb-1.5 block text-xs font-bold text-slate-600">Currency</label>
              <select
                v-model="settings.currency"
                class="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none transition focus:border-emerald-500 focus:bg-white"
              >
                <option value="ETB">ETB — Ethiopian Birr</option>
                <option value="USD">USD — US Dollar</option>
                <option value="EUR">EUR — Euro</option>
              </select>
            </div>

            <div>
              <label class="mb-1.5 block text-xs font-bold text-slate-600">Timezone</label>
              <select
                v-model="settings.timezone"
                class="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none transition focus:border-emerald-500 focus:bg-white"
              >
                <option value="Africa/Addis_Ababa">Africa/Addis Ababa</option>
                <option value="Africa/Nairobi">Africa/Nairobi</option>
                <option value="UTC">UTC</option>
              </select>
            </div>

            <div class="md:col-span-2">
              <label class="mb-1.5 block text-xs font-bold text-slate-600">Platform Description</label>
              <textarea
                v-model="settings.description"
                rows="3"
                placeholder="Short description shown to users..."
                class="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10"
              ></textarea>
            </div>
          </div>
        </div>
      </div>

      <!-- ═══════════════════════════════════════════
           NOTIFICATIONS TAB
           ═══════════════════════════════════════════ -->
      <div v-show="activeTab === 'notifications'" class="space-y-6">
        <div class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div class="flex items-center gap-3 border-b border-slate-100 bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-5">
            <div class="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-md">
              <Bell :size="20" />
            </div>
            <div>
              <h2 class="text-lg font-black text-slate-900">Notifications</h2>
              <p class="text-xs text-slate-500">Control what alerts you receive</p>
            </div>
          </div>

          <div class="divide-y divide-slate-100">
            <ToggleRow
              v-model="settings.notify_new_bookings"
              title="New Booking Alerts"
              description="Get notified when a customer makes a new booking."
            />
            <ToggleRow
              v-model="settings.notify_new_users"
              title="New User Registrations"
              description="Receive alerts when new users register on the platform."
            />
            <ToggleRow
              v-model="settings.notify_new_venues"
              title="New Venue Submissions"
              description="Know instantly when a partner submits a venue for approval."
            />
            <ToggleRow
              v-model="settings.notify_payouts"
              title="Payout Requests"
              description="Get notified when partners request payouts."
            />
            <ToggleRow
              v-model="settings.notify_emails"
              title="Email Notifications"
              description="Send email copies of notifications to your inbox."
            />
            <ToggleRow
              v-model="settings.notify_sms"
              title="SMS Notifications"
              description="Receive SMS alerts for critical events."
            />
          </div>
        </div>
      </div>

      <!-- ═══════════════════════════════════════════
           SECURITY TAB
           ═══════════════════════════════════════════ -->
      <div v-show="activeTab === 'security'" class="space-y-6">
        <div class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div class="flex items-center gap-3 border-b border-slate-100 bg-gradient-to-r from-amber-50 to-orange-50 px-6 py-5">
            <div class="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-md">
              <Shield :size="20" />
            </div>
            <div>
              <h2 class="text-lg font-black text-slate-900">Security</h2>
              <p class="text-xs text-slate-500">Protect your admin account</p>
            </div>
          </div>

          <div class="divide-y divide-slate-100">
            <ToggleRow
              v-model="settings.require_2fa"
              title="Two-Factor Authentication"
              description="Require 2FA for all admin logins."
              tone="amber"
            />
            <ToggleRow
              v-model="settings.force_password_change"
              title="Force Password Rotation"
              description="Require admins to change passwords every 90 days."
              tone="amber"
            />
            <ToggleRow
              v-model="settings.ip_whitelist"
              title="IP Whitelist for Admin"
              description="Only allow admin access from approved IPs."
              tone="amber"
            />
            <ToggleRow
              v-model="settings.maintenance_mode"
              title="Maintenance Mode"
              description="Show a maintenance page to all non-admin users."
              tone="red"
            />
          </div>

          <div class="border-t border-slate-100 bg-slate-50 px-6 py-4">
            <p class="text-xs text-slate-500">
              Session timeout:
              <span class="font-bold text-slate-900">{{ settings.session_timeout }} minutes</span>
            </p>
            <input
              v-model.number="settings.session_timeout"
              type="range"
              min="15"
              max="480"
              step="15"
              class="mt-3 w-full accent-emerald-500"
            />
            <div class="mt-2 flex justify-between text-[10px] font-bold text-slate-400">
              <span>15 min</span>
              <span>8 hours</span>
            </div>
          </div>
        </div>

        <!-- Change password CTA -->
        <div class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div class="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div class="flex items-start gap-3">
              <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-red-600">
                <KeyRound :size="18" />
              </div>
              <div>
                <h3 class="font-black text-slate-900">Change Admin Password</h3>
                <p class="mt-0.5 text-xs text-slate-500">
                  Update your password regularly for better security.
                </p>
              </div>
            </div>
            <NuxtLink
              to="/admin/profile"
              class="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-bold text-slate-700 transition hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700"
            >
              Change Password →
            </NuxtLink>
          </div>
        </div>
      </div>

      <!-- ═══════════════════════════════════════════
           PAYMENTS TAB
           ═══════════════════════════════════════════ -->
      <div v-show="activeTab === 'payments'" class="space-y-6">
        <div class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div class="flex items-center gap-3 border-b border-slate-100 bg-gradient-to-r from-violet-50 to-fuchsia-50 px-6 py-5">
            <div class="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-600 text-white shadow-md">
              <CreditCard :size="20" />
            </div>
            <div>
              <h2 class="text-lg font-black text-slate-900">Payment Settings</h2>
              <p class="text-xs text-slate-500">Configure payment gateways and fees</p>
            </div>
          </div>

          <div class="space-y-6 p-6">

            <!-- Chapa -->
            <div class="rounded-2xl border-2 border-emerald-200 bg-gradient-to-br from-emerald-50 to-teal-50 p-5">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-3">
                  <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-2xl shadow-sm">
                    💳
                  </div>
                  <div>
                    <h3 class="font-black text-slate-900">Chapa Payment</h3>
                    <p class="text-xs text-slate-600">Ethiopian payment gateway</p>
                  </div>
                </div>
                <span
                  class="rounded-full px-3 py-1 text-xs font-bold"
                  :class="settings.chapa_enabled
                    ? 'bg-emerald-500 text-white'
                    : 'bg-slate-300 text-slate-600'"
                >
                  {{ settings.chapa_enabled ? 'Enabled' : 'Disabled' }}
                </span>
              </div>

              <div class="mt-4 space-y-3">
                <ToggleRow
                  v-model="settings.chapa_enabled"
                  title="Enable Chapa"
                  description="Allow customers to pay via Chapa."
                  compact
                />
                <div>
                  <label class="mb-1.5 block text-xs font-bold text-slate-600">Chapa API Key</label>
                  <input
                    v-model="settings.chapa_public_key"
                    type="text"
                    placeholder="CHAPUBK-..."
                    class="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 font-mono text-xs outline-none transition focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label class="mb-1.5 block text-xs font-bold text-slate-600">Chapa Secret Key</label>
                  <input
                    v-model="settings.chapa_secret_key"
                    type="password"
                    placeholder="CHASECK-..."
                    class="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 font-mono text-xs outline-none transition focus:border-emerald-500"
                  />
                </div>
              </div>
            </div>

            <!-- Fees -->
            <div class="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <h3 class="font-black text-slate-900">💰 Platform Fees</h3>
              <p class="mt-1 text-xs text-slate-500">Commission rates and payout minimums</p>

              <div class="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div>
                  <label class="mb-1.5 block text-xs font-bold text-slate-600">Commission (%)</label>
                  <input
                    v-model.number="settings.commission_rate"
                    type="number"
                    min="0"
                    max="100"
                    step="0.5"
                    class="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label class="mb-1.5 block text-xs font-bold text-slate-600">Min Payout (ETB)</label>
                  <input
                    v-model.number="settings.min_payout"
                    type="number"
                    min="0"
                    step="50"
                    class="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label class="mb-1.5 block text-xs font-bold text-slate-600">Payout Delay (days)</label>
                  <input
                    v-model.number="settings.payout_delay_days"
                    type="number"
                    min="0"
                    max="30"
                    class="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-emerald-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ═══════════════════════════════════════════
           ADVANCED TAB
           ═══════════════════════════════════════════ -->
      <div v-show="activeTab === 'advanced'" class="space-y-6">
        <div class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div class="flex items-center gap-3 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-slate-100 px-6 py-5">
            <div class="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-slate-700 to-slate-900 text-white shadow-md">
              <SlidersHorizontal :size="20" />
            </div>
            <div>
              <h2 class="text-lg font-black text-slate-900">Advanced</h2>
              <p class="text-xs text-slate-500">Fine-tune platform behavior</p>
            </div>
          </div>

          <div class="divide-y divide-slate-100">
            <ToggleRow
              v-model="settings.auto_approve_venues"
              title="Auto-Approve Venues"
              description="Automatically approve new venues without manual review."
            />
            <ToggleRow
              v-model="settings.allow_registration"
              title="Allow User Registration"
              description="Let new users create accounts."
            />
            <ToggleRow
              v-model="settings.allow_bookings"
              title="Allow Bookings"
              description="Enable booking functionality across the platform."
            />
            <ToggleRow
              v-model="settings.show_prices"
              title="Show Prices to Guests"
              description="Display pricing to users who aren't logged in."
              tone="amber"
            />
          </div>

          <!-- Danger zone -->
          <div class="border-t-2 border-red-100 bg-red-50/50 p-6">
            <div class="flex items-start gap-3">
              <div class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-red-100 text-red-600">
                <AlertTriangle :size="18" />
              </div>
              <div class="flex-1">
                <h3 class="font-black text-red-900">Danger Zone</h3>
                <p class="mt-1 text-xs text-red-700">
                  These actions are irreversible. Be careful.
                </p>

                <div class="mt-4 space-y-2">
                  <button
                    type="button"
                    @click="clearCache"
                    class="inline-flex w-full items-center gap-2 rounded-xl border border-red-200 bg-white px-4 py-2.5 text-sm font-bold text-red-700 transition hover:bg-red-100 sm:w-auto"
                  >
                    <RefreshCw :size="15" />
                    Clear Platform Cache
                  </button>
                  <button
                    type="button"
                    @click="exportBackup"
                    class="inline-flex w-full items-center gap-2 rounded-xl border border-red-200 bg-white px-4 py-2.5 text-sm font-bold text-red-700 transition hover:bg-red-100 sm:w-auto"
                  >
                    <Download :size="15" />
                    Export Data Backup
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'
import {
  Save, Shield, Bell, Globe, CreditCard, Loader2, CheckCircle, AlertCircle,
  KeyRound, SlidersHorizontal, AlertTriangle, RefreshCw, Download,
} from 'lucide-vue-next'
import { useAuthStore } from '~/stores/auth'

definePageMeta({ layout: 'admin' })

/* ═══════════════════════════════════════════
   INLINE ToggleRow component
   ═══════════════════════════════════════════ */
const ToggleRow = defineComponent({
  props: {
    modelValue: { type: Boolean, required: true },
    title: { type: String, required: true },
    description: { type: String, default: '' },
    tone: { type: String, default: 'emerald' }, // emerald | amber | red
    compact: { type: Boolean, default: false },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const color = computed(() => {
      if (props.tone === 'amber') return 'bg-amber-500'
      if (props.tone === 'red') return 'bg-red-500'
      return 'bg-emerald-500'
    })

    return () => h(
      'div',
      { class: ['flex items-center justify-between gap-4', props.compact ? 'py-1' : 'px-6 py-4'] },
      [
        h('div', { class: 'min-w-0 flex-1' }, [
          h('p', { class: 'text-sm font-bold text-slate-800' }, props.title),
          props.description
            ? h('p', { class: 'mt-0.5 text-xs text-slate-500' }, props.description)
            : null,
        ]),
        h('button', {
          type: 'button',
          onClick: () => emit('update:modelValue', !props.modelValue),
          class: [
            'flex h-6 w-11 flex-shrink-0 items-center rounded-full p-0.5 transition',
            props.modelValue ? color.value : 'bg-slate-300',
          ],
        }, [
          h('span', {
            class: [
              'h-5 w-5 rounded-full bg-white shadow transition-transform',
              props.modelValue ? 'translate-x-5' : 'translate-x-0',
            ],
          }),
        ]),
      ]
    )
  },
})

/* ═══════════════════════════════════════════
   SETUP
   ═══════════════════════════════════════════ */
const config = useRuntimeConfig()
const authStore = useAuthStore()

const saving = ref(false)
const loading = ref(false)

const activeTab = ref<'general' | 'notifications' | 'security' | 'payments' | 'advanced'>('general')

const status = reactive({
  text: '',
  isError: false,
})

const tabs = [
  { label: 'General',       value: 'general',       icon: Globe              },
  { label: 'Notifications', value: 'notifications', icon: Bell               },
  { label: 'Security',      value: 'security',      icon: Shield             },
  { label: 'Payments',      value: 'payments',      icon: CreditCard         },
  { label: 'Advanced',      value: 'advanced',      icon: SlidersHorizontal  },
]

const settings = reactive({
  // General
  platform_name: 'CombolojoSPORT',
  city: 'Addis Ababa',
  admin_email: 'admin@combolojo.com',
  support_phone: '',
  currency: 'ETB',
  timezone: 'Africa/Addis_Ababa',
  description: '',

  // Notifications
  notify_new_bookings: true,
  notify_new_users: true,
  notify_new_venues: true,
  notify_payouts: true,
  notify_emails: true,
  notify_sms: false,

  // Security
  require_2fa: false,
  force_password_change: false,
  ip_whitelist: false,
  maintenance_mode: false,
  session_timeout: 120,

  // Payments
  chapa_enabled: false,
  chapa_public_key: '',
  chapa_secret_key: '',
  commission_rate: 10,
  min_payout: 500,
  payout_delay_days: 3,

  // Advanced
  auto_approve_venues: false,
  allow_registration: true,
  allow_bookings: true,
  show_prices: true,
})

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
   LOAD SETTINGS
   ═══════════════════════════════════════════ */
const loadSettings = async () => {
  loading.value = true
  try {
    const res: any = await $fetch(`${apiBase.value}/admin/settings`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
        Accept: 'application/json',
      },
    })

    const data = res?.data ?? res ?? {}
    Object.keys(settings).forEach((key) => {
      if (data[key] !== undefined && data[key] !== null) {
        (settings as any)[key] = data[key]
      }
    })
  } catch (e: any) {
    console.warn('Could not load settings from server, using defaults.')
  } finally {
    loading.value = false
  }
}

/* ═══════════════════════════════════════════
   SAVE ALL
   ═══════════════════════════════════════════ */
const saveAll = async () => {
  saving.value = true
  status.text = ''

  try {
    await $fetch(`${apiBase.value}/admin/settings`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${getToken()}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: settings,
    })

    status.text = 'All settings saved successfully!'
    status.isError = false
    setTimeout(() => (status.text = ''), 4000)
  } catch (e: any) {
    console.error('Save settings error:', e)
    status.text =
      e?.data?.message ||
      e?.response?._data?.message ||
      'Could not save settings.'
    status.isError = true
  } finally {
    saving.value = false
  }
}

/* ═══════════════════════════════════════════
   ACTIONS
   ═══════════════════════════════════════════ */
const clearCache = async () => {
  if (!confirm('Clear the platform cache?')) return
  try {
    await $fetch(`${apiBase.value}/admin/settings/clear-cache`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${getToken()}`,
        Accept: 'application/json',
      },
    })
    status.text = 'Cache cleared successfully.'
    status.isError = false
  } catch (e: any) {
    status.text = e?.data?.message || 'Could not clear cache.'
    status.isError = true
  }
}

const exportBackup = async () => {
  try {
    const blob = await $fetch(`${apiBase.value}/admin/settings/backup`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
      responseType: 'blob',
    })

    const url = URL.createObjectURL(blob as Blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `combolojo-backup-${Date.now()}.json`
    a.click()
    URL.revokeObjectURL(url)

    status.text = 'Backup downloaded.'
    status.isError = false
  } catch (e: any) {
    status.text = e?.data?.message || 'Could not export backup.'
    status.isError = true
  }
}

onMounted(loadSettings)
</script>