import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bookmark, Sun, Moon, MapPin, ChevronDown, Menu, X, Star } from 'lucide-react';
import { neighborhoodsData } from '../data';

interface HeaderProps {
  currentPage: string;
  setPage: (page: any) => void;
  savedCount: number;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  onSelectNeighborhood: (city: string) => void;
}

export default function Header({
  currentPage,
  setPage,
  savedCount,
  theme,
  toggleTheme,
  onSelectNeighborhood,
}: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'listings', label: 'Listings' },
    { id: 'about', label: 'About Team' },
    { id: 'services', label: 'Services & Valuation' },
    { id: 'neighborhoods', label: 'Neighborhoods' },
    { id: 'blog', label: 'Insights' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <header
      id="global-header"
      className={`sticky top-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'backdrop-blur-xl bg-stone-50/85 dark:glass-nav shadow-sm'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <button
          id="header-logo"
          onClick={() => {
            setPage('home');
            setIsMobileMenuOpen(false);
          }}
          className="flex flex-col items-start cursor-pointer group"
        >
          <span className="font-serif text-2xl font-bold tracking-[0.2em] text-stone-900 dark:text-stone-100 group-hover:text-amber-700 dark:group-hover:text-amber-500 transition-colors">
            AURORA
          </span>
          <span className="text-[9px] uppercase tracking-[0.45em] text-stone-500 dark:text-stone-400 font-mono -mt-1 pl-[2px]">
            ESTATES
          </span>
        </button>

        {/* Desktop Nav Items */}
        <nav id="desktop-nav" className="hidden lg:flex items-center space-x-8">
          {navItems.map((item) => {
            if (item.id === 'neighborhoods') {
              return (
                <div
                  key={item.id}
                  className="relative group"
                  onMouseEnter={() => setIsMegaMenuOpen(true)}
                  onMouseLeave={() => setIsMegaMenuOpen(false)}
                >
                  <button
                    onClick={() => setPage('neighborhoods')}
                    className={`flex items-center gap-1 text-sm font-medium tracking-wide uppercase transition-all hover:text-amber-700 dark:hover:text-amber-500 cursor-pointer ${
                      currentPage === 'neighborhoods'
                        ? 'text-amber-700 dark:text-amber-500'
                        : 'text-stone-700 dark:text-stone-300'
                    }`}
                  >
                    <span>{item.label}</span>
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${isMegaMenuOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Mega Menu Dropdown */}
                  <AnimatePresence>
                    {isMegaMenuOpen && (
                      <motion.div
                        id="neighborhood-mega-menu"
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 15 }}
                        transition={{ duration: 0.2 }}
                        className="absolute left-1/2 -translate-x-1/2 mt-3 w-[520px] bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-xl border border-stone-200/50 dark:border-slate-800/50 grid grid-cols-3 gap-4"
                      >
                        <div className="col-span-3 pb-2 border-b border-stone-100 dark:border-slate-800 mb-2">
                          <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-stone-400 dark:text-stone-500">
                            Curated Destinations
                          </p>
                        </div>
                        {neighborhoodsData.map((n) => (
                          <div
                            key={n.id}
                            onClick={() => {
                              onSelectNeighborhood(n.name);
                              setPage('listings');
                              setIsMegaMenuOpen(false);
                            }}
                            className="cursor-pointer group/item flex flex-col rounded-xl overflow-hidden hover:bg-stone-50 dark:hover:bg-slate-800/50 p-2 transition-all"
                          >
                            <img
                              referrerPolicy="no-referrer"
                              src={n.image}
                              alt={n.name}
                              className="w-full h-24 object-cover rounded-lg shadow-sm group-hover/item:scale-105 transition-transform duration-300 mb-2"
                            />
                            <span className="font-serif font-semibold text-sm text-stone-900 dark:text-stone-100 group-hover/item:text-amber-700 dark:group-hover/item:text-amber-500">
                              {n.name}
                            </span>
                            <span className="text-[11px] text-stone-500 dark:text-stone-400 mt-0.5">
                              Avg: ${(n.avgPrice / 1000000).toFixed(1)}M
                            </span>
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            }

            return (
              <button
                key={item.id}
                onClick={() => setPage(item.id)}
                className={`relative text-sm font-medium tracking-wide uppercase transition-all hover:text-amber-700 dark:hover:text-amber-500 cursor-pointer py-1 ${
                  currentPage === item.id
                    ? 'text-amber-700 dark:text-amber-500'
                    : 'text-stone-700 dark:text-stone-300'
                }`}
              >
                <span>{item.label}</span>
                {currentPage === item.id && (
                  <motion.div
                    layoutId="activeNavLine"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-amber-700 dark:bg-amber-500 rounded"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Actions Menu */}
        <div id="header-actions" className="hidden lg:flex items-center space-x-4">
          {/* Concierge Status Indicator */}
          <div className="flex items-center gap-2 px-3 py-1.5 border border-stone-200 dark:border-white/10 rounded-full text-[10px] font-mono tracking-wider text-stone-650 dark:text-stone-300 font-light select-none">
            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
            <span className="uppercase text-[9px] tracking-widest">Concierge Active</span>
          </div>

          {/* Saved Items Bookmark */}
          <button
            id="saved-properties-btn"
            onClick={() => {
              // Direct navigation to Listings with filters reset to show saved, or just Listings page
              setPage('listings');
            }}
            className="relative p-2.5 rounded-full border border-stone-200 dark:border-slate-800 hover:bg-stone-100 dark:hover:bg-slate-900 transition-colors cursor-pointer group"
          >
            <Bookmark className="w-4.5 h-4.5 text-stone-700 dark:text-stone-300 group-hover:text-amber-600 dark:group-hover:text-amber-500" />
            {savedCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-amber-600 dark:bg-amber-500 text-[10px] font-bold text-white shadow-md animate-pulse">
                {savedCount}
              </span>
            )}
          </button>

          {/* Theme Switcher */}
          <button
            id="theme-switcher-btn"
            onClick={toggleTheme}
            className="p-2.5 rounded-full border border-stone-200 dark:border-slate-800 hover:bg-stone-100 dark:hover:bg-slate-900 transition-colors cursor-pointer text-stone-700 dark:text-stone-300 hover:text-amber-600 dark:hover:text-amber-500"
          >
            {theme === 'light' ? <Moon className="w-4.5 h-4.5" /> : <Sun className="w-4.5 h-4.5" />}
          </button>

          {/* Luxury CTA */}
          <button
            id="header-cta"
            onClick={() => setPage('contact')}
            className="px-5 py-2.5 bg-stone-900 hover:bg-stone-800 dark:bg-white dark:hover:bg-stone-200 text-stone-50 dark:text-[#050505] font-serif font-medium tracking-wider text-xs uppercase rounded-full transition-all duration-300 hover:shadow-lg cursor-pointer transform hover:-translate-y-0.5"
          >
            Private Showing
          </button>
        </div>

        {/* Mobile Buttons */}
        <div className="flex lg:hidden items-center space-x-3">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full border border-stone-200 dark:border-slate-800 text-stone-700 dark:text-stone-300"
          >
            {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </button>
          <button
            onClick={() => setPage('listings')}
            className="relative p-2 rounded-full border border-stone-200 dark:border-slate-800 text-stone-700 dark:text-stone-300"
          >
            <Bookmark className="w-4 h-4" />
            {savedCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-amber-600 text-[9px] font-bold text-white">
                {savedCount}
              </span>
            )}
          </button>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-full border border-stone-200 dark:border-slate-800 text-stone-700 dark:text-stone-300"
          >
            {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-drawer"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden w-full bg-stone-50 dark:bg-[#050505] border-b border-stone-200 dark:border-stone-900 px-6 py-6 overflow-hidden flex flex-col space-y-4 shadow-inner"
          >
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setPage(item.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`text-left text-lg font-serif tracking-widest uppercase py-2.5 border-b border-stone-200/50 dark:border-stone-900/50 cursor-pointer transition-all duration-250 ${
                  currentPage === item.id
                    ? 'text-amber-700 dark:text-[#c5a880] font-semibold'
                    : 'text-stone-800 dark:text-white/80 hover:text-amber-700 dark:hover:text-[#c5a880]'
                }`}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => {
                setPage('contact');
                setIsMobileMenuOpen(false);
              }}
              className="w-full mt-2 text-center py-3 bg-stone-900 dark:bg-[#050505] text-white dark:text-amber-200 border border-stone-900 dark:border-amber-500/30 hover:dark:border-amber-500/60 font-serif font-medium tracking-widest text-sm uppercase rounded-lg transition-all duration-300"
            >
              Private Showing
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
