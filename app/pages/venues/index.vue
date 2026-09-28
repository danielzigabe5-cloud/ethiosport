<script setup lang="ts">
import { ref, computed } from 'vue'
import heroBg from '~/assets/images/images.jpg'

useHead({
  title: 'Venues - CombolojoSPORT',
  meta: [
    {
      name: 'description',
      content:
        'Discover and book football, basketball, volleyball and other sports venues across Ethiopia with CombolojoSPORT.',
    },
  ],
})

const config = useRuntimeConfig()
const API_BASE = config.public.apiBase || 'http://127.0.0.1:8000/api'

/* =========================================================
   FILTER STATE
========================================================= */

const searchQuery = ref('')
const selectedCity = ref('')
const selectedSubCity = ref('')
const selectedSport = ref('')
const activeSport = ref('')

/* =========================================================
   PLACEHOLDER
========================================================= */

const placeholderSvg =
  'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22800%22%20height%3D%22500%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Crect%20width%3D%22800%22%20height%3D%22500%22%20fill%3D%22%23e2e8f0%22%3E%3C%2Frect%3E%3Ctext%20x%3D%2250%25%22%20y%3D%2250%25%22%20fill%3D%22%23647569%22%20text-anchor%3D%22middle%22%20font-family%3D%22sans-serif%22%20font-size%3D%2224%22%3ECombolojoSPORT%3C%2Ftext%3E%3C%2Fsvg%3E'

/* =========================================================
   API
========================================================= */

const {
  data: rawResponse,
  pending,
  error,
  refresh,
} = await useFetch(`${API_BASE}/venues`, {
  key: 'combolojo-venues',
})

const venuesList = computed(() => {
  if (!rawResponse.value) return []

  if (Array.isArray(rawResponse.value)) {
    return rawResponse.value
  }

  return rawResponse.value.data || []
})

/* =========================================================
   HELPERS
========================================================= */

function formatSportArray(data: any): string[] {
  if (!data) return []

  if (Array.isArray(data)) {
    return data
      .filter(Boolean)
      .map((item) => String(item).trim())
  }

  try {
    const parsed = JSON.parse(data)

    if (Array.isArray(parsed)) {
      return parsed
        .filter(Boolean)
        .map((item) => String(item).trim())
    }

    return parsed ? [String(parsed).trim()] : []
  } catch {
    return String(data)
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean)
  }
}

function getVenueSubCity(venue: any): string {
  return (
    venue.sub_city ||
    venue.subcity ||
    venue.sub_city_name ||
    venue.subCity ||
    venue.subCityName ||
    ''
  )
}

function normalize(value: any): string {
  return String(value || '')
    .trim()
    .toLowerCase()
}

function getVenueImage(venue: any) {
  if (!venue) return placeholderSvg

  const image =
    venue.image_full_url ||
    venue.image_url ||
    venue.image

  if (!image) return placeholderSvg

  return image.startsWith('http')
    ? image
    : `http://127.0.0.1:8000/storage/${image}`
}

function handleImageError(event: Event) {
  const target = event.target as HTMLImageElement

  if (target) {
    target.src = placeholderSvg
  }
}

/* =========================================================
   CITIES
========================================================= */

const ethiopianCities = [
  'Addis Ababa',
  'Adama',
  'Agaro',
  'Ambo',
  'Arba Minch',
  'Asella',
  'Assosa',
  'Awash',
  'Axum',
  'Bahir Dar',
  'Bale Robe',
  'Batu',
  'Bedele',
  'Bishoftu',
  'Boditi',
  'Bonga',
  'Burayu',
  'Chiro',
  'Dabat',
  'Debre Berhan',
  'Debre Markos',
  'Debre Tabor',
  'Dembi Dolo',
  'Dessie',
  'Dilla',
  'Dire Dawa',
  'Gambela',
  'Gimbi',
  'Goba',
  'Gode',
  'Gondar',
  'Haramaya',
  'Harar',
  'Hawassa',
  'Hosaena',
  'Jijiga',
  'Jimma',
  'Kombolcha',
  'Mekelle',
  'Meki',
  'Mettu',
  'Mizan Teferi',
  'Mojo',
  'Negele Borana',
  'Nekemte',
  'Shashamane',
  'Shire',
  'Wolaita Sodo',
  'Woldia',
  'Yirgalem',
]

const cities = computed(() => {
  const cityNames = new Map<string, string>()

  ;[...ethiopianCities, ...venuesList.value.map((venue: any) => venue.city)]
    .filter(Boolean)
    .forEach((city) => {
      const cityName = String(city).trim()
      const key = normalize(cityName)

      if (key) {
        cityNames.set(key, cityName)
      }
    })

  return Array.from(cityNames.values()).sort((first, second) =>
    first.localeCompare(second)
  )
})

/* =========================================================
   ADDIS ABABA SUB CITIES
========================================================= */

const addisSubCities = [
  'Addis Ketema',
  'Akaki Kality',
  'Arada',
  'Bole',
  'Gullele',
  'Kirkos',
  'Kolfe Keranio',
  'Lideta',
  'Nifas Silk-Lafto',
  'Yeka',
]

const subCities = computed(() => {
  if (normalize(selectedCity.value) !== 'addis ababa') {
    return []
  }

  const fromApi = new Set<string>()

  venuesList.value.forEach((venue: any) => {
    if (
      normalize(venue.city) === 'addis ababa' &&
      getVenueSubCity(venue)
    ) {
      fromApi.add(getVenueSubCity(venue).trim())
    }
  })

  /*
   * If backend already has sub-city values,
   * use those values.
   *
   * Otherwise show Addis Ababa's known sub-city list.
   */
  return fromApi.size > 0
    ? Array.from(fromApi).sort()
    : addisSubCities
})

/* =========================================================
   SPORTS
========================================================= */

const sports = computed(() => {
  const set = new Set<string>()

  venuesList.value.forEach((venue: any) => {
    const list = formatSportArray(
      venue.sport_types || venue.sport_type
    )

    list.forEach((sport) => {
      if (sport) {
        set.add(sport)
      }
    })
  })

  return Array.from(set).sort()
})

/* =========================================================
   FILTERED VENUES
========================================================= */

const filteredVenues = computed(() => {
  return venuesList.value.filter((venue: any) => {
    const query = normalize(searchQuery.value)

    const venueSports = formatSportArray(
      venue.sport_types || venue.sport_type
    )

    const matchesSearch =
      !query ||
      normalize(venue.name).includes(query) ||
      normalize(venue.location).includes(query) ||
      normalize(venue.city).includes(query) ||
      normalize(getVenueSubCity(venue)).includes(query) ||
      venueSports.some((sport) =>
        normalize(sport).includes(query)
      )

    const matchesCity =
      !selectedCity.value ||
      normalize(venue.city) === normalize(selectedCity.value)

    const matchesSubCity =
      !selectedSubCity.value ||
      normalize(getVenueSubCity(venue)) ===
        normalize(selectedSubCity.value)

    const matchesSport =
      !selectedSport.value ||
      venueSports.some(
        (sport) =>
          normalize(sport) === normalize(selectedSport.value)
      )

    const matchesQuickSport =
      !activeSport.value ||
      venueSports.some(
        (sport) =>
          normalize(sport) === normalize(activeSport.value)
      )

    return (
      matchesSearch &&
      matchesCity &&
      matchesSubCity &&
      matchesSport &&
      matchesQuickSport
    )
  })
})

/* =========================================================
   FILTER FUNCTIONS
========================================================= */

function selectCity(city: string) {
  selectedCity.value = city

  /*
   * When user changes city,
   * reset previous sub-city.
   */
  selectedSubCity.value = ''

  scrollToVenues()
}

function selectSport(sport: string) {
  if (activeSport.value === sport) {
    activeSport.value = ''
  } else {
    activeSport.value = sport
  }

  scrollToVenues()
}

function clearFilters() {
  searchQuery.value = ''
  selectedCity.value = ''
  selectedSubCity.value = ''
  selectedSport.value = ''
  activeSport.value = ''
}

function scrollToVenues() {
  document
    .getElementById('all-venues')
    ?.scrollIntoView({
      behavior: 'smooth',
    })
}

/* =========================================================
   FAQ
========================================================= */

const faqs = ref([
  {
    question: 'Can I book a venue online?',
    answer:
      'Yes. Choose a venue, check its available information and continue to the venue booking page.',
    open: false,
  },
  {
    question: 'What sports venues can I find?',
    answer:
      'CombolojoSPORT can support football, futsal, basketball, volleyball and other sports facilities.',
    open: false,
  },
  {
    question: 'Can I search by city?',
    answer:
      'Yes. You can select All Cities or choose a specific city. When Addis Ababa is selected, you can also filter venues by Sub City.',
    open: false,
  },
  {
    question: 'Can I filter by sport?',
    answer:
      'Yes. Select All Sports to see every sport or select a specific sport such as Football, Basketball, Volleyball or Futsal.',
    open: false,
  },
  {
    question: 'Can venue owners join CombolojoSPORT?',
    answer:
      'Yes. Venue partners can register their facilities and manage their venue information through the partner platform.',
    open: false,
  },
])

function toggleFaq(index: number) {
  faqs.value[index].open = !faqs.value[index].open
}
</script>

<template>
  <div class="min-h-screen bg-slate-50 text-slate-800">

    <!-- =====================================================
         HERO (UPDATED COLORS)
    ====================================================== -->

    <section class="relative overflow-hidden bg-gradient-to-br from-green-700 via-emerald-800 to-green-950">

      <img
        :src="heroBg"
        alt="Sports field"
        class="absolute inset-0 h-full w-full object-cover object-center"
      />

      <div
        class="absolute inset-0 bg-gradient-to-r from-emerald-950/65 via-emerald-900/35 to-green-900/15"
      ></div>

      <div
        class="relative mx-auto max-w-7xl px-5 pb-20 pt-32 sm:px-8 lg:px-10"
      >

        <div class="grid items-center gap-12 lg:grid-cols-2">

          <!-- HERO TEXT -->
          <div>

            <div
              class="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-emerald-300"
            >
              <span
                class="h-2 w-2 animate-pulse rounded-full bg-emerald-400"
              ></span>

              CombolojoSPORT Venues
            </div>

            <h1
              class="mt-6 text-4xl font-black leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl"
            >
              Find the perfect
              <span class="text-emerald-400">
                place to play.
              </span>
            </h1>

            <p
              class="mt-6 max-w-xl text-base leading-8 text-emerald-100/80 sm:text-lg"
            >
              Discover sports venues, compare locations and find
              the right place for your next game with
              CombolojoSPORT.
            </p>

            <!-- QUICK STATS -->
            <div class="mt-8 flex flex-wrap gap-3">

              <div
                class="rounded-2xl border border-emerald-800/40 bg-emerald-900/30 px-5 py-3 backdrop-blur"
              >
                <div class="text-xl font-black text-white">
                  {{ venuesList.length }}+
                </div>

                <div class="text-xs text-emerald-200/70">
                  Venues
                </div>
              </div>

              <div
                class="rounded-2xl border border-emerald-800/40 bg-emerald-900/30 px-5 py-3 backdrop-blur"
              >
                <div class="text-xl font-black text-white">
                  {{ cities.length }}+
                </div>

                <div class="text-xs text-emerald-200/70">
                  Cities
                </div>
              </div>

              <div
                class="rounded-2xl border border-emerald-800/40 bg-emerald-900/30 px-5 py-3 backdrop-blur"
              >
                <div class="text-xl font-black text-white">
                  {{ sports.length }}+
                </div>

                <div class="text-xs text-emerald-200/70">
                  Sports
                </div>
              </div>

            </div>

          </div>

          <!-- SEARCH CARD -->
          <div class="lg:pl-10">

            <div
              class="rounded-[2rem] border border-emerald-500/20 bg-emerald-900/20 p-4 shadow-2xl backdrop-blur-xl sm:p-6"
            >

              <div
                class="rounded-[1.5rem] bg-white p-5 sm:p-7"
              >

                <p
                  class="text-xs font-bold uppercase tracking-[0.16em] text-emerald-600"
                >
                  Quick Search
                </p>

                <h2
                  class="mt-2 text-2xl font-black text-slate-900"
                >
                  Find a venue
                </h2>

                <p class="mt-2 text-sm text-slate-500">
                  Search by venue, city, sub city or sport.
                </p>

                <!-- SEARCH -->
                <div class="relative mt-6">

                  <svg
                    class="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m21 21-6-6m2-5a7 7 0 1 1 14 0Z"
                    />
                  </svg>

                  <input
                    v-model="searchQuery"
                    type="text"
                    placeholder="Search venue, city, sub city..."
                    class="w-full rounded-2xl border border-slate-200 bg-slate-50 py-4 pl-12 pr-4 text-sm font-medium outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10"
                  />

                </div>

                <!-- CITY + SPORT -->
                <div class="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">

                  <!-- CITY -->
                  <select
                    v-model="selectedCity"
                    @change="selectedSubCity = ''"
                    class="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm font-semibold text-slate-600 outline-none transition focus:border-emerald-500 focus:bg-white"
                  >
                    <option value="">
                      All Cities
                    </option>

                    <option
                      v-for="city in cities"
                      :key="city"
                      :value="city"
                    >
                      {{ city }}
                    </option>
                  </select>

                  <!-- SPORT -->
                  <select
                    v-model="selectedSport"
                    class="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm font-semibold text-slate-600 outline-none transition focus:border-emerald-500 focus:bg-white"
                  >
                    <option value="">
                      All Sports
                    </option>

                    <option
                      v-for="sport in sports"
                      :key="sport"
                      :value="sport"
                    >
                      {{ sport }}
                    </option>
                  </select>

                </div>

                <!-- ADDIS ABABA SUB CITY -->
                <div
                  v-if="normalize(selectedCity) === 'addis ababa'"
                  class="mt-3"
                >

                  <select
                    v-model="selectedSubCity"
                    class="w-full rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-4 text-sm font-semibold text-emerald-800 outline-none transition focus:border-emerald-500 focus:bg-white"
                  >

                    <option value="">
                      All Sub Cities
                    </option>

                    <option
                      v-for="subCity in subCities"
                      :key="subCity"
                      :value="subCity"
                    >
                      {{ subCity }}
                    </option>

                  </select>

                </div>

                <button
                  type="button"
                  class="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-5 py-4 text-sm font-black text-white shadow-lg shadow-emerald-600/20 transition hover:bg-emerald-500"
                  @click="scrollToVenues"
                >

                  <svg
                    class="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m21 21-6-6m2-5a7 7 0 1 1 14 0Z"
                    />
                  </svg>

                  Find Venues
                </button>

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>

    <!-- =====================================================
         QUICK SPORT FILTERS
    ====================================================== -->

    <section class="border-b border-slate-200 bg-white">

      <div class="mx-auto max-w-7xl px-5 py-6 sm:px-8 lg:px-10">

        <div
          class="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between"
        >

          <div>
            <p
              class="text-xs font-bold uppercase tracking-[0.16em] text-emerald-600"
            >
              Browse by sport
            </p>

            <h2
              class="mt-1 text-lg font-black text-slate-900"
            >
              What do you want to play?
            </h2>
          </div>

          <div
            class="flex gap-2 overflow-x-auto pb-1"
          >

            <button
              type="button"
              class="whitespace-nowrap rounded-xl border px-4 py-2.5 text-xs font-bold transition"
              :class="
                !activeSport
                  ? 'border-emerald-600 bg-emerald-600 text-white'
                  : 'border-slate-200 bg-slate-50 text-slate-600 hover:border-emerald-300'
              "
              @click="activeSport = ''"
            >
              All Sports
            </button>

            <button
              v-for="sport in sports"
              :key="sport"
              type="button"
              class="whitespace-nowrap rounded-xl border px-4 py-2.5 text-xs font-bold transition"
              :class="
                activeSport === sport
                  ? 'border-emerald-600 bg-emerald-600 text-white'
                  : 'border-slate-200 bg-slate-50 text-slate-600 hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700'
              "
              @click="selectSport(sport)"
            >
              {{ sport }}
            </button>

          </div>

        </div>

      </div>

    </section>

    <!-- =====================================================
         VENUES
    ====================================================== -->

    <section
      id="all-venues"
      class="px-5 py-20 sm:px-8 lg:px-10"
    >

      <div class="mx-auto max-w-7xl">

        <!-- HEADING -->
        <div
          class="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between"
        >

          <div>

            <p
              class="text-xs font-bold uppercase tracking-[0.18em] text-emerald-600"
            >
              Discover
            </p>

            <h2
              class="mt-2 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl"
            >
              All Sports Venues
            </h2>

            <p class="mt-2 text-sm text-slate-500">
              Find a place that fits your next game.
            </p>

          </div>

          <div class="flex flex-wrap items-center gap-3">

            <span
              class="rounded-full bg-emerald-50 px-4 py-2 text-xs font-bold text-emerald-700"
            >
              {{ filteredVenues.length }} venues found
            </span>

            <button
              v-if="
                searchQuery ||
                selectedCity ||
                selectedSubCity ||
                selectedSport ||
                activeSport
              "
              type="button"
              class="rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-600 transition hover:border-emerald-300 hover:text-emerald-600"
              @click="clearFilters"
            >
              Clear Filters
            </button>

          </div>

        </div>

        <!-- SELECTED FILTERS -->
        <div
          v-if="
            selectedCity ||
            selectedSubCity ||
            selectedSport ||
            activeSport
          "
          class="mt-6 flex flex-wrap gap-2"
        >

          <span
            v-if="selectedCity"
            class="rounded-full bg-slate-900 px-4 py-2 text-xs font-bold text-white"
          >
            City: {{ selectedCity }}
          </span>

          <span
            v-if="selectedSubCity"
            class="rounded-full bg-emerald-600 px-4 py-2 text-xs font-bold text-white"
          >
            Sub City: {{ selectedSubCity }}
          </span>

          <span
            v-if="selectedSport || activeSport"
            class="rounded-full bg-blue-600 px-4 py-2 text-xs font-bold text-white"
          >
            Sport: {{ selectedSport || activeSport }}
          </span>

        </div>

        <!-- LOADING -->
        <div
          v-if="pending"
          class="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
        >

          <div
            v-for="n in 6"
            :key="n"
            class="animate-pulse overflow-hidden rounded-3xl border border-slate-200 bg-white p-4"
          >

            <div
              class="h-56 rounded-2xl bg-slate-200"
            ></div>

            <div
              class="mt-5 h-5 w-2/3 rounded bg-slate-200"
            ></div>

            <div
              class="mt-3 h-4 w-1/2 rounded bg-slate-200"
            ></div>

            <div
              class="mt-6 h-10 w-full rounded-xl bg-slate-200"
            ></div>

          </div>

        </div>

        <!-- ERROR -->
        <div
          v-else-if="error"
          class="mt-10 rounded-3xl border border-rose-200 bg-rose-50 px-6 py-16 text-center"
        >

          <div
            class="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-2xl shadow-sm"
          >
            !
          </div>

          <h3
            class="mt-5 text-lg font-black text-rose-700"
          >
            Unable to load venues
          </h3>

          <p class="mt-2 text-sm text-rose-500">
            Please check your backend connection and try again.
          </p>

          <button
            type="button"
            class="mt-6 rounded-xl bg-rose-600 px-5 py-3 text-sm font-bold text-white hover:bg-rose-500"
            @click="refresh"
          >
            Try Again
          </button>

        </div>

        <!-- EMPTY -->
        <div
          v-else-if="filteredVenues.length === 0"
          class="mt-10 rounded-3xl border border-slate-200 bg-white px-6 py-20 text-center shadow-sm"
        >

          <div
            class="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 text-2xl"
          >
            ⚽
          </div>

          <h3
            class="mt-5 text-xl font-black text-slate-900"
          >
            No venues found
          </h3>

          <p class="mt-2 text-sm text-slate-500">
            Try another city, sub city, sport or search keyword.
          </p>

          <button
            type="button"
            class="mt-6 rounded-xl bg-slate-900 px-5 py-3 text-sm font-bold text-white transition hover:bg-emerald-600"
            @click="clearFilters"
          >
            Show All Venues
          </button>

        </div>

        <!-- VENUE GRID -->
        <div
          v-else
          class="mt-10 grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3"
        >

          <article
            v-for="venue in filteredVenues"
            :key="venue.id"
            class="group overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-2xl"
          >

            <!-- IMAGE -->
            <div
              class="relative h-60 overflow-hidden bg-slate-100"
            >

              <img
                :src="getVenueImage(venue)"
                :alt="venue.name || 'Sports venue'"
                class="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                @error="handleImageError"
              />

              <div
                class="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/10"
              ></div>

              <!-- SPORTS -->
              <div
                class="absolute left-4 top-4 flex flex-wrap gap-1.5"
              >

                <span
                  v-for="sport in formatSportArray(
                    venue.sport_types || venue.sport_type
                  ).slice(0, 3)"
                  :key="sport"
                  class="rounded-lg bg-white/95 px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-slate-800 shadow"
                >
                  {{ sport }}
                </span>

              </div>

              <!-- RATING -->
              <div
                class="absolute right-4 top-4 flex items-center gap-1 rounded-xl bg-white/95 px-2.5 py-1.5 text-xs font-black text-amber-600 shadow"
              >

                ★

                {{ venue.rating || '4.8' }}

              </div>

              <!-- IMAGE INFO -->
              <div
                class="absolute bottom-4 left-4 right-4 text-white"
              >

                <h3
                  class="line-clamp-1 text-xl font-black"
                >
                  {{ venue.name }}
                </h3>

                <div
                  class="mt-1 flex flex-wrap items-center gap-1.5 text-xs text-slate-200"
                >

                  <span>
                    📍 {{ venue.location || 'Location' }}
                  </span>

                  <span v-if="venue.city">
                    • {{ venue.city }}
                  </span>

                  <span v-if="getVenueSubCity(venue)">
                    • {{ getVenueSubCity(venue) }}
                  </span>

                </div>

              </div>

            </div>

            <!-- CONTENT -->
            <div class="p-5">

              <div
                class="flex items-end justify-between gap-4"
              >

                <div>

                  <div
                    class="text-xs font-semibold text-slate-400"
                  >
                    Starting from
                  </div>

                  <div class="mt-1">

                    <span
                      class="text-2xl font-black text-slate-900"
                    >
                      {{ venue.price_per_hour || '—' }}
                    </span>

                    <span
                      class="ml-1 text-xs font-bold text-emerald-600"
                    >
                      ETB
                    </span>

                    <span
                      class="ml-1 text-xs text-slate-400"
                    >
                      / hour
                    </span>

                  </div>

                </div>

                <div
                  class="rounded-xl bg-emerald-50 px-3 py-2 text-center"
                >

                  <div
                    class="text-[10px] font-bold uppercase text-emerald-600"
                  >
                    Status
                  </div>

                  <div
                    class="mt-0.5 text-xs font-black text-emerald-700"
                  >
                    Available
                  </div>

                </div>

              </div>

              <!-- BUTTONS -->
              <div
                class="mt-5 flex items-center gap-3"
              >

                <NuxtLink
                  :to="`/venues/${venue.id}`"
                  class="flex flex-1 items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-xs font-black text-white transition hover:bg-emerald-600"
                >
                  View Details

                  <span>→</span>
                </NuxtLink>

                <NuxtLink
                  :to="`/venues/${venue.id}`"
                  class="flex items-center justify-center rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-xs font-black text-emerald-700 transition hover:bg-emerald-600 hover:text-white"
                >
                  Book
                </NuxtLink>

              </div>

            </div>

          </article>

        </div>

      </div>

    </section>

    <!-- =====================================================
         HOW IT WORKS
    ====================================================== -->

    <section
      class="border-y border-slate-200 bg-white px-5 py-20 sm:px-8 lg:px-10"
    >

      <div class="mx-auto max-w-7xl">

        <div class="mx-auto max-w-2xl text-center">

          <p
            class="text-xs font-bold uppercase tracking-[0.18em] text-emerald-600"
          >
            Simple Booking
          </p>

          <h2
            class="mt-3 text-3xl font-black text-slate-900 sm:text-4xl"
          >
            From search to game in simple steps
          </h2>

          <p class="mt-4 text-sm leading-7 text-slate-500">
            Find a venue, choose your preferred time and get ready to play.
          </p>

        </div>

        <div
          class="mt-14 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4"
        >

          <div
            v-for="step in [
              {
                number: '01',
                title: 'Search',
                desc: 'Search for venues by sport, city or location.',
                icon: '⌕',
              },
              {
                number: '02',
                title: 'Discover',
                desc: 'Compare venues, locations, sports and prices.',
                icon: '◉',
              },
              {
                number: '03',
                title: 'Reserve',
                desc: 'Open the venue and choose an available booking slot.',
                icon: '▣',
              },
              {
                number: '04',
                title: 'Play',
                desc: 'Complete your booking and enjoy your game.',
                icon: '✓',
              },
            ]"
            :key="step.number"
            class="rounded-3xl border border-slate-200 bg-slate-50 p-7 transition hover:-translate-y-1 hover:border-emerald-300 hover:bg-white hover:shadow-xl"
          >

            <div class="flex items-center justify-between">

              <div
                class="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-600 text-2xl font-black text-white shadow-lg shadow-emerald-600/20"
              >
                {{ step.icon }}
              </div>

              <span
                class="text-4xl font-black text-slate-200"
              >
                {{ step.number }}
              </span>

            </div>

            <h3
              class="mt-7 text-xl font-black text-slate-900"
            >
              {{ step.title }}
            </h3>

            <p
              class="mt-3 text-sm leading-7 text-slate-500"
            >
              {{ step.desc }}
            </p>

          </div>

        </div>

      </div>

    </section>

    <!-- =====================================================
         WHY COMBOLOJO
    ====================================================== -->

    <section
      class="bg-slate-50 px-5 py-20 sm:px-8 lg:px-10"
    >

      <div
        class="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2"
      >

        <div>

          <p
            class="text-xs font-bold uppercase tracking-[0.18em] text-emerald-600"
          >
            Why CombolojoSPORT
          </p>

          <h2
            class="mt-3 text-3xl font-black text-slate-900 sm:text-4xl"
          >
            Built for sports lovers and venue owners
          </h2>

          <p class="mt-4 text-sm leading-7 text-slate-500">
            We connect sports fans with quality sports venues across Ethiopia.
          </p>

        </div>

      </div>

    </section>

  </div>
</template>