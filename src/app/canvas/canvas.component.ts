import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import {
  CanvasSetting,
  CanvasSettingDirective,
} from './canvasSettings.directive';

@Component({
  selector: 'app-editor-canvas',
  standalone: true,
  imports: [CanvasSettingDirective],
  templateUrl: './canvas.component.html',
  styleUrl: './canvas.component.css',
})
export class CanvasComponent {
  @Input()
  canvasSettings!: CanvasSetting[];

  @Input()
  previewImage!: string;

  @ViewChild('canvas', { read: ElementRef })
  canvas!: ElementRef<HTMLCanvasElement>;
}
