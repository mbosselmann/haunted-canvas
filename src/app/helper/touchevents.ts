import { SelectedSticker } from '../model/sticker';

export function handleTouchEvents(
  canvas: HTMLCanvasElement,
  stickers: SelectedSticker[],
  redrawCanvas: (updatedStickers: SelectedSticker[]) => void,
) {
  const updatedStickers = [...stickers];

  canvas.ontouchstart = touchDown;
  canvas.ontouchmove = touchMove;
  canvas.ontouchend = touchUp;

  let isDragging = false;
  let startX = 0;
  let startY = 0;

  function touchDown(event: TouchEvent) {
    event.preventDefault();
    event.stopPropagation();

    isDragging = true;
    const rect = canvas.getBoundingClientRect();
    const touch = event.touches[0];
    startX = touch.clientX - rect.left;
    startY = touch.clientY - rect.top;
  }

  function touchMove(event: TouchEvent) {
    event.preventDefault();
    event.stopPropagation();

    if (isDragging) {
      const rect = canvas.getBoundingClientRect();
      const touch = event.touches[0];
      const currentX = touch.clientX - rect.left;
      const currentY = touch.clientY - rect.top;

      const dx = currentX - startX;
      const dy = currentY - startY;

      updatedStickers[updatedStickers.length - 1].x += parseInt(String(dx)) * 3;
      updatedStickers[updatedStickers.length - 1].y += parseInt(String(dy)) * 3;

      startX = currentX;
      startY = currentY;
      redrawCanvas(updatedStickers);
    }
  }

  function touchUp(event: TouchEvent) {
    event.preventDefault();
    event.stopPropagation();

    isDragging = false;
  }

  return updatedStickers;
}
