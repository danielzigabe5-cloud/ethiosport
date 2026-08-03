import React, { useState } from 'react';
import { Ticket, Users, CheckCircle, Sparkles, MapPin, Zap, ShieldAlert, ArrowRight } from 'lucide-react';

interface JustPlayViewProps {
  lang: 'am' | 'en';
}

export const JustPlayView: React.FC<JustPlayViewProps> = ({ lang }) => {
  const [position, setPosition] = useState('Midfielder');
  const [preferredSubcity, setPreferredSubcity] = useState('Bole');
  const [preferredTime, setPreferredTime] = useState('Evening (6 PM - 10 PM)');
  const [isSearching, setIsSearching] = useState(false);
  const [matchedGame, setMatchedGame] = useState<any | null>(null);

  const handleMatchSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    setMatchedGame(null);

    setTimeout(() => {
      setIsSearching(false);
      setMatchedGame({
        title: 'Bole Atlas Futsal Night Kickoff',
        venue: 'Bole Atlas Sports Complex',
        time: 'Today at 07:30 PM',
        roleNeeded: position,
        fee: 200,
        host: 'Dawit Bekele',
        phone: '+251 912 990 011'
      });
    }, 1200);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-amber-950/60 border border-amber-500/30 text-amber-400 text-xs font-bold">
          <Ticket className="w-4 h-4" />
          <span>ETHIO-MEDA JustPlay</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white">
          {lang === 'am' ? 'የብቸኛ ተጫዋች ፈጣን ማገናኛ' : 'Instant Solo MatchFinder'}
        </h1>
        <p className="text-xs sm:text-sm text-gray-300">
          {lang === 'am'
            ? 'ቡድን የሎትም? ችግር የለውም! ቦታዎን እና ሚናዎን ይምረጡ፣ በደቂቃ ውስጥ ተስማሚ ቡድን እናገኛለን።'
            : 'No team tonight? No problem! Tell us your preferred position and area, and we’ll pair you with a match.'}
        </p>
      </div>

      {/* Match Finder Form */}
      <div className="bg-[#131c27] border border-[#212e3e] p-6 sm:p-8 rounded-3xl space-y-6 shadow-2xl">
        <form onSubmit={handleMatchSearch} className="space-y-5">
          
          {/* Preferred Position */}
          <div>
            <label className="block text-xs font-bold text-gray-300 mb-2">
              {lang === 'am' ? 'የጨዋታ ቦታዎ / ሚና' : 'Your Playing Position'}
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { id: 'Goalkeeper', am: 'ግብ ጠባቂ (GK)' },
                { id: 'Defender', am: 'ተከላካይ (DF)' },
                { id: 'Midfielder', am: 'አማካይ (MF)' },
                { id: 'Forward', am: 'አጥቂ (FW)' }
              ].map((pos) => (
                <button
                  type="button"
                  key={pos.id}
                  onClick={() => setPosition(pos.id)}
                  className={`p-3 rounded-xl border text-center text-xs font-bold transition-all ${
                    position === pos.id
                      ? 'border-emerald-500 bg-emerald-950/60 text-emerald-300 shadow-md'
                      : 'border-[#212e3e] bg-[#0b111a] text-gray-400 hover:text-white'
                  }`}
                >
                  {lang === 'am' ? pos.am : pos.id}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Preferred Subcity */}
            <div>
              <label className="block text-xs font-bold text-gray-300 mb-1">
                {lang === 'am' ? 'የሚመርጡት ክፍለ ከተማ' : 'Preferred Subcity'}
              </label>
              <select
                value={preferredSubcity}
                onChange={(e) => setPreferredSubcity(e.target.value)}
                className="w-full bg-[#0b111a] border border-[#212e3e] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
              >
                <option value="Bole">Bole (ቦሌ)</option>
                <option value="Kirkos">Kirkos / Sarbet (ቂርቆስ)</option>
                <option value="Yeka">Yeka / Summit (የካ)</option>
                <option value="Nifas Silk">Nifas Silk (ንፋስ ስልክ)</option>
              </select>
            </div>

            {/* Preferred Time Slot */}
            <div>
              <label className="block text-xs font-bold text-gray-300 mb-1">
                {lang === 'am' ? 'የሚመርጡት ሰዓት' : 'Preferred Time'}
              </label>
              <select
                value={preferredTime}
                onChange={(e) => setPreferredTime(e.target.value)}
                className="w-full bg-[#0b111a] border border-[#212e3e] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
              >
                <option value="Morning (7 AM - 10 AM)">Morning (7 AM - 10 AM)</option>
                <option value="Afternoon (2 PM - 5 PM)">Afternoon (2 PM - 5 PM)</option>
                <option value="Evening (6 PM - 10 PM)">Evening (6 PM - 10 PM)</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSearching}
            className="w-full bg-gradient-to-r from-emerald-500 via-teal-500 to-amber-500 text-slate-950 font-black py-3.5 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
          >
            {isSearching ? (
              <span className="inline-block animate-spin">⌛ Finding open game...</span>
            ) : (
              <>
                <Zap className="w-4 h-4 text-slate-950 fill-slate-950" />
                <span>{lang === 'am' ? 'ተስማሚ ጨዋታ ፈልግ (JustPlay Match)' : 'Find Compatible Match'}</span>
              </>
            )}
          </button>
        </form>

        {/* MATCHED RESULT DISPLAY */}
        {matchedGame && (
          <div className="bg-[#0b111a] border border-emerald-500/40 rounded-2xl p-6 space-y-4 animate-in zoom-in-95 duration-200">
            <div className="flex items-center gap-2 text-emerald-400 font-extrabold text-xs uppercase tracking-widest">
              <CheckCircle className="w-4 h-4" />
              <span>{lang === 'am' ? 'ተስማሚ ጨዋታ ተገኝቷል!' : 'Perfect Match Found!'}</span>
            </div>

            <h3 className="text-xl font-black text-white">{matchedGame.title}</h3>

            <div className="text-xs text-gray-300 space-y-1.5 bg-[#131c27] p-4 rounded-xl border border-[#212e3e]">
              <p>📍 <strong className="text-white">Venue:</strong> {matchedGame.venue}</p>
              <p>⏰ <strong className="text-white">Time:</strong> {matchedGame.time}</p>
              <p>⚽ <strong className="text-white">Role Needed:</strong> <span className="text-amber-400 font-bold">{matchedGame.roleNeeded}</span></p>
              <p>💵 <strong className="text-white">Player Fee:</strong> {matchedGame.fee} ETB</p>
              <p>👤 <strong className="text-white">Host Contact:</strong> {matchedGame.host} ({matchedGame.phone})</p>
            </div>

            <a
              href={`tel:${matchedGame.phone}`}
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-black py-3 rounded-xl transition-colors shadow-lg flex items-center justify-center gap-2 text-xs"
            >
              <span>{lang === 'am' ? 'ከአደራጁ ጋር ይደውሉ' : 'Call Match Host Now'}</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        )}

      </div>

    </div>
  );
};
