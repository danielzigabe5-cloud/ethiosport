import React, { useState } from 'react';
import { Phone, Mail, MapPin, Send, MessageSquare, CheckCircle2, HelpCircle } from 'lucide-react';

interface ContactViewProps {
  lang: 'am' | 'en';
}

export const ContactView: React.FC<ContactViewProps> = ({ lang }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !message) return;
    setSubmitted(true);
  };

  return (
    <div className="space-y-12 max-w-5xl mx-auto">
      
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
          <Phone className="w-4 h-4" />
          <span>ETHIO-MEDA Support & Contacts</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white">
          {lang === 'am' ? 'እኛን ለማግኘት (አግኙን)' : 'Get in Touch with ETHIO-MEDA'}
        </h1>
        <p className="text-xs sm:text-sm text-gray-300 max-w-xl mx-auto">
          {lang === 'am'
            ? 'ስለ ሜዳ ምዝገባ፣ ማስያዣ ወይም የቴክኒክ ድጋፍ ጥያቄ ካለዎት ይጻፉልን።'
            : 'Have questions about pitch registration, telebirr payments, or league sponsorships? We are here to help.'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        
        {/* Contact Info Card */}
        <div className="bg-[#131c27] border border-[#212e3e] p-6 sm:p-8 rounded-3xl space-y-6 shadow-xl">
          <h3 className="text-xl font-black text-white border-l-4 border-emerald-500 pl-3">
            {lang === 'am' ? 'የግንኙነት መረጃዎች' : 'Contact Information'}
          </h3>

          <div className="space-y-4 text-xs text-gray-300">
            <div className="flex items-start gap-3 bg-[#0b111a] p-4 rounded-2xl border border-[#212e3e]">
              <MapPin className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block text-sm mb-0.5">{lang === 'am' ? 'ዋና ቢሮ' : 'Headquarters'}</strong>
                <p>Bole Subcity, Near Japan Embassy, Addis Ababa, Ethiopia</p>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-[#0b111a] p-4 rounded-2xl border border-[#212e3e]">
              <Phone className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block text-sm mb-0.5">{lang === 'am' ? 'ስልክ ቁጥሮች' : 'Customer Hotlines'}</strong>
                <p className="text-emerald-400 font-extrabold">+251 911 00 11 22</p>
                <p className="text-emerald-400 font-extrabold">+251 922 33 44 55</p>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-[#0b111a] p-4 rounded-2xl border border-[#212e3e]">
              <Send className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block text-sm mb-0.5">{lang === 'am' ? 'ቴሌግራም ቻናል' : 'Telegram Bot & Support'}</strong>
                <p className="text-gray-300">Official Channel: @EthioMedaOfficial</p>
                <p className="text-gray-400">Instant Bot: @EthioMedaBookingBot</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-[#131c27] border border-[#212e3e] p-6 sm:p-8 rounded-3xl space-y-6 shadow-xl">
          <h3 className="text-xl font-black text-white border-l-4 border-amber-400 pl-3">
            {lang === 'am' ? 'መልእክት ይላኩልን' : 'Send Us a Message'}
          </h3>

          {submitted ? (
            <div className="bg-emerald-950/40 border border-emerald-500/40 p-6 rounded-2xl text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
              <h4 className="text-lg font-bold text-white">
                {lang === 'am' ? 'መልእክትዎ ደርሶናል!' : 'Message Received!'}
              </h4>
              <p className="text-xs text-gray-300">
                {lang === 'am'
                  ? 'እናመሰግናለን! የደጋፊ ቡድናችን በጥቂት ሰዓታት ውስጥ ይመልስልዎታል።'
                  : 'Thank you for reaching out! Our team will respond shortly.'}
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="bg-emerald-600 text-slate-950 font-black text-xs py-2.5 px-5 rounded-xl mt-2"
              >
                {lang === 'am' ? 'ሌላ መልእክት ይላኩ' : 'Send Another Message'}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1">{lang === 'am' ? 'ስም' : 'Your Name'} *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Bethlehem Tsegaye"
                  className="w-full bg-[#0b111a] border border-[#212e3e] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1">{lang === 'am' ? 'ኢሜይል ወይም ስልክ' : 'Email or Phone'}</label>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. +251 9... or name@mail.com"
                  className="w-full bg-[#0b111a] border border-[#212e3e] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1">{lang === 'am' ? 'መልእክት' : 'Message'} *</label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={lang === 'am' ? 'ጥያቄዎን ወይም አስተያየትዎን እዚህ ይጻፉ...' : 'Write your inquiry or feedback...'}
                  className="w-full bg-[#0b111a] border border-[#212e3e] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500 resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-black py-3 rounded-xl shadow-lg transition-all text-xs"
              >
                {lang === 'am' ? 'መልእክት ላክ' : 'Submit Inquiry'}
              </button>
            </form>
          )}
        </div>

      </div>

    </div>
  );
};
