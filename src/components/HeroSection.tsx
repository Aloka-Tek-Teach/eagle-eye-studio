import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Mic, Radio, Sparkles, ArrowRight, Video } from 'lucide-react';
import studioHeroImg from '../assets/images/podcast_studio_hero_1781401169694.jpg';

interface HeroSectionProps {
  onBookNow: () => void;
}

export default function HeroSection({ onBookNow }: HeroSectionProps) {
  const words = ["Voice.", "Podcast.", "Story.", "Vision.", "Audience."];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer: any;
    const currentWord = words[currentWordIndex];
    
    const tick = () => {
      if (!isDeleting) {
        setDisplayedText(currentWord.substring(0, displayedText.length + 1));
        
        if (displayedText === currentWord) {
          timer = setTimeout(() => setIsDeleting(true), 2000);
          return;
        }
      } else {
        setDisplayedText(currentWord.substring(0, displayedText.length - 1));
        
        if (displayedText === '') {
          setIsDeleting(false);
          setCurrentWordIndex((prev) => (prev + 1) % words.length);
          return;
        }
      }
    };

    const speed = isDeleting ? 50 : 100;
    timer = setTimeout(tick, speed);
    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, currentWordIndex]);

  return (
    <section id="hero-section" className="relative pt-32 pb-20 md:py-36 px-4 max-w-7xl mx-auto overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Column: Elegant Copy & CTA */}
        <div className="lg:col-span-7 flex flex-col items-start space-y-8 text-left">
          
          {/* Glassmorphic Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 backdrop-blur-md text-cyan-400 font-mono text-xs tracking-wider uppercase shadow-[0_0_15px_rgba(6,182,212,0.1)]"
          >
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            <span>Mathugama's Premier Eagle Eye Studio</span>
          </motion.div>

          {/* Catchy Main Title with Neo-Glow Type */}
          <div className="space-y-4">
            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-sans text-5xl md:text-7xl font-extrabold tracking-tight text-white leading-tight min-h-[140px] md:min-h-[200px]"
            >
              Elevate Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 drop-shadow-[0_2px_10px_rgba(6,182,212,0.15)] inline-flex items-center">
                {displayedText}
                <span className="w-1.5 h-10 md:h-16 bg-cyan-400 ml-1 inline-block animate-[pulse_0.8s_infinite]" />
              </span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-gray-400 font-sans text-lg md:text-xl max-w-xl leading-relaxed whitespace-pre-line"
            >
              Step into Eagle Eye Studio—a pristine, acoustically superior environment equipped with industry-standard hardware, premium microphones, and fully managed multi-camera setups. We turn your ideas into chart-topping broadcasts.
            </motion.p>
          </div>

          {/* Fast-booking CTA & Floating Highlights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto"
          >
            <button
              id="hero-book-now-btn"
              onClick={onBookNow}
              className="relative group overflow-hidden px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_35px_rgba(6,182,212,0.5)] transition-all duration-300"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 pointer-events-none" />
              <span>Book Your Session</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <a
              id="hero-explore-packages-btn"
              href="#packages-section"
              className="px-8 py-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 backdrop-blur-sm text-gray-300 hover:text-white font-semibold flex items-center justify-center gap-2 transition-all duration-300"
            >
              Explore Packages
            </a>
          </motion.div>

          {/* Highlights Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="grid grid-cols-3 gap-6 pt-6 border-t border-white/5 w-full max-w-md"
          >
            <div className="space-y-1">
              <span className="text-2xl font-bold font-mono text-white">4K UHD</span>
              <p className="text-xs text-gray-500 font-sans tracking-wide">Multi-Cam Video</p>
            </div>
            <div className="space-y-1">
              <span className="text-2xl font-bold font-mono text-white">-14 LUF</span>
              <p className="text-xs text-gray-500 font-sans tracking-wide">Mastering Standard</p>
            </div>
            <div className="space-y-1 text-cyan-400">
              <span className="text-2xl font-bold font-mono flex items-center gap-1">
                LKR 0 <span className="text-xs px-1.5 py-0.5 rounded bg-cyan-400/15 border border-cyan-400/20 text-cyan-300 font-mono">NEW</span>
              </span>
              <p className="text-xs text-cyan-400/70 font-sans tracking-wide">Editing / Ist Month</p>
            </div>
          </motion.div>

        </div>

        {/* Right Column: Floating 3D-Like Glass Frame with High-Quality Generated Image */}
        <div className="lg:col-span-5 relative flex justify-center items-center">
          
          {/* Subtle Backglow behind image */}
          <div className="absolute inset-x-10 inset-y-10 bg-cyan-500/20 rounded-3xl blur-[80px] -z-10 animate-pulse duration-10000" />

          {/* Premium Floating Card Container with Glassmorphism */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, rotateY: 15 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            whileHover={{ y: -8, rotateX: 2, rotateY: -3, transition: { duration: 0.3 } }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="relative p-3 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden max-w-md w-full"
          >
            {/* Top Bar Simulated Window Controller */}
            <div className="flex items-center justify-between px-3 pb-3 border-b border-white/5 mb-3">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
              </div>
              <span className="font-mono text-[10px] text-gray-500 select-none">STUDIO_LIVE_FEED.REC</span>
              <span className="flex h-1.5 w-1.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-cyan-500"></span>
              </span>
            </div>

            {/* Generated Widescreen Image */}
            <div className="relative overflow-hidden rounded-xl group aspect-video">
              <img
                src={studioHeroImg}
                alt="Professional Podcast Studio Setup"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              
              {/* Glass Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90" />

              {/* In-Image Tag */}
              <div className="absolute bottom-3 left-3 right-3 flex justify-between items-center bg-black/60 backdrop-blur-md border border-white/10 p-2.5 rounded-lg">
                <div className="flex items-center gap-2">
                  <div className="p-1 rounded bg-cyan-500/10 text-cyan-400">
                    <Mic className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-white">Broadcast Bay Alpha</h4>
                    <p className="text-[10px] text-gray-400">Fully Isolated Chamber</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-mono text-[11px] text-emerald-400">Available Daily</span>
                </div>
              </div>
            </div>

            {/* Neon Accent Light Frame */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-cyan-400/20 to-transparent blur-md" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-blue-600/20 to-transparent blur-md" />
          </motion.div>

          {/* Floating Absolute Decorator badge */}
          <motion.div
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute -bottom-6 -right-2 md:-right-6 bg-[#09090b]/90 border border-white/10 p-4 rounded-xl shadow-2xl backdrop-blur-md flex items-center gap-3"
          >
            <div className="p-2 rounded bg-gradient-to-r from-emerald-500/20 to-teal-500/20 text-emerald-400 border border-emerald-500/30">
              <Video className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <p className="text-[10px] font-mono tracking-wider text-gray-500 uppercase">First-month perk</p>
              <h5 className="text-sm font-bold text-white">Video Editing is FREE</h5>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
