import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CategoryOptions } from '../model/categoryOption';
import { categoryOptions } from '../data/categoryOptions';
import { EditorSliderComponent } from '../editor-slider/editor-slider.component';
import { ActiveDirective } from '../directives/active.directive';
import { PreviewImageSetting } from '../directives/previewImage.directive';

@Component({
  selector: 'app-editor-controls',
  standalone: true,
  imports: [EditorSliderComponent, ActiveDirective],
  templateUrl: './editor-controls.component.html',
  styleUrl: './editor-controls.component.css',
})
export class EditorControlsComponent {
  categories: string[] = ['settings', 'sticker', 'save'];
  selectedCategory = '';
  selectedOption: PreviewImageSetting | null = null;

  categoryOptions: CategoryOptions = categoryOptions;

  @Input()
  isImageChosen = false;

  @Input()
  canvasElement!: HTMLCanvasElement;

  @Output()
  sliderValueChange = new EventEmitter<PreviewImageSetting>();

  onSliderValueChange(value: number) {
    if (this.selectedOption && this.selectedOption.id !== undefined) {
      this.sliderValueChange.emit({ ...this.selectedOption, value });
      this.categoryOptions[this.selectedCategory] = this.categoryOptions[
        this.selectedCategory
      ].map((categoryOption) =>
        categoryOption.name === this.selectedOption?.name
          ? { ...this.selectedOption, value }
          : categoryOption,
      );
    }
  }

  onSelectCategory(category: string) {
    this.selectedCategory = this.selectedCategory === category ? '' : category;
    this.selectedOption = null;
  }

  onSelectOption(option: string) {
    const selectedCategoryOption =
      categoryOptions[this.selectedCategory].find(
        (categoryOption) => categoryOption.name === option,
      ) || null;

    this.selectedOption = selectedCategoryOption
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

    if (this.selectedOption && this.selectedOption.name === 'Save') {
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
    this.selectedOption = null;
  }
}
