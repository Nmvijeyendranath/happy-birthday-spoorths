import { Bird, Sparkles } from 'lucide-react';
import { Reveal, RevealGroup, RevealItem } from '@/components/Reveal';
import PhotoFrame from '@/components/PhotoFrame';
import type { PhotoSlot } from '@/lib/types';
import angelimg from '../../../assets/angel.png';
import angelimg1 from '../../../assets/angel (1).png';

const photos: PhotoSlot[] = [
  { id: 'p1', label: 'Photo 1', ratio: 'portrait', caption: 'my goodness, the eyes', image: `${import.meta.env.BASE_URL}letter/letter.pic.jpeg` },
  { id: 'p2', label: 'Photo 2', ratio: 'landscape', caption: 'Golden Hour', image: `${import.meta.env.BASE_URL}letter/letter.pic1.jpeg` },
  { id: 'p3', label: 'Photo 3', ratio: 'square', caption: 'victorias secret model', image: `${import.meta.env.BASE_URL}letter/letter.pic2.jpeg` },
];

export default function Letter() {
  return (
    <section
      id="letter"
      className="relative mx-auto max-w-7xl px-6 py-28 sm:px-8 md:py-40 flex flex-col md:flex-row items-center justify-center gap-12"
    >
      {/* Photo Frame 1 (Left) */}
      <div className="w-full md:w-1/4 relative hidden md:block">
        <Reveal className="relative">
          <img src={angelimg1} alt="Angel" className="absolute -top-16 -right-8 w-16 h-16 z-10 animate-bob object-contain drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]" />
          <PhotoFrame slot={photos[0]} index={0} className="-rotate-6 mt-12" />
        </Reveal>
      </div>

      {/* Central Message Box */}
      <div className="w-full md:w-2/4 relative bg-ocean-950/60 backdrop-blur-xl border border-ocean-100/20 p-8 md:p-12 rounded-3xl shadow-[0_0_40px_rgba(0,0,0,0.5)] text-center">
        <RevealGroup className="space-y-6">
          <RevealItem>
            <p className="font-script text-3xl md:text-4xl text-sunset-200 mb-6 drop-shadow-[0_0_12px_rgba(255,180,120,0.4)]">
              Hey, birthday girl
            </p>
          </RevealItem>
          <RevealItem>
            <p className="font-display text-xl md:text-2xl text-white leading-relaxed mb-6">
              Spoorthi — I wanted to give you something that couldn’t fit in a box, so I built something that could fit in your phone instead… the one thing that’s always by your side, which I’m honestly a little jealous of. And the background? An evening by the beach — I imagined it as a glimpse of what the world might’ve looked like somewhere when you were born. Just a little piece of me, made especially for you.
            </p>
          </RevealItem>
          <RevealItem>
            <p className="font-['Playfair_Display'] leading-relaxed max-w-md mx-auto text-white">
              You’ve always been special to me, but 20 years ago today, you came into this world, and somehow, I got the woman I’d always wished for. I’m truly grateful to have you in my life. Look at the beautiful woman you’ve become—you deserve to be happy for that. Now, take your time, explore it, and let every little part of it remind you how special you are to me.</p>
          </RevealItem>
          <RevealItem>
            <p className="mt-8 font-script text-2xl text-sunset-200">
              With heartfelt love,viji
            </p>
          </RevealItem>
        </RevealGroup>
      </div>

      {/* Photo Frame 2 & 3 (Right) */}
      <div className="w-full md:w-1/4 flex flex-col gap-12 relative hidden md:flex">
        <Reveal>
          <PhotoFrame slot={photos[1]} index={1} className="rotate-3" />
        </Reveal>
        <Reveal className="relative">
          <PhotoFrame slot={photos[2]} index={2} className="-rotate-3" />
          <img src={angelimg} alt="Angel" className="absolute -bottom-16 -left-8 w-20 h-20 -scale-x-100 z-10 animate-drift object-contain drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]" />
        </Reveal>
      </div>

      {/* Mobile view frames */}
      <div className="w-full flex flex-col gap-6 md:hidden mt-8">
        <div className="grid grid-cols-2 gap-4">
          <Reveal className="relative">
            <img src={angelimg1} alt="Angel" className="absolute -top-6 -right-2 w-12 h-12 z-10 animate-twinkle object-contain drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]" />
            <PhotoFrame slot={photos[0]} index={0} className="-rotate-3 mt-4" />
          </Reveal>
          <Reveal className="relative">
            <PhotoFrame slot={photos[1]} index={1} className="rotate-3 mt-12" />
          </Reveal>
        </div>
        <Reveal className="relative w-3/4 mx-auto mt-4">
          <img src={angelimg} alt="Angel" className="absolute -bottom-8 -left-2 w-14 h-14 -scale-x-100 z-10 animate-drift object-contain drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]" />
          <PhotoFrame slot={photos[2]} index={2} className="-rotate-2" />
        </Reveal>
      </div>
    </section>
  );
}
