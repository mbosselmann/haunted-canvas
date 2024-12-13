import { Injectable } from '@angular/core';
import { loadImage } from '../helper/loadImage';
import { setCanvasSize } from '../helper/setCanvasSize';
import { applyImageSettings } from '../helper/applyImageSettings';
import { PreviewImageSetting } from '../directives/previewImage.directive';

interface DrawElementParameters {
  ctx: CanvasRenderingContext2D;
  image: HTMLImageElement;
  x: number;
  y: number;
  width: number;
  height: number;
}
interface DrawImageParameters {
  canvas: HTMLCanvasElement;
  previewImage: HTMLImageElement;
  appPreviewImageSettings: PreviewImageSetting[];
}

export interface Sticker {
  id: string;
  src: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

@Injectable({
  providedIn: 'root',
})
export class CanvasService {
  image: HTMLImageElement | null = null;

  async loadImage(imageUrl: string): Promise<HTMLImageElement> {
    return loadImage(imageUrl);
  }

  setCanvasSize(
    canvas: HTMLCanvasElement,
    image: HTMLImageElement,
  ): HTMLCanvasElement {
    return setCanvasSize(canvas, image);
  }

  drawElement({
    ctx,
    image,
    x,
    y,
    width,
    height,
  }: DrawElementParameters): void {
    ctx.drawImage(image, x, y, width, height);
  }

  async loadImageAndStickers(
    canvas: HTMLCanvasElement,
    finalImage: string,
    stickers: Sticker[],
  ): Promise<void> {
    const ctx = canvas.getContext('2d');

    if (!ctx || !finalImage) {
      return;
    }

    try {
      const imageSources = [
        finalImage,
        ...stickers.map((sticker) => sticker.src),
      ];

      const images = await Promise.all(
        imageSources.map((imageUrl) => loadImage(imageUrl)),
      );

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const mainImage = images[0];

      if (mainImage) {
        const { width, height } = this.setCanvasSize(canvas, mainImage);

        ctx.imageSmoothingEnabled = false;
        ctx.imageSmoothingQuality = 'high';
        this.drawElement({
          ctx,
          image: mainImage,
          x: 0,
          y: 0,
          width,
          height,
        });
      }

      stickers.forEach((sticker, index) => {
        const stickerImage = images[index + 1];
        if (stickerImage) {
          ctx.drawImage(
            stickerImage,
            sticker.x,
            sticker.y,
            sticker.width,
            sticker.height,
          );
        }
      });
    } catch (error) {
      console.error('Error loading images', error);
    }
  }

  drawImage({
    canvas,
    previewImage,
    appPreviewImageSettings,
  }: DrawImageParameters) {
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      return;
    }

    try {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const { width, height } = setCanvasSize(canvas, previewImage);

      ctx.imageSmoothingEnabled = false;
      ctx.imageSmoothingQuality = 'high';

      if (appPreviewImageSettings?.length && ctx) {
        applyImageSettings(ctx, appPreviewImageSettings);
      }

      this.drawElement({
        ctx,
        image: previewImage,
        x: 0,
        y: 0,
        width: width,
        height: height,
      });
    } catch (error) {
      console.error('Error drawing image', error);
    }
  }
}
