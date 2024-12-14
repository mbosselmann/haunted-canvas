import { Component, EventEmitter, Output } from '@angular/core';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-save-close-button-group',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './save-close-button-group.component.html',
  styleUrl: './save-close-button-group.component.css',
})
export class SaveCloseButtonGroupComponent {
  saveIconUrl = 'assets/save-icon.svg';
  closeIconUrl = 'assets/close-icon.svg';

  @Output()
  close = new EventEmitter<'save' | 'close'>();

  onClose(event: 'save' | 'close') {
    this.close.emit(event);
  }
}
