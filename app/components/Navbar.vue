```vue
<template>
  <nav
    class="fixed top-0 left-0 right-0 z-[100] w-full
           bg-white/95 backdrop-blur-md
           border-b border-slate-200 shadow-sm
           font-['Noto_Sans_Ethiopic',sans-serif]"
  >
    <!-- TOP BAR: visible across pages -->
    <div class="bg-gradient-to-r from-[#FCE58A] via-[#F7B731] to-[#F59E0B] text-white shadow-[0_1px_0_rgba(15,23,42,0.06)]">
      <div class="mx-auto flex min-h-11 max-w-[1440px] items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        <div class="flex min-w-0 items-center gap-3 text-xs sm:text-sm">
          <span class="hidden items-center rounded-full border border-white/25 bg-white/10 px-2 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[#0F172A] shadow-sm sm:inline-flex">
            Developed by internship student
          </span>

          <a
            href="mailto:info@combolojo.com"
            class="inline-flex min-w-0 items-center gap-2 text-[#0F172A]/90 transition duration-200 hover:text-[#0F172A]"
          >
            <Icon name="lucide:mail" class="h-4 w-4 shrink-0" />
            <span class="truncate">info@combolojo.com</span>
          </a>

          <a
            href="tel:+251911000000"
            class="hidden items-center gap-2 text-[#0F172A]/85 transition duration-200 hover:text-[#0F172A] md:inline-flex"
          >
            <Icon name="lucide:phone" class="h-4 w-4" />
            +251 945 800 348
          </a>

          <span class="hidden items-center gap-2 text-[#0F172A]/80 xl:inline-flex">
            <Icon name="lucide:map-pin" class="h-3.5 w-3.5" />
            Addis Ababa, Ethiopia
          </span>
        </div>

        <NuxtLink
          to="/download-app"
          class="hidden min-w-0 items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1.5 text-center text-[11px] font-semibold text-white transition-all duration-200 hover:bg-white/15 hover:shadow-sm sm:inline-flex"
        >
          <span class="truncate">Discover sports venues across Ethiopia!</span>
          <span class="hidden rounded-full bg-[#0F172A]/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white md:inline-block">
            Download App
          </span>
        </NuxtLink>

        <div class="flex shrink-0 items-center gap-2 sm:gap-3">
          <NuxtLink
            to="/events"
            class="hidden items-center gap-2 rounded-full bg-[#0F172A]/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-white transition-all duration-200 hover:bg-[#0F172A]/15 sm:inline-flex"
          >
            <Icon name="lucide:calendar-days" class="h-3.5 w-3.5" />
            Upcoming Events
          </NuxtLink>

          <span class="hidden text-xs text-white/85 sm:inline">
            Follow Combolojo
          </span>

          <a
            v-for="social in socialLinks"
            :key="social.label"
            :href="social.url"
            :aria-label="social.label"
            :title="social.label"
            target="_blank"
            rel="noopener noreferrer"
            class="flex h-7 w-7 items-center justify-center rounded-md text-white/90 transition-all duration-200 hover:bg-white/15 hover:text-white hover:shadow-sm"
          >
            <Icon :name="social.icon" class="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>

    <!-- MAIN NAVBAR -->
    <div class="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
      <div class="h-16 lg:h-[76px] flex items-center justify-between gap-4">

        <!-- LOGO -->
        <NuxtLink
          to="/"
          class="flex items-center flex-shrink-0 group"
          aria-label="CombolojoSPORT Home"
        >
          <div class="flex items-center gap-2">
            <div
              class="w-10 h-10 sm:w-11 sm:h-11 rounded-lg
                     overflow-hidden flex items-center justify-center
                     bg-slate-100 border border-slate-200 flex-shrink-0"
            >
              <img
                src="/images/venue.svg"
                alt="CombolojoSPORT Logo"
                class="w-full h-full object-cover"
              />
            </div>

            <div class="flex flex-col">
              <div class="flex items-center gap-1">
                <span
                  class="text-xl sm:text-2xl font-black tracking-tight text-slate-900"
                >
                  COMBOLOJO
                </span>
                <span
                  class="text-xl sm:text-2xl font-black text-[#16A34A]"
                >
                  SPORT
                </span>
              </div>
              <span class="mt-0.5 text-[9px] font-bold uppercase tracking-[0.2em] text-slate-500">
                Venue Booking
              </span>
            </div>
          </div>
        </NuxtLink>

        <!-- DESKTOP NAVIGATION -->
        <div class="hidden lg:flex items-center justify-center flex-1 gap-1">
          <NuxtLink
            v-for="item in navItems"
            :key="item.path"
            :to="item.path"
            class="relative px-3 xl:px-4 py-2 text-sm font-semibold
                   transition-all duration-200 whitespace-nowrap"
            :class="
              isActivePath(item.path)
                ? 'text-[#16A34A]'
                : 'text-slate-600 hover:text-[#16A34A]'
            "
          >
            {{ item.label }}

            <span
              v-if="isActivePath(item.path)"
              class="absolute left-3 right-3 -bottom-[17px]
                     h-[3px] rounded-full bg-[#16A34A]"
            />
          </NuxtLink>
        </div>

        <!-- RIGHT ACTIONS -->
        <div class="flex items-center gap-2">

          <!-- ADD VENUE -->
          <NuxtLink
            v-if="canAddVenue"
            :to="
              isLoggedIn
                ? '/venues/create'
                : '/auth?redirect=/venues/create'
            "
            class="hidden md:flex items-center gap-2
                   bg-[#16A34A] hover:bg-[#15803D] text-white
                   px-4 xl:px-5 py-2.5 rounded-lg
                   text-sm font-bold shadow-sm transition-all
                   active:scale-95"
          >
            <Icon name="lucide:plus" class="w-4 h-4" />
            Add Venue
          </NuxtLink>

          <!-- LOGGED-IN USER DROPDOWN -->
          <div
            v-if="isLoggedIn"
            ref="dropdownRef"
            class="relative"
          >
            <button
              type="button"
              @click="isDropdownOpen = !isDropdownOpen"
              :aria-expanded="isDropdownOpen"
              aria-label="Open user menu"
              class="flex items-center gap-2 p-1.5 rounded-full
                     hover:bg-slate-100 transition-all"
            >
              <div
                class="relative w-9 h-9 rounded-full overflow-hidden
                       bg-gradient-to-br from-[#16A34A] to-emerald-600
                       flex items-center justify-center
                       ring-2 ring-white shadow-sm"
              >
                <img
                  v-if="userAvatar"
                  :src="userAvatar"
                  :alt="userProfile?.name || 'User'"
                  class="w-full h-full object-cover"
                  @error="onAvatarError"
                />
                <span v-else class="text-white text-xs font-black">
                  {{ userInitials }}
                </span>
              </div>

              <Icon
                name="lucide:chevron-down"
                class="hidden sm:block w-4 h-4 text-slate-500 transition-transform"
                :class="{ 'rotate-180': isDropdownOpen }"
              />
            </button>

            <!-- USER DROPDOWN -->
            <Transition
              enter-active-class="transition duration-150 ease-out"
              enter-from-class="opacity-0 scale-95 -translate-y-2"
              enter-to-class="opacity-100 scale-100 translate-y-0"
              leave-active-class="transition duration-100 ease-in"
              leave-from-class="opacity-100 scale-100"
              leave-to-class="opacity-0 scale-95"
            >
              <div
                v-if="isDropdownOpen"
                class="absolute right-0 mt-3 w-64 bg-white
                       border border-slate-200 rounded-xl
                       shadow-xl p-2"
              >
                <!-- USER INFO -->
                <div class="px-3 py-3 border-b border-slate-100 mb-1">
                  <div class="flex items-center gap-3">
                    <div
                      class="w-10 h-10 rounded-full overflow-hidden
                             bg-green-600 flex items-center justify-center
                             flex-shrink-0"
                    >
                      <img
                        v-if="userAvatar"
                        :src="userAvatar"
                        :alt="userProfile?.name || 'User'"
                        class="w-full h-full object-cover"
                        @error="onAvatarError"
                      />
                      <span v-else class="text-white text-sm font-black">
                        {{ userInitials }}
                      </span>
                    </div>

                    <div class="min-w-0 flex-1">
                      <p class="text-sm font-bold text-slate-900 truncate">
                        {{ userProfile?.name || 'User' }}
                      </p>
                      <p
                        class="text-xs text-[#16A34A] font-semibold capitalize truncate"
                      >
                        {{ userProfile?.role || 'User' }}
                      </p>
                    </div>
                  </div>
                </div>

                <!-- ROLE-AWARE DASHBOARD -->
                <NuxtLink
                  v-if="dashboardLink !== '/'"
                  :to="dashboardLink"
                  @click="isDropdownOpen = false"
                  class="flex items-center gap-3 px-3 py-2.5
                         rounded-lg text-sm font-semibold text-slate-700
                         hover:bg-green-50 hover:text-[#16A34A]"
                >
                  <Icon name="lucide:layout-dashboard" class="w-4 h-4" />
                  {{ dashboardLabel }}
                </NuxtLink>

                <!-- PROFILE -->
                <NuxtLink
                  :to="profileLink"
                  @click="isDropdownOpen = false"
                  class="flex items-center gap-3 px-3 py-2.5
                         rounded-lg text-sm font-semibold text-slate-700
                         hover:bg-green-50 hover:text-[#16A34A]"
                >
                  <Icon name="lucide:user" class="w-4 h-4" />
                  My Profile
                </NuxtLink>

                <div class="my-1 border-t border-slate-100" />

                <!-- SIGN OUT -->
                <button
                  type="button"
                  @click="handleLogout"
                  class="w-full flex items-center gap-3 px-3 py-2.5
                         rounded-lg text-sm font-semibold text-red-500
                         hover:bg-red-50 text-left"
                >
                  <Icon name="lucide:log-out" class="w-4 h-4" />
                  Sign Out
                </button>
              </div>
            </Transition>
          </div>

          <!-- SIGN IN -->
          <NuxtLink
            v-else
            to="/auth"
            class="hidden sm:flex items-center px-4 py-2.5 rounded-lg
                   border border-slate-300 text-slate-700
                   hover:border-[#16A34A] hover:text-[#16A34A]
                   text-sm font-bold transition-all"
          >
            Sign In
          </NuxtLink>

          <!-- MOBILE MENU BUTTON -->
          <button
            type="button"
            @click="isOpen = !isOpen"
            :aria-expanded="isOpen"
            aria-controls="mobile-navigation"
            :aria-label="isOpen ? 'Close menu' : 'Open menu'"
            class="lg:hidden w-10 h-10 flex items-center justify-center
                   rounded-lg bg-slate-100 hover:bg-slate-200"
          >
            <Icon
              :name="isOpen ? 'lucide:x' : 'lucide:menu'"
              class="w-5 h-5 text-slate-700"
            />
          </button>
        </div>
      </div>
    </div>

    <!-- MOBILE MENU -->
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-3"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div
        v-if="isOpen"
        id="mobile-navigation"
        class="lg:hidden bg-white border-t border-slate-200
               shadow-xl p-4 max-h-[70vh] overflow-y-auto"
      >
        <!-- ADD VENUE -->
        <NuxtLink
          v-if="canAddVenue"
          :to="
            isLoggedIn
              ? '/venues/create'
              : '/auth?redirect=/venues/create'
          "
          @click="isOpen = false"
          class="flex items-center justify-center gap-2
                 bg-[#16A34A] text-white py-3 rounded-lg
                 font-bold mb-3"
        >
          <Icon name="lucide:plus" class="w-5 h-5" />
          Add Venue
        </NuxtLink>

        <!-- ADMIN PANEL -->
        <NuxtLink
          v-if="isAdmin"
          to="/admin"
          @click="isOpen = false"
          class="flex items-center justify-center gap-2
                 bg-gradient-to-r from-violet-600 to-fuchsia-600
                 text-white py-3 rounded-lg font-bold mb-3"
        >
          <Icon name="lucide:shield-check" class="w-5 h-5" />
          Admin Panel
        </NuxtLink>

        <!-- PARTNER PANEL -->
        <NuxtLink
          v-if="isPartner"
          to="/partner"
          @click="isOpen = false"
          class="flex items-center justify-center gap-2
                 bg-gradient-to-r from-blue-600 to-indigo-600
                 text-white py-3 rounded-lg font-bold mb-3"
        >
          <Icon name="lucide:layout-dashboard" class="w-5 h-5" />
          Partner Panel
        </NuxtLink>

        <!-- NAVIGATION LINKS -->
        <div class="space-y-1">
          <NuxtLink
            v-for="item in navItems"
            :key="item.path"
            :to="item.path"
            @click="isOpen = false"
            class="flex items-center gap-3 px-4 py-3 rounded-lg
                   text-sm font-semibold transition"
            :class="
              isActivePath(item.path)
                ? 'bg-green-50 text-[#16A34A]'
                : 'text-slate-700 hover:bg-slate-50'
            "
          >
            <Icon :name="item.icon" class="w-5 h-5" />
            {{ item.label }}
          </NuxtLink>
        </div>

        <!-- MOBILE AUTH -->
        <div
          v-if="!isLoggedIn"
          class="mt-3 pt-3 border-t border-slate-200"
        >
          <NuxtLink
            to="/auth"
            @click="isOpen = false"
            class="flex items-center justify-center border
                   border-slate-300 text-slate-700 py-3 rounded-lg font-bold"
          >
            Sign In
          </NuxtLink>
        </div>

        <!-- MOBILE USER INFO -->
        <div
          v-if="isLoggedIn"
          class="mt-3 pt-3 border-t border-slate-200"
        >
          <div class="flex items-center gap-3 px-2 py-3">
            <div
              class="w-11 h-11 rounded-full overflow-hidden
                     bg-green-600 flex items-center justify-center flex-shrink-0"
            >
              <img
                v-if="userAvatar"
                :src="userAvatar"
                :alt="userProfile?.name || 'User'"
                class="w-full h-full object-cover"
                @error="onAvatarError"
              />
              <span v-else class="text-white text-sm font-black">
                {{ userInitials }}
              </span>
            </div>

            <div class="min-w-0">
              <p class="text-sm font-bold text-slate-900 truncate">
                {{ userProfile?.name || 'User' }}
              </p>
              <p class="text-xs text-[#16A34A] font-semibold capitalize">
                {{ userProfile?.role || 'User' }}
              </p>
            </div>
          </div>

          <NuxtLink
            :to="profileLink"
            @click="isOpen = false"
            class="flex items-center gap-3 px-4 py-3 rounded-lg
                   text-slate-700 hover:bg-green-50
                   hover:text-[#16A34A] font-bold"
          >
            <Icon name="lucide:user" class="w-5 h-5" />
            My Profile
          </NuxtLink>

          <button
            type="button"
            @click="handleMobileLogout"
            class="w-full flex items-center gap-3 px-4 py-3
                   rounded-lg text-red-500 hover:bg-red-50 font-bold"
          >
            <Icon name="lucide:log-out" class="w-5 h-5" />
            Sign Out
          </button>
        </div>

        <!-- MOBILE SOCIAL LINKS -->
        <div class="mt-4 pt-4 border-t border-slate-200">
          <div class="flex items-center justify-between gap-3">
            <span class="text-xs font-semibold text-slate-500">
              Follow Combolojo
            </span>

            <div class="flex items-center gap-4">
              <a
                v-for="social in socialLinks"
                :key="social.label"
                :href="social.url"
                :aria-label="social.label"
                :title="social.label"
                target="_blank"
                rel="noopener noreferrer"
                class="text-slate-500 hover:text-green-600 transition"
              >
                <Icon :name="social.icon" class="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </nav>
</template>

<script setup lang="ts">
import {
  ref,
  computed,
  onMounted,
  onUnmounted,
  watch,
} from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '~/stores/auth'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const config = useRuntimeConfig()

const isOpen = ref(false)
const isDropdownOpen = ref(false)
const dropdownRef = ref<HTMLElement | null>(null)

/* Official Combolojo social accounts used elsewhere in the app. */
const socialLinks = [
  {
    label: 'Facebook',
    url: 'https://www.facebook.com/combolojosport',
    icon: 'simple-icons:facebook',
  },
  {
    label: 'Instagram',
    url: 'https://www.instagram.com/combolojosport',
    icon: 'simple-icons:instagram',
  },
  {
    label: 'TikTok',
    url: 'https://www.tiktok.com/@combolojosport',
    icon: 'simple-icons:tiktok',
  },
  {
    label: 'Telegram',
    url: 'https://t.me/combolojosport',
    icon: 'simple-icons:telegram',
  },
  {
    label: 'YouTube',
    url: 'https://www.youtube.com/@combolojosport',
    icon: 'simple-icons:youtube',
  },
]

/* AUTH STATE */
const isLoggedIn = computed(() => !!authStore?.token)
const userProfile = computed(() => authStore?.user)

const isAdmin = computed(
  () => userProfile.value?.role?.toLowerCase() === 'admin'
)

const isPartner = computed(() => {
  const role = userProfile.value?.role?.toLowerCase()
  return role === 'partner' || role === 'owner'
})

const canAddVenue = computed(() => {
  const role = userProfile.value?.role?.toLowerCase()
  return role !== 'admin' && role !== 'partner' && role !== 'owner'
})

/* API BASE */
const apiBase = computed(() => {
  const base = String(
    config.public.apiBase || 'http://127.0.0.1:8000'
  ).replace(/\/+$/, '')

  return base.endsWith('/api')
    ? base.replace(/\/api$/, '')
    : base
})

/* USER AVATAR */
const userAvatar = computed(() => {
  const raw = userProfile.value?.avatar_url || userProfile.value?.avatar

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

const userInitials = computed(() => {
  const name = String(userProfile.value?.name || 'User')

  return (
    name
      .split(' ')
      .slice(0, 2)
      .map((part: string) => part.charAt(0))
      .join('')
      .toUpperCase() || 'U'
  )
})

const onAvatarError = (event: Event) => {
  const img = event.target as HTMLImageElement
  img.style.display = 'none'
}

/* ROLE-AWARE DASHBOARD */
const dashboardLink = computed(() => {
  if (!isLoggedIn.value) return '/auth'

  const role = userProfile.value?.role?.toLowerCase()

  if (role === 'admin') return '/admin'
  if (role === 'partner' || role === 'owner') return '/partner'

  return '/'
})

const dashboardLabel = computed(() => {
  const role = userProfile.value?.role?.toLowerCase()

  if (role === 'admin') return 'Admin Dashboard'
  if (role === 'partner' || role === 'owner') return 'Partner Dashboard'

  return 'Dashboard'
})

/* ROLE-AWARE PROFILE */
const profileLink = computed(() => {
  const role = userProfile.value?.role?.toLowerCase()

  if (role === 'admin') return '/admin/profile'
  if (role === 'partner' || role === 'owner') return '/partner/profile'

  return '/profile'
})

/* KEEP YOUR EXISTING NAVIGATION ROUTES */
const navItems = [
  { path: '/', label: 'Home', icon: 'lucide:home' },
  { path: '/about', label: 'About', icon: 'lucide:info' },
  { path: '/venues', label: 'Venues', icon: 'lucide:map-pin' },
  { path: '/blogs', label: 'Blogs', icon: 'lucide:newspaper' },
  { path: '/justplay', label: 'Just Play', icon: 'lucide:play-circle' },
  { path: '/contact', label: 'Contact', icon: 'lucide:phone' },
]

/* ACTIVE NAVIGATION */
const isActivePath = (path: string): boolean => {
  if (path === '/') return route.path === '/'

  return route.path === path || route.path.startsWith(`${path}/`)
}

/* LOGOUT */
const handleLogout = async () => {
  isDropdownOpen.value = false
  isOpen.value = false

  try {
    if (authStore?.logout) {
      await authStore.logout()
    }
  } catch (error) {
    console.error('Logout error:', error)
  }

  await router.push('/')
}

const handleMobileLogout = async () => {
  await handleLogout()
}

/* CLOSE DROPDOWN WHEN CLICKING OUTSIDE */
const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as Node

  if (dropdownRef.value && !dropdownRef.value.contains(target)) {
    isDropdownOpen.value = false
  }
}

/* LIFECYCLE */
onMounted(() => {
  if (authStore?.init) {
    authStore.init()
  }

  if (authStore?.fetchUser) {
    authStore.fetchUser().catch(() => {})
  }

  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})

/* CLOSE MENUS AFTER NAVIGATION */
watch(
  () => route.path,
  () => {
    isOpen.value = false
    isDropdownOpen.value = false
  }
)
</script>
```