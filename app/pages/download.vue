<script setup lang="ts">
// Nuxt 4 - Auto-imported composables
definePageMeta({
  layout: 'default'
})

// Navigation function
const goToHome = () => {
  navigateTo('/')
}

// Notify function
const notifyMe = () => {
  // In Nuxt 4, you can use useToast or a simple alert
  alert('🔔 You will be notified when the app is available!')
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
    <div class="max-w-2xl w-full bg-white rounded-3xl shadow-2xl p-8 md:p-12 text-center">
      <!-- App Icon -->
      <div class="flex justify-center mb-6">
        <div class="w-24 h-24 bg-gradient-to-br from-green-600 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
          <svg class="w-14 h-14 text-white" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/>
          </svg>
        </div>
      </div>

      <!-- Title -->
      <h1 class="text-4xl md:text-5xl font-bold text-gray-800 mb-3">
        📱 Download Our App
      </h1>
      
      <p class="text-gray-500 text-lg mb-2">
        Get the best sports venue booking experience
      </p>

      <div class="w-20 h-1 bg-green-600 mx-auto rounded-full mb-8"></div>

      <!-- Coming Soon Badge -->
      <div class="inline-block bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full text-sm font-semibold mb-8">
        🚀 Coming Soon
      </div>

      <!-- Features -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 text-left">
        <div class="bg-gray-50 rounded-xl p-4 hover:shadow-md transition-shadow">
          <span class="text-2xl block mb-2">⚡</span>
          <h3 class="font-semibold text-gray-800">Fast Booking</h3>
          <p class="text-sm text-gray-500">Book venues in seconds</p>
        </div>
        <div class="bg-gray-50 rounded-xl p-4 hover:shadow-md transition-shadow">
          <span class="text-2xl block mb-2">📍</span>
          <h3 class="font-semibold text-gray-800">Nearby Venues</h3>
          <p class="text-sm text-gray-500">Find venues near you</p>
        </div>
        <div class="bg-gray-50 rounded-xl p-4 hover:shadow-md transition-shadow">
          <span class="text-2xl block mb-2">💳</span>
          <h3 class="font-semibold text-gray-800">Secure Payment</h3>
          <p class="text-sm text-gray-500">Safe and easy payments</p>
        </div>
      </div>

      <!-- Store Buttons -->
      <div class="space-y-4 mb-8">
        <p class="text-sm text-gray-400 uppercase tracking-wider">Available on</p>
        <div class="flex flex-col sm:flex-row justify-center gap-4">
          <button 
            class="flex items-center justify-center bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition-all hover:scale-105 shadow-lg w-full sm:w-auto"
            @click="navigateTo('https://apps.apple.com/app/combolojo', { external: true })"
          >
            <svg class="w-6 h-6 mr-3" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
            </svg>
            <div>
              <p class="text-[8px] uppercase opacity-70">Download on the</p>
              <p class="text-sm font-semibold">App Store</p>
            </div>
          </button>
          <button 
            class="flex items-center justify-center bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition-all hover:scale-105 shadow-lg w-full sm:w-auto"
            @click="navigateTo('https://play.google.com/store/apps/details?id=com.combolojo.app', { external: true })"
          >
            <svg class="w-6 h-6 mr-3" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734c0-.38.223-.727.609-.92zM14.5 12.71l-5.26 5.26 5.26-5.26zM14.5 11.29L9.24 6.03l5.26 5.26zM15.5 6.79l-1.79 1.79 1.79 1.79zM15.5 13.63l-1.79 1.79 1.79 1.79z"/>
            </svg>
            <div>
              <p class="text-[8px] uppercase opacity-70">Get it on</p>
              <p class="text-sm font-semibold">Google Play</p>
            </div>
          </button>
        </div>
      </div>

      <!-- Notify Button -->
      <button 
        @click="notifyMe"
        class="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl transition-all hover:scale-[1.02] shadow-lg mb-4"
      >
        🔔 Notify Me When Available
      </button>

      <!-- Back to Home -->
      <button 
        @click="goToHome"
        class="inline-flex items-center text-gray-500 hover:text-green-600 transition-colors text-sm cursor-pointer"
      >
        <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
        </svg>
        Go back home
      </button>
    </div>
  </div>
</template>

<style scoped>
/* Smooth transitions */
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

.hover\:scale-105:hover {
  transform: scale(1.05);
}

.hover\:scale-\[1.02\]:hover {
  transform: scale(1.02);
}

.hover\:shadow-md:hover {
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
}
</style>