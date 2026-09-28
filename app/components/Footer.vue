```vue
<template>
  <footer
    class="bg-slate-950 text-slate-300
           border-t border-slate-800
           font-['Noto_Sans_Ethiopic',sans-serif]"
  >

    <!-- TOP FOOTER -->
    <div class="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">

      <div
        class="grid grid-cols-1
               sm:grid-cols-2
               lg:grid-cols-4
               gap-10 lg:gap-14
               py-14 lg:py-16"
      >

        <!-- ================= BRAND ================= -->
        <div>

          <NuxtLink
            to="/"
            class="inline-flex items-center gap-1 mb-5"
          >

            <span
              class="text-2xl font-black
                     tracking-tight text-white"
            >
              COMBOLOJO
            </span>

            <span
              class="text-2xl font-black
                     text-emerald-400"
            >
            </span>

          </NuxtLink>


          <p
            class="text-slate-400
                   text-sm leading-7
                   max-w-sm"
          >
            Book football fields, sports venues,
            events and recreational facilities
            easily across Ethiopia.
          </p>


          <!-- SOCIAL -->
          <div class="flex items-center gap-3 mt-6">

            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              class="w-10 h-10
                     rounded-lg
                     bg-slate-900
                     border border-slate-800
                     flex items-center justify-center
                     text-xs font-black
                     text-slate-300
                     hover:bg-emerald-500
                     hover:text-slate-950
                     hover:border-emerald-500
                     transition-all"
            >
              FB
            </a>

            <a
              href="https://t.me"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Telegram"
              class="w-10 h-10
                     rounded-lg
                     bg-slate-900
                     border border-slate-800
                     flex items-center justify-center
                     text-xs font-black
                     text-slate-300
                     hover:bg-emerald-500
                     hover:text-slate-950
                     hover:border-emerald-500
                     transition-all"
            >
              TG
            </a>

            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              class="w-10 h-10
                     rounded-lg
                     bg-slate-900
                     border border-slate-800
                     flex items-center justify-center
                     text-xs font-black
                     text-slate-300
                     hover:bg-emerald-500
                     hover:text-slate-950
                     hover:border-emerald-500
                     transition-all"
            >
              YT
            </a>

          </div>

        </div>


        <!-- ================= EXPLORE ================= -->
        <div>

          <h3
            class="text-white
                   font-bold
                   text-sm
                   mb-5"
          >
            Explore
          </h3>

          <ul class="space-y-3">

            <li>
              <NuxtLink
                to="/"
                class="footer-link"
              >
                Home
              </NuxtLink>
            </li>

            <li>
              <NuxtLink
                to="/venues"
                class="footer-link"
              >
                Venues
              </NuxtLink>
            </li>

            <li>
              <NuxtLink
                to="/events"
                class="footer-link"
              >
                Events
              </NuxtLink>
            </li>

            <li>
              <NuxtLink
                to="/justplay"
                class="footer-link"
              >
                Just Play
              </NuxtLink>
            </li>

            <li>
              <NuxtLink
                to="/blogs"
                class="footer-link"
              >
                Blogs
              </NuxtLink>
            </li>

          </ul>

        </div>


        <!-- ================= COMPANY ================= -->
        <div>

          <h3
            class="text-white
                   font-bold
                   text-sm
                   mb-5"
          >
            Company
          </h3>

          <ul class="space-y-3">

            <li>
              <NuxtLink
                to="/about"
                class="footer-link"
              >
                About Us
              </NuxtLink>
            </li>

            <li>
              <NuxtLink
                to="/contact"
                class="footer-link"
              >
                Contact Us
              </NuxtLink>
            </li>

            <li>
              <NuxtLink
                to="/auth"
                class="footer-link"
              >
                Sign In / Register
              </NuxtLink>
            </li>

            <li>
              <NuxtLink
                to="/venues/create"
                class="flex items-center gap-2
                       text-amber-400
                       hover:text-amber-300
                       text-sm
                       font-semibold
                       transition-colors"
              >
                <Icon
                  name="lucide:plus-circle"
                  class="w-4 h-4"
                />

                List Your Venue
              </NuxtLink>
            </li>

          </ul>

        </div>


        <!-- ================= NEWSLETTER ================= -->
        <div>

          <h3
            class="text-white
                   font-bold
                   text-sm
                   mb-5"
          >
            Stay Updated
          </h3>

          <p
            class="text-slate-400
                   text-sm
                   leading-6
                   mb-4"
          >
            Get updates about new venues,
            events and available booking slots.
          </p>


          <form
            @submit.prevent="handleSubscribe"
            class="space-y-2.5"
          >

            <input
              v-model="email"
              type="email"
              required
              placeholder="Your email address"
              class="w-full
                     bg-slate-900
                     border border-slate-800
                     rounded-lg
                     px-4 py-3
                     text-sm text-white
                     placeholder:text-slate-600
                     outline-none
                     focus:border-emerald-500
                     focus:ring-1
                     focus:ring-emerald-500
                     transition-all"
            />


            <button
              type="submit"
              class="w-full
                     bg-emerald-500
                     hover:bg-emerald-400
                     text-slate-950
                     font-bold
                     py-3
                     rounded-lg
                     text-sm
                     transition-all
                     active:scale-[0.98]"
            >
              Subscribe
            </button>

          </form>

        </div>

      </div>


      <!-- ================= BOTTOM BAR ================= -->
      <div
        class="border-t
               border-slate-800
               py-6
               flex flex-col
               md:flex-row
               items-center
               justify-between
               gap-4"
      >

        <p
          class="text-slate-500
                 text-xs
                 text-center md:text-left"
        >
          © {{ currentYear }}
          <span class="text-slate-400 font-semibold">
            COMBOLOJO SPORT
          </span>.
          All rights reserved.
        </p>


        <div
          class="flex items-center
                 gap-5
                 text-xs"
        >

          <NuxtLink
            to="/privacy"
            class="text-slate-500
                   hover:text-emerald-400
                   transition-colors"
          >
            Privacy
          </NuxtLink>

          <NuxtLink
            to="/terms"
            class="text-slate-500
                   hover:text-emerald-400
                   transition-colors"
          >
            Terms
          </NuxtLink>

          <span
            class="hidden sm:block
                   w-1 h-1
                   rounded-full
                   bg-slate-700"
          />

          <span
            class="text-emerald-400
                   font-semibold"
          >
            Ethiopia
          </span>

        </div>

      </div>

    </div>

  </footer>
</template>


<script setup>

import { ref, computed } from 'vue'

const email = ref('')

const currentYear = computed(
  () => new Date().getFullYear()
)

const handleSubscribe = () => {

  if (!email.value)
    return

  alert('Thank you for subscribing!')

  email.value = ''

}

</script>


<style scoped>

.footer-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;

  color: #94a3b8;

  font-size: 0.875rem;
  font-weight: 500;

  transition:
    color 0.2s ease,
    transform 0.2s ease;
}

.footer-link::before {
  content: '›';

  color: #10b981;

  font-weight: 800;
}

.footer-link:hover {
  color: #34d399;
  transform: translateX(3px);
}

</style>
```
