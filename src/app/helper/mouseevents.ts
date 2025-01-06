import { SelectedSticker } from '../model/sticker';

export function handleMouseEvents(
  canvas: HTMLCanvasElement,
  stickers: SelectedSticker[],
  redrawCanvas: (updatedStickers: SelectedSticker[]) => void,
) {
  const updatedStickers = [...stickers];

  canvas.onmousedown = mouseDown;
  canvas.onmousemove = mouseMove;
  canvas.onmouseup = mouseUp;

  let isDragging = false;
  let startX = 0;
  let startY = 0;

  function mouseDown(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();

    isDragging = true;
    const rect = canvas.getBoundingClientRect();
    startX = event.clientX - rect.left;
    startY = event.clientY - rect.top;
  }

  function mouseMove(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();

    if (isDragging) {
      const rect = canvas.getBoundingClientRect();
      const currentX = event.clientX - rect.left;
      const currentY = event.clientY - rect.top;

      const dx = currentX - startX;
      const dy = currentY - startY;

      updatedStickers[0].x += parseInt(String(dx)) * 3;
      updatedStickers[0].y += parseInt(String(dy)) * 3;

      startX = currentX;
      startY = currentY;
      redrawCanvas(updatedStickers);
    }
  }

  function mouseUp(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();

    isDragging = false;
  }

  return updatedStickers;
}
