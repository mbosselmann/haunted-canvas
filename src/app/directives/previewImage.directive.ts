import {
  AfterViewInit,
  Directive,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { CategoryOption } from '../model/categoryOption';
import { CanvasService } from '../services/canvas.service';

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

  constructor(
    private canvasElement: ElementRef<HTMLCanvasElement>,
    private canvasService: CanvasService,
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    if (
      changes['appPreviewImageSettings'] &&
      this.appPreviewImageSettings.length
    ) {
      this.canvasService.drawImage({
        canvas: this.canvasElement.nativeElement,
        previewImage: this.previewImage,
        appPreviewImageSettings: this.appPreviewImageSettings,
      });
    }
  }

  ngAfterViewInit() {
    if (this.previewImage) {
      this.canvasService.drawImage({
        canvas: this.canvasElement.nativeElement,
        previewImage: this.previewImage,
        appPreviewImageSettings: this.appPreviewImageSettings,
      });
    }
  }
}
