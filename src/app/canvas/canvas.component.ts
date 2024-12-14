import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { LoadedSticker, SelectedSticker } from '../model/sticker';
import { ImageDirective } from '../directives/image.directive';
import { ImageSetting } from '../model/image';
import { SelectedCategory } from '../model/category';
@Component({
  selector: 'app-editor-canvas',
  standalone: true,
  imports: [ImageDirective],
  templateUrl: './canvas.component.html',
  styleUrl: './canvas.component.css',
})
export class CanvasComponent {
  @Input()
  selectedCategory!: SelectedCategory;

  @Input()
  finalImage!: HTMLImageElement;

  @Input()
  appPreviewImageSettings!: ImageSetting[];

  @Input()
  previewImage!: HTMLImageElement;

  @Input()
  stickers!: LoadedSticker[];

  @Input()
  selectedStickers!: SelectedSticker[];

  @ViewChild('styleCanvas', { static: false })
  styleCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('finalCanvas', { static: false })
  finalCanvas!: ElementRef<HTMLCanvasElement>;
}
