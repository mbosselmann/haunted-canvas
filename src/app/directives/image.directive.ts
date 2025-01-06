import {
  AfterViewInit,
  Directive,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { CanvasService } from '../services/canvas.service';
import { LoadedSticker, SelectedSticker } from '../model/sticker';
import { ImageSetting } from '../model/image';

@Directive({
  selector: '[appPreviewImage]',
  standalone: true,
})
export class ImageDirective implements AfterViewInit, OnChanges {
  @Input()
  finalImage!: HTMLImageElement;

  @Input()
  stickers: LoadedSticker[] = [];

  @Input()
  selectedStickers: SelectedSticker[] = [];

  @Input()
  appPreviewImageSettings!: ImageSetting[];

  @Input()
  previewImage!: HTMLImageElement;

  constructor(
    private canvasElement: ElementRef<HTMLCanvasElement>,
    private canvasService: CanvasService,
  ) {}

  ngAfterViewInit() {
    if (this.previewImage) {
      this.canvasService.drawImage({
        canvas: this.canvasElement.nativeElement,
        image: this.previewImage,
        appPreviewImageSettings: this.appPreviewImageSettings,
      });
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (
      changes['appPreviewImageSettings'] &&
      this.appPreviewImageSettings.length
    ) {
      this.canvasService.drawImage({
        canvas: this.canvasElement.nativeElement,
        image: this.previewImage,
        appPreviewImageSettings: this.appPreviewImageSettings,
      });
    }

    if (changes['finalImage'] || changes['selectedStickers']) {
      this.selectedStickers = this.canvasService.mouseEventsListener(
        this.canvasElement.nativeElement,
        this.finalImage,
        this.stickers,
        this.selectedStickers,
      );

      this.selectedStickers = this.canvasService.touchEventsListener(
        this.canvasElement.nativeElement,
        this.finalImage,
        this.stickers,
        this.selectedStickers,
      );

      this.canvasService.drawImageAndStickers({
        canvas: this.canvasElement.nativeElement,
        mainImage: this.finalImage,
        stickers: this.stickers,
        selectedStickers: this.selectedStickers ?? [],
      });
    }
  }
}
