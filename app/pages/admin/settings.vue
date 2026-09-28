<script setup lang="ts">
import { Save, Shield, Bell, Globe, CreditCard } from 'lucide-vue-next'

definePageMeta({
  layout: 'admin'
})

const platformName = ref('CombolojoSPORT')
const city = ref('Addis Ababa')
const email = ref('admin@combolojo.com')
const notifications = ref(true)
const maintenance = ref(false)

const saveSettings = () => {
  alert('Settings saved successfully!')
}
</script>

<template>
  <div class="mx-auto max-w-5xl space-y-6">

    <div>
      <h1 class="text-3xl font-black">Settings</h1>
      <p class="text-slate-500">
        Configure your CombolojoSPORT platform.
      </p>
    </div>

    <!-- General -->
    <div class="rounded-2xl bg-white p-6 shadow-sm">

      <div class="mb-6 flex items-center gap-3">
        <div class="rounded-xl bg-slate-100 p-3">
          <Globe :size="21" />
        </div>

        <div>
          <h2 class="font-bold">General Settings</h2>
          <p class="text-sm text-slate-500">
            Basic platform information
          </p>
        </div>
      </div>

      <div class="grid grid-cols-1 gap-5 md:grid-cols-2">

        <div>
          <label class="mb-2 block text-sm font-semibold">
            Platform Name
          </label>

          <input
            v-model="platformName"
            class="w-full rounded-xl border px-4 py-3 outline-none focus:border-[#94FF2B]"
          />
        </div>

        <div>
          <label class="mb-2 block text-sm font-semibold">
            Main City
          </label>

          <input
            v-model="city"
            class="w-full rounded-xl border px-4 py-3"
          />
        </div>

        <div>
          <label class="mb-2 block text-sm font-semibold">
            Admin Email
          </label>

          <input
            v-model="email"
            class="w-full rounded-xl border px-4 py-3"
          />
        </div>

      </div>
    </div>

    <!-- Notifications -->
    <div class="rounded-2xl bg-white p-6 shadow-sm">

      <div class="flex items-center gap-3">
        <div class="rounded-xl bg-slate-100 p-3">
          <Bell :size="21" />
        </div>

        <div>
          <h2 class="font-bold">Notifications</h2>
          <p class="text-sm text-slate-500">
            Manage admin notifications
          </p>
        </div>
      </div>

      <div class="mt-6 flex items-center justify-between border-t pt-5">

        <div>
          <p class="font-semibold">Booking Notifications</p>
          <p class="text-sm text-slate-500">
            Receive notifications for new bookings.
          </p>
        </div>

        <button
          @click="notifications = !notifications"
          class="h-7 w-12 rounded-full p-1 transition"
          :class="notifications ? 'bg-[#94FF2B]' : 'bg-slate-300'"
        >
          <div
            class="h-5 w-5 rounded-full bg-white transition"
            :class="notifications ? 'translate-x-5' : 'translate-x-0'"
          />
        </button>

      </div>

    </div>

    <!-- Security -->
    <div class="rounded-2xl bg-white p-6 shadow-sm">

      <div class="flex items-center gap-3">
        <div class="rounded-xl bg-slate-100 p-3">
          <Shield :size="21" />
        </div>

        <div>
          <h2 class="font-bold">Security</h2>
          <p class="text-sm text-slate-500">
            Protect your admin account
          </p>
        </div>
      </div>

      <button class="mt-6 rounded-xl border px-5 py-3 font-semibold hover:bg-slate-50">
        Change Admin Password
      </button>

    </div>

    <!-- Payments -->
    <div class="rounded-2xl bg-white p-6 shadow-sm">

      <div class="flex items-center gap-3">
        <div class="rounded-xl bg-slate-100 p-3">
          <CreditCard :size="21" />
        </div>

        <div>
          <h2 class="font-bold">Payment Settings</h2>
          <p class="text-sm text-slate-500">
            Configure payment services.
          </p>
        </div>
      </div>

      <div class="mt-6 rounded-xl bg-slate-50 p-5">
        <p class="font-bold">Chapa Payment</p>
        <p class="mt-1 text-sm text-slate-500">
          Payment gateway configuration will be connected to Laravel API.
        </p>
      </div>

    </div>

    <!-- Save -->
    <div class="flex justify-end">

      <button
        @click="saveSettings"
        class="flex items-center gap-2 rounded-xl bg-slate-950 px-6 py-3 font-bold text-white hover:bg-slate-800"
      >
        <Save :size="18" />
        Save Changes
      </button>

    </div>

  </div>
</template>