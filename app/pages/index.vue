<script setup lang="ts">
import {
  ref,
  computed,
  onMounted,
  onBeforeUnmount
} from 'vue'

/* =========================================================
   IMAGES
========================================================= */

import img1 from '~/assets/images/venu1.jpg'
import img2 from '~/assets/images/venue2.jpg'
import img3 from '~/assets/images/venue3.jpg'
import img4 from '~/assets/images/venue4.jpg'
import img5 from '~/assets/images/venue5.jpg'

import venue20Image from '~/assets/images/venues20.jpg'
import venue10Image from '~/assets/images/venuess10.jpg'
import venue11Image from '~/assets/images/venuess11.jpg'
import venue12Image from '~/assets/images/venuess12.png'
import venue13Image from '~/assets/images/venuess13.jpg'
import venue7Image from '~/assets/images/venues7.jpg'
import venue14Image from '~/assets/images/venuess14.jpg'


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
  images?: string[]
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
  sport: string
}


/* =========================================================
   STATE
========================================================= */

const venueSection = ref<HTMLElement | null>(null)

const searchSport = ref('All Sports')
const searchLocation = ref('')

const selectedVenue = ref<Venue | null>(null)
const showVenueModal = ref(false)
const selectedVenueImages = computed(() => {
  if (!selectedVenue.value) {
    return []
  }

  return [...new Set([selectedVenue.value.image, ...(selectedVenue.value.images || [])].filter(Boolean))]
})

const openFaq = ref<number | null>(null)

const currentHeroIndex = ref(0)

let heroTimer: ReturnType<typeof setInterval> | null = null


/* =========================================================
   HERO SLIDESHOW
========================================================= */

const heroImages = [
  venue20Image,
  venue10Image,
  venue11Image,
  venue12Image,
  venue13Image,
  venue7Image,
  venue14Image
]

onMounted(() => {
  heroTimer = setInterval(() => {
    currentHeroIndex.value =
      (currentHeroIndex.value + 1) % heroImages.length
  }, 4500)
})

onBeforeUnmount(() => {
  if (heroTimer) {
    clearInterval(heroTimer)
    heroTimer = null
  }
})


/* =========================================================
   SPORTS
========================================================= */

const sports = [
  {
    name: 'Football',
    icon: '⚽',
    description: 'Football fields and futsal venues'
  },
  {
    name: 'Basketball',
    icon: '🏀',
    description: 'Courts for training and games'
  },
  {
    name: 'Volleyball',
    icon: '🏐',
    description: 'Indoor and outdoor volleyball'
  },
  {
    name: 'Tennis',
    icon: '🎾',
    description: 'Tennis courts and sessions'
  }
]


/* =========================================================
   VENUES
========================================================= */

const venues: Venue[] = [
  {
    id: 1,
    name: 'Sarbet Futsal Arena',
    location: 'Addis Ababa, Sarbet',
    sport: 'Football',
    rating: 4.9,
    reviews: 124,
    price: 500,
    image: img1,
    description:
      'A modern futsal venue suitable for competitive matches, friendly games, training sessions and sports communities.',
    features: [
      'Parking',
      'Changing Room',
      'Night Lighting'
    ]
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
      'A premium football venue with a quality playing surface for training, friendly matches and competitive games.',
    features: [
      'Parking',
      'Flood Lights',
      'Refreshments'
    ]
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
      'A professional basketball court suitable for training, friendly games, tournaments and community activities.',
    features: [
      'Changing Room',
      'Night Lighting',
      'Seating'
    ]
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
      'A comfortable volleyball venue suitable for teams, schools, communities and weekend competitions.',
    features: [
      'Parking',
      'Seating',
      'Equipment'
    ]
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
      'A spacious sports venue designed for enjoyable game days with friends, teams and sports communities.',
    features: [
      'Parking',
      'Flood Lights',
      'Changing Room'
    ]
  }
]

/* =========================================================
   EVENTS
========================================================= */

const events: SportEvent[] = [
  {
    id: 1,
    title: 'Community Football Weekend',
    date: 'Oct 05, 2026',
    time: '09:00 AM',
    location: 'Sarbet Football Field, Addis Ababa',
    image: venue20Image,
    description: 'Join a competitive and social football tournament for teams and players in Addis Ababa.',
    sport: 'Football'
  },
  {
    id: 2,
    title: 'City Basketball Meetup',
    date: 'Oct 12, 2026',
    time: '02:00 PM',
    location: 'City Basketball Court, Kazanchis',
    image: venue10Image,
    description: 'A friendly basketball event with pickup games, skill drills and community energy.',
    sport: 'Basketball'
  },
  {
    id: 3,
    title: 'Volleyball Challenge',
    date: 'Oct 18, 2026',
    time: '10:00 AM',
    location: 'Unity Volleyball Center, Piassa',
    image: venue11Image,
    description: 'Compete or participate in a weekend volleyball challenge built for active teams and community players.',
    sport: 'Volleyball'
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
      'CombolojoSPORT makes it easier to discover sports venues and continue to the mobile app for booking.'
  },

  {
    name: 'Mimi T.',
    role: 'Sports Community',
    text:
      'Our group can easily explore venues and organize games through the CombolojoSPORT platform.'
  },

  {
    name: 'Dawit M.',
    role: 'Venue Partner',
    text:
      'The platform helps sports venues reach more players and provides a better way to manage bookings.'
  }
]


/* =========================================================
   FAQ
========================================================= */

const faqs = [
  {
    question: 'What is CombolojoSPORT?',
    answer:
      'CombolojoSPORT is a sports venue platform that helps users discover sports venues, view venue information and connect with the mobile application for booking.'
  },

  {
    question: 'Can I book a venue directly from the website?',
    answer:
      'The website is designed for discovering and viewing sports venues. To complete a booking, download and use the CombolojoSPORT mobile application.'
  },

  {
    question: 'How do I book a sports venue?',
    answer:
      'Find a venue on the website, view its details, download the CombolojoSPORT mobile app, choose an available date and time slot, and complete your booking in the app.'
  },

  {
    question: 'Can venue owners join CombolojoSPORT?',
    answer:
      'Yes. Venue partners can join the platform and manage their venues, schedules, bookings, events and related activities through the partner system.'
  },

  {
    question: 'Can I discover sports events?',
    answer:
      'Yes. Visit the Events section to discover upcoming sports activities, tournaments and community events.'
  }
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
   FUNCTIONS
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

function clearSearch() {
  searchSport.value = 'All Sports'
  searchLocation.value = ''
}

function openVenue(venue: Venue) {
  selectedVenue.value = venue
  showVenueModal.value = true
}

function closeVenue() {
  showVenueModal.value = false
  selectedVenue.value = null
}

function bookVenue() {
  closeVenue()

  navigateTo('/download-app')
}

function toggleFaq(index: number) {
  openFaq.value =
    openFaq.value === index
      ? null
      : index
}
</script>


<template>
  <div class="min-h-screen bg-[#f7faf8] text-slate-900">

    <!-- =====================================================
         HERO
    ====================================================== -->

    <section
      class="relative min-h-[680px] overflow-hidden bg-[#07150f]"
    >

      <!-- HERO SLIDES -->
      <div class="absolute inset-0">

        <img
          v-for="(image, index) in heroImages"
          :key="index"
          :src="image"
          alt="CombolojoSPORT sports venue"
          class="hero-image"
          :class="{
            'hero-image-active':
              currentHeroIndex === index
          }"
        />

        <div class="absolute inset-0 bg-black/20"></div>

        <div
          class="absolute inset-0 bg-gradient-to-b from-[#07150f]/15 via-[#07150f]/10 to-[#07150f]/80"
        ></div>

      </div>


      <!-- HERO CONTENT -->

      <div
        class="relative z-10 mx-auto flex min-h-[680px] max-w-7xl items-center justify-center px-6 py-20 lg:px-8"
      >

        <div class="w-full max-w-4xl text-center">

          <!-- BADGE -->

          <div
            class="mx-auto inline-flex items-center gap-3 rounded-full border border-white/15 bg-black/40 px-5 py-2 backdrop-blur-md"
          >

            <span
              class="flex h-7 w-7 items-center justify-center rounded-full bg-lime-400 text-sm"
            >
              ⚽
            </span>

            <span
              class="text-[11px] font-black uppercase tracking-[0.18em] text-white"
            >
              Ethiopia's Sports Venue Platform
            </span>

          </div>


          <!-- TITLE -->

          <h1
            class="mx-auto mt-7 max-w-4xl text-4xl font-black leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-7xl"
          >

            Welcome to

            <span class="my-2 block text-lime-400">
              CombolojoSPORT
            </span>

            <span class="block text-white">
              Ethiopia's Sports Venue Platform
            </span>

          </h1>


          <!-- DECORATION -->

          <div class="mt-7 flex justify-center gap-2">

            <div
              class="h-1 w-14 rounded-full bg-lime-400"
            ></div>

            <div
              class="h-1 w-5 rounded-full bg-white/50"
            ></div>

          </div>


          <!-- DESCRIPTION -->

          <p
            class="mx-auto mt-7 max-w-2xl text-base leading-7 text-slate-100 sm:text-lg"
          >
            Discover trusted sports venues across Ethiopia,
            explore venue information and facilities, and find
            the right place for your next game.
          </p>

          <p
            class="mx-auto mt-3 max-w-xl text-sm leading-6 text-white/65"
          >
            Browse venues on our website and complete your
            booking through the CombolojoSPORT mobile application.
          </p>


          <!-- SEARCH -->

          <div class="mx-auto mt-9 max-w-3xl">

            <div
              class="mb-2 flex items-center justify-center gap-2"
            >
              <span>🔎</span>

              <span
                class="text-xs font-black uppercase tracking-widest text-white"
              >
                Find your sports venue
              </span>
            </div>


            <div
              class="grid gap-3 rounded-2xl border border-white/15 bg-black/30 p-2 shadow-2xl backdrop-blur-xl md:grid-cols-[1fr_1fr_auto]"
            >

              <!-- SPORT -->

              <div
                class="rounded-xl bg-white px-4 py-3 text-left"
              >

                <label
                  class="block text-[10px] font-black uppercase tracking-wider text-slate-400"
                >
                  Sport
                </label>

                <select
                  v-model="searchSport"
                  class="mt-1 w-full border-none bg-transparent text-sm font-bold text-slate-900 outline-none"
                >

                  <option>
                    All Sports
                  </option>

                  <option>
                    Football
                  </option>

                  <option>
                    Basketball
                  </option>

                  <option>
                    Volleyball
                  </option>

                  <option>
                    Tennis
                  </option>

                </select>

              </div>


              <!-- LOCATION -->

              <div
                class="rounded-xl bg-white px-4 py-3 text-left"
              >

                <label
                  class="block text-[10px] font-black uppercase tracking-wider text-slate-400"
                >
                  Location
                </label>

                <input
                  v-model="searchLocation"
                  type="text"
                  placeholder="Search venue or location"
                  class="mt-1 w-full border-none bg-transparent text-sm font-bold text-slate-900 outline-none placeholder:text-slate-400"
                  @keyup.enter="searchVenues"
                />

              </div>


              <!-- BUTTON -->

              <div class="flex flex-col gap-2 sm:flex-row">
                <button
                  type="button"
                  class="flex items-center justify-center gap-2 rounded-xl bg-emerald-700 px-7 py-3 text-sm font-black text-white transition hover:bg-emerald-800"
                  @click="searchVenues"
                >
                  Find a Venue

                  <span
                    class="text-lg text-lime-400 transition-transform group-hover:translate-x-1"
                  >
                    →
                  </span>
                </button>

                <a
                  :href="`https://www.youtube.com/results?search_query=${encodeURIComponent(searchLocation.trim())}`"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="flex items-center justify-center rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-black text-white transition hover:bg-white/20"
                >
                  Search YouTube
                </a>
              </div>

            </div>

          </div>


          <!-- TRUST -->

          <div
            class="mt-7 flex flex-wrap justify-center gap-x-7 gap-y-3 text-xs font-bold text-white/80"
          >

            <span>✓ Verified venues</span>

            <span>✓ Venue information</span>

            <span>✓ Mobile booking</span>

            <span>✓ Sports events</span>

          </div>

        </div>

      </div>


      <!-- HERO FOOTER -->

      <div
        class="absolute bottom-0 left-0 right-0 z-10 border-t border-white/10 bg-black/20 backdrop-blur"
      >

        <div
          class="mx-auto flex max-w-7xl items-center justify-between px-6 py-3 text-[10px] font-black uppercase tracking-widest text-white/60 lg:px-8"
        >

          <span>
            Addis Ababa • Ethiopia
          </span>

          <span>
            Explore • Download • Book
          </span>

        </div>

      </div>

    </section>


    <!-- =====================================================
         SPORTS CATEGORIES
    ====================================================== -->

    <section class="bg-white py-16">

      <div
        class="mx-auto max-w-7xl px-6 lg:px-8"
      >

        <div
          class="flex flex-col justify-between gap-5 sm:flex-row sm:items-end"
        >

          <div>

            <p
              class="text-[11px] font-black uppercase tracking-[0.2em] text-emerald-700"
            >
              Sports Categories
            </p>

            <h2
              class="mt-2 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl"
            >
              Choose your game.
            </h2>

            <p
              class="mt-3 max-w-xl text-sm leading-6 text-slate-500"
            >
              Explore different sports and find venues that
              match your game, team and activity.
            </p>

          </div>

          <div
            class="hidden h-px flex-1 bg-slate-200 sm:ml-12 sm:block"
          ></div>

        </div>


        <div
          class="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4"
        >

          <button
            v-for="sport in sports"
            :key="sport.name"
            type="button"
            class="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 text-left shadow-sm transition duration-300 hover:-translate-y-1 hover:border-emerald-300 hover:bg-emerald-50/40 hover:shadow-xl"
            @click="selectSport(sport.name)"
          >

            <div
              class="absolute right-0 top-0 h-24 w-24 rounded-bl-full bg-emerald-50 transition group-hover:bg-lime-100"
            ></div>

            <div class="relative">

              <div
                class="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-50 text-3xl shadow-sm group-hover:bg-white"
              >
                {{ sport.icon }}
              </div>

              <h3
                class="mt-5 text-base font-black text-slate-900"
              >
                {{ sport.name }}
              </h3>

              <p
                class="mt-2 text-xs leading-5 text-slate-400"
              >
                {{ sport.description }}
              </p>

              <p
                class="mt-4 text-xs font-black text-emerald-700"
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

    <section
      class="bg-[#f0f5f2] py-16"
    >

      <div
        class="mx-auto max-w-7xl px-6 lg:px-8"
      >

        <div class="text-center">

          <p
            class="text-[11px] font-black uppercase tracking-[0.2em] text-emerald-700"
          >
            Simple Process
          </p>

          <h2
            class="mt-2 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl"
          >
            How CombolojoSPORT works
          </h2>

          <p
            class="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-500"
          >
            Explore venues on the website and complete your
            booking through the CombolojoSPORT mobile application.
          </p>

        </div>


        <div
          class="mt-10 grid gap-5 md:grid-cols-4"
        >

          <div
            v-for="step in [
              {
                number: '01',
                icon: '🔎',
                title: 'Explore',
                text: 'Search for sports venues by sport, location and venue name.'
              },
              {
                number: '02',
                icon: '👁️',
                title: 'View Details',
                text: 'Review venue information, facilities, location and pricing.'
              },
              {
                number: '03',
                icon: '📱',
                title: 'Download the App',
                text: 'Download the CombolojoSPORT mobile application to continue.'
              },
              {
                number: '04',
                icon: '📅',
                title: 'Complete Your Booking',
                text: 'Select an available date and time slot and complete your booking in the app.'
              }
            ]"
            :key="step.number"
            class="relative rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-emerald-200 hover:shadow-xl"
          >

            <span
              class="absolute right-5 top-5 text-[10px] font-black text-emerald-300"
            >
              {{ step.number }}
            </span>

            <div
              class="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-xl"
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
         FEATURED VENUES
    ====================================================== -->

    <section
      ref="venueSection"
      class="scroll-mt-20 bg-[#f7faf8] py-16"
    >

      <div
        class="mx-auto max-w-7xl px-6 lg:px-8"
      >

        <div
          class="flex flex-col justify-between gap-5 md:flex-row md:items-end"
        >

          <div>

            <p
              class="text-[11px] font-black uppercase tracking-[0.2em] text-emerald-700"
            >
              Featured Venues
            </p>

            <h2
              class="mt-2 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl"
            >
              Find your perfect field
            </h2>

            <p
              class="mt-3 text-sm text-slate-500"
            >
              Explore sports venues and review their information
              before continuing to the mobile app.
            </p>

          </div>

          <NuxtLink
            to="/venues"
            class="inline-flex items-center gap-2 text-sm font-black text-emerald-700 hover:text-lime-600"
          >
            View all venues →
          </NuxtLink>

        </div>


        <!-- VENUE GRID -->

        <div
          v-if="filteredVenues.length"
          class="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >

          <article
            v-for="venue in filteredVenues.slice(0, 4)"
            :key="venue.id"
            class="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-xl"
          >

            <!-- IMAGE -->

            <div
              class="relative h-52 overflow-hidden"
            >

              <img
                :src="venue.image"
                :alt="venue.name"
                class="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />

              <div
                class="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"
              ></div>

              <span
                class="absolute left-3 top-3 rounded-lg bg-white/95 px-2.5 py-1 text-[10px] font-black text-slate-900 shadow"
              >
                {{ venue.sport }}
              </span>

              <span
                class="absolute right-3 top-3 rounded-lg bg-[#064e3b] px-2.5 py-1 text-[10px] font-black text-white shadow"
              >
                ★ {{ venue.rating }}
              </span>

            </div>


            <!-- CONTENT -->

            <div class="p-5">

              <h3
                class="truncate text-base font-black text-slate-900"
              >
                {{ venue.name }}
              </h3>

              <p
                class="mt-2 text-xs text-slate-500"
              >
                📍 {{ venue.location }}
              </p>

              <p
                class="mt-1 text-[11px] text-slate-400"
              >
                {{ venue.reviews }} reviews
              </p>

              <div
                class="my-4 h-px bg-slate-100"
              ></div>

              <div
                class="flex items-end justify-between gap-3"
              >

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
                  class="rounded-lg bg-slate-900 px-3 py-2 text-xs font-black text-white transition hover:bg-emerald-700"
                  @click="openVenue(venue)"
                >
                  View Details
                </button>

              </div>

            </div>

          </article>

        </div>


        <!-- NO RESULTS -->

        <div
          v-else
          class="mt-10 rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center"
        >

          <div class="text-4xl">
            🔎
          </div>

          <h3
            class="mt-4 text-lg font-black"
          >
            No venues found
          </h3>

          <p
            class="mt-2 text-sm text-slate-500"
          >
            Try another sport or location.
          </p>

          <button
            type="button"
            class="mt-5 rounded-lg bg-emerald-700 px-5 py-2.5 text-sm font-black text-white"
            @click="clearSearch"
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
      class="bg-white py-16"
    >

      <div
        class="mx-auto max-w-7xl px-6 lg:px-8"
      >

        <div
          class="flex flex-col justify-between gap-4 sm:flex-row sm:items-end"
        >

          <div>

            <p
              class="text-[11px] font-black uppercase tracking-[0.2em] text-emerald-700"
            >
              Sports Events
            </p>

            <h2
              class="mt-2 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl"
            >
              Play. Connect. Compete.
            </h2>

            <p
              class="mt-3 max-w-xl text-sm leading-6 text-slate-500"
            >
              Discover sports events and community activities
              happening through the CombolojoSPORT platform.
            </p>

          </div>

          <NuxtLink
            to="/events"
            class="text-sm font-black text-emerald-700"
          >
            View all events →
          </NuxtLink>

        </div>


        <div
          class="mt-10 grid gap-6 md:grid-cols-3"
        >

          <article
            v-for="event in events"
            :key="event.id"
            class="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
          >

            <div
              class="relative h-48 overflow-hidden"
            >

              <img
                :src="event.image"
                :alt="event.title"
                class="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />

              <div
                class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"
              ></div>

              <span
                class="absolute left-4 top-4 rounded-lg bg-lime-400 px-3 py-1 text-[10px] font-black text-slate-950"
              >
                {{ event.sport }}
              </span>

            </div>


            <div class="p-5">

              <h3
                class="text-lg font-black text-slate-900"
              >
                {{ event.title }}
              </h3>

              <p
                class="mt-3 text-xs font-bold text-emerald-700"
              >
                📅 {{ event.date }} • {{ event.time }}
              </p>

              <p
                class="mt-2 text-xs text-slate-500"
              >
                📍 {{ event.location }}
              </p>

              <p
                class="mt-3 line-clamp-2 text-sm leading-6 text-slate-500"
              >
                {{ event.description }}
              </p>

              <NuxtLink
                to="/events"
                class="mt-5 inline-flex items-center rounded-lg bg-slate-900 px-4 py-2.5 text-xs font-black text-white transition hover:bg-emerald-700"
              >
                View Event
              </NuxtLink>

            </div>

          </article>

        </div>

      </div>

    </section>


    <!-- =====================================================
         MOBILE APP CTA
    ====================================================== -->

    <section
      class="relative overflow-hidden bg-gradient-to-br from-[#07150f] via-[#0f2f22] to-[#020907] py-20 text-white"
    >

      <div
        class="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl"
      ></div>

      <div
        class="absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-lime-400/10 blur-3xl"
      ></div>


      <div
        class="relative mx-auto max-w-7xl px-6 lg:px-8"
      >

        <div
          class="grid items-center gap-14 lg:grid-cols-2"
        >

          <!-- LEFT -->

          <div>

            <span
              class="inline-flex items-center gap-2 rounded-full border border-lime-400/20 bg-lime-400/10 px-4 py-2 text-xs font-black uppercase tracking-wider text-lime-400"
            >
              <span
                class="h-2 w-2 rounded-full bg-lime-400"
              ></span>

              CombolojoSPORT Mobile App
            </span>


            <h2
              class="mt-6 max-w-xl text-4xl font-black leading-tight sm:text-5xl"
            >
              Ready to
              <span class="text-lime-400">
                play?
              </span>
            </h2>


            <p
              class="mt-5 max-w-xl text-base leading-7 text-white/70 sm:text-lg"
            >
              Discover sports venues on CombolojoSPORT,
              then complete your booking through the mobile
              application. Everything you need to plan your
              next game is just a few taps away.
            </p>


            <!-- FEATURES -->

            <div
              class="mt-8 grid gap-4 sm:grid-cols-2"
            >

              <div
                v-for="feature in [
                  'Explore sports venues',
                  'Check venue details',
                  'Select available time slots',
                  'Manage your bookings'
                ]"
                :key="feature"
                class="flex items-center gap-3"
              >

                <span
                  class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-lime-400/10 text-lime-400"
                >
                  ✓
                </span>

                <span
                  class="text-sm font-semibold text-white/80"
                >
                  {{ feature }}
                </span>

              </div>

            </div>


            <!-- BUTTONS -->

            <div
              class="mt-9 flex flex-wrap gap-4"
            >

              <NuxtLink
                to="/download-app"
                class="inline-flex items-center gap-3 rounded-xl bg-lime-400 px-6 py-3.5 text-sm font-black text-slate-950 shadow-xl transition hover:-translate-y-0.5 hover:bg-lime-300"
              >
                Download the App
                <span class="text-lg">
                  →
                </span>
              </NuxtLink>

              <NuxtLink
                to="/venues"
                class="inline-flex items-center rounded-xl border border-white/15 bg-white/5 px-6 py-3.5 text-sm font-black text-white transition hover:bg-white/10"
              >
                Explore Venues
              </NuxtLink>

            </div>


            <p
              class="mt-4 text-xs text-white/40"
            >
              Browse on the website. Complete your booking
              in the mobile app.
            </p>

          </div>


          <!-- PHONE -->

          <div
            class="relative flex justify-center lg:justify-end"
          >

            <div
              class="absolute h-80 w-80 rounded-full bg-lime-400/10 blur-3xl"
            ></div>


            <div
              class="relative w-[255px] rounded-[2.5rem] border-[7px] border-[#020806] bg-[#050b09] p-2 shadow-[0_30px_80px_rgba(0,0,0,0.5)] sm:w-[285px]"
            >

              <!-- SPEAKER -->

              <div
                class="absolute left-1/2 top-2 z-20 h-5 w-20 -translate-x-1/2 rounded-full bg-[#183329]"
              ></div>


              <!-- SCREEN -->

              <div
                class="overflow-hidden rounded-[2rem] bg-[#08130f]"
              >

                <!-- APP HEADER -->

                <div
                  class="bg-[#10251b] px-5 pb-5 pt-10 text-white"
                >

                  <div
                    class="flex items-center justify-between"
                  >

                    <div>

                      <p
                        class="text-[9px] font-bold uppercase tracking-wider text-lime-300"
                      >
                        Welcome
                      </p>

                      <p
                        class="mt-1 text-sm font-black"
                      >
                        CombolojoSPORT
                      </p>

                    </div>

                    <div
                      class="flex h-9 w-9 items-center justify-center rounded-full bg-lime-400 text-sm"
                    >
                      ⚽
                    </div>

                  </div>


                  <div
                    class="mt-5 rounded-xl border border-white/10 bg-white/5 p-3"
                  >

                    <p
                      class="text-[9px] text-white/60"
                    >
                      Find your next game
                    </p>

                    <p
                      class="mt-1 text-xs font-bold"
                    >
                      Sports venues near you
                    </p>

                  </div>

                </div>


                <!-- APP CONTENT -->

                <div class="bg-[#08130f] p-3">

                  <img
                    :src="venue20Image"
                    alt="CombolojoSPORT venue"
                    class="h-36 w-full rounded-xl object-cover ring-1 ring-white/10"
                  />

                  <div class="mt-3 rounded-xl border border-white/10 bg-[#14291f] p-3">

                    <p
                      class="text-xs font-black text-white"
                    >
                      Combolojo Football Arena
                    </p>

                    <p
                      class="mt-1 text-[9px] text-emerald-100/65"
                    >
                      Addis Ababa • Bole
                    </p>


                    <div
                      class="mt-3 flex items-center justify-between"
                    >

                      <span
                        class="text-xs font-black text-lime-300"
                      >
                        ETB 600/hour
                      </span>

                      <span
                        class="rounded-lg bg-lime-400 px-3 py-1.5 text-[9px] font-black text-slate-950"
                      >
                        Book
                      </span>

                    </div>

                  </div>

                </div>

              </div>

            </div>


            <!-- FLOATING CARD -->

            <div
              class="absolute -bottom-4 left-2 rounded-2xl border border-white/10 bg-[#101e18]/95 p-4 shadow-2xl backdrop-blur sm:left-6"
            >

              <p
                class="text-[9px] font-bold uppercase tracking-wider text-white/40"
              >
                Booking
              </p>

              <p
                class="mt-1 text-xs font-black text-lime-400"
              >
                Available in App
              </p>

            </div>

          </div>

        </div>

      </div>

    </section>


    <!-- =====================================================
         TESTIMONIALS
    ====================================================== -->

    <section
      class="bg-white py-16"
    >

      <div
        class="mx-auto max-w-7xl px-6 lg:px-8"
      >

        <div class="text-center">

          <p
            class="text-[11px] font-black uppercase tracking-[0.2em] text-emerald-700"
          >
            Community Feedback
          </p>

          <h2
            class="mt-2 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl"
          >
            What our users say
          </h2>

          <p
            class="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-500"
          >
            A better way to discover sports venues and
            connect players with the places they love to play.
          </p>

        </div>


        <div
          class="mt-10 grid gap-6 md:grid-cols-3"
        >

          <div
            v-for="item in testimonials"
            :key="item.name"
            class="rounded-2xl border border-slate-200 bg-[#f8faf9] p-6 shadow-sm transition hover:-translate-y-1 hover:border-emerald-200 hover:shadow-lg"
          >

            <div
              class="text-3xl text-emerald-600"
            >
              “
            </div>

            <p
              class="mt-2 text-sm leading-7 text-slate-600"
            >
              {{ item.text }}
            </p>

            <div
              class="mt-6 border-t border-slate-200 pt-4"
            >

              <p
                class="text-sm font-black text-slate-900"
              >
                {{ item.name }}
              </p>

              <p
                class="mt-1 text-xs text-slate-400"
              >
                {{ item.role }}
              </p>

            </div>

          </div>

        </div>

      </div>

    </section>


    <!-- =====================================================
         FAQ
    ====================================================== -->

    <section
      class="bg-[#f0f5f2] py-16"
    >

      <div
        class="mx-auto max-w-3xl px-6 lg:px-8"
      >

        <div class="text-center">

          <p
            class="text-[11px] font-black uppercase tracking-[0.2em] text-emerald-700"
          >
            FAQ
          </p>

          <h2
            class="mt-2 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl"
          >
            Frequently Asked Questions
          </h2>

          <p
            class="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-500"
          >
            Learn how CombolojoSPORT connects venue discovery
            on the website with booking through the mobile app.
          </p>

        </div>


        <div
          class="mt-9 space-y-4"
        >

          <div
            v-for="(faq, index) in faqs"
            :key="index"
            class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
          >

            <button
              type="button"
              class="flex w-full items-center justify-between gap-5 p-5 text-left"
              @click="toggleFaq(index)"
            >

              <span
                class="text-sm font-black text-slate-900 sm:text-base"
              >
                {{ faq.question }}
              </span>

              <span
                class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-lg font-bold text-emerald-700"
              >
                {{ openFaq === index ? '−' : '+' }}
              </span>

            </button>


            <div
              v-if="openFaq === index"
              class="border-t border-slate-100 px-5 pb-5 pt-4 text-sm leading-7 text-slate-600"
            >
              {{ faq.answer }}
            </div>

          </div>

        </div>

      </div>

    </section>


    <!-- =====================================================
         VENUE DETAILS DRAWER
    ====================================================== -->

    <div
      v-if="showVenueModal && selectedVenue"
      class="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm"
      @click.self="closeVenue"
      @keydown.esc.window="closeVenue"
    >

      <aside
        role="dialog"
        aria-modal="true"
        :aria-label="`${selectedVenue.name} details`"
        class="flex h-full w-full max-w-2xl flex-col overflow-y-auto bg-white shadow-2xl"
      >

        <div
          class="sticky top-0 z-10 flex items-center justify-between border-b border-slate-100 bg-white/95 px-5 py-4 backdrop-blur sm:px-8"
        >
          <div>
            <p class="text-xs font-bold uppercase tracking-wider text-emerald-700">
              Venue details
            </p>
            <h2 class="mt-1 text-lg font-black text-slate-900">
              {{ selectedVenue.name }}
            </h2>
          </div>

          <button
            type="button"
            aria-label="Close venue details"
            class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-700 transition hover:bg-slate-200"
            @click="closeVenue"
          >
            ✕
          </button>

        </div>

        <div class="p-5 sm:p-8">
          <div class="grid grid-cols-2 gap-3">
            <img
              v-for="(image, index) in selectedVenueImages"
              :key="image"
              :src="image"
              :alt="`${selectedVenue.name} photo ${index + 1}`"
              class="w-full rounded-2xl object-cover"
              :class="index === 0 ? 'col-span-2 h-64 sm:h-80' : 'h-36 sm:h-44'"
            />
          </div>

          <div class="mt-6 flex items-center justify-between gap-3">
            <span class="rounded-md bg-emerald-100 px-2.5 py-1 text-xs font-bold text-emerald-800">
              {{ selectedVenue.sport }}
            </span>
            <span class="text-xs font-bold text-slate-500">
              ★ {{ selectedVenue.rating }} ({{ selectedVenue.reviews }} reviews)
            </span>
          </div>

          <h3 class="mt-3 text-2xl font-black text-slate-900">
            {{ selectedVenue.name }}
          </h3>

          <p class="mt-1 text-sm text-slate-500">
            📍 {{ selectedVenue.location }}
          </p>

          <p class="mt-5 whitespace-pre-line text-sm leading-7 text-slate-600">
            {{ selectedVenue.description }}
          </p>

          <div class="mt-5">
            <h4 class="text-sm font-extrabold text-slate-900">
              Venue features
            </h4>
            <div class="mt-3 flex flex-wrap gap-2">
              <span
                v-for="feature in selectedVenue.features"
                :key="feature"
                class="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700"
              >
                ✓ {{ feature }}
              </span>
            </div>
          </div>

          <div class="mt-7 flex flex-col gap-4 border-t border-slate-100 pt-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p class="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Price per hour
              </p>
              <p class="mt-1 text-xl font-black text-emerald-700">
                ETB {{ selectedVenue.price }}
              </p>
            </div>

            <button
              type="button"
              class="rounded-xl bg-emerald-700 px-6 py-3 text-sm font-black text-white shadow-lg transition hover:bg-emerald-800"
              @click="bookVenue"
            >
              Download App to Book
            </button>
          </div>

          <p class="mt-3 text-center text-[11px] text-slate-400">
            Booking is completed through the CombolojoSPORT mobile app.
          </p>
        </div>

      </aside>

    </div>


  </div>
</template>


<style scoped>

/* =========================================================
   HERO IMAGES
========================================================= */

.hero-image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  opacity: 0;
  transition: opacity 900ms ease-in-out;
  will-change: opacity;
}

.hero-image-active {
  opacity: 1;
}


/* =========================================================
   SMOOTH SCROLL
========================================================= */

:global(html) {
  scroll-behavior: smooth;
}


/* =========================================================
   SCROLLBAR
========================================================= */

:global(::-webkit-scrollbar) {
  width: 8px;
}

:global(::-webkit-scrollbar-track) {
  background: #f1f5f9;
}

:global(::-webkit-scrollbar-thumb) {
  background: #10b981;
  border-radius: 999px;
}

:global(::-webkit-scrollbar-thumb:hover) {
  background: #059669;
}


/* =========================================================
   MOBILE
========================================================= */

@media (max-width: 640px) {

  .hero-image {
    object-position: center;
  }

}

</style>