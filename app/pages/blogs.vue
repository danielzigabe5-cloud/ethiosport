import React from 'react';
import { BookOpen, User, Calendar, Clock, ArrowRight } from 'lucide-react';
import { BlogPost } from '../types';

interface BlogViewProps {
  blogs: BlogPost[];
  lang: 'am' | 'en';
}

export const BlogView: React.FC<BlogViewProps> = ({ blogs, lang }) => {
  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="bg-[#131c27] border border-[#212e3e] p-6 sm:p-8 rounded-3xl space-y-3 shadow-xl">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 uppercase tracking-widest">
          <BookOpen className="w-4 h-4" />
          <span>{lang === 'am' ? 'የስፖርት ጽሑፎች እና ዜናዎች' : 'Ethiopian Sports & Pitch Blog'}</span>
        </div>
        <h1 className="text-3xl font-black text-white">
          {lang === 'am' ? 'የ ETHIO-MEDA ብሎግ እና የስፖርት ዜናዎች' : 'Sports Field Guides & Tactical Insights'}
        </h1>
        <p className="text-xs sm:text-sm text-gray-300 max-w-2xl">
          {lang === 'am'
            ? 'ስለ ፉትሳል ታክቲክ፣ ስለ ሜዳዎች እንክብካቤ እና በኢትዮጵያ ስፖርት ዙሪያ የተፃፉ አዳዲስ ጽሑፎች።'
            : 'Explore technical tactical guides, turf reviews, and community sports updates.'}
        </p>
      </div>

      {/* Blog Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {blogs.map((post) => (
          <article
            key={post.id}
            className="group bg-[#131c27] border border-[#212e3e] hover:border-emerald-500/50 rounded-2xl overflow-hidden shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
          >
            <div>
              <div className="relative h-48 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-[#0b111a]/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-emerald-400 border border-emerald-500/30">
                  {post.category}
                </div>
              </div>

              <div className="p-6 space-y-3">
                <div className="flex items-center gap-3 text-[11px] text-gray-400">
                  <span className="flex items-center gap-1">
                    <User className="w-3 h-3 text-emerald-400" />
                    {post.author}
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-amber-400" />
                    {post.readTime}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors leading-snug">
                  {lang === 'am' ? post.titleAm || post.title : post.title}
                </h3>

                <p className="text-xs text-gray-400 leading-relaxed">
                  {post.excerpt}
                </p>
              </div>
            </div>

            <div className="p-6 pt-0 border-t border-[#212e3e]/50 flex items-center justify-between mt-4">
              <span className="text-[11px] text-gray-400">{post.date}</span>
              <button className="text-emerald-400 hover:text-emerald-300 font-bold text-xs flex items-center gap-1">
                <span>{lang === 'am' ? 'ሙሉውን ያንብቡ' : 'Read Article'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </article>
        ))}
      </div>

    </div>
  );
};
