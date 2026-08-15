import { useState, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ImagePlus, Sparkles, X } from 'lucide-react';
import type { PhotoSlot } from '@/lib/types';

type Props = {
  slot: PhotoSlot;
  index?: number;
  className?: string;
};

const ratioClass: Record<PhotoSlot['ratio'], string> = {
  portrait: 'aspect-[3/4]',
  landscape: 'aspect-[4/3]',
  square: 'aspect-square',
  wide: 'aspect-[16/9]',
};

export default function PhotoFrame({ slot, index = 0, className = '' }: Props) {
  const reduce = useReducedMotion();
  const imageSrc = slot.image || null;

  return (
    <motion.figure
      initial={reduce ? false : { opacity: 0, y: 40, scale: 0.96 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{
        duration: 0.9,
        delay: (index % 3) * 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={`group select-none ${className}`}
      title={slot.label}
    >

      <div
        className={`photo-frame ${ratioClass[slot.ratio]} w-full rounded-2xl sm:rounded-3xl transition-all duration-700 ease-out group-hover:-translate-y-1.5 group-hover:shadow-[0_20px_50px_rgba(43,126,170,0.3)] border border-ocean-100/15 group-hover:border-sunset-200/40`}
      >
        {imageSrc ? (
          <div className="relative w-full h-full overflow-hidden">
            <img
              src={imageSrc}
              alt={slot.caption || slot.label}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
        ) : (
          <div className="photo-placeholder">
            <div className="flex flex-col items-center gap-3 text-center p-4">
              <div className="p-2 rounded-full bg-ocean-950/40 border border-white/10 shadow-inner group-hover:scale-110 transition-transform duration-500">
                <ImagePlus
                  className="h-6 w-6 text-sunset-200/80 transition-transform duration-500"
                  strokeWidth={1.25}
                />
              </div>
              <span className="text-[11px] uppercase tracking-[0.25em] font-medium text-ocean-100/70 group-hover:text-ocean-50 transition-colors">
                {slot.label}
              </span>
              <span className="text-[9px] tracking-wider text-sunset-200/50 -mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                + click to add
              </span>
            </div>
          </div>
        )}

        {/* Shimmer gradient overlay */}
        <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          <div className="absolute inset-0 bg-gradient-to-t from-ocean-950/40 via-transparent to-transparent" />
        </div>

        {/* Delicate floating sparkle accent */}
        <div className="absolute top-2 right-2 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <Sparkles className="w-3.5 h-3.5 text-sunset-200/80 animate-spin-slow" />
        </div>
      </div>

      {slot.caption && (
        <figcaption className="mt-3 text-center font-display text-base italic text-ocean-100/70 group-hover:text-sunset-200 transition-colors">
          {slot.caption}
        </figcaption>
      )}
    </motion.figure>
  );
}
