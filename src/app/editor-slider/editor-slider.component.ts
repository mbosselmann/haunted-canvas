import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PreviewImageSetting } from '../directives/previewImage.directive';
import { ButtonComponent } from '../button/button.component';
import { SaveCloseButtonGroupComponent } from '../save-close-button-group/save-close-button-group.component';

@Component({
  selector: 'app-editor-slider',
  standalone: true,
  imports: [ButtonComponent, SaveCloseButtonGroupComponent],
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
  selectedOption!: PreviewImageSetting;

  onValueChange(event: Event) {
    if (event.target) {
      this.valueChange.emit(Number((event.target as HTMLInputElement).value));
    }
  }

  onCloseSlider(type: string) {
    if (type === 'close') {
      this.valueChange.emit(this.selectedOption.defaultValue);
      this.closeSlider.emit();
    }

    if (type === 'save') {
      this.closeSlider.emit();
    }
  }
}
