<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

definePageMeta({ 
  layout: 'admin'
})

// State
const isLoading = ref(false)
const isRefreshing = ref(false)
const apiError = ref<string | null>(null)
const dashboardData = ref<any>(null)

const token = useCookie('auth_token')
const authStore = useAuthStore()

const currentDate = computed(() => {
  return new Date().toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
})

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US').format(amount || 0)
}

const formatNumber = (num: number) => {
  return new Intl.NumberFormat('en-US').format(num || 0)
}

const formatDate = (date: string) => {
  if (!date) return 'N/A'
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
}

const getStatusClass = (status: string) => {
  const classes: Record<string, string> = {
    'Completed': 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    'Pending': 'bg-amber-500/10 text-amber-400 border-amber-500/30',
    'Cancelled': 'bg-rose-500/10 text-rose-400 border-rose-500/30',
    'Confirmed': 'bg-blue-500/10 text-blue-400 border-blue-500/30',
    'rejected': 'bg-rose-500/10 text-rose-400 border-rose-500/30'
  }
  return classes[status] || 'bg-slate-500/10 text-slate-400 border-slate-500/30'
}

// ✅ የተስተካከለው fetchDashboardData
const fetchDashboardData = async (showLoading = true) => {
  if (showLoading) isLoading.value = true
  apiError.value = null

  try {
    const config = useRuntimeConfig()
    // 1. apiBase ን ማግኘት
    let apiBase = config.public.apiBase || 'http://127.0.0.1:8000'
    
    // 2. ተደራራቢ /api እንዳይኖር ማጽዳት
    // apiBase መጨረሻው /api ከሆነ እሱን እናጠፋዋለን ምክንያቱም ከታች በራሳችን ስለምንጨምረው
    const cleanBase = apiBase.endsWith('/api') ? apiBase.replace(/\/api$/, '') : apiBase
    
    // 3. ትክክለኛውን URL መገንባት
    const url = `${cleanBase}/api/admin/dashboard`
    
    console.log('📡 Requesting URL:', url)
    
    const authToken = authStore.token || token.value

    const response = await $fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': authToken ? `Bearer ${authToken}` : '',
        'Accept': 'application/json'
      }
    })

    console.log('✅ Dashboard response:', response)
    
    if (response.success) {
      dashboardData.value = response.data
    } else {
      apiError.value = response.message || 'Failed to load data'
    }
    
  } catch (error: any) {
    console.error('❌ Dashboard error:', error)
    if (error.status === 404) {
      apiError.value = '⚠️ Route not found (404). Please check Laravel api.php'
    } else {
      apiError.value = error?.data?.message || '⚠️ Server error occurred.'
    }
    dashboardData.value = getFallbackData()
  } finally {
    isLoading.value = false
    isRefreshing.value = false
  }
}

const getFallbackData = () => ({
  totalRevenue: 0,
  revenueGrowth: 0,
  totalPartners: 0,
  newPartnersThisWeek: 0,
  totalUsers: 0,
  activeUsersToday: 0,
  pendingReports: 0,
  totalVenues: 0,
  totalGames: 0,
  todayBookings: 0,
  completionRate: 0,
  recentBookings: []
})

const refreshData = async () => {
  isRefreshing.value = true
  await fetchDashboardData(false)
}

onMounted(() => {
  console.log('🔍 Admin Dashboard mounted')
  
  authStore.init()
  
  const authToken = authStore.token || token.value
  console.log('🔍 Auth token:', authToken ? 'Present' : 'Missing')
  console.log('🔍 User:', authStore.user)
  console.log('🔍 User role:', authStore.user?.role)
  
  if (authToken) {
    fetchDashboardData()
  } else {
    apiError.value = '🔒 Please login to view dashboard.'
    navigateTo('/auth')
  }
})
</script>


<template>
  <div class="space-y-6">
    <!-- PAGE HEADER -->
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 class="text-2xl font-black text-white tracking-tight">System Overview</h1>
        <p class="text-xs text-slate-400 mt-1">Real-time stats across all active modules</p>
      </div>

      <div class="flex items-center gap-3">
        <button 
          @click="refreshData" 
          :disabled="isRefreshing"
          class="flex items-center gap-2 text-xs font-bold text-slate-300 bg-[#0b1320] border border-slate-800 hover:border-slate-700 px-3.5 py-2 rounded-xl transition active:scale-95 disabled:opacity-50"
        >
          <span :class="{ 'animate-spin': isRefreshing }">🔄</span>
          Refresh
        </button>

        <div class="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-3.5 py-2 rounded-xl border border-emerald-500/20">
          Today: {{ currentDate }}
        </div>
      </div>
    </div>

    <!-- API ERROR -->
    <div v-if="apiError" class="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-between text-rose-400 text-xs">
      <span>⚠️ {{ apiError }}</span>
      <button @click="refreshData" class="underline font-bold hover:text-rose-300">Retry</button>
    </div>

    <!-- METRICS CARDS -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div class="bg-[#0b1320] p-6 rounded-2xl border border-slate-800 shadow-sm hover:border-emerald-500/50 transition">
        <div class="flex justify-between items-start mb-4">
          <span class="text-slate-400 font-bold text-xs uppercase tracking-wider">Total Revenue</span>
          <span class="text-emerald-400 text-lg">💰</span>
        </div>
        <div v-if="isLoading" class="h-8 bg-slate-800/60 rounded animate-pulse w-3/4"></div>
        <h2 v-else class="text-3xl font-black text-white">
          {{ formatCurrency(dashboardData?.totalRevenue || 0) }} <span class="text-xs text-slate-500">ETB</span>
        </h2>
      </div>

      <div class="bg-[#0b1320] p-6 rounded-2xl border border-slate-800 shadow-sm hover:border-blue-500/50 transition">
        <div class="flex justify-between items-start mb-4">
          <span class="text-slate-400 font-bold text-xs uppercase tracking-wider">Active Partners</span>
          <span class="text-blue-400 text-lg">🏟️</span>
        </div>
        <div v-if="isLoading" class="h-8 bg-slate-800/60 rounded animate-pulse w-1/2"></div>
        <h2 v-else class="text-3xl font-black text-white">{{ dashboardData?.totalPartners || 0 }}</h2>
      </div>

      <div class="bg-[#0b1320] p-6 rounded-2xl border border-slate-800 shadow-sm hover:border-purple-500/50 transition">
        <div class="flex justify-between items-start mb-4">
          <span class="text-slate-400 font-bold text-xs uppercase tracking-wider">Registered Users</span>
          <span class="text-purple-400 text-lg">👥</span>
        </div>
        <div v-if="isLoading" class="h-8 bg-slate-800/60 rounded animate-pulse w-1/2"></div>
        <h2 v-else class="text-3xl font-black text-white">{{ formatNumber(dashboardData?.totalUsers || 0) }}</h2>
      </div>

      <div class="bg-[#0b1320] p-6 rounded-2xl border border-slate-800 shadow-sm hover:border-rose-500/50 transition">
        <div class="flex justify-between items-start mb-4">
          <span class="text-slate-400 font-bold text-xs uppercase tracking-wider">Pending Reports</span>
          <span class="text-rose-400 text-lg">⚠️</span>
        </div>
        <div v-if="isLoading" class="h-8 bg-slate-800/60 rounded animate-pulse w-1/3"></div>
        <h2 v-else class="text-3xl font-black text-rose-500">{{ dashboardData?.pendingReports || 0 }}</h2>
      </div>
    </div>

     <!-- RECENT BOOKINGS (ግራ በኩል) -->
      <div class="lg:col-span-2 bg-[#0b1320] border border-slate-800 rounded-2xl p-6 space-y-4">
        <div class="flex items-center justify-between border-b border-slate-800 pb-4">
          <h3 class="text-sm font-bold text-white">Recent Platform Bookings</h3>
          <NuxtLink to="/admin/bookings" class="text-xs font-bold text-emerald-400 hover:underline">View All</NuxtLink>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-left text-xs text-slate-300">
            <thead class="bg-[#070c14] text-slate-400 uppercase font-bold text-[10px] tracking-wider border-b border-slate-800">
              <tr>
                <th class="p-3">User</th>
                <th class="p-3">Venue</th>
                <th class="p-3">Amount</th>
                <th class="p-3">Status</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-800/60">
              <tr v-for="booking in dashboardData?.recentBookings" :key="booking.id">
                <td class="p-3 font-semibold text-white">{{ booking.userName }}</td>
                <td class="p-3 text-slate-400">{{ booking.venueName }}</td>
                <td class="p-3 font-bold text-emerald-400">{{ formatCurrency(booking.amount) }} ETB</td>
                <td class="p-3">
                  <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold border" :class="getStatusClass(booking.status)">
                    {{ booking.status }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- TOP VENUES (ቀኝ በኩል) -->
      <div class="bg-[#0b1320] border border-slate-800 rounded-2xl p-6">
        <h3 class="text-sm font-bold text-white mb-4">Top Performing Venues</h3>
        <div v-if="!dashboardData?.venuePerformance?.length" class="text-center py-10 text-slate-500 text-xs">
          No revenue data yet.
        </div>
        <div v-else class="space-y-4">
          <div v-for="venue in dashboardData?.venuePerformance" :key="venue.name" 
               class="flex items-center justify-between p-3 bg-[#070c14] rounded-xl border border-slate-800 hover:border-slate-700 transition">
            <div>
              <p class="text-sm font-bold text-white">{{ venue.name }}</p>
              <p class="text-[11px] text-slate-500">{{ venue.bookings_count }} Bookings</p>
            </div>
            <div class="text-right">
              <p class="text-sm font-black text-emerald-400">{{ formatCurrency(venue.revenue) }} ETB</p>
              <p class="text-[9px] text-slate-500 uppercase font-bold">Revenue</p>
            </div>
          </div>
        </div>
    </div>
  </div>
</template>

<style scoped>
.animate-pulse {
  animation: pulse 1.5s ease-in-out infinite;
}
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}
</style>