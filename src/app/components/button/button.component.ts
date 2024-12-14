import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
})
export class ButtonComponent {
  @Input()
  imageSrc!: string;

  @Input()
  sizeDown = false;

  @Input()
  name!: string;

  @Output()
  close = new EventEmitter();

  onClose() {
    this.close.emit();
  }
}
