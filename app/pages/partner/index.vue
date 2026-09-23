<script setup lang="ts">
import { ref } from 'vue'

definePageMeta({
  layout: 'partner'
})

// Stats Data
const stats = ref([
  { title: "Today's Bookings", value: '6', change: '+ 2 vs yesterday', iconClass: 'text-blue-500 bg-blue-50', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
  { title: 'Total Bookings (This Month)', value: '128', change: '+ 18%', iconClass: 'text-emerald-500 bg-emerald-50', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' },
  { title: 'Active Events', value: '3', change: '+ 2 upcoming', iconClass: 'text-purple-500 bg-purple-50', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
  { title: 'Total Earnings (This Month)', value: 'ETB 152,400', change: '+ 22%', iconClass: 'text-amber-500 bg-amber-50', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z' }
])

// Upcoming Events
const upcomingEvents = ref([
  { id: 1, name: 'Weekend Futsal Tournament', date: 'Aug 24, 2026', time: '9:00 AM', status: 'Confirmed' },
  { id: 2, name: 'University League', date: 'Aug 25, 2026', time: '4:00 PM', status: 'Confirmed' },
  { id: 3, name: 'Community Game', date: 'Aug 26, 2026', time: '6:00 PM', status: 'Pending' }
])

// Recent Bookings
const recentBookings = ref([
  { id: 1, user: 'Mulugeta Tadesse', date: 'Aug 23, 2026', time: '10:00 - 11:00', status: 'Confirmed' },
  { id: 2, user: 'Sileshi Bekele', date: 'Aug 23, 2026', time: '12:00 - 13:00', status: 'Confirmed' },
  { id: 3, user: 'Daniel Girma', date: 'Aug 24, 2026', time: '14:00 - 15:00', status: 'Pending' }
])
</script>

<template>
  <div class="space-y-6">
    <!-- Welcome Header -->
    <div>
      <h1 class="text-xl font-extrabold text-slate-800 flex items-center gap-2">
        Welcome back, Abebe Kassa 👋
      </h1>
      <p class="text-xs text-slate-500 mt-0.5">Manage your venue, events and bookings from here.</p>
    </div>

    <!-- MAIN DASHBOARD CONTENT GRID (Left 3 columns, Right 1 column) -->
    <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
      
      <!-- LEFT 3-COLUMNS AREA -->
      <div class="lg:col-span-3 space-y-6">
        
        <!-- VENUE BANNER CARD -->
        <div class="bg-white rounded-2xl border border-slate-200 p-5 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div class="flex items-center gap-4">
            <img src="https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=300&auto=format&fit=crop&q=80" class="w-24 h-20 rounded-xl object-cover" alt="Sarbet Futsal" />
            <div>
              <div class="flex items-center gap-2">
                <h2 class="text-base font-bold text-slate-800">Sarbet Futsal</h2>
                <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700">● Active</span>
              </div>
              <p class="text-xs text-slate-500 mt-1 flex items-center gap-1">
                <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /></svg>
                Addis Ababa, Sarbet
              </p>
              <div class="text-xs text-slate-500 mt-1">⚽ Futsal Court</div>
              <div class="text-xs text-amber-500 font-bold mt-1">★ 4.8 (124 reviews)</div>
            </div>
          </div>

          <!-- Today's Earnings Box -->
          <div class="bg-slate-50 p-4 rounded-xl border border-slate-100 text-right w-full md:w-auto min-w-[180px]">
            <div class="text-[11px] text-slate-500 font-medium">Today's Earnings</div>
            <div class="text-xl font-black text-slate-800 mt-0.5">ETB 8,450</div>
            <div class="text-xs text-emerald-600 font-semibold mt-1">↑ 15%</div>
          </div>
        </div>

        <!-- 4 STAT CARDS -->
        <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          <div v-for="(stat, idx) in stats" :key="idx" class="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
            <div class="flex items-center justify-between">
              <span class="text-xs text-slate-500 font-medium max-w-[120px] leading-tight">{{ stat.title }}</span>
              <div :class="['p-2 rounded-xl', stat.iconClass]">
                <svg class="w-5 h-5 stroke-current" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" :d="stat.icon" />
                </svg>
              </div>
            </div>
            <div class="mt-3">
              <div class="text-xl font-bold text-slate-800">{{ stat.value }}</div>
              <div class="text-[11px] font-semibold text-emerald-600 mt-0.5">{{ stat.change }}</div>
            </div>
          </div>
        </div>

        <!-- TABLES GRID (Upcoming Events & Recent Bookings) -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <!-- Upcoming Events -->
          <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div class="flex items-center justify-between">
              <h3 class="text-sm font-bold text-slate-800">Upcoming Events</h3>
              <NuxtLink to="/partner/events" class="text-xs text-emerald-600 font-semibold hover:underline">View all</NuxtLink>
            </div>
            
            <div class="space-y-3">
              <div v-for="event in upcomingEvents" :key="event.id" class="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between text-xs">
                <div>
                  <div class="font-bold text-slate-800">{{ event.name }}</div>
                  <div class="text-[11px] text-slate-500 mt-0.5">{{ event.date }} · {{ event.time }}</div>
                </div>
                <span :class="event.status === 'Confirmed' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'" class="px-2 py-1 rounded-md text-[10px] font-bold">
                  {{ event.status }}
                </span>
              </div>
            </div>
          </div>

          <!-- Recent Bookings -->
          <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div class="flex items-center justify-between">
              <h3 class="text-sm font-bold text-slate-800">Recent Bookings</h3>
              <NuxtLink to="/partner/bookings" class="text-xs text-emerald-600 font-semibold hover:underline">View all</NuxtLink>
            </div>

            <div class="space-y-3">
              <div v-for="booking in recentBookings" :key="booking.id" class="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between text-xs">
                <div>
                  <div class="font-bold text-slate-800">{{ booking.user }}</div>
                  <div class="text-[11px] text-slate-500 mt-0.5">{{ booking.date }} · {{ booking.time }}</div>
                </div>
                <span :class="booking.status === 'Confirmed' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'" class="px-2 py-1 rounded-md text-[10px] font-bold">
                  {{ booking.status }}
                </span>
              </div>
            </div>
          </div>

        </div>

      </div>

      <!-- RIGHT 1-COLUMN AREA (Quick Actions & Support) -->
      <div class="space-y-6">
        
        <!-- VENUE CARD PREVIEW -->
        <div class="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
          <img src="https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=500&auto=format&fit=crop&q=80" class="w-full h-32 object-cover" alt="Venue" />
          <div class="p-4 space-y-3">
            <div class="flex items-center justify-between">
              <h3 class="font-bold text-slate-800 text-sm">Sarbet Futsal</h3>
              <span class="text-[10px] bg-emerald-100 text-emerald-700 font-bold px-2 py-0.5 rounded-full">● Active</span>
            </div>
            <p class="text-xs text-slate-500">Futsal Court</p>

            <!-- Action Buttons -->
            <div class="space-y-2 pt-2">
              <button class="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1">
                <span>+</span> Add Event
              </button>
              <NuxtLink to="/partner/bookings" class="block text-center w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition">
                View Bookings
              </NuxtLink>
              <NuxtLink to="/partner/venue" class="block text-center w-full py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-bold transition">
                Manage Venue
              </NuxtLink>
            </div>
          </div>
        </div>

        <!-- NEED HELP CARD -->
        <div class="bg-emerald-50 border border-emerald-100 rounded-2xl p-4 space-y-2">
          <div class="flex items-center gap-2 font-bold text-slate-800 text-xs">
            <svg class="w-4 h-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
            Need help?
          </div>
          <p class="text-[11px] text-slate-600 leading-relaxed">
            Contact support for any issues or questions.
          </p>
          <NuxtLink to="/partner/support" class="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 hover:underline pt-1">
            Get Support →
          </NuxtLink>
        </div>

      </div>

    </div>
  </div>
</template>