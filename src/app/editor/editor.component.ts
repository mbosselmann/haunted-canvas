import {
  Component,
  EventEmitter,
  Output,
  ViewChild,
  AfterViewChecked,
  ChangeDetectorRef,
} from '@angular/core';
import { CanvasComponent } from '../canvas/canvas.component';
import {
  EditorControlsComponent,
  SelectedSticker,
} from '../editor-controls/editor-controls.component';
import { ImageUploadComponent } from '../image-upload-form/image-upload-form.component';
import { PreviewImageSetting } from '../directives/previewImage.directive';
import { ButtonComponent } from '../button/button.component';
import { Sticker } from '../directives/finalImage.directive';

export type Categories = ['settings', 'sticker', 'save'];

export type SelectedCategory = 'settings' | 'sticker' | 'save' | '';
@Component({
  selector: 'app-editor',
  standalone: true,
  imports: [
    CanvasComponent,
    EditorControlsComponent,
    ImageUploadComponent,
    ButtonComponent,
  ],
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.css',
})
export class EditorComponent implements AfterViewChecked {
  title = 'Haunted Canvas';
  closeIconUrl = 'assets/close-icon.svg';
  greenEyeUrl = 'assets/green-eye.png';
  isImageChosen = false;
  previewImage = '';
  finalImage = '';
  categories: Categories = ['settings', 'sticker', 'save'];
  selectedCategory: SelectedCategory = 'settings';
  appPreviewImageSettings: PreviewImageSetting[] = [];
  stickers: Sticker[] = [];

  @Output()
  closeEditor = new EventEmitter<boolean>();

  @ViewChild(CanvasComponent)
  canvasComponent!: CanvasComponent;

  canvasElement!: HTMLCanvasElement;

  constructor(private changeDetectorRef: ChangeDetectorRef) {}

  ngAfterViewChecked() {
    this.setCanvasElement();
    this.changeDetectorRef.detectChanges();
  }

  setCanvasElement() {
    if (this.canvasComponent && this.canvasComponent?.styleCanvas) {
      this.canvasElement = this.canvasComponent.styleCanvas.nativeElement;
    }

    if (this.canvasComponent && this.canvasComponent?.finalCanvas) {
      this.canvasElement = this.canvasComponent.finalCanvas.nativeElement;
    }
  }

  onCloseEditor() {
    this.closeEditor.emit(false);
    this.isImageChosen = false;
    this.appPreviewImageSettings = [];
    this.previewImage = '';
    this.stickers = [];
  }

  onImageChosen(isImageChosen: boolean) {
    this.isImageChosen = isImageChosen;
  }

  setPreviewImage(previewImage: string) {
    this.previewImage = previewImage;
  }

  onSliderValueChange(setting: PreviewImageSetting) {
    if (
      this.appPreviewImageSettings.find(
        (appPreviewImageSetting) => appPreviewImageSetting.id === setting.id,
      )
    ) {
      this.appPreviewImageSettings = this.appPreviewImageSettings.map(
        (imageSetting) =>
          imageSetting.id === setting.id ? setting : imageSetting,
      );
    } else {
      this.appPreviewImageSettings = [...this.appPreviewImageSettings, setting];
    }
  }

  onSelectedStickerChange(sticker: SelectedSticker) {
    this.stickers = [
      ...this.stickers,
      {
        ...sticker,
        x: this.canvasElement.width / 2 - 100,
        y: this.canvasElement.height / 2 - 100,
        width: 200,
        height: 200,
      },
    ];
  }

  onCategoryChange(category: SelectedCategory) {
    this.selectedCategory = this.selectedCategory === category ? '' : category;
    this.updateFinalImageUrl();
  }

  private updateFinalImageUrl() {
    if (this.canvasElement) {
      this.canvasElement.toBlob((blob) => {
        if (blob) {
          this.finalImage = URL.createObjectURL(blob);
          this.changeDetectorRef.detectChanges();
          this.previewImage = this.finalImage;
        }
      });
    }
  }
}
