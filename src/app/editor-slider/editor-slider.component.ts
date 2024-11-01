import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CanvasSetting } from '../canvas/canvasSettings.directive';

@Component({
  selector: 'app-editor-slider',
  standalone: true,
  imports: [],
  templateUrl: './editor-slider.component.html',
  styleUrl: './editor-slider.component.css',
})
export class EditorSliderComponent {
  @Output()
  valueChange = new EventEmitter<number>();

  @Input()
  selectedOption!: CanvasSetting;

  onValueChange(event: Event) {
    if (event.target) {
      this.valueChange.emit(Number((event.target as HTMLInputElement).value));
    }
  }
}
