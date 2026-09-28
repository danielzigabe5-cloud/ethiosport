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
}

const venueSection = ref<HTMLElement | null>(null)

const searchSport = ref('All Sports')
const searchLocation = ref('')

const selectedVenue = ref<Venue | null>(null)

const showVenueModal = ref(false)
const showAppModal = ref(false)

const openFaq = ref<number | null>(null)

/* =========================
   VENUES
========================= */

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
      'Modern futsal field suitable for competitive and friendly games.',
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
      'Premium football venue with a quality playing surface.',
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
      'Professional basketball court for training and games.',
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
      'Comfortable volleyball venue for teams and communities.',
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
      'Spacious sports venue designed for an enjoyable game day.',
    features: ['Parking', 'Flood Lights', 'Changing Room']
  }
]

/* =========================
   EVENTS
========================= */

const events: SportEvent[] = [
  {
    id: 1,
    title: 'Combolojo Football Tournament',
    date: 'Oct 05, 2026',
    time: '09:00 AM',
    location: 'Sarbet Football Field',
    image: img1
  },
  {
    id: 2,
    title: 'Community Basketball Day',
    date: 'Oct 12, 2026',
    time: '02:00 PM',
    location: 'City Basketball Court',
    image: img3
  },
  {
    id: 3,
    title: 'Weekend Volleyball Challenge',
    date: 'Oct 18, 2026',
    time: '10:00 AM',
    location: 'Unity Volleyball Center',
    image: img4
  }
]

/* =========================
   TESTIMONIALS
========================= */

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

/* =========================
   FAQ
========================= */

const faqs = [
  {
    question: 'How can I book a sports venue?',
    answer:
      'Choose your sport and location, select a venue, choose an available time slot, and complete your booking.'
  },
  {
    question: 'Can I book a venue from my phone?',
    answer:
      'Yes. CombolojoSPORT is designed to work on mobile devices.'
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

/* =========================
   SEARCH
========================= */

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

/* =========================
   FUNCTIONS
========================= */

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

function bookVenue(venue: Venue) {
  closeVenue()

  navigateTo({
    path: '/booking',
    query: {
      venue: venue.id
    }
  })
}

function goToEvents() {
  navigateTo('/events')
}

function openAppModal() {
  showAppModal.value = true
}

function closeAppModal() {
  showAppModal.value = false
}

function toggleFaq(index: number) {
  openFaq.value = openFaq.value === index ? null : index
}

function clearSearch() {
  searchSport.value = 'All Sports'
  searchLocation.value = ''
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 text-gray-900">

    <!-- HERO -->
    <section class="relative min-h-[500px] overflow-hidden">
      <div class="absolute inset-0 bg-gray-900">
        <img :src="venue20Image" alt="" aria-hidden="true" class="hero-image hero-image-1" />
        <img :src="venue11Image" alt="" aria-hidden="true" class="hero-image hero-image-2" />
        <img :src="venue12Image" alt="" aria-hidden="true" class="hero-image hero-image-3" />
        <div class="absolute inset-0 bg-gradient-to-r from-black/45 via-black/15 to-transparent"></div>
      </div>

      <div
        class="relative mx-auto flex min-h-[500px] max-w-7xl items-center px-6 py-12 lg:px-8"
      >
        <div class="max-w-4xl">
          <div
            class="mb-4 inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/90 px-3 py-1 text-xs font-bold text-green-700 shadow-lg backdrop-blur-sm"
          >
            <span class="h-2 w-2 animate-pulse rounded-full bg-green-600"></span>
            Find • Book • Play
          </div>

          <h1
            class="text-3xl font-black leading-tight text-white drop-shadow-[0_3px_8px_rgba(0,0,0,0.8)] sm:text-4xl lg:text-6xl"
          >
            WELL COME TO ETHIOPIAN COMBOLOJOS
            <span class="text-green-400">
              starts here.
            </span>
          </h1>

          <p
            class="mt-4 max-w-2xl text-base leading-7 text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)] sm:text-lg"
          >
            Discover sports venues, book your favorite field,
            join events and enjoy the game with
            <strong>CombolojoSPORT.</strong>
          </p>

          <div
            class="mt-6 rounded-2xl bg-white p-3 shadow-2xl lg:p-4"
          >
            <div class="grid gap-3 md:grid-cols-3">
              <div class="rounded-xl bg-gray-100 px-4 py-2">
                <label
                  class="mb-1 block text-xs font-bold uppercase tracking-wide text-gray-500"
                >
                  Sport
                </label>
                <select
                  v-model="searchSport"
                  class="w-full border-none bg-transparent font-semibold text-gray-900 outline-none"
                >
                  <option>All Sports</option>
                  <option>Football</option>
                  <option>Basketball</option>
                  <option>Volleyball</option>
                  <option>Tennis</option>
                </select>
              </div>

              <div class="rounded-xl bg-gray-100 px-4 py-2">
                <label
                  class="mb-1 block text-xs font-bold uppercase tracking-wide text-gray-500"
                >
                  Location
                </label>
                <input
                  v-model="searchLocation"
                  type="text"
                  placeholder="Search venue or location"
                  class="w-full bg-transparent font-semibold text-gray-900 outline-none placeholder:text-gray-400"
                  @keyup.enter="searchVenues"
                />
              </div>

              <button
                type="button"
                @click="searchVenues"
                class="flex items-center justify-center gap-2 rounded-xl bg-green-600 px-6 py-3 font-bold text-white transition hover:bg-green-700"
              >
                <span>Search Venues</span>
                <span class="text-lg">→</span>
              </button>
            </div>
          </div>

          <div
            class="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-xs font-semibold text-white drop-shadow-md"
          >
            <span>✓ Verified venues</span>
            <span>✓ Easy booking</span>
            <span>✓ Secure payment</span>
            <span>✓ Sports events</span>
          </div>
        </div>
      </div>
    </section>

    <!-- SPORTS CATEGORIES -->
    <section class="bg-white py-10">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="text-center">
          <p class="font-bold uppercase tracking-widest text-green-600 text-xs">
            Choose your sport
          </p>
          <h2 class="mt-2 text-2xl font-black sm:text-3xl">
            What do you want to play?
          </h2>
          <p class="mx-auto mt-2 max-w-2xl text-sm text-gray-600">
            Choose your favorite sport and discover available venues.
          </p>
        </div>

        <div class="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
          <button
            v-for="sport in [
              { name: 'Football', icon: '⚽' },
              { name: 'Basketball', icon: '🏀' },
              { name: 'Volleyball', icon: '🏐' },
              { name: 'Tennis', icon: '🎾' }
            ]"
            :key="sport.name"
            type="button"
            @click="selectSport(sport.name)"
            class="group rounded-2xl border border-gray-200 bg-gray-50 p-5 text-center transition duration-300 hover:-translate-y-1 hover:border-green-500 hover:bg-green-50 hover:shadow-lg"
          >
            <div
              class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-white text-3xl shadow-sm transition group-hover:scale-110"
            >
              {{ sport.icon }}
            </div>
            <h3 class="mt-3 font-bold text-sm">
              {{ sport.name }}
            </h3>
            <p class="mt-1 text-xs text-gray-500">
              Find venues →
            </p>
          </button>
        </div>
      </div>
    </section>

    <!-- HOW IT WORKS -->
    <section class="bg-gray-50 py-10">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="text-center">
          <p class="font-bold uppercase tracking-widest text-green-600 text-xs">
            Simple process
          </p>
          <h2 class="mt-2 text-2xl font-black sm:text-3xl">
            How CombolojoSPORT works
          </h2>
          <p class="mx-auto mt-2 max-w-2xl text-sm text-gray-600">
            Booking your sports venue is simple.
          </p>
        </div>

        <div class="mt-8 grid gap-6 md:grid-cols-4">
          <div
            v-for="step in [
              {
                number: '01',
                icon: '👤',
                title: 'Register',
                text: 'Create your CombolojoSPORT account.'
              },
              {
                number: '02',
                icon: '🔎',
                title: 'Find',
                text: 'Search for your preferred venue.'
              },
              {
                number: '03',
                icon: '📅',
                title: 'Book',
                text: 'Select your date and available time.'
              },
              {
                number: '04',
                icon: '💳',
                title: 'Pay',
                text: 'Confirm your booking securely.'
              }
            ]"
            :key="step.number"
            class="relative rounded-2xl bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
          >
            <span class="absolute right-4 top-4 text-xs font-black text-green-600">
              {{ step.number }}
            </span>
            <div
              class="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-xl"
            >
              {{ step.icon }}
            </div>
            <h3 class="mt-4 text-lg font-black">
              {{ step.title }}
            </h3>
            <p class="mt-2 text-sm leading-6 text-gray-600">
              {{ step.text }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- FEATURED VENUES -->
    <section
      ref="venueSection"
      class="scroll-mt-16 bg-white py-10"
    >
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="flex flex-col justify-between gap-3 md:flex-row md:items-end">
          <div>
            <p class="font-bold uppercase tracking-widest text-green-600 text-xs">
              Featured venues
            </p>
            <h2 class="mt-1 text-2xl font-black sm:text-3xl">
              Find your perfect field
            </h2>
            <p class="mt-1 text-sm text-gray-600">
              Explore sports venues and book your game.
            </p>
          </div>
          <NuxtLink
            to="/venues"
            class="text-sm font-bold text-green-600 hover:text-green-700"
          >
            View all venues →
          </NuxtLink>
        </div>

        <div
          v-if="filteredVenues.length"
          class="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          <article
            v-for="venue in filteredVenues.slice(0, 4)"
            :key="venue.id"
            class="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            <div class="relative h-44 overflow-hidden">
              <img
                :src="venue.image"
                :alt="venue.name"
                class="h-full w-full object-cover transition duration-500 group-hover:scale-110"
              />
              <span
                class="absolute left-3 top-3 rounded-full bg-white px-2.5 py-0.5 text-xs font-bold text-gray-900 shadow"
              >
                {{ venue.sport }}
              </span>
              <span
                class="absolute right-3 top-3 rounded-full bg-green-600 px-2.5 py-0.5 text-xs font-bold text-white shadow"
              >
                ★ {{ venue.rating }}
              </span>
            </div>

            <div class="p-4">
              <h3 class="truncate text-base font-black">
                {{ venue.name }}
              </h3>
              <p class="mt-1 text-xs text-gray-500">
                📍 {{ venue.location }}
              </p>
              <div class="mt-1 text-xs text-gray-400">
                {{ venue.reviews }} reviews
              </div>

              <div class="mt-4 flex items-end justify-between gap-2">
                <div>
                  <p class="text-[10px] text-gray-500">Starting from</p>
                  <p class="text-base font-black text-green-600">
                    ETB {{ venue.price }}
                    <span class="text-[10px] font-normal text-gray-500">/ hour</span>
                  </p>
                </div>
                <button
                  type="button"
                  @click="openVenue(venue)"
                  class="rounded-lg bg-gray-900 px-3 py-1.5 text-xs font-bold text-white transition hover:bg-green-600"
                >
                  View
                </button>
              </div>
            </div>
          </article>
        </div>

        <div
          v-else
          class="mt-8 rounded-2xl border border-dashed border-gray-300 p-8 text-center"
        >
          <div class="text-3xl">🔎</div>
          <h3 class="mt-2 text-lg font-black">No venues found</h3>
          <p class="mt-1 text-sm text-gray-500">Try another sport or location.</p>
          <button
            type="button"
            @click="clearSearch"
            class="mt-4 rounded-lg bg-green-600 px-4 py-2 text-sm font-bold text-white hover:bg-green-700"
          >
            Clear Search
          </button>
        </div>
      </div>
    </section>

    <!-- EVENTS -->
    <section class="bg-slate-950 py-10 text-white">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="flex flex-col justify-between gap-3 md:flex-row md:items-end">
          <div>
            <p class="font-bold uppercase tracking-widest text-green-400 text-xs">
              Upcoming events
            </p>
            <h2 class="mt-1 text-2xl font-black sm:text-3xl">
              Play together. Compete together.
            </h2>
            <p class="mt-1 text-sm text-gray-400">
              Discover tournaments, games and community events.
            </p>
          </div>
          <NuxtLink
            to="/events"
            class="text-sm font-bold text-green-400 hover:text-green-300"
          >
            View all events →
          </NuxtLink>
        </div>

        <div class="mt-8 grid gap-6 md:grid-cols-3">
          <article
            v-for="event in events"
            :key="event.id"
            class="overflow-hidden rounded-2xl border border-white/10 bg-white/5"
          >
            <div class="h-40 overflow-hidden">
              <img
                :src="event.image"
                :alt="event.title"
                class="h-full w-full object-cover transition duration-500 hover:scale-105"
              />
            </div>
            <div class="p-5">
              <p class="text-xs font-bold text-green-400">
                {{ event.date }}
              </p>
              <h3 class="mt-1 text-lg font-black">
                {{ event.title }}
              </h3>
              <p class="mt-2 text-xs text-gray-400">📍 {{ event.location }}</p>
              <p class="mt-1 text-xs text-gray-400">🕐 {{ event.time }}</p>
              <button
                type="button"
                @click="goToEvents"
                class="mt-4 rounded-lg bg-green-600 px-4 py-2 text-xs font-bold transition hover:bg-green-700"
              >
                View Event
              </button>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- WHY CHOOSE US -->
    <section class="bg-white py-10">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="grid items-center gap-8 lg:grid-cols-2">
          <div>
            <p class="font-bold uppercase tracking-widest text-green-600 text-xs">
              Why CombolojoSPORT?
            </p>
            <h2 class="mt-2 text-2xl font-black leading-tight sm:text-4xl">
              Everything you need
              <span class="text-green-600">to enjoy sports.</span>
            </h2>
            <p class="mt-4 text-sm leading-7 text-gray-600">
              We connect players, teams, sports communities and
              venue partners through one simple platform.
            </p>
            <NuxtLink
              to="/about"
              class="mt-6 inline-flex rounded-xl bg-green-600 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-green-700"
            >
              Learn More
            </NuxtLink>
          </div>

          <div class="grid gap-4 sm:grid-cols-2">
            <div
              v-for="feature in [
                { icon: '✓', title: 'Verified Venues', text: 'Discover trusted sports venues.' },
                { icon: '⚡', title: 'Fast Booking', text: 'Find and reserve your field quickly.' },
                { icon: '🔒', title: 'Secure Payment', text: 'Book with secure payment options.' },
                { icon: '🏆', title: 'Community Events', text: 'Join tournaments and sports events.' }
              ]"
              :key="feature.title"
              class="rounded-2xl border border-gray-200 p-5 transition hover:border-green-400 hover:shadow-lg"
            >
              <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-green-100 text-lg font-black text-green-700">
                {{ feature.icon }}
              </div>
              <h3 class="mt-3 font-black text-sm">{{ feature.title }}</h3>
              <p class="mt-1 text-xs leading-5 text-gray-600">{{ feature.text }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- JUST PLAY -->
    <section class="overflow-hidden bg-green-600 py-10">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="grid items-center gap-8 lg:grid-cols-2">
          <div class="text-white">
            <p class="font-bold uppercase tracking-widest text-green-100 text-xs">
              Just Play
            </p>
            <h2 class="mt-2 text-3xl font-black sm:text-4xl">
              Don't have a team?<br />Just play.
            </h2>
            <p class="mt-4 max-w-xl text-sm leading-6 text-green-50">
              Connect with other players, discover games and join sports communities around you.
            </p>
            <NuxtLink
              to="/just-play"
              class="mt-6 inline-flex rounded-xl bg-white px-6 py-3 text-sm font-black text-green-700 shadow-lg transition hover:bg-gray-100"
            >
              Explore Just Play →
            </NuxtLink>
          </div>

          <div class="relative h-[260px] overflow-hidden rounded-3xl">
            <img :src="img1" alt="Football field" class="h-full w-full object-cover" />
          </div>
        </div>
      </div>
    </section>

    <!-- STATS -->
    <section class="bg-white py-10">
      <div class="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-6 md:grid-cols-4 lg:px-8">
        <div class="text-center">
          <p class="text-3xl font-black text-green-600">50+</p>
          <p class="mt-1 text-xs font-semibold text-gray-500">Sports Venues</p>
        </div>
        <div class="text-center">
          <p class="text-3xl font-black text-green-600">10K+</p>
          <p class="mt-1 text-xs font-semibold text-gray-500">Active Players</p>
        </div>
        <div class="text-center">
          <p class="text-3xl font-black text-green-600">500+</p>
          <p class="mt-1 text-xs font-semibold text-gray-500">Events</p>
        </div>
        <div class="text-center">
          <p class="text-3xl font-black text-green-600">24/7</p>
          <p class="mt-1 text-xs font-semibold text-gray-500">Support</p>
        </div>
      </div>
    </section>

    <!-- TESTIMONIALS -->
    <section class="bg-gray-50 py-10">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="text-center">
          <p class="font-bold uppercase tracking-widest text-green-600 text-xs">
            Community
          </p>
          <h2 class="mt-2 text-2xl font-black sm:text-3xl">What players say</h2>
        </div>

        <div class="mt-8 grid gap-6 md:grid-cols-3">
          <article
            v-for="review in testimonials"
            :key="review.name"
            class="rounded-2xl bg-white p-5 shadow-sm"
          >
            <div class="text-base text-yellow-500">★★★★★</div>
            <p class="mt-3 text-sm leading-6 text-gray-600">“{{ review.text }}”</p>
            <div class="mt-4 flex items-center gap-3">
              <div class="flex h-9 w-9 items-center justify-center rounded-full bg-green-100 text-sm font-black text-green-700">
                {{ review.name.charAt(0) }}
              </div>
              <div>
                <p class="text-sm font-black">{{ review.name }}</p>
                <p class="text-xs text-gray-500">{{ review.role }}</p>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section class="bg-white py-10">
      <div class="mx-auto max-w-4xl px-6 lg:px-8">
        <div class="text-center">
          <p class="font-bold uppercase tracking-widest text-green-600 text-xs">
            FAQ
          </p>
          <h2 class="mt-2 text-2xl font-black sm:text-3xl">Frequently asked questions</h2>
        </div>

        <div class="mt-8 space-y-3">
          <div
            v-for="(faq, index) in faqs"
            :key="faq.question"
            class="overflow-hidden rounded-2xl border border-gray-200"
          >
            <button
              type="button"
              @click="toggleFaq(index)"
              class="flex w-full items-center justify-between gap-4 p-4 text-left text-sm font-bold"
            >
              <span>{{ faq.question }}</span>
              <span class="text-xl text-green-600">{{ openFaq === index ? '−' : '+' }}</span>
            </button>
            <div
              v-if="openFaq === index"
              class="border-t border-gray-100 px-4 pb-4 pt-3 text-xs leading-6 text-gray-600"
            >
              {{ faq.answer }}
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- FINAL CTA -->
    <section class="bg-slate-950 py-10 text-white">
      <div class="mx-auto max-w-5xl px-6 text-center lg:px-8">
        <div class="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-green-600 text-2xl">
          ⚽
        </div>
        <h2 class="mt-4 text-3xl font-black sm:text-4xl">Your game is waiting.</h2>
        <p class="mx-auto mt-3 max-w-2xl text-sm leading-6 text-gray-400">
          Find a venue, book your time and get ready to play.
        </p>

        <div class="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <NuxtLink
            to="/venues"
            class="rounded-xl bg-green-600 px-6 py-3 text-sm font-black transition hover:bg-green-700"
          >
            Find a Venue
          </NuxtLink>
          <button
            type="button"
            @click="openAppModal"
            class="rounded-xl border border-white/20 bg-white/5 px-6 py-3 text-sm font-black transition hover:bg-white/10"
          >
            Get Mobile App
          </button>
        </div>
      </div>
    </section>

    <!-- MODALS -->
    <Teleport to="body">
      <!-- VENUE MODAL -->
      <div
        v-if="showVenueModal && selectedVenue"
        class="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
        @click.self="closeVenue"
      >
        <div class="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-3xl bg-white shadow-2xl">
          <div class="relative h-52">
            <img
              :src="selectedVenue.image"
              :alt="selectedVenue.name"
              class="h-full w-full object-cover"
            />
            <button
              type="button"
              @click="closeVenue"
              class="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-sm font-bold text-white transition hover:bg-black"
            >
              ✕
            </button>
          </div>

          <div class="p-6">
            <div class="flex items-start justify-between gap-4">
              <div>
                <span class="inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-800">
                  {{ selectedVenue.sport }}
                </span>
                <h3 class="mt-2 text-xl font-black text-gray-900">
                  {{ selectedVenue.name }}
                </h3>
                <p class="mt-1 text-xs text-gray-500">
                  📍 {{ selectedVenue.location }}
                </p>
              </div>

              <div class="text-right">
                <div class="text-lg font-black text-green-600">
                  ETB {{ selectedVenue.price }}
                </div>
                <div class="text-[10px] text-gray-500">per hour</div>
              </div>
            </div>

            <p class="mt-4 text-sm leading-6 text-gray-600">
              {{ selectedVenue.description }}
            </p>

            <div class="mt-5">
              <h4 class="text-xs font-bold uppercase tracking-wider text-gray-500">
                Features & Amenities
              </h4>
              <div class="mt-2 flex flex-wrap gap-2">
                <span
                  v-for="feature in selectedVenue.features"
                  :key="feature"
                  class="rounded-lg bg-gray-100 px-2.5 py-1 text-xs font-semibold text-gray-700"
                >
                  ✓ {{ feature }}
                </span>
              </div>
            </div>

            <div class="mt-6 flex gap-3">
              <button
                type="button"
                @click="closeVenue"
                class="w-1/2 rounded-xl border border-gray-300 py-2.5 text-sm font-bold text-gray-700 transition hover:bg-gray-50"
              >
                Close
              </button>
              <button
                type="button"
                @click="bookVenue(selectedVenue)"
                class="w-1/2 rounded-xl bg-green-600 py-2.5 text-sm font-bold text-white shadow-md transition hover:bg-green-700"
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- APP MODAL -->
      <div
        v-if="showAppModal"
        class="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
        @click.self="closeAppModal"
      >
        <div class="w-full max-w-sm rounded-3xl bg-white p-6 text-center shadow-2xl">
          <div class="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-green-100 text-2xl text-green-600">
            📱
          </div>
          <h3 class="mt-3 text-xl font-black text-gray-900">Get CombolojoSPORT App</h3>
          <p class="mt-1 text-xs text-gray-600">
            Download our mobile app for faster bookings and instant notifications!
          </p>
          <div class="mt-5 flex flex-col gap-2">
            <button
              type="button"
              @click="closeAppModal"
              class="w-full rounded-xl bg-gray-900 py-2.5 text-sm font-bold text-white hover:bg-gray-800"
            >
              Google Play Store
            </button>
            <button
              type="button"
              @click="closeAppModal"
              class="w-full rounded-xl border border-gray-300 py-2.5 text-sm font-bold text-gray-800 hover:bg-gray-50"
            >
              Apple App Store
            </button>
          </div>
          <button
            type="button"
            @click="closeAppModal"
            class="mt-4 text-xs font-bold text-gray-400 hover:text-gray-600"
          >
            Cancel
          </button>
        </div>
      </div>
    </Teleport>

  </div>
</template>

<style scoped>
.hero-image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  animation: imageFade 12s infinite ease-in-out;
}

.hero-image-1 { animation-delay: 0s; }
.hero-image-2 { animation-delay: 4s; }
.hero-image-3 { animation-delay: 8s; }

@keyframes imageFade {
  0% { opacity: 0; transform: scale(1); }
  4% { opacity: 1; }
  29% { opacity: 1; }
  33% { opacity: 0; transform: scale(1.08); }
  100% { opacity: 0; }
}
</style>