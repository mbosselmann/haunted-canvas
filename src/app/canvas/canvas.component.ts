import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import {
  PreviewImageSetting,
  PreviewImageSettingsDirective,
} from '../directives/previewImage.directive';

@Component({
  selector: 'app-editor-canvas',
  standalone: true,
  imports: [PreviewImageSettingsDirective],
  templateUrl: './canvas.component.html',
  styleUrl: './canvas.component.css',
})
export class CanvasComponent {
  @Input()
  appPreviewImageSettings!: PreviewImageSetting[];

  @Input()
  previewImage!: string;

  @ViewChild('canvas', { read: ElementRef })
  canvas!: ElementRef<HTMLCanvasElement>;
}
