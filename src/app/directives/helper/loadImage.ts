import { PreviewImageSetting } from '../previewImage.directive';
import { applyImageSettings } from './applyImageSettings';

interface LoadImage {
  imageUrl: string;
  appPreviewImageSettings?: PreviewImageSetting[];
  ctx?: CanvasRenderingContext2D;
}

export function loadImage({
  imageUrl,
  appPreviewImageSettings,
  ctx,
}: LoadImage): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();

    image.onload = () => {
      if (appPreviewImageSettings?.length && ctx) {
        applyImageSettings(ctx, appPreviewImageSettings);
      }
      resolve(image);
    };

    image.onerror = (error) => {
      reject(error);
    };

    image.src = imageUrl;
  });
}
