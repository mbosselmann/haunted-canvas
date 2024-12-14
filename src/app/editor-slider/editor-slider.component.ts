import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SaveCloseButtonGroupComponent } from '../save-close-button-group/save-close-button-group.component';
import { ImageSetting } from '../model/image';

@Component({
  selector: 'app-editor-slider',
  standalone: true,
  imports: [SaveCloseButtonGroupComponent],
  templateUrl: './editor-slider.component.html',
  styleUrl: './editor-slider.component.css',
})
export class EditorSliderComponent {
  closeIconUrl = 'assets/close-icon.svg';
  saveIconUrl = 'assets/save-icon.svg';

  @Output()
  valueChange = new EventEmitter<number>();

  @Output()
  closeSlider = new EventEmitter();

  @Input()
  selectedPreviewImageOptions!: ImageSetting;

  onValueChange(event: Event) {
    if (event.target) {
      this.valueChange.emit(Number((event.target as HTMLInputElement).value));
    }
  }

  onCloseSlider(type: string) {
    if (type === 'close') {
      this.valueChange.emit(this.selectedPreviewImageOptions.defaultValue);
      this.closeSlider.emit();
    }

    if (type === 'save') {
      this.closeSlider.emit();
    }
  }
}
