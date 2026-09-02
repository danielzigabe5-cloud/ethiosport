<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()
const authChecked = ref(false)

// ============================================
// AUTH CHECK
// ============================================
onMounted(async () => {
  await authStore.init()
  authChecked.value = true
  
  if (!authStore.token) {
    navigateTo(`/auth?redirect=${encodeURIComponent('/venues/create')}`)
    return
  }
})

// ============================================
// PAGE TITLE
// ============================================
useHead({
  title: 'Register Venue - Combolojo',
  meta: [
    { name: 'description', content: 'Register your sports venue on Combolojo' }
  ]
})

// ============================================
// FORM DATA
// ============================================
const form = reactive({
  name: '',
  description: '',
  location: '',
  city: 'Addis Ababa',
  sub_city: '',
  capacity: null,
  price_per_hour: null,
  image: null,
  imagePreview: null,
})

const selectedSportTypes = ref([])
const selectedFacilities = ref([])
const isLoading = ref(false)
const formError = ref(null)
const successMessage = ref(null)

// ============================================
// DROPDOWN OPTIONS
// ============================================
const cities = [
  'Addis Ababa', 'Bahir Dar', 'Hawassa', 'Mekelle', 'Dire Dawa',
  'Nekemte', 'Woldiya', 'Hosaena', 'Arba Minch', 'Wonji', 'Harar', 'Sululta'
]

const subCities = [
  'Bole', 'Yeka', 'Kirkos', 'Arada', 'Lideta',
  'Nifas Silk-Lafto', 'Kolfe Keraniyo', 'Gullele',
  'Akaky Kaliti', 'Lemi Kura'
]

const sportOptions = [
  'Football', 'Athletics', 'Basketball', 'Volleyball',
  'Handball', 'Tennis', 'Golf', 'Equestrian',
  'Swimming', 'Traditional Sports'
]

const facilityOptions = [
  'Changing Rooms', 'Showers', 'Parking', 'Cafeteria',
  'Equipment Rental', 'First Aid', 'Lighting',
  'Security', 'WiFi', 'Seating Area'
]

// ============================================
// VALIDATION
// ============================================
const errors = ref({})

const validateForm = () => {
  errors.value = {}
  
  if (!form.name || form.name.length < 3) errors.value.name = 'Venue name must be at least 3 characters'
  if (!form.location) errors.value.location = 'Location is required'
  if (!form.city) errors.value.city = 'City is required'
  if (form.city === 'Addis Ababa' && !form.sub_city) errors.value.sub_city = 'Sub-city is required for Addis Ababa'
  if (!form.capacity || form.capacity < 1) errors.value.capacity = 'Capacity must be at least 1'
  if (!form.price_per_hour || form.price_per_hour < 0) errors.value.price_per_hour = 'Valid price per hour is required'
  if (!form.image) errors.value.image = 'Venue image is required'
  if (selectedSportTypes.value.length === 0) errors.value.sportTypes = 'Please select at least one sport type'
  
  return Object.keys(errors.value).length === 0
}

// ============================================
// IMAGE HANDLING
// ============================================
const handleImageUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    if (file.size > 10 * 1024 * 1024) {
      formError.value = 'Image size must be less than 10MB'
      return
    }
    if (!['image/jpeg', 'image/png', 'image/jpg'].includes(file.type)) {
      formError.value = 'Only JPEG, PNG, and JPG images are allowed'
      return
    }
    form.image = file
    form.imagePreview = URL.createObjectURL(file)
    formError.value = null
  }
}

const removeImage = () => {
  form.image = null
  form.imagePreview = null
  const input = document.getElementById('image-upload')
  if (input) input.value = ''
}

// ============================================
// SUBMIT VENUE - ❌ ምንም Alert የለም
// ============================================
const submitVenue = async () => {
  if (!authStore.token) {
    navigateTo(`/auth?redirect=${encodeURIComponent('/venues/create')}`)
    return
  }

  if (!validateForm()) {
    const firstError = document.querySelector('[data-error]')
    if (firstError) firstError.scrollIntoView({ behavior: 'smooth', block: 'center' })
    return
  }
  
  isLoading.value = true
  formError.value = null
  successMessage.value = null
  
  try {
    const config = useRuntimeConfig()
    const API_BASE = config.public.apiBase || 'http://127.0.0.1:8000/api'
    
    const formData = new FormData()
    formData.append('name', form.name)
    formData.append('description', form.description || '')
    formData.append('location', form.location)
    formData.append('city', form.city)
    if (form.sub_city) formData.append('sub_city', form.sub_city)
    
    formData.append('capacity', form.capacity.toString())
    formData.append('price_per_hour', form.price_per_hour.toString())
    
    if (form.image) {
      formData.append('image', form.image)
    } else {
      formError.value = 'Please select an image'
      isLoading.value = false
      return
    }
    
    formData.append('sport_types', JSON.stringify(selectedSportTypes.value))
    formData.append('facilities', JSON.stringify(selectedFacilities.value))
    
    const response = await $fetch(`${API_BASE}/venues`, {
      method: 'POST',
      body: formData,
      headers: {
        'Authorization': `Bearer ${authStore.token}`
      }
    })
    
    if (response.success) {
      successMessage.value = response.message || '🎉 Venue registered successfully! Please wait for admin approval.'
      // ❌ Alert አስወግድ - በገፁ ላይ ይታያል
      // alert('✅ ' + successMessage.value)
      
      setTimeout(() => {
        router.push('/venues')
      }, 3000)
    } else {
      formError.value = response.message || 'Failed to register venue'
      // ❌ Alert አስወግድ - በገፁ ላይ ይታያል
      // alert('❌ ' + formError.value)
    }
  } catch (error) {
    console.error('Venue registration error:', error)
    
    let errorMessage = 'An error occurred while registering the venue'
    
    if (error.response?.status === 422) {
      const errors = error.response._data?.errors || {}
      const firstError = Object.values(errors)[0]?.[0] || 'Validation failed'
      errorMessage = firstError
    } else if (error.response?.status === 401) {
      navigateTo(`/auth?redirect=${encodeURIComponent('/venues/create')}`)
      return
    } else if (error.response?._data?.message) {
      errorMessage = error.response._data.message
    }
    
    formError.value = errorMessage
    // ❌ Alert አስወግድ - በገፁ ላይ ይታያል
    // alert('❌ ' + errorMessage)
  } finally {
    isLoading.value = false
  }
}

// ============================================
// RESET FORM
// ============================================
const resetForm = () => {
  Object.assign(form, {
    name: '',
    description: '',
    location: '',
    city: 'Addis Ababa',
    sub_city: '',
    capacity: null,
    price_per_hour: null,
    image: null,
    imagePreview: null,
  })
  selectedSportTypes.value = []
  selectedFacilities.value = []
  errors.value = {}
  formError.value = null
  successMessage.value = null
}

// ============================================
// LOGOUT HANDLER
// ============================================
const handleLogout = async () => {
  try {
    await authStore.logout()
    navigateTo('/')
  } catch (error) {
    console.error('Logout error:', error)
  }
}
</script>

<template>
  <div class="min-h-screen bg-slate-50 dark:bg-[#070b10] py-8 px-4 sm:px-6 lg:px-8 pt-28">
    <div class="max-w-4xl mx-auto">
      
      <!-- AUTHENTICATION REQUIRED MESSAGE -->
      <div v-if="!authStore.token" class="text-center py-16 bg-white dark:bg-[#131c27] rounded-2xl border border-slate-200 dark:border-[#212e3e]">
        <div class="text-6xl mb-4">🔒</div>
        <h2 class="text-2xl font-bold text-slate-900 dark:text-white">Login Required</h2>
        <p class="text-slate-500 dark:text-slate-400 mt-2 max-w-md mx-auto">
          You need to be logged in to register a venue. Please login or create an account.
        </p>
        <div class="flex flex-wrap gap-4 justify-center mt-6">
          <NuxtLink to="/auth" class="px-8 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl transition">
            Login / Register
          </NuxtLink>
          <NuxtLink to="/" class="px-8 py-3 border border-slate-200 dark:border-[#212e3e] text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-[#0b111a] rounded-xl transition">
            Go Home
          </NuxtLink>
        </div>
      </div>

      <!-- MAIN FORM -->
      <template v-else>
        
        <!-- Header -->
        <div class="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 class="text-3xl font-black text-slate-900 dark:text-white">Register Your Venue</h1>
            <p class="text-slate-500 dark:text-slate-400 mt-1">List your sports venue on Combolojo and reach more customers</p>
          </div>
          <div class="flex items-center gap-4">
            <span class="text-sm text-slate-500 dark:text-slate-400">👤 {{ authStore.user?.name || 'User' }}</span>
            <button @click="handleLogout" class="text-sm text-red-500 hover:text-red-600">Logout</button>
            <NuxtLink to="/venues" class="text-sm text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200">← Back</NuxtLink>
          </div>
        </div>

        <!-- ✅ Success Message - በገፁ ላይ ይታያል -->
        <div v-if="successMessage" class="mb-6 p-4 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-xl">
          <div class="flex items-center gap-2 text-emerald-700 dark:text-emerald-300">
            <span>✅</span>
            <span>{{ successMessage }}</span>
          </div>
          <p class="text-xs text-emerald-600 dark:text-emerald-400 mt-1">Your venue will be visible after admin approval.</p>
        </div>

        <!-- ✅ Error Message - በገፁ ላይ ይታያል -->
        <div v-if="formError" class="mb-6 p-4 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-xl">
          <div class="flex items-center gap-2 text-red-700 dark:text-red-300">
            <span>❌</span>
            <span>{{ formError }}</span>
          </div>
        </div>

        <!-- Form -->
        <form @submit.prevent="submitVenue" class="space-y-8">
          <!-- Basic Information -->
          <div class="bg-white dark:bg-[#131c27] rounded-2xl border border-slate-200 dark:border-[#212e3e] p-6">
            <h2 class="text-lg font-bold text-slate-900 dark:text-white mb-4">📋 Basic Information</h2>
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Venue Name *</label>
                <input v-model="form.name" type="text" placeholder="e.g., Sarbeet Football Field"
                  class="w-full bg-slate-50 dark:bg-[#0b111a] border border-slate-200 dark:border-[#212e3e] rounded-xl px-4 py-3 text-sm text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  :class="{ 'border-red-500': errors.name }" data-error="name" />
                <p v-if="errors.name" class="text-xs text-red-500 mt-1">{{ errors.name }}</p>
              </div>
              <div>
                <label class="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Description</label>
                <textarea v-model="form.description" rows="3" placeholder="Describe your venue, facilities, and special features..."
                  class="w-full bg-slate-50 dark:bg-[#0b111a] border border-slate-200 dark:border-[#212e3e] rounded-xl px-4 py-3 text-sm text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"></textarea>
              </div>
            </div>
          </div>

          <!-- Location -->
          <div class="bg-white dark:bg-[#131c27] rounded-2xl border border-slate-200 dark:border-[#212e3e] p-6">
            <h2 class="text-lg font-bold text-slate-900 dark:text-white mb-4">📍 Location</h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">City *</label>
                <select v-model="form.city" class="w-full bg-slate-50 dark:bg-[#0b111a] border border-slate-200 dark:border-[#212e3e] rounded-xl px-4 py-3 text-sm text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  :class="{ 'border-red-500': errors.city }">
                  <option value="">Select city</option>
                  <option v-for="city in cities" :key="city" :value="city">{{ city }}</option>
                </select>
                <p v-if="errors.city" class="text-xs text-red-500 mt-1">{{ errors.city }}</p>
              </div>
              <div v-if="form.city === 'Addis Ababa'">
                <label class="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Sub-City *</label>
                <select v-model="form.sub_city" class="w-full bg-slate-50 dark:bg-[#0b111a] border border-slate-200 dark:border-[#212e3e] rounded-xl px-4 py-3 text-sm text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  :class="{ 'border-red-500': errors.sub_city }">
                  <option value="">Select sub-city</option>
                  <option v-for="sub in subCities" :key="sub" :value="sub">{{ sub }}</option>
                </select>
                <p v-if="errors.sub_city" class="text-xs text-red-500 mt-1">{{ errors.sub_city }}</p>
              </div>
              <div class="sm:col-span-2">
                <label class="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Specific Location / Address *</label>
                <input v-model="form.location" type="text" placeholder="e.g., Near Sarbeet Church, Addis Ababa"
                  class="w-full bg-slate-50 dark:bg-[#0b111a] border border-slate-200 dark:border-[#212e3e] rounded-xl px-4 py-3 text-sm text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  :class="{ 'border-red-500': errors.location }" />
                <p v-if="errors.location" class="text-xs text-red-500 mt-1">{{ errors.location }}</p>
              </div>
            </div>
          </div>

          <!-- Venue Details -->
          <div class="bg-white dark:bg-[#131c27] rounded-2xl border border-slate-200 dark:border-[#212e3e] p-6">
            <h2 class="text-lg font-bold text-slate-900 dark:text-white mb-4">⚽ Venue Details</h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div class="sm:col-span-2">
                <label class="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Sport Types *</label>
                <div class="flex flex-wrap gap-2">
                  <label v-for="sport in sportOptions" :key="sport"
                    class="inline-flex items-center gap-2 px-4 py-2 rounded-xl border cursor-pointer transition-all"
                    :class="[selectedSportTypes.includes(sport) ? 'bg-emerald-500/10 border-emerald-500 dark:border-emerald-500' : 'bg-slate-50 dark:bg-[#0b111a] border-slate-200 dark:border-[#212e3e]']">
                    <input type="checkbox" :value="sport" v-model="selectedSportTypes" class="hidden" />
                    <span class="text-sm text-black font-medium">{{ sport }}</span>
                  </label>
                </div>
                <p v-if="errors.sportTypes" class="text-xs text-red-500 mt-1">{{ errors.sportTypes }}</p>
              </div>
              <div>
                <label class="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Capacity *</label>
                <input v-model.number="form.capacity" type="number" min="1" placeholder="e.g., 50"
                  class="w-full bg-slate-50 dark:bg-[#0b111a] border border-slate-200 dark:border-[#212e3e] rounded-xl px-4 py-3 text-sm text-black focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  :class="{ 'border-red-500': errors.capacity }" />
                <p v-if="errors.capacity" class="text-xs text-red-500 mt-1">{{ errors.capacity }}</p>
              </div>
              <div>
                <label class="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Price per Hour (ETB) *</label>
                <input v-model.number="form.price_per_hour" type="number" min="0" step="50" placeholder="e.g., 500"
                  class="w-full bg-slate-50 dark:bg-[#0b111a] border border-slate-200 dark:border-[#212e3e] rounded-xl px-4 py-3 text-sm text-black focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  :class="{ 'border-red-500': errors.price_per_hour }" />
                <p v-if="errors.price_per_hour" class="text-xs text-red-500 mt-1">{{ errors.price_per_hour }}</p>
              </div>
            </div>
          </div>

          <!-- Facilities -->
          <div class="bg-white dark:bg-[#131c27] rounded-2xl border border-slate-200 dark:border-[#212e3e] p-6">
            <h2 class="text-lg font-bold text-slate-900 dark:text-white mb-4">🏗️ Facilities & Amenities</h2>
            <div class="flex flex-wrap gap-2">
              <label v-for="facility in facilityOptions" :key="facility"
                class="inline-flex items-center gap-2 px-4 py-2 rounded-xl border cursor-pointer transition-all"
                :class="[selectedFacilities.includes(facility) ? 'bg-emerald-500/10 border-emerald-500 dark:border-emerald-500' : 'bg-slate-50 dark:bg-[#0b111a] border-slate-200 dark:border-[#212e3e]']">
                <input type="checkbox" :value="facility" v-model="selectedFacilities" class="hidden" />
                <span class="text-sm text-black font-medium">{{ facility }}</span>
              </label>
            </div>
          </div>

          <!-- Image Upload -->
          <div class="bg-white dark:bg-[#131c27] rounded-2xl border border-slate-200 dark:border-[#212e3e] p-6">
            <h2 class="text-lg font-bold text-slate-900 dark:text-white mb-4">🖼️ Venue Image *</h2>
            <div class="relative border-2 border-dashed border-slate-300 dark:border-[#212e3e] rounded-2xl p-8 text-center hover:border-emerald-500 dark:hover:border-emerald-500 transition-colors"
              :class="{ 'border-red-500': errors.image }" @dragover.prevent
              @drop.prevent="(e) => { const file = e.dataTransfer.files[0]; if (file) handleImageUpload({ target: { files: [file] } }) }">
              <div v-if="!form.imagePreview" class="space-y-3">
                <div class="text-4xl">📸</div>
                <div class="text-sm text-slate-500 dark:text-slate-400">Drag and drop your image here, or click to browse</div>
                <div class="text-xs text-slate-400">JPEG, PNG, JPG (max 2MB)</div>
                <input id="image-upload" type="file" accept="image/jpeg,image/png,image/jpg" @change="handleImageUpload"
                  class="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
              </div>
              <div v-else class="relative">
                <img :src="form.imagePreview" alt="Venue preview" class="max-h-64 mx-auto rounded-xl object-contain" />
                <button type="button" @click="removeImage"
                  class="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm shadow-lg">✕</button>
              </div>
            </div>
            <p v-if="errors.image" class="text-xs text-red-500 mt-2">{{ errors.image }}</p>
          </div>

          <!-- Submit -->
          <div class="flex flex-col sm:flex-row gap-4 justify-end">
            <button type="button" @click="resetForm"
              class="px-6 py-3 border border-slate-200 dark:border-[#212e3e] rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-[#0b111a] transition">Reset Form</button>
            <button type="submit" :disabled="isLoading"
              class="px-8 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl shadow-md transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
              <span v-if="isLoading" class="animate-spin">⏳</span>
              <span>{{ isLoading ? 'Registering...' : 'Register Venue' }}</span>
            </button>
          </div>
          
          <!-- Note about approval -->
          <div class="text-center text-sm text-slate-500 dark:text-slate-400 border-t border-slate-200 dark:border-[#212e3e] pt-6">
            <p>📌 Your venue will be reviewed by admin and will appear after approval.</p>
          </div>
        </form>
      </template>
    </div>
  </div>
</template>