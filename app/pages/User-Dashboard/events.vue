<template>
  <div class="min-h-screen bg-[#06090e] text-slate-100 py-8 px-4 sm:px-6 lg:px-8">
    <div class="max-w-7xl mx-auto space-y-12">

      <!-- 1. HERO & SEARCH / FILTER SECTION -->
      <section class="space-y-6">
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 class="text-3xl sm:text-4xl font-extrabold text-white">
              የስፖርት <span class="text-emerald-500">Events</span> እና ዝግጅቶች
            </h1>
            <p class="text-slate-400 text-sm mt-1">በኢትዮጵያ የስፖርት ሜዳዎች የሚካሄዱ ኩነቶችን ይከታተሉ፣ ትኬት ይቁረጡ!</p>
          </div>

          <!-- ACTION BUTTONS (Host Event & Create Match Request) -->
          <div class="flex flex-wrap items-center gap-3 self-start md:self-auto">
            <!-- MATCHMAKING BUTTON -->
            <button 
              @click="isMatchModalOpen = true"
              class="inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-emerald-400 font-semibold px-5 py-3 rounded-xl transition shadow-lg cursor-pointer text-sm"
            >
              <span>⚽</span> የጨዋታ ቡድን / ተጋጣሚ ፈልግ
            </button>

            <!-- HOST AN EVENT BUTTON -->
            <button 
              @click="isSubmitModalOpen = true"
              class="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold px-5 py-3 rounded-xl transition shadow-lg shadow-emerald-900/30 cursor-pointer text-sm"
            >
              <span>+</span> የራስዎን Event ያስመዝግቡ
            </button>
          </div>
        </div>

        <!-- Filter Bar -->
        <div class="bg-[#0b0f19] border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-xl space-y-4">
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
            
            <!-- Search Input -->
            <div class="xl:col-span-1">
              <label class="block text-xs font-medium text-slate-400 mb-1">ዝግጅት ይፈልጉ</label>
              <input 
                v-model="searchQuery" 
                type="text" 
                placeholder="በስም ወይም አዘጋጅ..." 
                class="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <!-- Sport Filter -->
            <div>
              <label class="block text-xs font-medium text-slate-400 mb-1">የስፖርት አይነት</label>
              <select v-model="selectedSport" class="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-emerald-500">
                <option value="All">ሁሉም ስፖርቶች</option>
                <option value="እግር ኳስ">እግር ኳስ</option>
                <option value="አትሌቲክስ">አትሌቲክስ</option>
                <option value="ባስኬትቦል">ባስኬትቦል</option>
                <option value="ቮሊቦል">ቮሊቦል</option>
                <option value="እጅ ኳስ (Handball)">እጅ ኳስ (Handball)</option>
                <option value="ጠረጴዛ ቴኒስ">ጠረጴዛ ቴኒስ</option>
                <option value="ውሀ ዋና">ውሀ ዋና</option>
                <option value="ቦክስ / ማርሻል አርት">ቦክስ / ማርሻል አርት</option>
                <option value="ብስክሌት">ብስክሌት</option>
                <option value="የባህል ስፖርቶች (ገና/ትግል)">የባህል ስፖርቶች (ገና/ትግል)</option>
              </select>
            </div>

            <!-- Location Filter -->
            <div>
              <label class="block text-xs font-medium text-slate-400 mb-1">ቦታ / ከተማ</label>
              <select v-model="selectedLocation" @change="onLocationChange" class="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-emerald-500">
                <option value="All">ሁሉም ሜዳ ያላቸው ከተሞች</option>
                <option value="አዲስ አበባ">አዲስ አበባ (ስታዲየሞች)</option>
                <option value="ሐዋሳ">ሐዋሳ (ሐዋሳ ስታዲየም)</option>
                <option value="ድሬዳዋ">ድሬዳዋ (ድሬዳዋ ስታዲየም)</option>
                <option value="ባህር ዳር">ባህር ዳር (ባህር ዳር ዓለም አቀፍ ስታዲየም)</option>
                <option value="መቄሌ">መቄሌ (ትግራይ ስታዲየም)</option>
                <option value="አዳማ">አዳማ (አዳማ አበበ ቢቂላ ስታዲየም)</option>
                <option value="ጎንደር">ጎንደር (ፋሲለደስ ስታዲየም)</option>
                <option value="ጅማ">ጅማ (ጅማ ስታዲየም)</option>
              </select>
            </div>

            <!-- Addis Ababa Sub-City Filter -->
            <div v-if="selectedLocation === 'አዲስ አበባ'">
              <label class="block text-xs font-medium text-emerald-400 mb-1">የአዲስ አበባ ክፍለ ከተማ</label>
              <select v-model="selectedSubCity" class="w-full bg-slate-900 border border-emerald-500/50 rounded-lg px-3 py-2.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-emerald-500">
                <option value="All">ሁሉም ክፍለ ከተሞች</option>
                <option value="አራዳ">አራዳ (አዲስ አበባ ስታዲየም)</option>
                <option value="ኪርኮስ">ኪርኮስ (መስቀል አደባባይ / ያያ ቪሌጅ)</option>
                <option value="ቦሌ">ቦሌ (ቦሌ ሚሊኒየም / ወጣቶች ማዕከል)</option>
                <option value="ልደታ">ልደታ (አበበ ቢቂላ ስታዲየም)</option>
                <option value="የካ">የካ (ያያ አትሌቲክስ ቪሌጅ)</option>
                <option value="አቃቂ ቃሊቲ">አቃቂ ቃሊቲ (አቃቂ ስታዲየም)</option>
                <option value="ኮልፌ ቀራኒዮ">ኮልፌ ቀራኒዮ (ኮልፌ ሜዳ)</option>
                <option value="ንፋስ ስልክ">ንፋስ ስልክ (ላፍቶ ስፖርት ማዕከል)</option>
                <option value="አዲስ ከተማ">አዲስ ከተማ (አዲስ ከተማ ሜዳ)</option>
                <option value="ጉለሌ">ጉለሌ (እንጦጦ ፓርክ ስፖርት ማዕከል)</option>
              </select>
            </div>

            <!-- Event Purpose Filter -->
            <div>
              <label class="block text-xs font-medium text-slate-400 mb-1">የኢቨንቱ ዓላማ</label>
              <select v-model="selectedCategory" class="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-emerald-500">
                <option value="All">ሁሉም ዓይነቶች</option>
                <option value="Fun">የመዝናኛ (Fun)</option>
                <option value="Business">የቢዝነስ እና ኤክስፖ</option>
                <option value="Competition">የውድድር እና ጨዋታ</option>
              </select>
            </div>

            <!-- Status Filter -->
            <div>
              <label class="block text-xs font-medium text-slate-400 mb-1">ሁኔታ (Status)</label>
              <select v-model="selectedStatus" class="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-emerald-500">
                <option value="All">ሁሉም</option>
                <option value="Upcoming">መጪ (Upcoming)</option>
                <option value="Ontime">አሁን እየተካሄደ ያለ (Live / On-Time)</option>
                <option value="Past">ያለፉ (Past)</option>
              </select>
            </div>

          </div>
        </div>
      </section>

      <!-- 2. FEATURED / HERO EVENT -->
      <section v-if="featuredEvent" class="relative overflow-hidden rounded-3xl bg-[#0b0f19] border border-slate-800 shadow-2xl">
        <div class="grid grid-cols-1 lg:grid-cols-12 items-center">
          <div class="lg:col-span-7 p-6 sm:p-10 space-y-4">
            <div class="flex items-center gap-2">
              <span class="inline-block px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold rounded-full">
                ★ ተመርጦ የቀረበ ኩነት
              </span>
              <span v-if="featuredEvent.status === 'Ontime'" class="bg-red-600 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full animate-pulse">
                ● LIVE NOW
              </span>
            </div>
            <h2 class="text-2xl sm:text-4xl font-extrabold text-white leading-tight">
              {{ featuredEvent.title }}
            </h2>
            <p class="text-slate-400 text-sm sm:text-base line-clamp-2">
              {{ featuredEvent.description }}
            </p>
            <div class="flex flex-wrap items-center gap-6 text-sm text-slate-300 pt-2">
              <div class="flex items-center gap-2">
                <span class="text-emerald-500">📅</span> {{ featuredEvent.date }} | {{ featuredEvent.time }}
              </div>
              <div class="flex items-center gap-2">
                <span class="text-emerald-500">📍</span> {{ featuredEvent.venue }} ({{ featuredEvent.subCity ? featuredEvent.subCity + '፣ ' : '' }}{{ featuredEvent.location }})
              </div>
            </div>
            <div class="pt-4 flex items-center gap-4">
              <button 
                @click="openDetail(featuredEvent)"
                class="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-6 py-3 rounded-xl transition text-sm"
              >
                የ {{ featuredEvent.sport }} ትኬት ይቁረጡ
              </button>
            </div>
          </div>
          <div class="lg:col-span-5 h-64 lg:h-full relative min-h-[250px]">
            <img :src="featuredEvent.image" :alt="featuredEvent.title" class="w-full h-full object-cover" />
            <div class="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#0b0f19] via-transparent to-transparent"></div>
          </div>
        </div>
      </section>

      <!-- 3. EVENT CARDS GRID -->
      <section class="space-y-6">
        <h3 class="text-xl font-bold text-white flex items-center gap-2">
          <span>🏆</span> ዝግጅቶች ({{ filteredEvents.length }})
        </h3>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div 
            v-for="event in filteredEvents" 
            :key="event.id"
            class="bg-[#0b0f19] border border-slate-800 rounded-2xl overflow-hidden hover:border-slate-700 transition duration-300 flex flex-col justify-between"
          >
            <div>
              <!-- Image & Badges -->
              <div class="relative h-48 w-full overflow-hidden">
                <img :src="event.image" :alt="event.title" class="w-full h-full object-cover" />
                
                <div class="absolute top-3 left-3 flex items-center gap-2">
                  <span class="bg-slate-950/80 backdrop-blur-md border border-slate-800 px-3 py-1 rounded-full text-xs font-semibold text-emerald-400">
                    {{ event.date }}
                  </span>
                  <span v-if="event.status === 'Ontime'" class="bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full animate-pulse">
                    LIVE
                  </span>
                  <span v-else-if="event.status === 'Past'" class="bg-slate-800 text-slate-400 text-[10px] font-bold px-2 py-0.5 rounded-full">
                    ያለፈ
                  </span>
                </div>

                <div class="absolute top-3 right-3 bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                  {{ event.price }}
                </div>
              </div>

              <!-- Content -->
              <div class="p-5 space-y-3">
                <div class="flex items-center justify-between text-xs">
                  <span class="text-emerald-500 uppercase tracking-wider font-bold">{{ event.sport }}</span>
                  <span class="bg-slate-900 border border-slate-800 text-slate-400 px-2 py-0.5 rounded">{{ event.category }}</span>
                </div>
                <h4 class="text-lg font-bold text-white line-clamp-1">{{ event.title }}</h4>
                <div class="space-y-1 text-xs text-slate-400">
                  <p>📍 {{ event.venue }} <span v-if="event.subCity">({{ event.subCity }})</span> - {{ event.location }}</p>
                  <p>🏢 አዘጋጅ፦ {{ event.organizer }}</p>
                </div>
              </div>
            </div>

            <!-- Card Footer Dynamic Button -->
            <div class="p-5 pt-0 border-t border-slate-800/50 mt-4 flex items-center justify-between">
              <button 
                @click="openDetail(event)"
                class="w-full bg-slate-900 hover:bg-emerald-600 text-slate-200 hover:text-white font-medium py-2.5 rounded-xl transition text-xs text-center border border-slate-800"
              >
                የ {{ event.sport }} ትኬት ይቁረጡ
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- 4. EVENT DETAIL & BOOKING MODAL -->
      <div v-if="selectedEvent" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
        <div class="bg-[#0b0f19] border border-slate-800 w-full max-w-3xl rounded-3xl overflow-hidden max-h-[90vh] flex flex-col shadow-2xl">
          <div class="p-6 border-b border-slate-800 flex justify-between items-center">
            <h3 class="text-xl font-bold text-white">{{ selectedEvent.title }}</h3>
            <button @click="selectedEvent = null" class="text-slate-400 hover:text-white text-2xl font-bold">&times;</button>
          </div>

          <div class="p-6 overflow-y-auto space-y-6 text-sm text-slate-300">
            <img :src="selectedEvent.image" :alt="selectedEvent.title" class="w-full h-56 object-cover rounded-2xl" />

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-900/60 p-4 rounded-xl border border-slate-800">
              <p>⚽ <strong>የስፖርት አይነት፦</strong> {{ selectedEvent.sport }}</p>
              <p>📅 <strong>ቀን/ሰዓት፦</strong> {{ selectedEvent.date }} | {{ selectedEvent.time }}</p>
              <p>📍 <strong>ቦታ/ሜዳ፦</strong> {{ selectedEvent.venue }} {{ selectedEvent.subCity ? '(' + selectedEvent.subCity + ')' : '' }}, {{ selectedEvent.location }}</p>
              <p>🎟️ <strong>የመግቢያ ዋጋ፦</strong> {{ selectedEvent.price }}</p>
            </div>

            <div>
              <h4 class="text-white font-bold mb-2">ስለ ዝግጅቱ (Overview)</h4>
              <p class="leading-relaxed text-slate-400">{{ selectedEvent.description }}</p>
            </div>

            <!-- BOOKING FORM -->
            <div class="space-y-4 pt-4 border-t border-slate-800">
              <h4 class="text-white font-bold text-base">የ {{ selectedEvent.sport }} ትኬት ማስያዣ Form</h4>
              
              <div v-if="ticketBooked" class="bg-emerald-950/40 border border-emerald-500/40 rounded-2xl p-6 text-center space-y-4">
                <span class="text-4xl">🎉</span>
                <h5 class="text-lg font-bold text-emerald-400">በስኬት ተመዝግበዋል!</h5>
                <p class="text-xs text-slate-300">የ {{ selectedEvent.sport }} ዲጂታል QR Code ትኬትዎ፦</p>
                <div class="bg-white p-4 inline-block rounded-xl mx-auto shadow-lg">
                  <div class="w-32 h-32 bg-slate-950 flex items-center justify-center text-xs text-white text-center font-mono">
                    [QR CODE]<br/>{{ selectedEvent.sport }}-{{ selectedEvent.id }}
                  </div>
                </div>
                <button @click="ticketBooked = false" class="block mx-auto text-xs text-slate-400 underline">ሌላ ትኬት ቁረጥ</button>
              </div>

              <form v-else @submit.prevent="handleBooking" class="space-y-3">
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input v-model="bookingForm.name" type="text" placeholder="ሙሉ ስም" required class="bg-slate-900 border border-slate-800 rounded-lg px-3 py-2.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-emerald-500" />
                  <input v-model="bookingForm.phone" type="tel" placeholder="ስልክ ቁጥር" required class="bg-slate-900 border border-slate-800 rounded-lg px-3 py-2.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-emerald-500" />
                </div>

                <div>
                  <label class="block text-[11px] font-medium text-slate-400 mb-1">የሚታደሙበት ዋና ምክንያት (Purpose of Visit)</label>
                  <select v-model="bookingForm.purpose" class="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-emerald-500">
                    <option value="Fun">ለመዝናናት (For Fun / Entertainment)</option>
                    <option value="Business">ለቢዝነስ እና ኔትወርኪንግ (Business & Networking)</option>
                    <option value="Participation">በስፖርት ለመወዳደር/ለመሳተፍ (Active Participation)</option>
                    <option value="Sponsorship">ስፖንሰር ለማድረግ/ለማስተዋወቅ (Sponsorship / Media)</option>
                  </select>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <select v-model="bookingForm.ticketType" class="bg-slate-900 border border-slate-800 rounded-lg px-3 py-2.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-emerald-500">
                    <option value="Standard">Standard Ticket</option>
                    <option value="VIP">VIP Ticket</option>
                  </select>
                  <select v-model="bookingForm.payment" class="bg-slate-900 border border-slate-800 rounded-lg px-3 py-2.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-emerald-500">
                    <option value="Telebirr">Telebirr</option>
                    <option value="CBE Birr">CBE Birr</option>
                    <option value="Chapa">Chapa</option>
                  </select>
                </div>

                <button type="submit" class="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-xl transition text-xs">
                  ክፍያ ፈጽም እና የ {{ selectedEvent.sport }} QR ትኬት አውርድ
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <!-- 5. HOST AN EVENT POPUP MODAL -->
      <div v-if="isSubmitModalOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
        <div class="bg-[#0b0f19] border border-slate-800 w-full max-w-2xl rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative">
          
          <div class="flex justify-between items-center border-b border-slate-800 pb-4">
            <div>
              <h3 class="text-xl font-extrabold text-white">የእርስዎን የስፖርት ኩነት (Event) ያስመዝግቡ</h3>
              <p class="text-slate-400 text-xs mt-1">አዘጋጅ ነዎት? ውድድርዎን በ EthioSport Hub ላይ በመፖሰት ትኬት ይሽጡ!</p>
            </div>
            <button @click="isSubmitModalOpen = false" class="text-slate-400 hover:text-white text-2xl font-bold">&times;</button>
          </div>

          <form @submit.prevent="handleSubmitEvent" class="space-y-4 text-xs">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-slate-400 mb-1">የዝግጅቱ ስም</label>
                <input type="text" placeholder="የዝግጅቱ ስም ያስገቡ..." required class="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-white focus:outline-none focus:ring-1 focus:ring-emerald-500" />
              </div>
              
              <div>
                <label class="block text-slate-400 mb-1">የስፖርት አይነት</label>
                <select class="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-white focus:outline-none focus:ring-1 focus:ring-emerald-500">
                  <option>እግር ኳስ</option>
                  <option>አትሌቲክስ</option>
                  <option>ባስኬትቦል</option>
                  <option>ቮሊቦል</option>
                  <option>እጅ ኳስ (Handball)</option>
                  <option>ጠረጴዛ ቴኒስ</option>
                  <option>ውሀ ዋና</option>
                  <option>ቦክስ / ማርሻል አርት</option>
                  <option>ብስክሌት</option>
                  <option>የባህል ስፖርቶች</option>
                </select>
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label class="block text-slate-400 mb-1">ከተማ</label>
                <select class="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-white focus:outline-none focus:ring-1 focus:ring-emerald-500">
                  <option value="አዲስ አበባ">አዲስ አበባ</option>
                  <option value="ሐዋሳ">ሐዋሳ</option>
                  <option value="ድሬዳዋ">ድሬዳዋ</option>
                  <option value="ባህር ዳር">ባህር ዳር</option>
                  <option value="መቄሌ">መቄሌ</option>
                  <option value="አዳማ">አዳማ</option>
                </select>
              </div>

              <div>
                <label class="block text-slate-400 mb-1">የሜዳ/ስታዲየም ስም</label>
                <input type="text" placeholder="የሜዳው ስም" required class="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-white focus:outline-none focus:ring-1 focus:ring-emerald-500" />
              </div>

              <div>
                <label class="block text-slate-400 mb-1">የመግቢያ ዋጋ</label>
                <input type="text" placeholder="ለምሳሌ፦ 100 Birr" required class="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-white focus:outline-none focus:ring-1 focus:ring-emerald-500" />
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-slate-400 mb-1">የሚካሄድበት ቀን</label>
                <input type="date" required class="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-white focus:outline-none focus:ring-1 focus:ring-emerald-500" />
              </div>
              <div>
                <label class="block text-slate-400 mb-1">የሚጀምርበት ሰዓት</label>
                <input type="time" required class="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-white focus:outline-none focus:ring-1 focus:ring-emerald-500" />
              </div>
            </div>

            <div>
              <label class="block text-slate-400 mb-1">አጭር ማብራሪያ</label>
              <textarea placeholder="ስለ ዝግጅቱ አጭር ማብራሪያ ያስገቡ..." rows="3" class="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"></textarea>
            </div>

            <button type="submit" class="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3.5 rounded-xl transition text-sm shadow-lg shadow-emerald-900/30">
              ለግምገማ ላክ (Submit Event)
            </button>
          </form>
        </div>
      </div>

      <!-- 6. CREATE MATCH REQUEST MODAL -->
      <div v-if="isMatchModalOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
        <div class="bg-[#0b0f19] border border-slate-800 w-full max-w-2xl rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative">
          
          <!-- Header -->
          <div class="flex justify-between items-center border-b border-slate-800 pb-4">
            <div>
              <h3 class="text-xl font-extrabold text-white">የጨዋታ ቡድን / ጥሪ ይፍጠሩ</h3>
              <p class="text-slate-400 text-xs mt-1">ተጋጣሚ ቡድን፣ ተጨማሪ ተጫዋች ወይም የቡድን ጨዋታ እዚህ ያዘጋጁ!</p>
            </div>
            <button @click="isMatchModalOpen = false" class="text-slate-400 hover:text-white text-2xl font-bold">&times;</button>
          </div>

          <form @submit.prevent="handleCreateMatch" class="space-y-4 text-xs">
            
            <!-- 1. MATCH TYPE SELECTION -->
            <div>
              <label class="block text-slate-300 font-medium mb-1">የጨዋታው አይነት (Match Type)</label>
              <select v-model="matchForm.matchType" class="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-white focus:outline-none focus:ring-1 focus:ring-emerald-500">
                <option value="group_vs_group">ቡድን ከሌላ ቡድን ጋር (Group vs Group Opponent)</option>
                <option value="within_group">በራሳችን ቡድን ውስጥ (Internal Group Match)</option>
                <option value="solo_looking_for_group">አንድ ተጫዋች ነኝ - ቡድን እፈልጋለሁ (Solo Player Looking for Group)</option>
              </select>
            </div>

            <!-- 2. SPORT & LOCATION -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-slate-400 mb-1">የስፖርት አይነት</label>
                <select v-model="matchForm.sport" class="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-white focus:outline-none focus:ring-1 focus:ring-emerald-500">
                  <option value="እግር ኳስ">እግር ኳስ</option>
                  <option value="ባስኬትቦል">ባስኬትቦል</option>
                  <option value="ቮሊቦል">ቮሊቦል</option>
                  <option value="ቴኒስ">ቴኒስ</option>
                </select>
              </div>

              <div>
                <label class="block text-slate-400 mb-1">ቦታ / ከተማ</label>
                <select v-model="matchForm.location" class="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-white focus:outline-none focus:ring-1 focus:ring-emerald-500">
                  <option value="አዲስ አበባ">አዲስ አበባ</option>
                  <option value="ሐዋሳ">ሐዋሳ</option>
                  <option value="አዳማ">አዳማ</option>
                  <option value="ባህር ዳር">ባህር ዳር</option>
                </select>
              </div>
            </div>

            <!-- Dynamic Fields based on Match Type -->
            
            <!-- Case A: Solo Player -->
            <div v-if="matchForm.matchType === 'solo_looking_for_group'" class="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-900/40 p-4 rounded-2xl border border-slate-800">
              <div>
                <label class="block text-slate-400 mb-1">የሚጫወቱበት ቦታ (Preferred Position)</label>
                <input v-model="matchForm.playerPosition" type="text" placeholder="ለምሳሌ፦ ተከላካይ፣ ግብ ጠባቂ..." class="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-white focus:outline-none focus:ring-1 focus:ring-emerald-500" />
              </div>
              <div>
                <label class="block text-slate-400 mb-1">የጨዋታ ደረጃዎት (Skill Level)</label>
                <select v-model="matchForm.skillLevel" class="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-white focus:outline-none focus:ring-1 focus:ring-emerald-500">
                  <option value="Casual">መዝናናት (Casual)</option>
                  <option value="Intermediate">መካከለኛ (Intermediate)</option>
                  <option value="Advanced">ከፍተኛ / ፕሮ (Advanced)</option>
                </select>
              </div>
            </div>

            <!-- Case B: Group vs Group or Within Group -->
            <div v-else class="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-900/40 p-4 rounded-2xl border border-slate-800">
              <div>
                <label class="block text-slate-400 mb-1">የቡድንዎ ስም (Team Name)</label>
                <input v-model="matchForm.teamName" type="text" placeholder="የቡድን ስም ያስገቡ..." required class="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-white focus:outline-none focus:ring-1 focus:ring-emerald-500" />
              </div>

              <div v-if="matchForm.matchType === 'group_vs_group'">
                <label class="block text-slate-400 mb-1">የቡድንዎ አባላት ብዛት (Players Count)</label>
                <input v-model="matchForm.playersCount" type="number" placeholder="ለምሳሌ፦ 5v5 ወይም 11v11" class="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-white focus:outline-none focus:ring-1 focus:ring-emerald-500" />
              </div>

              <div v-if="matchForm.matchType === 'within_group'">
                <label class="block text-slate-400 mb-1">የሚጎድልዎት የተጫዋች ብዛት (Needed Players)</label>
                <input v-model="matchForm.neededPlayers" type="number" placeholder="ለምሳሌ፦ 3 ተጫዋች ይጎድለናል" class="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-white focus:outline-none focus:ring-1 focus:ring-emerald-500" />
              </div>
            </div>

            <!-- 3. VENUE / DATE / TIME -->
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label class="block text-slate-400 mb-1">የሜዳው ስም / ቦታ</label>
                <input v-model="matchForm.venue" type="text" placeholder="ሜዳ ከተያዘ ስሙን ያስገቡ" class="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-white focus:outline-none focus:ring-1 focus:ring-emerald-500" />
              </div>
              <div>
                <label class="block text-slate-400 mb-1">ቀን</label>
                <input v-model="matchForm.date" type="date" required class="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-white focus:outline-none focus:ring-1 focus:ring-emerald-500" />
              </div>
              <div>
                <label class="block text-slate-400 mb-1">ሰዓት</label>
                <input v-model="matchForm.time" type="time" required class="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-white focus:outline-none focus:ring-1 focus:ring-emerald-500" />
              </div>
            </div>

            <!-- 4. CONTACT & NOTES -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input v-model="matchForm.contactName" type="text" placeholder="የእርስዎ/የአዘጋጁ ስም" required class="bg-slate-900 border border-slate-800 rounded-xl p-3 text-white focus:outline-none focus:ring-1 focus:ring-emerald-500" />
              <input v-model="matchForm.phone" type="tel" placeholder="ስልክ ቁጥር" required class="bg-slate-900 border border-slate-800 rounded-xl p-3 text-white focus:outline-none focus:ring-1 focus:ring-emerald-500" />
            </div>

            <div>
              <label class="block text-slate-400 mb-1">ተጨማሪ መግለጫ (Notes)</label>
              <textarea v-model="matchForm.notes" placeholder="ለምሳሌ፦ የሜዳ ክፍያ እኩል እንካፈላለን..." rows="2" class="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"></textarea>
            </div>

            <button type="submit" class="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3.5 rounded-xl transition text-sm shadow-lg shadow-emerald-900/30">
              የጨዋታ ጥሪውን ለጥፍ (Post Match Request)
            </button>
          </form>

        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// Filters state
const searchQuery = ref('')
const selectedCategory = ref('All')
const selectedSport = ref('All')
const selectedLocation = ref('All')
const selectedSubCity = ref('All')
const selectedStatus = ref('All')

// Modals & Booking state
const selectedEvent = ref(null)
const isSubmitModalOpen = ref(false)
const isMatchModalOpen = ref(false)
const ticketBooked = ref(false)

const bookingForm = ref({
  name: '',
  phone: '',
  purpose: 'Fun',
  ticketType: 'Standard',
  payment: 'Telebirr'
})

// Matchmaking Form State
const matchForm = ref({
  matchType: 'group_vs_group',
  sport: 'እግር ኳስ',
  location: 'አዲስ አበባ',
  teamName: '',
  playersCount: '',
  neededPlayers: '',
  playerPosition: '',
  skillLevel: 'Casual',
  venue: '',
  date: '',
  time: '',
  contactName: '',
  phone: '',
  notes: ''
})

// Reset SubCity when location changes
const onLocationChange = () => {
  if (selectedLocation.value !== 'አዲስ አበባ') {
    selectedSubCity.value = 'All'
  }
}

// Mock Events Data
const eventsList = ref([
  {
    id: 1,
    title: 'ታላቁ ሩጫ በኢትዮጵያ 2026',
    sport: 'አትሌቲክስ',
    category: 'Fun',
    location: 'አዲስ አበባ',
    subCity: 'ኪርኮስ',
    venue: 'መስቀል አደባባይ',
    date: 'ህዳር 15, 2026',
    time: '2:00 AM',
    price: '350 Birr',
    status: 'Upcoming',
    organizer: 'Great Ethiopian Run',
    featured: true,
    image: 'https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?q=80&w=800&auto=format&fit=crop',
    description: 'በአፍሪካ ትልቁ የ10 ኪሎ ሜትር የጎዳና ላይ ሩጫ ውድድር።'
  },
  {
    id: 2,
    title: 'Ethio Premier League: ቅዱስ ጊዮርጊስ ከ ኢትዮጵያ ቡና',
    sport: 'እግር ኳስ',
    category: 'Competition',
    location: 'አዲስ አበባ',
    subCity: 'ልደታ',
    venue: 'አበበ ቢቂላ ስታዲየም',
    date: 'ዛሬ (አሁን)',
    time: '9:00 PM',
    price: '100 Birr',
    status: 'Ontime',
    organizer: 'የኢትዮጵያ እግር ኳስ ፌዴሬሽን',
    featured: false,
    image: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=800&auto=format&fit=crop',
    description: 'የኢትዮጵያ ፕሪሚየር ሊግ ታላቁ የደርቢ ጨዋታ።'
  },
  {
    id: 3,
    title: 'የሐዋሳ ሌክ ሲቲ ባስኬትቦል ቱርናመንት',
    sport: 'ባስኬትቦል',
    category: 'Competition',
    location: 'ሐዋሳ',
    subCity: '',
    venue: 'ሐዋሳ ስታዲየም ጂም',
    date: 'ታህሳስ 10, 2026',
    time: '8:00 AM',
    price: 'Free',
    status: 'Upcoming',
    organizer: 'Hawassa Basketball Club',
    featured: false,
    image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=800&auto=format&fit=crop',
    description: 'በደቡብ ክልል የተዘጋጀ ክፍት የባስኬትቦል ውድድር።'
  }
])

const featuredEvent = computed(() => eventsList.value.find(e => e.featured))

const filteredEvents = computed(() => {
  return eventsList.value.filter(e => {
    const matchesSearch = e.title.toLowerCase().includes(searchQuery.value.toLowerCase()) || e.organizer.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesCategory = selectedCategory.value === 'All' || e.category === selectedCategory.value
    const matchesSport = selectedSport.value === 'All' || e.sport === selectedSport.value
    const matchesLoc = selectedLocation.value === 'All' || e.location === selectedLocation.value
    const matchesSubCity = selectedSubCity.value === 'All' || e.subCity === selectedSubCity.value
    const matchesStatus = selectedStatus.value === 'All' || e.status === selectedStatus.value
    
    return matchesSearch && matchesCategory && matchesSport && matchesLoc && matchesSubCity && matchesStatus
  })
})

const openDetail = (event) => {
  selectedEvent.value = event
  ticketBooked.value = false
}

const handleBooking = () => {
  ticketBooked.value = true
}

const handleSubmitEvent = () => {
  alert('የአንተ Event ለግምገማ ተልኳል! እናመሰግናለን።')
  isSubmitModalOpen.value = false
}

const handleCreateMatch = () => {
  alert('የጨዋታ ጥሪው በስኬት ተለጥፏል!')
  isMatchModalOpen.value = false
}
</script>