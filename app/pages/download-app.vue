<script setup lang="ts">
import venuePreviewImage from '~/assets/images/venues7.jpg'

const router = useRouter()

/* =========================================================
   NAVIGATION
========================================================= */

function goBack() {
  router.back()
}

function goHome() {
  router.push('/')
}

function goToVenues() {
  router.push('/venues')
}

function goToEvents() {
  router.push('/events')
}

/* =========================================================
   APP DOWNLOAD - REAL URLS
========================================================= */

// ✅ Direct APK download from server
const APK_URL = 'https://combolojo.etsgood.com/combolojo.apk'
const APK_VERSION = '1.0.5'
const APK_SIZE = '66.1 MB'
const APK_BUILD_DATE = 'October 2, 2026'

function downloadAndroid() {
  window.open(APK_URL, '_blank', 'noopener,noreferrer')
}

function downloadIOS() {
  window.open(
    'https://apps.apple.com/app/combolojo',
    '_blank',
    'noopener,noreferrer'
  )
}

// ✅ Copy APK link
async function copyApkLink() {
  try {
    await navigator.clipboard.writeText(APK_URL)
    alert('APK link copied to clipboard!')
  } catch (e) {
    alert('Could not copy link')
  }
}

/* =========================================================
   BOOKING STEPS
========================================================= */

const steps = [
  {
    number: '01',
    icon: '📱',
    title: 'Download App',
    description: 'Install CombolojoSPORT on your phone.'
  },
  {
    number: '02',
    icon: '📍',
    title: 'Find Venue',
    description: 'Discover football, futsal, basketball venues near you.'
  },
  {
    number: '03',
    icon: '📅',
    title: 'Choose Slot',
    description: 'Select your preferred booking date and time slot.'
  },
  {
    number: '04',
    icon: '✓',
    title: 'Confirm Booking',
    description: 'Review and confirm directly from the mobile app.'
  }
]

/* =========================================================
   FEATURES
========================================================= */

const features = [
  {
    icon: '⚡',
    title: 'Fast Booking',
    description: 'Find venues and book your preferred time quickly.'
  },
  {
    icon: '📍',
    title: 'Nearby Venues',
    description: 'Discover sports fields based on your location.'
  },
  {
    icon: '📅',
    title: 'Easy Scheduling',
    description: 'Choose date and available time slot from the app.'
  },
  {
    icon: '🔔',
    title: 'Booking Updates',
    description: 'Receive important updates about your bookings.'
  },
  {
    icon: '⚽',
    title: 'JustPlay',
    description: 'Discover games and connect with other players.'
  },
  {
    icon: '🔒',
    title: 'Secure',
    description: 'Manage your sports activities securely.'
  }
]

/* =========================================================
   TRUST BADGES
========================================================= */

const trustBadges = [
  { icon: '🛡️', label: 'Virus-Free' },
  { icon: '✅', label: 'Safe Download' },
  { icon: '🔒', label: 'SSL Secured' },
  { icon: '⚡', label: 'Fast Install' }
]

useHead({
  title: 'Download App | CombolojoSPORT',
  meta: [
    {
      name: 'description',
      content:
        'Download the CombolojoSPORT mobile app and book sports venues, join games and manage your sports activities.'
    }
  ]
})
</script>

<template>
  <div class="min-h-screen bg-[#f5f7f4] text-slate-900 overflow-hidden">

    <!-- =====================================================
         HEADER
    ====================================================== -->
    <header class="sticky top-0 z-50 border-b border-emerald-900/40 bg-[#022c22] shadow-lg">
      <div class="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 py-3.5">

        <!-- LOGO -->
        <button type="button" @click="goHome" class="group flex items-center gap-3">
          <div class="flex h-11 w-11 items-center justify-center rounded-xl bg-lime-400 text-xl shadow-lg shadow-lime-900/20 transition group-hover:scale-105">
            ⚽
          </div>
          <div class="text-left">
            <div class="text-lg font-black leading-none tracking-tight">
              <span class="text-lime-400">COMBO</span>
              <span class="text-white">LOJO</span>
              <span class="text-lime-400">SPORT</span>
            </div>
            <p class="mt-1 text-[8px] font-bold uppercase tracking-[0.25em] text-emerald-200/70">
              Sports Platform
            </p>
          </div>
        </button>

        <!-- BACK -->
        <button type="button" @click="goBack" class="group flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm font-bold text-white transition hover:border-lime-400 hover:bg-lime-400 hover:text-[#022c22]">
          <span class="text-lg transition-transform group-hover:-translate-x-1">←</span>
          <span class="hidden sm:inline">Back</span>
        </button>
      </div>
    </header>

    <!-- =====================================================
         HERO
    ====================================================== -->
    <section class="relative overflow-hidden bg-[#064e3b]">

      <!-- FIELD BACKGROUND -->
      <div class="absolute inset-0 pointer-events-none">
        <div class="absolute inset-0 opacity-20">
          <div class="grid h-full grid-cols-6">
            <div class="bg-[#022c22]"></div>
            <div></div>
            <div class="bg-[#022c22]"></div>
            <div></div>
            <div class="bg-[#022c22]"></div>
            <div></div>
          </div>
        </div>

        <div class="absolute left-1/2 top-1/2 h-[350px] w-[720px] max-w-[90vw] -translate-x-1/2 -translate-y-1/2 rounded-xl border-2 border-white/10"></div>
        <div class="absolute left-1/2 top-1/2 h-[350px] w-px -translate-x-1/2 -translate-y-1/2 bg-white/10"></div>
        <div class="absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white/10"></div>
        <div class="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/20"></div>
      </div>

      <!-- HERO CONTENT -->
      <div class="relative z-10 mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-24">
        <div class="mx-auto max-w-4xl text-center lg:mx-0 lg:text-left">

          <!-- BADGE -->
          <div class="mx-auto inline-flex items-center gap-2 rounded-full border border-lime-300/30 bg-lime-300/10 px-4 py-2 lg:mx-0">
            <span class="h-2 w-2 rounded-full bg-lime-300 animate-pulse"></span>
            <span class="text-[10px] font-black uppercase tracking-[0.25em] text-lime-200 sm:text-xs">
              Official Mobile App
            </span>
          </div>

          <!-- TITLE -->
          <h1 class="mt-6 text-4xl font-black leading-tight text-white sm:text-5xl lg:text-7xl">
            Your Sports Experience
            <span class="block text-lime-300">Starts in the App</span>
          </h1>

          <!-- DESCRIPTION -->
          <p class="mx-auto mt-6 max-w-2xl text-sm leading-7 text-emerald-50/75 sm:text-base lg:mx-0">
            Download the CombolojoSPORT mobile app to book sports venues,
            choose available time slots, join games and manage your
            sports activities from your phone.
          </p>

          <!-- ✅ VERSION INFO -->
          <div class="mx-auto mt-6 flex flex-wrap items-center justify-center gap-3 text-xs lg:mx-0 lg:justify-start">
            <div class="flex items-center gap-2 rounded-lg border border-lime-300/20 bg-lime-300/5 px-3 py-1.5">
              <span class="text-lime-300">📦</span>
              <span class="text-lime-100">v{{ APK_VERSION }}</span>
            </div>
            <div class="flex items-center gap-2 rounded-lg border border-lime-300/20 bg-lime-300/5 px-3 py-1.5">
              <span class="text-lime-300">💾</span>
              <span class="text-lime-100">{{ APK_SIZE }}</span>
            </div>
            <div class="flex items-center gap-2 rounded-lg border border-lime-300/20 bg-lime-300/5 px-3 py-1.5">
              <span class="text-lime-300">📅</span>
              <span class="text-lime-100">{{ APK_BUILD_DATE }}</span>
            </div>
          </div>

          <!-- HERO BUTTONS -->
          <div class="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start">

            <!-- ✅ ANDROID - Real Google Play Icon -->
            <button type="button" @click="downloadAndroid" class="group flex w-full items-center justify-center gap-3 rounded-xl bg-lime-400 px-7 py-4 text-sm font-black text-[#022c22] shadow-xl shadow-black/10 transition hover:-translate-y-1 hover:bg-lime-300 sm:w-auto">
              <!-- Google Play Icon SVG -->
              <svg class="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 0 1 0 1.73l-2.808 1.626L15.092 12l2.606-2.491zM5.864 2.658L16.802 8.99l-2.303 2.303-8.635-8.635z"/>
              </svg>
              <span>Download for Android</span>
            </button>

            <!-- ✅ iOS - Real Apple Icon -->
            <button type="button" @click="downloadIOS" class="group flex w-full items-center justify-center gap-3 rounded-xl border border-white/20 bg-white/10 px-7 py-4 text-sm font-black text-white backdrop-blur transition hover:-translate-y-1 hover:bg-white hover:text-[#022c22] sm:w-auto">
              <!-- Apple Logo SVG -->
              <svg class="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
              </svg>
              <span>Download for iPhone</span>
            </button>
          </div>

          <!-- ✅ TRUST BADGES -->
          <div class="mt-8 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
            <div v-for="badge in trustBadges" :key="badge.label" class="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-emerald-100/60">
              <span>{{ badge.icon }}</span>
              <span>{{ badge.label }}</span>
            </div>
          </div>

          <!-- SMALL INFO -->
          <p class="mt-5 text-center text-[10px] font-bold uppercase tracking-widest text-emerald-100/50 lg:text-left">
            Play · Book · Connect
          </p>

        </div>

        <div class="relative mx-auto flex w-full max-w-[420px] items-end justify-center gap-2 px-1 pb-3 sm:gap-3 lg:max-w-none">
          <div class="absolute inset-x-8 bottom-8 top-8 rounded-full bg-lime-400/15 blur-3xl"></div>
          <div class="absolute right-2 top-10 h-24 w-24 rounded-full border border-lime-300/20 sm:right-6"></div>
          <div class="absolute bottom-10 left-1 h-16 w-16 rounded-full border border-white/10 sm:left-5"></div>

          <div class="relative z-10 w-[min(40vw,180px)] shrink-0 rotate-0 rounded-[2.6rem] border-[7px] border-[#020806] bg-[#050b09] p-2 shadow-[0_30px_90px_rgba(0,0,0,0.55)] transition-transform duration-500 hover:-translate-y-1">
            <div class="absolute left-1/2 top-2 z-20 h-5 w-20 -translate-x-1/2 rounded-full bg-[#183329]"></div>
            <div class="overflow-hidden rounded-[2rem] border border-white/10 bg-[#08130f]">
              <div class="flex items-center justify-between px-3 pb-2 pt-4 text-[8px] font-bold text-white/70">
                <span>9:41</span>
                <span aria-hidden="true">● ▮ ▰</span>
              </div>
              <div class="flex items-center justify-between bg-[#10251b] px-3 py-3 text-white">
                <div>
                  <p class="text-[7px] font-bold uppercase tracking-wider text-lime-400">CombolojoSPORT</p>
                  <p class="mt-1 text-xs font-black">Find your next game</p>
                </div>
                <span class="flex h-8 w-8 items-center justify-center rounded-full bg-lime-400 text-sm text-[#0b1f16]">⚽</span>
              </div>
              <div class="relative">
                <img
                  :src="venuePreviewImage"
                  alt="Football venue shown in the CombolojoSPORT app"
                  class="h-36 w-full object-cover"
                />
                <span class="absolute bottom-2 left-2 rounded-full border border-white/10 bg-[#050b09]/85 px-2 py-1 text-[7px] font-black uppercase tracking-wider text-lime-300 backdrop-blur">
                  Nearby venue
                </span>
              </div>
              <div class="bg-[#08130f] p-2">
                <div class="rounded-xl border border-white/10 bg-[#14291f] p-2">
                  <div class="flex items-start justify-between gap-1">
                    <div>
                      <p class="text-[9px] font-black text-white">National Stadium</p>
                      <p class="mt-1 text-[7px] text-slate-400">Addis Ababa · Bole</p>
                    </div>
                    <span class="text-[9px] font-black text-lime-300">★ 4.9</span>
                  </div>
                  <div class="mt-3 flex items-center justify-between border-t border-white/10 pt-2">
                    <span class="text-[8px] font-bold text-lime-300">ETB 500 / hour</span>
                    <span class="rounded-lg bg-lime-400 px-2 py-1.5 text-[7px] font-black text-[#0b1f16]">Book now</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="relative z-10 w-[min(32vw,160px)] shrink-0 rotate-0 rounded-[2.6rem] border-[7px] border-[#020806] bg-[#050b09] p-1.5 shadow-[0_30px_90px_rgba(0,0,0,0.55)] transition-transform duration-500 hover:-translate-y-1">
            <div class="absolute left-1/2 top-2 z-20 h-4 w-16 -translate-x-1/2 rounded-full bg-[#183329]"></div>
            <div class="overflow-hidden rounded-[2rem] border border-white/10 bg-[#08130f]">
              <div class="flex items-center justify-between px-3 pb-1.5 pt-3 text-[7px] font-bold text-white/70">
                <span>9:41</span>
                <span aria-hidden="true">● ▮ ▰</span>
              </div>
              <div class="bg-[#10251b] px-2.5 py-2.5 text-white">
                <p class="text-[6px] font-bold uppercase tracking-wider text-lime-400">BOOK A VENUE</p>
                <p class="mt-1 text-[10px] font-black">Choose a time</p>
              </div>
              <div class="space-y-2 bg-[#08130f] p-2">
                <div class="rounded-lg border border-white/10 bg-[#14291f] p-1.5">
                  <p class="text-[6px] font-bold text-slate-400">SELECTED VENUE</p>
                  <p class="mt-1 text-[8px] font-black leading-tight text-white">National Stadium</p>
                  <p class="mt-1 text-[6px] text-slate-400">Addis Ababa · Bole</p>
                </div>
                <div>
                  <div class="flex items-center justify-between">
                    <p class="text-[7px] font-black text-white">Choose date</p>
                    <span class="text-[6px] text-lime-300">October 2026</span>
                  </div>
                  <div class="mt-1 grid grid-cols-4 gap-1">
                    <span class="rounded-md border border-white/10 bg-[#142019] py-1 text-center text-[6px] text-slate-300">10</span>
                    <span class="rounded-md border border-lime-400 bg-lime-400 py-1 text-center text-[6px] font-black text-[#0b1f16]">11</span>
                    <span class="rounded-md border border-white/10 bg-[#142019] py-1 text-center text-[6px] text-slate-300">12</span>
                    <span class="rounded-md border border-white/10 bg-[#142019] py-1 text-center text-[6px] text-slate-300">13</span>
                  </div>
                </div>
                <div>
                  <p class="text-[7px] font-black text-white">Available slots</p>
                  <div class="mt-1 grid grid-cols-2 gap-1">
                    <span class="rounded-md border border-white/10 bg-[#142019] px-0.5 py-1 text-center text-[6px] text-slate-300">09:00 AM</span>
                    <span class="rounded-md border border-lime-400 bg-lime-400/10 px-0.5 py-1 text-center text-[6px] font-bold text-lime-300">10:00 AM</span>
                    <span class="rounded-md border border-white/10 bg-[#142019] px-0.5 py-1 text-center text-[6px] text-slate-300">11:00 AM</span>
                    <span class="rounded-md border border-white/10 bg-[#142019] px-0.5 py-1 text-center text-[6px] text-slate-300">12:00 PM</span>
                  </div>
                </div>
                <div class="flex items-center justify-between border-t border-white/10 pt-1.5">
                  <div>
                    <p class="text-[6px] text-slate-400">Total</p>
                    <p class="text-[8px] font-black text-lime-300">ETB 500</p>
                  </div>
                  <span class="rounded-md bg-lime-400 px-1.5 py-1 text-[6px] font-black text-[#0b1f16]">Confirm</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- =====================================================
         PLATFORM DOWNLOAD SECTION
    ====================================================== -->
    <main class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 sm:py-16">

      <!-- TITLE -->
      <div class="mx-auto max-w-2xl text-center">
        <p class="text-xs font-black uppercase tracking-[0.25em] text-emerald-700">
          Get Started
        </p>
        <h2 class="mt-2 text-3xl font-black text-slate-900 sm:text-4xl">
          Download the App
        </h2>
        <p class="mt-3 text-sm leading-6 text-slate-500">
          Choose your mobile platform and continue your sports experience with CombolojoSPORT.
        </p>
      </div>

      <!-- DOWNLOAD CARDS -->
      <div class="mx-auto mt-10 grid max-w-5xl gap-6 lg:grid-cols-2">

        <!-- =================================================
             ANDROID CARD
        ================================================== -->
        <div class="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-emerald-300 hover:shadow-2xl sm:p-8">
          <div class="absolute left-0 right-0 top-0 h-1.5 bg-lime-400"></div>

          <div class="flex items-start justify-between gap-4">
            <div class="flex items-center gap-4">
              <!-- ✅ Google Play Icon -->
              <div class="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700 transition group-hover:bg-lime-100">
                <svg class="h-8 w-8" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 0 1 0 1.73l-2.808 1.626L15.092 12l2.606-2.491zM5.864 2.658L16.802 8.99l-2.303 2.303-8.635-8.635z"/>
                </svg>
              </div>

              <div>
                <p class="text-[10px] font-black uppercase tracking-wider text-slate-400">
                  Download for
                </p>
                <h3 class="mt-1 text-2xl font-black text-slate-900">
                  Android
                </h3>
                <p class="mt-1 text-xs text-slate-500">
                  Direct APK Download
                </p>
              </div>
            </div>

            <span class="rounded-full bg-emerald-50 px-3 py-1 text-[10px] font-black text-emerald-700">
              ANDROID
            </span>
          </div>

          <!-- ✅ VERSION INFO -->
          <div class="mt-5 grid grid-cols-3 gap-2 border-t border-slate-100 pt-5">
            <div class="text-center">
              <p class="text-[10px] font-bold uppercase text-slate-400">Version</p>
              <p class="mt-1 text-sm font-black text-slate-800">{{ APK_VERSION }}</p>
            </div>
            <div class="text-center border-x border-slate-100">
              <p class="text-[10px] font-bold uppercase text-slate-400">Size</p>
              <p class="mt-1 text-sm font-black text-slate-800">{{ APK_SIZE }}</p>
            </div>
            <div class="text-center">
              <p class="text-[10px] font-bold uppercase text-slate-400">Updated</p>
              <p class="mt-1 text-sm font-black text-slate-800">Oct 2</p>
            </div>
          </div>

          <!-- FEATURES -->
          <div class="mt-6 space-y-3 border-t border-slate-100 pt-6">
            <div class="flex items-center gap-3 text-sm text-slate-600">
              <span class="text-emerald-600">✓</span>
              Book sports venues
            </div>
            <div class="flex items-center gap-3 text-sm text-slate-600">
              <span class="text-emerald-600">✓</span>
              Choose available time slots
            </div>
            <div class="flex items-center gap-3 text-sm text-slate-600">
              <span class="text-emerald-600">✓</span>
              Join JustPlay games
            </div>
            <div class="flex items-center gap-3 text-sm text-slate-600">
              <span class="text-emerald-600">✓</span>
              Secure login with Google
            </div>
          </div>

          <!-- ✅ BUTTONS - Download + Copy -->
          <div class="mt-7 flex gap-2">
            <button type="button" @click="downloadAndroid" class="flex flex-1 items-center justify-center gap-3 rounded-xl bg-[#022c22] px-6 py-4 text-sm font-black text-lime-300 transition hover:bg-emerald-800">
              <svg class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M5 20h14v-2H5v2zM19 9h-4V3H9v6H5l7 7 7-7z"/>
              </svg>
              <span>Download APK</span>
            </button>

            <!-- ✅ Copy Link Button -->
            <button type="button" @click="copyApkLink" class="flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 text-slate-500 transition hover:border-emerald-300 hover:text-emerald-700" title="Copy APK link">
              <svg class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>
              </svg>
            </button>
          </div>

        </div>

        <!-- =================================================
             iOS CARD
        ================================================== -->
        <div class="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-emerald-300 hover:shadow-2xl sm:p-8">
          <div class="absolute left-0 right-0 top-0 h-1.5 bg-slate-800"></div>

          <div class="flex items-start justify-between gap-4">
            <div class="flex items-center gap-4">
              <!-- ✅ Apple Icon -->
              <div class="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-slate-100 text-slate-800">
                <svg class="h-9 w-9" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                </svg>
              </div>

              <div>
                <p class="text-[10px] font-black uppercase tracking-wider text-slate-400">
                  Download for
                </p>
                <h3 class="mt-1 text-2xl font-black text-slate-900">
                  iPhone / iOS
                </h3>
                <p class="mt-1 text-xs text-slate-500">
                  Apple App Store
                </p>
              </div>
            </div>

            <span class="rounded-full bg-slate-100 px-3 py-1 text-[10px] font-black text-slate-600">
              iOS
            </span>
          </div>

          <!-- ✅ COMING SOON -->
          <div class="mt-5 rounded-xl border border-amber-200 bg-amber-50 p-4">
            <div class="flex items-center gap-3">
              <span class="text-xl">⏳</span>
              <div>
                <p class="text-xs font-black text-amber-900">Coming Soon</p>
                <p class="mt-0.5 text-[10px] text-amber-700">
                  iOS version is currently in development
                </p>
              </div>
            </div>
          </div>

          <!-- FEATURES -->
          <div class="mt-6 space-y-3 border-t border-slate-100 pt-6">
            <div class="flex items-center gap-3 text-sm text-slate-600">
              <span class="text-emerald-600">✓</span>
              Book sports venues
            </div>
            <div class="flex items-center gap-3 text-sm text-slate-600">
              <span class="text-emerald-600">✓</span>
              Manage your bookings
            </div>
            <div class="flex items-center gap-3 text-sm text-slate-600">
              <span class="text-emerald-600">✓</span>
              Receive booking updates
            </div>
            <div class="flex items-center gap-3 text-sm text-slate-600">
              <span class="text-emerald-600">✓</span>
              Secure login with Apple
            </div>
          </div>

          <!-- BUTTON -->
          <button type="button" @click="downloadIOS" disabled class="mt-7 flex w-full items-center justify-center gap-3 rounded-xl bg-slate-200 px-6 py-4 text-sm font-black text-slate-400 cursor-not-allowed">
            <span>Coming Soon on App Store</span>
          </button>

        </div>

      </div>

      <!-- =====================================================
           HOW BOOKING WORKS
      ====================================================== -->
      <section class="mx-auto mt-20 max-w-6xl">
        <div class="mb-8 text-center">
          <p class="text-xs font-black uppercase tracking-[0.25em] text-emerald-700">
            Simple Process
          </p>
          <h2 class="mt-2 text-3xl font-black text-slate-900">
            How Mobile Booking Works
          </h2>
          <p class="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-500">
            Everything you need to book your favorite sports venue is available inside the mobile app.
          </p>
        </div>

        <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div v-for="(step, index) in steps" :key="step.number" class="group relative rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm transition hover:-translate-y-1 hover:border-emerald-200 hover:shadow-xl">
            <div class="absolute right-4 top-4 text-[10px] font-black text-emerald-200">
              {{ step.number }}
            </div>

            <div class="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 text-2xl transition group-hover:bg-lime-100">
              {{ step.icon }}
            </div>

            <h3 class="mt-5 text-base font-black text-slate-900">
              {{ step.title }}
            </h3>

            <p class="mt-2 text-xs leading-5 text-slate-500">
              {{ step.description }}
            </p>
          </div>
        </div>
      </section>

      <!-- =====================================================
           WEBSITE VS MOBILE APP
      ====================================================== -->
      <section class="mx-auto mt-20 max-w-6xl">
        <div class="overflow-hidden rounded-3xl bg-[#022c22] shadow-xl">
          <div class="grid grid-cols-1 lg:grid-cols-2">

            <!-- WEBSITE -->
            <div class="p-8 sm:p-10 lg:border-r lg:border-white/10">
              <div class="flex items-center gap-4">
                <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-xl">
                  🌐
                </div>
                <div>
                  <p class="text-[10px] font-black uppercase tracking-widest text-lime-400">
                    Website
                  </p>
                  <h3 class="text-xl font-black text-white">
                    Discover
                  </h3>
                </div>
              </div>

              <div class="mt-7 space-y-4">
                <div class="flex gap-3 text-sm text-emerald-100/70">
                  <span class="text-lime-400">✓</span>
                  Explore sports venues
                </div>
                <div class="flex gap-3 text-sm text-emerald-100/70">
                  <span class="text-lime-400">✓</span>
                  Discover events
                </div>
                <div class="flex gap-3 text-sm text-emerald-100/70">
                  <span class="text-lime-400">✓</span>
                  Explore JustPlay
                </div>
                <div class="flex gap-3 text-sm text-emerald-100/70">
                  <span class="text-lime-400">✓</span>
                  Read sports content
                </div>
              </div>

              <button type="button" @click="goToVenues" class="mt-8 rounded-xl border border-white/15 px-5 py-3 text-xs font-black uppercase tracking-wider text-white transition hover:border-lime-400 hover:bg-lime-400 hover:text-[#022c22]">
                Explore Venues →
              </button>
            </div>

            <!-- MOBILE APP -->
            <div class="bg-[#064e3b] p-8 sm:p-10">
              <div class="flex items-center gap-4">
                <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-lime-400 text-xl">
                  📱
                </div>
                <div>
                  <p class="text-[10px] font-black uppercase tracking-widest text-lime-300">
                    Mobile App
                  </p>
                  <h3 class="text-xl font-black text-white">
                    Book & Play
                  </h3>
                </div>
              </div>

              <div class="mt-7 space-y-4">
                <div class="flex gap-3 text-sm text-emerald-100/80">
                  <span class="text-lime-300">✓</span>
                  Book sports venues
                </div>
                <div class="flex gap-3 text-sm text-emerald-100/80">
                  <span class="text-lime-300">✓</span>
                  Select available slots
                </div>
                <div class="flex gap-3 text-sm text-emerald-100/80">
                  <span class="text-lime-300">✓</span>
                  Manage bookings
                </div>
                <div class="flex gap-3 text-sm text-emerald-100/80">
                  <span class="text-lime-300">✓</span>
                  Join JustPlay games
                </div>
              </div>

              <button type="button" @click="downloadAndroid" class="mt-8 rounded-xl bg-lime-400 px-5 py-3 text-xs font-black uppercase tracking-wider text-[#022c22] transition hover:bg-lime-300">
                Download App →
              </button>
            </div>

          </div>
        </div>
      </section>

      <!-- =====================================================
           FEATURES
      ====================================================== -->
      <section class="mx-auto mt-20 max-w-6xl">
        <div class="text-center">
          <p class="text-xs font-black uppercase tracking-[0.25em] text-emerald-700">
            App Features
          </p>
          <h2 class="mt-2 text-3xl font-black text-slate-900">
            Everything in One App
          </h2>
        </div>

        <div class="mt-9 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <div v-for="feature in features" :key="feature.title" class="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-emerald-200 hover:shadow-lg">
            <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-xl transition group-hover:bg-lime-100">
              {{ feature.icon }}
            </div>
            <h3 class="mt-5 font-black text-slate-900">
              {{ feature.title }}
            </h3>
            <p class="mt-2 text-xs leading-5 text-slate-500">
              {{ feature.description }}
            </p>
          </div>
        </div>
      </section>

      <!-- =====================================================
           FINAL CTA
      ====================================================== -->
      <section class="mx-auto mt-20 max-w-6xl">
        <div class="relative overflow-hidden rounded-3xl bg-lime-400 px-6 py-12 text-center sm:px-10 sm:py-14">
          <div class="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full border-2 border-[#022c22]/10"></div>
          <div class="pointer-events-none absolute -bottom-28 -left-20 h-72 w-72 rounded-full border-2 border-[#022c22]/10"></div>

          <div class="relative z-10">
            <p class="text-xs font-black uppercase tracking-[0.25em] text-emerald-900/70">
              Ready to play?
            </p>

            <h2 class="mt-3 text-3xl font-black text-[#022c22] sm:text-5xl">
              Download. Book. Play.
            </h2>

            <p class="mx-auto mt-4 max-w-2xl text-sm leading-6 text-emerald-950/70">
              Get the CombolojoSPORT mobile app and take your sports experience with you wherever you go.
            </p>

            <div class="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <button type="button" @click="downloadAndroid" class="flex items-center justify-center gap-2 rounded-xl bg-[#022c22] px-7 py-4 text-xs font-black uppercase tracking-wider text-lime-300 transition hover:bg-emerald-800">
                <svg class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M5 20h14v-2H5v2zM19 9h-4V3H9v6H5l7 7 7-7z"/>
                </svg>
                Android App
              </button>

              <button type="button" @click="downloadIOS" class="rounded-xl bg-white px-7 py-4 text-xs font-black uppercase tracking-wider text-[#022c22] transition hover:bg-slate-50">
                iPhone App →
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- =====================================================
           BOTTOM NAVIGATION
      ====================================================== -->
      <div class="mt-14 flex flex-col items-center justify-center gap-4 sm:flex-row">
        <button type="button" @click="goHome" class="rounded-xl border border-slate-200 bg-white px-5 py-3 text-xs font-black uppercase tracking-wider text-slate-600 transition hover:border-emerald-300 hover:text-emerald-700">
          ← Home
        </button>
        <button type="button" @click="goToVenues" class="rounded-xl border border-slate-200 bg-white px-5 py-3 text-xs font-black uppercase tracking-wider text-slate-600 transition hover:border-emerald-300 hover:text-emerald-700">
          Explore Venues
        </button>
        <button type="button" @click="goToEvents" class="rounded-xl border border-slate-200 bg-white px-5 py-3 text-xs font-black uppercase tracking-wider text-slate-600 transition hover:border-emerald-300 hover:text-emerald-700">
          Events
        </button>
      </div>

    </main>

    <!-- =====================================================
         FOOTER
    ====================================================== -->
    <footer class="border-t border-slate-200 bg-white">
      <div class="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-5 py-7 text-center sm:flex-row sm:px-6">

        <div>
          <p class="text-sm font-black text-slate-800">
            <span class="text-emerald-700">COMBO</span>LOJO<span class="text-emerald-700">SPORT</span>
          </p>
          <p class="mt-1 text-[10px] text-slate-400">
            Your sports experience starts here.
          </p>
        </div>

        <!-- ✅ SOCIAL ICONS -->
        <div class="flex items-center gap-3">
          <!-- Facebook -->
          <a href="https://facebook.com/combolojo" target="_blank" rel="noopener" class="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:border-blue-500 hover:text-blue-500">
            <svg class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          </a>

          <!-- Instagram -->
          <a href="https://instagram.com/combolojo" target="_blank" rel="noopener" class="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:border-pink-500 hover:text-pink-500">
            <svg class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
            </svg>
          </a>

          <!-- Telegram -->
          <a href="https://t.me/combolojo" target="_blank" rel="noopener" class="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:border-sky-500 hover:text-sky-500">
            <svg class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M11.944 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0a12 12 0 00-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 01.171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
            </svg>
          </a>

          <!-- Website -->
          <a href="https://combolojo.etsgood.com" target="_blank" rel="noopener" class="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:border-emerald-500 hover:text-emerald-500">
            <svg class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm7.938 5.66c1.5 1.665 2.433 3.836 2.557 6.215h-3.345a15.917 15.917 0 00-1.13-3.536 12.845 12.845 0 001.918-2.679zM12 1.5c.82 0 1.612.104 2.374.297A13.94 13.94 0 0012.7 4.226a15.694 15.694 0 00-1.399 0 13.94 13.94 0 00-1.674-2.43c.762-.192 1.554-.296 2.373-.296zm-3.887.93c.605.78 1.14 1.61 1.6 2.478a15.694 15.694 0 00-4.104 2.376 12.91 12.91 0 01-1.599-2.5 12.05 12.05 0 014.103-2.353zM4.058 5.65a14.45 14.45 0 001.92 2.69 15.917 15.917 0 00-1.128 3.535H1.505A12.14 12.14 0 014.058 5.65zM1.5 12h3.345c.093 1.19.373 2.373.847 3.5a12.845 12.845 0 00-1.917 2.678A12.062 12.062 0 011.5 12zm3.61 8.5a15.694 15.694 0 001.6-2.478 15.694 15.694 0 004.103 2.376 12.91 12.91 0 01-1.598 2.499A12.05 12.05 0 015.11 20.5zm3.79-.23c.605-.78 1.14-1.61 1.6-2.478a15.694 15.694 0 004.1-2.376c.64.768 1.18 1.61 1.599 2.5a12.05 12.05 0 01-4.103 2.354zm6.887-.93a14.45 14.45 0 00-1.919-2.69 15.917 15.917 0 001.128-3.535h3.345a12.14 12.14 0 01-2.554 6.225zM12 22.5c-.82 0-1.612-.104-2.374-.297a13.94 13.94 0 001.674-2.429 15.694 15.694 0 001.399 0 13.94 13.94 0 001.674 2.43c-.762.192-1.554.296-2.373.296zm3.887-.93a15.694 15.694 0 00-1.6-2.478 15.694 15.694 0 004.1-2.376c.641.768 1.181 1.61 1.6 2.5a12.05 12.05 0 01-4.1 2.354z"/>
            </svg>
          </a>
        </div>

        <p class="text-[10px] font-bold uppercase tracking-wider text-slate-400">
          © {{ new Date().getFullYear() }} CombolojoS
        </p>

      </div>
    </footer>

  </div>
</template>