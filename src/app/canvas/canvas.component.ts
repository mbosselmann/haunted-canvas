import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import {
  PreviewImageSetting,
  PreviewImageSettingsDirective,
} from '../directives/previewImage.directive';
import { StickerDirective } from '../directives/sticker.directive';
import { SelectedSticker } from '../editor-controls/editor-controls.component';
import { SelectedCategory } from '../editor/editor.component';
import { FinalImageSettingsDirective } from '../directives/finalImage.directive';

@Component({
  selector: 'app-editor-canvas',
  standalone: true,
  imports: [
    PreviewImageSettingsDirective,
    StickerDirective,
    FinalImageSettingsDirective,
  ],
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
  sticker!: SelectedSticker;

  @ViewChild('canvas', { read: ElementRef })
  canvas!: ElementRef<HTMLCanvasElement>;
}
