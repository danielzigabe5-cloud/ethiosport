<!-- Admin view structure example -->
<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold text-white mb-4">የተያዙ ሜዳዎች መቆጣጠሪያ (Admin Booking Oversight)</h1>
    
    <!-- Table of all user bookings -->
    <table class="w-full text-slate-300">
      <thead>
        <tr>
          <th>የደበኛው ስም</th>
          <th>የጨዋታ አይነት</th>
          <th>ቀን & ሰዓት</th>
          <th>የክፍያ ሁኔታ</th>
          <th>ድርጊት (Action)</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>ዳንኤል</td>
          <td>Football</td>
          <td>2026-07-30 | 12:00 PM</td>
          <td><span class="text-emerald-400">Paid (Telebirr)</span></td>
          <td>
            <button class="bg-emerald-600 text-xs px-3 py-1 rounded">Confirm</button>
            <button class="bg-rose-600 text-xs px-3 py-1 rounded">Cancel</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>