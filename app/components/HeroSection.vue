<template>
  <section class="relative rounded-2xl overflow-hidden bg-gradient-to-r from-green-700 to-green-900 text-white p-8 md:p-16">
    <div class="relative z-10 max-w-3xl">
      <div class="flex items-center gap-3 mb-4">
        <Icon name="lucide:sparkles" class="w-8 h-8" />
        <span class="text-sm font-semibold uppercase tracking-wider bg-white/20 px-3 py-1 rounded-full">
          {{ new Date().getFullYear() }} የስፖርት መድረክ
        </span>
      </div>
      <h1 class="text-4xl md:text-6xl font-bold mb-4 leading-tight">
        እንኳን ወደ <br class="block md:hidden" />
        <span class="text-yellow-400">ሜዳወች</span> በደህና መጡ!
      </h1>
      <p class="text-xl md:text-2xl mb-6 opacity-90">
        የኢትዮጵያ ስፖርት ሜዳዎች፣ ጨዋታዎች እና ዝግጅቶች መረጃ ማዕከል
      </p>
      <div class="flex flex-wrap gap-4">
        <NuxtLink to="/games" class="bg-yellow-400 text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition flex items-center gap-2">
          <Icon name="lucide:gamepad-2" class="w-5 h-5" />
          ጨዋታዎችን ይመልከቱ
        </NuxtLink>
        <NuxtLink to="/venues" class="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-lg font-semibold hover:bg-white/30 transition">
          ሜዳዎችን ይመልከቱ
        </NuxtLink>
      </div>
    </div>
    <!-- Decorative Background -->
    <div class="absolute inset-0 opacity-10">
      <div class="absolute top-0 right-0 w-96 h-96 bg-white rounded-full -translate-y-1/2 translate-x-1/2"></div>
      <div class="absolute bottom-0 left-0 w-96 h-96 bg-yellow-400 rounded-full translate-y-1/2 -translate-x-1/2"></div>
    </div>
    <!-- Floating Icons -->
    <div class="absolute right-8 top-8 opacity-20 hidden lg:block">
      <Icon name="lucide:football" class="w-32 h-32" />
    </div>
  </section>
</template>