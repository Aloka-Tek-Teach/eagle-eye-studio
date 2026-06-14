import React from 'react';
import { motion } from 'motion/react';

export default function BackgroundGrid() {
  return (
    <div className="fixed inset-0 -z-50 bg-[#030303] overflow-hidden">
      {/* Sleek abstract radial background with subtle neon blue highlights */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(16,185,129,0.02),rgba(59,130,246,0.05),transparent_50%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#111111_1px,transparent_1px),linear-gradient(to_bottom,#111111_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-35" />

      {/* Floating Glassmorphic Ambient Orbs */}
      <motion.div
        animate={{
          x: [0, 40, -20, 0],
          y: [0, -50, 30, 0],
          scale: [1, 1.15, 0.9, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-[10%] left-[15%] w-72 h-72 rounded-full bg-blue-600/10 blur-[100px]"
      />

      <motion.div
        animate={{
          x: [0, -60, 40, 0],
          y: [0, 60, -30, 0],
          scale: [1, 0.9, 1.2, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute bottom-[20%] right-[10%] w-96 h-96 rounded-full bg-cyan-500/10 blur-[130px]"
      />

      <motion.div
        animate={{
          x: [0, 30, -30, 0],
          y: [0, 40, 40, 0],
          scale: [1, 1.1, 0.95, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-[60%] left-[45%] w-64 h-64 rounded-full bg-blue-400/5 blur-[90px]"
      />

      {/* Grid horizontal highlight */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent" />
    </div>
  );
}
