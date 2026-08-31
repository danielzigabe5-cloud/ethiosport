<template>
  <footer class="bg-[#0f172a] text-slate-200 pt-16 pb-8 border-t-4 border-green-600">
    <div class="container mx-auto px-6">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
        
        <!-- Column 1: About -->
        <div class="flex flex-col space-y-5">
          <div class="flex items-center space-x-2">
            <span class="text-3xl font-black text-green-500 italic">ETHIO</span>
            <span class="text-3xl font-black text-white italic">SPORT</span>
          </div>
          <p class="text-slate-400 text-sm leading-relaxed">
            Your premier destination for the latest Ethiopian sports news, transfer updates, and live match results.
          </p>
          <div class="flex space-x-4 pt-2">
            <a href="#" class="p-2 bg-slate-800 rounded-full hover:bg-green-600 transition-all text-white">FB</a>
            <a href="#" class="p-2 bg-slate-800 rounded-full hover:bg-green-600 transition-all text-white">TG</a>
            <a href="#" class="p-2 bg-slate-800 rounded-full hover:bg-green-600 transition-all text-white">YT</a>
          </div>
        </div>

        <!-- Column 2: Quick Links -->
        <div>
          <h3 class="text-white font-bold text-lg mb-6 uppercase tracking-widest text-sm">Quick Links</h3>
          <ul class="space-y-4 text-slate-400 text-sm">
            <li><NuxtLink to="/" class="hover:text-green-500 transition-all">Ethiopian Premier League</NuxtLink></li>
            <li><NuxtLink to="/" class="hover:text-green-500 transition-all">National Team (Walias)</NuxtLink></li>
            <li><NuxtLink to="/" class="hover:text-green-500 transition-all">Transfer News</NuxtLink></li>
            <li><NuxtLink to="/" class="hover:text-green-500 transition-all">League Table</NuxtLink></li>
          </ul>
        </div>

        <!-- Column 3: Support -->
        <div>
          <h3 class="text-white font-bold text-lg mb-6 uppercase tracking-widest text-sm">Support</h3>
          <ul class="space-y-4 text-slate-400 text-sm">
            <li><NuxtLink to="/" class="hover:text-green-500 transition-all">About Us</NuxtLink></li>
            <li><NuxtLink to="/" class="hover:text-green-500 transition-all">Contact Us</NuxtLink></li>
            <li><NuxtLink to="/" class="hover:text-green-500 transition-all">Advertise</NuxtLink></li>
            <li><NuxtLink to="/" class="hover:text-green-500 transition-all">Privacy Policy</NuxtLink></li>
          </ul>
        </div>

        <!-- Column 4: Newsletter -->
        <div>
          <h3 class="text-white font-bold text-lg mb-6 uppercase tracking-widest text-sm">Stay Updated</h3>
          <p class="text-slate-400 text-sm mb-6">Subscribe to get the latest sports headlines daily.</p>
          <div class="flex flex-col gap-2">
            <input 
              type="email" 
              placeholder="Enter your email..." 
              class="w-full bg-slate-800 border-none rounded-lg py-3 px-4 text-sm text-white focus:ring-2 focus:ring-green-500 outline-none"
            />
            <button class="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition-all">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="border-t border-slate-800 pt-8 flex flex-col md:row justify-between items-center text-slate-500 text-xs">
        <p>© {{ new Date().getFullYear() }} EthioSport Platform. All Rights Reserved.</p>
        <div class="flex space-x-6 mt-4 md:mt-0">
          <span>Addis Ababa, Ethiopia</span>
        </div>
      </div>
    </div>
  </footer>
</template>