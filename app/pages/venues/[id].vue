<template>
  <div class="min-h-screen bg-slate-50 text-slate-800 pb-20 pt-24 px-4 sm:px-6 lg:px-8 font-sans">
    <div class="max-w-5xl mx-auto space-y-6">

      <!-- ═══════════════════════════════════════
           Back Button
           ═══════════════════════════════════════ -->
      <NuxtLink
        to="/venues"
        class="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-emerald-600 transition-colors bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
        </svg>
        <span>Back to Venues</span>
      </NuxtLink>

      <!-- ═══════════════════════════════════════
           Loading State
           ═══════════════════════════════════════ -->
      <div v-if="pending" class="bg-white rounded-3xl p-8 border border-slate-200 animate-pulse space-y-6">
        <div class="h-80 bg-slate-200 rounded-2xl"></div>
        <div class="h-8 bg-slate-200 rounded w-1/3"></div>
        <div class="h-4 bg-slate-200 rounded w-1/4"></div>
        <div class="h-20 bg-slate-200 rounded"></div>
      </div>

      <!-- ═══════════════════════════════════════
           Error State
           ═══════════════════════════════════════ -->
      <div v-else-if="error || !venue" class="text-center py-16 bg-rose-50 border border-rose-200 rounded-3xl">
        <div class="text-3xl mb-2">⚠️</div>
        <p class="text-rose-600 font-semibold text-sm">
          {{ errorMessage || 'Venue not found' }}
        </p>
        <NuxtLink to="/venues" class="mt-4 inline-block px-5 py-2.5 bg-rose-500 text-white rounded-xl text-xs font-bold">
          Return to List
        </NuxtLink>
      </div>

      <!-- ═══════════════════════════════════════
           Venue Details
           ═══════════════════════════════════════ -->
      <div v-else class="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">

        <!-- Main Image Hero -->
        <div class="relative h-72 sm:h-96 w-full bg-slate-100">
          <img
            :src="getVenueImage(venue)"
            @error="handleImageError"
            :alt="venue.name"
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
              <span>
                {{ venue.location || 'Location' }}, {{ venue.city || 'City' }}
                {{ venue.sub_city ? `(${venue.sub_city})` : '' }}
              </span>
            </p>
          </div>

          <!-- Quick Info Cards Grid -->
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 border-y border-slate-100 py-6">
            <div class="bg-slate-50 p-4 rounded-2xl border border-slate-200/60">
              <span class="text-xs font-semibold text-slate-400 block mb-1">Pricing</span>
              <div class="flex items-baseline gap-1">
                <span class="text-2xl font-black text-slate-900">
                  {{ venue.price_per_hour || '—' }}
                </span>
                <span class="text-xs font-bold text-emerald-600">ETB / hr</span>
              </div>
            </div>

            <div class="bg-slate-50 p-4 rounded-2xl border border-slate-200/60">
              <span class="text-xs font-semibold text-slate-400 block mb-1">Status</span>
              <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold bg-emerald-100 text-emerald-800">
                <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
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

          <!-- ═══════════════════════════════════════
               BOOK NOW — WARNING BOX + CTA
               ═══════════════════════════════════════ -->
          <div class="rounded-3xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-teal-50 p-6 sm:p-8 space-y-6">

            <!-- Info Warning -->
            <div class="flex items-start gap-4">
              <div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-lg shadow-emerald-600/30">
                <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"/>
                </svg>
              </div>
              <div class="flex-1">
                <h3 class="text-lg font-black text-slate-900">
                  Booking available on mobile app only
                </h3>
                <p class="mt-1.5 text-sm leading-6 text-slate-600">
                  To reserve this venue, download the CombolojoSPORT mobile app. Complete your booking, choose your time slot and pay securely — all in the app.
                </p>
              </div>
            </div>

            <!-- CTA Row -->
            <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">

              <!-- 🎯 BOOK NOW → /download-app -->
              <NuxtLink
                to="/download-app"
                title="Download the CombolojoSPORT app to book this venue"
                class="group flex-1 inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-600 hover:bg-emerald-500 px-8 py-4 text-sm font-black text-white shadow-xl shadow-emerald-600/30 active:scale-[0.98] transition-all duration-200"
              >
                <span class="text-lg">📱</span>
                <span>Book Now</span>
                <svg
                  class="h-4 w-4 transition-transform group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                </svg>
              </NuxtLink>

              <!-- Secondary: Browse more -->
              <NuxtLink
                to="/venues"
                class="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 hover:border-emerald-300 px-6 py-4 text-sm font-bold text-slate-700 transition-all"
              >
                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"/>
                </svg>
                <span class="hidden sm:inline">Browse More</span>
                <span class="sm:hidden">More Venues</span>
              </NuxtLink>
            </div>

            <!-- App store badges -->
            <div class="flex flex-wrap items-center justify-center sm:justify-start gap-3 pt-2 border-t border-emerald-100">
              <p class="text-xs font-bold uppercase tracking-widest text-slate-500 mr-2">
                Get the app:
              </p>

              <a
                href="https://play.google.com/store"
                target="_blank"
                rel="noopener"
                class="inline-flex items-center gap-2 rounded-xl bg-slate-900 hover:bg-slate-800 px-4 py-2.5 text-white transition"
              >
                <span class="text-base">🤖</span>
                <span class="text-left leading-tight">
                  <span class="block text-[8px] uppercase tracking-wider text-slate-400">Get it on</span>
                  <span class="block text-[11px] font-black">Google Play</span>
                </span>
              </a>

              <a
                href="https://apps.apple.com"
                target="_blank"
                rel="noopener"
                class="inline-flex items-center gap-2 rounded-xl bg-slate-900 hover:bg-slate-800 px-4 py-2.5 text-white transition"
              >
                <span class="text-base">🍎</span>
                <span class="text-left leading-tight">
                  <span class="block text-[8px] uppercase tracking-wider text-slate-400">Download on</span>
                  <span class="block text-[11px] font-black">App Store</span>
                </span>
              </a>
            </div>

          </div>

        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
/* ═══════════════════════════════════════════
   TYPES
   ═══════════════════════════════════════════ */
interface Venue {
  id: number | string
  name: string
  description?: string
  location?: string
  city?: string
  sub_city?: string
  sport_type?: string | string[]
  sport_types?: string | string[]
  price_per_hour?: number | string
  rating?: number | string
  image?: string
  image_url?: string
  image_full_url?: string
}

/* ═══════════════════════════════════════════
   SETUP
   ═══════════════════════════════════════════ */
const route = useRoute()
const config = useRuntimeConfig()

const API_BASE = computed(() =>
  String(config.public.apiBase || 'http://127.0.0.1:8000/api').replace(/\/+$/, '')
)

const placeholderSvg =
  'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22400%22%20height%3D%22300%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20400%20300%22%3E%3Crect%20width%3D%22400%22%20height%3D%22300%22%20fill%3D%22%23f1f5f9%22%3E%3C%2Frect%3E%3Ctext%20x%3D%2250%25%22%20y%3D%2250%25%22%20fill%3D%22%2394a3b8%22%20text-anchor%3D%22middle%22%20font-family%3D%22sans-serif%22%3ENo%20Image%3C%2Ftext%3E%3C%2Fsvg%3E'

/* ═══════════════════════════════════════════
   FETCH VENUE — SSR-friendly
   ═══════════════════════════════════════════ */
const venueId = computed(() => route.params.id)

const {
  data: response,
  pending,
  error,
} = await useAsyncData(
  () => `venue-${venueId.value}`,
  async () => {
    if (!venueId.value) return null
    const res = await $fetch<any>(`${API_BASE.value}/venues/${venueId.value}`)
    return res?.data ?? res
  },
  {
    watch: [venueId],
    // Cache for faster navigation
    getCachedData: (key) => {
      const cached = useNuxtData(key).data.value
      if (cached) return cached
      return undefined
    },
  }
)

/* ═══════════════════════════════════════════
   VENUE COMPUTED
   ═══════════════════════════════════════════ */
const venue = computed<Venue | null>(() => {
  const r = response.value
  if (!r) return null
  return (r as any).data ?? r
})

const errorMessage = computed(() => {
  if (!error.value) return ''
  const e = error.value as any
  return e?.data?.message || e?.message || 'Failed to load venue details'
})

/* ═══════════════════════════════════════════
   HELPERS
   ═══════════════════════════════════════════ */
function getVenueImage(v: Venue | null): string {
  if (!v) return placeholderSvg
  const img = v.image_full_url || v.image_url || v.image
  if (!img) return placeholderSvg
  if (img.startsWith('http')) return img
  return `http://127.0.0.1:8000/storage/${img.replace(/^\/+/, '')}`
}

function handleImageError(e: Event) {
  const target = e.target as HTMLImageElement
  if (target) target.src = placeholderSvg
}

function formatSportArray(data: any): string[] {
  if (!data) return []
  if (Array.isArray(data)) return data.filter(Boolean).map((s) => String(s).trim())
  try {
    const parsed = JSON.parse(data)
    if (Array.isArray(parsed)) return parsed.filter(Boolean).map((s) => String(s).trim())
    return parsed ? [String(parsed).trim()] : []
  } catch {
    return String(data)
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean)
  }
}

/* ═══════════════════════════════════════════
   SEO
   ═══════════════════════════════════════════ */
useHead(() => ({
  title: venue.value?.name
    ? `${venue.value.name} | CombolojoSPORT`
    : 'Venue | CombolojoSPORT',
  meta: [
    {
      name: 'description',
      content:
        venue.value?.description ||
        'Discover sports venues across Ethiopia on CombolojoSPORT.',
    },
    { property: 'og:title', content: venue.value?.name || 'Venue' },
    { property: 'og:image', content: getVenueImage(venue.value) },
  ],
}))
</script>