<!-- app/layouts/default.vue -->
<template>
  <div class="min-h-screen flex flex-col bg-[#0b111a] text-white font-sans">

    <!-- Navbar -->
    <Navbar />

    <!-- Main page content -->
    <main class="flex-grow px-4 md:px-8">
      <slot />
    </main>

    <!-- Footer -->
    <Footer />

  </div>
</template>