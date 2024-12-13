import {
  Directive,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { CategoryOption } from '../model/categoryOption';
import { CanvasService, Sticker } from '../services/canvas.service';

export interface FinalImageSetting extends CategoryOption {
  value: number;
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

  constructor(
    private canvasElement: ElementRef<HTMLCanvasElement>,
    private canvasService: CanvasService,
  ) {}

  async ngOnChanges(changes: SimpleChanges): Promise<void> {
    if (changes['finalImage'] || changes['stickers']) {
      await this.canvasService.loadImageAndStickers(
        this.canvasElement.nativeElement,
        this.finalImage,
        this.stickers,
      );
    }
  }
}
