import React from 'react';
import { Mic, Mail, Phone, MapPin, Instagram, Youtube, Linkedin, ShieldCheck, Heart } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="footer-section" className="relative bg-[#030304] text-gray-500 font-sans border-t border-white/5 overflow-hidden">
      
      {/* Dynamic line gradient lights */}
      <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-cyan-500/25 to-transparent" />

      <div className="max-w-7xl mx-auto py-16 px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start mb-12">
          
          {/* Column 1: Studio logo & Brand identity */}
          <div className="md:col-span-4 space-y-4 text-left">
            <div className="flex items-center gap-2 text-white">
              <div className="p-2 bg-gradient-to-tr from-cyan-500 to-blue-600 rounded-lg shadow-[0_0_15px_rgba(6,182,212,0.3)]">
                <Mic className="w-5 h-5 text-white" />
              </div>
              <span className="font-sans font-bold text-lg tracking-tight">Eagle Eye Studio Podcast</span>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed max-w-xs">
              A high-end recording space meticulously engineered to host premier podcasts, broadcast content, and high-fidelity video releases. Crafted with acoustical perfection and powered by premium hardware.
            </p>
          </div>

          {/* Column 2: Studio location info & Contacts */}
          <div className="md:col-span-5 space-y-4 text-left">
            <h4 className="text-xs font-mono font-bold text-white tracking-widest uppercase">Studio Inquiries</h4>
            <ul className="space-y-3.5 text-xs text-gray-400">
              <li className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>63/B Alfred House Gardens, Colombo 00300, Sri Lanka</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-cyan-400 shrink-0" />
                <span className="font-mono">+94 11 234 5678 / +94 77 987 6543</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
                <span className="font-mono">sessions@podcaststudio.lk</span>
              </li>
            </ul>
          </div>

          {/* Column 3: Social followings links styled nicely */}
          <div className="md:col-span-3 space-y-4 text-left md:text-right md:flex md:flex-col md:items-end">
            <div>
              <h4 className="text-xs font-mono font-bold text-white tracking-widest uppercase mb-4">Stream & Follow</h4>
              <div className="flex gap-3">
                <a
                  id="footer-youtube-link"
                  href="https://youtube.com"
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5 hover:border-cyan-500/30 hover:bg-white/[0.08] hover:text-white transition-all duration-300"
                  aria-label="YouTube Channel"
                >
                  <Youtube className="w-4 h-4" />
                </a>
                <a
                  id="footer-instagram-link"
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5 hover:border-cyan-500/30 hover:bg-white/[0.08] hover:text-white transition-all duration-300"
                  aria-label="Instagram Handle"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  id="footer-linkedin-link"
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5 hover:border-cyan-500/30 hover:bg-white/[0.08] hover:text-white transition-all duration-300"
                  aria-label="LinkedIn Presence"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>
            </div>
            
            <div className="pt-3 text-xs text-cyan-400 font-mono">
              <span className="inline-block bg-cyan-400/10 border border-cyan-400/20 px-2 py-0.5 rounded font-bold uppercase tracking-wider text-[10px]">
                Engineers On Call: 24/7
              </span>
            </div>
          </div>
        </div>

        <hr className="border-white/5" />

        {/* Copy, credits and security badges */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono">
          <div className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-cyan-500" />
            <span>&copy; {currentYear} Eagle Eye Podcast Studio. All Rights Reserved.</span>
          </div>
          
          <div className="flex items-center gap-1.5 text-gray-600">
            <span>Crafted for creators in Colombo</span>
            <Heart className="w-3 h-3 text-red-500/80 fill-current animate-pulse" />
          </div>
        </div>

      </div>
    </footer>
  );
}
