import { Reveal, RevealGroup, RevealItem } from '@/components/Reveal';
import PhotoFrame from '@/components/PhotoFrame';
import type { PhotoSlot } from '@/lib/types';

const photos: PhotoSlot[] = [
  { id: 'p3', label: 'Photo 3', ratio: 'square', caption: 'that smile', image: '/moments/moments.pic.jpeg' },
  { id: 'p4', label: 'Photo 4', ratio: 'portrait', caption: 'shines like a star', image: '/moments/moments.pic1.jpeg' },
  { id: 'p5', label: 'Photo 5', ratio: 'landscape', caption: 'adorable', image: '/moments/moments.pic2.jpeg' },
  { id: 'p6', label: 'Photo 6', ratio: 'wide', caption: 'breathtaking', image: '/moments/moments.pic3.jpeg' },
];

export default function Moments() {
  return (
    <section
      id="moments"
      className="relative mx-auto max-w-6xl px-6 py-28 sm:px-8 md:py-40"
    >
      <Reveal className="mb-16 text-center">
        <p className="mb-3 font-script text-3xl text-sunset-200">moments</p>
        <h2 className="font-display text-4xl text-white sm:text-5xl md:text-6xl">
          The ones the tide keeps bringing back
        </h2>
        <div className="hairline mx-auto mt-8 w-32" />
      </Reveal>

      <RevealGroup className="grid grid-cols-2 gap-5 sm:gap-6 md:grid-cols-4">
        {photos.map((p, i) => (
          <RevealItem
            key={p.id}
            className={i % 2 === 1 ? 'md:mt-12' : ''}
          >
            <PhotoFrame slot={p} index={i} />
          </RevealItem>
        ))}
      </RevealGroup>

      <Reveal className="mt-16 text-center">
        <p className="mx-auto max-w-2xl text-pretty font-display text-xl italic leading-relaxed text-ocean-100/75">
          thanks to you,made me belive that god is the best artist...
          20 years have made u strong and beautiful
        </p>
      </Reveal>
    </section>
  );
}
