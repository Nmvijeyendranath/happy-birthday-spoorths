'use client';

import { useRef } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useReducedMotion,
  type MotionValue,
} from 'framer-motion';
import { Reveal } from '@/components/Reveal';
import PhotoFrame from '@/components/PhotoFrame';
import type { PhotoSlot } from '@/lib/types';

type JourneyStop = {
  id: string;
  slot: PhotoSlot;
  message: string;
  align: 'left' | 'right';
};

const stops: JourneyStop[] = [
  {
    id: 'p1',
    slot: { id: 'p1', label: 'Photo 1', ratio: 'square', caption: 'the beginning', image: `${import.meta.env.BASE_URL}journey/journey.pic.jpeg` },
    message: 'A whole world arriving all at once. Tiny hands, big dreams, and a smile that lit up the room.',
    align: 'left',
  },
  {
    id: 'p2',
    slot: { id: 'p2', label: 'Photo 2', ratio: 'portrait', caption: 'small hands', image: `${import.meta.env.BASE_URL}journey/journey.pic1.jpeg` },
    message: 'Still figuring out how big the sky was. Every day was a new adventure waiting to happen.',
    align: 'right',
  },
  {
    id: 'p3',
    slot: { id: 'p3', label: 'Photo 3', ratio: 'square', caption: 'growing', image: `${import.meta.env.BASE_URL}journey/journey.pic2.jpeg` },
    message: 'Somewhere in here, the tide started turning. Finding your own voice and leaving a little sparkle everywhere.',
    align: 'left',
  },
  {
    id: 'p4',
    slot: { id: 'p4', label: 'Photo 4', ratio: 'portrait', caption: 'almost there', image: `${import.meta.env.BASE_URL}journey/journey.pic3.jpeg` },
    message: 'Closer to the person you were always becoming. Strong, resilient, and blooming beautifully.',
    align: 'right',
  },
  {
    id: 'p5',
    slot: { id: 'p5', label: 'Photo 5', ratio: 'landscape', caption: 'now', image: `${import.meta.env.BASE_URL}journey/journey.pic4.jpeg` },
    message: 'And here you are — a stunning, capable young woman of twenty. Exactly, finally, wonderfully you.',
    align: 'left',
  },
];

/* A glowing connector that weaves between the left and right stops,
   drawn as one continuous SVG path with a node at each stop. */
function Connector({ progress }: { progress: MotionValue<number> }) {
  const reduce = useReducedMotion();
  // draw the line progressively as you scroll through the journey
  const draw = useTransform(progress, [0.1, 0.85], [0, 1]);

  // x positions (in viewBox units) matching the card alignment
  const leftX = 22;
  const rightX = 78;
  const nodeY = [22, 38, 54, 70, 86];

  const path = [
    `M ${leftX} ${nodeY[0]}`,
    `C ${leftX} 30, ${rightX} 30, ${rightX} ${nodeY[1]}`,
    `C ${rightX} 46, ${leftX} 46, ${leftX} ${nodeY[2]}`,
    `C ${leftX} 62, ${rightX} 62, ${rightX} ${nodeY[3]}`,
    `C ${rightX} 78, ${leftX} 78, ${leftX} ${nodeY[4]}`,
  ].join(' ');

  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      className="pointer-events-none absolute inset-0 h-full w-full opacity-40 md:opacity-100"
      aria-hidden
    >
      <defs>
        <linearGradient id="journeyLine" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffd9a8" stopOpacity="0.9" />
          <stop offset="50%" stopColor="#ff8647" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#74bddc" stopOpacity="0.8" />
        </linearGradient>
        <filter id="lineGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="0.6" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* faint full path */}
      <path
        d={path}
        fill="none"
        stroke="url(#journeyLine)"
        strokeWidth="0.5"
        opacity="0.25"
      />
      {/* progressively drawn glowing path */}
      <motion.path
        d={path}
        fill="none"
        stroke="url(#journeyLine)"
        strokeWidth="0.7"
        strokeLinecap="round"
        filter="url(#lineGlow)"
        style={reduce ? undefined : { pathLength: draw }}
      />
      {/* nodes at each stop */}
      {nodeY.map((y, i) => {
        const x = stops[i].align === 'left' ? leftX : rightX;
        return (
          <motion.circle
            key={i}
            cx={x}
            cy={y}
            r="0.9"
            fill="#fff1d6"
            style={{ filter: 'drop-shadow(0 0 2px rgba(255,180,120,0.8))' }}
            animate={reduce ? undefined : { r: [0.7, 1.1, 0.7] }}
            transition={{ duration: 3, repeat: Infinity, delay: i * 0.4 }}
          />
        );
      })}
    </svg>
  );
}

function Sparkle({ delay, className }: { delay: number; className: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={`absolute text-sunset-300 drop-shadow-sm ${className}`}
      animate={reduce ? undefined : {
        scale: [0.8, 1.2, 0.8],
        opacity: [0.5, 1, 0.5]
      }}
      transition={{ duration: 2, repeat: Infinity, delay, ease: "easeInOut" }}
    >
      <path d="M12 2C12 2 12 10 20 12C12 14 12 22 12 22C12 22 12 14 4 12C12 10 12 2 12 2Z" />
    </motion.svg>
  );
}

function JourneyStopCard({
  stop,
  index,
  total,
  progress,
}: {
  stop: JourneyStop;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const reduce = useReducedMotion();

  const bandStart = 0.12;
  const bandEnd = 0.88;
  const span = (bandEnd - bandStart) / total;
  const start = bandStart + span * index;
  const peak = start + span * 0.35;
  const fade = start + span * 0.85;
  const end = start + span;

  const opacity = useTransform(progress, [start, peak, fade, end], [0, 1, 1, 0]);
  const y = useTransform(progress, [start, peak, fade, end], [60, 0, 0, -40]);
  const scale = useTransform(progress, [start, peak, fade, end], [0.9, 1, 1, 0.95]);
  const rotate = useTransform(
    progress,
    [start, peak],
    [stop.align === 'left' ? -5 : 5, stop.align === 'left' ? -1.5 : 1.5]
  );

  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);

  return (
    <motion.div
      style={reduce ? undefined : { opacity, y, scale }}
      className={`pointer-events-auto absolute inset-x-0 top-1/2 flex -translate-y-1/2 px-4 sm:px-6 ${stop.align === 'left' ? 'justify-start md:pl-[10%]' : 'justify-end md:pr-[10%]'
        }`}
    >
      <motion.div
        style={reduce ? undefined : { rotate, rotateX: tiltY, rotateY: tiltX, transformPerspective: 1000 }}
        onPointerMove={(e) => {
          if (reduce) return;
          const r = e.currentTarget.getBoundingClientRect();
          tiltX.set(((e.clientX - r.left) / r.width - 0.5) * 12);
          tiltY.set(-((e.clientY - r.top) / r.height - 0.5) * 12);
        }}
        onPointerLeave={() => {
          tiltX.set(0);
          tiltY.set(0);
        }}
        whileTap={reduce ? undefined : { scale: 0.97 }}
        className={`flex w-full max-w-5xl items-center gap-4 sm:gap-6 md:gap-16 ${stop.align === 'right' ? 'flex-row-reverse text-right' : 'flex-row text-left'
          }`}
      >
        <div className="relative w-[45%] shrink-0 max-w-[200px] md:w-1/2 md:max-w-[360px]">
          <div className="relative z-10">
            <PhotoFrame slot={stop.slot} index={index} />
          </div>
          {/* Sparkles around the photo */}
          <Sparkle delay={0.2} className="h-6 w-6 -top-4 -left-3 sm:-top-6 sm:-left-6" />
          <Sparkle delay={1.1} className="h-4 w-4 top-8 -right-3 sm:-right-5" />
          <Sparkle delay={0.7} className="h-5 w-5 -bottom-3 left-4 sm:-bottom-5 sm:left-6 text-ocean-300" />
          <Sparkle delay={1.4} className="h-3 w-3 -bottom-2 -right-2 sm:-bottom-4 sm:-right-4" />
        </div>

        <div className="w-[55%] rounded-2xl border border-ocean-100/10 bg-ocean-950/40 p-4 sm:p-5 backdrop-blur-md md:w-1/2 md:border-transparent md:bg-transparent md:p-0 md:backdrop-blur-none">
          <p className="text-pretty font-display text-sm italic leading-relaxed text-ocean-100 drop-shadow-sm sm:text-xl md:text-4xl">
            {stop.message}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Journey() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  const headerOpacity = useTransform(scrollYProgress, [0, 0.06, 0.1, 0.14], [0, 1, 1, 0]);

  return (
    <section
      ref={sectionRef}
      id="journey"
      className="relative"
      style={{ height: '600vh' }}
    >
      <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden">
        {/* the glowing connector weaving through every stop */}
        <div className="absolute inset-0 z-0">
          <Connector progress={scrollYProgress} />
        </div>

        {/* traveling-through-time title, shown as the journey opens */}
        <motion.div
          style={reduce ? undefined : { opacity: headerOpacity }}
          className="pointer-events-none absolute inset-x-0 top-1/2 z-20 -translate-y-1/2 px-6 text-center"
        >
          <Reveal>
            <p className="mb-3 font-script text-3xl text-sunset-200">a little journey</p>
            <h2 className="font-display text-4xl leading-tight text-white sm:text-5xl md:text-6xl">
              From a kid to twenty
            </h2>
            <div className="hairline mx-auto mt-8 w-32" />
          </Reveal>
        </motion.div>

        {/* the photos + messages, each in its own scroll window */}
        <div className="absolute inset-0 z-10">
          {stops.map((stop, i) => (
            <JourneyStopCard
              key={stop.id}
              stop={stop}
              index={i}
              total={stops.length}
              progress={scrollYProgress}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
