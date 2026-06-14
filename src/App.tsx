import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mic, Calendar, ShieldCheck, Play, Radio, ArrowUp, Sparkles, Volume2 } from 'lucide-react';
import { PackageType, Booking } from './types';
import { isSlotExpired } from './utils/bookingUtils';
import BackgroundGrid from './components/BackgroundGrid';
import HeroSection from './components/HeroSection';
import PackagesSection from './components/PackagesSection';
import BookingForm from './components/BookingForm';
import AdminDashboard from './components/AdminDashboard';
import Footer from './components/Footer';

export default function App() {
  const [selectedPackageId, setSelectedPackageId] = useState<PackageType>('starter');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isLiveSounding, setIsLiveSounding] = useState(true);

  // Load and filter bookings from localStorage on mount and continuously
  useEffect(() => {
    const loadAndFilter = () => {
      try {
        const stored = localStorage.getItem('podcast_studio_bookings');
        if (stored) {
          const allSaved: Booking[] = JSON.parse(stored);
          const activeOnly = allSaved.filter(b => !isSlotExpired(b.date, b.timeSlot));
          
          setBookings(activeOnly);
          
          // If some expired elements were filtered out, sync back to local storage
          if (activeOnly.length !== allSaved.length) {
            localStorage.setItem('podcast_studio_bookings', JSON.stringify(activeOnly));
          }
        }
      } catch (e) {
        console.warn('Failed to parse saved bookings from localStorage:', e);
      }
    };

    loadAndFilter();

    // Check & filter expired bookings automatically every 10 seconds
    const interval = setInterval(loadAndFilter, 10000);
    return () => clearInterval(interval);
  }, []);

  // Monitor scroll for "Scroll to Top" button inclusion
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handler to add a new booking
  const handleBookingSuccess = (newBooking: Booking) => {
    const updatedBookings = [newBooking, ...bookings];
    setBookings(updatedBookings);
    try {
      localStorage.setItem('podcast_studio_bookings', JSON.stringify(updatedBookings));
    } catch (e) {
      console.warn('Failed to save booking to localStorage:', e);
    }
  };

  // Handler to delete/cancel a booking
  const handleDeleteBooking = (id: string) => {
    const updatedBookings = bookings.filter((b) => b.id !== id);
    setBookings(updatedBookings);
    try {
      localStorage.setItem('podcast_studio_bookings', JSON.stringify(updatedBookings));
    } catch (e) {
      console.warn('Failed to save updated bookings to localStorage:', e);
    }
  };

  // Handler to clear all local bookings
  const handleClearAllBookings = () => {
    if (window.confirm("Are you sure you want to clear all bookings from your local device memory?")) {
      setBookings([]);
      try {
        localStorage.removeItem('podcast_studio_bookings');
      } catch (e) {
        console.warn('Failed to clear bookings:', e);
      }
    }
  };

  // Scroll to booking section and focus
  const scrollToBooking = (pkgId?: PackageType) => {
    if (pkgId) {
      setSelectedPackageId(pkgId);
    }
    const section = document.getElementById('booking-section');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // Light delay to allow scroll, then focus first name field
      setTimeout(() => {
        const input = document.getElementById('customer-name');
        if (input) {
          input.focus();
        }
      }, 700);
    }
  };

  return (
    <div className="relative min-h-screen text-white antialiased flex flex-col justify-between selection:bg-cyan-500/30 selection:text-white">
      
      {/* Interactive premium ambient backgrounds */}
      <BackgroundGrid />

      {/* STICKY GLASSMORPHIC HEADER */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/40 border-b border-white/5 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          
          {/* Logo Brand Brandmark */}
          <a href="#" className="flex items-center gap-2 group">
            <div className="p-2 bg-gradient-to-tr from-cyan-500 to-blue-600 rounded-lg group-hover:scale-105 transition-all duration-300 shadow-[0_0_15px_rgba(6,182,212,0.3)]">
              <Mic className="w-5 h-5 text-white animate-pulse" />
            </div>
            <div className="text-left leading-tight hidden sm:block">
              <span className="font-sans font-bold text-sm tracking-tight block text-white">EAGLE EYE</span>
              <span className="font-mono text-[9px] text-cyan-400 tracking-wider uppercase block">Studio Podcast</span>
            </div>
          </a>

          {/* Navigation Links */}
          <nav className="flex items-center gap-6 md:gap-8">
            <a
              id="nav-link-studio"
              href="#hero-section"
              className="text-xs font-mono font-medium tracking-wider text-gray-400 hover:text-white uppercase transition-colors"
            >
              Studio
            </a>
            <a
              id="nav-link-packages"
              href="#packages-section"
              className="text-xs font-mono font-medium tracking-wider text-gray-400 hover:text-white uppercase transition-colors"
            >
              Packages
            </a>
            <button
              id="nav-link-book"
              onClick={() => scrollToBooking()}
              className="text-xs font-mono font-medium tracking-wider text-cyan-400 hover:text-cyan-300 uppercase transition-colors"
            >
              Book Session
            </button>
          </nav>

          {/* Right Action Header Info */}
          <div className="flex items-center gap-4">
            {/* Live broadcast wave meter decoration */}
            <button
              onClick={() => setIsLiveSounding(!isLiveSounding)}
              className="hidden md:flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/[0.02] border border-white/5 text-gray-400 hover:text-white transition-all text-xs"
              title="Toggle Live Audio Wave Visual"
            >
              <div className="flex items-center gap-0.5 h-3">
                <span className={`w-[2px] bg-cyan-400 rounded-full transition-all duration-300 ${isLiveSounding ? 'h-3 animate-[pulse_0.6s_infinite_alternate]' : 'h-1'}`} />
                <span className={`w-[2px] bg-cyan-400 rounded-full transition-all duration-300 ${isLiveSounding ? 'h-2.5 animate-[pulse_0.4s_infinite_alternate]' : 'h-1'}`} />
                <span className={`w-[2px] bg-cyan-400 rounded-full transition-all duration-300 ${isLiveSounding ? 'h-4 animate-[pulse_0.8s_infinite_alternate_0.1s]' : 'h-1'}`} />
                <span className={`w-[2px] bg-cyan-400 rounded-full transition-all duration-300 ${isLiveSounding ? 'h-2 animate-[pulse_0.5s_infinite_alternate_0.2s]' : 'h-1'}`} />
              </div>
              <span className="font-mono text-[10px] uppercase font-bold tracking-widest text-cyan-400">ONLINE</span>
            </button>

            {/* Quick action button */}
            <button
              id="header-quick-book-btn"
              onClick={() => scrollToBooking()}
              className="px-4 py-2 rounded-lg bg-white/5 hover:bg-cyan-500 hover:text-black border border-white/10 text-xs font-bold transition-all duration-300 uppercase font-mono tracking-wider"
            >
              Book Now
            </button>
          </div>

        </div>
      </header>

      {/* CORE LANDING SECTIONS */}
      <main className="flex-grow">
        
        {/* HERO SECTION */}
        <HeroSection onBookNow={() => scrollToBooking()} />

        {/* PLANS & PACKAGES SECTION */}
        <PackagesSection onSelectPackage={(pkgId) => scrollToBooking(pkgId)} />

        {/* BOOKING FORM & SESSION MANAGER SECTION */}
        <BookingForm
          selectedPackageId={selectedPackageId}
          setSelectedPackageId={setSelectedPackageId}
          onBookingSuccess={handleBookingSuccess}
          existingBookings={bookings}
          onDeleteBooking={handleDeleteBooking}
        />

        {/* EAGLE EYE PRODUCER PORTAL / ADMIN BOOKING RECORD SPREADSHEET */}
        <AdminDashboard
          bookings={bookings}
          onDeleteBooking={handleDeleteBooking}
          onClearAllBookings={handleClearAllBookings}
        />

      </main>

      {/* FOOTER SECTION */}
      <Footer />

      {/* SCROLL TO TOP FLOATING BUTTON */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            key="scroll-top"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            id="scroll-to-top-button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-6 right-6 z-40 p-3 rounded-full bg-cyan-500 text-black shadow-lg shadow-cyan-500/20 hover:scale-105 active:scale-95 transition-all text-center flex items-center justify-center cursor-pointer"
            title="Scroll back to top"
          >
            <ArrowUp className="w-4 h-4 font-extrabold" />
          </motion.button>
        )}
      </AnimatePresence>

    </div>
  );
}
