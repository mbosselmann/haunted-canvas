import { Component, Input } from '@angular/core';
import { CategoryOptions } from '../model/categoryOption';
import { categoryOptions } from '../data/categoryOptions';
import { EditorComponent } from '../editor/editor.component';
import { EditorSliderComponent } from '../editor-slider/editor-slider.component';
import { ActiveDirective } from '../directives/active.directive';

@Component({
  selector: 'app-editor-controls',
  standalone: true,
  imports: [EditorComponent, EditorSliderComponent, ActiveDirective],
  templateUrl: './editor-controls.component.html',
  styleUrl: './editor-controls.component.css',
})
export class EditorControlsComponent {
  categories: string[] = ['settings', 'filter', 'sticker', 'save'];
  selectedCategory = '';
  selectedOption = '';

  categoryOptions: CategoryOptions = categoryOptions;

  @Input()
  isImageChosen = false;

  onSelectCategory(category: string) {
    this.selectedCategory = this.selectedCategory === category ? '' : category;
    this.selectedOption = '';
  }
  onSelectOption(option: string) {
    this.selectedOption = this.selectedOption === option ? '' : option;
    this.categoryOptions[this.selectedCategory]
      .find((option) => option.name === this.selectedOption)
      ?.action();
  }
}
