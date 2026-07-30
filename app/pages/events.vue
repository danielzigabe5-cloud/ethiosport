<template>
  <div class="max-w-4xl mx-auto p-6 bg-white shadow-xl rounded-2xl border border-gray-100 my-8">
    <!-- Header Section (የክስተቱ ርዕስ እና ምድብ) -->
    <div class="relative">
      <img 
        :src="event.coverImage" 
        alt="Event Banner" 
        class="w-full h-64 object-cover rounded-xl shadow-sm"
      />
      <span class="absolute top-4 right-4 bg-blue-600 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow">
        {{ event.category }}
      </span>
    </div>

    <!-- Main Details (ዋና ዋና መረጃዎች) -->
    <div class="mt-6">
      <h1 class="text-3xl font-bold text-gray-900 mb-2">{{ event.title }}</h1>
      <p class="text-gray-600 text-sm mb-6 leading-relaxed">{{ event.description }}</p>

      <!-- Grid Information (ቀን፣ ቦታ፣ አደራጅ፣ እና ዋጋ) -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
        <!-- Date & Time (ቀን እና ሰዓት) -->
        <div class="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
          <div class="text-blue-600 font-bold">📅</div>
          <div>
            <h4 class="text-xs font-semibold text-gray-500 uppercase">ቀን እና ሰዓት</h4>
            <p class="text-sm font-medium text-gray-800">{{ event.date }} | {{ event.time }}</p>
          </div>
        </div>

        <!-- Location (ቦታ) -->
        <div class="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
          <div class="text-red-500 font-bold">📍</div>
          <div>
            <h4 class="text-xs font-semibold text-gray-500 uppercase">ቦታ</h4>
            <p class="text-sm font-medium text-gray-800">{{ event.location.venue }}, {{ event.location.city }}</p>
          </div>
        </div>

        <!-- Organizer (አዘጋጅ) -->
        <div class="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
          <div class="text-green-600 font-bold">👤</div>
          <div>
            <h4 class="text-xs font-semibold text-gray-500 uppercase">አዘጋጅ</h4>
            <p class="text-sm font-medium text-gray-800">{{ event.organizer.name }} ({{ event.organizer.contact }})</p>
          </div>
        </div>

        <!-- Price (ዋጋ) -->
        <div class="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
          <div class="text-yellow-600 font-bold">🎟️</div>
          <div>
            <h4 class="text-xs font-semibold text-gray-500 uppercase">የመግቢያ ዋጋ</h4>
            <p class="text-sm font-bold text-gray-900">{{ event.price > 0 ? `${event.price} ETB` : 'ነፃ (Free)' }}</p>
          </div>
        </div>
      </div>

      <!-- Agenda / Schedule (የፕሮግራም መርሃ ግብር) -->
      <div class="mt-8">
        <h3 class="text-xl font-bold text-gray-900 mb-4">የፕሮግራም መርሃ ግብር</h3>
        <div class="space-y-3">
          <div 
            v-for="(agenda, index) in event.schedules" 
            :key="index"
            class="flex items-center justify-between p-3 border-l-4 border-blue-600 bg-gray-50 rounded-r-lg"
          >
            <span class="font-semibold text-sm text-gray-700">{{ agenda.time }}</span>
            <span class="text-sm text-gray-800">{{ agenda.activity }}</span>
          </div>
        </div>
      </div>

      <!-- Action Button (የተመዝጋቢዎች/የቲኬት መቁረጫ ቁልፍ) -->
      <div class="mt-8 flex items-center justify-between border-t pt-6">
        <div>
          <span class="text-xs text-gray-500 block">የተቀሩ ቦታዎች</span>
          <span class="text-sm font-semibold text-red-600">{{ event.availableSeats }} ቦታዎች ብቻ ቀርተዋል!</span>
        </div>
        <button 
          @click="registerForEvent"
          class="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl shadow-md transition-all duration-200"
        >
          አሁኑኑ ተመዝገብ / ቲኬት ቁረጥ
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
// የEvent መረጃዎች (Data Structure)
const event = ref({
  id: 1,
  title: "የኢትዮጵያ ስፖርት እና ቴክኖሎጂ ኮንፈረንስ 2026",
  category: "ስፖርት & ቴክኖሎጂ",
  description: "በዚህ ዝግጅት ላይ በስፖርት ዘsector ውስጥ ያሉ አዳዲስ ዲጂታል ቴክኖሎጂዎች፣ የስታዲየም ማኔጅመንት እና የስፖርት ሜዲሲን ዙሪያ ሰፊ ውይይት ይደረጋል።",
  coverImage: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80",
  date: "ነሐሴ 15, 2018 ዓ.ም",
  time: "2:00 ከሰዓት - 11:00 ምሽት",
  location: {
    venue: "ሚሊኒየም አዳራሽ",
    city: "አዲስ አበባ"
  },
  organizer: {
    name: "EthioSport Tech Group",
    contact: "info@ethiosport.et"
  },
  price: 500, // 0 ከሆነ Free ይሆናል
  availableSeats: 45,
  schedules: [
    { time: "2:00 - 2:30", activity: "የእንግዶች አቀባበል እና ምዝገባ" },
    { time: "2:30 - 4:00", activity: "የመክፈቻ ንግግር እና የቴክኖሎጂ ማሳያ" },
    { time: "4:00 - 5:00", activity: "የፓናል ውይይት (Panel Discussion)" },
    { time: "5:00 - 6:00", activity: "የእራት እና የኔትወርኪንግ ጊዜ" }
  ]
})

const registerForEvent = () => {
  alert(`ለ "${event.value.title}" ዝግጅት ለመመዝገብ ወደ ክፍያ ገጽ በመሸጋገር ላይ...`)
}
</script>