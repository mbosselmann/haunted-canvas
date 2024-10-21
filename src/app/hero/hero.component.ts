import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'hero',
  standalone: true,
  imports: [],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css',
})
export class HeroComponent {
  title: string = 'Haunted Canvas';
  greenEyeUrl: string = 'assets/green-eye.png';
  imageUrl: string = 'assets/hero-image.webp';

  @Output()
  startEditor = new EventEmitter<boolean>();

  onStartEditor() {
    this.startEditor.emit(true);
  }
}
