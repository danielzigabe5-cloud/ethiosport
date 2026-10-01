```vue
<script setup lang="ts">
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
   APP DOWNLOAD
========================================================= */

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

/* =========================================================
   BOOKING STEPS
========================================================= */

const steps = [
  {
    number: '01',
    icon: '📱',
    title: 'Download App',
    description:
      'Install the CombolojoSPORT mobile app on your phone.'
  },
  {
    number: '02',
    icon: '📍',
    title: 'Find Venue',
    description:
      'Discover football, futsal, basketball and other sports venues near you.'
  },
  {
    number: '03',
    icon: '📅',
    title: 'Choose Slot',
    description:
      'Select your preferred booking date and available time slot.'
  },
  {
    number: '04',
    icon: '✓',
    title: 'Confirm Booking',
    description:
      'Review your booking and confirm it directly from the mobile app.'
  }
]

/* =========================================================
   FEATURES
========================================================= */

const features = [
  {
    icon: '⚡',
    title: 'Fast Booking',
    description:
      'Find available sports venues and book your preferred time quickly.'
  },
  {
    icon: '📍',
    title: 'Nearby Venues',
    description:
      'Discover sports fields and venues based on your location.'
  },
  {
    icon: '📅',
    title: 'Easy Scheduling',
    description:
      'Choose your preferred date and available time slot from the app.'
  },
  {
    icon: '🔔',
    title: 'Booking Updates',
    description:
      'Receive important updates about your bookings and games.'
  },
  {
    icon: '⚽',
    title: 'JustPlay',
    description:
      'Discover games and connect with other players through the app.'
  },
  {
    icon: '🔒',
    title: 'Secure',
    description:
      'Manage your sports activities and bookings securely.'
  }
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
  <div
    class="min-h-screen
           bg-[#f5f7f4]
           text-slate-900
           overflow-hidden"
  >

    <!-- =====================================================
         HEADER
    ====================================================== -->

    <header
      class="sticky top-0 z-50
             border-b border-emerald-900/40
             bg-[#022c22]
             shadow-lg"
    >

      <div
        class="mx-auto
               flex max-w-7xl
               items-center
               justify-between
               px-4 sm:px-6 lg:px-8
               py-3.5"
      >

        <!-- LOGO -->
        <button
          type="button"
          @click="goHome"
          class="group flex items-center gap-3"
        >

          <div
            class="flex h-11 w-11
                   items-center justify-center
                   rounded-xl
                   bg-lime-400
                   text-xl
                   shadow-lg
                   shadow-lime-900/20
                   transition
                   group-hover:scale-105"
          >
            ⚽
          </div>

          <div class="text-left">

            <div
              class="text-lg
                     font-black
                     leading-none
                     tracking-tight"
            >
              <span class="text-lime-400">
                COMBO
              </span>

              <span class="text-white">
                LOJO
              </span>

              <span class="text-lime-400">
                SPORT
              </span>
            </div>

            <p
              class="mt-1
                     text-[8px]
                     font-bold
                     uppercase
                     tracking-[0.25em]
                     text-emerald-200/70"
            >
              Sports Platform
            </p>

          </div>

        </button>

        <!-- BACK -->
        <button
          type="button"
          @click="goBack"
          class="group
                 flex items-center gap-2
                 rounded-xl
                 border border-white/15
                 bg-white/5
                 px-4 py-2.5
                 text-sm font-bold
                 text-white
                 transition
                 hover:border-lime-400
                 hover:bg-lime-400
                 hover:text-[#022c22]"
        >

          <span
            class="text-lg
                   transition-transform
                   group-hover:-translate-x-1"
          >
            ←
          </span>

          <span class="hidden sm:inline">
            Back
          </span>

        </button>

      </div>

    </header>


    <!-- =====================================================
         HERO
    ====================================================== -->

    <section
      class="relative
             overflow-hidden
             bg-[#064e3b]"
    >

      <!-- FIELD BACKGROUND -->
      <div
        class="absolute inset-0
               pointer-events-none"
      >

        <!-- stripes -->
        <div
          class="absolute inset-0
                 opacity-20"
        >

          <div
            class="grid h-full
                   grid-cols-6"
          >

            <div class="bg-[#022c22]"></div>
            <div></div>
            <div class="bg-[#022c22]"></div>
            <div></div>
            <div class="bg-[#022c22]"></div>
            <div></div>

          </div>

        </div>

        <!-- pitch -->
        <div
          class="absolute
                 left-1/2
                 top-1/2
                 h-[350px]
                 w-[720px]
                 max-w-[90vw]
                 -translate-x-1/2
                 -translate-y-1/2
                 rounded-xl
                 border-2
                 border-white/10"
        ></div>

        <!-- center line -->
        <div
          class="absolute
                 left-1/2
                 top-1/2
                 h-[350px]
                 w-px
                 -translate-x-1/2
                 -translate-y-1/2
                 bg-white/10"
        ></div>

        <!-- center circle -->
        <div
          class="absolute
                 left-1/2
                 top-1/2
                 h-32 w-32
                 -translate-x-1/2
                 -translate-y-1/2
                 rounded-full
                 border-2
                 border-white/10"
        ></div>

        <!-- center dot -->
        <div
          class="absolute
                 left-1/2
                 top-1/2
                 h-2 w-2
                 -translate-x-1/2
                 -translate-y-1/2
                 rounded-full
                 bg-white/20"
        ></div>

      </div>


      <!-- HERO CONTENT -->
      <div
        class="relative z-10
               mx-auto
               max-w-7xl
               px-4 sm:px-6 lg:px-8
               py-16
               sm:py-20
               lg:py-24"
      >

        <div
          class="mx-auto
                 max-w-4xl
                 text-center"
        >

          <!-- BADGE -->
          <div
            class="mx-auto
                   inline-flex
                   items-center
                   gap-2
                   rounded-full
                   border
                   border-lime-300/30
                   bg-lime-300/10
                   px-4 py-2"
          >

            <span
              class="h-2 w-2
                     rounded-full
                     bg-lime-300"
            ></span>

            <span
              class="text-[10px]
                     font-black
                     uppercase
                     tracking-[0.25em]
                     text-lime-200
                     sm:text-xs"
            >
              CombolojoSPORT Mobile App
            </span>

          </div>


          <!-- TITLE -->
          <h1
            class="mt-6
                   text-4xl
                   font-black
                   leading-tight
                   text-white
                   sm:text-5xl
                   lg:text-7xl"
          >

            Your Sports Experience

            <span
              class="block
                     text-lime-300"
            >
              Starts in the App
            </span>

          </h1>


          <!-- DESCRIPTION -->
          <p
            class="mx-auto
                   mt-6
                   max-w-2xl
                   text-sm
                   leading-7
                   text-emerald-50/75
                   sm:text-base"
          >
            Download the CombolojoSPORT mobile app
            to book sports venues, choose available
            time slots, join games and manage your
            sports activities from your phone.
          </p>


          <!-- HERO BUTTONS -->
          <div
            class="mt-9
                   flex flex-col
                   items-center
                   justify-center
                   gap-3
                   sm:flex-row"
          >

            <!-- ANDROID -->
            <button
              type="button"
              @click="downloadAndroid"
              class="group
                     flex w-full
                     items-center
                     justify-center
                     gap-3
                     rounded-xl
                     bg-lime-400
                     px-7 py-4
                     text-sm
                     font-black
                     text-[#022c22]
                     shadow-xl
                     shadow-black/10
                     transition
                     hover:-translate-y-1
                     hover:bg-lime-300
                     sm:w-auto"
            >

              <span class="text-xl">
                ▶
              </span>

              <span>
                Download for Android
              </span>

            </button>


            <!-- IOS -->
            <button
              type="button"
              @click="downloadIOS"
              class="group
                     flex w-full
                     items-center
                     justify-center
                     gap-3
                     rounded-xl
                     border
                     border-white/20
                     bg-white/10
                     px-7 py-4
                     text-sm
                     font-black
                     text-white
                     backdrop-blur
                     transition
                     hover:-translate-y-1
                     hover:bg-white
                     hover:text-[#022c22]
                     sm:w-auto"
            >

              <span class="text-xl">
                
              </span>

              <span>
                Download for iPhone
              </span>

            </button>

          </div>


          <!-- SMALL INFO -->
          <p
            class="mt-5
                   text-[10px]
                   font-bold
                   uppercase
                   tracking-widest
                   text-emerald-100/50"
          >
            Play · Book · Connect
          </p>

        </div>

      </div>

    </section>


    <!-- =====================================================
         PLATFORM DOWNLOAD SECTION
    ====================================================== -->

    <main
      class="mx-auto
             max-w-7xl
             px-4 sm:px-6 lg:px-8
             py-14 sm:py-16"
    >

      <!-- TITLE -->
      <div
        class="mx-auto
               max-w-2xl
               text-center"
      >

        <p
          class="text-xs
                 font-black
                 uppercase
                 tracking-[0.25em]
                 text-emerald-700"
        >
          Get Started
        </p>

        <h2
          class="mt-2
                 text-3xl
                 font-black
                 text-slate-900
                 sm:text-4xl"
        >
          Download the App
        </h2>

        <p
          class="mt-3
                 text-sm
                 leading-6
                 text-slate-500"
        >
          Choose your mobile platform and
          continue your sports experience
          with CombolojoSPORT.
        </p>

      </div>


      <!-- DOWNLOAD CARDS -->
      <div
        class="mx-auto
               mt-10
               grid max-w-5xl
               gap-6
               lg:grid-cols-2"
      >

        <!-- =================================================
             ANDROID CARD
        ================================================== -->

        <div
          class="group
                 relative
                 overflow-hidden
                 rounded-3xl
                 border
                 border-slate-200
                 bg-white
                 p-7
                 shadow-sm
                 transition
                 duration-300
                 hover:-translate-y-1
                 hover:border-emerald-300
                 hover:shadow-2xl
                 sm:p-8"
        >

          <!-- top line -->
          <div
            class="absolute
                   left-0 right-0 top-0
                   h-1.5
                   bg-lime-400"
          ></div>


          <div
            class="flex
                   items-start
                   justify-between
                   gap-4"
          >

            <div
              class="flex
                     items-center
                     gap-4"
            >

              <div
                class="flex
                       h-16 w-16
                       shrink-0
                       items-center
                       justify-center
                       rounded-2xl
                       bg-emerald-50
                       text-3xl
                       text-emerald-700
                       transition
                       group-hover:bg-lime-100"
              >
                ▶
              </div>

              <div>

                <p
                  class="text-[10px]
                         font-black
                         uppercase
                         tracking-wider
                         text-slate-400"
                >
                  Download for
                </p>

                <h3
                  class="mt-1
                         text-2xl
                         font-black
                         text-slate-900"
                >
                  Android
                </h3>

                <p
                  class="mt-1
                         text-xs
                         text-slate-500"
                >
                  Google Play Store
                </p>

              </div>

            </div>

            <span
              class="rounded-full
                     bg-emerald-50
                     px-3 py-1
                     text-[10px]
                     font-black
                     text-emerald-700"
            >
              ANDROID
            </span>

          </div>


          <!-- FEATURES -->
          <div
            class="mt-7
                   space-y-3
                   border-t
                   border-slate-100
                   pt-6"
          >

            <div
              class="flex items-center gap-3
                     text-sm text-slate-600"
            >
              <span class="text-emerald-600">✓</span>
              Book sports venues
            </div>

            <div
              class="flex items-center gap-3
                     text-sm text-slate-600"
            >
              <span class="text-emerald-600">✓</span>
              Choose available time slots
            </div>

            <div
              class="flex items-center gap-3
                     text-sm text-slate-600"
            >
              <span class="text-emerald-600">✓</span>
              Join JustPlay games
            </div>

          </div>


          <!-- BUTTON -->
          <button
            type="button"
            @click="downloadAndroid"
            class="mt-7
                   flex w-full
                   items-center
                   justify-center
                   gap-3
                   rounded-xl
                   bg-[#022c22]
                   px-6 py-4
                   text-sm
                   font-black
                   text-lime-300
                   transition
                   hover:bg-emerald-800"
          >

            <span>
              Download Android App
            </span>

            <span>
              →
            </span>

          </button>

        </div>


        <!-- =================================================
             IOS CARD
        ================================================== -->

        <div
          class="group
                 relative
                 overflow-hidden
                 rounded-3xl
                 border
                 border-slate-200
                 bg-white
                 p-7
                 shadow-sm
                 transition
                 duration-300
                 hover:-translate-y-1
                 hover:border-emerald-300
                 hover:shadow-2xl
                 sm:p-8"
        >

          <!-- top line -->
          <div
            class="absolute
                   left-0 right-0 top-0
                   h-1.5
                   bg-emerald-500"
          ></div>


          <div
            class="flex
                   items-start
                   justify-between
                   gap-4"
          >

            <div
              class="flex
                     items-center
                     gap-4"
            >

              <div
                class="flex
                       h-16 w-16
                       shrink-0
                       items-center
                       justify-center
                       rounded-2xl
                       bg-slate-100
                       text-3xl
                       text-slate-800"
              >
                
              </div>

              <div>

                <p
                  class="text-[10px]
                         font-black
                         uppercase
                         tracking-wider
                         text-slate-400"
                >
                  Download for
                </p>

                <h3
                  class="mt-1
                         text-2xl
                         font-black
                         text-slate-900"
                >
                  iPhone / iOS
                </h3>

                <p
                  class="mt-1
                         text-xs
                         text-slate-500"
                >
                  Apple App Store
                </p>

              </div>

            </div>

            <span
              class="rounded-full
                     bg-slate-100
                     px-3 py-1
                     text-[10px]
                     font-black
                     text-slate-600"
            >
              iOS
            </span>

          </div>


          <!-- FEATURES -->
          <div
            class="mt-7
                   space-y-3
                   border-t
                   border-slate-100
                   pt-6"
          >

            <div
              class="flex items-center gap-3
                     text-sm text-slate-600"
            >
              <span class="text-emerald-600">✓</span>
              Book sports venues
            </div>

            <div
              class="flex items-center gap-3
                     text-sm text-slate-600"
            >
              <span class="text-emerald-600">✓</span>
              Manage your bookings
            </div>

            <div
              class="flex items-center gap-3
                     text-sm text-slate-600"
            >
              <span class="text-emerald-600">✓</span>
              Receive booking updates
            </div>

          </div>


          <!-- BUTTON -->
          <button
            type="button"
            @click="downloadIOS"
            class="mt-7
                   flex w-full
                   items-center
                   justify-center
                   gap-3
                   rounded-xl
                   bg-[#022c22]
                   px-6 py-4
                   text-sm
                   font-black
                   text-lime-300
                   transition
                   hover:bg-emerald-800"
          >

            <span>
              Download iPhone App
            </span>

            <span>
              →
            </span>

          </button>

        </div>

      </div>


      <!-- =====================================================
           HOW BOOKING WORKS
      ====================================================== -->

      <section
        class="mx-auto
               mt-20
               max-w-6xl"
      >

        <div class="mb-8 text-center">

          <p
            class="text-xs
                   font-black
                   uppercase
                   tracking-[0.25em]
                   text-emerald-700"
          >
            Simple Process
          </p>

          <h2
            class="mt-2
                   text-3xl
                   font-black
                   text-slate-900"
          >
            How Mobile Booking Works
          </h2>

          <p
            class="mx-auto mt-3
                   max-w-2xl
                   text-sm
                   leading-6
                   text-slate-500"
          >
            Everything you need to book your
            favorite sports venue is available
            inside the mobile app.
          </p>

        </div>


        <div
          class="grid
                 grid-cols-1
                 gap-5
                 sm:grid-cols-2
                 lg:grid-cols-4"
        >

          <div
            v-for="(step, index) in steps"
            :key="step.number"
            class="group
                   relative
                   rounded-2xl
                   border
                   border-slate-200
                   bg-white
                   p-6
                   text-center
                   shadow-sm
                   transition
                   hover:-translate-y-1
                   hover:border-emerald-200
                   hover:shadow-xl"
          >

            <!-- step number -->
            <div
              class="absolute
                     right-4 top-4
                     text-[10px]
                     font-black
                     text-emerald-200"
            >
              {{ step.number }}
            </div>


            <!-- icon -->
            <div
              class="mx-auto
                     flex h-16 w-16
                     items-center
                     justify-center
                     rounded-2xl
                     bg-emerald-50
                     text-2xl
                     transition
                     group-hover:bg-lime-100"
            >
              {{ step.icon }}
            </div>


            <h3
              class="mt-5
                     text-base
                     font-black
                     text-slate-900"
            >
              {{ step.title }}
            </h3>

            <p
              class="mt-2
                     text-xs
                     leading-5
                     text-slate-500"
            >
              {{ step.description }}
            </p>

          </div>

        </div>

      </section>


      <!-- =====================================================
           WEBSITE VS MOBILE APP
      ====================================================== -->

      <section
        class="mx-auto
               mt-20
               max-w-6xl"
      >

        <div
          class="overflow-hidden
                 rounded-3xl
                 bg-[#022c22]
                 shadow-xl"
        >

          <div
            class="grid
                   grid-cols-1
                   lg:grid-cols-2"
          >

            <!-- WEBSITE -->
            <div
              class="p-8
                     sm:p-10
                     lg:border-r
                     lg:border-white/10"
            >

              <div
                class="flex
                       items-center
                       gap-4"
              >

                <div
                  class="flex
                         h-12 w-12
                         items-center
                         justify-center
                         rounded-xl
                         bg-white/10
                         text-xl"
                >
                  🌐
                </div>

                <div>

                  <p
                    class="text-[10px]
                           font-black
                           uppercase
                           tracking-widest
                           text-lime-400"
                  >
                    Website
                  </p>

                  <h3
                    class="text-xl
                           font-black
                           text-white"
                  >
                    Discover
                  </h3>

                </div>

              </div>


              <div
                class="mt-7
                       space-y-4"
              >

                <div
                  class="flex gap-3
                         text-sm
                         text-emerald-100/70"
                >
                  <span class="text-lime-400">✓</span>
                  Explore sports venues
                </div>

                <div
                  class="flex gap-3
                         text-sm
                         text-emerald-100/70"
                >
                  <span class="text-lime-400">✓</span>
                  Discover events
                </div>

                <div
                  class="flex gap-3
                         text-sm
                         text-emerald-100/70"
                >
                  <span class="text-lime-400">✓</span>
                  Explore JustPlay
                </div>

                <div
                  class="flex gap-3
                         text-sm
                         text-emerald-100/70"
                >
                  <span class="text-lime-400">✓</span>
                  Read sports content
                </div>

              </div>


              <button
                type="button"
                @click="goToVenues"
                class="mt-8
                       rounded-xl
                       border
                       border-white/15
                       px-5 py-3
                       text-xs
                       font-black
                       uppercase
                       tracking-wider
                       text-white
                       transition
                       hover:border-lime-400
                       hover:bg-lime-400
                       hover:text-[#022c22]"
              >
                Explore Venues →
              </button>

            </div>


            <!-- MOBILE APP -->
            <div
              class="bg-[#064e3b]
                     p-8
                     sm:p-10"
            >

              <div
                class="flex
                       items-center
                       gap-4"
              >

                <div
                  class="flex
                         h-12 w-12
                         items-center
                         justify-center
                         rounded-xl
                         bg-lime-400
                         text-xl"
                >
                  📱
                </div>

                <div>

                  <p
                    class="text-[10px]
                           font-black
                           uppercase
                           tracking-widest
                           text-lime-300"
                  >
                    Mobile App
                  </p>

                  <h3
                    class="text-xl
                           font-black
                           text-white"
                  >
                    Book & Play
                  </h3>

                </div>

              </div>


              <div
                class="mt-7
                       space-y-4"
              >

                <div
                  class="flex gap-3
                         text-sm
                         text-emerald-100/80"
                >
                  <span class="text-lime-300">✓</span>
                  Book sports venues
                </div>

                <div
                  class="flex gap-3
                         text-sm
                         text-emerald-100/80"
                >
                  <span class="text-lime-300">✓</span>
                  Select available slots
                </div>

                <div
                  class="flex gap-3
                         text-sm
                         text-emerald-100/80"
                >
                  <span class="text-lime-300">✓</span>
                  Manage bookings
                </div>

                <div
                  class="flex gap-3
                         text-sm
                         text-emerald-100/80"
                >
                  <span class="text-lime-300">✓</span>
                  Join JustPlay games
                </div>

              </div>


              <button
                type="button"
                @click="downloadAndroid"
                class="mt-8
                       rounded-xl
                       bg-lime-400
                       px-5 py-3
                       text-xs
                       font-black
                       uppercase
                       tracking-wider
                       text-[#022c22]
                       transition
                       hover:bg-lime-300"
              >
                Download App →
              </button>

            </div>

          </div>

        </div>

      </section>


      <!-- =====================================================
           FEATURES
      ====================================================== -->

      <section
        class="mx-auto
               mt-20
               max-w-6xl"
      >

        <div class="text-center">

          <p
            class="text-xs
                   font-black
                   uppercase
                   tracking-[0.25em]
                   text-emerald-700"
          >
            App Features
          </p>

          <h2
            class="mt-2
                   text-3xl
                   font-black
                   text-slate-900"
          >
            Everything in One App
          </h2>

        </div>


        <div
          class="mt-9
                 grid
                 grid-cols-1
                 gap-5
                 sm:grid-cols-2
                 lg:grid-cols-3"
        >

          <div
            v-for="feature in features"
            :key="feature.title"
            class="group
                   rounded-2xl
                   border
                   border-slate-200
                   bg-white
                   p-6
                   shadow-sm
                   transition
                   hover:-translate-y-1
                   hover:border-emerald-200
                   hover:shadow-lg"
          >

            <div
              class="flex
                     h-12 w-12
                     items-center
                     justify-center
                     rounded-xl
                     bg-emerald-50
                     text-xl
                     transition
                     group-hover:bg-lime-100"
            >
              {{ feature.icon }}
            </div>

            <h3
              class="mt-5
                     font-black
                     text-slate-900"
            >
              {{ feature.title }}
            </h3>

            <p
              class="mt-2
                     text-xs
                     leading-5
                     text-slate-500"
            >
              {{ feature.description }}
            </p>

          </div>

        </div>

      </section>


      <!-- =====================================================
           FINAL CTA
      ====================================================== -->

      <section
        class="mx-auto
               mt-20
               max-w-6xl"
      >

        <div
          class="relative
                 overflow-hidden
                 rounded-3xl
                 bg-lime-400
                 px-6 py-12
                 text-center
                 sm:px-10
                 sm:py-14"
        >

          <!-- decorative circles -->
          <div
            class="pointer-events-none
                   absolute
                   -right-20
                   -top-20
                   h-64 w-64
                   rounded-full
                   border-2
                   border-[#022c22]/10"
          ></div>

          <div
            class="pointer-events-none
                   absolute
                   -bottom-28
                   -left-20
                   h-72 w-72
                   rounded-full
                   border-2
                   border-[#022c22]/10"
          ></div>


          <div class="relative z-10">

            <p
              class="text-xs
                     font-black
                     uppercase
                     tracking-[0.25em]
                     text-emerald-900/70"
            >
              Ready to play?
            </p>

            <h2
              class="mt-3
                     text-3xl
                     font-black
                     text-[#022c22]
                     sm:text-5xl"
            >
              Download. Book. Play.
            </h2>

            <p
              class="mx-auto
                     mt-4
                     max-w-2xl
                     text-sm
                     leading-6
                     text-emerald-950/70"
            >
              Get the CombolojoSPORT mobile app
              and take your sports experience
              with you wherever you go.
            </p>


            <div
              class="mt-8
                     flex flex-col
                     justify-center
                     gap-3
                     sm:flex-row"
            >

              <button
                type="button"
                @click="downloadAndroid"
                class="rounded-xl
                       bg-[#022c22]
                       px-7 py-4
                       text-xs
                       font-black
                       uppercase
                       tracking-wider
                       text-lime-300
                       transition
                       hover:bg-emerald-800"
              >
                Android App →
              </button>

              <button
                type="button"
                @click="downloadIOS"
                class="rounded-xl
                       bg-white
                       px-7 py-4
                       text-xs
                       font-black
                       uppercase
                       tracking-wider
                       text-[#022c22]
                       transition
                       hover:bg-slate-50"
              >
                iPhone App →
              </button>

            </div>

          </div>

        </div>

      </section>


      <!-- =====================================================
           BOTTOM NAVIGATION
      ====================================================== -->

      <div
        class="mt-14
               flex
               flex-col
               items-center
               justify-center
               gap-4
               sm:flex-row"
      >

        <button
          type="button"
          @click="goHome"
          class="rounded-xl
                 border
                 border-slate-200
                 bg-white
                 px-5 py-3
                 text-xs
                 font-black
                 uppercase
                 tracking-wider
                 text-slate-600
                 transition
                 hover:border-emerald-300
                 hover:text-emerald-700"
        >
          ← Home
        </button>

        <button
          type="button"
          @click="goToVenues"
          class="rounded-xl
                 border
                 border-slate-200
                 bg-white
                 px-5 py-3
                 text-xs
                 font-black
                 uppercase
                 tracking-wider
                 text-slate-600
                 transition
                 hover:border-emerald-300
                 hover:text-emerald-700"
        >
          Explore Venues
        </button>

        <button
          type="button"
          @click="goToEvents"
          class="rounded-xl
                 border
                 border-slate-200
                 bg-white
                 px-5 py-3
                 text-xs
                 font-black
                 uppercase
                 tracking-wider
                 text-slate-600
                 transition
                 hover:border-emerald-300
                 hover:text-emerald-700"
        >
          Events
        </button>

      </div>

    </main>


    <!-- =====================================================
         FOOTER
    ====================================================== -->

    <footer
      class="border-t
             border-slate-200
             bg-white"
    >

      <div
        class="mx-auto
               flex max-w-7xl
               flex-col
               items-center
               justify-between
               gap-3
               px-5 py-7
               text-center
               sm:flex-row
               sm:px-6"
      >

        <div>

          <p
            class="text-sm
                   font-black
                   text-slate-800"
          >

            <span class="text-emerald-700">
              COMBO
            </span>

            LOJO

            <span class="text-emerald-700">
              SPORT
            </span>

          </p>

          <p
            class="mt-1
                   text-[10px]
                   text-slate-400"
          >
            Your sports experience starts here.
          </p>

        </div>


        <p
          class="text-[10px]
                 font-bold
                 uppercase
                 tracking-wider
                 text-slate-400"
        >
          © {{ new Date().getFullYear() }}
          CombolojoSPORT
        </p>

      </div>

    </footer>

  </div>
</template>
```