<template>
  <div class="min-h-screen bg-gray-50/50 p-4 md:p-8 space-y-8 max-w-7xl mx-auto">
    
    <!-- 1. HERO BANNER SECTION -->
    <div class="relative overflow-hidden bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 rounded-3xl p-6 sm:p-10 text-white shadow-xl shadow-blue-500/10">
      <!-- Background Decorative Blur -->
      <div class="absolute -right-10 -bottom-10 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
      
      <div class="relative z-10 max-w-2xl space-y-3">
        <h1 class="text-2xl sm:text-4xl font-extrabold tracking-tight flex items-center gap-3">
          እንኳን ደህና መጡ፣ ስፖርተኛ! 👋
        </h1>
        <p class="text-blue-100 text-sm sm:text-base leading-relaxed">
          በ EthioSport የያዟቸውን ቦታዎች፣ የቆረጧቸውን ቲኬቶች እና የፕሮፋይል መረጃዎን እዚህ ማስተዳደር ይችላሉ።
        </p>
        <div class="pt-4 flex flex-wrap gap-3">
          <NuxtLink to="/venues" class="bg-white text-blue-700 hover:bg-blue-50 font-semibold px-5 py-2.5 rounded-xl text-sm shadow-md transition-all active:scale-95">
            የያዟቸው ቦታዎች
          </NuxtLink>
          <NuxtLink to="/tickets" class="bg-blue-800/60 hover:bg-blue-800 text-white font-semibold px-5 py-2.5 rounded-xl text-sm border border-blue-400/30 transition-all backdrop-blur-sm">
            የእኔ ቲኬቶች
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- 2. QUICK OVERVIEW CARDS (TOP SUMMARY) -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      
      <!-- Upcoming Booking Card -->
      <div class="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition">
        <div class="flex items-center justify-between pb-4 border-b border-gray-100">
          <h2 class="font-bold text-gray-900 text-base">የቀጣይ ጊዜ ቦታ ማስያዣ</h2>
          <NuxtLink to="/bookings" class="text-xs font-semibold text-blue-600 hover:underline">ሁሉንም እይ →</NuxtLink>
        </div>
        <div class="mt-4 flex items-center justify-between bg-gray-50 p-4 rounded-xl border border-gray-100">
          <div class="space-y-1">
            <h3 class="font-bold text-gray-800 text-sm">አበበ ቢቂላ ስታዲየም</h3>
            <p class="text-xs text-gray-500 flex items-center gap-2">
              <span>📅 2026-08-05</span>
              <span>⏰ 10:00 AM - 12:00 PM</span>
            </p>
          </div>
          <span class="bg-emerald-100 text-emerald-700 font-semibold text-xs px-3 py-1 rounded-full">
            Approved
          </span>
        </div>
      </div>

      <!-- Active Ticket Card -->
      <div class="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition">
        <div class="flex items-center justify-between pb-4 border-b border-gray-100">
          <h2 class="font-bold text-gray-900 text-base">የእርስዎ ትኬት</h2>
          <NuxtLink to="/tickets" class="text-xs font-semibold text-blue-600 hover:underline">ሁሉንም እይ →</NuxtLink>
        </div>
        <div class="mt-4 flex items-center justify-between bg-blue-50/50 p-4 rounded-xl border border-blue-100">
          <div class="space-y-1">
            <h3 class="font-bold text-gray-900 text-sm">ቅዱስ ጊዮርጊስ vs ኢትዮጵያ ቡና</h3>
            <p class="text-xs text-gray-500">📍 አዲስ አበባ ስታዲየም — 📅 2026-08-12</p>
          </div>
          <span class="bg-blue-600 text-white font-semibold text-xs px-3 py-1.5 rounded-lg shadow-sm">
            VIP - Gate 3
          </span>
        </div>
      </div>

    </div>

    <!-- 3. MY BOOKINGS TABLE SECTION -->
    <div class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div class="p-6 border-b border-gray-100">
        <h2 class="text-lg font-bold text-gray-900">የእኔ ቦታ ማስያዣዎች (My Bookings)</h2>
        <p class="text-xs text-gray-500 mt-0.5">ያዟቸውን ሜዳዎችና ስታዲየሞች ሁኔታ እዚህ ይከታተሉ</p>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-gray-50/80 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100">
              <th class="p-4 pl-6">ID</th>
              <th class="p-4">የቦታው ስም</th>
              <th class="p-4">ቀንና ሰዓት</th>
              <th class="p-4">ክፍያ</th>
              <th class="p-4">ሁኔታ</th>
              <th class="p-4 pr-6 text-right">ተግባር</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100 text-sm">
            
            <tr class="hover:bg-gray-50/50 transition">
              <td class="p-4 pl-6 font-bold text-gray-900">BK-101</td>
              <td class="p-4 font-semibold text-gray-800">አበበ ቢቂላ ስታዲየም</td>
              <td class="p-4 text-xs text-gray-600">
                <div>📅 2026-08-05</div>
                <div class="text-gray-400">⏰ 10:00 AM - 12:00 PM</div>
              </td>
              <td class="p-4 font-bold text-gray-900">1,500 ETB</td>
              <td class="p-4">
                <span class="bg-emerald-100 text-emerald-700 font-semibold text-xs px-3 py-1 rounded-full">Approved</span>
              </td>
              <td class="p-4 pr-6 text-right">
                <button class="text-xs font-semibold text-blue-600 hover:text-blue-800 hover:underline">ደረሰኝ እይ (Slip)</button>
              </td>
            </tr>

            <tr class="hover:bg-gray-50/50 transition">
              <td class="p-4 pl-6 font-bold text-gray-900">BK-098</td>
              <td class="p-4 font-semibold text-gray-800">ጃንሜዳ የስፖርት ማዕከል</td>
              <td class="p-4 text-xs text-gray-600">
                <div>📅 2026-07-20</div>
                <div class="text-gray-400">⏰ 04:00 PM - 06:00 PM</div>
              </td>
              <td class="p-4 font-bold text-gray-900">800 ETB</td>
              <td class="p-4">
                <span class="bg-gray-100 text-gray-600 font-semibold text-xs px-3 py-1 rounded-full">Completed</span>
              </td>
              <td class="p-4 pr-6 text-right">
                <button class="text-xs font-semibold text-blue-600 hover:text-blue-800 hover:underline">ደረሰኝ እይ (Slip)</button>
              </td>
            </tr>

            <tr class="hover:bg-gray-50/50 transition">
              <td class="p-4 pl-6 font-bold text-gray-900">BK-094</td>
              <td class="p-4 font-semibold text-gray-800">ሀዋሳ ኢንተርናሽናል ስታዲየም</td>
              <td class="p-4 text-xs text-gray-600">
                <div>📅 2026-06-11</div>
                <div class="text-gray-400">⏰ 02:00 PM - 04:00 PM</div>
              </td>
              <td class="p-4 font-bold text-gray-900">2,000 ETB</td>
              <td class="p-4">
                <span class="bg-rose-100 text-rose-700 font-semibold text-xs px-3 py-1 rounded-full">Cancelled</span>
              </td>
              <td class="p-4 pr-6 text-right">
                <button class="text-xs font-semibold text-blue-600 hover:text-blue-800 hover:underline">ደረሰኝ እይ (Slip)</button>
              </td>
            </tr>

          </tbody>
        </table>
      </div>
    </div>

    <!-- 4. DIGITAL TICKET CARD (WITH QR CODE) -->
    <div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
      <div>
        <h2 class="text-lg font-bold text-gray-900">የእኔ ትኬቶች (My Tickets)</h2>
        <p class="text-xs text-gray-500">ለመግቢያ የሚያገለግሉ የዲጂታል ትኬቶች እና QR Code</p>
      </div>

      <!-- Modern Ticket Layout -->
      <div class="max-w-xl bg-slate-900 text-white rounded-2xl overflow-hidden shadow-lg flex flex-col sm:flex-row">
        <!-- Ticket Info Section -->
        <div class="p-6 flex-1 space-y-4 border-b sm:border-b-0 sm:border-r border-slate-800">
          <div>
            <span class="text-emerald-400 text-xs font-semibold tracking-wider uppercase">የኢትዮጵያ ፕሪሚየር ሊግ</span>
            <h3 class="text-xl font-bold mt-1 text-white">ቅዱስ ጊዮርጊስ vs ኢትዮጵያ ቡና</h3>
            <p class="text-xs text-slate-400 mt-1">📍 አዲስ አበባ ስታዲየም</p>
          </div>

          <div class="pt-2 border-t border-slate-800 flex items-center justify-between">
            <div>
              <p class="text-[10px] text-slate-400 uppercase">ቀንና ሰዓት</p>
              <p class="text-xs font-semibold text-slate-200">2026-08-12 (03:00 PM)</p>
            </div>
            <span class="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-md">
              VIP - Gate 3
            </span>
          </div>
        </div>

        <!-- Ticket QR Section -->
        <div class="p-6 bg-slate-950 flex flex-col items-center justify-center min-w-[160px] text-center space-y-2">
          <!-- Sample QR placeholder -->
          <div class="bg-white p-2 rounded-xl shadow-inner">
            <img src="https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=TK-882" alt="QR Code" class="w-20 h-20" />
          </div>
          <span class="text-[11px] font-mono text-slate-400">TK-882</span>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
definePageMeta({
  layout: 'user-dashboard'
})
</script>