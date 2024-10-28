import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorSliderComponent } from './editor-slider.component';

describe('EditorSliderComponent', () => {
  let component: EditorSliderComponent;
  let fixture: ComponentFixture<EditorSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditorSliderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditorSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
