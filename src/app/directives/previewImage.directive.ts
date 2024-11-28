import {
  AfterViewInit,
  Directive,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { CategoryOption } from '../model/categoryOption';
import { setCanvasSize } from './helper/setCanvasSize';
import { applyImageSettings } from './helper/applyImageSettings';

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
  previewImage!: HTMLImageElement;

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

      this.ctx.imageSmoothingEnabled = false;
      this.ctx.imageSmoothingQuality = 'high';

      if (this.appPreviewImageSettings?.length && this.ctx) {
        applyImageSettings(this.ctx, this.appPreviewImageSettings);
      }

      this.ctx.drawImage(
        this.previewImage,
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
        const { width, height } = setCanvasSize(this.canvas, this.previewImage);

        if (this.appPreviewImageSettings?.length && this.ctx) {
          applyImageSettings(this.ctx, this.appPreviewImageSettings);
        }

        this.ctx.imageSmoothingEnabled = false;
        this.ctx.imageSmoothingQuality = 'high';
        this.ctx.drawImage(this.previewImage, 0, 0, width, height);
      } catch (error) {
        console.error('Error loading image', error);
      }
    }
  }
}
