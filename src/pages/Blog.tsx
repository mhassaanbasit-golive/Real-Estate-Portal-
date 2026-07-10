import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Calendar, User, Clock, FileText, Download, CheckCircle, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';
import { BlogPost } from '../types';
import { blogData } from '../data';

export default function Blog() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('All');

  // Market report lock form
  const [reportForm, setReportForm] = useState({ name: '', email: '' });
  const [reportLoading, setReportLoading] = useState(false);
  const [reportUnlocked, setReportUnlocked] = useState(false);
  const [reportError, setReportError] = useState('');

  const categories = ['All', 'Market Trends', 'Design', 'Lifestyle', 'Investing'];

  // Handle article searches & category filtering
  const filteredPosts = useMemo(() => {
    return blogData.filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.content.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, activeCategory]);

  const handleReportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reportForm.name.trim() || !reportForm.email.trim() || !reportForm.email.includes('@')) {
      setReportError('Please provide a valid name and corporate email address.');
      return;
    }
    setReportError('');
    setReportLoading(true);

    setTimeout(() => {
      setReportLoading(false);
      setReportUnlocked(true);
    }, 1500);
  };

  return (
    <div id="seo-insights-engine" className="max-w-7xl mx-auto px-6 py-12 flex flex-col lg:flex-row gap-12">
      {/* LEFT: EDITORIAL GRID & SEARCH */}
      <div className="flex-1 space-y-10">
        {/* Search & Tabs control */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center border-b border-stone-200/50 dark:border-slate-850 pb-6">
          {/* Tabs */}
          <div className="flex flex-wrap gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 text-xs font-mono font-bold uppercase tracking-wider rounded-lg transition-all cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-stone-900 dark:bg-white text-white dark:text-[#080808] shadow-sm font-bold'
                    : 'text-stone-500 dark:text-stone-400 hover:bg-stone-50 dark:hover:bg-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search bar */}
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-2.5 w-4.5 h-4.5 text-stone-400" />
            <input
              type="text"
              placeholder="Search insights..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-stone-50 dark:bg-white/[0.02] border border-stone-200/50 dark:border-white/10 rounded-lg text-xs text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:border-amber-500"
            />
          </div>
        </div>

        {/* Editorial Feed Grid */}
        {filteredPosts.length === 0 ? (
          <div className="py-20 text-center text-stone-400 font-serif">
            <p className="text-lg">No matching insights found</p>
            <p className="text-xs font-mono uppercase text-stone-500 mt-2">Adjust search terms to find matching articles.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredPosts.map((post) => (
              <article
                key={post.id}
                className="bg-white dark:glass-card rounded-2xl overflow-hidden shadow-sm flex flex-col group"
              >
                <div className="h-48 relative overflow-hidden bg-stone-100">
                  <img
                    referrerPolicy="no-referrer"
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-2.5 py-1 bg-stone-900/95 dark:bg-white text-white dark:text-[#080808] font-mono text-[9px] font-bold uppercase tracking-wider rounded">
                      {post.category.toUpperCase()}
                    </span>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-3 text-[10px] font-mono text-stone-400 uppercase">
                      <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {post.date}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {post.readTime}</span>
                    </div>

                    <h3 className="font-serif text-lg font-bold text-stone-900 dark:text-stone-100 group-hover:text-amber-700 transition-colors line-clamp-2">
                      {post.title}
                    </h3>

                    <p className="text-xs text-stone-550 dark:text-stone-400 leading-relaxed line-clamp-3">
                      {post.summary}
                    </p>
                  </div>

                  <div className="flex items-center justify-between border-t border-stone-100 dark:border-slate-850 pt-4 text-xs font-mono text-stone-500 dark:text-stone-400">
                    <span className="flex items-center gap-1.5"><User className="w-4 h-4 text-stone-400" /> {post.author}</span>
                    <button
                      onClick={() => alert(`Full text article reading is coming in next issue: "${post.title}"`)}
                      className="text-amber-700 dark:text-amber-500 font-bold uppercase tracking-wider flex items-center gap-1 hover:text-stone-900 dark:hover:text-white cursor-pointer"
                    >
                      <span>READ ARTICLE</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {/* RIGHT: INTERACTIVE MARKET REPORT GATE */}
      <aside className="w-full lg:w-80 shrink-0">
        <div className="bg-stone-50 dark:glass-card p-6 rounded-3xl shadow-sm space-y-5 lg:sticky lg:top-24">
          <div className="border-b border-stone-200/50 dark:border-white/10 pb-4 space-y-1.5">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] font-extrabold text-amber-600 dark:text-amber-500 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" /> PRIVATE INTEL DESK
            </span>
            <h4 className="font-serif text-base font-bold text-stone-900 dark:text-stone-100">Macro Market Brief</h4>
            <p className="text-xs text-stone-550 dark:text-stone-400 leading-relaxed font-sans">
              Unlock our proprietary, quantitative Q3 Global Real Estate Analysis Brief details mapping safe-haven asset trajectories.
            </p>
          </div>

          {!reportUnlocked ? (
            <form onSubmit={handleReportSubmit} className="space-y-4">
              <div>
                <label className="block text-[10px] font-mono uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-1.5 font-bold">YOUR NAME</label>
                <input
                  type="text"
                  placeholder="e.g. Victor Sterling"
                  value={reportForm.name}
                  onChange={(e) => setReportForm({ ...reportForm, name: e.target.value })}
                  className="w-full px-3 py-2 bg-white dark:bg-white/[0.02] border border-stone-200 dark:border-white/10 rounded-lg text-xs text-stone-900 dark:text-stone-100 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-1.5 font-bold">CORPORATE EMAIL</label>
                <input
                  type="email"
                  placeholder="sterling@capital.com"
                  value={reportForm.email}
                  onChange={(e) => setReportForm({ ...reportForm, email: e.target.value })}
                  className="w-full px-3 py-2 bg-white dark:bg-white/[0.02] border border-stone-200 dark:border-white/10 rounded-lg text-xs text-stone-900 dark:text-stone-100 focus:outline-none focus:border-amber-500"
                />
              </div>

              {reportError && <p className="text-[10px] text-red-500">{reportError}</p>}

              <button
                type="submit"
                disabled={reportLoading}
                className="w-full py-3 bg-stone-900 hover:bg-stone-850 dark:bg-white dark:hover:bg-stone-200 text-white dark:text-[#080808] font-serif font-bold text-xs uppercase tracking-widest rounded-xl transition-all disabled:opacity-50 cursor-pointer"
              >
                {reportLoading ? 'GENERATING PROTOCOLS...' : 'TRANSMIT DECRYPTION TICKET'}
              </button>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-6 space-y-4"
            >
              <div className="inline-flex p-3 bg-amber-50 dark:bg-amber-950/20 text-amber-600 rounded-full">
                <CheckCircle className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h5 className="font-serif font-bold text-sm text-stone-950 dark:text-stone-50">Briefing Decrypted</h5>
                <p className="text-[11px] text-stone-500 leading-relaxed max-w-xs mx-auto">
                  A dynamic link to <strong>Q3-Macro-Estates-Brief.pdf</strong> has been registered. Welcome to our private registry network.
                </p>
              </div>

              <div className="p-3 bg-stone-100 dark:bg-white/[0.02] border border-stone-200 dark:border-white/10 text-[10px] font-mono text-stone-600 dark:text-stone-400 rounded-lg flex items-center justify-between">
                <span>TICKET-A920.PDF</span>
                <button
                  onClick={() => alert('Appraisal brief downloading initiated.')}
                  className="p-1 hover:bg-white rounded text-amber-600 cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          <div className="pt-2 border-t border-stone-200/50 dark:border-slate-850 flex items-center justify-center gap-1 text-[9px] font-mono text-stone-400 uppercase tracking-widest">
            <ShieldCheck className="w-3.5 h-3.5" /> SECURE SSL ENCRYPTED NETWORK
          </div>
        </div>
      </aside>
    </div>
  );
}
