<script setup lang="ts">
import { ref } from 'vue'

import venueImg from '~/assets/images/venuess12.png'

/* =========================================================
   PAGE SEO
========================================================= */

useHead({
  title: 'About Us - CombolojoSPORT',
  meta: [
    {
      name: 'description',
      content:
        'Learn about CombolojoSPORT and how we connect sports players, venues and communities across Ethiopia.',
    },
  ],
})

/* =========================================================
   STATS
========================================================= */

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

/* =========================================================
   ACTIVE TAB
========================================================= */

const activeTab = ref<'players' | 'venues' | 'community'>('players')

/* =========================================================
   ECOSYSTEM TAB CONTENT
========================================================= */

const tabContent = {
  players: {
    title: 'For Athletes & Players',
    desc:
      'Find sports venues, discover games and connect with other players. CombolojoSPORT makes it easier to organize your next match.',
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
      'CombolojoSPORT helps sports communities connect players, organize games and create more opportunities to play.',
    highlights: [
      'Community sports events',
      'Tournament opportunities',
      'Connect players and teams',
      'Build active sports communities',
    ],
  },
}

/* =========================================================
   FEATURES
========================================================= */

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

/* =========================================================
   REVIEWS
========================================================= */

const reviews = [
  {
    name: 'Abebe Tadesse',
    role: 'Football Player',
    comment:
      'Finding a football field for our weekend game is much easier with CombolojoSPORT.',
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

/* =========================================================
   LOCATIONS
========================================================= */

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

/* =========================================================
   NAVIGATION
========================================================= */

function exploreVenues() {
  navigateTo('/venues')
}

function downloadApp() {
  navigateTo('/download-app')
}

function registerVenue() {
  navigateTo('/download-app')
}
</script>

<template>
  <div class="about-page min-h-screen bg-slate-50 text-slate-800">

    <!-- =====================================================
         1. HERO SECTION
         CLEAN IMAGE — NO COLORED SHADOW
    ====================================================== -->

    <section
      class="about-hero relative flex min-h-[540px] items-center overflow-hidden"
    >
      <!-- Background image -->
      <img
        :src="venueImg"
        alt="CombolojoSPORT sports venue"
        class="hero-background absolute inset-0 h-full w-full object-cover object-center"
      />

      <!--
        CLEAN NEUTRAL OVERLAY
        No green shadow
        No emerald gradient
        No colored glow
      -->
      <div class="hero-neutral-overlay absolute inset-0"></div>

      <!-- Content -->
      <div
        class="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-12 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[minmax(0,1fr)_320px] lg:px-10"
      >
        <div class="max-w-3xl">

          <!-- Badge -->
          <div
            class="about-badge inline-flex items-center gap-3 rounded-full border border-emerald-400/40 bg-slate-950/60 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-emerald-300 shadow-lg shadow-black/20 backdrop-blur-md"
          >
            <span class="relative flex h-2.5 w-2.5">
              <span
                class="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"
              ></span>

              <span
                class="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400"
              ></span>
            </span>

            About CombolojoSPORT
          </div>

          <!-- Title -->
          <h1
            class="hero-title mt-6 text-4xl font-black leading-[1.05] tracking-tight text-white drop-shadow-2xl sm:text-5xl lg:text-7xl"
          >
            Connecting
            <span class="text-emerald-400">Players</span>,
            <br />

            Venues &
            <span class="text-lime-300">Communities</span>
          </h1>

          <!-- Description -->
          <p
            class="mt-6 max-w-2xl text-base leading-7 text-slate-200 drop-shadow-lg sm:text-lg"
          >
            CombolojoSPORT is a digital sports platform designed to make
            finding, discovering and enjoying sports venues easier for
            players, teams and communities across Ethiopia.
          </p>

          <!-- Buttons -->
          <div class="mt-8 flex flex-wrap gap-4">

            <!-- Explore -->
            <button
              type="button"
              class="primary-button rounded-xl bg-emerald-600 px-6 py-3.5 font-bold text-white shadow-xl shadow-black/30 transition duration-300 hover:-translate-y-1 hover:bg-emerald-500 hover:shadow-black/40 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-slate-950"
              @click="exploreVenues"
            >
              ⚽ Explore Venues
            </button>

            <!-- Download -->
            <button
              type="button"
              class="secondary-button rounded-xl border border-white/30 bg-white/10 px-6 py-3.5 font-bold text-white shadow-xl shadow-black/30 backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/50"
              @click="downloadApp"
            >
              📱 Download App
            </button>

          </div>

          <!-- Trust information -->
          <div
            class="mt-8 flex flex-wrap items-center gap-x-7 gap-y-3 text-sm text-slate-300"
          >
            <div class="flex items-center gap-2">
              <span class="font-black text-emerald-400">✓</span>
              Easy Booking
            </div>

            <div class="flex items-center gap-2">
              <span class="font-black text-emerald-400">✓</span>
              Sports Communities
            </div>

            <div class="flex items-center gap-2">
              <span class="font-black text-emerald-400">✓</span>
              Growing Across Ethiopia
            </div>
          </div>

        </div>

        <div class="relative mx-auto w-full max-w-[290px]">
          <div class="absolute -inset-6 rounded-full bg-emerald-400/20 blur-3xl"></div>

          <div class="relative rounded-[2.6rem] border-[7px] border-[#020806] bg-[#050b09] p-2 shadow-[0_30px_90px_rgba(0,0,0,0.6)]">
            <div class="absolute left-1/2 top-2 z-20 h-5 w-20 -translate-x-1/2 rounded-full bg-[#183329]"></div>

            <div class="overflow-hidden rounded-[2rem] border border-white/10 bg-[#08130f]">
              <div class="flex items-center justify-between px-4 pb-2 pt-4 text-[9px] font-bold text-white/70">
                <span>9:41</span>
                <span aria-hidden="true">● ▮ ▰</span>
              </div>

              <div class="bg-[#10251b] px-4 py-3 text-white">
                <p class="text-[8px] font-bold uppercase tracking-wider text-lime-400">
                  Book a venue
                </p>
                <p class="mt-1 text-sm font-black">
                  Plan your next game
                </p>
              </div>

              <div class="relative">
                <img
                  :src="venueImg"
                  alt="Sports venue selected for booking"
                  class="h-28 w-full object-cover"
                />
                <span class="absolute bottom-2 left-2 rounded-full border border-white/10 bg-[#050b09]/85 px-2.5 py-1 text-[8px] font-black text-lime-300 backdrop-blur">
                  ★ 4.9 · Addis Ababa
                </span>
              </div>

              <div class="space-y-3 bg-[#08130f] p-3">
                <div class="rounded-xl border border-white/10 bg-[#14291f] p-3">
                  <div class="flex items-center justify-between gap-2">
                    <div>
                      <p class="text-[10px] font-black text-white">
                        Choose a date
                      </p>
                      <p class="mt-1 text-[8px] text-slate-400">
                        Select your game day
                      </p>
                    </div>
                    <span class="text-xs text-lime-300">▦</span>
                  </div>

                  <div class="mt-3 grid grid-cols-4 gap-1.5">
                    <span class="rounded-lg border border-white/10 bg-[#0c1711] py-2 text-center text-[8px] text-slate-300">10</span>
                    <span class="rounded-lg border border-lime-400 bg-lime-400 py-2 text-center text-[8px] font-black text-[#0b1f16]">11</span>
                    <span class="rounded-lg border border-white/10 bg-[#0c1711] py-2 text-center text-[8px] text-slate-300">12</span>
                    <span class="rounded-lg border border-white/10 bg-[#0c1711] py-2 text-center text-[8px] text-slate-300">13</span>
                  </div>
                </div>

                <div>
                  <div class="flex items-center justify-between">
                    <p class="text-[10px] font-black text-white">
                      Available time
                    </p>
                    <span class="text-[8px] text-slate-400">ETB 500 / hour</span>
                  </div>

                  <div class="mt-2 grid grid-cols-2 gap-1.5">
                    <span class="rounded-lg border border-white/10 bg-[#142019] px-2 py-2 text-center text-[8px] text-slate-300">09:00 AM</span>
                    <span class="rounded-lg border border-lime-400 bg-lime-400/10 px-2 py-2 text-center text-[8px] font-bold text-lime-300">10:00 AM</span>
                  </div>
                </div>

                <div class="flex items-center justify-between border-t border-white/10 pt-3">
                  <div>
                    <p class="text-[8px] text-slate-400">Booking total</p>
                    <p class="text-xs font-black text-lime-300">ETB 500</p>
                  </div>
                  <span class="rounded-lg bg-lime-400 px-3 py-2 text-[8px] font-black text-[#0b1f16]">
                    Confirm booking
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Scroll indicator -->
      <div
        class="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-white/60 sm:flex"
      >
        <span>Explore</span>
        <span class="scroll-arrow">↓</span>
      </div>
    </section>

    <!-- =====================================================
         2. STATS
    ====================================================== -->

    <section
      class="relative z-20 border-b border-slate-200 bg-slate-100/90 px-4 py-10 sm:px-6 lg:px-8"
    >
      <div class="mx-auto max-w-7xl">

        <div class="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">

          <div
            v-for="stat in stats"
            :key="stat.id"
            class="stat-card group rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-md transition duration-300 hover:-translate-y-1 hover:border-emerald-300 hover:shadow-xl"
          >

            <!-- Icon -->
            <div
              class="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 shadow-sm transition duration-300 group-hover:scale-110 group-hover:bg-emerald-100"
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

    <!-- =====================================================
         3. ABOUT INTRO
    ====================================================== -->

    <section class="bg-slate-50 px-4 py-16 sm:px-6 lg:px-8">
      <div
        class="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 lg:grid-cols-2"
      >

        <!-- Text -->
        <div class="reveal-section">

          <p
            class="text-xs font-bold uppercase tracking-[0.18em] text-emerald-600"
          >
            About Our Platform
          </p>

          <h2
            class="mt-3 text-3xl font-black leading-tight text-slate-900 sm:text-4xl"
          >
            One platform for your
            <span class="text-emerald-600">sports journey.</span>
          </h2>

          <p class="mt-5 leading-7 text-slate-600">
            Finding the right sports venue should not be difficult.
            CombolojoSPORT brings players and sports facilities together
            through an easy-to-use digital platform.
          </p>

          <p class="mt-4 leading-7 text-slate-600">
            Whether you are looking for a football field for your team,
            a basketball court with your friends, or a venue for a community
            event, our goal is to make the process simple and convenient.
          </p>

          <!-- Tags -->
          <div class="mt-7 flex flex-wrap gap-3">

            <div
              class="tag-card rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-md"
            >
              ⚽ Players
            </div>

            <div
              class="tag-card rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-md"
            >
              🏟️ Venues
            </div>

            <div
              class="tag-card rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-md"
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
            class="about-image-wrapper relative overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white p-2 shadow-xl"
          >
            <div class="relative overflow-hidden rounded-[1rem]">

              <img
                :src="venueImg"
                alt="Sports venue"
                loading="lazy"
                class="about-image block h-[340px] w-full object-cover"
              />

              <div
                class="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-transparent"
              ></div>

              <div class="absolute bottom-5 left-5 right-5 text-white">

                <div class="text-lg font-black">
                  Find your place to play.
                </div>

                <div class="mt-1 text-xs text-slate-200">
                  Discover sports venues through CombolojoSPORT.
                </div>

              </div>

            </div>
          </div>

        </div>

      </div>
    </section>

    <!-- =====================================================
         4. MISSION & VISION
    ====================================================== -->

    <section
      class="border-y border-slate-200 bg-white px-4 py-16 sm:px-6 lg:px-8"
    >
      <div class="mx-auto max-w-6xl">

        <div class="mx-auto max-w-2xl text-center">

          <p
            class="text-xs font-bold uppercase tracking-[0.18em] text-emerald-600"
          >
            Our Purpose
          </p>

          <h2
            class="mt-2 text-3xl font-black text-slate-900 sm:text-4xl"
          >
            Our Mission & Vision
          </h2>

          <p class="mt-3 text-sm leading-6 text-slate-500">
            We are building a connected digital sports ecosystem for players,
            venues and communities.
          </p>

        </div>

        <div class="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">

          <!-- Mission -->
          <div
            class="purpose-card group rounded-2xl border border-slate-200 bg-slate-50 p-7 transition duration-300 hover:-translate-y-1 hover:border-emerald-300 hover:shadow-xl"
          >

            <div
              class="flex h-14 w-14 items-center justify-center rounded-xl bg-emerald-100 text-2xl shadow-sm"
            >
              🎯
            </div>

            <h3 class="mt-5 text-xl font-black text-slate-900">
              Our Mission
            </h3>

            <p class="mt-3 text-sm leading-7 text-slate-600">
              To make sports venue discovery and booking easier while
              connecting players, teams, venue partners and communities
              through one accessible digital platform.
            </p>

          </div>

          <!-- Vision -->
          <div
            class="purpose-card group rounded-2xl border border-slate-200 bg-slate-50 p-7 transition duration-300 hover:-translate-y-1 hover:border-lime-300 hover:shadow-xl"
          >

            <div
              class="flex h-14 w-14 items-center justify-center rounded-xl bg-lime-100 text-2xl shadow-sm"
            >
              🚀
            </div>

            <h3 class="mt-5 text-xl font-black text-slate-900">
              Our Vision
            </h3>

            <p class="mt-3 text-sm leading-7 text-slate-600">
              To build a connected sports ecosystem where people can easily
              discover places to play, organize games and grow active sports
              communities across Ethiopia.
            </p>

          </div>

        </div>
      </div>
    </section>

    <!-- =====================================================
         5. FEATURES
    ====================================================== -->

    <section class="bg-slate-50 px-4 py-16 sm:px-6 lg:px-8">
      <div class="mx-auto max-w-7xl">

        <div class="mx-auto max-w-2xl text-center">

          <p
            class="text-xs font-bold uppercase tracking-[0.18em] text-emerald-600"
          >
            What We Offer
          </p>

          <h2
            class="mt-2 text-3xl font-black text-slate-900 sm:text-4xl"
          >
            Everything starts with a game.
          </h2>

          <p class="mt-3 text-sm leading-6 text-slate-500">
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
            class="feature-card group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-emerald-300 hover:shadow-xl"
          >

            <div
              class="feature-icon flex h-13 w-13 items-center justify-center rounded-xl bg-emerald-50 text-2xl shadow-sm transition duration-300 group-hover:scale-110 group-hover:bg-emerald-100"
            >
              {{ feature.icon }}
            </div>

            <h3 class="mt-5 text-lg font-black text-slate-900">
              {{ feature.title }}
            </h3>

            <p class="mt-2 text-xs leading-6 text-slate-500">
              {{ feature.desc }}
            </p>

            <div
              class="mt-5 h-1 w-8 rounded-full bg-emerald-500 transition-all duration-300 group-hover:w-16"
            ></div>

          </div>

        </div>
      </div>
    </section>

    <!-- =====================================================
         6. ECOSYSTEM TABS
    ====================================================== -->

    <section
      class="border-y border-slate-200 bg-white px-4 py-16 sm:px-6 lg:px-8"
    >
      <div class="mx-auto max-w-6xl">

        <div class="mx-auto max-w-2xl text-center">

          <p
            class="text-xs font-bold uppercase tracking-[0.18em] text-emerald-600"
          >
            Our Ecosystem
          </p>

          <h2
            class="mt-2 text-3xl font-black text-slate-900 sm:text-4xl"
          >
            Built for everyone who loves sports
          </h2>

          <p class="mt-3 text-sm leading-6 text-slate-500">
            Players, venue owners and sports communities all have a place
            on CombolojoSPORT.
          </p>

        </div>

        <!-- Tabs -->
        <div
          class="mt-9 flex justify-center gap-2 overflow-x-auto pb-2"
        >

          <button
            type="button"
            class="ecosystem-tab whitespace-nowrap rounded-xl px-5 py-3 text-xs font-bold transition"
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
            class="ecosystem-tab whitespace-nowrap rounded-xl px-5 py-3 text-xs font-bold transition"
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
            class="ecosystem-tab whitespace-nowrap rounded-xl px-5 py-3 text-xs font-bold transition"
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
          class="mt-10 grid grid-cols-1 items-center gap-12 lg:grid-cols-2"
        >

          <!-- Content -->
          <div>

            <div
              class="inline-flex rounded-lg bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700"
            >
              CombolojoSPORT
            </div>

            <h3
              class="mt-4 text-2xl font-black text-slate-900 sm:text-3xl"
            >
              {{ tabContent[activeTab].title }}
            </h3>

            <p class="mt-4 text-sm leading-7 text-slate-600">
              {{ tabContent[activeTab].desc }}
            </p>

            <ul class="mt-7 space-y-3">

              <li
                v-for="(point, index) in tabContent[activeTab].highlights"
                :key="index"
                class="flex items-center gap-3"
              >

                <span
                  class="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-xs font-black text-emerald-700"
                >
                  ✓
                </span>

                <span class="text-sm font-semibold text-slate-700">
                  {{ point }}
                </span>

              </li>

            </ul>

          </div>

          <!-- Image -->
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
                  alt="CombolojoSPORT venue"
                  loading="lazy"
                  class="ecosystem-image block h-[320px] w-full object-cover"
                />

                <div
                  class="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-transparent"
                ></div>

                <div
                  class="absolute bottom-4 left-4 right-4 rounded-xl border border-white/20 bg-slate-950/70 p-4 text-white shadow-xl backdrop-blur-md"
                >

                  <div class="flex items-center gap-3">

                    <div
                      class="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-600 text-lg shadow-lg shadow-emerald-950/30"
                    >
                      ⚡
                    </div>

                    <div>

                      <div class="text-sm font-bold">
                        Fast & Simple
                      </div>

                      <div class="mt-0.5 text-[11px] text-slate-300">
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

    <!-- =====================================================
         7. WEBSITE + MOBILE APP
    ====================================================== -->

    <section class="bg-slate-50 px-4 py-16 sm:px-6 lg:px-8">
      <div class="mx-auto max-w-7xl">

        <div class="mx-auto max-w-2xl text-center">

          <p
            class="text-xs font-bold uppercase tracking-[0.18em] text-emerald-600"
          >
            Website + Mobile App
          </p>

          <h2
            class="mt-2 text-3xl font-black text-slate-900 sm:text-4xl"
          >
            Discover on the web. Book on mobile.
          </h2>

          <p class="mt-3 text-sm leading-7 text-slate-500">
            CombolojoSPORT gives you a simple experience across the website
            and mobile application.
          </p>

        </div>

        <div class="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">

          <!-- Website -->
          <div
            class="platform-card rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
          >

            <div
              class="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-900 text-2xl shadow-lg"
            >
              🌐
            </div>

            <h3 class="mt-5 text-xl font-black text-slate-900">
              CombolojoSPORT Website
            </h3>

            <p class="mt-3 text-sm leading-7 text-slate-600">
              Use the website to discover sports venues, explore events,
              learn about the platform and find sports opportunities.
            </p>

            <ul class="mt-5 space-y-3">

              <li class="flex gap-3 text-sm text-slate-600">
                <span class="text-emerald-600">✓</span>
                Explore sports venues
              </li>

              <li class="flex gap-3 text-sm text-slate-600">
                <span class="text-emerald-600">✓</span>
                Discover events
              </li>

              <li class="flex gap-3 text-sm text-slate-600">
                <span class="text-emerald-600">✓</span>
                Find sports activities
              </li>

            </ul>

            <button
              type="button"
              class="mt-7 rounded-xl bg-slate-900 px-5 py-3 text-xs font-bold text-white transition hover:bg-slate-800"
              @click="exploreVenues"
            >
              Explore Venues →
            </button>

          </div>

          <!-- Mobile -->
          <div
            class="platform-card rounded-3xl border border-emerald-200 bg-emerald-50 p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
          >

            <div
              class="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-600 text-2xl text-white shadow-lg shadow-emerald-600/20"
            >
              📱
            </div>

            <h3 class="mt-5 text-xl font-black text-slate-900">
              CombolojoSPORT Mobile App
            </h3>

            <p class="mt-3 text-sm leading-7 text-slate-600">
              The mobile app is designed for booking sports venues,
              selecting available time slots and managing your sports
              activities.
            </p>

            <ul class="mt-5 space-y-3">

              <li class="flex gap-3 text-sm text-slate-600">
                <span class="font-bold text-emerald-600">✓</span>
                Book sports venues
              </li>

              <li class="flex gap-3 text-sm text-slate-600">
                <span class="font-bold text-emerald-600">✓</span>
                Select available slots
              </li>

              <li class="flex gap-3 text-sm text-slate-600">
                <span class="font-bold text-emerald-600">✓</span>
                Manage your bookings
              </li>

            </ul>

            <button
              type="button"
              class="mt-7 rounded-xl bg-emerald-600 px-5 py-3 text-xs font-bold text-white shadow-lg shadow-emerald-600/20 transition hover:-translate-y-0.5 hover:bg-emerald-500"
              @click="downloadApp"
            >
              Download App →
            </button>

          </div>

        </div>
      </div>
    </section>

    <!-- =====================================================
         8. POPULAR SPORTS HUBS
    ====================================================== -->

    <section class="bg-white px-4 py-16 sm:px-6 lg:px-8">
      <div class="mx-auto max-w-6xl">

        <div class="text-center">

          <p
            class="text-xs font-bold uppercase tracking-[0.18em] text-emerald-600"
          >
            Explore Locations
          </p>

          <h2
            class="mt-2 text-3xl font-black text-slate-900 sm:text-4xl"
          >
            Popular Sports Hubs
          </h2>

          <p class="mt-3 text-sm text-slate-500">
            Explore sports opportunities in different locations.
          </p>

        </div>

        <div
          class="mt-9 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5"
        >

          <NuxtLink
            v-for="city in subCities"
            :key="city"
            to="/venues"
            class="location-card group rounded-xl border border-slate-200 bg-white p-4 text-center shadow-sm transition duration-300 hover:-translate-y-1 hover:border-emerald-400 hover:shadow-lg"
          >

            <div
              class="mx-auto flex h-11 w-11 items-center justify-center rounded-lg bg-emerald-50 text-lg transition group-hover:bg-emerald-100"
            >
              📍
            </div>

            <div
              class="mt-3 text-xs font-bold text-slate-700 group-hover:text-emerald-700"
            >
              {{ city }}
            </div>

            <div
              class="mt-1 text-[10px] font-semibold text-slate-400 opacity-0 transition group-hover:opacity-100"
            >
              Explore venues →
            </div>

          </NuxtLink>

        </div>
      </div>
    </section>

    <!-- =====================================================
         9. TESTIMONIALS
    ====================================================== -->

    <section class="bg-slate-50 px-4 py-16 sm:px-6 lg:px-8">
      <div class="mx-auto max-w-6xl">

        <div class="mx-auto max-w-2xl text-center">

          <p
            class="text-xs font-bold uppercase tracking-[0.18em] text-emerald-600"
          >
            Community Voices
          </p>

          <h2
            class="mt-2 text-3xl font-black text-slate-900 sm:text-4xl"
          >
            Loved by Players & Venue Partners
          </h2>

          <p class="mt-3 text-sm text-slate-500">
            See how CombolojoSPORT can make sports activities easier.
          </p>

        </div>

        <div class="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">

          <div
            v-for="(review, index) in reviews"
            :key="index"
            class="review-card rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-xl"
          >

            <!-- Quote -->
            <div class="text-4xl font-black leading-none text-emerald-500">
              “
            </div>

            <p class="mt-2 text-sm leading-7 italic text-slate-600">
              {{ review.comment }}
            </p>

            <div
              class="mt-6 flex items-center gap-3 border-t border-slate-200 pt-4"
            >

              <div
                class="flex h-11 w-11 items-center justify-center rounded-full bg-emerald-50 text-xl shadow-sm"
              >
                {{ review.avatar }}
              </div>

              <div>

                <div class="text-xs font-bold text-slate-900">
                  {{ review.name }}
                </div>

                <div
                  class="mt-1 text-[10px] font-bold uppercase tracking-wider text-emerald-600"
                >
                  {{ review.role }}
                </div>

              </div>

            </div>

          </div>

        </div>
      </div>
    </section>

    <!-- =====================================================
         10. FINAL CTA
    ====================================================== -->

    <section class="px-4 py-16 sm:px-6 lg:px-8">
      <div class="mx-auto max-w-7xl">

        <div
          class="cta-section relative overflow-hidden rounded-[2rem] bg-[#a8ff3e] px-6 py-16 text-[#0b1f16] shadow-2xl shadow-emerald-950/15 sm:px-10 lg:px-16"
        >

          <!-- Background -->
          <div
            class="absolute inset-0 bg-gradient-to-br from-[#a8ff3e] via-[#a8ff3e] to-[#96ee2b]"
          ></div>

          <!-- Glow -->
          <div
            class="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/20 blur-3xl"
          ></div>

          <div
            class="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-emerald-900/10 blur-3xl"
          ></div>

          <!-- Decorative circle -->
          <div
            class="absolute -right-5 -top-20 hidden h-60 w-60 rounded-full border-2 border-emerald-950/20 lg:block"
          ></div>

          <div
            class="absolute -bottom-24 right-8 hidden h-72 w-72 rounded-full border-2 border-emerald-950/20 lg:block"
          ></div>

          <!-- Content -->
          <div class="relative z-10 text-center">

            <p
              class="text-xs font-black uppercase tracking-[0.2em] text-emerald-950/75"
            >
              Ready to play?
            </p>

            <h2
              class="mt-3 text-3xl font-black uppercase text-[#0b1f16] sm:text-4xl lg:text-5xl"
            >
              Your next game is waiting.
            </h2>

            <p
              class="mx-auto mt-4 max-w-xl text-sm leading-7 text-emerald-950/80"
            >
              Find a venue, discover a game and start your next sports
              experience with CombolojoSPORT.
            </p>

            <div class="mt-8 flex flex-wrap justify-center gap-4">

              <!-- Explore -->
              <button
                type="button"
                class="rounded-xl bg-[#0b1f16] px-7 py-3.5 text-sm font-black text-[#a8ff3e] shadow-xl shadow-emerald-950/20 transition duration-300 hover:-translate-y-1 hover:bg-[#173324]"
                @click="exploreVenues"
              >
                ⚽ Explore Venues
              </button>

              <!-- App -->
              <button
                type="button"
                class="rounded-xl border border-white/80 bg-white px-7 py-3.5 text-sm font-black text-[#0b1f16] shadow-lg shadow-emerald-950/10 transition duration-300 hover:-translate-y-1 hover:bg-slate-50"
                @click="registerVenue"
              >
                📱 Download App
              </button>

            </div>

          </div>
        </div>
      </div>
    </section>

  </div>
</template>

<style scoped>

/* =========================================================
   ABOUT PAGE CUSTOM CSS
========================================================= */

.about-page {
  overflow-x: hidden;
}

/* =========================================================
   HERO
========================================================= */

.about-hero {
  isolation: isolate;
}

/*
  CLEAN HERO IMAGE

  The previous colored green/emerald shadows
  have been removed.
*/

.hero-background {
  object-position: center center;
  transform: scale(1.01);
  filter: saturate(1.02) contrast(1.02);
  transition:
    transform 0.8s ease,
    filter 0.5s ease;
}

/*
  Neutral overlay only.

  No green shadow.
  No emerald gradient.
  No colored glow.

  This keeps the image visible while
  making the white text readable.
*/

.hero-neutral-overlay {
  background: rgba(0, 0, 0, 0.30);
}

/* Hero content stays above image */

.hero-title {
  animation: heroTitleIn 0.8s ease-out both;
}

.about-badge {
  animation: heroBadgeIn 0.7s ease-out both;
}

/* =========================================================
   HERO ANIMATIONS
========================================================= */

@keyframes heroTitleIn {
  from {
    opacity: 0;
    transform: translateY(24px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes heroBadgeIn {
  from {
    opacity: 0;
    transform: translateY(15px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* =========================================================
   SCROLL INDICATOR
========================================================= */

.scroll-arrow {
  animation: scrollArrow 1.5s ease-in-out infinite;
}

@keyframes scrollArrow {
  0%,
  100% {
    transform: translateY(0);
    opacity: 0.5;
  }

  50% {
    transform: translateY(6px);
    opacity: 1;
  }
}

/* =========================================================
   CARDS
========================================================= */

.stat-card,
.feature-card,
.purpose-card,
.platform-card,
.review-card,
.location-card,
.tag-card {
  will-change: transform;
}

/* =========================================================
   IMAGE EFFECTS
========================================================= */

.about-image-wrapper {
  transform: translateZ(0);
}

.about-image {
  transition:
    transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1),
    filter 0.5s ease;
}

.about-image-wrapper:hover .about-image {
  transform: scale(1.045);
  filter: saturate(1.08);
}

.ecosystem-image {
  transition:
    transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1),
    filter 0.5s ease;
}

.ecosystem-image:hover {
  transform: scale(1.04);
  filter: saturate(1.08);
}

/* =========================================================
   FEATURE ICON
========================================================= */

.feature-icon {
  min-width: 52px;
  min-height: 52px;
}

/* =========================================================
   TAB
========================================================= */

.ecosystem-tab {
  position: relative;
}

.ecosystem-tab:active {
  transform: scale(0.97);
}

/* =========================================================
   BUTTONS
========================================================= */

.primary-button,
.secondary-button {
  position: relative;
  overflow: hidden;
}

.primary-button::after,
.secondary-button::after {
  position: absolute;
  inset: 0;
  content: '';
  background: linear-gradient(
    120deg,
    transparent 20%,
    rgba(255, 255, 255, 0.12) 50%,
    transparent 80%
  );
  transform: translateX(-120%);
  transition: transform 0.6s ease;
}

.primary-button:hover::after,
.secondary-button:hover::after {
  transform: translateX(120%);
}

/* =========================================================
   CTA
========================================================= */

.cta-section {
  isolation: isolate;
}

.cta-section::before {
  position: absolute;
  inset: 0;
  content: '';
  pointer-events: none;

  background:
    radial-gradient(
      circle at 15% 30%,
      rgba(16, 185, 129, 0.08),
      transparent 28%
    ),
    radial-gradient(
      circle at 85% 70%,
      rgba(132, 204, 22, 0.06),
      transparent 25%
    );
}

/* =========================================================
   ACCESSIBILITY
========================================================= */

button:focus-visible,
a:focus-visible {
  outline: 2px solid #10b981;
  outline-offset: 3px;
}

/* =========================================================
   MOBILE
========================================================= */

@media (max-width: 640px) {

  .about-hero {
    min-height: 620px;
  }

  .hero-background {
    object-position: center center;
  }

  .hero-neutral-overlay {
    background: rgba(0, 0, 0, 0.35);
  }

  .hero-title {
    font-size: 2.5rem;
    line-height: 1.08;
  }

  .about-badge {
    font-size: 9px;
    letter-spacing: 0.13em;
  }

  .stat-card {
    padding: 1rem;
  }

  .stat-card .text-2xl {
    font-size: 1.5rem;
  }

  .about-image {
    height: 280px;
  }

  .ecosystem-image {
    height: 280px;
  }
}

/* =========================================================
   TABLET
========================================================= */

@media (min-width: 641px) and (max-width: 1024px) {

  .about-hero {
    min-height: 580px;
  }

  .hero-title {
    font-size: 3.6rem;
  }

  .hero-background {
    object-position: center center;
  }
}

/* =========================================================
   REDUCED MOTION
========================================================= */

@media (prefers-reduced-motion: reduce) {

  *,
  *::before,
  *::after {
    scroll-behavior: auto !important;
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

</style>