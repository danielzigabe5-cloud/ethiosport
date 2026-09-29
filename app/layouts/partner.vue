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
            <span class="sidebar-icon">▣</span>
            <span class="flex-1">Dashboard</span>
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
            <span class="sidebar-icon">⚽</span>
            <span class="flex-1">My Venue</span>
          </NuxtLink>

          <NuxtLink
            to="/partner/schedule"
            class="sidebar-link"
            :class="isActive('/partner/slots') ? 'sidebar-active' : ''"
            @click="mobileOpen = false"
          >
            <span class="sidebar-icon">◷</span>
            <span class="flex-1">Manage Slots</span>
          </NuxtLink>

          <NuxtLink
            to="/partner/bookings"
            class="sidebar-link"
            :class="isActive('/partner/bookings') ? 'sidebar-active' : ''"
            @click="mobileOpen = false"
          >
            <span class="sidebar-icon">📅</span>
            <span class="flex-1">Bookings</span>

            <span
              v-if="bookingCount > 0"
              class="flex h-5 min-w-5 items-center justify-center rounded-full bg-emerald-100 px-1.5 text-[10px] font-bold text-emerald-700"
            >
              {{ bookingCount }}
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
            <span class="sidebar-icon">💰</span>
            <span class="flex-1">Earnings</span>
          </NuxtLink>

          <NuxtLink
            to="/partner/payouts"
            class="sidebar-link"
            :class="isActive('/partner/payouts') ? 'sidebar-active' : ''"
            @click="mobileOpen = false"
          >
            <span class="sidebar-icon">💳</span>
            <span class="flex-1">Payouts & Wallet</span>

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

          <!-- ✅ Profile — role-aware link -->
          <NuxtLink
            :to="profileLink"
            class="sidebar-link"
            :class="isActive(profileLink) ? 'sidebar-active' : ''"
            @click="mobileOpen = false"
          >
            <span class="sidebar-icon">👤</span>
            <span class="flex-1">Profile</span>
          </NuxtLink>

          <NuxtLink
            to="/partner/settings"
            class="sidebar-link"
            :class="isActive('/partner/settings') ? 'sidebar-active' : ''"
            @click="mobileOpen = false"
          >
            <span class="sidebar-icon">⚙</span>
            <span class="flex-1">Settings</span>
          </NuxtLink>
        </div>

      </nav>

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

          <button
            class="flex h-10 w-10 items-center justify-center rounded-xl text-slate-600 hover:bg-slate-100 lg:hidden"
            @click="mobileOpen = true"
          >
            <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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

          <NuxtLink
            to="/"
            class="hidden items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50 md:flex"
          >
            <span>↗</span>
            View Site
          </NuxtLink>

          <button
            class="relative flex h-10 w-10 items-center justify-center rounded-xl text-slate-500 hover:bg-slate-100"
          >
            <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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

          <!-- Profile dropdown -->
          <div ref="profileRef" class="relative">

            <button
              class="flex items-center gap-2 rounded-xl p-1.5 hover:bg-slate-100"
              @click.stop="profileOpen = !profileOpen"
            >

              <!-- ✅ Avatar with image + fallback -->
              <div
                class="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-emerald-100 font-bold text-emerald-700"
              >
                <img
                  v-if="userAvatar"
                  :src="userAvatar"
                  :alt="partnerName"
                  class="h-full w-full object-cover"
                  @error="onAvatarError"
                />
                <span v-else>{{ partnerInitials }}</span>
              </div>

              <div class="hidden text-left sm:block">
                <p class="max-w-[120px] truncate text-xs font-bold text-slate-900">
                  {{ partnerName }}
                </p>
                <p class="text-[10px] text-slate-500">
                  {{ partnerRole }}
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

                <!-- ✅ Role-aware profile link -->
                <NuxtLink
                  :to="profileLink"
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
const config = useRuntimeConfig()

/* ═══════════════════════════════════════════
   UI State
   ═══════════════════════════════════════════ */
const mobileOpen = ref(false)
const profileOpen = ref(false)
const profileRef = ref<HTMLElement | null>(null)

const bookingCount = ref(3)
const pendingPayouts = ref(1)
const notifications = ref(3)

/* ═══════════════════════════════════════════
   API BASE — ለ avatar URL
   ═══════════════════════════════════════════ */
const apiBase = computed(() => {
  const base = String(config.public.apiBase || 'http://127.0.0.1:8000')
    .replace(/\/+$/, '')
  return base.endsWith('/api') ? base.replace(/\/api$/, '') : base
})

/* ═══════════════════════════════════════════
   PARTNER INFO
   ═══════════════════════════════════════════ */
const partnerName = computed(() => {
  const user = authStore.user as any
  return user?.name || user?.full_name || user?.fullName || 'Partner'
})

const partnerEmail = computed(() => {
  const user = authStore.user as any
  return user?.email || 'partner@combolojo.com'
})

const partnerRole = computed(() => {
  const role = String(authStore.user?.role || 'partner').toLowerCase()
  return role.charAt(0).toUpperCase() + role.slice(1)
})

const partnerInitials = computed(() => {
  const name = partnerName.value.trim()
  if (!name) return 'P'
  return name
    .split(' ')
    .slice(0, 2)
    .map((part: string) => part.charAt(0))
    .join('')
    .toUpperCase()
})

/* ✅ Avatar — full URL + fallback */
const userAvatar = computed(() => {
  const user = authStore.user as any
  const raw = user?.avatar || user?.avatar_url
  if (!raw) return null

  if (
    raw.startsWith('http://') ||
    raw.startsWith('https://') ||
    raw.startsWith('data:')
  ) {
    return raw
  }

  return `${apiBase.value}/storage/${raw.replace(/^\/+/, '')}`
})

const onAvatarError = (e: Event) => {
  (e.target as HTMLImageElement).style.display = 'none'
}

/* ═══════════════════════════════════════════
   ✅ PROFILE LINK (role-aware)
   ═══════════════════════════════════════════ */
const profileLink = computed(() => {
  const role = String(authStore.user?.role || '').toLowerCase()
  if (role === 'admin') return '/admin/profile'
  if (role === 'partner' || role === 'owner') return '/partner/profile'
  return '/profile'
})

/* ═══════════════════════════════════════════
   VENUE
   ═══════════════════════════════════════════ */
const venueName = computed(() => {
  const user = authStore.user as any
  return user?.venue?.name || user?.venue_name || 'Sarbet Futsal Arena'
})

const venueLocation = computed(() => {
  const user = authStore.user as any
  return user?.venue?.location || user?.venue_location || 'Bole, Addis Ababa'
})

/* ═══════════════════════════════════════════
   PAGE TITLE
   ═══════════════════════════════════════════ */
const pageTitle = computed(() => {
  const path = route.path

  if (path === '/partner') return 'Dashboard'
  if (path.includes('/my-venue')) return 'My Venue'
  if (path.includes('/schedule')) return 'Manage Slots'
  if (path.includes('/bookings')) return 'Bookings'
  if (path.includes('/earnings')) return 'Earnings'
  if (path.includes('/payouts')) return 'Payouts & Wallet'
  if (path.includes('/profile')) return 'Profile'
  if (path.includes('/settings')) return 'Settings'

  return 'Partner Dashboard'
})

/* ═══════════════════════════════════════════
   ACTIVE SIDEBAR
   ═══════════════════════════════════════════ */
function isActive(path: string) {
  if (path === '/partner') {
    return route.path === '/partner'
  }
  return route.path === path || route.path.startsWith(`${path}/`)
}

/* ═══════════════════════════════════════════
   ✅ LOGOUT — ወደ /auth ሂድ (ከ /login ይልቅ)
   ═══════════════════════════════════════════ */
async function logout() {
  profileOpen.value = false
  try {
    await authStore.logout()
  } catch {
    // continue
  }
  await router.push('/auth')
}

/* ═══════════════════════════════════════════
   CLOSE DROPDOWN
   ═══════════════════════════════════════════ */
function closeDropdown(event: MouseEvent) {
  const target = event.target as HTMLElement
  if (profileRef.value && !profileRef.value.contains(target)) {
    profileOpen.value = false
  }
}

/* ═══════════════════════════════════════════
   LIFECYCLE — ✅ init + fetchUser አስፈጽም
   ═══════════════════════════════════════════ */
onMounted(() => {
  // ✅ Token + user ከ localStorage/cookie መልስ
  authStore.init()

  // ✅ የቅርብ ጊዜ user data (avatar ወዘተ) አድስ
  if (authStore.token && authStore.fetchUser) {
    authStore.fetchUser().catch(() => {})
  }

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
  transition: background-color 0.18s ease, color 0.18s ease, transform 0.18s ease;
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