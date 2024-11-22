import {
  Component,
  EventEmitter,
  Output,
  ViewChild,
  AfterViewChecked,
  ChangeDetectorRef,
} from '@angular/core';
import { CanvasComponent } from '../canvas/canvas.component';
import { EditorControlsComponent } from '../editor-controls/editor-controls.component';
import { ImageUploadComponent } from '../image-upload-form/image-upload-form.component';
import { PreviewImageSetting } from '../directives/previewImage.directive';
import { ButtonComponent } from '../button/button.component';

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
  appPreviewImageSettings: PreviewImageSetting[] = [];

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
    if (this.canvasComponent && this.canvasComponent.canvas) {
      this.canvasElement = this.canvasComponent.canvas.nativeElement;
    }
  }

  onCloseEditor() {
    this.closeEditor.emit(false);
    this.isImageChosen = false;
    this.appPreviewImageSettings = [];
    this.previewImage = '';
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
}
