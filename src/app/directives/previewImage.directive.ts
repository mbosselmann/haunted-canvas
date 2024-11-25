import {
  AfterViewInit,
  Directive,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { CategoryOption } from '../model/categoryOption';
import { loadImage } from './helper/loadImage';
import { setCanvasSize } from './helper/setCanvasSize';

export interface PreviewImageSetting extends CategoryOption {
  value: number;
}

@Directive({
  selector: '[appPreviewImage]',
  standalone: true,
})
export class PreviewImageSettingsDirective implements AfterViewInit, OnChanges {
  @Input()
  appPreviewImageSettings!: PreviewImageSetting[];

  @Input()
  previewImage!: string;

  canvas: HTMLCanvasElement;
  ctx!: CanvasRenderingContext2D;

  constructor(private canvasElement: ElementRef<HTMLCanvasElement>) {
    this.canvas = this.canvasElement.nativeElement;
    const context = this.canvas.getContext('2d');
    if (context) {
      this.ctx = context;
    }
  }

  async ngOnChanges(changes: SimpleChanges) {
    if (
      changes['appPreviewImageSettings'] &&
      this.appPreviewImageSettings.length
    ) {
      await this.redrawContent();
    }
  }

  private async redrawContent() {
    if (!this.ctx) {
      return;
    }

    try {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      const image = await loadImage({
        imageUrl: this.previewImage,
        ctx: this.ctx,
        appPreviewImageSettings: this.appPreviewImageSettings,
      });

      this.ctx.imageSmoothingEnabled = false;
      this.ctx.imageSmoothingQuality = 'high';

      this.ctx.drawImage(
        image,
        0,
        0,
        this.ctx.canvas.width,
        this.ctx.canvas.height,
      );
    } catch (error) {
      console.error('Error redrawing content', error);
    }
  }

  async ngAfterViewInit(): Promise<void> {
    if (this.ctx) {
      try {
        const image = await loadImage({
          imageUrl: this.previewImage,
          ctx: this.ctx,
          appPreviewImageSettings: this.appPreviewImageSettings,
        });

        const { width, height } = setCanvasSize(this.canvas, image);

        this.ctx.imageSmoothingEnabled = false;
        this.ctx.imageSmoothingQuality = 'high';
        this.ctx.drawImage(image, 0, 0, width, height);
      } catch (error) {
        console.error('Error loading image', error);
      }
    }
  }
}
