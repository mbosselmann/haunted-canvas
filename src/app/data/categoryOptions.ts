import { CategoryOption } from '../model/categoryOption';

export const categoryOptions: Record<string, CategoryOption[]> = {
  settings: [
    {
      id: 1,
      name: 'Brightness',
      icon: 'brightness-icon',
      action: () => console.log('Brightness selected'),
    },
    {
      id: 2,
      name: 'Contrast',
      icon: 'contrast-icon',
      action: () => console.log('Contrast selected'),
    },
    {
      id: 3,
      name: 'Saturation',
      icon: 'saturation-icon',
      action: () => console.log('Brightness selected'),
    },
    {
      id: 4,
      name: 'Inversion',
      icon: 'inversion-icon',
      action: () => console.log('Inversion selected'),
    },
    {
      id: 5,
      name: 'Rotate',
      icon: 'rotate-icon',
      action: () => console.log('Rotate selected'),
    },
    {
      id: 6,
      name: 'Flip',
      icon: 'flip-icon',
      action: () => console.log('Flip selected'),
    },
  ],
  filter: [
    {
      id: 1,
      name: 'Sepia',
      icon: 'sepia-icon',
      action: () => console.log('Sepia selected'),
    },
    {
      id: 2,
      name: 'Grayscale',
      icon: 'grayscale-icon',
      action: () => console.log('Grayscale selected'),
    },
  ],
  sticker: [
    {
      id: 1,
      name: 'Heart',
      icon: 'heart-icon',
      action: () => console.log('Heart selected'),
    },
    {
      id: 2,
      name: 'Star',
      icon: 'star-icon',
      action: () => console.log('Star selected'),
    },
  ],
  save: [
    {
      id: 1,
      name: 'Save to Disk',
      icon: 'save-icon',
      action: () => console.log('Save to Disk selected'),
    },
    {
      id: 2,
      name: 'Share',
      icon: 'share-icon',
      action: () => console.log('Share selected'),
    },
  ],
};
