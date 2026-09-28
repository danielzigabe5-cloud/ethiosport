```vue
<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import venue20Image from '~/assets/images/venues20.jpg'
import venue11Image from '~/assets/images/venuess11.jpg'
import venue12Image from '~/assets/images/venuess12.png'

/* =========================================================
   PAGE META
========================================================= */

useHead({
  title: 'Events | CombolojoSPORT',
  meta: [
    {
      name: 'description',
      content:
        'Discover football, basketball, futsal and other sports events across Ethiopia.',
    },
  ],
})

/* =========================================================
   TYPES
========================================================= */

interface SportEvent {
  id: number | string
  title: string
  category: string
  status: string
  type: string
  date: string
  location: string
  city?: string
  image?: string
  image_url?: string
  price?: string | number
  participants?: number
  max_participants?: number
  description?: string
}

/* =========================================================
   CONFIG
========================================================= */

const config = useRuntimeConfig()

const apiBase = computed(() => {
  return config.public.apiBase || 'http://127.0.0.1:8001'
})

/* =========================================================
   STATE
========================================================= */

const searchQuery = ref('')
const selectedSport = ref('All')
const selectedStatus = ref('All')

const events = ref<SportEvent[]>([])
const isLoading = ref(true)
const apiError = ref('')

const selectedEvent = ref<SportEvent | null>(null)
const isModalOpen = ref(false)

const isSubmitting = ref(false)
const registrationSuccess = ref(false)
const registrationError = ref('')

const registrationForm = ref({
  fullName: '',
  phone: '',
  teamName: '',
})

/* =========================================================
   FILTER OPTIONS
========================================================= */

const sports = [
  'All',
  'Football',
  'Futsal',
  'Basketball',
  'Volleyball',
  'Tennis',
  'Athletics',
]

const statuses = [
  'All',
  'Upcoming',
  'Ongoing',
  'Completed',
]

/* =========================================================
   API
========================================================= */

const fetchEvents = async () => {
  try {
    isLoading.value = true
    apiError.value = ''

    const response = await $fetch<any>(
      `${apiBase.value}/api/events`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      },
    )

    console.log('EVENT API RESPONSE:', response)

    if (Array.isArray(response)) {
      events.value = response
    } else if (Array.isArray(response?.data)) {
      events.value = response.data
    } else if (Array.isArray(response?.events)) {
      events.value = response.events
    } else {
      events.value = []
      console.warn('Unexpected event API response:', response)
    }
  } catch (error) {
    console.error('Events API Error:', error)

    apiError.value =
      'Events could not be loaded from the server.'

    events.value = demoEvents
  } finally {
    isLoading.value = false
  }
}

/* =========================================================
   FILTERING
========================================================= */

const filteredEvents = computed(() => {
  const search = searchQuery.value.trim().toLowerCase()

  return events.value.filter((event) => {
    const sportMatch =
      selectedSport.value === 'All' ||
      event.category === selectedSport.value

    const statusMatch =
      selectedStatus.value === 'All' ||
      event.status === selectedStatus.value

    const searchMatch =
      !search ||
      event.title?.toLowerCase().includes(search) ||
      event.location?.toLowerCase().includes(search) ||
      event.city?.toLowerCase().includes(search) ||
      event.category?.toLowerCase().includes(search)

    return sportMatch && statusMatch && searchMatch
  })
})

const upcomingCount = computed(() =>
  events.value.filter(
    (event) => event.status === 'Upcoming',
  ).length,
)

const ongoingCount = computed(() =>
  events.value.filter(
    (event) => event.status === 'Ongoing',
  ).length,
)

/* =========================================================
   EVENT HELPERS
========================================================= */

const getEventImage = (event: SportEvent) => {
  return (
    event.image_url ||
    event.image ||
    '/images/events/default-event.jpg'
  )
}

const getStatusClass = (status: string) => {
  switch (status) {
    case 'Upcoming':
      return 'bg-emerald-500 text-white'

    case 'Ongoing':
      return 'bg-blue-600 text-white'

    case 'Completed':
      return 'bg-slate-500 text-white'

    default:
      return 'bg-slate-700 text-white'
  }
}

const getSportIcon = (category: string) => {
  switch (category) {
    case 'Football':
      return '⚽'

    case 'Futsal':
      return '⚽'

    case 'Basketball':
      return '🏀'

    case 'Volleyball':
      return '🏐'

    case 'Tennis':
      return '🎾'

    case 'Athletics':
      return '🏃'

    default:
      return '🏆'
  }
}

/* =========================================================
   REGISTRATION
========================================================= */

const openRegisterModal = (event: SportEvent) => {
  if (event.status === 'Completed') return

  selectedEvent.value = event

  registrationSuccess.value = false
  registrationError.value = ''

  registrationForm.value = {
    fullName: '',
    phone: '',
    teamName: '',
  }

  isModalOpen.value = true
}

const closeModal = () => {
  if (isSubmitting.value) return

  isModalOpen.value = false
}

const handleRegister = async () => {
  if (!selectedEvent.value) return

  try {
    isSubmitting.value = true
    registrationError.value = ''

    const payload = {
      event_id: selectedEvent.value.id,
      full_name: registrationForm.value.fullName,
      phone: registrationForm.value.phone,
      team_name:
        registrationForm.value.teamName || null,
    }

    await $fetch(
      `${apiBase.value}/api/event-registrations`,
      {
        method: 'POST',
        body: payload,
        headers: {
          Accept: 'application/json',
        },
      },
    )

    registrationSuccess.value = true

    setTimeout(() => {
      isModalOpen.value = false
      registrationSuccess.value = false
    }, 2200)
  } catch (error: any) {
    console.error('Registration error:', error)

    registrationError.value =
      error?.data?.message ||
      error?.response?._data?.message ||
      'Registration failed. Please try again.'
  } finally {
    isSubmitting.value = false
  }
}

/* =========================================================
   DEMO DATA
========================================================= */

const demoEvents: SportEvent[] = [
  {
    id: 1,
    title: 'Addis City Football Championship',
    category: 'Football',
    status: 'Upcoming',
    type: 'Team Registration',
    date: 'Oct 12, 2026',
    location: 'Addis Sport Field',
    city: 'Addis Ababa',
    price: 'ETB 2,500',
    participants: 18,
    max_participants: 32,
    image: '/images/events/football.jpg',
  },

  {
    id: 2,
    title: 'Addis Futsal Cup 2026',
    category: 'Futsal',
    status: 'Upcoming',
    type: 'Team Registration',
    date: 'Oct 18, 2026',
    location: 'Sarbet Futsal Arena',
    city: 'Addis Ababa',
    price: 'ETB 1,500',
    participants: 10,
    max_participants: 16,
    image: '/images/events/futsal.jpg',
  },

  {
    id: 3,
    title: 'Community Basketball Challenge',
    category: 'Basketball',
    status: 'Ongoing',
    type: 'Individual Registration',
    date: 'Sep 28, 2026',
    location: 'Yeka Basketball Court',
    city: 'Addis Ababa',
    price: 'ETB 500',
    participants: 24,
    max_participants: 30,
    image: '/images/events/basketball.jpg',
  },

  {
    id: 4,
    title: 'Addis Volleyball Tournament',
    category: 'Volleyball',
    status: 'Upcoming',
    type: 'Team Registration',
    date: 'Nov 02, 2026',
    location: 'Bole Sports Center',
    city: 'Addis Ababa',
    price: 'ETB 1,000',
    participants: 8,
    max_participants: 12,
    image: '/images/events/volleyball.jpg',
  },

  {
    id: 5,
    title: 'Ethiopian Tennis Open',
    category: 'Tennis',
    status: 'Upcoming',
    type: 'Individual Registration',
    date: 'Nov 10, 2026',
    location: 'Addis Tennis Club',
    city: 'Addis Ababa',
    price: 'ETB 800',
    participants: 16,
    max_participants: 32,
    image: '/images/events/tennis.jpg',
  },

  {
    id: 6,
    title: 'Addis Athletics Challenge',
    category: 'Athletics',
    status: 'Completed',
    type: 'Individual Registration',
    date: 'Aug 30, 2026',
    location: 'Addis Ababa Stadium',
    city: 'Addis Ababa',
    price: 'Free',
    participants: 50,
    max_participants: 50,
    image: '/images/events/athletics.jpg',
  },
]

/* =========================================================
   MOUNT
========================================================= */

onMounted(() => {
  fetchEvents()
})
</script>

<template>
  <div class="min-h-screen bg-slate-50 text-slate-900">

    <!-- =====================================================
         HERO
    ====================================================== -->

    <section
      class="relative
             overflow-hidden
             bg-gradient-to-br from-green-700 via-emerald-800 to-green-950
             text-white"
    >

      <img :src="venue20Image" alt="" aria-hidden="true" class="events-hero-slide events-hero-slide-1" />
      <img :src="venue11Image" alt="" aria-hidden="true" class="events-hero-slide events-hero-slide-2" />
      <img :src="venue12Image" alt="" aria-hidden="true" class="events-hero-slide events-hero-slide-3" />

      <div
        class="absolute inset-0 bg-gradient-to-r from-green-950/40 via-emerald-900/15 to-green-900/30"
      />

      <!-- Emerald glow -->
      <div
        class="absolute
               -top-32
               -right-32
               w-[430px]
               h-[430px]
               rounded-full
               bg-emerald-400/20
               blur-3xl"
      />

      <!-- Lime glow -->
      <div
        class="absolute
               -bottom-40
               -left-20
               w-[400px]
               h-[400px]
               rounded-full
               bg-lime-400/10
               blur-3xl"
      />

      <!-- Decorative circles -->
      <div
        class="absolute
               top-24
               right-[12%]
               w-3
               h-3
               rounded-full
               bg-emerald-400"
      />

      <div
        class="absolute
               top-40
               right-[8%]
               w-20
               h-20
               rounded-full
               border
               border-emerald-400/20"
      />

      <div
        class="absolute
               bottom-24
               right-[20%]
               w-28
               h-28
               rounded-full
               border
               border-white/10"
      />

      <!-- Hero content -->
      <div
        class="relative
               max-w-7xl
               mx-auto
               px-4
               sm:px-6
               lg:px-8
               pt-28
               pb-32"
      >

        <div class="max-w-3xl">

          <!-- Badge -->
          <div
            class="inline-flex
                   items-center
                   gap-2
                   px-4
                   py-2
                   rounded-full
                   bg-emerald-400/10
                   border
                   border-emerald-300/25
                   text-emerald-300
                   text-xs
                   font-black
                   uppercase
                   tracking-[0.18em]
                   backdrop-blur-md"
          >

            <span
              class="w-2
                     h-2
                     rounded-full
                     bg-emerald-400"
            />

            Sports Events in Ethiopia

          </div>

          <!-- Heading -->
          <h1
            class="mt-6
                   text-4xl
                   sm:text-5xl
                   lg:text-7xl
                   font-black
                   tracking-tight
                   leading-[1.03]"
          >

            Find Your Next

            <span
              class="block
                     bg-gradient-to-r
                     from-emerald-300
                     via-emerald-400
                     to-lime-300
                     bg-clip-text
                     text-transparent"
            >
              Sports Event
            </span>

          </h1>

          <!-- Description -->
          <p
            class="mt-6
                   max-w-2xl
                   text-base
                   sm:text-lg
                   text-slate-300
                   leading-8"
          >
            Discover tournaments, competitions and community
            sports events. Register your team and compete with
            athletes across Ethiopia.
          </p>

          <!-- Buttons -->
          <div
            class="mt-8
                   flex
                   flex-wrap
                   gap-4"
          >

            <NuxtLink
              to="/venues"
              class="group
                     inline-flex
                     items-center
                     gap-2
                     bg-emerald-400
                     hover:bg-lime-300
                     text-slate-950
                     font-black
                     px-6
                     py-3.5
                     rounded-xl
                     transition-all
                     duration-300"
            >

              Find a Venue

              <Icon
                name="lucide:arrow-right"
                class="w-4 h-4
                       group-hover:translate-x-1
                       transition-transform"
              />

            </NuxtLink>

            <a
              href="#events"
              class="inline-flex
                     items-center
                     gap-2
                     border
                     border-white/20
                     bg-white/5
                     hover:bg-white/10
                     hover:border-white/30
                     backdrop-blur-md
                     px-6
                     py-3.5
                     rounded-xl
                     font-bold
                     transition-all"
            >

              <Icon
                name="lucide:calendar-days"
                class="w-4 h-4"
              />

              Explore Events

            </a>

          </div>

        </div>

        <!-- Stats -->
        <div
          class="mt-14
                 grid
                 grid-cols-2
                 md:grid-cols-4
                 gap-3
                 max-w-4xl"
        >

          <div
            class="group
                   bg-white/[0.07]
                   hover:bg-white/[0.11]
                   backdrop-blur-xl
                   border
                   border-white/10
                   hover:border-emerald-400/30
                   rounded-2xl
                   p-5
                   transition-all"
          >

            <div
              class="text-2xl
                     font-black
                     text-white
                     group-hover:text-emerald-300"
            >
              {{ events.length }}
            </div>

            <div
              class="text-xs
                     text-slate-400
                     mt-1"
            >
              Total Events
            </div>

          </div>

          <div
            class="group
                   bg-white/[0.07]
                   hover:bg-white/[0.11]
                   backdrop-blur-xl
                   border
                   border-white/10
                   hover:border-emerald-400/30
                   rounded-2xl
                   p-5
                   transition-all"
          >

            <div
              class="text-2xl
                     font-black
                     text-emerald-300"
            >
              {{ upcomingCount }}
            </div>

            <div
              class="text-xs
                     text-slate-400
                     mt-1"
            >
              Upcoming
            </div>

          </div>

          <div
            class="group
                   bg-white/[0.07]
                   hover:bg-white/[0.11]
                   backdrop-blur-xl
                   border
                   border-white/10
                   hover:border-blue-400/30
                   rounded-2xl
                   p-5
                   transition-all"
          >

            <div
              class="text-2xl
                     font-black
                     text-blue-300"
            >
              {{ ongoingCount }}
            </div>

            <div
              class="text-xs
                     text-slate-400
                     mt-1"
            >
              Ongoing
            </div>

          </div>

          <div
            class="group
                   bg-white/[0.07]
                   hover:bg-white/[0.11]
                   backdrop-blur-xl
                   border
                   border-white/10
                   hover:border-lime-300/30
                   rounded-2xl
                   p-5
                   transition-all"
          >

            <div
              class="text-2xl
                     font-black
                     text-lime-300"
            >
              7+
            </div>

            <div
              class="text-xs
                     text-slate-400
                     mt-1"
            >
              Sports
            </div>

          </div>

        </div>

      </div>

      <!-- Bottom fade -->
      <div
        class="absolute
               bottom-0
               left-0
               right-0
               h-24
               bg-gradient-to-t
               from-slate-50
               to-transparent"
      />

    </section>

    <!-- =====================================================
         FILTERS
    ====================================================== -->

    <section
      id="events"
      class="relative
             -mt-10
             z-20"
    >

      <div
        class="max-w-7xl
               mx-auto
               px-4
               sm:px-6
               lg:px-8"
      >

        <div
          class="bg-white
                 rounded-2xl
                 border
                 border-slate-200
                 p-4
                 sm:p-6"
        >

          <!-- Search -->
          <div class="relative">

            <Icon
              name="lucide:search"
              class="absolute
                     left-4
                     top-1/2
                     -translate-y-1/2
                     w-5
                     h-5
                     text-slate-400"
            />

            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search events, sports or locations..."
              class="w-full
                     pl-12
                     pr-4
                     py-4
                     bg-slate-50
                     border
                     border-slate-200
                     rounded-xl
                     outline-none
                     text-sm
                     font-semibold
                     focus:ring-2
                     focus:ring-emerald-500
                     focus:border-emerald-500
                     transition"
            />

          </div>

          <!-- Filters -->
          <div
            class="mt-5
                   flex
                   flex-col
                   lg:flex-row
                   gap-4
                   justify-between"
          >

            <!-- Sports -->
            <div class="flex-1">

              <p
                class="text-[10px]
                       font-black
                       uppercase
                       tracking-widest
                       text-slate-400
                       mb-2"
              >
                Sport
              </p>

              <div
                class="flex
                       gap-2
                       overflow-x-auto
                       pb-1"
              >

                <button
                  v-for="sport in sports"
                  :key="sport"
                  @click="selectedSport = sport"
                  :class="[
                    'px-4 py-2.5 rounded-lg text-xs font-black whitespace-nowrap transition',
                    selectedSport === sport
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  ]"
                >

                  <span
                    v-if="sport !== 'All'"
                    class="mr-1"
                  >
                    {{ getSportIcon(sport) }}
                  </span>

                  {{ sport }}

                </button>

              </div>

            </div>

            <!-- Status -->
            <div>

              <p
                class="text-[10px]
                       font-black
                       uppercase
                       tracking-widest
                       text-slate-400
                       mb-2"
              >
                Status
              </p>

              <div class="flex gap-2">

                <button
                  v-for="status in statuses"
                  :key="status"
                  @click="selectedStatus = status"
                  :class="[
                    'px-4 py-2.5 rounded-lg text-xs font-black transition',
                    selectedStatus === status
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  ]"
                >
                  {{ status }}
                </button>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>

    <!-- =====================================================
         EVENTS
    ====================================================== -->

    <section
      class="max-w-7xl
             mx-auto
             px-4
             sm:px-6
             lg:px-8
             pt-14
             pb-24"
    >

      <!-- Header -->
      <div
        class="flex
               flex-col
               sm:flex-row
               sm:items-end
               justify-between
               gap-4
               mb-8"
      >

        <div>

          <p
            class="text-emerald-600
                   font-black
                   text-xs
                   uppercase
                   tracking-widest"
          >
            Discover & Compete
          </p>

          <h2
            class="text-3xl
                   sm:text-4xl
                   font-black
                   mt-2"
          >
            Upcoming Events
          </h2>

          <p
            class="text-sm
                   text-slate-500
                   mt-2"
          >
            Find tournaments and sports activities near you.
          </p>

        </div>

        <div
          class="inline-flex
                 items-center
                 gap-2
                 bg-emerald-50
                 text-emerald-700
                 px-4
                 py-2
                 rounded-full
                 text-xs
                 font-black"
        >

          <Icon
            name="lucide:calendar-days"
            class="w-4 h-4"
          />

          {{ filteredEvents.length }} Events

        </div>

      </div>

      <!-- API Error -->
      <div
        v-if="apiError"
        class="mb-6
               rounded-xl
               border
               border-amber-200
               bg-amber-50
               text-amber-800
               px-4
               py-3
               text-sm
               font-semibold"
      >
        {{ apiError }}
      </div>

      <!-- Loading -->
      <div
        v-if="isLoading"
        class="grid
               grid-cols-1
               md:grid-cols-2
               lg:grid-cols-3
               gap-6"
      >

        <div
          v-for="n in 6"
          :key="n"
          class="bg-white
                 rounded-2xl
                 overflow-hidden
                 border
                 border-slate-200
                 animate-pulse"
        >

          <div class="h-56 bg-slate-200" />

          <div class="p-5 space-y-4">

            <div
              class="h-4
                     bg-slate-200
                     rounded
                     w-24"
            />

            <div
              class="h-6
                     bg-slate-200
                     rounded
                     w-4/5"
            />

            <div
              class="h-4
                     bg-slate-200
                     rounded
                     w-2/3"
            />

            <div
              class="h-10
                     bg-slate-200
                     rounded"
            />

          </div>

        </div>

      </div>

      <!-- Empty -->
      <div
        v-else-if="filteredEvents.length === 0"
        class="bg-white
               border
               border-slate-200
               rounded-2xl
               p-16
               text-center"
      >

        <div
          class="w-16
                 h-16
                 mx-auto
                 rounded-full
                 bg-slate-100
                 flex
                 items-center
                 justify-center"
        >

          <Icon
            name="lucide:calendar-x-2"
            class="w-7
                   h-7
                   text-slate-400"
          />

        </div>

        <h3
          class="mt-5
                 text-xl
                 font-black"
        >
          No events found
        </h3>

        <p
          class="mt-2
                 text-sm
                 text-slate-500"
        >
          Try another sport, status or search keyword.
        </p>

        <button
          @click="
            searchQuery = '';
            selectedSport = 'All';
            selectedStatus = 'All'
          "
          class="mt-6
                 bg-emerald-600
                 hover:bg-emerald-500
                 text-white
                 px-5
                 py-3
                 rounded-xl
                 text-sm
                 font-black"
        >
          Clear Filters
        </button>

      </div>

      <!-- Cards -->
      <div
        v-else
        class="grid
               grid-cols-1
               md:grid-cols-2
               lg:grid-cols-3
               gap-6"
      >

        <article
          v-for="event in filteredEvents"
          :key="event.id"
          class="group
                 bg-white
                 rounded-2xl
                 overflow-hidden
                 border
                 border-slate-200
                 hover:border-emerald-300
                 transition-all
                 duration-300"
        >

          <!-- Image -->
          <div
            class="relative
                   h-56
                   overflow-hidden
                   bg-slate-200"
          >

            <img
              :src="getEventImage(event)"
              :alt="event.title"
              class="w-full
                     h-full
                     object-cover
                     group-hover:scale-105
                     transition-transform
                     duration-500"
            />

            <div
              class="absolute
                     inset-0
                     bg-gradient-to-t
                     from-black/75
                     via-black/10
                     to-transparent"
            />

            <!-- Status -->
            <span
              :class="[
                'absolute top-4 left-4',
                'px-3 py-1.5',
                'rounded-lg',
                'text-[10px]',
                'font-black uppercase tracking-wider',
                getStatusClass(event.status)
              ]"
            >
              {{ event.status }}
            </span>

            <!-- Sport -->
            <span
              class="absolute
                     bottom-4
                     left-4
                     text-white
                     text-xs
                     font-black
                     flex
                     items-center
                     gap-2"
            >

              <span
                class="w-8
                       h-8
                       rounded-full
                       bg-white/20
                       backdrop-blur
                       flex
                       items-center
                       justify-center"
              >
                {{ getSportIcon(event.category) }}
              </span>

              {{ event.category }}

            </span>

          </div>

          <!-- Card body -->
          <div class="p-5">

            <!-- Type + Price -->
            <div
              class="flex
                     items-center
                     justify-between
                     gap-3"
            >

              <span
                class="text-[10px]
                       font-black
                       uppercase
                       tracking-wider
                       text-emerald-600
                       bg-emerald-50
                       px-2.5
                       py-1
                       rounded-md"
              >
                {{ event.type }}
              </span>

              <span
                v-if="event.price"
                class="text-xs
                       font-black
                       text-slate-900"
              >
                {{ event.price }}
              </span>

            </div>

            <!-- Title -->
            <h3
              class="mt-4
                     text-xl
                     font-black
                     leading-tight
                     group-hover:text-emerald-600
                     transition"
            >
              {{ event.title }}
            </h3>

            <!-- Information -->
            <div
              class="mt-5
                     space-y-3
                     text-sm
                     text-slate-500"
            >

              <div class="flex gap-3">

                <Icon
                  name="lucide:calendar"
                  class="w-4
                         h-4
                         text-emerald-600
                         flex-shrink-0"
                />

                <span class="font-semibold">
                  {{ event.date }}
                </span>

              </div>

              <div class="flex gap-3">

                <Icon
                  name="lucide:map-pin"
                  class="w-4
                         h-4
                         text-emerald-600
                         flex-shrink-0"
                />

                <span class="font-semibold truncate">
                  {{ event.location }}
                </span>

              </div>

              <div
                v-if="event.participants"
                class="flex gap-3"
              >

                <Icon
                  name="lucide:users"
                  class="w-4
                         h-4
                         text-emerald-600
                         flex-shrink-0"
                />

                <span class="font-semibold">

                  {{ event.participants }}

                  <span v-if="event.max_participants">
                    / {{ event.max_participants }}
                  </span>

                  Participants

                </span>

              </div>

            </div>

            <!-- Registration progress -->
            <div
              v-if="
                event.participants &&
                event.max_participants
              "
              class="mt-5"
            >

              <div
                class="flex
                       justify-between
                       text-[10px]
                       font-black
                       text-slate-400
                       mb-2"
              >

                <span>
                  Registration
                </span>

                <span>
                  {{
                    Math.round(
                      ((event.participants || 0) /
                        (event.max_participants || 1)) *
                        100,
                    )
                  }}%
                </span>

              </div>

              <div
                class="h-2
                       rounded-full
                       bg-slate-100
                       overflow-hidden"
              >

                <div
                  class="h-full
                         bg-gradient-to-r
                         from-emerald-500
                         to-lime-400
                         rounded-full"
                  :style="{
                    width:
                      Math.min(
                        ((event.participants || 0) /
                          (event.max_participants || 1)) *
                          100,
                        100,
                      ) + '%',
                  }"
                />

              </div>

            </div>

            <!-- Register -->
            <button
              @click="openRegisterModal(event)"
              :disabled="event.status === 'Completed'"
              :class="[
                'mt-6 w-full',
                'py-3',
                'rounded-xl',
                'text-sm font-black',
                'flex items-center justify-center gap-2',
                'transition',
                event.status === 'Completed'
                  ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                  : 'bg-emerald-600 hover:bg-emerald-500 text-white'
              ]"
            >

              {{
                event.status === 'Completed'
                  ? 'Registration Closed'
                  : 'Register Now'
              }}

              <Icon
                v-if="event.status !== 'Completed'"
                name="lucide:arrow-right"
                class="w-4 h-4"
              />

            </button>

          </div>

        </article>

      </div>

    </section>

    <!-- =====================================================
         CTA
    ====================================================== -->

    <section
      class="bg-[#07111f]
             text-white"
    >

      <div
        class="max-w-7xl
               mx-auto
               px-4
               sm:px-6
               lg:px-8
               py-16"
      >

        <div
          class="relative
                 overflow-hidden
                 rounded-3xl
                 bg-gradient-to-r
                 from-emerald-700
                 via-emerald-600
                 to-emerald-500
                 p-8
                 sm:p-12
                 flex
                 flex-col
                 lg:flex-row
                 lg:items-center
                 justify-between
                 gap-8"
        >

          <div
            class="absolute
                   -right-20
                   -top-20
                   w-64
                   h-64
                   rounded-full
                   bg-lime-300/20
                   blur-3xl"
          />

          <div class="relative">

            <p
              class="text-emerald-100
                     text-xs
                     font-black
                     uppercase
                     tracking-widest"
            >
              Own a Sports Venue?
            </p>

            <h2
              class="text-3xl
                     sm:text-4xl
                     font-black
                     mt-2"
            >
              Publish your event on
              CombolojoSPORT
            </h2>

            <p
              class="mt-3
                     text-emerald-50
                     max-w-2xl
                     text-sm
                     sm:text-base"
            >
              Connect with players, teams and sports
              communities across Ethiopia.
            </p>

          </div>

          <NuxtLink
            to="/partner"
            class="relative
                   flex-shrink-0
                   bg-white
                   text-slate-900
                   hover:bg-slate-100
                   px-6
                   py-3.5
                   rounded-xl
                   font-black
                   text-sm
                   text-center
                   transition"
          >
            Become a Partner
          </NuxtLink>

        </div>

      </div>

    </section>

    <!-- =====================================================
         REGISTRATION MODAL
    ====================================================== -->

    <Teleport to="body">

      <div
        v-if="isModalOpen"
        class="fixed
               inset-0
               z-[100]
               flex
               items-center
               justify-center
               p-4"
      >

        <!-- Overlay -->
        <div
          class="absolute
                 inset-0
                 bg-slate-950/75
                 backdrop-blur-sm"
          @click="closeModal"
        />

        <!-- Modal -->
        <div
          class="relative
                 w-full
                 max-w-md
                 bg-white
                 rounded-3xl
                 overflow-hidden"
        >

          <!-- Header -->
          <div
            class="bg-[#07111f]
                   text-white
                   px-6
                   py-5"
          >

            <div
              class="flex
                     items-center
                     justify-between"
            >

              <div>

                <p
                  class="text-emerald-400
                         text-[10px]
                         font-black
                         uppercase
                         tracking-widest"
                >
                  Event Registration
                </p>

                <h3
                  class="text-lg
                         font-black
                         mt-1"
                >
                  {{ selectedEvent?.title }}
                </h3>

              </div>

              <button
                @click="closeModal"
                class="w-9
                       h-9
                       rounded-full
                       bg-white/10
                       hover:bg-white/20
                       flex
                       items-center
                       justify-center"
              >

                <Icon
                  name="lucide:x"
                />

              </button>

            </div>

          </div>

          <!-- Success -->
          <div
            v-if="registrationSuccess"
            class="p-10
                   text-center"
          >

            <div
              class="w-16
                     h-16
                     mx-auto
                     rounded-full
                     bg-emerald-100
                     text-emerald-600
                     flex
                     items-center
                     justify-center"
            >

              <Icon
                name="lucide:check"
                class="w-8 h-8"
              />

            </div>

            <h3
              class="mt-5
                     text-2xl
                     font-black"
            >
              Registration Successful
            </h3>

            <p
              class="mt-2
                     text-sm
                     text-slate-500"
            >
              Your registration has been submitted
              successfully.
            </p>

          </div>

          <!-- Form -->
          <form
            v-else
            @submit.prevent="handleRegister"
            class="p-6
                   space-y-5"
          >

            <!-- Error -->
            <div
              v-if="registrationError"
              class="bg-red-50
                     border
                     border-red-200
                     text-red-600
                     rounded-xl
                     px-4
                     py-3
                     text-xs
                     font-semibold"
            >
              {{ registrationError }}
            </div>

            <!-- Full Name -->
            <div>

              <label
                class="block
                       text-xs
                       font-black
                       text-slate-600
                       mb-2"
              >
                Full Name
              </label>

              <input
                v-model="registrationForm.fullName"
                required
                type="text"
                placeholder="Enter your full name"
                class="w-full
                       px-4
                       py-3
                       rounded-xl
                       border
                       border-slate-200
                       bg-slate-50
                       outline-none
                       text-sm
                       focus:ring-2
                       focus:ring-emerald-500"
              />

            </div>

            <!-- Phone -->
            <div>

              <label
                class="block
                       text-xs
                       font-black
                       text-slate-600
                       mb-2"
              >
                Phone Number
              </label>

              <input
                v-model="registrationForm.phone"
                required
                type="tel"
                placeholder="+251 9..."
                class="w-full
                       px-4
                       py-3
                       rounded-xl
                       border
                       border-slate-200
                       bg-slate-50
                       outline-none
                       text-sm
                       focus:ring-2
                       focus:ring-emerald-500"
              />

            </div>

            <!-- Team Name -->
            <div
              v-if="
                selectedEvent?.type ===
                'Team Registration'
              "
            >

              <label
                class="block
                       text-xs
                       font-black
                       text-slate-600
                       mb-2"
              >
                Team Name
              </label>

              <input
                v-model="registrationForm.teamName"
                required
                type="text"
                placeholder="Enter your team name"
                class="w-full
                       px-4
                       py-3
                       rounded-xl
                       border
                       border-slate-200
                       bg-slate-50
                       outline-none
                       text-sm
                       focus:ring-2
                       focus:ring-emerald-500"
              />

            </div>

            <!-- Submit -->
            <button
              type="submit"
              :disabled="isSubmitting"
              class="w-full
                     bg-emerald-600
                     hover:bg-emerald-500
                     disabled:bg-slate-300
                     text-white
                     py-3.5
                     rounded-xl
                     font-black
                     text-sm
                     flex
                     items-center
                     justify-center
                     gap-2
                     transition"
            >

              <Icon
                v-if="isSubmitting"
                name="lucide:loader-2"
                class="w-4 h-4 animate-spin"
              />

              {{
                isSubmitting
                  ? 'Submitting...'
                  : 'Confirm Registration'
              }}

            </button>

          </form>

        </div>

      </div>

    </Teleport>

  </div>
</template>

<style scoped>
.events-hero-slide {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  animation: eventsHeroFade 12s infinite ease-in-out;
}

.events-hero-slide-1 { animation-delay: 0s; }
.events-hero-slide-2 { animation-delay: 4s; }
.events-hero-slide-3 { animation-delay: 8s; }

@keyframes eventsHeroFade {
  0% { opacity: 0; transform: scale(1); }
  4% { opacity: 1; }
  29% { opacity: 1; }
  33% { opacity: 0; transform: scale(1.08); }
  100% { opacity: 0; }
}
</style>
```
