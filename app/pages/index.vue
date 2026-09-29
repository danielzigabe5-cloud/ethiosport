```vue
<script setup lang="ts">
import { ref, computed } from 'vue'

import img1 from '~/assets/images/venu1.jpg'
import img2 from '~/assets/images/venue2.jpg'
import img3 from '~/assets/images/venue3.jpg'
import img4 from '~/assets/images/venue4.jpg'
import img5 from '~/assets/images/venue5.jpg'
import venue20Image from '~/assets/images/venues20.jpg'
import venue11Image from '~/assets/images/venuess11.jpg'
import venue12Image from '~/assets/images/venuess12.png'

/* =========================================================
   TYPES
========================================================= */

interface Venue {
  id: number
  name: string
  location: string
  sport: string
  rating: number
  reviews: number
  price: number
  image: string
  description: string
  features: string[]
}

interface SportEvent {
  id: number
  title: string
  date: string
  time: string
  location: string
  image: string
  description: string
  organizer: string
  sport: string
  participants: string
}

/* =========================================================
   STATE
========================================================= */

const venueSection = ref<HTMLElement | null>(null)

const searchSport = ref('All Sports')
const searchLocation = ref('')

const selectedVenue = ref<Venue | null>(null)
const selectedEvent = ref<SportEvent | null>(null)

const showVenueModal = ref(false)
const showEventModal = ref(false)

const openFaq = ref<number | null>(null)

/* =========================================================
   VENUES
========================================================= */

const venues: Venue[] = [
  {
    id: 1,
    name: 'ሳርቤት ፉትሳል',
    location: 'Addis Ababa, Saris',
    sport: 'Football',
    rating: 4.9,
    reviews: 124,
    price: 500,
    image: img1,
    description:
      'Modern futsal field suitable for competitive and friendly games. The venue is designed for football players, teams and sports communities.',
    features: ['Parking', 'Changing Room', 'Night Lighting']
  },
  {
    id: 2,
    name: 'Combolojo Football Arena',
    location: 'Addis Ababa, Bole',
    sport: 'Football',
    rating: 4.8,
    reviews: 98,
    price: 600,
    image: img2,
    description:
      'Premium football venue with a quality playing surface for training, friendly matches and competitive games.',
    features: ['Parking', 'Flood Lights', 'Refreshments']
  },
  {
    id: 3,
    name: 'City Basketball Court',
    location: 'Addis Ababa, Kazanchis',
    sport: 'Basketball',
    rating: 4.7,
    reviews: 76,
    price: 350,
    image: img3,
    description:
      'Professional basketball court for training, friendly games, tournaments and community activities.',
    features: ['Changing Room', 'Night Lighting', 'Seating']
  },
  {
    id: 4,
    name: 'Unity Volleyball Center',
    location: 'Addis Ababa, Piassa',
    sport: 'Volleyball',
    rating: 4.8,
    reviews: 67,
    price: 300,
    image: img4,
    description:
      'Comfortable volleyball venue suitable for teams, schools, communities and weekend competitions.',
    features: ['Parking', 'Seating', 'Equipment']
  },
  {
    id: 5,
    name: 'Sport Life Arena',
    location: 'Addis Ababa, CMC',
    sport: 'Football',
    rating: 4.9,
    reviews: 112,
    price: 550,
    image: img5,
    description:
      'Spacious sports venue designed for an enjoyable game day with friends, teams and sports communities.',
    features: ['Parking', 'Flood Lights', 'Changing Room']
  }
]

/* =========================================================
   EVENTS
========================================================= */

const events: SportEvent[] = [
  {
    id: 1,
    title: 'Combolojo Football Tournament',
    date: 'Oct 05, 2026',
    time: '09:00 AM',
    location: 'Sarbet Football Field',
    image: img1,
    description:
      'A community football tournament bringing players and teams together for a competitive and enjoyable game day.',
    organizer: 'CombolojoSPORT',
    sport: 'Football',
    participants: 'Teams and football players'
  },
  {
    id: 2,
    title: 'Community Basketball Day',
    date: 'Oct 12, 2026',
    time: '02:00 PM',
    location: 'City Basketball Court',
    image: img3,
    description:
      'A basketball community event where players can meet, play and enjoy a friendly sports environment.',
    organizer: 'CombolojoSPORT Community',
    sport: 'Basketball',
    participants: 'Basketball players and communities'
  },
  {
    id: 3,
    title: 'Weekend Volleyball Challenge',
    date: 'Oct 18, 2026',
    time: '10:00 AM',
    location: 'Unity Volleyball Center',
    image: img4,
    description:
      'A weekend volleyball challenge for teams and players looking for an active and enjoyable competition.',
    organizer: 'Unity Volleyball Center',
    sport: 'Volleyball',
    participants: 'Volleyball teams'
  }
]

/* =========================================================
   TESTIMONIALS
========================================================= */

const testimonials = [
  {
    name: 'Abebe K.',
    role: 'Football Player',
    text:
      'Booking a football field is now much easier. I can find a venue and reserve it in minutes.'
  },
  {
    name: 'Mimi T.',
    role: 'Sports Community',
    text:
      'CombolojoSPORT makes it easy for our group to organize games every weekend.'
  },
  {
    name: 'Dawit M.',
    role: 'Venue Partner',
    text:
      'The platform helps us manage bookings and reach more players.'
  }
]

/* =========================================================
   FAQ
========================================================= */

const faqs = [
  {
    question: 'How can I book a sports venue?',
    answer:
      'Choose your sport and location, select a venue, then use the mobile app to choose an available time slot and complete your booking.'
  },
  {
    question: 'Can I book a venue from my phone?',
    answer:
      'Yes. CombolojoSPORT booking is designed around the mobile app so users can search venues, choose slots and complete bookings from their phone.'
  },
  {
    question: 'Can venue owners join CombolojoSPORT?',
    answer:
      'Yes. Venue partners can register their venues and manage bookings, slots, events and earnings from the partner dashboard.'
  },
  {
    question: 'Can I participate in sports events?',
    answer:
      'Yes. Visit the Events section to discover upcoming sports events and activities.'
  }
]

/* =========================================================
   SPORTS
========================================================= */

const sports = [
  { name: 'Football', icon: '⚽' },
  { name: 'Basketball', icon: '🏀' },
  { name: 'Volleyball', icon: '🏐' },
  { name: 'Tennis', icon: '🎾' }
]

/* =========================================================
   SEARCH
========================================================= */

const filteredVenues = computed(() => {
  return venues.filter((venue) => {
    const sportMatch =
      searchSport.value === 'All Sports' ||
      venue.sport === searchSport.value

    const locationMatch =
      !searchLocation.value ||
      venue.location
        .toLowerCase()
        .includes(searchLocation.value.toLowerCase()) ||
      venue.name
        .toLowerCase()
        .includes(searchLocation.value.toLowerCase())

    return sportMatch && locationMatch
  })
})

/* =========================================================
   VENUE FUNCTIONS
========================================================= */

function searchVenues() {
  venueSection.value?.scrollIntoView({
    behavior: 'smooth',
    block: 'start'
  })
}

function selectSport(sport: string) {
  searchSport.value = sport
  searchVenues()
}

function openVenue(venue: Venue) {
  selectedVenue.value = venue
  showVenueModal.value = true
}

function closeVenue() {
  showVenueModal.value = false
  selectedVenue.value = null
}

/* =========================================================
   BOOKING
========================================================= */

function bookVenue() {
  closeVenue()
  navigateTo('/download-app')
}

/* =========================================================
   EVENT FUNCTIONS
========================================================= */

function openEvent(event: SportEvent) {
  selectedEvent.value = event
  showEventModal.value = true
}

function closeEvent() {
  showEventModal.value = false
  selectedEvent.value = null
}

function joinEvent() {
  closeEvent()

  navigateTo({
    path: '/download-app',
    query: {
      type: 'event'
    }
  })
}

/* =========================================================
   FAQ
========================================================= */

function toggleFaq(index: number) {
  openFaq.value = openFaq.value === index ? null : index
}

function clearSearch() {
  searchSport.value = 'All Sports'
  searchLocation.value = ''
}
</script>

<template>
  <div class="min-h-screen bg-[#f8faf9] text-slate-900">

    <!-- =====================================================
         HERO
    ====================================================== -->

    <section class="relative min-h-[650px] overflow-hidden bg-[#07150f]">

      <!-- Background -->
      <div class="absolute inset-0">

        <img
          :src="venue20Image"
          alt=""
          aria-hidden="true"
          class="hero-image hero-image-1"
        />

        <img
          :src="venue11Image"
          alt=""
          aria-hidden="true"
          class="hero-image hero-image-2"
        />

        <img
          :src="venue12Image"
          alt=""
          aria-hidden="true"
          class="hero-image hero-image-3"
        />

        <div class="absolute inset-0 bg-[#06130c]/55"></div>

        <div
          class="absolute inset-0 bg-gradient-to-r from-[#06130c]/95 via-[#06130c]/65 to-transparent"
        ></div>

        <div
          class="absolute inset-0 bg-gradient-to-t from-[#06130c] via-transparent to-[#06130c]/20"
        ></div>
      </div>

      <!-- Football decoration -->
      <div class="pointer-events-none absolute inset-0 overflow-hidden">

        <div
          class="absolute right-[-180px] top-1/2 hidden h-[620px] w-[620px] -translate-y-1/2 rounded-full border border-white/10 lg:block"
        ></div>

        <div
          class="absolute right-[130px] top-1/2 hidden h-[230px] w-[230px] -translate-y-1/2 rounded-full border border-white/10 lg:block"
        ></div>

        <div
          class="absolute right-0 top-1/2 hidden h-px w-[500px] bg-white/10 lg:block"
        ></div>

        <div
          class="absolute bottom-[-120px] left-[-100px] h-[350px] w-[350px] rounded-full border border-lime-400/10"
        ></div>

      </div>

      <!-- Hero content -->
      <div
        class="relative z-10 mx-auto flex min-h-[650px] max-w-7xl items-center justify-center px-6 py-20 lg:px-8"
      >

        <div class="mx-auto w-full max-w-5xl text-center">

          <!-- Brand -->
          <div
            class="mx-auto mb-7 inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-md"
          >

            <span
              class="flex h-7 w-7 items-center justify-center rounded-full bg-lime-400 text-sm"
            >
              ⚽
            </span>

            <span
              class="text-[10px] font-black uppercase tracking-[0.25em] text-white sm:text-xs"
            >
              Ethiopia's Sports Venue Platform
            </span>

          </div>

          <!-- Heading -->
          <h1
            class="mx-auto max-w-5xl text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl lg:text-7xl"
          >
            Book better

            <span class="mt-2 block font-black text-lime-400">
              sports venues
            </span>

            <span class="mt-1 block">
              across Ethiopia.
            </span>
          </h1>

          <!-- Accent -->
          <div class="mt-7 flex items-center justify-center gap-3">

            <div class="h-1 w-16 rounded-full bg-lime-400"></div>

            <div class="h-1 w-6 rounded-full bg-white/40"></div>

          </div>

          <!-- Description -->
          <p
            class="mx-auto mt-6 max-w-2xl text-base leading-7 text-white/75 sm:text-lg"
          >
            Discover premium sports venues, join community events, and book your
            next match with ease through the
            <span class="font-bold text-white">
              CombolojoSPORT
            </span>
            experience.
          </p>

          <!-- Search -->
          <div class="mx-auto mt-9 max-w-4xl text-left">

            <div
              class="mb-3 flex items-center justify-center gap-2"
            >
              <span class="text-lg">🔎</span>

              <p
                class="text-xs font-black uppercase tracking-wider text-white"
              >
                Find your sports venue
              </p>
            </div>

            <div class="grid gap-3 md:grid-cols-3">

              <!-- Sport -->
              <div
                class="rounded-xl border border-white/20 bg-white/95 px-4 py-3 transition focus-within:border-lime-500 focus-within:bg-white"
              >

                <label
                  class="mb-1 block text-[10px] font-black uppercase tracking-wider text-slate-400"
                >
                  Sport
                </label>

                <select
                  v-model="searchSport"
                  class="w-full border-none bg-transparent text-sm font-bold text-slate-900 outline-none"
                >
                  <option>All Sports</option>
                  <option>Football</option>
                  <option>Basketball</option>
                  <option>Volleyball</option>
                  <option>Tennis</option>
                </select>

              </div>

              <!-- Location -->
              <div
                class="rounded-xl border border-white/20 bg-white/95 px-4 py-3 transition focus-within:border-lime-500 focus-within:bg-white"
              >

                <label
                  class="mb-1 block text-[10px] font-black uppercase tracking-wider text-slate-400"
                >
                  Location
                </label>

                <input
                  v-model="searchLocation"
                  type="text"
                  placeholder="Search venue or location"
                  class="w-full bg-transparent text-sm font-bold text-slate-900 outline-none placeholder:text-slate-400"
                  @keyup.enter="searchVenues"
                />

              </div>

              <!-- Search -->
              <button
                type="button"
                @click="searchVenues"
                class="flex items-center justify-center gap-3 rounded-xl bg-[#064e3b] px-6 py-3 text-sm font-black text-white transition hover:bg-[#022c22]"
              >
                Search Venues

                <span class="text-lg text-lime-400">
                  →
                </span>
              </button>

            </div>

          </div>

          <!-- Trust -->
          <div
            class="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs font-bold text-white/70"
          >
            <span>✓ Verified venues</span>
            <span>✓ Easy booking</span>
            <span>✓ Mobile app</span>
            <span>✓ Sports events</span>
          </div>

        </div>

      </div>

      <!-- Bottom label -->
      <div
        class="absolute bottom-0 left-0 right-0 z-10 border-t border-white/10 bg-black/20 backdrop-blur-sm"
      >

        <div
          class="mx-auto flex max-w-7xl items-center justify-between px-6 py-3 text-[10px] font-bold uppercase tracking-wider text-white/50 lg:px-8"
        >
          <span>
            Addis Ababa • Ethiopia
          </span>

          <span>
            Play • Book • Connect
          </span>
        </div>

      </div>

    </section>


    <!-- =====================================================
         SPORTS
    ====================================================== -->

    <section class="bg-white py-14">

      <div class="mx-auto max-w-7xl px-6 lg:px-8">

        <div class="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">

          <div>

            <p
              class="text-[11px] font-black uppercase tracking-[0.2em] text-emerald-700"
            >
              Sports categories
            </p>

            <h2
              class="mt-2 text-3xl font-black tracking-tight text-slate-900"
            >
              Choose your game.
            </h2>

            <p
              class="mt-2 max-w-xl text-sm leading-6 text-slate-500"
            >
              Explore the sport that matches your energy and find the perfect
              venue for your next session.
            </p>

          </div>

          <div class="hidden h-px flex-1 bg-slate-200 sm:ml-10 sm:block"></div>

        </div>

        <div class="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">

          <button
            v-for="sport in sports"
            :key="sport.name"
            type="button"
            @click="selectSport(sport.name)"
            class="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 text-left transition hover:-translate-y-1 hover:border-emerald-200 hover:bg-emerald-50/30"
          >

            <div
              class="absolute right-0 top-0 h-20 w-20 rounded-bl-full bg-emerald-50 transition group-hover:bg-lime-100"
            ></div>

            <div class="relative">

              <div
                class="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-50 text-3xl"
              >
                {{ sport.icon }}
              </div>

              <h3
                class="mt-5 text-base font-black text-slate-900"
              >
                {{ sport.name }}
              </h3>

              <p
                class="mt-1 text-xs font-bold text-slate-400 transition group-hover:text-emerald-700"
              >
                Find venues →
              </p>

            </div>

          </button>

        </div>

      </div>

    </section>


    <!-- =====================================================
         HOW IT WORKS
    ====================================================== -->

    <section class="bg-[#f0f5f2] py-14">

      <div class="mx-auto max-w-7xl px-6 lg:px-8">

        <div class="text-center">

          <p
            class="text-[11px] font-black uppercase tracking-[0.2em] text-emerald-700"
          >
            Simple process
          </p>

          <h2
            class="mt-2 text-3xl font-black tracking-tight text-slate-900"
          >
            How CombolojoSPORT works
          </h2>

          <p
            class="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-500"
          >
            Find your venue on the website and complete the booking from the
            mobile application.
          </p>

        </div>

        <div class="mt-10 grid gap-5 md:grid-cols-4">

          <div
            v-for="step in [
              {
                number: '01',
                icon: '🔎',
                title: 'Find',
                text: 'Search for your preferred sports venue.'
              },
              {
                number: '02',
                icon: '👁️',
                title: 'View Details',
                text: 'Check the venue information, facilities and price.'
              },
              {
                number: '03',
                icon: '📱',
                title: 'Get App',
                text: 'Download the CombolojoSPORT mobile application.'
              },
              {
                number: '04',
                icon: '📅',
                title: 'Book',
                text: 'Choose your date and available time slot in the app.'
              }
            ]"
            :key="step.number"
            class="group relative rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:border-emerald-200"
          >

            <span
              class="absolute right-5 top-5 text-[10px] font-black text-emerald-300"
            >
              {{ step.number }}
            </span>

            <div
              class="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-xl transition group-hover:bg-emerald-50"
            >
              {{ step.icon }}
            </div>

            <h3
              class="mt-5 text-base font-black text-slate-900"
            >
              {{ step.title }}
            </h3>

            <p
              class="mt-2 text-sm leading-6 text-slate-500"
            >
              {{ step.text }}
            </p>

          </div>

        </div>

      </div>

    </section>


    <!-- =====================================================
         VENUES
    ====================================================== -->

    <section
      ref="venueSection"
      class="scroll-mt-16 bg-[#f8faf9] py-14"
    >

      <div class="mx-auto max-w-7xl px-6 lg:px-8">

        <div
          class="flex flex-col justify-between gap-4 md:flex-row md:items-end"
        >

          <div>

            <p
              class="text-[11px] font-black uppercase tracking-[0.2em] text-emerald-700"
            >
              Featured venues
            </p>

            <h2
              class="mt-2 text-3xl font-black tracking-tight text-slate-900"
            >
              Find your perfect field
            </h2>

            <p class="mt-2 text-sm text-slate-500">
              Explore sports venues and check their complete information.
            </p>

          </div>

          <NuxtLink
            to="/venues"
            class="inline-flex items-center gap-2 text-sm font-black text-emerald-700 hover:text-lime-600"
          >
            View all venues
            <span>→</span>
          </NuxtLink>

        </div>

        <!-- Venue cards -->
        <div
          v-if="filteredVenues.length"
          class="mt-9 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >

          <article
            v-for="venue in filteredVenues.slice(0, 4)"
            :key="venue.id"
            class="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:-translate-y-1 hover:border-emerald-200"
          >

            <div class="relative h-48 overflow-hidden">

              <img
                :src="venue.image"
                :alt="venue.name"
                class="h-full w-full object-cover transition duration-500 group-hover:scale-110"
              />

              <div
                class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
              ></div>

              <span
                class="absolute left-3 top-3 rounded-lg bg-white/95 px-2.5 py-1 text-[10px] font-black text-slate-900"
              >
                {{ venue.sport }}
              </span>

              <span
                class="absolute right-3 top-3 rounded-lg bg-[#064e3b] px-2.5 py-1 text-[10px] font-black text-white"
              >
                ★ {{ venue.rating }}
              </span>

            </div>

            <div class="p-5">

              <h3
                class="truncate text-base font-black text-slate-900"
              >
                {{ venue.name }}
              </h3>

              <p class="mt-2 text-xs text-slate-500">
                📍 {{ venue.location }}
              </p>

              <p class="mt-1 text-[11px] text-slate-400">
                {{ venue.reviews }} reviews
              </p>

              <div class="my-4 h-px bg-slate-100"></div>

              <div class="flex items-end justify-between gap-2">

                <div>

                  <p
                    class="text-[10px] font-bold uppercase text-slate-400"
                  >
                    Starting from
                  </p>

                  <p
                    class="mt-1 text-base font-black text-emerald-700"
                  >
                    ETB {{ venue.price }}

                    <span
                      class="text-[10px] font-normal text-slate-400"
                    >
                      / hour
                    </span>
                  </p>

                </div>

                <button
                  type="button"
                  @click="openVenue(venue)"
                  class="rounded-lg bg-slate-900 px-3 py-2 text-xs font-black text-white transition hover:bg-emerald-700"
                >
                  View Details
                </button>

              </div>

            </div>

          </article>

        </div>

        <!-- Empty -->
        <div
          v-else
          class="mt-8 rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center"
        >

          <div class="text-3xl">
            🔎
          </div>

          <h3 class="mt-3 text-lg font-black">
            No venues found
          </h3>

          <p class="mt-1 text-sm text-slate-500">
            Try another sport or location.
          </p>

          <button
            type="button"
            @click="clearSearch"
            class="mt-4 rounded-lg bg-emerald-700 px-4 py-2 text-sm font-black text-white hover:bg-emerald-800"
          >
            Clear Search
          </button>

        </div>

      </div>

    </section>


    <!-- =====================================================
         EVENTS
    ====================================================== -->

    <section
      class="relative overflow-hidden bg-[#07150f] py-14 text-white"
    >

      <div
        class="pointer-events-none absolute right-[-200px] top-1/2 h-[600px] w-[600px] -translate-y-1/2 rounded-full border border-white/5"
      ></div>

      <div class="relative mx-auto max-w-7xl px-6 lg:px-8">

        <div
          class="flex flex-col justify-between gap-4 md:flex-row md:items-end"
        >

          <div>

            <p
              class="text-[11px] font-black uppercase tracking-[0.2em] text-lime-400"
            >
              Upcoming events
            </p>

            <h2 class="mt-2 text-3xl font-black tracking-tight">
              Play together. Compete together.
            </h2>

            <p class="mt-2 text-sm text-white/50">
              Discover tournaments, games and community events.
            </p>

          </div>

          <NuxtLink
            to="/events"
            class="text-sm font-black text-lime-400 hover:text-lime-300"
          >
            View all events →
          </NuxtLink>

        </div>

        <div class="mt-9 grid gap-6 md:grid-cols-3">

          <article
            v-for="event in events"
            :key="event.id"
            class="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.05] transition hover:border-lime-400/30 hover:bg-white/[0.07]"
          >

            <div class="relative h-44 overflow-hidden">

              <img
                :src="event.image"
                :alt="event.title"
                class="h-full w-full object-cover transition duration-500 hover:scale-105"
              />

              <div
                class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"
              ></div>

              <span
                class="absolute bottom-3 left-3 rounded-lg bg-lime-400 px-2.5 py-1 text-[10px] font-black text-[#07150f]"
              >
                {{ event.sport }}
              </span>

            </div>

            <div class="p-5">

              <p class="text-xs font-bold text-lime-400">
                {{ event.date }}
              </p>

              <h3 class="mt-2 text-lg font-black">
                {{ event.title }}
              </h3>

              <p class="mt-2 text-xs text-white/50">
                📍 {{ event.location }}
              </p>

              <p class="mt-1 text-xs text-white/50">
                🕐 {{ event.time }}
              </p>

              <button
                type="button"
                @click="openEvent(event)"
                class="mt-5 rounded-lg bg-white px-4 py-2 text-xs font-black text-slate-900 transition hover:bg-lime-400"
              >
                View Details
              </button>

            </div>

          </article>

        </div>

      </div>

    </section>


    <!-- =====================================================
         WHY CHOOSE US
    ====================================================== -->

    <section class="bg-[#f0f5f2] py-14">

      <div class="mx-auto max-w-7xl px-6 lg:px-8">

        <div class="grid items-center gap-10 lg:grid-cols-2">

          <div>

            <p
              class="text-[11px] font-black uppercase tracking-[0.2em] text-emerald-700"
            >
              Why CombolojoSPORT?
            </p>

            <h2
              class="mt-2 text-3xl font-black leading-tight text-slate-900 sm:text-4xl"
            >
              Everything you need

              <span class="text-emerald-700">
                to enjoy sports.
              </span>
            </h2>

            <p
              class="mt-4 max-w-xl text-sm leading-7 text-slate-500"
            >
              We connect players, teams, sports communities and venue partners
              through one simple platform.
            </p>

            <NuxtLink
              to="/about"
              class="mt-6 inline-flex rounded-xl bg-[#064e3b] px-5 py-3 text-sm font-black text-white transition hover:bg-[#022c22]"
            >
              Learn More →
            </NuxtLink>

          </div>

          <div class="grid gap-4 sm:grid-cols-2">

            <div
              v-for="feature in [
                {
                  icon: '✓',
                  title: 'Verified Venues',
                  text: 'Discover trusted sports venues.'
                },
                {
                  icon: '⚡',
                  title: 'Fast Booking',
                  text: 'Find your venue quickly and book through the mobile app.'
                },
                {
                  icon: '🔒',
                  title: 'Secure Payment',
                  text: 'Complete booking payments through supported mobile options.'
                },
                {
                  icon: '🏆',
                  title: 'Community Events',
                  text: 'Join tournaments and sports events.'
                }
              ]"
              :key="feature.title"
              class="rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-1 hover:border-emerald-200"
            >

              <div
                class="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-lg font-black text-emerald-700"
              >
                {{ feature.icon }}
              </div>

              <h3
                class="mt-4 text-sm font-black text-slate-900"
              >
                {{ feature.title }}
              </h3>

              <p
                class="mt-1 text-xs leading-5 text-slate-500"
              >
                {{ feature.text }}
              </p>

            </div>

          </div>

        </div>

      </div>

    </section>


    <!-- =====================================================
         JUST PLAY
    ====================================================== -->

    <section class="bg-[#f0fdf4] py-14">

      <div class="mx-auto max-w-7xl px-6 lg:px-8">

        <div
          class="overflow-hidden rounded-3xl border border-emerald-100 bg-white"
        >

          <div class="grid items-center lg:grid-cols-2">

            <div class="p-8 sm:p-10 lg:p-14">

              <p
                class="text-[11px] font-black uppercase tracking-[0.2em] text-emerald-700"
              >
                Just Play
              </p>

              <h2
                class="mt-3 text-3xl font-black leading-tight text-slate-900 sm:text-4xl"
              >
                Don't have a team?

                <br />

                <span class="text-emerald-700">
                  Just play.
                </span>
              </h2>

              <p
                class="mt-4 max-w-xl text-sm leading-7 text-slate-500"
              >
                Connect with other players, discover games and join sports
                communities around you.
              </p>

              <NuxtLink
                to="/justplay"
                class="mt-7 inline-flex rounded-xl bg-[#064e3b] px-6 py-3 text-sm font-black text-white transition hover:bg-[#022c22]"
              >
                Explore Just Play →
              </NuxtLink>

            </div>

            <div class="relative h-[340px] overflow-hidden lg:h-full">

              <img
                :src="img1"
                alt="Football field"
                class="h-full w-full scale-105 object-cover"
              />

              <div
                class="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
              ></div>

              <div
                class="absolute bottom-5 left-5 rounded-xl bg-black/60 px-4 py-2 backdrop-blur-md"
              >
                <p class="text-xs font-black text-white">
                  FIND YOUR GAME
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>

    </section>


    <!-- =====================================================
         STATS
    ====================================================== -->

    <section class="bg-[#07150f] py-14 text-white">

      <div
        class="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-6 md:grid-cols-4 lg:px-8"
      >

        <div class="text-center">

          <p class="text-4xl font-black text-lime-400">
            50+
          </p>

          <p
            class="mt-2 text-xs font-bold uppercase tracking-wider text-white/50"
          >
            Sports Venues
          </p>

        </div>

        <div class="text-center">

          <p class="text-4xl font-black text-lime-400">
            10K+
          </p>

          <p
            class="mt-2 text-xs font-bold uppercase tracking-wider text-white/50"
          >
            Active Players
          </p>

        </div>

        <div class="text-center">

          <p class="text-4xl font-black text-lime-400">
            500+
          </p>

          <p
            class="mt-2 text-xs font-bold uppercase tracking-wider text-white/50"
          >
            Events
          </p>

        </div>

        <div class="text-center">

          <p class="text-4xl font-black text-lime-400">
            24/7
          </p>

          <p
            class="mt-2 text-xs font-bold uppercase tracking-wider text-white/50"
          >
            Support
          </p>

        </div>

      </div>

    </section>


    <!-- =====================================================
         TESTIMONIALS
    ====================================================== -->

    <section class="bg-white py-14">

      <div class="mx-auto max-w-7xl px-6 lg:px-8">

        <div class="text-center">

          <p
            class="text-[11px] font-black uppercase tracking-[0.2em] text-emerald-700"
          >
            Community
          </p>

          <h2 class="mt-2 text-3xl font-black text-slate-900">
            What players say
          </h2>

        </div>

        <div class="mt-9 grid gap-6 md:grid-cols-3">

          <article
            v-for="review in testimonials"
            :key="review.name"
            class="rounded-2xl border border-slate-200 bg-[#f8faf9] p-6 transition hover:-translate-y-1 hover:bg-white"
          >

            <div class="text-sm tracking-widest text-amber-500">
              ★★★★★
            </div>

            <p
              class="mt-4 text-sm leading-7 text-slate-600"
            >
              “{{ review.text }}”
            </p>

            <div class="mt-5 flex items-center gap-3">

              <div
                class="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-sm font-black text-emerald-700"
              >
                {{ review.name.charAt(0) }}
              </div>

              <div>

                <p class="text-sm font-black text-slate-900">
                  {{ review.name }}
                </p>

                <p class="text-xs text-slate-400">
                  {{ review.role }}
                </p>

              </div>

            </div>

          </article>

        </div>

      </div>

    </section>


    <!-- =====================================================
         FAQ
    ====================================================== -->

    <section class="bg-[#f0f5f2] py-14">

      <div class="mx-auto max-w-4xl px-6 lg:px-8">

        <div class="text-center">

          <p
            class="text-[11px] font-black uppercase tracking-[0.2em] text-emerald-700"
          >
            FAQ
          </p>

          <h2 class="mt-2 text-3xl font-black text-slate-900">
            Frequently asked questions
          </h2>

        </div>

        <div class="mt-9 space-y-3">

          <div
            v-for="(faq, index) in faqs"
            :key="faq.question"
            class="overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:border-emerald-200"
          >

            <button
              type="button"
              @click="toggleFaq(index)"
              class="flex w-full items-center justify-between gap-4 p-5 text-left text-sm font-black text-slate-900"
            >

              <span>
                {{ faq.question }}
              </span>

              <span class="text-xl text-emerald-700">
                {{ openFaq === index ? '−' : '+' }}
              </span>

            </button>

            <div
              v-if="openFaq === index"
              class="border-t border-slate-100 px-5 pb-5 pt-4 text-xs leading-6 text-slate-500"
            >
              {{ faq.answer }}
            </div>

          </div>

        </div>

      </div>

    </section>


    <!-- =====================================================
         CTA
    ====================================================== -->

    <section
      class="relative overflow-hidden bg-[#022c22] py-16 text-white"
    >

      <div
        class="pointer-events-none absolute right-[-100px] top-1/2 h-96 w-96 -translate-y-1/2 rounded-full border border-lime-400/10"
      ></div>

      <div
        class="relative mx-auto max-w-5xl px-6 text-center lg:px-8"
      >

        <div
          class="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-lime-400 text-2xl"
        >
          ⚽
        </div>

        <p
          class="mt-6 text-[11px] font-black uppercase tracking-[0.25em] text-lime-400"
        >
          Your next game starts here
        </p>

        <h2 class="mt-3 text-3xl font-black sm:text-5xl">
          Your game is waiting.
        </h2>

        <p
          class="mx-auto mt-4 max-w-2xl text-sm leading-7 text-white/55"
        >
          Find a venue, download the app and book your time.
        </p>

        <div class="mt-8 flex flex-col justify-center gap-3 sm:flex-row">

          <NuxtLink
            to="/venues"
            class="rounded-xl bg-lime-400 px-7 py-3 text-sm font-black text-[#022c22] transition hover:bg-lime-300"
          >
            Find a Venue
          </NuxtLink>

          <NuxtLink
            to="/download-app"
            class="rounded-xl border border-white/20 bg-white/5 px-7 py-3 text-sm font-black text-white transition hover:bg-white/10"
          >
            Download Mobile App
          </NuxtLink>

        </div>

      </div>

    </section>


    <!-- =====================================================
         MODALS
    ====================================================== -->

    <Teleport to="body">

      <!-- VENUE MODAL -->
      <div
        v-if="showVenueModal && selectedVenue"
        class="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
        @click.self="closeVenue"
      >

        <div
          class="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white"
        >

          <!-- Image -->
          <div class="relative h-64">

            <img
              :src="selectedVenue.image"
              :alt="selectedVenue.name"
              class="h-full w-full object-cover"
            />

            <div
              class="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"
            ></div>

            <button
              type="button"
              @click="closeVenue"
              class="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white transition hover:bg-black"
            >
              ✕
            </button>

            <div
              class="absolute bottom-5 left-5 right-5 text-white"
            >

              <span
                class="inline-block rounded-full bg-emerald-600 px-3 py-1 text-xs font-bold"
              >
                {{ selectedVenue.sport }}
              </span>

              <h3 class="mt-2 text-2xl font-black">
                {{ selectedVenue.name }}
              </h3>

              <p class="mt-1 text-sm text-white/80">
                📍 {{ selectedVenue.location }}
              </p>

            </div>

          </div>

          <div class="p-6">

            <!-- Stats -->
            <div class="grid gap-4 sm:grid-cols-3">

              <div class="rounded-2xl bg-slate-50 p-4">

                <p class="text-xs text-slate-500">
                  Rating
                </p>

                <p
                  class="mt-1 text-xl font-black text-amber-500"
                >
                  ★ {{ selectedVenue.rating }}
                </p>

                <p class="text-xs text-slate-500">
                  {{ selectedVenue.reviews }} reviews
                </p>

              </div>

              <div class="rounded-2xl bg-slate-50 p-4">

                <p class="text-xs text-slate-500">
                  Price
                </p>

                <p
                  class="mt-1 text-xl font-black text-emerald-700"
                >
                  ETB {{ selectedVenue.price }}
                </p>

                <p class="text-xs text-slate-500">
                  per hour
                </p>

              </div>

              <div class="rounded-2xl bg-slate-50 p-4">

                <p class="text-xs text-slate-500">
                  Sport
                </p>

                <p
                  class="mt-1 text-xl font-black text-slate-900"
                >
                  {{ selectedVenue.sport }}
                </p>

              </div>

            </div>

            <!-- About -->
            <div class="mt-6">

              <h4 class="text-sm font-black text-slate-900">
                About this venue
              </h4>

              <p
                class="mt-2 text-sm leading-7 text-slate-600"
              >
                {{ selectedVenue.description }}
              </p>

            </div>

            <!-- Facilities -->
            <div class="mt-6">

              <h4 class="text-sm font-black text-slate-900">
                Facilities & Amenities
              </h4>

              <div class="mt-3 flex flex-wrap gap-2">

                <span
                  v-for="feature in selectedVenue.features"
                  :key="feature"
                  class="rounded-xl bg-emerald-50 px-3 py-2 text-xs font-bold text-emerald-700"
                >
                  ✓ {{ feature }}
                </span>

              </div>

            </div>

            <!-- Mobile App -->
            <div class="mt-7 rounded-2xl bg-emerald-50 p-4">

              <div class="flex gap-3">

                <div
                  class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-700 text-xl text-white"
                >
                  📱
                </div>

                <div>

                  <h4
                    class="text-sm font-black text-emerald-950"
                  >
                    Booking is available in the mobile app
                  </h4>

                  <p
                    class="mt-1 text-xs leading-5 text-emerald-800"
                  >
                    Download CombolojoSPORT and choose your date and available
                    time slot from the mobile application.
                  </p>

                </div>

              </div>

            </div>

            <!-- Buttons -->
            <div class="mt-6 flex gap-3">

              <button
                type="button"
                @click="closeVenue"
                class="w-1/2 rounded-xl border border-slate-300 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
              >
                Close
              </button>

              <button
                type="button"
                @click="bookVenue"
                class="w-1/2 rounded-xl bg-[#064e3b] py-3 text-sm font-bold text-white transition hover:bg-[#022c22]"
              >
                Book Now →
              </button>

            </div>

          </div>

        </div>

      </div>


      <!-- EVENT MODAL -->
      <div
        v-if="showEventModal && selectedEvent"
        class="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
        @click.self="closeEvent"
      >

        <div
          class="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white"
        >

          <!-- Image -->
          <div class="relative h-64">

            <img
              :src="selectedEvent.image"
              :alt="selectedEvent.title"
              class="h-full w-full object-cover"
            />

            <div
              class="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"
            ></div>

            <button
              type="button"
              @click="closeEvent"
              class="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white transition hover:bg-black"
            >
              ✕
            </button>

            <div
              class="absolute bottom-5 left-5 right-5"
            >

              <span
                class="rounded-full bg-emerald-600 px-3 py-1 text-xs font-bold text-white"
              >
                {{ selectedEvent.sport }}
              </span>

              <h3
                class="mt-2 text-2xl font-black text-white"
              >
                {{ selectedEvent.title }}
              </h3>

            </div>

          </div>

          <div class="p-6">

            <!-- Event info -->
            <div class="grid gap-3 sm:grid-cols-2">

              <div class="rounded-2xl bg-slate-50 p-4">

                <p class="text-xs text-slate-500">
                  Date
                </p>

                <p class="mt-1 text-sm font-black">
                  📅 {{ selectedEvent.date }}
                </p>

              </div>

              <div class="rounded-2xl bg-slate-50 p-4">

                <p class="text-xs text-slate-500">
                  Time
                </p>

                <p class="mt-1 text-sm font-black">
                  🕐 {{ selectedEvent.time }}
                </p>

              </div>

              <div class="rounded-2xl bg-slate-50 p-4">

                <p class="text-xs text-slate-500">
                  Location
                </p>

                <p class="mt-1 text-sm font-black">
                  📍 {{ selectedEvent.location }}
                </p>

              </div>

              <div class="rounded-2xl bg-slate-50 p-4">

                <p class="text-xs text-slate-500">
                  Organizer
                </p>

                <p class="mt-1 text-sm font-black">
                  {{ selectedEvent.organizer }}
                </p>

              </div>

            </div>

            <!-- About -->
            <div class="mt-6">

              <h4 class="text-sm font-black">
                About this event
              </h4>

              <p
                class="mt-2 text-sm leading-7 text-slate-600"
              >
                {{ selectedEvent.description }}
              </p>

            </div>

            <!-- Participants -->
            <div class="mt-5 rounded-2xl bg-emerald-50 p-4">

              <p
                class="text-xs font-bold uppercase tracking-wide text-emerald-700"
              >
                Participants
              </p>

              <p
                class="mt-1 text-sm font-semibold text-emerald-950"
              >
                {{ selectedEvent.participants }}
              </p>

            </div>

            <!-- Buttons -->
            <div class="mt-6 flex gap-3">

              <button
                type="button"
                @click="closeEvent"
                class="w-1/2 rounded-xl border border-slate-300 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50"
              >
                Close
              </button>

              <button
                type="button"
                @click="joinEvent"
                class="w-1/2 rounded-xl bg-[#064e3b] py-3 text-sm font-bold text-white hover:bg-[#022c22]"
              >
                Join / Get App →
              </button>

            </div>

          </div>

        </div>

      </div>

    </Teleport>

  </div>
</template>


<style scoped>
/* =========================================================
   HERO IMAGE SLIDESHOW
========================================================= */

.hero-image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  animation: imageFade 12s infinite ease-in-out;
}

.hero-image-1 {
  animation-delay: 0s;
}

.hero-image-2 {
  animation-delay: 4s;
}

.hero-image-3 {
  animation-delay: 8s;
}

@keyframes imageFade {
  0% {
    opacity: 0;
    transform: scale(1);
  }

  4% {
    opacity: 1;
  }

  29% {
    opacity: 1;
  }

  33% {
    opacity: 0;
    transform: scale(1.08);
  }

  100% {
    opacity: 0;
  }
}

/* =========================================================
   ACCESSIBILITY
========================================================= */

@media (prefers-reduced-motion: reduce) {
  .hero-image {
    animation: none;
    opacity: 0;
  }

  .hero-image-1 {
    opacity: 1;
  }
}
</style>
```
