<script setup>
useHead({ title: 'Settings - EthioSport' })

const user = useState('user', () => ({
  name: 'አበበ በቀለ',
  email: 'abebe.bekele@example.com',
  phone: '+251 911 22 33 44',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250'
}))

const isSaved = ref(false)

const saveSettings = () => {
  isSaved.value = true
  setTimeout(() => isSaved.value = false, 3000)
}
</script>

<template>
  <div class="space-y-6 max-w-2xl">
    <div>
      <h2 class="text-xl font-bold text-white">⚙️ Account Settings</h2>
      <p class="text-xs text-slate-400">የግል መረጃዎችን እና የይለፍ ቃል ማስተካከያ ያድርጉ።</p>
    </div>

    <div v-if="isSaved" class="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl text-xs font-semibold">
      ✅ መረጃው በተካከለ ሁኔታ ተቀምጧል!
    </div>

    <form @submit.prevent="saveSettings" class="bg-[#0b111a] border border-[#1a2432] rounded-3xl p-6 space-y-4">
      <div class="space-y-1">
        <label class="text-xs font-semibold text-slate-300">ሙሉ ስም</label>
        <input v-model="user.name" type="text" class="w-full bg-[#131c27] border border-[#212e3e] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500" />
      </div>

      <div class="space-y-1">
        <label class="text-xs font-semibold text-slate-300">ኢሜይል</label>
        <input v-model="user.email" type="email" class="w-full bg-[#131c27] border border-[#212e3e] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500" />
      </div>

      <div class="space-y-1">
        <label class="text-xs font-semibold text-slate-300">ስልክ ቁጥር</label>
        <input v-model="user.phone" type="text" class="w-full bg-[#131c27] border border-[#212e3e] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500" />
      </div>

      <button type="submit" class="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl transition cursor-pointer">
        ለዉጦችን አስቀምጥ
      </button>
    </form>
  </div>
</template>