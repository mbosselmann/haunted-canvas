import { Directive, ElementRef, Input, OnChanges } from '@angular/core';
import { CategoryOption } from '../model/categoryOption';
import { loadImageToCanvas } from './helper/loadImage';

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

  constructor(private canvasElement: ElementRef<HTMLCanvasElement>) {}

  ngOnChanges() {
    loadImageToCanvas(this.finalImage, this.canvasElement);
  }
}
