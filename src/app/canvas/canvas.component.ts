import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-editor-canvas',
  standalone: true,
  imports: [],
  templateUrl: './canvas.component.html',
  styleUrl: './canvas.component.css',
})
export class CanvasComponent implements AfterViewInit {
  @Input()
  previewImage!: string;

  @ViewChild('canvas', { read: ElementRef })
  canvas!: ElementRef<HTMLCanvasElement>;

  loadImageToCanvas(imageUrl: string) {
    const canvas = this.canvas.nativeElement;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const image = new Image();
      image.onload = () => {
        const aspectRatio = image.naturalWidth / image.naturalHeight;
        const targetWidth = 375;
        const targetHeight = 420;

        if (image.naturalWidth > image.naturalHeight) {
          canvas.width = targetWidth;
          canvas.height = targetWidth / aspectRatio;
        } else {
          canvas.height = targetHeight;
          canvas.width = targetHeight * aspectRatio;
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
      };
      image.src = imageUrl;
    }
  }

  ngAfterViewInit(): void {
    this.loadImageToCanvas(this.previewImage);
  }
}
