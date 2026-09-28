```vue
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

import venueImg from '~/assets/images/venues20.jpg'

useHead({
  title: 'JustPlay | CombolojoSPORT',
  meta: [
    {
      name: 'description',
      content:
        'Find pickup games, connect with players, and discover sports activities in Addis Ababa with CombolojoSPORT.'
    }
  ]
})

/* ---------------------------------------
   STATE
--------------------------------------- */

const locationInput = ref('')
const isSearching = ref(false)
const searchCompleted = ref(false)

/* ---------------------------------------
   NAVIGATION
--------------------------------------- */

const goToContact = (gameTitle = '') => {
  router.push({
    path: '/contact',
    query: gameTitle ? { ref: gameTitle } : {}
  })
}

const goToVenues = () => {
  router.push('/venues')
}

const goToEvents = () => {
  router.push('/events')
}

/* ---------------------------------------
   MATCHMAKING SEARCH
--------------------------------------- */

const triggerMatchmaking = () => {
  if (!locationInput.value.trim()) return

  isSearching.value = true
  searchCompleted.value = false

  setTimeout(() => {
    isSearching.value = false
    searchCompleted.value = true
  }, 1200)
}

/* ---------------------------------------
   PLAYERS
--------------------------------------- */

const queuePlayers = ref([
  {
    id: 1,
    name: 'Abel T.',
    level: 'Advanced',
    position: 'Striker',
    location: 'Bole',
    status: 'In Queue',
    icon: '⚽'
  },
  {
    id: 2,
    name: 'Sami D.',
    level: 'Intermediate',
    position: 'Goalkeeper',
    location: 'Sarbet',
    status: 'Ready',
    icon: '🧤'
  },
  {
    id: 3,
    name: 'Yonas K.',
    level: 'Beginner',
    position: 'Midfielder',
    location: 'CMC',
    status: 'In Queue',
    icon: '👟'
  },
  {
    id: 4,
    name: 'Sara L.',
    level: 'Intermediate',
    position: 'Defender',
    location: 'Megenagna',
    status: 'Ready',
    icon: '🛡️'
  }
])

/* ---------------------------------------
   OPEN GAMES
--------------------------------------- */

const openGames = ref([
  {
    id: 101,
    title: '5v5 Futsal Night',
    venue: 'Sarbet Futsal Field',
    sport: 'Football',
    time: 'Tonight · 06:00 PM',
    distance: '1.2 km',
    neededPlayers: 2,
    price: '120 ETB',
    organizer: 'Abel',
    image: venueImg
  },
  {
    id: 102,
    title: '3v3 Street Hoops',
    venue: 'CMC Arena',
    sport: 'Basketball',
    time: 'Tomorrow · 10:00 AM',
    distance: '3.5 km',
    neededPlayers: 3,
    price: '80 ETB',
    organizer: 'Timothy',
    image: venueImg
  }
])
</script>

<template>
  <div
    class="min-h-screen bg-[#f6f8f5] text-slate-900 font-sans pt-16 md:pt-20 pb-20 overflow-hidden"
  >

    <!-- =====================================================
         HERO
    ====================================================== -->

    <section class="relative overflow-hidden bg-[#0b1f16] shadow-2xl shadow-green-950/30">

      <!-- Football field markings -->
      <div class="absolute inset-0 pointer-events-none opacity-20">
        <div class="absolute left-1/2 top-0 h-full w-px bg-white"></div>

        <div
          class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
                 w-48 h-48 md:w-72 md:h-72
                 rounded-full border border-white"
        ></div>

        <div
          class="absolute left-0 top-1/2 -translate-y-1/2
                 w-32 md:w-56 h-64 md:h-96
                 border border-white border-l-0"
        ></div>

        <div
          class="absolute right-0 top-1/2 -translate-y-1/2
                 w-32 md:w-56 h-64 md:h-96
                 border border-white border-r-0"
        ></div>
      </div>

      <!-- Background image -->
      <div class="absolute inset-0">
        <img
          :src="venueImg"
          alt="Addis Ababa sports field"
          class="h-full w-full object-cover opacity-80"
        />

        <div class="absolute inset-0 bg-gradient-to-r from-[#07150f]/55 via-[#0b1f16]/30 to-[#0b1f16]/20"></div>
      </div>

      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">

        <div class="max-w-4xl mx-auto text-center">

          <!-- Badge -->
          <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#a8ff3e]/40 bg-[#a8ff3e]/10 text-[#b8ff52] text-xs font-black uppercase tracking-[0.2em]">
            <span class="w-2 h-2 rounded-full bg-[#a8ff3e]"></span>
            Addis Ababa · JustPlay
          </div>

          <!-- Heading -->
          <h1
            class="mt-6 text-4xl sm:text-5xl md:text-7xl font-black uppercase tracking-tight text-white leading-[0.95]"
          >
            Find Players.
            <span class="block text-[#a8ff3e]">
              Find Games.
            </span>
            <span class="block">
              Just Play.
            </span>
          </h1>

          <p
            class="mt-6 max-w-2xl mx-auto text-base md:text-lg text-slate-200 leading-relaxed"
          >
            Connect with players around Addis Ababa, discover pickup games,
            and get ready for your next match.
          </p>

          <!-- Search -->
          <div class="mt-10 max-w-3xl mx-auto">

            <div
              class="bg-white p-2 rounded-2xl flex flex-col sm:flex-row border-4 border-[#a8ff3e]"
            >

              <div class="flex-1 flex items-center px-4">
                <span class="text-xl mr-3">📍</span>

                <input
                  v-model="locationInput"
                  type="text"
                  placeholder="Search by area — Bole, Sarbet, CMC..."
                  class="w-full py-4 bg-transparent text-slate-900 placeholder-slate-400 focus:outline-none font-semibold text-sm"
                  @keyup.enter="triggerMatchmaking"
                />
              </div>

              <button
                @click="triggerMatchmaking"
                :disabled="isSearching"
                class="px-8 py-4 bg-[#a8ff3e] hover:bg-[#b8ff52] text-[#0b1f16] font-black uppercase text-xs tracking-wider rounded-xl transition-all disabled:opacity-50"
              >
                <span v-if="isSearching">
                  Finding...
                </span>

                <span v-else>
                  Find a Game
                </span>
              </button>

            </div>

            <transition name="fade">
              <div
                v-if="searchCompleted"
                class="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#a8ff3e]/10 border border-[#a8ff3e]/30 text-[#c9ff7a] text-sm font-bold"
              >
                <span>✓</span>
                Games and players found near
                <strong>{{ locationInput }}</strong>
              </div>
            </transition>

          </div>

        </div>
      </div>
    </section>

    <!-- =====================================================
         MOBILE APP NOTICE
    ====================================================== -->

    <section class="bg-[#a8ff3e] border-b border-[#86cf27]">

      <div
        class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5
               flex flex-col md:flex-row
               items-center justify-between gap-4"
      >

        <div class="flex items-center gap-4">

          <div
            class="w-12 h-12 rounded-xl bg-[#0b1f16] text-[#a8ff3e]
                   flex items-center justify-center text-xl"
          >
            📱
          </div>

          <div>
            <p class="text-xs font-black uppercase tracking-widest text-[#24420f]">
              Mobile App
            </p>

            <h2 class="text-lg md:text-xl font-black text-[#0b1f16]">
              Join & play through the CombolojoSPORT app
            </h2>
          </div>

        </div>

        <button
          @click="goToContact('JustPlay Mobile App')"
          class="px-6 py-3 bg-[#0b1f16] hover:bg-[#132d20] text-white rounded-xl font-black text-xs uppercase tracking-wider transition-all"
        >
          Get the App →
        </button>

      </div>

    </section>

    <!-- =====================================================
         MAIN CONTENT
    ====================================================== -->

    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      <!-- =================================================
           HOW IT WORKS
      ================================================== -->

      <section class="py-16 md:py-20">

        <div class="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">

          <div>
            <p class="text-xs font-black uppercase tracking-[0.2em] text-[#4e8f17]">
              How JustPlay Works
            </p>

            <h2 class="mt-2 text-3xl md:text-4xl font-black uppercase tracking-tight">
              From Search to Kickoff
            </h2>
          </div>

          <p class="max-w-xl text-sm text-slate-500 leading-relaxed">
            Discover the game on the website, then use the mobile app to join
            and manage your JustPlay activity.
          </p>

        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-5">

          <!-- Step 1 -->
          <div
            class="bg-white border border-slate-200 rounded-2xl p-7
                   hover:border-[#8fd52f] transition-colors"
          >

            <div
              class="w-12 h-12 rounded-xl bg-[#ecfbd7] text-[#4d8b16]
                     border border-[#c9ee91]
                     flex items-center justify-center
                     text-lg font-black"
            >
              01
            </div>

            <h3 class="mt-5 text-lg font-black uppercase">
              Set Your Location
            </h3>

            <p class="mt-3 text-sm text-slate-500 leading-relaxed">
              Search an area in Addis Ababa and discover nearby pickup games
              and players.
            </p>

          </div>

          <!-- Step 2 -->
          <div
            class="bg-white border border-slate-200 rounded-2xl p-7
                   hover:border-[#8fd52f] transition-colors"
          >

            <div
              class="w-12 h-12 rounded-xl bg-[#ecfbd7] text-[#4d8b16]
                     border border-[#c9ee91]
                     flex items-center justify-center
                     text-lg font-black"
            >
              02
            </div>

            <h3 class="mt-5 text-lg font-black uppercase">
              Choose Your Game
            </h3>

            <p class="mt-3 text-sm text-slate-500 leading-relaxed">
              Find a football, futsal, basketball, or other sports activity
              that matches your level and location.
            </p>

          </div>

          <!-- Step 3 -->
          <div
            class="bg-white border border-slate-200 rounded-2xl p-7
                   hover:border-[#8fd52f] transition-colors"
          >

            <div
              class="w-12 h-12 rounded-xl bg-[#ecfbd7] text-[#4d8b16]
                     border border-[#c9ee91]
                     flex items-center justify-center
                     text-lg font-black"
            >
              03
            </div>

            <h3 class="mt-5 text-lg font-black uppercase">
              Join & Play
            </h3>

            <p class="mt-3 text-sm text-slate-500 leading-relaxed">
              Open the CombolojoSPORT mobile app to join the game and receive
              your match information.
            </p>

          </div>

        </div>

      </section>

      <!-- =================================================
           OPEN GAMES + QUEUE
      ================================================== -->

      <section class="pb-16 md:pb-20">

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-10">

          <!-- OPEN GAMES -->

          <div class="lg:col-span-2">

            <div
              class="flex flex-col sm:flex-row
                     sm:items-end justify-between gap-3
                     border-b border-slate-200 pb-5 mb-6"
            >

              <div>
                <p class="text-xs font-black uppercase tracking-[0.2em] text-[#4e8f17]">
                  Pickup Games
                </p>

                <h2 class="mt-1 text-2xl md:text-3xl font-black uppercase">
                  Open Games
                </h2>
              </div>

              <button
                @click="goToEvents"
                class="text-xs font-black uppercase tracking-wider text-[#4e8f17] hover:text-[#315e0e] transition-colors"
              >
                View Events →
              </button>

            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-5">

              <article
                v-for="game in openGames"
                :key="game.id"
                class="group bg-white border border-slate-200 rounded-2xl overflow-hidden
                       hover:border-[#8fd52f] transition-colors"
              >

                <!-- Image -->

                <div class="relative h-44 overflow-hidden bg-slate-100">

                  <img
                    :src="game.image"
                    :alt="game.title"
                    class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"></div>

                  <span
                    class="absolute top-4 left-4 px-3 py-1.5
                           bg-[#0b1f16] text-[#b8ff52]
                           border border-[#a8ff3e]/40
                           rounded-lg text-[10px] font-black uppercase tracking-wider"
                  >
                    {{ game.sport }}
                  </span>

                  <span
                    class="absolute top-4 right-4 px-3 py-1.5
                           bg-[#a8ff3e] text-[#0b1f16]
                           rounded-lg text-[10px] font-black uppercase"
                  >
                    {{ game.neededPlayers }} spots
                  </span>

                  <div class="absolute bottom-4 left-4 text-white">

                    <p class="text-[10px] uppercase tracking-wider font-bold text-slate-300">
                      Pickup Game
                    </p>

                    <h3 class="text-xl font-black">
                      {{ game.title }}
                    </h3>

                  </div>

                </div>

                <!-- Content -->

                <div class="p-6">

                  <div class="space-y-3">

                    <div class="flex items-start gap-3">

                      <span class="text-[#4e8f17]">
                        📍
                      </span>

                      <div>
                        <p class="text-sm font-black text-slate-800">
                          {{ game.venue }}
                        </p>

                        <p class="text-xs text-slate-400 mt-0.5">
                          {{ game.distance }}
                        </p>
                      </div>

                    </div>

                    <div class="flex items-center gap-3">

                      <span class="text-[#4e8f17]">
                        ⏰
                      </span>

                      <p class="text-sm font-bold text-slate-600">
                        {{ game.time }}
                      </p>

                    </div>

                  </div>

                  <div
                    class="mt-6 pt-5 border-t border-slate-100
                           flex items-center justify-between gap-3"
                  >

                    <div>
                      <p class="text-[9px] uppercase tracking-wider text-slate-400 font-black">
                        Per Player
                      </p>

                      <p class="text-xl font-black text-[#3f7911]">
                        {{ game.price }}
                      </p>
                    </div>

                    <button
                      @click="goToContact(game.title)"
                      class="px-5 py-3 bg-[#0b1f16]
                             hover:bg-[#173522]
                             text-[#b8ff52]
                             rounded-xl text-[10px]
                             font-black uppercase tracking-wider
                             transition-all"
                    >
                      Join in App
                    </button>

                  </div>

                </div>

              </article>

            </div>

          </div>

          <!-- LIVE QUEUE -->

          <aside>

            <div
              class="flex items-end justify-between
                     border-b border-slate-200 pb-5 mb-6"
            >

              <div>

                <p class="text-xs font-black uppercase tracking-[0.2em] text-[#4e8f17]">
                  Live Players
                </p>

                <h2 class="mt-1 text-2xl font-black uppercase">
                  Queue
                </h2>

              </div>

              <span
                class="px-2.5 py-1 rounded-full
                       bg-[#ecfbd7] text-[#4d8b16]
                       text-[10px] font-black"
              >
                {{ queuePlayers.length }} PLAYERS
              </span>

            </div>

            <div
              class="bg-white border border-slate-200
                     rounded-2xl overflow-hidden"
            >

              <div
                v-for="player in queuePlayers"
                :key="player.id"
                class="p-4 border-b border-slate-100
                       last:border-b-0
                       flex items-center justify-between gap-3
                       hover:bg-[#f7fbf3] transition-colors"
              >

                <div class="flex items-center gap-3">

                  <div
                    class="w-11 h-11 rounded-xl
                           bg-[#f1f5ef]
                           border border-slate-200
                           flex items-center justify-center text-lg"
                  >
                    {{ player.icon }}
                  </div>

                  <div>

                    <p class="text-sm font-black">
                      {{ player.name }}
                    </p>

                    <p class="text-[10px] text-slate-400 uppercase font-bold">
                      {{ player.position }}
                    </p>

                    <p class="text-[10px] text-[#4e8f17] font-black mt-0.5">
                      {{ player.level }}
                    </p>

                  </div>

                </div>

                <div class="text-right">

                  <span
                    class="inline-block px-2 py-1 rounded-md
                           text-[8px] uppercase tracking-wider font-black"
                    :class="
                      player.status === 'Ready'
                        ? 'bg-[#ecfbd7] text-[#4d8b16] border border-[#c9ee91]'
                        : 'bg-slate-100 text-slate-500 border border-slate-200'
                    "
                  >
                    {{ player.status }}
                  </span>

                  <p class="mt-1 text-[9px] text-slate-400 font-bold">
                    📍 {{ player.location }}
                  </p>

                </div>

              </div>

              <button
                @click="goToContact('JustPlay Queue')"
                class="w-full py-4
                       bg-[#0b1f16]
                       hover:bg-[#173522]
                       text-[#b8ff52]
                       text-xs font-black uppercase tracking-wider
                       transition-colors"
              >
                Join Queue in App →
              </button>

            </div>

          </aside>

        </div>

      </section>

      <!-- =================================================
           WEBSITE / MOBILE APP DIFFERENCE
      ================================================== -->

      <section class="pb-16">

        <div
          class="bg-[#0b1f16] rounded-3xl overflow-hidden
                 border border-[#203d2b]"
        >

          <div class="grid grid-cols-1 md:grid-cols-2">

            <!-- WEBSITE -->

            <div class="p-8 md:p-10 border-b md:border-b-0 md:border-r border-[#294633]">

              <div class="flex items-center gap-3">

                <div
                  class="w-11 h-11 rounded-xl
                         bg-white/10 border border-white/10
                         flex items-center justify-center text-xl"
                >
                  🌐
                </div>

                <div>

                  <p class="text-[10px] text-[#a8ff3e] font-black uppercase tracking-widest">
                    Website
                  </p>

                  <h3 class="text-xl font-black text-white">
                    Discover
                  </h3>

                </div>

              </div>

              <ul class="mt-6 space-y-3 text-sm text-slate-300">

                <li class="flex gap-3">
                  <span class="text-[#a8ff3e]">✓</span>
                  Discover sports venues
                </li>

                <li class="flex gap-3">
                  <span class="text-[#a8ff3e]">✓</span>
                  Explore pickup games
                </li>

                <li class="flex gap-3">
                  <span class="text-[#a8ff3e]">✓</span>
                  Read sports news and insights
                </li>

                <li class="flex gap-3">
                  <span class="text-[#a8ff3e]">✓</span>
                  Discover events and activities
                </li>

              </ul>

            </div>

            <!-- APP -->

            <div class="p-8 md:p-10">

              <div class="flex items-center gap-3">

                <div
                  class="w-11 h-11 rounded-xl
                         bg-[#a8ff3e]
                         flex items-center justify-center text-xl"
                >
                  📱
                </div>

                <div>

                  <p class="text-[10px] text-[#a8ff3e] font-black uppercase tracking-widest">
                    Mobile App
                  </p>

                  <h3 class="text-xl font-black text-white">
                    Join & Play
                  </h3>

                </div>

              </div>

              <ul class="mt-6 space-y-3 text-sm text-slate-300">

                <li class="flex gap-3">
                  <span class="text-[#a8ff3e]">✓</span>
                  Join JustPlay matches
                </li>

                <li class="flex gap-3">
                  <span class="text-[#a8ff3e]">✓</span>
                  Join player queues
                </li>

                <li class="flex gap-3">
                  <span class="text-[#a8ff3e]">✓</span>
                  Receive match notifications
                </li>

                <li class="flex gap-3">
                  <span class="text-[#a8ff3e]">✓</span>
                  Manage your games and bookings
                </li>

              </ul>

            </div>

          </div>

        </div>

      </section>

      <!-- =================================================
           APP CTA
      ================================================== -->

      <section class="pb-16 md:pb-24">

        <div
          class="relative overflow-hidden
                 rounded-3xl
                 bg-[#a8ff3e]
                 border border-[#8bce2c]"
        >

          <!-- Field markings -->

          <div class="absolute inset-0 pointer-events-none opacity-20">

            <div
              class="absolute right-[-80px] top-[-80px]
                     w-72 h-72 rounded-full
                     border-[2px] border-[#0b1f16]"
            ></div>

            <div
              class="absolute right-10 bottom-[-100px]
                     w-64 h-64 rounded-full
                     border-[2px] border-[#0b1f16]"
            ></div>

          </div>

          <div
            class="relative z-10
                   px-7 py-12 md:px-16 md:py-16
                   text-center"
          >

            <p class="text-xs uppercase tracking-[0.25em] font-black text-[#315e0e]">
              Ready to play?
            </p>

            <h2
              class="mt-3 text-3xl md:text-5xl
                     font-black uppercase
                     text-[#0b1f16]"
            >
              Your next game is waiting.
            </h2>

            <p
              class="max-w-2xl mx-auto mt-5
                     text-[#294b18]
                     text-sm md:text-base
                     leading-relaxed"
            >
              Explore CombolojoSPORT on the web, then use the mobile app
              to join your game, connect with players, and manage your
              JustPlay activity.
            </p>

            <div
              class="mt-8 flex flex-col sm:flex-row
                     justify-center gap-3"
            >

              <button
                @click="goToContact('Android App')"
                class="px-7 py-4
                       bg-[#0b1f16]
                       hover:bg-[#173522]
                       text-[#b8ff52]
                       rounded-xl
                       font-black text-xs
                       uppercase tracking-wider
                       transition-all"
              >
                Android App →
              </button>

              <button
                @click="goToContact('iOS App')"
                class="px-7 py-4
                       bg-white
                       hover:bg-slate-50
                       text-[#0b1f16]
                       rounded-xl
                       font-black text-xs
                       uppercase tracking-wider
                       transition-all"
              >
                iOS App →
              </button>

              <button
                @click="goToVenues"
                class="px-7 py-4
                       border-2 border-[#0b1f16]
                       hover:bg-[#0b1f16]
                       hover:text-[#b8ff52]
                       text-[#0b1f16]
                       rounded-xl
                       font-black text-xs
                       uppercase tracking-wider
                       transition-all"
              >
                Explore Venues
              </button>

            </div>

          </div>

        </div>

      </section>

    </main>

  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Prevent accidental horizontal overflow */
:global(html),
:global(body) {
  overflow-x: hidden;
}
</style>
```
