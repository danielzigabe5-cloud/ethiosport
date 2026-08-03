import React, { useState } from 'react';
import { Users, MapPin, Clock, PhoneCall, PlusCircle, Search, Filter, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { GameMatch } from '../types';

interface GamesViewProps {
  games: GameMatch[];
  lang: 'am' | 'en';
}

export const GamesView: React.FC<GamesViewProps> = ({ games, lang }) => {
  const [filterSubcity, setFilterSubcity] = useState('All');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [matchTitle, setMatchTitle] = useState('');
  const [matchVenue, setMatchVenue] = useState('Sarbet Millennium Futsal Arena');
  const [neededPlayers, setNeededPlayers] = useState('2');
  const [organizerPhone, setOrganizerPhone] = useState('');
  const [organizerName, setOrganizerName] = useState('');
  const [createdMatches, setCreatedMatches] = useState<GameMatch[]>([]);

  const handleCreateMatch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!matchTitle || !organizerPhone) return;

    const newMatch: GameMatch = {
      id: `custom-${Date.now()}`,
      title: matchTitle,
      venueName: matchVenue,
      subcity: 'Kirkos',
      date: 'Today',
      time: '08:00 PM - 09:00 PM',
      playersNeeded: Number(neededPlayers),
      totalPlayers: 10,
      pricePerPlayer: 180,
      skillLevel: 'Intermediate',
      organizer: organizerName || 'Match Host',
      organizerPhone: organizerPhone,
      sport: '5v5 Futsal'
    };

    setCreatedMatches([newMatch, ...createdMatches]);
    setShowCreateForm(false);
    setMatchTitle('');
    setOrganizerPhone('');
  };

  const allGames = [...createdMatches, ...games].filter(
    (g) => filterSubcity === 'All' || g.subcity === filterSubcity
  );

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="bg-[#131c27] border border-[#212e3e] p-6 sm:p-8 rounded-3xl space-y-4 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 uppercase tracking-widest mb-1">
            <Users className="w-4 h-4" />
            <span>{lang === 'am' ? 'የተጫዋች ማገናኛ' : 'Pickup Matchmaking Feed'}</span>
          </div>
          <h1 className="text-3xl font-black text-white">
            {lang === 'am' ? 'ጨዋታዎችን ይቀላቀሉ ወይም ተጫዋች ይበሉ' : 'Join Pickup Games in Addis Ababa'}
          </h1>
          <p className="text-xs sm:text-sm text-gray-300">
            {lang === 'am'
              ? 'ለጨዋታዎ ተጫዋች ጎድሎዎታል? ወይም ብቻዎን ነዎት? በደቂቃዎች ውስጥ ይገናኙ።'
              : 'Looking for extra players to fill your futsal line-up? Or looking for a game to join tonight?'}
          </p>
        </div>

        <button
          onClick={() => setShowCreateForm(!showCreateForm)}
          className="bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-black px-5 py-3 rounded-xl shadow-lg transition-all flex items-center gap-2 text-xs shrink-0"
        >
          <PlusCircle className="w-4 h-4 text-slate-950" />
          <span>{lang === 'am' ? 'አዲስ ጨዋታ ይፍጠሩ' : 'Host a Match'}</span>
        </button>
      </div>

      {/* Host Match Modal / Form */}
      {showCreateForm && (
        <form onSubmit={handleCreateMatch} className="bg-[#131c27] border border-emerald-500/40 p-6 rounded-2xl space-y-4 shadow-2xl animate-in fade-in duration-200">
          <h3 className="text-lg font-extrabold text-white flex items-center gap-2">
            <PlusCircle className="w-5 h-5 text-emerald-400" />
            <span>{lang === 'am' ? 'አዲስ ጨዋታ ይለጥፉ' : 'Post an Open Game Slot'}</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-300 mb-1">{lang === 'am' ? 'የጨዋታው ርዕስ' : 'Game Title'} *</label>
              <input
                type="text"
                required
                placeholder="e.g. 5v5 Evening Futsal"
                value={matchTitle}
                onChange={(e) => setMatchTitle(e.target.value)}
                className="w-full bg-[#0b111a] border border-[#212e3e] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-300 mb-1">{lang === 'am' ? 'የሚፈለጉ ተጫዋቾች ብዛት' : 'Players Needed'}</label>
              <input
                type="number"
                min="1"
                max="10"
                value={neededPlayers}
                onChange={(e) => setNeededPlayers(e.target.value)}
                className="w-full bg-[#0b111a] border border-[#212e3e] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-300 mb-1">{lang === 'am' ? 'የአዘጋጁ ስም' : 'Your Name'}</label>
              <input
                type="text"
                placeholder="e.g. Yared"
                value={organizerName}
                onChange={(e) => setOrganizerName(e.target.value)}
                className="w-full bg-[#0b111a] border border-[#212e3e] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-300 mb-1">{lang === 'am' ? 'ስልክ ቁጥር' : 'Phone Number'} *</label>
              <input
                type="tel"
                required
                placeholder="+251 9..."
                value={organizerPhone}
                onChange={(e) => setOrganizerPhone(e.target.value)}
                className="w-full bg-[#0b111a] border border-[#212e3e] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setShowCreateForm(false)}
              className="px-4 py-2 rounded-xl bg-[#0b111a] text-xs font-bold text-gray-400 hover:text-white"
            >
              {lang === 'am' ? 'ሰርዝ' : 'Cancel'}
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-emerald-600 text-slate-950 font-black text-xs shadow-md"
            >
              {lang === 'am' ? 'ጨዋታውን ይለጥፉ' : 'Publish Game'}
            </button>
          </div>
        </form>
      )}

      {/* Subcity Filter */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 text-xs">
        <span className="text-gray-400 font-bold shrink-0">{lang === 'am' ? 'ክፍለ ከተማ:' : 'Subcity:'}</span>
        {['All', 'Bole', 'Kirkos', 'Yeka', 'Nifas Silk'].map((sub) => (
          <button
            key={sub}
            onClick={() => setFilterSubcity(sub)}
            className={`px-3.5 py-1.5 rounded-xl font-bold transition-all shrink-0 ${
              filterSubcity === sub
                ? 'bg-emerald-600 text-slate-950'
                : 'bg-[#131c27] border border-[#212e3e] text-gray-300 hover:text-white'
            }`}
          >
            {sub}
          </button>
        ))}
      </div>

      {/* Matches Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {allGames.map((game) => (
          <div
            key={game.id}
            className="bg-[#131c27] border border-[#212e3e] hover:border-emerald-500/50 rounded-2xl p-6 space-y-4 shadow-xl transition-all"
          >
            <div className="flex items-center justify-between">
              <span className="bg-amber-500/10 border border-amber-500/30 text-amber-400 font-extrabold text-xs px-3 py-1 rounded-full">
                {game.playersNeeded} {lang === 'am' ? 'ተጫዋች ይጎድላል' : 'players needed'}
              </span>
              <span className="text-xs text-gray-400 font-semibold">{game.sport}</span>
            </div>

            <h3 className="text-xl font-extrabold text-white">{game.title}</h3>

            <div className="space-y-2 text-xs text-gray-300 bg-[#0b111a] p-3.5 rounded-xl border border-[#212e3e]">
              <p className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-400" />
                <span>{game.venueName} ({game.subcity})</span>
              </p>
              <p className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-400" />
                <span>{game.date} · {game.time}</span>
              </p>
              <p className="flex items-center gap-2">
                <Users className="w-4 h-4 text-teal-400" />
                <span>Organizer: {game.organizer} ({game.skillLevel} level)</span>
              </p>
            </div>

            <div className="flex items-center justify-between pt-2">
              <div>
                <span className="text-xs text-gray-400 block">{lang === 'am' ? 'ተካፋይ ዋጋ' : 'Fee per player'}</span>
                <span className="text-base font-black text-emerald-400">{game.pricePerPlayer} ETB</span>
              </div>
              <a
                href={`tel:${game.organizerPhone}`}
                className="bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-black text-xs py-2.5 px-4 rounded-xl transition-colors shadow-md flex items-center gap-2"
              >
                <PhoneCall className="w-4 h-4" />
                <span>{lang === 'am' ? 'ደውል / ተቀላቀል' : 'Call Host'}</span>
              </a>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
