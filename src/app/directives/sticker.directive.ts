import {
  Directive,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { SelectedSticker } from '../editor-controls/editor-controls.component';
import { PreviewImageSetting } from './previewImage.directive';

export interface Sticker {
  id: string;
  src: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

@Directive({
  selector: '[appSticker]',
  standalone: true,
})
export class StickerDirective implements OnChanges {
  @Input()
  sticker!: SelectedSticker;

  @Input()
  appPreviewImageSettings!: PreviewImageSetting[];

  stickers: Sticker[] = [];

  constructor(private canvasElement: ElementRef<HTMLCanvasElement>) {}

  ngOnChanges(changes: SimpleChanges): void {
    const canvas = this.canvasElement.nativeElement;
    if (changes['sticker'] && changes['sticker'].currentValue.id) {
      const newSticker = {
        ...changes['sticker'].currentValue,
        x: canvas.width / 2 - 100,
        y: canvas.height / 2 - 100,
        width: 200,
        height: 200,
      };

      this.stickers = [...this.stickers, newSticker];
    }

    if (this.stickers.length) {
      this.applyStickers();
    }

    if (
      changes['appPreviewImageSettings'] &&
      changes['appPreviewImageSettings'].currentValue.length &&
      this.stickers.length
    ) {
      this.applyStickers();
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
