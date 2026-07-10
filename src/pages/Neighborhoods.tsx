import { useState, useEffect } from 'react';
import { Sun, Cloud, Wind, Thermometer, MapPin, ArrowRight, Compass, Shield, Award, Star } from 'lucide-react';
import { NeighborhoodGuide } from '../types';
import { neighborhoodsData } from '../data';

interface NeighborhoodsProps {
  setSearchFilters: (filters: any) => void;
  setPage: (page: any) => void;
}

export default function Neighborhoods({ setSearchFilters, setPage }: NeighborhoodsProps) {
  const [guides, setGuides] = useState<NeighborhoodGuide[]>(neighborhoodsData);
  const [hoveredGuideId, setHoveredGuideId] = useState<string | null>(null);

  // Simulate real-time weather fluctuations slightly to reflect dynamic live data
  useEffect(() => {
    const interval = setInterval(() => {
      setGuides((prevGuides) =>
        prevGuides.map((guide) => ({
          ...guide,
          weatherSim: {
            ...guide.weatherSim,
            temp: guide.weatherSim.temp + (Math.random() > 0.5 ? 1 : -1),
          },
        }))
      );
    }, 4000);

    return () => clearInterval(interval);
  }, []);

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

  return (
    <div id="neighborhood-guides-page" className="max-w-7xl mx-auto px-6 py-12 space-y-16">
      {/* Page Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-amber-600 dark:text-amber-500 font-semibold">LOCAL ENCLAVE INTELLIGENCE</p>
        <h1 className="font-serif text-4xl sm:text-5xl font-extrabold text-stone-900 dark:text-white tracking-tight leading-tight">
          Neighborhood Authority Guides
        </h1>
        <p className="text-sm text-stone-550 dark:text-stone-400">
          Empirical area diagnostics, safety index calculations, school board ratings, and live coastal weather telemetry.
        </p>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {guides.map((guide) => (
          <div
            key={guide.id}
            onMouseEnter={() => setHoveredGuideId(guide.id)}
            onMouseLeave={() => setHoveredGuideId(null)}
            className="bg-white dark:glass-card rounded-3xl overflow-hidden shadow-sm flex flex-col justify-between group"
          >
            {/* Top Media Cover */}
            <div className="h-64 relative overflow-hidden bg-stone-100">
              <img
                referrerPolicy="no-referrer"
                src={guide.image}
                alt={guide.name}
                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent pointer-events-none" />

              {/* Weather Widget Injected over photo */}
              <div className="absolute top-4 right-4 bg-stone-950/80 backdrop-blur-md border border-stone-850 px-3 py-1.5 rounded-2xl flex items-center gap-2 text-white text-[11px] font-mono shadow-md">
                {guide.weatherSim.icon === 'Sun' ? (
                  <Sun className="w-4 h-4 text-amber-400 animate-spin-slow" />
                ) : (
                  <Cloud className="w-4 h-4 text-stone-300 animate-pulse" />
                )}
                <span>{guide.weatherSim.temp}°F</span>
                <span className="text-stone-400 text-[10px]">| {guide.weatherSim.condition}</span>
              </div>

              {/* Title Overlay */}
              <div className="absolute bottom-4 left-6 flex items-center gap-1.5">
                <MapPin className="w-5 h-5 text-amber-500" />
                <h2 className="font-serif text-2xl font-bold text-white tracking-tight">{guide.name}</h2>
              </div>
            </div>

            {/* Core Body */}
            <div className="p-6 space-y-6 flex-1 flex flex-col justify-between">
              <p className="text-xs text-stone-550 dark:text-stone-400 leading-relaxed min-h-20">
                {guide.description}
              </p>

              {/* Diagnostic Indices ledger */}
              <div className="grid grid-cols-2 gap-4 border-y border-stone-100 dark:border-slate-850 py-4 font-mono text-[11px]">
                <div className="space-y-1.5">
                  <p className="text-stone-400 uppercase tracking-widest font-bold">Basis Price</p>
                  <p className="text-sm font-sans font-bold text-stone-900 dark:text-white">
                    ${(guide.avgPrice / 1000000).toFixed(1)}M Median
                  </p>
                </div>

                <div className="space-y-1.5">
                  <p className="text-stone-400 uppercase tracking-widest font-bold">Safety Index</p>
                  <div className="flex items-center gap-1">
                    <Shield className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    <span className="text-sm font-sans font-bold text-stone-900 dark:text-white">{guide.crimeSafetyIndex}</span>
                  </div>
                </div>

                <div className="space-y-1.5 pt-2">
                  <p className="text-stone-400 uppercase tracking-widest font-bold">School Board</p>
                  <div className="flex items-center gap-1">
                    <Award className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    <span className="text-sm font-sans font-bold text-stone-900 dark:text-white">{guide.schoolRating}/10 Rating</span>
                  </div>
                </div>

                <div className="space-y-1.5 pt-2">
                  <p className="text-stone-400 uppercase tracking-widest font-bold">Gastronomy Score</p>
                  <div className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    <span className="text-sm font-sans font-bold text-stone-900 dark:text-white">{guide.diningScore}/100 Rating</span>
                  </div>
                </div>
              </div>

              {/* Action Explore */}
              <button
                onClick={() => handleSelectNeighborhood(guide.name)}
                className="w-full py-3 bg-stone-900 hover:bg-stone-850 dark:bg-white dark:hover:bg-stone-200 text-white dark:text-[#080808] font-serif font-semibold text-xs tracking-wider uppercase rounded-xl transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>EXPLORE ACTIVE ACQUISITIONS</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
