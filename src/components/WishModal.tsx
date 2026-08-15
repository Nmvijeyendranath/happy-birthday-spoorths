import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { X, Cake, Gift, PartyPopper } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Dolphin, Shell, Sparkle } from '@/components/SeaCreatures';
import EmberOverlay from '@/components/EmberOverlay';
import partyPopperImg from '../../assets/party-popper.png';

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function WishModal({ open, onClose }: Props) {
  const reduce = useReducedMotion();
  const [breezes, setBreezes] = useState<{ id: number; top: string; dur: string }[]>([]);

  useEffect(() => {
    if (!open) {
      setBreezes([]);
      return;
    }
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';

    // Start breezes
    const timeouts: ReturnType<typeof setTimeout>[] = [];
    for (let i = 0; i < 12; i++) {
      timeouts.push(
        setTimeout(() => {
          setBreezes((prev) => [
            ...prev,
            {
              id: Date.now() + i,
              top: `${20 + Math.random() * 55}%`,
              dur: `${3 + Math.random() * 3}s`,
            },
          ]);
        }, i * 180)
      );
    }

    // Fireworks
    let interval: ReturnType<typeof setInterval>;
    const timeout = setTimeout(() => {
      const duration = 12 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 110 };

      const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

      interval = setInterval(function() {
        const timeLeft = animationEnd - Date.now();
        if (timeLeft <= 0) return clearInterval(interval);

        const particleCount = 50 * (timeLeft / duration);
        confetti({
          ...defaults, particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
        });
        confetti({
          ...defaults, particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
        });
      }, 250);
    }, 1500);

    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
      timeouts.forEach(clearTimeout);
      clearTimeout(timeout);
      if (interval) clearInterval(interval);
    };
  }, [open, onClose]);

  // Burst shells fly outward from center in random directions.
  const shells = useMemo(
    () =>
      Array.from({ length: 14 }).map((_, i) => {
        const angle = (Math.PI * 2 * i) / 14 + Math.random() * 0.4;
        const dist = 160 + Math.random() * 220;
        return {
          id: i,
          x: Math.cos(angle) * dist,
          y: Math.sin(angle) * dist - 40,
          r: 360 + Math.random() * 540,
          s: 0.7 + Math.random() * 0.8,
          delay: Math.random() * 0.25,
          size: 36 + Math.random() * 34,
        };
      }),
    [],
  );

  const sparkles = useMemo(
    () =>
      Array.from({ length: 26 }).map((_, i) => {
        const angle = Math.random() * Math.PI * 2;
        const dist = 120 + Math.random() * 320;
        return {
          id: i,
          x: Math.cos(angle) * dist,
          y: Math.sin(angle) * dist - 30,
          delay: 0.1 + Math.random() * 0.6,
          size: 8 + Math.random() * 14,
        };
      }),
    [],
  );

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Backdrop: evening beach sky, dimmed */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(120% 90% at 50% 40%, rgba(15,37,51,0.65) 0%, rgba(8,18,28,0.95) 100%)',
              backdropFilter: 'blur(10px)',
            }}
          />

          {/* New Ember Overlay Animation */}
          <EmberOverlay />

          {/* Waves */}
          <div className="wave wave-back"></div>
          <div className="wave wave-middle"></div>
          <div className="wave wave-front"></div>

          {/* Breeze Layer */}
          <div className="breeze-layer">
            {breezes.map((b) => (
              <div
                key={b.id}
                className="breeze"
                style={{
                  top: b.top,
                  '--duration': b.dur,
                } as React.CSSProperties}
              />
            ))}
          </div>

          {/* Diving dolphins arcing across the screen */}
          {!reduce &&
            [0, 1, 2].map((i) => {
              const durationY = 2.5 + i * 0.3;
              const delayRot = durationY / 2;
              return (
                <div
                  key={`dolphin-${i}`}
                  className="absolute bottom-0 left-0"
                  style={{
                    ['--dolphin-scale' as string]: `${0.5 + i * 0.18}`,
                    animation: `dolphin-swim-x ${10 + i * 1.5}s linear ${i * 1.2
                      }s infinite`,
                  }}
                >
                  <div
                    style={{
                      animation: `dolphin-y ${durationY}s ease-in-out infinite alternate`,
                    }}
                  >
                    <div
                      style={{
                        animation: `dolphin-rot ${durationY}s ease-in-out infinite alternate -${delayRot}s`,
                      }}
                    >
                      <Dolphin className="w-40 drop-shadow-[0_10px_20px_rgba(0,0,0,0.4)] scale-x-[-1]" />
                    </div>
                  </div>
                </div>
              );
            })}

          {/* Exploding shells + sparkles from center */}
          <div className="absolute left-1/2 top-1/2 h-0 w-0">
            {!reduce &&
              shells.map((s) => (
                <motion.div
                  key={s.id}
                  className="absolute"
                  style={{
                    width: s.size,
                    height: s.size,
                    left: -s.size / 2,
                    top: -s.size / 2,
                  }}
                  initial={{ x: 0, y: 0, rotate: 0, scale: 0, opacity: 1 }}
                  animate={{
                    x: s.x,
                    y: s.y,
                    rotate: s.r,
                    scale: s.s,
                    opacity: [1, 1, 0],
                  }}
                  transition={{
                    duration: 2.2,
                    delay: s.delay,
                    ease: [0.22, 1, 0.36, 1],
                    times: [0, 0.6, 1],
                  }}
                >
                  <Shell className="h-full w-full drop-shadow-[0_0_12px_rgba(255,200,140,0.5)]" />
                </motion.div>
              ))}

            {!reduce &&
              sparkles.map((sp) => {
                const Icon = [Cake, Gift, PartyPopper, Sparkle][sp.id % 4];
                return (
                  <motion.div
                    key={`sp-${sp.id}`}
                    className="absolute text-sunset-200"
                    style={{
                      width: sp.size,
                      height: sp.size,
                      left: -sp.size / 2,
                      top: -sp.size / 2,
                    }}
                    initial={{ x: 0, y: 0, scale: 0, opacity: 0 }}
                    animate={{
                      x: sp.x,
                      y: sp.y,
                      scale: [0, 1, 0],
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: 1.8,
                      delay: sp.delay,
                      ease: 'easeOut',
                    }}
                  >
                    <Icon className="h-full w-full" />
                  </motion.div>
                );
              })}
          </div>

          {/* The wish card */}
          <motion.div
            className="relative z-10 mx-6 max-w-lg text-center"
            initial={{ scale: 0.8, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="mb-4 font-script text-3xl text-sunset-200">
              a wish for you
            </p>
            <h3 className="font-display text-3xl leading-snug text-white sm:text-4xl md:text-5xl">
              May your year be wider than the sea, warmer than this sand, and
              softer than the evening light you carry everywhere you go.
            </h3>
            <div className="hairline mx-auto mt-8 w-40" />
            <p className="mt-6 font-display text-xl italic text-ocean-100/80">
              Happy birthday, Spoorths-u are the mircale of my life
            </p>
            <p className="mt-1 font-script text-2xl text-sunset-200">
              hope u stay by my side for the rest of my life, love you..and btw u are awesome..
            </p>

            {/* Added party popper stickers */}
            <motion.img 
              src={partyPopperImg} 
              alt="Party Popper Left" 
              className="absolute -bottom-10 -left-16 w-24 h-24 object-contain opacity-90 drop-shadow-xl sm:-bottom-12 sm:-left-24 md:-left-32 sm:w-32 sm:h-32"
              animate={{ rotate: [-5, 5, -5], scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            />
            <motion.img 
              src={partyPopperImg} 
              alt="Party Popper Right" 
              className="absolute -bottom-10 -right-16 w-24 h-24 object-contain opacity-90 drop-shadow-xl scale-x-[-1] sm:-bottom-12 sm:-right-24 md:-right-32 sm:w-32 sm:h-32"
              animate={{ rotate: [5, -5, 5], scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut", delay: 1.5 }}
            />
          </motion.div>

          {/* Close */}
          <button
            onClick={onClose}
            className="absolute right-5 top-5 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-ocean-100/20 text-ocean-50/80 transition-colors hover:text-white"
            aria-label="Close"
          >
            <X className="h-5 w-5" strokeWidth={1.5} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
