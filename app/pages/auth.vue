<template>
  <section class="py-8 px-6 max-w-4xl mx-auto">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <!-- LOGIN FORM -->
      <div class="bg-slate-900 p-6 rounded-xl border border-slate-800">
        <div class="mb-6">
          <h1 class="text-xl font-bold text-white">🔑 ይግቡ (Login)</h1>
          <p class="text-xs text-slate-400">ወደ EthioSport መለያዎ ይግቡ</p>
        </div>
        <form @submit.prevent class="space-y-4">
          <div>
            <label class="block text-xs text-slate-400 mb-1">ስልክ ቁጥር ወይም ኢሜይል</label>
            <input type="text" placeholder="0911......" class="w-full bg-slate-800 text-slate-200 p-2.5 rounded-lg text-sm border border-slate-700 focus:outline-none focus:border-emerald-500"/>
          </div>
          <div>
            <label class="block text-xs text-slate-400 mb-1">የምስጢር ቃል</label>
            <input type="password" placeholder="••••••••" class="w-full bg-slate-800 text-slate-200 p-2.5 rounded-lg text-sm border border-slate-700 focus:outline-none focus:border-emerald-500"/>
          </div>
          <button type="submit" class="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-sm rounded-lg transition">ይግቡ</button>
        </form>
      </div>

      <!-- REGISTER FORM -->
      <div class="bg-slate-900 p-6 rounded-xl border border-slate-800">
        <div class="mb-6">
          <h2 class="text-xl font-bold text-white">📝 አዲስ መለያ ይክፈቱ (Register)</h2>
          <p class="text-xs text-slate-400">የEthioSport አባል ይሁኑ</p>
        </div>
        <form @submit.prevent class="space-y-4">
          <div>
            <label class="block text-xs text-slate-400 mb-1">ሙሉ ስም</label>
            <input type="text" placeholder="አበበ በቀለ" class="w-full bg-slate-800 text-slate-200 p-2.5 rounded-lg text-sm border border-slate-700 focus:outline-none focus:border-emerald-500"/>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-xs text-slate-400 mb-1">ስልክ ቁጥር</label>
              <input type="tel" placeholder="0911......" class="w-full bg-slate-800 text-slate-200 p-2.5 rounded-lg text-sm border border-slate-700 focus:outline-none focus:border-emerald-500"/>
            </div>
            <div>
              <label class="block text-xs text-slate-400 mb-1">የሚወዱት ስፖርት</label>
              <select class="w-full bg-slate-800 text-slate-200 p-2.5 rounded-lg text-sm border border-slate-700 focus:outline-none focus:border-emerald-500">
                <option value="football">እግር ኳስ</option>
                <option value="basketball">ባስኬትቦል</option>
                <option value="volleyball">ቮሊቦል</option>
              </select>
            </div>
          </div>
          <div>
            <label class="block text-xs text-slate-400 mb-1">የምስጢር ቃል</label>
            <input type="password" placeholder="••••••••" class="w-full bg-slate-800 text-slate-200 p-2.5 rounded-lg text-sm border border-slate-700 focus:outline-none focus:border-emerald-500"/>
          </div>
          <button type="submit" class="w-full py-2.5 bg-slate-700 hover:bg-slate-600 text-white font-medium text-sm rounded-lg transition">ተመዝገብ</button>
        </form>
      </div>
    </div>
  </section>
</template>