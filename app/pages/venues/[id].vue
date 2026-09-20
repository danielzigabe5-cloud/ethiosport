<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

// Import images
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

// State for Booking Form
const bookingDate = ref('')
const bookingTime = ref('')
const isBooked = ref(false)

// State for Edit Modal & Form
const isEditModalOpen = ref(false)
const editForm = ref({
  name: '',
  sportType: '',
  price: '',
  operatingHours: '',
  description: ''
})

// All Venues Reactive Mock Data
const allVenues = ref([
  { 
    id: 1, 
    name: 'Yidnekachew Tessema Stadium', 
    city: 'Addis Ababa', 
    subCity: 'Kirkos', 
    sportType: 'Football', 
    price: '2500', 
    image: img1,
    rating: 4.8,
    reviewsCount: 24,
    description: 'Yidnekachew Tessema Stadium is one of the premier sports facilities located in the heart of Kirkos, Addis Ababa. Ideal for professional matches, training sessions, and sports tournaments with full seating capacity and professional grass pitch.',
    amenities: ['Lighting system', 'Changing Rooms', 'Parking Area', 'Shower Facility', 'Spectator Seats'],
    operatingHours: '06:00 AM - 10:00 PM'
  },
  { 
    id: 2, 
    name: 'Abebe Bikila Stadium', 
    city: 'Addis Ababa', 
    subCity: 'Arada', 
    sportType: 'Athletics', 
    price: '1800', 
    image: img2,
    rating: 4.5,
    reviewsCount: 18,
    description: 'Located in Arada, Abebe Bikila Stadium offers world-class running tracks and athletic event areas named after the legendary marathon runner Abebe Bikila.',
    amenities: ['Running Track', 'Changing Rooms', 'First Aid Station', 'Water Stations'],
    operatingHours: '06:00 AM - 08:00 PM'
  },
  { 
    id: 3, 
    name: 'Bahir Dar Stadium', 
    city: 'Bahir Dar', 
    subCity: 'Main Center', 
    sportType: 'Football', 
    price: '2000', 
    image: img3,
    rating: 4.7,
    reviewsCount: 30,
    description: 'A modern stadium near Lake Tana in Bahir Dar. Offers standard pitch layout with surrounding scenic environment for athletic activities.',
    amenities: ['Grass Pitch', 'VIP Area', 'Cafeteria', 'Parking Area'],
    operatingHours: '07:00 AM - 09:00 PM'
  },
  { 
    id: 4, 
    name: 'Bole Atlas Field', 
    city: 'Addis Ababa', 
    subCity: 'Bole', 
    sportType: 'Basketball', 
    price: '1000', 
    image: img4,
    rating: 4.3,
    reviewsCount: 12,
    description: 'Accessible basketball court located around Bole Atlas. Perfect for evening 3v3 or 5v5 pickup games with artificial lighting.',
    amenities: ['Night Lights', 'Restroom', 'Locker Room', 'Seating Bench'],
    operatingHours: '08:00 AM - 11:00 PM'
  },
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

// Get current venue computed
const venue = computed(() => {
  return allVenues.value.find(v => v.id === venueId) || allVenues.value[0]
})

// Action 1: Handle Booking -> Redirect to App Download
const handleBooking = () => {
  isBooked.value = true
  
  // ከ 1.5 ሰከንድ በኋላ ወደ Download App ገጽ ወይም ሊንክ ይወስደዋል
  setTimeout(() => {
    // እዚህ ጋር የእርስዎን App Download Page Link ወይም Route ያስገቡ
    window.location.href = 'https://play.google.com/store' // ወይም router.push('/download-app')
  }, 1500)
}

// Action 2: Open Edit Modal
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

// Save Edited Venue Data
const handleSaveEdit = () => {
  const targetVenue = allVenues.value.find(v => v.id === venue.value.id)
  if (targetVenue) {
    targetVenue.name = editForm.value.name
    targetVenue.sportType = editForm.value.sportType
    targetVenue.price = editForm.value.price
    targetVenue.operatingHours = editForm.value.operatingHours
    targetVenue.description = editForm.value.description
  }
  isEditModalOpen.value = false
  alert('የስታዲየሙ መረጃ በተሳካ ሁኔታ ተሻሽሏል!')
}

// Action 3: Handle Delete Venue
const handleDeleteVenue = () => {
  const confirmDelete = confirm(`እርግጠኛ ነዎት "${venue.value.name}" ማጥፋት ይፈልጋሉ?`)
  if (confirmDelete) {
    const index = allVenues.value.findIndex(v => v.id === venue.value.id)
    if (index !== -1) {
      allVenues.value.splice(index, 1)
      alert('ስታዲየሙ ተሰርዟል!')
      router.push('/') // ወደ ዋናው ገጽ ይመልሰዋል
    }
  }
}
</script>

<template>
  <div class="min-h-screen w-full bg-slate-50 dark:bg-gray-950 py-8 px-4 sm:px-8 lg:px-12">
    <div class="max-w-6xl mx-auto">
      
      <!-- Top Bar: Back Link & Admin Action Buttons -->
      <div class="flex flex-wrap items-center justify-between gap-4 mb-6">
        <NuxtLink to="/" class="inline-flex items-center text-green-700 dark:text-green-400 font-semibold hover:underline transition-all">
          <svg class="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
          </svg>
          Back to Venues
        </NuxtLink>

        <!-- Edit & Delete Action Buttons -->
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

      <!-- Main Layout Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <!-- Left: Details & Media (2 Columns) -->
        <div class="lg:col-span-2 space-y-6">
          
          <!-- Image Header -->
          <div class="relative h-80 sm:h-96 w-full rounded-3xl overflow-hidden shadow-lg bg-gray-200">
            <img :src="venue.image" :alt="venue.name" class="w-full h-full object-cover" />
            <div class="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-semibold text-white uppercase tracking-wider">
              {{ venue.sportType }}
            </div>
            <div class="absolute bottom-4 right-4 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md px-4 py-2 rounded-2xl text-lg font-bold text-green-700 dark:text-green-400 shadow-md">
              {{ venue.price }} Birr / Hour
            </div>
          </div>

          <!-- Overview Card -->
          <div class="bg-white dark:bg-gray-900 rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100 dark:border-gray-800">
            <div class="flex flex-wrap justify-between items-start gap-4 mb-4">
              <div>
                <h1 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">{{ venue.name }}</h1>
                <p class="text-gray-500 dark:text-gray-400 flex items-center text-sm sm:text-base">
                  <svg class="w-5 h-5 mr-1 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                  {{ venue.city }}{{ venue.subCity ? ', ' + venue.subCity : '' }}
                </p>
              </div>

              <!-- Rating Badge -->
              <div class="flex items-center bg-yellow-50 dark:bg-yellow-900/20 px-3 py-1.5 rounded-2xl border border-yellow-200 dark:border-yellow-800">
                <span class="text-yellow-500 text-lg mr-1">★</span>
                <span class="font-bold text-gray-800 dark:text-yellow-400 text-sm">{{ venue.rating }}</span>
                <span class="text-gray-400 text-xs ml-1">({{ venue.reviewsCount }} reviews)</span>
              </div>
            </div>

            <hr class="my-6 border-gray-100 dark:border-gray-800" />

            <!-- Description -->
            <div class="mb-6">
              <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-2">About this Venue</h3>
              <p class="text-gray-600 dark:text-gray-300 leading-relaxed text-sm sm:text-base">
                {{ venue.description }}
              </p>
            </div>

            <!-- Operating Hours -->
            <div class="mb-6 bg-green-50/50 dark:bg-green-950/30 p-4 rounded-2xl border border-green-100 dark:border-green-900/50 flex items-center">
              <svg class="w-6 h-6 text-green-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <div>
                <p class="text-xs text-gray-500 dark:text-gray-400 uppercase font-semibold">Opening Hours</p>
                <p class="text-sm font-bold text-gray-800 dark:text-gray-200">{{ venue.operatingHours }}</p>
              </div>
            </div>

            <!-- Amenities -->
            <div>
              <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-3">Amenities & Facilities</h3>
              <div class="flex flex-wrap gap-2">
                <span 
                  v-for="(item, index) in venue.amenities" 
                  :key="index"
                  class="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-medium"
                >
                  ✓ {{ item }}
                </span>
              </div>
            </div>

          </div>
        </div>

        <!-- Right: Booking Form Sidebar (1 Column) -->
        <div class="space-y-6">
          <div class="bg-white dark:bg-gray-900 rounded-3xl p-6 sm:p-8 shadow-xl border border-gray-100 dark:border-gray-800 sticky top-8">
            <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-2">Book This Venue</h2>
            <p class="text-xs text-gray-500 dark:text-gray-400 mb-6">Select your preferred date and time slot.</p>

            <!-- Success Alert -->
            <div v-if="isBooked" class="mb-6 p-4 bg-green-100 border border-green-300 text-green-800 rounded-2xl text-xs sm:text-sm">
              🚀 <strong>Redirecting to App...</strong> Booking continues on our mobile app!
            </div>

            <form @submit.prevent="handleBooking" class="space-y-4">
              <div>
                <label class="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">Select Date</label>
                <input 
                  v-model="bookingDate" 
                  type="date" 
                  required
                  class="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500" 
                />
              </div>

              <div>
                <label class="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">Select Time Slot</label>
                <select 
                  v-model="bookingTime" 
                  required
                  class="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="" disabled>Choose time</option>
                  <option value="08:00 AM - 09:00 AM">08:00 AM - 09:00 AM</option>
                  <option value="10:00 AM - 11:00 AM">10:00 AM - 11:00 AM</option>
                  <option value="02:00 PM - 03:00 PM">02:00 PM - 03:00 PM</option>
                  <option value="04:00 PM - 05:00 PM">04:00 PM - 05:00 PM</option>
                  <option value="06:00 PM - 07:00 PM">06:00 PM - 07:00 PM</option>
                </select>
              </div>

              <div class="pt-2">
                <button 
                  type="submit" 
                  class="w-full bg-green-600 hover:bg-green-700 text-white uppercase tracking-wider font-extrabold py-4 rounded-xl transition-all shadow-lg hover:shadow-green-600/30 text-sm flex items-center justify-center gap-2"
                >
                  <span>📱</span> Confirm & Download App
                </button>
              </div>
            </form>

            <div class="mt-6 text-center">
              <span class="text-xs text-gray-400">Need help? Contact venue support.</span>
            </div>
          </div>
        </div>

      </div>

    </div>

    <!-- Edit Venue Modal -->
    <div v-if="isEditModalOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div class="bg-white dark:bg-gray-900 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-gray-200 dark:border-gray-800">
        <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Edit Venue Details</h2>
        
        <form @submit.prevent="handleSaveEdit" class="space-y-4">
          <div>
            <label class="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">Venue Name</label>
            <input v-model="editForm.name" type="text" required class="w-full bg-gray-50 dark:bg-gray-800 border rounded-xl px-4 py-2.5 text-sm text-gray-900 dark:text-white" />
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">Sport Type</label>
              <input v-model="editForm.sportType" type="text" required class="w-full bg-gray-50 dark:bg-gray-800 border rounded-xl px-4 py-2.5 text-sm text-gray-900 dark:text-white" />
            </div>
            <div>
              <label class="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">Price (Birr/Hour)</label>
              <input v-model="editForm.price" type="number" required class="w-full bg-gray-50 dark:bg-gray-800 border rounded-xl px-4 py-2.5 text-sm text-gray-900 dark:text-white" />
            </div>
          </div>

          <div>
            <label class="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">Operating Hours</label>
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
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>

  </div>
</template>