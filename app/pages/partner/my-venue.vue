```vue
<template>
  <div class="min-h-full bg-slate-50">

    <div class="border-b border-slate-200 bg-white">
      <div class="mx-auto max-w-[1500px] px-6 py-7 lg:px-8">
        <p class="text-sm font-semibold text-emerald-600">
          My Sport Field
        </p>

        <div class="mt-1 flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 class="text-2xl font-black text-slate-900">
              Sarbet Futsal Arena
            </h1>

            <p class="mt-1 text-sm text-slate-500">
              Manage your venue information and availability.
            </p>
          </div>

          <button
            class="rounded-xl bg-emerald-600 px-5 py-3 text-sm font-bold text-white hover:bg-emerald-700"
          >
            ✏ Edit Venue
          </button>
        </div>
      </div>
    </div>

    <div class="mx-auto max-w-[1500px] px-6 py-7 lg:px-8">

      <!-- HERO -->
      <div class="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-200">

        <div class="h-64 bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-900">
          <div class="flex h-full items-end p-7">
            <div>
              <span class="rounded-full bg-emerald-500 px-3 py-1 text-xs font-bold text-white">
                ACTIVE
              </span>

              <h2 class="mt-3 text-3xl font-black text-white">
                Sarbet Futsal Arena
              </h2>

              <p class="mt-2 text-sm text-slate-300">
                📍 Sarbet, Bole, Addis Ababa
              </p>
            </div>
          </div>
        </div>

        <div class="grid divide-y divide-slate-100 md:grid-cols-4 md:divide-x md:divide-y-0">

          <div class="p-6">
            <p class="text-xs text-slate-500">Sport Type</p>
            <p class="mt-2 font-black text-slate-900">Futsal</p>
          </div>

          <div class="p-6">
            <p class="text-xs text-slate-500">Price / Hour</p>
            <p class="mt-2 font-black text-slate-900">ETB 1,500</p>
          </div>

          <div class="p-6">
            <p class="text-xs text-slate-500">Capacity</p>
            <p class="mt-2 font-black text-slate-900">14 Players</p>
          </div>

          <div class="p-6">
            <p class="text-xs text-slate-500">Rating</p>
            <p class="mt-2 font-black text-slate-900">4.8 / 5.0</p>
          </div>

        </div>
      </div>

      <!-- INFORMATION -->
      <div class="mt-7 grid gap-7 lg:grid-cols-2">

        <section class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 class="font-black text-slate-900">
            Venue Information
          </h2>

          <div class="mt-6 space-y-5">

            <div>
              <p class="text-xs font-semibold text-slate-400">Venue Name</p>
              <p class="mt-1 font-bold text-slate-900">Sarbet Futsal Arena</p>
            </div>

            <div>
              <p class="text-xs font-semibold text-slate-400">City</p>
              <p class="mt-1 font-bold text-slate-900">Addis Ababa</p>
            </div>

            <div>
              <p class="text-xs font-semibold text-slate-400">Sub City</p>
              <p class="mt-1 font-bold text-slate-900">Kirkos</p>
            </div>

            <div>
              <p class="text-xs font-semibold text-slate-400">Sport</p>
              <p class="mt-1 font-bold text-slate-900">Futsal</p>
            </div>

          </div>
        </section>

        <section class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 class="font-black text-slate-900">
            Facilities
          </h2>

          <div class="mt-6 grid grid-cols-2 gap-3">

            <div
              v-for="facility in facilities"
              :key="facility"
              class="rounded-xl bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700"
            >
              ✓ {{ facility }}
            </div>

          </div>
        </section>

      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'partner',
})

const facilities = [
  'Flood Lights',
  'Changing Room',
  'Parking',
  'Water',
  'Rest Room',
  'First Aid',
  'Security',
  'Seating',
]
</script>
```
