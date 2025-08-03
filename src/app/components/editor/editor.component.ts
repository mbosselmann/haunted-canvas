import {
  Component,
  EventEmitter,
  Output,
  ViewChild,
  AfterViewChecked,
  ChangeDetectorRef,
  AfterViewInit,
} from '@angular/core';
import { loadImage } from '../../helper/loadImage';
import { CanvasService } from '../../services/canvas.service';
import { categoryOptions } from '../../data/categoryOptions';
import { LoadedSticker, SelectedSticker } from '../../model/sticker';
import { ImageSetting } from '../../model/image';
import { Categories, SelectedCategory } from '../../model/category';
import { ButtonComponent } from '../button/button.component';
import { CanvasComponent } from '../canvas/canvas.component';
import { EditorControlsComponent } from '../editor-controls/editor-controls.component';
import { ImageUploadComponent } from '../image-upload-form/image-upload-form.component';

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
export class EditorComponent implements AfterViewChecked, AfterViewInit {
  title = 'Haunted Canvas';
  closeIconUrl = 'assets/close-icon.svg';
  greenEyeUrl = 'assets/green-eye.png';
  previewImage: HTMLImageElement | null = null;
  finalImage: HTMLImageElement | null = null;
  categories: Categories = ['settings', 'stickers', 'save'];
  selectedCategory: SelectedCategory = 'settings';
  appPreviewImageSettings: ImageSetting[] = [];
  stickers: LoadedSticker[] = [];
  selectedStickers: SelectedSticker[] = [];
  isStickerSelected = false;

  @Output()
  closeEditor = new EventEmitter<boolean>();

  @ViewChild(CanvasComponent)
  canvasComponent!: CanvasComponent;

  canvasElement!: HTMLCanvasElement;
  ctx!: CanvasRenderingContext2D;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private canvasService: CanvasService,
  ) {}

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

  async ngAfterViewInit() {
    this.stickers = await this.canvasService.loadStickers(
      categoryOptions['stickers'],
    );
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

  onSliderValueChange(setting: ImageSetting) {
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

  onSelectedStickerChange(sticker: { id: string; name: string }) {
    this.selectedStickers = [
      ...this.selectedStickers,
      {
        ...sticker,
        x: this.canvasElement.width / 2 - 100,
        y: this.canvasElement.height / 2 - 100,
        width: 200,
        height: 200,
        isDragging: false,
      },
    ];
  }

  async onCategoryChange(category: SelectedCategory) {
    this.selectedCategory = this.selectedCategory === category ? '' : category;
    const imageUrl = await this.canvasService.createImageUrl(
      this.canvasElement,
    );
    this.finalImage = await this.canvasService.loadImage(imageUrl);
  }

  onIsStickerSelectedChange(isStickerSelected: boolean) {
    this.isStickerSelected = isStickerSelected;
  }
}
