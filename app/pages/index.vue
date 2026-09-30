<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

/* =========================================================
   IMAGES
========================================================= */

import img1 from '~/assets/images/venu1.jpg'
import img2 from '~/assets/images/venue2.jpg'
import img3 from '~/assets/images/venue3.jpg'
import img4 from '~/assets/images/venue4.jpg'
import img5 from '~/assets/images/venue5.jpg'

/* Hero slideshow images */
import venue20Image from '~/assets/images/venues20.jpg'
import venue10Image from '~/assets/images/venuess10.jpg'
import venue11Image from '~/assets/images/venuess11.jpg'
import venue12Image from '~/assets/images/venuess12.png'
import venue13Image from '~/assets/images/venuess13.jpg'
import venue7Image from '~/assets/images/venues7.jpg'

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
   HERO SLIDESHOW
========================================================= */

const heroImages = [
  venue20Image,
  venue10Image,
  venue11Image,
  venue12Image,
  venue13Image,
  venue7Image
]

const currentHeroIndex = ref(0)

let heroTimer: ReturnType<typeof setInterval> | null = null

onMounted(() => {
  heroTimer = setInterval(() => {
    currentHeroIndex.value =
      (currentHeroIndex.value + 1) % heroImages.length
  }, 4000)
})

onBeforeUnmount(() => {
  if (heroTimer) {
    clearInterval(heroTimer)
    heroTimer = null
  }
})

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
    query: { type: 'event' }
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
  <div class="min-h-screen bg-[#f7faf8] text-slate-900">

    <!-- =====================================================
         HERO SECTION
    ====================================================== -->
    <section class="hero-section relative min-h-[620px] overflow-hidden bg-[#07150f]">

      <!-- HERO IMAGES -->
      <div class="absolute inset-0">
        <img
          v-for="(image, index) in heroImages"
          :key="image"
          :src="image"
          alt=""
          aria-hidden="true"
          loading="eager"
          decoding="async"
          class="hero-image"
          :class="{ 'hero-image-active': currentHeroIndex === index }"
        />

        <div class="absolute inset-0 bg-black/35"></div>
        <div class="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#07150f] via-[#07150f]/40 to-transparent"></div>
      </div>

      <!-- HERO CONTENT -->
      <div class="relative z-10 mx-auto flex min-h-[620px] max-w-7xl items-center justify-center px-6 py-16 lg:px-8">

        <div class="hero-content mx-auto w-full max-w-3xl text-center">

          <!-- BADGE -->
          <div class="mx-auto mb-6 inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-black/40 px-4 py-1.5 shadow-md backdrop-blur-sm">
            <span class="flex h-6 w-6 items-center justify-center rounded-full bg-lime-400 text-xs">
              ⚽
            </span>
            <span class="text-[11px] font-extrabold uppercase tracking-widest text-white">
              Ethiopia's Sports Venue Platform
            </span>
          </div>

          <!-- MAIN TITLE -->
          <h1 class="mx-auto text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
           
            <span class="my-1 block font-black text-lime-400">
              
            </span>
            Book better  combolojo venues across Ethiopia.
          </h1>

          <!-- TITLE DECORATION LINE -->
          <div class="mt-5 flex items-center justify-center gap-2">
            <div class="h-1 w-12 rounded-full bg-lime-400"></div>
            <div class="h-1 w-4 rounded-full bg-white/50"></div>
          </div>

          <!-- DESCRIPTION -->
          <p class="mx-auto mt-5 max-w-xl text-base font-medium leading-relaxed text-slate-100 sm:text-lg">
            Discover premium sports venues, join community events, and book your next match with ease through the
            <span class="font-bold text-lime-300">CombolojoSPORT</span> experience.
          </p>

          <!-- SEARCH BOX CONTAINER -->
          <div class="mx-auto mt-8 max-w-3xl text-left">

            <div class="mb-2 flex items-center justify-center gap-2">
              <span class="text-sm">🔎</span>
              <p class="text-xs font-black uppercase tracking-wider text-white">
                Find your sports venue
              </p>
            </div>

            <div class="grid gap-3 rounded-2xl border border-white/20 bg-black/20 p-2 shadow-2xl backdrop-blur-md md:grid-cols-3">

              <!-- SPORT SELECT -->
              <div class="rounded-xl bg-white px-4 py-2.5 shadow-sm transition focus-within:ring-2 focus-within:ring-lime-400">
                <label class="mb-0.5 block text-[10px] font-black uppercase tracking-wider text-slate-500">
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

              <!-- LOCATION INPUT -->
              <div class="rounded-xl bg-white px-4 py-2.5 shadow-sm transition focus-within:ring-2 focus-within:ring-lime-400">
                <label class="mb-0.5 block text-[10px] font-black uppercase tracking-wider text-slate-500">
                  Location
                </label>
                <input
                  v-model="searchLocation"
                  type="text"
                  placeholder="Search venue or location"
                  class="w-full border-none bg-transparent text-sm font-bold text-slate-900 outline-none placeholder:text-slate-400"
                  @keyup.enter="searchVenues"
                />
              </div>

              <!-- SEARCH BUTTON -->
              <button
                type="button"
                @click="searchVenues"
                class="group flex items-center justify-center gap-2 rounded-xl bg-emerald-700 px-6 py-2.5 text-sm font-black text-white shadow-md transition hover:bg-emerald-800"
              >
                Search Venues
                <span class="text-base text-lime-400 transition-transform group-hover:translate-x-1">→</span>
              </button>

            </div>
          </div>

          <!-- TRUST BADGES -->
          <div class="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs font-bold text-white/90">
            <span>✓ Verified venues</span>
            <span>✓ Easy booking</span>
            <span>✓ Mobile app</span>
            <span>✓ Sports events</span>
          </div>

        </div>
      </div>

      <!-- HERO BOTTOM BAR -->
      <div class="absolute bottom-0 left-0 right-0 z-10 border-t border-white/10 bg-black/30 backdrop-blur-sm">
        <div class="mx-auto flex max-w-7xl items-center justify-between px-6 py-2.5 text-[10px] font-bold uppercase tracking-wider text-white/80 lg:px-8">
          <span>Addis Ababa • Ethiopia</span>
          <span>Play • Book • Connect</span>
        </div>
      </div>

    </section>

    <!-- =====================================================
         SPORTS CATEGORIES
    ====================================================== -->
    <section class="section-light bg-white py-14 shadow-[0_-8px_30px_rgba(15,23,42,0.03)]">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">

        <div class="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p class="text-[11px] font-black uppercase tracking-[0.2em] text-emerald-700">
              Sports categories
            </p>
            <h2 class="mt-2 text-3xl font-black tracking-tight text-slate-900">
              Choose your game.
            </h2>
            <p class="mt-2 max-w-xl text-sm leading-6 text-slate-500">
              Explore the sport that matches your energy and find the perfect venue for your next session.
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
            class="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-[0_8px_25px_rgba(15,23,42,0.04)] transition duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:bg-emerald-50/30 hover:shadow-[0_15px_35px_rgba(15,23,42,0.08)]"
          >
            <div class="absolute right-0 top-0 h-20 w-20 rounded-bl-full bg-emerald-50 transition group-hover:bg-lime-100"></div>
            <div class="relative">
              <div class="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-50 text-3xl shadow-sm transition group-hover:bg-white group-hover:shadow-md">
                {{ sport.icon }}
              </div>
              <h3 class="mt-5 text-base font-black text-slate-900">
                {{ sport.name }}
              </h3>
              <p class="mt-1 text-xs font-bold text-slate-400 transition group-hover:text-emerald-700">
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
    <section class="section-green bg-[#f0f5f2] py-14 shadow-inner">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">

        <div class="text-center">
          <p class="text-[11px] font-black uppercase tracking-[0.2em] text-emerald-700">
            Simple process
          </p>
          <h2 class="mt-2 text-3xl font-black tracking-tight text-slate-900">
            How CombolojoSPORT works
          </h2>
          <p class="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-500">
            Find your venue on the website and complete the booking from the mobile application.
          </p>
        </div>

        <div class="mt-10 grid gap-5 md:grid-cols-4">
          <div
            v-for="step in [
              { number: '01', icon: '🔎', title: 'Find', text: 'Search for your preferred sports venue.' },
              { number: '02', icon: '👁️', title: 'View Details', text: 'Check the venue information, facilities and price.' },
              { number: '03', icon: '📱', title: 'Get App', text: 'Download the CombolojoSPORT mobile application.' },
              { number: '04', icon: '📅', title: 'Book', text: 'Choose your date and available time slot in the app.' }
            ]"
            :key="step.number"
            class="group relative rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_8px_25px_rgba(15,23,42,0.04)] transition duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-[0_15px_35px_rgba(15,23,42,0.08)]"
          >
            <span class="absolute right-5 top-5 text-[10px] font-black text-emerald-300">
              {{ step.number }}
            </span>
            <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-xl shadow-sm transition group-hover:bg-emerald-50 group-hover:shadow-md">
              {{ step.icon }}
            </div>
            <h3 class="mt-5 text-base font-black text-slate-900">
              {{ step.title }}
            </h3>
            <p class="mt-2 text-sm leading-6 text-slate-500">
              {{ step.text }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- =====================================================
         VENUES
    ====================================================== -->
    <section ref="venueSection" class="scroll-mt-16 bg-[#f7faf8] py-14 shadow-[0_-6px_25px_rgba(15,23,42,0.025)]">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">

        <div class="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p class="text-[11px] font-black uppercase tracking-[0.2em] text-emerald-700">
              Featured venues
            </p>
            <h2 class="mt-2 text-3xl font-black tracking-tight text-slate-900">
              Find your perfect field
            </h2>
            <p class="mt-2 text-sm text-slate-500">
              Explore sports venues and check their complete information.
            </p>
          </div>

          <NuxtLink to="/venues" class="inline-flex items-center gap-2 text-sm font-black text-emerald-700 transition hover:text-lime-600">
            View all venues →
          </NuxtLink>
        </div>

        <div v-if="filteredVenues.length" class="mt-9 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <article
            v-for="venue in filteredVenues.slice(0, 4)"
            :key="venue.id"
            class="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_8px_25px_rgba(15,23,42,0.05)] transition duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-[0_18px_40px_rgba(15,23,42,0.10)]"
          >
            <div class="relative h-48 overflow-hidden">
              <img :src="venue.image" :alt="venue.name" class="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
              <div class="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
              <span class="absolute left-3 top-3 rounded-lg bg-white/95 px-2.5 py-1 text-[10px] font-black text-slate-900 shadow-md">
                {{ venue.sport }}
              </span>
              <span class="absolute right-3 top-3 rounded-lg bg-[#064e3b] px-2.5 py-1 text-[10px] font-black text-white shadow-lg">
                ★ {{ venue.rating }}
              </span>
            </div>

            <div class="p-5">
              <h3 class="truncate text-base font-black text-slate-900">
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
                  <p class="text-[10px] font-bold uppercase text-slate-400">
                    Starting from
                  </p>
                  <p class="mt-1 text-base font-black text-emerald-700">
                    ETB {{ venue.price }}
                    <span class="text-[10px] font-normal text-slate-400">/ hour</span>
                  </p>
                </div>

                <button
                  type="button"
                  @click="openVenue(venue)"
                  class="rounded-lg bg-slate-900 px-3 py-2 text-xs font-black text-white shadow-sm transition duration-300 hover:bg-emerald-700 hover:shadow-md"
                >
                  View Details
                </button>
              </div>
            </div>
          </article>
        </div>

        <div v-else class="mt-8 rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center shadow-sm">
          <div class="text-3xl">🔎</div>
          <h3 class="mt-3 text-lg font-black">No venues found</h3>
          <p class="mt-1 text-sm text-slate-500">Try another sport or location.</p>
          <button
            type="button"
            @click="clearSearch"
            class="mt-4 rounded-lg bg-emerald-700 px-4 py-2 text-sm font-black text-white shadow-md transition hover:bg-emerald-800"
          >
            Clear Search
          </button>
        </div>

      </div>
    </section>

<!-- =====================================================
         EVENTS
    ====================================================== -->
    <section class="relative overflow-hidden bg-[rgb(7,21,15)] py-14 text-white shadow-[0_-15px_45px_rgba(7,21,15,0.18)]">
      <div class="relative mx-auto max-w-7xl px-6 lg:px-8">

        <div class="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p class="text-[11px] font-black uppercase tracking-[0.2em] text-lime-400">
              Upcoming events
            </p>
            <h2 class="mt-2 text-3xl font-black tracking-tight">
              Play together. Compete together.
            </h2>
            <p class="mt-2 text-sm text-white/50">
              Discover tournaments, games and community events.
            </p>
          </div>

          <NuxtLink to="/events" class="text-sm font-black text-lime-400 transition hover:text-lime-300">
            View all events →
          </NuxtLink>
        </div>

        <div class="mt-9 grid gap-6 md:grid-cols-3">
          <article
            v-for="event in events"
            :key="event.id"
            class="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.05] shadow-[0_15px_40px_rgba(0,0,0,0.20)] transition duration-300 hover:-translate-y-1 hover:border-lime-400/30 hover:bg-white/[0.07] hover:shadow-[0_20px_50px_rgba(0,0,0,0.30)]"
          >
            <div class="relative h-44 overflow-hidden">
              <img :src="event.image" :alt="event.title" class="h-full w-full object-cover transition duration-500 hover:scale-105" />
              <div class="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
              <span class="absolute left-3 top-3 rounded-lg bg-lime-400 px-2.5 py-1 text-[10px] font-black text-slate-900 shadow-lg">
                {{ event.sport }}
              </span>
            </div>

            <div class="p-5">
              <div class="flex items-center gap-2 text-xs font-bold text-lime-400">
                <span>📅 {{ event.date }}</span>
                <span>•</span>
                <span>🕒 {{ event.time }}</span>
              </div>

              <h3 class="mt-2 text-lg font-black text-white">
                {{ event.title }}
              </h3>
              <p class="mt-1 text-xs text-white/60">
                📍 {{ event.location }}
              </p>

              <div class="my-4 h-px bg-white/10"></div>

              <div class="flex items-center justify-between">
                <span class="text-xs text-white/50">
                  By {{ event.organizer }}
                </span>
                <button
                  type="button"
                  @click="openEvent(event)"
                  class="rounded-lg bg-lime-400 px-3 py-1.5 text-xs font-black text-slate-950 shadow-sm transition hover:bg-lime-300"
                >
                  View Event
                </button>
              </div>
            </div>
          </article>
        </div>

      </div>
    </section>

    <!-- =====================================================
         APP DOWNLOAD CTA
    ====================================================== -->
    <section class="bg-gradient-to-b from-[#07150f] to-[#040e0a] py-16 text-white">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-r from-emerald-950/80 to-slate-900/80 p-8 shadow-[0_20px_60px_rgba(0,0,0,0.25)] md:p-12">
          <div class="relative max-w-2xl">
            <span class="inline-block rounded-full bg-lime-400/10 px-3 py-1 text-xs font-bold text-lime-400">
              Get the Mobile App
            </span>
            <h2 class="mt-4 text-3xl font-black text-white sm:text-4xl">
              Book slots & connect on the go
            </h2>
            <p class="mt-3 text-sm leading-6 text-white/70">
              Download the CombolojoSPORT app to manage your bookings, discover tournaments, and secure pitch slots instantly from your smartphone.
            </p>
            <div class="mt-6 flex flex-wrap gap-4">
              <NuxtLink
                to="/download-app"
                class="rounded-xl bg-lime-400 px-6 py-3 text-sm font-black text-slate-950 shadow-lg transition hover:bg-lime-300"
              >
                Download App
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- =====================================================
         TESTIMONIALS
    ====================================================== -->
    <section class="bg-white py-14 shadow-[0_-5px_25px_rgba(15,23,42,0.03)]">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="text-center">
          <p class="text-[11px] font-black uppercase tracking-[0.2em] text-emerald-700">
            Community Feedback
          </p>
          <h2 class="mt-2 text-3xl font-black tracking-tight text-slate-900">
            What our users say
          </h2>
        </div>

        <div class="mt-10 grid gap-6 md:grid-cols-3">
          <div
            v-for="item in testimonials"
            :key="item.name"
            class="group rounded-2xl border border-slate-200 bg-[#f8faf9] p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-emerald-200"
          >
            <div class="mb-4 text-2xl text-emerald-600">“</div>
            <p class="text-sm leading-6 text-slate-600">"{{ item.text }}"</p>
            <div class="mt-6 border-t border-slate-200 pt-4">
              <p class="text-sm font-black text-slate-900">{{ item.name }}</p>
              <p class="text-xs text-slate-400">{{ item.role }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- =====================================================
         FAQ
    ====================================================== -->
    <section class="bg-[#f0f5f2] py-14 shadow-inner">
      <div class="mx-auto max-w-3xl px-6 lg:px-8">
        <div class="text-center">
          <p class="text-[11px] font-black uppercase tracking-[0.2em] text-emerald-700">
            FAQ
          </p>
          <h2 class="mt-2 text-3xl font-black tracking-tight text-slate-900">
            Frequently Asked Questions
          </h2>
        </div>

        <div class="mt-8 space-y-4">
          <div
            v-for="(faq, index) in faqs"
            :key="index"
            class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition"
          >
            <button
              type="button"
              @click="toggleFaq(index)"
              class="flex w-full items-center justify-between p-5 text-left font-black text-slate-900"
            >
              <span>{{ faq.question }}</span>
              <span class="ml-4 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-lg text-emerald-700">
                {{ openFaq === index ? '−' : '+' }}
              </span>
            </button>
            <div v-if="openFaq === index" class="border-t border-slate-100 p-5 pt-0 text-sm leading-6 text-slate-600">
              {{ faq.answer }}
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- =====================================================
         VENUE MODAL
    ====================================================== -->
    <div
      v-if="showVenueModal && selectedVenue"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
    >
      <div class="w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-2xl">
        <div class="relative h-48 overflow-hidden">
          <img :src="selectedVenue.image" :alt="selectedVenue.name" class="h-full w-full object-cover" />
          <div class="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
          <button
            type="button"
            @click="closeVenue"
            class="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white transition hover:bg-black/80"
          >
            ✕
          </button>
        </div>

        <div class="p-6">
          <div class="flex items-center justify-between">
            <span class="rounded-md bg-emerald-100 px-2 py-0.5 text-xs font-bold text-emerald-800">
              {{ selectedVenue.sport }}
            </span>
            <span class="text-xs font-bold text-slate-500">
              ★ {{ selectedVenue.rating }} ({{ selectedVenue.reviews }} reviews)
            </span>
          </div>

          <h3 class="mt-2 text-xl font-black text-slate-900">{{ selectedVenue.name }}</h3>
          <p class="mt-1 text-xs text-slate-500">📍 {{ selectedVenue.location }}</p>
          <p class="mt-3 text-sm leading-6 text-slate-600">{{ selectedVenue.description }}</p>

          <div class="mt-4 flex flex-wrap gap-2">
            <span
              v-for="feat in selectedVenue.features"
              :key="feat"
              class="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700"
            >
              ✓ {{ feat }}
            </span>
          </div>

          <div class="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
            <div>
              <p class="text-[10px] uppercase text-slate-400">Price per hour</p>
              <p class="text-lg font-black text-emerald-700">ETB {{ selectedVenue.price }}</p>
            </div>
            <button
              type="button"
              @click="bookVenue"
              class="rounded-xl bg-emerald-700 px-5 py-2.5 text-sm font-black text-white shadow-md transition hover:bg-emerald-800"
            >
              Book via App
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- =====================================================
         EVENT MODAL
    ====================================================== -->
    <div
      v-if="showEventModal && selectedEvent"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
    >
      <div class="w-full max-w-lg overflow-hidden rounded-3xl border border-white/10 bg-slate-900 text-white shadow-2xl">
        <div class="relative h-48 overflow-hidden">
          <img :src="selectedEvent.image" :alt="selectedEvent.title" class="h-full w-full object-cover" />
          <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
          <button
            type="button"
            @click="closeEvent"
            class="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white transition hover:bg-black/80"
          >
            ✕
          </button>
        </div>

        <div class="p-6">
          <span class="rounded-md bg-lime-400 px-2 py-0.5 text-xs font-bold text-slate-950">
            {{ selectedEvent.sport }}
          </span>
          <h3 class="mt-2 text-xl font-black text-white">{{ selectedEvent.title }}</h3>
          <p class="mt-1 text-xs text-lime-400">📅 {{ selectedEvent.date }} at {{ selectedEvent.time }}</p>
          <p class="mt-1 text-xs text-white/60">📍 {{ selectedEvent.location }}</p>
          <p class="mt-3 text-sm leading-6 text-white/80">{{ selectedEvent.description }}</p>

          <div class="mt-4 text-xs text-white/60">
            <p><strong>Organizer:</strong> {{ selectedEvent.organizer }}</p>
            <p class="mt-1"><strong>Participants:</strong> {{ selectedEvent.participants }}</p>
          </div>

          <div class="mt-6 flex justify-end border-t border-white/10 pt-4">
            <button
              type="button"
              @click="joinEvent"
              class="rounded-xl bg-lime-400 px-5 py-2.5 text-sm font-black text-slate-950 transition hover:bg-lime-300"
            >
              Join via App
            </button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped>
/* HERO IMAGE STYLING */
.hero-image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  opacity: 0;
  transition: opacity 800ms ease-in-out;
  will-change: opacity;
}

.hero-image-active {
  opacity: 1;
}

/* CUSTOM SCROLLBAR */
::-webkit-scrollbar {
  width: 8px;
}
::-webkit-scrollbar-track {
  background: #f1f5f9;
}
::-webkit-scrollbar-thumb {
  background: #a3e635;
  border-radius: 999px;
}
</style>