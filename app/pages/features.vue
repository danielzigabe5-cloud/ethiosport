<template>
  <div class="min-h-screen bg-slate-950 py-20 px-6">
    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-16">
        <h1 class="text-4xl md:text-5xl font-extrabold text-white mb-4">የፕላትፎርሙ ልዩ ባህሪያት</h1>
        <p class="text-slate-400 max-w-2xl mx-auto text-lg">
          EthioSport Hub ለኢትዮጵያ ስፖርት አፍቃሪዎች ዘመናዊ እና ቀልጣፋ አሰራርን ይዞ ቀርቧል።
        </p>
      </div>

      <!-- Features Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="feature in features" :key="feature.title" 
          class="bg-slate-900 border border-slate-800 p-8 rounded-2xl hover:border-emerald-500/50 transition-all group">
          <div class="text-4xl mb-6 group-hover:scale-110 transition-transform">{{ feature.icon }}</div>
          <h3 class="text-xl font-bold text-white mb-4">{{ feature.title }}</h3>
          <p class="text-slate-400 leading-relaxed text-sm">{{ feature.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const features = [
  {
    icon: '🏟️',
    title: 'ቀላል የሜዳ ማስያዣ',
    description: 'በአቅራቢያዎ የሚገኙ የሳር እና የቤት ውስጥ ሜዳዎችን በደቂቃዎች ውስጥ ይፈልጉ እና ያስይዙ።'
  },
  {
    icon: '⚽',
    title: 'Just Play (ተጫወቱ)',
    description: 'የሚጫወቱበት ቡድን ወይም ሰው ከሌለዎት በአቅራቢያዎ ካሉ ሌሎች ተጫዋቾች ጋር ይገናኙ።'
  },
  {
    icon: '📈',
    title: 'የቀጥታ ውጤቶች',
    description: 'የሀገር ውስጥ እና ዓለም አቀፍ ጨዋታዎችን ውጤቶች በቅጽበት ይከታተሉ።'
  },
  {
    icon: '💳',
    title: 'ዲጂታል ክፍያ',
    description: 'በቴሌብር (Telebirr) እና በቻፓ (Chapa) በመጠቀም አስተማማኝ ክፍያ ይፈጽሙ።'
  },
  {
    icon: '📅',
    title: 'የስፖርት ኩነቶች',
    description: 'ማራቶኖችን፣ የከተማ ውድድሮችን እና ሌሎች የስፖርት ዝግጅቶችን መረጃ ያግኙ።'
  },
  {
    icon: '📰',
    title: 'ዕለታዊ ዜናዎች',
    description: 'ትኩስ የስፖርት መረጃዎችን እና የዝውውር ዜናዎችን በቀጥታ ያግኙ።'
  }
]
</script>