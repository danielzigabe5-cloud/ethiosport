<script setup lang="ts">
import { Search, UserPlus, MoreVertical } from 'lucide-vue-next'

definePageMeta({
  layout: 'admin'
})

const search = ref('')

const users = [
  { name: 'Abebe Kebede', email: 'abebe@example.com', phone: '0911000000', role: 'User', status: 'Active' },
  { name: 'Dawit Alemu', email: 'dawit@example.com', phone: '0922000000', role: 'User', status: 'Active' },
  { name: 'Mekonnen Tadesse', email: 'mekonnen@example.com', phone: '0933000000', role: 'Partner', status: 'Active' },
  { name: 'Samuel Bekele', email: 'samuel@example.com', phone: '0944000000', role: 'User', status: 'Blocked' }
]

const filteredUsers = computed(() =>
  users.filter(user =>
    `${user.name} ${user.email}`
      .toLowerCase()
      .includes(search.value.toLowerCase())
  )
)
</script>

<template>
  <div class="space-y-6">

    <div class="flex flex-col justify-between gap-4 md:flex-row md:items-center">
      <div>
        <h1 class="text-3xl font-black">Users</h1>
        <p class="text-slate-500">Manage registered Combolojo users.</p>
      </div>

      <button class="flex items-center gap-2 rounded-xl bg-slate-950 px-5 py-3 font-bold text-white">
        <UserPlus :size="19" />
        Add User
      </button>
    </div>

    <div class="rounded-2xl bg-white shadow-sm">

      <div class="border-b p-5">
        <div class="relative max-w-md">
          <Search
            class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            :size="19"
          />

          <input
            v-model="search"
            placeholder="Search users..."
            class="w-full rounded-xl border py-3 pl-10 pr-4"
          />
        </div>
      </div>

      <div class="overflow-x-auto">

        <table class="w-full min-w-[750px]">

          <thead class="bg-slate-50 text-left text-xs uppercase text-slate-500">
            <tr>
              <th class="px-6 py-4">User</th>
              <th class="px-6 py-4">Phone</th>
              <th class="px-6 py-4">Role</th>
              <th class="px-6 py-4">Status</th>
              <th class="px-6 py-4">Action</th>
            </tr>
          </thead>

          <tbody>

            <tr
              v-for="user in filteredUsers"
              :key="user.email"
              class="border-t"
            >

              <td class="px-6 py-5">
                <div class="flex items-center gap-3">

                  <div class="flex h-11 w-11 items-center justify-center rounded-full bg-slate-900 font-bold text-white">
                    {{ user.name.charAt(0) }}
                  </div>

                  <div>
                    <p class="font-bold">{{ user.name }}</p>
                    <p class="text-sm text-slate-500">{{ user.email }}</p>
                  </div>

                </div>
              </td>

              <td class="px-6 py-5">{{ user.phone }}</td>

              <td class="px-6 py-5">
                <span class="rounded-lg bg-slate-100 px-3 py-1 text-sm">
                  {{ user.role }}
                </span>
              </td>

              <td class="px-6 py-5">
                <span
                  class="rounded-full px-3 py-1 text-xs font-bold"
                  :class="
                    user.status === 'Active'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700'
                  "
                >
                  {{ user.status }}
                </span>
              </td>

              <td class="px-6 py-5">
                <button class="rounded-lg p-2 hover:bg-slate-100">
                  <MoreVertical :size="19" />
                </button>
              </td>

            </tr>

          </tbody>
        </table>

      </div>
    </div>

  </div>
</template>