<!-- app/layouts/default.vue ወይም layouts/default.vue -->
<template>
  <div class="min-h-screen flex flex-col">
    <!-- የፋይልህ ስም Navbar.vue ከሆነ <Navbar /> ተጠቀም -->
    <header>
      <Navbar />
    </header>

    <!-- የገጾቹ የጀርባ ቀለም እዚህ ብቻ ያርፋል -->
    <main class="flex-grow bg-slate-100">
      <slot />
    </main>

    <!-- የፋይልህ ስም Footer.vue ከሆነ <Footer /> ተጠቀም -->
    <footer>
      <Footer />
    </footer>
  </div>
</template>