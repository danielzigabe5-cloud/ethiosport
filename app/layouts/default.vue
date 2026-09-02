<!-- app/layouts/default.vue -->
<template>
  <div class="min-h-screen w-full flex flex-col bg-[#0b111a] text-white font-sans">

    <!-- Navbar -->
    <Navbar />

    <!-- Main page content -->
    <main class="flex-grow ">
      <slot />
    </main>

    <!-- Footer -->
    <Footer />

  </div>
</template>