export function setCanvasSize(
  canvas: HTMLCanvasElement,
  image: HTMLImageElement,
): HTMLCanvasElement {
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

  return canvas;
}
