import { ImageSetting } from '../model/image';

export function applyImageSettings(
  ctx: CanvasRenderingContext2D,
  appPreviewImageSettings: ImageSetting[],
) {
  const filters = appPreviewImageSettings
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
