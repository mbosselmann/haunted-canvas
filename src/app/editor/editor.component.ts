import { Component, EventEmitter, Output } from '@angular/core';
import { CanvasComponent } from '../canvas/canvas.component';
import { EditorControlsComponent } from '../editor-controls/editor-controls.component';
import { ImageUploadComponent } from '../image-upload-form/image-upload-form.component';

@Component({
  selector: 'app-editor',
  standalone: true,
  imports: [CanvasComponent, EditorControlsComponent, ImageUploadComponent],
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.css',
})
export class EditorComponent {
  title = 'Haunted Canvas';
  closeIconUrl = 'assets/close-icon.svg';
  greenEyeUrl = 'assets/green-eye.png';
  isImageChosen = false;
  previewImage = '';

  @Output()
  closeEditor = new EventEmitter<boolean>();

  onCloseEditor() {
    this.closeEditor.emit(false);
    this.isImageChosen = false;
  }

  onImageChosen(isImageChosen: boolean) {
    this.isImageChosen = isImageChosen;
  }

  setPreviewImage(previewImage: string) {
    this.previewImage = previewImage;
    console.log(this.previewImage);
  }
}
