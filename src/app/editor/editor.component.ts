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
import { CanvasSetting } from '../canvas/canvasSettings.directive';

@Component({
  selector: 'app-editor',
  standalone: true,
  imports: [CanvasComponent, EditorControlsComponent, ImageUploadComponent],
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.css',
})
export class EditorComponent implements AfterViewChecked {
  title = 'Haunted Canvas';
  closeIconUrl = 'assets/close-icon.svg';
  greenEyeUrl = 'assets/green-eye.png';
  isImageChosen = false;
  previewImage = '';
  canvasSettings: CanvasSetting[] = [];

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
  }

  onImageChosen(isImageChosen: boolean) {
    this.isImageChosen = isImageChosen;
  }

  setPreviewImage(previewImage: string) {
    this.previewImage = previewImage;
  }

  onSliderValueChange(setting: CanvasSetting) {
    if (
      this.canvasSettings.find(
        (canvasSetting) => canvasSetting.id === setting.id,
      )
    ) {
      this.canvasSettings = this.canvasSettings.map((canvasSetting) =>
        canvasSetting.id === setting.id ? setting : canvasSetting,
      );
    } else {
      this.canvasSettings = [...this.canvasSettings, setting];
    }
  }
}
