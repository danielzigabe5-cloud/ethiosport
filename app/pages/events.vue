<script setup lang="ts">
import eventImage from '~/assets/images/venues20.jpg'

useHead({
  title: 'Sports Events | CombolojoSPORT',
  meta: [
    {
      name: 'description',
      content: 'Discover upcoming football, basketball, and volleyball events across Ethiopia on CombolojoSPORT.'
    }
  ]
})

const events = [
  {
    id: 1,
    title: 'Community Football Weekend',
    date: 'Oct 05, 2026',
    time: '09:00 AM',
    place: 'Sarbet Football Field',
    sport: 'Football',
    description: 'Join a competitive and social football tournament for teams and players in Addis Ababa.',
    image: eventImage
  },
  {
    id: 2,
    title: 'City Basketball Meetup',
    date: 'Oct 12, 2026',
    time: '02:00 PM',
    place: 'City Basketball Court',
    sport: 'Basketball',
    description: 'A friendly basketball event with player mixers, pick-up games and community energy.',
    image: eventImage
  },
  {
    id: 3,
    title: 'Volleyball Challenge',
    date: 'Oct 18, 2026',
    time: '10:00 AM',
    place: 'Unity Volleyball Center',
    sport: 'Volleyball',
    description: 'Compete or participate in a weekend volleyball challenge built for active teams.',
    image: eventImage
  }
]
</script>

<template>
  <div class="min-h-screen bg-slate-50 text-slate-900">
    <section class="relative overflow-hidden bg-slate-950">
      <div class="absolute inset-0">
        <img
          :src="eventImage"
          alt="Sports event"
          class="h-full w-full object-cover opacity-35"
        />
      </div>
      <div class="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-emerald-900/30" />

      <div class="relative mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:px-10">
        <div class="max-w-3xl">
          <span class="inline-flex rounded-full border border-emerald-400/40 bg-emerald-500/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-emerald-300">
            Upcoming Events
          </span>
          <h1 class="mt-6 text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
            Discover sports events across Ethiopia
          </h1>
          <p class="mt-5 max-w-2xl text-lg text-slate-200">
            Find upcoming football, basketball, and volleyball activities to play, compete, and connect with your community.
          </p>
        </div>
      </div>
    </section>

    <section class="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10">
      <div class="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
        <article
          v-for="item in events"
          :key="item.id"
          class="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg shadow-slate-200/60"
        >
          <img :src="item.image" :alt="item.title" class="h-56 w-full object-cover" />

          <div class="p-6">
            <div class="mb-3 flex items-center justify-between gap-3">
              <span class="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-bold text-emerald-700">
                {{ item.sport }}
              </span>
              <span class="text-sm font-medium text-slate-500">{{ item.date }}</span>
            </div>

            <h2 class="text-2xl font-bold text-slate-900">{{ item.title }}</h2>
            <p class="mt-3 text-sm leading-6 text-slate-600">{{ item.description }}</p>

            <div class="mt-5 space-y-2 text-sm text-slate-700">
              <p><strong>Time:</strong> {{ item.time }}</p>
              <p><strong>Location:</strong> {{ item.place }}</p>
            </div>

            <NuxtLink
              to="/justplay"
              class="mt-6 inline-flex items-center rounded-full bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-500 hover:text-slate-950"
            >
              Join the activity
            </NuxtLink>
          </div>
        </article>
      </div>
    </section>
  </div>
</template>
