import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css',
})
export class HeroComponent {
  title = 'Haunted Canvas';
  greenEyeUrl = 'assets/green-eye.png';
  imageUrl = 'assets/hero-image.webp';

  @Output()
  startEditor = new EventEmitter<boolean>();

  onStartEditor() {
    this.startEditor.emit(true);
  }
}
