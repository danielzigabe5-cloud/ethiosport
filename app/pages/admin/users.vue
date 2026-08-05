<script setup>
import { ref } from 'vue'

definePageMeta({ layout: 'admin' })

const users = ref([
  { id: 1, name: 'አበበ በቀለ', email: 'abebe@gmail.com', role: 'User', status: 'Active' },
  { id: 2, name: 'ዮናስ ኃይሌ', email: 'yonas@gmail.com', role: 'Venue Owner', status: 'Active' },
  { id: 3, name: 'ሳራ ተስፋዬ', email: 'sara@gmail.com', role: 'User', status: 'Blocked' }
])

const toggleBlock = (user) => {
  user.status = user.status === 'Active' ? 'Blocked' : 'Active'
}

const promoteUser = (user) => {
  user.role = user.role === 'Admin' ? 'User' : 'Admin'
}
</script>

<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-2xl font-black text-slate-900 dark:text-white">የተጠቃሚዎች ማኔጅመንት (Users)</h1>
      <p class="text-xs text-slate-500">አካውንቶችን ያግዱ ወይም የአስተዳዳሪነት ድርሻ ይስጡ</p>
    </div>

    <div class="bg-white dark:bg-[#0b111a] rounded-2xl border border-slate-200 dark:border-[#212e3e] overflow-hidden">
      <table class="w-full text-left text-xs">
        <thead class="bg-slate-50 dark:bg-[#131c27] text-slate-400 font-black uppercase">
          <tr>
            <th class="p-4">ID</th>
            <th class="p-4">ስም</th>
            <th class="p-4">ኢሜይል</th>
            <th class="p-4">ሮል (Role)</th>
            <th class="p-4">ሁኔታ</th>
            <th class="p-4 text-right">ተግባር</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100 dark:divide-[#212e3e]">
          <tr v-for="u in users" :key="u.id" class="font-semibold">
            <td class="p-4 text-emerald-500">#{{ u.id }}</td>
            <td class="p-4 font-bold text-slate-900 dark:text-white">{{ u.name }}</td>
            <td class="p-4">{{ u.email }}</td>
            <td class="p-4">
              <span class="px-2.5 py-1 rounded-full text-[10px] font-bold bg-blue-500/10 text-blue-500">
                {{ u.role }}
              </span>
            </td>
            <td class="p-4">
              <span :class="['px-2.5 py-1 rounded-full text-[10px] font-bold', u.status === 'Active' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500']">
                {{ u.status }}
              </span>
            </td>
            <td class="p-4 text-right space-x-2">
              <button @click="promoteUser(u)" class="px-3 py-1 bg-slate-100 dark:bg-[#131c27] hover:bg-slate-200 rounded-lg text-[11px] font-bold transition">
                Role ቀይር
              </button>
              <button @click="toggleBlock(u)" :class="['px-3 py-1 rounded-lg text-[11px] font-bold transition', u.status === 'Active' ? 'bg-rose-500/10 text-rose-500 hover:bg-rose-500 hover:text-white' : 'bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500 hover:text-slate-950']">
                {{ u.status === 'Active' ? 'Block' : 'Unblock' }}
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>