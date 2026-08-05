<template>
  <nav class="bg-white dark:bg-gray-800 shadow-lg sticky top-0 z-50">
    <div class="container mx-auto px-4">
      <div class="flex justify-between items-center h-16">
        <!-- ሎጎ -->
        <NuxtLink to="/" class="flex items-center gap-2 hover:opacity-80 transition">
          <Icon name="lucide:football" class="w-8 h-8 text-green-600" />
          <span class="text-xl font-bold text-gray-800 dark:text-white">
            ሜዳወች <span class="text-green-600">Ethiopia</span>
          </span>
        </NuxtLink>

        <!-- የናቪጌሽን አገናኞች -->
        <div class="hidden lg:flex items-center gap-6">
          <NuxtLink 
            v-for="item in navItems" 
            :key="item.path"
            :to="item.path"
            class="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition font-medium"
            :class="{ 'text-green-600 dark:text-green-400 border-b-2 border-green-600': route.path === item.path }"
          >
            {{ item.label }}
          </NuxtLink>
        </div>

        <!-- ቀኝ በኩል ያሉ አዝራሮች -->
        <div class="flex items-center gap-3">
          <!-- የጨለማ ሁነታ መቀያየሪያ -->
          <button @click="toggleTheme" class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition">
            <Icon :name="isDark ? 'lucide:sun' : 'lucide:moon'" class="w-5 h-5" />
          </button>

          <!-- የሞባይል ሜኑ አዝራር -->
          <button @click="isOpen = !isOpen" class="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition">
            <Icon :name="isOpen ? 'lucide:x' : 'lucide:menu'" class="w-6 h-6" />
          </button>
        </div>
      </div>

      <!-- የሞባይል ሜኑ -->
      <div v-if="isOpen" class="lg:hidden py-4 border-t dark:border-gray-700">
        <div class="flex flex-col gap-3">
          <NuxtLink 
            v-for="item in navItems" 
            :key="item.path"
            :to="item.path"
            class="px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition"
            @click="isOpen = false"
          >
            <span class="flex items-center gap-3">
              <Icon :name="item.icon" class="w-5 h-5 text-green-600" />
              <span class="text-gray-700 dark:text-gray-300">{{ item.label }}</span>
            </span>
          </NuxtLink>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
const route = useRoute()
const isDark = ref(false)
const isOpen = ref(false)

const navItems = [
  { path: '/', label: 'Home', icon: 'lucide:home' },
  { path: '/games', label: 'games', icon: 'lucide:gamepad-2' },
  { path: '/venues', label: 'venues', icon: 'lucide:stadium' },
  { path: '/events', label: 'events', icon: 'lucide:calendar' },
  { path: '/blogs', label: 'blogs', icon: 'lucide:newspaper' },
  { path: '/justplay', label: 'JustPlay', icon: 'lucide:play-circle' },
  { path: '/contact', label: 'contact', icon: 'lucide:phone' }
]

// የጨለማ ሁነታ መቀያየሪያ
const toggleTheme = () => {
  isDark.value = !isDark.value
  document.documentElement.classList.toggle('dark')
}

// የስርዓት ምርጫን መፈተሽ
onMounted(() => {
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    isDark.value = true
    document.documentElement.classList.add('dark')
  }
})
</script>