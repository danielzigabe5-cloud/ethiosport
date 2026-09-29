```vue
<script setup lang="ts">
import { ref, computed } from 'vue'
import heroImage from '~/assets/images/venues20.jpg'

/* =========================================================
   SEO
========================================================= */

useHead({
  title: 'Insights & News | CombolojoSPORT',
  meta: [
    {
      name: 'description',
      content:
        'Sports news, insights, expert tips and CombolojoSPORT platform updates for the Ethiopian sports community.',
    },
    {
      property: 'og:title',
      content: 'Insights & News | CombolojoSPORT',
    },
    {
      property: 'og:description',
      content:
        'Explore sports insights, news and useful tips from CombolojoSPORT.',
    },
    {
      property: 'og:type',
      content: 'website',
    },
  ],
})

/* =========================================================
   TYPES
========================================================= */

interface Blog {
  id: number
  title: string
  category: string
  author: string
  authorRole: string
  date: string
  readTime: string
  excerpt: string
  image: string
  featured?: boolean
}

/* =========================================================
   STATE
========================================================= */

const searchQuery = ref('')
const selectedCategory = ref('All')

/* =========================================================
   CATEGORIES
========================================================= */

const categories = [
  'All',
  'Football',
  'Athletics',
  'Basketball',
  'Fitness',
]

/* =========================================================
   BLOG DATA
========================================================= */

const blogs = ref<Blog[]>([
  {
    id: 1,
    title:
      'Ethiopian Premier League 2026/27: Major Transfer News & Team Previews',
    category: 'Football',
    author: 'Mensur Abdulkeni',
    authorRole: 'Senior Analyst',
    date: 'Sep 02, 2026',
    readTime: '6 min read',
    excerpt:
      'An in-depth look at major club signings, tactical changes and what to expect from the new Ethiopian football season.',
    image:
      'https://zappoapp.com/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fabkulekc%2Fproduction%2Fc761e5e3ceabe06e01a518fffa39a2bbba6732dd-1024x1024.png&w=750&q=75',
    featured: true,
  },

  {
    id: 2,
    title:
      'Tokyo Athletics 2025: Ethiopias Gold Medal Prospects and Training',
    category: 'Athletics',
    author: 'Abebe Germa',
    authorRole: 'Sports Correspondent',
    date: 'Aug 28, 2026',
    readTime: '5 min read',
    excerpt:
      'Detailed coverage of training programs and preparation for Ethiopian 5000m and marathon athletes.',
    image:
      'https://zappoapp.com/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fabkulekc%2Fproduction%2Fbf47603d15ee68ddb27e0463213f0efc871e51a1-1024x1024.png&w=750&q=75',
  },

  {
    id: 3,
    title:
      'Modern Recovery Techniques for Local Amateur Futsal Players',
    category: 'Fitness',
    author: 'Dr. Tesfaye Bekele',
    authorRole: 'Sports Physician',
    date: 'Aug 18, 2026',
    readTime: '4 min read',
    excerpt:
      'Essential recovery methods and practical physiotherapy tips for players who regularly participate in weekly matches.',
    image:
      'https://zappoapp.com/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fabkulekc%2Fproduction%2F167860281fbb154a122ddc837ae24661f22207ec-1376x768.png&w=750&q=75',
  },

  {
    id: 4,
    title:
      'How Basketball Communities Are Growing in Addis Ababa',
    category: 'Basketball',
    author: 'Samuel Tadesse',
    authorRole: 'Sports Writer',
    date: 'Aug 12, 2026',
    readTime: '5 min read',
    excerpt:
      'A look at local basketball communities, courts and the growing interest in organized recreational games.',
    image:
      'https://zappoapp.com/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fabkulekc%2Fproduction%2Fd0295ee835218b9755ccdfca2fe861156c38c27d-940x940.png&w=750&q=75',
  },

  {
    id: 5,
    title:
      '5 Things to Check Before Booking a Football Field',
    category: 'Football',
    author: 'Combolojo Team',
    authorRole: 'Platform Team',
    date: 'Aug 08, 2026',
    readTime: '4 min read',
    excerpt:
      'From field quality to location and available time slots, here are useful things to consider before booking.',
    image:
      'https://zappoapp.com/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fabkulekc%2Fproduction%2F423ab3222699836dc89af836f4d3694294a69fbe-1024x1024.png&w=750&q=75',
  },

  {
    id: 6,
    title:
      'Simple Fitness Habits for Players Who Play Every Week',
    category: 'Fitness',
    author: 'Marta Alemu',
    authorRole: 'Fitness Coach',
    date: 'Aug 01, 2026',
    readTime: '3 min read',
    excerpt:
      'Simple fitness habits that can help recreational players stay active and prepared for their next game.',
    image:
      'https://zappoapp.com/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fabkulekc%2Fproduction%2F9d8fb1435b597e9bf745ae5cd2a1fbc0b8ce8bdc-1344x768.png&w=750&q=75',
  },
])

/* =========================================================
   MOBILE APP BOOKING STEPS
   IMPORTANT:
   Website = Discover / Explore
   Mobile App = Booking
========================================================= */

const bookingSteps = [
  {
    id: 1,
    number: '01',
    title: 'DOWNLOAD THE APP',
    desc:
      'Install the CombolojoSPORT mobile app on your Android or iPhone.',
    icon: '📱',
  },

  {
    id: 2,
    number: '02',
    title: 'FIND YOUR VENUE',
    desc:
      'Search football fields, futsal courts, basketball courts and other sports venues.',
    icon: '📍',
  },

  {
    id: 3,
    number: '03',
    title: 'CHOOSE YOUR SLOT',
    desc:
      'Select the venue, date and available playing time that works for you.',
    icon: '⏰',
  },

  {
    id: 4,
    number: '04',
    title: 'BOOK & PLAY',
    desc:
      'Confirm your booking in the app, complete payment and receive your booking details.',
    icon: '⚽',
  },
]

/* =========================================================
   FILTERED BLOGS
========================================================= */

const filteredBlogs = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()

  return blogs.value.filter((blog) => {
    const categoryMatch =
      selectedCategory.value === 'All' ||
      blog.category === selectedCategory.value

    const searchMatch =
      !query ||
      blog.title.toLowerCase().includes(query) ||
      blog.excerpt.toLowerCase().includes(query) ||
      blog.author.toLowerCase().includes(query)

    return categoryMatch && searchMatch
  })
})

/* =========================================================
   FEATURED BLOG
========================================================= */

const featuredBlog = computed(() => {
  return blogs.value.find((blog) => blog.featured) || blogs.value[0]
})

/* =========================================================
   OTHER BLOGS
========================================================= */

const otherBlogs = computed(() => {
  return filteredBlogs.value.filter(
    (blog) => blog.id !== featuredBlog.value?.id,
  )
})

/* =========================================================
   HELPERS
========================================================= */

const clearFilters = () => {
  searchQuery.value = ''
  selectedCategory.value = 'All'
}

const categoryIcon = (category: string) => {
  switch (category) {
    case 'Football':
      return '⚽'

    case 'Athletics':
      return '🏃'

    case 'Basketball':
      return '🏀'

    case 'Fitness':
      return '💪'

    default:
      return '🏆'
  }
}
</script>

<template>
  <div
    class="min-h-screen
           bg-gray-50
           text-slate-900
           font-sans
           pt-20
           md:pt-24"
  >

    <!-- =====================================================
         HERO
         Addis Sports Field Style
    ====================================================== -->

    <section
      class="relative
             overflow-hidden
             bg-gradient-to-br
             from-green-800
             via-emerald-900
             to-green-950
             shadow-2xl
             shadow-green-950/25
             text-white"
    >

      <!-- Background image -->
      <img
        :src="heroImage"
        alt="Sports field"
        class="absolute inset-0 h-full w-full object-cover object-center"
      />

      <div
        class="absolute inset-0 bg-gradient-to-r from-green-950/65 via-green-900/40 to-green-900/15"
      />

      <!-- Decorative line -->
      <div
        class="absolute
               right-[10%]
               top-24
               hidden
               lg:block
               w-32
               h-px
               bg-green-400/50"
      />

      <div
        class="relative
               max-w-7xl
               mx-auto
               px-4
               sm:px-6
               lg:px-8
               py-20
               md:py-28"
      >

        <div class="mx-auto max-w-5xl text-center">

          <!-- Label -->
          <div
            class="inline-flex
                   items-center
                   gap-2
                   px-4
                   py-2
                   rounded-full
                   border
                   border-green-300/30
                   bg-green-400/10
                   text-green-200
                   text-[10px]
                   font-black
                   uppercase
                   tracking-[0.2em]"
          >

            <span
              class="w-2
                     h-2
                     rounded-full
                     bg-green-400"
            />

            JustPlay by Zappo

          </div>

          <!-- Main heading -->
          <h1
            class="mt-6
                   text-4xl
                   sm:text-5xl
                   lg:text-7xl
                   font-black
                   leading-tight
                   tracking-tight
                   drop-shadow-lg"
          >

            CombolojoSPORT
            <span class="block text-green-400">Sports Blog</span>

          </h1>

          <p
            class="mt-7
                   mx-auto
                   max-w-2xl
                   text-slate-100
                   text-sm
                   md:text-base
                   leading-8
                   drop-shadow-md"
          >
            Stay connected with Ethiopian sports news, expert
            insights, fitness tips and stories from the
            CombolojoSPORT community.
          </p>

          <!-- Hero buttons -->
          <div
            class="mt-8
                   flex
                   flex-wrap
                   gap-3"
          >

            <a
              href="#latest"
              class="inline-flex
                     items-center
                     gap-2
                     bg-green-600
                     hover:bg-green-500
                     text-white
                     px-6
                     py-3.5
                     rounded-xl
                     font-black
                     text-sm
                     shadow-lg
                     shadow-green-950/30
                     transition"
            >

              Explore Insights

              <Icon
                name="lucide:arrow-down"
                class="w-4 h-4"
              />

            </a>

            <NuxtLink
              to="/events"
              class="inline-flex
                     items-center
                     gap-2
                     border
                     border-white/20
                     bg-white/5
                     hover:bg-white/10
                     px-6
                     py-3.5
                     rounded-xl
                     font-black
                     text-sm
                     transition"
            >

              Find Events

              <Icon
                name="lucide:arrow-right"
                class="w-4 h-4"
              />

            </NuxtLink>

          </div>

        </div>

        <!-- Hero statistics -->
        <div
          class="mt-14
                 grid
                 grid-cols-2
                 md:grid-cols-4
                 gap-3
                 max-w-4xl"
        >

          <div
            class="border
                   border-white/10
                   bg-white/[0.05]
                   rounded-xl
                   p-4
                   shadow-lg
                   shadow-black/30"
          >

            <p
              class="text-xl
                     font-black
                     text-emerald-300"
            >
              {{ blogs.length }}+
            </p>

            <p
              class="mt-1
                     text-[10px]
                     uppercase
                     tracking-widest
                     text-slate-400
                     font-bold"
            >
              Articles
            </p>

          </div>

          <div
            class="border
                   border-white/10
                   bg-white/[0.05]
                   rounded-xl
                   p-4
                   shadow-lg
                   shadow-black/30"
          >

            <p
              class="text-xl
                     font-black
                     text-lime-300"
            >
              {{ categories.length - 1 }}
            </p>

            <p
              class="mt-1
                     text-[10px]
                     uppercase
                     tracking-widest
                     text-slate-400
                     font-bold"
            >
              Categories
            </p>

          </div>

          <div
            class="border
                   border-white/10
                   bg-white/[0.05]
                   rounded-xl
                   p-4
                   shadow-lg
                   shadow-black/30"
          >

            <p
              class="text-xl
                     font-black
                     text-blue-300"
            >
              ETH
            </p>

            <p
              class="mt-1
                     text-[10px]
                     uppercase
                     tracking-widest
                     text-slate-400
                     font-bold"
            >
              Sports Community
            </p>

          </div>

          <div
            class="border
                   border-white/10
                   bg-white/[0.05]
                   rounded-xl
                   p-4
                   shadow-lg
                   shadow-black/30"
          >

            <p
              class="text-xl
                     font-black
                     text-white"
            >
              24/7
            </p>

            <p
              class="mt-1
                     text-[10px]
                     uppercase
                     tracking-widest
                     text-slate-400
                     font-bold"
            >
              Stay Connected
            </p>

          </div>

        </div>

      </div>

    </section>

    <!-- =====================================================
         MOBILE APP BOOKING
    ====================================================== -->

    <section
      class="bg-slate-50
             py-14
             md:py-20"
    >

      <div
        class="max-w-7xl
               mx-auto
               px-4
               sm:px-6
               lg:px-8"
      >

        <!-- Header -->
        <div
          class="flex
                 flex-col
                 lg:flex-row
                 lg:items-end
                 justify-between
                 gap-6
                 mb-10"
        >

          <div>

            <div
              class="flex
                     items-center
                     gap-2
                     text-emerald-600
                     text-[10px]
                     font-black
                     uppercase
                     tracking-[0.2em]"
            >

              <span
                class="w-7
                       h-px
                       bg-emerald-500"
              />

              Mobile App Booking

            </div>

            <h2
              class="mt-3
                     text-3xl
                     md:text-5xl
                     font-black
                     text-slate-900
                     leading-tight"
            >

              Discover on the Website.

              <span
                class="block
                       text-emerald-600"
              >
                Book on the App.
              </span>

            </h2>

            <p
              class="mt-4
                     max-w-2xl
                     text-sm
                     text-slate-500
                     leading-7"
            >
              CombolojoSPORT helps you discover sports venues,
              events and sports content on the website. For actual
              venue booking, use the CombolojoSPORT mobile app.
            </p>

          </div>

          <!-- App badge -->
          <div
            class="flex
                   items-center
                   gap-3
                   bg-white
                   border
                   border-slate-200
                   rounded-2xl
                   px-5
                   py-4
                   self-start
                   lg:self-auto"
          >

            <div
              class="w-11
                     h-11
                     rounded-xl
                     bg-emerald-50
                     text-emerald-600
                     flex
                     items-center
                     justify-center"
            >

              <Icon
                name="lucide:smartphone"
                class="w-6
                       h-6"
              />

            </div>

            <div>

              <p
                class="text-[9px]
                       font-black
                       uppercase
                       tracking-widest
                       text-slate-400"
              >
                Booking Platform
              </p>

              <p
                class="mt-1
                       text-sm
                       font-black
                       text-slate-900"
              >
                CombolojoSPORT Mobile App
              </p>

            </div>

          </div>

        </div>

        <!-- Booking flow -->
        <div
          class="grid
                 grid-cols-1
                 sm:grid-cols-2
                 lg:grid-cols-4
                 gap-4"
        >

          <div
            v-for="step in bookingSteps"
            :key="step.id"
            class="group
                   relative
                   bg-white
                   border
                   border-slate-200
                   rounded-2xl
                   p-6
                   hover:border-emerald-400
                   transition-all
                   duration-300"
          >

            <!-- Top -->
            <div
              class="flex
                     items-center
                     justify-between
                     mb-7"
            >

              <div
                class="w-12
                       h-12
                       rounded-xl
                       bg-emerald-50
                       border
                       border-emerald-100
                       flex
                       items-center
                       justify-center
                       text-xl"
              >
                {{ step.icon }}
              </div>

              <span
                class="text-[10px]
                       font-black
                       text-slate-300
                       tracking-widest"
              >
                {{ step.number }}
              </span>

            </div>

            <h3
              class="text-xs
                     font-black
                     tracking-wider
                     text-slate-900"
            >
              {{ step.title }}
            </h3>

            <p
              class="mt-3
                     text-xs
                     leading-6
                     text-slate-500"
            >
              {{ step.desc }}
            </p>

            <!-- Bottom accent -->
            <div
              class="absolute
                     bottom-0
                     left-6
                     right-6
                     h-0.5
                     bg-emerald-500
                     scale-x-0
                     group-hover:scale-x-100
                     transition-transform
                     origin-left"
            />

          </div>

        </div>

        <!-- Important booking notice -->
        <div
          class="mt-8
                 flex
                 flex-col
                 md:flex-row
                 md:items-center
                 justify-between
                 gap-5
                 bg-[#07111f]
                 rounded-2xl
                 border
                 border-emerald-500/20
                 p-6
                 md:p-7"
        >

          <div
            class="flex
                   items-start
                   gap-4"
          >

            <div
              class="w-11
                     h-11
                     rounded-xl
                     bg-emerald-400/10
                     border
                     border-emerald-400/20
                     text-emerald-400
                     flex
                     items-center
                     justify-center
                     flex-shrink-0"
            >

              <Icon
                name="lucide:smartphone"
                class="w-5
                       h-5"
              />

            </div>

            <div>

              <p
                class="text-white
                       text-sm
                       font-black"
              >
                Venue booking is available through the mobile app.
              </p>

              <p
                class="mt-1
                       text-xs
                       text-slate-400
                       leading-6"
              >
                Browse venues here, then use the CombolojoSPORT
                app to select your slot and complete your booking.
              </p>

            </div>

          </div>

          <!-- App buttons -->
          <div
            class="flex
                   flex-wrap
                   gap-2
                   flex-shrink-0"
          >

            <a
              href="#"
              aria-label="Download CombolojoSPORT from App Store"
              class="inline-flex
                     items-center
                     gap-2
                     bg-white
                     hover:bg-slate-100
                     text-slate-950
                     px-4
                     py-3
                     rounded-xl
                     transition"
            >

              <span class="text-lg">
                🍎
              </span>

              <span>
                <small
                  class="block
                         text-[7px]
                         uppercase
                         tracking-wider
                         text-slate-500"
                >
                  Download on
                </small>

                <strong
                  class="text-[10px]
                         font-black"
                >
                  App Store
                </strong>
              </span>

            </a>

            <a
              href="#"
              aria-label="Download CombolojoSPORT from Google Play"
              class="inline-flex
                     items-center
                     gap-2
                     bg-emerald-400
                     hover:bg-lime-300
                     text-slate-950
                     px-4
                     py-3
                     rounded-xl
                     transition"
            >

              <span class="text-lg">
                🤖
              </span>

              <span>
                <small
                  class="block
                         text-[7px]
                         uppercase
                         tracking-wider
                         text-emerald-900"
                >
                  Get it on
                </small>

                <strong
                  class="text-[10px]
                         font-black"
                >
                  Google Play
                </strong>
              </span>

            </a>

          </div>

        </div>

        <!-- Website venue discovery -->
        <div
          class="mt-5
                 flex
                 flex-wrap
                 items-center
                 gap-3"
        >

          <NuxtLink
            to="/venues"
            class="inline-flex
                   items-center
                   gap-2
                   bg-emerald-600
                   hover:bg-emerald-500
                   text-white
                   px-5
                   py-3
                   rounded-xl
                   text-xs
                   font-black
                   transition"
          >

            Browse Venues

            <Icon
              name="lucide:arrow-right"
              class="w-4 h-4"
            />

          </NuxtLink>

          <NuxtLink
            to="/events"
            class="inline-flex
                   items-center
                   gap-2
                   bg-white
                   hover:bg-emerald-50
                   text-slate-700
                   border
                   border-slate-200
                   hover:border-emerald-400
                   px-5
                   py-3
                   rounded-xl
                   text-xs
                   font-black
                   transition"
          >

            Explore Events

            <Icon
              name="lucide:calendar-days"
              class="w-4 h-4"
            />

          </NuxtLink>

        </div>

      </div>

    </section>

    <!-- =====================================================
         LATEST INSIGHTS
    ====================================================== -->

    <section
      id="latest"
          class="bg-white
            border-y
            border-gray-200
             py-14
             md:py-20"
    >

      <div
        class="max-w-7xl
               mx-auto
               px-4
               sm:px-6
               lg:px-8"
      >

        <!-- Heading -->
        <div
          class="mb-8"
        >

          <div
            class="flex
                   items-center
                   gap-2
                   text-green-700
                   text-[10px]
                   font-black
                   uppercase
                   tracking-[0.2em]"
          >

            <span
              class="w-7
                     h-px
                     bg-green-600"
            />

            Latest Stories

          </div>

          <h2
            class="mt-3
                   text-3xl
                   md:text-4xl
                   font-black"
          >
            Insights & News
          </h2>

          <p
            class="mt-2
                   text-sm
                   text-slate-500"
          >
            Useful stories, sports updates and practical tips
            for players and sports communities.
          </p>

        </div>

        <!-- Filters -->
        <div
          class="flex
                 flex-col
                 lg:flex-row
                 lg:items-center
                 justify-between
                 gap-4
                 mb-10"
        >

          <!-- Categories -->
          <div
            role="tablist"
            aria-label="Filter blog categories"
            class="flex
                   gap-2
                   overflow-x-auto
                   pb-1
                   scrollbar-hide"
          >

            <button
              v-for="cat in categories"
              :key="cat"
              role="tab"
              :aria-selected="selectedCategory === cat"
              @click="selectedCategory = cat"
              :class="[
                'px-5 py-2.5 rounded-lg text-[10px] font-black uppercase tracking-wider whitespace-nowrap border transition',
                selectedCategory === cat
                  ? 'bg-green-600 text-white border-green-600'
                  : 'bg-white text-slate-600 border-gray-200 hover:border-green-400 hover:text-green-700'
              ]"
            >

              <span
                v-if="cat !== 'All'"
                class="mr-1"
              >
                {{ categoryIcon(cat) }}
              </span>

              {{ cat }}

            </button>

          </div>

          <!-- Search -->
          <div
            class="relative
                   w-full
                   lg:w-80
                   flex-shrink-0"
          >

            <Icon
              name="lucide:search"
              class="absolute
                     left-4
                     top-1/2
                     -translate-y-1/2
                     w-4
                     h-4
                     text-slate-400"
            />

            <input
              v-model="searchQuery"
              type="search"
              aria-label="Search articles"
              placeholder="Search stories..."
              class="w-full
                     pl-11
                     pr-4
                     py-3
                     rounded-xl
                     bg-gray-50
                     border
                     border-gray-200
                     text-sm
                     text-slate-900
                     outline-none
                     focus:bg-white
                     focus:border-green-600
                     focus:ring-2
                     focus:ring-green-600/20
                     transition"
            />

          </div>

        </div>

        <!-- =================================================
             FEATURED ARTICLE
        ================================================== -->

        <div
          v-if="
            featuredBlog &&
            filteredBlogs.some(
              blog => blog.id === featuredBlog.id
            )
          "
          class="mb-12"
        >

          <article
            class="group
                   grid
                   lg:grid-cols-2
                   bg-gray-50
                   border
                   border-gray-200
                   rounded-2xl
                   overflow-hidden"
          >

            <!-- Image -->
            <NuxtLink
              :to="`/blog/${featuredBlog.id}`"
              class="relative
                     min-h-[300px]
                     lg:min-h-[430px]
                     overflow-hidden
                     bg-slate-200"
            >

              <img
                :src="featuredBlog.image"
                :alt="featuredBlog.title"
                loading="eager"
                decoding="async"
                class="absolute
                       inset-0
                       w-full
                       h-full
                       object-cover
                       group-hover:scale-105
                       transition-transform
                       duration-700"
              />

              <div
                class="absolute
                       inset-0
                       bg-gradient-to-t
                       from-slate-950/70
                       via-transparent
                       to-transparent"
              />

              <!-- Featured label -->
              <div
                class="absolute
                       top-5
                       left-5
                       inline-flex
                       items-center
                       gap-2
                       bg-green-600
                       text-white
                       px-3
                       py-1.5
                       rounded-lg
                       text-[9px]
                       font-black
                       uppercase
                       tracking-widest"
              >

                <span
                  class="w-1.5
                         h-1.5
                         bg-white
                         rounded-full"
                />

                Featured

              </div>

              <!-- Category -->
              <div
                class="absolute
                       bottom-5
                       left-5
                       text-white"
              >

                <span
                  class="inline-block
                         bg-black/30
                         backdrop-blur-md
                         border
                         border-white/20
                         px-3
                         py-1.5
                         rounded-lg
                         text-[9px]
                         font-black
                         uppercase
                         tracking-widest"
                >
                  {{ featuredBlog.category }}
                </span>

              </div>

            </NuxtLink>

            <!-- Content -->
            <div
              class="p-7
                     md:p-10
                     flex
                     flex-col
                     justify-center"
            >

              <div
                class="flex
                       items-center
                       gap-3
                       text-[9px]
                       font-black
                       text-slate-400
                       uppercase
                       tracking-widest"
              >

                <span>
                  {{ featuredBlog.date }}
                </span>

                <span
                  class="w-1
                         h-1
                         rounded-full
                         bg-slate-300"
                />

                <span>
                  {{ featuredBlog.readTime }}
                </span>

              </div>

              <NuxtLink
                :to="`/blog/${featuredBlog.id}`"
              >

                <h3
                  class="mt-5
                         text-2xl
                         md:text-4xl
                         font-black
                         leading-tight
                         hover:text-emerald-600
                         transition"
                >
                  {{ featuredBlog.title }}
                </h3>

              </NuxtLink>

              <p
                class="mt-5
                       text-sm
                       text-slate-500
                       leading-7
                       max-w-xl"
              >
                {{ featuredBlog.excerpt }}
              </p>

              <!-- Author -->
              <div
                class="mt-8
                       pt-6
                       border-t
                       border-slate-200
                       flex
                       items-center
                       justify-between
                       gap-4"
              >

                <div
                  class="flex
                         items-center
                         gap-3"
                >

                  <div
                    class="w-10
                           h-10
                           rounded-full
                           bg-emerald-100
                           text-emerald-700
                           flex
                           items-center
                           justify-center
                           font-black
                           text-xs"
                  >
                    {{ featuredBlog.author.charAt(0) }}
                  </div>

                  <div>

                    <p
                      class="text-xs
                             font-black"
                    >
                      {{ featuredBlog.author }}
                    </p>

                    <p
                      class="text-[9px]
                             uppercase
                             tracking-wider
                             font-bold
                             text-slate-400"
                    >
                      {{ featuredBlog.authorRole }}
                    </p>

                  </div>

                </div>

                <NuxtLink
                  :to="`/blog/${featuredBlog.id}`"
                  class="inline-flex
                         items-center
                         gap-2
                         text-green-700
                         hover:text-green-800
                         text-xs
                         font-black"
                >

                  Read Story

                  <Icon
                    name="lucide:arrow-right"
                    class="w-4 h-4"
                  />

                </NuxtLink>

              </div>

            </div>

          </article>

        </div>

        <!-- =================================================
             BLOG GRID
        ================================================== -->

        <div
          v-if="otherBlogs.length > 0"
          class="grid
                 grid-cols-1
                 md:grid-cols-2
                 lg:grid-cols-3
                 gap-6"
        >

          <article
            v-for="blog in otherBlogs"
            :key="blog.id"
            class="group
                   bg-white
                   border
                   border-gray-200
                   rounded-2xl
                   overflow-hidden
                   hover:border-green-400
                   transition-all
                   duration-300"
          >

            <!-- Image -->
            <NuxtLink
              :to="`/blog/${blog.id}`"
              class="relative
                     block
                     h-56
                     overflow-hidden
                     bg-slate-100"
            >

              <img
                :src="blog.image"
                :alt="blog.title"
                loading="lazy"
                decoding="async"
                class="w-full
                       h-full
                       object-cover
                       group-hover:scale-105
                       transition-transform
                       duration-700"
              />

              <div
                class="absolute
                       inset-0
                       bg-gradient-to-t
                       from-slate-950/50
                       via-transparent
                       to-transparent"
              />

              <span
                class="absolute
                       top-4
                       left-4
                       px-3
                       py-1.5
                       bg-white/90
                       backdrop-blur-md
                       text-emerald-700
                       text-[9px]
                       font-black
                       uppercase
                       tracking-widest
                       rounded-lg"
              >
                {{ blog.category }}
              </span>

            </NuxtLink>

            <!-- Content -->
            <div class="p-6">

              <div
                class="flex
                       items-center
                       gap-2
                       text-[9px]
                       font-black
                       text-slate-400
                       uppercase
                       tracking-widest"
              >

                <span>
                  {{ blog.date }}
                </span>

                <span
                  class="w-1
                         h-1
                         rounded-full
                         bg-slate-300"
                />

                <span>
                  {{ blog.readTime }}
                </span>

              </div>

              <NuxtLink
                :to="`/blog/${blog.id}`"
              >

                <h3
                  class="mt-4
                         text-lg
                         font-black
                         leading-snug
                         text-slate-900
                         group-hover:text-green-700
                         transition-colors"
                >
                  {{ blog.title }}
                </h3>

              </NuxtLink>

              <p
                class="mt-3
                       text-xs
                       text-slate-500
                       leading-6
                       line-clamp-3"
              >
                {{ blog.excerpt }}
              </p>

              <!-- Footer -->
              <div
                class="mt-6
                       pt-5
                       border-t
                             border-gray-100
                       flex
                       items-center
                       justify-between"
              >

                <div
                  class="flex
                         items-center
                         gap-2"
                >

                  <div
                    class="w-8
                           h-8
                           rounded-full
                           bg-green-100
                           text-green-700
                           flex
                           items-center
                           justify-center
                           text-[10px]
                           font-black"
                  >
                    {{ blog.author.charAt(0) }}
                  </div>

                  <div>

                    <p
                      class="text-[10px]
                             font-black
                             text-slate-800"
                    >
                      {{ blog.author }}
                    </p>

                    <p
                      class="text-[8px]
                             font-bold
                             uppercase
                             tracking-wider
                             text-slate-400"
                    >
                      {{ blog.authorRole }}
                    </p>

                  </div>

                </div>

                <NuxtLink
                  :to="`/blog/${blog.id}`"
                  :aria-label="`Read story: ${blog.title}`"
                  class="w-9
                         h-9
                         rounded-full
                         bg-gray-100
                         group-hover:bg-green-600
                         flex
                         items-center
                         justify-center
                         text-slate-500
                         group-hover:text-white
                         transition"
                >

                  <Icon
                    name="lucide:arrow-right"
                    class="w-4 h-4"
                  />

                </NuxtLink>

              </div>

            </div>

          </article>

        </div>

        <!-- =================================================
             EMPTY STATE
        ================================================== -->

        <div
          v-if="filteredBlogs.length === 0"
          class="text-center
                 py-16
                 bg-white
                 rounded-3xl
                 border
                 border-gray-200"
        >

          <div
            class="w-16
                   h-16
                   mx-auto
                   rounded-full
                   bg-gray-50
                   border
                   border-gray-200
                   flex
                   items-center
                   justify-center"
          >

            <Icon
              name="lucide:search-x"
              class="w-7
                     h-7
                     text-slate-400"
            />

          </div>

          <h3
            class="mt-5
                   text-xl
                   font-black"
          >
            No matching articles found
          </h3>

          <p
            class="mt-2
                   text-sm
                   text-slate-500
                   max-w-md
                   mx-auto"
          >
            We couldn't find anything matching your search.
            Try another keyword or category.
          </p>

          <button
            @click="clearFilters"
            class="mt-6
                   bg-green-600
                   hover:bg-green-700
                   text-white
                   px-6
                   py-3
                   rounded-xl
                   text-xs
                   font-black
                   uppercase
                   tracking-wider
                   transition"
          >
            Reset Filters
          </button>

        </div>

      </div>

    </section>

    <!-- =====================================================
         VENUE / APP CTA
    ====================================================== -->

    <section
      class="bg-green-800
             text-white
             py-16"
    >

      <div
        class="max-w-7xl
               mx-auto
               px-4
               sm:px-6
               lg:px-8"
      >

        <div
          class="relative
                 overflow-hidden
                 rounded-2xl
                 border
                 border-green-600/40
                 bg-green-900/60
                 p-8
                 md:p-12"
        >

          <!-- Decorative background -->
          <div
            class="absolute
                   -right-20
                   -top-20
                   w-64
                   h-64
                   rounded-full
                   bg-green-400/10
                   blur-3xl
                   pointer-events-none"
          />

          <div
            class="relative
                   flex
                   flex-col
                   lg:flex-row
                   lg:items-center
                   justify-between
                   gap-8"
          >

            <div
              class="max-w-2xl"
            >

              <p
                class="text-green-300
                       text-[10px]
                       font-black
                       uppercase
                       tracking-[0.2em]"
              >
                CombolojoSPORT Mobile App
              </p>

              <h2
                class="mt-3
                       text-3xl
                       md:text-4xl
                       font-black"
              >
                Ready to Play?
              </h2>

              <p
                class="mt-3
                       text-sm
                       md:text-base
                       text-slate-300
                       leading-7"
              >
                Discover sports venues and events on the website.
                When you are ready to reserve a playing slot,
                continue with the CombolojoSPORT mobile app.
              </p>

            </div>

            <div
              class="flex
                     flex-wrap
                     gap-3"
            >

              <!-- Browse venue -->
              <NuxtLink
                to="/venues"
                class="inline-flex
                       items-center
                       gap-2
                       bg-green-500
                       hover:bg-green-400
                       text-white
                       px-6
                       py-3.5
                       rounded-xl
                       text-xs
                       font-black
                       transition"
              >

                Find a Venue

                <Icon
                  name="lucide:map-pin"
                  class="w-4 h-4"
                />

              </NuxtLink>

              <!-- Mobile app -->
              <a
                href="#"
                class="inline-flex
                       items-center
                       gap-2
                       border
                       border-white/20
                       bg-white/5
                       hover:bg-white/10
                       px-6
                       py-3.5
                       rounded-xl
                       text-xs
                       font-black
                       transition"
              >

                Get Mobile App

                <Icon
                  name="lucide:smartphone"
                  class="w-4 h-4"
                />

              </a>

              <!-- Just Play -->
              <NuxtLink
                to="/just-play"
                class="inline-flex
                       items-center
                       gap-2
                       border
                       border-white/20
                       hover:bg-white/10
                       px-6
                       py-3.5
                       rounded-xl
                       text-xs
                       font-black
                       transition"
              >

                Just Play

                <Icon
                  name="lucide:play"
                  class="w-4 h-4"
                />

              </NuxtLink>

            </div>

          </div>

        </div>

      </div>

    </section>

  </div>
</template>

<style scoped>
/* =========================================================
   HORIZONTAL SCROLLBAR HIDDEN
========================================================= */

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
```

### What changed

* **All `shadow-*` classes are removed** from the page.
* The page now follows the **Addis sports-field / modern sports-platform style**: dark navy, emerald green, lime accents, strong typography, clean borders and rectangular/rounded sports UI.
* The booking flow is explicitly:
  **Website → Discover venue → Mobile App → Select slot → Confirm booking → Play**
* The website does **not** imply that the actual venue reservation happens on the blog/website.
* Added a dedicated **“Discover on the Website. Book on the App.”** section.
* Added a clear **mobile-app booking notice**.
* Added **App Store / Google Play** CTAs.
* Kept `/venues`, `/events`, and `/just-play` as website navigation paths.
* No JavaScript or API dependency was added, so this page should work as a normal Nuxt 4 page.

For the real project, replace the `href="#"` app buttons later with your actual **Google Play / App Store links**.
