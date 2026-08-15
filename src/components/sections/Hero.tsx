import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import CloudPhotoPlaceholder, { CLOUD_CONFIGS } from '@/components/CloudPhotoPlaceholder';

const NAME = 'Spoorths...';

const letterParent: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.35 } },
};
const letterChild: Variants = {
  hidden: { opacity: 0, y: 50, rotateX: -70 },
  show: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Hero() {
  const reduce = useReducedMotion();
  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] flex-col items-center justify-center px-6 text-center overflow-hidden"
    >
      {/* The one place the script face opens the story — it closes it again in Finale */}
      <motion.p
        initial={reduce ? false : { opacity: 0, y: -10 }}
        animate={reduce ? undefined : { opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.1 }}
        className="mb-6 font-script text-2xl text-sunset-200 sm:text-3xl"
      >
        Specially for —
      </motion.p>

      {/* Name wrapper — relative so the cloud photos anchor delicately around it */}
      <div className="relative inline-block my-4">
        {/* ☁ Decorative Ocean & Birthday Themed Cloud Photo Placeholders */}
        {CLOUD_CONFIGS.map((cloud, idx) => (
          <CloudPhotoPlaceholder key={cloud.id} slot={cloud} index={idx} />
        ))}

        <motion.h1
          variants={reduce ? undefined : letterParent}
          initial={reduce ? false : 'hidden'}
          animate={reduce ? undefined : 'show'}
          className="relative z-10 font-display text-[17vw] font-500 leading-[0.85] tracking-tight text-white sm:text-[13vw] md:text-[10rem]"
          style={{
            textShadow:
              '0 0 40px rgba(255,180,120,0.3), 0 0 120px rgba(255,140,90,0.18)',
          }}
        >
          {NAME.split('').map((ch, i) => (
            <motion.span
              key={i}
              variants={reduce ? undefined : letterChild}
              className="inline-block"
              style={{ perspective: 600 }}
            >
              {ch}
            </motion.span>
          ))}
        </motion.h1>
      </div>

      <motion.div
        initial={reduce ? false : { opacity: 0, scaleX: 0 }}
        animate={reduce ? undefined : { opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.9, delay: 1.3 }}
        className="hairline mt-8 w-40 origin-center"
      />

      <motion.p
        initial={reduce ? false : { opacity: 0, y: 12 }}
        animate={reduce ? undefined : { opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 1.5 }}
        className="mt-6 max-w-xl text-balance text-sm uppercase tracking-[0.35em] text-ocean-100/70 sm:text-base"
      >
        A small glimpse of the wonderful women-
      </motion.p>

      <motion.button
        onClick={() =>
          document
            .getElementById('letter')
            ?.scrollIntoView({ behavior: 'smooth' })
        }
        initial={reduce ? false : { opacity: 0 }}
        animate={reduce ? undefined : { opacity: 1 }}
        transition={{ duration: 0.9, delay: 1.9 }}
        className="group absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-ocean-100/60 transition-colors hover:text-white"
        aria-label="Scroll down"
      >
        <span className="text-[10px] uppercase tracking-[0.3em]">keep going</span>
        <motion.span
          animate={reduce ? undefined : { y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="h-5 w-5" strokeWidth={1.5} />
        </motion.span>
      </motion.button>
    </section>
  );
}