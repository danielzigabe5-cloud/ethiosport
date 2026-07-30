<template>
  <div class="min-h-screen bg-slate-950 py-12 px-6">
    <div class="max-w-2xl mx-auto bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl">
      
      <!-- ርዕስ -->
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-white mb-2">የሜዳ ማስያዣ ቅጽ</h1>
        <p class="text-slate-400 border-b border-slate-800 pb-4">እባክዎን የሚከተለውን መረጃ በትክክል ይሙሉ</p>
      </div>

      <form @submit.prevent="handleBooking" class="space-y-6">
        
        <!-- የጨዋታ አይነት -->
        <div>
          <label class="block text-slate-300 mb-2 font-medium">የጨዋታ አይነት</label>
          <select v-model="form.sportType" required class="w-full bg-slate-800 border border-slate-700 text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition">
            <option value="" disabled selected>የጨዋታ አይነት ይምረጡ</option>
            <option value="football">እግር ኳስ (Football)</option>
            <option value="basketball">ባስኬትቦል (Basketball)</option>
            <option value="volleyball">ቮሊቦል (Volleyball)</option>
          </select>
        </div>

        <!-- ቀን እና ሰዓት -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block text-slate-300 mb-2 font-medium">ቀን</label>
            <input v-model="form.date" type="date" required class="w-full bg-slate-800 border border-slate-700 text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-emerald-500 focus:outline-none" />
          </div>
          <div>
            <label class="block text-slate-300 mb-2 font-medium">ሰዓት</label>
            <input v-model="form.time" type="time" required class="w-full bg-slate-800 border border-slate-700 text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-emerald-500 focus:outline-none" />
          </div>
        </div>

        <!-- የክፍያ መንገድ (Dropdown/International Style) -->
        <div>
          <label class="block text-slate-300 mb-2 font-medium">የክፍያ መንገድ (Payment Method)</label>
          <div class="relative">
            <select v-model="form.payment" required class="w-full bg-slate-800 border border-slate-700 text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-emerald-500 focus:outline-none appearance-none transition">
              <option value="" disabled>የክፍያ ዘዴ ይምረጡ</option>
              <option value="telebirr">Telebirr (ቴሌብር)</option>
              <option value="chapa">Chapa / Card (ቻፓ / በካርድ)</option>
              <option value="cbebirr">CBE Birr (ሲቢኢ ብር)</option>
              <option value="ebirr">eBirr (ኢ-ብር)</option>
            </select>
            <!-- Dropdown arrow icon -->
            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400">
              <svg class="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
              </svg>
            </div>
          </div>
        </div>

        <!-- ማስያዣ ቁልፍ -->
        <div class="pt-4">
          <button type="submit" class="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-emerald-900/20 transition-all transform hover:scale-[1.01] active:scale-95">
            አሁን ያስይዙ (Book Now)
          </button>
        </div>

      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const form = ref({
  sportType: '',
  date: '',
  time: '',
  payment: 'telebirr' // Default የተመረጠ
})

const handleBooking = () => {
  // እዚህ ጋር ዳታውን ወደ API መላክ ይቻላል
  console.log("Booking Submitted:", form.value)
  alert(`ምዝገባዎ ተልኳል!\nየክፍያ መንገድ፦ ${form.value.payment.toUpperCase()}`);
}
</script>

<style scoped>
/* ለቀን እና ለሰዓት መምረጫው አይኮን ቀለሙን ነጭ ለማድረግ */
input[type="date"]::-webkit-calendar-picker-indicator,
input[type="time"]::-webkit-calendar-picker-indicator {
    filter: invert(1) opacity(0.6);
    cursor: pointer;
}

/* Dropdown በውስጡ ያሉትን አማራጮች ለማሳመር (በአንዳንድ ብሮውዘሮች) */
select option {
  background-color: #1e293b; /* slate-800 */
  color: white;
}
</style>