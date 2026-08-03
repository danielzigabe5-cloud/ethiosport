import React, { useState } from 'react';
import { Calendar, Trophy, Users, Award, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { EventItem } from '../types';

interface EventsViewProps {
  events: EventItem[];
  lang: 'am' | 'en';
}

export const EventsView: React.FC<EventsViewProps> = ({ events, lang }) => {
  const [registeredEventId, setRegisteredEventId] = useState<string | null>(null);
  const [teamName, setTeamName] = useState('');
  const [phone, setPhone] = useState('');
  const [submittedEvent, setSubmittedEvent] = useState<string | null>(null);

  const handleRegisterTeam = (eventId: string, e: React.FormEvent) => {
    e.preventDefault();
    if (!teamName || !phone) return;
    setSubmittedEvent(eventId);
    setRegisteredEventId(null);
  };

  return (
    <div className="space-y-10">
      
      {/* Header */}
      <div className="bg-[#131c27] border border-[#212e3e] p-6 sm:p-8 rounded-3xl space-y-3 shadow-xl">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 uppercase tracking-widest">
          <Trophy className="w-4 h-4" />
          <span>{lang === 'am' ? 'የስፖርት ውድድሮች እና ዋንጫዎች' : 'Ethiopian Leagues & Tournaments'}</span>
        </div>
        <h1 className="text-3xl font-black text-white">
          {lang === 'am' ? 'የ ETHIO-MEDA ኩነቶች እና ሊጎች' : 'Tournaments & Corporate Cups'}
        </h1>
        <p className="text-xs sm:text-sm text-gray-300 max-w-2xl">
          {lang === 'am'
            ? 'የኩባንያዎ ወይም የሰፈራችሁ ቡድን በሽልማት ውድድሮች ላይ እንዲካፈል ያስመዝግቡ።'
            : 'Compete in company cups, futsal championships, and youth leagues with substantial cash prize pools.'}
        </p>
      </div>

      {/* Events List */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {events.map((evt) => (
          <div
            key={evt.id}
            className="bg-[#131c27] border border-[#212e3e] rounded-2xl overflow-hidden shadow-xl flex flex-col justify-between"
          >
            <div>
              <div className="relative h-48 overflow-hidden">
                <img
                  src={evt.image}
                  alt={evt.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 bg-emerald-600 text-slate-950 px-2.5 py-1 rounded-full text-xs font-black">
                  {evt.category}
                </div>
                <div className="absolute top-3 right-3 bg-[#0b111a]/90 border border-emerald-500/30 text-emerald-400 px-2.5 py-1 rounded-full text-xs font-bold">
                  {evt.status}
                </div>
              </div>

              <div className="p-6 space-y-3">
                <h3 className="text-lg font-bold text-white leading-snug">
                  {lang === 'am' ? evt.titleAm || evt.title : evt.title}
                </h3>

                <div className="text-xs text-gray-300 space-y-2 pt-1 border-t border-[#212e3e]">
                  <p className="flex items-center justify-between">
                    <span className="text-gray-400">{lang === 'am' ? 'አዘጋጅ:' : 'Organizer:'}</span>
                    <span className="font-bold text-white">{evt.organizer}</span>
                  </p>
                  <p className="flex items-center justify-between">
                    <span className="text-gray-400">{lang === 'am' ? 'ቀን:' : 'Date:'}</span>
                    <span className="font-bold text-emerald-400">{evt.date}</span>
                  </p>
                  <p className="flex items-center justify-between">
                    <span className="text-gray-400">{lang === 'am' ? 'ቦታ:' : 'Venue:'}</span>
                    <span className="font-bold text-gray-200">{evt.venue}</span>
                  </p>
                  <p className="flex items-center justify-between">
                    <span className="text-gray-400">{lang === 'am' ? 'የተመዘገቡ ቡድኖች:' : 'Registered Teams:'}</span>
                    <span className="font-bold text-amber-400">{evt.teamsCount} Teams</span>
                  </p>
                </div>

                <div className="bg-[#0b111a] border border-amber-500/30 p-3 rounded-xl flex items-center justify-between mt-3">
                  <span className="text-xs font-semibold text-gray-300">{lang === 'am' ? 'የሽልማት መጠን:' : 'Prize Pool:'}</span>
                  <span className="text-sm font-black text-amber-400">{evt.prizePool}</span>
                </div>
              </div>
            </div>

            <div className="p-6 pt-0">
              {submittedEvent === evt.id ? (
                <div className="bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 p-3 rounded-xl text-xs font-bold text-center flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>{lang === 'am' ? 'ቡድንዎ ተመዝግቧል!' : 'Team Registered!'}</span>
                </div>
              ) : registeredEventId === evt.id ? (
                <form onSubmit={(e) => handleRegisterTeam(evt.id, e)} className="space-y-2 pt-2 border-t border-[#212e3e]">
                  <input
                    type="text"
                    required
                    placeholder={lang === 'am' ? 'የቡድን ስም (Team Name)' : 'Team Name'}
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    className="w-full bg-[#0b111a] border border-[#212e3e] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                  />
                  <input
                    type="tel"
                    required
                    placeholder={lang === 'am' ? 'የአሰልጣኝ/አዘጋጅ ስልክ' : 'Captain Phone'}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-[#0b111a] border border-[#212e3e] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                  />
                  <button
                    type="submit"
                    className="w-full bg-emerald-600 text-slate-950 font-black text-xs py-2 rounded-xl"
                  >
                    {lang === 'am' ? 'ምዝገባውን አረጋግጥ' : 'Confirm Entry'}
                  </button>
                </form>
              ) : (
                <button
                  onClick={() => setRegisteredEventId(evt.id)}
                  className="w-full bg-[#1c2838] hover:bg-emerald-600 text-emerald-400 hover:text-slate-950 border border-[#212e3e] font-bold text-xs py-2.5 rounded-xl transition-all shadow-md"
                >
                  {lang === 'am' ? 'ቡድንዎን ያስመዝግቡ' : 'Register Your Team'}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
