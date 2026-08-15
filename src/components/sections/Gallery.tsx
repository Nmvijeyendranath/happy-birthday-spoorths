import { Reveal, RevealGroup, RevealItem } from '@/components/Reveal';
import PhotoFrame from '@/components/PhotoFrame';
import type { PhotoSlot } from '@/lib/types';

const photos: PhotoSlot[] = [
  { id: 'p7', label: 'Photo 7', ratio: 'wide', caption: 'stunning', image: `${import.meta.env.BASE_URL}gallery/gallary.pic.jpeg` },
  { id: 'p8', label: 'Photo 8', ratio: 'portrait', caption: 'cute', image: `${import.meta.env.BASE_URL}gallery/gallary.pic1.jpeg` },
  { id: 'p9', label: 'Photo 9', ratio: 'landscape', caption: 'magnificient', image: `${import.meta.env.BASE_URL}gallery/gallary.pic2.jpeg` },
  { id: 'p10', label: 'Photo 10', ratio: 'square', caption: 'smile that lights up my mood', image: `${import.meta.env.BASE_URL}gallery/gallary.pic3.jpeg` },
];

export default function Gallery() {
  return (
    <section
      id="gallery"
      className="relative mx-auto max-w-6xl px-6 py-28 sm:px-8 md:py-40"
    >
      <Reveal className="mb-16 text-center">
        <p className="mb-3 font-script text-3xl text-sunset-200">the gallery</p>
        <h2 className="font-display text-4xl text-white sm:text-5xl md:text-6xl">
          A few frames I never want to forget
        </h2>
        <div className="hairline mx-auto mt-8 w-32" />
      </Reveal>

      <RevealGroup className="grid gap-5 sm:gap-6 md:grid-cols-12">
        <RevealItem className="md:col-span-7">
          <PhotoFrame slot={photos[0]} index={0} />
        </RevealItem>
        <RevealItem className="md:col-span-5 md:mt-16">
          <PhotoFrame slot={photos[1]} index={1} />
        </RevealItem>
        <RevealItem className="md:col-span-5">
          <PhotoFrame slot={photos[2]} index={2} />
        </RevealItem>
        <RevealItem className="md:col-span-7 md:-mt-8">
          <PhotoFrame slot={photos[3]} index={3} />
        </RevealItem>
      </RevealGroup>
    </section>
  );
}
