<script setup lang="ts">
import { ref } from 'vue'

definePageMeta({ layout: 'partner' })

const activeTab = ref('profile')
const profileData = ref({ fullName: 'የባለቤቱ ስም', email: 'owner@example.com', phone: '0911223344', businessName: 'የሜዳ ስም' })
</script>

<template>
  <div class="space-y-6 p-6 max-w-5xl">
    <div>
      <h1 class="text-2xl font-black text-white">የመለያ ቅንብሮች (Settings)</h1>
      <p class="text-xs text-slate-400 mt-1">ይህ ገጽ እየሰራ ነው! (የሙከራ ስሪት)</p>
    </div>

    <!-- Navigation Tabs -->
    <div class="flex items-center gap-2 border-b border-[#1a2432] pb-2">
      <button @click="activeTab = 'profile'" class="px-4 py-2 text-xs font-bold text-emerald-400 border-b-2 border-emerald-400">
        የፕሮፋይል መረጃ
      </button>
    </div>

    <!-- Form Section -->
    <div class="bg-[#0d1522] border border-[#1a2432] rounded-2xl p-6">
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label class="block text-xs font-semibold text-slate-300 mb-1">ሙሉ ስም</label>
          <input v-model="profileData.fullName" type="text" class="w-full bg-[#070c14] border border-[#1a2432] rounded-xl px-4 py-2.5 text-xs text-white" />
        </div>
        <div>
          <label class="block text-xs font-semibold text-slate-300 mb-1">ኢሜይል</label>
          <input v-model="profileData.email" type="email" class="w-full bg-[#070c14] border border-[#1a2432] rounded-xl px-4 py-2.5 text-xs text-white" />
        </div>
      </div>
      <button class="mt-6 bg-emerald-500 text-slate-950 px-6 py-2.5 rounded-xl font-bold text-xs">
        ለውጦችን አስቀምጥ
      </button>
    </div>
  </div>
</template>