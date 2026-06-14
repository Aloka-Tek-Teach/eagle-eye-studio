import React from 'react';
import { motion } from 'motion/react';
import { Check, Flame, Clock, HelpCircle, Gift, Sparkles, AlertCircle } from 'lucide-react';
import { STUDIO_PACKAGES, StudioPackage, PackageType } from '../types';

interface PackagesSectionProps {
  onSelectPackage: (pkgId: PackageType) => void;
}

export default function PackagesSection({ onSelectPackage }: PackagesSectionProps) {
  return (
    <section id="packages-section" className="relative py-24 px-4 bg-gradient-to-b from-transparent to-[#050507] overflow-hidden">
      
      {/* Background radial soft light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header Text */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-cyan-400 font-mono text-[10px] tracking-wider uppercase"
          >
            <Sparkles className="w-3 h-3 text-cyan-400" />
            <span>Premium Transparent Pricing</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-extrabold text-white tracking-tight"
          >
            Acoustic Excellence, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              Priced for Scale
            </span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-sm md:text-base"
          >
            Choose the studio tier that matches your content release cycle. No hidden setup fees, just raw luxury and perfect dynamic fidelity.
          </motion.p>
        </div>

        {/* Global Banner: FREE VIDEO EDITING SPECIAL OFFER TAG! */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mx-auto max-w-4xl mb-14 p-5 rounded-2xl bg-gradient-to-r from-cyan-950/40 via-blue-950/30 to-slate-950/40 border border-cyan-500/30 backdrop-blur-md shadow-[0_0_30px_rgba(6,182,212,0.1)] relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6"
        >
          {/* Subtle glowing element */}
          <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-cyan-400/10 to-transparent blur-md" />

          <div className="flex items-center gap-4 text-left">
            <div className="p-3 bg-cyan-400/15 rounded-xl border border-cyan-400/30 text-cyan-400 shrink-0">
              <Gift className="w-6 h-6 animate-bounce" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-400 text-black font-bold uppercase tracking-wider">SPECIAL INTRO OFFER</span>
                <span className="text-xs text-cyan-300 font-semibold font-mono animate-pulse">Save LKR 1,000 / edit!</span>
              </div>
              <h3 className="text-lg font-bold text-white mt-1">Video Editing is Completely FREE for the first month!</h3>
              <p className="text-xs text-gray-400 max-w-lg mt-0.5">
                Every package booked includes automated cutting, multi-cam sync, and initial grading (Standard rate is <span className="text-gray-300 font-semibold underline decoration-cyan-500">LKR 1,000</span> per finalized episode).
              </p>
            </div>
          </div>

          <div className="w-full md:w-auto shrink-0">
            <a 
              id="special-offer-cta"
              href="#booking-section"
              className="w-full md:w-auto px-6 py-3 rounded-lg bg-cyan-500 text-black font-bold text-sm tracking-wide text-center hover:bg-cyan-400 transition-all shadow-[0_4px_12px_rgba(6,182,212,0.25)] flex items-center justify-center gap-1.5"
            >
              <span>Grab Free Editing</span>
              <Sparkles className="w-3.5 h-3.5" />
            </a>
          </div>
        </motion.div>

        {/* Studio Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto items-stretch">
          
          {STUDIO_PACKAGES.map((pkg: StudioPackage, idx: number) => {
            return (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className={`relative flex flex-col justify-between rounded-3xl p-8 backdrop-blur-xl border transition-all duration-300 ${
                  pkg.isPopular 
                    ? 'bg-gradient-to-b from-blue-950/15 via-[#0c0d12]/90 to-[#060608]/95 border-cyan-500/40 shadow-[0_15px_40px_rgba(6,182,212,0.15)] md:scale-105 z-10' 
                    : 'bg-[#09090b]/80 border-white/10 hover:border-white/20'
                }`}
              >
                {/* Popular Card Banner tag */}
                {pkg.isPopular && (
                  <div className="absolute -top-4 left-6 px-4 py-1 rounded-full bg-cyan-500 text-black font-extrabold font-mono text-[10px] tracking-wider uppercase flex items-center gap-1 shadow-lg">
                    <Flame className="w-3.5 h-3.5 text-black" />
                    <span>Best Seller</span>
                  </div>
                )}

                {/* Card Title & Pricing */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-white tracking-tight">{pkg.name}</h3>
                    <p className="text-xs text-gray-500 font-mono mt-1 flex items-center gap-1.5 uppercase">
                      <Clock className="w-3.5 h-3.5 text-cyan-400" />
                      Slot Duration: <span className="text-gray-300 font-bold">{pkg.duration}</span>
                    </p>
                  </div>

                  {/* LKR Price */}
                  <div className="flex items-baseline space-x-2">
                    <span className="text-sm font-mono text-gray-400 font-semibold uppercase">LKR</span>
                    <span className="text-4xl md:text-5xl font-extrabold text-white font-mono tracking-tight">
                      {pkg.priceLKR.toLocaleString()}
                    </span>
                    <span className="text-xs text-gray-500">/ session</span>
                  </div>

                  <p className="text-xs text-gray-400 leading-relaxed min-h-[48px]">
                    {pkg.description}
                  </p>

                  <hr className="border-white/5" />

                  {/* Feature Lists */}
                  <div className="space-y-4">
                    <p className="text-xs font-mono text-gray-400 tracking-wider uppercase">What's Included:</p>
                    <ul className="space-y-2.5">
                      {pkg.features.map((feat, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-2.5 text-xs text-gray-300 text-left">
                          <span className="p-0.5 rounded-full bg-cyan-500/10 text-cyan-400 mt-0.5 border border-cyan-500/30 shrink-0">
                            <Check className="w-3 h-3" />
                          </span>
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Select Package CTA */}
                <div className="pt-8 mt-auto">
                  <button
                    id={`pkg-select-btn-${pkg.id}`}
                    onClick={() => onSelectPackage(pkg.id)}
                    className={`w-full py-3.5 px-6 rounded-xl font-bold text-sm tracking-wide transition-all duration-300 flex items-center justify-center gap-2 ${
                      pkg.isPopular
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-[0_4px_15px_rgba(6,182,212,0.25)] hover:shadow-[0_0_25px_rgba(6,182,212,0.4)] group'
                        : 'bg-white/5 hover:bg-white/10 text-gray-200 hover:text-white border border-white/10'
                    }`}
                  >
                    <span>Choose {pkg.name.split(' ')[0]}</span>
                    {pkg.isPopular && <Sparkles className="w-4 h-4 text-cyan-200 animate-pulse" />}
                  </button>
                </div>
              </motion.div>
            );
          })}

        </div>

        {/* Informative Grid footnotes */}
        <div className="mt-16 max-w-2xl mx-auto flex items-center justify-center gap-2 text-xs text-gray-500 font-mono">
          <AlertCircle className="w-4 h-4 text-cyan-500" />
          <span>Cancellation or rescheduling is free up to 24 hours prior to your booked slot.</span>
        </div>

      </div>
    </section>
  );
}
