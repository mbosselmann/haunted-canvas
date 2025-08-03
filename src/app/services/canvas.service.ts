import { Injectable } from '@angular/core';
import { loadImage } from '../helper/loadImage';
import { setCanvasSize } from '../helper/setCanvasSize';
import { applyImageSettings } from '../helper/applyImageSettings';
import { CategoryOption } from '../model/category';
import { LoadedSticker, SelectedSticker } from '../model/sticker';
import { ImageSetting } from '../model/image';
import { handleMouseEvents } from '../helper/mouseevents';
import { handleTouchEvents } from '../helper/touchevents';
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
  image: HTMLImageElement;
  appPreviewImageSettings?: ImageSetting[];
}

@Injectable({
  providedIn: 'root',
})
export class CanvasService {
  async loadImage(imageUrl: string): Promise<HTMLImageElement> {
    return loadImage(imageUrl);
  }

  setCanvasSize(
    canvas: HTMLCanvasElement,
    image: HTMLImageElement,
  ): HTMLCanvasElement {
    return setCanvasSize(canvas, image);
  }

  createImageUrl(canvas: HTMLCanvasElement): Promise<string> | string {
    if (canvas) {
      return new Promise<string>((resolve, reject) => {
        canvas.toBlob((blob) => {
          if (blob) {
            resolve(URL.createObjectURL(blob));
          } else {
            reject('Blob creation failed');
          }
        });
      });
    } else {
      console.error('Canvas element is not available. Exiting createImageUrl');
      return '';
    }
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

  drawImage({ canvas, image, appPreviewImageSettings }: DrawImageParameters) {
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      console.error('Canvas context is not available. Exiting drawImage');
      return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const { width, height } = setCanvasSize(canvas, image);

    ctx.imageSmoothingEnabled = false;
    ctx.imageSmoothingQuality = 'high';

    if (appPreviewImageSettings?.length && ctx) {
      applyImageSettings(ctx, appPreviewImageSettings);
    }

    this.drawElement({
      ctx,
      image,
      x: 0,
      y: 0,
      width: width,
      height: height,
    });
  }

  async loadStickers(stickers: CategoryOption[]): Promise<LoadedSticker[]> {
    try {
      const loadedStickers = await Promise.all(
        stickers.map(async (sticker) => {
          if (sticker.src) {
            const image = await loadImage(sticker.src);
            return { ...sticker, image };
          } else {
            throw new Error('Sticker source is undefined');
          }
        }),
      );

      return loadedStickers;
    } catch (error) {
      console.error('Error loading image and stickers', error);
      return [];
    }
  }

  drawImageAndStickers({
    canvas,
    mainImage,
    stickers,
    selectedStickers,
  }: {
    canvas: HTMLCanvasElement;
    mainImage: HTMLImageElement;
    stickers: LoadedSticker[];
    selectedStickers: SelectedSticker[];
  }) {
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      console.error(
        'Canvas context is not available. Exiting drawImagesAndStickers',
      );
      return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (mainImage) {
      this.drawImage({
        canvas: canvas,
        image: mainImage,
      });
    }

    selectedStickers.forEach((selectedSticker) => {
      const stickerImage = stickers.find(
        (sticker) => sticker.name === selectedSticker.name,
      )?.image;

      if (stickerImage) {
        this.drawElement({
          ctx,
          image: stickerImage,
          x: selectedSticker.x,
          y: selectedSticker.y,
          width: selectedSticker.width,
          height: selectedSticker.height,
        });
      }
    });
  }

  mouseEventsListener(
    canvas: HTMLCanvasElement,
    mainImage: HTMLImageElement,
    stickers: LoadedSticker[],
    selectedStickers: SelectedSticker[],
    isStickerSelected: boolean,
  ) {
    if (isStickerSelected) {
      canvas.style.cursor = 'pointer';
      const updatedStickers = handleMouseEvents(
        canvas,
        selectedStickers,
        selectedStickers.length - 1,
        (updatedStickers) =>
          this.drawImageAndStickers({
            canvas,
            mainImage,
            stickers,
            selectedStickers: updatedStickers,
          }),
      );
      return updatedStickers;
    } else {
      canvas.style.cursor = 'default';
    }
    return selectedStickers;
  }

  touchEventsListener(
    canvas: HTMLCanvasElement,
    mainImage: HTMLImageElement,
    stickers: LoadedSticker[],
    selectedStickers: SelectedSticker[],
  ) {
    const updatedStickers = handleTouchEvents(
      canvas,
      selectedStickers,
      (updatedStickers) =>
        this.drawImageAndStickers({
          canvas,
          mainImage,
          stickers,
          selectedStickers: updatedStickers,
        }),
    );

    return updatedStickers;
  }
}
