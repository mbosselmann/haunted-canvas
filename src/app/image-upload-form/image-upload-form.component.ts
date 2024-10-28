import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-image-upload',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './image-upload-form.component.html',
  styleUrl: './image-upload-form.component.css',
})
export class ImageUploadComponent {
  imageUploadControl = new FormControl();
  payLoad = '';

  @Output()
  isImageChosen = new EventEmitter<boolean>();

  @Output()
  setPreviewImage = new EventEmitter<string>();

  onSubmit(event: Event) {
    event.preventDefault();
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files?.[0]) return;

    if (!input.files?.[0]) return;
    const previewImageUrl = URL.createObjectURL(input.files?.[0]);

    this.isImageChosen.emit(true);
    this.setPreviewImage.emit(previewImageUrl);
  }
}
