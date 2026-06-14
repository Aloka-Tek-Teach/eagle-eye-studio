import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Clock, Sparkles, User, Mail, Phone, FileText, CheckCircle2, Video, Ticket, Trash2 } from 'lucide-react';
import { PackageType, Booking, STUDIO_PACKAGES, TIME_SLOTS } from '../types';

interface BookingFormProps {
  selectedPackageId: PackageType;
  setSelectedPackageId: (pkgId: PackageType) => void;
  onBookingSuccess: (newBooking: Booking) => void;
  existingBookings: Booking[];
  onDeleteBooking: (id: string) => void;
}

export default function BookingForm({
  selectedPackageId,
  setSelectedPackageId,
  onBookingSuccess,
  existingBookings,
  onDeleteBooking,
}: BookingFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [timeSlot, setTimeSlot] = useState(TIME_SLOTS[0]);
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successBooking, setSuccessBooking] = useState<Booking | null>(null);

  // Set min date to today so they can't book in the past
  const [minDate, setMinDate] = useState('');

  useEffect(() => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    setMinDate(`${yyyy}-${mm}-${dd}`);
  }, []);

  // Securely shift selected slot to first available if date selection clashes with existing reserved slots
  useEffect(() => {
    if (date) {
      const isCurrentSlotBooked = existingBookings.some(
        (b) => b.date === date && b.timeSlot === timeSlot
      );
      if (isCurrentSlotBooked) {
        const firstAvailable = TIME_SLOTS.find(
          (slot) => !existingBookings.some((b) => b.date === date && b.timeSlot === slot)
        );
        if (firstAvailable) {
          setTimeSlot(firstAvailable);
        } else {
          setTimeSlot(''); // All slots booked for this day
        }
      }
    }
  }, [date, existingBookings]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone || !date || !timeSlot || !selectedPackageId) {
      return;
    }

    setIsSubmitting(true);

    // Simulate luxury API booking delay
    setTimeout(() => {
      const newBooking: Booking = {
        id: 'pod-' + Math.random().toString(36).substring(2, 9).toUpperCase(),
        name,
        email,
        phone,
        date,
        timeSlot,
        packageId: selectedPackageId,
        notes,
        createdAt: new Date().toISOString(),
      };

      onBookingSuccess(newBooking);
      setSuccessBooking(newBooking);
      setIsSubmitting(false);

      // Clean up fields
      setName('');
      setEmail('');
      setPhone('');
      setDate('');
      setNotes('');
    }, 1200);
  };

  const selectedPkgDetail = STUDIO_PACKAGES.find(p => p.id === selectedPackageId);

  return (
    <section id="booking-section" className="relative py-24 px-4 bg-black overflow-hidden border-t border-white/5">
      {/* Background neon laser grid lines */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
      <div className="absolute top-[30%] right-[5%] w-72 h-72 bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Form Details & Value Proposition */}
          <div className="lg:col-span-5 text-left space-y-8">
            <div className="space-y-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-mono text-[10px] tracking-wider uppercase">
                <Calendar className="w-3 h-3 text-cyan-400" />
                <span>Instant Scheduling System</span>
              </span>
              <h2 className="text-4xl font-extrabold text-white tracking-tight leading-tight">
                Claim Your Studio Session
              </h2>
              <p className="text-gray-400 font-sans text-sm md:text-base leading-relaxed">
                Choose your ideal date, locked time slot, and setup. Your reservation triggers our engineers to warm up systems, align condenser microphones, and configure spatial soundboards specifically for your vocal profile.
              </p>
            </div>

            {/* Micro value card details */}
            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-4 backdrop-blur-md">
              <h4 className="text-xs font-mono text-cyan-400 tracking-wider uppercase font-semibold">Your Selected Tier Perks:</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-gray-300">
                  <span className="font-semibold text-white">{selectedPkgDetail?.name}</span>
                  <span className="font-mono text-cyan-400 font-bold">{selectedPkgDetail?.duration}</span>
                </div>
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <span>Base Booking Fee</span>
                  <span className="font-mono text-white font-medium">LKR {selectedPkgDetail?.priceLKR.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between text-xs text-emerald-400">
                  <span className="flex items-center gap-1">
                    <Video className="w-3.5 h-3.5" />
                    Video Editing (1st Month Promo)
                  </span>
                  <span className="font-mono font-bold">FREE <span className="text-[10px] line-through text-gray-500 font-normal">LKR 1,000</span></span>
                </div>
                <hr className="border-white/5" />
                <div className="flex items-center justify-between text-sm">
                  <span className="font-bold text-white">Estimated Total</span>
                  <span className="font-mono text-cyan-400 font-extrabold text-base">
                    LKR {selectedPkgDetail?.priceLKR.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* List existing bookings client-side for dynamic slot occupancy status */}
            {existingBookings.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-mono text-cyan-400 tracking-wider uppercase font-semibold">Live Studio Reservation Schedule:</h4>
                  <span className="px-2 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] font-mono animate-pulse">
                    ● ACTIVE
                  </span>
                </div>
                
                <p className="text-xs text-gray-400 font-sans leading-relaxed">
                  The slots displayed below are currently locked and occupied. Past slots automatically expire and clear. Select any free date and time to reserve.
                </p>

                <div className="space-y-3 max-h-56 overflow-y-auto pr-2 custom-scrollbar">
                  <AnimatePresence>
                    {existingBookings.map((bk) => {
                      const pkg = STUDIO_PACKAGES.find(p => p.id === bk.packageId);
                      
                      // Anonymize the client name to display safely in public schedule
                      const anonymizeName = (rawName: string) => {
                        const trimmed = rawName.trim();
                        if (trimmed.length <= 2) return "P. Guest";
                        const parts = trimmed.split(' ');
                        return parts.map(part => {
                          if (part.length <= 1) return part;
                          return part[0] + '*'.repeat(Math.min(part.length - 1, 4));
                        }).join(' ');
                      };

                      return (
                        <motion.div
                          key={bk.id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 10 }}
                          className="p-4 rounded-xl bg-gradient-to-r from-red-500/[0.02] to-white/[0.02] border border-white/5 flex items-center justify-between gap-4 backdrop-blur-sm group hover:border-cyan-500/20 transition-all"
                        >
                          <div className="flex items-start gap-3">
                            <div className="p-2 bg-red-500/10 rounded-lg text-red-400 border border-red-500/10 group-hover:bg-cyan-500/10 group-hover:text-cyan-400 group-hover:border-cyan-500/10 transition-colors">
                              <Ticket className="w-4 h-4" />
                            </div>
                            <div className="text-left space-y-0.5">
                              <div className="flex items-center gap-2">
                                <h5 className="text-xs font-bold text-gray-200">{anonymizeName(bk.name)}</h5>
                                <span className="font-mono text-[8px] text-[red]/70 bg-red-500/5 border border-red-500/10 px-1 py-0.5 rounded font-bold uppercase tracking-widest">Reserved</span>
                              </div>
                              <p className="text-[11px] text-gray-400 font-mono">
                                {bk.date} @ <span className="text-cyan-400">{bk.timeSlot}</span>
                              </p>
                              <p className="text-[10px] text-gray-500 font-semibold uppercase font-mono">
                                {pkg?.name} ({pkg?.duration})
                              </p>
                            </div>
                          </div>
                          
                          <button
                            id={`delete-booking-btn-${bk.id}`}
                            onClick={() => onDeleteBooking(bk.id)}
                            className="p-2 text-gray-600 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
                            title="Cancel Booking (Owner action)"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Dynamic Form UI & Success Ticket Receipts */}
          <div className="lg:col-span-7 w-full relative">
            <AnimatePresence mode="wait">
              {!successBooking ? (
                // BOOKING FORM CARD
                <motion.div
                  key="booking-form"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.3 }}
                  className="rounded-3xl p-6 md:p-8 bg-gradient-to-b from-[#0a0a0c] to-[#040405] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.6)] relative overflow-hidden text-left"
                >
                  <form onSubmit={handleSubmit} className="space-y-6">
                    
                    {/* Package Selector radios inside form */}
                    <div className="space-y-2">
                      <label className="text-xs font-mono text-gray-400 uppercase tracking-widest">Select Studio Package</label>
                      <div className="grid grid-cols-2 gap-4">
                        {STUDIO_PACKAGES.map((pkg) => (
                          <button
                            key={pkg.id}
                            type="button"
                            id={`form-pkg-${pkg.id}`}
                            onClick={() => setSelectedPackageId(pkg.id)}
                            className={`p-4 rounded-xl text-left border relative transition-all ${
                              selectedPackageId === pkg.id
                                ? 'bg-cyan-500/10 border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.15)]'
                                : 'bg-white/[0.01] border-white/5 hover:border-white/15'
                            }`}
                          >
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-xs font-bold text-white">{pkg.name.split(' ')[0]}</span>
                              <span className="text-[10px] font-mono text-cyan-400 bg-cyan-400/10 px-1.5 py-0.5 rounded font-bold">
                                {pkg.duration}
                              </span>
                            </div>
                            <span className="text-sm font-mono font-bold text-white">LKR {pkg.priceLKR.toLocaleString()}</span>
                            
                            {selectedPackageId === pkg.id && (
                              <div className="absolute bottom-1 right-2 w-1.5 h-1.5 rounded-full bg-cyan-400" />
                            )}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Customer Info row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Name input */}
                      <div className="space-y-2">
                        <label htmlFor="customer-name" className="text-xs font-mono text-gray-400 uppercase tracking-widest flex items-center gap-1.5">
                          <User className="w-3.5 h-3.5 text-cyan-400" />
                          <span>Full Name</span>
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            id="customer-name"
                            required
                            placeholder="John Doe"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl bg-white/[0.02] border border-white/10 text-white font-sans text-sm focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/20 focus:outline-none transition-all placeholder:text-gray-600 focus:bg-white/[0.04]"
                          />
                        </div>
                      </div>

                      {/* Email input */}
                      <div className="space-y-2">
                        <label htmlFor="customer-email" className="text-xs font-mono text-gray-400 uppercase tracking-widest flex items-center gap-1.5">
                          <Mail className="w-3.5 h-3.5 text-cyan-400" />
                          <span>Email Address</span>
                        </label>
                        <input
                          type="email"
                          id="customer-email"
                          required
                          placeholder="johndoe@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl bg-white/[0.02] border border-white/10 text-white font-sans text-sm focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/20 focus:outline-none transition-all placeholder:text-gray-600 focus:bg-white/[0.04]"
                        />
                      </div>
                    </div>

                    {/* Phone + Date row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Phone input */}
                      <div className="space-y-2">
                        <label htmlFor="customer-phone" className="text-xs font-mono text-gray-400 uppercase tracking-widest flex items-center gap-1.5">
                          <Phone className="w-3.5 h-3.5 text-cyan-400" />
                          <span>Phone Number</span>
                        </label>
                        <input
                          type="tel"
                          id="customer-phone"
                          required
                          placeholder="+94 77 123 4567"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl bg-white/[0.02] border border-white/10 text-white font-sans text-sm focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/20 focus:outline-none transition-all placeholder:text-gray-600 focus:bg-white/[0.04]"
                        />
                      </div>

                      {/* Date selection */}
                      <div className="space-y-2">
                        <label htmlFor="booking-date" className="text-xs font-mono text-gray-400 uppercase tracking-widest flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                          <span>Select Date</span>
                        </label>
                        <input
                          type="date"
                          id="booking-date"
                          required
                          min={minDate}
                          value={date}
                          onChange={(e) => setDate(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl bg-white/[0.02] border border-white/10 text-white font-sans text-sm focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/20 focus:outline-none transition-all [color-scheme:dark] focus:bg-white/[0.04]"
                        />
                        {date && (
                          <motion.div 
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-2 text-[11px] font-mono p-2.5 rounded-lg bg-cyan-950/20 border border-cyan-500/10 space-y-1.5"
                          >
                            <div className="flex justify-between items-center text-gray-400">
                              <span>Studio Space on {date}:</span>
                              <span className="text-cyan-400 font-bold">
                                {TIME_SLOTS.filter(s => !existingBookings.some(b => b.date === date && b.timeSlot === s)).length} / {TIME_SLOTS.length} Free
                              </span>
                            </div>
                            {/* Visual tracking scale */}
                            <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden">
                              <div 
                                className="bg-gradient-to-r from-cyan-400 to-blue-500 h-full transition-all duration-300" 
                                style={{ 
                                  width: `${(TIME_SLOTS.filter(s => !existingBookings.some(b => b.date === date && b.timeSlot === s)).length / TIME_SLOTS.length) * 100}%` 
                                }} 
                              />
                            </div>
                          </motion.div>
                        )}
                      </div>
                    </div>

                    {/* Time slots custom selector buttons */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <label className="text-xs font-mono text-gray-400 uppercase tracking-widest flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-cyan-400" />
                          <span>Select Time Slot</span>
                        </label>
                        {date && (
                          <span className="text-[10px] font-mono text-gray-500 uppercase">
                            Real-Time Status
                          </span>
                        )}
                      </div>
                      
                      {!date ? (
                        <div className="p-4 rounded-xl border border-dashed border-white/5 bg-white/[0.01] text-xs text-center text-gray-500 font-mono">
                          Please enter a Date above to unlock live slot states
                        </div>
                      ) : (
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                          {TIME_SLOTS.map((slot) => {
                            const isSelected = timeSlot === slot;
                            const isBooked = existingBookings.some(
                              (b) => b.date === date && b.timeSlot === slot
                            );
                            
                            return (
                              <button
                                key={slot}
                                type="button"
                                disabled={isBooked}
                                id={`time-slot-${slot.replace(/\s+/g, '-')}`}
                                onClick={() => setTimeSlot(slot)}
                                className={`py-2 px-3 rounded-lg text-xs font-mono tracking-tight border text-center transition-all relative overflow-hidden ${
                                  isBooked
                                    ? 'bg-red-950/15 border-red-900/30 text-red-500/40 cursor-not-allowed line-through'
                                    : isSelected
                                    ? 'bg-cyan-500/20 border-cyan-400 text-white shadow-[0_0_12px_rgba(6,182,212,0.15)] font-bold'
                                    : 'bg-white/[0.01] border-white/5 hover:border-white/15 text-gray-400 hover:text-gray-200'
                                }`}
                              >
                                <span>{slot}</span>
                                {isBooked && (
                                  <div className="absolute inset-x-0 bottom-0 bg-red-950/50 text-[7px] text-red-400 font-extrabold uppercase py-0.5 tracking-wider border-t border-red-900/10">
                                    🔒 RESERVED
                                  </div>
                                )}
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>

                    {/* Special instruction notes */}
                    <div className="space-y-2">
                      <label htmlFor="customer-notes" className="text-xs font-mono text-gray-400 uppercase tracking-widest flex items-center gap-1.5">
                        <FileText className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Special Instructions / Guest Details (Optional)</span>
                      </label>
                      <textarea
                        id="customer-notes"
                        rows={3}
                        placeholder="Explain show topics, guests, or specific hardware needs (e.g. mic preferences, soundboard layouts)."
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.02] border border-white/10 text-white font-sans text-sm focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/20 focus:outline-none transition-all placeholder:text-gray-600 resize-none focus:bg-white/[0.04]"
                      />
                    </div>

                    {/* Book Now Button inside form */}
                    <button
                      type="submit"
                      id="form-submit-btn"
                      disabled={isSubmitting}
                      className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600 text-white font-bold text-sm tracking-wide transition-all shadow-[0_4px_20px_rgba(6,182,212,0.25)] hover:shadow-[0_0_35px_rgba(6,182,212,0.4)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          <span>Validating Studio Slots...</span>
                        </>
                      ) : (
                        <>
                          <span>Secure This Slot</span>
                          <Sparkles className="w-4 h-4 text-cyan-300 group-hover:rotate-12 transition-transform" />
                        </>
                      )}
                    </button>

                  </form>
                </motion.div>
              ) : (
                // BOOKING SUCCESS TICKET (GLASSMORPHISM EMBOSS-GIFT DESIGN)
                <motion.div
                  key="success-ticket"
                  initial={{ opacity: 0, scale: 0.95, rotateY: -10 }}
                  animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="rounded-3xl p-6 md:p-8 bg-gradient-to-br from-cyan-950/20 via-slate-950/90 to-blue-950/20 border border-emerald-500/30 text-center relative overflow-hidden"
                >
                  {/* Outer backglow success indicator */}
                  <div className="absolute -top-10 left-12 w-48 h-48 bg-emerald-500/10 rounded-full blur-[80px]" />
                  <div className="absolute -bottom-10 right-12 w-48 h-48 bg-cyan-500/10 rounded-full blur-[80px]" />

                  {/* Top success badge */}
                  <div className="flex flex-col items-center space-y-4 relative z-10 pb-6 border-b border-white/10 mb-6">
                    <div className="p-3 bg-emerald-500/15 rounded-full border border-emerald-500/40 text-emerald-400">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold font-sans text-white">Your session is secured!</h3>
                      <p className="text-xs text-emerald-400/80 font-mono mt-1">Order Ref: {successBooking.id}</p>
                    </div>
                  </div>

                  {/* Ticket core content */}
                  <div className="space-y-4 text-left max-w-md mx-auto relative z-10 font-sans text-sm text-gray-300">
                    <div className="flex justify-between items-center py-2 border-b border-white/5">
                      <span className="text-gray-500 text-xs font-mono">Host Producer</span>
                      <span className="font-semibold text-white">{successBooking.name}</span>
                    </div>

                    <div className="flex justify-between items-center py-2 border-b border-white/5">
                      <span className="text-gray-500 text-xs font-mono">Reserved Session Date</span>
                      <span className="font-semibold text-white font-mono">{successBooking.date}</span>
                    </div>

                    <div className="flex justify-between items-center py-2 border-b border-white/5">
                      <span className="text-gray-500 text-xs font-mono">Assigned Time Slot</span>
                      <span className="font-semibold text-white font-mono">{successBooking.timeSlot}</span>
                    </div>

                    <div className="flex justify-between items-center py-2 border-b border-white/5">
                      <span className="text-gray-500 text-xs font-mono">Package Standard Tier</span>
                      <span className="font-semibold text-cyan-400 uppercase font-mono">
                        {STUDIO_PACKAGES.find(p => p.id === successBooking.packageId)?.name}
                      </span>
                    </div>

                    <div className="flex justify-between items-center py-2 border-b border-white/5 text-emerald-400">
                      <span className="text-gray-500 text-xs font-mono">1st Month Video Editing Promo</span>
                      <span className="font-semibold">FREE (Save LKR 1,000)</span>
                    </div>

                    <div className="flex justify-between items-center py-3 text-base">
                      <span className="font-bold text-white font-mono">Amount Due On Arrival</span>
                      <span className="font-extrabold text-cyan-400 font-mono">
                        LKR {STUDIO_PACKAGES.find(p => p.id === successBooking.packageId)?.priceLKR.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Cut-off receipt visual effects */}
                  <div className="flex justify-between items-center px-4 py-4 relative z-10">
                    <div className="w-4 h-8 bg-black rounded-r-full -ml-12 border-r border-white/10" />
                    <div className="border-t border-dashed border-white/20 grow mx-2" />
                    <div className="w-4 h-8 bg-black rounded-l-full -mr-12 border-l border-white/10" />
                  </div>

                  <div className="space-y-4 pt-2 relative z-10">
                    <p className="text-xs text-gray-500 leading-relaxed max-w-sm mx-auto">
                      A confirmation receipt and detailed studio entry gate procedures have been dispatched to <span className="text-gray-300 font-semibold">{successBooking.email}</span>.
                    </p>
                    <button
                      id="dismiss-receipt-btn"
                      onClick={() => setSuccessBooking(null)}
                      className="px-6 py-2.5 rounded-lg bg-white/10 hover:bg-white/15 text-white font-semibold text-xs tracking-wider uppercase transition-all"
                    >
                      Book Another Slot
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}
