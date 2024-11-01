import {
  AfterViewInit,
  Directive,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { CategoryOption } from '../model/categoryOption';

export interface CanvasSetting extends CategoryOption {
  value: number;
}

@Directive({
  selector: '[appCanvasSettings]',
  standalone: true,
})
export class CanvasSettingDirective implements AfterViewInit, OnChanges {
  @Input()
  appCanvasSettings!: CanvasSetting[];

  @Input()
  previewImage!: string;

  constructor(private canvasElement: ElementRef<HTMLCanvasElement>) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['appCanvasSettings'] && this.appCanvasSettings.length) {
      this.redrawContent();
    }
  }

  private applySettings(ctx: CanvasRenderingContext2D) {
    if (this.appCanvasSettings && this.appCanvasSettings.length > 0) {
      const filters = this.appCanvasSettings
        .map((setting) => {
          if (setting.name.toLowerCase() === 'inversion') {
            return `invert(${setting.value}%)`;
          } else if (setting.name.toLowerCase() === 'saturation') {
            return `saturate(${setting.value}%)`;
          } else if (setting.name.toLowerCase() === 'sepia') {
            return `sepia(${setting.value}%)`;
          } else if (setting.name.toLowerCase() === 'blur') {
            return `blur(${setting.value}px)`;
          } else {
            return `${setting.name.toLowerCase()}(${setting.value}%)`;
          }
        })
        .join(' ');

      ctx.filter = filters;
    }
  }

  private redrawContent() {
    const canvas = this.canvasElement.nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      return;
    }
    const image = new Image();
    image.src = this.previewImage;
    image.onload = () => {
      this.applySettings(ctx);
      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(image, 0, 0, ctx.canvas.width, ctx.canvas.height);
    };
  }

  loadImageToCanvas(imageUrl: string) {
    const canvas = this.canvasElement.nativeElement;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const image = new Image();
      image.onload = () => {
        const aspectRatio = image.naturalWidth / image.naturalHeight;
        const targetWidth = 375;
        const targetHeight = 420;
        const scale = 3;

        if (image.naturalWidth > image.naturalHeight) {
          canvas.width = targetWidth * scale;
          canvas.style.width = `${targetWidth}px`;
          canvas.height = (targetWidth / aspectRatio) * scale;
        } else {
          canvas.height = targetHeight * scale;
          canvas.style.height = `${targetHeight}px`;
          canvas.width = targetHeight * aspectRatio * scale;
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (this.appCanvasSettings.length) {
          this.applySettings(ctx);
        }

        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
      };
      image.src = imageUrl;
    }
  }

  ngAfterViewInit(): void {
    this.loadImageToCanvas(this.previewImage);
  }
}
