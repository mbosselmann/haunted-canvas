import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EditorComponent } from './components/editor/editor.component';
import { HeroComponent } from './components/hero/hero.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, EditorComponent, HeroComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  isEditorOpen = false;

  toggleEditor(isEditorOpen: boolean): void {
    this.isEditorOpen = isEditorOpen;
  }
}
