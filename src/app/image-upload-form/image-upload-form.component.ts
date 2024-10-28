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
  errorMessage = '';
  errorActionMessage = '';

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

    const file = input.files[0];
    const maxSizeInBytes = 5 * 1024 * 1024; // 5 MB

    if (file.size > maxSizeInBytes) {
      this.errorMessage = 'Your image file size exceeds 5MB.';
      this.errorActionMessage = 'Please choose a smaller image file.';
      this.isImageChosen.emit(false);
      return;
    }

    if (!input.files?.[0]) return;
    const previewImageUrl = URL.createObjectURL(input.files?.[0]);

    this.isImageChosen.emit(true);
    this.setPreviewImage.emit(previewImageUrl);
  }
}
