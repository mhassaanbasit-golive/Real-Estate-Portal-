import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Listings from './pages/Listings';
import PropertyDetails from './pages/PropertyDetails';
import About from './pages/About';
import Services from './pages/Services';
import Neighborhoods from './pages/Neighborhoods';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import ShowingModal from './components/ShowingModal';
import Chatbot from './components/Chatbot';
import { Listing } from './types';
import { listingsData } from './data';

export default function App() {
  const [page, setPage] = useState<'home' | 'listings' | 'details' | 'about' | 'services' | 'neighborhoods' | 'blog' | 'contact'>('home');
  const [selectedListingId, setSelectedListingId] = useState<string | null>(null);
  const [savedListingIds, setSavedListingIds] = useState<string[]>([]);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  // Shared search parameters
  const [searchFilters, setSearchFilters] = useState({
    city: '',
    type: 'all' as 'buy' | 'rent' | 'all',
    minPrice: 0,
    maxPrice: 999000000,
    beds: 'all',
    baths: 'all',
    propertyType: 'all',
    sortBy: 'highest',
  });

  // Global showing booking state
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [bookingListing, setBookingListing] = useState<Listing | null>(null);

  // Sync theme class with HTML document
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Load bookmarks from local storage
  useEffect(() => {
    const saved = localStorage.getItem('aura_saved_properties');
    if (saved) {
      try {
        setSavedListingIds(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse bookmarks from storage', e);
      }
    }
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const handleBookmarkToggle = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSavedListingIds((prev) => {
      const updated = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      localStorage.setItem('aura_saved_properties', JSON.stringify(updated));
      return updated;
    });
  };

  const handleQuickBook = (listing: Listing, e: React.MouseEvent) => {
    e.stopPropagation();
    setBookingListing(listing);
    setIsBookingModalOpen(true);
  };

  const handleBookShowDirect = (listing: Listing) => {
    setBookingListing(listing);
    setIsBookingModalOpen(true);
  };

  const handleSelectNeighborhoodFromHeader = (city: string) => {
    setSearchFilters({
      city,
      type: 'all',
      minPrice: 0,
      maxPrice: 999000000,
      beds: 'all',
      baths: 'all',
      propertyType: 'all',
      sortBy: 'highest',
    });
    setSelectedListingId(null);
    setPage('listings');
  };

  // Find listing if detail mode active
  const activeListing = selectedListingId ? listingsData.find((l) => l.id === selectedListingId) : null;

  // Custom page switching render
  const renderPage = () => {
    if (activeListing) {
      return (
        <PropertyDetails
          listing={activeListing}
          onBack={() => setSelectedListingId(null)}
          isBookmarked={savedListingIds.includes(activeListing.id)}
          onBookmarkToggle={handleBookmarkToggle}
          onBookShow={handleBookShowDirect}
        />
      );
    }

    switch (page) {
      case 'home':
        return (
          <Home
            setPage={setPage}
            setSelectedListingId={setSelectedListingId}
            savedListingIds={savedListingIds}
            onBookmarkToggle={handleBookmarkToggle}
            onQuickBook={handleQuickBook}
            setSearchFilters={setSearchFilters}
          />
        );
      case 'listings':
        return (
          <Listings
            setSelectedListingId={setSelectedListingId}
            savedListingIds={savedListingIds}
            onBookmarkToggle={handleBookmarkToggle}
            onQuickBook={handleQuickBook}
            searchFilters={searchFilters}
            setSearchFilters={setSearchFilters}
          />
        );
      case 'about':
        return <About setPage={setPage} />;
      case 'services':
        return <Services />;
      case 'neighborhoods':
        return <Neighborhoods setSearchFilters={setSearchFilters} setPage={setPage} />;
      case 'blog':
        return <Blog />;
      case 'contact':
        return <Contact />;
      default:
        return (
          <Home
            setPage={setPage}
            setSelectedListingId={setSelectedListingId}
            savedListingIds={savedListingIds}
            onBookmarkToggle={handleBookmarkToggle}
            onQuickBook={handleQuickBook}
            setSearchFilters={setSearchFilters}
          />
        );
    }
  };

  return (
    <div className="bg-stone-50 text-stone-900 dark:bg-[#050505] dark:text-white min-h-screen transition-colors duration-500 flex flex-col justify-between">
      <div>
        {/* Global Navigation Header */}
        <Header
          currentPage={activeListing ? 'listings' : page}
          setPage={(p) => {
            setSelectedListingId(null);
            setPage(p);
          }}
          savedCount={savedListingIds.length}
          theme={theme}
          toggleTheme={toggleTheme}
          onSelectNeighborhood={handleSelectNeighborhoodFromHeader}
        />

        {/* Dynamic Transition Canvas Area */}
        <main className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeListing ? `details-${activeListing.id}` : page}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
            >
              {renderPage()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* Global Information Footer */}
      <Footer
        setPage={(p) => {
          setSelectedListingId(null);
          setPage(p);
        }}
      />

      {/* Global Showing booking Form Modal popup */}
      <ShowingModal
        isOpen={isBookingModalOpen}
        onClose={() => {
          setIsBookingModalOpen(false);
          setBookingListing(null);
        }}
        listing={bookingListing}
      />

      {/* Floating AI Concierge Chatbot */}
      <Chatbot />
    </div>
  );
}
