<template>
  <div class="min-h-screen bg-[#06090e] text-slate-100 font-sans selection:bg-emerald-500 selection:text-white">
    
    <!-- 1. HERO SECTION -->
    <section class="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28">
      <!-- Glow background effects -->
      <div class="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div class="absolute top-1/3 right-10 w-72 h-72 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="text-center space-y-6 max-w-3xl mx-auto">
          
          <span class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs sm:text-sm font-semibold tracking-wide">
            <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            በኢትዮጵያ የመጀመሪያው የስፖርትና ሜዳዎች መድረክ
          </span>

          <h1 class="text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight">
            ሜዳ ያስይዙ፣ ተጋጣሚ ይፈልጉ፣ <span class="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">Just Play!</span>
          </h1>

          <p class="text-slate-400 text-base sm:text-lg leading-relaxed font-light">
            በአቅራቢያዎ ያሉ የስፖርት ሜዳዎችን በሰዓት ያስይዙ፣ ከሌሎች ተጫዋቾች ጋር ጨዋታዎችን ያዘጋጁ ወይም የቅርብ ጊዜ የስፖርት ዝግጅቶችን ይከታተሉ።
          </p>

          <!-- Action Buttons -->
          <div class="flex flex-wrap items-center justify-center gap-4 pt-4">
            <NuxtLink 
              to="/booking" 
              class="px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-2xl shadow-lg shadow-emerald-900/40 transition hover:-translate-y-0.5 text-sm sm:text-base"
            >
              ⚽ ሜዳ አሁን ያስይዙ
            </NuxtLink>

            <NuxtLink 
              to="/events" 
              class="px-8 py-4 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 font-bold rounded-2xl transition hover:-translate-y-0.5 text-sm sm:text-base"
            >
              🏆 ዝግጅቶችና ትኬቶች
            </NuxtLink>
          </div>

          <!-- Quick Stats -->
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-12 border-t border-slate-800/80 mt-12">
            <div class="p-4 bg-slate-900/40 border border-slate-800/60 rounded-2xl">
              <p class="text-2xl sm:text-3xl font-extrabold text-white">50+</p>
              <p class="text-xs text-slate-400 mt-1">የተመዘገቡ ሜዳዎች</p>
            </div>
            <div class="p-4 bg-slate-900/40 border border-slate-800/60 rounded-2xl">
              <p class="text-2xl sm:text-3xl font-extrabold text-white">10+</p>
              <p class="text-xs text-slate-400 mt-1">የስፖርት አይነቶች</p>
            </div>
            <div class="p-4 bg-slate-900/40 border border-slate-800/60 rounded-2xl">
              <p class="text-2xl sm:text-3xl font-extrabold text-white">1,200+</p>
              <p class="text-xs text-slate-400 mt-1">ንቁ ተጫዋቾች</p>
            </div>
            <div class="p-4 bg-slate-900/40 border border-slate-800/60 rounded-2xl">
              <p class="text-2xl sm:text-3xl font-extrabold text-white">6+</p>
              <p class="text-xs text-slate-400 mt-1">ዋና ዋና ከተሞች</p>
            </div>
          </div>

        </div>
      </div>
    </section>

    <!-- 2. MAIN SERVICES / FEATURES -->
    <section class="py-16 bg-[#090d16] border-y border-slate-800/60">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div class="text-center space-y-3">
          <h2 class="text-2xl sm:text-4xl font-extrabold text-white">ምን ማድረገ ይፈልጋሉ?</h2>
          <p class="text-slate-400 text-sm">ለእርስዎ የተዘጋጁ የ JustPlay ዋና ዋና አገልግሎቶች</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <!-- Feature 1 -->
          <div class="bg-[#0c111d] border border-slate-800 rounded-3xl p-8 hover:border-emerald-500/50 transition duration-300 space-y-4 flex flex-col justify-between">
            <div class="space-y-4">
              <div class="w-14 h-14 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-center justify-center text-3xl">
                🏟️
              </div>
              <h3 class="text-xl font-bold text-white">ሜዳ በሰዓት ማስያዝ</h3>
              <p class="text-slate-400 text-sm leading-relaxed">
                የእግር ኳስ፣ የባስኬትቦል፣ የቴኒስ እና ሌሎች ሜዳዎችን ክፍት ሰዓት በማየት በቀላሉ በ Telebirr ወይም Chapa ያስይዙ።
              </p>
            </div>
            <NuxtLink to="/booking" class="inline-flex items-center text-emerald-400 text-sm font-semibold hover:gap-2 transition-all">
              ሜዳዎችን ይመልከቱ &rarr;
            </NuxtLink>
          </div>

          <!-- Feature 2 -->
          <div class="bg-[#0c111d] border border-slate-800 rounded-3xl p-8 hover:border-emerald-500/50 transition duration-300 space-y-4 flex flex-col justify-between">
            <div class="space-y-4">
              <div class="w-14 h-14 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-center justify-center text-3xl">
                👥
              </div>
              <h3 class="text-xl font-bold text-white">የጨዋታ ቡድን & ተጋጣሚ ማግኘት</h3>
              <p class="text-slate-400 text-sm leading-relaxed">
                ተጋጣሚ ቡድን ይጎድልዎታል? ወይም ብቻዎን ነዎት? በከተማዎ ውስጥ ጨዋታ የሚፈልጉ ሰዎችን እና ቡድኖችን ያግኙ።
              </p>
            </div>
            <NuxtLink to="/justplay" class="inline-flex items-center text-emerald-400 text-sm font-semibold hover:gap-2 transition-all">
              ተጋጣሚ ፈልግ &rarr;
            </NuxtLink>
          </div>

          <!-- Feature 3 -->
          <div class="bg-[#0c111d] border border-slate-800 rounded-3xl p-8 hover:border-emerald-500/50 transition duration-300 space-y-4 flex flex-col justify-between">
            <div class="space-y-4">
              <div class="w-14 h-14 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-center justify-center text-3xl">
                🎟️
              </div>
              <h3 class="text-xl font-bold text-white">የስፖርት Events & ትኬቶች</h3>
              <p class="text-slate-400 text-sm leading-relaxed">
                በከተማዎ የሚካሄዱ ታላላቅ የስፖርት ውድድሮችን፣ ማራቶኖችን እና ዝግጅቶችን ይከታተሉ፣ ዲጂታል QR ትኬት ይቁረጡ።
              </p>
            </div>
            <NuxtLink to="/events" class="inline-flex items-center text-emerald-400 text-sm font-semibold hover:gap-2 transition-all">
              ዝግጅቶችን ተመልከት &rarr;
            </NuxtLink>
          </div>

        </div>
      </div>
    </section>

    <!-- 3. SPORTS DIRECTORY PREVIEW -->
    <section class="py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h2 class="text-2xl sm:text-3xl font-bold text-white">በየስፖርት አይነቱ ይሹፉ</h2>
            <p class="text-slate-400 text-sm mt-1">የሚወዱትን ስፖርት በመምረጥ የመጫወቻ ቦታዎችንና መረጃዎችን ያግኙ</p>
          </div>
          <NuxtLink to="/sports" class="text-emerald-400 text-sm font-semibold hover:underline">
            ሁሉንም ስፖርቶች ተመልከት &rarr;
          </NuxtLink>
        </div>

        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          <NuxtLink 
            v-for="sport in popularSports" 
            :key="sport.name" 
            to="/sports"
            class="bg-[#0b0f19] border border-slate-800 hover:border-emerald-500/50 rounded-2xl p-5 text-center transition group hover:-translate-y-1"
          >
            <span class="text-4xl block mb-2 group-hover:scale-110 transition duration-200">{{ sport.icon }}</span>
            <span class="text-sm font-semibold text-slate-200 block">{{ sport.name }}</span>
            <span class="text-[11px] text-slate-500 block mt-1">{{ sport.count }} ሜዳዎች</span>
          </NuxtLink>
        </div>

      </div>
    </section>

    <!-- 4. CALL TO ACTION (CTA) -->
    <section class="py-16 px-4">
      <div class="max-w-5xl mx-auto bg-gradient-to-r from-emerald-900/40 via-slate-900 to-slate-900 border border-emerald-500/30 rounded-3xl p-8 sm:p-12 text-center space-y-6 shadow-2xl relative overflow-hidden">
        <h2 class="text-2xl sm:text-4xl font-extrabold text-white">የስፖርት ሜዳ ወይም የውድድር አዘጋጅ ነዎት?</h2>
        <p class="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          ሜዳዎን በ JustPlay ላይ በመመዝገብ በሰዓት ያከራዩ፣ ወይም የራስዎን የስፖርት ኩነት (Event) በመፖሰት የትኬት ሽያጭዎን ያሳድጉ!
        </p>
        <div class="pt-2">
          <NuxtLink 
            to="/events" 
            class="inline-block bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-8 py-3.5 rounded-xl transition text-sm shadow-lg shadow-emerald-950"
          >
            + Event / ሜዳ ያስመዝግቡ
          </NuxtLink>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup>
import { ref } from 'vue'

// Popular sports quick links data
const popularSports = ref([
  { name: 'እግር ኳስ', icon: '⚽', count: '32+' },
  { name: 'ባስኬትቦል', icon: '🏀', count: '14+' },
  { name: 'ቴኒስ', icon: '🎾', count: '8+' },
  { name: 'ቮሊቦል', icon: '🏐', count: '10+' },
  { name: 'ሩጫ / Hiking', icon: '🏃', count: '12+' },
  { name: 'ጎልፍ', icon: '⛳', count: '3+' }
])
</script>