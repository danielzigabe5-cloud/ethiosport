<template>
  <!-- bg-[#06090e] ወይም bg-slate-950 ዋናው background ይሆናል -->
  <div class="flex flex-col min-h-screen bg-[#06090e] text-white">
    <!-- ናቭባሩ (ከታች border ይኖረዋል) -->
    <AppNavbar />

    <!-- የገጾቹ ይዘት -->
    <main class="flex-grow">
      <slot />
    </main>

    <!-- ፉተሩ (ከላይ border ይኖረዋል) -->
    <AppFooter />
  </div>
</template>