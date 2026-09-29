<!-- app/layouts/default.vue -->
<template>
  <div class="min-h-screen w-full flex flex-col bg-[#0b111a] text-white font-sans">

    <!-- Navbar -->
    <Navbar />

    <!-- Main page content -->
    <main class="flex-grow">
      <slot />
    </main>

    <!-- Footer -->
    <Footer />

  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useAuthStore } from '~/stores/auth'

const authStore = useAuthStore()

/* ═══════════════════════════════════════════
   INIT AUTH — ገጹ ሲጫን ሁልጊዜ አስፈጽም
   ═══════════════════════════════════════════ */
onMounted(() => {
  // ✅ 1. Token + user ከ localStorage/cookie መልስ
  authStore.init()

  // ✅ 2. Token ካለ → የቅርብ ጊዜ user data (avatar ወዘተ) አድስ
  if (authStore.token && authStore.fetchUser) {
    authStore.fetchUser().catch(() => {})
  }
})
</script>