<template>
  <div>
    <!-- Hero Section -->
    <section class="hero-section py-20 px-6 bg-gradient-to-b from-slate-900 to-slate-950 text-center relative overflow-hidden">
      <div class="max-w-4xl mx-auto space-y-6">
        <h1 class="text-3xl md:text-5xl font-extrabold text-white leading-tight">
          በኢትዮጵያ የመጀመሪያው ሁለንተናዊ የስፖርት ፕላትፎርም
        </h1>
        <p class="text-slate-400 text-base md:text-lg max-w-2xl mx-auto">
          የቀጥታ ጨዋታዎችን ይከታተሉ፣ የሰፈር ወይም የቡድን ጨዋታ ይፈልጉ (Just Play)፣ ሜዳዎችን ያስይዙ እና አዳዲስ የስፖርት ዜናዎችን ያግኙ።
        </p>
        <div class="hero-buttons flex flex-wrap justify-center gap-4 pt-4">
          <NuxtLink to="/justplay" class="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-lg shadow-lg shadow-emerald-900/20 transition">
            🎮 Just Play (ተጫወቱ)
          </NuxtLink>
          <NuxtLink to="/contact" class="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold rounded-lg border border-slate-700 transition">
            🏟️ ሜዳ ያስይዙ
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-16 px-6 max-w-7xl mx-auto">
      <div class="section-title text-center mb-12">
        <h2 class="text-2xl md:text-3xl font-bold text-white mb-2">✨ የፕላትፎርሙ ዋና ዋና ባህሪያት</h2>
        <p class="text-slate-400">EthioSport Hub ለእርስዎ የሚያቀርባቸው ልዩ አገልግሎቶች</p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div class="bg-slate-900 border border-slate-800 p-6 rounded-xl hover:border-emerald-500/50 transition">
          <div class="text-3xl mb-4">📊</div>
          <h3 class="text-lg font-semibold text-white mb-2">የቀጥታ ውጤት (Live Scores)</h3>
          <p class="text-slate-400 text-sm">የእግር ኳስ፣ የባስኬትቦል እና የቮሊቦል ጨዋታዎችን ውጤት በቀጥታ ይከታተሉ።</p>
        </div>
        <div class="bg-slate-900 border border-slate-800 p-6 rounded-xl hover:border-emerald-500/50 transition">
          <div class="text-3xl mb-4">🤝</div>
          <h3 class="text-lg font-semibold text-white mb-2">Just Play</h3>
          <p class="text-slate-400 text-sm">የሚጫወቱበት ቡድን ወይም ሰው አጡ? በአቅራቢያዎ ያሉ ተጫዋቾችን ይፈልጉ።</p>
        </div>
        <div class="bg-slate-900 border border-slate-800 p-6 rounded-xl hover:border-emerald-500/50 transition">
          <div class="text-3xl mb-4">🏟️</div>
          <h3 class="text-lg font-semibold text-white mb-2">የሜዳ ማስያዣ (Turf Booking)</h3>
          <p class="text-slate-400 text-sm">የሳር እና የቤት ውስጥ ስፖርት ሜዳዎችን በTelebirr ወይም Chapa ያስይዙ።</p>
        </div>
        <div class="bg-slate-900 border border-slate-800 p-6 rounded-xl hover:border-emerald-500/50 transition">
          <div class="text-3xl mb-4">🎉</div>
          <h3 class="text-lg font-semibold text-white mb-2">የስፖርት ክስተቶች</h3>
          <p class="text-slate-400 text-sm">በሀገር ውስጥ የሚዘጋጁ ውድድሮችን እና የማራቶን ሩጫዎችን ያግኙ።</p>
        </div>
      </div>
    </section>
  </div>
</template>