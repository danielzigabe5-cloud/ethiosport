```vue
<template>
  <div class="flex h-screen overflow-hidden bg-slate-50">

    <!-- =========================
         MOBILE OVERLAY
    ========================== -->
    <div
      v-if="mobileOpen"
      class="fixed inset-0 z-40 bg-slate-950/50 lg:hidden"
      @click="mobileOpen = false"
    />

    <!-- =========================
         SIDEBAR
    ========================== -->
    <aside
      class="fixed inset-y-0 left-0 z-50 flex w-[270px] flex-col border-r border-slate-200 bg-white transition-transform duration-300 lg:static lg:translate-x-0"
      :class="mobileOpen ? 'translate-x-0' : '-translate-x-full'"
    >

      <!-- LOGO -->
      <div class="flex h-[76px] shrink-0 items-center border-b border-slate-100 px-5">
        <NuxtLink
          to="/partner"
          class="flex items-center gap-3"
          @click="mobileOpen = false"
        >
          <div
            class="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 text-xl shadow-sm"
          >
            ⚽
          </div>

          <div>
            <h1 class="text-lg font-black tracking-tight text-slate-900">
              COMBO<span class="text-emerald-600">LOJO</span>
            </h1>

            <p class="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">
              Partner Portal
            </p>
          </div>
        </NuxtLink>
      </div>

      <!-- =========================
           NAVIGATION
      ========================== -->
      <nav class="custom-scrollbar flex-1 overflow-y-auto px-3 py-5">

        <!-- OVERVIEW -->
        <div class="mb-6">
          <p class="mb-2 px-3 text-[10px] font-extrabold uppercase tracking-[0.16em] text-slate-400">
            Overview
          </p>

          <NuxtLink
            to="/partner"
            class="sidebar-link"
            :class="isActive('/partner') ? 'sidebar-active' : ''"
            @click="mobileOpen = false"
          >
            <span class="sidebar-icon">
              ▣
            </span>

            <span class="flex-1">
              Dashboard
            </span>
          </NuxtLink>
        </div>

        <!-- MY SPORT FIELD -->
        <div class="mb-6">
          <p class="mb-2 px-3 text-[10px] font-extrabold uppercase tracking-[0.16em] text-slate-400">
            My Sport Field
          </p>

          <NuxtLink
            to="/partner/my-venue"
            class="sidebar-link"
            :class="isActive('/partner/my-venue') ? 'sidebar-active' : ''"
            @click="mobileOpen = false"
          >
            <span class="sidebar-icon">
              ⚽
            </span>

            <span class="flex-1">
              My Venue
            </span>
          </NuxtLink>

          <NuxtLink
            to="/partner/slots"
            class="sidebar-link"
            :class="isActive('/partner/slots') ? 'sidebar-active' : ''"
            @click="mobileOpen = false"
          >
            <span class="sidebar-icon">
              ◷
            </span>

            <span class="flex-1">
              Manage Slots
            </span>
          </NuxtLink>

          <NuxtLink
            to="/partner/bookings"
            class="sidebar-link"
            :class="isActive('/partner/bookings') ? 'sidebar-active' : ''"
            @click="mobileOpen = false"
          >
            <span class="sidebar-icon">
              📅
            </span>

            <span class="flex-1">
              Bookings
            </span>

            <span
              v-if="bookingCount > 0"
              class="flex h-5 min-w-5 items-center justify-center rounded-full bg-emerald-100 px-1.5 text-[10px] font-bold text-emerald-700"
            >
              {{ bookingCount }}
            </span>
          </NuxtLink>
        </div>

        <!-- MANAGEMENT -->
        <div class="mb-6">
          <p class="mb-2 px-3 text-[10px] font-extrabold uppercase tracking-[0.16em] text-slate-400">
            Management
          </p>

          <NuxtLink
            to="/partner/events"
            class="sidebar-link"
            :class="isActive('/partner/events') ? 'sidebar-active' : ''"
            @click="mobileOpen = false"
          >
            <span class="sidebar-icon">
              🎯
            </span>

            <span class="flex-1">
              Events
            </span>
          </NuxtLink>

          <NuxtLink
            to="/partner/games"
            class="sidebar-link"
            :class="isActive('/partner/games') ? 'sidebar-active' : ''"
            @click="mobileOpen = false"
          >
            <span class="sidebar-icon">
              🏆
            </span>

            <span class="flex-1">
              Games
            </span>
          </NuxtLink>
        </div>

        <!-- FINANCE -->
        <div class="mb-6">
          <p class="mb-2 px-3 text-[10px] font-extrabold uppercase tracking-[0.16em] text-slate-400">
            Finance
          </p>

          <NuxtLink
            to="/partner/earnings"
            class="sidebar-link"
            :class="isActive('/partner/earnings') ? 'sidebar-active' : ''"
            @click="mobileOpen = false"
          >
            <span class="sidebar-icon">
              💰
            </span>

            <span class="flex-1">
              Earnings
            </span>
          </NuxtLink>

          <NuxtLink
            to="/partner/payouts"
            class="sidebar-link"
            :class="isActive('/partner/payouts') ? 'sidebar-active' : ''"
            @click="mobileOpen = false"
          >
            <span class="sidebar-icon">
              💳
            </span>

            <span class="flex-1">
              Payouts & Wallet
            </span>

            <span
              v-if="pendingPayouts > 0"
              class="flex h-5 min-w-5 items-center justify-center rounded-full bg-amber-100 px-1.5 text-[10px] font-bold text-amber-700"
            >
              {{ pendingPayouts }}
            </span>
          </NuxtLink>
        </div>

        <!-- ACCOUNT -->
        <div>
          <p class="mb-2 px-3 text-[10px] font-extrabold uppercase tracking-[0.16em] text-slate-400">
            Account
          </p>

          <NuxtLink
            to="/partner/profile"
            class="sidebar-link"
            :class="isActive('/partner/profile') ? 'sidebar-active' : ''"
            @click="mobileOpen = false"
          >
            <span class="sidebar-icon">
              👤
            </span>

            <span class="flex-1">
              Profile
            </span>
          </NuxtLink>

          <NuxtLink
            to="/partner/settings"
            class="sidebar-link"
            :class="isActive('/partner/settings') ? 'sidebar-active' : ''"
            @click="mobileOpen = false"
          >
            <span class="sidebar-icon">
              ⚙
            </span>

            <span class="flex-1">
              Settings
            </span>
          </NuxtLink>
        </div>

      </nav>

      <!-- =========================
           VENUE STATUS
      ========================== -->
      <div class="shrink-0 border-t border-slate-100 p-4">

        <div class="rounded-2xl bg-slate-900 p-4 text-white">

          <!-- Title -->
          <div class="mb-3 flex items-center justify-between">

            <p class="text-[10px] font-extrabold uppercase tracking-[0.14em] text-slate-400">
              Venue Status
            </p>

            <div class="flex items-center gap-1.5">
              <span class="h-2 w-2 rounded-full bg-emerald-400" />

              <span class="text-[10px] font-bold text-emerald-400">
                Active
              </span>
            </div>

          </div>

          <!-- Venue -->
          <div class="flex items-center gap-3">

            <div
              class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/15 text-lg"
            >
              ⚽
            </div>

            <div class="min-w-0">

              <p class="truncate text-sm font-bold text-white">
                {{ venueName }}
              </p>

              <p class="mt-0.5 truncate text-[11px] text-slate-400">
                📍 {{ venueLocation }}
              </p>

            </div>

          </div>

          <!-- Manage -->
          <NuxtLink
            to="/partner/my-venue"
            class="mt-3 flex w-full items-center justify-center rounded-xl bg-white/10 py-2 text-xs font-bold text-white transition hover:bg-white/15"
            @click="mobileOpen = false"
          >
            Manage Venue
          </NuxtLink>

        </div>

      </div>

      <!-- =========================
           BACK TO WEBSITE
      ========================== -->
      <div class="shrink-0 border-t border-slate-100 p-4">

        <NuxtLink
          to="/"
          class="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
          @click="mobileOpen = false"
        >
          <span class="text-lg">
            ←
          </span>

          <span>
            Back to Website
          </span>
        </NuxtLink>

      </div>

    </aside>

    <!-- =========================
         RIGHT SIDE
    ========================== -->
    <div class="flex min-w-0 flex-1 flex-col">

      <!-- TOPBAR -->
      <header
        class="flex h-[76px] shrink-0 items-center justify-between border-b border-slate-200 bg-white px-4 sm:px-6"
      >

        <!-- LEFT -->
        <div class="flex items-center gap-3">

          <!-- Mobile Menu -->
          <button
            class="flex h-10 w-10 items-center justify-center rounded-xl text-slate-600 hover:bg-slate-100 lg:hidden"
            @click="mobileOpen = true"
          >
            <svg
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          <div>
            <p class="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400">
              Partner Dashboard
            </p>

            <h2 class="text-base font-bold text-slate-900">
              {{ pageTitle }}
            </h2>
          </div>

        </div>

        <!-- RIGHT -->
        <div class="flex items-center gap-2">

          <!-- View Site -->
          <NuxtLink
            to="/"
            class="hidden items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50 md:flex"
          >
            <span>↗</span>
            View Site
          </NuxtLink>

          <!-- Notification -->
          <button
            class="relative flex h-10 w-10 items-center justify-center rounded-xl text-slate-500 hover:bg-slate-100"
          >
            <svg
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 17h5l-1.4-1.4A2 2 0 0118 14.2V11a6 6 0 10-12 0v3.2a2 2 0 01-.6 1.4L4 17h5m6 0a3 3 0 01-6 0"
              />
            </svg>

            <span
              v-if="notifications > 0"
              class="absolute right-1.5 top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[9px] font-bold text-white"
            >
              {{ notifications }}
            </span>
          </button>

          <!-- Profile -->
          <div class="relative">

            <button
              class="flex items-center gap-2 rounded-xl p-1.5 hover:bg-slate-100"
              @click.stop="profileOpen = !profileOpen"
            >

              <div
                class="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-100 font-bold text-emerald-700"
              >
                {{ partnerInitials }}
              </div>

              <div class="hidden text-left sm:block">
                <p class="max-w-[120px] truncate text-xs font-bold text-slate-900">
                  {{ partnerName }}
                </p>

                <p class="text-[10px] text-slate-500">
                  Partner
                </p>
              </div>

              <span class="hidden text-xs text-slate-400 sm:block">
                ▼
              </span>

            </button>

            <!-- Dropdown -->
            <div
              v-if="profileOpen"
              class="absolute right-0 top-14 z-50 w-60 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl"
            >

              <div class="border-b border-slate-100 p-4">

                <p class="font-bold text-slate-900">
                  {{ partnerName }}
                </p>

                <p class="mt-1 truncate text-xs text-slate-500">
                  {{ partnerEmail }}
                </p>

              </div>

              <div class="p-2">

                <NuxtLink
                  to="/partner/profile"
                  class="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-600 hover:bg-slate-50"
                  @click="profileOpen = false"
                >
                  👤
                  Profile
                </NuxtLink>

                <NuxtLink
                  to="/partner/settings"
                  class="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-600 hover:bg-slate-50"
                  @click="profileOpen = false"
                >
                  ⚙
                  Settings
                </NuxtLink>

              </div>

              <div class="border-t border-slate-100 p-2">

                <button
                  class="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-50"
                  @click="logout"
                >
                  ↪
                  Logout
                </button>

              </div>

            </div>

          </div>

        </div>

      </header>

      <!-- PAGE -->
      <main class="custom-scrollbar min-h-0 flex-1 overflow-y-auto">
        <slot />
      </main>

    </div>

  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onBeforeUnmount, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

defineOptions({
  name: 'PartnerLayout',
})

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

/*
|--------------------------------------------------------------------------
| UI State
|--------------------------------------------------------------------------
*/

const mobileOpen = ref(false)
const profileOpen = ref(false)

const bookingCount = ref(3)
const pendingPayouts = ref(1)
const notifications = ref(3)

/*
|--------------------------------------------------------------------------
| Partner Information
|--------------------------------------------------------------------------
*/

const partnerName = computed(() => {
  const user = authStore.user as any

  return (
    user?.name ||
    user?.full_name ||
    user?.fullName ||
    'Partner'
  )
})

const partnerEmail = computed(() => {
  const user = authStore.user as any

  return user?.email || 'partner@combolojo.com'
})

const partnerInitials = computed(() => {
  const name = partnerName.value.trim()

  if (!name) {
    return 'P'
  }

  return name
    .split(' ')
    .slice(0, 2)
    .map((part: string) => part.charAt(0))
    .join('')
    .toUpperCase()
})

/*
|--------------------------------------------------------------------------
| Venue
|--------------------------------------------------------------------------
*/

const venueName = computed(() => {
  const user = authStore.user as any

  return (
    user?.venue?.name ||
    user?.venue_name ||
    'Sarbet Futsal Arena'
  )
})

const venueLocation = computed(() => {
  const user = authStore.user as any

  return (
    user?.venue?.location ||
    user?.venue_location ||
    'Bole, Addis Ababa'
  )
})

/*
|--------------------------------------------------------------------------
| Page Title
|--------------------------------------------------------------------------
*/

const pageTitle = computed(() => {
  const path = route.path

  if (path === '/partner') {
    return 'Dashboard'
  }

  if (path.includes('/my-venue')) {
    return 'My Venue'
  }

  if (path.includes('/slots')) {
    return 'Manage Slots'
  }

  if (path.includes('/bookings')) {
    return 'Bookings'
  }

  if (path.includes('/events')) {
    return 'Events'
  }

  if (path.includes('/games')) {
    return 'Games'
  }

  if (path.includes('/earnings')) {
    return 'Earnings'
  }

  if (path.includes('/payouts')) {
    return 'Payouts & Wallet'
  }

  if (path.includes('/profile')) {
    return 'Profile'
  }

  if (path.includes('/settings')) {
    return 'Settings'
  }

  return 'Partner Dashboard'
})

/*
|--------------------------------------------------------------------------
| Active Sidebar
|--------------------------------------------------------------------------
*/

function isActive(path: string) {
  if (path === '/partner') {
    return route.path === '/partner'
  }

  return (
    route.path === path ||
    route.path.startsWith(`${path}/`)
  )
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
  } catch {
    // Continue to login page
  }

  await router.push('/login')
}

/*
|--------------------------------------------------------------------------
| Close Dropdown
|--------------------------------------------------------------------------
*/

function closeDropdown(event: MouseEvent) {
  const target = event.target as HTMLElement

  if (!target.closest('.relative')) {
    profileOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', closeDropdown)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', closeDropdown)
})
</script>

<style scoped>
.sidebar-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
  min-height: 44px;
  margin-bottom: 3px;
  padding: 0.65rem 0.75rem;
  border-radius: 0.75rem;
  color: #64748b;
  font-size: 0.875rem;
  font-weight: 600;
  transition:
    background-color 0.18s ease,
    color 0.18s ease,
    transform 0.18s ease;
}

.sidebar-link:hover {
  background: #f1f5f9;
  color: #0f172a;
}

.sidebar-link:hover .sidebar-icon {
  color: #059669;
}

.sidebar-active {
  background: #ecfdf5 !important;
  color: #047857 !important;
  font-weight: 700;
}

.sidebar-active .sidebar-icon {
  color: #059669;
}

.sidebar-icon {
  display: flex;
  width: 24px;
  min-width: 24px;
  align-items: center;
  justify-content: center;
  font-size: 17px;
  color: #64748b;
  transition: color 0.18s ease;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 5px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 999px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}
</style>
```
