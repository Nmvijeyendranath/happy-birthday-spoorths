import type { SectionId } from './types';

export type SectionMeta = {
  id: SectionId;
  short: string;
  label: string;
};

export const sections: SectionMeta[] = [
  { id: 'hero', short: 'Home', label: 'An opening' },
  { id: 'letter', short: 'Letter', label: 'A letter' },
  { id: 'moments', short: 'Moments', label: 'Moments' },
  { id: 'gallery', short: 'Gallery', label: 'The gallery' },
  { id: 'journey', short: 'Journey', label: 'The Journey' },
  { id: 'finale', short: 'Wish', label: 'Make a wish' },
];
