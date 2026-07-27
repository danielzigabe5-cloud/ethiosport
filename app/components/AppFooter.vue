<template>
  <footer class="bg-slate-950 border-t border-slate-900 pt-16 pb-8 px-6">
    <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
      
      <!-- ብራንድ መረጃ (Brand Info) -->
      <div class="space-y-6">
        <NuxtLink to="/" class="text-2xl font-bold text-white flex items-center gap-2">
          Ethio<span class="text-emerald-500">Sport</span> Hub
        </NuxtLink>
        <p class="text-slate-400 leading-relaxed text-sm">
          የኢትዮጵያ የስፖርት መረጃዎች፣ የቀጥታ ውጤቶች፣ Just Play ማህበረሰብ እና የሜዳ ማስያዣ ፕላትፎርም።
        </p>
        <!-- Social Icons (አማራጭ) -->
        <div class="flex gap-4">
          <a href="#" class="p-2 bg-slate-900 rounded-full text-slate-400 hover:text-emerald-500 transition"><Icon name="uil:facebook" size="20" /></a>
          <a href="#" class="p-2 bg-slate-900 rounded-full text-slate-400 hover:text-emerald-500 transition"><Icon name="uil:telegram" size="20" /></a>
          <a href="#" class="p-2 bg-slate-900 rounded-full text-slate-400 hover:text-emerald-500 transition"><Icon name="uil:twitter" size="20" /></a>
        </div>
      </div>

      <!-- ፈጣን ሊንኮች (Quick Links) -->
      <div>
        <h4 class="text-white font-bold mb-6">ፈጣን ሊንኮች</h4>
        <ul class="space-y-4">
          <li v-for="link in quickLinks" :key="link.name">
            <NuxtLink :to="link.path" class="text-slate-400 hover:text-emerald-500 transition text-sm">
              {{ link.name }}
            </NuxtLink>
          </li>
        </ul>
      </div>

      <!-- ስፖርቶች (Sports List) -->
      <div>
        <h4 class="text-white font-bold mb-6">ስፖርቶች</h4>
        <ul class="space-y-4">
          <li v-for="sport in sports" :key="sport">
            <NuxtLink to="/games" class="text-slate-400 hover:text-emerald-500 transition text-sm flex items-center gap-2">
              <span class="w-1 h-1 bg-emerald-500 rounded-full"></span>
              {{ sport }}
            </NuxtLink>
          </li>
        </ul>
      </div>

      <!-- ኒውስሌተር (Newsletter) -->
      <div class="space-y-6">
        <h4 class="text-white font-bold">ዜናዎች እንዲደርስዎ</h4>
        <p class="text-slate-400 text-sm">አዳዲስ መረጃዎችን ለማግኘት ይመዝገቡ።</p>
        <form @submit.prevent="handleSubscribe" class="flex flex-col gap-3">
          <input 
            type="email" 
            placeholder="ኢሜይልዎን ያስገቡ..." 
            class="bg-slate-900 border border-slate-800 text-white rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            required
          >
          <button type="submit" class="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-3 rounded-lg transition-all text-sm">
            ተመዝገብ
          </button>
        </form>
      </div>

    </div>

    <!-- የታችኛው ክፍል (Bottom Bar) -->
    <div class="max-w-7xl mx-auto mt-16 pt-8 border-t border-slate-900 text-center">
      <p class="text-slate-500 text-sm">
        &copy; {{ new Date().getFullYear() }} EthioSport Hub. መብቱ በህግ የተጠበቀ ነው።
      </p>
    </div>
  </footer>
</template>

<script setup>
const quickLinks = [
  { name: 'ዋና ገጽ', path: '/' },
  { name: 'ባህሪያት', path: '/#features' },
  { name: 'ጨዋታዎች', path: '/games' },
  { name: 'Just Play', path: '/justplay' },
  { name: 'Events', path: '/events' },
  { name: 'ብሎግ', path: '/blogs' },
]

const sports = ['እግር ኳስ', 'ባስኬትቦል', 'ቮሊቦል', 'አትሌቲክስ']

const handleSubscribe = () => {
  alert('ለዜና መፅሄታችን ስለተመዘገቡ እናመሰግናለን!')
}
</script>