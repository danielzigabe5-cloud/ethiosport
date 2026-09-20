<template>
  <div class="p-6 space-y-6">
    
    <!-- Header Section -->
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div>
        <h1 class="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
          <Icon name="lucide:clipboard-check" class="text-emerald-600 w-7 h-7" />
          Bookings Management
        </h1>
        <p class="text-slate-500 text-xs font-semibold mt-1">የስታዲየም ቦታ ማስያዣዎችን እዚህ ያረጋግጡ ወይም ይሰርዙ።</p>
      </div>
      
      <button 
        @click="loadBookings" 
        class="px-4 py-2 bg-white hover:bg-slate-50 text-slate-700 rounded-xl transition shadow-sm border border-slate-200 flex items-center gap-2 text-xs font-bold active:scale-95 cursor-pointer"
      >
        <Icon name="lucide:refresh-cw" :class="{'animate-spin': isLoading}" class="w-4 h-4 text-emerald-600" />
        <span>Refresh</span>
      </button>
    </div>

    <!-- Tabs Navigation -->
    <div class="flex flex-wrap gap-2 bg-slate-200/60 p-1.5 rounded-2xl border border-slate-300/60 inline-flex">
      <button 
        v-for="tab in tabs" 
        :key="tab.id"
        @click="activeTab = tab.id"
        :class="[
          'px-5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer',
          activeTab === tab.id 
            ? 'bg-[#10B981] text-white shadow-sm' 
            : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
        ]"
      >
        <Icon :name="tab.icon" class="w-4 h-4" />
        <span>{{ tab.label }}</span>
        <span 
          :class="[
            'ml-1 px-2 py-0.5 rounded-md text-[10px] font-extrabold',
            activeTab === tab.id ? 'bg-black/20 text-white' : 'bg-slate-300/60 text-slate-700'
          ]"
        >
          {{ getCount(tab.id) }}
        </span>
      </button>
    </div>

    <!-- Loading State -->
    <div v-if="isLoading && bookings.length === 0" class="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-slate-200 shadow-sm">
      <div class="w-12 h-12 border-4 border-emerald-500/20 border-t-emerald-600 rounded-full animate-spin"></div>
      <p class="text-slate-500 mt-4 text-xs font-bold animate-pulse">መረጃዎችን በማምጣት ላይ...</p>
    </div>

    <!-- Empty State -->
    <div 
      v-else-if="filteredBookings.length === 0" 
      class="text-slate-500 py-20 text-center bg-white rounded-3xl border-2 border-dashed border-slate-200"
    >
      <Icon name="lucide:search-x" class="w-16 h-16 mx-auto mb-3 text-slate-300" />
      <h3 class="text-base font-bold text-slate-800">ምንም መረጃ የለም</h3>
      <p class="text-slate-400 text-xs mt-1">በዚህ ክፍል ምንም አይነት የተመዘገበ መረጃ አልተገኘም።</p>
    </div>

    <!-- Bookings Grid -->
    <div v-else class="grid gap-5">
      <div 
        v-for="booking in filteredBookings" 
        :key="booking.id" 
        class="group bg-white border border-slate-200 rounded-2xl overflow-hidden hover:border-emerald-500/50 transition-all duration-300 shadow-sm"
      >
        <div class="flex flex-col lg:flex-row items-stretch">
          
          <!-- Screenshot / Image -->
          <div class="lg:w-64 w-full bg-slate-100 flex items-center justify-center relative overflow-hidden border-b lg:border-b-0 lg:border-r border-slate-200">
            <img 
              v-if="booking.payment_screenshot" 
              :src="formatStorageUrl(booking.payment_screenshot)" 
              class="w-full h-full object-cover min-h-[180px] group-hover:scale-105 transition-transform duration-500"
              alt="Receipt" 
            />
            <div v-else class="text-slate-400 flex flex-col items-center p-8 text-center">
              <Icon name="lucide:image-off" class="w-10 h-10 mb-1.5 text-slate-300" />
              <span class="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">ምስል የለም</span>
            </div>
            
            <a 
              v-if="booking.payment_screenshot" 
              :href="formatStorageUrl(booking.payment_screenshot)" 
              target="_blank"
              class="absolute inset-0 bg-slate-900/70 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center transition-all duration-300 text-white"
            >
              <Icon name="lucide:maximize" class="w-6 h-6 mb-1" />
              <span class="text-[10px] font-black tracking-widest uppercase">በሰፊው እይ</span>
            </a>
          </div>

          <!-- Details -->
          <div class="flex-1 p-6 flex flex-col justify-between">
            <div>
              <div class="flex justify-between items-start gap-4">
                <div class="space-y-0.5">
                  <span class="text-[10px] font-extrabold text-emerald-600 uppercase tracking-wider">Stadium / Venue</span>
                  <h2 class="text-slate-900 font-black text-xl tracking-tight uppercase leading-tight">
                    {{ booking.venue?.name || 'Standard Court' }}
                  </h2>
                </div>
                <div :class="statusStyle(booking.status)" class="px-3 py-1 rounded-full font-black uppercase text-[10px] border tracking-wider">
                  {{ booking.status || 'N/A' }}
                </div>
              </div>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
                <div class="flex items-center gap-3">
                  <div class="p-2 bg-slate-100 rounded-xl text-slate-500"><Icon name="lucide:phone" class="w-4 h-4" /></div>
                  <div>
                    <p class="text-[9px] text-slate-400 font-bold uppercase">Customer</p>
                    <p class="text-xs font-bold text-slate-800">{{ booking.phone_number || '-' }}</p>
                  </div>
                </div>
                
                <div class="flex items-center gap-3">
                  <div class="p-2 bg-slate-100 rounded-xl text-slate-500"><Icon name="lucide:calendar" class="w-4 h-4" /></div>
                  <div>
                    <p class="text-[9px] text-slate-400 font-bold uppercase">Schedule</p>
                    <p class="text-xs font-bold text-slate-800">{{ formatDate(booking.start_time) }}</p>
                  </div>
                </div>
                
                <div class="flex items-center gap-3">
                  <div class="p-2 bg-emerald-50 rounded-xl text-emerald-600"><Icon name="lucide:banknote" class="w-4 h-4" /></div>
                  <div>
                    <p class="text-[9px] text-slate-400 font-bold uppercase">Total Price</p>
                    <p class="text-xs font-black text-emerald-600">{{ booking.total_price || 0 }} ETB</p>
                  </div>
                </div>
                
                <div class="flex items-center gap-3">
                  <div class="p-2 bg-amber-50 rounded-xl text-amber-600"><Icon name="lucide:hash" class="w-4 h-4" /></div>
                  <div>
                    <p class="text-[9px] text-slate-400 font-bold uppercase">Transaction Ref</p>
                    <p class="text-xs font-mono font-bold text-amber-600">{{ booking.transaction_ref || '-' }}</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Actions -->
            <div class="mt-6 flex flex-wrap gap-3 justify-end border-t border-slate-100 pt-4">
              <template v-if="booking.status === 'pending'">
                <button 
                  @click="reject(booking.id)" 
                  class="px-5 py-2 bg-slate-100 hover:bg-rose-50 hover:text-rose-600 text-slate-600 font-bold text-xs rounded-xl transition border border-slate-200 cursor-pointer"
                >
                  REJECT
                </button>
                <button 
                  @click="approve(booking.id)" 
                  class="px-8 py-2 bg-[#10B981] hover:bg-[#059669] active:scale-95 text-white font-black text-xs rounded-xl transition shadow-sm cursor-pointer"
                >
                  CONFIRM BOOKING
                </button>
              </template>
              <div v-else class="text-slate-400 flex items-center gap-1.5 font-bold italic text-xs">
                <Icon name="lucide:check-circle-2" class="w-4 h-4 text-slate-400" />
                ይህ መዝገብ ውሳኔ አግኝቷል።
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'

definePageMeta({ layout: 'admin' })

const config = useRuntimeConfig()
const authStore = useAuthStore()
const bookings = ref([])
const isLoading = ref(false)
const activeTab = ref('all')

const tabs = [
  { id: 'all', label: 'ሁሉም', icon: 'lucide:layout-grid' },
  { id: 'pending', label: 'በመጠባበቅ ላይ', icon: 'lucide:clock' },
  { id: 'confirmed', label: 'የተረጋገጡ', icon: 'lucide:check-circle' },
  { id: 'rejected', label: 'የተሰረዙ', icon: 'lucide:x-circle' },
]

const filteredBookings = computed(() => {
  if (!Array.isArray(bookings.value)) return []
  if (activeTab.value === 'all') return bookings.value
  
  return bookings.value.filter(b => {
    if (!b || !b.status) return false
    const status = String(b.status).toLowerCase()
    if (activeTab.value === 'rejected') {
      return status === 'rejected' || status === 'cancelled'
    }
    return status === activeTab.value
  })
})

const getCount = (status) => {
  if (!Array.isArray(bookings.value)) return 0
  if (status === 'all') return bookings.value.length
  
  return bookings.value.filter(b => {
    if (!b || !b.status) return false
    const s = String(b.status).toLowerCase()
    if (status === 'rejected') return s === 'rejected' || s === 'cancelled'
    return s === status
  }).length
}

const statusStyle = (status) => {
  if (!status) return 'bg-slate-100 text-slate-600 border-slate-200'
  const s = String(status).toLowerCase()
  if (s === 'confirmed' || s === 'approved') return 'bg-emerald-50 text-emerald-700 border-emerald-200'
  if (s === 'pending') return 'bg-amber-50 text-amber-700 border-amber-200'
  return 'bg-rose-50 text-rose-700 border-rose-200'
}

const formatStorageUrl = (path) => {
  if (!path) return ''
  if (path.startsWith('http')) return path
  const baseUrl = (config.public?.apiBase || '').replace('/api', '')
  return `${baseUrl}/storage/${path}`
}

const loadBookings = async () => {
  isLoading.value = true
  try {
    const data = await $fetch(`${config.public.apiBase}/admin/bookings-list`, {
      headers: { 
        'Authorization': `Bearer ${authStore.token}`, 
        'Accept': 'application/json' 
      }
    })
    bookings.value = Array.isArray(data) ? data : (data?.data || [])
  } catch (err) {
    console.error("Fetch error:", err)
    bookings.value = []
  } finally {
    isLoading.value = false
  }
}

const approve = async (id) => {
  if(!confirm('ይህን ክፍያ እርግጠኛ ሆነው ያጸድቃሉ?')) return
  try {
    const res = await $fetch(`${config.public.apiBase}/admin/bookings/${id}/confirm`, { 
      method: 'POST',
      headers: { 'Authorization': `Bearer ${authStore.token}` }
    })
    if(res) loadBookings()
  } catch (err) { alert("Process failed.") }
}

const reject = async (id) => {
  if(!confirm('ይህን ጥያቄ ውድቅ ያደርጋሉ?')) return
  try {
    const res = await $fetch(`${config.public.apiBase}/admin/bookings/${id}/reject`, { 
      method: 'POST',
      headers: { 'Authorization': `Bearer ${authStore.token}` }
    })
    if(res) loadBookings()
  } catch (err) { alert("Action failed.") }
}

const formatDate = (dateStr) => {
  if(!dateStr) return '-'
  try {
    return new Intl.DateTimeFormat('en-GB', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(dateStr))
  } catch (e) {
    return dateStr
  }
}

onMounted(loadBookings)
</script>