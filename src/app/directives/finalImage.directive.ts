import {
  Directive,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { CategoryOption } from '../model/categoryOption';
import { loadImageToCanvas } from './helper/loadImage';

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

  loadStickers = false;

  constructor(private canvasElement: ElementRef<HTMLCanvasElement>) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['finalImage']) {
      loadImageToCanvas(this.finalImage, this.canvasElement);
      console.log('FINAL IMAGE LOADED');
    }

    if (changes['stickers'] || this.stickers.length) {
      this.applyStickers();
      console.log('STICKERS APPLIED');
      console.log(this.stickers);
    }
  }

  private applyStickers(): void {
    const canvas = this.canvasElement.nativeElement;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      this.stickers.forEach((sticker) => {
        const stickerImage = new Image();
        stickerImage.onload = () => {
          ctx.drawImage(
            stickerImage,
            sticker.x,
            sticker.y,
            sticker.width,
            sticker.height,
          );
        };
        stickerImage.src = sticker.src;
      });
    }
  }
}
