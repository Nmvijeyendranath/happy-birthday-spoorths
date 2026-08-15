import React, { useState, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ImagePlus, Sparkles, X } from 'lucide-react';

export interface CloudSlot {
  id: string;
  label: string;
  clipId: string;
  pathD: string;
  viewBox: string;
  style: React.CSSProperties;
  floatDuration: number;
  floatDelay: number;
  sparklePos: { top?: string; bottom?: string; left?: string; right?: string };
  image?: string;
  className?: string;
}

export const CLOUD_CONFIGS: CloudSlot[] = [
  {
    id: 'cloud-1',
    label: 'Memory I',
    clipId: 'cloud-clip-1',
    viewBox: '0 0 140 90',
    // Puffy cumulus cloud with 5 soft lobes and smooth curved base
    pathD:
      'M 25,68 C 12,68 4,58 4,46 C 4,34 14,26 26,25 C 30,13 43,5 58,5 C 74,5 87,14 92,26 C 98,20 108,19 116,25 C 126,32 130,42 128,52 C 135,56 138,62 136,68 C 134,74 127,78 120,78 L 28,78 C 24,78 25,68 25,68 Z',
    className: 'top-[-55px] left-[-10px] md:top-[-28%] md:left-[-24%]',
    style: {
      width: 'clamp(80px, 14vw, 155px)',
      height: 'clamp(55px, 9.5vw, 105px)',
    },
    floatDuration: 6.2,
    floatDelay: 0,
    sparklePos: { top: '-6px', right: '12px' },
    image: '/mainpage/whatsapp1.jpeg',
  },
  {
    id: 'cloud-2',
    label: 'Memory II',
    clipId: 'cloud-clip-2',
    viewBox: '0 0 150 95',
    // Billowing sunset ocean cloud
    pathD:
      'M 24,72 C 10,72 2,62 2,49 C 2,36 12,27 25,26 C 29,13 44,4 61,4 C 77,4 90,13 95,25 C 102,18 113,17 122,23 C 133,30 137,41 135,52 C 143,56 148,63 147,70 C 145,77 138,82 130,82 L 28,82 C 24,82 24,72 24,72 Z',
    className: 'top-[-65px] right-[-10px] md:top-[-35%] md:right-[-22%]',
    style: {
      width: 'clamp(90px, 15vw, 170px)',
      height: 'clamp(60px, 10vw, 115px)',
    },
    floatDuration: 7.0,
    floatDelay: 0.4,
    sparklePos: { top: '-8px', left: '16px' },
    image: '/mainpage/whatsapp2.jpeg',
  },
  {
    id: 'cloud-3',
    label: 'Memory III',
    clipId: 'cloud-clip-3',
    viewBox: '0 0 135 85',
    // Cute dreamy pearl cloud
    pathD:
      'M 22,64 C 10,64 3,55 3,44 C 3,33 12,24 24,23 C 28,12 41,4 56,4 C 70,4 82,12 86,23 C 92,18 101,17 109,23 C 118,29 122,39 120,48 C 127,52 131,58 130,64 C 128,70 122,74 115,74 L 26,74 C 22,74 22,64 22,64 Z',
    className: 'bottom-[-65px] right-[0px] md:bottom-[-45%] md:right-[-20%]',
    style: {
      width: 'clamp(75px, 13vw, 145px)',
      height: 'clamp(50px, 8.8vw, 96px)',
    },
    floatDuration: 5.8,
    floatDelay: 0.8,
    sparklePos: { bottom: '-4px', left: '20%' },
    image: '/mainpage/whatsapp3.jpeg',
  },
];

export default function CloudPhotoPlaceholder({ slot, index }: { slot: CloudSlot; index: number }) {
  const reduce = useReducedMotion();
  const imageSrc = slot.image || null;

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, scale: 0.5, y: 20 }}
      animate={
        reduce
          ? undefined
          : {
              opacity: 1,
              scale: 1,
              y: [0, -7, 0],
              rotate: index % 2 === 0 ? [0, 1.5, 0] : [0, -1.5, 0],
            }
      }
      transition={{
        opacity: { duration: 1, delay: 1.4 + slot.floatDelay },
        scale: { duration: 1, delay: 1.4 + slot.floatDelay, ease: [0.22, 1, 0.36, 1] },
        y: {
          duration: slot.floatDuration,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1.4 + slot.floatDelay,
        },
        rotate: {
          duration: slot.floatDuration * 1.2,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1.4 + slot.floatDelay,
        },
      }}
      className={`absolute z-20 group select-none ${slot.className || ''}`}
      style={slot.style}
      title={slot.label}
    >

      {/* SVG Cloud Container with Exact Silhouette & Delicate Glowing Stroke */}
      <svg
        viewBox={slot.viewBox}
        className="w-full h-full filter drop-shadow-[0_8px_24px_rgba(0,0,0,0.35)] transition-transform duration-500 group-hover:scale-105"
      >
        <defs>
          <linearGradient id={`grad-bg-${slot.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fff8ee" stopOpacity="0.22" />
            <stop offset="45%" stopColor="#d4ecf6" stopOpacity="0.14" />
            <stop offset="100%" stopColor="#2b7eaa" stopOpacity="0.28" />
          </linearGradient>

          <linearGradient id={`grad-stroke-${slot.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffc7a0" stopOpacity="0.7" />
            <stop offset="50%" stopColor="#ffffff" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#74bddc" stopOpacity="0.6" />
          </linearGradient>

          <clipPath id={`local-clip-${slot.id}`}>
            <path d={slot.pathD} />
          </clipPath>
        </defs>

        {/* Outer Glow Path */}
        <path
          d={slot.pathD}
          fill="none"
          stroke={`url(#grad-stroke-${slot.id})`}
          strokeWidth="3.5"
          className="opacity-40 blur-[2px]"
        />

        {/* Main Background Cloud Silhouette */}
        <path
          d={slot.pathD}
          fill={`url(#grad-bg-${slot.id})`}
          stroke={`url(#grad-stroke-${slot.id})`}
          strokeWidth="1.5"
          className="backdrop-blur-md transition-all duration-300 group-hover:stroke-sunset-200"
        />

        {/* Content clipped inside cloud */}
        <g clipPath={`url(#local-clip-${slot.id})`}>
          {imageSrc ? (
            <image
              href={imageSrc}
              x="0"
              y="0"
              width="100%"
              height="100%"
              preserveAspectRatio="xMidYMid slice"
              className="transition-transform duration-700 group-hover:scale-110"
            />
          ) : (
            <>
              {/* Soft internal cloud shimmer */}
              <radialGradient id={`shimmer-${slot.id}`} cx="45%" cy="35%" r="60%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.25" />
                <stop offset="60%" stopColor="#a8d8ec" stopOpacity="0.08" />
                <stop offset="100%" stopColor="#0f2533" stopOpacity="0.3" />
              </radialGradient>
              <rect x="0" y="0" width="100%" height="100%" fill={`url(#shimmer-${slot.id})`} />
            </>
          )}
        </g>
      </svg>

      {/* Center UI Overlay (Icon & Label or Remove button) */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
        {!imageSrc ? (
          <div className="flex flex-col items-center justify-center gap-0.5 transition-all duration-300 group-hover:scale-110">
            <div className="p-1.5 rounded-full bg-ocean-950/50 backdrop-blur-sm border border-white/20 shadow-sm">
              <ImagePlus className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-sunset-200/90" strokeWidth={1.5} />
            </div>
            <span className="text-[8px] sm:text-[9px] font-sans uppercase tracking-[0.2em] text-ocean-100/75 font-medium drop-shadow">
              {slot.label}
            </span>
          </div>
        ) : null}
      </div>

      {/* Tiny Whimsical Birthday Sparkle / Pearl Accents */}
      <div
        className="absolute pointer-events-none flex items-center gap-1 animate-pulse"
        style={slot.sparklePos}
      >
        <Sparkles className="w-3 h-3 text-sunset-200 drop-shadow-[0_0_6px_rgba(255,199,160,0.8)]" />
      </div>
    </motion.div>
  );
}
