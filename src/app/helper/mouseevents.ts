import { SelectedSticker } from '../model/sticker';

export function handleMouseEvents(
  canvas: HTMLCanvasElement,
  stickers: SelectedSticker[],
  selectedStickerIndex: number,
  redrawCanvas: (updatedStickers: SelectedSticker[]) => void,
) {
  const updatedStickers = [...stickers];

  canvas.onmousedown = mouseDown;
  canvas.onmousemove = mouseMove;
  canvas.onmouseup = mouseUp;

  let isDragging = false;
  let clientX = 0;
  let clientY = 0;
  let stickerIndex = -1;

  function mouseDown(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();

    stickerIndex = selectedStickerIndex;

    if (stickerIndex !== -1) {
      isDragging = true;
    }
  }

  function mouseMove(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    if (isDragging && selectedStickerIndex !== -1) {
      const dx = clientX ? event.clientX - clientX : 0;
      const dy = clientY ? event.clientY - clientY : 0;

      updatedStickers[selectedStickerIndex].x += dx * 3;
      updatedStickers[selectedStickerIndex].y += dy * 3;

      clientX = event.clientX;
      clientY = event.clientY;

      redrawCanvas(updatedStickers);
    }
  }

  function mouseUp(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();

    isDragging = false;
    stickerIndex = -1;
    redrawCanvas(updatedStickers);
  }

  return updatedStickers;
}
