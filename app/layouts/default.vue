<template>
  <div class="min-h-screen flex flex-col bg-[#0b111a] text-white">
    <!-- Navbar component -->
    <Navbar />

    <!-- የገጾች ይዘት (በሁሉም Page የሚቀያየረው) -->
    <main class="flex-grow pt-20">
      <slot />
    </main>

    <!-- Footer component -->
    <Footer />
  </div>
</template>