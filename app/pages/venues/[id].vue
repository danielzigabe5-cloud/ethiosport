<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import img1 from '~/assets/images/venu1.jpg'
import img2 from '~/assets/images/venue2.jpg'
import img3 from '~/assets/images/venue3.jpg'
import img4 from '~/assets/images/venue4.jpg'
import img5 from '~/assets/images/venue5.jpg'
import img6 from '~/assets/images/venues6.jpg'
import img7 from '~/assets/images/venues7.jpg'
import img8 from '~/assets/images/venues8.jpg'
import img9 from '~/assets/images/venues9.jpg'
import img10 from '~/assets/images/venuess10.jpg'
import img11 from '~/assets/images/venuess11.jpg'
import img12 from '~/assets/images/venuess12.png'
import img13 from '~/assets/images/venuess13.jpg'
import img14 from '~/assets/images/venuess14.jpg'

const route = useRoute()
const router = useRouter()
const venueId = Number(route.params.id)

const isEditModalOpen = ref(false)
const editForm = ref({
  name: '',
  sportType: '',
  price: '',
  operatingHours: '',
  description: ''
})

const allVenues = ref([
  { id: 1, name: 'Yidnekachew Tessema Stadium', city: 'Addis Ababa', subCity: 'Kirkos', sportType: 'Football', price: '2500', image: img1, rating: 4.8, reviewsCount: 24, description: 'Yidnekachew Tessema Stadium is one of the premier sports facilities located in the heart of Kirkos, Addis Ababa. Ideal for professional matches, training sessions, and sports tournaments with full seating capacity and professional grass pitch.', amenities: ['Lighting system', 'Changing Rooms', 'Parking Area', 'Shower Facility', 'Spectator Seats'], operatingHours: '06:00 AM - 10:00 PM' },
  { id: 2, name: 'Abebe Bikila Stadium', city: 'Addis Ababa', subCity: 'Arada', sportType: 'Athletics', price: '1800', image: img2, rating: 4.5, reviewsCount: 18, description: 'Located in Arada, Abebe Bikila Stadium offers world-class running tracks and athletic event areas named after the legendary marathon runner Abebe Bikila.', amenities: ['Running Track', 'Changing Rooms', 'First Aid Station', 'Water Stations'], operatingHours: '06:00 AM - 08:00 PM' },
  { id: 3, name: 'Bahir Dar Stadium', city: 'Bahir Dar', subCity: 'Main Center', sportType: 'Football', price: '2000', image: img3, rating: 4.7, reviewsCount: 30, description: 'A modern stadium near Lake Tana in Bahir Dar. Offers standard pitch layout with surrounding scenic environment for athletic activities.', amenities: ['Grass Pitch', 'VIP Area', 'Cafeteria', 'Parking Area'], operatingHours: '07:00 AM - 09:00 PM' },
  { id: 4, name: 'Bole Atlas Field', city: 'Addis Ababa', subCity: 'Bole', sportType: 'Basketball', price: '1000', image: img4, rating: 4.3, reviewsCount: 12, description: 'Accessible basketball court located around Bole Atlas. Perfect for evening 3v3 or 5v5 pickup games with artificial lighting.', amenities: ['Night Lights', 'Restroom', 'Locker Room', 'Seating Bench'], operatingHours: '08:00 AM - 11:00 PM' },
  { id: 5, name: 'Mekelle Martyrs Stadium', city: 'Mekelle', subCity: 'Center', sportType: 'Football', price: '1500', image: img5, rating: 4.6, reviewsCount: 15, description: 'Spacious football venue with training fields.', amenities: ['Parking Area', 'Changing Rooms'], operatingHours: '06:00 AM - 08:00 PM' },
  { id: 6, name: 'Hawassa International Stadium', city: 'Hawassa', subCity: 'Lakeside', sportType: 'Athletics', price: '2200', image: img6, rating: 4.9, reviewsCount: 40, description: 'International standard athletic tracks in Hawassa.', amenities: ['Track', 'Showers', 'VIP Lounge'], operatingHours: '06:00 AM - 09:00 PM' },
  { id: 7, name: 'Dire Dawa Stadium', city: 'Dire Dawa', subCity: 'Center', sportType: 'Football', price: '1700', image: img7, rating: 4.2, reviewsCount: 10, description: 'Historical stadium with well-maintained pitch.', amenities: ['Seating Area', 'Restroom'], operatingHours: '07:00 AM - 08:00 PM' },
  { id: 8, name: 'Gonder Sports Arena', city: 'Bahir Dar', subCity: 'Gonder', sportType: 'Athletics', price: '1900', image: img8, rating: 4.4, reviewsCount: 14, description: 'Multi-purpose athletics arena.', amenities: ['Parking Area', 'Shower Facility'], operatingHours: '06:00 AM - 07:00 PM' },
  { id: 9, name: 'Jimma Athletics Field', city: 'Addis Ababa', subCity: 'Yeka', sportType: 'Athletics', price: '1600', image: img9, rating: 4.1, reviewsCount: 8, description: 'Great training arena in Yeka sub-city.', amenities: ['Locker Room', 'Night Lights'], operatingHours: '06:00 AM - 09:00 PM' },
  { id: 10, name: 'Harar Football Field', city: 'Dire Dawa', subCity: 'Harar', sportType: 'Football', price: '1400', image: img10, rating: 4.0, reviewsCount: 6, description: 'Local community football pitch.', amenities: ['Changing Rooms'], operatingHours: '07:00 AM - 07:00 PM' },
  { id: 11, name: 'Addis Ababa Basketball Arena', city: 'Addis Ababa', subCity: 'Lideta', sportType: 'Basketball', price: '1200', image: img11, rating: 4.7, reviewsCount: 22, description: 'Indoor basketball court with wooden flooring.', amenities: ['Indoor Airing', 'Scoreboard', 'Showers'], operatingHours: '08:00 AM - 10:00 PM' },
  { id: 12, name: 'Ethiopia International Stadium', city: 'Addis Ababa', subCity: 'Kirkos', sportType: 'Athletics', price: '3000', image: img12, rating: 4.9, reviewsCount: 50, description: 'Top tier international arena.', amenities: ['Full Amenities', 'VIP Box', 'Press Room'], operatingHours: '05:00 AM - 11:00 PM' },
  { id: 13, name: 'Arba Minch Sports Complex', city: 'Hawassa', subCity: 'Arba Minch', sportType: 'Football', price: '2100', image: img13, rating: 4.6, reviewsCount: 19, description: 'Complex for sports and tournaments.', amenities: ['Parking Area', 'Cafeteria'], operatingHours: '06:00 AM - 09:00 PM' },
  { id: 14, name: 'Bole Resort Sports Field', city: 'Addis Ababa', subCity: 'Bole', sportType: 'Basketball', price: '2500', image: img14, rating: 4.8, reviewsCount: 35, description: 'Resort standard sports ground.', amenities: ['Swimming Pool Access', 'Restaurant', 'Night Lights'], operatingHours: '07:00 AM - 11:00 PM' }
])

const venue = computed(() => allVenues.value.find((v) => v.id === venueId) || allVenues.value[0])

const formatPrice = (price: string | number) => {
  const numericValue = typeof price === 'string' ? Number(price) : price
  return Number.isFinite(numericValue) ? `${numericValue.toLocaleString()} Birr / hour` : `${price} Birr / hour`
}

const openEditModal = () => {
  if (venue.value) {
    editForm.value = {
      name: venue.value.name,
      sportType: venue.value.sportType,
      price: venue.value.price,
      operatingHours: venue.value.operatingHours,
      description: venue.value.description
    }
    isEditModalOpen.value = true
  }
}

const handleSaveEdit = () => {
  const targetVenue = allVenues.value.find((v) => v.id === venue.value.id)

  if (targetVenue) {
    targetVenue.name = editForm.value.name.trim()
    targetVenue.sportType = editForm.value.sportType.trim()
    targetVenue.price = String(editForm.value.price)
    targetVenue.operatingHours = editForm.value.operatingHours.trim()
    targetVenue.description = editForm.value.description.trim()
  }

  isEditModalOpen.value = false
  alert('የስታዲየሙ መረጃ በተሳካ ሁኔታ ተሻሽሏል!')
}

const handleDeleteVenue = () => {
  const confirmDelete = confirm(`እርግጠኛ ነዎት "${venue.value.name}" ማጥፋት ይፈልጋሉ?`)

  if (!confirmDelete) {
    return
  }

  const index = allVenues.value.findIndex((v) => v.id === venue.value.id)

  if (index !== -1) {
    allVenues.value.splice(index, 1)
    alert('ስታዲየሙ ተሰርዟል!')
    router.push('/')
  }
}
</script>

<template>
  <div v-if="venue" class="min-h-screen w-full bg-slate-50 dark:bg-gray-950 py-8 px-4 sm:px-8 lg:px-12">
    <div class="max-w-6xl mx-auto">
      <!-- Top Navigation and Actions -->
      <div class="flex flex-wrap items-center justify-between gap-4 mb-6">
        <NuxtLink to="/" class="inline-flex items-center text-green-700 dark:text-green-400 font-semibold hover:underline transition-all">
          <svg class="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
          </svg>
          Back to Venues
        </NuxtLink>

        <div class="flex items-center gap-3">
          <button
            @click="openEditModal"
            class="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-sm font-semibold transition-all shadow-md flex items-center gap-1.5"
          >
            ✏️ Edit Venue
          </button>
          <button
            @click="handleDeleteVenue"
            class="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-sm font-semibold transition-all shadow-md flex items-center gap-1.5"
          >
            🗑️ Delete Venue
          </button>
        </div>
      </div>

      <!-- Main Layout -->
      <div class="grid grid-cols-1 xl:grid-cols-[1.7fr_0.9fr] gap-8">
        <!-- Left Column: Primary Details -->
        <div class="space-y-6">
          <div class="relative h-80 sm:h-[28rem] w-full rounded-[2rem] overflow-hidden shadow-lg bg-gray-200">
            <img :src="venue.image" :alt="venue.name" class="w-full h-full object-cover" />
            <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"></div>
            <div class="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-semibold text-white uppercase tracking-wider">
              {{ venue.sportType }}
            </div>
            <div class="absolute bottom-4 right-4 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md px-4 py-2 rounded-2xl text-lg font-bold text-green-700 dark:text-green-400 shadow-md">
              {{ formatPrice(venue.price) }}
            </div>
          </div>

          <div class="bg-white dark:bg-gray-900 rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100 dark:border-gray-800">
            <div class="flex flex-wrap justify-between items-start gap-4 mb-4">
              <div>
                <div class="inline-flex items-center rounded-full bg-green-100 text-green-700 px-3 py-1 text-xs font-semibold uppercase tracking-wide mb-3">
                  Featured venue
                </div>
                <h1 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">{{ venue.name }}</h1>
                <p class="text-gray-500 dark:text-gray-400 flex items-center text-sm sm:text-base">
                  <svg class="w-5 h-5 mr-1 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                  {{ venue.city }}{{ venue.subCity ? ', ' + venue.subCity : '' }}
                </p>
              </div>

              <div class="flex items-center bg-yellow-50 dark:bg-yellow-900/20 px-3 py-1.5 rounded-2xl border border-yellow-200 dark:border-yellow-800">
                <span class="text-yellow-500 text-lg mr-1">★</span>
                <span class="font-bold text-gray-800 dark:text-yellow-400 text-sm">{{ venue.rating }}</span>
                <span class="text-gray-400 text-xs ml-1">({{ venue.reviewsCount }} reviews)</span>
              </div>
            </div>

            <div class="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
              <div class="rounded-2xl bg-gray-50 dark:bg-gray-800 p-4 border border-gray-100 dark:border-gray-700">
                <p class="text-[11px] uppercase tracking-wide text-gray-500 dark:text-gray-400">Sport</p>
                <p class="mt-2 text-sm font-bold text-gray-900 dark:text-white">{{ venue.sportType }}</p>
              </div>
              <div class="rounded-2xl bg-gray-50 dark:bg-gray-800 p-4 border border-gray-100 dark:border-gray-700">
                <p class="text-[11px] uppercase tracking-wide text-gray-500 dark:text-gray-400">City</p>
                <p class="mt-2 text-sm font-bold text-gray-900 dark:text-white">{{ venue.city }}</p>
              </div>
              <div class="rounded-2xl bg-gray-50 dark:bg-gray-800 p-4 border border-gray-100 dark:border-gray-700">
                <p class="text-[11px] uppercase tracking-wide text-gray-500 dark:text-gray-400">Rate</p>
                <p class="mt-2 text-sm font-bold text-gray-900 dark:text-white">{{ formatPrice(venue.price) }}</p>
              </div>
              <div class="rounded-2xl bg-gray-50 dark:bg-gray-800 p-4 border border-gray-100 dark:border-gray-700">
                <p class="text-[11px] uppercase tracking-wide text-gray-500 dark:text-gray-400">Open</p>
                <p class="mt-2 text-sm font-bold text-gray-900 dark:text-white">{{ venue.operatingHours }}</p>
              </div>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="bg-white dark:bg-gray-900 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-gray-800">
              <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-3">About this venue</h3>
              <p class="text-gray-600 dark:text-gray-300 leading-relaxed text-sm sm:text-base">
                {{ venue.description }}
              </p>
            </div>

            <div class="bg-white dark:bg-gray-900 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-gray-800">
              <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-4">Amenities & facilities</h3>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="(item, index) in venue.amenities"
                  :key="index"
                  class="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium"
                >
                  ✓ {{ item }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Column: Replaced Booking Form with Full Information Card -->
        <aside class="space-y-6">
          <div class="bg-white dark:bg-gray-900 rounded-3xl p-6 sm:p-8 shadow-xl border border-gray-100 dark:border-gray-800 sticky top-8">
            <div class="flex items-center justify-between gap-3 mb-6 border-b border-gray-100 dark:border-gray-800 pb-4">
              <h2 class="text-xl font-bold text-gray-900 dark:text-white">Venue Details</h2>
              <span class="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">Active</span>
            </div>

            <div class="space-y-4">
              <div class="rounded-2xl bg-gray-50 dark:bg-gray-800 p-4 border border-gray-100 dark:border-gray-700">
                <span class="text-xs uppercase font-semibold text-gray-400 dark:text-gray-500 block mb-1">Location Info</span>
                <p class="text-sm font-bold text-gray-800 dark:text-gray-200">
                  📍 {{ venue.city }}{{ venue.subCity ? ` (${venue.subCity} Sub-city)` : '' }}
                </p>
              </div>

              <div class="rounded-2xl bg-gray-50 dark:bg-gray-800 p-4 border border-gray-100 dark:border-gray-700">
                <span class="text-xs uppercase font-semibold text-gray-400 dark:text-gray-500 block mb-1">Operating Hours</span>
                <p class="text-sm font-bold text-gray-800 dark:text-gray-200">
                  ⏰ {{ venue.operatingHours }}
                </p>
              </div>

              <div class="rounded-2xl bg-gray-50 dark:bg-gray-800 p-4 border border-gray-100 dark:border-gray-700">
                <span class="text-xs uppercase font-semibold text-gray-400 dark:text-gray-500 block mb-1">Rental Rate</span>
                <p class="text-sm font-bold text-green-700 dark:text-green-400">
                  💳 {{ formatPrice(venue.price) }}
                </p>
              </div>

              <div class="rounded-2xl bg-gray-50 dark:bg-gray-800 p-4 border border-gray-100 dark:border-gray-700">
                <span class="text-xs uppercase font-semibold text-gray-400 dark:text-gray-500 block mb-1">Sport Type</span>
                <p class="text-sm font-bold text-gray-800 dark:text-gray-200">
                  ⚽ {{ venue.sportType }}
                </p>
              </div>
            </div>

            <div class="mt-6 rounded-2xl bg-green-50 dark:bg-green-950/30 border border-green-100 dark:border-green-900/50 p-4 text-center">
              <p class="text-xs text-green-800 dark:text-green-300 font-medium leading-relaxed">
                ለበለጠ መረጃ እና ለቅድመ ማስያዝ ወደ ስታዲየሙ ዋና አስተዳደር በአካል ወይም በስልክ መስመር መጠየቅ ይችላሉ።
              </p>
            </div>
          </div>
        </aside>
      </div>
    </div>

    <!-- Edit Modal Component -->
    <div v-if="isEditModalOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div class="bg-white dark:bg-gray-900 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-gray-200 dark:border-gray-800">
        <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Edit venue details</h2>

        <form @submit.prevent="handleSaveEdit" class="space-y-4">
          <div>
            <label class="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">Venue name</label>
            <input v-model="editForm.name" type="text" required class="w-full bg-gray-50 dark:bg-gray-800 border rounded-xl px-4 py-2.5 text-sm text-gray-900 dark:text-white" />
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">Sport type</label>
              <input v-model="editForm.sportType" type="text" required class="w-full bg-gray-50 dark:bg-gray-800 border rounded-xl px-4 py-2.5 text-sm text-gray-900 dark:text-white" />
            </div>
            <div>
              <label class="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">Price (Birr/hour)</label>
              <input v-model="editForm.price" type="number" required class="w-full bg-gray-50 dark:bg-gray-800 border rounded-xl px-4 py-2.5 text-sm text-gray-900 dark:text-white" />
            </div>
          </div>

          <div>
            <label class="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">Operating hours</label>
            <input v-model="editForm.operatingHours" type="text" required class="w-full bg-gray-50 dark:bg-gray-800 border rounded-xl px-4 py-2.5 text-sm text-gray-900 dark:text-white" />
          </div>

          <div>
            <label class="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">Description</label>
            <textarea v-model="editForm.description" rows="3" required class="w-full bg-gray-50 dark:bg-gray-800 border rounded-xl px-4 py-2.5 text-sm text-gray-900 dark:text-white"></textarea>
          </div>

          <div class="flex justify-end gap-3 pt-3">
            <button type="button" @click="isEditModalOpen = false" class="px-5 py-2.5 bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl text-sm font-semibold">
              Cancel
            </button>
            <button type="submit" class="px-5 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-xl text-sm font-semibold">
              Save changes
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>