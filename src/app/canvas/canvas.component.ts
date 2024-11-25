import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import {
  PreviewImageSetting,
  PreviewImageSettingsDirective,
} from '../directives/previewImage.directive';
import { SelectedCategory } from '../editor/editor.component';
import {
  FinalImageSettingsDirective,
  Sticker,
} from '../directives/finalImage.directive';
@Component({
  selector: 'app-editor-canvas',
  standalone: true,
  imports: [PreviewImageSettingsDirective, FinalImageSettingsDirective],
  templateUrl: './canvas.component.html',
  styleUrl: './canvas.component.css',
})
export class CanvasComponent {
  @Input()
  selectedCategory!: SelectedCategory;

  @Input()
  finalImage!: string;

  @Input()
  appPreviewImageSettings!: PreviewImageSetting[];

  @Input()
  previewImage!: string;

  @Input()
  stickers: Sticker[] = [];

  @ViewChild('styleCanvas', { static: false })
  styleCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('finalCanvas', { static: false })
  finalCanvas!: ElementRef<HTMLCanvasElement>;
}
