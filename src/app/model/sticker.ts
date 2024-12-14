import { CategoryOption } from './category';

export interface SelectedSticker {
  id: string;
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface LoadedSticker extends CategoryOption {
  image: HTMLImageElement;
}
