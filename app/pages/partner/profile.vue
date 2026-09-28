```vue
<template>
  <div class="min-h-full bg-slate-50">

    <section class="border-b border-slate-200 bg-white">
      <div class="mx-auto max-w-[1500px] px-6 py-7 lg:px-8">

        <p class="text-sm font-semibold text-emerald-600">
          Account
        </p>

        <h1 class="mt-1 text-2xl font-black text-slate-900">
          Profile
        </h1>

        <p class="mt-1 text-sm text-slate-500">
          Manage your partner account information.
        </p>

      </div>
    </section>

    <div class="mx-auto max-w-[1100px] px-6 py-7 lg:px-8">

      <!-- PROFILE HEADER -->
      <section class="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

        <div class="h-36 bg-gradient-to-r from-slate-900 to-emerald-800"></div>

        <div class="px-6 pb-7">

          <div class="-mt-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

            <div class="flex items-end gap-4">

              <div class="flex h-24 w-24 items-center justify-center rounded-3xl border-4 border-white bg-emerald-100 text-3xl font-black text-emerald-700 shadow-sm">
                AM
              </div>

              <div class="pb-1">
                <h2 class="text-xl font-black text-slate-900">
                  Alemu Mekete
                </h2>

                <p class="mt-1 text-sm text-slate-500">
                  Venue Partner · CombolojoSPORT
                </p>
              </div>

            </div>

            <button
              class="rounded-xl bg-emerald-600 px-5 py-3 text-sm font-bold text-white hover:bg-emerald-700"
              @click="saveProfile"
            >
              Save Changes
            </button>

          </div>

        </div>

      </section>

      <!-- FORM -->
      <section class="mt-7 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

        <h2 class="font-black text-slate-900">
          Personal Information
        </h2>

        <div class="mt-6 grid gap-5 md:grid-cols-2">

          <div>
            <label class="text-xs font-bold text-slate-500">
              Full Name
            </label>

            <input
              v-model="form.name"
              class="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label class="text-xs font-bold text-slate-500">
              Email
            </label>

            <input
              v-model="form.email"
              type="email"
              class="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label class="text-xs font-bold text-slate-500">
              Phone Number
            </label>

            <input
              v-model="form.phone"
              class="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label class="text-xs font-bold text-slate-500">
              Role
            </label>

            <input
              value="Venue Partner"
              disabled
              class="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-500"
            />
          </div>

        </div>

      </section>

      <!-- VENUE -->
      <section class="mt-7 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

        <h2 class="font-black text-slate-900">
          Partner Venue
        </h2>

        <div class="mt-6 rounded-2xl bg-slate-50 p-5">

          <div class="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

            <div>
              <p class="font-black text-slate-900">
                Sarbet Futsal Arena
              </p>

              <p class="mt-1 text-xs text-slate-500">
                📍 Bole, Addis Ababa · Futsal
              </p>
            </div>

            <span class="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700">
              Active
            </span>

          </div>

        </div>

      </section>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

definePageMeta({
  layout: 'partner',
})

const form = ref({
  name: 'Alemu Mekete',
  email: 'partner@combolojo.com',
  phone: '0911 234 567',
})

function saveProfile() {
  console.log('Profile saved', form.value)
}
</script>
```
