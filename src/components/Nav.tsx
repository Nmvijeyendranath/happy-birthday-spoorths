import { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Waves } from 'lucide-react';
import { sections } from '@/lib/sections';

export default function Nav() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const mid = window.innerHeight / 2;
      let next = 0;
      sections.forEach((s, i) => {
        const el = document.getElementById(s.id);
        if (el && el.getBoundingClientRect().top <= mid) next = i;
      });
      setActive(next);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = (id: string) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <motion.div
        className="fixed left-0 top-0 z-50 h-[2px] origin-left bg-gradient-to-r from-sunset-300 via-sunset-400 to-ocean-300"
        style={{ scaleX: progress }}
      />
      <header className="fixed inset-x-0 top-0 z-40">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
          {/* Spacer to preserve justify-between layout */}
          <div aria-hidden="true" className="w-8" />

          <nav className="hidden items-center gap-1 md:flex">
            {sections.map((s, i) => (
              <button
                key={s.id}
                onClick={() => go(s.id)}
                className={`relative px-3 py-1.5 text-xs uppercase tracking-[0.2em] transition-colors ${
                  active === i
                    ? 'text-sunset-200'
                    : 'text-ocean-100/60 hover:text-ocean-50'
                }`}
              >
                {s.short}
                {active === i && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute inset-x-2 -bottom-0.5 h-px bg-sunset-300"
                  />
                )}
              </button>
            ))}
          </nav>

          <button
            onClick={() => setOpen((v) => !v)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-ocean-100/20 text-ocean-50 md:hidden"
            aria-label="Menu"
          >
            <span className="text-xs">☰</span>
          </button>
        </div>

        {open && (
          <motion.nav
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-4 mt-1 overflow-hidden rounded-2xl glass-panel p-2 md:hidden"
          >
            {sections.map((s, i) => (
              <button
                key={s.id}
                onClick={() => go(s.id)}
                className={`block w-full rounded-xl px-4 py-3 text-left text-sm uppercase tracking-[0.2em] ${
                  active === i
                    ? 'text-sunset-200'
                    : 'text-ocean-100/70'
                }`}
              >
                {s.short}
              </button>
            ))}
          </motion.nav>
        )}
      </header>
    </>
  );
}
