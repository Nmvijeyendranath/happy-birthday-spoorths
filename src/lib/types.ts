export type PhotoSlot = {
  id: string;
  label: string;
  caption?: string;
  ratio: 'portrait' | 'landscape' | 'square' | 'wide';
  image?: string;
};

export type SectionId =
  | 'hero'
  | 'letter'
  | 'moments'
  | 'gallery'
  | 'journey'
  | 'finale';
