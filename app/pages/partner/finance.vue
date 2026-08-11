<template>
  <div class="space-y-6">
    <!-- ራስጌ (Header) -->
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 class="text-2xl font-black text-gray-800">ገቢ እና ክፍያዎች</h1>
        <p class="text-sm text-gray-500 font-medium">የፋይናንስ መረጃዎን እና የክፍያ ታሪክዎን ይከታተሉ</p>
      </div>
      <button class="px-6 py-2.5 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl shadow-md transition-all active:scale-95 flex items-center gap-2">
        <Icon name="lucide:arrow-down-to-line" class="w-4 h-4" />
        ገንዘብ ወጪ አድርግ (Withdraw)
      </button>
    </div>

    <!-- የገንዘብ ማጠቃለያ ካርዶች (Financial Stats) -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <div class="flex justify-between items-center mb-4">
          <span class="text-gray-500 font-bold text-sm">አጠቃላይ የተሰራ (Total Earnings)</span>
          <div class="w-10 h-10 bg-green-50 text-green-600 rounded-full flex items-center justify-center">
            <Icon name="lucide:coins" class="w-5 h-5" />
          </div>
        </div>
        <h2 class="text-3xl font-black text-gray-800">124,500 <span class="text-sm text-gray-400 font-bold">ETB</span></h2>
      </div>

      <div class="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <div class="flex justify-between items-center mb-4">
          <span class="text-gray-500 font-bold text-sm">ያልወጣ ቀሪ ሂሳብ (Pending)</span>
          <div class="w-10 h-10 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center">
            <Icon name="lucide:wallet" class="w-5 h-5" />
          </div>
        </div>
        <h2 class="text-3xl font-black text-blue-600">12,500 <span class="text-sm text-gray-400 font-bold">ETB</span></h2>
      </div>

      <div class="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <div class="flex justify-between items-center mb-4">
          <span class="text-gray-500 font-bold text-sm">ወጪ የተደረገ (Withdrawn)</span>
          <div class="w-10 h-10 bg-gray-50 text-gray-600 rounded-full flex items-center justify-center">
            <Icon name="lucide:check-circle" class="w-5 h-5" />
          </div>
        </div>
        <h2 class="text-3xl font-black text-gray-800">112,000 <span class="text-sm text-gray-400 font-bold">ETB</span></h2>
      </div>
    </div>

    <!-- የቅርብ ጊዜ ክፍያዎች (Recent Transactions Table) -->
    <div class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div class="px-6 py-4 border-b border-gray-100">
        <h3 class="font-bold text-gray-800">የቅርብ ጊዜ ክፍያዎች (Recent Transactions)</h3>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full text-left text-sm text-gray-600">
          <thead class="bg-gray-50 text-xs font-black uppercase text-gray-500">
            <tr>
              <th class="px-6 py-4">ቀን</th>
              <th class="px-6 py-4">የክፍያ ምክንያት</th>
              <th class="px-6 py-4">የክፍያ መንገድ</th>
              <th class="px-6 py-4">መጠን (ETB)</th>
              <th class="px-6 py-4">ሁኔታ</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
            <tr class="hover:bg-gray-50 transition">
              <td class="px-6 py-4">ነሐሴ 05, 2018</td>
              <td class="px-6 py-4 font-semibold text-gray-800">የሜዳ ኪራይ (አቤል ተፈራ)</td>
              <td class="px-6 py-4">ቴሌብር (Telebirr)</td>
              <td class="px-6 py-4 font-bold text-green-600">+1,500</td>
              <td class="px-6 py-4">
                <span class="px-2 py-1 bg-green-100 text-green-700 text-[10px] font-bold rounded-md uppercase">ተጠናቋል</span>
              </td>
            </tr>
            <tr class="hover:bg-gray-50 transition">
              <td class="px-6 py-4">ነሐሴ 01, 2018</td>
              <td class="px-6 py-4 font-semibold text-gray-800">ገንዘብ ወጪ (Withdrawal)</td>
              <td class="px-6 py-4">የኢትዮጵያ ንግድ ባንክ</td>
              <td class="px-6 py-4 font-bold text-gray-600">-10,000</td>
              <td class="px-6 py-4">
                <span class="px-2 py-1 bg-blue-100 text-blue-700 text-[10px] font-bold rounded-md uppercase">በሂደት ላይ</span>
              </td>
            </tr>
            <tr class="hover:bg-gray-50 transition">
              <td class="px-6 py-4">ሐምሌ 28, 2018</td>
              <td class="px-6 py-4 font-semibold text-gray-800">የሜዳ ኪራይ (ዳዊት ዮናስ)</td>
              <td class="px-6 py-4">አቢሲንያ ባንክ (CBE Birr)</td>
              <td class="px-6 py-4 font-bold text-green-600">+2,000</td>
              <td class="px-6 py-4">
                <span class="px-2 py-1 bg-green-100 text-green-700 text-[10px] font-bold rounded-md uppercase">ተጠናቋል</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'partner'
})
</script>