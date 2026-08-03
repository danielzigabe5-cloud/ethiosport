import React, { useState } from 'react';
import { 
  Search, 
  MapPin, 
  Calendar, 
  Clock, 
  Trophy, 
  CheckCircle2, 
  ShieldCheck, 
  Users, 
  Sparkles,
  ArrowRight,
  Star,
  Zap,
  PhoneCall
} from 'lucide-react';
import { Venue, GameMatch, EventItem } from '../types';

interface HomeViewProps {
  venues: Venue[];
  games: GameMatch[];
  events: EventItem[];
  onSelectVenue: (venue: Venue) => void;
  onNavigate: (tabId: string) => void;
  lang: 'am' | 'en';
}

export const HomeView: React.FC<HomeViewProps> = ({
  venues,
  games,
  events,
  onSelectVenue,
  onNavigate,
  lang
}) => {
  const [selectedSubcity, setSelectedSubcity] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredVenues = venues.filter((v) => {
    const matchesSubcity = selectedSubcity === 'All' || v.subcity === selectedSubcity;
    const matchesSearch = v.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          v.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSubcity && matchesSearch;
  });

  return (
    <div className="space-y-16 pb-12">
      
      {/* HERO SECTION */}
      <section className="relative min-h-[580px] rounded-3xl overflow-hidden bg-gradient-to-b from-[#131c27] via-[#0b111a] to-[#0b111a] border border-[#212e3e] p-6 sm:p-12 flex flex-col justify-center shadow-2xl">
        
        {/* Background Decorative Glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 text-xs font-bold tracking-wide">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>
              {lang === 'am' ? 'በአዲስ አበባ እና ዙሪያዋ ላሉ የስፖርት ሜዳዎች' : 'No. 1 Booking Platform in Addis Ababa & Regional Cities'}
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-white leading-tight tracking-tight">
            {lang === 'am' ? (
              <>
                ሜዳዎን በቅጽበት <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-400">ያዝዙ፣</span> ጨዋታዎችን <span className="text-emerald-400">ይቀላቀሉ!</span>
              </>
            ) : (
              <>
                Book Premier Pitches <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-400">Instantly,</span> Join Active <span className="text-emerald-400">Matches!</span>
              </>
            )}
          </h1>

          <p className="text-gray-300 text-base sm:text-lg max-w-2xl leading-relaxed">
            {lang === 'am'
              ? 'በአቅራቢያዎ ያሉ የሰው ሰራሽ እና ተፈጥሮ ሳር ሜዳዎችን ይፈልጉ፣ በቴሌብር ይክፈሉ፣ ወይም ለጨዋታ የሚጎድሏቸውን ተጫዋቾች በደቂቃዎች ውስጥ ያግኙ።'
              : 'Discover top synthetic & grass pitches across Bole, Sarbet, Summit & Kasanchis. Book 24/7 with telebirr & play without hassle.'}
          </p>

          {/* Quick Search Bar */}
          <div className="pt-2">
            <div className="p-3 bg-[#15212e]/90 border border-[#212e3e] rounded-2xl shadow-xl backdrop-blur-md grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
              <div className="sm:col-span-5 relative">
                <Search className="w-4 h-4 text-emerald-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder={lang === 'am' ? 'የሜዳ ስም ወይም ቦታ ይፈልጉ...' : 'Search venue name or area...'}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#0b111a] border border-[#212e3e] rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="sm:col-span-4 relative">
                <MapPin className="w-4 h-4 text-emerald-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <select
                  value={selectedSubcity}
                  onChange={(e) => setSelectedSubcity(e.target.value)}
                  className="w-full bg-[#0b111a] border border-[#212e3e] rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-500 appearance-none"
                >
                  <option value="All">{lang === 'am' ? 'ሁሉንም ክፍለ ከተሞች' : 'All Subcities'}</option>
                  <option value="Bole">Bole (ቦሌ)</option>
                  <option value="Kirkos">Kirkos / Sarbet (ቂርቆስ)</option>
                  <option value="Yeka">Yeka / Summit (የካ)</option>
                  <option value="Nifas Silk">Nifas Silk (ንፋስ ስልክ)</option>
                  <option value="Hawassa">Hawassa (ሀዋሳ)</option>
                </select>
              </div>

              <div className="sm:col-span-3">
                <button
                  onClick={() => onNavigate('venues')}
                  className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black py-3 px-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 text-sm"
                >
                  <span>{lang === 'am' ? 'ሜዳ ፈልግ' : 'Find Pitches'}</span>
                  <ArrowRight className="w-4 h-4 text-slate-950" />
                </button>
              </div>
            </div>
          </div>

          {/* Platform Quick Stats */}
          <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-[#212e3e]/80">
            <div>
              <span className="text-2xl font-black text-emerald-400">50+</span>
              <p className="text-xs text-gray-400">{lang === 'am' ? 'የተረጋገጡ ሜዳዎች' : 'Verified Pitches'}</p>
            </div>
            <div>
              <span className="text-2xl font-black text-amber-400">12,500+</span>
              <p className="text-xs text-gray-400">{lang === 'am' ? 'የተያዙ ጨዋታዎች' : 'Matches Played'}</p>
            </div>
            <div>
              <span className="text-2xl font-black text-emerald-400">10,000+</span>
              <p className="text-xs text-gray-400">{lang === 'am' ? 'ተጫዋቾች' : 'Active Players'}</p>
            </div>
            <div>
              <span className="text-2xl font-black text-amber-400">4.9 ★</span>
              <p className="text-xs text-gray-400">{lang === 'am' ? 'አማካኝ ደረጃ' : 'User Rating'}</p>
            </div>
          </div>

        </div>
      </section>

      {/* FEATURED PITCHES SECTION */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
          <div>
            <span className="text-xs font-extrabold text-emerald-400 uppercase tracking-widest">
              {lang === 'am' ? 'ምርጥ ሜዳዎች' : 'Top Tier Pitches'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
              {lang === 'am' ? 'ታዋቂ የሰው ሰራሽ እና ተፈጥሮ ሳር ሜዳዎች' : 'Popular Football & Futsal Grounds'}
            </h2>
          </div>
          <button
            onClick={() => onNavigate('venues')}
            className="flex items-center gap-2 text-sm font-bold text-emerald-400 hover:text-emerald-300 transition-colors"
          >
            <span>{lang === 'am' ? 'ሁሉንም ሜዳዎች ተመልከት' : 'View All Venues'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVenues.slice(0, 3).map((venue) => (
            <div
              key={venue.id}
              className="group bg-[#131c27] border border-[#212e3e] hover:border-emerald-500/50 rounded-2xl overflow-hidden shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
            >
              <div>
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={venue.image}
                    alt={venue.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-[#0b111a]/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-emerald-400 border border-emerald-500/30">
                    {venue.turfType}
                  </div>
                  <div className="absolute top-3 right-3 bg-amber-500 text-slate-950 px-2.5 py-1 rounded-full text-xs font-black flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-slate-950" />
                    <span>{venue.rating}</span>
                  </div>
                </div>

                <div className="p-5 space-y-3">
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                      <MapPin className="w-3.5 h-3.5" />
                      {venue.subcity}, {venue.city}
                    </span>
                    <span>{venue.capacity}</span>
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors">
                    {lang === 'am' ? venue.nameAm || venue.name : venue.name}
                  </h3>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {venue.amenities.slice(0, 3).map((amenity, idx) => (
                      <span
                        key={idx}
                        className="bg-[#0b111a] border border-[#212e3e] text-gray-300 text-[11px] px-2.5 py-1 rounded-lg"
                      >
                        {amenity}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0 border-t border-[#212e3e]/50 flex items-center justify-between mt-3">
                <div>
                  <span className="text-xs text-gray-400 block">{lang === 'am' ? 'በሰዓት' : 'Per Hour'}</span>
                  <span className="text-lg font-black text-emerald-400">{venue.pricePerHour} ETB</span>
                </div>
                <button
                  onClick={() => onSelectVenue(venue)}
                  className="bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-black text-xs py-2.5 px-4 rounded-xl transition-colors shadow-md flex items-center gap-1.5"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{lang === 'am' ? 'አሁኑኑ ያዝዙ' : 'Book Pitch'}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* NEED PLAYERS / PICKUP GAMES TICKER SECTION */}
      <section className="bg-gradient-to-r from-[#131c27] via-[#162333] to-[#131c27] border border-[#212e3e] rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[#212e3e] pb-5">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 uppercase tracking-widest">
              <Zap className="w-4 h-4 fill-amber-400" />
              <span>{lang === 'am' ? 'ቀጥታ ጨዋታዎች' : 'Live Pickup Matches'}</span>
            </div>
            <h2 className="text-2xl font-black text-white mt-1">
              {lang === 'am' ? 'ተጫዋች የሚጎድላቸው ጨዋታዎች' : 'Open Games Looking for Players'}
            </h2>
          </div>
          <button
            onClick={() => onNavigate('games')}
            className="bg-[#0b111a] hover:bg-[#1c2838] border border-[#212e3e] text-emerald-400 font-bold text-xs py-2 px-4 rounded-xl transition-colors"
          >
            {lang === 'am' ? 'ሁሉንም ጨዋታዎች ተመልከት' : 'View All Pickup Games'}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {games.map((game) => (
            <div
              key={game.id}
              className="bg-[#0b111a] border border-[#212e3e] hover:border-amber-500/40 rounded-2xl p-5 space-y-3 transition-all"
            >
              <div className="flex items-center justify-between">
                <span className="bg-amber-500/10 border border-amber-500/30 text-amber-400 font-extrabold text-xs px-2.5 py-1 rounded-full">
                  {game.playersNeeded} {lang === 'am' ? 'ተጫዋች ይጎድላል' : 'players needed'}
                </span>
                <span className="text-xs text-gray-400 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-emerald-400" />
                  {game.time}
                </span>
              </div>

              <h4 className="font-bold text-white text-base">{game.title}</h4>

              <div className="text-xs text-gray-300 space-y-1">
                <p className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>{game.venueName} ({game.subcity})</span>
                </p>
                <p className="flex items-center gap-1.5 text-gray-400">
                  <Users className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>{game.organizer} · Level: {game.skillLevel}</span>
                </p>
              </div>

              <div className="pt-2 border-t border-[#212e3e] flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-400">
                  {game.pricePerPlayer} ETB / player
                </span>
                <a
                  href={`tel:${game.organizerPhone}`}
                  className="bg-emerald-600/20 hover:bg-emerald-600 text-emerald-300 hover:text-slate-950 font-extrabold text-xs py-1.5 px-3 rounded-xl border border-emerald-500/30 transition-all flex items-center gap-1"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>{lang === 'am' ? 'ደውል / ተቀላቀል' : 'Call & Join'}</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* WHY CHOOSE ETHIO-MEDA */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#131c27] border border-[#212e3e] p-6 rounded-2xl space-y-3">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white">
            {lang === 'am' ? 'የተረጋገጠ 24/7 ማስያዣ' : 'Instant 24/7 Booking'}
          </h3>
          <p className="text-xs text-gray-400 leading-relaxed">
            {lang === 'am'
              ? 'በማንኛውም ሰዓት እና ቦታ የሜዳ ክፍለ ጊዜዎን በደቂቃዎች ውስጥ ያስይዙ።'
              : 'Lock in pitch slots instantly day or night with direct confirmation SMS.'}
          </p>
        </div>

        <div className="bg-[#131c27] border border-[#212e3e] p-6 rounded-2xl space-y-3">
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white">
            {lang === 'am' ? 'በቴሌብር ቀላል ክፍያ' : 'Telebirr & CBE Payment'}
          </h3>
          <p className="text-xs text-gray-400 leading-relaxed">
            {lang === 'am'
              ? 'በቴሌብር እና ሲቢኢ ብር ክፍያዎን በደህነነት ይፈጽሙ።'
              : 'Pay securely using Telebirr, CBE Birr or cash directly at the venue.'}
          </p>
        </div>

        <div className="bg-[#131c27] border border-[#212e3e] p-6 rounded-2xl space-y-3">
          <div className="w-12 h-12 rounded-xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400">
            <Trophy className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white">
            {lang === 'am' ? 'የኩነቶች እና ሊግ አዘጋጅ' : 'Tournaments & Leagues'}
          </h3>
          <p className="text-xs text-gray-400 leading-relaxed">
            {lang === 'am'
              ? 'ለድርጅቶች እና ወጣቶች የተዘጋጁ ውድድሮችን ይቀላቀሉ።'
              : 'Participate in corporate cups and weekend leagues with cash prize pools.'}
          </p>
        </div>
      </section>

    </div>
  );
};
