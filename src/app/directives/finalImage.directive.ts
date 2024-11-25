import {
  Directive,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { CategoryOption } from '../model/categoryOption';
import { loadImage } from './helper/loadImage';
import { setCanvasSize } from './helper/setCanvasSize';

export interface FinalImageSetting extends CategoryOption {
  value: number;
}

export interface Sticker {
  id: string;
  src: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

@Directive({
  selector: '[appFinalImage]',
  standalone: true,
})
export class FinalImageSettingsDirective implements OnChanges {
  @Input()
  finalImage!: string;

  @Input()
  stickers: Sticker[] = [];

  constructor(private canvasElement: ElementRef<HTMLCanvasElement>) {}

  async ngOnChanges(changes: SimpleChanges): Promise<void> {
    if (changes['finalImage'] || changes['stickers']) {
      await this.loadAllImages();
    }
  }

  private async loadAllImages(): Promise<void> {
    const canvas = this.canvasElement.nativeElement;
    const ctx = canvas.getContext('2d');

    if (!ctx || !this.finalImage) {
      return;
    }

    try {
      const imageSources = [
        this.finalImage,
        ...this.stickers.map((sticker) => sticker.src),
      ];

      const images = await Promise.all(
        imageSources.map((imageUrl) => loadImage({ imageUrl })),
      );

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const finalImage = images[0];

      if (finalImage && this.finalImage) {
        const { width, height } = setCanvasSize(canvas, finalImage);

        ctx.imageSmoothingEnabled = false;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(finalImage, 0, 0, width, height);
      }

      this.stickers.forEach((sticker, index) => {
        const stickerImage = images[index + 1];
        if (stickerImage) {
          ctx.drawImage(
            stickerImage,
            sticker.x,
            sticker.y,
            sticker.width,
            sticker.height,
          );
        }
      });
    } catch (error) {
      console.error('Error loading images', error);
    }
  }
}
