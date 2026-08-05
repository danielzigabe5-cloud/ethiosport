<script setup>
import { ref } from 'vue'

definePageMeta({ layout: 'partner' })
useHead({ title: 'Add Venue - EthioSport' })

const form = ref({
  name: '',
  sportType: '5v5',
  priceDay: '',
  priceNight: '',
  amenities: []
})

const saveVenue = () => {
  alert('አዲስ ሜዳ በተሳካ ሁኔታ ተመዝግቧል!')
  navigateTo('/partner/venues')
}
</script>

<template>
  <div class="max-w-2xl mx-auto space-y-6">
    <div class="border-b border-[#1a2432] pb-6">
      <h1 class="text-2xl font-black text-white">➕ አዲስ ሜዳ መመዝገቢያ</h1>
      <p class="text-xs text-slate-400">የሜዳውን ዝርዝር መረጃዎች በመሙላት ያስገቡ</p>
    </div>

    <form @submit.prevent="saveVenue" class="bg-[#0b111a] border border-[#1a2432] p-6 rounded-3xl space-y-4 text-xs">
      <div>
        <label class="block text-slate-400 mb-1">የሜዳው ስም</label>
        <input v-model="form.name" type="text" placeholder="ለምሳሌ፡ Pitch C (5v5)" required class="w-full bg-[#131c27] border border-[#1a2432] rounded-xl p-3 text-white focus:outline-none focus:border-emerald-500">
      </div>

      <div>
        <label class="block text-slate-400 mb-1">የስፖርት ዓይነት</label>
        <select v-model="form.sportType" class="w-full bg-[#131c27] border border-[#1a2432] rounded-xl p-3 text-white focus:outline-none focus:border-emerald-500">
          <option value="5v5">5v5 Football</option>
          <option value="7v7">7v7 Football</option>
          <option value="Tennis">Tennis</option>
          <option value="Basketball">Basketball</option>
        </select>
      </div>

      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="block text-slate-400 mb-1">የቀን ዋጋ (በሰዓት ETB)</label>
          <input v-model="form.priceDay" type="number" placeholder="500" required class="w-full bg-[#131c27] border border-[#1a2432] rounded-xl p-3 text-white focus:outline-none focus:border-emerald-500">
        </div>
        <div>
          <label class="block text-slate-400 mb-1">የማታ ዋጋ (በሰዓት ETB)</label>
          <input v-model="form.priceNight" type="number" placeholder="600" required class="w-full bg-[#131c27] border border-[#1a2432] rounded-xl p-3 text-white focus:outline-none focus:border-emerald-500">
        </div>
      </div>

      <div class="flex gap-3 pt-4">
        <NuxtLink to="/partner/venues" class="flex-1 py-3 text-center rounded-xl bg-[#131c27] text-slate-300 font-bold">ሰርዝ</NuxtLink>
        <button type="submit" class="flex-1 py-3 rounded-xl bg-emerald-500 text-slate-950 font-black">ሜዳውን መዝግብ</button>
      </div>
    </form>
  </div>
</template>