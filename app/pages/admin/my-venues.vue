<script setup lang="ts">
import { Search, Plus, Eye, Pencil, Trash2, MapPin } from 'lucide-vue-next'

definePageMeta({
  layout: 'admin'
})

const search = ref('')
const selectedSubCity = ref('All')
const selectedSport = ref('All')

const subCities = [
  'All',
  'Bole',
  'Yeka',
  'Kirkos',
  'Arada',
  'Lideta',
  'Gullele',
  'Kolfe Keranio',
  'Nifas Silk-Lafto',
  'Addis Ketema',
  'Akaki Kality'
]

const sports = [
  'All',
  'Football',
  'Futsal',
  'Basketball',
  'Volleyball',
  'Athletics',
  'Tennis'
]

const venues = ref([
  {
    id: 1,
    name: 'Sarbet Futsal Arena',
    location: 'Bole',
    sport: 'Futsal',
    price: 1500,
    status: 'Active'
  },
  {
    id: 2,
    name: 'Unity Football Arena',
    location: 'Arada',
    sport: 'Football',
    price: 2000,
    status: 'Active'
  },
  {
    id: 3,
    name: 'Yeka Basketball Court',
    location: 'Yeka',
    sport: 'Basketball',
    price: 1200,
    status: 'Active'
  },
  {
    id: 4,
    name: 'Summit Sports Complex',
    location: 'Kirkos',
    sport: 'Football',
    price: 2500,
    status: 'Pending'
  },
  {
    id: 5,
    name: 'Bole Tennis Center',
    location: 'Bole',
    sport: 'Tennis',
    price: 1000,
    status: 'Active'
  },
  {
    id: 6,
    name: 'Mexico Futsal Ground',
    location: 'Lideta',
    sport: 'Futsal',
    price: 1300,
    status: 'Inactive'
  }
])

const filteredVenues = computed(() => {
  return venues.value.filter(venue => {
    const matchesSearch =
      venue.name.toLowerCase().includes(search.value.toLowerCase())

    const matchesLocation =
      selectedSubCity.value === 'All' ||
      venue.location === selectedSubCity.value

    const matchesSport =
      selectedSport.value === 'All' ||
      venue.sport === selectedSport.value

    return matchesSearch && matchesLocation && matchesSport
  })
})

const deleteVenue = (id: number) => {
  venues.value = venues.value.filter(v => v.id !== id)
}
</script>

<template>
  <div class="space-y-6">

    <div class="flex flex-col justify-between gap-4 md:flex-row md:items-center">
      <div>
        <h1 class="text-3xl font-black">Sport Fields</h1>
        <p class="mt-1 text-slate-500">
          Manage Addis Ababa sport fields and venues.
        </p>
      </div>

      <button class="flex items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 py-3 font-bold text-white">
        <Plus :size="19" />
        Add Sport Field
      </button>
    </div>

    <!-- Filters -->
    <div class="rounded-2xl bg-white p-5 shadow-sm">

      <div class="grid grid-cols-1 gap-4 md:grid-cols-3">

        <div class="relative">
          <Search
            class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            :size="19"
          />

          <input
            v-model="search"
            placeholder="Search sport field..."
            class="w-full rounded-xl border py-3 pl-10 pr-4 outline-none focus:border-[#94FF2B]"
          />
        </div>

        <select
          v-model="selectedSubCity"
          class="rounded-xl border px-4 py-3 outline-none"
        >
          <option
            v-for="city in subCities"
            :key="city"
            :value="city"
          >
            {{ city === 'All' ? 'All Sub-Cities' : city }}
          </option>
        </select>

        <select
          v-model="selectedSport"
          class="rounded-xl border px-4 py-3 outline-none"
        >
          <option
            v-for="sport in sports"
            :key="sport"
            :value="sport"
          >
            {{ sport === 'All' ? 'All Sports' : sport }}
          </option>
        </select>

      </div>
    </div>

    <!-- Table -->
    <div class="overflow-hidden rounded-2xl bg-white shadow-sm">

      <div class="border-b p-5">
        <div class="flex items-center justify-between">
          <div>
            <h2 class="font-bold">Addis Ababa Sport Fields</h2>
            <p class="text-sm text-slate-500">
              {{ filteredVenues.length }} fields found
            </p>
          </div>

          <div class="flex items-center gap-2 text-sm text-slate-500">
            <MapPin :size="17" />
            Addis Ababa
          </div>
        </div>
      </div>

      <div class="overflow-x-auto">

        <table class="w-full min-w-[850px]">

          <thead>
            <tr class="bg-slate-50 text-left text-xs uppercase text-slate-500">
              <th class="px-6 py-4">Sport Field</th>
              <th class="px-6 py-4">Sub-City</th>
              <th class="px-6 py-4">Sport</th>
              <th class="px-6 py-4">Price / Hour</th>
              <th class="px-6 py-4">Status</th>
              <th class="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>

            <tr
              v-for="venue in filteredVenues"
              :key="venue.id"
              class="border-t hover:bg-slate-50"
            >

              <td class="px-6 py-5">
                <div class="flex items-center gap-3">
                  <div class="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-xl">
                    ⚽
                  </div>

                  <div>
                    <p class="font-bold">{{ venue.name }}</p>
                    <p class="text-xs text-slate-500">
                      Addis Ababa
                    </p>
                  </div>
                </div>
              </td>

              <td class="px-6 py-5">
                {{ venue.location }}
              </td>

              <td class="px-6 py-5">
                <span class="rounded-lg bg-slate-100 px-3 py-1 text-sm">
                  {{ venue.sport }}
                </span>
              </td>

              <td class="px-6 py-5 font-semibold">
                {{ venue.price.toLocaleString() }} ETB
              </td>

              <td class="px-6 py-5">
                <span
                  class="rounded-full px-3 py-1 text-xs font-bold"
                  :class="{
                    'bg-green-100 text-green-700': venue.status === 'Active',
                    'bg-yellow-100 text-yellow-700': venue.status === 'Pending',
                    'bg-red-100 text-red-700': venue.status === 'Inactive'
                  }"
                >
                  {{ venue.status }}
                </span>
              </td>

              <td class="px-6 py-5">
                <div class="flex justify-end gap-2">

                  <button class="rounded-lg p-2 hover:bg-slate-100">
                    <Eye :size="18" />
                  </button>

                  <button class="rounded-lg p-2 hover:bg-slate-100">
                    <Pencil :size="18" />
                  </button>

                  <button
                    @click="deleteVenue(venue.id)"
                    class="rounded-lg p-2 text-red-500 hover:bg-red-50"
                  >
                    <Trash2 :size="18" />
                  </button>

                </div>
              </td>

            </tr>

          </tbody>

        </table>

      </div>
    </div>

  </div>
</template>