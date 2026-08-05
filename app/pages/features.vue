<template>
  <div class="min-h-screen bg-[#0b111a] py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- Header -->
      <div class="text-center max-w-3xl mx-auto space-y-4 mb-12">
        <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
          <Icon name="lucide:layers" class="w-4 h-4" />
          <span>{{ lang === 'am' ? 'የ ETHIO-MEDA ገፅታዎች' : 'ETHIO-MEDA Core Features' }}</span>
        </div>
        <h1 class="text-3xl sm:text-5xl font-black text-white leading-tight">
          {{ lang === 'am'
              ? 'በኢትዮጵያ የስፖርት ሜዳዎችን አያያዝ የቀየሩ ገፅታዎች'
              : 'Everything You Need for Modern Pitch Reservation & Play' }}
        </h1>
        <p class="text-gray-400 text-sm sm:text-base leading-relaxed">
          {{ lang === 'am'
              ? 'ለተጫዋቾች፣ ለቡድን አደራጆች እና ለሜዳ ባለቤቶች የተዘጋጁ ዘመናዊ የዲጂታል መሳሪያዎች።'
              : 'Designed specifically for local players, team organizers, and sports pitch owners across Ethiopia.' }}
        </p>
      </div>

      <!-- Grid of Features -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="(item, idx) in featureList"
          :key="idx"
          class="bg-[#131c27] border border-[#212e3e] hover:border-emerald-500/50 p-6 rounded-2xl space-y-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-emerald-500/5"
        >
          <div class="w-12 h-12 rounded-xl bg-[#0b111a] border border-[#212e3e] flex items-center justify-center shadow-inner">
            <Icon :name="item.icon" class="w-6 h-6" :class="item.iconColor" />
          </div>
          <h3 class="text-lg font-bold text-white">{{ item.title }}</h3>
          <p class="text-sm text-gray-400 leading-relaxed">{{ item.description }}</p>
          
          <!-- Learn More Link -->
          <NuxtLink 
            :to="item.link || '/features'"
            class="inline-flex items-center gap-1 text-emerald-400 hover:text-emerald-300 text-sm font-semibold transition group"
          >
            {{ lang === 'am' ? 'ተጨማሪ ይወቁ' : 'Learn More' }}
            <Icon name="lucide:arrow-right" class="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </NuxtLink>
        </div>
      </div>

      <!-- CTA Section -->
      <div class="mt-12 bg-gradient-to-r from-emerald-900/40 via-[#131c27] to-teal-900/40 border border-emerald-500/30 rounded-3xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
        <div class="space-y-2 text-center md:text-left">
          <h3 class="text-2xl font-black text-white">
            {{ lang === 'am' ? 'አሁኑኑ ሜዳዎን ማስያዝ ይፈልጋሉ?' : 'Ready to Reserve Your Field Slot?' }}
          </h3>
          <p class="text-sm text-gray-300">
            {{ lang === 'am'
                ? 'በአቅራቢያዎ ያሉትን ሜዳዎች በመመልከት ክፍት ሰዓቶችን ይያዙ።'
                : 'Browse 50+ verified pitches in Addis Ababa, Hawassa & regional hubs.' }}
          </p>
        </div>
        
        <NuxtLink
          to="/venues"
          class="bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-6 py-3.5 rounded-xl shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all flex items-center gap-2 text-sm shrink-0"
        >
          <span>{{ lang === 'am' ? 'ሜዳዎችን ይመልከቱ' : 'Explore All Venues' }}</span>
          <Icon name="lucide:chevron-right" class="w-4 h-4" />
        </NuxtLink>
      </div>

      <!-- Stats Section -->
      <div class="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div class="bg-[#131c27] border border-[#212e3e] rounded-xl p-6 text-center hover:border-emerald-500/30 transition">
          <div class="text-3xl font-bold text-emerald-400">50+</div>
          <div class="text-sm text-gray-400 mt-1">{{ lang === 'am' ? 'የተረጋገጡ ሜዳዎች' : 'Verified Venues' }}</div>
        </div>
        <div class="bg-[#131c27] border border-[#212e3e] rounded-xl p-6 text-center hover:border-emerald-500/30 transition">
          <div class="text-3xl font-bold text-emerald-400">12K+</div>
          <div class="text-sm text-gray-400 mt-1">{{ lang === 'am' ? 'ጨዋታዎች ተካሂደዋል' : 'Matches Played' }}</div>
        </div>
        <div class="bg-[#131c27] border border-[#212e3e] rounded-xl p-6 text-center hover:border-emerald-500/30 transition">
          <div class="text-3xl font-bold text-emerald-400">10K+</div>
          <div class="text-sm text-gray-400 mt-1">{{ lang === 'am' ? 'ንቁ ተጫዋቾች' : 'Active Players' }}</div>
        </div>
        <div class="bg-[#131c27] border border-[#212e3e] rounded-xl p-6 text-center hover:border-emerald-500/30 transition">
          <div class="text-3xl font-bold text-emerald-400">4.9★</div>
          <div class="text-sm text-gray-400 mt-1">{{ lang === 'am' ? 'አማካይ ደረጃ' : 'Average Rating' }}</div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
// ============================================
// PROPS
// ============================================

const props = withDefaults(
  defineProps<{
    lang?: 'am' | 'en';
  }>(),
  {
    lang: 'am',
  }
)

// ============================================
// FEATURES DATA
// ============================================

const featureList = [
  {
    icon: 'lucide:zap',
    iconColor: 'text-emerald-400',
    title: props.lang === 'am' ? 'በቅጽበት ማስያዣ' : 'Instant Slot Booking',
    description: props.lang === 'am'
      ? 'በስልክዎ የሜዳውን ክፍት ሰዓት አይተው በደቂቃዎች ውስጥ ማስያዣዎን ያረጋግጣሉ።'
      : 'Real-time pitch availability engine so you can reserve daytime or evening slots instantly.',
    link: '/features/booking'
  },
  {
    icon: 'lucide:smartphone',
    iconColor: 'text-amber-400',
    title: props.lang === 'am' ? 'የቴሌብር እና CBE ክፍያ' : 'Telebirr & CBE Payment',
    description: props.lang === 'am'
      ? 'በሀገራችን ተወዳጅ በሆኑት ቴሌብር እና ሲቢኢ ብር ክፍያዎን በሙሉ ደህንነት ይፈጽሙ።'
      : 'Seamless mobile wallet payment with Telebirr, CBE Birr, and automatic SMS receipt vouchers.',
    link: '/features/payment'
  },
  {
    icon: 'lucide:users',
    iconColor: 'text-teal-400',
    title: props.lang === 'am' ? 'JustPlay - የተጫዋች ማገናኛ' : 'JustPlay Solo Matchmaker',
    description: props.lang === 'am'
      ? 'ብቸኛ ተጫዋች ነዎት? JustPlay ን በመጠቀም ከአቅራቢያዎ ካሉ ሌሎች ቡድኖች ጋር ይገናኙ።'
      : 'Solo player system connecting individual athletes with open pickup matches looking for extra players.',
    link: '/features/justplay'
  },
  {
    icon: 'lucide:moon',
    iconColor: 'text-[#10b981]',
    title: props.lang === 'am' ? 'የምሽት ፍሉድላይት ሜዳዎች' : 'Night Floodlight Pitches',
    description: props.lang === 'am'
      ? 'ከስራ በኋላ በምሽት መጫወት ለሚፈልጉ በቂ የመብራት አቅርቦት ያላቸው ሜዳዎች።'
      : 'Filter pitches equipped with professional stadium-grade LED floodlights for late evening matches.',
    link: '/features/floodlights'
  },
  {
    icon: 'lucide:award',
    iconColor: 'text-amber-400',
    title: props.lang === 'am' ? 'የቶርናመንት እና ሊግ አዘጋጅ' : 'Tournament Brackets',
    description: props.lang === 'am'
      ? 'የድርጅት ወይም የጓደኛሞች ውድድሮችን በ ETHIO-MEDA በኩል ያዘጋጁ እና ያስተዳድሩ።'
      : 'Complete tournament organizer system with knockout brackets, match scheduling, and leaderboard tracking.',
    link: '/features/tournaments'
  },
  {
    icon: 'lucide:shield-check',
    iconColor: 'text-emerald-400',
    title: props.lang === 'am' ? 'የዳኛ ማስያዣ' : 'Certified Referee Hire',
    description: props.lang === 'am'
      ? 'ለጨዋታዎ የኢትዮጵያ እግር ኳስ ፌዴሬሽን የተመሰከረላቸው ዳኞችን በቅጽበት ይዘዙ።'
      : 'Hire certified local referees directly through the app to maintain fair play in your competitive matches.',
    link: '/features/referees'
  }
]

// ============================================
// SEO
// ============================================

useHead({
  title: props.lang === 'am' ? 'ገፅታዎች - ETHIO-MEDA' : 'Features - ETHIO-MEDA',
  meta: [
    { 
      name: 'description', 
      content: props.lang === 'am' 
        ? 'የ ETHIO-MEDA ገፅታዎች - በኢትዮጵያ የስፖርት ሜዳዎችን አያያዝ የቀየሩ ዘመናዊ መሳሪያዎች'
        : 'ETHIO-MEDA features - Modern tools for sports pitch management in Ethiopia' 
    }
  ]
})
</script>

<style scoped>
/* Smooth hover transitions */
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: #0b111a;
}

::-webkit-scrollbar-thumb {
  background: #212e3e;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #10b981;
}
</style>