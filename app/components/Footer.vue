<template>
  <footer
    class="bg-[#0B1220] text-slate-300 border-t border-[#1E293B] font-['Noto_Sans_Ethiopic',sans-serif]"
  >
    <div class="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">

      <!-- ================= TOP FOOTER ================= -->
      <div
        class="grid grid-cols-1 gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4 lg:gap-14 lg:py-16"
      >

        <!-- ================= BRAND ================= -->
        <div>
          <NuxtLink
            to="/"
            class="mb-5 inline-flex items-center gap-3"
          >
            <!-- LOGO -->
            <div
              class="flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl border border-[#94FF2B]/30 bg-[#111827]"
            >
              <img
                src="~/assets/images/venue.jpg"
                alt="CombolojoSPORT Logo"
                class="h-full w-full object-cover"
              />
            </div>

            <!-- LOGO TEXT -->
            <div class="flex flex-col leading-none">
              <span
                class="text-2xl font-black tracking-tight text-white"
              >
                COMBOLOJO
              </span>

              <span
                class="mt-1 text-[10px] font-bold tracking-[0.25em] text-[#94FF2B]"
              >
                SPORT
              </span>
            </div>
          </NuxtLink>

          <!-- DESCRIPTION -->
          <p
            class="max-w-sm text-sm leading-7 text-slate-400"
          >
            Book football fields, sports venues,
             and recreational facilities
            easily across Ethiopia.
          </p>

          <!-- ================= SOCIAL MEDIA ================= -->
          <div class="mt-6 flex items-center gap-3">

            <!-- FACEBOOK -->
            <a
              href="https://www.facebook.com/YOUR_COMBOLOJO_PAGE"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="CombolojoSPORT Facebook"
              class="group flex h-10 w-10 items-center justify-center rounded-lg border border-[#1E293B] bg-[#111827] text-slate-300 transition-all duration-200 hover:border-[#94FF2B] hover:bg-[#94FF2B] hover:text-[#0B1220]"
            >
              <Icon
                name="simple-icons:facebook"
                class="h-5 w-5 transition-transform duration-200 group-hover:scale-110"
              />
            </a>

            <!-- TELEGRAM -->
            <a
              href="https://t.me/YOUR_COMBOLOJO_CHANNEL"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="CombolojoSPORT Telegram"
              class="group flex h-10 w-10 items-center justify-center rounded-lg border border-[#1E293B] bg-[#111827] text-slate-300 transition-all duration-200 hover:border-[#94FF2B] hover:bg-[#94FF2B] hover:text-[#0B1220]"
            >
              <Icon
                name="simple-icons:telegram"
                class="h-5 w-5 transition-transform duration-200 group-hover:scale-110"
              />
            </a>

            <!-- YOUTUBE -->
            <a
              href="https://www.youtube.com/@YOUR_COMBOLOJO_CHANNEL"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="CombolojoSPORT YouTube"
              class="group flex h-10 w-10 items-center justify-center rounded-lg border border-[#1E293B] bg-[#111827] text-slate-300 transition-all duration-200 hover:border-[#94FF2B] hover:bg-[#94FF2B] hover:text-[#0B1220]"
            >
              <Icon
                name="simple-icons:youtube"
                class="h-5 w-5 transition-transform duration-200 group-hover:scale-110"
              />
            </a>

            <!-- LINKEDIN -->
            <a
              href="https://www.linkedin.com/company/combolojo/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="CombolojoSPORT LinkedIn"
              class="group flex h-10 w-10 items-center justify-center rounded-lg border border-[#1E293B] bg-[#111827] text-slate-300 transition-all duration-200 hover:border-[#94FF2B] hover:bg-[#94FF2B] hover:text-[#0B1220]"
            >
              <Icon
                name="simple-icons:linkedin"
                class="h-5 w-5 transition-transform duration-200 group-hover:scale-110"
              />
            </a>

          </div>
        </div>

        <!-- ================= EXPLORE ================= -->
        <div>
          <h3
            class="mb-5 text-sm font-bold text-white"
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
            class="mb-5 text-sm font-bold text-white"
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


          </ul>
        </div>

        <!-- ================= NEWSLETTER ================= -->
        <div>
          <h3
            class="mb-5 text-sm font-bold text-white"
          >
            Stay Updated
          </h3>

          <p
            class="mb-4 text-sm leading-6 text-slate-400"
          >
            Get updates about new venues,
            and available booking slots.
          </p>

          <form
            class="space-y-2.5"
            @submit.prevent="handleSubscribe"
          >
            <input
              v-model="email"
              type="email"
              required
              autocomplete="email"
              placeholder="Your email address"
              class="w-full rounded-lg border border-[#1E293B] bg-[#111827] px-4 py-3 text-sm text-white outline-none transition-all placeholder:text-slate-600 focus:border-[#94FF2B] focus:ring-1 focus:ring-[#94FF2B]"
            />

            <button
              type="submit"
              class="flex w-full items-center justify-center gap-2 rounded-lg bg-[#94FF2B] py-3 text-sm font-bold text-[#0B1220] transition-all duration-200 hover:bg-[#B4FF5C] active:scale-[0.98]"
            >
              <Icon
                name="lucide:mail"
                class="h-4 w-4"
              />

              Subscribe
            </button>
          </form>
        </div>

      </div>

      <!-- ================= BOTTOM BAR ================= -->
      <div
        class="flex flex-col items-center justify-between gap-4 border-t border-[#1E293B] py-6 md:flex-row"
      >

        <!-- COPYRIGHT -->
        <p
          class="text-center text-xs text-slate-500 md:text-left"
        >
          © {{ currentYear }}

          <span
            class="font-semibold text-slate-400"
          >
            COMBOLOJO SPORT
          </span>.

          All rights reserved.
        </p>

        <!-- LEGAL LINKS -->
        <div
          class="flex items-center gap-5 text-xs"
        >
          <NuxtLink
            to="/privacy"
            class="text-slate-500 transition-colors hover:text-[#94FF2B]"
          >
            Privacy
          </NuxtLink>

          <NuxtLink
            to="/terms"
            class="text-slate-500 transition-colors hover:text-[#94FF2B]"
          >
            Terms
          </NuxtLink>

          <span
            class="hidden h-1 w-1 rounded-full bg-slate-700 sm:block"
            aria-hidden="true"
          ></span>

          <span
            class="font-semibold text-[#94FF2B]"
          >
            Ethiopia
          </span>
        </div>

      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

const email = ref('')

const currentYear = computed(() => {
  return new Date().getFullYear()
})

const handleSubscribe = () => {
  const value = email.value.trim()

  if (!value) {
    return
  }

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
  color: #94ff2b;
  font-size: 1rem;
  font-weight: 800;
  transition: transform 0.2s ease;
}

.footer-link:hover {
  color: #b4ff5c;
  transform: translateX(3px);
}

.footer-link:hover::before {
  transform: translateX(2px);
}
</style>