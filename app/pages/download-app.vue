<script setup lang="ts">
const router = useRouter()

function goBack() {
  router.back()
}

function downloadAndroid() {
  window.open(
    'https://play.google.com/',
    '_blank',
    'noopener,noreferrer'
  )
}

function downloadIOS() {
  window.open(
    'https://www.apple.com/app-store/',
    '_blank',
    'noopener,noreferrer'
  )
}

const steps = [
  {
    number: '01',
    icon: '📱',
    title: 'Download App',
    description: 'Install CombolojoSPORT on your phone'
  },
  {
    number: '02',
    icon: '⚽',
    title: 'Find Venue',
    description: 'Choose a sports field near you'
  },
  {
    number: '03',
    icon: '📅',
    title: 'Choose Slot',
    description: 'Select your preferred date and time'
  },
  {
    number: '04',
    icon: '✓',
    title: 'Confirm Booking',
    description: 'Confirm and complete your booking'
  }
]
</script>

<template>
  <div class="min-h-screen bg-slate-100 text-slate-900">

    <!-- =========================================================
         HEADER
    ========================================================== -->
    <header class="sticky top-0 z-50 border-b border-slate-800 bg-[#022c22] shadow-lg">
      <div class="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-6 lg:px-8">

        <!-- Logo -->
        <NuxtLink
          to="/"
          class="group flex items-center gap-3"
        >
          <div
            class="flex h-11 w-11 items-center justify-center rounded-xl bg-lime-400 text-xl shadow-lg shadow-lime-900/20 transition group-hover:scale-105"
          >
            ⚽
          </div>

          <div>
            <div class="text-lg font-black leading-none tracking-tight">
              <span class="text-lime-400">COMBO</span>
              <span class="text-white">LOJO</span>
            </div>

            <p class="mt-1 text-[8px] font-bold uppercase tracking-[0.25em] text-emerald-200/70">
              Sports Platform
            </p>
          </div>
        </NuxtLink>

        <!-- Back -->
        <button
          type="button"
          @click="goBack"
          class="group flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm font-bold text-white transition hover:border-lime-400 hover:bg-lime-400 hover:text-[#022c22]"
        >
          <span class="text-lg transition-transform group-hover:-translate-x-1">
            ←
          </span>

          Back
        </button>

      </div>
    </header>


    <!-- =========================================================
         HERO SPORTS FIELD
    ========================================================== -->
    <section class="relative overflow-hidden bg-[#064e3b]">

      <!-- Pitch stripes -->
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

      <!-- Football field markings -->
      <div class="pointer-events-none absolute inset-0">

        <!-- Outer pitch -->
        <div
          class="absolute left-1/2 top-1/2 h-[420px] w-[850px] -translate-x-1/2 -translate-y-1/2 rounded-[4px] border-2 border-white/10"
        ></div>

        <!-- Center line -->
        <div
          class="absolute left-1/2 top-1/2 h-[420px] w-px -translate-x-1/2 -translate-y-1/2 bg-white/10"
        ></div>

        <!-- Center circle -->
        <div
          class="absolute left-1/2 top-1/2 h-36 w-36 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white/10"
        ></div>

        <!-- Center dot -->
        <div
          class="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/10"
        ></div>

        <!-- Left penalty -->
        <div
          class="absolute left-1/2 top-1/2 h-52 w-28 -translate-x-[425px] -translate-y-1/2 border-2 border-white/10"
        ></div>

        <!-- Right penalty -->
        <div
          class="absolute left-1/2 top-1/2 h-52 w-28 translate-x-[397px] -translate-y-1/2 border-2 border-white/10"
        ></div>

      </div>

      <!-- Hero content -->
      <div class="relative z-10 mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:px-8 lg:py-20">

        <div class="mx-auto max-w-3xl text-center">

          <!-- Badge -->
          <div
            class="mx-auto inline-flex items-center gap-2 rounded-full border border-lime-300/30 bg-lime-300/10 px-4 py-2"
          >
            <span class="h-2 w-2 rounded-full bg-lime-300"></span>

            <span class="text-[10px] font-black uppercase tracking-[0.25em] text-lime-200 sm:text-xs">
              Mobile Booking
            </span>
          </div>

          <!-- Heading -->
          <h1
            class="mt-6 text-4xl font-black leading-tight text-white sm:text-5xl lg:text-6xl"
          >
            Book Your Sports Venue

            <span class="mt-2 block text-lime-300">
              From Our Mobile App
            </span>
          </h1>

          <p class="mx-auto mt-6 max-w-2xl text-sm leading-7 text-emerald-50/75 sm:text-base">
            Continue your booking through the
            <strong class="text-white">
              CombolojoSPORT
            </strong>
            mobile application. Find a venue, select your date and time,
            and confirm your booking directly from your phone.
          </p>

          <!-- Small stats -->
          <div class="mt-8 flex flex-wrap items-center justify-center gap-3">

            <div class="rounded-lg border border-white/10 bg-black/10 px-4 py-2">
              <span class="text-xs font-bold text-lime-300">
                ⚡ Fast Booking
              </span>
            </div>

            <div class="rounded-lg border border-white/10 bg-black/10 px-4 py-2">
              <span class="text-xs font-bold text-lime-300">
                📍 Find Venues
              </span>
            </div>

            <div class="rounded-lg border border-white/10 bg-black/10 px-4 py-2">
              <span class="text-xs font-bold text-lime-300">
                🔒 Secure
              </span>
            </div>

          </div>

        </div>

      </div>
    </section>


    <!-- =========================================================
         DOWNLOAD SECTION
    ========================================================== -->
    <main class="relative mx-auto max-w-7xl px-5 py-14 sm:px-6 lg:px-8">

      <!-- Section heading -->
      <div class="mx-auto max-w-2xl text-center">

        <p class="text-xs font-black uppercase tracking-[0.25em] text-emerald-700">
          Get Started
        </p>

        <h2 class="mt-2 text-2xl font-black text-slate-900 sm:text-3xl">
          Download CombolojoSPORT
        </h2>

        <p class="mt-3 text-sm leading-6 text-slate-500">
          Choose your mobile platform and continue your sports venue booking.
        </p>

      </div>


      <!-- =======================================================
           DOWNLOAD CARDS
      ======================================================== -->
      <div class="mx-auto mt-10 grid max-w-4xl gap-6 md:grid-cols-2">

        <!-- Android -->
        <button
          type="button"
          @click="downloadAndroid"
          class="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 text-left shadow-sm transition duration-300 hover:-translate-y-1 hover:border-emerald-300 hover:shadow-xl"
        >

          <!-- Top sport line -->
          <div class="absolute left-0 right-0 top-0 h-1 bg-lime-400"></div>

          <div class="flex items-start justify-between">

            <div class="flex items-center gap-4">

              <div
                class="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 text-3xl text-emerald-700 transition group-hover:bg-emerald-100"
              >
                ▶
              </div>

              <div>
                <p class="text-[10px] font-black uppercase tracking-wider text-slate-400">
                  Download for
                </p>

                <h3 class="mt-1 text-xl font-black text-slate-900">
                  Android
                </h3>

                <p class="mt-1 text-xs text-slate-500">
                  Google Play Store
                </p>
              </div>

            </div>

            <span
              class="rounded-full bg-emerald-50 px-3 py-1 text-[10px] font-black text-emerald-700"
            >
              ANDROID
            </span>

          </div>

          <div class="mt-6 border-t border-slate-100 pt-4">

            <div class="flex items-center justify-between">

              <span class="text-sm font-black text-emerald-700">
                Get the App
              </span>

              <span
                class="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-700 text-white transition group-hover:bg-lime-400 group-hover:text-emerald-950"
              >
                →
              </span>

            </div>

          </div>

        </button>


        <!-- iOS -->
        <button
          type="button"
          @click="downloadIOS"
          class="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 text-left shadow-sm transition duration-300 hover:-translate-y-1 hover:border-emerald-300 hover:shadow-xl"
        >

          <!-- Top sport line -->
          <div class="absolute left-0 right-0 top-0 h-1 bg-emerald-500"></div>

          <div class="flex items-start justify-between">

            <div class="flex items-center gap-4">

              <div
                class="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-3xl text-slate-800"
              >
                
              </div>

              <div>
                <p class="text-[10px] font-black uppercase tracking-wider text-slate-400">
                  Download for
                </p>

                <h3 class="mt-1 text-xl font-black text-slate-900">
                  iPhone / iOS
                </h3>

                <p class="mt-1 text-xs text-slate-500">
                  Apple App Store
                </p>
              </div>

            </div>

            <span
              class="rounded-full bg-slate-100 px-3 py-1 text-[10px] font-black text-slate-600"
            >
              iOS
            </span>

          </div>

          <div class="mt-6 border-t border-slate-100 pt-4">

            <div class="flex items-center justify-between">

              <span class="text-sm font-black text-emerald-700">
                Get the App
              </span>

              <span
                class="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-700 text-white transition group-hover:bg-lime-400 group-hover:text-emerald-950"
              >
                →
              </span>

            </div>

          </div>

        </button>

      </div>


      <!-- =======================================================
           BOOKING PROCESS
      ======================================================== -->
      <section class="mx-auto mt-16 max-w-5xl">

        <div class="mb-7 text-center">

          <p class="text-xs font-black uppercase tracking-[0.25em] text-emerald-700">
            Simple Process
          </p>

          <h2 class="mt-2 text-2xl font-black text-slate-900">
            How Mobile Booking Works
          </h2>

        </div>


        <div class="grid grid-cols-2 gap-4 lg:grid-cols-4">

          <div
            v-for="(step, index) in steps"
            :key="step.number"
            class="group relative rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-sm transition hover:-translate-y-1 hover:border-emerald-200 hover:shadow-lg"
          >

            <!-- Connecting line -->
            <div
              v-if="index < steps.length - 1"
              class="absolute left-[calc(100%+1px)] top-12 hidden h-px w-4 bg-emerald-200 lg:block"
            ></div>

            <!-- Number -->
            <div
              class="absolute right-3 top-3 text-[10px] font-black text-emerald-200"
            >
              {{ step.number }}
            </div>

            <!-- Icon -->
            <div
              class="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-2xl transition group-hover:bg-lime-100"
            >
              {{ step.icon }}
            </div>

            <h3 class="mt-4 text-sm font-black text-slate-900">
              {{ step.title }}
            </h3>

            <p class="mt-2 text-xs leading-5 text-slate-500">
              {{ step.description }}
            </p>

          </div>

        </div>

      </section>


      <!-- =======================================================
           FEATURES
      ======================================================== -->
      <section class="mx-auto mt-16 max-w-5xl">

        <div
          class="rounded-3xl bg-[#022c22] p-6 shadow-xl sm:p-8"
        >

          <div class="grid gap-8 md:grid-cols-3">

            <!-- Feature -->
            <div class="flex gap-4">

              <div
                class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-lime-400 text-xl"
              >
                ⚡
              </div>

              <div>
                <h3 class="font-black text-white">
                  Fast Booking
                </h3>

                <p class="mt-1 text-xs leading-5 text-emerald-100/60">
                  Find and book available sports fields quickly.
                </p>
              </div>

            </div>


            <!-- Feature -->
            <div class="flex gap-4">

              <div
                class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-lime-400 text-xl"
              >
                📍
              </div>

              <div>
                <h3 class="font-black text-white">
                  Nearby Venues
                </h3>

                <p class="mt-1 text-xs leading-5 text-emerald-100/60">
                  Discover football, futsal and other sports venues.
                </p>
              </div>

            </div>


            <!-- Feature -->
            <div class="flex gap-4">

              <div
                class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-lime-400 text-xl"
              >
                🔒
              </div>

              <div>
                <h3 class="font-black text-white">
                  Secure Booking
                </h3>

                <p class="mt-1 text-xs leading-5 text-emerald-100/60">
                  Manage your booking securely from the mobile app.
                </p>
              </div>

            </div>

          </div>

        </div>

      </section>


      <!-- Bottom brand -->
      <div class="mt-14 flex items-center justify-center gap-4">

        <div class="h-px w-16 bg-slate-200"></div>

        <p class="text-xs font-black uppercase tracking-[0.2em] text-slate-400">
          Play
          <span class="mx-2 text-emerald-600">•</span>
          Book
          <span class="mx-2 text-emerald-600">•</span>
          Connect
        </p>

        <div class="h-px w-16 bg-slate-200"></div>

      </div>

    </main>


    <!-- =========================================================
         FOOTER
    ========================================================== -->
    <footer class="border-t border-slate-200 bg-white">

      <div
        class="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-5 py-6 text-center sm:flex-row sm:px-6"
      >

        <div>
          <p class="text-sm font-black text-slate-800">
            <span class="text-emerald-700">COMBO</span>LOJO
            <span class="text-emerald-700">SPORT</span>
          </p>

          <p class="mt-1 text-[10px] text-slate-400">
            Your sports experience starts here.
          </p>
        </div>

        <p class="text-[10px] font-bold uppercase tracking-wider text-slate-400">
          © {{ new Date().getFullYear() }} CombolojoSPORT
        </p>

      </div>

    </footer>

  </div>
</template>