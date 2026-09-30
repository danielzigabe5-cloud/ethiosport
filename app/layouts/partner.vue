<script setup lang="ts">
import {
  computed,
  onBeforeUnmount,
  onMounted,
  ref,
} from 'vue'

import { useRoute, useRouter } from 'vue-router'

import venue20Image from '~/assets/images/venues20.jpg'

const route = useRoute()
const router = useRouter()

const authStore = useAuthStore()

const sidebarExpanded = ref(true)
const mobileOpen = ref(false)
const profileOpen = ref(false)

const profileRef = ref<HTMLElement | null>(null)

const bookingCount = ref(3)
const pendingPayouts = ref(1)
const notifications = ref(3)

const config = useRuntimeConfig()

/*
|--------------------------------------------------------------------------
| Navigation
|--------------------------------------------------------------------------
*/

const navigation = [
  {
    label: 'Dashboard',
    to: '/partner',
    icon: 'lucide:layout-dashboard',
  },
  {
    label: 'My Venue',
    to: '/partner/my-venue',
    icon: 'lucide:building-2',
  },
  {
    label: 'Manage Slots',
    to: '/partner/schedule',
    icon: 'lucide:calendar-clock',
  },
  {
    label: 'Bookings',
    to: '/partner/bookings',
    icon: 'lucide:calendar-check',
    badge: bookingCount,
  },
  {
    label: 'Events',
    to: '/partner/events',
    icon: 'lucide:trophy',
  },
  {
    label: 'Earnings',
    to: '/partner/earnings',
    icon: 'lucide:wallet',
  },
  {
    label: 'Payouts',
    to: '/partner/payouts',
    icon: 'lucide:banknote',
    badge: pendingPayouts,
  },
]

const bottomNavigation = [
  {
    label: 'Profile',
    to: '/partner/profile',
    icon: 'lucide:user-round',
  },
  {
    label: 'Settings',
    to: '/partner/settings',
    icon: 'lucide:settings',
  },
]

/*
|--------------------------------------------------------------------------
| Page Title
|--------------------------------------------------------------------------
*/

const pageTitle = computed(() => {
  const path = route.path

  if (
    path === '/partner' ||
    path === '/partner/dashboard'
  ) {
    return 'Dashboard'
  }

  if (path.startsWith('/partner/my-venue')) {
    return 'My Venue'
  }

  if (path.startsWith('/partner/schedule')) {
    return 'Manage Slots'
  }

  if (path.startsWith('/partner/bookings')) {
    return 'Bookings'
  }

  if (path.startsWith('/partner/events')) {
    return 'Events'
  }

  if (path.startsWith('/partner/earnings')) {
    return 'Earnings'
  }

  if (path.startsWith('/partner/payouts')) {
    return 'Payouts'
  }

  if (path.startsWith('/partner/profile')) {
    return 'Profile'
  }

  if (path.startsWith('/partner/settings')) {
    return 'Settings'
  }

  return 'Partner Portal'
})

/*
|--------------------------------------------------------------------------
| User
|--------------------------------------------------------------------------
*/

const currentUser = computed(() => authStore.user)

const userName = computed(() => {
  return (
    currentUser.value?.name ||
    currentUser.value?.full_name ||
    currentUser.value?.fullName ||
    'Partner'
  )
})

const userEmail = computed(() => {
  return currentUser.value?.email || ''
})

const userInitial = computed(() => {
  return userName.value.charAt(0).toUpperCase()
})

/*
|--------------------------------------------------------------------------
| Avatar
|--------------------------------------------------------------------------
*/

const avatarUrl = computed(() => {
  const avatar =
    currentUser.value?.avatar ||
    currentUser.value?.profile_photo_url ||
    currentUser.value?.profilePhoto ||
    ''

  if (!avatar) {
    return ''
  }

  const avatarString = String(avatar)

  if (
    avatarString.startsWith('http://') ||
    avatarString.startsWith('https://')
  ) {
    return avatarString
  }

  const baseUrl = String(
    config.public.apiBase ||
      'http://127.0.0.1:8001'
  ).replace(/\/+$/, '')

  const cleanPath = avatarString.replace(/^\/+/, '')

  return `${baseUrl}/${cleanPath}`
})

/*
|--------------------------------------------------------------------------
| Sidebar
|--------------------------------------------------------------------------
*/

function toggleSidebar() {
  sidebarExpanded.value = !sidebarExpanded.value

  if (import.meta.client) {
    localStorage.setItem(
      'partner-sidebar-expanded',
      String(sidebarExpanded.value),
    )
  }
}

function closeMobileSidebar() {
  mobileOpen.value = false
}

function openMobileSidebar() {
  mobileOpen.value = true
}

/*
|--------------------------------------------------------------------------
| Active Route
|--------------------------------------------------------------------------
*/

function isActive(path: string) {
  const currentPath =
    route.path.replace(/\/+$/, '') || '/'

  const targetPath =
    path.replace(/\/+$/, '') || '/'

  if (targetPath === '/partner') {
    return (
      currentPath === '/partner' ||
      currentPath === '/partner/dashboard'
    )
  }

  return (
    currentPath === targetPath ||
    currentPath.startsWith(`${targetPath}/`)
  )
}

/*
|--------------------------------------------------------------------------
| Profile
|--------------------------------------------------------------------------
*/

const profileLink = computed(() => {
  const role = currentUser.value?.role

  if (role === 'admin') {
    return '/admin/profile'
  }

  if (
    role === 'partner' ||
    role === 'owner'
  ) {
    return '/partner/profile'
  }

  return '/profile'
})

function toggleProfileMenu() {
  profileOpen.value = !profileOpen.value
}

function closeProfileMenu() {
  profileOpen.value = false
}

function handleOutsideClick(event: MouseEvent) {
  const target = event.target as Node

  if (
    profileRef.value &&
    !profileRef.value.contains(target)
  ) {
    profileOpen.value = false
  }
}

/*
|--------------------------------------------------------------------------
| Logout
|--------------------------------------------------------------------------
*/

async function logout() {
  profileOpen.value = false

  try {
    await authStore.logout()
  } catch (error) {
    console.error('Logout error:', error)
  } finally {
    await router.push('/auth')
  }
}

/*
|--------------------------------------------------------------------------
| Notifications
|--------------------------------------------------------------------------
*/

function openNotifications() {
  notifications.value = 0
  router.push('/partner/bookings')
}

/*
|--------------------------------------------------------------------------
| Initialization
|--------------------------------------------------------------------------
*/

onMounted(async () => {
  const savedSidebarState =
    localStorage.getItem(
      'partner-sidebar-expanded',
    )

  if (savedSidebarState !== null) {
    sidebarExpanded.value =
      savedSidebarState === 'true'
  }

  try {
    await authStore.init()
  } catch (error) {
    console.error(
      'Auth initialization error:',
      error,
    )
  }

  document.addEventListener(
    'click',
    handleOutsideClick,
  )
})

onBeforeUnmount(() => {
  document.removeEventListener(
    'click',
    handleOutsideClick,
  )
})
</script>

<template>
  <div
    class="min-h-screen bg-slate-50 text-slate-800"
  >
    <!-- =========================================================
         MOBILE OVERLAY
    ========================================================== -->

    <Transition name="fade">
      <div
        v-if="mobileOpen"
        class="fixed inset-0 z-40 bg-slate-950/50 backdrop-blur-sm lg:hidden"
        @click="closeMobileSidebar"
      ></div>
    </Transition>

    <!-- =========================================================
         SIDEBAR
    ========================================================== -->

    <aside
      class="fixed inset-y-0 left-0 z-50 flex flex-col border-r border-slate-200 bg-white shadow-xl transition-all duration-300 lg:z-30 lg:shadow-none"
      :class="[
        sidebarExpanded
          ? 'w-[270px]'
          : 'w-[82px]',
        mobileOpen
          ? 'translate-x-0'
          : '-translate-x-full lg:translate-x-0',
      ]"
    >
      <!-- =======================================================
           SIDEBAR HEADER
      ======================================================== -->

      <div
        class="relative flex h-[76px] shrink-0 items-center border-b border-slate-100"
        :class="
          sidebarExpanded
            ? 'px-5'
            : 'justify-center px-2'
        "
      >
        <NuxtLink
          to="/partner"
          class="flex min-w-0 items-center"
          :class="
            sidebarExpanded
              ? 'gap-3'
              : 'justify-center'
          "
          @click="mobileOpen = false"
        >
          <!-- LOGO -->

          <div
            class="h-10 w-10 shrink-0 overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-slate-200"
          >
            <img
              :src="venue20Image"
              alt="Combolojo Sport"
              class="h-full w-full object-cover"
            />
          </div>

          <!-- LOGO TEXT -->

          <div
            v-if="sidebarExpanded"
            class="min-w-0 overflow-hidden"
          >
            <h1
              class="whitespace-nowrap text-lg font-black tracking-tight text-slate-900"
            >
              COMBO
              <span class="text-emerald-600">
                LOJO
              </span>
            </h1>

            <p
              class="whitespace-nowrap text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400"
            >
              Partner Portal
            </p>
          </div>
        </NuxtLink>

        <!-- DESKTOP TOGGLE -->

        <button
          type="button"
          class="absolute flex h-9 w-9 items-center justify-center rounded-xl text-slate-500 transition-all duration-200 hover:bg-emerald-50 hover:text-emerald-600 active:scale-95"
          :class="
            sidebarExpanded
              ? 'right-3 top-1/2 -translate-y-1/2'
              : 'left-1/2 bottom-1 -translate-x-1/2'
          "
          title="Toggle sidebar"
          @click="toggleSidebar"
        >
          <Icon
            name="lucide:menu"
            class="h-5 w-5"
          />
        </button>
      </div>

      <!-- =======================================================
           SIDEBAR CONTENT
      ======================================================== -->

      <div
        class="custom-scrollbar flex-1 overflow-y-auto px-3 py-5"
      >
        <!-- MAIN MENU -->

        <div
          v-if="sidebarExpanded"
          class="mb-3 px-3 text-[10px] font-black uppercase tracking-[0.18em] text-slate-400"
        >
          Main Menu
        </div>

        <nav class="space-y-1.5">
          <NuxtLink
            v-for="item in navigation"
            :key="item.to"
            :to="item.to"
            class="sidebar-link group relative flex items-center rounded-xl transition-all duration-200"
            :class="[
              sidebarExpanded
                ? 'gap-3 px-3 py-3'
                : 'justify-center px-2 py-3',

              isActive(item.to)
                ? 'bg-emerald-50 text-emerald-700'
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900',
            ]"
            :title="
              !sidebarExpanded
                ? item.label
                : undefined
            "
            @click="mobileOpen = false"
          >
            <!-- ACTIVE BAR -->

            <span
              v-if="isActive(item.to)"
              class="absolute left-0 top-1/2 h-7 w-1 -translate-y-1/2 rounded-r-full bg-emerald-500"
            ></span>

            <Icon
              :name="item.icon"
              class="h-5 w-5 shrink-0 transition-transform duration-200 group-hover:scale-105"
            />

            <span
              v-if="sidebarExpanded"
              class="min-w-0 flex-1 truncate text-sm font-semibold"
            >
              {{ item.label }}
            </span>

            <!-- EXPANDED BADGE -->

            <span
              v-if="
                sidebarExpanded &&
                item.badge &&
                item.badge > 0
              "
              class="flex h-5 min-w-5 items-center justify-center rounded-full bg-emerald-500 px-1.5 text-[10px] font-black text-white"
            >
              {{ item.badge }}
            </span>

            <!-- COLLAPSED BADGE -->

            <span
              v-if="
                !sidebarExpanded &&
                item.badge &&
                item.badge > 0
              "
              class="absolute right-1 top-1 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-white"
            ></span>
          </NuxtLink>
        </nav>

        <!-- ACCOUNT -->

        <div class="my-6">
          <div
            v-if="sidebarExpanded"
            class="mb-3 px-3 text-[10px] font-black uppercase tracking-[0.18em] text-slate-400"
          >
            Account
          </div>

          <nav class="space-y-1.5">
            <NuxtLink
              v-for="item in bottomNavigation"
              :key="item.to"
              :to="item.to"
              class="sidebar-link group relative flex items-center rounded-xl transition-all duration-200"
              :class="[
                sidebarExpanded
                  ? 'gap-3 px-3 py-3'
                  : 'justify-center px-2 py-3',

                isActive(item.to)
                  ? 'bg-emerald-50 text-emerald-700'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900',
              ]"
              :title="
                !sidebarExpanded
                  ? item.label
                  : undefined
              "
              @click="mobileOpen = false"
            >
              <!-- ACTIVE BAR -->

              <span
                v-if="isActive(item.to)"
                class="absolute left-0 top-1/2 h-7 w-1 -translate-y-1/2 rounded-r-full bg-emerald-500"
              ></span>

              <Icon
                :name="item.icon"
                class="h-5 w-5 shrink-0"
              />

              <span
                v-if="sidebarExpanded"
                class="text-sm font-semibold"
              >
                {{ item.label }}
              </span>
            </NuxtLink>
          </nav>
        </div>
      </div>

      <!-- =======================================================
           SIDEBAR FOOTER USER
      ======================================================== -->

      <div
        class="shrink-0 border-t border-slate-100 p-3"
      >
        <div
          class="flex items-center rounded-xl bg-slate-50"
          :class="
            sidebarExpanded
              ? 'gap-3 px-3 py-3'
              : 'justify-center px-2 py-3'
          "
        >
          <!-- AVATAR -->

          <div
            class="h-9 w-9 shrink-0 overflow-hidden rounded-full bg-emerald-100"
          >
            <img
              v-if="avatarUrl"
              :src="avatarUrl"
              :alt="userName"
              class="h-full w-full object-cover"
            />

            <div
              v-else
              class="flex h-full w-full items-center justify-center text-sm font-black text-emerald-700"
            >
              {{ userInitial }}
            </div>
          </div>

          <div
            v-if="sidebarExpanded"
            class="min-w-0 flex-1"
          >
            <p
              class="truncate text-sm font-bold text-slate-800"
            >
              {{ userName }}
            </p>

            <p
              class="truncate text-[11px] text-slate-400"
            >
              {{ userEmail || 'Venue Partner' }}
            </p>
          </div>
        </div>
      </div>
    </aside>

    <!-- =========================================================
         MAIN AREA
    ========================================================== -->

    <div
      class="min-h-screen transition-all duration-300"
      :class="
        sidebarExpanded
          ? 'lg:pl-[270px]'
          : 'lg:pl-[82px]'
      "
    >
      <!-- =======================================================
           TOP NAVBAR
      ======================================================== -->

      <header
        class="sticky top-0 z-20 flex h-[76px] items-center justify-between border-b border-slate-200 bg-white/95 px-4 backdrop-blur-md sm:px-6 lg:px-8"
      >
        <!-- LEFT -->

        <div
          class="flex min-w-0 items-center gap-3"
        >
          <!-- MOBILE MENU -->

          <button
            type="button"
            class="flex h-10 w-10 items-center justify-center rounded-xl text-slate-600 transition hover:bg-slate-100 lg:hidden"
            @click="openMobileSidebar"
          >
            <Icon
              name="lucide:menu"
              class="h-5 w-5"
            />
          </button>

          <div class="min-w-0">
            <p
              class="hidden text-[10px] font-black uppercase tracking-[0.18em] text-emerald-600 sm:block"
            >
              Partner Portal
            </p>

            <h2
              class="truncate text-lg font-black text-slate-900 sm:text-xl"
            >
              {{ pageTitle }}
            </h2>
          </div>
        </div>

        <!-- RIGHT -->

        <div
          class="flex items-center gap-2 sm:gap-3"
        >
          <!-- VIEW WEBSITE -->

          <NuxtLink
            to="/"
            class="hidden items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-600 transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700 sm:flex"
          >
            <Icon
              name="lucide:external-link"
              class="h-4 w-4"
            />

            <span>View Website</span>
          </NuxtLink>

          <!-- NOTIFICATIONS -->

          <button
            type="button"
            class="relative flex h-10 w-10 items-center justify-center rounded-xl text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
            title="Notifications"
            @click="openNotifications"
          >
            <Icon
              name="lucide:bell"
              class="h-5 w-5"
            />

            <span
              v-if="notifications > 0"
              class="absolute right-1.5 top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-emerald-500 px-1 text-[9px] font-black text-white ring-2 ring-white"
            >
              {{ notifications }}
            </span>
          </button>

          <!-- PROFILE -->

          <div
            ref="profileRef"
            class="relative"
          >
            <button
              type="button"
              class="flex items-center gap-2 rounded-xl p-1.5 transition hover:bg-slate-100"
              @click="toggleProfileMenu"
            >
              <!-- AVATAR -->

              <div
                class="h-9 w-9 overflow-hidden rounded-full bg-emerald-100"
              >
                <img
                  v-if="avatarUrl"
                  :src="avatarUrl"
                  :alt="userName"
                  class="h-full w-full object-cover"
                />

                <div
                  v-else
                  class="flex h-full w-full items-center justify-center text-sm font-black text-emerald-700"
                >
                  {{ userInitial }}
                </div>
              </div>

              <!-- USER NAME -->

              <div
                class="hidden text-left lg:block"
              >
                <p
                  class="max-w-[130px] truncate text-sm font-bold text-slate-800"
                >
                  {{ userName }}
                </p>

                <p
                  class="text-[10px] font-semibold uppercase tracking-wider text-slate-400"
                >
                  Partner
                </p>
              </div>

              <Icon
                name="lucide:chevron-down"
                class="hidden h-4 w-4 text-slate-400 lg:block"
              />
            </button>

            <!-- PROFILE DROPDOWN -->

            <Transition name="dropdown">
              <div
                v-if="profileOpen"
                class="absolute right-0 top-[calc(100%+10px)] w-64 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl"
              >
                <!-- USER -->

                <div
                  class="border-b border-slate-100 px-4 py-4"
                >
                  <div
                    class="flex items-center gap-3"
                  >
                    <div
                      class="h-10 w-10 shrink-0 overflow-hidden rounded-full bg-emerald-100"
                    >
                      <img
                        v-if="avatarUrl"
                        :src="avatarUrl"
                        :alt="userName"
                        class="h-full w-full object-cover"
                      />

                      <div
                        v-else
                        class="flex h-full w-full items-center justify-center font-black text-emerald-700"
                      >
                        {{ userInitial }}
                      </div>
                    </div>

                    <div class="min-w-0">
                      <p
                        class="truncate text-sm font-bold text-slate-900"
                      >
                        {{ userName }}
                      </p>

                      <p
                        class="truncate text-xs text-slate-400"
                      >
                        {{
                          userEmail ||
                          'Partner account'
                        }}
                      </p>
                    </div>
                  </div>
                </div>

                <!-- LINKS -->

                <div class="p-2">
                  <NuxtLink
                    :to="profileLink"
                    class="dropdown-link flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 hover:text-slate-900"
                    @click="closeProfileMenu"
                  >
                    <Icon
                      name="lucide:user-round"
                      class="h-4 w-4"
                    />

                    Profile
                  </NuxtLink>

                  <NuxtLink
                    to="/partner/settings"
                    class="dropdown-link flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 hover:text-slate-900"
                    @click="closeProfileMenu"
                  >
                    <Icon
                      name="lucide:settings"
                      class="h-4 w-4"
                    />

                    Settings
                  </NuxtLink>
                </div>

                <!-- LOGOUT -->

                <div
                  class="border-t border-slate-100 p-2"
                >
                  <button
                    type="button"
                    class="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50"
                    @click="logout"
                  >
                    <Icon
                      name="lucide:log-out"
                      class="h-4 w-4"
                    />

                    Logout
                  </button>
                </div>
              </div>
            </Transition>
          </div>
        </div>
      </header>

      <!-- =======================================================
           PAGE CONTENT
      ======================================================== -->

      <main
        class="min-h-[calc(100vh-76px)] p-4 sm:p-6 lg:p-8"
      >
        <slot />
      </main>
    </div>
  </div>
</template>

<style scoped>
/*
|--------------------------------------------------------------------------
| Sidebar
|--------------------------------------------------------------------------
*/

.sidebar-link:hover {
  transform: translateX(1px);
}

/*
|--------------------------------------------------------------------------
| Scrollbar
|--------------------------------------------------------------------------
*/

.custom-scrollbar::-webkit-scrollbar {
  width: 5px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 9999px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

/*
|--------------------------------------------------------------------------
| Page Fade
|--------------------------------------------------------------------------
*/

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/*
|--------------------------------------------------------------------------
| Dropdown Animation
|--------------------------------------------------------------------------
*/

.dropdown-enter-active,
.dropdown-leave-active {
  transition:
    opacity 0.15s ease,
    transform 0.15s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-5px);
}

/*
|--------------------------------------------------------------------------
| Mobile
|--------------------------------------------------------------------------
*/

@media (max-width: 1023px) {
  .sidebar-link:hover {
    transform: none;
  }
}
</style>