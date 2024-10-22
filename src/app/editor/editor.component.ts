import { Component, EventEmitter, Output } from '@angular/core';
import { CanvasComponent } from '../canvas/canvas.component';
import { EditorControlsComponent } from '../editor-controls/editor-controls.component';
import { ImageUploadComponent } from '../image-upload-form/image-upload-form.component';

@Component({
  selector: 'editor',
  standalone: true,
  imports: [CanvasComponent, EditorControlsComponent, ImageUploadComponent],
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.css',
})
export class EditorComponent {
  title: string = 'Haunted Canvas';
  closeIconUrl: string = 'assets/close-icon.svg';
  greenEyeUrl: string = 'assets/green-eye.png';
  isImageChosen: boolean = false;
  previewImage: any = null;

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
