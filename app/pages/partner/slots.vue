```vue
<template>
  <div class="min-h-full bg-slate-50">

    <div class="border-b border-slate-200 bg-white">
      <div class="mx-auto max-w-[1500px] px-6 py-7 lg:px-8">
        <p class="text-sm font-semibold text-emerald-600">
          My Sport Field
        </p>

        <h1 class="mt-1 text-2xl font-black text-slate-900">
          Manage Slots
        </h1>

        <p class="mt-1 text-sm text-slate-500">
          Control when customers can book your sport field.
        </p>
      </div>
    </div>

    <div class="mx-auto max-w-[1500px] px-6 py-7 lg:px-8">

      <!-- CONTROLS -->
      <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

        <div class="flex flex-col justify-between gap-4 md:flex-row md:items-center">

          <div>
            <h2 class="font-black text-slate-900">
              Sarbet Futsal Arena
            </h2>

            <p class="mt-1 text-xs text-slate-500">
              ETB 1,500 / hour
            </p>
          </div>

          <button
            class="rounded-xl bg-emerald-600 px-5 py-3 text-sm font-bold text-white hover:bg-emerald-700"
          >
            + Add Time Slot
          </button>

        </div>

      </div>

      <!-- DAYS -->
      <div class="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">

        <button
          v-for="day in days"
          :key="day"
          class="rounded-2xl border p-4 text-left transition"
          :class="
            selectedDay === day
              ? 'border-emerald-500 bg-emerald-50'
              : 'border-slate-200 bg-white hover:border-emerald-300'
          "
          @click="selectedDay = day"
        >
          <p class="text-xs font-bold text-slate-400">
            {{ day.week }}
          </p>

          <p
            class="mt-1 text-lg font-black"
            :class="selectedDay === day ? 'text-emerald-700' : 'text-slate-900'"
          >
            {{ day.date }}
          </p>
        </button>

      </div>

      <!-- SLOTS -->
      <section class="mt-6 rounded-2xl border border-slate-200 bg-white shadow-sm">

        <div class="border-b border-slate-100 px-6 py-5">
          <h2 class="font-black text-slate-900">
            Available Time Slots
          </h2>

          <p class="mt-1 text-xs text-slate-500">
            {{ selectedDay.date }} · {{ selectedDay.week }}
          </p>
        </div>

        <div class="grid gap-3 p-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

          <div
            v-for="slot in slots"
            :key="slot.time"
            class="rounded-2xl border p-4"
            :class="
              slot.status === 'Available'
                ? 'border-emerald-200 bg-emerald-50/50'
                : 'border-slate-200 bg-slate-50'
            "
          >

            <div class="flex items-center justify-between">

              <p class="font-black text-slate-900">
                {{ slot.time }}
              </p>

              <span
                class="rounded-full px-2.5 py-1 text-[10px] font-bold"
                :class="
                  slot.status === 'Available'
                    ? 'bg-emerald-100 text-emerald-700'
                    : 'bg-slate-200 text-slate-600'
                "
              >
                {{ slot.status }}
              </span>

            </div>

            <p class="mt-3 text-sm font-bold text-slate-700">
              ETB {{ slot.price }}
            </p>

            <button
              class="mt-4 w-full rounded-xl border border-slate-200 bg-white py-2 text-xs font-bold text-slate-600 hover:bg-slate-50"
            >
              {{ slot.status === 'Available' ? 'Block Slot' : 'Make Available' }}
            </button>

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

const days = [
  { week: 'MON', date: '29' },
  { week: 'TUE', date: '30' },
  { week: 'WED', date: '01' },
  { week: 'THU', date: '02' },
  { week: 'FRI', date: '03' },
  { week: 'SAT', date: '04' },
  { week: 'SUN', date: '05' },
]

const selectedDay = ref(days[0])

const slots = [
  { time: '08:00 - 09:00', price: '1,500', status: 'Available' },
  { time: '09:00 - 10:00', price: '1,500', status: 'Available' },
  { time: '10:00 - 11:00', price: '1,500', status: 'Blocked' },
  { time: '11:00 - 12:00', price: '1,500', status: 'Available' },
  { time: '12:00 - 13:00', price: '1,500', status: 'Available' },
  { time: '14:00 - 15:00', price: '1,500', status: 'Booked' },
  { time: '16:00 - 17:00', price: '1,500', status: 'Available' },
  { time: '18:00 - 19:00', price: '1,500', status: 'Booked' },
]
</script>
```
