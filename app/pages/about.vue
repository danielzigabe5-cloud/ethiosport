<script setup lang="ts">
import { ref } from 'vue'

import venueImg from '~/assets/images/venuess12.png'

useHead({
  title: 'About Us - Combolojo',
  meta: [
    {
      name: 'description',
      content:
        'Learn about Combolojo and how we connect sports players, venues and communities across Ethiopia.',
    },
  ],
})

const stats = [
  {
    id: 1,
    value: '10K+',
    label: 'Active Players',
    description: 'Sports lovers',
    icon: 'users',
  },
  {
    id: 2,
    value: '150+',
    label: 'Partner Venues',
    description: 'Sports facilities',
    icon: 'stadium',
  },
  {
    id: 3,
    value: '10+',
    label: 'Cities Covered',
    description: 'Growing nationwide',
    icon: 'location',
  },
  {
    id: 4,
    value: '25K+',
    label: 'Games Hosted',
    description: 'Successful games',
    icon: 'games',
  },
]

const activeTab = ref<'players' | 'venues' | 'community'>('players')

const tabContent = {
  players: {
    title: 'For Athletes & Players',
    desc:
      'Find sports venues, discover games and connect with other players. Combolojo makes it easier to organize your next match.',
    highlights: [
      'Easy venue discovery',
      'Find available sports facilities',
      'Simple booking experience',
      'Discover games and activities',
    ],
  },

  venues: {
    title: 'For Venue Partners',
    desc:
      'Venue owners can manage their facilities, availability, bookings and events through one organized platform.',
    highlights: [
      'Manage venue information',
      'Control available booking slots',
      'Track bookings and activities',
      'Connect with more players',
    ],
  },

  community: {
    title: 'For Sports Communities',
    desc:
      'Combolojo helps sports communities connect players, organize games and create more opportunities to play.',
    highlights: [
      'Community sports events',
      'Tournament opportunities',
      'Connect players and teams',
      'Build active sports communities',
    ],
  },
}

const features = [
  {
    title: 'Easy Venue Discovery',
    desc:
      'Find football fields, basketball courts, volleyball courts and other sports venues in one place.',
    icon: '🔎',
  },
  {
    title: 'Simple Online Booking',
    desc:
      'Choose a venue, select an available slot and continue with your booking without unnecessary steps.',
    icon: '📅',
  },
  {
    title: 'Sports Community',
    desc:
      'Connect players, teams, venue partners and sports communities through one platform.',
    icon: '🤝',
  },
  {
    title: 'Real-Time Availability',
    desc:
      'See available sports facilities and booking slots so you can plan your game more easily.',
    icon: '⚡',
  },
  {
    title: 'Events & Tournaments',
    desc:
      'Discover sports events, tournaments and activities happening around your community.',
    icon: '🏆',
  },
  {
    title: 'Digital Experience',
    desc:
      'Manage your sports activities through a modern and simple digital platform.',
    icon: '📱',
  },
]

const reviews = [
  {
    name: 'Abebe Tadesse',
    role: 'Football Player',
    comment:
      'Finding a football field for our weekend game is much easier with Combolojo.',
    avatar: '👨',
  },
  {
    name: 'Selam Hailu',
    role: 'Venue Partner',
    comment:
      'The platform gives us a simple way to present our venue and manage our sports activities.',
    avatar: '👩',
  },
  {
    name: 'Mulugeta Bekele',
    role: 'Sports Community',
    comment:
      'It helps players discover games and connect with people who enjoy the same sports.',
    avatar: '🧑',
  },
]

const subCities = [
  'Bole',
  'Yeka',
  'Nifas Silk',
  'Arada',
  'Kirkos',
  'Gullele',
  'Lideta',
  'Hawassa',
  'Bahir Dar',
]

function exploreVenues() {
  navigateTo('/venues')
}

function findGames() {
  navigateTo('/just-play')
}

function registerVenue() {
  navigateTo('/business/register')
}
</script>

<template>
  <div class="min-h-screen bg-slate-50 text-slate-800">

    <!-- ===================================================== -->
    <!-- 1. HERO SECTION -->
    <!-- ===================================================== -->

    <section class="relative min-h-[500px] overflow-hidden flex items-center">

      <!-- Background image -->
      <img
        :src="venueImg"
        alt="CombolojoS venue"
        class="absolute inset-0 h-full w-full object-cover object-center"
      />

      <!-- Overlay for text readability -->
      <div class="absolute inset-0 bg-black/40"></div>

      <div
        class="relative z-10 mx-auto w-full max-w-7xl px-5 py-16 sm:px-8 lg:px-10"
      >
        <div class="max-w-3xl">

          <!-- Badge -->
          <div
            class="inline-flex items-center gap-3 rounded-full border border-emerald-400/40 bg-black/50 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-emerald-300 shadow-lg backdrop-blur-md"
          >
            <span class="relative flex h-2.5 w-2.5">
              <span
                class="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"
              ></span>

              <span
                class="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400"
              ></span>
            </span>

            About CombolojoS
          </div>

          <!-- Title -->
          <h1
            class="mt-5 text-4xl font-black leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            Connecting
            <span class="text-emerald-400">Players</span>,
            <br />

            Venues &
            <span class="text-amber-300">Communities</span>
          </h1>

          <!-- Description -->
          <p
            class="mt-5 max-w-2xl text-base leading-7 text-slate-200 sm:text-lg"
          >
            Combolojo is a digital sports platform designed to make
            finding, booking and enjoying sports venues easier for players,
            teams and communities across Ethiopia.
          </p>

          <!-- Buttons -->
          <div class="mt-7 flex flex-wrap gap-4">
            <button
              type="button"
              class="rounded-xl bg-emerald-600 px-6 py-3 font-bold text-white shadow-xl shadow-black/40 transition duration-300 hover:-translate-y-1 hover:bg-emerald-500"
              @click="exploreVenues"
            >
              ⚽ Explore Venues
            </button>

            <button
              type="button"
              class="rounded-xl border border-white/30 bg-white/10 px-6 py-3 font-bold text-white shadow-xl backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:bg-white/20"
              @click="findGames"
            >
              🎮 Find Games
            </button>
          </div>

          <!-- Small trust information -->
          <div
            class="mt-7 flex flex-wrap items-center gap-6 text-sm text-slate-300"
          >
            <div class="flex items-center gap-2">
              <span class="text-emerald-400">✓</span>
              Easy Booking
            </div>

            <div class="flex items-center gap-2">
              <span class="text-emerald-400">✓</span>
              Sports Communities
            </div>

            <div class="flex items-center gap-2">
              <span class="text-emerald-400">✓</span>
              Growing Across Ethiopia
            </div>
          </div>

        </div>
      </div>
    </section>

    <!-- ===================================================== -->
    <!-- 2. STATS (FIXED OVERLAP & PADDING) -->
    <!-- ===================================================== -->

    <section class="relative z-20 py-10 px-4 sm:px-6 lg:px-8 bg-slate-100/60 border-b border-slate-200">
      <div class="mx-auto max-w-7xl">

        <div class="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">

          <div
            v-for="stat in stats"
            :key="stat.id"
            class="group rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-md transition duration-300 hover:-translate-y-1 hover:border-emerald-300 hover:shadow-xl"
          >

            <!-- MODERN ICON -->
            <div
              class="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 transition duration-300 group-hover:scale-110 group-hover:bg-emerald-100"
            >

              <!-- Users -->
              <svg
                v-if="stat.icon === 'users'"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.8"
                stroke="currentColor"
                class="h-6 w-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.75 6.75 0 0 1 11.964-4.157M12 12.75a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9Zm4.5-1.875a3.375 3.375 0 1 0 0-6.75"
                />
              </svg>

              <!-- Stadium -->
              <svg
                v-else-if="stat.icon === 'stadium'"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.8"
                stroke="currentColor"
                class="h-6 w-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M3 21h18M4 18h16M5 18V9l7-4 7 4v9M8 18v-5h3v5m2 0v-5h3v5M3 9l9-5 9 5"
                />
              </svg>

              <!-- Location -->
              <svg
                v-else-if="stat.icon === 'location'"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.8"
                stroke="currentColor"
                class="h-6 w-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M19.5 10.5c0 7.142-7.5 10.5-7.5 10.5S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                />
              </svg>

              <!-- Games -->
              <svg
                v-else
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.8"
                stroke="currentColor"
                class="h-6 w-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6.5 6.5h11a4 4 0 0 1 3.87 5l-1.1 4.4a2.5 2.5 0 0 1-4.35 1.02l-1.7-2.12a2 2 0 0 0-1.56-.75h-1.32a2 2 0 0 0-1.56.75l-1.7 2.12a2.5 2.5 0 0 1-4.35-1.02l-1.1-4.4a4 4 0 0 1 3.87-5Z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M8 10v3m-1.5-1.5h3M16.5 10.5h.01M18 12h.01"
                />
              </svg>

            </div>

            <div
              class="mt-3 text-2xl font-black text-emerald-600 sm:text-3xl"
            >
              {{ stat.value }}
            </div>

            <div class="mt-1 text-sm font-bold text-slate-900">
              {{ stat.label }}
            </div>

            <div class="mt-0.5 text-xs text-slate-500">
              {{ stat.description }}
            </div>
          </div>

        </div>
      </div>
    </section>

    <!-- ===================================================== -->
    <!-- 3. ABOUT INTRO -->
    <!-- ===================================================== -->

    <section class="bg-slate-50 px-4 py-14 sm:px-6 lg:px-8">
      <div
        class="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 lg:grid-cols-2"
      >

        <!-- Text -->
        <div>
          <p
            class="text-xs font-bold uppercase tracking-[0.18em] text-emerald-600"
          >
            About Our Platform
          </p>

          <h2
            class="mt-3 text-2xl font-black leading-tight text-slate-900 sm:text-3xl lg:text-4xl"
          >
            One platform for your
            <span class="text-emerald-600">sports journey.</span>
          </h2>

          <p class="mt-4 leading-7 text-slate-600">
            Finding the right sports venue should not be difficult.
            Combolojo brings players and sports facilities together
            through an easy-to-use digital platform.
          </p>

          <p class="mt-3 leading-7 text-slate-600">
            Whether you are looking for a football field for your team,
            a basketball court with your friends, or a venue for a community
            event, our goal is to make the process simple and convenient.
          </p>

          <!-- Tags -->
          <div class="mt-6 flex flex-wrap gap-3">

            <div
              class="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-300"
            >
              ⚽ Players
            </div>

            <div
              class="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-300"
            >
              🏟️ Venues
            </div>

            <div
              class="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-300"
            >
              🤝 Communities
            </div>

          </div>
        </div>

        <!-- Image -->
        <div class="relative">

          <div
            class="absolute -inset-4 rounded-[2rem] bg-emerald-500/10 blur-xl"
          ></div>

          <div
            class="relative overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white p-2 shadow-xl"
          >
            <div class="relative overflow-hidden rounded-[1rem]">

              <img
                :src="venueImg"
                alt="Sports venue"
                loading="lazy"
                class="block h-[340px] w-full object-cover transition duration-700 hover:scale-105"
              />

              <div
                class="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"
              ></div>

              <div class="absolute bottom-5 left-5 right-5 text-white">
                <div class="text-lg font-black">
                  Find your place to play.
                </div>

                <div class="mt-0.5 text-xs text-slate-200">
                  Discover sports venues through Combolojo.
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>

    <!-- ===================================================== -->
    <!-- 4. MISSION & VISION -->
    <!-- ===================================================== -->

    <section
      class="border-y border-slate-200 bg-white px-4 py-14 sm:px-6 lg:px-8"
    >
      <div class="mx-auto max-w-6xl">

        <div class="mx-auto max-w-2xl text-center">
          <p
            class="text-xs font-bold uppercase tracking-[0.18em] text-emerald-600"
          >
            Our Purpose
          </p>

          <h2
            class="mt-2 text-2xl font-black text-slate-900 sm:text-3xl"
          >
            Our Mission & Vision
          </h2>

          <p class="mt-2 leading-6 text-slate-500 text-sm">
            We are building a connected digital sports ecosystem for players,
            venues and communities.
          </p>
        </div>

        <div class="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">

          <!-- Mission -->
          <div
            class="group rounded-2xl border border-slate-200 bg-slate-50 p-6 transition duration-300 hover:-translate-y-1 hover:border-emerald-300 hover:shadow-lg"
          >
            <div
              class="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-2xl"
            >
              🎯
            </div>

            <h3 class="mt-5 text-xl font-black text-slate-900">
              Our Mission
            </h3>

            <p class="mt-3 leading-7 text-sm text-slate-600">
              To make sports venue discovery and booking easier while
              connecting players, teams, venue partners and communities
              through one accessible digital platform.
            </p>
          </div>

          <!-- Vision -->
          <div
            class="group rounded-2xl border border-slate-200 bg-slate-50 p-6 transition duration-300 hover:-translate-y-1 hover:border-amber-300 hover:shadow-lg"
          >
            <div
              class="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100 text-2xl"
            >
              🚀
            </div>

            <h3 class="mt-5 text-xl font-black text-slate-900">
              Our Vision
            </h3>

            <p class="mt-3 leading-7 text-sm text-slate-600">
              To build a connected sports ecosystem where people can easily
              discover places to play, organize games and grow active sports
              communities across Ethiopia.
            </p>
          </div>

        </div>
      </div>
    </section>

    <!-- ===================================================== -->
    <!-- 5. FEATURES -->
    <!-- ===================================================== -->

    <section class="bg-slate-50 px-4 py-14 sm:px-6 lg:px-8">
      <div class="mx-auto max-w-7xl">

        <div class="mx-auto max-w-2xl text-center">
          <p
            class="text-xs font-bold uppercase tracking-[0.18em] text-emerald-600"
          >
            What We Offer
          </p>

          <h2
            class="mt-2 text-2xl font-black text-slate-900 sm:text-3xl"
          >
            Everything starts with a game.
          </h2>

          <p class="mt-2 leading-6 text-slate-500 text-sm">
            Simple digital tools designed to make sports venue discovery,
            booking and community activities easier.
          </p>
        </div>

        <div
          class="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3"
        >

          <div
            v-for="(feature, index) in features"
            :key="index"
            class="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-emerald-300 hover:shadow-lg"
          >
            <div
              class="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-2xl transition duration-300 group-hover:scale-110 group-hover:bg-emerald-100"
            >
              {{ feature.icon }}
            </div>

            <h3 class="mt-4 text-lg font-black text-slate-900">
              {{ feature.title }}
            </h3>

            <p class="mt-2 text-xs leading-6 text-slate-500">
              {{ feature.desc }}
            </p>

            <div
              class="mt-4 h-1 w-8 rounded-full bg-emerald-500 transition-all duration-300 group-hover:w-16"
            ></div>
          </div>

        </div>
      </div>
    </section>

    <!-- ===================================================== -->
    <!-- 6. ECOSYSTEM TABS -->
    <!-- ===================================================== -->

    <section
      class="border-y border-slate-200 bg-white px-4 py-14 sm:px-6 lg:px-8"
    >
      <div class="mx-auto max-w-6xl">

        <div class="mx-auto max-w-2xl text-center">
          <p
            class="text-xs font-bold uppercase tracking-[0.18em] text-emerald-600"
          >
            Our Ecosystem
          </p>

          <h2
            class="mt-2 text-2xl font-black text-slate-900 sm:text-3xl"
          >
            Built for everyone who loves sports
          </h2>

          <p class="mt-2 text-xs leading-6 text-slate-500">
            Players, venue owners and sports communities all have a place
            on CombolojoSPORT.
          </p>
        </div>

        <!-- Tabs -->
        <div class="mt-8 flex justify-center gap-2 overflow-x-auto pb-2">

          <button
            type="button"
            class="whitespace-nowrap rounded-xl px-4 py-2.5 text-xs font-bold transition"
            :class="
              activeTab === 'players'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            "
            @click="activeTab = 'players'"
          >
            ⚽ For Players
          </button>

          <button
            type="button"
            class="whitespace-nowrap rounded-xl px-4 py-2.5 text-xs font-bold transition"
            :class="
              activeTab === 'venues'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            "
            @click="activeTab = 'venues'"
          >
            🏟️ For Venues
          </button>

          <button
            type="button"
            class="whitespace-nowrap rounded-xl px-4 py-2.5 text-xs font-bold transition"
            :class="
              activeTab === 'community'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            "
            @click="activeTab = 'community'"
          >
            🤝 Community
          </button>

        </div>

        <!-- Tab content -->
        <div
          class="mt-8 grid grid-cols-1 items-center gap-10 lg:grid-cols-2"
        >

          <div>
            <div
              class="inline-flex rounded-lg bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700"
            >
              Combolojo
            </div>

            <h3
              class="mt-3 text-xl font-black text-slate-900 sm:text-2xl"
            >
              {{ tabContent[activeTab].title }}
            </h3>

            <p class="mt-3 text-sm leading-7 text-slate-600">
              {{ tabContent[activeTab].desc }}
            </p>

            <ul class="mt-6 space-y-3">

              <li
                v-for="(point, index) in tabContent[activeTab].highlights"
                :key="index"
                class="flex items-center gap-3"
              >
                <span
                  class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-xs font-black text-emerald-700"
                >
                  ✓
                </span>

                <span class="text-xs font-semibold text-slate-700">
                  {{ point }}
                </span>
              </li>

            </ul>
          </div>

          <!-- Tab image -->
          <div class="relative">

            <div
              class="absolute -inset-3 rounded-2xl bg-emerald-500/10 blur-xl"
            ></div>

            <div
              class="relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 p-2 shadow-xl"
            >
              <div class="relative overflow-hidden rounded-xl">

                <img
                  :src="venueImg"
                  alt="Combolojo venue"
                  loading="lazy"
                  class="block h-[300px] w-full object-cover"
                />

                <div
                  class="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"
                ></div>

                <div
                  class="absolute bottom-4 left-4 right-4 rounded-xl border border-white/20 bg-slate-950/70 p-4 text-white backdrop-blur-md"
                >
                  <div class="flex items-center gap-3">

                    <div
                      class="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-600 text-lg"
                    >
                      ⚡
                    </div>

                    <div>
                      <div class="text-sm font-bold">
                        Fast & Simple
                      </div>

                      <div class="text-[11px] text-slate-300">
                        Designed for an easy sports experience.
                      </div>
                    </div>

                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>

    <!-- ===================================================== -->
    <!-- 7. POPULAR SPORTS HUBS -->
    <!-- ===================================================== -->

    <section class="bg-slate-50 px-4 py-14 sm:px-6 lg:px-8">
      <div class="mx-auto max-w-6xl">

        <div class="text-center">
          <p
            class="text-xs font-bold uppercase tracking-[0.18em] text-emerald-600"
          >
            Explore Locations
          </p>

          <h2
            class="mt-2 text-2xl font-black text-slate-900 sm:text-3xl"
          >
            Popular Sports Hubs
          </h2>

          <p class="mt-2 text-xs text-slate-500">
            Explore sports opportunities in different locations.
          </p>
        </div>

        <div
          class="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5"
        >

          <NuxtLink
            v-for="city in subCities"
            :key="city"
            to="/venues"
            class="group rounded-xl border border-slate-200 bg-white p-4 text-center shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-emerald-400 hover:shadow-md"
          >
            <div
              class="mx-auto flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50 text-lg transition group-hover:bg-emerald-100"
            >
              📍
            </div>

            <div
              class="mt-2 text-xs font-bold text-slate-700 group-hover:text-emerald-700"
            >
              {{ city }}
            </div>
          </NuxtLink>

        </div>
      </div>
    </section>

    <!-- ===================================================== -->
    <!-- 8. TESTIMONIALS -->
    <!-- ===================================================== -->

    <section class="bg-white px-4 py-14 sm:px-6 lg:px-8">
      <div class="mx-auto max-w-6xl">

        <div class="mx-auto max-w-2xl text-center">
          <p
            class="text-xs font-bold uppercase tracking-[0.18em] text-emerald-600"
          >
            Community Voices
          </p>

          <h2
            class="mt-2 text-2xl font-black text-slate-900 sm:text-3xl"
          >
            Loved by Players & Venue Partners
          </h2>

          <p class="mt-2 text-xs text-slate-500">
            See how CombolojoS can make sports activities easier.
          </p>
        </div>

        <div class="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">

          <div
            v-for="(review, index) in reviews"
            :key="index"
            class="rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            <div class="text-emerald-600 text-3xl">
              “
            </div>

            <p class="mt-1 text-xs leading-6 italic text-slate-600">
              {{ review.comment }}
            </p>

            <div
              class="mt-5 flex items-center gap-3 border-t border-slate-200 pt-4"
            >
              <div
                class="flex h-10 w-10 items-center justify-center rounded-full bg-white text-xl shadow-sm"
              >
                {{ review.avatar }}
              </div>

              <div>
                <div class="text-xs font-bold text-slate-900">
                  {{ review.name }}
                </div>

                <div
                  class="mt-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-600"
                >
                  {{ review.role }}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>

    <!-- ===================================================== -->
    <!-- 9. FINAL CTA -->
    <!-- ===================================================== -->

    <section class="px-4 py-14 sm:px-6 lg:px-8">
      <div class="mx-auto max-w-7xl">

        <div
          class="relative overflow-hidden rounded-3xl bg-slate-950 px-6 py-14 shadow-2xl sm:px-10 lg:px-16"
        >

          <!-- Background -->
          <div
            class="absolute inset-0 bg-gradient-to-r from-emerald-950 via-slate-950 to-slate-950"
          ></div>

          <!-- Green glow -->
          <div
            class="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-emerald-500/20 blur-3xl"
          ></div>

          <div
            class="absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-emerald-400/10 blur-3xl"
          ></div>

          <!-- Content -->
          <div class="relative z-10 text-center">

            <p
              class="text-xs font-bold uppercase tracking-[0.2em] text-emerald-400"
            >
              CombolojoSPORT
            </p>

            <h2
              class="mt-3 text-2xl font-black text-white sm:text-3xl lg:text-4xl"
            >
              Ready to play?
            </h2>

            <p
              class="mx-auto mt-3 max-w-xl text-xs leading-6 text-slate-300 sm:text-sm"
            >
              Find a venue, discover a game and start your next sports
              experience with CombolojoSPORT.
            </p>

            <div class="mt-7 flex flex-wrap justify-center gap-4">

              <button
                type="button"
                class="rounded-xl bg-emerald-600 px-6 py-3 text-xs font-bold text-white shadow-xl shadow-emerald-950/40 transition duration-300 hover:-translate-y-0.5 hover:bg-emerald-500"
                @click="exploreVenues"
              >
                ⚽ Explore Venues
              </button>

              <button
                type="button"
                class="rounded-xl border border-white/20 bg-white/10 px-6 py-3 text-xs font-bold text-white backdrop-blur-sm transition duration-300 hover:-translate-y-0.5 hover:bg-white/20"
                @click="registerVenue"
              >
                🏟️ Become a Partner
              </button>

            </div>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>