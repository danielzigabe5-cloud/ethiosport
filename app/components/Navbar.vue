<template>
  <nav
    class="fixed top-0 left-0 right-0 z-[100] w-full
           bg-white/95 backdrop-blur-md
           border-b border-slate-200 shadow-sm
           font-['Noto_Sans_Ethiopic',sans-serif]"
  >

    <!-- CONTAINER -->
    <div class="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">

      <div
        class="h-16 lg:h-[76px]
               flex items-center
               justify-between gap-4"
      >

        <!-- ================= LOGO ================= -->
        <NuxtLink
          to="/"
          class="flex items-center flex-shrink-0 group"
        >

          <div class="flex items-center gap-2">

            <!-- LOGO IMAGE -->
            <div
              class="w-10 h-10 sm:w-11 sm:h-11
                     rounded-lg
                     overflow-hidden
                     flex items-center justify-center
                     bg-slate-100
                     border border-slate-200
                     flex-shrink-0"
            >

              <img
                src="~/assets/images/venue.jpg"
                alt="CombolojoSPORT Logo"
                class="w-full h-full object-cover"
              />

            </div>


            <!-- LOGO TEXT -->
            <div class="flex items-center gap-1">

              <span
                class="text-xl sm:text-2xl font-black
                       tracking-tight text-slate-900"
              >
                COMBOLOJO
              </span>

              <span
                class="text-xl sm:text-2xl font-black
                       text-[#16A34A]"
              >
                SPORT
              </span>

            </div>

          </div>

        </NuxtLink>


        <!-- ================= DESKTOP NAVIGATION ================= -->
        <div
          class="hidden lg:flex items-center
                 justify-center flex-1 gap-1"
        >

          <NuxtLink
            v-for="item in navItems"
            :key="item.path"
            :to="item.path"
            class="relative px-3 xl:px-4 py-2
                   text-sm font-semibold
                   transition-all duration-200
                   whitespace-nowrap"
            :class="
              route.path === item.path
                ? 'text-[#16A34A]'
                : 'text-slate-600 hover:text-[#16A34A]'
            "
          >

            {{ item.label }}

            <!-- ACTIVE LINE -->
            <span
              v-if="route.path === item.path"
              class="absolute left-3 right-3 -bottom-[17px]
                     h-[3px] rounded-full
                     bg-[#16A34A]"
            />

          </NuxtLink>

        </div>


        <!-- ================= RIGHT ACTIONS ================= -->
        <div class="flex items-center gap-2">

          <!-- ADD VENUE -->
          <NuxtLink
            :to="
              isLoggedIn
                ? '/venues/create'
                : '/auth?redirect=/venues/create'
            "
            class="hidden md:flex items-center gap-2
                   bg-[#16A34A]
                   hover:bg-[#15803D]
                   text-white
                   px-4 xl:px-5 py-2.5
                   rounded-lg
                   text-sm font-bold
                   shadow-sm
                   transition-all
                   active:scale-95"
          >

            <Icon
              name="lucide:plus"
              class="w-4 h-4"
            />

            Add Venue

          </NuxtLink>


          <!-- ================= LOGGED USER ================= -->
          <div
            v-if="isLoggedIn"
            ref="dropdownRef"
            class="relative"
          >

            <button
              @click="isDropdownOpen = !isDropdownOpen"
              class="flex items-center gap-2
                     p-1.5 rounded-full
                     hover:bg-slate-100
                     transition-all"
            >

              <!-- AVATAR -->
              <div
                class="w-9 h-9
                       rounded-full
                       bg-[#16A34A]
                       flex items-center justify-center
                       overflow-hidden"
              >

                <img
                  v-if="userProfile?.avatar"
                  :src="userProfile.avatar"
                  alt="User avatar"
                  class="w-full h-full object-cover"
                />

                <Icon
                  v-else
                  name="lucide:user"
                  class="w-5 h-5 text-white"
                />

              </div>


              <Icon
                name="lucide:chevron-down"
                class="hidden sm:block w-4 h-4
                       text-slate-500
                       transition-transform"
                :class="{
                  'rotate-180': isDropdownOpen
                }"
              />

            </button>


            <!-- ================= DROPDOWN ================= -->
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
                class="absolute right-0 mt-3
                       w-60
                       bg-white
                       border border-slate-200
                       rounded-xl
                       shadow-xl
                       p-2"
              >

                <!-- USER INFO -->
                <div
                  class="px-3 py-3
                         border-b border-slate-100
                         mb-1"
                >

                  <p
                    class="text-sm font-bold
                           text-slate-900"
                  >
                    {{ userProfile?.name || 'User' }}
                  </p>

                  <p
                    class="text-xs
                           text-[#16A34A]
                           font-semibold
                           capitalize"
                  >
                    {{ userProfile?.role || 'User' }}
                  </p>

                </div>


                <!-- DASHBOARD -->
                <NuxtLink
                  v-if="dashboardLink !== '/'"
                  :to="dashboardLink"
                  @click="isDropdownOpen = false"
                  class="flex items-center gap-3
                         px-3 py-2.5
                         rounded-lg
                         text-sm font-semibold
                         text-slate-700
                         hover:bg-green-50
                         hover:text-[#16A34A]"
                >

                  <Icon
                    name="lucide:layout-dashboard"
                    class="w-4 h-4"
                  />

                  {{ dashboardLabel }}

                </NuxtLink>


                <!-- SIGN OUT -->
                <button
                  @click="handleLogout"
                  class="w-full flex items-center gap-3
                         px-3 py-2.5
                         rounded-lg
                         text-sm font-semibold
                         text-red-500
                         hover:bg-red-50
                         text-left"
                >

                  <Icon
                    name="lucide:log-out"
                    class="w-4 h-4"
                  />

                  Sign Out

                </button>

              </div>

            </Transition>

          </div>


          <!-- ================= SIGN IN ================= -->
          <NuxtLink
            v-else
            to="/auth"
            class="hidden sm:flex
                   items-center
                   px-4 py-2.5
                   rounded-lg
                   border border-slate-300
                   text-slate-700
                   hover:border-[#16A34A]
                   hover:text-[#16A34A]
                   text-sm font-bold
                   transition-all"
          >
            Sign In
          </NuxtLink>


          <!-- ================= MOBILE MENU BUTTON ================= -->
          <button
            @click="isOpen = !isOpen"
            class="lg:hidden
                   w-10 h-10
                   flex items-center justify-center
                   rounded-lg
                   bg-slate-100
                   hover:bg-slate-200"
          >

            <Icon
              :name="
                isOpen
                  ? 'lucide:x'
                  : 'lucide:menu'
              "
              class="w-5 h-5 text-slate-700"
            />

          </button>

        </div>

      </div>

    </div>


    <!-- ================= MOBILE MENU ================= -->
    <Transition
      enter-active-class="transition duration-200"
      enter-from-class="opacity-0 -translate-y-3"
      enter-to-class="opacity-100 translate-y-0"
    >

      <div
        v-if="isOpen"
        class="lg:hidden
               bg-white
               border-t border-slate-200
               shadow-xl
               p-4"
      >

        <!-- ADD VENUE -->
        <NuxtLink
          :to="
            isLoggedIn
              ? '/venues/create'
              : '/auth?redirect=/venues/create'
          "
          @click="isOpen = false"
          class="flex items-center
                 justify-center gap-2
                 bg-[#16A34A]
                 text-white
                 py-3
                 rounded-lg
                 font-bold
                 mb-3"
        >

          <Icon
            name="lucide:plus"
            class="w-5 h-5"
          />

          Add Venue

        </NuxtLink>


        <!-- NAV LINKS -->
        <div class="space-y-1">

          <NuxtLink
            v-for="item in navItems"
            :key="item.path"
            :to="item.path"
            @click="isOpen = false"
            class="flex items-center gap-3
                   px-4 py-3
                   rounded-lg
                   text-sm font-semibold"
            :class="
              route.path === item.path
                ? 'bg-green-50 text-[#16A34A]'
                : 'text-slate-700 hover:bg-slate-50'
            "
          >

            <Icon
              :name="item.icon"
              class="w-5 h-5"
            />

            {{ item.label }}

          </NuxtLink>

        </div>


        <!-- ================= MOBILE AUTH ================= -->
        <div
          v-if="!isLoggedIn"
          class="mt-3 pt-3
                 border-t border-slate-200"
        >

          <NuxtLink
            to="/auth"
            @click="isOpen = false"
            class="flex items-center justify-center
                   border border-slate-300
                   text-slate-700
                   py-3
                   rounded-lg
                   font-bold"
          >
            Sign In
          </NuxtLink>

        </div>


        <!-- ================= MOBILE DASHBOARD ================= -->
        <div
          v-if="isLoggedIn"
          class="mt-3 pt-3
                 border-t border-slate-200"
        >

          <NuxtLink
            v-if="dashboardLink !== '/'"
            :to="dashboardLink"
            @click="isOpen = false"
            class="flex items-center gap-3
                   px-4 py-3
                   rounded-lg
                   bg-blue-50
                   text-blue-600
                   font-bold"
          >

            <Icon
              name="lucide:layout-dashboard"
              class="w-5 h-5"
            />

            {{ dashboardLabel }}

          </NuxtLink>


          <button
            @click="handleLogout(); isOpen = false"
            class="w-full flex items-center gap-3
                   px-4 py-3 mt-1
                   rounded-lg
                   text-red-500
                   hover:bg-red-50
                   font-bold"
          >

            <Icon
              name="lucide:log-out"
              class="w-5 h-5"
            />

            Sign Out

          </button>

        </div>

      </div>

    </Transition>

  </nav>
</template>


<script setup>

import {
  ref,
  computed,
  onMounted,
  onUnmounted,
  watch
} from 'vue'

import {
  useRoute,
  useRouter
} from 'vue-router'

import { useAuthStore } from '~/stores/auth'


const route = useRoute()

const router = useRouter()

const authStore = useAuthStore()


const isOpen = ref(false)

const isDropdownOpen = ref(false)

const dropdownRef = ref(null)


const isLoggedIn = computed(
  () => !!authStore?.token
)


const userProfile = computed(
  () => authStore?.user
)


const dashboardLink = computed(() => {

  if (!isLoggedIn.value)
    return '/auth'

  const role =
    userProfile.value?.role?.toLowerCase()

  if (role === 'admin')
    return '/admin'

  if (role === 'partner')
    return '/partner'

  return '/'

})


const dashboardLabel = computed(() => {

  const role =
    userProfile.value?.role?.toLowerCase()

  if (role === 'admin')
    return 'Admin Dashboard'

  if (role === 'partner')
    return 'Partner Dashboard'

  return 'Dashboard'

})


const navItems = [

  {
    path: '/',
    label: 'Home',
    icon: 'lucide:home'
  },

  {
    path: '/about',
    label: 'About',
    icon: 'lucide:info'
  },

  {
    path: '/venues',
    label: 'Venues',
    icon: 'lucide:stadium'
  },

  {
    path: '/events',
    label: 'Events',
    icon: 'lucide:calendar'
  },

  {
    path: '/blogs',
    label: 'Blogs',
    icon: 'lucide:newspaper'
  },

  {
    path: '/justplay',
    label: 'Just Play',
    icon: 'lucide:play-circle'
  },

  {
    path: '/contact',
    label: 'Contact',
    icon: 'lucide:phone'
  }

]


const handleLogout = () => {

  isDropdownOpen.value = false

  if (authStore?.logout)
    authStore.logout()

  router.push('/')

}


const handleClickOutside = (event) => {

  if (
    dropdownRef.value &&
    !dropdownRef.value.contains(event.target)
  ) {

    isDropdownOpen.value = false

  }

}


onMounted(() => {

  if (authStore?.init)
    authStore.init()

  document.addEventListener(
    'click',
    handleClickOutside
  )

})


onUnmounted(() => {

  document.removeEventListener(
    'click',
    handleClickOutside
  )

})


watch(
  () => route.path,
  () => {

    isOpen.value = false

    isDropdownOpen.value = false

  }
)

</script>