<script setup lang="ts">
import { ref, computed } from 'vue'
import heroImage from '~/assets/images/venues20.jpg'

/* ═══════════════════════════════════════════
   SEO
   ═══════════════════════════════════════════ */
useHead({
  title: 'Insights & News | CombolojoSPORT',
  meta: [
    {
      name: 'description',
      content:
        'Sports news, insights, expert tips and CombolojoSPORT platform updates for the Ethiopian sports community.',
    },
    { property: 'og:title', content: 'Insights & News | CombolojoSPORT' },
    {
      property: 'og:description',
      content: 'Explore sports insights, news and useful tips from CombolojoSPORT.',
    },
    { property: 'og:type', content: 'website' },
  ],
})

/* ═══════════════════════════════════════════
   TYPES
   ═══════════════════════════════════════════ */
interface Blog {
  id: number
  title: string
  category: string
  author: string
  authorRole: string
  date: string
  readTime: string
  excerpt: string
  content: string
  image: string
  tags: string[]
  featured?: boolean
}

/* ═══════════════════════════════════════════
   STATE
   ═══════════════════════════════════════════ */
const searchQuery = ref('')
const selectedCategory = ref('All')
const selectedBlog = ref<Blog | null>(null)
const isModalOpen = ref(false)

/* ═══════════════════════════════════════════
   CATEGORIES
   ═══════════════════════════════════════════ */
const categories = ['All', 'Football', 'Athletics', 'Basketball', 'Fitness']

/* ═══════════════════════════════════════════
   BLOG DATA — ሙሉ ይዘት ከ content ጋር
   ═══════════════════════════════════════════ */
const blogs = ref<Blog[]>([
  {
    id: 1,
    title: 'Ethiopian Premier League 2026/27: Major Transfer News & Team Previews',
    category: 'Football',
    author: 'Mensur Abdulkeni',
    authorRole: 'Senior Analyst',
    date: 'Sep 02, 2026',
    readTime: '6 min read',
    excerpt:
      'An in-depth look at major club signings, tactical changes and what to expect from the new Ethiopian football season.',
    content: `
      <p>The Ethiopian Premier League is set for one of its most competitive seasons yet, with several high-profile transfers reshaping the balance of power across the league.</p>
      <h2>Major Signings This Season</h2>
      <p>Saint George SC has made the biggest splash in the transfer market, securing the services of three international players from East African rivals. Their attacking line is now considered the most dangerous in the league.</p>
      <p>Ethiopia Bunna has responded by strengthening their midfield with two experienced players from the Egyptian league, signaling their intent to challenge for the title.</p>
      <h2>Tactical Changes</h2>
      <p>We're seeing a league-wide shift towards high-pressing formations, with several coaches adopting the 4-2-3-1 system that has proven successful in continental competitions.</p>
      <h2>Team Previews</h2>
      <p><strong>Saint George SC</strong> — Title favorites. Their squad depth is unmatched, and their youth academy continues to produce first-team talent.</p>
      <p><strong>Ethiopia Bunna</strong> — Dark horses. Their new signings could push them into the top three.</p>
      <p><strong>Fasil Kenema</strong> — Consistent performers. Expect them to challenge for a continental spot.</p>
      <h2>What to Watch</h2>
      <p>The opening weekend fixtures will give us our first real indication of how the new signings will settle in. Keep an eye on the Saint George vs Ethiopia Bunna derby in week three — it could set the tone for the entire season.</p>
    `,
    image:
      'https://zappoapp.com/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fabkulekc%2Fproduction%2Fc761e5e3ceabe06e01a518fffa39a2bbba6732dd-1024x1024.png&w=750&q=75',
    tags: ['Premier League', 'Transfers', 'Ethiopia', 'Football'],
    featured: true,
  },
  {
    id: 2,
    title: 'Tokyo Athletics 2025: Ethiopias Gold Medal Prospects and Training',
    category: 'Athletics',
    author: 'Abebe Germa',
    authorRole: 'Sports Correspondent',
    date: 'Aug 28, 2026',
    readTime: '5 min read',
    excerpt:
      'Detailed coverage of training programs and preparation for Ethiopian 5000m and marathon athletes.',
    content: `
      <p>Ethiopia's distance runners are deep in preparation for the upcoming international athletics season, with several athletes showing world-class form in recent training sessions.</p>
      <h2>Training Camps</h2>
      <p>The national team has established training camps in Addis Ababa and Bekoji, focusing on altitude conditioning and speed endurance work.</p>
      <h2>Key Athletes to Watch</h2>
      <p>Several emerging talents have caught the attention of international coaches, and their performances in the coming months will be crucial for Olympic qualification.</p>
      <h2>Coaching Philosophy</h2>
      <p>The coaching staff has emphasized the importance of balancing high-volume training with adequate recovery, an approach that has paid dividends in recent championships.</p>
    `,
    image:
      'https://zappoapp.com/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fabkulekc%2Fproduction%2Fbf47603d15ee68ddb27e0463213f0efc871e51a1-1024x1024.png&w=750&q=75',
    tags: ['Athletics', 'Running', 'Training', 'Ethiopia'],
  },
  {
    id: 3,
    title: 'Modern Recovery Techniques for Local Amateur Futsal Players',
    category: 'Fitness',
    author: 'Dr. Tesfaye Bekele',
    authorRole: 'Sports Physician',
    date: 'Aug 18, 2026',
    readTime: '4 min read',
    excerpt:
      'Essential recovery methods and practical physiotherapy tips for players who regularly participate in weekly matches.',
    content: `
      <p>Recovery is often overlooked by amateur players, yet it's one of the most important factors in maintaining performance and preventing injury.</p>
      <h2>Post-Match Recovery</h2>
      <p>The first 30 minutes after a match are critical. Focus on rehydration, light stretching, and consuming protein and carbohydrates to kickstart the recovery process.</p>
      <h2>Sleep and Nutrition</h2>
      <p>Aim for 7-9 hours of quality sleep. Nutrition should include anti-inflammatory foods like berries, leafy greens, and fatty fish.</p>
      <h2>Active Recovery</h2>
      <p>Light activities like swimming, cycling, or yoga on rest days can help reduce muscle soreness and improve circulation.</p>
    `,
    image:
      'https://zappoapp.com/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fabkulekc%2Fproduction%2F167860281fbb154a122ddc837ae24661f22207ec-1376x768.png&w=750&q=75',
    tags: ['Recovery', 'Fitness', 'Futsal', 'Health'],
  },
  {
    id: 4,
    title: 'How Basketball Communities Are Growing in Addis Ababa',
    category: 'Basketball',
    author: 'Samuel Tadesse',
    authorRole: 'Sports Writer',
    date: 'Aug 12, 2026',
    readTime: '5 min read',
    excerpt:
      'A look at local basketball communities, courts and the growing interest in organized recreational games.',
    content: `
      <p>Basketball in Addis Ababa is experiencing a renaissance, driven by new courts, organized leagues, and a growing community of passionate players.</p>
      <h2>New Courts and Facilities</h2>
      <p>Several new outdoor and indoor courts have opened across the city, making it easier than ever for players to find a place to play.</p>
      <h2>Community Leagues</h2>
      <p>Weekend leagues have become increasingly popular, with teams from different neighborhoods competing in friendly tournaments.</p>
      <h2>Youth Programs</h2>
      <p>Youth basketball programs are also expanding, giving young players the opportunity to develop their skills in a structured environment.</p>
    `,
    image:
      'https://zappoapp.com/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fabkulekc%2Fproduction%2Fd0295ee835218b9755ccdfca2fe861156c38c27d-940x940.png&w=750&q=75',
    tags: ['Basketball', 'Addis Ababa', 'Community'],
  },
  {
    id: 5,
    title: '5 Things to Check Before Booking a Football Field',
    category: 'Football',
    author: 'Combolojo Team',
    authorRole: 'Platform Team',
    date: 'Aug 08, 2026',
    readTime: '4 min read',
    excerpt:
      'From field quality to location and available time slots, here are useful things to consider before booking.',
    content: `
      <p>Booking a football field can be a great experience, but there are several things you should check before making a reservation.</p>
      <h2>1. Field Quality</h2>
      <p>Check the surface type (natural grass, artificial turf, futsal court) and inspect for any damage that could affect play.</p>
      <h2>2. Location and Accessibility</h2>
      <p>Consider parking availability, public transport access, and travel time from your location.</p>
      <h2>3. Lighting</h2>
      <p>If you're playing in the evening, make sure the field has adequate lighting.</p>
      <h2>4. Changing Rooms and Facilities</h2>
      <p>Check if the venue provides changing rooms, showers, and restrooms.</p>
      <h2>5. Booking and Cancellation Policy</h2>
      <p>Understand the venue's payment terms, cancellation policy, and refund rules.</p>
    `,
    image:
      'https://zappoapp.com/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fabkulekc%2Fproduction%2F423ab3222699836dc89af836f4d3694294a69fbe-1024x1024.png&w=750&q=75',
    tags: ['Booking', 'Football', 'Tips'],
  },
  {
    id: 6,
    title: 'Simple Fitness Habits for Players Who Play Every Week',
    category: 'Fitness',
    author: 'Marta Alemu',
    authorRole: 'Fitness Coach',
    date: 'Aug 01, 2026',
    readTime: '3 min read',
    excerpt:
      'Simple fitness habits that can help recreational players stay active and prepared for their next game.',
    content: `
      <p>If you play sports every week, maintaining consistent fitness habits can dramatically improve your performance and reduce injury risk.</p>
      <h2>Daily Movement</h2>
      <p>Aim for at least 30 minutes of moderate activity every day, even on rest days.</p>
      <h2>Strength Training</h2>
      <p>Two sessions per week focused on compound movements can build the strength you need on the field.</p>
      <h2>Mobility Work</h2>
      <p>Include dynamic stretching before games and static stretching after.</p>
      <h2>Hydration</h2>
      <p>Drink water throughout the day, not just during games.</p>
    `,
    image:
      'https://zappoapp.com/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fabkulekc%2Fproduction%2F9d8fb1435b597e9bf745ae5cd2a1fbc0b8ce8bdc-1344x768.png&w=750&q=75',
    tags: ['Fitness', 'Habits', 'Health'],
  },
])

/* ═══════════════════════════════════════════
   BOOKING STEPS
   ═══════════════════════════════════════════ */
const bookingSteps = [
  { id: 1, number: '01', title: 'DOWNLOAD THE APP', desc: 'Install the CombolojoSPORT mobile app on your Android or iPhone.', icon: '📱' },
  { id: 2, number: '02', title: 'FIND YOUR VENUE', desc: 'Search football fields, futsal courts, basketball courts and other sports venues.', icon: '📍' },
  { id: 3, number: '03', title: 'CHOOSE YOUR SLOT', desc: 'Select the venue, date and available playing time that works for you.', icon: '⏰' },
  { id: 4, number: '04', title: 'BOOK & PLAY', desc: 'Confirm your booking in the app, complete payment and receive your booking details.', icon: '⚽' },
]

/* ═══════════════════════════════════════════
   COMPUTED
   ═══════════════════════════════════════════ */
const filteredBlogs = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()

  return blogs.value.filter((blog) => {
    const categoryMatch =
      selectedCategory.value === 'All' || blog.category === selectedCategory.value

    const searchMatch =
      !query ||
      blog.title.toLowerCase().includes(query) ||
      blog.excerpt.toLowerCase().includes(query) ||
      blog.author.toLowerCase().includes(query)

    return categoryMatch && searchMatch
  })
})

const featuredBlog = computed(() => {
  return blogs.value.find((blog) => blog.featured) || blogs.value[0]
})

const otherBlogs = computed(() => {
  return filteredBlogs.value.filter((blog) => blog.id !== featuredBlog.value?.id)
})

const relatedBlogs = computed(() => {
  if (!selectedBlog.value) return []
  return blogs.value
    .filter(b => b.id !== selectedBlog.value!.id && b.category === selectedBlog.value!.category)
    .slice(0, 3)
})

/* ═══════════════════════════════════════════
   HELPERS
   ═══════════════════════════════════════════ */
const clearFilters = () => {
  searchQuery.value = ''
  selectedCategory.value = 'All'
}

const categoryIcon = (category: string) => {
  switch (category) {
    case 'Football': return '⚽'
    case 'Athletics': return '🏃'
    case 'Basketball': return '🏀'
    case 'Fitness': return '💪'
    default: return '🏆'
  }
}

/* ═══════════════════════════════════════════
   OPEN / CLOSE MODAL
   ═══════════════════════════════════════════ */
const openBlog = (blog: Blog) => {
  selectedBlog.value = blog
  isModalOpen.value = true
  if (import.meta.client) {
    document.body.style.overflow = 'hidden'
  }
}

const closeBlog = () => {
  isModalOpen.value = false
  setTimeout(() => {
    selectedBlog.value = null
    if (import.meta.client) {
      document.body.style.overflow = ''
    }
  }, 200)
}

/* ═══════════════════════════════════════════
   ESC KEY TO CLOSE MODAL
   ═══════════════════════════════════════════ */
onMounted(() => {
  const handleEsc = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && isModalOpen.value) {
      closeBlog()
    }
  }
  document.addEventListener('keydown', handleEsc)

  onBeforeUnmount(() => {
    document.removeEventListener('keydown', handleEsc)
    document.body.style.overflow = ''
  })
})
</script>

<template>
  <div class="min-h-screen bg-gray-50 text-slate-900 font-sans pt-20 md:pt-24">

    <!-- ═══════════════════════════════════════
         HERO
         ═══════════════════════════════════════ -->
    <section class="relative overflow-hidden bg-gradient-to-br from-green-800 via-emerald-900 to-green-950 text-white">
      <img :src="heroImage" alt="Sports field" class="absolute inset-0 h-full w-full object-cover object-center" />
      <div class="absolute inset-0 bg-gradient-to-r from-green-950/75 via-green-900/50 to-green-900/20" />
      <div class="absolute right-[10%] top-24 hidden lg:block w-32 h-px bg-green-400/50" />

      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <div class="mx-auto max-w-5xl text-center">
          <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-green-300/30 bg-green-400/10 text-green-200 text-[10px] font-black uppercase tracking-[0.2em]">
            <span class="w-2 h-2 rounded-full bg-green-400" />
            CombolojoSPORT Insights
          </div>

          <h1 class="mt-6 text-4xl sm:text-5xl lg:text-7xl font-black leading-tight tracking-tight">
            CombolojoSPORT
            <span class="block text-green-400">Sports Blog</span>
          </h1>

          <p class="mt-7 mx-auto max-w-2xl text-slate-100 text-sm md:text-base leading-8">
            Stay connected with Ethiopian sports news, expert insights, fitness tips and stories from the CombolojoSPORT community.
          </p>

          <div class="mt-8 flex flex-wrap justify-center gap-3">
            <a href="#latest" class="inline-flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white px-6 py-3.5 rounded-xl font-black text-sm transition">
              Explore Insights
              <Icon name="lucide:arrow-down" class="w-4 h-4" />
            </a>

            <NuxtLink to="/events" class="inline-flex items-center gap-2 border border-white/20 bg-white/5 hover:bg-white/10 px-6 py-3.5 rounded-xl font-black text-sm transition">
              Find Events
              <Icon name="lucide:arrow-right" class="w-4 h-4" />
            </NuxtLink>
          </div>
        </div>

        <!-- STATS -->
        <div class="mt-14 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl">
          <div class="border border-white/10 bg-white/[0.05] rounded-xl p-4">
            <p class="text-xl font-black text-emerald-300">{{ blogs.length }}+</p>
            <p class="mt-1 text-[10px] uppercase tracking-widest text-slate-400 font-bold">Articles</p>
          </div>
          <div class="border border-white/10 bg-white/[0.05] rounded-xl p-4">
            <p class="text-xl font-black text-lime-300">{{ categories.length - 1 }}</p>
            <p class="mt-1 text-[10px] uppercase tracking-widest text-slate-400 font-bold">Categories</p>
          </div>
          <div class="border border-white/10 bg-white/[0.05] rounded-xl p-4">
            <p class="text-xl font-black text-blue-300">ETH</p>
            <p class="mt-1 text-[10px] uppercase tracking-widest text-slate-400 font-bold">Sports Community</p>
          </div>
          <div class="border border-white/10 bg-white/[0.05] rounded-xl p-4">
            <p class="text-xl font-black text-white">24/7</p>
            <p class="mt-1 text-[10px] uppercase tracking-widest text-slate-400 font-bold">Stay Connected</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════
         MOBILE APP BOOKING
         ═══════════════════════════════════════ -->
    <section class="bg-slate-50 py-14 md:py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div>
            <div class="flex items-center gap-2 text-emerald-600 text-[10px] font-black uppercase tracking-[0.2em]">
              <span class="w-7 h-px bg-emerald-500" />
              Mobile App Booking
            </div>
            <h2 class="mt-3 text-3xl md:text-5xl font-black text-slate-900 leading-tight">
              Discover on the Website.
              <span class="block text-emerald-600">Book on the App.</span>
            </h2>
            <p class="mt-4 max-w-2xl text-sm text-slate-500 leading-7">
              CombolojoSPORT helps you discover sports venues, events and sports content on the website. For actual venue booking, use the CombolojoSPORT mobile app.
            </p>
          </div>

          <div class="flex items-center gap-3 bg-white border border-slate-200 rounded-2xl px-5 py-4 self-start lg:self-auto">
            <div class="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Icon name="lucide:smartphone" class="w-6 h-6" />
            </div>
            <div>
              <p class="text-[9px] font-black uppercase tracking-widest text-slate-400">Booking Platform</p>
              <p class="mt-1 text-sm font-black text-slate-900">CombolojoSPORT Mobile App</p>
            </div>
          </div>
        </div>

        <!-- STEPS -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div v-for="step in bookingSteps" :key="step.id" class="group relative bg-white border border-slate-200 rounded-2xl p-6 hover:border-emerald-400 transition-all duration-300">
            <div class="flex items-center justify-between mb-7">
              <div class="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-xl">
                {{ step.icon }}
              </div>
              <span class="text-[10px] font-black text-slate-300 tracking-widest">{{ step.number }}</span>
            </div>
            <h3 class="text-xs font-black tracking-wider text-slate-900">{{ step.title }}</h3>
            <p class="mt-3 text-xs leading-6 text-slate-500">{{ step.desc }}</p>
            <div class="absolute bottom-0 left-6 right-6 h-0.5 bg-emerald-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
          </div>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════
         LATEST INSIGHTS
         ═══════════════════════════════════════ -->
    <section id="latest" class="bg-white border-y border-gray-200 py-14 md:py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <!-- HEADING -->
        <div class="mb-8">
          <div class="flex items-center gap-2 text-green-700 text-[10px] font-black uppercase tracking-[0.2em]">
            <span class="w-7 h-px bg-green-600" />
            Latest Stories
          </div>
          <h2 class="mt-3 text-3xl md:text-4xl font-black">Insights & News</h2>
          <p class="mt-2 text-sm text-slate-500">Useful stories, sports updates and practical tips for players and sports communities.</p>
        </div>

        <!-- FILTERS -->
        <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-10">
          <div role="tablist" class="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
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
                  : 'bg-white text-slate-600 border-gray-200 hover:border-green-400 hover:text-green-700',
              ]"
            >
              <span v-if="cat !== 'All'" class="mr-1">{{ categoryIcon(cat) }}</span>
              {{ cat }}
            </button>
          </div>

          <div class="relative w-full lg:w-80 flex-shrink-0">
            <Icon name="lucide:search" class="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              v-model="searchQuery"
              type="search"
              aria-label="Search articles"
              placeholder="Search stories..."
              class="w-full pl-11 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm text-slate-900 outline-none focus:bg-white focus:border-green-600 focus:ring-2 focus:ring-green-600/20 transition"
            />
          </div>
        </div>

        <!-- FEATURED ARTICLE -->
        <div v-if="featuredBlog && filteredBlogs.some(b => b.id === featuredBlog.id)" class="mb-12">
          <article class="group grid lg:grid-cols-2 bg-gray-50 border border-gray-200 rounded-2xl overflow-hidden">
            <!-- IMAGE -->
            <button
              type="button"
              @click="openBlog(featuredBlog)"
              class="relative min-h-[300px] lg:min-h-[430px] overflow-hidden bg-slate-200 text-left"
            >
              <img
                :src="featuredBlog.image"
                :alt="featuredBlog.title"
                loading="eager"
                decoding="async"
                class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />

              <div class="absolute top-5 left-5 inline-flex items-center gap-2 bg-green-600 text-white px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest">
                <span class="w-1.5 h-1.5 bg-white rounded-full" />
                Featured
              </div>

              <div class="absolute bottom-5 left-5">
                <span class="inline-block bg-black/30 backdrop-blur-md border border-white/20 px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest text-white">
                  {{ featuredBlog.category }}
                </span>
              </div>
            </button>

            <!-- CONTENT -->
            <div class="p-7 md:p-10 flex flex-col justify-center">
              <div class="flex items-center gap-3 text-[9px] font-black text-slate-400 uppercase tracking-widest">
                <span>{{ featuredBlog.date }}</span>
                <span class="w-1 h-1 rounded-full bg-slate-300" />
                <span>{{ featuredBlog.readTime }}</span>
              </div>

              <!-- CLICKABLE TITLE -->
              <button
                type="button"
                @click="openBlog(featuredBlog)"
                class="text-left"
              >
                <h3 class="mt-5 text-2xl md:text-4xl font-black leading-tight hover:text-emerald-600 transition">
                  {{ featuredBlog.title }}
                </h3>
              </button>

              <p class="mt-5 text-sm text-slate-500 leading-7 max-w-xl">
                {{ featuredBlog.excerpt }}
              </p>

              <div class="mt-8 pt-6 border-t border-slate-200 flex items-center justify-between gap-4">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-black text-xs">
                    {{ featuredBlog.author.charAt(0) }}
                  </div>
                  <div>
                    <p class="text-xs font-black">{{ featuredBlog.author }}</p>
                    <p class="text-[9px] uppercase tracking-wider font-bold text-slate-400">{{ featuredBlog.authorRole }}</p>
                  </div>
                </div>

                <!-- 🎯 READ STORY BUTTON — OPENS MODAL -->
                <button
                  type="button"
                  @click="openBlog(featuredBlog)"
                  class="inline-flex items-center gap-2 text-green-700 hover:text-green-800 text-xs font-black transition"
                >
                  Read Story
                  <Icon name="lucide:arrow-right" class="w-4 h-4" />
                </button>
              </div>
            </div>
          </article>
        </div>

        <!-- BLOG GRID -->
        <div v-if="otherBlogs.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <article
            v-for="blog in otherBlogs"
            :key="blog.id"
            class="group bg-white border border-gray-200 rounded-2xl overflow-hidden hover:border-green-400 transition-all duration-300"
          >
            <!-- IMAGE -->
            <button
              type="button"
              @click="openBlog(blog)"
              class="relative block w-full h-56 overflow-hidden bg-slate-100 text-left"
            >
              <img
                :src="blog.image"
                :alt="blog.title"
                loading="lazy"
                decoding="async"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-transparent" />
              <span class="absolute top-4 left-4 px-3 py-1.5 bg-white/90 backdrop-blur-md text-emerald-700 text-[9px] font-black uppercase tracking-widest rounded-lg">
                {{ blog.category }}
              </span>
            </button>

            <!-- CONTENT -->
            <div class="p-6">
              <div class="flex items-center gap-2 text-[9px] font-black text-slate-400 uppercase tracking-widest">
                <span>{{ blog.date }}</span>
                <span class="w-1 h-1 rounded-full bg-slate-300" />
                <span>{{ blog.readTime }}</span>
              </div>

              <!-- CLICKABLE TITLE -->
              <button
                type="button"
                @click="openBlog(blog)"
                class="text-left mt-4"
              >
                <h3 class="text-lg font-black leading-snug text-slate-900 group-hover:text-green-700 transition-colors">
                  {{ blog.title }}
                </h3>
              </button>

              <p class="mt-3 text-xs text-slate-500 leading-6 line-clamp-3">
                {{ blog.excerpt }}
              </p>

              <div class="mt-6 pt-5 border-t border-gray-100 flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <div class="w-8 h-8 rounded-full bg-green-100 text-green-700 flex items-center justify-center text-[10px] font-black">
                    {{ blog.author.charAt(0) }}
                  </div>
                  <div>
                    <p class="text-[10px] font-black text-slate-800">{{ blog.author }}</p>
                    <p class="text-[8px] font-bold uppercase tracking-wider text-slate-400">{{ blog.authorRole }}</p>
                  </div>
                </div>

                <!-- ARROW BUTTON -->
                <button
                  type="button"
                  @click="openBlog(blog)"
                  :aria-label="`Read story: ${blog.title}`"
                  class="w-9 h-9 rounded-full bg-gray-100 group-hover:bg-green-600 flex items-center justify-center text-slate-500 group-hover:text-white transition"
                >
                  <Icon name="lucide:arrow-right" class="w-4 h-4" />
                </button>
              </div>

              <!-- 🎯 EXPLICIT READ MORE — OPENS MODAL -->
              <button
                type="button"
                @click="openBlog(blog)"
                class="mt-5 inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-emerald-700 hover:text-emerald-900 transition"
              >
                Read More
                <Icon name="lucide:arrow-right" class="w-4 h-4" />
              </button>
            </div>
          </article>
        </div>

        <!-- EMPTY STATE -->
        <div v-if="filteredBlogs.length === 0" class="text-center py-16 bg-white rounded-3xl border border-gray-200">
          <div class="w-16 h-16 mx-auto rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center">
            <Icon name="lucide:search-x" class="w-7 h-7 text-slate-400" />
          </div>
          <h3 class="mt-5 text-xl font-black">No matching articles found</h3>
          <p class="mt-2 text-sm text-slate-500 max-w-md mx-auto">
            We couldn't find anything matching your search. Try another keyword or category.
          </p>
          <button @click="clearFilters" class="mt-6 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition">
            Reset Filters
          </button>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════
         CTA
         ═══════════════════════════════════════ -->
    <section class="bg-green-800 text-white py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="relative overflow-hidden rounded-2xl border border-green-600/40 bg-green-900/60 p-8 md:p-12">
          <div class="absolute -right-20 -top-20 w-64 h-64 rounded-full bg-green-400/10 blur-3xl pointer-events-none" />
          <div class="relative flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div class="max-w-2xl">
              <p class="text-green-300 text-[10px] font-black uppercase tracking-[0.2em]">CombolojoSPORT Mobile App</p>
              <h2 class="mt-3 text-3xl md:text-4xl font-black">Ready to Play?</h2>
              <p class="mt-3 text-sm md:text-base text-slate-300 leading-7">
                Discover sports venues and events on the website. When you are ready to reserve a playing slot, continue with the CombolojoSPORT mobile app.
              </p>
            </div>
            <div class="flex flex-wrap gap-3">
              <NuxtLink to="/venues" class="inline-flex items-center gap-2 bg-green-500 hover:bg-green-400 text-white px-6 py-3.5 rounded-xl text-xs font-black transition">
                Find a Venue
                <Icon name="lucide:map-pin" class="w-4 h-4" />
              </NuxtLink>
              <NuxtLink to="/download-app" class="inline-flex items-center gap-2 border border-white/20 bg-white/5 hover:bg-white/10 px-6 py-3.5 rounded-xl text-xs font-black transition">
                Get Mobile App
                <Icon name="lucide:smartphone" class="w-4 h-4" />
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════
         🎯 BLOG MODAL — ሙሉ ጽሑፍ
         ═══════════════════════════════════════ -->
    <Teleport to="body">
      <Transition
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition duration-200"
        leave-to-class="opacity-0"
      >
        <div
          v-if="isModalOpen && selectedBlog"
          class="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-slate-900/70 backdrop-blur-sm p-4 py-8"
          @click.self="closeBlog"
        >
          <Transition
            enter-active-class="transition duration-300 ease-out"
            enter-from-class="opacity-0 translate-y-4 scale-95"
            enter-to-class="opacity-100 translate-y-0 scale-100"
          >
            <div
              v-if="isModalOpen && selectedBlog"
              class="relative w-full max-w-4xl bg-white rounded-3xl overflow-hidden shadow-2xl my-8"
            >

              <!-- CLOSE BUTTON -->
              <button
                type="button"
                @click="closeBlog"
                class="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/90 backdrop-blur-md text-slate-700 hover:bg-red-500 hover:text-white flex items-center justify-center shadow-lg transition"
                aria-label="Close"
              >
                <Icon name="lucide:x" class="w-5 h-5" />
              </button>

              <!-- HERO -->
              <div class="relative h-64 md:h-80 overflow-hidden bg-slate-900">
                <img
                  :src="selectedBlog.image"
                  :alt="selectedBlog.title"
                  class="absolute inset-0 w-full h-full object-cover opacity-60"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/70 to-slate-900/30" />

                <div class="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white">
                  <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-600 text-white text-[10px] font-black uppercase tracking-widest">
                    {{ selectedBlog.category }}
                  </div>

                  <h1 class="mt-4 text-2xl md:text-4xl font-black leading-tight">
                    {{ selectedBlog.title }}
                  </h1>

                  <div class="mt-4 flex flex-wrap items-center gap-4 text-xs text-slate-300 font-bold">
                    <div class="flex items-center gap-2">
                      <div class="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center font-black text-xs">
                        {{ selectedBlog.author.charAt(0) }}
                      </div>
                      <span>{{ selectedBlog.author }}</span>
                    </div>
                    <span class="w-1 h-1 rounded-full bg-slate-500" />
                    <span>{{ selectedBlog.date }}</span>
                    <span class="w-1 h-1 rounded-full bg-slate-500" />
                    <span>{{ selectedBlog.readTime }}</span>
                  </div>
                </div>
              </div>

              <!-- BODY -->
              <div class="p-6 md:p-10">
                <!-- EXCERPT -->
                <p class="text-base md:text-lg text-slate-600 leading-8 font-medium border-l-4 border-emerald-500 pl-4 mb-8">
                  {{ selectedBlog.excerpt }}
                </p>

                <!-- CONTENT -->
                <div
                  class="prose prose-lg max-w-none
                         prose-headings:font-black prose-headings:text-slate-900
                         prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4
                         prose-p:text-slate-600 prose-p:leading-8 prose-p:mb-4
                         prose-strong:text-slate-900"
                  v-html="selectedBlog.content"
                />

                <!-- TAGS -->
                <div class="mt-10 pt-6 border-t border-slate-200">
                  <p class="text-xs font-black uppercase tracking-widest text-slate-400 mb-3">Tags</p>
                  <div class="flex flex-wrap gap-2">
                    <span
                      v-for="tag in selectedBlog.tags"
                      :key="tag"
                      class="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 text-xs font-bold"
                    >
                      #{{ tag }}
                    </span>
                  </div>
                </div>
              </div>

              <!-- RELATED -->
              <div v-if="relatedBlogs.length > 0" class="bg-slate-50 border-t border-slate-200 p-6 md:p-8">
                <h3 class="text-lg font-black text-slate-900">Related Articles</h3>
                <div class="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <button
                    v-for="related in relatedBlogs"
                    :key="related.id"
                    type="button"
                    @click="openBlog(related)"
                    class="group text-left bg-white border border-slate-200 rounded-xl overflow-hidden hover:border-emerald-400 hover:shadow-md transition"
                  >
                    <div class="h-24 overflow-hidden bg-slate-100">
                      <img
                        :src="related.image"
                        :alt="related.title"
                        class="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <div class="p-3">
                      <p class="text-[9px] font-black text-slate-400 uppercase tracking-widest">
                        {{ related.category }}
                      </p>
                      <p class="mt-1 text-xs font-black text-slate-900 line-clamp-2 leading-snug">
                        {{ related.title }}
                      </p>
                    </div>
                  </button>
                </div>
              </div>

              <!-- FOOTER -->
              <div class="flex justify-between items-center p-6 border-t border-slate-200 bg-white">
                <button
                  type="button"
                  @click="closeBlog"
                  class="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 text-sm font-bold transition"
                >
                  <Icon name="lucide:arrow-left" class="w-4 h-4" />
                  Back to Articles
                </button>

                <NuxtLink
                  to="/blog"
                  class="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl text-xs font-black transition"
                >
                  Browse All
                  <Icon name="lucide:arrow-right" class="w-4 h-4" />
                </NuxtLink>
              </div>

            </div>
          </Transition>
        </div>
      </Transition>
    </Teleport>

  </div>
</template>

<style scoped>
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.prose :deep(h2) {
  margin-top: 2rem;
  margin-bottom: 1rem;
}

.prose :deep(p) {
  margin-bottom: 1rem;
}

.prose :deep(strong) {
  font-weight: 900;
}
</style>