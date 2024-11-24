import {
  AfterViewInit,
  Directive,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { CategoryOption } from '../model/categoryOption';
import { SelectedSticker } from '../editor-controls/editor-controls.component';
import { applyImageSettings } from './helper/applyImageSettings';
import { loadImageToCanvas } from './helper/loadImage';

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

  @Input()
  sticker!: SelectedSticker;

  constructor(private canvasElement: ElementRef<HTMLCanvasElement>) {}

  ngOnChanges(changes: SimpleChanges) {
    if (
      changes['appPreviewImageSettings'] &&
      this.appPreviewImageSettings.length
    ) {
      this.redrawContent();
    }

    if (changes['sticker'] && changes['sticker'].currentValue.id) {
      this.redrawContent();
    }
  }

  private redrawContent() {
    const canvas = this.canvasElement.nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      return;
    }
    const image = new Image();
    image.src = this.previewImage;
    image.onload = () => {
      if (
        this.appPreviewImageSettings &&
        this.appPreviewImageSettings.length > 0
      ) {
        applyImageSettings(ctx, this.appPreviewImageSettings);
      }
      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(image, 0, 0, ctx.canvas.width, ctx.canvas.height);
    };
  }

  ngAfterViewInit(): void {
    loadImageToCanvas(
      this.previewImage,
      this.canvasElement,
      this.appPreviewImageSettings,
    );
  }
}
