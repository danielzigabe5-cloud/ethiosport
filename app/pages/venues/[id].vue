<template>
  <div class="min-h-screen bg-slate-50 text-slate-800 pb-20 pt-24 px-4 sm:px-6 lg:px-8 font-sans">
    <div class="max-w-5xl mx-auto space-y-6">
      
      <!-- Back Button -->
      <NuxtLink 
        to="/venues" 
        class="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-emerald-600 transition-colors bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
        </svg>
        <span>Back to Venues</span>
      </NuxtLink>

      <!-- Loading State -->
      <div v-if="isLoading" class="bg-white rounded-3xl p-8 border border-slate-200 animate-pulse space-y-6">
        <div class="h-80 bg-slate-200 rounded-2xl"></div>
        <div class="h-8 bg-slate-200 rounded w-1/3"></div>
        <div class="h-4 bg-slate-200 rounded w-1/4"></div>
        <div class="h-20 bg-slate-200 rounded"></div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="text-center py-16 bg-rose-50 border border-rose-200 rounded-3xl">
        <div class="text-3xl mb-2">⚠️</div>
        <p class="text-rose-600 font-semibold text-sm">{{ error }}</p>
        <NuxtLink to="/venues" class="mt-4 inline-block px-5 py-2.5 bg-rose-500 text-white rounded-xl text-xs font-bold">
          Return to List
        </NuxtLink>
      </div>

      <!-- Venue Details Card -->
      <div v-else-if="venue" class="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
        
        <!-- Main Image Hero -->
        <div class="relative h-72 sm:h-96 w-full bg-slate-100">
          <img 
            :src="getVenueImage(venue)" 
            @error="handleImageError"
            alt="Venue Main Image" 
            class="w-full h-full object-cover"
          />
          <div class="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-2xl text-xs text-amber-600 font-black flex items-center gap-1 border border-slate-200 shadow-lg">
            <svg class="w-4 h-4 fill-current text-amber-500" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
            </svg>
            <span>{{ venue.rating || '4.8' }}</span>
          </div>
        </div>

        <!-- Venue Content Area -->
        <div class="p-6 sm:p-10 space-y-8">
          
          <!-- Header & Sports Tags -->
          <div class="space-y-3">
            <div class="flex flex-wrap gap-2">
              <span 
                v-for="s in formatSportArray(venue.sport_types || venue.sport_type)" 
                :key="s" 
                class="text-xs bg-emerald-50 text-emerald-700 border border-emerald-200 px-3 py-1 rounded-xl font-extrabold uppercase tracking-wider"
              >
                ⚽ {{ s }}
              </span>
            </div>
            
            <h1 class="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
              {{ venue.name }}
            </h1>
            
            <p class="text-sm sm:text-base text-slate-500 flex items-center gap-2">
              <svg class="w-5 h-5 text-emerald-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
              <span>{{ venue.location }}, {{ venue.city }} {{ venue.sub_city ? `(${venue.sub_city})` : '' }}</span>
            </p>
          </div>

          <!-- Quick Info Cards Grid -->
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 border-y border-slate-100 py-6">
            <div class="bg-slate-50 p-4 rounded-2xl border border-slate-200/60">
              <span class="text-xs font-semibold text-slate-400 block mb-1">Pricing</span>
              <div class="flex items-baseline gap-1">
                <span class="text-2xl font-black text-slate-900">{{ venue.price_per_hour }}</span>
                <span class="text-xs font-bold text-emerald-600">ETB / hr</span>
              </div>
            </div>

            <div class="bg-slate-50 p-4 rounded-2xl border border-slate-200/60">
              <span class="text-xs font-semibold text-slate-400 block mb-1">Status</span>
              <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold bg-emerald-100 text-emerald-800">
                <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
                Available for Booking
              </span>
            </div>

            <div class="bg-slate-50 p-4 rounded-2xl border border-slate-200/60">
              <span class="text-xs font-semibold text-slate-400 block mb-1">Location City</span>
              <span class="text-base font-bold text-slate-800">{{ venue.city || 'N/A' }}</span>
            </div>
          </div>

          <!-- Description Section -->
          <div class="space-y-3">
            <h3 class="text-lg font-extrabold text-slate-900">About this Venue</h3>
            <p class="text-slate-600 leading-relaxed text-sm sm:text-base whitespace-pre-line">
              {{ venue.description || 'No specific description provided for this sports venue. Contact host or download app to book.' }}
            </p>
          </div>

          <!-- Booking / Download App Action Section -->
          <div class="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span class="text-xs text-slate-400 block font-medium">Ready to play?</span>
              <span class="text-lg font-black text-slate-900">Download our mobile app to complete booking</span>
            </div>

            <button 
              @click="proceedToBooking" 
              class="w-full sm:w-auto px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm rounded-2xl shadow-xl shadow-emerald-600/20 active:scale-95 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
              </svg>
              <span>Download App to Book</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const route = useRoute()
const config = useRuntimeConfig()

const venue = ref(null)
const isLoading = ref(true)
const error = ref(null)

const placeholderSvg = 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22400%22%20height%3D%22300%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20400%20300%22%3E%3Crect%20width%3D%22400%22%20height%3D%22300%22%20fill%3D%22%23f1f5f9%22%3E%3C%2Frect%3E%3Ctext%20x%3D%2250%25%22%20y%3D%2250%25%22%20fill%3D%22%2394a3b8%22%20text-anchor%3D%22middle%22%20font-family%3D%22sans-serif%22%3ENo%20Image%3C%2Ftext%3E%3C%2Fsvg%3E'

const getVenueImage = (v) => {
  if (!v) return placeholderSvg
  const img = v.image_full_url || v.image_url || v.image
  if (!img) return placeholderSvg
  return img.startsWith('http') ? img : `http://127.0.0.1:8000/storage/${img}`
}

const handleImageError = (e) => {
  e.target.src = placeholderSvg
}

const formatSportArray = (data) => {
  if (!data) return []
  if (Array.isArray(data)) return data
  try {
    const parsed = JSON.parse(data)
    return Array.isArray(parsed) ? parsed : [parsed]
  } catch (e) {
    return [data]
  }
}

// Fetch single venue details
const fetchVenueDetails = async () => {
  isLoading.value = true
  error.value = null
  const API_BASE = config.public.apiBase || 'http://127.0.0.1:8000/api'
  
  try {
    const res = await $fetch(`${API_BASE}/venues/${route.params.id}`)
    venue.value = res.data || res
  } catch (err) {
    console.error('Error fetching venue details:', err)
    error.value = 'Failed to load venue details. Please check back later.'
  } finally {
    isLoading.value = false
  }
}

// Handle Download App Redirect
const proceedToBooking = () => {
  // Option A: Internal route ወደሆነው Download page ለመሄድ:
  navigateTo('/download')

  // Option B: የቀጥታ Play Store / App Store link ከሆነ የሚከተለውን መክፈት ትችላለህ:
  // window.open('https://play.google.com/store/apps/details?id=your.app.package', '_blank')
}

onMounted(fetchVenueDetails)
</script>