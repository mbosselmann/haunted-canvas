import { ElementRef } from '@angular/core';
import { PreviewImageSetting } from '../previewImage.directive';
import { applyImageSettings } from './applyImageSettings';

export function loadImageToCanvas(
  imageUrl: string,
  canvasElement: ElementRef<HTMLCanvasElement>,
  appPreviewImageSettings?: PreviewImageSetting[],
) {
  const canvas = canvasElement.nativeElement;
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
      if (appPreviewImageSettings?.length) {
        applyImageSettings(ctx, appPreviewImageSettings);
      }

      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    };
    image.src = imageUrl;
  }
}
