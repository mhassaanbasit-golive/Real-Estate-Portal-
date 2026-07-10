import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Bookmark, ChevronLeft, ChevronRight, Eye, Calendar, MapPin, Sparkles } from 'lucide-react';
import { Listing } from '../types';

interface PropertyCardProps {
  key?: string;
  listing: Listing;
  isBookmarked: boolean;
  onBookmarkToggle: (id: string, e: React.MouseEvent) => void;
  onSelect: (id: string) => void;
  onQuickBook: (listing: Listing, e: React.MouseEvent) => void;
}

export default function PropertyCard({
  listing,
  isBookmarked,
  onBookmarkToggle,
  onSelect,
  onQuickBook,
}: PropertyCardProps) {
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const [isSaved, setIsSaved] = useState(isBookmarked);

  React.useEffect(() => {
    setIsSaved(isBookmarked);
  }, [isBookmarked]);

  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsSaved(!isSaved);
    onBookmarkToggle(listing.id, e);
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImgIndex((prev) => (prev + 1) % listing.images.length);
  };

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImgIndex((prev) => (prev - 1 + listing.images.length) % listing.images.length);
  };

  return (
    <motion.div
      id={`property-card-${listing.id}`}
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      onClick={() => onSelect(listing.id)}
      className="bg-white dark:glass-card rounded-2xl overflow-hidden border border-stone-200/50 shadow-sm hover:shadow-xl transition-shadow flex flex-col group cursor-pointer"
    >
      {/* Media Container */}
      <div className="relative h-72 w-full overflow-hidden bg-stone-100">
        <img
          referrerPolicy="no-referrer"
          src={listing.images[currentImgIndex]}
          alt={listing.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />

        {/* Overlay Dark Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 pointer-events-none" />

        {/* Header Badges */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-auto">
          <div className="flex space-x-2">
            <span className="px-3 py-1 bg-stone-900/90 dark:bg-white text-white dark:text-[#050505] font-mono text-[10px] font-bold uppercase tracking-wider rounded-md backdrop-blur-sm">
              FOR {listing.type === 'buy' ? 'SALE' : 'LEASE'}
            </span>
            {listing.isFeatured && (
              <span className="px-3 py-1 bg-amber-600/95 text-white font-mono text-[10px] font-bold uppercase tracking-wider rounded-md backdrop-blur-sm flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> FEATURED
              </span>
            )}
          </div>

          <button
            onClick={handleBookmarkClick}
            className="p-2 bg-white/80 dark:bg-slate-950/80 hover:bg-white dark:hover:bg-slate-950 text-stone-700 dark:text-stone-300 hover:text-amber-600 dark:hover:text-amber-500 rounded-full shadow-md backdrop-blur-sm transition-colors cursor-pointer"
          >
            <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-amber-600 stroke-amber-600 dark:fill-amber-500 dark:stroke-amber-500' : ''}`} />
          </button>
        </div>

        {/* Custom Nested Gallery Controls */}
        <div className="absolute inset-y-0 left-2 right-2 flex items-center justify-between lg:opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={handlePrevImage}
            className="p-1.5 rounded-full bg-white/85 dark:bg-slate-950/80 hover:bg-white text-stone-800 dark:text-stone-200 transition-colors cursor-pointer shadow-sm"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={handleNextImage}
            className="p-1.5 rounded-full bg-white/85 dark:bg-slate-950/80 hover:bg-white text-stone-800 dark:text-stone-200 transition-colors cursor-pointer shadow-sm"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Gallery Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-1.5 z-10">
          {listing.images.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === currentImgIndex ? 'w-4 bg-white' : 'w-1.5 bg-white/50'
              }`}
            />
          ))}
        </div>

        {/* Interactive Virtual Tour Badge */}
        <div className="absolute bottom-4 left-4 flex items-center space-x-1 bg-stone-900/75 px-2 py-1 rounded text-[10px] font-semibold text-white tracking-wider uppercase font-mono">
          <Eye className="w-3.5 h-3.5 text-amber-400" />
          <span>3D VIRTUAL TOUR AVAILABLE</span>
        </div>
      </div>

      {/* Content Container */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div className="space-y-2">
          {/* Price & Neighborhood */}
          <div className="flex items-baseline justify-between">
            <span className="font-serif text-xl font-bold text-stone-900 dark:text-stone-100">
              ${listing.price.toLocaleString()}{listing.type === 'rent' ? '/mo' : ''}
            </span>
            <span className="text-xs text-stone-500 dark:text-stone-400 font-medium tracking-wide uppercase flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-stone-400" />
              {listing.neighborhood}
            </span>
          </div>

          {/* Title */}
          <h3 className="font-serif text-base font-semibold text-stone-900 dark:text-stone-100 group-hover:text-amber-700 dark:group-hover:text-amber-500 transition-colors line-clamp-1">
            {listing.title}
          </h3>

          {/* Specifications */}
          <div className="grid grid-cols-3 gap-2 border-y border-stone-100 dark:border-white/10 py-3 text-stone-600 dark:text-stone-400 font-mono text-[11px] font-medium uppercase tracking-wider">
            <div className="text-center border-r border-stone-100 dark:border-white/10">
              <span className="block font-sans font-bold text-sm text-stone-900 dark:text-stone-100 mb-0.5">{listing.beds}</span>
              <span>Beds</span>
            </div>
            <div className="text-center border-r border-stone-100 dark:border-white/10">
              <span className="block font-sans font-bold text-sm text-stone-900 dark:text-stone-100 mb-0.5">{listing.baths}</span>
              <span>Baths</span>
            </div>
            <div className="text-center">
              <span className="block font-sans font-bold text-sm text-stone-900 dark:text-stone-100 mb-0.5">{(listing.sqft).toLocaleString()}</span>
              <span>Sq Ft</span>
            </div>
          </div>
        </div>

        {/* Footer/Actions */}
        <div className="mt-5 pt-1 flex items-center justify-between gap-3">
          <span className="text-xs text-stone-500 dark:text-stone-400 line-clamp-1 max-w-[140px]">
            {listing.address}
          </span>
          <button
            onClick={(e) => onQuickBook(listing, e)}
            className="flex items-center gap-1 px-4 py-2 bg-stone-100 hover:bg-stone-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-stone-850 dark:text-stone-100 font-serif font-medium text-[11px] uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
          >
            <Calendar className="w-3.5 h-3.5 text-amber-600 dark:text-amber-500" />
            <span>Show</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}
