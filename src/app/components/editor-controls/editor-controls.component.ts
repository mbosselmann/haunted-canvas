import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { categoryOptions } from '../../data/categoryOptions';
import { ActiveDirective } from '../../directives/active.directive';
import {
  CategoryOptions,
  SelectedCategory,
  Categories,
} from '../../model/category';
import { ImageSetting } from '../../model/image';
import { EditorSliderComponent } from '../editor-slider/editor-slider.component';

@Component({
  selector: 'app-editor-controls',
  standalone: true,
  imports: [EditorSliderComponent, ActiveDirective, CommonModule],
  templateUrl: './editor-controls.component.html',
  styleUrl: './editor-controls.component.css',
})
export class EditorControlsComponent {
  selectedPreviewImageOptions: ImageSetting | null = null;
  categoryOptions: CategoryOptions = categoryOptions;

  @Input()
  selectedCategory: SelectedCategory = 'settings';

  @Input()
  categories: Categories = ['settings', 'stickers', 'save'];

  @Input()
  isImageChosen = false;

  @Input()
  canvasElement!: HTMLCanvasElement;

  @Output()
  sliderValueChange = new EventEmitter<ImageSetting>();

  @Output()
  selectedStickerChange = new EventEmitter<{ id: string; name: string }>();

  @Output()
  categoryChange = new EventEmitter<SelectedCategory>();

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
    this.categoryChange.emit(this.selectedCategory);
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

    if (this.selectedCategory === 'stickers') {
      const stickerName = categoryOptions[this.selectedCategory].find(
        (sticker) => sticker.name === option,
      )?.name;

      if (stickerName) {
        this.selectedStickerChange.emit({
          id: crypto.randomUUID(),
          name: stickerName,
        });
      }
    }

    if (this.selectedCategory === 'save') {
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
