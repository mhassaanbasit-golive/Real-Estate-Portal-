import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, ChevronLeft, ChevronRight, Calculator, SlidersHorizontal, ArrowRight, ShieldCheck, Star, Sparkles, MapPin, Landmark } from 'lucide-react';
import { Listing, NeighborhoodGuide, Review } from '../types';
import { listingsData, neighborhoodsData, reviewsData } from '../data';
import PropertyCard from '../components/PropertyCard';

interface HomeProps {
  setPage: (page: any) => void;
  setSelectedListingId: (id: string | null) => void;
  savedListingIds: string[];
  onBookmarkToggle: (id: string, e: React.MouseEvent) => void;
  onQuickBook: (listing: Listing, e: React.MouseEvent) => void;
  setSearchFilters: (filters: any) => void;
}

export default function Home({
  setPage,
  setSelectedListingId,
  savedListingIds,
  onBookmarkToggle,
  onQuickBook,
  setSearchFilters,
}: HomeProps) {
  // Search parameters in state
  const [searchTab, setSearchTab] = useState<'buy' | 'rent'>('buy');
  const [citySearch, setCitySearch] = useState('');
  const [priceRange, setPriceRange] = useState(50000000);
  const [citySuggestions, setCitySuggestions] = useState<string[]>([]);

  // Testimonial slider
  const [activeTestimonialIndex, setActiveTestimonialIndex] = useState(0);

  // Home Valuation state
  const [valuationSqft, setValuationSqft] = useState(4500);
  const [valuationCity, setValuationCity] = useState('Malibu');
  const [valuationCondition, setValuationCondition] = useState('exceptional');
  const [valuationResult, setValuationResult] = useState<number | null>(null);

  // Auto-complete suggestion generator
  useEffect(() => {
    if (!citySearch) {
      setCitySuggestions([]);
      return;
    }
    const filtered = ['Malibu', 'Beverly Hills', 'New York', 'Miami', 'Aspen', 'West Hollywood', 'Venice Beach'].filter((city) =>
      city.toLowerCase().startsWith(citySearch.toLowerCase())
    );
    setCitySuggestions(filtered);
  }, [citySearch]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchFilters({
      city: citySearch,
      type: searchTab,
      minPrice: 0,
      maxPrice: priceRange === 50000000 ? 999000000 : priceRange,
      beds: 'all',
      baths: 'all',
      propertyType: 'all',
      sortBy: 'highest'
    });
    setPage('listings');
  };

  // Neighborhood selection helper
  const handleSelectNeighborhood = (name: string) => {
    setSearchFilters({
      city: name,
      type: 'all',
      minPrice: 0,
      maxPrice: 999000000,
      beds: 'all',
      baths: 'all',
      propertyType: 'all',
      sortBy: 'highest'
    });
    setPage('listings');
  };

  // Dynamic Valuation Widget Calculator
  const handleValuationCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    let basePricePerSqft = 1800;
    if (valuationCity === 'Beverly Hills') basePricePerSqft = 2100;
    if (valuationCity === 'New York') basePricePerSqft = 3500;
    if (valuationCity === 'Aspen') basePricePerSqft = 1600;
    if (valuationCity === 'Miami') basePricePerSqft = 1400;

    let multiplier = 1.0;
    if (valuationCondition === 'exceptional') multiplier = 1.25;
    if (valuationCondition === 'renovated') multiplier = 1.1;

    const estimatedValue = valuationSqft * basePricePerSqft * multiplier;
    setValuationResult(estimatedValue);
  };

  // Next and Prev for Testimonials
  const nextTestimonial = () => {
    setActiveTestimonialIndex((prev) => (prev + 1) % reviewsData.length);
  };

  const prevTestimonial = () => {
    setActiveTestimonialIndex((prev) => (prev - 1 + reviewsData.length) % reviewsData.length);
  };

  const featuredListings = listingsData.filter((l) => l.isFeatured);

  return (
    <div id="home-page" className="space-y-24 pb-20">
      {/* SECTION 1: Immersive Hero Section */}
      <section id="hero-section" className="relative h-[85vh] w-full flex items-center justify-center bg-stone-900 overflow-hidden">
        {/* High-Res Cinematic Real Estate Background Cover */}
        <div className="absolute inset-0 z-0">
          <img
            referrerPolicy="no-referrer"
            src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1920&q=80"
            alt="Luxury Mansion Coastline View"
            className="w-full h-full object-cover opacity-60 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-stone-950/40 via-stone-950/20 to-stone-950/70" />
        </div>

        {/* Content Box */}
        <div className="relative z-10 text-center max-w-4xl mx-auto px-6 space-y-8 mt-12 pt-16 md:pt-24 pb-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-4"
          >
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-amber-500 font-semibold">
              THE DEFINITIVE STANDARD OF LIVING
            </p>
            <h1 className="font-serif text-4xl sm:text-6xl font-semibold text-white tracking-tight leading-[1.1] max-w-3xl mx-auto">
              Secure Your Piece <br />of Architectural Legacy
            </h1>
          </motion.div>

          {/* Search Engine Panel */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white/80 dark:glass-card p-6 rounded-3xl border border-white/20 shadow-2xl max-w-3xl mx-auto"
          >
            {/* Filter Tabs */}
            <div className="flex space-x-2 mb-4 border-b border-stone-200/50 dark:border-white/10 pb-3">
              {(['buy', 'rent'] as const).map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setSearchTab(tab)}
                  className={`px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider rounded-lg transition-colors cursor-pointer ${
                    searchTab === tab
                      ? 'bg-stone-900 dark:bg-white dark:text-slate-950 shadow-sm'
                      : 'text-stone-650 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-white/5'
                  }`}
                >
                  {tab === 'buy' ? 'Acquire (Buy)' : 'Lease (Rent)'}
                </button>
              ))}
            </div>

            {/* Form Fields */}
            <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end text-left">
              {/* City Selection with autocomplete */}
              <div className="relative">
                <label className="block text-[10px] font-mono uppercase tracking-widest text-stone-500 dark:text-stone-400 mb-1.5 font-bold">Destination</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3.5 w-4 h-4 text-stone-400" />
                  <input
                    type="text"
                    value={citySearch}
                    onChange={(e) => setCitySearch(e.target.value)}
                    placeholder="e.g. Malibu, Beverly Hills"
                    className="w-full pl-9 pr-4 py-3 bg-stone-50 dark:bg-white/[0.02] border border-stone-200/50 dark:border-white/10 rounded-xl text-xs text-stone-900 dark:text-stone-100 placeholder-stone-500 dark:placeholder-stone-300 focus:outline-none focus:border-amber-500"
                  />
                </div>

                {/* Autocomplete Suggestions */}
                {citySuggestions.length > 0 && (
                  <div className="absolute left-0 right-0 mt-1.5 bg-white dark:bg-slate-900 border border-stone-200/50 dark:border-slate-800 rounded-xl shadow-lg z-20 py-2">
                    {citySuggestions.map((suggestion) => (
                      <button
                        key={suggestion}
                        type="button"
                        onClick={() => {
                          setCitySearch(suggestion);
                          setCitySuggestions([]);
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-stone-50 dark:hover:bg-slate-850 text-xs text-stone-700 dark:text-stone-300 cursor-pointer"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Budget Range */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-[10px] font-mono uppercase tracking-widest text-stone-500 dark:text-stone-400 font-bold">Max Investment</label>
                  <span className="text-xs font-mono font-bold text-stone-800 dark:text-amber-500">
                    {priceRange === 50000000 ? '$50.0M+' : `$${(priceRange / 1000000).toFixed(1)}M`}
                  </span>
                </div>
                <div className="relative flex items-center h-5 px-1 bg-stone-100/50 dark:bg-white/[0.02] border border-stone-200/50 dark:border-white/10 rounded-xl">
                  <input
                    type="range"
                    min={2500000}
                    max={50000000}
                    step={500000}
                    value={priceRange}
                    onChange={(e) => setPriceRange(Number(e.target.value))}
                    className="w-full h-1 cursor-pointer appearance-none bg-transparent outline-none accent-transparent [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-amber-600 dark:[&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border [&::-webkit-slider-thumb]:border-stone-250 dark:[&::-webkit-slider-thumb]:border-stone-700 [&::-webkit-slider-thumb]:shadow-md [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-amber-600 dark:[&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border [&::-moz-range-thumb]:border-stone-250 [&::-moz-range-thumb]:shadow-md"
                    style={{
                      background: `linear-gradient(to right, #c5a880 0%, #c5a880 ${((priceRange - 2500000) / (50000000 - 2500000)) * 100}%, rgba(120, 113, 108, 0.2) ${((priceRange - 2500000) / (50000000 - 2500000)) * 100}%, rgba(120, 113, 108, 0.2) 100%)`
                    }}
                  />
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full py-3 bg-stone-900 hover:bg-stone-850 dark:bg-white dark:hover:bg-white/90 text-white dark:text-[#080808] font-serif font-semibold tracking-wider text-xs uppercase rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer transform hover:-translate-y-0.5"
              >
                <Search className="w-3.5 h-3.5" />
                <span>Search Portfolio</span>
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2: Featured Neighborhoods */}
      <section id="featured-neighborhoods" className="max-w-7xl mx-auto px-6 space-y-12">
        <div className="text-center space-y-3">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-amber-600 dark:text-amber-500 font-semibold">PRESTIGIOUS DESTINATIONS</p>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 dark:text-stone-100">Featured Enclaves</h2>
          <p className="text-sm text-stone-500 dark:text-stone-400 max-w-xl mx-auto">Explore target real estate metrics and lifestyles in North America’s most highly-sought after luxury sanctuaries.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {neighborhoodsData.map((n) => (
            <div
              key={n.id}
              onClick={() => handleSelectNeighborhood(n.name)}
              className="group relative h-96 rounded-2xl overflow-hidden border border-stone-200/30 dark:border-slate-900/30 shadow-sm cursor-pointer"
            >
              <img
                referrerPolicy="no-referrer"
                src={n.image}
                alt={n.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/30 to-black/25 opacity-80 group-hover:opacity-90 transition-opacity" />

              {/* Always visible name & pricing */}
              <div className="absolute bottom-6 left-6 right-6 transition-all duration-300 group-hover:translate-y-[-10px]">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-amber-500" />
                  <h3 className="font-serif text-2xl font-bold text-white">{n.name}</h3>
                </div>
                <p className="font-mono text-xs text-stone-300 mt-1 uppercase tracking-wider">Average Entry: ${(n.avgPrice / 1000000).toFixed(1)}M USD</p>

                {/* Revealed on hover */}
                <div className="h-0 group-hover:h-28 opacity-0 group-hover:opacity-100 transition-all duration-500 overflow-hidden space-y-3 pt-4 border-t border-white/10 mt-4 text-[11px] font-mono uppercase text-stone-300">
                  <div className="flex justify-between">
                    <span>Safety Registry:</span>
                    <span className="text-amber-400 font-bold">{n.crimeSafetyIndex}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Education Rating:</span>
                    <span className="text-white font-bold">{n.schoolRating}/10</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Dining & Clubs Score:</span>
                    <span className="text-white font-bold">{n.diningScore}/100</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] text-amber-500 font-bold mt-1">
                    <span>VIEW ACTIVE PORTFOLIO</span>
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 3: Latest Premium Listings Grid */}
      <section id="premium-portfolio-grid" className="max-w-7xl mx-auto px-6 space-y-12">
        <div className="flex flex-col md:flex-row justify-between items-end border-b border-stone-200/50 dark:border-slate-900/50 pb-6 gap-4">
          <div className="space-y-3">
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-amber-600 dark:text-amber-500 font-semibold">CURATED SHOWCASES</p>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 dark:text-stone-100">Featured Masterpieces</h2>
          </div>
          <button
            onClick={() => {
              setSearchFilters({
                city: '',
                type: 'all',
                minPrice: 0,
                maxPrice: 999000000,
                beds: 'all',
                baths: 'all',
                propertyType: 'all',
                sortBy: 'highest'
              });
              setPage('listings');
            }}
            className="flex items-center gap-1.5 font-serif text-sm font-semibold tracking-wider text-amber-700 dark:text-amber-500 hover:text-stone-900 dark:hover:text-stone-100 transition-colors cursor-pointer group"
          >
            <span>VIEW COMPLETE PORTFOLIO</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredListings.map((listing) => (
            <PropertyCard
              key={listing.id}
              listing={listing}
              isBookmarked={savedListingIds.includes(listing.id)}
              onBookmarkToggle={onBookmarkToggle}
              onSelect={setSelectedListingId}
              onQuickBook={onQuickBook}
            />
          ))}
        </div>
      </section>

      {/* SECTION 4: Interactive Home Valuation Widget */}
      <section id="home-valuation-preview" className="max-w-5xl mx-auto px-6">
        <div className="bg-stone-50 dark:glass-card rounded-3xl p-8 sm:p-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex p-3 bg-amber-50 dark:bg-amber-950/20 text-amber-600 dark:text-amber-500 rounded-2xl">
              <Calculator className="w-6 h-6" />
            </div>
            <div className="space-y-3">
              <h2 className="font-serif text-3xl font-bold text-stone-900 dark:text-stone-100">Instant Asset Valuation</h2>
              <p className="text-sm text-stone-500 dark:text-stone-400 leading-relaxed">
                Unlock instant predictive equity calculations using current regional trade logs, square footage dimensions, and architectural condition matrices. 
              </p>
            </div>
            <button
              onClick={() => setPage('services')}
              className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-stone-900 dark:text-amber-500 hover:text-amber-700 transition-colors"
            >
              <span>ACCESS FULL TRIPLE-STEP VALUATION</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <form onSubmit={handleValuationCalculate} className="bg-white dark:bg-white/[0.03] p-6 rounded-3xl border border-stone-150 dark:border-white/10 shadow-lg space-y-6">
            {/* Livable Sqft bespoke control */}
            <div className="space-y-2 text-left">
              <div className="flex justify-between items-center">
                <label className="block text-[10px] font-mono uppercase tracking-wider text-stone-500 dark:text-stone-400 font-bold">LIVABLE SQUARE FT</label>
                <span className="text-xs font-mono font-bold text-amber-600 dark:text-amber-500">{valuationSqft.toLocaleString()} SQFT</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <button
                  type="button"
                  onClick={() => setValuationSqft(Math.max(1000, valuationSqft - 500))}
                  className="px-2.5 sm:px-3.5 py-2 border border-stone-200 dark:border-white/10 rounded-xl hover:bg-stone-50 dark:hover:bg-white/5 text-stone-700 dark:text-stone-300 text-xs font-mono font-bold transition-all cursor-pointer shrink-0"
                >
                  -500
                </button>
                <input
                  type="number"
                  value={valuationSqft || ''}
                  onChange={(e) => setValuationSqft(Math.max(0, Number(e.target.value)))}
                  className="flex-1 min-w-0 w-full text-center px-3 sm:px-4 py-2 bg-stone-50 dark:bg-white/[0.01] border border-stone-200/50 dark:border-white/10 rounded-xl text-xs text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:border-amber-500 font-bold font-mono [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  placeholder="e.g. 4500"
                />
                <button
                  type="button"
                  onClick={() => setValuationSqft(Math.min(30000, valuationSqft + 500))}
                  className="px-2.5 sm:px-3.5 py-2 border border-stone-200 dark:border-white/10 rounded-xl hover:bg-stone-50 dark:hover:bg-white/5 text-stone-700 dark:text-stone-300 text-xs font-mono font-bold transition-all cursor-pointer shrink-0"
                >
                  +500
                </button>
              </div>
            </div>

            {/* Region Metric Selector */}
            <div className="text-left space-y-2">
              <label className="block text-[10px] font-mono uppercase tracking-wider text-stone-500 dark:text-stone-400 font-bold">REGION METRIC</label>
              <div className="flex flex-wrap gap-1.5">
                {[
                  { label: 'Malibu', val: 'Malibu' },
                  { label: 'Beverly Hills', val: 'Beverly Hills' },
                  { label: 'Manhattan', val: 'New York' },
                  { label: 'Miami', val: 'Miami' },
                  { label: 'Aspen', val: 'Aspen' },
                ].map((item) => (
                  <button
                    key={item.val}
                    type="button"
                    onClick={() => setValuationCity(item.val)}
                    className={`flex-1 min-w-[80px] sm:min-w-[100px] px-2.5 py-2 text-[10px] font-mono font-extrabold rounded-lg border transition-all text-center cursor-pointer uppercase ${
                      valuationCity === item.val
                        ? 'bg-stone-900 border-stone-900 text-white dark:bg-white dark:border-white dark:text-[#080808] shadow-md scale-[1.02]'
                        : 'bg-stone-50/50 border-stone-200/60 text-stone-500 dark:bg-white/[0.01] dark:border-white/10 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-white/5'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Architectural Condition Option Tiles */}
            <div className="text-left space-y-2">
              <label className="block text-[10px] font-mono uppercase tracking-wider text-stone-500 dark:text-stone-400 font-bold">ARCHITECTURAL CONDITION</label>
              <div className="grid grid-cols-1 gap-2">
                {[
                  { label: 'Impeccable Modern / New Construction', desc: 'Sleek custom build with state-of-the-art systems', val: 'exceptional' },
                  { label: 'Highly Maintained Custom Build', desc: 'Exquisite custom features in pristine structural care', val: 'renovated' },
                  { label: 'Good Organic Structural Condition', desc: 'Solid authentic materials in superb organic shape', val: 'standard' },
                ].map((item) => (
                  <button
                    key={item.val}
                    type="button"
                    onClick={() => setValuationCondition(item.val)}
                    className={`w-full p-3 text-left rounded-xl border transition-all flex items-start justify-between gap-3 cursor-pointer ${
                      valuationCondition === item.val
                        ? 'bg-amber-500/5 border-amber-500/50 dark:bg-amber-500/10 dark:border-amber-500/80'
                        : 'bg-stone-50/30 border-stone-150 dark:bg-white/[0.01] dark:border-white/10 hover:bg-stone-100 dark:hover:bg-white/5'
                    }`}
                  >
                    <div className="space-y-0.5">
                      <p className={`text-xs font-serif font-bold ${valuationCondition === item.val ? 'text-amber-700 dark:text-amber-400' : 'text-stone-800 dark:text-stone-200'}`}>
                        {item.label}
                      </p>
                      <p className="text-[10px] text-stone-450 dark:text-stone-400 leading-normal font-sans font-medium">
                        {item.desc}
                      </p>
                    </div>
                    <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${
                      valuationCondition === item.val ? 'border-amber-600 bg-amber-600 text-white dark:border-amber-500 dark:bg-amber-500' : 'border-stone-300 dark:border-white/10'
                    }`}>
                      {valuationCondition === item.val && (
                        <span className="w-1.5 h-1.5 rounded-full bg-white" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-stone-900 hover:bg-stone-850 dark:bg-white dark:hover:bg-white/90 text-white dark:text-[#080808] text-xs font-mono font-bold uppercase tracking-widest rounded-xl transition-all cursor-pointer shadow-md"
            >
              RUN VALUATION MODEL
            </button>

            {valuationResult !== null && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="pt-4 border-t border-stone-100 dark:border-white/10 text-center"
              >
                <p className="text-[10px] font-mono text-stone-400 dark:text-stone-500 uppercase tracking-widest">PROJECTED VALUATION RANGE</p>
                <p className="font-serif text-xl sm:text-2xl font-bold text-amber-700 dark:text-amber-500 mt-1">
                  ${(valuationResult * 0.95).toLocaleString(undefined, { maximumFractionDigits: 0 })} - ${(valuationResult * 1.05).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </p>
                <p className="text-[9px] font-mono text-stone-400 dark:text-stone-500 mt-1.5 uppercase tracking-wider">
                  *Accuracy estimated within 4.2% of final auction value
                </p>
              </motion.div>
            )}
          </form>
        </div>
      </section>

      {/* SECTION 5: Testimonials Slider */}
      <section id="testimonials-carousel" className="max-w-4xl mx-auto px-6 text-center space-y-12">
        <div className="space-y-3">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-amber-600 dark:text-amber-500 font-semibold">TESTED ACCREDITATIONS</p>
          <h2 className="font-serif text-3xl font-bold text-stone-900 dark:text-stone-100">Our Trusted Patrons</h2>
        </div>

        <div className="relative bg-white dark:glass-card p-8 sm:p-12 rounded-3xl shadow-sm min-h-[300px] flex flex-col justify-between">
          <div className="absolute top-6 left-6 text-amber-600/10 font-serif text-9xl leading-none pointer-events-none select-none">“</div>

          {/* Active review content */}
          <div className="relative z-10 my-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTestimonialIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="flex justify-center space-x-1">
                  {[...Array(reviewsData[activeTestimonialIndex].rating)].map((_, i) => (
                    <Star key={i} className="w-4.5 h-4.5 text-amber-500 fill-amber-500" />
                  ))}
                </div>
                <blockquote className="font-serif text-base sm:text-lg text-stone-700 dark:text-stone-200 italic leading-relaxed max-w-2xl mx-auto">
                  "{reviewsData[activeTestimonialIndex].text}"
                </blockquote>
                <div className="flex items-center justify-center space-x-3.5 pt-4">
                  <img
                    referrerPolicy="no-referrer"
                    src={reviewsData[activeTestimonialIndex].image}
                    alt={reviewsData[activeTestimonialIndex].author}
                    className="w-11 h-11 object-cover rounded-full shadow-md"
                  />
                  <div className="text-left">
                    <p className="font-serif font-bold text-sm text-stone-900 dark:text-stone-50">{reviewsData[activeTestimonialIndex].author}</p>
                    <p className="text-[10px] font-mono text-stone-400 uppercase tracking-widest">{reviewsData[activeTestimonialIndex].role}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Controls */}
          <div className="flex justify-center space-x-4 pt-8">
            <button
              onClick={prevTestimonial}
              className="p-2 border border-stone-250 dark:border-white/10 rounded-full text-stone-600 dark:text-stone-400 hover:bg-stone-50 dark:hover:bg-white/5 hover:text-amber-600 cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextTestimonial}
              className="p-2 border border-stone-250 dark:border-white/10 rounded-full text-stone-600 dark:text-stone-400 hover:bg-stone-50 dark:hover:bg-white/5 hover:text-amber-600 cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
