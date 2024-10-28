import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-editor-slider',
  standalone: true,
  imports: [],
  templateUrl: './editor-slider.component.html',
  styleUrl: './editor-slider.component.css',
})
export class EditorSliderComponent {
  @Input()
  selectedOption!: string;
}
