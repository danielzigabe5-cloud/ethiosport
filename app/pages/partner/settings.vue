
<template>
  <div class="min-h-full bg-slate-50">

    <section class="border-b border-slate-200 bg-white">
      <div class="mx-auto max-w-[1200px] px-6 py-7 lg:px-8">

        <p class="text-sm font-semibold text-emerald-600">
          Account
        </p>

        <h1 class="mt-1 text-2xl font-black text-slate-900">
          Settings
        </h1>

        <p class="mt-1 text-sm text-slate-500">
          Configure your partner dashboard and venue preferences.
        </p>

      </div>
    </section>

    <div class="mx-auto max-w-[1200px] px-6 py-7 lg:px-8">

      <!-- NOTIFICATIONS -->
      <section class="rounded-2xl border border-slate-200 bg-white shadow-sm">

        <div class="border-b border-slate-100 p-6">
          <h2 class="font-black text-slate-900">
            Notifications
          </h2>

          <p class="mt-1 text-xs text-slate-500">
            Choose which notifications you want to receive.
          </p>
        </div>

        <div class="divide-y divide-slate-100">

          <div
            v-for="item in notificationSettings"
            :key="item.key"
            class="flex items-center justify-between gap-5 p-6"
          >

            <div>
              <p class="text-sm font-bold text-slate-900">
                {{ item.title }}
              </p>

              <p class="mt-1 text-xs text-slate-500">
                {{ item.description }}
              </p>
            </div>

            <button
              class="relative h-6 w-11 shrink-0 rounded-full transition"
              :class="item.enabled ? 'bg-emerald-600' : 'bg-slate-300'"
              @click="item.enabled = !item.enabled"
            >
              <span
                class="absolute top-1 h-4 w-4 rounded-full bg-white shadow transition"
                :class="item.enabled ? 'left-6' : 'left-1'"
              />
            </button>

          </div>

        </div>

      </section>

      <!-- VENUE SETTINGS -->
      <section class="mt-7 rounded-2xl border border-slate-200 bg-white shadow-sm">

        <div class="border-b border-slate-100 p-6">
          <h2 class="font-black text-slate-900">
            Venue Settings
          </h2>
        </div>

        <div class="space-y-5 p-6">

          <div>
            <label class="text-xs font-bold text-slate-500">
              Default Booking Duration
            </label>

            <select
              v-model="venueSettings.duration"
              class="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-emerald-500"
            >
              <option>1 Hour</option>
              <option>2 Hours</option>
              <option>3 Hours</option>
            </select>
          </div>

          <div>
            <label class="text-xs font-bold text-slate-500">
              Cancellation Policy
            </label>

            <select
              v-model="venueSettings.cancellation"
              class="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-emerald-500"
            >
              <option>Free cancellation up to 24 hours</option>
              <option>Free cancellation up to 12 hours</option>
              <option>No cancellation</option>
            </select>
          </div>

          <div class="flex items-center justify-between rounded-2xl bg-slate-50 p-5">

            <div>
              <p class="text-sm font-bold text-slate-900">
                Accept Online Bookings
              </p>

              <p class="mt-1 text-xs text-slate-500">
                Allow customers to book your venue online.
              </p>
            </div>

            <button
              class="relative h-6 w-11 rounded-full transition"
              :class="venueSettings.onlineBooking ? 'bg-emerald-600' : 'bg-slate-300'"
              @click="venueSettings.onlineBooking = !venueSettings.onlineBooking"
            >
              <span
                class="absolute top-1 h-4 w-4 rounded-full bg-white shadow transition"
                :class="venueSettings.onlineBooking ? 'left-6' : 'left-1'"
              />
            </button>

          </div>

        </div>

      </section>

      <!-- SECURITY -->
      <section class="mt-7 rounded-2xl border border-slate-200 bg-white shadow-sm">

        <div class="border-b border-slate-100 p-6">
          <h2 class="font-black text-slate-900">
            Security
          </h2>
        </div>

        <div class="space-y-3 p-6">

          <button
            class="flex w-full items-center justify-between rounded-xl border border-slate-200 p-4 text-left hover:bg-slate-50"
          >
            <div>
              <p class="text-sm font-bold text-slate-900">
                Change Password
              </p>

              <p class="mt-1 text-xs text-slate-500">
                Update your account password.
              </p>
            </div>

            <span>→</span>
          </button>

          <button
            class="flex w-full items-center justify-between rounded-xl border border-slate-200 p-4 text-left hover:bg-slate-50"
          >
            <div>
              <p class="text-sm font-bold text-slate-900">
                Two-Factor Authentication
              </p>

              <p class="mt-1 text-xs text-slate-500">
                Add another layer of account security.
              </p>
            </div>

            <span class="rounded-full bg-slate-100 px-3 py-1 text-[10px] font-bold text-slate-500">
              OFF
            </span>
          </button>

        </div>

      </section>

      <!-- SAVE -->
      <div class="mt-7 flex justify-end">
        <button
          class="rounded-xl bg-emerald-600 px-6 py-3 text-sm font-bold text-white shadow-sm hover:bg-emerald-700"
          @click="saveSettings"
        >
          Save Settings
        </button>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

definePageMeta({
  layout: 'partner',
})

const notificationSettings = reactive([
  {
    key: 'booking',
    title: 'New Booking',
    description: 'Notify me when a customer makes a booking.',
    enabled: true,
  },
  {
    key: 'payment',
    title: 'Payment Received',
    description: 'Notify me when a booking payment is completed.',
    enabled: true,
  },
  {
    key: 'payout',
    title: 'Payout Updates',
    description: 'Notify me about payout status changes.',
    enabled: true,
  },
  {
    key: 'event',
    title: 'Event Updates',
    description: 'Notify me about events and registrations.',
    enabled: false,
  },
])

const venueSettings = reactive({
  duration: '1 Hour',
  cancellation: 'Free cancellation up to 24 hours',
  onlineBooking: true,
})

function saveSettings() {
  console.log('Settings saved', {
    notificationSettings,
    venueSettings,
  })
}
</script>

