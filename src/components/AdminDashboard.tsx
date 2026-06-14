import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldAlert, Download, Search, Tag, CalendarRange, Trash2, Calendar, Clock, DollarSign, BookOpen, Users, KeyRound, Unlock, Lock, Eye, EyeOff } from 'lucide-react';
import { Booking, STUDIO_PACKAGES, PackageType } from '../types';

interface AdminDashboardProps {
  bookings: Booking[];
  onDeleteBooking: (id: string) => void;
  onClearAllBookings?: () => void;
}

export default function AdminDashboard({ bookings, onDeleteBooking, onClearAllBookings }: AdminDashboardProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterPackage, setFilterPackage] = useState<string>('all');
  const [isOpen, setIsOpen] = useState(false);
  
  // Passcode security states
  const [passcode, setPasscode] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showPasscode, setShowPasscode] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const STUDIO_PASSCODE = 'eagleeye@2026';

  const handleAuthenticate = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode.trim() === STUDIO_PASSCODE) {
      setIsAuthenticated(true);
      setErrorMessage('');
    } else {
      setErrorMessage('Incorrect studio passcode. Please try again.');
      // Auto clear error after 3 seconds
      setTimeout(() => setErrorMessage(''), 3000);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPasscode('');
  };

  // Calculate metrics based on real active bookings
  const rawTotalEarnings = bookings.reduce((sum, bk) => {
    const pkg = STUDIO_PACKAGES.find(p => p.id === bk.packageId);
    return sum + (pkg?.priceLKR || 0);
  }, 0);

  const totalEngineeredHours = bookings.reduce((sum, bk) => {
    const hours = bk.packageId === 'starter' ? 2 : 4;
    return sum + hours;
  }, 0);

  // Filter Bookings matching search & package
  const filteredBookings = bookings.filter((bk) => {
    const matchesSearch = 
      bk.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bk.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bk.phone.includes(searchQuery) ||
      bk.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesPackage = filterPackage === 'all' || bk.packageId === filterPackage;

    return matchesSearch && matchesPackage;
  });

  // Export Bookings as JSON sheet
  const handleExportData = () => {
    if (!isAuthenticated || bookings.length === 0) return;
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(bookings, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `Eagle_Eye_Bookings_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <section id="producer-portal" className="relative py-20 px-4 bg-[#050507] overflow-hidden border-t border-white/5">
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-10 w-96 h-96 bg-blue-600/5 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-96 h-96 bg-cyan-400/5 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Portal Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div className="text-left space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-mono text-[10px] tracking-wider uppercase">
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Studio Master Console</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              Eagle Eye Portal
            </h2>
            <p className="text-xs md:text-sm text-gray-400">
              Review live session calendars, monitor projected studio earnings, and manage the recording schedule.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setIsOpen(!isOpen);
                if (!isOpen) { 
                  // Reset key forms when opening
                  setErrorMessage(''); 
                }
              }}
              className="px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-400/30 text-white font-mono text-sm transition-all focus:outline-none"
            >
              {isOpen ? 'Collapse Console' : 'Expand Portal Console'}
            </button>

            {isOpen && isAuthenticated && (
              <button
                onClick={handleLogout}
                className="px-4 py-2.5 rounded-xl bg-red-950/20 hover:bg-red-950/50 border border-red-500/30 text-red-400 font-mono text-xs transition-all"
              >
                Lock Portal
              </button>
            )}

            {isOpen && isAuthenticated && bookings.length > 0 && (
              <button
                onClick={handleExportData}
                className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs font-mono tracking-wide uppercase flex items-center gap-1.5 transition-all shadow-[0_4px_12px_rgba(6,182,212,0.2)]"
                title="Download schedule for Excel/VS Code"
              >
                <Download className="w-4 h-4" />
                <span>Export Bookings</span>
              </button>
            )}
          </div>
        </div>

        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden space-y-8"
            >
              {/* IF NOT AUTHENTICATED: Show professional passcode wall */}
              {!isAuthenticated ? (
                <motion.div 
                  initial={{ scale: 0.98, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="max-w-md mx-auto p-8 rounded-2xl bg-[#09090b]/80 border border-white/10 backdrop-blur-xl text-center space-y-6 my-4 shadow-[0_10px_40px_rgba(0,0,0,0.5)]"
                >
                  <div className="mx-auto w-12 h-12 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                    <KeyRound className="w-5 h-5" />
                  </div>
                  
                  <div className="space-y-1.5">
                    <h3 className="text-lg font-bold text-white tracking-tight">Authorization Required</h3>
                    <p className="text-xs text-gray-400 max-w-xs mx-auto">
                      Access to Eagle Eye earnings sheet, contact registries, and administrative logs is restricted.
                    </p>
                  </div>

                  <form onSubmit={handleAuthenticate} className="space-y-3">
                    <div className="relative">
                      <input
                        type={showPasscode ? "text" : "password"}
                        placeholder="Enter studio passcode..."
                        value={passcode}
                        onChange={(e) => setPasscode(e.target.value)}
                        className="w-full pl-4 pr-10 py-3 rounded-xl bg-black border border-white/15 text-white text-center font-mono text-sm tracking-widest focus:border-cyan-400 focus:outline-none transition-all placeholder:text-gray-600 placeholder:text-xs placeholder:tracking-normal"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPasscode(!showPasscode)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                      >
                        {showPasscode ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>

                    {errorMessage && (
                      <p className="text-[11px] text-red-400 font-mono tracking-wide">{errorMessage}</p>
                    )}

                    <button
                      type="submit"
                      className="w-full py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold font-mono text-xs tracking-wider uppercase transition-all shadow-[0_4px_20px_rgba(6,182,212,0.15)] flex items-center justify-center gap-2"
                    >
                      <Unlock className="w-3.5 h-3.5" />
                      <span>Authenticate Master Console</span>
                    </button>
                  </form>

                  <div className="pt-2 text-[10px] text-gray-600 font-mono uppercase tracking-widest">
                    Passcode Tip: <span className="text-gray-500">eagleeye@2026</span>
                  </div>
                </motion.div>
              ) : (
                /* AUTHENTICATED VIEW: Reveal statistics & dashboard */
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-8 text-left"
                >
                  <div className="flex items-center justify-between text-xs font-mono p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/10 text-emerald-400">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                      <span>Authorized successfully as Eagle Eye Administrator.</span>
                    </div>
                    <button onClick={handleLogout} className="underline hover:text-white">
                      Logout
                    </button>
                  </div>

                  {/* Dashboard Metric Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    
                    {/* Metric 1 */}
                    <div className="p-5 rounded-2xl bg-[#09090b] border border-white/5 space-y-2">
                      <div className="flex justify-between items-center text-gray-500">
                        <span className="text-xs font-mono tracking-wider uppercase">Active Slots</span>
                        <BookOpen className="w-4 h-4 text-cyan-400" />
                      </div>
                      <div className="text-2xl font-bold font-mono text-white">{bookings.length} Booked</div>
                      <p className="text-[11px] text-gray-500">Live reservations scheduled</p>
                    </div>

                    {/* Metric 2 */}
                    <div className="p-5 rounded-2xl bg-[#09090b] border border-white/5 space-y-2">
                      <div className="flex justify-between items-center text-gray-500">
                        <span className="text-xs font-mono tracking-wider uppercase">Engineered Hours</span>
                        <Clock className="w-4 h-4 text-cyan-400" />
                      </div>
                      <div className="text-2xl font-bold font-mono text-white">{totalEngineeredHours} Hours</div>
                      <p className="text-[11px] text-gray-500">Total sound stage booking time</p>
                    </div>

                    {/* Metric 3 */}
                    <div className="p-5 rounded-2xl bg-[#09090b] border border-white/5 space-y-2">
                      <div className="flex justify-between items-center text-gray-500">
                        <span className="text-xs font-mono tracking-wider uppercase">Projected Value</span>
                        <DollarSign className="w-4 h-4 text-emerald-400" />
                      </div>
                      <div className="text-2xl font-bold font-mono text-white text-emerald-400">
                        LKR {rawTotalEarnings.toLocaleString()}
                      </div>
                      <p className="text-[11px] text-gray-500">Subject to arrival check-in</p>
                    </div>

                    {/* Metric 4 */}
                    <div className="p-5 rounded-2xl bg-[#09090b] border border-white/5 space-y-2">
                      <div className="flex justify-between items-center text-gray-500">
                        <span className="text-xs font-mono tracking-wider uppercase">Clients Pending</span>
                        <Users className="w-4 h-4 text-cyan-400" />
                      </div>
                      <div className="text-2xl font-bold font-mono text-white">
                        {Array.from(new Set(bookings.map(b => b.phone))).length} Accounts
                      </div>
                      <p className="text-[11px] text-gray-500">Unique podcasters booked</p>
                    </div>

                  </div>

                  {/* Advanced Filtering bar */}
                  <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="w-full md:w-80 relative">
                      <Search className="w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder="Search query (Name, Ref, Phone)..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-[#0e0e11] border border-white/10 text-white font-sans text-xs focus:border-cyan-400 focus:outline-none transition-all placeholder:text-gray-600"
                      />
                    </div>

                    <div className="flex items-center gap-3 w-full md:w-auto overflow-x-auto py-1">
                      <label className="text-xs font-mono text-gray-500 whitespace-nowrap uppercase">Filter:</label>
                      <select
                        value={filterPackage}
                        onChange={(e) => setFilterPackage(e.target.value)}
                        className="bg-[#0e0e11] border border-white/10 text-white text-xs rounded-lg py-2 px-3 focus:outline-none focus:border-cyan-400 w-full md:w-44 shrink-0"
                      >
                        <option value="all">All Packages</option>
                        <option value="starter">Starter Session (2H)</option>
                        <option value="pro">Pro Broadcaster (4H)</option>
                      </select>

                      {bookings.length > 0 && onClearAllBookings && (
                        <button
                          onClick={onClearAllBookings}
                          className="px-4 py-2 bg-red-950/20 hover:bg-red-950/40 border border-red-500/20 text-red-400 text-xs font-mono font-bold rounded-lg transition-all shrink-0 whitespace-nowrap"
                        >
                          Clear Log
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Grid or Empty list view */}
                  {filteredBookings.length === 0 ? (
                    <div className="p-12 rounded-2xl bg-white/[0.01] border border-dashed border-white/5 text-center space-y-2">
                      <p className="text-gray-400 text-sm font-sans">No schedules found matching criteria.</p>
                      <p className="text-xs text-gray-600">Try placing test bookings using the dynamic booking system above!</p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto rounded-xl border border-white/5 bg-[#08080a]">
                      <table className="w-full text-left font-sans text-xs">
                        <thead className="bg-[#0c0c0f] text-gray-400 font-mono text-[10px] uppercase tracking-wider border-b border-white/5">
                          <tr>
                            <th className="p-4">Ref/ID</th>
                            <th className="p-4">Client Contact Info</th>
                            <th className="p-4">Reserved Date</th>
                            <th className="p-4">Time Window</th>
                            <th className="p-4">Package Select</th>
                            <th className="p-4">Rate Status</th>
                            <th className="p-4 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5 text-gray-300">
                          {filteredBookings.map((bk) => {
                            const pkg = STUDIO_PACKAGES.find(p => p.id === bk.packageId);
                            return (
                              <motion.tr
                                key={bk.id}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="hover:bg-white/[0.01] transition-all"
                              >
                                {/* Ref/ID */}
                                <td className="p-4">
                                  <span className="font-mono bg-white/5 px-2 py-0.5 rounded text-white text-[10px] font-bold">
                                    {bk.id}
                                  </span>
                                </td>

                                {/* Client Info */}
                                <td className="p-4 space-y-0.5">
                                  <div className="font-bold text-white text-sm">{bk.name}</div>
                                  <div className="text-[10px] text-gray-500 font-mono">{bk.email}</div>
                                  <div className="text-[10px] text-cyan-400/80 font-mono">{bk.phone}</div>
                                </td>

                                {/* Reserved Date */}
                                <td className="p-4 font-mono font-semibold text-white">
                                  {bk.date}
                                </td>

                                {/* Time Window */}
                                <td className="p-4">
                                  <span className="inline-flex items-center gap-1 text-gray-400 font-mono text-[11px]">
                                    <Clock className="w-3.5 h-3.5 text-cyan-400" />
                                    {bk.timeSlot}
                                  </span>
                                </td>

                                {/* Package Select */}
                                <td className="p-4">
                                  <span className="px-2 py-1 rounded bg-gradient-to-r from-cyan-950/40 to-blue-950/40 border border-cyan-500/20 text-cyan-300 text-[10px] font-mono font-bold uppercase">
                                    {pkg?.name}
                                  </span>
                                </td>

                                {/* Rate Status */}
                                <td className="p-4 text-left">
                                  <div className="font-mono text-white font-bold">LKR {pkg?.priceLKR.toLocaleString()}</div>
                                  <p className="text-[9px] text-emerald-400 font-mono uppercase">Editing included</p>
                                </td>

                                {/* Actions */}
                                <td className="p-4 text-right">
                                  <button
                                    onClick={() => onDeleteBooking(bk.id)}
                                    className="p-2 text-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
                                    title="Delete Booking Log"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </td>
                              </motion.tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  )}
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Informational footprint */}
        {!isOpen && (
          <div className="mt-4 flex items-center justify-center gap-2 text-[11px] text-gray-500 font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span>Click 'Expand Portal Console' and enter passcode to inspect the booked live schedules spreadsheet.</span>
          </div>
        )}

      </div>
    </section>
  );
}
