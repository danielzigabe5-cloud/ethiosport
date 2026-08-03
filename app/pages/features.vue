import React from 'react';
import { 
  Zap, 
  ShieldCheck, 
  Users, 
  Calendar, 
  Award, 
  Moon, 
  Smartphone,
  ChevronRight,
  Sparkles,
  Layers,
  CheckCircle2
} from 'lucide-react';

interface FeaturesViewProps {
  onNavigate: (tabId: string) => void;
  lang: 'am' | 'en';
}

export const FeaturesView: React.FC<FeaturesViewProps> = ({ onNavigate, lang }) => {
  const featureList = [
    {
      icon: <Zap className="w-6 h-6 text-emerald-400" />,
      title: lang === 'am' ? 'በቅጽበት ማስያዣ (Instant Slot Booking)' : 'Instant Slot Lock',
      description: lang === 'am'
        ? 'በስልክዎ የሜዳውን ክፍት ሰዓት አይተው በደቂቃዎች ውስጥ ማስያዣዎን ያረጋግጣሉ።'
        : 'Real-time pitch availability engine so you can reserve daytime or evening slots instantly.'
    },
    {
      icon: <Smartphone className="w-6 h-6 text-amber-400" />,
      title: lang === 'am' ? 'የቴሌብር እና CBE Integrations' : 'Telebirr & CBE Payment',
      description: lang === 'am'
        ? 'በሀገራችን ተወዳጅ በሆኑት ቴሌብር እና ሲቢኢ ብር ክፍያዎን በሙሉ ደህንነት ይፈጽሙ።'
        : 'Seamless mobile wallet payment with Telebirr, CBE Birr, and automatic SMS receipt vouchers.'
    },
    {
      icon: <Users className="w-6 h-6 text-teal-400" />,
      title: lang === 'am' ? 'JustPlay - የተጫዋች ማገናኛ' : 'JustPlay Solo Matchmaker',
      description: lang === 'am'
        ? 'ብቸኛ ተጫዋች ነዎት? JustPlay ን በመጠቀም ከአቅራቢያዎ ካሉ ሌሎች ቡድኖች ጋር ይገናኙ።'
        : 'Solo player system connecting individual athletes with open pickup matches looking for extra players.'
    },
    {
      icon: <Moon className="w-6 h-6 text-[#10b981]" />,
      title: lang === 'am' ? 'የምሽት ፍሉድላይት ሜዳዎች' : 'Night Floodlight Pitches',
      description: lang === 'am'
        ? 'ከስራ በኋላ በምሽት መጫወት ለሚፈልጉ በቂ የመብራት አቅርቦት ያላቸው ሜዳዎች።'
        : 'Filter pitches equipped with professional stadium-grade LED floodlights for late evening matches.'
    },
    {
      icon: <Award className="w-6 h-6 text-amber-400" />,
      title: lang === 'am' ? 'የቶርናመንት እና ሊግ አዘጋጅ' : 'Tournament Brackets',
      description: lang === 'am'
        ? 'የድርጅት ወይም የጓደኛሞች ውድድሮችን በ ETHIO-MEDA በኩል ያዘጋጁ እና ያስተዳድሩ።'
        : 'Complete tournament organizer system with knockout brackets, match scheduling, and leaderboard tracking.'
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-emerald-400" />,
      title: lang === 'am' ? 'የዳኛ ማስያዣ (Referee Hire)' : 'Certified Referee Hire',
      description: lang === 'am'
        ? 'ለጨዋታዎ የኢትዮጵያ እግር ኳስ ፌዴሬሽን የተመሰከረላቸው ዳኞችን በቅጽበት ይዘዙ።'
        : 'Hire certified local referees directly through the app to maintain fair play in your competitive matches.'
    }
  ];

  return (
    <div className="space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
          <Layers className="w-4 h-4" />
          <span>{lang === 'am' ? 'የ ETHIO-MEDA ገፅታዎች' : 'ETHIO-MEDA Core Features'}</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white">
          {lang === 'am'
            ? 'በኢትዮጵያ የስፖርት ሜዳዎችን አያያዝ የቀየሩ ገፅታዎች'
            : 'Everything You Need for Modern Pitch Reservation & Play'}
        </h1>
        <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
          {lang === 'am'
            ? 'ለተጫዋቾች፣ ለቡድን አደራጆች እና ለሜዳ ባለቤቶች የተዘጋጁ ዘመናዊ የዲጂታል መሳሪያዎች።'
            : 'Designed specifically for local players, team organizers, and sports pitch owners across Ethiopia.'}
        </p>
      </div>

      {/* Grid of Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {featureList.map((item, idx) => (
          <div
            key={idx}
            className="bg-[#131c27] border border-[#212e3e] hover:border-emerald-500/50 p-6 rounded-2xl space-y-4 transition-all duration-300 hover:-translate-y-1 shadow-xl"
          >
            <div className="w-12 h-12 rounded-xl bg-[#0b111a] border border-[#212e3e] flex items-center justify-center shadow-inner">
              {item.icon}
            </div>
            <h3 className="text-lg font-bold text-white">{item.title}</h3>
            <p className="text-xs text-gray-400 leading-relaxed">{item.description}</p>
          </div>
        ))}
      </div>

      {/* CTA section */}
      <div className="bg-gradient-to-r from-emerald-900/40 via-[#131c27] to-teal-900/40 border border-emerald-500/30 rounded-3xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
        <div className="space-y-2 text-center md:text-left">
          <h3 className="text-2xl font-black text-white">
            {lang === 'am' ? 'አሁኑኑ ሜዳዎን ማስያዝ ይፈልጋሉ?' : 'Ready to Reserve Your Field Slot?'}
          </h3>
          <p className="text-xs text-gray-300">
            {lang === 'am'
              ? 'በአቅራቢያዎ ያሉትን ሜዳዎች በመመልከት ክፍት ሰዓቶችን ይያዙ።'
              : 'Browse 50+ verified pitches in Addis Ababa, Hawassa & regional hubs.'}
          </p>
        </div>
        <button
          onClick={() => onNavigate('venues')}
          className="bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-black px-6 py-3.5 rounded-xl shadow-lg transition-all flex items-center gap-2 text-sm shrink-0"
        >
          <span>{lang === 'am' ? 'ሜዳዎችን ይመልከቱ' : 'Explore All Venues'}</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
