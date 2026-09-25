<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

definePageMeta({ 
  layout: 'admin'
})

// State
const isLoading = ref(false)
const isRefreshing = ref(false)
const apiError = ref<string | null>(null)

// Current Date formatted
const currentDate = computed(() => {
  return new Date().toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
})

const formatNumber = (num: number) => {
  return new Intl.NumberFormat('en-US').format(num || 0)
}

const dashboardData = ref({
  stats: {
    venues: { total: 12, growth: 8 },
    events: { total: 48, growth: 12 },
    bookings: { total: 236, growth: 18 },
    users: { total: 1248, growth: 22 }
  },
  venueTypes: [
    { label: 'Football Field', count: 5, color: 'bg-emerald-500' },
    { label: 'Futsal Court', count: 3, color: 'bg-blue-500' },
    { label: 'Basketball Court', count: 2, color: 'bg-amber-500' },
    { label: 'Volleyball Court', count: 1, color: 'bg-purple-500' },
    { label: 'Others', count: 1, color: 'bg-slate-300' }
  ],
  recentActivities: [
    { id: 1, title: 'New booking received', subtitle: 'Bole Futsal Court', time: '2 minutes ago', icon: '📅', color: 'text-emerald-600 bg-emerald-100' },
    { id: 2, title: 'New user registered', subtitle: 'Tesfaye Bekele', time: '12 minutes ago', icon: '👤', color: 'text-blue-600 bg-blue-100' },
    { id: 3, title: 'Partner application', subtitle: 'Shoe Sport Center', time: '26 minutes ago', icon: '🤝', color: 'text-amber-600 bg-amber-100' },
    { id: 4, title: 'New event created', subtitle: 'Summer Football League', time: '1 hour ago', icon: '🏆', color: 'text-purple-600 bg-purple-100' },
    { id: 5, title: 'Venue updated', subtitle: 'Arat Kilo Stadium', time: '2 hours ago', icon: '🏟️', color: 'text-emerald-600 bg-emerald-100' }
  ],
  topVenues: [
    { id: 1, name: 'Bole Futsal Court', type: 'Futsal', bookings: 48, status: 'Active' },
    { id: 2, name: 'Meskel Stadium', type: 'Football', bookings: 42, status: 'Active' },
    { id: 3, name: 'Sarbet Futsal', type: 'Futsal', bookings: 36, status: 'Active' },
    { id: 4, name: 'Ayer Tena Sports Complex', type: 'Football', bookings: 28, status: 'Active' },
    { id: 5, name: 'Addis Indoor Court', type: 'Basketball', bookings: 24, status: 'Active' }
  ]
})

const refreshData = async () => {
  isRefreshing.value = true
  setTimeout(() => {
    isRefreshing.value = false
  }, 1000)
}

onMounted(() => {
  // Logic to fetch actual data
})
</script>

<template>
  <div class="p-2 sm:p-6 lg:p-8 font-sans text-slate-800">
    
    <!-- PAGE HEADER -->
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-4">
      <div>
        <h1 class="text-2xl font-bold text-slate-900 tracking-tight">Welcome back, Admin 👋</h1>
        <p class="text-sm text-slate-500 mt-1">Here's what's happening with your platform today.</p>
      </div>

      <div class="flex items-center gap-2 text-sm text-slate-500 font-medium bg-white px-3 py-1.5 rounded-lg border border-slate-200">
        <span class="text-slate-400">📅</span>
        {{ currentDate }}
      </div>
    </div>

    <!-- API ERROR -->
    <div v-if="apiError" class="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 flex items-center justify-between text-rose-700 text-xs shadow-sm">
      <span>⚠️ {{ apiError }}</span>
      <button @click="refreshData" class="underline font-bold hover:text-rose-900">Retry</button>
    </div>

    <!-- STATS CARDS -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      
      <!-- Total Venues -->
      <div class="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-4">
        <div class="w-14 h-14 rounded-xl bg-emerald-50 text-emerald-500 flex items-center justify-center text-2xl">
          🏟️
        </div>
        <div class="flex-1">
          <h3 class="text-xs font-bold text-slate-500 uppercase tracking-wide">Total Venues</h3>
          <div class="flex items-end justify-between mt-1">
            <span class="text-2xl font-black text-slate-900">{{ dashboardData.stats.venues.total }}</span>
            <div class="text-right">
              <span class="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded flex items-center gap-0.5">
                ↑ {{ dashboardData.stats.venues.growth }}%
              </span>
              <span class="text-[9px] text-slate-400 block mt-0.5">vs. last month</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Total Events -->
      <div class="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-4">
        <div class="w-14 h-14 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center text-2xl">
          📅
        </div>
        <div class="flex-1">
          <h3 class="text-xs font-bold text-slate-500 uppercase tracking-wide">Total Events</h3>
          <div class="flex items-end justify-between mt-1">
            <span class="text-2xl font-black text-slate-900">{{ dashboardData.stats.events.total }}</span>
            <div class="text-right">
              <span class="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded flex items-center gap-0.5">
                ↑ {{ dashboardData.stats.events.growth }}%
              </span>
              <span class="text-[9px] text-slate-400 block mt-0.5">vs. last month</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Total Bookings -->
      <div class="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-4">
        <div class="w-14 h-14 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center text-2xl">
          🎫
        </div>
        <div class="flex-1">
          <h3 class="text-xs font-bold text-slate-500 uppercase tracking-wide">Total Bookings</h3>
          <div class="flex items-end justify-between mt-1">
            <span class="text-2xl font-black text-slate-900">{{ dashboardData.stats.bookings.total }}</span>
            <div class="text-right">
              <span class="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded flex items-center gap-0.5">
                ↑ {{ dashboardData.stats.bookings.growth }}%
              </span>
              <span class="text-[9px] text-slate-400 block mt-0.5">vs. last month</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Total Users -->
      <div class="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-4">
        <div class="w-14 h-14 rounded-xl bg-purple-50 text-purple-500 flex items-center justify-center text-2xl">
          👥
        </div>
        <div class="flex-1">
          <h3 class="text-xs font-bold text-slate-500 uppercase tracking-wide">Total Users</h3>
          <div class="flex items-end justify-between mt-1">
            <span class="text-2xl font-black text-slate-900">{{ formatNumber(dashboardData.stats.users.total) }}</span>
            <div class="text-right">
              <span class="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded flex items-center gap-0.5">
                ↑ {{ dashboardData.stats.users.growth }}%
              </span>
              <span class="text-[9px] text-slate-400 block mt-0.5">vs. last month</span>
            </div>
          </div>
        </div>
      </div>

    </div>

    <!-- MIDDLE SECTION -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
      
      <!-- Bookings Overview -->
      <div class="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col">
        <div class="flex justify-between items-start mb-6">
          <div>
            <h3 class="text-sm font-bold text-slate-900">Bookings Overview</h3>
            <p class="text-xs text-slate-400 mt-1">Last 7 days</p>
          </div>
        </div>
        
        <!-- CSS Line Chart -->
        <div class="flex-1 relative w-full h-48 mt-auto flex items-end pb-6 text-[10px] text-slate-400">
          <div class="absolute left-0 top-0 bottom-6 flex flex-col justify-between w-6 text-right pr-2">
            <span>80</span>
            <span>60</span>
            <span>40</span>
            <span>20</span>
            <span>0</span>
          </div>
          <div class="ml-6 flex-1 h-full relative border-b border-l border-slate-100">
            <div class="absolute inset-0 flex flex-col justify-between">
              <div class="border-b border-slate-50 border-dashed w-full h-0"></div>
              <div class="border-b border-slate-50 border-dashed w-full h-0"></div>
              <div class="border-b border-slate-50 border-dashed w-full h-0"></div>
              <div class="border-b border-slate-50 border-dashed w-full h-0"></div>
              <div></div>
            </div>
            <svg class="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
              <path d="M0,80 L16,60 L32,70 L48,40 L64,50 L80,20 L100,10" fill="none" stroke="#10b981" stroke-width="2.5" class="drop-shadow-sm" />
              <circle cx="16" cy="60" r="2" fill="#10b981" />
              <circle cx="32" cy="70" r="2" fill="#10b981" />
              <circle cx="48" cy="40" r="2" fill="#10b981" />
              <circle cx="64" cy="50" r="2" fill="#10b981" />
              <circle cx="80" cy="20" r="2" fill="#10b981" />
              <circle cx="100" cy="10" r="2" fill="#10b981" />
            </svg>
          </div>
          <div class="absolute bottom-0 left-6 right-0 flex justify-between px-2">
            <span>Aug 17</span>
            <span>Aug 18</span>
            <span>Aug 19</span>
            <span>Aug 20</span>
            <span>Aug 21</span>
            <span>Aug 22</span>
            <span>Aug 23</span>
          </div>
        </div>
      </div>

      <!-- Venue Types -->
      <div class="lg:col-span-3 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
        <h3 class="text-sm font-bold text-slate-900 mb-1">Venue Types</h3>
        <p class="text-[10px] text-slate-400 mb-6">Distribution of all venues</p>
        
        <div class="flex flex-col items-center justify-center">
          <div class="relative w-32 h-32 rounded-full mb-6 flex items-center justify-center" 
               style="background: conic-gradient(#10b981 0% 45%, #3b82f6 45% 70%, #f59e0b 70% 85%, #a855f7 85% 95%, #cbd5e1 95% 100%);">
            <div class="w-24 h-24 bg-white rounded-full flex flex-col items-center justify-center shadow-inner">
              <span class="text-2xl font-black text-slate-900">12</span>
              <span class="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Venues</span>
            </div>
          </div>
          
          <div class="w-full space-y-2">
            <div v-for="type in dashboardData.venueTypes" :key="type.label" class="flex justify-between items-center text-xs">
              <div class="flex items-center gap-2">
                <span class="w-2 h-2 rounded-full" :class="type.color"></span>
                <span class="text-slate-600">{{ type.label }}</span>
              </div>
              <span class="font-bold text-slate-900">{{ type.count }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Recent Activities -->
      <div class="lg:col-span-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
        <div class="flex justify-between items-center mb-6">
          <div class="flex items-center gap-2">
            <span class="text-slate-400">🔔</span>
            <h3 class="text-sm font-bold text-slate-900">Recent Activities</h3>
          </div>
          <button class="text-[10px] font-bold text-emerald-600 hover:underline">View all</button>
        </div>

        <div class="space-y-4">
          <div v-for="act in dashboardData.recentActivities" :key="act.id" class="flex items-start gap-3">
            <div class="w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5" :class="act.color">
              <span class="text-sm">{{ act.icon }}</span>
            </div>
            <div>
              <p class="text-xs font-bold text-slate-900">{{ act.title }}</p>
              <p class="text-[11px] text-emerald-600 font-medium">{{ act.subtitle }}</p>
              <p class="text-[10px] text-slate-400 mt-0.5">{{ act.time }}</p>
            </div>
          </div>
        </div>
      </div>
      
    </div>

    <!-- BOTTOM ROW (Table) -->
    <div class="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6">
      <div class="flex items-center gap-2 mb-6">
        <span class="text-emerald-500">🏆</span>
        <h3 class="text-sm font-bold text-slate-900">Top Venues by Bookings</h3>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full text-left">
          <thead>
            <tr class="border-b border-slate-100 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              <th class="pb-3 font-medium">#</th>
              <th class="pb-3 font-medium">Venue Name</th>
              <th class="pb-3 font-medium">Type</th>
              <th class="pb-3 font-medium">Total Bookings</th>
              <th class="pb-3 font-medium text-right pr-4">Status</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-50">
            <tr v-for="(venue, index) in dashboardData.topVenues" :key="venue.id" class="text-xs group hover:bg-slate-50/50 transition">
              <td class="py-3.5 text-slate-400 font-medium">{{ index + 1 }}</td>
              <td class="py-3.5 font-bold text-slate-700 group-hover:text-emerald-600 transition">{{ venue.name }}</td>
              <td class="py-3.5 text-slate-500">{{ venue.type }}</td>
              <td class="py-3.5 font-semibold text-slate-700">{{ venue.bookings }}</td>
              <td class="py-3.5 text-right">
                <span class="inline-flex items-center justify-center px-2.5 py-1 text-[10px] font-bold rounded-full"
                      :class="venue.status === 'Active' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-500'">
                  {{ venue.status }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

  </div>
</template>