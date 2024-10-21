import { Component, EventEmitter, Output } from '@angular/core';
import { CanvasComponent } from '../canvas/canvas.component';
import { EditorControlsComponent } from '../editor-controls/editor-controls.component';

@Component({
  selector: 'editor',
  standalone: true,
  imports: [CanvasComponent, EditorControlsComponent],
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.css',
})
export class EditorComponent {
  title: string = 'Haunted Canvas';
  closeIconUrl: string = 'assets/close-icon.svg';
  greenEyeUrl: string = 'assets/green-eye.png';

  @Output()
  closeEditor = new EventEmitter<boolean>();

  onCloseEditor() {
    this.closeEditor.emit(false);
  }
}
