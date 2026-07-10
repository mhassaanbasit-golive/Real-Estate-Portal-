import React, { useState, useMemo } from 'react';
import { Grid, List, Map as MapIcon, SlidersHorizontal, ArrowUpDown, RefreshCw, X, Sparkles, MapPin, Eye, Calendar, Bookmark, Star } from 'lucide-react';
import { Listing } from '../types';
import { listingsData } from '../data';
import PropertyCard from '../components/PropertyCard';

interface ListingsProps {
  setSelectedListingId: (id: string | null) => void;
  savedListingIds: string[];
  onBookmarkToggle: (id: string, e: React.MouseEvent) => void;
  onQuickBook: (listing: Listing, e: React.MouseEvent) => void;
  searchFilters: {
    city: string;
    type: 'buy' | 'rent' | 'all';
    minPrice: number;
    maxPrice: number;
    beds: string;
    baths: string;
    propertyType: string;
    sortBy: string;
  };
  setSearchFilters: React.Dispatch<React.SetStateAction<any>>;
}

export default function Listings({
  setSelectedListingId,
  savedListingIds,
  onBookmarkToggle,
  onQuickBook,
  searchFilters,
  setSearchFilters,
}: ListingsProps) {
  // Views: 'grid' | 'list' | 'map'
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'map'>('grid');

  // Local filter states connected with initial global search filters
  const [localCity, setLocalCity] = useState(searchFilters.city);
  const [localType, setLocalType] = useState<'buy' | 'rent' | 'all'>(searchFilters.type);
  const [localBeds, setLocalBeds] = useState<string>(searchFilters.beds);
  const [localBaths, setLocalBaths] = useState<string>(searchFilters.baths);
  const [minPrice, setMinPrice] = useState<number>(searchFilters.minPrice);
  const [maxPrice, setMaxPrice] = useState<number>(searchFilters.maxPrice);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [yearBuilt, setYearBuilt] = useState<number>(2015);
  const [sortBy, setSortBy] = useState<string>(searchFilters.sortBy || 'highest');
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Toggle amenities
  const handleAmenityToggle = (amenity: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity) ? prev.filter((a) => a !== amenity) : [...prev, amenity]
    );
  };

  // Reset Filters
  const handleResetFilters = () => {
    setLocalCity('');
    setLocalType('all');
    setLocalBeds('all');
    setLocalBaths('all');
    setMinPrice(0);
    setMaxPrice(999000000);
    setSelectedAmenities([]);
    setYearBuilt(2015);
    setSortBy('highest');

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
  };

  // Filter listings based on criteria
  const filteredListings = useMemo(() => {
    return listingsData
      .filter((l) => {
        // City search
        if (localCity && !l.city.toLowerCase().includes(localCity.toLowerCase()) && !l.neighborhood.toLowerCase().includes(localCity.toLowerCase())) {
          return false;
        }
        // Acquire vs Lease Type
        if (localType !== 'all' && l.type !== localType) {
          return false;
        }
        // Beds
        if (localBeds !== 'all' && l.beds < Number(localBeds)) {
          return false;
        }
        // Baths
        if (localBaths !== 'all' && l.baths < Number(localBaths)) {
          return false;
        }
        // Price limits
        if (l.price < minPrice || l.price > maxPrice) {
          return false;
        }
        // Year built
        if (l.yearBuilt < yearBuilt) {
          return false;
        }
        // Amenities Check
        if (selectedAmenities.length > 0) {
          const hasAllSelected = selectedAmenities.every((amenity) =>
            l.amenities.map(a => a.toLowerCase()).includes(amenity.toLowerCase())
          );
          if (!hasAllSelected) return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'lowest') return a.price - b.price;
        if (sortBy === 'highest') return b.price - a.price;
        if (sortBy === 'newest') return b.yearBuilt - a.yearBuilt;
        return b.price - a.price; // default popular
      });
  }, [localCity, localType, localBeds, localBaths, minPrice, maxPrice, selectedAmenities, yearBuilt, sortBy]);

  // Coordinates list for mock luxury map
  const mockPins = [
    { id: 'lst_1', x: '25%', y: '45%', title: 'The Solitaire Manor', price: '$24.5M' },
    { id: 'lst_2', x: '55%', y: '30%', title: 'The Obsidian Bel Air', price: '$18.9M' },
    { id: 'lst_3', x: '80%', y: '75%', title: 'The Crown Jewel Penthouse', price: '$32.0M' },
    { id: 'lst_4', x: '42%', y: '65%', title: 'Amara Modern Pavilion', price: '$45K/mo' },
    { id: 'lst_5', x: '15%', y: '20%', title: 'Summit Alpine Sanctuary', price: '$14.2M' },
    { id: 'lst_6', x: '68%', y: '50%', title: 'The Obsidian Pavilion', price: '$32K/mo' }
  ];

  const [activeMapPinId, setActiveMapPinId] = useState<string | null>(null);
  const activeMapListing = listingsData.find((l) => l.id === activeMapPinId);

  return (
    <div id="listings-search-engine" className="max-w-7xl mx-auto px-6 py-8 flex flex-col lg:flex-row gap-10">
      {/* LEFT: FILTER PANEL */}
      <aside className="w-full lg:w-80 shrink-0 space-y-4">
        {/* Mobile Filter Toggle Button */}
        <button
          type="button"
          onClick={() => setShowMobileFilters(!showMobileFilters)}
          className="lg:hidden w-full flex items-center justify-between p-4 bg-white dark:glass-card border border-stone-200/50 dark:border-stone-800 rounded-2xl text-xs font-mono font-bold tracking-wider text-stone-900 dark:text-stone-100 cursor-pointer shadow-sm"
        >
          <span className="flex items-center gap-2">
            <SlidersHorizontal className="w-4.5 h-4.5 text-amber-600 dark:text-amber-500" />
            FILTER CONSTRAINTS
          </span>
          <span className="text-amber-600 dark:text-amber-500 font-extrabold">{showMobileFilters ? 'HIDE' : 'SHOW'}</span>
        </button>

        <div className={`${showMobileFilters ? 'block' : 'hidden lg:block'} bg-white dark:glass-card p-6 rounded-2xl shadow-sm space-y-5 border border-stone-150 dark:border-white/5`}>
          <div className="flex items-center justify-between pb-3 border-b border-stone-100 dark:border-white/10">
            <span className="font-serif font-bold text-base text-stone-900 dark:text-stone-100 flex items-center gap-1.5">
              <SlidersHorizontal className="w-4.5 h-4.5 text-amber-600 dark:text-amber-500" />
              Advanced Filters
            </span>
            <button
              onClick={handleResetFilters}
              className="text-[10px] font-mono text-stone-400 hover:text-amber-600 dark:hover:text-amber-500 uppercase tracking-wider flex items-center gap-1 cursor-pointer"
            >
              <RefreshCw className="w-3 h-3" /> Reset
            </button>
          </div>

          <div className="space-y-4">
            {/* Destination */}
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-1.5 font-bold">Destination Enclave</label>
              <input
                type="text"
                value={localCity}
                onChange={(e) => setLocalCity(e.target.value)}
                placeholder="Malibu, Beverly Hills, NY..."
                className="w-full px-3.5 py-2 bg-stone-50 dark:bg-white/[0.02] border border-stone-200/50 dark:border-white/10 rounded-lg text-xs text-stone-900 dark:text-stone-100 placeholder-stone-500 dark:placeholder-stone-300 focus:outline-none focus:border-amber-500"
              />
            </div>

            {/* Type */}
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-1.5 font-bold">Acquisition Type</label>
              <div className="grid grid-cols-3 gap-2">
                {(['all', 'buy', 'rent'] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setLocalType(t)}
                    className={`py-1.5 text-[10px] font-mono font-bold rounded-md transition-all cursor-pointer ${
                      localType === t
                        ? 'bg-stone-900 dark:bg-white dark:text-slate-950'
                        : 'bg-stone-50 dark:bg-white/[0.02] text-stone-600 dark:text-stone-400 border border-stone-150 dark:border-white/10'
                    }`}
                  >
                    {t.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            {/* Beds & Baths */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-1.5 font-bold">Beds Min</label>
                <select
                  value={localBeds}
                  onChange={(e) => setLocalBeds(e.target.value)}
                  className="w-full px-2 py-1.5 bg-stone-50 dark:bg-white/[0.02] border border-stone-200/50 dark:border-white/10 rounded-lg text-xs text-stone-900 dark:text-stone-100 focus:outline-none focus:border-amber-500 cursor-pointer"
                >
                  <option value="all" className="dark:text-black">No Min</option>
                  <option value="3" className="dark:text-black">3+ Beds</option>
                  <option value="4" className="dark:text-black">4+ Beds</option>
                  <option value="5" className="dark:text-black">5+ Beds</option>
                  <option value="6" className="dark:text-black">6+ Beds</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-1.5 font-bold">Baths Min</label>
                <select
                  value={localBaths}
                  onChange={(e) => setLocalBaths(e.target.value)}
                  className="w-full px-2 py-1.5 bg-stone-50 dark:bg-white/[0.02] border border-stone-200/50 dark:border-white/10 rounded-lg text-xs text-stone-900 dark:text-stone-100 focus:outline-none focus:border-amber-500 cursor-pointer"
                >
                  <option value="all" className="dark:text-black">No Min</option>
                  <option value="3" className="dark:text-black">3+ Baths</option>
                  <option value="4" className="dark:text-black">4+ Baths</option>
                  <option value="5" className="dark:text-black">5+ Baths</option>
                </select>
              </div>
            </div>

            {/* Price Boundaries */}
            <div className="space-y-2">
              <label className="block text-[11px] font-mono uppercase tracking-wider text-stone-500 dark:text-stone-400 font-bold">Budget Limits</label>
              <div className="flex gap-2 text-xs">
                <input
                  type="number"
                  placeholder="Min $"
                  value={minPrice || ''}
                  onChange={(e) => setMinPrice(Number(e.target.value))}
                  className="w-1/2 px-2.5 py-1.5 bg-stone-50 dark:bg-white/[0.02] border border-stone-200/50 dark:border-white/10 rounded-lg text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:border-amber-500"
                />
                <input
                  type="number"
                  placeholder="Max $"
                  value={maxPrice === 999000000 ? '' : maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value ? Number(e.target.value) : 999000000)}
                  className="w-1/2 px-2.5 py-1.5 bg-stone-50 dark:bg-white/[0.02] border border-stone-200/50 dark:border-white/10 rounded-lg text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            {/* Year Built */}
            <div>
              <div className="flex justify-between text-[11px] font-mono uppercase text-stone-500 dark:text-stone-400 mb-1.5 font-bold">
                <span>Const. Year Built</span>
                <span className="text-amber-600 dark:text-amber-500 font-bold">{yearBuilt}+</span>
              </div>
              <input
                type="range"
                min={2010}
                max={2024}
                step={1}
                value={yearBuilt}
                onChange={(e) => setYearBuilt(Number(e.target.value))}
                className="w-full accent-amber-600 cursor-pointer h-1 bg-stone-100 dark:bg-white/10 rounded"
              />
            </div>

            {/* Amenities Multiselect checkboxes */}
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-2 font-bold">VIP Amenities</label>
              <div className="space-y-1.5 text-xs text-stone-700 dark:text-stone-300">
                {['Infinity Pool', 'Home Cinema', 'Wine Cellar', 'Smart Automation', 'Private Beach Access', 'Wellness Spa', 'Koi Ponds'].map((amenity) => (
                  <label key={amenity} className="flex items-center space-x-2 cursor-pointer py-0.5">
                    <input
                      type="checkbox"
                      checked={selectedAmenities.includes(amenity)}
                      onChange={() => handleAmenityToggle(amenity)}
                      className="accent-amber-600 rounded border-stone-300 focus:ring-0"
                    />
                    <span className="text-stone-750 dark:text-stone-300">{amenity}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* RIGHT: LISTING GRID & CONTROLLER */}
      <main id="listings-portfolio-container" className="flex-1 space-y-6">
        {/* Dynamic header metrics */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white dark:glass-card p-4 rounded-2xl shadow-sm gap-4">
          <div className="text-sm">
            <span className="font-bold text-stone-900 dark:text-stone-100">{filteredListings.length}</span> luxury estates matches found
          </div>

          <div className="flex items-center space-x-4 w-full sm:w-auto justify-between sm:justify-end">
            {/* Sorting */}
            <div className="flex items-center space-x-2">
              <ArrowUpDown className="w-4 h-4 text-stone-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent text-xs font-semibold text-stone-700 dark:text-stone-300 focus:outline-none cursor-pointer"
              >
                <option value="highest">Price: High to Low</option>
                <option value="lowest">Price: Low to High</option>
                <option value="newest">Year Built: Modern</option>
              </select>
            </div>

            {/* Layout Toggles */}
            <div className="flex items-center bg-stone-50 dark:bg-white/[0.02] rounded-lg p-1 border border-stone-150 dark:border-white/10">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-md cursor-pointer transition-all ${viewMode === 'grid' ? 'bg-white dark:bg-white dark:text-[#080808] shadow-sm text-amber-600' : 'text-stone-400 hover:text-stone-600 dark:text-stone-300'}`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-md cursor-pointer transition-all ${viewMode === 'list' ? 'bg-white dark:bg-white dark:text-[#080808] shadow-sm text-amber-600' : 'text-stone-400 hover:text-stone-600 dark:text-stone-300'}`}
              >
                <List className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('map')}
                className={`p-1.5 rounded-md cursor-pointer transition-all ${viewMode === 'map' ? 'bg-white dark:bg-white dark:text-[#080808] shadow-sm text-amber-600' : 'text-stone-400 hover:text-stone-600 dark:text-stone-300'}`}
              >
                <MapIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Dynamic View rendering */}
        {filteredListings.length === 0 ? (
          <div className="py-20 text-center bg-white dark:bg-slate-900 rounded-2xl border border-stone-200/50 dark:border-slate-800/50 space-y-4">
            <p className="font-serif text-lg font-semibold text-stone-900 dark:text-stone-200">No matching luxury assets in our current registry</p>
            <p className="text-xs text-stone-400 max-w-sm mx-auto">Try resetting active constraints or broaden your price multipliers to find matched assets.</p>
            <button
              onClick={handleResetFilters}
              className="px-5 py-2.5 bg-stone-900 dark:bg-amber-600 text-white dark:text-slate-950 font-serif font-bold text-xs uppercase tracking-wider rounded-lg cursor-pointer"
            >
              Reset Search Parameters
            </button>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredListings.map((listing) => (
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
        ) : viewMode === 'list' ? (
          <div className="space-y-6">
            {filteredListings.map((listing) => {
              const isBookmarked = savedListingIds.includes(listing.id);
              return (
                <div
                  key={listing.id}
                  onClick={() => setSelectedListingId(listing.id)}
                  className="bg-white dark:bg-slate-900 rounded-2xl border border-stone-200/50 dark:border-slate-800/50 shadow-sm overflow-hidden flex flex-col md:flex-row cursor-pointer hover:shadow-lg group"
                >
                  {/* Left Side image */}
                  <div className="w-full md:w-80 h-64 shrink-0 relative bg-stone-100">
                    <img
                      referrerPolicy="no-referrer"
                      src={listing.images[0]}
                      alt={listing.title}
                      className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-stone-900/95 dark:bg-amber-600/95 text-white dark:text-slate-950 font-mono text-[9px] font-bold uppercase tracking-wider rounded">
                        FOR {listing.type.toUpperCase()}
                      </span>
                    </div>
                  </div>

                  {/* Right Side body */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="flex justify-between items-baseline">
                        <h3 className="font-serif text-lg font-bold text-stone-900 dark:text-stone-50 group-hover:text-amber-700 transition-colors">
                          {listing.title}
                        </h3>
                        <span className="font-serif text-lg font-extrabold text-stone-900 dark:text-stone-100">
                          ${listing.price.toLocaleString()}
                        </span>
                      </div>

                      <p className="text-xs text-stone-500 dark:text-stone-400 line-clamp-2 leading-relaxed">
                        {listing.description}
                      </p>

                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {listing.amenities.slice(0, 3).map((a) => (
                          <span key={a} className="px-2 py-0.5 bg-stone-50 dark:bg-slate-950 border border-stone-150 dark:border-slate-850 text-[10px] font-mono rounded text-stone-550 dark:text-stone-400">
                            {a}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between border-t border-stone-100 dark:border-slate-850 pt-4 mt-4">
                      <div className="flex space-x-4 font-mono text-[11px] text-stone-550 dark:text-stone-400 uppercase">
                        <span><strong>{listing.beds}</strong> Beds</span>
                        <span><strong>{listing.baths}</strong> Baths</span>
                        <span><strong>{listing.sqft}</strong> Sq Ft</span>
                      </div>

                      <div className="flex items-center space-x-2">
                        <button
                          onClick={(e) => onBookmarkToggle(listing.id, e)}
                          className="p-2 border border-stone-200 dark:border-slate-800 rounded-lg text-stone-600 dark:text-stone-400 hover:text-amber-600"
                        >
                          <Bookmark className={`w-4.5 h-4.5 ${isBookmarked ? 'fill-amber-600 stroke-amber-600' : ''}`} />
                        </button>
                        <button
                          onClick={(e) => onQuickBook(listing, e)}
                          className="px-4 py-2 bg-stone-900 hover:bg-stone-800 dark:bg-amber-600 dark:hover:bg-amber-500 text-white dark:text-slate-950 font-serif font-bold text-xs uppercase rounded-lg transition-colors"
                        >
                          Private Showing
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* MOCK LUXURY INTERACTIVE MAP VIEW */
          <div className="relative h-[650px] rounded-3xl border border-stone-200/50 dark:border-slate-800/50 overflow-hidden shadow-inner bg-slate-900">
            {/* Custom vector map representation */}
            <div className="absolute inset-0 bg-stone-100 dark:bg-slate-950 opacity-95">
              {/* Abstract Land masses */}
              <svg className="w-full h-full text-stone-200 dark:text-slate-900 fill-current" viewBox="0 0 800 600">
                <path d="M50 80 C 150 100, 180 50, 300 120 C 420 190, 480 300, 410 420 C 340 540, 180 580, 100 500 Z" />
                <path d="M500 50 C 600 80, 680 120, 750 250 C 820 380, 700 520, 600 580 C 500 640, 410 480, 480 350 Z" />
              </svg>
              {/* Grid map overlay */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
            </div>

            {/* Pins layer */}
            {mockPins.map((pin) => {
              const matchedListing = listingsData.find((l) => l.id === pin.id);
              const isSelected = activeMapPinId === pin.id;
              if (!matchedListing) return null;

              return (
                <div
                  key={pin.id}
                  style={{ top: pin.y, left: pin.x }}
                  className="absolute z-10 -translate-x-1/2 -translate-y-1/2 cursor-pointer group/pin"
                  onClick={() => setActiveMapPinId(pin.id)}
                >
                  {/* Dynamic Pointer Marker */}
                  <div className={`relative flex items-center justify-center p-2 rounded-xl border font-mono text-[10px] font-bold shadow-md transition-all ${
                    isSelected
                      ? 'bg-amber-600 border-amber-600 text-slate-950 scale-110 z-20'
                      : 'bg-stone-900/90 dark:bg-slate-900/90 border-stone-700/50 text-white hover:bg-stone-800'
                  }`}>
                    <MapPin className="w-3.5 h-3.5 text-amber-500 mr-1" />
                    <span>{pin.price}</span>
                  </div>
                </div>
              );
            })}

            {/* Floating Top Warning Map Guide */}
            <div className="absolute top-4 left-4 z-10 bg-stone-900/90 px-4 py-2.5 rounded-xl border border-stone-700/50 text-xs text-white max-w-sm flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              <p className="font-mono text-[10px] uppercase tracking-wider">SECURED SATELLITE RADAR CONNECTED (SIMULATED MAPBOX)</p>
            </div>

            {/* Selected Listing Popup Info Card at Bottom */}
            {activeMapListing && (
              <div className="absolute bottom-6 left-6 right-6 z-20 max-w-lg mx-auto bg-white dark:bg-slate-900 border border-stone-200/50 dark:border-slate-800/50 p-4 rounded-2xl shadow-2xl flex gap-4">
                <img
                  referrerPolicy="no-referrer"
                  src={activeMapListing.images[0]}
                  alt={activeMapListing.title}
                  className="w-28 h-24 object-cover rounded-xl shrink-0"
                />
                <div className="flex-1 flex flex-col justify-between">
                  <div className="space-y-1">
                    <div className="flex justify-between items-start">
                      <h4 className="font-serif font-bold text-sm text-stone-900 dark:text-stone-50 line-clamp-1">
                        {activeMapListing.title}
                      </h4>
                      <button
                        onClick={() => setActiveMapPinId(null)}
                        className="text-stone-400 hover:text-stone-600 p-0.5 cursor-pointer"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-[11px] text-stone-500 dark:text-stone-400 line-clamp-1">{activeMapListing.address}, {activeMapListing.city}</p>
                    <p className="text-xs font-mono font-extrabold text-amber-600 dark:text-amber-500">${activeMapListing.price.toLocaleString()}</p>
                  </div>

                  <div className="flex gap-2 justify-end pt-1">
                    <button
                      onClick={() => setSelectedListingId(activeMapListing.id)}
                      className="px-3.5 py-1.5 bg-stone-100 dark:bg-slate-850 text-stone-850 dark:text-stone-200 font-serif text-[10px] uppercase rounded-lg cursor-pointer"
                    >
                      SPEC DETAILS
                    </button>
                    <button
                      onClick={(e) => onQuickBook(activeMapListing, e)}
                      className="px-3.5 py-1.5 bg-stone-900 dark:bg-amber-600 text-white dark:text-slate-950 font-serif text-[10px] uppercase rounded-lg cursor-pointer font-semibold"
                    >
                      BOOK TOUR
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
