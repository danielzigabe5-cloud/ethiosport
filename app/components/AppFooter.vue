import React from 'react';
import { Trophy, Phone, Mail, MapPin, Send, ShieldCheck, Heart } from 'lucide-react';
import { NavLink } from '../types';

interface FooterProps {
  navLinks: NavLink[];
  setActiveTab: (tabId: string) => void;
  lang: 'am' | 'en';
}

export const Footer: React.FC<FooterProps> = ({ navLinks, setActiveTab, lang }) => {
  return (
    <footer className="bg-[#070b12] border-t border-[#212e3e] text-gray-400 text-sm mt-20 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Col 1: Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 p-0.5 flex items-center justify-center">
                <div className="w-full h-full bg-[#0b111a] rounded-[10px] flex items-center justify-center">
                  <Trophy className="w-5 h-5 text-emerald-400" />
                </div>
              </div>
              <span className="text-2xl font-black text-white italic">
                ETHIO<span className="text-emerald-400 not-italic">-MEDA</span>
              </span>
            </div>
            <p className="text-xs leading-relaxed text-gray-400">
              {lang === 'am'
                ? 'በኢትዮጵያ የመጀመሪያው የሜዳ ማስያዣ፣ የጨዋታ መፈለጊያ እና የስፖርት ማህበረሰብ ፕላትፎርም።'
                : 'Ethiopia’s leading digital platform for booking sports fields, organizing matches, and connecting sports lovers.'}
            </p>
            <div className="flex items-center gap-2 pt-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-xs text-emerald-400 font-bold">Addis Ababa, Hawassa, Adama, Bahir Dar</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4 border-l-2 border-emerald-500 pl-2">
              {lang === 'am' ? 'ፈጣን ማውጫ' : 'Navigation'}
            </h4>
            <ul className="space-y-2.5 text-xs">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => {
                      setActiveTab(link.id);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="hover:text-emerald-400 transition-colors flex items-center gap-1.5"
                  >
                    <span className="text-emerald-500/60">›</span>
                    <span>{lang === 'am' ? link.name : link.nameEn}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Popular Subcities */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4 border-l-2 border-amber-400 pl-2">
              {lang === 'am' ? 'የሜዳ ቦታዎች (ክፍለ ከተማ)' : 'Top Pitch Locations'}
            </h4>
            <ul className="space-y-2 text-xs">
              <li className="hover:text-white transition-colors cursor-pointer">Bole (ቦሌ) - 18 Venues</li>
              <li className="hover:text-white transition-colors cursor-pointer">Kirkos / Sarbet (ቂርቆስ) - 14 Venues</li>
              <li className="hover:text-white transition-colors cursor-pointer">Yeka / Summit (የካ) - 12 Venues</li>
              <li className="hover:text-white transition-colors cursor-pointer">Nifas Silk / Gotera - 10 Venues</li>
              <li className="hover:text-white transition-colors cursor-pointer">Arada / Piassa - 8 Venues</li>
            </ul>
          </div>

          {/* Col 4: Contact & Telegram */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider border-l-2 border-red-500 pl-2">
              {lang === 'am' ? 'የቴሌግራም ማህበረሰብ' : 'Telegram Community'}
            </h4>
            <p className="text-xs text-gray-400">
              {lang === 'am'
                ? 'በቀጥታ የሜዳ ጨዋታዎችን ለመቀላቀል ቴሌግራም ቻናላችንን ይቀላቀሉ።'
                : 'Join our Telegram channel to receive instant match drop updates & book slots.'}
            </p>
            <a
              href="https://t.me"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full bg-[#1c2838] hover:bg-emerald-600 border border-[#212e3e] hover:border-emerald-500 text-white font-bold text-xs py-2.5 px-4 rounded-xl transition-all shadow-md group"
            >
              <Send className="w-4 h-4 text-emerald-400 group-hover:text-white" />
              <span>@EthioMedaOfficial</span>
            </a>
            <div className="text-xs text-gray-400 space-y-1 pt-1">
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <span>+251 911 00 11 22 / +251 922 33 44 55</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-emerald-400" />
                <span>support@ethiomeda.et</span>
              </p>
            </div>
          </div>

        </div>

        {/* Bottom copyright line */}
        <div className="pt-8 border-t border-[#212e3e] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <p className="flex items-center gap-1">
            <span>© 2026 ETHIO-MEDA. All rights reserved. Built with</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
            <span>for Ethiopian Sports lovers.</span>
          </p>
          <div className="flex gap-4 text-xs font-medium">
            <span className="hover:text-emerald-400 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-emerald-400 cursor-pointer">Terms of Service</span>
            <span className="hover:text-emerald-400 cursor-pointer">Field Owners FAQ</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
