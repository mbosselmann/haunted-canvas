import { Component } from '@angular/core';
import { CategoryOptions } from '../model/categoryOption';
import { categoryOptions } from '../data/categoryOptions';

@Component({
  selector: 'editor-controls',
  standalone: true,
  imports: [],
  templateUrl: './editor-controls.component.html',
  styleUrl: './editor-controls.component.css',
})
export class EditorControlsComponent {
  categories: string[] = ['settings', 'filter', 'sticker', 'save'];
  selectedCategory: string = '';
  selectedOption: string = '';

  categoryOptions: CategoryOptions = categoryOptions;

  onSelectCategory(category: string) {
    this.selectedCategory = this.selectedCategory === category ? '' : category;
  }
  onSelectOption(option: string) {
    this.selectedOption = this.selectedOption === option ? '' : option;
    this.categoryOptions[this.selectedCategory]
      .find((option) => option.name === this.selectedOption)
      ?.action();
  }
}
