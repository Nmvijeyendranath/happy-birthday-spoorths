import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { Reveal } from '@/components/Reveal';
import WishModal from '@/components/WishModal';

export default function Finale() {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  return (
    <section
      id="finale"
      className="relative mx-auto flex min-h-[100svh] max-w-3xl flex-col items-center justify-center px-6 py-28 text-center"
    >
      <Reveal>
        <p className="mb-3 font-script text-3xl text-sunset-200">
          one last thing
        </p>
        <h2 className="font-display text-4xl leading-tight text-white sm:text-5xl md:text-6xl">
          There's a wish waiting for you at the bottom of the sea
        </h2>
        <p className="font-['Playfair_Display'] leading-relaxed max-w-md mx-auto text-white">
          Press the button when you're ready. wishes for a precious women...
        </p>
      </Reveal>

      <motion.button
        onClick={() => setOpen(true)}
        initial={reduce ? false : { opacity: 0, y: 20 }}
        whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        whileHover={reduce ? undefined : { scale: 1.04 }}
        whileTap={reduce ? undefined : { scale: 0.97 }}
        className="group relative mt-12 overflow-hidden rounded-full border border-sunset-200/40 bg-gradient-to-r from-sunset-400/20 via-sunset-300/10 to-ocean-300/20 px-10 py-5 shadow-glow backdrop-blur-md sm:px-14 sm:py-6"
      >
        <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
        <span className="relative flex items-center gap-3 text-white">
          <Sparkles className="h-5 w-5 text-sunset-200" strokeWidth={1.5} />
          <span className="font-display text-xl tracking-wide sm:text-2xl">
            Make a wish
          </span>
        </span>
      </motion.button>

      <Reveal className="mt-16">
        <p className="font-script text-2xl text-ocean-100/60">
          made with the ocean in mind, for you
        </p>
      </Reveal>

      <WishModal open={open} onClose={() => setOpen(false)} />
    </section>
  );
}
