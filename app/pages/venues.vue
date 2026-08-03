import React, { useState } from 'react';
import { 
  MapPin, 
  Search, 
  Filter, 
  Star, 
  CheckCircle, 
  Calendar, 
  Moon, 
  Sparkles,
  Phone,
  Info
} from 'lucide-react';
import { Venue } from '../types';

interface VenuesViewProps {
  venues: Venue[];
  onSelectVenue: (venue: Venue) => void;
  lang: 'am' | 'en';
}

export const VenuesView: React.FC<VenuesViewProps> = ({ venues, onSelectVenue, lang }) => {
  const [selectedSubcity, setSelectedSubcity] = useState('All');
  const [selectedTurf, setSelectedTurf] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [maxPrice, setMaxPrice] = useState(3000);
  const [nightLightingOnly, setNightLightingOnly] = useState(false);

  const filteredVenues = venues.filter((v) => {
    const matchesSubcity = selectedSubcity === 'All' || v.subcity === selectedSubcity;
    const matchesTurf = selectedTurf === 'All' || v.turfType === selectedTurf;
    const matchesSearch = v.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          v.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          v.nameAm.includes(searchQuery);
    const matchesPrice = v.pricePerHour <= maxPrice;
    const matchesLighting = !nightLightingOnly || v.lighting;

    return matchesSubcity && matchesTurf && matchesSearch && matchesPrice && matchesLighting;
  });

  return (
    <div className="space-y-8">
      
      {/* Page Header */}
      <div className="bg-[#131c27] border border-[#212e3e] p-6 sm:p-8 rounded-3xl space-y-3 shadow-xl">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 uppercase tracking-widest">
          <MapPin className="w-4 h-4" />
          <span>{lang === 'am' ? 'የሜዳዎች ዝርዝር' : 'Ethiopia Sports Grounds Directory'}</span>
        </div>
        <h1 className="text-3xl font-black text-white">
          {lang === 'am' ? 'በአቅራቢያዎ ያሉ ሜዳዎችን ይፈልጉ እና ያዝዙ' : 'Find & Reserve Sports Venues'}
        </h1>
        <p className="text-xs sm:text-sm text-gray-300 max-w-2xl">
          {lang === 'am'
            ? 'ሰው ሰራሽ ሳር፣ የተፈጥሮ ሳር እና የቤት ውስጥ (Indoor) ፉትሳል ሜዳዎችን በክፍለ ከተማ እና በዋጋ ይለዩ።'
            : 'Explore synthetic turf pitches, natural grass fields, and indoor futsal courts across Addis Ababa.'}
        </p>
      </div>

      {/* Filter Controls Bar */}
      <div className="bg-[#131c27] border border-[#212e3e] p-4 sm:p-5 rounded-2xl shadow-lg space-y-4">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Search Input */}
          <div className="relative">
            <Search className="w-4 h-4 text-emerald-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={lang === 'am' ? 'በስም ወይም ቦታ ይፈልጉ...' : 'Search venue name...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#0b111a] border border-[#212e3e] rounded-xl pl-10 pr-3 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          {/* Subcity Filter */}
          <div>
            <select
              value={selectedSubcity}
              onChange={(e) => setSelectedSubcity(e.target.value)}
              className="w-full bg-[#0b111a] border border-[#212e3e] rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
            >
              <option value="All">{lang === 'am' ? 'ሁሉንም ክፍለ ከተሞች' : 'All Subcities'}</option>
              <option value="Bole">Bole (ቦሌ)</option>
              <option value="Kirkos">Kirkos / Sarbet (ቂርቆስ)</option>
              <option value="Yeka">Yeka / Summit (የካ)</option>
              <option value="Nifas Silk">Nifas Silk (ንፋስ ስልክ)</option>
              <option value="Hawassa">Hawassa (ሀዋሳ)</option>
            </select>
          </div>

          {/* Turf Type Filter */}
          <div>
            <select
              value={selectedTurf}
              onChange={(e) => setSelectedTurf(e.target.value)}
              className="w-full bg-[#0b111a] border border-[#212e3e] rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
            >
              <option value="All">{lang === 'am' ? 'ሁሉንም የሳር ዓይነቶች' : 'All Turf Types'}</option>
              <option value="Synthetic">Synthetic (ሰው ሰራሽ ሳር)</option>
              <option value="Natural Grass">Natural Grass (ተፈጥሮ ሳር)</option>
              <option value="Indoor Futsal">Indoor Futsal (ኢንዶር)</option>
            </select>
          </div>

          {/* Night Lighting Toggle */}
          <button
            onClick={() => setNightLightingOnly(!nightLightingOnly)}
            className={`w-full py-2.5 px-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-2 ${
              nightLightingOnly
                ? 'bg-emerald-950/60 border-emerald-500 text-emerald-300'
                : 'bg-[#0b111a] border-[#212e3e] text-gray-400 hover:text-white'
            }`}
          >
            <Moon className="w-3.5 h-3.5 text-amber-400" />
            <span>{lang === 'am' ? 'የምሽት መብራት ያላቸው ብቻ' : 'Floodlight Only'}</span>
          </button>
        </div>

        {/* Max Price Slider */}
        <div className="pt-2 border-t border-[#212e3e] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <span className="text-gray-400 font-semibold">{lang === 'am' ? 'ከፍተኛ ዋጋ:' : 'Max Price:'}</span>
            <span className="font-extrabold text-emerald-400">{maxPrice} ETB / hr</span>
          </div>
          <input
            type="range"
            min="1000"
            max="3000"
            step="100"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="w-full sm:w-64 accent-emerald-500 cursor-pointer"
          />
        </div>

      </div>

      {/* Venues Grid */}
      {filteredVenues.length === 0 ? (
        <div className="bg-[#131c27] border border-[#212e3e] rounded-2xl p-12 text-center text-gray-400 space-y-3">
          <Info className="w-8 h-8 text-amber-400 mx-auto" />
          <h4 className="text-base font-bold text-white">
            {lang === 'am' ? 'ምንም ሜዳ አልተገኘም' : 'No Venues Found'}
          </h4>
          <p className="text-xs">
            {lang === 'am' ? 'እባክዎን ማጣሪያዎቹን አስተካክለው ድጋሚ ይሞክሩ።' : 'Try adjusting your subcity, turf type or price range filter.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVenues.map((venue) => (
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
                  {venue.lighting && (
                    <div className="absolute bottom-3 left-3 bg-amber-500/90 text-slate-950 px-2 py-0.5 rounded-full text-[10px] font-black flex items-center gap-1">
                      <Moon className="w-3 h-3 fill-slate-950" />
                      <span>Floodlights</span>
                    </div>
                  )}
                  <div className="absolute top-3 right-3 bg-amber-500 text-slate-950 px-2.5 py-1 rounded-full text-xs font-black flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-slate-950" />
                    <span>{venue.rating} ({venue.reviewsCount})</span>
                  </div>
                </div>

                <div className="p-5 space-y-3">
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                      <MapPin className="w-3.5 h-3.5" />
                      {venue.location}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors">
                    {lang === 'am' ? venue.nameAm || venue.name : venue.name}
                  </h3>

                  <div className="space-y-1.5 pt-1">
                    <span className="text-xs text-gray-400 block font-semibold">
                      {lang === 'am' ? 'አገልግሎቶች:' : 'Amenities:'}
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {venue.amenities.map((amenity, idx) => (
                        <span
                          key={idx}
                          className="bg-[#0b111a] border border-[#212e3e] text-gray-300 text-[10px] px-2 py-0.5 rounded-md"
                        >
                          {amenity}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Available Slots */}
                  <div className="pt-2">
                    <span className="text-[11px] text-emerald-400 font-bold block mb-1">
                      {lang === 'am' ? 'ክፍት ሰዓቶች (ዛሬ):' : 'Available Slots Today:'}
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {venue.availableSlots.slice(0, 3).map((slot, idx) => (
                        <span
                          key={idx}
                          className="bg-emerald-950/40 text-emerald-300 border border-emerald-500/30 text-[10px] px-2 py-0.5 rounded"
                        >
                          {slot}
                        </span>
                      ))}
                    </div>
                  </div>

                </div>
              </div>

              <div className="p-5 pt-0 border-t border-[#212e3e]/50 flex items-center justify-between mt-4">
                <div>
                  <span className="text-xs text-gray-400 block">{lang === 'am' ? 'በሰዓት' : 'Per Hour'}</span>
                  <span className="text-lg font-black text-emerald-400">{venue.pricePerHour} ETB</span>
                </div>
                <button
                  onClick={() => onSelectVenue(venue)}
                  className="bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-black text-xs py-2.5 px-4 rounded-xl transition-colors shadow-md flex items-center gap-1.5"
                >
                  <Calendar className="w-3.5 h-3.5 text-slate-950" />
                  <span>{lang === 'am' ? 'ሜዳውን ያዝዙ' : 'Book Pitch'}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
