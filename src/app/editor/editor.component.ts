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
import { loadImage } from '../helper/loadImage';
import { Sticker } from '../services/canvas.service';

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
  previewImage: HTMLImageElement | null = null;
  imageSources: string[] = [];
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
  ctx!: CanvasRenderingContext2D;

  constructor(private changeDetectorRef: ChangeDetectorRef) {}

  async ngAfterViewChecked() {
    this.setCanvasElement();
    this.changeDetectorRef.detectChanges();

    if (this.canvasElement) {
      const context = this.canvasElement.getContext('2d');
      if (context) {
        this.ctx = context;
      }
    }
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
    this.appPreviewImageSettings = [];
    this.previewImage = null;
    this.stickers = [];
  }

  async setPreviewImage(previewImage: string) {
    const image = await loadImage(previewImage);

    this.previewImage = image;
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
        }
      });
    }
  }
}
