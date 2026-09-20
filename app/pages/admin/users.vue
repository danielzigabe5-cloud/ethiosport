<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl font-black text-slate-900">User Management</h1>
        <p class="text-xs text-slate-500 mt-1">Registered players and platform clients</p>
      </div>
      <button 
        @click="openAddModal" 
        class="bg-[#10B981] hover:bg-emerald-600 active:scale-95 text-white px-4 py-2 rounded-xl text-xs font-bold transition text-center shadow-xs cursor-pointer"
      >
        + Add New User
      </button>
    </div>

    <!-- Search & Quick Stats -->
    <div class="flex flex-col sm:flex-row gap-3 justify-between items-center">
      <input 
        v-model="searchQuery"
        type="text" 
        placeholder="Search by name or phone..." 
        class="bg-white border border-slate-200 text-slate-800 text-xs rounded-xl px-4 py-2.5 focus:outline-none focus:border-emerald-500 w-full sm:w-72 shadow-xs"
      />
      <div class="text-xs text-slate-500">
        Total Users: <span class="font-bold text-slate-900">{{ users.length }}</span>
      </div>
    </div>

    <!-- User Cards Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div 
        v-for="u in filteredUsers" 
        :key="u.id" 
        class="bg-white border border-slate-200 p-4 rounded-2xl flex flex-col justify-between space-y-4 hover:border-slate-300 shadow-xs transition"
      >
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-emerald-50 border border-emerald-100 rounded-xl flex items-center justify-center font-bold text-emerald-600 text-sm">
              {{ u.name.charAt(0) }}
            </div>
            <div>
              <h3 class="text-xs font-bold text-slate-900">{{ u.name }}</h3>
              <p class="text-[11px] text-slate-500">{{ u.phone }}</p>
            </div>
          </div>
          <span class="text-[10px] bg-slate-100 text-slate-700 border border-slate-200 px-2.5 py-1 rounded-lg font-bold">
            {{ u.bookings }} Bookings
          </span>
        </div>

        <!-- Action Buttons -->
        <div class="flex items-center justify-end gap-2 pt-2 border-t border-slate-100 text-xs">
          <button 
            @click="openEditModal(u)" 
            class="text-blue-600 hover:text-blue-700 font-semibold px-2 py-1 transition cursor-pointer"
          >
            Edit
          </button>
          <button 
            @click="deleteUser(u.id)" 
            class="text-rose-600 hover:text-rose-700 font-semibold px-2 py-1 transition cursor-pointer"
          >
            Delete
          </button>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="filteredUsers.length === 0" class="col-span-full bg-white border border-slate-200 p-8 rounded-2xl text-center text-xs text-slate-400 shadow-xs">
        No users found matching your search.
      </div>
    </div>

    <!-- Create / Edit Modal -->
    <div v-if="showModal" class="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
      <div class="bg-white border border-slate-200 w-full max-w-md rounded-2xl p-6 space-y-4 shadow-xl">
        <h2 class="text-lg font-bold text-slate-900">
          {{ isEditing ? 'Edit User' : 'Add New User' }}
        </h2>

        <form @submit.prevent="saveUser" class="space-y-4">
          <div>
            <label class="block text-xs font-bold text-slate-600 mb-1">Full Name</label>
            <input 
              v-model="form.name" 
              type="text" 
              required 
              placeholder="e.g. Abebe Bekele"
              class="w-full bg-slate-50 border border-slate-200 text-slate-900 text-xs rounded-xl p-3 focus:outline-none focus:border-emerald-500 focus:bg-white transition"
            />
          </div>

          <div>
            <label class="block text-xs font-bold text-slate-600 mb-1">Phone Number</label>
            <input 
              v-model="form.phone" 
              type="text" 
              required 
              placeholder="e.g. +251 911 22 33 44"
              class="w-full bg-slate-50 border border-slate-200 text-slate-900 text-xs rounded-xl p-3 focus:outline-none focus:border-emerald-500 focus:bg-white transition"
            />
          </div>

          <div>
            <label class="block text-xs font-bold text-slate-600 mb-1">Bookings Count</label>
            <input 
              v-model.number="form.bookings" 
              type="number" 
              min="0"
              required 
              class="w-full bg-slate-50 border border-slate-200 text-slate-900 text-xs rounded-xl p-3 focus:outline-none focus:border-emerald-500 focus:bg-white transition"
            />
          </div>

          <div class="flex gap-3 pt-2">
            <button 
              type="submit" 
              class="flex-1 bg-[#10B981] hover:bg-emerald-600 active:scale-95 text-white text-xs font-bold py-3 rounded-xl transition shadow-xs cursor-pointer"
            >
              {{ isEditing ? 'Update User' : 'Save User' }}
            </button>
            <button 
              type="button" 
              @click="closeModal" 
              class="px-5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold py-3 rounded-xl transition cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

definePageMeta({ layout: 'admin' })

interface User {
  id: number
  name: string
  phone: string
  bookings: number
}

const searchQuery = ref('')
const showModal = ref(false)
const isEditing = ref(false)
const activeUserId = ref<number | null>(null)

const form = ref({
  name: '',
  phone: '',
  bookings: 0
})

// Global application state using useState
const users = useState<User[]>('users-list', () => [
  { id: 1, name: 'Abebe Bekele', phone: '+251 911 22 33 44', bookings: 12 },
  { id: 2, name: 'Kebron Solomon', phone: '+251 922 33 44 55', bookings: 5 },
  { id: 3, name: 'Natan Girma', phone: '+251 933 44 55 66', bookings: 24 }
])

// Search Filter Logic
const filteredUsers = computed(() => {
  return users.value.filter(u => 
    u.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    u.phone.includes(searchQuery.value)
  )
})

// Modal Openers
const openAddModal = () => {
  isEditing.value = false
  form.value = { name: '', phone: '', bookings: 0 }
  showModal.value = true
}

const openEditModal = (user: User) => {
  isEditing.value = true
  activeUserId.value = user.id
  form.value = { name: user.name, phone: user.phone, bookings: user.bookings }
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
  activeUserId.value = null
}

// Action Handlers
const saveUser = () => {
  if (isEditing.value && activeUserId.value !== null) {
    const index = users.value.findIndex(u => u.id === activeUserId.value)
    if (index !== -1) {
      users.value[index] = { id: activeUserId.value, ...form.value }
    }
  } else {
    const newId = users.value.length ? Math.max(...users.value.map(u => u.id)) + 1 : 1
    users.value.push({ id: newId, ...form.value })
  }
  closeModal()
}

const deleteUser = (id: number) => {
  if (confirm('Are you sure you want to delete this user?')) {
    users.value = users.value.filter(u => u.id !== id)
  }
}
</script>