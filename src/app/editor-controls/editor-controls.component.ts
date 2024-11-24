import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CategoryOptions } from '../model/categoryOption';
import { categoryOptions } from '../data/categoryOptions';
import { EditorSliderComponent } from '../editor-slider/editor-slider.component';
import { ActiveDirective } from '../directives/active.directive';
import { PreviewImageSetting } from '../directives/previewImage.directive';
import { Categories, SelectedCategory } from '../editor/editor.component';

export interface SelectedSticker {
  id: string;
  src: string;
}
@Component({
  selector: 'app-editor-controls',
  standalone: true,
  imports: [EditorSliderComponent, ActiveDirective],
  templateUrl: './editor-controls.component.html',
  styleUrl: './editor-controls.component.css',
})
export class EditorControlsComponent {
  selectedPreviewImageOptions: PreviewImageSetting | null = null;
  categoryOptions: CategoryOptions = categoryOptions;

  @Input()
  selectedCategory: SelectedCategory = 'settings';

  @Input()
  categories: Categories = ['settings', 'sticker', 'save'];

  @Input()
  isImageChosen = false;

  @Input()
  canvasElement!: HTMLCanvasElement;

  @Output()
  sliderValueChange = new EventEmitter<PreviewImageSetting>();

  @Output()
  selectedStickerChange = new EventEmitter<SelectedSticker>();

  @Output()
  selectedCategoryChange = new EventEmitter<SelectedCategory>();

  onSliderValueChange(value: number) {
    if (
      this.selectedPreviewImageOptions &&
      this.selectedPreviewImageOptions.id !== undefined
    ) {
      this.sliderValueChange.emit({
        ...this.selectedPreviewImageOptions,
        value,
      });
      this.categoryOptions[this.selectedCategory] = this.categoryOptions[
        this.selectedCategory
      ].map((categoryOption) =>
        categoryOption.name === this.selectedPreviewImageOptions?.name
          ? { ...this.selectedPreviewImageOptions, value }
          : categoryOption,
      );
    }
  }

  onSelectCategory(category: SelectedCategory) {
    this.selectedCategory = this.selectedCategory === category ? '' : category;
    this.selectedPreviewImageOptions = null;
    this.selectedCategoryChange.emit(this.selectedCategory);
  }

  onSelectOption(option: string) {
    if (this.selectedCategory === 'settings') {
      const selectedCategoryOption =
        categoryOptions[this.selectedCategory].find(
          (categoryOption) => categoryOption.name === option,
        ) || null;

      this.selectedPreviewImageOptions = selectedCategoryOption
        ? {
            ...selectedCategoryOption,
            id: selectedCategoryOption.id,
            type: this.selectedCategory,
            name: selectedCategoryOption.name,
            value:
              selectedCategoryOption.value ??
              selectedCategoryOption.defaultValue ??
              0,
          }
        : null;
    }

    if (this.selectedCategory === 'sticker') {
      const foundSticker = categoryOptions[this.selectedCategory].find(
        (sticker) => sticker.name === option,
      )?.icon;

      if (foundSticker) {
        this.selectedStickerChange.emit({
          id: crypto.randomUUID(),
          src: '/assets/' + foundSticker + '.svg',
        });
      }
    }

    if (
      this.selectedPreviewImageOptions &&
      this.selectedPreviewImageOptions.name === 'Save'
    ) {
      this.saveCanvas();
    }
  }

  saveCanvas() {
    if (this.canvasElement) {
      const dataUrl = this.canvasElement.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = dataUrl;
      const date = new Date();
      const formattedDate = date.toLocaleDateString().replace(/\//g, '-');
      const formattedTime = date
        .toTimeString()
        .split(' ')[0]
        .replace(/:/g, '-');
      link.download = `haunted-canvas_${formattedDate}_${formattedTime}.png`;
      link.click();
    }
  }

  onCloseSlider() {
    this.selectedPreviewImageOptions = null;
  }
}
