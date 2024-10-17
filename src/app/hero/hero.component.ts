import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'hero',
  standalone: true,
  imports: [],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css',
})
export class HeroComponent {
  imageUrl: string = 'assets/hero-image.webp';

  @Output()
  heroButtonClicked = new EventEmitter<string>();

  navigateToEditor() {
    console.log('clicked');
  }
}
