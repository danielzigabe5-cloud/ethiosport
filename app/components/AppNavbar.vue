import React, { useState } from 'react';
import { NavLink } from '../types';
import { 
  Trophy, 
  Menu, 
  X, 
  Globe, 
  PlusCircle, 
  Sparkles,
  PhoneCall,
  Calendar,
  Layers,
  MapPin,
  Ticket,
  Users,
  BookOpen
} from 'lucide-react';

interface NavbarProps {
  navLinks: NavLink[];
  activeTab: string;
  setActiveTab: (tabId: string) => void;
  lang: 'am' | 'en';
  toggleLang: () => void;
  onOpenVenueModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  navLinks,
  activeTab,
  setActiveTab,
  lang,
  toggleLang,
  onOpenVenueModal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Icon mapping for nav links
  const getNavIcon = (id: string) => {
    switch (id) {
      case 'home': return <Sparkles className="w-4 h-4" />;
      case 'features': return <Layers className="w-4 h-4" />;
      case 'venues': return <MapPin className="w-4 h-4" />;
      case 'events': return <Calendar className="w-4 h-4" />;
      case 'games': return <Users className="w-4 h-4" />;
      case 'justplay': return <Ticket className="w-4 h-4" />;
      case 'blogs': return <BookOpen className="w-4 h-4" />;
      case 'contact': return <PhoneCall className="w-4 h-4" />;
      default: return null;
    }
  };

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-[#0b111a]/85 backdrop-blur-xl border-b border-[#212e3e]/80 shadow-2xl transition-all duration-300">
      {/* Top micro banner for Ethiopian Sports Network */}
      <div className="bg-gradient-to-r from-emerald-900/60 via-amber-900/40 to-red-900/50 border-b border-emerald-500/20 py-1 px-4 text-xs font-medium text-emerald-200 text-center flex items-center justify-center gap-2">
        <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
        <span>
          {lang === 'am' 
            ? 'በኢትዮጵያ ውስጥ የመጀመሪያው እና ዘመናዊው የሜዳ ማስያዣ እና ጨዋታ መፈለጊያ ፕላትፎርም' 
            : 'Ethiopia\'s Premier Sports Pitch Booking & Matchmaking Platform'}
        </span>
        <span className="hidden sm:inline-block bg-emerald-500/20 text-emerald-300 text-[10px] px-2 py-0.5 rounded-full border border-emerald-500/30">
          24/7 Booking
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <button 
            onClick={() => handleNavClick('home')}
            className="group flex items-center gap-3 focus:outline-none"
            id="brand-logo-btn"
          >
            <div className="relative flex items-center justify-center w-11 h-11 rounded-2xl bg-gradient-to-br from-emerald-500 via-teal-600 to-emerald-800 p-0.5 shadow-lg shadow-emerald-900/40 group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full bg-[#0b111a] rounded-[14px] flex items-center justify-center">
                <Trophy className="w-6 h-6 text-emerald-400 group-hover:rotate-12 transition-transform duration-300" />
              </div>
              {/* Subtle Ethiopian flag dots */}
              <div className="absolute -bottom-1 flex gap-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
              </div>
            </div>

            <div className="text-left">
              <span className="text-2xl font-black tracking-tight text-white italic group-hover:text-emerald-400 transition-colors flex items-center gap-1.5">
                ETHIO<span className="text-emerald-400 font-extrabold not-italic">-MEDA</span>
              </span>
              <span className="block text-[10px] font-semibold text-emerald-400/90 tracking-widest uppercase -mt-1">
                {lang === 'am' ? 'ኢትዮ-ሜዳ · ስፖርት' : 'Sports Field Hub'}
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1 bg-[#131c27]/80 border border-[#212e3e] px-3 py-1.5 rounded-2xl shadow-inner">
            {navLinks.map((link) => {
              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  id={`nav-link-${link.id}`}
                  className={`relative flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? 'text-white bg-gradient-to-r from-emerald-600 to-teal-600 shadow-md shadow-emerald-900/50'
                      : 'text-gray-300 hover:text-white hover:bg-[#1c2838]'
                  }`}
                >
                  <span className={isActive ? 'text-white' : 'text-emerald-400'}>
                    {getNavIcon(link.id)}
                  </span>
                  <span>{lang === 'am' ? link.name : link.nameEn}</span>
                  {isActive && (
                    <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-0.5 bg-amber-400 rounded-full"></span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Medium Screens Compact Nav */}
          <nav className="hidden lg:flex xl:hidden items-center gap-1">
            {navLinks.slice(0, 5).map((link) => {
              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                    isActive
                      ? 'text-emerald-400 bg-emerald-950/40 border border-emerald-500/30'
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {lang === 'am' ? link.name : link.nameEn}
                </button>
              );
            })}
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            {/* Language Selector Button */}
            <button
              onClick={toggleLang}
              id="lang-toggle-btn"
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#131c27] hover:bg-[#1c2838] border border-[#212e3e] text-xs font-medium text-gray-300 hover:text-emerald-400 transition-colors shadow-sm"
              title="Toggle Language (አማርኛ / English)"
            >
              <Globe className="w-3.5 h-3.5 text-emerald-400" />
              <span className="font-bold">{lang === 'am' ? 'EN' : 'አማ'}</span>
            </button>

            {/* CTA Button requested: "ሜዳ ያስመዝግቡ" */}
            <button
              onClick={onOpenVenueModal}
              id="register-venue-btn"
              className="relative group overflow-hidden bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-extrabold text-sm px-5 py-2.5 rounded-xl shadow-lg shadow-emerald-900/40 hover:shadow-emerald-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center gap-2"
            >
              <PlusCircle className="w-4 h-4 text-slate-950 group-hover:rotate-90 transition-transform duration-300" />
              <span>{lang === 'am' ? 'ሜዳ ያስመዝግቡ' : 'Book / Add Venue'}</span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 pointer-events-none"></div>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              id="mobile-menu-toggle"
              className="lg:hidden p-2.5 rounded-xl bg-[#131c27] border border-[#212e3e] text-gray-300 hover:text-white hover:bg-[#1c2838] focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-emerald-400" />
              ) : (
                <Menu className="w-6 h-6 text-emerald-400" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0d131a]/98 backdrop-blur-2xl border-b border-[#212e3e] py-4 px-6 space-y-3 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-2 flex items-center gap-2">
            <Trophy className="w-3.5 h-3.5" />
            <span>{lang === 'am' ? 'ማውጫ' : 'Menu Navigation'}</span>
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((link) => {
              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md'
                      : 'bg-[#131c27] text-gray-300 hover:bg-[#1c2838] hover:text-emerald-400'
                  }`}
                >
                  <span className={isActive ? 'text-white' : 'text-emerald-400'}>
                    {getNavIcon(link.id)}
                  </span>
                  <span>{lang === 'am' ? link.name : link.nameEn}</span>
                </button>
              );
            })}
          </div>

          {/* Quick Register Venue Button in Mobile Menu */}
          <div className="pt-3 border-t border-[#212e3e]">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenVenueModal();
              }}
              className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-black py-3 px-4 rounded-xl flex items-center justify-center gap-2 text-sm shadow-lg"
            >
              <PlusCircle className="w-5 h-5 text-slate-950" />
              <span>{lang === 'am' ? 'ሜዳ ያስመዝግቡ / ያዝዙ' : 'Book or Add Venue Now'}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
