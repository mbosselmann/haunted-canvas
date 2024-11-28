import { PreviewImageSetting } from '../previewImage.directive';

interface LoadImage {
  imageUrl: string;
  appPreviewImageSettings?: PreviewImageSetting[];
  ctx?: CanvasRenderingContext2D;
}

export function loadImage({ imageUrl }: LoadImage): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();

    image.onload = () => {
      resolve(image);
    };

    image.onerror = (error) => {
      reject(error);
    };

    image.src = imageUrl;
  });
}
