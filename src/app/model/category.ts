export interface CategoryOption {
  id: number;
  name: string;
  src: string;
  icon: string;
  type: string;
  defaultValue?: number;
  minValue?: number;
  maxValue?: number;
  value?: number;
}

export type CategoryOptions = Record<string, CategoryOption[]>;

export type Categories = ['settings', 'stickers', 'save'];

export type SelectedCategory = 'settings' | 'stickers' | 'save' | '';
