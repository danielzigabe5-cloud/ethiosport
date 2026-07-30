<template>
  <div class="p-6 bg-gray-50 min-h-screen">
    <!-- Header Section -->
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">የክስተቶች (Events) ማኔጅመንት</h1>
        <p class="text-gray-500 text-sm">ሁሉንም Event-ዎች እዚህ ማስተዳደር፣ ማከል እና ማሻሻል ይችላሉ።</p>
      </div>
      <button 
        @click="openAddModal"
        class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl font-medium flex items-center gap-2 shadow-sm transition"
      >
        <span>➕</span> አዲስ Event ጨምር
      </button>
    </div>

    <!-- Quick Stats Overview -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
      <div class="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
        <span class="text-gray-500 text-xs font-semibold uppercase">ጠቅላላ Events</span>
        <p class="text-2xl font-bold text-gray-800 mt-1">{{ eventsList.length }}</p>
      </div>
      <div class="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
        <span class="text-gray-500 text-xs font-semibold uppercase">ንቁ (Active) Events</span>
        <p class="text-2xl font-bold text-green-600 mt-1">
          {{ eventsList.filter(e => e.status === 'Active').length }}
        </p>
      </div>
      <div class="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
        <span class="text-gray-500 text-xs font-semibold uppercase">ጠቅላላ የተሸጡ ቲኬቶች</span>
        <p class="text-2xl font-bold text-blue-600 mt-1">
          {{ eventsList.reduce((acc, curr) => acc + curr.ticketsSold, 0) }}
        </p>
      </div>
    </div>

    <!-- Events Table/List for Admin -->
    <div class="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
      <div class="p-4 border-b border-gray-100 flex items-center justify-between">
        <input 
          v-model="searchQuery"
          type="text" 
          placeholder="Event በስም ፈልግ..." 
          class="px-4 py-2 border rounded-lg text-sm w-full max-w-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-gray-50 border-b border-gray-200 text-xs font-semibold text-gray-500 uppercase">
              <th class="p-4">Event</th>
              <th class="p-4">ቀን እና ቦታ</th>
              <th class="p-4">ዋጋ</th>
              <th class="p-4">የተሸጡ/የቀሩ</th>
              <th class="p-4">ሁኔታ (Status)</th>
              <th class="p-4 text-right">ድርጊት (Actions)</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100 text-sm">
            <tr v-for="item in filteredEvents" :key="item.id" class="hover:bg-gray-50/50 transition">
              <!-- Title & Banner -->
              <td class="p-4">
                <div class="flex items-center gap-3">
                  <img :src="item.coverImage" class="w-12 h-12 rounded-lg object-cover" alt="Banner" />
                  <div>
                    <h4 class="font-bold text-gray-900 leading-tight">{{ item.title }}</h4>
                    <span class="text-xs text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full mt-1 inline-block">
                      {{ item.category }}
                    </span>
                  </div>
                </div>
              </td>

              <!-- Date & Location -->
              <td class="p-4">
                <p class="font-medium text-gray-800">{{ item.date }}</p>
                <p class="text-xs text-gray-500">{{ item.location.venue }}, {{ item.location.city }}</p>
              </td>

              <!-- Price -->
              <td class="p-4 font-semibold text-gray-900">
                {{ item.price > 0 ? `${item.price} ETB` : 'Free' }}
              </td>

              <!-- Tickets -->
              <td class="p-4">
                <span class="text-green-600 font-semibold">{{ item.ticketsSold }}</span> / 
                <span class="text-gray-500">{{ item.availableSeats }} ቀሩ</span>
              </td>

              <!-- Status -->
              <td class="p-4">
                <span 
                  :class="item.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'"
                  class="px-2.5 py-1 rounded-full text-xs font-medium"
                >
                  {{ item.status }}
                </span>
              </td>

              <!-- Actions -->
              <td class="p-4 text-right">
                <div class="flex items-center justify-end gap-2">
                  <button @click="editEvent(item)" class="p-2 text-blue-600 hover:bg-blue-50 rounded-lg" title="Edit">
                    ✏️
                  </button>
                  <button @click="deleteEvent(item.id)" class="p-2 text-red-600 hover:bg-red-50 rounded-lg" title="Delete">
                    🗑️
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
// Admin Dashboard Layout ን እንዲጠቀም ማድረግ
definePageMeta({
  layout: 'admin-dashboard'
})

const searchQuery = ref('')

// Admin የሚያስተዳድራቸው Events ዝርዝር
const eventsList = ref([
  {
    id: 1,
    title: "የኢትዮጵያ ስፖርት እና ቴክኖሎጂ ኮንፈረንስ 2026",
    category: "ስፖርት & ቴክኖሎጂ",
    description: "በስፖርት ዘዘክተር ውስጥ ያሉ አዳዲስ ዲጂታል ቴክኖሎጂዎች...",
    coverImage: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80",
    date: "ነሐሴ 15, 2018",
    time: "2:00 ከሰዓት",
    location: { venue: "ሚሊኒየም አዳራሽ", city: "አዲስ አበባ" },
    organizer: { name: "EthioSport Tech", contact: "info@ethiosport.et" },
    price: 500,
    availableSeats: 45,
    ticketsSold: 155,
    status: 'Active'
  }
])

// Search Filter Functionality
const filteredEvents = computed(() => {
  return eventsList.value.filter(e => 
    e.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    e.category.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

// Action Handlers
const openAddModal = () => {
  alert("አዲስ Event መመዝገቢያ Form (Modal) እዚህ ይከፈታል")
}

const editEvent = (item) => {
  alert(`"${item.title}" ን ለማስተካከል Form ይከፈታል`)
}

const deleteEvent = (id) => {
  if (confirm("እርግጠኛ ነዎት ይህንን Event ማጥፋት ይፈልጋሉ?")) {
    eventsList.value = eventsList.value.filter(e => e.id !== id)
  }
}
</script>