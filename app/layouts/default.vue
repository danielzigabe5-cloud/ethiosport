<template>
  <div class="flex flex-col min-h-screen bg-slate-950">
    <!-- ናቭባሩ እዚህ ይገባል -->
    <AppNavbar />

    <!-- የገጾቹ ይዘት እዚህ ይገባል -->
    <main class="flex-grow">
      <slot />
    </main>

    <!-- ፉተሩ እዚህ ይገባል -->
    <AppFooter />
  </div>
</template>