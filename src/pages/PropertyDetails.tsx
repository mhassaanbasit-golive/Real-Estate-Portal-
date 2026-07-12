import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Bookmark, X, Star, MapPin, Eye, Calendar, Sparkles, Scale, DollarSign, Clock, ShieldCheck, CheckCircle } from 'lucide-react';
import { Listing } from '../types';
import MortgageCalculator from '../components/MortgageCalculator';

interface PropertyDetailsProps {
  listing: Listing;
  onBack: () => void;
  isBookmarked: boolean;
  onBookmarkToggle: (id: string, e: React.MouseEvent) => void;
  onBookShow: (listing: Listing) => void;
}

export default function PropertyDetails({
  listing,
  onBack,
  isBookmarked,
  onBookmarkToggle,
  onBookShow,
}: PropertyDetailsProps) {
  // Lightbox index
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'desc' | 'floor' | 'location'>('desc');
  const [activeFloorLevel, setActiveFloorLevel] = useState<'ground' | 'upper'>('ground');

  // Sidebar direct showing booking state
  const [directBooking, setDirectBooking] = useState({
    name: '',
    email: '',
    phone: '',
    date: '2026-07-16',
    time: '14:00',
  });
  const [isBookingLoading, setIsBookingLoading] = useState(false);
  const [isBookingSuccess, setIsBookingSuccess] = useState(false);
  const [bookingErrors, setBookingErrors] = useState<Record<string, string>>({});

  const handleLightboxPrev = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev! - 1 + listing.images.length) % listing.images.length);
  };

  const handleLightboxNext = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev! + 1) % listing.images.length);
  };

  const handleDirectBookSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};
    if (!directBooking.name.trim()) errors.name = 'Full name is required';
    if (!directBooking.email.trim() || !directBooking.email.includes('@')) errors.email = 'Corporate email is required';
    if (!directBooking.phone.trim()) errors.phone = 'Direct line required';

    if (Object.keys(errors).length > 0) {
      setBookingErrors(errors);
      return;
    }
    setBookingErrors({});
    setIsBookingLoading(true);

    setTimeout(() => {
      setIsBookingLoading(false);
      setIsBookingSuccess(true);
    }, 1300);
  };

  return (
    <div id="property-details-showcase" className="max-w-7xl mx-auto px-6 py-8 space-y-12">
      {/* Back CTA */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-stone-500 hover:text-stone-900 dark:hover:text-amber-500 transition-colors cursor-pointer"
      >
        <ChevronLeft className="w-4 h-4" /> Return to Complete Portfolio
      </button>

      {/* Luxury Hero Gallery */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[50vh] rounded-2xl overflow-hidden shadow-sm">
        <div className="md:col-span-2 relative h-full bg-stone-100 overflow-hidden cursor-zoom-in" onClick={() => setLightboxIndex(0)}>
          <img
            referrerPolicy="no-referrer"
            src={listing.images[0]}
            alt={listing.title}
            className="w-full h-full object-cover hover:scale-101 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
        </div>

        <div className="hidden md:flex flex-col gap-4 h-full">
          <div className="h-1/2 relative bg-stone-100 overflow-hidden cursor-zoom-in" onClick={() => setLightboxIndex(1)}>
            <img
              referrerPolicy="no-referrer"
              src={listing.images[1]}
              alt={listing.title}
              className="w-full h-full object-cover hover:scale-102 transition-transform duration-500"
            />
          </div>
          <div className="h-1/2 relative bg-stone-100 overflow-hidden cursor-zoom-in" onClick={() => setLightboxIndex(2)}>
            <img
              referrerPolicy="no-referrer"
              src={listing.images[2]}
              alt={listing.title}
              className="w-full h-full object-cover hover:scale-102 transition-transform duration-500"
            />
          </div>
        </div>
      </section>

      {/* Main Core Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
        {/* LEFT COLUMN: Specifications, Details tabs, Floor plan blueprints, Mortgage calculator */}
        <div className="lg:col-span-2 space-y-12">
          {/* Headline Specs & Title */}
          <div className="space-y-4 border-b border-stone-200/50 dark:border-slate-800 pb-8">
            <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
              <div className="space-y-1">
                <span className="px-3 py-1 bg-amber-50 dark:bg-amber-950/20 text-amber-700 dark:text-amber-500 font-mono text-[10px] font-bold uppercase tracking-wider rounded-md">
                  REGISTRY ACQUISITION
                </span>
                <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-stone-900 dark:text-stone-50 tracking-tight mt-2">
                  {listing.title}
                </h1>
                <p className="text-sm text-stone-550 dark:text-stone-400 flex items-center gap-1">
                  <MapPin className="w-4 h-4 text-stone-400 shrink-0" />
                  {listing.address}, {listing.city}
                </p>
              </div>

              <div className="flex flex-col sm:items-end">
                <span className="font-serif text-3xl font-extrabold text-stone-900 dark:text-white">
                  ${listing.price.toLocaleString()}{listing.type === 'rent' ? '/mo' : ''}
                </span>
                <button
                  onClick={(e) => onBookmarkToggle(listing.id, e)}
                  className="flex items-center gap-1.5 text-xs font-mono font-bold text-amber-700 dark:text-amber-500 uppercase tracking-wider mt-1 cursor-pointer"
                >
                  <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-amber-700 dark:fill-amber-500' : ''}`} />
                  <span>{isBookmarked ? 'Property Saved' : 'Bookmark Property'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Specifications Matrix Grid */}
          <section className="space-y-4">
            <h3 className="font-serif text-lg font-bold text-stone-900 dark:text-stone-100">Specification Ledger</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { label: 'Beds & Suites', value: `${listing.beds} Bedrooms` },
                { label: 'Spa Bathrooms', value: `${listing.baths} Baths` },
                { label: 'Interior Size', value: `${listing.sqft.toLocaleString()} SQFT` },
                { label: 'Price per SQFT', value: `$${listing.pricePerSqft}` },
                { label: 'Land Lot Size', value: listing.lotSize },
                { label: 'Construction Year', value: listing.yearBuilt },
                { label: 'Estimated HOA Dues', value: `$${listing.hoa}/mo` },
                { label: 'Sanitation Code', value: 'Municipal Active' },
              ].map((spec) => (
                <div key={spec.label} className="bg-stone-50 dark:bg-white/[0.02] p-4 rounded-xl border border-stone-150 dark:border-white/10 font-mono text-[11px]">
                  <p className="text-stone-500 dark:text-stone-400 uppercase tracking-wider mb-1">{spec.label}</p>
                  <p className="text-sm font-bold text-stone-900 dark:text-stone-100">{spec.value}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Tabbed Info Deck: description, interactive blueprint layout floor plan, Walk scores */}
          <section className="space-y-6">
            <div className="flex flex-wrap gap-2 border-b border-stone-200/50 dark:border-white/10 pb-3">
              {[
                { id: 'desc', label: 'Description' },
                { id: 'floor', label: 'Interactive Floor Plans' },
                { id: 'location', label: 'Walk & Location Index' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider rounded-lg transition-colors cursor-pointer ${
                    activeTab === tab.id
                      ? 'bg-stone-900 dark:bg-white dark:text-[#080808] text-white shadow-sm'
                      : 'text-stone-500 dark:text-stone-400 hover:bg-stone-50 dark:hover:bg-white/5'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="min-h-64">
              <AnimatePresence mode="wait">
                {activeTab === 'desc' && (
                  <motion.div
                    key="desc"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-6 text-sm text-stone-755 dark:text-stone-300 leading-relaxed"
                  >
                    <p>{listing.description}</p>
                    <div className="space-y-3 pt-4">
                      <h4 className="font-serif font-bold text-stone-900 dark:text-stone-150">Premium Structural Amenities</h4>
                      <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                        {listing.amenities.map((amenity) => (
                          <div key={amenity} className="flex items-center gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                            <span>{amenity}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'floor' && (
                  <motion.div
                    key="floor"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-6"
                  >
                    {/* Floor Selector toggle */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => setActiveFloorLevel('ground')}
                        className={`px-3 py-1.5 text-[10px] font-mono font-bold tracking-widest rounded-md cursor-pointer ${activeFloorLevel === 'ground' ? 'bg-white text-slate-950 font-bold' : 'bg-stone-100 dark:bg-white/5 text-stone-700 dark:text-stone-300'}`}
                      >
                        GROUND LEVEL
                      </button>
                      <button
                        onClick={() => setActiveFloorLevel('upper')}
                        className={`px-3 py-1.5 text-[10px] font-mono font-bold tracking-widest rounded-md cursor-pointer ${activeFloorLevel === 'upper' ? 'bg-white text-slate-950 font-bold' : 'bg-stone-100 dark:bg-white/5 text-stone-700 dark:text-stone-300'}`}
                      >
                        UPPER LEVEL SUITES
                      </button>
                    </div>

                    {/* Interactive blueprint diagram */}
                    <div className="h-72 w-full border border-dashed border-stone-300 dark:border-white/10 rounded-2xl flex items-center justify-center p-6 bg-stone-50 dark:bg-white/[0.02] relative overflow-hidden">
                      {/* Styled blueprint SVG background */}
                      <svg className="w-full h-full text-stone-250 dark:text-white/5 stroke-current opacity-80" viewBox="0 0 500 200" fill="none" strokeWidth="1.5">
                        <rect x="10" y="10" width="480" height="180" rx="6" />
                        <line x1="160" y1="10" x2="160" y2="190" />
                        <line x1="320" y1="10" x2="320" y2="190" />
                        <line x1="160" y1="100" x2="490" y2="100" />
                        {activeFloorLevel === 'ground' ? (
                          <>
                            <text x="35" y="50" className="text-[10px] font-mono font-bold fill-stone-400 dark:fill-stone-600">PROFESSIONAL KITCHEN</text>
                            <text x="180" y="50" className="text-[10px] font-mono font-bold fill-stone-400 dark:fill-stone-600">GRAND SALON</text>
                            <text x="340" y="50" className="text-[10px] font-mono font-bold fill-stone-400 dark:fill-stone-600">ZERO-EDGE DECK</text>
                            <text x="180" y="150" className="text-[10px] font-mono font-bold fill-stone-400 dark:fill-stone-600">SPA ENTRANCE</text>
                          </>
                        ) : (
                          <>
                            <text x="35" y="50" className="text-[10px] font-mono font-bold fill-stone-400 dark:fill-stone-600">ROYAL SUITE</text>
                            <text x="180" y="50" className="text-[10px] font-mono font-bold fill-stone-400 dark:fill-stone-600">VIP BEDROOM 1</text>
                            <text x="340" y="50" className="text-[10px] font-mono font-bold fill-stone-400 dark:fill-stone-600">VIP BEDROOM 2</text>
                            <text x="180" y="150" className="text-[10px] font-mono font-bold fill-stone-400 dark:fill-stone-600">CREATIVE DECK</text>
                          </>
                        )}
                      </svg>
                      {/* Interactive blueprint label indicator */}
                      <div className="absolute top-4 right-4 bg-stone-900/90 text-white border border-stone-700/50 px-2.5 py-1 rounded text-[9px] font-mono">
                        ARCHITECTURAL SCALE: 1/4" = 1'0"
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'location' && (
                  <motion.div
                    key="location"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="grid grid-cols-1 sm:grid-cols-3 gap-6"
                  >
                    {[
                      { title: 'Walk Score', value: listing.walkScore, rating: 'Highly Walkable Location' },
                      { title: 'Transit Link', value: listing.transitScore, rating: 'Excellent Transit Connectivity' },
                      { title: 'Local School District', value: Math.round(listing.schoolRating * 10), rating: 'Elite Public/Private Education' },
                    ].map((idx) => (
                      <div key={idx.title} className="bg-stone-50 dark:bg-white/[0.02] p-6 rounded-2xl border border-stone-150 dark:border-white/10 text-center space-y-3">
                        <p className="text-xs font-mono uppercase font-bold text-stone-500 dark:text-stone-400">{idx.title}</p>
                        <div className="inline-flex items-center justify-center h-20 w-20 rounded-full border-4 border-amber-500/20 text-xl font-serif font-extrabold text-stone-900 dark:text-white">
                          {idx.value}
                        </div>
                        <p className="text-xs text-stone-650 dark:text-stone-300 font-semibold">{idx.rating}</p>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </section>

          {/* Embedded Mortgage Calculator */}
          <section>
            <h3 className="font-serif text-lg font-bold text-stone-900 dark:text-stone-100 mb-4">Financing & Projections</h3>
            <MortgageCalculator initialPrice={listing.price} hoaFee={listing.hoa} />
          </section>
        </div>

        {/* RIGHT COLUMN: Sticky Showing Booking Form Sidebar */}
        <div className="space-y-6 lg:sticky lg:top-24">
          <div className="bg-stone-50 dark:glass-card p-6 rounded-2xl shadow-sm space-y-5">
            <div className="border-b border-stone-200/50 dark:border-white/10 pb-4">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] font-extrabold text-amber-600 dark:text-amber-500 flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> PRIVATE VIEWING REGISTRY
              </span>
              <h4 className="font-serif text-base font-bold text-stone-900 dark:text-stone-100 mt-1">Book Private Tour</h4>
              <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">Secure bespoke physical or visual property representations</p>
            </div>

            {!isBookingSuccess ? (
              <form onSubmit={handleDirectBookSubmit} className="space-y-4">
                {/* Inputs */}
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-1">Your Full Name</label>
                  <input
                    type="text"
                    value={directBooking.name}
                    onChange={(e) => setDirectBooking({ ...directBooking, name: e.target.value })}
                    placeholder="e.g. Baron Sterling"
                    className={`w-full px-3 py-2 bg-white dark:bg-white/[0.02] border ${bookingErrors.name ? 'border-red-400' : 'border-stone-200 dark:border-white/10'} rounded-lg text-xs text-stone-900 dark:text-stone-100 focus:outline-none`}
                  />
                  {bookingErrors.name && <p className="text-[11px] text-red-500 mt-1">{bookingErrors.name}</p>}
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-1">Corporate Email</label>
                  <input
                    type="email"
                    value={directBooking.email}
                    onChange={(e) => setDirectBooking({ ...directBooking, email: e.target.value })}
                    placeholder="sterling@capital.com"
                    className={`w-full px-3 py-2 bg-white dark:bg-white/[0.02] border ${bookingErrors.email ? 'border-red-400' : 'border-stone-200 dark:border-white/10'} rounded-lg text-xs text-stone-900 dark:text-stone-100 focus:outline-none`}
                  />
                  {bookingErrors.email && <p className="text-[11px] text-red-500 mt-1">{bookingErrors.email}</p>}
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-1">Direct Phone</label>
                  <input
                    type="tel"
                    value={directBooking.phone}
                    onChange={(e) => setDirectBooking({ ...directBooking, phone: e.target.value })}
                    placeholder="+1 (310) 278-3311"
                    className={`w-full px-3 py-2 bg-white dark:bg-white/[0.02] border ${bookingErrors.phone ? 'border-red-400' : 'border-stone-200 dark:border-white/10'} rounded-lg text-xs text-stone-900 dark:text-stone-100 focus:outline-none`}
                  />
                  {bookingErrors.phone && <p className="text-[11px] text-red-500 mt-1">{bookingErrors.phone}</p>}
                </div>

                {/* Date & Time Picker */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-1">Preferred Date</label>
                    <input
                      type="date"
                      value={directBooking.date}
                      onChange={(e) => setDirectBooking({ ...directBooking, date: e.target.value })}
                      className="w-full px-2.5 py-2 bg-white dark:bg-white/[0.02] border border-stone-200 dark:border-white/10 rounded-lg text-xs text-stone-900 dark:text-stone-100 focus:outline-none cursor-pointer"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-1">Hour</label>
                    <select
                      value={directBooking.time}
                      onChange={(e) => setDirectBooking({ ...directBooking, time: e.target.value })}
                      className="w-full px-2.5 py-2 bg-white dark:bg-white/[0.02] border border-stone-200 dark:border-white/10 rounded-lg text-xs text-stone-900 dark:text-stone-100 focus:outline-none cursor-pointer"
                    >
                      <option value="10:00" className="dark:text-black">10:00 AM</option>
                      <option value="12:00" className="dark:text-black">12:00 PM</option>
                      <option value="14:00" className="dark:text-black">02:00 PM</option>
                      <option value="16:00" className="dark:text-black">04:00 PM</option>
                      <option value="18:00" className="dark:text-black">06:00 PM</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isBookingLoading}
                  className="w-full py-3 bg-stone-900 hover:bg-stone-850 dark:bg-white dark:hover:bg-stone-200 text-white dark:text-slate-950 font-serif text-xs uppercase tracking-widest rounded-xl transition-all font-bold disabled:opacity-50 cursor-pointer"
                >
                  {isBookingLoading ? 'TRANSMITTING BRIEF...' : 'CONFIRM SHOWING'}
                </button>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-6 space-y-4"
              >
                <div className="inline-flex p-3 bg-amber-50 dark:bg-amber-950/20 text-amber-600 rounded-full">
                  <CheckCircle className="w-10 h-10" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-serif font-bold text-sm text-stone-950 dark:text-stone-50">Viewing Confirmed</h4>
                  <p className="text-[11px] text-stone-500 leading-relaxed max-w-xs mx-auto">
                    The viewing slots for <strong>{directBooking.date}</strong> at <strong>{directBooking.time}</strong> are now reserved. An invitations link has been transmitted.
                  </p>
                </div>
              </motion.div>
            )}

            <div className="pt-2 border-t border-stone-200/50 dark:border-white/10 flex items-center justify-center gap-1 text-[10px] font-mono text-stone-400 uppercase tracking-widest">
              <ShieldCheck className="w-3.5 h-3.5" /> SECURE TRADING PROTOCOLS
            </div>
          </div>
        </div>
      </div>

      {/* FULLSCREEN LIGHTBOX MODAL */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/95 backdrop-blur-md">
            <button
              onClick={() => setLightboxIndex(null)}
              className="absolute top-6 right-6 p-2 text-stone-400 hover:text-white bg-black/40 hover:bg-black/60 rounded-full transition-colors cursor-pointer z-10"
            >
              <X className="w-6 h-6" />
            </button>

            <button
              onClick={handleLightboxPrev}
              className="absolute left-6 p-3 text-stone-400 hover:text-white bg-black/40 hover:bg-black/60 rounded-full transition-colors cursor-pointer z-10"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>

            <div className="relative max-w-5xl max-h-[80vh] px-4 select-none">
              <img
                referrerPolicy="no-referrer"
                src={listing.images[lightboxIndex]}
                alt={`${listing.title} fullscreen gallery`}
                className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
              />
              <p className="absolute bottom-[-32px] left-1/2 -translate-x-1/2 text-xs font-mono text-stone-400 uppercase tracking-wider">
                IMAGE {lightboxIndex + 1} OF {listing.images.length}
              </p>
            </div>

            <button
              onClick={handleLightboxNext}
              className="absolute right-6 p-3 text-stone-400 hover:text-white bg-black/40 hover:bg-black/60 rounded-full transition-colors cursor-pointer z-10"
            >
              <ChevronRight className="w-8 h-8" />
            </button>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
