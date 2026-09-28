```vue
<template>
  <div
    class="flex h-screen w-full flex-col overflow-hidden bg-slate-50 text-slate-800 antialiased dark:bg-[#070b12] dark:text-slate-100"
  >
    <!-- =========================================================
         HEADER
    ========================================================== -->
    <header
      class="relative z-50 flex h-16 shrink-0 items-center justify-between border-b border-slate-200 bg-white px-4 shadow-sm dark:border-slate-800 dark:bg-[#0d1421] lg:px-7"
    >
      <!-- LEFT -->
      <div class="flex min-w-0 items-center gap-3">
        <!-- Sidebar Toggle -->
        <button
          type="button"
          @click="toggleSidebar"
          class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-slate-600 transition hover:bg-slate-100 hover:text-emerald-600 active:scale-95 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-emerald-400"
          title="Toggle navigation"
        >
          <Icon name="lucide:menu" class="h-5 w-5" />
        </button>

        <!-- Logo -->
        <NuxtLink
          to="/admin"
          class="group flex min-w-0 items-center gap-2"
        >
          <div
            class="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-500 text-lg shadow-sm shadow-emerald-500/20"
          >
            ⚽
          </div>

          <div class="hidden min-w-0 sm:block">
            <div class="flex items-center gap-1 text-lg font-black tracking-tight">
              <span class="text-slate-900 dark:text-white">COMBO</span>
              <span class="text-emerald-500">LOJO</span>
            </div>

            <p
              class="truncate text-[9px] font-bold uppercase tracking-[1.8px] text-slate-400"
            >
              Sport Field Management
            </p>
          </div>
        </NuxtLink>

        <!-- Separator -->
        <div class="mx-1 hidden h-7 w-px bg-slate-200 dark:bg-slate-800 md:block"></div>

        <!-- Location -->
        <div
          class="hidden items-center gap-2 rounded-lg bg-slate-50 px-3 py-2 dark:bg-slate-800/60 md:flex"
        >
          <Icon
            name="lucide:map-pin"
            class="h-4 w-4 text-emerald-500"
          />

          <div class="leading-none">
            <p class="text-[9px] font-bold uppercase tracking-wider text-slate-400">
              Location
            </p>
            <p class="mt-1 text-xs font-bold text-slate-700 dark:text-slate-200">
              Ethiopia
            </p>
          </div>
        </div>
      </div>

      <!-- RIGHT -->
      <div class="flex items-center gap-2 md:gap-3">

        <!-- View Public Site -->
        <NuxtLink
          to="/"
          target="_blank"
          class="hidden items-center gap-2 rounded-xl px-3 py-2 text-xs font-bold text-slate-500 transition hover:bg-slate-100 hover:text-emerald-600 dark:text-slate-400 dark:hover:bg-slate-800 sm:flex"
        >
          <Icon name="lucide:external-link" class="h-4 w-4" />
          <span>View Site</span>
        </NuxtLink>

        <!-- Add Venue -->
        <NuxtLink
          :to="authStore.user ? '/venues/create' : '/auth?redirect=/venues/create'"
          class="flex items-center gap-2 rounded-xl bg-emerald-500 px-3.5 py-2.5 text-xs font-black text-white shadow-sm shadow-emerald-500/20 transition hover:bg-emerald-600 active:scale-95"
        >
          <Icon name="lucide:plus" class="h-4 w-4 stroke-[3]" />
          <span class="hidden sm:inline">Add Sport Field</span>
          <span class="sm:hidden">Add</span>
        </NuxtLink>

        <!-- Notifications -->
        <button
          type="button"
          class="relative flex h-10 w-10 items-center justify-center rounded-xl text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
          title="Notifications"
        >
          <Icon name="lucide:bell" class="h-5 w-5" />

          <span
            class="absolute right-2 top-2 h-2 w-2 rounded-full border-2 border-white bg-red-500 dark:border-[#0d1421]"
          ></span>
        </button>

        <!-- Profile -->
        <div
          ref="dropdownRef"
          class="relative"
        >
          <button
            type="button"
            @click="toggleDropdown"
            class="flex items-center gap-2 rounded-xl border border-slate-200 bg-white p-1.5 pr-2 transition hover:border-emerald-300 hover:shadow-sm dark:border-slate-800 dark:bg-slate-900"
          >
            <!-- Avatar -->
            <div class="relative">
              <img
                v-if="userAvatar"
                :src="userAvatar"
                alt="Admin"
                class="h-8 w-8 rounded-lg object-cover"
              />

              <div
                v-else
                class="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500 text-xs font-black text-white"
              >
                A
              </div>

              <span
                class="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-emerald-500 dark:border-slate-900"
              ></span>
            </div>

            <div class="hidden text-left lg:block">
              <p class="max-w-[110px] truncate text-xs font-bold text-slate-800 dark:text-slate-100">
                {{ adminName }}
              </p>

              <p class="text-[9px] font-semibold uppercase tracking-wider text-slate-400">
                Administrator
              </p>
            </div>

            <Icon
              name="lucide:chevron-down"
              class="hidden h-3.5 w-3.5 text-slate-400 lg:block"
            />
          </button>

          <!-- Profile Dropdown -->
          <Transition
            enter-active-class="transition duration-150 ease-out"
            enter-from-class="translate-y-1 scale-95 opacity-0"
            enter-to-class="translate-y-0 scale-100 opacity-100"
            leave-active-class="transition duration-100 ease-in"
            leave-from-class="translate-y-0 scale-100 opacity-100"
            leave-to-class="translate-y-1 scale-95 opacity-0"
          >
            <div
              v-if="isProfileOpen"
              class="absolute right-0 mt-2.5 w-64 overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-xl dark:border-slate-800 dark:bg-[#0d1421]"
            >
              <!-- Account -->
              <div
                class="mb-1 rounded-xl bg-slate-50 p-3 dark:bg-slate-800/60"
              >
                <div class="flex items-center gap-3">
                  <div
                    class="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500 font-black text-white"
                  >
                    A
                  </div>

                  <div class="min-w-0">
                    <p class="truncate text-xs font-bold">
                      {{ adminName }}
                    </p>

                    <p class="mt-0.5 truncate text-[10px] text-slate-400">
                      {{ authStore.user?.email || 'admin@combolojo.com' }}
                    </p>
                  </div>
                </div>
              </div>

              <!-- Profile -->
              <NuxtLink
                to="/admin/profile"
                @click="handleSidebarNavigation"
                class="flex items-center gap-3 rounded-xl px-3 py-2.5 text-xs font-bold text-slate-600 transition hover:bg-slate-100 hover:text-emerald-600 dark:text-slate-300 dark:hover:bg-slate-800"
              >
                <Icon name="lucide:user-cog" class="h-4 w-4" />
                Profile Settings
              </NuxtLink>

              <!-- Settings -->
              <NuxtLink
                to="/admin/settings"
                @click="handleSidebarNavigation"
                class="flex items-center gap-3 rounded-xl px-3 py-2.5 text-xs font-bold text-slate-600 transition hover:bg-slate-100 hover:text-emerald-600 dark:text-slate-300 dark:hover:bg-slate-800"
              >
                <Icon name="lucide:settings" class="h-4 w-4" />
                Settings
              </NuxtLink>

              <div class="my-1 border-t border-slate-100 dark:border-slate-800"></div>

              <!-- Logout -->
              <button
                type="button"
                @click="handleLogout"
                :disabled="isLoggingOut"
                class="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-xs font-bold text-rose-500 transition hover:bg-rose-50 disabled:opacity-50 dark:hover:bg-rose-500/10"
              >
                <span
                  v-if="isLoggingOut"
                  class="h-4 w-4 animate-spin rounded-full border-2 border-rose-500 border-t-transparent"
                ></span>

                <Icon
                  v-else
                  name="lucide:log-out"
                  class="h-4 w-4"
                />

                <span>
                  {{ isLoggingOut ? 'Logging out...' : 'Logout' }}
                </span>
              </button>
            </div>
          </Transition>
        </div>
      </div>
    </header>

    <!-- =========================================================
         BODY
    ========================================================== -->
    <div class="relative flex min-h-0 flex-1 overflow-hidden">

      <!-- Mobile Backdrop -->
      <Transition
        enter-active-class="transition-opacity duration-200"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition-opacity duration-150"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="isMobileSidebarOpen"
          class="fixed inset-0 z-40 bg-slate-950/50 backdrop-blur-sm lg:hidden"
          @click="isMobileSidebarOpen = false"
        ></div>
      </Transition>

      <!-- =======================================================
           SIDEBAR
      ======================================================== -->
      <aside
        class="fixed bottom-0 left-0 top-16 z-50 flex h-[calc(100vh-64px)] shrink-0 flex-col border-r border-slate-200 bg-white transition-all duration-300 dark:border-slate-800 dark:bg-[#0b111d] lg:static lg:z-30"
        :class="[
          isMobileSidebarOpen
            ? 'translate-x-0'
            : '-translate-x-full lg:translate-x-0',

          isSidebarCollapsed
            ? 'lg:w-0 lg:overflow-hidden lg:border-0'
            : 'w-64'
        ]"
      >

        <!-- Sidebar Content -->
        <div class="flex h-full min-w-[256px] flex-col">

          <!-- Sidebar Header -->
          <div class="border-b border-slate-100 px-4 py-4 dark:border-slate-800">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-[10px] font-black uppercase tracking-[1.5px] text-slate-400">
                  Admin Panel
                </p>

                <h2 class="mt-1 text-sm font-black text-slate-900 dark:text-white">
                  Sport Management
                </h2>
              </div>

              <div
                class="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 dark:bg-emerald-500/10"
              >
                <Icon
                  name="lucide:shield-check"
                  class="h-4 w-4 text-emerald-500"
                />
              </div>
            </div>
          </div>

          <!-- Search -->
          <div class="px-3 pt-3">
            <div class="relative">
              <Icon
                name="lucide:search"
                class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
              />

              <input
                v-model="searchQuery"
                type="text"
                placeholder="Search menu..."
                class="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-8 text-xs font-semibold text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-emerald-400 focus:bg-white focus:ring-2 focus:ring-emerald-500/10 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:focus:bg-slate-950"
              />

              <button
                v-if="searchQuery"
                type="button"
                @click="searchQuery = ''"
                class="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-rose-500"
              >
                <Icon name="lucide:x" class="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          <!-- Navigation -->
          <div class="custom-scrollbar flex-1 overflow-y-auto px-3 py-4">

            <!-- Main -->
            <div class="mb-5">
              <p
                class="mb-2 px-3 text-[9px] font-black uppercase tracking-[1.5px] text-slate-400"
              >
                Overview
              </p>

              <nav class="space-y-1">
                <NuxtLink
                  v-for="item in filteredOverviewItems"
                  :key="item.path"
                  :to="item.path"
                  @click="handleSidebarNavigation"
                  class="group flex items-center gap-3 rounded-xl px-3 py-2.5 text-[12px] font-bold transition"
                  :class="
                    isLinkActive(item.path)
                      ? 'bg-emerald-500 text-white shadow-sm shadow-emerald-500/20'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-emerald-600 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-emerald-400'
                  "
                >
                  <Icon
                    :name="item.icon"
                    class="h-[17px] w-[17px] shrink-0"
                    :class="
                      isLinkActive(item.path)
                        ? 'text-white'
                        : 'text-slate-400 group-hover:text-emerald-500'
                    "
                  />

                  <span class="truncate">
                    {{ item.label }}
                  </span>

                  <span
                    v-if="item.badge"
                    class="ml-auto rounded-full px-1.5 py-0.5 text-[9px] font-black"
                    :class="
                      isLinkActive(item.path)
                        ? 'bg-white/20 text-white'
                        : 'bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400'
                    "
                  >
                    {{ item.badge }}
                  </span>
                </NuxtLink>
              </nav>
            </div>

            <!-- Management -->
            <div class="mb-5">
              <p
                class="mb-2 px-3 text-[9px] font-black uppercase tracking-[1.5px] text-slate-400"
              >
                Management
              </p>

              <nav class="space-y-1">
                <NuxtLink
                  v-for="item in filteredManagementItems"
                  :key="item.path"
                  :to="item.path"
                  @click="handleSidebarNavigation"
                  class="group flex items-center gap-3 rounded-xl px-3 py-2.5 text-[12px] font-bold transition"
                  :class="
                    isLinkActive(item.path)
                      ? 'bg-emerald-500 text-white shadow-sm shadow-emerald-500/20'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-emerald-600 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-emerald-400'
                  "
                >
                  <Icon
                    :name="item.icon"
                    class="h-[17px] w-[17px] shrink-0"
                    :class="
                      isLinkActive(item.path)
                        ? 'text-white'
                        : 'text-slate-400 group-hover:text-emerald-500'
                    "
                  />

                  <span class="truncate">
                    {{ item.label }}
                  </span>

                  <span
                    v-if="item.badge"
                    class="ml-auto rounded-full bg-amber-100 px-1.5 py-0.5 text-[9px] font-black text-amber-700 dark:bg-amber-500/10 dark:text-amber-400"
                  >
                    {{ item.badge }}
                  </span>
                </NuxtLink>
              </nav>
            </div>

            <!-- Finance -->
            <div class="mb-5">
              <p
                class="mb-2 px-3 text-[9px] font-black uppercase tracking-[1.5px] text-slate-400"
              >
                Finance
              </p>

              <nav class="space-y-1">
                <NuxtLink
                  v-for="item in filteredFinanceItems"
                  :key="item.path"
                  :to="item.path"
                  @click="handleSidebarNavigation"
                  class="group flex items-center gap-3 rounded-xl px-3 py-2.5 text-[12px] font-bold transition"
                  :class="
                    isLinkActive(item.path)
                      ? 'bg-emerald-500 text-white shadow-sm shadow-emerald-500/20'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-emerald-600 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-emerald-400'
                  "
                >
                  <Icon
                    :name="item.icon"
                    class="h-[17px] w-[17px] shrink-0"
                    :class="
                      isLinkActive(item.path)
                        ? 'text-white'
                        : 'text-slate-400 group-hover:text-emerald-500'
                    "
                  />

                  <span class="truncate">
                    {{ item.label }}
                  </span>
                </NuxtLink>
              </nav>
            </div>

            <!-- Account -->
            <div>
              <p
                class="mb-2 px-3 text-[9px] font-black uppercase tracking-[1.5px] text-slate-400"
              >
                Account
              </p>

              <nav class="space-y-1">
                <NuxtLink
                  v-for="item in filteredAccountItems"
                  :key="item.path"
                  :to="item.path"
                  @click="handleSidebarNavigation"
                  class="group flex items-center gap-3 rounded-xl px-3 py-2.5 text-[12px] font-bold transition"
                  :class="
                    isLinkActive(item.path)
                      ? 'bg-emerald-500 text-white shadow-sm shadow-emerald-500/20'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-emerald-600 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-emerald-400'
                  "
                >
                  <Icon
                    :name="item.icon"
                    class="h-[17px] w-[17px] shrink-0"
                    :class="
                      isLinkActive(item.path)
                        ? 'text-white'
                        : 'text-slate-400 group-hover:text-emerald-500'
                    "
                  />

                  <span class="truncate">
                    {{ item.label }}
                  </span>
                </NuxtLink>
              </nav>
            </div>

            <!-- No Search Results -->
            <div
              v-if="hasNoSearchResults"
              class="flex flex-col items-center justify-center px-4 py-10 text-center"
            >
              <div
                class="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 dark:bg-slate-800"
              >
                <Icon
                  name="lucide:search-x"
                  class="h-5 w-5 text-slate-400"
                />
              </div>

              <p class="mt-3 text-xs font-bold text-slate-500">
                No menu found
              </p>

              <p class="mt-1 text-[10px] text-slate-400">
                Try another keyword
              </p>
            </div>
          </div>

          <!-- Sidebar Bottom -->
          <div class="border-t border-slate-100 p-3 dark:border-slate-800">

            <!-- Ethiopia Card -->
            <div
              class="rounded-2xl border border-emerald-100 bg-emerald-50 p-3 dark:border-emerald-500/10 dark:bg-emerald-500/5"
            >
              <div class="flex items-center gap-2.5">
                <div
                  class="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-500 text-white"
                >
                  <Icon name="lucide:map-pin" class="h-4 w-4" />
                </div>

                <div class="min-w-0">
                  <p class="text-[10px] font-black text-emerald-700 dark:text-emerald-400">
                    Addis Ababa
                  </p>

                  <p class="mt-0.5 truncate text-[9px] font-semibold text-slate-500 dark:text-slate-400">
                    Sport field network
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </aside>

      <!-- =======================================================
           MAIN CONTENT
      ======================================================== -->
      <main
        class="custom-scrollbar min-w-0 flex-1 overflow-y-auto bg-slate-50 dark:bg-[#070b12]"
      >
        <div class="mx-auto min-h-full w-full max-w-[1600px] p-4 md:p-6 lg:p-8">
          <slot />
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

/* =========================================================
   STATE
========================================================= */

const isMobileSidebarOpen = ref(false)
const isSidebarCollapsed = ref(false)
const isProfileOpen = ref(false)
const dropdownRef = ref<HTMLElement | null>(null)
const isLoggingOut = ref(false)
const searchQuery = ref('')

/* =========================================================
   USER
========================================================= */

const userAvatar = computed(() => authStore.user?.avatar || '')

const adminName = computed(() => {
  const user = authStore.user

  return (
    user?.name ||
    user?.full_name ||
    user?.fullName ||
    'Admin'
  )
})

/* =========================================================
   ADMIN MENU
========================================================= */

const overviewItems = [
  {
    path: '/admin',
    label: 'Dashboard',
    icon: 'lucide:layout-dashboard'
  },
  {
    path: '/admin/my-venues',
    label: 'Sport Fields',
    icon: 'lucide:map-pin'
  },
  {
    path: '/admin/approvals',
    label: 'Approvals',
    icon: 'lucide:check-circle',
    badge: '9'
  }
]

const managementItems = [
  {
    path: '/admin/bookings',
    label: 'Bookings',
    icon: 'lucide:calendar-check'
  },
  {
    path: '/admin/partners',
    label: 'Partners',
    icon: 'lucide:handshake'
  },
  {
    path: '/admin/users',
    label: 'Users',
    icon: 'lucide:users'
  },
  {
    path: '/admin/events',
    label: 'Events',
    icon: 'lucide:trophy'
  },
  {
    path: '/admin/games',
    label: 'Games',
    icon: 'lucide:gamepad-2'
  }
]

const financeItems = [
  {
    path: '/admin/payouts',
    label: 'Payouts & Wallet',
    icon: 'lucide:wallet-cards'
  },
  {
    path: '/admin/reports',
    label: 'Reports',
    icon: 'lucide:chart-no-axes-combined'
  }
]

const accountItems = [
  {
    path: '/admin/profile',
    label: 'Profile Settings',
    icon: 'lucide:user-cog'
  },
  {
    path: '/admin/settings',
    label: 'Settings',
    icon: 'lucide:settings'
  }
]

/* =========================================================
   SEARCH
========================================================= */

const filterItems = (items: typeof overviewItems) => {
  const query = searchQuery.value.trim().toLowerCase()

  if (!query) return items

  return items.filter(item =>
    item.label.toLowerCase().includes(query) ||
    item.path.toLowerCase().includes(query)
  )
}

const filteredOverviewItems = computed(() =>
  filterItems(overviewItems)
)

const filteredManagementItems = computed(() =>
  filterItems(managementItems)
)

const filteredFinanceItems = computed(() =>
  filterItems(financeItems)
)

const filteredAccountItems = computed(() =>
  filterItems(accountItems)
)

const hasNoSearchResults = computed(() => {
  if (!searchQuery.value.trim()) return false

  return (
    filteredOverviewItems.value.length === 0 &&
    filteredManagementItems.value.length === 0 &&
    filteredFinanceItems.value.length === 0 &&
    filteredAccountItems.value.length === 0
  )
})

/* =========================================================
   SIDEBAR
========================================================= */

const toggleSidebar = () => {
  if (window.innerWidth < 1024) {
    isMobileSidebarOpen.value = !isMobileSidebarOpen.value
  } else {
    isSidebarCollapsed.value = !isSidebarCollapsed.value
  }
}

const handleSidebarNavigation = () => {
  searchQuery.value = ''
  isMobileSidebarOpen.value = false
  isProfileOpen.value = false
}

/* =========================================================
   ACTIVE LINK
========================================================= */

const isLinkActive = (path: string) => {
  if (path === '/admin') {
    return route.path === '/admin'
  }

  return route.path === path || route.path.startsWith(`${path}/`)
}

/* =========================================================
   PROFILE DROPDOWN
========================================================= */

const toggleDropdown = () => {
  isProfileOpen.value = !isProfileOpen.value
}

const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as Node | null

  if (
    dropdownRef.value &&
    target &&
    !dropdownRef.value.contains(target)
  ) {
    isProfileOpen.value = false
  }
}

/* =========================================================
   LOGOUT
========================================================= */

const handleLogout = async () => {
  if (isLoggingOut.value) return

  isLoggingOut.value = true

  try {
    await authStore.logout()

    isProfileOpen.value = false

    await router.push('/')
  } catch (error) {
    console.error('Logout failed:', error)
  } finally {
    isLoggingOut.value = false
  }
}

/* =========================================================
   LIFECYCLE
========================================================= */

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 5px;
  height: 5px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(100, 116, 139, 0.25);
  border-radius: 999px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: rgba(16, 185, 129, 0.45);
}

.custom-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: rgba(100, 116, 139, 0.3) transparent;
}
</style>
```
