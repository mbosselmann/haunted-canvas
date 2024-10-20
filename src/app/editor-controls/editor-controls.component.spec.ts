import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorControlsComponent } from './editor-controls.component';

describe('EditorControlsComponent', () => {
  let component: EditorControlsComponent;
  let fixture: ComponentFixture<EditorControlsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditorControlsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditorControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
